# Claude Code Memory

## Skills to Use

- **brainstorming**: Always use before implementing new features or making design decisions
- **subagent-driven-development**: Use for executing multi-step implementation plans

## Development Rules

- **Always use Docker** for running applications in this project
- Start dev servers with `docker compose up -d`, not `bun run dev` directly
- Build verification can use local `bun run build` for speed, but final testing should be in Docker
- **Never use git worktrees** - work directly on the main branch

## Project: exam-trainer

Interactive exam preparation app with:
- Animated/explorable diagrams (Framer Motion, Mermaid)
- Topic-based quizzes
- Progress tracking

**Stack:** Bun, Vite, React 18, TypeScript, Tailwind CSS v4, Framer Motion, Mermaid

**Run:** `cd exam-trainer && docker compose up -d` → http://localhost:5173
