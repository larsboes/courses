# AI Evaluation Backend for Exam-Trainer

**Date:** 2025-01-31
**Status:** Draft
**Goal:** Add AI-powered evaluation, hints, and learning recommendations to exam-trainer

---

## Section 1: Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        exam-trainer                              │
├──────────────────────────┬──────────────────────────────────────┤
│   Frontend (existing)    │         Backend (new)                │
│   React + Vite           │         FastAPI + Python             │
│   :5173                  │         :8000                        │
├──────────────────────────┼──────────────────────────────────────┤
│                          │                                      │
│  Quiz UI ─────────────────► POST /api/evaluate-answer          │
│  (sends: question,       │     └─► Gemini API (Vertex)         │
│   user_answer,           │         - evaluate correctness       │
│   correct_answer,        │         - explain why wrong          │
│   context)               │         - return structured feedback │
│                          │                                      │
│  Hint Button ─────────────► POST /api/hint                     │
│  (sends: question,       │     └─► Gemini API                  │
│   hint_level: 1-3)       │         - progressive hints          │
│                          │                                      │
│  Results Page ────────────► POST /api/recommendations          │
│  (sends: quiz_results,   │     └─► Gemini API                  │
│   topic_history)         │         - learning path suggestions  │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
```

**Key Decisions:**
- Backend is **stateless** for AI calls - context comes from frontend
- Progress stored in **JSON file** committed to git (multi-device sync via git)
- Three focused endpoints instead of generic chat
- Gemini Flash for hints (fast/cheap), Pro available for complex evaluations

**Docker Compose Services:**
- `frontend`: Existing Vite dev server (port 5173)
- `backend`: New FastAPI service (port 8000, mounts GCP credentials)

---

## Section 2: Backend Structure

```
exam-trainer/
├── backend/
│   ├── pyproject.toml          # uv project config
│   ├── Dockerfile
│   ├── src/
│   │   └── exam_trainer_api/
│   │       ├── __init__.py
│   │       ├── main.py         # FastAPI app
│   │       ├── routers/
│   │       │   ├── evaluate.py # POST /api/evaluate-answer
│   │       │   ├── hints.py    # POST /api/hint
│   │       │   └── progress.py # GET/POST /api/progress
│   │       ├── services/
│   │       │   ├── gemini.py   # Vertex AI client wrapper
│   │       │   └── prompts.py  # Prompt templates
│   │       └── models/
│   │           └── schemas.py  # Pydantic models
│   └── data/
│       └── progress.json       # Committed to git
├── docker-compose.yml          # Updated: adds backend service
└── frontend/                   # Existing
```

**Key Files:**
- `gemini.py` - Wraps google-genai SDK, handles streaming responses
- `prompts.py` - Structured prompt templates for each AI feature
- `progress.json` - Learning history, git-tracked for multi-device sync

**Environment Variables (container):**
```yaml
environment:
  - VERTEX_PROJECT_ID=de0360-sbx-lars
  - VERTEX_LOCATION=europe-west4
  - VERTEX_MODEL=gemini-3-flash-preview
```

---

## Section 3: API Endpoints & Data Models

### 3.1 Evaluate Answer Endpoint

```
POST /api/evaluate-answer

Request:
{
  "question": "Was hat REST mit HTTP zu tun?",
  "question_type": "free-text" | "multiple-choice" | "multi-select",
  "user_answer": "REST nutzt HTTP Methoden wie GET und POST",
  "correct_answer": "REST ist ein Architekturstil... (full model answer)",
  "topic_context": "HTTP Grundlagen",
  "options": [...]  // only for multiple-choice
}

Response:
{
  "is_correct": true | false | "partial",
  "score": 0.0 - 1.0,
  "feedback": "Du hast die Verbindung richtig erkannt. Was fehlt: ...",
  "missing_concepts": ["Zustandslosigkeit", "HATEOAS"],
  "suggestion": "Lies nochmal den Abschnitt über REST-Prinzipien"
}
```

### 3.2 Hint Endpoint

```
POST /api/hint

Request:
{
  "question": "Beschreiben Sie die Schritte vom HTML-Empfang bis zur Darstellung",
  "hint_level": 1 | 2 | 3,
  "correct_answer": "...",
  "previous_hints": ["..."]
}

Response:
{
  "hint": "Denk an die zwei Object Models, die der Browser zuerst erstellt...",
  "hint_level": 1,
  "hints_remaining": 2
}
```

### 3.3 Progress Endpoints

```
GET /api/progress
→ Returns full progress.json content

POST /api/progress/quiz-result
Request:
{
  "topic_id": "http",
  "score": 2,
  "total": 3,
  "wrong_answers": [
    {"question_id": "q2", "user_answer": "...", "correct_answer": "..."}
  ]
}
→ Appends to progress.json, returns updated progress

POST /api/recommendations
Request:
{
  "recent_results": [...],
  "completed_topics": [...]
}

