"""Enrich slide images using Gemini vision API.

Sends each slide image to Gemini to extract text, describe visual elements,
and identify key concepts.
"""

import json
import logging
import os
import re
import time
from pathlib import Path
from typing import TypedDict

from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

ENRICHMENT_PROMPT = """\
Analyze this lecture slide image. Return a JSON object with the following structure:

{
  "title": "The slide title or main heading",
  "text_content": "All visible text on the slide, preserving structure with newlines",
  "visual_elements": [
    {
      "type": "diagram|chart|table|image|icon|flowchart",
      "description": "Detailed description of the visual element including layout, colors, arrows, groupings, and any text labels within it"
    }
  ],
  "key_concepts": ["concept1", "concept2"]
}

Instructions:
- Extract ALL visible text verbatim, preserving bullet points and hierarchy
- For the title, use the main heading or most prominent text on the slide
- Describe every diagram, chart, table, or meaningful image in detail
- Note colors, arrows, groupings, and spatial relationships in visual elements
- Identify the key concepts, terms, and relationships taught on this slide
- If there are no visual elements beyond text, use an empty array
- Return ONLY valid JSON, no additional text or markdown formatting
"""

MAX_RETRIES = 3
RETRY_BASE_DELAY = 2.0


class VisualElement(TypedDict):
    """A visual element detected on a slide."""

    type: str
    description: str


class SlideEnrichment(TypedDict):
    """Structured enrichment data for a single slide."""

    slide_number: int
    title: str
    text_content: str
    visual_elements: list[VisualElement]
    key_concepts: list[str]


def _get_client() -> genai.Client:
    """Get configured Gemini client.

    Checks GEMINI_API_KEY first (direct API mode), then falls back
    to Vertex AI using VERTEX_PROJECT_ID and VERTEX_LOCATION.
    """
    api_key = os.environ.get("GEMINI_API_KEY")

    if api_key:
        return genai.Client(api_key=api_key)
    else:
        return genai.Client(
            vertexai=True,
            project=os.environ.get("VERTEX_PROJECT_ID", "de0360-sbx-lars"),
            location=os.environ.get("VERTEX_LOCATION", "europe-west4"),
        )


def _get_model() -> str:
    """Get the Gemini model name from env or default."""
    return os.environ.get("GEMINI_MODEL", "gemini-2.0-flash")


def _parse_json_response(text: str) -> dict:
    """Parse JSON from Gemini response, handling markdown code blocks."""
    # Strip markdown code fences if present
    cleaned = text.strip()
    match = re.search(r"```(?:json)?\s*\n?(.*?)\n?\s*```", cleaned, re.DOTALL)
    if match:
        cleaned = match.group(1).strip()

    return json.loads(cleaned)


def _extract_slide_number(image_path: Path) -> int:
    """Extract slide number from filename like slide-03.png or page-03.png."""
    stem = image_path.stem
    match = re.search(r"(\d+)", stem)
    if match:
        return int(match.group(1))
    return 0


def enrich_slide(image_path: Path) -> SlideEnrichment:
    """Send a single slide image to Gemini vision and return structured data.

    Uses the google-genai SDK to call Gemini with a vision prompt that
    extracts text, describes diagrams/charts/tables, identifies key concepts,
    and notes meaningful visual elements.

    Args:
        image_path: Path to the slide PNG image.

    Returns:
        Structured enrichment data for the slide.
    """
    client = _get_client()
    model = _get_model()
    slide_number = _extract_slide_number(image_path)

    image_bytes = image_path.read_bytes()
    image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/png")

    config = types.GenerateContentConfig(
        temperature=0.2,
        max_output_tokens=4096,
    )

    last_error: Exception | None = None
    for attempt in range(MAX_RETRIES):
        try:
            response = client.models.generate_content(
                model=model,
                contents=[image_part, ENRICHMENT_PROMPT],
                config=config,
            )

            parsed = _parse_json_response(response.text)

            return SlideEnrichment(
                slide_number=slide_number,
                title=parsed.get("title", ""),
                text_content=parsed.get("text_content", ""),
                visual_elements=[
                    VisualElement(
                        type=ve.get("type", "image"),
                        description=ve.get("description", ""),
                    )
                    for ve in parsed.get("visual_elements", [])
                ],
                key_concepts=parsed.get("key_concepts", []),
            )

        except (json.JSONDecodeError, KeyError, TypeError) as exc:
            logger.warning(
                "Failed to parse Gemini response for slide %d (attempt %d/%d): %s",
                slide_number,
                attempt + 1,
                MAX_RETRIES,
                exc,
            )
            last_error = exc
            # Retry immediately for parse errors (no backoff needed)
            continue

        except Exception as exc:
            logger.warning(
                "Gemini API error for slide %d (attempt %d/%d): %s",
                slide_number,
                attempt + 1,
                MAX_RETRIES,
                exc,
            )
            last_error = exc
            if attempt < MAX_RETRIES - 1:
                delay = RETRY_BASE_DELAY * (2**attempt)
                logger.info("Retrying in %.1f seconds...", delay)
                time.sleep(delay)

    raise RuntimeError(
        f"Failed to enrich slide {slide_number} after {MAX_RETRIES} attempts"
    ) from last_error


def enrich_slides(image_paths: list[Path]) -> list[SlideEnrichment]:
    """Enrich multiple slide images sequentially.

    Args:
        image_paths: Ordered list of slide image paths.

    Returns:
        List of enrichment results, one per slide, in the same order.
    """
    results: list[SlideEnrichment] = []
    total = len(image_paths)

    for i, path in enumerate(image_paths, 1):
        logger.info("Enriching slide %d/%d: %s", i, total, path.name)
        enrichment = enrich_slide(path)
        results.append(enrichment)

    logger.info("Enrichment complete: %d slides processed", total)
    return results
