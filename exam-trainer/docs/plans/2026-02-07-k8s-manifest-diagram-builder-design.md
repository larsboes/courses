# K8s Manifest-to-Diagram Builder

## Goal

Interactive exercise where students read a K8s YAML manifest and build the corresponding architecture diagram by dragging components onto a canvas, connecting them, and filling in key fields. Tests the exam skill: "K8s Manifest → Diagramm."

## Location

- **File:** `src/frontend/content/web-technologies/diagrams/K8sManifestDiagramBuilder.tsx`
- **Topic:** K8s Manifests — third diagram after K8sManifestExplorer and K8sManifestDiagramLinked
- **Learning flow:** Read YAML → See mapping → Build it yourself

## Layout

Two-panel, side by side:

- **Left panel (40%)** — Read-only YAML manifest with syntax highlighting and line numbers. Active YAML region highlights when hovering over a placed component.
- **Right panel (60%):**
  - **Toolbox strip** (top) — Draggable K8s component blocks: Deployment, ReplicaSet, Pod, Service, ConfigMap, Namespace
  - **Canvas** (main) — Drop zone for placing and connecting components
  - **Properties panel** (bottom, collapsible) — Fields for selected component

Exercise selector at top via `DiagramShell` with `samples` prop. Validation bar at bottom with "Prüfen" button, progressive hints, and "Show Solution" toggle.

## Data Structures

```typescript
interface K8sBuilderExercise {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  manifest: string
  expectedComponents: ExpectedComponent[]
  expectedConnections: ExpectedConnection[]
  hints: string[]
}

interface ExpectedComponent {
  id: string
  type: K8sComponentType
  fields: Record<string, string | number>
}

interface ExpectedConnection {
  fromId: string
  toId: string
  label?: string
}

type K8sComponentType =
  | 'Deployment' | 'ReplicaSet' | 'Pod'
  | 'Service' | 'ConfigMap' | 'Namespace'

interface PlacedComponent {
  id: string
  type: K8sComponentType
  x: number
  y: number
  fields: Record<string, string | number>
}

interface DrawnConnection {
  id: string
  fromId: string
  toId: string
}

interface ValidationResult {
  correct: boolean
  missingComponents: K8sComponentType[]
  extraComponents: string[]
  missingConnections: string[]
  wrongFields: { componentId: string; field: string; expected: string; got: string }[]
}
```

Validation ignores x/y positions — only checks component types, connections, and key fields.

## Component Fields by Type

| Type | Fields |
|------|--------|
| Deployment | name, replicas, labels (key-value) |
| ReplicaSet | name, replicas |
| Pod | name, image, containerPort |
| Service | name, type (dropdown), port, targetPort, selector (key-value) |
| ConfigMap | name, data keys |

## Interaction Flow

### Placing Components
- Drag from toolbox onto canvas (or click toolbox + click canvas for mobile)
- Blocks freely repositionable
- Right-click or X button to delete

### Configuring Fields
- Click placed block → properties panel slides up
- Shows only relevant fields for that component type
- Simple inputs and dropdowns, no free YAML editing

### Drawing Connections
- Click connection handle on block edge → drag to another block
- SVG path with arrow and optional label
- Dashed while dragging, solid on confirm
- Click connection to delete

### Checking Answer
- "Prüfen" button runs validation
- Green checkmarks on correct, red highlights on wrong/missing
- Missing components pulse in toolbox
- Wrong fields show expected value in tooltip

### Progressive Hints (3 levels)
1. Resource count and types
2. Conceptual hint about connections (e.g., selectors)
3. Expected component list without connections

### Show Solution
- Animates expected diagram onto canvas (Framer Motion stagger)
- YAML lines highlight in sync with components appearing
- Student's attempt fades behind solution for comparison

## Exercises

### Exercise 1 — Easy: "Einfaches Deployment"

Single Deployment manifest (web-app, 3 replicas, nginx:1.24, port 80).

**Expected:** Deployment → ReplicaSet → 3 Pods. Tests understanding that Deployments create an implicit ReplicaSet.

### Exercise 2 — Medium: "Deployment mit Service"

Deployment (2 replicas, `app: api`) + ClusterIP Service (port 8080→3000, selector `app: api`).

**Expected:** Deployment → ReplicaSet → 2 Pods ← Service. Tests selector matching and port mapping.

### Exercise 3 — Hard: "Microservice-Architektur"

Two Deployments (frontend + backend), NodePort Service for frontend, ClusterIP Service for backend, ConfigMap mounted into backend.

**Expected:** 6+ components with correct selector-based connections, different service types, ConfigMap linked to backend. Tests careful YAML reading — selectors must match the right Pods.

## Primitives Used

- `DiagramShell` — wrapper, sample selector, footer
- `useChallengeMode` — exercise state management (reuse as exercise selector)
- `highlightColors` — color tokens for component types
- Framer Motion — drag, drop, connection animation, solution reveal

## Patterns Referenced

- `DomTreeBuilderExercise` — exercise structure, hints, solution reveal
- `K8sManifestDiagramLinked` — YAML display, dual-panel, line highlighting
- `HttpRequestComposer` — challenge validation pattern
