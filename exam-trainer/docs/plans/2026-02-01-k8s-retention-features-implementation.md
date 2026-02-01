# K8s Retention Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add flashcards, spaced repetition, glossary with tooltips, and request tracing scenarios for K8s/Docker content.

**Architecture:** Single glossary data file generates all content (terms, comparisons, cards). Progress stored in git-committed JSON. Hooks provide data access; components render UI. Backend endpoint persists study progress.

**Tech Stack:** React 18, TypeScript, Framer Motion, FastAPI, Tailwind CSS v4

---

## Task 1: K8s Glossary Data Layer

**Files:**
- Create: `src/frontend/core/data/k8s-glossary.ts`
- Create: `src/frontend/core/types/glossary.ts`

**Step 1: Create glossary types**

Create `src/frontend/core/types/glossary.ts`:

```typescript
// src/core/types/glossary.ts

export type TermCategory = 'core' | 'networking' | 'storage' | 'workloads'
export type ExamRelevance = 'high' | 'medium' | 'low'

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  details?: string
  category: TermCategory
  related: string[]
  examRelevance: ExamRelevance
}

export interface Comparison {
  id: string
  items: [string, string]
  differences: string[]
  commonConfusion: string
}

export interface ScenarioStep {
  component: string
  description: string
  highlight: string[]
}

export interface RequestScenario {
  id: string
  title: string
  description: string
  steps: ScenarioStep[]
}

export interface K8sGlossary {
  terms: GlossaryTerm[]
  comparisons: Comparison[]
  scenarios: RequestScenario[]
}
```

**Step 2: Create glossary data with initial terms**

Create `src/frontend/core/data/k8s-glossary.ts`:

