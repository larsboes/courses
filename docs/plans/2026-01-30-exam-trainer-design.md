# Exam Trainer - Interactive Learning App

> A visual, interactive learning platform for exam preparation with animated diagrams, explorable visualizations, and topic-based quizzes.

## Overview

**Goal:** Build a reusable exam preparation tool that emphasizes visual learning through interactive diagrams rather than rote memorization.

**First Use Case:** Web Technologies exam (HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS)

**Learning Philosophy:**
- Think in pictures, connect ideas
- Understand concepts through exploration
- Test knowledge when ready (not forced)

---

## 1. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Runtime** | Bun | Fast, modern, native TypeScript support |
| **Framework** | React 18 | Component model fits diagram composition |
| **Bundler** | Vite | Best-in-class HMR, Bun-compatible |
| **Styling** | Tailwind CSS | Utility-first, rapid iteration |
| **Animations** | Framer Motion | Declarative, step-through animations |
| **Node Diagrams** | React Flow | Manipulatable topology diagrams (K8s) |
| **Routing** | React Router | Standard, simple |
| **Container** | Docker + Bun | Lightweight single-stage image |

---

## 2. Project Structure

```
exam-trainer/
├── src/
│   ├── core/                          # Reusable platform code
│   │   ├── components/
│   │   │   ├── diagrams/
│   │   │   │   ├── AnimatedFlow.tsx       # Step-through animated diagrams
│   │   │   │   ├── ExplorableSVG.tsx      # Click-to-expand diagrams
│   │   │   │   ├── NodeDiagram.tsx        # React Flow wrapper
│   │   │   │   └── primitives/
│   │   │   │       ├── Arrow.tsx
│   │   │   │       ├── Box.tsx
│   │   │   │       └── Label.tsx
│   │   │   ├── quiz/
│   │   │   │   ├── QuizContainer.tsx      # Quiz flow orchestration
│   │   │   │   ├── QuizQuestion.tsx       # Single question display
│   │   │   │   ├── QuizProgress.tsx       # Progress indicator
│   │   │   │   └── QuizResults.tsx        # Results summary
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Navigation.tsx
│   │   │       ├── ProgressBar.tsx
│   │   │       └── Tooltip.tsx
│   │   │
│   │   ├── types/
│   │   │   └── content.ts                 # Type definitions
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAnimationStep.ts        # Step-through animation state
│   │   │   ├── useQuizState.ts            # Quiz progress & scoring
│   │   │   └── useCourseProgress.ts       # Track completed topics
│   │   │
│   │   └── layouts/
│   │       ├── AppLayout.tsx              # Main app shell
│   │       ├── CourseLayout.tsx           # Course overview layout
│   │       └── TopicLayout.tsx            # Topic page layout
│   │
│   ├── content/
│   │   └── web-technologies/
│   │       ├── index.ts                   # Course manifest
│   │       ├── topics/
│   │       │   ├── http.tsx
│   │       │   ├── json.tsx
│   │       │   ├── html.tsx
│   │       │   ├── css.tsx
│   │       │   ├── javascript-dom.tsx
│   │       │   ├── rest.tsx
│   │       │   ├── kubernetes-begriffe.tsx
│   │       │   ├── kubernetes-manifests.tsx
│   │       │   ├── kubernetes-netzwerk.tsx
│   │       │   ├── dns-tls.tsx
│   │       │   └── playlist-app.tsx
│   │       └── diagrams/
│   │           ├── HttpFlowDiagram.tsx
│   │           ├── HttpRequestExplorer.tsx
│   │           ├── KubernetesClusterDiagram.tsx
│   │           ├── KubernetesNetworkDiagram.tsx
│   │           ├── DnsResolutionDiagram.tsx
│   │           └── TlsHandshakeDiagram.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx                   # Course selection
│   │   ├── CoursePage.tsx                 # Topic list for a course
│   │   ├── TopicPage.tsx                  # Single topic with sections
│   │   └── QuizPage.tsx                   # Quiz for a topic
│   │
│   ├── App.tsx                            # Router setup
│   └── main.tsx                           # Entry point
│
├── public/
│   └── favicon.svg
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── bunfig.toml
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 3. Content Architecture

### 3.1 Type Definitions

```typescript
// core/types/content.ts

// ─────────────────────────────────────────────────
// Course & Topic Structure
// ─────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  examNotes?: string;              // e.g., "Sehr wichtig!!", "Nur oberflächlich"
  sections: Section[];
  quiz?: Quiz;
}

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
  diagram?: DiagramConfig;
}

