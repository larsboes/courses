"""Render enriched slide data into a Markdown document.

Assembles one ``content.md`` per source PDF, combining slide images with
their enrichment data (extracted text, visual element descriptions, key concepts).
"""

import logging
from pathlib import Path

from dataloader.enrich import SlideEnrichment

logger = logging.getLogger(__name__)


def render_slide(enrichment: SlideEnrichment, images_rel_dir: str = "images") -> str:
    """Render a single slide's enrichment data as a Markdown section.

    Produces output in this format::

        ## Slide 14: ERP Module Overview

        ![Slide 14](images/slide-14.png)

        ### Extracted Text
        ...

        ### Visual Elements
        **Diagram:** Circular arrangement of SAP modules showing...

        ### Key Concepts
        - ERP, FI, CO, MM

        ---

    Args:
        enrichment: Structured enrichment data for the slide.
        images_rel_dir: Relative path to the images directory from the
            markdown file (default ``"images"``).

    Returns:
        Markdown string for this slide section.
    """
    n = enrichment["slide_number"]
    title = enrichment["title"]
    padded = str(n).zfill(2)

    lines: list[str] = []

    # Heading
    if title:
        lines.append(f"## Slide {n}: {title}")
    else:
        lines.append(f"## Slide {n}")
    lines.append("")

    # Image reference
    lines.append(f"![Slide {n}]({images_rel_dir}/slide-{padded}.png)")
    lines.append("")

    # Extracted text
    text_content = enrichment["text_content"].strip()
    if text_content:
        lines.append("### Extracted Text")
        lines.append("")
        lines.append(text_content)
        lines.append("")

    # Visual elements
    visual_elements = enrichment["visual_elements"]
    if visual_elements:
        lines.append("### Visual Elements")
        lines.append("")
        for ve in visual_elements:
            ve_type = ve["type"].capitalize()
            lines.append(f"**{ve_type}:** {ve['description']}")
            lines.append("")

    # Key concepts
    key_concepts = enrichment["key_concepts"]
    if key_concepts:
        lines.append("### Key Concepts")
        lines.append("")
        lines.append("- " + ", ".join(key_concepts))
        lines.append("")

    # Separator
    lines.append("---")
    lines.append("")

    return "\n".join(lines)


def render_document(
    enrichments: list[SlideEnrichment],
    output_path: Path,
    title: str,
    images_rel_dir: str = "images",
) -> Path:
    """Assemble a full Markdown document from multiple slide enrichments.

    Args:
        enrichments: Ordered list of slide enrichment data.
        output_path: Path where ``content.md`` will be written.
        title: Document title (used as the H1 heading).
        images_rel_dir: Relative path to images from the markdown file.

    Returns:
        Path to the written markdown file.
    """
    sections: list[str] = []

    # Document title
    sections.append(f"# {title}")
    sections.append("")

    # Render each slide
    for enrichment in enrichments:
        sections.append(render_slide(enrichment, images_rel_dir))

    content = "\n".join(sections)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")

    logger.info("Wrote %s (%d slides)", output_path, len(enrichments))
    return output_path