```typescript
// src/core/data/k8s-glossary.ts
import type { K8sGlossary } from '@/core/types/glossary'

export const k8sGlossary: K8sGlossary = {
  terms: [
    // Core
    {
      id: 'cluster',
      term: 'Cluster',
      definition: 'Eine Gruppe von Nodes, die Container-Workloads ausführen.',
      details: 'Ein Kubernetes-Cluster besteht aus mindestens einem Control Plane und Worker Nodes. Der Control Plane verwaltet den Cluster-Zustand.',
      category: 'core',
      related: ['node', 'pod'],
      examRelevance: 'high',
    },
    {
      id: 'node',
      term: 'Node',
      definition: 'Ein Rechner (physisch oder virtuell) im Kubernetes-Cluster.',
      details: 'Jeder Node hat eine Node-IP und führt kubelet, Container Runtime und kube-proxy aus. Nodes können Worker oder Control Plane sein.',
      category: 'core',
      related: ['cluster', 'pod', 'node-ip'],
      examRelevance: 'high',
    },
    {
      id: 'pod',
      term: 'Pod',
      definition: 'Kleinste deploybare Einheit in Kubernetes. Enthält einen oder mehrere Container.',
      details: 'Container im selben Pod teilen sich Netzwerk (localhost) und Storage. Pods sind ephemer - sie können jederzeit neu erstellt werden.',
      category: 'core',
      related: ['container', 'deployment', 'cluster-ip'],
      examRelevance: 'high',
    },
    {
      id: 'container',
      term: 'Container',
      definition: 'Isolierte Laufzeitumgebung für eine Anwendung, basierend auf einem Image.',
      details: 'Container teilen sich den Kernel des Host-Systems, haben aber isolierte Prozesse, Netzwerk und Dateisystem.',
      category: 'core',
      related: ['pod', 'image'],
      examRelevance: 'medium',
    },
    {
      id: 'namespace',
      term: 'Namespace',
      definition: 'Logische Trennung von Ressourcen innerhalb eines Clusters.',
      details: 'Namespaces ermöglichen Multi-Tenancy. Standard-Namespaces: default, kube-system, kube-public.',
      category: 'core',
      related: ['cluster'],
      examRelevance: 'medium',
    },

    // Networking
    {
      id: 'service',
      term: 'Service',
      definition: 'Stabile Netzwerkadresse für eine Gruppe von Pods.',
      details: 'Services bieten Load Balancing und Service Discovery. Sie selektieren Pods über Labels.',
      category: 'networking',
      related: ['pod', 'cluster-ip', 'nodeport', 'loadbalancer'],
      examRelevance: 'high',
    },
    {
      id: 'cluster-ip',
      term: 'ClusterIP',
      definition: 'Interne IP-Adresse eines Services, nur innerhalb des Clusters erreichbar.',
      details: 'Standard-Service-Typ. Die ClusterIP ist stabil, auch wenn die dahinterliegenden Pods wechseln.',
      category: 'networking',
      related: ['service', 'node-ip', 'nodeport'],
      examRelevance: 'high',
    },
    {
      id: 'node-ip',
      term: 'Node-IP',
      definition: 'Die externe IP-Adresse eines Nodes im Cluster.',
      details: 'Node-IPs sind von außerhalb des Clusters erreichbar. NodePort-Services binden an diese IP.',
      category: 'networking',
      related: ['node', 'nodeport', 'cluster-ip'],
      examRelevance: 'high',
    },
    {
      id: 'nodeport',
      term: 'NodePort',
      definition: 'Service-Typ, der einen Port auf jedem Node öffnet für externen Zugriff.',
      details: 'Port-Range: 30000-32767. Erreichbar über NodeIP:NodePort. Leitet zu ClusterIP weiter.',
      category: 'networking',
      related: ['service', 'node-ip', 'cluster-ip', 'loadbalancer'],
      examRelevance: 'high',
    },
    {
      id: 'loadbalancer',
      term: 'LoadBalancer',
      definition: 'Service-Typ, der einen externen Load Balancer provisioniert.',
      details: 'Nur in Cloud-Umgebungen verfügbar. Erstellt automatisch NodePort und ClusterIP.',
      category: 'networking',
      related: ['service', 'nodeport', 'ingress'],
      examRelevance: 'medium',
    },
    {
      id: 'ingress',
      term: 'Ingress',
      definition: 'HTTP/HTTPS-Routing von außen zu Services im Cluster.',
      details: 'Ermöglicht URL-basiertes Routing, SSL-Termination und Virtual Hosts. Benötigt Ingress Controller.',
      category: 'networking',
      related: ['service', 'loadbalancer'],
      examRelevance: 'medium',
    },
    {
      id: 'kube-proxy',
      term: 'kube-proxy',
      definition: 'Netzwerk-Proxy auf jedem Node, der Service-Traffic zu Pods routet.',
      details: 'Implementiert die Service-Abstraktion mittels iptables oder IPVS Regeln.',
      category: 'networking',
      related: ['service', 'node', 'cluster-ip'],
      examRelevance: 'medium',
    },
    {
      id: 'coredns',
      term: 'CoreDNS',
      definition: 'DNS-Server im Cluster für Service Discovery.',
      details: 'Löst Service-Namen auf: my-service.namespace.svc.cluster.local → ClusterIP.',
      category: 'networking',
      related: ['service', 'cluster-ip'],
      examRelevance: 'high',
    },

    // Storage
    {
      id: 'volume',
      term: 'Volume',
      definition: 'Speicher, der an einen Pod angehängt wird.',
      details: 'Volumes überleben Container-Neustarts, aber nicht Pod-Neustarts (außer PersistentVolumes).',
      category: 'storage',
      related: ['pod', 'persistent-volume', 'pvc'],
      examRelevance: 'high',
    },
    {
      id: 'persistent-volume',
      term: 'PersistentVolume (PV)',
      definition: 'Cluster-weite Speicherressource, unabhängig von Pods.',
      details: 'PVs werden vom Admin bereitgestellt. Sie haben einen Lifecycle unabhängig von Pods.',
      category: 'storage',
      related: ['pvc', 'volume', 'storage-class'],
      examRelevance: 'high',
    },
    {
      id: 'pvc',
      term: 'PersistentVolumeClaim (PVC)',
      definition: 'Anforderung eines Pods an Speicher (Größe, Access Mode).',
      details: 'PVCs werden an passende PVs gebunden. Pods referenzieren PVCs, nicht PVs direkt.',
      category: 'storage',
      related: ['persistent-volume', 'pod', 'storage-class'],
      examRelevance: 'high',
    },
    {
      id: 'storage-class',
      term: 'StorageClass',
      definition: 'Definiert Speicher-Typen für dynamische PV-Provisionierung.',
      details: 'Ermöglicht automatische PV-Erstellung wenn ein PVC erstellt wird.',
      category: 'storage',
      related: ['persistent-volume', 'pvc'],
      examRelevance: 'low',
    },

    // Workloads
    {
      id: 'deployment',
      term: 'Deployment',
      definition: 'Deklarative Definition des gewünschten Pod-Zustands.',
      details: 'Verwaltet ReplicaSets für Rolling Updates. Definiert replicas, image, resources.',
      category: 'workloads',
      related: ['pod', 'replicaset', 'rollout'],
      examRelevance: 'high',
    },
    {
      id: 'replicaset',
      term: 'ReplicaSet',
      definition: 'Stellt sicher, dass eine bestimmte Anzahl von Pod-Replicas läuft.',
      details: 'Wird normalerweise nicht direkt erstellt, sondern von Deployments verwaltet.',
      category: 'workloads',
      related: ['deployment', 'pod'],
      examRelevance: 'medium',
    },
    {
      id: 'daemonset',
      term: 'DaemonSet',
      definition: 'Stellt sicher, dass auf jedem Node ein Pod läuft.',
      details: 'Nützlich für Node-Agents wie Log-Collector oder Monitoring.',
      category: 'workloads',
      related: ['pod', 'node'],
      examRelevance: 'low',
    },
    {
      id: 'statefulset',
      term: 'StatefulSet',
      definition: 'Wie Deployment, aber für stateful Anwendungen mit stabilen Identitäten.',
      details: 'Pods bekommen stabile Hostnamen (pod-0, pod-1, ...) und persistenten Speicher.',
      category: 'workloads',
      related: ['deployment', 'pvc'],
      examRelevance: 'low',
    },
    {
      id: 'labels',
      term: 'Labels',
      definition: 'Key-Value-Paare zur Organisation und Selektion von Ressourcen.',
      details: 'Services und Deployments nutzen Label-Selektoren um Pods zu finden.',
      category: 'core',
      related: ['pod', 'service', 'deployment'],
      examRelevance: 'high',
    },
    {
      id: 'manifest',
      term: 'Manifest',
      definition: 'YAML-Datei, die den gewünschten Zustand einer Ressource beschreibt.',
      details: 'Enthält apiVersion, kind, metadata und spec. Wird mit kubectl apply angewendet.',
      category: 'core',
      related: ['deployment', 'service', 'pod'],
      examRelevance: 'high',
    },
  ],

  comparisons: [
    {
      id: 'clusterip-vs-nodeport',
      items: ['cluster-ip', 'nodeport'],
      differences: [
        'ClusterIP ist nur intern erreichbar, NodePort von außen',
        'NodePort öffnet einen Port (30000-32767) auf jedem Node',
        'ClusterIP ist der Standard-Service-Typ',
        'NodePort erstellt automatisch auch eine ClusterIP',
      ],
      commonConfusion: 'Beide bieten stabile IPs, aber ClusterIP ist NUR aus dem Cluster erreichbar.',
    },
    {
      id: 'nodeport-vs-loadbalancer',
      items: ['nodeport', 'loadbalancer'],
      differences: [
        'NodePort erfordert Wissen der Node-IPs',
        'LoadBalancer bekommt eine externe IP automatisch',
        'LoadBalancer nur in Cloud-Umgebungen verfügbar',
        'LoadBalancer erstellt automatisch NodePort + ClusterIP',
      ],
      commonConfusion: 'LoadBalancer ist ein "erweiterter" NodePort mit automatischer externer IP.',
    },
    {
      id: 'pod-vs-container',
      items: ['pod', 'container'],
      differences: [
        'Ein Pod kann mehrere Container enthalten',
        'Container im Pod teilen Netzwerk (localhost)',
        'Container im Pod teilen Volumes',
        'Kubernetes scheduled Pods, nicht Container',
      ],
      commonConfusion: 'Pod ≠ Container. Ein Pod ist eine Gruppe von Containern mit shared resources.',
    },
    {
      id: 'deployment-vs-replicaset',
      items: ['deployment', 'replicaset'],
      differences: [
        'Deployment verwaltet ReplicaSets',
        'Deployment ermöglicht Rolling Updates',
        'ReplicaSet nur für Replica-Anzahl zuständig',
        'Nie ReplicaSet direkt erstellen, immer Deployment',
      ],
      commonConfusion: 'Deployment ist die höhere Abstraktion - verwende immer Deployment.',
    },
    {
      id: 'pv-vs-pvc',
      items: ['persistent-volume', 'pvc'],
      differences: [
        'PV ist die tatsächliche Speicherressource',
        'PVC ist die Anforderung/Request',
        'Admin erstellt PV, Developer erstellt PVC',
        'PVC wird an passendes PV gebunden',
      ],
      commonConfusion: 'Pods referenzieren PVC, nicht PV. PVC ist wie eine "Bestellung" für Speicher.',
    },
    {
      id: 'clusterip-vs-nodeip',
      items: ['cluster-ip', 'node-ip'],
      differences: [
        'ClusterIP ist virtuell, nur intern erreichbar',
        'Node-IP ist die echte Netzwerk-IP des Rechners',
        'ClusterIP gehört zu Services',
        'Node-IP gehört zu Nodes',
      ],
      commonConfusion: 'Komplett verschiedene Konzepte! ClusterIP = Service-intern, Node-IP = Rechner-extern.',
    },
    {
      id: 'service-vs-ingress',
      items: ['service', 'ingress'],
      differences: [
        'Service arbeitet auf L4 (TCP/UDP)',
        'Ingress arbeitet auf L7 (HTTP/HTTPS)',
        'Ingress ermöglicht URL-basiertes Routing',
        'Ingress kann SSL terminieren',
      ],
      commonConfusion: 'Ingress ist kein Service-Ersatz, sondern routet zu Services.',
    },
  ],

  scenarios: [
    {
      id: 'external-to-pod',
      title: 'External → Pod',
      description: 'Wie erreicht ein Request von außen einen Pod im Cluster?',
      steps: [
        {
          component: 'user',
          description: 'User sendet Request an NodeIP:NodePort (z.B. 192.168.1.10:30080)',
          highlight: ['node'],
        },
        {
          component: 'node-ip',
          description: 'Request erreicht Node über dessen externe IP-Adresse',
          highlight: ['node', 'nodeport'],
        },
        {
          component: 'kube-proxy',
          description: 'kube-proxy fängt Traffic auf NodePort ab, leitet zu ClusterIP weiter',
          highlight: ['kube-proxy', 'service'],
        },
        {
          component: 'service',
          description: 'Service wählt einen Pod über Label-Selektor aus',
          highlight: ['service', 'labels'],
        },
        {
          component: 'cluster-ip',
          description: 'Traffic wird zur ClusterIP des Services geroutet',
          highlight: ['cluster-ip'],
        },
        {
          component: 'pod',
          description: 'Request erreicht Container im ausgewählten Pod',
          highlight: ['pod', 'container'],
        },
      ],
    },
    {
      id: 'pod-to-pod',
      title: 'Pod → Pod',
      description: 'Wie kommuniziert ein Pod mit einem anderen Pod?',
      steps: [
        {
          component: 'pod',
          description: 'Pod A will mit Service "backend" kommunizieren',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'Pod fragt CoreDNS: Was ist die IP von backend.default.svc.cluster.local?',
          highlight: ['coredns'],
        },
        {
          component: 'cluster-ip',
          description: 'CoreDNS antwortet mit der ClusterIP des backend-Service',
          highlight: ['cluster-ip', 'service'],
        },
        {
          component: 'kube-proxy',
          description: 'kube-proxy routet Traffic zur ClusterIP an einen Backend-Pod',
          highlight: ['kube-proxy'],
        },
        {
          component: 'pod',
          description: 'Request erreicht Pod B (einer der Backend-Pods)',
          highlight: ['pod'],
        },
      ],
    },
    {
      id: 'pod-to-external',
      title: 'Pod → External',
      description: 'Wie erreicht ein Pod das Internet?',
      steps: [
        {
          component: 'pod',
          description: 'Pod will externe API aufrufen (z.B. api.example.com)',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'CoreDNS löst externen DNS-Namen auf (oder leitet zu externem DNS)',
          highlight: ['coredns'],
        },
        {
          component: 'node',
          description: 'Traffic verlässt Pod über Node-Netzwerk',
          highlight: ['node'],
        },
        {
          component: 'nat',
          description: 'Source NAT: Pod-IP wird zu Node-IP übersetzt',
          highlight: ['node-ip'],
        },
        {
          component: 'external',
          description: 'Request erreicht externes Ziel mit Node-IP als Absender',
          highlight: [],
        },
      ],
    },
    {
      id: 'dns-resolution',
      title: 'DNS Resolution',
      description: 'Wie funktioniert Service Discovery via DNS?',
      steps: [
        {
          component: 'pod',
          description: 'Pod will "my-service" erreichen',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'Kubelet konfiguriert Pod DNS auf CoreDNS',
          highlight: ['coredns'],
        },
        {
          component: 'dns-query',
          description: 'DNS-Query: my-service → my-service.default.svc.cluster.local',
          highlight: ['coredns'],
        },
        {
          component: 'service',
          description: 'CoreDNS findet Service-Eintrag in seiner Datenbank',
          highlight: ['service'],
        },
        {
          component: 'cluster-ip',
          description: 'Antwort: ClusterIP des Services (z.B. 10.96.0.15)',
          highlight: ['cluster-ip'],
        },
        {
          component: 'pod',
          description: 'Pod kann jetzt die ClusterIP direkt ansprechen',
          highlight: ['pod', 'cluster-ip'],
        },
      ],
    },
  ],
}

// Helper functions
export function getTermById(id: string): GlossaryTerm | undefined {
  return k8sGlossary.terms.find(t => t.id === id)
}

export function getTermsByCategory(category: TermCategory): GlossaryTerm[] {
  return k8sGlossary.terms.filter(t => t.category === category)
}

export function getComparisonById(id: string): Comparison | undefined {
  return k8sGlossary.comparisons.find(c => c.id === id)
}

export function getComparisonsForTerm(termId: string): Comparison[] {
  return k8sGlossary.comparisons.filter(c => c.items.includes(termId))
}

export function getScenarioById(id: string): RequestScenario | undefined {
  return k8sGlossary.scenarios.find(s => s.id === id)
}

export type { TermCategory, ExamRelevance } from '@/core/types/glossary'
```