// ─────────────────────────────────────────────────
// Diagram Types
// ─────────────────────────────────────────────────

export type DiagramType = 'animated' | 'manipulatable' | 'explorable';

export interface DiagramConfig {
  type: DiagramType;
  component: React.ComponentType<DiagramProps>;
}

export interface DiagramProps {
  className?: string;
}

// ─────────────────────────────────────────────────
// Quiz Types
// ─────────────────────────────────────────────────

export interface Quiz {
  questions: QuizQuestion[];
}

export type QuizQuestionType =
  | 'multiple-choice'      // Select one correct answer
  | 'multi-select'         // Select all that apply
  | 'order-steps'          // Put steps in correct order
  | 'match-pairs'          // Match items (e.g., status code to meaning)
  | 'identify-error'       // Find the error in code/config
  | 'fill-blank';          // Complete the missing part

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  visual?: React.ReactNode;        // Optional diagram/code in question
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  explanationVisual?: React.ReactNode;
}
```

### 3.2 Example: HTTP Topic

```typescript
// content/web-technologies/topics/http.tsx

import { Topic } from '@/core/types/content';
import { HttpFlowDiagram } from '../diagrams/HttpFlowDiagram';
import { HttpRequestExplorer } from '../diagrams/HttpRequestExplorer';
import { HttpResponseExplorer } from '../diagrams/HttpResponseExplorer';

export const httpTopic: Topic = {
  id: 'http',
  title: 'HTTP - Hypertext Transfer Protocol',
  description: 'Requests & Responses, Aufbau, Methoden, Status Codes',
  examNotes: 'Struktur kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <>
          <p>
            HTTP ist ein <strong>zustandsloses Protokoll</strong> für die
            Kommunikation im Web auf der Anwendungsschicht (Layer 5).
          </p>
          <p>
            Client sendet Request → Server antwortet mit Response.
          </p>
        </>
      ),
      diagram: {
        type: 'animated',
        component: HttpFlowDiagram,
      },
    },
    {
      id: 'request-structure',
      title: 'HTTP Request Aufbau',
      content: (
        <p>Jeder HTTP Request besteht aus vier Teilen:</p>
      ),
      diagram: {
        type: 'explorable',
        component: HttpRequestExplorer,
      },
    },
    {
      id: 'response-structure',
      title: 'HTTP Response Aufbau',
      content: (
        <p>Die Response hat eine ähnliche Struktur:</p>
      ),
      diagram: {
        type: 'explorable',
        component: HttpResponseExplorer,
      },
    },
    {
      id: 'methods',
      title: 'HTTP Methoden',
      content: (
        <table>
          <thead>
            <tr><th>Methode</th><th>Beschreibung</th><th>Idempotent</th><th>Body</th></tr>
          </thead>
          <tbody>
            <tr><td>GET</td><td>Ressource abrufen</td><td>Ja</td><td>Nein</td></tr>
            <tr><td>POST</td><td>Neue Ressource erstellen</td><td>Nein</td><td>Ja</td></tr>
            <tr><td>PUT</td><td>Ressource ersetzen</td><td>Ja</td><td>Ja</td></tr>
            <tr><td>DELETE</td><td>Ressource löschen</td><td>Ja</td><td>Nein</td></tr>
            <tr><td>PATCH</td><td>Teilweise aktualisieren</td><td>Nein</td><td>Ja</td></tr>
          </tbody>
        </table>
      ),
    },
    {
      id: 'status-codes',
      title: 'Status Codes',
      content: (
        <>
          <p>Status Codes zeigen das Ergebnis der Anfrage:</p>
          <ul>
            <li><strong>2xx</strong> - Erfolg (200 OK, 201 Created)</li>
            <li><strong>4xx</strong> - Client-Fehler (400 Bad Request, 404 Not Found)</li>
            <li><strong>5xx</strong> - Server-Fehler (500 Internal Server Error)</li>
          </ul>
        </>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'http-stateless',
        type: 'multiple-choice',
        question: 'Was bedeutet es, dass HTTP "zustandslos" ist?',
        options: [
          'Der Server speichert keine Informationen zwischen Requests',
          'HTTP kann nur GET-Anfragen verarbeiten',
          'Die Verbindung bleibt immer offen',
          'Jeder Request muss verschlüsselt sein',
        ],
        correctAnswer: 'Der Server speichert keine Informationen zwischen Requests',
        explanation: 'Zustandslos bedeutet, dass jeder Request unabhängig ist. Der Server "erinnert" sich nicht an vorherige Requests.',
      },
      {
        id: 'http-methods-idempotent',
        type: 'multi-select',
        question: 'Welche HTTP-Methoden sind idempotent?',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        correctAnswer: ['GET', 'PUT', 'DELETE'],
        explanation: 'Idempotent bedeutet: Mehrfaches Ausführen hat den gleichen Effekt wie einmaliges Ausführen. GET liest nur, PUT ersetzt komplett, DELETE löscht (nochmal löschen ändert nichts). POST und PATCH können bei Wiederholung unterschiedliche Ergebnisse haben.',
      },
      {
        id: 'status-code-match',
        type: 'match-pairs',
        question: 'Ordne die Status Codes ihrer Bedeutung zu:',
        options: ['200', '201', '400', '404', '500'],
        correctAnswer: ['OK', 'Created', 'Bad Request', 'Not Found', 'Internal Server Error'],
        explanation: '2xx = Erfolg, 4xx = Client-Fehler, 5xx = Server-Fehler.',
      },
    ],
  },
};
```

### 3.3 Course Manifest

```typescript
// content/web-technologies/index.ts

