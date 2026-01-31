# Exam Trainer Master Plan

> Consolidated PRD for AI-powered exam preparation app

**Date:** 2026-01-31
**Status:** Ready for implementation
**Supersedes:** `exam-mode-design.md`, `exam-mode-implementation.md`, `ai-evaluation-backend.md`

---

## 1. Vision & Goals

**Exam Trainer** is a personal exam preparation app that combines interactive learning with AI-powered feedback. The goal is to simulate real exam conditions while providing intelligent guidance that a textbook can't offer.

### Core Value Proposition

- Practice writing answers (not just clicking multiple choice)
- Get AI feedback explaining *why* your answer is right/wrong
- Receive hints when stuck instead of giving up
- Track progress and get personalized study recommendations

### What Exists Today

- React frontend with topic-based content
- Quiz system with multiple question types (multiple-choice, free-text, code-write, diagram-build)
- Exam simulation mode with multi-part tasks
- Self-assessment for free-text questions (manual "Richtig/Teilweise/Falsch")

### What We're Adding

- Python backend for AI operations (Gemini via Vertex AI)
- Replace self-assessment with AI evaluation
- Progressive hint system (3 levels)
- Learning recommendations based on quiz history
- Persistent progress tracking

### Non-Goals

- Multi-user support / authentication
- Cloud deployment
- Real-time collaboration

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         exam-trainer                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────┐         ┌──────────────────────┐          │
│  │     Frontend         │         │      Backend         │          │
│  │     (React)          │  HTTP   │     (FastAPI)        │          │
│  │     :5173            │◄───────►│      :8000           │          │
│  │                      │         │                      │          │
│  │  • Quiz UI           │         │  • /api/evaluate     │          │
│  │  • Exam simulation   │         │  • /api/hint         │          │
│  │  • Progress display  │         │  • /api/recommend    │          │
│  │                      │         │  • /api/progress     │          │
│  └──────────────────────┘         └──────────┬───────────┘          │
│                                              │                       │
│                                              ▼                       │
│                                   ┌──────────────────────┐          │
│                                   │    Vertex AI         │          │
│                                   │    (Gemini)          │          │
│                                   └──────────────────────┘          │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  data/                                                               │
│  └── progress.json  ◄─── Backend reads/writes, git-tracked          │
└─────────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
exam-trainer/
├── src/
│   ├── frontend/          # React app (moved from current src/)
│   │   ├── core/
│   │   ├── content/
│   │   ├── pages/
│   │   └── ...
│   └── backend/           # FastAPI service
│       ├── routers/
│       ├── services/
│       └── ...
├── data/
│   └── progress.json      # Shared progress tracking
├── docs/
│   └── plans/
└── docker-compose.yml     # Orchestrates both services
```

### Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Backend language | Python | Best Gemini SDK support |
| AI service | Vertex AI (Gemini) | GCP access available, no API key management |
| Progress storage | JSON file in repo | Git sync across devices, no database needed |
| Communication | REST API | Simple, stateless, easy to debug |
| Local dev | Docker Compose | One command starts everything |

---

## 3. Features

### Feature 1: AI-Powered Answer Evaluation

**Current flow:**
```
Write answer → Submit → See model answer → Self-assess (Richtig/Teilweise/Falsch)
```

**New flow:**
```
Write answer → Submit → AI evaluates → See personalized feedback
                                        • Score (0-100%)
                                        • What you got right
                                        • What's missing
                                        • Specific suggestions
```

The AI compares your answer against the model answer and explains the gap.

### Feature 2: Progressive Hints

When stuck on a question, click "Hint" to get help without seeing the full answer:

| Level | What you get | Example |
|-------|--------------|---------|
| 1 | Vague nudge | "Think about what happens before the browser can render..." |
| 2 | Specific direction | "Consider the two object models the browser builds first" |
| 3 | Almost the answer | "DOM and CSSOM are built, then combined into..." |

Hints are tracked - using hints affects your score for progress tracking.

### Feature 3: Learning Recommendations

After completing a quiz or exam simulation:
- AI analyzes your wrong answers across sessions
- Identifies patterns ("You often confuse REST with HTTP")
- Suggests specific topics to revisit

---

## 4. API Contracts

### Endpoints

```
POST /api/evaluate
├── Request:  { question, user_answer, model_answer, key_points, topic_id }
└── Response: { score, is_correct, feedback, missing_concepts, suggestion }

