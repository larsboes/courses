# Playlist App Evolution Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the playlist-app topic into a comprehensive vertical-scrolling journey showing how a simple HTML form evolves into a Kubernetes-deployed microservices application (Ü7→Ü12).

**Architecture:** Single deep topic with 8 sections, 4 new interactive diagrams (PlaylistEvolutionTimeline, StorageEvolutionComparison, PlaylistCodeDiff, PlaylistApiExplorer), ~25 quiz questions. All code snippets from actual exercise files.

**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS

---

## Task 1: Create PlaylistEvolutionTimeline Diagram

**Files:**
- Create: `exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistEvolutionTimeline.tsx`
- Modify: `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`

**Step 1: Create the timeline diagram component**

```tsx
// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistEvolutionTimeline.tsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import type { DiagramProps } from '@/core/types/content'

interface Stage {
  id: string
  exercise: string
  title: string
  subtitle: string
  tech: string[]
  description: string
  architecture: React.ReactNode
}

const stages: Stage[] = [
  {
    id: 'ui',
    exercise: 'Ü7',
    title: 'Static UI',
    subtitle: 'HTML + CSS',
    tech: ['HTML5', 'CSS3', 'Responsive Design'],
    description: 'Grundlegende Benutzeroberfläche mit Formular für Playlist-Erstellung, Track-Eingabe und Anzeige.',
    architecture: (
      <g>
        <rect x={150} y={80} width={200} height={80} rx={8} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
        <text x={250} y={115} fill="#93c5fd" textAnchor="middle" fontSize={14} fontWeight={500}>Browser</text>
        <text x={250} y={135} fill="#64748b" textAnchor="middle" fontSize={11}>HTML + CSS</text>
        <text x={250} y={200} fill="#94a3b8" textAnchor="middle" fontSize={12}>Keine Datenpersistenz</text>
      </g>
    ),
  },
  {
    id: 'javascript',
    exercise: 'Ü8',
    title: 'Client-Side Storage',
    subtitle: '+ JavaScript & localStorage',
    tech: ['JavaScript', 'DOM API', 'localStorage', 'JSON'],
    description: 'JavaScript für Interaktivität und localStorage für clientseitige Datenpersistenz.',
    architecture: (
      <g>
        <rect x={100} y={60} width={150} height={80} rx={8} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
        <text x={175} y={95} fill="#93c5fd" textAnchor="middle" fontSize={14} fontWeight={500}>Browser</text>
        <text x={175} y={115} fill="#64748b" textAnchor="middle" fontSize={11}>HTML + CSS + JS</text>

        <motion.line x1={250} y1={100} x2={300} y2={100} stroke="#22c55e" strokeWidth={2} strokeDasharray="4 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />

        <rect x={300} y={70} width={120} height={60} rx={8} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
        <text x={360} y={100} fill="#86efac" textAnchor="middle" fontSize={12} fontWeight={500}>localStorage</text>
        <text x={360} y={115} fill="#64748b" textAnchor="middle" fontSize={10}>JSON</text>

        <text x={250} y={180} fill="#94a3b8" textAnchor="middle" fontSize={12}>Daten bleiben im Browser</text>
      </g>
    ),
  },
  {
    id: 'rest',
    exercise: 'Ü9',
    title: 'REST API',
    subtitle: '+ Flask Backend',
    tech: ['Flask', 'REST', 'HTTP', 'fetch()', 'OpenAPI'],
    description: 'Flask-Server mit REST API ersetzt localStorage. Frontend kommuniziert via HTTP.',
    architecture: (
      <g>
        <rect x={50} y={50} width={130} height={70} rx={8} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
        <text x={115} y={80} fill="#93c5fd" textAnchor="middle" fontSize={13} fontWeight={500}>Browser</text>
        <text x={115} y={100} fill="#64748b" textAnchor="middle" fontSize={10}>fetch() API</text>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <line x1={180} y1={85} x2={260} y2={85} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" />
          <text x={220} y={75} fill="#fcd34d" textAnchor="middle" fontSize={9}>HTTP/JSON</text>
        </motion.g>

        <rect x={260} y={50} width={130} height={70} rx={8} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
        <text x={325} y={80} fill="#d8b4fe" textAnchor="middle" fontSize={13} fontWeight={500}>Flask Server</text>
        <text x={325} y={100} fill="#64748b" textAnchor="middle" fontSize={10}>REST API</text>

        <rect x={260} y={140} width={130} height={40} rx={6} fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth={1} strokeDasharray="4 2" />
        <text x={325} y={165} fill="#94a3b8" textAnchor="middle" fontSize={10}>In-Memory Dict</text>

        <line x1={325} y1={120} x2={325} y2={140} stroke="#64748b" strokeWidth={1} />

        <text x={220} y={210} fill="#94a3b8" textAnchor="middle" fontSize={11}>Daten gehen bei Server-Neustart verloren</text>
      </g>
    ),
  },
  {
    id: 'microservices',
    exercise: 'Ü10',
    title: 'Microservices',
    subtitle: '+ Docker & CouchDB',
    tech: ['Docker', 'docker-compose', 'CouchDB', 'Environment Variables'],
    description: 'CouchDB als persistente Datenbank. Docker Compose orchestriert beide Services.',
    architecture: (
      <g>
        {/* Docker Compose boundary */}
        <rect x={30} y={30} width={440} height={180} rx={10} fill="none" stroke="#475569" strokeWidth={2} strokeDasharray="8 4" />
        <text x={45} y={50} fill="#64748b" fontSize={11}>docker-compose.yml</text>

        <rect x={50} y={60} width={110} height={60} rx={6} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
        <text x={105} y={90} fill="#93c5fd" textAnchor="middle" fontSize={12} fontWeight={500}>Browser</text>

        <motion.line x1={160} y1={90} x2={200} y2={90} stroke="#f59e0b" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />

        <rect x={200} y={60} width={120} height={60} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
        <text x={260} y={85} fill="#d8b4fe" textAnchor="middle" fontSize={12} fontWeight={500}>Flask</text>
        <text x={260} y={100} fill="#64748b" textAnchor="middle" fontSize={9}>:8001</text>

        <motion.line x1={320} y1={90} x2={350} y2={90} stroke="#22c55e" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />

        <rect x={350} y={60} width={110} height={60} rx={6} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
        <text x={405} y={85} fill="#86efac" textAnchor="middle" fontSize={12} fontWeight={500}>CouchDB</text>
        <text x={405} y={100} fill="#64748b" textAnchor="middle" fontSize={9}>:5984</text>

        <rect x={350} y={140} width={110} height={50} rx={6} fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth={1} />
        <text x={405} y={165} fill="#86efac" textAnchor="middle" fontSize={10}>Volume</text>
        <text x={405} y={178} fill="#64748b" textAnchor="middle" fontSize={8}>./dbdata</text>

        <line x1={405} y1={120} x2={405} y2={140} stroke="#22c55e" strokeWidth={1} />
      </g>
    ),
  },
  {
    id: 'kubernetes',
    exercise: 'Ü12',
    title: 'Kubernetes',
    subtitle: '+ K8s Orchestration',
    tech: ['Kubernetes', 'Deployments', 'Services', 'PersistentVolume', 'NodePort', 'ClusterIP'],
    description: 'Kubernetes orchestriert Container mit Deployments, Services und persistentem Storage.',
    architecture: (
      <g>
        {/* K8s Cluster boundary */}
        <rect x={20} y={20} width={460} height={200} rx={10} fill="none" stroke="#475569" strokeWidth={2} strokeDasharray="8 4" />
        <text x={35} y={40} fill="#64748b" fontSize={11}>Kubernetes Cluster</text>

        {/* External access */}
        <text x={100} y={15} fill="#f59e0b" fontSize={10}>NodePort :32000</text>
        <line x1={100} y1={20} x2={100} y2={50} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" />

        {/* Webserver Pod */}
        <rect x={50} y={50} width={100} height={70} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
        <text x={100} y={75} fill="#d8b4fe" textAnchor="middle" fontSize={11} fontWeight={500}>webserver</text>
        <text x={100} y={90} fill="#64748b" textAnchor="middle" fontSize={9}>Deployment</text>
        <circle cx={100} cy={105} r={8} fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" />
        <text x={100} y={108} fill="#d8b4fe" textAnchor="middle" fontSize={7}>Pod</text>

        {/* Webserver Service */}
        <rect x={50} y={130} width={100} height={35} rx={4} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={1} />
        <text x={100} y={152} fill="#93c5fd" textAnchor="middle" fontSize={9}>Service (NodePort)</text>

        <line x1={100} y1={120} x2={100} y2={130} stroke="#3b82f6" strokeWidth={1} />

        {/* Arrow to CouchDB */}
        <motion.line x1={150} y1={85} x2={250} y2={85} stroke="#22c55e" strokeWidth={2} strokeDasharray="4 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        <text x={200} y={75} fill="#64748b" textAnchor="middle" fontSize={8}>couchdb:5984</text>

        {/* CouchDB Pod */}
        <rect x={250} y={50} width={100} height={70} rx={6} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
        <text x={300} y={75} fill="#86efac" textAnchor="middle" fontSize={11} fontWeight={500}>couchdb</text>
        <text x={300} y={90} fill="#64748b" textAnchor="middle" fontSize={9}>Deployment</text>
        <circle cx={300} cy={105} r={8} fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" />
        <text x={300} y={108} fill="#86efac" textAnchor="middle" fontSize={7}>Pod</text>

        {/* CouchDB Service */}
        <rect x={250} y={130} width={100} height={35} rx={4} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={1} />
        <text x={300} y={152} fill="#93c5fd" textAnchor="middle" fontSize={9}>Service (ClusterIP)</text>

        <line x1={300} y1={120} x2={300} y2={130} stroke="#3b82f6" strokeWidth={1} />

        {/* PVC */}
        <rect x={380} y={50} width={90} height={70} rx={6} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth={2} />
        <text x={425} y={80} fill="#fcd34d" textAnchor="middle" fontSize={10} fontWeight={500}>PVC</text>
        <text x={425} y={95} fill="#64748b" textAnchor="middle" fontSize={8}>couchdb-pvc</text>
        <text x={425} y={108} fill="#64748b" textAnchor="middle" fontSize={8}>1Gi</text>

        <line x1={350} y1={85} x2={380} y2={85} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 2" />

        {/* PV */}
        <rect x={380} y={140} width={90} height={50} rx={6} fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth={1} />
        <text x={425} y={165} fill="#fcd34d" textAnchor="middle" fontSize={9}>PersistentVolume</text>
        <text x={425} y={180} fill="#64748b" textAnchor="middle" fontSize={7}>/mnt/data/couchdb</text>

        <line x1={425} y1={120} x2={425} y2={140} stroke="#f59e0b" strokeWidth={1} />
      </g>
    ),
  },
]

export function PlaylistEvolutionTimeline({ className }: DiagramProps) {
  const [activeStage, setActiveStage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Playlist App Evolution
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Von der statischen HTML-Seite zur Kubernetes-Anwendung
      </p>

      <div className="flex flex-col lg:flex-row gap-6" ref={containerRef}>
        {/* Timeline Navigation */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="flex lg:flex-col gap-2">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(index)}
                className={`
                  relative flex items-center gap-3 p-3 rounded-lg text-left transition-all
                  ${activeStage === index
                    ? 'bg-blue-900/30 border border-blue-700'
                    : 'bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50'}
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${activeStage === index ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}
                `}>
                  {stage.exercise}
                </div>
                <div className="hidden lg:block">
                  <div className={`text-sm font-medium ${activeStage === index ? 'text-blue-400' : 'text-slate-300'}`}>
                    {stage.title}
                  </div>
                  <div className="text-xs text-slate-500">{stage.subtitle}</div>
                </div>

                {/* Connector line */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute left-[1.4rem] top-full w-0.5 h-2 bg-slate-700" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Stage Header */}
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-amber-900/30 border border-amber-700 rounded text-amber-400 text-sm font-mono">
                  {stages[activeStage].exercise}
                </span>
                <h4 className="text-xl font-semibold text-slate-100">
                  {stages[activeStage].title}
                </h4>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {stages[activeStage].tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-slate-400">
                {stages[activeStage].description}
              </p>

              {/* Architecture Diagram */}
              <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                <svg viewBox="0 0 500 230" className="w-full max-w-[500px] mx-auto" style={{ minWidth: '350px' }}>
                  {stages[activeStage].architecture}
                </svg>
              </div>

              {/* What's New */}
              {activeStage > 0 && (
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                  <div className="text-green-400 font-medium text-sm mb-2">Was ist neu?</div>
                  <div className="text-sm text-slate-300">
                    {activeStage === 1 && 'JavaScript für DOM-Manipulation, localStorage für Datenpersistenz im Browser'}
                    {activeStage === 2 && 'Flask-Backend mit REST API, fetch() im Frontend, HTTP-Kommunikation'}
                    {activeStage === 3 && 'Docker Compose für Multi-Container, CouchDB für persistente Datenbank'}
                    {activeStage === 4 && 'Kubernetes Manifests, Deployments, Services, PersistentVolumeClaim'}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500"></div>
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500"></div>
            <span>Database</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></div>
            <span>Storage</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
```

