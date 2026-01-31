"""Hint endpoint."""

import json
from fastapi import APIRouter, HTTPException

from exam_trainer_api.models import HintRequest, HintResponse
from exam_trainer_api.services import generate, HINT_PROMPT

router = APIRouter()


@router.post("/hint", response_model=HintResponse)
def get_hint(request: HintRequest) -> HintResponse:
    """Get a progressive hint for a question."""
    if request.hint_level < 1 or request.hint_level > 3:
        raise HTTPException(status_code=400, detail="hint_level must be 1, 2, or 3")

    prompt = HINT_PROMPT.format(
        question=request.question,
        model_answer=request.model_answer,
        hint_level=request.hint_level,
        previous_hints="\n".join(request.previous_hints) if request.previous_hints else "Keine",
    )

    try:
        response_text = generate(prompt, temperature=0.7)
        response_text = response_text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("\n", 1)[1]
        if response_text.endswith("```"):
            response_text = response_text.rsplit("```", 1)[0]

        result = json.loads(response_text)
        result["hints_remaining"] = 3 - request.hint_level
        return HintResponse(**result)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hint generation failed: {e}")