POST /api/hint
├── Request:  { question, model_answer, hint_level, previous_hints }
└── Response: { hint, hint_level, hints_remaining }

POST /api/recommend
├── Request:  { recent_results[], completed_topics[] }
└── Response: { weak_areas[], recommended_topics[], message }

GET  /api/progress
└── Response: { full progress.json content }

POST /api/progress/save
├── Request:  { topic_id, question_id, score, user_answer, used_hints }
└── Response: { updated progress summary }
```

### Progress Data Model

**`data/progress.json`:**

```json
{
  "last_updated": "2026-01-31T14:30:00Z",
  "quiz_attempts": [
    {
      "timestamp": "2026-01-31T14:25:00Z",
      "topic_id": "http",
      "question_id": "http-request-write",
      "question_type": "free-text",
      "score": 0.75,
      "user_answer": "GET /playlists HTTP/1.1...",
      "feedback": "Good structure, missing Accept header",
      "hints_used": 1
    }
  ],
  "topic_scores": {
    "http": { "attempts": 5, "avg_score": 0.82 },
    "css": { "attempts": 2, "avg_score": 0.60 }
  },
  "weak_areas": ["REST principles", "CSS selectors"]
}
```

---

## 5. Implementation Phases

### Phase 0: Project Restructure
- Move current `src/` contents to `src/frontend/`
- Create `src/backend/` skeleton
- Create `data/` directory with empty `progress.json`
- Update Docker Compose for both services
- Verify app still works after restructure

### Phase 1: Backend Foundation
- FastAPI app with health endpoint
- Gemini client wrapper (Vertex AI auth)
- Basic `/api/evaluate` endpoint
- Docker setup with GCP credentials mount
- Test: curl POST returns AI response

### Phase 2: AI Evaluation Integration
- Frontend: Update `FreeTextQuestion` to call `/api/evaluate`
- Frontend: Replace self-assessment UI with AI feedback display
- Frontend: Add loading state during AI call
- Backend: Refine evaluation prompt for quality feedback
- Test: Full flow works for free-text questions

### Phase 3: Hints System
- Backend: `/api/hint` endpoint with prompt
- Frontend: "Hint" button component
- Frontend: Hint level state (1→2→3, then disabled)
- Integrate into all question types
- Test: Hints work without revealing answer

### Phase 4: Progress Tracking
- Backend: `/api/progress` GET and POST endpoints
- Backend: Write to `data/progress.json` after each answer
- Frontend: Call save after evaluation completes
- Test: Progress persists across sessions

### Phase 5: Recommendations
- Backend: `/api/recommend` endpoint
- Backend: Prompt that analyzes quiz history
- Frontend: Recommendations panel on results page
- Test: Useful suggestions after multiple quizzes

### Phase 6: Polish
- Error handling & fallbacks (if AI fails)
- Loading states everywhere
- Code-write and diagram-build question AI integration
- Final testing of all flows

---

## 6. Success Criteria

| Feature | Success Criteria |
|---------|------------------|
| AI Evaluation | Submit free-text answer → get score + personalized feedback within 3 seconds |
| Hints | Click hint 3 times → get progressively more helpful hints without seeing full answer |
| Progress | Close app, reopen → see history and scores from previous sessions |
| Recommendations | After quiz → see "You struggle with X, revisit Y" based on actual mistakes |
| Dev Experience | `docker compose up` → both services running, ready to use |

### Out of Scope

- Multi-user / auth
- Cloud deployment
- More exam content (future phase)
- K8s system diagram builder AI integration (complex, defer)

### Technical Assumptions

- GCP credentials available locally (`gcloud auth application-default login`)
- Vertex AI API enabled on project
- Gemini Flash for hints (fast/cheap), Pro available for complex evaluations

---

## 7. References

This plan consolidates and supersedes:
- `exam-mode-design.md` - Question types and exam simulation
- `exam-mode-implementation.md` - Implementation tasks (completed)
- `ai-evaluation-backend.md` - Original AI backend draft
