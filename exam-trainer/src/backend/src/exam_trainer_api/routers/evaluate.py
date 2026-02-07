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
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI evaluation failed: {e}")
