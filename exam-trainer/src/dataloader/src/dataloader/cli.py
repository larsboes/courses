"""CLI entry point for the dataloader pipeline.

Usage::

    uv run dataloader process <course>

Where ``<course>`` is the name of a YAML config file (without extension)
in the ``configs/`` directory.
"""

from __future__ import annotations

import logging
import tempfile
from pathlib import Path

import click

from dataloader.enrich import enrich_slides
from dataloader.extract import extract_pages
from dataloader.filter import load_config, parse_slide_ranges, filter_pages
from dataloader.render import render_document

logger = logging.getLogger(__name__)


def _slugify(name: str) -> str:
    """Turn a PDF filename into a directory-friendly slug.

    Example: "Implementierung digitaler Geschäftsprozesse Kapitel 1 und 2.pdf"
             -> "implementierung-digitaler-geschaeftsprozesse-kapitel-1-und-2"
    """
    stem = Path(name).stem.lower()
    slug = stem.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    # Replace any non-alphanumeric chars with hyphens, collapse multiples
    result: list[str] = []
    for ch in slug:
        if ch.isalnum():
            result.append(ch)
        else:
            if result and result[-1] != "-":
                result.append("-")
    return "".join(result).strip("-")


@click.group()
@click.option("--verbose", "-v", is_flag=True, help="Enable debug logging.")
def main(verbose: bool) -> None:
    """PDF slide extraction and enrichment pipeline."""
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(levelname)s: %(message)s",
    )


@main.command()
@click.argument("course")
@click.option(
    "--config-dir",
    type=click.Path(exists=True, path_type=Path),
    default="configs",
    help="Directory containing YAML config files.",
)
@click.option(
    "--dpi",
    type=int,
    default=200,
    help="Image extraction DPI (default 200).",
)
@click.option(
    "--skip-enrich",
    is_flag=True,
    default=False,
    help="Skip the Gemini enrichment step (extract and filter only).",
)
def process(course: str, config_dir: Path, dpi: int, skip_enrich: bool) -> None:
    """Run the full pipeline for a course.

    COURSE is the config file name without the .yaml extension
    (e.g. ``ipdg`` for ``configs/ipdg.yaml``).

    Steps: extract PDF pages -> filter by slide ranges -> enrich via
    Gemini vision -> render to Markdown.
    """
    config_path = config_dir / f"{course}.yaml"
    config = load_config(config_path)

    click.echo(f"Processing course: {config.name} ({config.course})")
    click.echo(f"Sources: {len(config.sources)}")

    pdf_dir = Path(config.pdf_dir)
    output_base = Path(config.output_dir)
    total_slides = 0

    for i, source in enumerate(config.sources, 1):
        pdf_path = pdf_dir / source.file
        slug = _slugify(source.file)
        source_output = output_base / slug
        images_dir = source_output / "images"

        click.echo(f"\n[{i}/{len(config.sources)}] {source.file}")

        # 1. Extract all pages from PDF to a temp directory
        click.echo("  Extracting pages...")
        with tempfile.TemporaryDirectory() as tmp:
            tmp_dir = Path(tmp)
            extracted = extract_pages(pdf_path, tmp_dir, dpi=dpi)
            click.echo(f"  Extracted {len(extracted)} pages")

            # 2. Filter to relevant slides
            page_numbers = parse_slide_ranges(source.slides)
            if page_numbers:
                click.echo(f"  Filtering to {len(page_numbers)} selected slides...")
            else:
                click.echo("  Keeping all slides...")

            slide_paths = filter_pages(tmp_dir, images_dir, page_numbers)
            click.echo(f"  Filtered to {len(slide_paths)} slides -> {images_dir}")

        # 3. Enrich via Gemini (unless skipped)
        if skip_enrich:
            click.echo("  Skipping enrichment (--skip-enrich)")
            total_slides += len(slide_paths)
            continue

        click.echo("  Enriching slides via Gemini...")
        enrichments = enrich_slides(slide_paths)

        # 4. Render to markdown
        md_path = source_output / "content.md"
        title = f"{config.name} - {Path(source.file).stem}"
        render_document(enrichments, md_path, title=title)
        click.echo(f"  Rendered -> {md_path}")

        total_slides += len(slide_paths)

    click.echo(f"\nDone! {total_slides} slides processed -> {output_base}")
