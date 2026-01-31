# Prompt for Parallel Session: Exam Trainer Phase 6

Copy everything below this line and paste into a new Claude Code session:

---

## Context

I'm building an **Exam Trainer** app - an interactive learning platform for exam preparation with animated diagrams, explorable visualizations, and quizzes.

**Current state:** MVP complete with HTTP topic working. Docker container running at localhost:5173.

**Working directory:** `/home/lars/Developer/personal/courses/exam-trainer`

## Your Task

Execute the implementation plan at `docs/plans/2026-01-31-exam-trainer-phase6-topics.md` using the **superpowers:subagent-driven-development** skill.

This plan adds 10 more topics to the exam trainer:
- JSON, HTML, CSS, JavaScript/DOM
- REST API
- Kubernetes (Begriffe, Manifests, Netzwerk)
- DNS/TLS
- Playlist App (exam project summary)

Each topic needs:
1. Content file with sections and quiz
2. Optional diagrams (animated or explorable)
3. Update to course manifest

## Key Files to Reference

- **Design doc:** `docs/plans/2026-01-30-exam-trainer-design.md` (types, patterns, examples)
- **Existing HTTP topic:** `src/content/web-technologies/topics/http.tsx` (template)
- **Existing diagrams:** `src/content/web-technologies/diagrams/` (AnimatedFlow and ExplorableSVG examples)
- **Course manifest:** `src/content/web-technologies/index.ts` (add new topics here)

## Instructions

1. Use `superpowers:subagent-driven-development` skill
2. Work through tasks 6.1 through 6.10
3. Each task: dispatch implementer → spec review → code review → commit
4. After all tasks: update course manifest, test full flow

## Constraints

- All content in **German** (examNotes, labels, quiz questions, explanations)
- Follow existing patterns from HTTP topic
- Use AnimatedFlow for process/sequence diagrams
- Use ExplorableSVG for structure/anatomy diagrams
- 3-4 quiz questions per topic (multiple-choice or multi-select)

Start by invoking the subagent-driven-development skill and reading the plan file.
