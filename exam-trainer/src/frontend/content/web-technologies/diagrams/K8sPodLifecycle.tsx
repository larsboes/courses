// src/content/web-technologies/diagrams/K8sPodLifecycle.tsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type PodPhase = 'Pending' | 'ContainerCreating' | 'Running' | 'Terminating' | 'Failed' | 'CrashLoopBackOff'
type Scenario = 'normal' | 'crash' | 'scale' | 'rolling-update' | 'node-failure'

interface PodState {
  id: string
  phase: PodPhase
  restartCount: number
  version: string
  nodeId: string
  progress: number // 0-100 for transitions
}

interface TimelineEvent {
  id: string
  timestamp: number
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  podId?: string
}

const phaseColors: Record<PodPhase, { bg: string; border: string; text: string; glow: string }> = {
  Pending: {
    bg: 'rgba(251, 191, 36, 0.2)',
    border: '#f59e0b',
    text: '#fcd34d',
    glow: 'rgba(251, 191, 36, 0.4)',
  },
  ContainerCreating: {
    bg: 'rgba(96, 165, 250, 0.2)',
    border: '#3b82f6',
    text: '#93c5fd',
    glow: 'rgba(96, 165, 250, 0.4)',
  },
  Running: {
    bg: 'rgba(34, 197, 94, 0.2)',
    border: '#22c55e',
    text: '#86efac',
    glow: 'rgba(34, 197, 94, 0.4)',
  },
  Terminating: {
    bg: 'rgba(168, 85, 247, 0.2)',
    border: '#a855f7',
    text: '#d8b4fe',
    glow: 'rgba(168, 85, 247, 0.4)',
  },
  Failed: {
    bg: 'rgba(239, 68, 68, 0.2)',
    border: '#ef4444',
    text: '#fca5a5',
    glow: 'rgba(239, 68, 68, 0.4)',
  },
  CrashLoopBackOff: {
    bg: 'rgba(239, 68, 68, 0.3)',
    border: '#dc2626',
    text: '#f87171',
    glow: 'rgba(220, 38, 38, 0.5)',
  },
}

const phaseInfo: Record<PodPhase, { description: string; actions: string[] }> = {
  Pending: {
    description: 'Pod wurde erstellt, aber noch keinem Node zugewiesen.',
    actions: ['Scheduler sucht passenden Node', 'Ressourcen werden geprueft', 'Node-Affinitaet wird evaluiert'],
  },
  ContainerCreating: {
    description: 'Container wird auf dem Node vorbereitet.',
    actions: ['Image wird gepullt', 'Container wird gestartet', 'Volumes werden gemountet'],
  },
  Running: {
    description: 'Container laeuft erfolgreich.',
    actions: ['Liveness Probe: OK', 'Readiness Probe: OK', 'Traffic wird empfangen'],
  },
  Terminating: {
    description: 'Pod wird heruntergefahren (Graceful Shutdown).',
    actions: ['SIGTERM gesendet', 'preStop Hook ausgefuehrt', 'Verbindungen werden geschlossen'],
  },
  Failed: {
    description: 'Container konnte nicht starten oder ist abgestuerzt.',
    actions: ['Exit Code pruefen', 'Logs analysieren', 'Events untersuchen'],
  },
  CrashLoopBackOff: {
    description: 'Container stuerzt wiederholt ab. Kubernetes wartet vor Neustart.',
    actions: ['Exponential Backoff aktiv', 'Max. Wartezeit: 5 Minuten', 'Restart Count steigt'],
  },
}

const scenarioDescriptions: Record<Scenario, { title: string; description: string }> = {
  normal: {
    title: 'Normaler Lifecycle',
    description: 'Zeigt den normalen Pod-Lebenszyklus von der Erstellung bis zum Running-Status.',
  },
  crash: {
    title: 'Crash the Pod',
    description: 'Simuliert einen Absturz und zeigt das Restart-Verhalten mit CrashLoopBackOff.',
  },
  scale: {
    title: 'Scale to 3 Replicas',
    description: 'Skaliert das Deployment auf 3 Pods und zeigt parallele Pod-Erstellung.',
  },
  'rolling-update': {
    title: 'Rolling Update',
    description: 'Zeigt wie alte Pods durch neue ersetzt werden (v1 → v2).',
  },
  'node-failure': {
    title: 'Node Failure',
    description: 'Simuliert einen Node-Ausfall und das Rescheduling auf einen anderen Node.',
  },
}