import { Course } from '@/core/types/content';
import { httpTopic } from './topics/http';
import { jsonTopic } from './topics/json';
import { htmlTopic } from './topics/html';
import { cssTopic } from './topics/css';
import { javascriptDomTopic } from './topics/javascript-dom';
import { restTopic } from './topics/rest';
import { kubernetesBegriffeTopic } from './topics/kubernetes-begriffe';
import { kubernetesManifestsTopic } from './topics/kubernetes-manifests';
import { kubernetesNetzwerkTopic } from './topics/kubernetes-netzwerk';
import { dnsTlsTopic } from './topics/dns-tls';
import { playlistAppTopic } from './topics/playlist-app';

export const webTechnologiesCourse: Course = {
  id: 'web-technologies',
  title: 'Web Technologies',
  description: 'HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS',
  topics: [
    httpTopic,
    jsonTopic,
    htmlTopic,
    cssTopic,
    javascriptDomTopic,
    restTopic,
    kubernetesBegriffeTopic,
    kubernetesManifestsTopic,
    kubernetesNetzwerkTopic,
    dnsTlsTopic,
    playlistAppTopic,
  ],
};
```

---

## 4. Visualization System

Three diagram types, each serving different learning needs:

### 4.1 Animated Diagrams (Step-Through)

**Purpose:** Show processes, flows, sequences. User clicks "Next" to advance through steps.

**Use Cases:**
- HTTP Request/Response flow
- DNS resolution process
- TLS handshake
- Kubernetes Pod scheduling

**Implementation:**

```typescript
// core/components/diagrams/AnimatedFlow.tsx

interface AnimatedFlowProps {
  steps: AnimationStep[];
  className?: string;
}

interface AnimationStep {
  id: string;
  label: string;
  description: string;
  highlight: string[];  // IDs of elements to highlight
}

export function AnimatedFlow({ steps, className }: AnimatedFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={className}>
      {/* SVG diagram with Framer Motion animations */}
      {/* Controls: Previous / Step indicator / Next */}
      {/* Current step description */}
    </div>
  );
}
```

**Example: HTTP Flow**

```
Step 1: "Client bereitet Request vor"
        [Browser] highlighted

Step 2: "Request wird gesendet"
        [Arrow: Browser → Server] animates

Step 3: "Server verarbeitet Request"
        [Server] highlighted, processing animation

Step 4: "Response wird zurückgesendet"
        [Arrow: Server → Browser] animates

Step 5: "Client empfängt Response"
        [Browser] highlighted with response data
```

### 4.2 Manipulatable Diagrams (Drag & Drop)

**Purpose:** Build understanding through interaction. User constructs or modifies diagrams.

**Use Cases:**
- Kubernetes cluster topology (drag pods onto nodes)
- Build an HTTP request by assembling parts
- Connect Services to Pods

**Implementation:** React Flow for node-based diagrams.

```typescript
// core/components/diagrams/NodeDiagram.tsx

interface NodeDiagramProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  nodeTypes: Record<string, React.ComponentType>;
  onValidate?: (nodes: Node[], edges: Edge[]) => ValidationResult;
}
```

**Example: Kubernetes Cluster Builder**

```
Available components (drag from sidebar):
- Pod (multiple)
- Service
- Deployment

Canvas:
┌─────────────────────────────────────────┐
│  Node 1                    Node 2       │
│  ┌─────────┐              ┌─────────┐   │
│  │         │              │         │   │
│  │  [drop] │              │  [drop] │   │
│  │         │              │         │   │
│  └─────────┘              └─────────┘   │
└─────────────────────────────────────────┘

