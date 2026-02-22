# Claude Code Memory

## Skills to Use

- **brainstorming**: Always use before implementing new features or making design decisions
- **subagent-driven-development**: Use for executing multi-step implementation plans
- **/study-log**: PFLICHT am Ende jeder Lernsession - dokumentiert Fortschritt in `exam-trainer/logs/sessions.yaml` (nur user-invoked)
- **/ipdg-help [topic]**: IPDG-Content finden, Zusammenfassungen, Quiz-Fragen (auch model-invoked bei IPDG-Fragen)

## Development Rules

- **ALWAYS use Docker** - never run commands directly via `bun`, `uv`, `npm`, etc.
- All commands must go through `docker compose exec` or `docker compose run`
- Start dev servers: `docker compose up -d`
- Run builds: `docker compose exec app bun run build`
- Run tests: `docker compose exec app bun test`
- Install deps: `docker compose exec app bun install`
- **Never use git worktrees** - work directly on the main branch

## Project: exam-trainer

Interactive exam preparation app with:
- Animated/explorable diagrams (Framer Motion, Mermaid)
- Topic-based quizzes
- Progress tracking

**Stack:** Bun, Vite, React 18, TypeScript, Tailwind CSS v4, Framer Motion, Mermaid

**Run:** `cd exam-trainer && docker compose up -d` → http://localhost:5173

## Diagram Primitives

When creating or modifying diagram components, use these shared primitives from `core/`:

| Primitive | Import | Use Case |
|-----------|--------|----------|
| `DiagramShell` | `@/core/components/diagrams` | Card wrapper, header, sample selector, footer |
| `StepNavigator` | `@/core/components/diagrams` | Prev/next buttons, step dots, auto-play |
| `useStepNavigator` | `@/core/hooks` | Step navigation state management |
| `ChallengeBanner` | `@/core/components/diagrams` | Challenge mode header with selector |
| `ChallengeResult` | `@/core/components/diagrams` | Success/fail feedback |
| `useChallengeMode` | `@/core/hooks` | Challenge state management |
| `useHighlightState` | `@/core/hooks` | Hover/select/active state for items |
| `highlightColors` | `@/core/styles` | Shared color tokens (blue, green, purple, amber, cyan, red) |

**Example usage:**
```tsx
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator, useChallengeMode } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
```

**Migration priority:** When touching existing diagrams, migrate them to use these primitives to reduce duplication.

## Exam Status

| Klausur | Status | Datum |
|---------|--------|-------|
| Web-Technologies | geschrieben | 2026-02-08 |
| IPDG | vorbereitung | Klausur: 2026-02-10 |

## Study Session Logs

- **Log-Datei**: `exam-trainer/logs/sessions.yaml`
- **PFLICHT**: Am Ende jeder Lernsession `/study-log` ausfuehren
- Trackt: Topics, Scores, Schwachstellen, naechste Schritte
- Lese die Logs am Anfang jeder neuen Session um an Schwachstellen anzuknuepfen

## IPDG Content Map

Quellen in `exam-trainer/src/dataloader/configs/ipdg.yaml` definiert.
Markdown-Quellen in `exam-trainer/src/dataloader/resources/markdown/ipdg/`.
Topic-Dateien in `exam-trainer/src/frontend/content/ipdg/topics/`.
Probeklausur: `exam-trainer/src/dataloader/resources/markdown/ipdg/Probeklausur-IPDG-WS25.md`
