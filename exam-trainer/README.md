# Exam Trainer

Interactive exam preparation app with AI-powered answer evaluation.

## Prerequisites

Since this project runs entirely in Docker, you do **not** need to install Python, Node.js, Bun, or uv locally. You only need:

1. **Docker**:
   - [Windows](https://docs.docker.com/desktop/install/windows-install/) (Docker Desktop)
   - [Mac](https://docs.docker.com/desktop/install/mac-install/) (Docker Desktop)
   - [Linux](https://docs.docker.com/engine/install/) (Docker Engine)

2. **Task** (Optional, for easier commands):
   - [Installation Guide](https://taskfile.dev/installation/)
   - *If you skip this, just replace `task up` with `docker compose up -d`.*

## Setup

1. **Get an API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/api-keys).
   - Create a new API key.

2. **Configure Environment**:
   - Create a `.env` file in the project root:
     ```bash
     GEMINI_API_KEY=your_api_key_here
     ```
   - *Note: If not set, the app defaults to Vertex AI settings which require Google Cloud credentials.*

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
| AI | Gemini 3.0 Flash Preview |
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