**Step 3: Export from types index**

Modify `src/frontend/core/types/content.ts` - add at the end:

```typescript
// Re-export glossary types
export type {
  GlossaryTerm,
  Comparison,
  RequestScenario,
  ScenarioStep,
  K8sGlossary,
  TermCategory,
  ExamRelevance,
} from './glossary'
```

**Step 4: Verify TypeScript compiles**

Run: `docker compose exec app bun run build`
Expected: Build succeeds without errors

**Step 5: Commit**

```bash
git add src/frontend/core/types/glossary.ts src/frontend/core/data/k8s-glossary.ts src/frontend/core/types/content.ts
git commit -m "feat: add K8s glossary data layer with terms, comparisons, scenarios"
```

---

## Task 2: Study Progress Types and Backend

**Files:**
- Create: `src/frontend/core/types/study.ts`
- Modify: `src/backend/src/exam_trainer_api/routers/progress.py`
- Modify: `src/backend/src/exam_trainer_api/models/schemas.py`

**Step 1: Create study progress types**

Create `src/frontend/core/types/study.ts`:

```typescript
// src/core/types/study.ts

export interface CardProgress {
  lastSeen: string
  nextReview: string
  streak: number
  totalSeen: number
  totalCorrect: number
}

export interface StudySession {
  date: string
  cardsReviewed: number
  correctCount: number
}

export interface StudyProgress {
  lastUpdated: string
  cards: Record<string, CardProgress>
  sessions: StudySession[]
}

export function createEmptyProgress(): StudyProgress {
  return {
    lastUpdated: new Date().toISOString(),
    cards: {},
    sessions: [],
  }
}

export function calculateNextReview(knew: boolean, currentStreak: number): { nextReview: string; newStreak: number } {
  const today = new Date()

  if (knew) {
    const daysUntilReview = Math.max(2, (currentStreak + 1) * 2)
    const nextDate = new Date(today)
    nextDate.setDate(nextDate.getDate() + daysUntilReview)
    return {
      nextReview: nextDate.toISOString().split('T')[0],
      newStreak: currentStreak + 1,
    }
  } else {
    const nextDate = new Date(today)
    nextDate.setDate(nextDate.getDate() + 1)
    return {
      nextReview: nextDate.toISOString().split('T')[0],
      newStreak: 0,
    }
  }
}
```

