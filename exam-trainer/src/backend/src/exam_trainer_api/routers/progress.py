"""Progress tracking endpoints."""

import json
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

PROGRESS_FILE = Path("/data/progress.json")


class QuizAttempt(BaseModel):
    topic_id: str
    question_id: str
    question_type: str
    score: float
    user_answer: str
    hints_used: int = 0


def load_progress() -> dict:
    """Load progress from JSON file."""
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text())
    return {
        "last_updated": None,
        "quiz_attempts": [],
        "topic_scores": {},
        "weak_areas": [],
    }


def save_progress(progress: dict) -> None:
    """Save progress to JSON file."""
    progress["last_updated"] = datetime.now().isoformat()
    PROGRESS_FILE.write_text(json.dumps(progress, indent=2))


@router.get("/progress")
def get_progress():
    """Get full progress data."""
    return load_progress()


@router.post("/progress/save")
def save_quiz_attempt(attempt: QuizAttempt):
    """Save a quiz attempt to progress."""
    progress = load_progress()

    # Add attempt
    progress["quiz_attempts"].append({
        "timestamp": datetime.now().isoformat(),
        **attempt.model_dump(),
    })

    # Update topic scores
    topic = attempt.topic_id
    if topic not in progress["topic_scores"]:
        progress["topic_scores"][topic] = {"attempts": 0, "total_score": 0}

    progress["topic_scores"][topic]["attempts"] += 1
    progress["topic_scores"][topic]["total_score"] += attempt.score
    progress["topic_scores"][topic]["avg_score"] = (
        progress["topic_scores"][topic]["total_score"]
        / progress["topic_scores"][topic]["attempts"]
    )

    save_progress(progress)
    return {"status": "saved", "topic_scores": progress["topic_scores"]}
