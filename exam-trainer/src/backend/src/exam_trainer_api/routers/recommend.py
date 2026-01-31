"""Recommendations endpoint."""

import json
from fastapi import APIRouter, HTTPException

from exam_trainer_api.models import RecommendRequest, RecommendResponse
from exam_trainer_api.services import generate, RECOMMEND_PROMPT

router = APIRouter()


@router.post("/recommend", response_model=RecommendResponse)
def get_recommendations(request: RecommendRequest) -> RecommendResponse:
    """Get personalized learning recommendations."""
    prompt = RECOMMEND_PROMPT.format(
        recent_results=json.dumps(request.recent_results, indent=2),
        completed_topics=", ".join(request.completed_topics) if request.completed_topics else "Keine",
    )

    try:
        response_text = generate(prompt, temperature=0.7)
        response_text = response_text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("\n", 1)[1]
        if response_text.endswith("```"):
            response_text = response_text.rsplit("```", 1)[0]

        result = json.loads(response_text)
        return RecommendResponse(**result)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendations failed: {e}")
