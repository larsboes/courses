# Courses

Study materials and an interactive exam trainer for my CS courses.

## Exam Trainer

The main piece of this repo — an AI-powered study app built with React and FastAPI. It turns lecture content into interactive learning sessions.

- **Interactive diagrams** — animated, explorable visualizations (Framer Motion, React Flow, Mermaid)
- **Quizzes** — topic-based questions with multiple formats
- **AI evaluation** — free-text answers graded by Gemini with explanations
- **Progressive hints** — three-level hint system before revealing answers
- **Learning recommendations** — personalized suggestions based on progress

```bash
cd exam-trainer && task up
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
```

**Stack:** React 19, TypeScript, Tailwind CSS v4, FastAPI, Gemini, Docker Compose

See [exam-trainer/README.md](exam-trainer/README.md) for setup and details.

## Resources

Course materials organized by subject:

| Course | Content |
|--------|---------|
| Web Technologies | Lecture notes, exam prep, Kubernetes labs |
| Wirtschaftsrecht | Summaries, reference PDFs |
| Workshops | Cloud Labs Hamburg (Gemini), Kubernetes workshop, agent project |

## Structure

```
courses/
├── exam-trainer/      # Interactive study app (React + FastAPI)
├── resources/         # Course materials by subject
│   ├── Web-Technologies/
│   ├── Wirtschaftsrecht/
│   └── workshops/
└── docs/              # Planning docs
```
