"""Merge markitdown text content with Gemini slide visual analysis.

Combines the rich text from markitdown-extracted markdown files with
per-slide image descriptions and key concepts from Gemini vision analysis.
The output is a single merged document per source that interleaves text
sections with their matching slide visuals.
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from pathlib import Path

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class MarkdownSection:
    """A section parsed from a markitdown .md file."""

    level: int  # heading level (1, 2, 3, 4)
    title: str
    content: str  # text content (excluding sub-headings)
    raw_block: str  # full raw markdown for this section (including heading)
    tokens: set[str] = field(default_factory=set)  # lowercase word tokens for matching


@dataclass
class GeminiSlide:
    """A slide parsed from the Gemini content.md output."""

    slide_number: int
    title: str
    raw_block: str  # full markdown block for this slide
    key_concepts: list[str] = field(default_factory=list)
    tokens: set[str] = field(default_factory=set)  # title + concepts tokenized


# ---------------------------------------------------------------------------
# Tokenization helpers
# ---------------------------------------------------------------------------

_STOP_WORDS = frozenset({
    "und", "oder", "der", "die", "das", "in", "von", "zu", "für", "mit",
    "ein", "eine", "auf", "aus", "ist", "sind", "als", "an", "des", "dem",
    "den", "es", "im", "am", "bei", "nach", "über", "wie", "was", "zum",
    "zur", "the", "of", "and", "in", "for", "to", "a", "an", "is", "are",
    "with", "from", "by", "on", "at", "this", "that", "it", "its", "vs",
    "slide", "img", "png",
})


def _tokenize(text: str) -> set[str]:
    """Extract meaningful lowercase word tokens from text."""
    words = re.findall(r"[a-zäöüß]{3,}", text.lower())
    return {w for w in words if w not in _STOP_WORDS}


def _extract_section_number(title: str) -> str | None:
    """Extract a section number like '2.2' or '4.1' from a heading."""
    m = re.search(r"(\d+\.?\d*)", title)
    return m.group(1) if m else None


# ---------------------------------------------------------------------------
# Parsers
# ---------------------------------------------------------------------------

def parse_markdown_sections(text: str) -> list[MarkdownSection]:
    """Parse markdown text into sections split at H2 boundaries.

    Returns a flat list of sections. H2 sections include all nested
    H3/H4 content as part of their raw_block.
    """
    lines = text.split("\n")
    sections: list[MarkdownSection] = []
    current_heading = ""
    current_level = 0
    current_lines: list[str] = []
    content_lines: list[str] = []  # lines before first sub-heading

    def _flush():
        if current_heading or current_lines:
            raw = "\n".join(current_lines)
            content = "\n".join(content_lines)
            section = MarkdownSection(
                level=current_level,
                title=current_heading,
                content=content,
                raw_block=raw,
            )
            section.tokens = _tokenize(current_heading + " " + content)
            sections.append(section)

    for line in lines:
        heading_match = re.match(r"^(#{2,4})\s+(.+)$", line)
        if heading_match:
            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()

            if level == 2:
                # Flush previous H2 section
                _flush()
                current_heading = title
                current_level = level
                current_lines = [line]
                content_lines = []
            else:
                # H3/H4 stays within current H2 section
                current_lines.append(line)
                content_lines.append(line)
        else:
            current_lines.append(line)
            content_lines.append(line)

    _flush()
    return sections


def parse_gemini_content(text: str) -> list[GeminiSlide]:
    """Parse Gemini content.md into individual slide blocks."""
    slides: list[GeminiSlide] = []

    # Split on H2 slide headings
    parts = re.split(r"(?=^## Slide \d+)", text, flags=re.MULTILINE)

    for part in parts:
        part = part.strip()
        if not part:
            continue

        # Extract slide number and title
        header_match = re.match(r"^## Slide (\d+)(?::\s*(.+))?$", part, re.MULTILINE)
        if not header_match:
            continue

        slide_number = int(header_match.group(1))
        title = (header_match.group(2) or "").strip()

        # Extract key concepts
        concepts: list[str] = []
        concepts_match = re.search(
            r"### Key Concepts\s*\n+[-*]\s*(.+)",
            part,
        )
        if concepts_match:
            concepts = [c.strip() for c in concepts_match.group(1).split(",")]

        slide = GeminiSlide(
            slide_number=slide_number,
            title=title,
            raw_block=part,
            key_concepts=concepts,
        )
        slide.tokens = _tokenize(title + " " + " ".join(concepts))
        slides.append(slide)

    return slides


# ---------------------------------------------------------------------------
# Matching
# ---------------------------------------------------------------------------

def _score_match(slide: GeminiSlide, section: MarkdownSection) -> float:
    """Score how well a Gemini slide matches a markdown section.

    Higher is better. Returns 0.0 for no match.
    """
    if not slide.tokens or not section.tokens:
        return 0.0

    # Token overlap (Jaccard-like but weighted towards smaller set)
    overlap = slide.tokens & section.tokens
    if not overlap:
        return 0.0

    # Base score: overlap relative to the slide's tokens
    score = len(overlap) / len(slide.tokens)

    # Bonus for section number match (e.g., "2.2" in slide title matching "2.2" in section title)
    slide_num = _extract_section_number(slide.title)
    section_num = _extract_section_number(section.title)
    if slide_num and section_num and slide_num == section_num:
        score += 1.0

    # Bonus for exact substring match of section title in slide title
    if section.title.lower() in slide.title.lower():
        score += 0.5
    elif slide.title.lower() in section.title.lower():
        score += 0.3

    return score


def match_slides_to_sections(
    slides: list[GeminiSlide],
    sections: list[MarkdownSection],
    min_score: float = 0.1,
) -> dict[int, list[GeminiSlide]]:
    """Match each slide to its best section.

    Returns:
        Dict mapping section index to list of matched slides.
        Key -1 holds unmatched slides.
    """
    result: dict[int, list[GeminiSlide]] = {-1: []}

    for slide in slides:
        best_idx = -1
        best_score = min_score

        for i, section in enumerate(sections):
            score = _score_match(slide, section)
            if score > best_score:
                best_score = score
                best_idx = i

        if best_idx not in result:
            result[best_idx] = []
        result[best_idx].append(slide)

        if best_idx >= 0:
            logger.debug(
                "Slide %d '%s' -> section '%s' (score=%.2f)",
                slide.slide_number,
                slide.title[:40],
                sections[best_idx].title[:40],
                best_score,
            )
        else:
            logger.debug(
                "Slide %d '%s' -> unmatched (best_score=%.2f)",
                slide.slide_number,
                slide.title[:40],
                best_score,
            )

    return result


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------

def _render_slide_visual(slide: GeminiSlide, images_rel_dir: str = "images") -> str:
    """Render a compact slide visual block for insertion into merged output."""
    lines: list[str] = []
    padded = str(slide.slide_number).zfill(2)

    lines.append(f"> **Slide {slide.slide_number}:** {slide.title}")
    lines.append(f">")
    lines.append(f"> ![Slide {slide.slide_number}]({images_rel_dir}/slide-{padded}.png)")

    # Extract visual elements from raw block
    ve_matches = re.findall(
        r"\*\*(\w+):\*\*\s*(.+?)(?=\n\n|\n\*\*|\n###|\Z)",
        slide.raw_block,
        re.DOTALL,
    )
    for ve_type, description in ve_matches:
        if ve_type.lower() in ("icon", "logo"):
            continue  # skip decorative elements
        desc_clean = description.strip().replace("\n", " ")
        if len(desc_clean) > 200:
            desc_clean = desc_clean[:200] + "..."
        lines.append(f">")
        lines.append(f"> *{ve_type}:* {desc_clean}")

    if slide.key_concepts:
        lines.append(f">")
        lines.append(f"> **Concepts:** {', '.join(slide.key_concepts[:10])}")

    lines.append("")
    return "\n".join(lines)


def render_merged(
    sections: list[MarkdownSection],
    matches: dict[int, list[GeminiSlide]],
    title: str,
    images_rel_dir: str = "images",
) -> str:
    """Render the merged document combining text sections with slide visuals."""
    parts: list[str] = []
    parts.append(f"# {title}\n")

    for i, section in enumerate(sections):
        # Skip the preamble section (level 0, before first H2) — its content
        # is mostly metadata (Dozent, Quelle) already captured in the title.
        # Still attach any slides matched to it.
        if section.level < 2:
            matched_slides = matches.get(i, [])
            if matched_slides:
                parts.append(f"<details><summary>📊 {len(matched_slides)} General Slide(s)</summary>\n")
                for slide in sorted(matched_slides, key=lambda s: s.slide_number):
                    parts.append(_render_slide_visual(slide, images_rel_dir))
                parts.append("</details>\n")
            continue

        # Output the section's raw markdown content
        parts.append(section.raw_block)
        parts.append("")

        # Append matched slide visuals
        matched_slides = matches.get(i, [])
        if matched_slides:
            parts.append(f"<details><summary>📊 {len(matched_slides)} Slide(s)</summary>\n")
            for slide in sorted(matched_slides, key=lambda s: s.slide_number):
                parts.append(_render_slide_visual(slide, images_rel_dir))
            parts.append("</details>\n")

        parts.append("---\n")

    # Append any unmatched slides
    unmatched = matches.get(-1, [])
    if unmatched:
        parts.append("## Additional Slides\n")
        parts.append("*Slides not matched to a specific text section:*\n")
        for slide in sorted(unmatched, key=lambda s: s.slide_number):
            parts.append(_render_slide_visual(slide, images_rel_dir))
            parts.append("")
        parts.append("---\n")

    return "\n".join(parts)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def merge_content(
    markdown_path: Path,
    gemini_path: Path,
    output_path: Path,
    title: str,
    images_rel_dir: str = "images",
) -> Path:
    """Merge markitdown text with Gemini visual analysis into a single document.

    Args:
        markdown_path: Path to the markitdown .md file.
        gemini_path: Path to the Gemini content.md file.
        output_path: Where to write the merged output.
        title: Document title (H1 heading).
        images_rel_dir: Relative path from output to images directory.

    Returns:
        Path to the written merged file.
    """
    md_text = markdown_path.read_text(encoding="utf-8")
    gemini_text = gemini_path.read_text(encoding="utf-8")

    sections = parse_markdown_sections(md_text)
    slides = parse_gemini_content(gemini_text)

    logger.info(
        "Parsed %d sections from %s, %d slides from %s",
        len(sections),
        markdown_path.name,
        len(slides),
        gemini_path.name,
    )

    matches = match_slides_to_sections(slides, sections)

    matched_count = sum(
        len(v) for k, v in matches.items() if k >= 0
    )
    unmatched_count = len(matches.get(-1, []))
    logger.info(
        "Matched %d/%d slides to sections (%d unmatched)",
        matched_count,
        len(slides),
        unmatched_count,
    )

    content = render_merged(sections, matches, title, images_rel_dir)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")

    logger.info("Wrote merged content -> %s", output_path)
    return output_path