// Pod visualization component
function PodBox({
  pod,
  compact = false,
}: {
  pod: PodState
  compact?: boolean
}) {
  const colors = phaseColors[pod.phase]
  const isTransitioning = pod.phase === 'ContainerCreating' || pod.phase === 'Terminating'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg border-2 ${compact ? 'p-2' : 'p-3'}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        boxShadow: `0 0 10px ${colors.glow}`,
      }}
    >
      {/* Progress bar for transitions */}
      {isTransitioning && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-b-lg"
          style={{ backgroundColor: colors.border }}
          initial={{ width: '0%' }}
          animate={{ width: `${pod.progress}%` }}
          transition={{ duration: 0.1 }}
        />
      )}

      <div className="flex items-center gap-2">
        {/* Status indicator */}
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: colors.border }}
          animate={
            pod.phase === 'Running'
              ? { scale: [1, 1.2, 1] }
              : pod.phase === 'CrashLoopBackOff'
                ? { opacity: [1, 0.3, 1] }
                : {}
          }
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        <div>
          <div className={`font-mono ${compact ? 'text-xs' : 'text-sm'}`} style={{ color: colors.text }}>
            {pod.id}
          </div>
          {!compact && (
            <div className="text-xs text-slate-400 mt-0.5">
              {pod.version} | Node: {pod.nodeId}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${compact ? 'text-xs mt-1' : 'text-sm mt-2'} font-medium`}
        style={{ color: colors.text }}
      >
        {pod.phase}
        {pod.restartCount > 0 && (
          <span className="text-red-400 ml-2">
            ({pod.restartCount}x restart)
          </span>
        )}
      </div>
    </motion.div>
  )
}

// Timeline event component
function TimelineEventItem({ event }: { event: TimelineEvent }) {
  const typeStyles = {
    info: 'border-blue-500 bg-blue-900/30 text-blue-300',
    warning: 'border-amber-500 bg-amber-900/30 text-amber-300',
    error: 'border-red-500 bg-red-900/30 text-red-300',
    success: 'border-green-500 bg-green-900/30 text-green-300',
  }

  const typeIcons = {
    info: 'i',
    warning: '!',
    error: 'x',
    success: '✓',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-2 rounded-lg border-l-2 ${typeStyles[event.type]}`}
    >
      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-current">
        {typeIcons[event.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-400">
          {event.timestamp.toFixed(1)}s
          {event.podId && <span className="ml-2 text-slate-500">({event.podId})</span>}
        </div>
        <div className="text-sm">{event.message}</div>
      </div>
    </motion.div>
  )
}

// Health check indicator
function HealthProbes({ phase }: { phase: PodPhase }) {
  const isRunning = phase === 'Running'
  const isStarting = phase === 'ContainerCreating'

  return (
    <div className="flex gap-4 text-xs">
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : isStarting ? 'bg-amber-500' : 'bg-slate-600'}`}
          animate={isRunning ? { scale: [1, 1.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        />
        <span className={isRunning ? 'text-green-400' : 'text-slate-500'}>Liveness</span>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-slate-600'}`}
          animate={isRunning ? { scale: [1, 1.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5, repeatDelay: 1 }}
        />
        <span className={isRunning ? 'text-green-400' : 'text-slate-500'}>Readiness</span>
      </div>
    </div>
  )
}