**Step 2: Add Pydantic schemas for study progress**

Modify `src/backend/src/exam_trainer_api/models/schemas.py` - add:

```python
# Add to existing schemas.py

class CardProgress(BaseModel):
    lastSeen: str
    nextReview: str
    streak: int
    totalSeen: int
    totalCorrect: int


class StudySession(BaseModel):
    date: str
    cardsReviewed: int
    correctCount: int


class StudyProgress(BaseModel):
    lastUpdated: str
    cards: dict[str, CardProgress]
    sessions: list[StudySession]
```

**Step 3: Add study progress endpoint**

Modify `src/backend/src/exam_trainer_api/routers/progress.py` - add these endpoints:

```python
# Add imports at top
from exam_trainer_api.models.schemas import StudyProgress

# Add new file path
STUDY_PROGRESS_FILE = Path("/data/study-progress.json")


def load_study_progress() -> dict:
    """Load study progress from JSON file."""
    if STUDY_PROGRESS_FILE.exists():
        return json.loads(STUDY_PROGRESS_FILE.read_text())
    return {
        "lastUpdated": datetime.now().isoformat(),
        "cards": {},
        "sessions": [],
    }


def save_study_progress(progress: dict) -> None:
    """Save study progress to JSON file."""
    progress["lastUpdated"] = datetime.now().isoformat()
    STUDY_PROGRESS_FILE.parent.mkdir(parents=True, exist_ok=True)
    STUDY_PROGRESS_FILE.write_text(json.dumps(progress, indent=2))


@router.get("/study-progress")
def get_study_progress():
    """Get flashcard study progress."""
    return load_study_progress()


@router.post("/study-progress")
def update_study_progress(progress: StudyProgress):
    """Save flashcard study progress."""
    save_study_progress(progress.model_dump())
    return {"status": "saved"}
```

**Step 4: Verify backend starts**

Run: `docker compose restart backend && docker compose logs backend --tail 20`
Expected: Backend starts without errors, shows FastAPI startup

**Step 5: Test endpoint manually**

Run: `docker compose exec backend curl -s http://localhost:8000/api/study-progress | head`
Expected: Returns JSON with empty cards and sessions

**Step 6: Commit**

```bash
git add src/frontend/core/types/study.ts src/backend/src/exam_trainer_api/routers/progress.py src/backend/src/exam_trainer_api/models/schemas.py
git commit -m "feat: add study progress types and backend endpoint"
```

---

## Task 3: useGlossary Hook

**Files:**
- Create: `src/frontend/core/hooks/useGlossary.ts`
- Modify: `src/frontend/core/hooks/index.ts`

**Step 1: Create useGlossary hook**

Create `src/frontend/core/hooks/useGlossary.ts`:

```typescript
// src/core/hooks/useGlossary.ts
import { useMemo, useState, useCallback } from 'react'
import {
  k8sGlossary,
  getTermById,
  getTermsByCategory,
  getComparisonsForTerm,
  getComparisonById,
  getScenarioById,
} from '@/core/data/k8s-glossary'
import type { GlossaryTerm, Comparison, RequestScenario, TermCategory } from '@/core/types/glossary'

export interface UseGlossaryOptions {
  category?: TermCategory
}

export interface GlossaryState {
  terms: GlossaryTerm[]
  filteredTerms: GlossaryTerm[]
  comparisons: Comparison[]
  scenarios: RequestScenario[]
  searchQuery: string
  selectedCategory: TermCategory | null
}

export function useGlossary(options: UseGlossaryOptions = {}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | null>(
    options.category ?? null
  )

  const terms = useMemo(() => {
    if (selectedCategory) {
      return getTermsByCategory(selectedCategory)
    }
    return k8sGlossary.terms
  }, [selectedCategory])

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) {
      return terms
    }
    const query = searchQuery.toLowerCase()
    return terms.filter(
      t =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query)
    )
  }, [terms, searchQuery])

  const getTerm = useCallback((id: string) => getTermById(id), [])

  const getComparisons = useCallback(
    (termId: string) => getComparisonsForTerm(termId),
    []
  )

  const getComparison = useCallback(
    (id: string) => getComparisonById(id),
    []
  )

  const getScenario = useCallback(
    (id: string) => getScenarioById(id),
    []
  )

  return {
    // Data
    terms,
    filteredTerms,
    comparisons: k8sGlossary.comparisons,
    scenarios: k8sGlossary.scenarios,

    // State
    searchQuery,
    selectedCategory,

    // Actions
    setSearchQuery,
    setSelectedCategory,

    // Getters
    getTerm,
    getComparisons,
    getComparison,
    getScenario,
  }
}
```

**Step 2: Export from hooks index**

Modify `src/frontend/core/hooks/index.ts` - add:

```typescript
export { useGlossary } from './useGlossary'
export type { UseGlossaryOptions, GlossaryState } from './useGlossary'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/hooks/useGlossary.ts src/frontend/core/hooks/index.ts
git commit -m "feat: add useGlossary hook for term access and search"
```

---

