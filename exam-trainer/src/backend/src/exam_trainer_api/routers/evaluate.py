"""Evaluate answer endpoint."""

import json
from fastapi import APIRouter, HTTPException

from exam_trainer_api.models import EvaluateRequest, EvaluateResponse
from exam_trainer_api.services import generate, EVALUATE_PROMPT, EVALUATE_CODE_PROMPT

router = APIRouter()


@router.post("/evaluate", response_model=EvaluateResponse)
def evaluate_answer(request: EvaluateRequest) -> EvaluateResponse:
    """Evaluate a user's answer using Gemini AI."""
    prompt_template = EVALUATE_CODE_PROMPT if request.question_type == "code-write" else EVALUATE_PROMPT
    prompt = prompt_template.format(
        question=request.question,
        model_answer=request.model_answer,
        key_points=", ".join(request.key_points),
        user_answer=request.user_answer,
    )

    try:
        response_text = generate(prompt, temperature=0.3)
        # Clean up response if wrapped in markdown code blocks
        response_text = response_text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("\n", 1)[1]
        if response_text.endswith("```"):
            response_text = response_text.rsplit("```", 1)[0]

        result = json.loads(response_text)
        return EvaluateResponse(**result)
    except json.JSONDecodeError as e:
        # Graceful fallback instead of HTTP 500
        return EvaluateResponse(
            score=0.0,
            is_correct=False,
            feedback="Die AI-Bewertung konnte nicht durchgeführt werden. Bitte vergleiche deine Antwort mit der Musterlösung.",
            missing_concepts=[],
            suggestion="Versuche es erneut oder nutze die Musterlösung zur Selbstbewertung."
        )
    except Exception as e:
        # Graceful fallback for any other errors
        return EvaluateResponse(
            score=0.0,
            is_correct=False,
            feedback=f"AI-Bewertung temporär nicht verfügbar. Bitte vergleiche deine Antwort manuell mit der Musterlösung.",
            missing_concepts=[],
            suggestion="Falls das Problem weiterhin besteht, überprüfe deine Internetverbindung."
        )