User drags Pod onto Node 1 → validates placement
User connects Service to Pod → shows network flow
```

### 4.3 Explorable Diagrams (Click to Explore)

**Purpose:** Dense information, revealed progressively. Click/hover to see details.

**Use Cases:**
- HTTP Request structure (click on each part)
- Kubernetes manifest (click on fields)
- JSON structure

**Implementation:**

```typescript
// core/components/diagrams/ExplorableSVG.tsx

interface ExplorableRegion {
  id: string;
  path: string;           // SVG path or rect
  label: string;
  details: React.ReactNode;
}

interface ExplorableSVGProps {
  regions: ExplorableRegion[];
  className?: string;
}

export function ExplorableSVG({ regions, className }: ExplorableSVGProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className={className}>
      {/* SVG with clickable regions */}
      {/* Tooltip/panel showing details of active region */}
    </div>
  );
}
```

**Example: HTTP Request Explorer**

```
┌─────────────────────────────────────────────┐
│ [REQUEST LINE]  ← click                     │
│ GET /playlists?duration=300 HTTP/1.1        │
├─────────────────────────────────────────────┤
│ [HEADERS]  ← click                          │
│ Host: playlist-server.com:8001              │
│ Accept: application/json                    │
├─────────────────────────────────────────────┤
│ [LEERZEILE]  ← click                        │
├─────────────────────────────────────────────┤
│ [BODY]  ← click                             │
│ {"name": "My Playlist"}                     │
└─────────────────────────────────────────────┘

Click [REQUEST LINE] →
  Panel appears:
  "Die Request Line enthält:
   - HTTP Methode (GET, POST, ...)
   - URI mit optionalen Query Parametern
   - HTTP Version"
```

---

## 5. Quiz System

### 5.1 Question Types

| Type | Description | Example |
|------|-------------|---------|
| `multiple-choice` | Select one correct answer | "Was bedeutet HTTP 404?" |
| `multi-select` | Select all that apply | "Welche Methoden sind idempotent?" |
| `order-steps` | Arrange in correct order | "Sortiere den TLS Handshake" |
| `match-pairs` | Match items | "Status Code → Bedeutung" |
| `identify-error` | Find the error | "Was ist falsch an diesem Request?" |
| `fill-blank` | Complete missing parts | "GET /users HTTP/___" |

### 5.2 Quiz Flow

```
┌─────────────────────────────────────────────┐
│  Topic: HTTP                    [3/10]      │
│  ═══════════════════════════════════════    │
│                                             │
│  Was bedeutet es, dass HTTP "zustandslos"   │
│  ist?                                       │
│                                             │
│  ○ Der Server speichert keine Informationen │
│    zwischen Requests                        │
│  ○ HTTP kann nur GET-Anfragen verarbeiten   │
│  ○ Die Verbindung bleibt immer offen        │
│  ○ Jeder Request muss verschlüsselt sein    │
│                                             │
│                          [Check Answer]     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  ✓ Richtig!                                 │
│                                             │
│  Zustandslos bedeutet, dass jeder Request   │
│  unabhängig ist. Der Server "erinnert"      │
│  sich nicht an vorherige Requests.          │
│                                             │
│                              [Next →]       │
└─────────────────────────────────────────────┘
```

### 5.3 Quiz State Hook

```typescript
// core/hooks/useQuizState.ts

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Map<string, string | string[]>;
  score: number;
  isComplete: boolean;
}