// Node visualization
function NodeBox({
  nodeId,
  pods,
  failed = false,
}: {
  nodeId: string
  pods: PodState[]
  failed?: boolean
}) {
  return (
    <motion.div
      layout
      className={`p-4 rounded-lg border-2 ${
        failed
          ? 'border-red-500 bg-red-900/20'
          : 'border-slate-600 bg-slate-800/50'
      }`}
      animate={failed ? { opacity: [1, 0.5, 1] } : {}}
      transition={{ repeat: failed ? Infinity : 0, duration: 1 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${failed ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className={`text-sm font-medium ${failed ? 'text-red-400' : 'text-slate-300'}`}>
          {nodeId}
        </span>
        {failed && <span className="text-xs text-red-400 ml-2">Not Ready</span>}
      </div>

      <div className="grid gap-2">
        <AnimatePresence mode="popLayout">
          {pods.map((pod) => (
            <PodBox key={pod.id} pod={pod} compact />
          ))}
        </AnimatePresence>
        {pods.length === 0 && (
          <div className="text-xs text-slate-500 italic">Keine Pods</div>
        )}
      </div>
    </motion.div>
  )
}

export function K8sPodLifecycle({ className }: DiagramProps) {
  const [scenario, setScenario] = useState<Scenario>('normal')
  const [isRunning, setIsRunning] = useState(false)
  const [pods, setPods] = useState<PodState[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const currentTimeRef = useRef(0)
  const [failedNode, setFailedNode] = useState<string | null>(null)

  // Add event to timeline
  const addEvent = useCallback((message: string, type: TimelineEvent['type'], podId?: string) => {
    setEvents((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: currentTimeRef.current,
        message,
        type,
        podId,
      },
      ...prev.slice(0, 9), // Keep last 10 events
    ])
  }, [])

  // Update pod phase
  const updatePod = useCallback((id: string, updates: Partial<PodState>) => {
    setPods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  // Create a new pod
  const createPod = useCallback((id: string, version: string, nodeId: string) => {
    setPods((prev) => [
      ...prev,
      {
        id,
        phase: 'Pending',
        restartCount: 0,
        version,
        nodeId,
        progress: 0,
      },
    ])
  }, [])

  // Remove a pod
  const removePod = useCallback((id: string) => {
    setPods((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setPods([])
    setEvents([])
    setCurrentTime(0)
    currentTimeRef.current = 0
    setFailedNode(null)
    setIsRunning(false)
  }, [])

  // Run scenario simulation
  useEffect(() => {
    if (!isRunning) return

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>

    const runScenario = async () => {
      // Update time
      intervalId = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + 0.1
          currentTimeRef.current = next
          return next
        })
      }, 100)

      if (scenario === 'normal') {
        // Normal lifecycle
        addEvent('Deployment erstellt', 'info')
        createPod('nginx-abc12', 'v1', 'node-1')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        addEvent('Scheduler weist Pod node-1 zu', 'info', 'nginx-abc12')
        updatePod('nginx-abc12', { phase: 'ContainerCreating', progress: 0 })

        // Simulate container creation progress
        for (let i = 0; i <= 100; i += 20) {
          await new Promise((r) => { timeoutId = setTimeout(r, 300) })
          updatePod('nginx-abc12', { progress: i })
          if (i === 20) addEvent('Image wird gepullt: nginx:latest', 'info', 'nginx-abc12')
          if (i === 60) addEvent('Container wird gestartet', 'info', 'nginx-abc12')
          if (i === 80) addEvent('Volumes gemountet', 'info', 'nginx-abc12')
        }

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('nginx-abc12', { phase: 'Running', progress: 0 })
        addEvent('Pod ist Running und Ready', 'success', 'nginx-abc12')

      } else if (scenario === 'crash') {
        // Crash scenario
        addEvent('Deployment erstellt', 'info')
        createPod('app-xyz99', 'v1', 'node-1')

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        updatePod('app-xyz99', { phase: 'ContainerCreating' })
        addEvent('Container wird erstellt', 'info', 'app-xyz99')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        updatePod('app-xyz99', { phase: 'Running' })
        addEvent('Pod laeuft', 'success', 'app-xyz99')

        await new Promise((r) => { timeoutId = setTimeout(r, 1500) })
        addEvent('OOMKilled: Container ueberschreitet Memory Limit', 'error', 'app-xyz99')
        updatePod('app-xyz99', { phase: 'Failed', restartCount: 1 })

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        addEvent('Kubelet startet Container neu', 'warning', 'app-xyz99')
        updatePod('app-xyz99', { phase: 'ContainerCreating' })

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        updatePod('app-xyz99', { phase: 'Running' })
        addEvent('Pod laeuft wieder', 'info', 'app-xyz99')

        await new Promise((r) => { timeoutId = setTimeout(r, 1200) })
        addEvent('Container crashed erneut', 'error', 'app-xyz99')
        updatePod('app-xyz99', { phase: 'CrashLoopBackOff', restartCount: 2 })
        addEvent('CrashLoopBackOff: Warte 10s vor Neustart', 'warning', 'app-xyz99')

      } else if (scenario === 'scale') {
        // Scale scenario
        addEvent('kubectl scale deployment nginx --replicas=3', 'info')
        createPod('nginx-001', 'v1', 'node-1')
        createPod('nginx-002', 'v1', 'node-2')
        createPod('nginx-003', 'v1', 'node-1')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        addEvent('3 Pods werden scheduled', 'info')

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        updatePod('nginx-001', { phase: 'ContainerCreating' })
        addEvent('Pod wird erstellt', 'info', 'nginx-001')

        await new Promise((r) => { timeoutId = setTimeout(r, 300) })
        updatePod('nginx-002', { phase: 'ContainerCreating' })
        addEvent('Pod wird erstellt', 'info', 'nginx-002')

        await new Promise((r) => { timeoutId = setTimeout(r, 300) })
        updatePod('nginx-003', { phase: 'ContainerCreating' })
        addEvent('Pod wird erstellt', 'info', 'nginx-003')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        updatePod('nginx-001', { phase: 'Running' })
        addEvent('Pod ist Ready', 'success', 'nginx-001')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('nginx-002', { phase: 'Running' })
        addEvent('Pod ist Ready', 'success', 'nginx-002')

        await new Promise((r) => { timeoutId = setTimeout(r, 700) })
        updatePod('nginx-003', { phase: 'Running' })
        addEvent('Pod ist Ready', 'success', 'nginx-003')
        addEvent('Scaling complete: 3/3 Pods ready', 'success')

      } else if (scenario === 'rolling-update') {
        // Rolling update
        addEvent('Initiale Pods (v1) erstellt', 'info')
        createPod('app-v1-a', 'v1', 'node-1')
        createPod('app-v1-b', 'v1', 'node-2')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('app-v1-a', { phase: 'Running' })
        updatePod('app-v1-b', { phase: 'Running' })
        addEvent('2 Pods mit v1 laufen', 'success')

        await new Promise((r) => { timeoutId = setTimeout(r, 1500) })
        addEvent('kubectl set image deployment/app app=nginx:v2', 'info')
        addEvent('Rolling Update gestartet (maxSurge=1, maxUnavailable=0)', 'info')

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        createPod('app-v2-a', 'v2', 'node-1')
        addEvent('Neuer Pod mit v2 wird erstellt', 'info', 'app-v2-a')

        await new Promise((r) => { timeoutId = setTimeout(r, 600) })
        updatePod('app-v2-a', { phase: 'ContainerCreating' })

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        updatePod('app-v2-a', { phase: 'Running' })
        addEvent('v2 Pod ist Ready', 'success', 'app-v2-a')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('app-v1-a', { phase: 'Terminating' })
        addEvent('Alter v1 Pod wird terminiert', 'warning', 'app-v1-a')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        removePod('app-v1-a')
        addEvent('v1 Pod entfernt', 'info')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        createPod('app-v2-b', 'v2', 'node-2')
        addEvent('Zweiter v2 Pod wird erstellt', 'info', 'app-v2-b')

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        updatePod('app-v2-b', { phase: 'ContainerCreating' })

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        updatePod('app-v2-b', { phase: 'Running' })
        addEvent('Zweiter v2 Pod ist Ready', 'success', 'app-v2-b')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('app-v1-b', { phase: 'Terminating' })
        addEvent('Letzter v1 Pod wird terminiert', 'warning', 'app-v1-b')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        removePod('app-v1-b')
        addEvent('Rolling Update abgeschlossen!', 'success')

      } else if (scenario === 'node-failure') {
        // Node failure
        addEvent('Pods auf zwei Nodes verteilt', 'info')
        createPod('db-main', 'v1', 'node-1')
        createPod('db-replica', 'v1', 'node-2')

        await new Promise((r) => { timeoutId = setTimeout(r, 500) })
        updatePod('db-main', { phase: 'Running' })
        updatePod('db-replica', { phase: 'Running' })
        addEvent('Beide Pods sind Running', 'success')

        await new Promise((r) => { timeoutId = setTimeout(r, 2000) })
        addEvent('Node-1 antwortet nicht mehr!', 'error')
        setFailedNode('node-1')
        addEvent('Node Condition: Ready=False', 'error')

        await new Promise((r) => { timeoutId = setTimeout(r, 1500) })
        addEvent('Controller erkennt ausgefallenen Node', 'warning')
        updatePod('db-main', { phase: 'Failed' })
        addEvent('Pod auf node-1 als Failed markiert', 'error', 'db-main')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        addEvent('Scheduler erstellt Ersatz-Pod auf node-2', 'info')
        createPod('db-main-new', 'v1', 'node-2')

        await new Promise((r) => { timeoutId = setTimeout(r, 800) })
        updatePod('db-main-new', { phase: 'ContainerCreating' })
        removePod('db-main')

        await new Promise((r) => { timeoutId = setTimeout(r, 1000) })
        updatePod('db-main-new', { phase: 'Running' })
        addEvent('Ersatz-Pod ist Running auf node-2', 'success', 'db-main-new')
        addEvent('Workload erfolgreich rescheduled!', 'success')
      }

      setIsRunning(false)
      clearInterval(intervalId)
    }

    runScenario()

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [isRunning, scenario, addEvent, createPod, updatePod, removePod])

  // Get pods by node
  const podsByNode = pods.reduce<Record<string, PodState[]>>((acc, pod) => {
    if (!acc[pod.nodeId]) acc[pod.nodeId] = []
    acc[pod.nodeId].push(pod)
    return acc
  }, {})

  // Get current phase info for display
  const activePod = pods[0]
  const currentPhaseInfo = activePod ? phaseInfo[activePod.phase] : null

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Container Orchestration Timeline
      </h3>

      {/* Scenario Selection */}
      <div className="mb-6">
        <div className="text-sm text-slate-400 mb-2">Szenario waehlen:</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(scenarioDescriptions) as Scenario[]).map((s) => (
            <Button
              key={s}
              variant={scenario === s ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setScenario(s)
                resetSimulation()
              }}
              disabled={isRunning}
            >
              {scenarioDescriptions[s].title}
            </Button>
          ))}
        </div>
      </div>

      {/* Scenario Description */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
        <div className="text-sm text-slate-300">
          {scenarioDescriptions[scenario].description}
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Node/Pod Visualization */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-3">Cluster Nodes</div>
          <div className="grid gap-4">
            <NodeBox
              nodeId="node-1"
              pods={podsByNode['node-1'] || []}
              failed={failedNode === 'node-1'}
            />
            <NodeBox
              nodeId="node-2"
              pods={podsByNode['node-2'] || []}
              failed={failedNode === 'node-2'}
            />
          </div>

          {/* Health Probes */}
          {activePod && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <HealthProbes phase={activePod.phase} />
            </div>
          )}
        </div>

        {/* Timeline Events */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-400">Timeline Events</div>
            <div className="text-xs text-slate-500 font-mono">
              {currentTime.toFixed(1)}s
            </div>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {events.length > 0 ? (
                events.map((event) => (
                  <TimelineEventItem key={event.id} event={event} />
                ))
              ) : (
                <div className="text-sm text-slate-500 italic">
                  Starte die Simulation um Events zu sehen...
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Phase Info Panel */}
      {currentPhaseInfo && (
        <motion.div
          key={activePod?.phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: phaseColors[activePod!.phase].border }}
            />
            <div className="font-medium" style={{ color: phaseColors[activePod!.phase].text }}>
              {activePod!.phase}
            </div>
          </div>
          <div className="text-sm text-slate-300 mb-3">
            {currentPhaseInfo.description}
          </div>
          <div className="text-xs text-slate-400">
            <div className="mb-1 font-medium">Aktionen in dieser Phase:</div>
            <ul className="list-disc list-inside space-y-0.5">
              {currentPhaseInfo.actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="primary"
          onClick={() => {
            resetSimulation()
            setIsRunning(true)
          }}
          disabled={isRunning}
        >
          {isRunning ? 'Laeuft...' : 'Simulation starten'}
        </Button>

        <Button
          variant="secondary"
          onClick={resetSimulation}
          disabled={!isRunning && pods.length === 0}
        >
          Zuruecksetzen
        </Button>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-400 mb-2">Pod Status:</div>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(phaseColors) as PodPhase[]).map((phase) => (
            <div key={phase} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{
                  backgroundColor: phaseColors[phase].bg,
                  border: `2px solid ${phaseColors[phase].border}`,
                }}
              />
              <span className="text-xs text-slate-400">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