## Task 4: useStudyProgress Hook

**Files:**
- Create: `src/frontend/core/hooks/useStudyProgress.ts`
- Modify: `src/frontend/core/hooks/index.ts`

**Step 1: Create useStudyProgress hook**

Create `src/frontend/core/hooks/useStudyProgress.ts`:

```typescript
// src/core/hooks/useStudyProgress.ts
import { useState, useEffect, useCallback } from 'react'
import type { StudyProgress, CardProgress } from '@/core/types/study'
import { createEmptyProgress, calculateNextReview } from '@/core/types/study'

const API_BASE = '/api'

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress>(createEmptyProgress)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch(`${API_BASE}/study-progress`)
        if (response.ok) {
          const data = await response.json()
          setProgress(data)
        }
      } catch (err) {
        console.error('Failed to load study progress:', err)
        setError('Failed to load progress')
      } finally {
        setIsLoading(false)
      }
    }
    loadProgress()
  }, [])

  // Save progress to backend
  const saveProgress = useCallback(async (newProgress: StudyProgress) => {
    try {
      await fetch(`${API_BASE}/study-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress),
      })
    } catch (err) {
      console.error('Failed to save study progress:', err)
    }
  }, [])

  // Record a card review
  const recordCardReview = useCallback(
    (cardId: string, knew: boolean) => {
      setProgress(prev => {
        const existing = prev.cards[cardId]
        const currentStreak = existing?.streak ?? 0
        const { nextReview, newStreak } = calculateNextReview(knew, currentStreak)

        const updatedCard: CardProgress = {
          lastSeen: new Date().toISOString(),
          nextReview,
          streak: newStreak,
          totalSeen: (existing?.totalSeen ?? 0) + 1,
          totalCorrect: (existing?.totalCorrect ?? 0) + (knew ? 1 : 0),
        }

        const newProgress: StudyProgress = {
          ...prev,
          lastUpdated: new Date().toISOString(),
          cards: {
            ...prev.cards,
            [cardId]: updatedCard,
          },
        }

        // Save async
        saveProgress(newProgress)

        return newProgress
      })
    },
    [saveProgress]
  )

  // Record a study session
  const recordSession = useCallback(
    (cardsReviewed: number, correctCount: number) => {
      setProgress(prev => {
        const newProgress: StudyProgress = {
          ...prev,
          lastUpdated: new Date().toISOString(),
          sessions: [
            ...prev.sessions,
            {
              date: new Date().toISOString().split('T')[0],
              cardsReviewed,
              correctCount,
            },
          ],
        }

        saveProgress(newProgress)
        return newProgress
      })
    },
    [saveProgress]
  )

  // Get cards due for review
  const getCardsDue = useCallback((): string[] => {
    const today = new Date().toISOString().split('T')[0]
    return Object.entries(progress.cards)
      .filter(([_, card]) => card.nextReview <= today)
      .map(([id]) => id)
  }, [progress.cards])

  // Get weak cards (< 70% correct rate)
  const getWeakCards = useCallback((): string[] => {
    return Object.entries(progress.cards)
      .filter(([_, card]) => {
        if (card.totalSeen < 2) return false
        return card.totalCorrect / card.totalSeen < 0.7
      })
      .map(([id]) => id)
  }, [progress.cards])

  // Get card progress
  const getCardProgress = useCallback(
    (cardId: string): CardProgress | undefined => {
      return progress.cards[cardId]
    },
    [progress.cards]
  )

  return {
    progress,
    isLoading,
    error,
    recordCardReview,
    recordSession,
    getCardsDue,
    getWeakCards,
    getCardProgress,
  }
}
```

**Step 2: Export from hooks index**

Modify `src/frontend/core/hooks/index.ts` - add:

```typescript
export { useStudyProgress } from './useStudyProgress'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/hooks/useStudyProgress.ts src/frontend/core/hooks/index.ts
git commit -m "feat: add useStudyProgress hook for flashcard progress tracking"
```

---

## Task 5: TermTooltip Component

**Files:**
- Create: `src/frontend/core/components/glossary/TermTooltip.tsx`
- Create: `src/frontend/core/components/glossary/index.ts`

**Step 1: Create TermTooltip component**

Create `src/frontend/core/components/glossary/TermTooltip.tsx`:

```typescript
// src/core/components/glossary/TermTooltip.tsx
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlossary } from '@/core/hooks'

interface TermTooltipProps {
  term: string
  children: ReactNode
}

export function TermTooltip({ term, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const { getTerm, getComparisons } = useGlossary()

  const glossaryTerm = getTerm(term)
  const comparisons = getComparisons(term)

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const spaceBelow = window.innerHeight - rect.bottom
      setPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
    }
  }, [isOpen])

  if (!glossaryTerm) {
    return <span>{children}</span>
  }

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        className="border-b border-dashed border-blue-400/50 cursor-help hover:border-blue-400 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-72 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl ${
              position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            } left-1/2 -translate-x-1/2`}
          >
            <div className="text-sm">
              <div className="font-semibold text-blue-400 mb-1">
                {glossaryTerm.term}
              </div>
              <div className="text-slate-300 leading-relaxed">
                {glossaryTerm.definition}
              </div>

              {glossaryTerm.details && (
                <div className="mt-2 text-slate-400 text-xs leading-relaxed">
                  {glossaryTerm.details}
                </div>
              )}

              <div className="mt-2 pt-2 border-t border-slate-700 flex gap-2 text-xs">
                <span className="text-slate-500">
                  {glossaryTerm.category}
                </span>
                {comparisons.length > 0 && (
                  <span className="text-purple-400">
                    {comparisons.length} Vergleich{comparisons.length > 1 ? 'e' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-slate-600 rotate-45 ${
                position === 'top'
                  ? 'bottom-[-5px] border-b border-r'
                  : 'top-[-5px] border-t border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
```

**Step 2: Create glossary components index**

Create `src/frontend/core/components/glossary/index.ts`:

```typescript
// src/core/components/glossary/index.ts
export { TermTooltip } from './TermTooltip'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/components/glossary/
git commit -m "feat: add TermTooltip component for inline glossary definitions"
```

---

## Task 6: ComparisonCard Component

**Files:**
- Create: `src/frontend/core/components/glossary/ComparisonCard.tsx`
- Modify: `src/frontend/core/components/glossary/index.ts`

**Step 1: Create ComparisonCard component**

Create `src/frontend/core/components/glossary/ComparisonCard.tsx`:

