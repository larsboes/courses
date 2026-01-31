# AI Backend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Python/FastAPI backend with Gemini AI for answer evaluation, hints, and recommendations.

**Architecture:** Restructure project into `src/frontend` + `src/backend`, update Docker Compose to run both services. Backend handles all AI operations via Vertex AI, stores progress in `data/progress.json`.

**Tech Stack:** FastAPI, Python 3.12, google-genai SDK, Pydantic, uv (package manager), Docker Compose

---

## Phase 0: Project Restructure

### Task 1: Create new directory structure

**Files:**
- Create: `src/frontend/` (directory)
- Create: `src/backend/` (directory)
- Create: `data/` (directory)

**Step 1: Create directories**

```bash
mkdir -p src/frontend src/backend data
```

**Step 2: Initialize progress.json**

Create `data/progress.json`:

```json
{
  "last_updated": null,
  "quiz_attempts": [],
  "topic_scores": {},
  "weak_areas": []
}
```

**Step 3: Commit**

```bash
git add data/progress.json
git commit -m "chore: create directory structure for frontend/backend split"
```

---

### Task 2: Move frontend files

**Files:**
- Move: `src/*` → `src/frontend/` (except backend folder)

**Step 1: Move all current src contents to frontend**

```bash
# Move everything except the new directories
mv src/App.tsx src/frontend/
mv src/main.tsx src/frontend/
mv src/vite-env.d.ts src/frontend/
mv src/index.css src/frontend/
mv src/core src/frontend/
mv src/content src/frontend/
mv src/pages src/frontend/
```

**Step 2: Verify structure**

```bash
ls src/frontend/
```

Expected: `App.tsx  content  core  index.css  main.tsx  pages  vite-env.d.ts`

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor: move frontend code to src/frontend/"
```

---

### Task 3: Update Vite config for new structure

**Files:**
- Modify: `vite.config.ts`

**Step 1: Update vite.config.ts**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'src/frontend',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
})
```

**Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "config: update vite for src/frontend root with API proxy"
```

---

### Task 4: Update TypeScript config

**Files:**
- Modify: `tsconfig.json`

**Step 1: Update tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/frontend/*"]
    }
  },
  "include": ["src/frontend"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "config: update tsconfig paths for src/frontend"
```

---

### Task 5: Update index.html path

**Files:**
- Move: `index.html` → `src/frontend/index.html`

**Step 1: Move index.html**

```bash
mv index.html src/frontend/
```

**Step 2: Commit**

```bash
git add -A
git commit -m "refactor: move index.html to src/frontend"
```

---

### Task 6: Verify frontend still works

**Step 1: Install dependencies and run dev**

```bash
bun install
bun run dev
```

**Step 2: Verify in browser**

Open http://localhost:5173 - should load the app normally.

**Step 3: Verify build**

```bash
bun run build
```

Expected: Build succeeds, outputs to `dist/`

**Step 4: Commit any fixes if needed**

```bash
git add -A
git commit -m "fix: resolve any path issues after restructure"
```

---

## Phase 1: Backend Foundation

### Task 7: Create backend project with uv

**Files:**
- Create: `src/backend/pyproject.toml`
- Create: `src/backend/src/exam_trainer_api/__init__.py`
- Create: `src/backend/src/exam_trainer_api/main.py`

**Step 1: Initialize uv project**

```bash
cd src/backend
uv init --name exam-trainer-api --package
```

**Step 2: Replace pyproject.toml**

```toml
[project]
name = "exam-trainer-api"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.32.0",
    "google-genai>=1.0.0",
    "pydantic>=2.10.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

**Step 3: Create main.py**

Create `src/backend/src/exam_trainer_api/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Exam Trainer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}
```

**Step 4: Create __init__.py**

Create `src/backend/src/exam_trainer_api/__init__.py`:

```python
"""Exam Trainer API - AI-powered exam preparation backend."""
```

**Step 5: Sync dependencies**

```bash
uv sync
```

**Step 6: Test the server**

```bash
uv run uvicorn exam_trainer_api.main:app --reload --port 8000
```

**Step 7: Verify health endpoint**

```bash
curl http://localhost:8000/api/health
```

Expected: `{"status":"ok"}`

**Step 8: Return to project root and commit**

```bash
cd ../..
git add src/backend/
git commit -m "feat(backend): initialize FastAPI project with health endpoint"
```

---

### Task 8: Create backend Dockerfile

**Files:**
- Create: `src/backend/Dockerfile`

**Step 1: Create Dockerfile**

Create `src/backend/Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install uv
RUN pip install uv

