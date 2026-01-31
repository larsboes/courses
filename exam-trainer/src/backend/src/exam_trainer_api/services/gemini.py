"""Gemini AI client wrapper for Vertex AI."""

import os
from google import genai
from google.genai import types


def get_client() -> genai.Client:
    """Get configured Gemini client for Vertex AI."""
    return genai.Client(
        vertexai=True,
        project=os.environ.get("VERTEX_PROJECT_ID", "de0360-sbx-lars"),
        location=os.environ.get("VERTEX_LOCATION", "europe-west4"),
    )


def generate(prompt: str, temperature: float = 0.7) -> str:
    """Generate a response from Gemini."""
    client = get_client()
    model = os.environ.get("VERTEX_MODEL", "gemini-2.0-flash")

    config = types.GenerateContentConfig(
        temperature=temperature,
        max_output_tokens=2048,
    )

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )

    return response.text