```typescript
// src/core/components/glossary/ComparisonCard.tsx
import { useGlossary } from '@/core/hooks'
import type { Comparison } from '@/core/types/glossary'

interface ComparisonCardProps {
  comparison: Comparison
  className?: string
}

export function ComparisonCard({ comparison, className = '' }: ComparisonCardProps) {
  const { getTerm } = useGlossary()

  const [term1, term2] = comparison.items.map(id => getTerm(id))

  if (!term1 || !term2) {
    return null
  }

  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center justify-center gap-3 text-lg">
          <span className="text-blue-400 font-semibold">{term1.term}</span>
          <span className="text-slate-500">vs</span>
          <span className="text-purple-400 font-semibold">{term2.term}</span>
        </div>
      </div>

      {/* Differences */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
              {term1.term}
            </div>
            <div className="text-sm text-slate-300">
              {term1.definition}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
              {term2.term}
            </div>
            <div className="text-sm text-slate-300">
              {term2.definition}
            </div>
          </div>
        </div>

        {/* Key differences */}
        <div className="mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Unterschiede
          </div>
          <ul className="space-y-1">
            {comparison.differences.map((diff, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-green-400">•</span>
                {diff}
              </li>
            ))}
          </ul>
        </div>

        {/* Common confusion */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="text-xs text-amber-400 uppercase tracking-wide mb-1">
            Häufige Verwechslung
          </div>
          <div className="text-sm text-amber-200/80">
            {comparison.commonConfusion}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Export ComparisonCard**

Modify `src/frontend/core/components/glossary/index.ts`:

```typescript
// src/core/components/glossary/index.ts
export { TermTooltip } from './TermTooltip'
export { ComparisonCard } from './ComparisonCard'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/components/glossary/
git commit -m "feat: add ComparisonCard component for side-by-side term comparison"
```

---

## Task 7: GlossaryPage

**Files:**
- Create: `src/frontend/pages/GlossaryPage.tsx`
- Modify: `src/frontend/pages/index.ts`
- Modify: `src/frontend/App.tsx`

**Step 1: Create GlossaryPage**

Create `src/frontend/pages/GlossaryPage.tsx`:

```typescript
// src/pages/GlossaryPage.tsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlossary } from '@/core/hooks'
import { ComparisonCard } from '@/core/components/glossary'
import type { TermCategory } from '@/core/types/glossary'

const categories: { id: TermCategory; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'networking', label: 'Networking' },
  { id: 'storage', label: 'Storage' },
  { id: 'workloads', label: 'Workloads' },
]

