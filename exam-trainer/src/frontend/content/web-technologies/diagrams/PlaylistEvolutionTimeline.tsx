// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistEvolutionTimeline.tsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
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
    <DiagramShell
      title="Playlist App Evolution"
      subtitle="Von der statischen HTML-Seite zur Kubernetes-Anwendung"
      className={className}
      footer={
        <div className="flex flex-wrap gap-4">
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
      }
    >
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
    </DiagramShell>
  )
}
