from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from exam_trainer_api.routers import (
    evaluate_router,
    hints_router,
    recommend_router,
    progress_router,
)

app = FastAPI(title="Exam Trainer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(evaluate_router, prefix="/api")
app.include_router(hints_router, prefix="/api")
app.include_router(recommend_router, prefix="/api")
app.include_router(progress_router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
