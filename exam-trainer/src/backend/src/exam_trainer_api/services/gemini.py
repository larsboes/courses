"""Gemini AI client wrapper supporting both Vertex AI and direct API key."""

import os
from google import genai
from google.genai import types


def get_client() -> genai.Client:
    """Get configured Gemini client.

    Supports two modes:
    1. Direct API key (Google AI Studio): Set GEMINI_API_KEY env var
    2. Vertex AI (Google Cloud): Set VERTEX_PROJECT_ID and VERTEX_LOCATION

    If GEMINI_API_KEY is set, uses direct API. Otherwise falls back to Vertex AI.
    """
    api_key = os.environ.get("GEMINI_API_KEY")

    if api_key:
        # Direct API mode (Google AI Studio)
        return genai.Client(api_key=api_key)
    else:
        # Vertex AI mode (Google Cloud Project)
        return genai.Client(
            vertexai=True,
            project=os.environ.get("VERTEX_PROJECT_ID", "de0360-sbx-lars"),
            location=os.environ.get("VERTEX_LOCATION", "europe-west4"),
        )


def get_model() -> str:
    """Get the model name based on configuration mode."""
    api_key = os.environ.get("GEMINI_API_KEY")

    if api_key:
        # Direct API uses GEMINI_MODEL
        return os.environ.get("GEMINI_MODEL", "gemini-3-flash-preview")
    else:
        # Vertex AI uses VERTEX_MODEL
        return os.environ.get("VERTEX_MODEL", "gemini-3-flash-preview")


def generate(prompt: str, temperature: float = 0.7) -> str:
    """Generate a response from Gemini."""
    client = get_client()
    model = get_model()

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
