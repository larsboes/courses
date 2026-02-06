"""Extract page images from PDF files using PyMuPDF.

Renders each page of a PDF as a PNG image at a configurable DPI.
"""

from __future__ import annotations

import logging
from pathlib import Path

import fitz

logger = logging.getLogger(__name__)


def extract_pages(pdf_path: Path, output_dir: Path, dpi: int = 200) -> list[Path]:
    """Render every page of a PDF as a PNG image.

    Args:
        pdf_path: Path to the source PDF file.
        output_dir: Directory where PNG files will be saved.
        dpi: Resolution for rendering (default 200).

    Returns:
        List of paths to the generated PNG images, ordered by page number.
        Files are named ``page-{NN}.png`` (1-indexed, zero-padded to 2 digits).

    Raises:
        FileNotFoundError: If *pdf_path* does not exist.
        RuntimeError: If the PDF cannot be opened or a page fails to render.
    """
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        doc = fitz.open(pdf_path)
    except Exception as exc:
        raise RuntimeError(f"Failed to open PDF {pdf_path}: {exc}") from exc

    zoom = dpi / 72  # PyMuPDF default resolution is 72 DPI
    matrix = fitz.Matrix(zoom, zoom)

    paths: list[Path] = []

    try:
        for page_num in range(len(doc)):
            page = doc[page_num]
            try:
                pix = page.get_pixmap(matrix=matrix)
            except Exception as exc:
                raise RuntimeError(
                    f"Failed to render page {page_num + 1} of {pdf_path}: {exc}"
                ) from exc

            filename = f"page-{page_num + 1:02d}.png"
            out_path = output_dir / filename
            pix.save(out_path)
            paths.append(out_path)
            logger.debug("Rendered %s page %d -> %s", pdf_path.name, page_num + 1, out_path)
    finally:
        doc.close()

    logger.info("Extracted %d pages from %s", len(paths), pdf_path.name)
    return paths