export function GlossaryPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [activeTab, setActiveTab] = useState<'terms' | 'comparisons'>('terms')
  const {
    filteredTerms,
    comparisons,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useGlossary()

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to={courseId ? `/course/${courseId}` : '/'}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Zurück
            </Link>
            <h1 className="text-xl font-bold">K8s Glossar</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Begriff suchen..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="flex gap-2 flex-wrap">
            {/* Tab toggle */}
            <div className="flex gap-1 p-1 bg-slate-800 rounded-lg mr-4">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Begriffe
              </button>
              <button
                onClick={() => setActiveTab('comparisons')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'comparisons'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vergleiche
              </button>
            </div>

            {/* Category filters (only for terms) */}
            {activeTab === 'terms' && (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Alle
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Terms list */}
        {activeTab === 'terms' && (
          <div className="space-y-3">
            {filteredTerms.map(term => (
              <div
                key={term.id}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-400">{term.term}</h3>
                    <p className="text-slate-300 mt-1">{term.definition}</p>
                    {term.details && (
                      <p className="text-slate-500 text-sm mt-2">{term.details}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      term.examRelevance === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : term.examRelevance === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-600/50 text-slate-400'
                    }`}>
                      {term.examRelevance === 'high' ? 'Wichtig' :
                       term.examRelevance === 'medium' ? 'Mittel' : 'Optional'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400">
                      {term.category}
                    </span>
                  </div>
                </div>

                {term.related.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <span className="text-xs text-slate-500">Verwandt: </span>
                    <span className="text-xs text-slate-400">
                      {term.related.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {filteredTerms.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                Keine Begriffe gefunden
              </div>
            )}
          </div>
        )}

        {/* Comparisons */}
        {activeTab === 'comparisons' && (
          <div className="space-y-6">
            {comparisons.map(comparison => (
              <ComparisonCard key={comparison.id} comparison={comparison} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
```

**Step 2: Export GlossaryPage**

Modify `src/frontend/pages/index.ts` - add:

```typescript
export { GlossaryPage } from './GlossaryPage'
```

**Step 3: Add route**

Modify `src/frontend/App.tsx`:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage, QuizPage, ExamPage, GlossaryPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage />} />
        <Route path="/course/:courseId/exam" element={<ExamPage />} />
        <Route path="/course/:courseId/glossary" element={<GlossaryPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Step 4: Verify in browser**

Run: `docker compose up -d`
Navigate to: http://localhost:5173/glossary
Expected: Glossary page shows with terms and comparisons tabs

**Step 5: Commit**

```bash
git add src/frontend/pages/GlossaryPage.tsx src/frontend/pages/index.ts src/frontend/App.tsx
git commit -m "feat: add GlossaryPage with searchable terms and comparisons"
```

---

## Task 8: FlashcardCard Component

**Files:**
- Create: `src/frontend/core/components/flashcards/FlashcardCard.tsx`
- Create: `src/frontend/core/components/flashcards/index.ts`

**Step 1: Create FlashcardCard component**

Create `src/frontend/core/components/flashcards/FlashcardCard.tsx`:

```typescript
// src/core/components/flashcards/FlashcardCard.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export type CardType = 'term-to-definition' | 'definition-to-term' | 'comparison' | 'scenario'

export interface FlashcardData {
  id: string
  type: CardType
  front: string
  back: string
  category?: string
}

interface FlashcardCardProps {
  card: FlashcardData
  onKnow: () => void
  onDontKnow: () => void
  showButtons?: boolean
}

export function FlashcardCard({ card, onKnow, onDontKnow, showButtons = true }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card */}
      <div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {card.category && (
              <span className="absolute top-4 left-4 px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400">
                {card.category}
              </span>
            )}
            <span className="absolute top-4 right-4 text-xs text-slate-500">
              {card.type === 'term-to-definition' ? 'Begriff → Definition' :
               card.type === 'definition-to-term' ? 'Definition → Begriff' :
               card.type === 'comparison' ? 'Vergleich' : 'Szenario'}
            </span>
            <div className="text-xl text-center text-white leading-relaxed">
              {card.front}
            </div>
            <div className="absolute bottom-4 text-xs text-slate-500">
              Klicken zum Umdrehen
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-800 border border-blue-500/50 rounded-xl p-6 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-lg text-center text-slate-200 leading-relaxed whitespace-pre-line">
              {card.back}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      {showButtons && isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mt-6 justify-center"
        >
          <button
            onClick={e => {
              e.stopPropagation()
              onDontKnow()
              setIsFlipped(false)
            }}
            className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Wusste ich nicht
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              onKnow()
              setIsFlipped(false)
            }}
            className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            Wusste ich
          </button>
        </motion.div>
      )}
    </div>
  )
}
```

**Step 2: Create flashcards index**

Create `src/frontend/core/components/flashcards/index.ts`:

```typescript
// src/core/components/flashcards/index.ts
export { FlashcardCard } from './FlashcardCard'
export type { FlashcardData, CardType } from './FlashcardCard'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/components/flashcards/
git commit -m "feat: add FlashcardCard component with flip animation"
```

---

## Task 9: useFlashcards Hook

**Files:**
- Create: `src/frontend/core/hooks/useFlashcards.ts`
- Modify: `src/frontend/core/hooks/index.ts`

**Step 1: Create useFlashcards hook**

Create `src/frontend/core/hooks/useFlashcards.ts`:

```typescript
// src/core/hooks/useFlashcards.ts
import { useMemo, useCallback } from 'react'
import { k8sGlossary } from '@/core/data/k8s-glossary'
import { useStudyProgress } from './useStudyProgress'
import type { FlashcardData, CardType } from '@/core/components/flashcards'
import type { TermCategory } from '@/core/types/glossary'

export type StudyMode = 'due' | 'weak' | 'all' | 'category'

export interface UseFlashcardsOptions {
  mode?: StudyMode
  category?: TermCategory
  limit?: number
}

export function useFlashcards(options: UseFlashcardsOptions = {}) {
  const { mode = 'all', category, limit } = options
  const { getCardsDue, getWeakCards, getCardProgress, recordCardReview } = useStudyProgress()

  // Generate all possible cards from glossary
  const allCards = useMemo((): FlashcardData[] => {
    const cards: FlashcardData[] = []

    // Term → Definition cards
    for (const term of k8sGlossary.terms) {
      cards.push({
        id: `term-def-${term.id}`,
        type: 'term-to-definition',
        front: `Was ist ein ${term.term}?`,
        back: term.definition,
        category: term.category,
      })

      // Definition → Term cards
      cards.push({
        id: `def-term-${term.id}`,
        type: 'definition-to-term',
        front: term.definition,
        back: term.term,
        category: term.category,
      })
    }

    // Comparison cards
    for (const comparison of k8sGlossary.comparisons) {
      const [term1, term2] = comparison.items.map(id =>
        k8sGlossary.terms.find(t => t.id === id)
      )
      if (term1 && term2) {
        cards.push({
          id: `comparison-${comparison.id}`,
          type: 'comparison',
          front: `Was ist der Unterschied zwischen ${term1.term} und ${term2.term}?`,
          back: comparison.differences.join('\n\n'),
          category: term1.category,
        })
      }
    }

    // Scenario cards
    for (const scenario of k8sGlossary.scenarios) {
      cards.push({
        id: `scenario-${scenario.id}`,
        type: 'scenario',
        front: scenario.description,
        back: scenario.steps.map((s, i) => `${i + 1}. ${s.description}`).join('\n'),
        category: 'networking',
      })
    }

    return cards
  }, [])

  // Filter cards based on mode
  const filteredCards = useMemo((): FlashcardData[] => {
    let cards = allCards

    // Filter by category if specified
    if (category) {
      cards = cards.filter(c => c.category === category)
    }

    // Filter by mode
    switch (mode) {
      case 'due': {
        const dueIds = new Set(getCardsDue())
        // Include cards that are due OR haven't been seen yet
        cards = cards.filter(c => dueIds.has(c.id) || !getCardProgress(c.id))
        break
      }
      case 'weak': {
        const weakIds = new Set(getWeakCards())
        cards = cards.filter(c => weakIds.has(c.id))
        break
      }
      case 'all':
      default:
        // No additional filtering
        break
    }

    // Apply limit
    if (limit && limit > 0) {
      cards = cards.slice(0, limit)
    }

    return cards
  }, [allCards, mode, category, limit, getCardsDue, getWeakCards, getCardProgress])

  // Shuffle cards
  const shuffledCards = useMemo(() => {
    const shuffled = [...filteredCards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [filteredCards])

  const reviewCard = useCallback(
    (cardId: string, knew: boolean) => {
      recordCardReview(cardId, knew)
    },
    [recordCardReview]
  )

  return {
    cards: shuffledCards,
    totalCards: allCards.length,
    reviewCard,
    getCardProgress,
  }
}
```

**Step 2: Export from hooks index**

Modify `src/frontend/core/hooks/index.ts` - add:

```typescript
export { useFlashcards } from './useFlashcards'
export type { StudyMode, UseFlashcardsOptions } from './useFlashcards'
```

**Step 3: Verify build**

Run: `docker compose exec app bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/frontend/core/hooks/useFlashcards.ts src/frontend/core/hooks/index.ts
git commit -m "feat: add useFlashcards hook with card generation and filtering"
```

---

## Task 10: FlashcardsPage

**Files:**
- Create: `src/frontend/pages/FlashcardsPage.tsx`
- Modify: `src/frontend/pages/index.ts`
- Modify: `src/frontend/App.tsx`

**Step 1: Create FlashcardsPage**

Create `src/frontend/pages/FlashcardsPage.tsx`:

```typescript
// src/pages/FlashcardsPage.tsx
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFlashcards, useStudyProgress } from '@/core/hooks'
import { FlashcardCard } from '@/core/components/flashcards'
import type { StudyMode } from '@/core/hooks'
import type { TermCategory } from '@/core/types/glossary'

const modes: { id: StudyMode; label: string; description: string }[] = [
  { id: 'due', label: 'Fällig heute', description: 'Karten zur Wiederholung' },
  { id: 'weak', label: 'Schwache Karten', description: 'Karten mit < 70% Erfolg' },
  { id: 'all', label: 'Alle Karten', description: 'Alle verfügbaren Karten' },
]

const categories: { id: TermCategory; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'networking', label: 'Networking' },
  { id: 'storage', label: 'Storage' },
  { id: 'workloads', label: 'Workloads' },
]

export function FlashcardsPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [mode, setMode] = useState<StudyMode>('due')
  const [category, setCategory] = useState<TermCategory | undefined>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 })
  const [isComplete, setIsComplete] = useState(false)
  const [useTimed, setUseTimed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  const { cards, reviewCard } = useFlashcards({ mode, category })
  const { recordSession } = useStudyProgress()

  const currentCard = cards[currentIndex]

  // Timer effect
  useEffect(() => {
    if (!useTimed || isComplete || !currentCard) return

    setTimeLeft(10)
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(false)
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentIndex, useTimed, isComplete, currentCard])

  const handleAnswer = (knew: boolean) => {
    if (!currentCard) return

    reviewCard(currentCard.id, knew)
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (knew ? 1 : 0),
    }))

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      recordSession(sessionStats.reviewed + 1, sessionStats.correct + (knew ? 1 : 0))
      setIsComplete(true)
    }
  }

  const resetSession = () => {
    setCurrentIndex(0)
    setSessionStats({ reviewed: 0, correct: 0 })
    setIsComplete(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={courseId ? `/course/${courseId}` : '/'}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Zurück
              </Link>
              <h1 className="text-xl font-bold">Flashcards</h1>
            </div>
            {!isComplete && cards.length > 0 && (
              <div className="text-slate-400">
                {currentIndex + 1} / {cards.length}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Mode selector (only when not in session) */}
        {currentIndex === 0 && !isComplete && (
          <div className="mb-8 space-y-4">
            {/* Mode selection */}
            <div className="flex gap-2 flex-wrap">
              {modes.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    mode === m.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCategory(undefined)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  !category
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Alle Kategorien
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    category === c.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Timer toggle */}
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={useTimed}
                onChange={e => setUseTimed(e.target.checked)}
                className="rounded"
              />
              Timer (10s pro Karte)
            </label>
          </div>
        )}

        {/* Timer display */}
        {useTimed && !isComplete && currentCard && (
          <div className="mb-4 flex justify-center">
            <div className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-slate-400'}`}>
              {timeLeft}s
            </div>
          </div>
        )}

        {/* Progress bar */}
        {!isComplete && cards.length > 0 && (
          <div className="mb-8 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        )}

        {/* Card display */}
        <AnimatePresence mode="wait">
          {!isComplete && currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <FlashcardCard
                card={currentCard}
                onKnow={() => handleAnswer(true)}
                onDontKnow={() => handleAnswer(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No cards message */}
        {!isComplete && cards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              {mode === 'due'
                ? 'Keine Karten fällig heute!'
                : mode === 'weak'
                ? 'Keine schwachen Karten!'
                : 'Keine Karten verfügbar.'}
            </div>
            <button
              onClick={() => setMode('all')}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Alle Karten lernen
            </button>
          </div>
        )}

        {/* Completion screen */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Session abgeschlossen!</h2>
            <div className="text-slate-400 mb-8">
              <p>Karten durchgearbeitet: {sessionStats.reviewed}</p>
              <p>Richtig: {sessionStats.correct} ({Math.round((sessionStats.correct / sessionStats.reviewed) * 100)}%)</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetSession}
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Nochmal
              </button>
              <Link
                to={courseId ? `/course/${courseId}` : '/'}
                className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Zurück zum Kurs
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
```

**Step 2: Export FlashcardsPage**

Modify `src/frontend/pages/index.ts` - add:

```typescript
export { FlashcardsPage } from './FlashcardsPage'
```

**Step 3: Add route**

Modify `src/frontend/App.tsx`:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage, QuizPage, ExamPage, GlossaryPage, FlashcardsPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage />} />
        <Route path="/course/:courseId/exam" element={<ExamPage />} />
        <Route path="/course/:courseId/glossary" element={<GlossaryPage />} />
        <Route path="/course/:courseId/flashcards" element={<FlashcardsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Step 4: Verify in browser**

Navigate to: http://localhost:5173/flashcards
Expected: Flashcards page with mode selector and cards

**Step 5: Commit**

```bash
git add src/frontend/pages/FlashcardsPage.tsx src/frontend/pages/index.ts src/frontend/App.tsx
git commit -m "feat: add FlashcardsPage with study modes and timer"
```

---

## Task 11: Add navigation links to CoursePage

**Files:**
- Modify: `src/frontend/pages/CoursePage.tsx`

**Step 1: Read current CoursePage**

Read: `src/frontend/pages/CoursePage.tsx`
Understand the current layout to add glossary/flashcard links

**Step 2: Add study tools section**

Add a section with links to Glossary and Flashcards after the header, before topics list.

Add after course description:

```tsx
{/* Study Tools */}
<div className="grid grid-cols-2 gap-4 mb-8">
  <Link
    to={`/course/${courseId}/glossary`}
    className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-colors group"
  >
    <div className="text-lg font-semibold text-blue-400 group-hover:text-blue-300">
      📖 K8s Glossar
    </div>
    <div className="text-sm text-slate-400 mt-1">
      Begriffe nachschlagen
    </div>
  </Link>
  <Link
    to={`/course/${courseId}/flashcards`}
    className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors group"
  >
    <div className="text-lg font-semibold text-purple-400 group-hover:text-purple-300">
      🎴 Flashcards
    </div>
    <div className="text-sm text-slate-400 mt-1">
      Begriffe lernen
    </div>
  </Link>
</div>
```

**Step 3: Verify in browser**

Navigate to: http://localhost:5173/course/web-technologies
Expected: Study tools section visible with links to Glossary and Flashcards

**Step 4: Commit**

```bash
git add src/frontend/pages/CoursePage.tsx
git commit -m "feat: add glossary and flashcard links to CoursePage"
```

---

## Remaining Tasks (Request Tracing Scenarios)

Tasks 12-15 implement the request tracing scenarios. These are more complex and can be added in a follow-up iteration:

- **Task 12:** ClusterDiagram base component (SVG cluster visualization)
- **Task 13:** RequestPacket animated component
- **Task 14:** RequestTracer page with scenario stepper
- **Task 15:** Integrate scenarios with glossary tooltips

These build on the existing DiagramShell and StepNavigator patterns from the codebase.

---

## Summary

**Core features (Tasks 1-11):**
1. ✅ Glossary data layer with types
2. ✅ Study progress backend endpoint
3. ✅ useGlossary hook
4. ✅ useStudyProgress hook
5. ✅ TermTooltip component
6. ✅ ComparisonCard component
7. ✅ GlossaryPage
8. ✅ FlashcardCard component
9. ✅ useFlashcards hook
10. ✅ FlashcardsPage
11. ✅ Navigation links

**Follow-up features (Tasks 12-15):**
- Request tracing scenarios with animated diagrams