interface QuizActions {
  submitAnswer: (answer: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reset: () => void;
}

export function useQuizState(quiz: Quiz): [QuizState, QuizActions] {
  // Implementation
}
```

---

## 6. Docker Setup

### 6.1 Dockerfile

```dockerfile
# Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Development (with hot reload)
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["bun", "run", "dev", "--host"]

# Build
FROM deps AS builder
COPY . .
RUN bun run build

# Production (serve static files)
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 6.2 Docker Compose

```yaml
# docker-compose.yml
services:
  exam-trainer:
    build:
      context: .
      target: dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
```

### 6.3 Usage

```bash
# Development with hot reload
docker compose up

# Production build
docker compose -f docker-compose.prod.yml up
```

---

## 7. UI/UX Design

### 7.1 Navigation Flow

```
┌────────────────────────────────────────────────────────────┐
│  Exam Trainer                              [Course ▼]      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Web Technologies                                          │
│  ══════════════════                                        │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │     HTTP     │ │     JSON     │ │     HTML     │       │
│  │   ✓ Done     │ │  In Progress │ │    ○ New     │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │     CSS      │ │  JavaScript  │ │     REST     │       │
│  │    ○ New     │ │    ○ New     │ │    ○ New     │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  K8s Basics  │ │ K8s Manifest │ │ K8s Network  │       │
│  │    ○ New     │ │    ○ New     │ │  ⚠ Important │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 7.2 Topic Page Layout

```
┌────────────────────────────────────────────────────────────┐
│  ← Back to Course          HTTP          [Take Quiz]       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Sections:          │  Content Area                        │
│  ─────────────      │  ────────────────────────────────    │
│  ● Überblick        │                                      │
│  ○ Request Aufbau   │  [Animated Diagram: HTTP Flow]       │
│  ○ Response Aufbau  │                                      │
│  ○ Methoden         │   ┌────────┐         ┌────────┐     │
│  ○ Status Codes     │   │ Client │ ──────▶ │ Server │     │
│                     │   └────────┘         └────────┘     │
│                     │                                      │
│                     │   [ ◀ ] Step 2 of 5 [ ▶ ]           │
│                     │                                      │
│                     │   "Request wird gesendet..."         │
│                     │                                      │
└────────────────────────────────────────────────────────────┘
```

### 7.3 Color Scheme

```
Background:     #0f172a (slate-900)
Surface:        #1e293b (slate-800)
Primary:        #3b82f6 (blue-500)
Success:        #22c55e (green-500)
Warning:        #f59e0b (amber-500)
Error:          #ef4444 (red-500)
Text:           #f8fafc (slate-50)
Text Muted:     #94a3b8 (slate-400)
```

---

## 8. Implementation Phases

### Phase 1: Foundation
- [ ] Project setup (Bun, Vite, React, Tailwind)
- [ ] Docker configuration
- [ ] Core types defined
- [ ] Basic routing (Home → Course → Topic)
- [ ] AppLayout, CourseLayout, TopicLayout

### Phase 2: Diagram System
- [ ] AnimatedFlow component
- [ ] ExplorableSVG component
- [ ] Basic diagram primitives (Box, Arrow, Label)
- [ ] useAnimationStep hook

### Phase 3: First Topic (HTTP)
- [ ] HTTP topic content
- [ ] HttpFlowDiagram (animated)
- [ ] HttpRequestExplorer (explorable)
- [ ] HttpResponseExplorer (explorable)

### Phase 4: Quiz System
- [ ] QuizContainer component
- [ ] Question type components
- [ ] useQuizState hook
- [ ] HTTP quiz questions

### Phase 5: Kubernetes Topics
- [ ] NodeDiagram with React Flow
- [ ] KubernetesClusterDiagram (manipulatable)
- [ ] KubernetesNetworkDiagram (animated)
- [ ] K8s topic content

### Phase 6: Remaining Topics
- [ ] JSON, HTML, CSS topics
- [ ] JavaScript/DOM topic
- [ ] REST topic
- [ ] DNS/TLS topic
- [ ] Playlist App topic

### Phase 7: Polish
- [ ] Progress persistence (localStorage)
- [ ] Responsive design
- [ ] Keyboard navigation
- [ ] Final styling pass

---

## 9. Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content as TSX | TypeScript modules | Type safety, refactorable, diagrams are components |
| Diagram approach | Three specialized types | Different learning needs require different interactions |
| Quiz tied to topic | Not global quiz pool | Test what you just learned, not random questions |
| No backend | Static content | Complexity not justified, all content known at build |
| Tailwind | Utility CSS | Fast iteration, no context switching to CSS files |
| Framer Motion | Animation library | Best React integration, declarative API |
| React Flow | Node diagrams | Purpose-built for node-based UIs, handles edge cases |

---

## 10. Decisions (Finalized)

| Question | Decision |
|----------|----------|
| **Progress persistence** | JSON file in project, committed to git (tracks completed topics, quiz scores) |
| **Language** | German only for now, structure allows English later |
| **Print mode** | No |
| **Exam simulation** | No |

### Progress File Structure

```typescript
// progress/web-technologies.json
{
  "courseId": "web-technologies",
  "lastUpdated": "2026-01-30T14:30:00Z",
  "topics": {
    "http": {
      "completed": true,
      "sectionsViewed": ["overview", "request-structure", "response-structure"],
      "quiz": {
        "bestScore": 8,
        "totalQuestions": 10,
        "lastAttempt": "2026-01-30T14:25:00Z"
      }
    },
    "json": {
      "completed": false,
      "sectionsViewed": ["syntax"],
      "quiz": null
    }
  }
}
```

This file lives in `progress/` folder and gets committed - progress travels with the repo.