**Step 2: Run build to verify no syntax errors**

Run: `cd exam-trainer && bun run build 2>&1 | head -30`
Expected: Build progresses (may fail on missing export, that's next step)

**Step 3: Add export to diagrams index**

Add to `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`:

```typescript
// Playlist Evolution Components
export { PlaylistEvolutionTimeline } from './PlaylistEvolutionTimeline'
```

**Step 4: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistEvolutionTimeline.tsx exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts
git commit -m "feat(diagrams): add PlaylistEvolutionTimeline component"
```

---

## Task 2: Create StorageEvolutionComparison Diagram

**Files:**
- Create: `exam-trainer/src/frontend/content/web-technologies/diagrams/StorageEvolutionComparison.tsx`
- Modify: `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`

**Step 1: Create the storage comparison component**

```tsx
// exam-trainer/src/frontend/content/web-technologies/diagrams/StorageEvolutionComparison.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type StorageType = 'localStorage' | 'inMemory' | 'couchdb'

interface StorageInfo {
  title: string
  exercise: string
  persistence: string
  multiUser: boolean
  scalability: string
  dataLocation: string
  pros: string[]
  cons: string[]
}

const storageInfo: Record<StorageType, StorageInfo> = {
  localStorage: {
    title: 'localStorage (Ü8)',
    exercise: 'Ü8',
    persistence: 'Browser-basiert',
    multiUser: false,
    scalability: 'Keine',
    dataLocation: 'Lokal im Browser',
    pros: ['Einfach zu implementieren', 'Kein Server nötig', 'Schnell'],
    cons: ['Nur ~5MB Speicher', 'Nicht geräteübergreifend', 'Kein Multi-User'],
  },
  inMemory: {
    title: 'In-Memory Dict (Ü9)',
    exercise: 'Ü9',
    persistence: 'Nur zur Laufzeit',
    multiUser: true,
    scalability: 'Begrenzt (RAM)',
    dataLocation: 'Server RAM',
    pros: ['Multi-User möglich', 'REST API', 'Einfache Implementierung'],
    cons: ['Daten bei Neustart verloren', 'RAM-begrenzt', 'Nicht skalierbar'],
  },
  couchdb: {
    title: 'CouchDB (Ü10/Ü12)',
    exercise: 'Ü10',
    persistence: 'Persistent (Disk)',
    multiUser: true,
    scalability: 'Horizontal skalierbar',
    dataLocation: 'Datenbank auf Disk',
    pros: ['Persistente Speicherung', 'Multi-User', 'Skalierbar', 'JSON-nativ'],
    cons: ['Komplexere Infrastruktur', 'Mehr Ressourcen', 'Latenz'],
  },
}

function DataFlowAnimation({ type, isActive }: { type: StorageType; isActive: boolean }) {
  if (!isActive) return null

  return (
    <svg viewBox="0 0 400 150" className="w-full max-w-[400px] mx-auto">
      {type === 'localStorage' && (
        <g>
          <rect x={50} y={40} width={100} height={70} rx={8} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={100} y={70} fill="#93c5fd" textAnchor="middle" fontSize={12} fontWeight={500}>Browser</text>
          <text x={100} y={88} fill="#64748b" textAnchor="middle" fontSize={10}>JavaScript</text>

          <motion.path
            d="M 150 75 L 200 75"
            stroke="#22c55e"
            strokeWidth={2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
          />
          <motion.circle cx={175} cy={75} r={4} fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />

          <rect x={200} y={40} width={120} height={70} rx={8} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
          <text x={260} y={70} fill="#86efac" textAnchor="middle" fontSize={12} fontWeight={500}>localStorage</text>
          <text x={260} y={88} fill="#64748b" textAnchor="middle" fontSize={10}>5MB max</text>
        </g>
      )}

      {type === 'inMemory' && (
        <g>
          <rect x={30} y={40} width={80} height={60} rx={6} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={70} y={70} fill="#93c5fd" textAnchor="middle" fontSize={11} fontWeight={500}>Browser</text>

          <motion.path
            d="M 110 70 L 160 70"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
          />
          <text x={135} y={60} fill="#fcd34d" textAnchor="middle" fontSize={8}>HTTP</text>

          <rect x={160} y={40} width={90} height={60} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
          <text x={205} y={65} fill="#d8b4fe" textAnchor="middle" fontSize={11} fontWeight={500}>Flask</text>
          <text x={205} y={80} fill="#64748b" textAnchor="middle" fontSize={9}>REST API</text>

          <motion.path
            d="M 250 70 L 290 70"
            stroke="#64748b"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.2 }}
          />

          <rect x={290} y={45} width={80} height={50} rx={6} fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth={1} strokeDasharray="4 2" />
          <text x={330} y={70} fill="#94a3b8" textAnchor="middle" fontSize={10}>RAM Dict</text>
          <text x={330} y={85} fill="#ef4444" textAnchor="middle" fontSize={8}>Volatile!</text>
        </g>
      )}

      {type === 'couchdb' && (
        <g>
          <rect x={20} y={40} width={70} height={55} rx={6} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={55} y={65} fill="#93c5fd" textAnchor="middle" fontSize={10} fontWeight={500}>Browser</text>

          <motion.path d="M 90 67 L 130 67" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={130} y={40} width={80} height={55} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
          <text x={170} y={65} fill="#d8b4fe" textAnchor="middle" fontSize={10} fontWeight={500}>Flask</text>

          <motion.path d="M 210 67 L 250 67" stroke="#22c55e" strokeWidth={2} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={250} y={40} width={80} height={55} rx={6} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
          <text x={290} y={65} fill="#86efac" textAnchor="middle" fontSize={10} fontWeight={500}>CouchDB</text>

          <motion.path d="M 290 95 L 290 115" stroke="#f59e0b" strokeWidth={1} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={250} y={115} width={80} height={30} rx={4} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth={1} />
          <text x={290} y={135} fill="#fcd34d" textAnchor="middle" fontSize={9}>Volume (Disk)</text>
        </g>
      )}
    </svg>
  )
}