# Copy project files
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# Copy source
COPY src/ ./src/

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "exam_trainer_api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

**Step 2: Commit**

```bash
git add src/backend/Dockerfile
git commit -m "feat(backend): add Dockerfile"
```

---

### Task 9: Update Docker Compose for both services

**Files:**
- Modify: `docker-compose.yml`

**Step 1: Replace docker-compose.yml**

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - backend

  backend:
    build:
      context: ./src/backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./src/backend/src:/app/src
      - ./data:/app/data
      - ~/.config/gcloud:/root/.config/gcloud:ro
    environment:
      - VERTEX_PROJECT_ID=${VERTEX_PROJECT_ID:-de0360-sbx-lars}
      - VERTEX_LOCATION=${VERTEX_LOCATION:-europe-west4}
      - VERTEX_MODEL=${VERTEX_MODEL:-gemini-2.0-flash}
```

**Step 2: Commit**

```bash
git add docker-compose.yml
git commit -m "config: update docker-compose for frontend + backend services"
```

---

### Task 10: Update frontend Dockerfile for new structure

**Files:**
- Modify: `Dockerfile`

**Step 1: Update root Dockerfile**

```dockerfile
# Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Development - dependencies mounted from host
FROM base AS dev
EXPOSE 5173
CMD ["bun", "run", "dev"]

# Build (for production)
FROM base AS builder
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Step 2: Commit**

```bash
git add Dockerfile
git commit -m "config: update frontend Dockerfile"
```

---

### Task 11: Test full Docker Compose setup

**Step 1: Build and start services**

```bash
docker compose up --build
```

**Step 2: Verify frontend**

Open http://localhost:5173 - app should load

**Step 3: Verify backend**

```bash
curl http://localhost:8000/api/health
```

Expected: `{"status":"ok"}`

**Step 4: Verify proxy works**

```bash
curl http://localhost:5173/api/health
```

Expected: `{"status":"ok"}` (proxied through Vite)

**Step 5: Commit if any fixes needed**

```bash
git add -A
git commit -m "fix: docker compose setup"
```

---

## Phase 2: Gemini Integration

### Task 12: Create Gemini service

**Files:**
- Create: `src/backend/src/exam_trainer_api/services/__init__.py`
- Create: `src/backend/src/exam_trainer_api/services/gemini.py`

**Step 1: Create services directory**

```bash
mkdir -p src/backend/src/exam_trainer_api/services
touch src/backend/src/exam_trainer_api/services/__init__.py
```

**Step 2: Create gemini.py**

Create `src/backend/src/exam_trainer_api/services/gemini.py`:

```python
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
```

**Step 3: Update services __init__.py**

```python
from .gemini import generate, get_client

__all__ = ["generate", "get_client"]
```

**Step 4: Commit**

```bash
git add src/backend/src/exam_trainer_api/services/
git commit -m "feat(backend): add Gemini service wrapper"
```

---

### Task 13: Create Pydantic models

**Files:**
- Create: `src/backend/src/exam_trainer_api/models/__init__.py`
- Create: `src/backend/src/exam_trainer_api/models/schemas.py`

**Step 1: Create models directory**

```bash
mkdir -p src/backend/src/exam_trainer_api/models
```

**Step 2: Create schemas.py**

Create `src/backend/src/exam_trainer_api/models/schemas.py`:

```python
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
```

**Step 3: Create __init__.py**

Create `src/backend/src/exam_trainer_api/models/__init__.py`:

```python
from .schemas import (
    EvaluateRequest,
    EvaluateResponse,
    HintRequest,
    HintResponse,
    RecommendRequest,
    RecommendResponse,
)

__all__ = [
    "EvaluateRequest",
    "EvaluateResponse",
    "HintRequest",
    "HintResponse",
    "RecommendRequest",
    "RecommendResponse",
]
```

