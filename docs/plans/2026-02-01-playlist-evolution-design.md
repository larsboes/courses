# Playlist App Evolution - Comprehensive Learning Content

## Overview

Expand the existing `playlist-app.tsx` topic into a comprehensive vertical-scrolling journey through exercises Ü7-Ü12, showing how a simple HTML form evolves into a Kubernetes-deployed microservices application.

## Content Strategy

**Approach:** Single deep topic with 8 sections (not 5 separate topics)
**Style:** Comprehensive - full explanations, real code snippets, quiz questions per stage
**Timeline Style:** Vertical scrolling with animated architecture reveals

## Evolution Stages

| Exercise | Stage | Technology Added | Key Concepts |
|----------|-------|------------------|--------------|
| Ü7 | Static UI | HTML + CSS | Form structure, responsive layout |
| Ü8 | Client-side | + JavaScript | localStorage, DOM manipulation, JSON |
| Ü9 | REST API | + Flask backend | HTTP methods, in-memory storage, OpenAPI |
| Ü10 | Database | + CouchDB + Docker | docker-compose, env vars, healthchecks |
| Ü12 | Orchestration | + Kubernetes | Manifests, Services, PVC, multi-container |

## New Interactive Diagrams

### 1. PlaylistEvolutionTimeline
- Vertical scroll stepper
- Each stage reveals architecture diagram
- Animated transitions between stages
- Click stages to jump directly

### 2. StorageEvolutionComparison
- Three-panel comparison: localStorage vs REST (in-memory) vs CouchDB
- Animated data flow for each
- Highlights: persistence, multi-user, scalability

### 3. PlaylistCodeDiff
- Dropdown to select stage transitions (Ü8→Ü9, Ü9→Ü10, etc.)
- Side-by-side diff with syntax highlighting
- Click changed lines for explanations

### 4. PlaylistApiExplorer
- Based on actual Meta_Playlist_API.json OpenAPI spec
- Interactive request builder
- Exam focus: "Write this HTTP request by hand"

## Section Structure

```
playlist-app.tsx sections:
├── evolution-overview      # Timeline diagram + intro
├── stage-ui               # Ü7: HTML/CSS
├── stage-javascript       # Ü8: localStorage, DOM
├── stage-rest             # Ü9: Flask, fetch(), OpenAPI
├── stage-microservices    # Ü10: Docker Compose, CouchDB
├── stage-kubernetes       # Ü12: Manifests, Services, PVC
├── code-comparison        # Diff diagram
└── exam-practice          # Synthesis questions
```

## Quiz Questions (~25 total)

### Per-Stage Questions (3-4 each)
- Ü7: HTML structure, CSS selectors
- Ü8: localStorage API, JSON.parse/stringify, null handling
- Ü9: HTTP methods, status codes, request format
- Ü10: docker-compose syntax, environment variables, service dependencies
- Ü12: Manifest reading, Service types (ClusterIP vs NodePort), PVC

### Exam-Style Synthesis Questions (5)
1. Code tracing: localStorage state after operations
2. HTTP request writing: complete POST/DELETE requests
3. Architecture drawing: K8s manifests → system diagram
4. Debugging: identify docker-compose/manifest errors
5. Evolution reasoning: why each technology was added

## File Changes

```
exam-trainer/src/frontend/content/web-technologies/
├── topics/
│   └── playlist-app.tsx              # EXPAND (~460 → ~1200 lines)
└── diagrams/
    ├── index.ts                      # UPDATE exports
    ├── PlaylistEvolutionTimeline.tsx # NEW
    ├── StorageEvolutionComparison.tsx # NEW
    ├── PlaylistCodeDiff.tsx          # NEW
    └── PlaylistApiExplorer.tsx       # NEW
```

## Code Sources

All code snippets from extracted exercise files:
- `/tmp/playlist_exercises/Uebung_7/` - HTML/CSS
- `/tmp/playlist_exercises/Uebung_8/` - JavaScript + localStorage
- `/tmp/playlist_exercises/Uebung_9/` - Flask REST API
- `/tmp/playlist_exercises/Uebung_10/` - Docker Compose + CouchDB
- `/tmp/playlist_exercises/Uebung_12/` - Kubernetes manifests

OpenAPI spec: `resources/Web-Technologies/provided/Meta_Playlist_API.json`