Response:
{
  "weak_areas": ["REST Prinzipien", "CSS Selektoren"],
  "recommended_topics": ["http", "css-basics"],
  "message": "Du verwechselst oft REST mit HTTP. Fokussiere auf..."
}
```

### 3.4 Progress Data Structure

**progress.json:**
```json
{
  "quiz_attempts": [
    {
      "timestamp": "2025-01-31T14:30:00Z",
      "topic_id": "http",
      "score": 2,
      "total": 3,
      "wrong_answers": [
        {
          "question_id": "q2",
          "question": "Welche HTTP-Methoden sind idempotent?",
          "user_answer": ["GET", "POST"],
          "correct_answer": ["GET", "PUT", "DELETE"]
        }
      ]
    }
  ],
  "topics_completed": ["html-basics", "css-basics"],
  "last_sync": "2025-01-31T14:30:00Z"
}
```

---

## Section 4: Gemini Integration

### 4.1 Client Setup

Using `google-genai` SDK with Vertex AI:

```python
from google import genai
from google.genai import types
import os

def get_client():
    return genai.Client(
        vertexai=True,
        project=os.environ["VERTEX_PROJECT_ID"],
        location=os.environ["VERTEX_LOCATION"],
    )

def generate_response(prompt: str, model: str = None, stream: bool = False):
    client = get_client()
    model = model or os.environ.get("VERTEX_MODEL", "gemini-3-flash-preview")

    config = types.GenerateContentConfig(
        temperature=0.7,  # Lower for evaluation, higher for hints
        max_output_tokens=2048,
    )

    if stream:
        return client.models.generate_content_stream(
            model=model,
            contents=[types.Content(role="user", parts=[types.Part(text=prompt)])],
            config=config,
        )
    else:
        response = client.models.generate_content(
            model=model,
            contents=[types.Content(role="user", parts=[types.Part(text=prompt)])],
            config=config,
        )
        return response.text
```

### 4.2 Authentication

GCP Application Default Credentials (ADC):
- Local dev: `gcloud auth application-default login`
- Docker: Mount credentials volume

```yaml
# docker-compose.yml
backend:
  volumes:
    - ~/.config/gcloud:/root/.config/gcloud:ro
