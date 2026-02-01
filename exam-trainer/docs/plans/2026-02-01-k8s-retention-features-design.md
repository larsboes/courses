# K8s Retention & Deep-Dive Features

> Design for flashcards, spaced repetition, glossary, tooltips, and request tracing scenarios.
> Scoped to Kubernetes/Docker content only.

## Goals

1. **Retention** - Help remember K8s concepts via flashcards and spaced repetition
2. **Content depth** - Layered information (tooltips, glossary, comparisons) without cluttering main content
3. **Networking mastery** - Interactive request tracing for "sehr wichtig" exam topic
4. **Cross-device sync** - Progress stored in git-committed JSON file

## Features

### 1. K8s Glossary (Data Layer)

Single source of truth for all K8s/Docker terminology.

**File:** `core/data/k8s-glossary.ts`

```typescript
export type GlossaryTerm = {
  id: string                    // 'pod', 'service', 'cluster-ip'
  term: string                  // 'Pod'
  definition: string            // Short definition (1-2 sentences)
  details?: string              // Optional deeper explanation
  category: 'core' | 'networking' | 'storage' | 'workloads'
  related: string[]             // Links to other term IDs
  examRelevance: 'high' | 'medium' | 'low'
}

export type Comparison = {
  id: string
  items: [string, string]       // Term IDs to compare
  differences: string[]         // Key differences
  commonConfusion: string       // Why people mix these up
}

export type RequestScenario = {
  id: string
  title: string
  description: string
  steps: ScenarioStep[]
}

export type ScenarioStep = {
  component: string             // Term ID of current component
  description: string           // What happens at this step
  highlight: string[]           // Components to highlight
}
```

**Initial content:** ~30-40 terms covering:
- Core: Pod, Node, Cluster, Container, Namespace
- Networking: Service, ClusterIP, NodePort, LoadBalancer, Ingress, DNS, CoreDNS
- Storage: Volume, PersistentVolume, PersistentVolumeClaim, StorageClass
- Workloads: Deployment, ReplicaSet, DaemonSet, StatefulSet, Job

### 2. Hover Tooltips

Wrap K8s terms anywhere in the app for instant definitions.

**Component:** `core/components/glossary/TermTooltip.tsx`

```tsx
<p>
  A <TermTooltip term="pod">Pod</TermTooltip> runs inside
  a <TermTooltip term="node">Node</TermTooltip>.
</p>
```

**Popover content:**
- Term name (bold)
- Short definition
- Links: "→ Glossar" and "→ Vergleiche" (if comparisons exist)

**Behavior:**
- Show on hover (desktop)
- Show on tap (mobile)
- Dismiss on click outside

### 3. Glossary Page & Sidebar

**Page:** `/course/web-technologies/glossary` (or `/glossary`)

**Features:**
- Search box with instant filtering
- Category filter chips (Core, Networking, Storage, Workloads)
- Alphabetical term list
- Expanded view: definition, details, related terms, comparisons
- "Study this" button → marks term for focused flashcard session

**Sidebar:** Optional slide-out panel accessible from topic pages via icon.

### 4. Comparison Cards

Side-by-side views for commonly confused concepts.

**Component:** `core/components/glossary/ComparisonCard.tsx`

**Example comparisons:**
- ClusterIP vs NodePort vs LoadBalancer
- Pod vs Container
- Deployment vs ReplicaSet
- PersistentVolume vs PersistentVolumeClaim
- Service vs Ingress

**Display:**
```
┌─────────────────────────────────────────────────┐
│  ClusterIP          vs          NodePort        │
├─────────────────────────────────────────────────┤
│  Internal only                  External access │
│  No port on node                Opens node port │
│  Default service type           Explicit config │
├─────────────────────────────────────────────────┤
│  Common confusion: Both provide stable IPs,    │
│  but ClusterIP is only reachable from inside   │
│  the cluster.                                   │
└─────────────────────────────────────────────────┘
```

### 5. Request Tracing Scenarios

Interactive diagrams showing request flow through a K8s cluster.

**Component:** `core/components/scenarios/RequestTracer.tsx`

**Four scenarios:**

| ID | Title | Path |
|----|-------|------|
| `external-to-pod` | External → Pod | User → NodePort → Service → Pod |
| `pod-to-pod` | Pod → Pod | Pod A → ClusterIP Service → Pod B |
| `pod-to-external` | Pod → External | Pod → NAT → Internet |
| `dns-resolution` | DNS Resolution | Pod → CoreDNS → Service IP |

**Interaction model:**
- Full cluster diagram visible (2 nodes, pods, services)
- Play button starts animated packet tracing the path
- Pause anytime to explore
- Click any component for glossary popover
- Step indicator shows progress: "Step 3/7 - Service routing"
- Bottom panel shows explanation for current step