export function StorageEvolutionComparison({ className }: DiagramProps) {
  const [selectedType, setSelectedType] = useState<StorageType>('localStorage')
  const [showAnimation, setShowAnimation] = useState(true)

  const info = storageInfo[selectedType]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Storage Evolution
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Vergleich der Speicher-Strategien im Playlist-Projekt
      </p>

      {/* Storage Type Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['localStorage', 'inMemory', 'couchdb'] as StorageType[]).map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedType(type)}
          >
            {storageInfo[type].title}
          </Button>
        ))}
      </div>

      {/* Data Flow Animation */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
        <DataFlowAnimation type={selectedType} isActive={showAnimation} />
      </div>

      {/* Info Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Persistenz</div>
            <div className="text-sm text-slate-200 font-medium">{info.persistence}</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Multi-User</div>
            <div className={`text-sm font-medium ${info.multiUser ? 'text-green-400' : 'text-red-400'}`}>
              {info.multiUser ? 'Ja' : 'Nein'}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Skalierbarkeit</div>
            <div className="text-sm text-slate-200">{info.scalability}</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Datenspeicherort</div>
            <div className="text-sm text-slate-200">{info.dataLocation}</div>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <div className="text-xs text-green-400 mb-2">Vorteile</div>
            <ul className="text-sm text-slate-300 space-y-1">
              {info.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <div className="text-xs text-red-400 mb-2">Nachteile</div>
            <ul className="text-sm text-slate-300 space-y-1">
              {info.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
```

**Step 2: Add export to diagrams index**

Add to `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`:

```typescript
export { StorageEvolutionComparison } from './StorageEvolutionComparison'
```

**Step 3: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/diagrams/StorageEvolutionComparison.tsx exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts
git commit -m "feat(diagrams): add StorageEvolutionComparison component"
```

---

## Task 3: Create PlaylistCodeDiff Diagram

**Files:**
- Create: `exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistCodeDiff.tsx`
- Modify: `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`

**Step 1: Create the code diff component**

```tsx
// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistCodeDiff.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import type { DiagramProps } from '@/core/types/content'

type DiffType = 'u8-u9' | 'u9-u10' | 'u10-u12'

interface CodeDiff {
  title: string
  description: string
  before: { label: string; code: string; highlights: number[] }
  after: { label: string; code: string; highlights: number[] }
  explanation: string
}

const diffs: Record<DiffType, CodeDiff> = {
  'u8-u9': {
    title: 'Ü8 → Ü9: localStorage zu REST API',
    description: 'Die Datenpersistenz wandert vom Browser zum Server',
    before: {
      label: 'Ü8: localStorage',
      code: `// Speichern
savePlaylistButton.addEventListener('click', () => {
  const playlistsJSON = JSON.stringify(playlists);
  localStorage.setItem('playlists', playlistsJSON);
  alert('All playlists saved!');
});

// Laden
window.onload = function() {
  const saved = localStorage.getItem('playlists');
  if (saved) {
    playlists = JSON.parse(saved);
    updatePlaylistSelect();
  }
};`,
      highlights: [2, 3, 9, 10],
    },
    after: {
      label: 'Ü9: REST API',
      code: `// Speichern
savePlaylistButton.addEventListener('click', async () => {
  const response = await fetch(\`\${apiBaseUrl}/playlists\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currentPlaylist),
  });
  if (!response.ok) throw new Error('Failed');
  alert('Playlist saved!');
});

// Laden
async function fetchPlaylists() {
  const response = await fetch(\`\${apiBaseUrl}/playlists\`);
  const playlists = await response.json();
  // ... update UI
}`,
      highlights: [2, 3, 4, 5, 6, 13, 14],
    },
    explanation: 'localStorage.setItem/getItem wird durch fetch() mit async/await ersetzt. Die Daten werden jetzt als HTTP POST/GET an den Server gesendet.',
  },
  'u9-u10': {
    title: 'Ü9 → Ü10: In-Memory zu CouchDB',
    description: 'Das Backend speichert Daten jetzt persistent in einer Datenbank',
    before: {
      label: 'Ü9: In-Memory',
      code: `from flask import Flask, request, jsonify

webserver = Flask(__name__)
playlists = {}  # In-Memory Storage

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    playlist_name = data['name']
    playlists[playlist_name] = data['tracks']
    return jsonify({"message": "Added"}), 201`,
      highlights: [4, 10],
    },
    after: {
      label: 'Ü10: CouchDB',
      code: `from flask import Flask, request, jsonify
import requests, os

couchdb_url = os.environ["COUCHDB_URL"]

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    doc_id = f"playlist:{data['name']}"
    playlist_doc = {
        "_id": doc_id,
        "name": data["name"],
        "tracks": data["tracks"]
    }
    response = requests.put(
        f"{couchdb_url}/playlists/{doc_id}",
        json=playlist_doc
    )
    return jsonify({"message": "Added"}), 201`,
      highlights: [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    },
    explanation: 'Das Python-Dictionary wird durch CouchDB-Aufrufe ersetzt. Die Datenbank-URL kommt aus Umgebungsvariablen (für Docker).',
  },
  'u10-u12': {
    title: 'Ü10 → Ü12: Docker Compose zu Kubernetes',
    description: 'Die Container-Orchestrierung wechselt von docker-compose zu K8s Manifests',
    before: {
      label: 'Ü10: docker-compose.yml',
      code: `version: '3.8'
services:
  flask-webserver:
    build: .
    ports:
      - "8001:8001"
    depends_on:
      couchdb:
        condition: service_healthy
    environment:
      - COUCHDB_URL=http://couchdb:5984

  couchdb:
    image: couchdb:latest
    ports:
      - "5984:5984"
    volumes:
      - ./dbdata:/opt/couchdb/data`,
      highlights: [3, 7, 8, 9, 11, 17, 18],
    },
    after: {
      label: 'Ü12: K8s Manifests',
      code: `# webserver_deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webserver
  template:
    spec:
      containers:
      - name: webserver
        image: webserver:local
        env:
        - name: COUCHDB_URL
          value: couchdb:5984

# webserver_nodeport_service.yaml
apiVersion: v1
kind: Service
spec:
  type: NodePort
  ports:
  - port: 8080
    nodePort: 32000`,
      highlights: [2, 3, 7, 16, 17, 18, 22, 23, 24, 25, 26],
    },
    explanation: 'docker-compose wird durch separate K8s Manifest-Dateien ersetzt: Deployments für Container, Services für Networking, PVC für Storage.',
  },
}

function CodeBlock({ code, highlights, label }: { code: string; highlights: number[]; label: string }) {
  const lines = code.split('\n')

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="px-3 py-2 bg-slate-800/50 border-b border-slate-700">
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-xs font-mono">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${highlights.includes(i + 1) ? 'bg-amber-900/30 -mx-3 px-3' : ''}`}
            >
              <span className="text-slate-600 select-none mr-3 inline-block w-5 text-right">
                {i + 1}
              </span>
              <span className={highlights.includes(i + 1) ? 'text-amber-200' : 'text-slate-300'}>
                {line || ' '}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export function PlaylistCodeDiff({ className }: DiagramProps) {
  const [selectedDiff, setSelectedDiff] = useState<DiffType>('u8-u9')

  const diff = diffs[selectedDiff]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Code-Vergleich
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Wie sich der Code zwischen den Übungen verändert
      </p>

      {/* Diff Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['u8-u9', 'u9-u10', 'u10-u12'] as DiffType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedDiff(type)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedDiff === type
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
            `}
          >
            {type.replace('-', ' → ').toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDiff}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Title */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-slate-200">{diff.title}</h4>
            <p className="text-sm text-slate-400">{diff.description}</p>
          </div>

          {/* Side by Side Code */}
          <div className="grid gap-4 lg:grid-cols-2">
            <CodeBlock code={diff.before.code} highlights={diff.before.highlights} label={diff.before.label} />
            <CodeBlock code={diff.after.code} highlights={diff.after.highlights} label={diff.after.label} />
          </div>

          {/* Explanation */}
          <div className="mt-4 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-1">Was ändert sich?</div>
            <p className="text-sm text-slate-300">{diff.explanation}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
```

**Step 2: Add export to diagrams index**

Add to `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`:

```typescript
export { PlaylistCodeDiff } from './PlaylistCodeDiff'
```

**Step 3: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistCodeDiff.tsx exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts
git commit -m "feat(diagrams): add PlaylistCodeDiff component"
```

---

## Task 4: Create PlaylistApiExplorer Diagram

**Files:**
- Create: `exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistApiExplorer.tsx`
- Modify: `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`

**Step 1: Create the API explorer component**

```tsx
// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistApiExplorer.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

interface Endpoint {
  method: 'GET' | 'POST' | 'DELETE'
  path: string
  description: string
  requestBody?: string
  responseExample: string
  statusCode: number
  httpRequest: string
}

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/playlists',
    description: 'Alle Playlist-Namen abrufen',
    responseExample: '["Workout Mix", "Chill Vibes", "Party"]',
    statusCode: 200,
    httpRequest: `GET /playlists HTTP/1.1
Host: localhost:8001
Accept: application/json`,
  },
  {
    method: 'GET',
    path: '/playlists/{name}',
    description: 'Eine spezifische Playlist abrufen',
    responseExample: `{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
    statusCode: 200,
    httpRequest: `GET /playlists/Workout%20Mix HTTP/1.1
Host: localhost:8001
Accept: application/json`,
  },
  {
    method: 'POST',
    path: '/playlists',
    description: 'Neue Playlist erstellen oder aktualisieren',
    requestBody: `{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
    responseExample: '{"message": "Playlist \'Workout Mix\' added/updated successfully."}',
    statusCode: 201,
    httpRequest: `POST /playlists HTTP/1.1
Host: localhost:8001
Content-Type: application/json
Content-Length: 142

{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
  },
  {
    method: 'DELETE',
    path: '/playlists/{name}',
    description: 'Eine Playlist löschen',
    responseExample: '{"message": "Playlist \'Workout Mix\' deleted successfully."}',
    statusCode: 200,
    httpRequest: `DELETE /playlists/Workout%20Mix HTTP/1.1
Host: localhost:8001`,
  },
]

const methodColors = {
  GET: 'bg-blue-900/30 text-blue-400 border-blue-700',
  POST: 'bg-green-900/30 text-green-400 border-green-700',
  DELETE: 'bg-red-900/30 text-red-400 border-red-700',
}

export function PlaylistApiExplorer({ className }: DiagramProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0)
  const [showHttpRequest, setShowHttpRequest] = useState(false)

  const endpoint = endpoints[selectedEndpoint]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Playlist API Explorer
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Basierend auf der OpenAPI-Spezifikation (Meta_Playlist_API.json)
      </p>

      {/* Endpoint List */}
      <div className="space-y-2 mb-6">
        {endpoints.map((ep, index) => (
          <button
            key={index}
            onClick={() => { setSelectedEndpoint(index); setShowHttpRequest(false); }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
              ${selectedEndpoint === index
                ? 'bg-slate-800 border border-slate-600'
                : 'bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50'}
            `}
          >
            <span className={`px-2 py-1 rounded text-xs font-bold border ${methodColors[ep.method]}`}>
              {ep.method}
            </span>
            <span className="font-mono text-sm text-slate-300">{ep.path}</span>
            <span className="text-xs text-slate-500 ml-auto hidden sm:block">{ep.description}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEndpoint}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Description */}
          <div>
            <h4 className="text-md font-semibold text-slate-200 mb-1">{endpoint.description}</h4>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-bold border ${methodColors[endpoint.method]}`}>
                {endpoint.method}
              </span>
              <code className="text-sm text-slate-300 font-mono">{endpoint.path}</code>
              <span className="ml-auto text-xs text-slate-500">
                Status: <span className="text-green-400">{endpoint.statusCode}</span>
              </span>
            </div>
          </div>

          {/* Request Body (if POST) */}
          {endpoint.requestBody && (
            <div>
              <div className="text-xs text-slate-400 mb-2">Request Body (JSON)</div>
              <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs font-mono text-amber-200">{endpoint.requestBody}</pre>
              </div>
            </div>
          )}

          {/* Response Example */}
          <div>
            <div className="text-xs text-slate-400 mb-2">Response Example</div>
            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs font-mono text-green-300">{endpoint.responseExample}</pre>
            </div>
          </div>

          {/* Toggle HTTP Request */}
          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHttpRequest(!showHttpRequest)}
            >
              {showHttpRequest ? 'HTTP-Request ausblenden' : 'Vollständigen HTTP-Request zeigen'}
            </Button>
          </div>

          {/* Full HTTP Request (Exam Focus) */}
          <AnimatePresence>
            {showHttpRequest && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 text-sm font-medium">Prüfungsrelevant:</span>
                    <span className="text-xs text-slate-400">Diesen Request von Hand schreiben können!</span>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                    <pre className="text-xs font-mono text-slate-200 whitespace-pre">{endpoint.httpRequest}</pre>
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-slate-300">Aufbau:</strong> Request-Line → Headers → Leerzeile → Body</p>
                    {endpoint.method === 'POST' && (
                      <p><strong className="text-slate-300">Wichtig:</strong> Content-Type und Content-Length Header nicht vergessen!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* OpenAPI Reference */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          API-Spezifikation: <code className="text-slate-400">Meta_Playlist_API.json</code> (OpenAPI 3.0)
        </div>
      </div>
    </Card>
  )
}
```

**Step 2: Add export to diagrams index**

Add to `exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts`:

```typescript
export { PlaylistApiExplorer } from './PlaylistApiExplorer'
```

**Step 3: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistApiExplorer.tsx exam-trainer/src/frontend/content/web-technologies/diagrams/index.ts
git commit -m "feat(diagrams): add PlaylistApiExplorer component"
```

---

## Task 5: Expand playlist-app.tsx Topic (Part 1: Structure & Overview)

**Files:**
- Modify: `exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx`

**Step 1: Replace the existing topic with expanded version (sections 1-3)**

This will be a large file. First, let's create the structure with the first 3 sections (overview, stage-ui, stage-javascript).

See the implementation in the actual file - too long to include fully here. Key changes:

1. Import the new diagram components
2. Add `evolution-overview` section with PlaylistEvolutionTimeline
3. Add `stage-ui` section with Ü7 HTML/CSS code
4. Add `stage-javascript` section with Ü8 localStorage code

**Step 2: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx
git commit -m "feat(topics): expand playlist-app with evolution overview and first stages"
```

---

## Task 6: Expand playlist-app.tsx Topic (Part 2: REST, Microservices, K8s)

**Files:**
- Modify: `exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx`

**Step 1: Add sections 4-6**

Add the remaining sections:
- `stage-rest` with Flask code and PlaylistApiExplorer
- `stage-microservices` with docker-compose and StorageEvolutionComparison
- `stage-kubernetes` with K8s manifests

**Step 2: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx
git commit -m "feat(topics): add REST, microservices, and K8s stages to playlist-app"
```

---

## Task 7: Expand playlist-app.tsx Topic (Part 3: Code Comparison & Quiz)

**Files:**
- Modify: `exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx`

**Step 1: Add final sections**

Add:
- `code-comparison` section with PlaylistCodeDiff
- `exam-practice` section with synthesis questions
- Expanded quiz with ~25 questions

**Step 2: Build and verify**

Run: `cd exam-trainer && bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add exam-trainer/src/frontend/content/web-technologies/topics/playlist-app.tsx
git commit -m "feat(topics): add code comparison and expanded quiz to playlist-app"
```

---

## Task 8: Visual Testing & Final Verification

**Step 1: Start dev server**

Run: `cd exam-trainer && docker compose up -d`

**Step 2: Manual testing checklist**

- [ ] Navigate to Playlist App topic
- [ ] Verify PlaylistEvolutionTimeline renders and stages are clickable
- [ ] Verify StorageEvolutionComparison animations work
- [ ] Verify PlaylistCodeDiff shows correct code for each transition
- [ ] Verify PlaylistApiExplorer HTTP requests display correctly
- [ ] Test all quiz questions load
- [ ] Test responsive layout on mobile viewport

**Step 3: Fix any issues found**

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: address visual testing feedback for playlist-app evolution"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | PlaylistEvolutionTimeline | 2 files |
| 2 | StorageEvolutionComparison | 2 files |
| 3 | PlaylistCodeDiff | 2 files |
| 4 | PlaylistApiExplorer | 2 files |
| 5 | Topic expansion part 1 | 1 file |
| 6 | Topic expansion part 2 | 1 file |
| 7 | Topic expansion part 3 | 1 file |
| 8 | Visual testing | - |

**Total:** 4 new diagram components, 1 significantly expanded topic file, ~25 quiz questions
