"""Pydantic models for API requests and responses."""

from pydantic import BaseModel


class EvaluateRequest(BaseModel):
    question: str
    user_answer: str
    model_answer: str
    key_points: list[str]
    topic_id: str


class EvaluateResponse(BaseModel):
    score: float
    is_correct: bool | str  # True, False, or "partial"
    feedback: str
    missing_concepts: list[str]
    suggestion: str


class HintRequest(BaseModel):
    question: str
    model_answer: str
    hint_level: int  # 1, 2, or 3
    previous_hints: list[str] = []


class HintResponse(BaseModel):
    hint: str
    hint_level: int
    hints_remaining: int


class RecommendRequest(BaseModel):
    recent_results: list[dict]
    completed_topics: list[str]


class RecommendResponse(BaseModel):
    weak_areas: list[str]
    recommended_topics: list[str]
    message: str