**Reuses:**
- `StepNavigator` pattern for step controls
- `useStepNavigator` hook for state
- Framer Motion for packet animation
- Glossary data for component popovers

### 6. Flashcards

Auto-generated cards from glossary data.

**Card types:**

| Type | Front | Back |
|------|-------|------|
| Term → Definition | "Was ist ein Pod?" | Definition |
| Definition → Term | "Kleinste deploybare Einheit..." | "Pod" |
| Comparison | "Unterschied ClusterIP vs NodePort?" | Differences list |
| Scenario | "Wie erreicht ein externer Request einen Pod?" | Step summary |

**Components:**
- `FlashcardDeck.tsx` - Card stack with flip animation
- `FlashcardCard.tsx` - Single card with front/back
- `StudyStats.tsx` - Streak, weak areas, due cards

**Page:** `/course/web-technologies/flashcards`

### 7. Spaced Repetition

Binary (know/don't know) algorithm with streak-based scheduling.

**Algorithm:**
```
Know (✓):
  nextReview = today + (streak * 2) days
  streak += 1

Don't Know (✗):
  nextReview = today + 1 day
  streak = 0
```

**Examples:**
- Streak 0 → next in 2 days
- Streak 1 → next in 4 days
- Streak 3 → next in 8 days
- Miss any → back to 1 day

### 8. Quick-Fire Mode

Rapid-fire card review with configurable modes.

**Component:** `core/components/flashcards/QuickFireMode.tsx`

**Modes:**

| Mode | Behavior |
|------|----------|
| Random weak | Cards where correctRate < 70%, shuffled |
| Due today | Cards where nextReview <= today |
| Category focus | Filter by glossary category |
| Timed | Optional 10s countdown per card |

**UI:**
- Mode selector (chips/dropdown)
- Timer toggle
- Card display area
- Know / Don't Know buttons
- Session stats at end

### 9. Progress Persistence

Git-committed JSON file for cross-device sync.

**File:** `data/progress.json`

```typescript
type StudyProgress = {
  lastUpdated: string
  cards: Record<string, CardProgress>
  sessions: StudySession[]
}

type CardProgress = {
  lastSeen: string
  nextReview: string
  streak: number
  totalSeen: number
  totalCorrect: number
}

type StudySession = {
  date: string
  cardsReviewed: number
  correctRate: number
}
```

**Backend endpoint:** `POST /api/progress` writes to `data/progress.json`

**Sync workflow:**
1. Progress auto-saves on each card review
2. Manual `git commit && git push` when done
3. `git pull` on other device before studying

## Architecture

```
exam-trainer/
├── data/
│   └── progress.json              # Persisted study state (git-tracked)
├── src/frontend/
│   └── core/
│       ├── data/
│       │   └── k8s-glossary.ts    # Terms, comparisons, scenarios
│       ├── hooks/
│       │   ├── useGlossary.ts     # Access/search terms
│       │   ├── useFlashcards.ts   # Card selection, SR logic
│       │   └── useStudyProgress.ts # Read/write progress
│       └── components/
│           ├── glossary/
│           │   ├── TermTooltip.tsx
│           │   ├── GlossarySidebar.tsx
│           │   ├── ComparisonCard.tsx
│           │   └── TermBadge.tsx
│           ├── flashcards/
│           │   ├── FlashcardDeck.tsx
│           │   ├── FlashcardCard.tsx
│           │   ├── QuickFireMode.tsx
│           │   ├── ModeSelector.tsx
│           │   └── StudyStats.tsx
│           └── scenarios/
│               ├── RequestTracer.tsx
│               ├── ClusterDiagram.tsx
│               ├── RequestPacket.tsx
│               ├── ComponentPopover.tsx
│               └── ScenarioStepper.tsx
└── src/backend/
    └── routes/
        └── progress.py            # POST /api/progress endpoint
```

## Out of Scope

- UI sync button / git status indicator
- Complex FSRS algorithm
- App-wide glossary (K8s/Docker only for now)
- Mobile app / PWA features
- Audio/video content

## Implementation Order

1. **Data layer** - `k8s-glossary.ts` with initial terms
2. **Progress persistence** - `useStudyProgress` + backend endpoint + `progress.json`
3. **Glossary page** - Basic searchable term list
4. **Tooltips** - `TermTooltip` component
5. **Comparison cards** - `ComparisonCard` component
6. **Flashcards** - Deck, cards, basic study flow
7. **Spaced repetition** - Binary algorithm in `useFlashcards`
8. **Quick-fire mode** - Mode selector, timer option
9. **Request scenarios** - Cluster diagram + 4 scenarios

## Open Questions

None - design validated through brainstorming session.