**Step 4: Commit**

```bash
git add src/backend/src/exam_trainer_api/models/
git commit -m "feat(backend): add Pydantic models for API"
```

---

### Task 14: Create prompts module

**Files:**
- Create: `src/backend/src/exam_trainer_api/services/prompts.py`

**Step 1: Create prompts.py**

Create `src/backend/src/exam_trainer_api/services/prompts.py`:

```python
"""Prompt templates for Gemini AI."""

EVALUATE_PROMPT = """Du bist ein Pruefer fuer Web Technologies Klausuren.

FRAGE: {question}

MUSTERLOESUNG: {model_answer}

WICHTIGE PUNKTE: {key_points}

ANTWORT DES STUDENTEN: {user_answer}

Bewerte die Antwort. Antworte NUR mit diesem JSON (keine Markdown-Codeblocks):

{{
  "score": <0.0-1.0>,
  "is_correct": <true/false/"partial">,
  "feedback": "<Was war richtig, was fehlt - ermutigend aber praezise>",
  "missing_concepts": ["<fehlende Konzepte>"],
  "suggestion": "<konkreter Lernvorschlag>"
}}

Bewertungskriterien:
- Kernkonzepte muessen genannt werden
- Teilpunkte fuer unvollstaendige aber korrekte Antworten
- Sprache: Deutsch
"""

HINT_PROMPT = """Du hilfst einem Studenten bei einer Pruefungsfrage.

FRAGE: {question}

RICHTIGE ANTWORT (nicht verraten!): {model_answer}

HINT-LEVEL: {hint_level}/3
- Level 1: Sehr vage, nur Denkrichtung
- Level 2: Konkreter Hinweis auf ein Teilkonzept
- Level 3: Fast die Antwort, nur noch Formulierung fehlt

BISHERIGE HINTS: {previous_hints}

Gib einen Hint fuer Level {hint_level}. Wiederhole keine bisherigen Hints.
Verrate niemals die komplette Antwort direkt.

Antworte NUR mit diesem JSON (keine Markdown-Codeblocks):

{{
  "hint": "<dein Hint>",
  "hint_level": {hint_level}
}}
"""

RECOMMEND_PROMPT = """Analysiere die Lernhistorie eines Studenten.

LETZTE QUIZ-ERGEBNISSE:
{recent_results}

ABGESCHLOSSENE THEMEN: {completed_topics}

VERFUEGBARE THEMEN: http, json, html, css, javascript-dom, rest, kubernetes-begriffe, kubernetes-manifests, kubernetes-netzwerk, dns-tls

Identifiziere Schwaechen und empfehle naechste Schritte.

Antworte NUR mit diesem JSON (keine Markdown-Codeblocks):

{{
  "weak_areas": ["<Themengebiete mit Schwaechen>"],
  "recommended_topics": ["<topic_ids zum Wiederholen>"],
  "message": "<Persoenliche, ermutigende Empfehlung auf Deutsch>"
}}
"""
```

**Step 2: Update services __init__.py**

```python
from .gemini import generate, get_client
from .prompts import EVALUATE_PROMPT, HINT_PROMPT, RECOMMEND_PROMPT

__all__ = [
    "generate",
    "get_client",
    "EVALUATE_PROMPT",
    "HINT_PROMPT",
    "RECOMMEND_PROMPT",
]
```

**Step 3: Commit**

```bash
git add src/backend/src/exam_trainer_api/services/
git commit -m "feat(backend): add prompt templates"
```

---

### Task 15: Create evaluate router

**Files:**
- Create: `src/backend/src/exam_trainer_api/routers/__init__.py`
- Create: `src/backend/src/exam_trainer_api/routers/evaluate.py`

**Step 1: Create routers directory**

```bash
mkdir -p src/backend/src/exam_trainer_api/routers
```

**Step 2: Create evaluate.py**

Create `src/backend/src/exam_trainer_api/routers/evaluate.py`:

```python
"""Evaluate answer endpoint."""

import json
from fastapi import APIRouter, HTTPException

from exam_trainer_api.models import EvaluateRequest, EvaluateResponse
from exam_trainer_api.services import generate, EVALUATE_PROMPT

router = APIRouter()


@router.post("/evaluate", response_model=EvaluateResponse)
def evaluate_answer(request: EvaluateRequest) -> EvaluateResponse:
    """Evaluate a user's answer using Gemini AI."""
    prompt = EVALUATE_PROMPT.format(
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
```

**Step 3: Create routers __init__.py**

```python
from .evaluate import router as evaluate_router

__all__ = ["evaluate_router"]
```

**Step 4: Commit**

```bash
git add src/backend/src/exam_trainer_api/routers/
git commit -m "feat(backend): add evaluate endpoint"
```

---

### Task 16: Register router in main.py

**Files:**
- Modify: `src/backend/src/exam_trainer_api/main.py`

**Step 1: Update main.py**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from exam_trainer_api.routers import evaluate_router

app = FastAPI(title="Exam Trainer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(evaluate_router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
```

**Step 2: Test endpoint**

```bash
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Was bedeutet HTTP zustandslos?",
    "user_answer": "Der Server speichert nichts zwischen Requests",
    "model_answer": "Zustandslos bedeutet, dass jeder Request unabhaengig ist. Der Server erinnert sich nicht an vorherige Requests.",
    "key_points": ["Jeder Request unabhaengig", "Server speichert nichts"],
    "topic_id": "http"
  }'
```

Expected: JSON response with score, feedback, etc.

**Step 3: Commit**

```bash
git add src/backend/src/exam_trainer_api/main.py
git commit -m "feat(backend): register evaluate router"
```

---

### Task 17: Create hint router

**Files:**
- Create: `src/backend/src/exam_trainer_api/routers/hints.py`

**Step 1: Create hints.py**

Create `src/backend/src/exam_trainer_api/routers/hints.py`:

```python
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
```

**Step 2: Update routers __init__.py**

```python
from .evaluate import router as evaluate_router
from .hints import router as hints_router

__all__ = ["evaluate_router", "hints_router"]
```

**Step 3: Register in main.py**

Add to imports and include router:

```python
from exam_trainer_api.routers import evaluate_router, hints_router

# ... after evaluate_router
app.include_router(hints_router, prefix="/api")
```

**Step 4: Commit**

```bash
git add src/backend/src/exam_trainer_api/routers/
git add src/backend/src/exam_trainer_api/main.py
git commit -m "feat(backend): add hint endpoint"
```

---

### Task 18: Create recommend router

**Files:**
- Create: `src/backend/src/exam_trainer_api/routers/recommend.py`

**Step 1: Create recommend.py**

Create `src/backend/src/exam_trainer_api/routers/recommend.py`:

```python
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
```

**Step 2: Update routers __init__.py and main.py**

Add imports and register router similar to Task 17.

**Step 3: Commit**

```bash
git add src/backend/src/exam_trainer_api/
git commit -m "feat(backend): add recommend endpoint"
```

---

### Task 19: Create progress router

**Files:**
- Create: `src/backend/src/exam_trainer_api/routers/progress.py`

**Step 1: Create progress.py**

Create `src/backend/src/exam_trainer_api/routers/progress.py`:

```python
"""Progress tracking endpoints."""

import json
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

PROGRESS_FILE = Path("/app/data/progress.json")


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
```

**Step 2: Update routers __init__.py and main.py**

Add imports and register router.

**Step 3: Commit**

```bash
git add src/backend/src/exam_trainer_api/
git commit -m "feat(backend): add progress tracking endpoints"
```

---

## Phase 3: Frontend Integration

### Task 20: Create API client service

**Files:**
- Create: `src/frontend/core/services/api.ts`

**Step 1: Create services directory**

```bash
mkdir -p src/frontend/core/services
```

**Step 2: Create api.ts**

Create `src/frontend/core/services/api.ts`:

```typescript
// src/frontend/core/services/api.ts

const API_BASE = '/api'

export interface EvaluateRequest {
  question: string
  user_answer: string
  model_answer: string
  key_points: string[]
  topic_id: string
}

