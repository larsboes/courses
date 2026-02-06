"""Filter extracted page images based on YAML slide range specifications.

Parses slide range strings (e.g. "3-8", "12", "all") and copies only the
matching pages to the final output directory.
"""

from __future__ import annotations

import logging
import shutil
from dataclasses import dataclass
from pathlib import Path

import yaml

logger = logging.getLogger(__name__)


@dataclass
class SourceConfig:
    """Configuration for a single PDF source within a course."""

    file: str
    slides: list[str | int] | str  # "all" or list of ranges/numbers
    markdown: str | None = None  # optional markitdown .md filename


@dataclass
class CourseConfig:
    """Top-level configuration for a course pipeline run."""

    course: str
    name: str
    sources: list[SourceConfig]
    pdf_dir: str
    output_dir: str
    markdown_dir: str | None = None  # directory containing markitdown .md files
    extra_markdown: list[str] | None = None  # additional .md files without slides


def parse_slide_ranges(slides: str | list[str | int]) -> set[int]:
    """Parse a slide range specification into a set of page numbers.

    Accepts:
        - ``"all"`` -- returns an empty set (meaning all pages).
        - A list of ints and/or range strings like ``[3-8, 12, 15-28]``.

    Args:
        slides: The slide specification from the YAML config. Can be the
            string ``"all"`` or a list of integers and dash-separated ranges.

    Returns:
        A set of 1-indexed page numbers. An empty set means "all pages".

    Raises:
        ValueError: If a range string is malformed.
    """
    if isinstance(slides, str):
        if slides.strip().lower() == "all":
            return set()
        raise ValueError(f"Invalid slides string: {slides!r} (expected 'all' or a list)")

    result: set[int] = set()
    for item in slides:
        if isinstance(item, int):
            if item < 1:
                raise ValueError(f"Slide number must be >= 1, got {item}")
            result.add(item)
        else:
            text = str(item).strip()
            if "-" in text:
                parts = text.split("-", maxsplit=1)
                try:
                    start = int(parts[0])
                    end = int(parts[1])
                except ValueError as exc:
                    raise ValueError(f"Invalid range: {text!r}") from exc
                if start < 1 or end < 1:
                    raise ValueError(f"Range values must be >= 1, got {text!r}")
                if start > end:
                    raise ValueError(f"Range start > end: {text!r}")
                result.update(range(start, end + 1))
            else:
                try:
                    num = int(text)
                except ValueError as exc:
                    raise ValueError(f"Invalid slide number: {text!r}") from exc
                if num < 1:
                    raise ValueError(f"Slide number must be >= 1, got {num}")
                result.add(num)

    return result


def filter_pages(
    extracted_dir: Path,
    output_dir: Path,
    page_numbers: set[int],
) -> list[Path]:
    """Copy only the selected page images to the output images/ directory.

    If *page_numbers* is empty, all pages are copied (``all`` mode).

    Images are renamed to ``slide-{NN}.png`` (zero-padded, 1-indexed based on
    original page number).

    Args:
        extracted_dir: Directory containing the raw ``page-{NN}.png`` files.
        output_dir: Target directory (e.g. ``output/ipdg/kapitel-1-2/images/``).
        page_numbers: Set of 1-indexed page numbers to keep. Empty = all.

    Returns:
        Sorted list of paths to the copied image files.
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    # Discover all page-NN.png files and extract their page numbers
    page_files: dict[int, Path] = {}
    for png in sorted(extracted_dir.glob("page-*.png")):
        stem = png.stem  # e.g. "page-03"
        try:
            num = int(stem.split("-", maxsplit=1)[1])
        except (IndexError, ValueError):
            logger.warning("Skipping file with unexpected name: %s", png)
            continue
        page_files[num] = png

    if not page_files:
        logger.warning("No page-*.png files found in %s", extracted_dir)
        return []

    # Select which pages to copy
    if page_numbers:
        selected = sorted(num for num in page_numbers if num in page_files)
        missing = page_numbers - set(page_files.keys())
        if missing:
            logger.warning(
                "Requested pages not found in extracted output: %s",
                sorted(missing),
            )
    else:
        selected = sorted(page_files.keys())

    copied: list[Path] = []
    for num in selected:
        src = page_files[num]
        dest = output_dir / f"slide-{num:02d}.png"
        shutil.copy2(src, dest)
        copied.append(dest)
        logger.debug("Copied page %d -> %s", num, dest)

    logger.info(
        "Filtered %d/%d pages -> %s",
        len(copied),
        len(page_files),
        output_dir,
    )
    return copied


def load_config(config_path: Path) -> CourseConfig:
    """Load and validate a course YAML configuration file.

    Args:
        config_path: Path to the YAML config file.

    Returns:
        A validated ``CourseConfig`` instance.

    Raises:
        FileNotFoundError: If the config file does not exist.
        ValueError: If required fields are missing or invalid.
    """
    if not config_path.exists():
        raise FileNotFoundError(f"Config file not found: {config_path}")

    with open(config_path) as f:
        raw = yaml.safe_load(f)

    if not isinstance(raw, dict):
        raise ValueError(f"Config file must contain a YAML mapping, got {type(raw).__name__}")

    required = ("course", "name", "sources", "pdf_dir", "output_dir")
    missing = [k for k in required if k not in raw]
    if missing:
        raise ValueError(f"Missing required config keys: {missing}")

    sources: list[SourceConfig] = []
    for i, src in enumerate(raw["sources"]):
        if not isinstance(src, dict):
            raise ValueError(f"sources[{i}] must be a mapping, got {type(src).__name__}")
        if "file" not in src:
            raise ValueError(f"sources[{i}] missing required key 'file'")
        if "slides" not in src:
            raise ValueError(f"sources[{i}] missing required key 'slides'")
        sources.append(SourceConfig(
            file=src["file"],
            slides=src["slides"],
            markdown=src.get("markdown"),
        ))

    return CourseConfig(
        course=raw["course"],
        name=raw["name"],
        sources=sources,
        pdf_dir=raw["pdf_dir"],
        output_dir=raw["output_dir"],
        markdown_dir=raw.get("markdown_dir"),
        extra_markdown=raw.get("extra_markdown"),
    )
