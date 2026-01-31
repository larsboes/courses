# Exam Trainer

Interactive exam preparation app with AI-powered answer evaluation.

## Quick Start

```bash
task up
```

Opens:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Architecture

```
exam-trainer/
├── src/
│   ├── frontend/          # React + Vite + Tailwind
│   │   ├── core/          # Shared components, hooks, types
│   │   ├── content/       # Course content (topics, diagrams)
│   │   └── pages/         # Route pages
│   └── backend/           # FastAPI + Python
│       └── src/exam_trainer_api/
├── data/                  # Progress tracking (JSON)
└── docker-compose.yml     # Development stack
```

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend | FastAPI, Python 3.12, uv |
| AI | Gemini 2.0 Flash (Vertex AI) |
| Runtime | Docker Compose |

## Task Commands

```bash
task up              # Start all services
task down            # Stop all services
task logs            # Follow all logs
task logs:frontend   # Frontend logs only
task logs:backend    # Backend logs only
task restart         # Restart everything
task health          # Check backend health
task build           # Production build
```

## Features

- Topic-based learning with interactive diagrams
- Quiz mode with multiple question types
- AI-powered free-text answer evaluation
- Progressive hints system (3 levels)
- Personalized learning recommendations

## Development

Frontend hot-reloads automatically. Backend also reloads on file changes.

To add new topics, create files in `src/frontend/content/`.