```

---

## Section 5: Prompt Engineering

### 5.1 Answer Evaluation Prompt

```python
EVALUATE_PROMPT = """Du bist ein Prüfer für Web Technologies Klausuren.

FRAGE: {question}

MUSTERLÖSUNG: {correct_answer}

ANTWORT DES STUDENTEN: {user_answer}

Bewerte die Antwort des Studenten. Antworte im folgenden JSON-Format:

{{
  "is_correct": true/false/"partial",
  "score": 0.0-1.0,
  "feedback": "Erkläre was richtig war und was fehlt. Sei ermutigend aber präzise.",
  "missing_concepts": ["Liste der fehlenden Konzepte"],
  "suggestion": "Konkreter Lernvorschlag"
}}

Bewertungskriterien:
- Kernkonzepte müssen genannt werden
- Fachbegriffe sollten korrekt verwendet werden
- Teilpunkte für unvollständige aber korrekte Antworten
- Sprache: Deutsch
"""
```

### 5.2 Hint Generation Prompt

```python
HINT_PROMPT = """Du hilfst einem Studenten bei einer Prüfungsfrage.

FRAGE: {question}

RICHTIGE ANTWORT (nicht verraten!): {correct_answer}

HINT-LEVEL: {hint_level}/3
- Level 1: Sehr vage, nur Denkrichtung
- Level 2: Konkreter Hinweis auf ein Teilkonzept
- Level 3: Fast die Antwort, nur noch Formulierung fehlt

BISHERIGE HINTS: {previous_hints}

Gib einen Hint für Level {hint_level}. Wiederhole keine bisherigen Hints.
Verrate niemals die komplette Antwort direkt.

Antwort als JSON:
{{
  "hint": "Dein Hint hier",
  "hint_level": {hint_level}
}}
"""
```

### 5.3 Recommendations Prompt

```python
RECOMMEND_PROMPT = """Analysiere die Lernhistorie eines Studenten.

LETZTE QUIZ-ERGEBNISSE:
{recent_results}

ABGESCHLOSSENE THEMEN: {completed_topics}

VERFÜGBARE THEMEN: {available_topics}

Identifiziere Schwächen und empfehle nächste Schritte.

Antwort als JSON:
{{
  "weak_areas": ["Themengebiete mit Schwächen"],
  "recommended_topics": ["topic_ids zum Wiederholen"],
  "message": "Persönliche, ermutigende Empfehlung auf Deutsch"
}}
"""
```

---

## Section 6: Frontend Integration

### 6.1 New Components

**FreeTextQuestion.tsx** - New question type:
```typescript
// Textarea for answer input
// Submit button triggers /api/evaluate-answer
// Display AI feedback with score and missing concepts
```

**HintButton.tsx** - Add to QuizQuestion:
```typescript
// "Hint anfordern" button
// Tracks hint_level (1→2→3)
// Displays hint in collapsible panel
// Disabled after level 3
```

**AIFeedback.tsx** - Enhanced feedback display:
```typescript
// Shows personalized "why wrong" explanation
// Lists missing_concepts as chips
// Shows suggestion for improvement
```

**RecommendationsPanel.tsx** - Add to QuizResults:
```typescript
// Calls /api/recommendations after quiz
// Shows weak areas and suggested topics
// Links to recommended topics
```

### 6.2 API Client

```typescript
// src/core/services/api.ts

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function evaluateAnswer(data: EvaluateRequest): Promise<EvaluateResponse> {
  const res = await fetch(`${API_BASE}/api/evaluate-answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getHint(data: HintRequest): Promise<HintResponse> {
  const res = await fetch(`${API_BASE}/api/hint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function saveProgress(data: QuizResult): Promise<Progress> {
  const res = await fetch(`${API_BASE}/api/progress/quiz-result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getRecommendations(data: RecommendRequest): Promise<Recommendations> {
  const res = await fetch(`${API_BASE}/api/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

### 6.3 Type Updates

Add to `content.ts`:
```typescript
export type QuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'order-steps'
  | 'match-pairs'
  | 'identify-error'
  | 'fill-blank'
  | 'system-builder'
  | 'free-text';  // NEW

export interface FreeTextQuestion extends BaseQuestion {
  type: 'free-text';
  question: string;
  modelAnswer: string;  // Used by AI for evaluation
  keywords?: string[];  // Optional: key concepts that should appear
}
```

---

## Section 7: Docker Setup

### 7.1 Backend Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install uv
RUN pip install uv

# Copy project files
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

COPY src/ ./src/
COPY data/ ./data/

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "exam_trainer_api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

### 7.2 Updated docker-compose.yml

```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./frontend/src:/app/src
    environment:
      - VITE_API_URL=http://localhost:8000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./backend/src:/app/src
      - ./backend/data:/app/data
      - ~/.config/gcloud:/root/.config/gcloud:ro  # GCP credentials
    environment:
      - VERTEX_PROJECT_ID=de0360-sbx-lars
      - VERTEX_LOCATION=europe-west4
      - VERTEX_MODEL=gemini-3-flash-preview
```

### 7.3 GCP Authentication Notes

For local development:
1. Run `gcloud auth application-default login` once
2. Credentials stored in `~/.config/gcloud/`
3. Mounted read-only into container

---

## Section 8: Implementation Order

### Phase 1: Backend Foundation
1. Create `backend/` directory structure
2. Set up `pyproject.toml` with dependencies (fastapi, uvicorn, google-genai, pydantic)
3. Create Dockerfile and update docker-compose.yml
4. Implement basic FastAPI app with health endpoint
5. Test Docker setup works

### Phase 2: Gemini Integration
1. Implement `gemini.py` service
2. Test Vertex AI authentication in container
3. Create basic prompt in `prompts.py`
4. Implement `/api/evaluate-answer` endpoint
5. Test with hardcoded question/answer

### Phase 3: Progress Tracking
1. Create `progress.json` with initial structure
2. Implement `/api/progress` GET endpoint
3. Implement `/api/progress/quiz-result` POST endpoint
4. Test progress persistence

### Phase 4: Frontend - Free Text Questions
1. Add `free-text` question type
2. Create `FreeTextQuestion.tsx` component
3. Integrate with `/api/evaluate-answer`
4. Create `AIFeedback.tsx` for rich feedback display
5. Add example free-text question to a topic

### Phase 5: Hints
1. Implement `/api/hint` endpoint with prompt
2. Create `HintButton.tsx` component
3. Add hint state management (level tracking)
4. Integrate into `QuizQuestion.tsx`

### Phase 6: Personalized Wrong Answer Feedback
1. Update existing multiple-choice flow to call `/api/evaluate-answer` on wrong answers
2. Replace static explanations with AI-generated personalized feedback
3. Keep static explanations as fallback if API fails

### Phase 7: Recommendations
1. Implement `/api/recommendations` endpoint
2. Create `RecommendationsPanel.tsx`
3. Integrate into `QuizResults.tsx`
4. Update progress saving to include wrong answer details

### Phase 8: Polish
1. Loading states for AI calls
2. Error handling and fallbacks
3. Streaming responses for longer feedback (optional)
4. Rate limiting / caching considerations

---

## Dependencies

### Backend (pyproject.toml)
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

### Frontend (new dependencies)
None - using existing fetch API

---

## Open Questions

1. **Caching:** Should we cache AI responses for identical questions? Could save costs but might give stale feedback.

2. **Fallback:** What happens if Gemini API is down? Show static explanations only?

3. **Rate limiting:** Any concerns about API costs during heavy study sessions?

4. **Model selection:** Use Flash for all, or Pro for evaluation / Flash for hints?

---

## Success Criteria

- [ ] Free-text questions can be answered and evaluated by AI
- [ ] AI explains *why* a specific wrong answer is wrong (not just what's correct)
- [ ] Progressive hints (3 levels) available for all questions
- [ ] Learning recommendations shown after quizzes
- [ ] Progress persists in git-tracked JSON file
- [ ] Works in Docker on multiple devices via git sync