export interface EvaluateResponse {
  score: number
  is_correct: boolean | 'partial'
  feedback: string
  missing_concepts: string[]
  suggestion: string
}

export interface HintRequest {
  question: string
  model_answer: string
  hint_level: number
  previous_hints: string[]
}

export interface HintResponse {
  hint: string
  hint_level: number
  hints_remaining: number
}

export async function evaluateAnswer(data: EvaluateRequest): Promise<EvaluateResponse> {
  const res = await fetch(`${API_BASE}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Evaluation failed: ${res.statusText}`)
  return res.json()
}

export async function getHint(data: HintRequest): Promise<HintResponse> {
  const res = await fetch(`${API_BASE}/hint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Hint failed: ${res.statusText}`)
  return res.json()
}

export async function saveProgress(data: {
  topic_id: string
  question_id: string
  question_type: string
  score: number
  user_answer: string
  hints_used: number
}): Promise<void> {
  await fetch(`${API_BASE}/progress/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
```

**Step 3: Commit**

```bash
git add src/frontend/core/services/
git commit -m "feat(frontend): add API client service"
```

---

### Task 21: Update FreeTextQuestion to use AI evaluation

**Files:**
- Modify: `src/frontend/core/components/quiz/FreeTextQuestion.tsx`

**Step 1: Update FreeTextQuestion.tsx**

Replace the component with AI-integrated version:

```tsx
// src/frontend/core/components/quiz/FreeTextQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { evaluateAnswer, type EvaluateResponse } from '@/core/services/api'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'

interface FreeTextQuestionProps {
  question: FreeTextQuestionType
  topicId: string
  onSubmit: (answer: string) => void
  showingResult: boolean
}

export function FreeTextQuestion({
  question,
  topicId,
  onSubmit,
  showingResult,
}: FreeTextQuestionProps) {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [evaluation, setEvaluation] = useState<EvaluateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!answer.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await evaluateAnswer({
        question: question.question,
        user_answer: answer,
        model_answer: question.modelAnswer,
        key_points: question.keyPoints,
        topic_id: topicId,
      })
      setEvaluation(result)
      onSubmit(answer)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Evaluation failed')
      // Fallback to showing model answer
      onSubmit(answer)
    } finally {
      setIsLoading(false)
    }
  }

  const scoreColor = evaluation
    ? evaluation.score >= 0.8
      ? 'text-green-400'
      : evaluation.score >= 0.5
      ? 'text-amber-400'
      : 'text-red-400'
    : ''

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">{question.question}</div>

      <textarea
        aria-label={question.question}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={question.placeholder || 'Deine Antwort...'}
        disabled={showingResult || isLoading}
        className={`
          w-full h-48 p-4 rounded-lg border-2 bg-slate-900 text-slate-100
          font-mono text-sm resize-none
          ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
          focus:outline-none
        `}
      />

      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Wird ausgewertet...' : 'Antwort pruefen'}
        </Button>
      )}

      {error && (
        <Card className="p-4 bg-red-900/20 border-red-700">
          <div className="text-sm text-red-300">{error}</div>
        </Card>
      )}

      {showingResult && evaluation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Score */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-medium">Bewertung:</span>
              <span className={`text-2xl font-bold ${scoreColor}`}>
                {Math.round(evaluation.score * 100)}%
              </span>
            </div>
          </Card>

          {/* Feedback */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Feedback:</div>
            <p className="text-slate-300">{evaluation.feedback}</p>
          </Card>

          {/* Missing Concepts */}
          {evaluation.missing_concepts.length > 0 && (
            <Card className="p-4 bg-amber-900/20 border-amber-700">
              <div className="font-medium mb-2">Fehlende Konzepte:</div>
              <ul className="space-y-1">
                {evaluation.missing_concepts.map((concept, i) => (
                  <li key={i} className="text-sm text-slate-300">• {concept}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* Suggestion */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-green-400">Tipp:</div>
            <p className="text-sm text-slate-300">{evaluation.suggestion}</p>
          </Card>

          {/* Model Answer (collapsible) */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300">
              Musterantwort anzeigen
            </summary>
            <Card className="mt-2 p-4 bg-slate-800/50 border-slate-600">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {question.modelAnswer}
              </pre>
            </Card>
          </details>
        </motion.div>
      )}

      {/* Fallback when no AI evaluation */}
      {showingResult && !evaluation && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Musterantwort:</div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {question.modelAnswer}
            </pre>
          </Card>
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-3">Wichtige Punkte:</div>
            <ul className="space-y-2">
              {question.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
```

**Step 2: Update QuizQuestion to pass topicId**

This requires updating the parent component to pass `topicId` prop.

**Step 3: Commit**

```bash
git add src/frontend/core/components/quiz/FreeTextQuestion.tsx
git commit -m "feat(frontend): integrate AI evaluation into FreeTextQuestion"
```

---

### Task 22: Create HintButton component

**Files:**
- Create: `src/frontend/core/components/quiz/HintButton.tsx`

**Step 1: Create HintButton.tsx**

```tsx
// src/frontend/core/components/quiz/HintButton.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { getHint, type HintResponse } from '@/core/services/api'

interface HintButtonProps {
  question: string
  modelAnswer: string
  disabled?: boolean
}

export function HintButton({ question, modelAnswer, disabled }: HintButtonProps) {
  const [hints, setHints] = useState<string[]>([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetHint = async () => {
    if (currentLevel >= 3) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await getHint({
        question,
        model_answer: modelAnswer,
        hint_level: currentLevel + 1,
        previous_hints: hints,
      })
      setHints([...hints, result.hint])
      setCurrentLevel(result.hint_level)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to get hint')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleGetHint}
        disabled={disabled || currentLevel >= 3 || isLoading}
        className="bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
      >
        {isLoading
          ? 'Lade Hint...'
          : currentLevel >= 3
          ? 'Keine Hints mehr'
          : `Hint ${currentLevel + 1}/3 anfordern`}
      </Button>

      {error && (
        <div className="text-sm text-red-400">{error}</div>
      )}

      <AnimatePresence>
        {hints.map((hint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-3 bg-amber-900/20 border-amber-700/50">
              <div className="text-xs text-amber-400 mb-1">Hint {i + 1}</div>
              <div className="text-sm text-slate-300">{hint}</div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Export from index**

Add to `src/frontend/core/components/quiz/index.ts`:

```typescript
export { HintButton } from './HintButton'
```

**Step 3: Commit**

```bash
git add src/frontend/core/components/quiz/HintButton.tsx
git add src/frontend/core/components/quiz/index.ts
git commit -m "feat(frontend): add HintButton component"
```

---

## Phase 4: Final Integration

### Task 23: Integrate HintButton into FreeTextQuestion

**Files:**
- Modify: `src/frontend/core/components/quiz/FreeTextQuestion.tsx`

**Step 1: Add HintButton import and usage**

Add import:
```typescript
import { HintButton } from './HintButton'
```

Add before the submit button:
```tsx
{!showingResult && (
  <HintButton
    question={question.question}
    modelAnswer={question.modelAnswer}
    disabled={isLoading}
  />
)}
```

**Step 2: Commit**

```bash
git add src/frontend/core/components/quiz/FreeTextQuestion.tsx
git commit -m "feat(frontend): integrate HintButton into FreeTextQuestion"
```

---

### Task 24: End-to-end test

**Step 1: Start services**

```bash
docker compose up --build
```

**Step 2: Test flow**

1. Open http://localhost:5173
2. Navigate to Web Technologies → HTTP → Quiz
3. Find a free-text question
4. Request hints (should get 3 progressive hints)
5. Submit an answer
6. Verify AI feedback appears with score, feedback, missing concepts

**Step 3: Verify progress saved**

```bash
cat data/progress.json
```

Should show the quiz attempt.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete AI evaluation integration"
```

---

## Summary

| Phase | Tasks | What it delivers |
|-------|-------|------------------|
| 0 | 1-6 | Project restructured to src/frontend + src/backend |
| 1 | 7-11 | Backend foundation with Docker |
| 2 | 12-19 | All API endpoints (evaluate, hint, recommend, progress) |
| 3 | 20-22 | Frontend API client and updated components |
| 4 | 23-24 | Full integration and testing |

**Total: 24 tasks**
