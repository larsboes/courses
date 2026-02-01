// src/content/web-technologies/diagrams/ServiceDiscoverySimulator.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

type ServiceType = 'ClusterIP' | 'NodePort' | 'LoadBalancer'

interface Pod {
  id: string
  name: string
  ip: string
  nodeId: string
  labels: Record<string, string>
}

interface Service {
  id: string
  name: string
  type: ServiceType
  clusterIP: string
  nodePort?: number
  externalIP?: string
  selector: Record<string, string>
  port: number
  targetPort: number
}

interface Node {
  id: string
  name: string
  ip: string
}

interface PathSegment {
  from: string
  to: string
  label: string
  description: string
}

// ─────────────────────────────────────────────────
// Cluster Configuration
// ─────────────────────────────────────────────────

const NODES: Node[] = [
  { id: 'node1', name: 'worker-1', ip: '192.168.1.10' },
  { id: 'node2', name: 'worker-2', ip: '192.168.1.11' },
  { id: 'node3', name: 'worker-3', ip: '192.168.1.12' },
]

const PODS: Pod[] = [
  { id: 'pod1', name: 'api-pod-1', ip: '10.1.1.5', nodeId: 'node1', labels: { app: 'api' } },
  { id: 'pod2', name: 'api-pod-2', ip: '10.1.2.8', nodeId: 'node2', labels: { app: 'api' } },
  { id: 'pod3', name: 'api-pod-3', ip: '10.1.3.12', nodeId: 'node3', labels: { app: 'api' } },
  { id: 'pod4', name: 'web-pod-1', ip: '10.1.1.20', nodeId: 'node1', labels: { app: 'web' } },
  { id: 'pod5', name: 'db-pod-1', ip: '10.1.2.30', nodeId: 'node2', labels: { app: 'db' } },
]

const SERVICES: Record<ServiceType, Service> = {
  ClusterIP: {
    id: 'svc-cluster',
    name: 'api-service',
    type: 'ClusterIP',
    clusterIP: '10.0.0.50',
    selector: { app: 'api' },
    port: 80,
    targetPort: 8080,
  },
  NodePort: {
    id: 'svc-nodeport',
    name: 'api-service',
    type: 'NodePort',
    clusterIP: '10.0.0.50',
    nodePort: 30080,
    selector: { app: 'api' },
    port: 80,
    targetPort: 8080,
  },
  LoadBalancer: {
    id: 'svc-lb',
    name: 'api-service',
    type: 'LoadBalancer',
    clusterIP: '10.0.0.50',
    nodePort: 30080,
    externalIP: '203.0.113.50',
    selector: { app: 'api' },
    port: 80,
    targetPort: 8080,
  },
}

// ─────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────

function getMatchingPods(service: Service): Pod[] {
  return PODS.filter(pod => {
    return Object.entries(service.selector).every(
      ([key, value]) => pod.labels[key] === value
    )
  })
}

function buildPath(
  sourceType: 'pod' | 'external',
  sourcePod: Pod | null,
  service: Service
): PathSegment[] {
  const matchingPods = getMatchingPods(service)
  const targetPod = matchingPods[Math.floor(Math.random() * matchingPods.length)]

  const segments: PathSegment[] = []

  if (sourceType === 'external') {
    if (service.type === 'LoadBalancer') {
      segments.push({
        from: 'external',
        to: 'loadbalancer',
        label: `→ ${service.externalIP}:${service.port}`,
        description: 'Externe Anfrage an LoadBalancer-IP',
      })
      segments.push({
        from: 'loadbalancer',
        to: 'nodeport',
        label: `→ Node:${service.nodePort}`,
        description: 'LoadBalancer verteilt auf NodePort',
      })
    } else if (service.type === 'NodePort') {
      segments.push({
        from: 'external',
        to: 'nodeport',
        label: `→ ${NODES[0].ip}:${service.nodePort}`,
        description: 'Direkte Anfrage an NodePort',
      })
    } else {
      // ClusterIP - not accessible from outside
      return [{
        from: 'external',
        to: 'blocked',
        label: '✗ Nicht erreichbar',
        description: 'ClusterIP ist nur cluster-intern erreichbar!',
      }]
    }
    segments.push({
      from: 'nodeport',
      to: 'clusterip',
      label: `→ ${service.clusterIP}:${service.port}`,
      description: 'NodePort leitet an ClusterIP weiter',
    })
  } else if (sourcePod) {
    // Pod-to-Service communication
    segments.push({
      from: sourcePod.id,
      to: 'dns',
      label: `DNS: ${service.name}`,
      description: `Pod fragt DNS nach "${service.name}"`,
    })
    segments.push({
      from: 'dns',
      to: 'clusterip',
      label: `→ ${service.clusterIP}`,
      description: 'DNS löst Service-Name zu ClusterIP auf',
    })
  }

  // Final hop: ClusterIP to Pod
  segments.push({
    from: 'clusterip',
    to: targetPod.id,
    label: `→ ${targetPod.ip}:${service.targetPort}`,
    description: `kube-proxy wählt Pod via iptables/IPVS`,
  })

  return segments
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function ServiceDiscoverySimulator({ className }: DiagramProps) {
  const [serviceType, setServiceType] = useState<ServiceType>('ClusterIP')
  const [sourceType, setSourceType] = useState<'pod' | 'external'>('pod')
  const [selectedSourcePod, setSelectedSourcePod] = useState<string>('pod4')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([])

  const service = SERVICES[serviceType]
  const matchingPods = useMemo(() => getMatchingPods(service), [service])
  const sourcePod = PODS.find(p => p.id === selectedSourcePod) || null

  // Start animation
  const startSimulation = () => {
    const segments = buildPath(sourceType, sourcePod, service)
    setPathSegments(segments)
    setIsAnimating(true)
    setCurrentStep(0)

    // Animate through steps
    segments.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index)
      }, (index + 1) * 1000)
    })

    // End animation
    setTimeout(() => {
      setIsAnimating(false)
    }, (segments.length + 1) * 1000)
  }

  // Reset
  const reset = () => {
    setIsAnimating(false)
    setCurrentStep(-1)
    setPathSegments([])
  }

  // Get highlight state for components
  const getHighlight = (componentId: string): 'active' | 'visited' | 'pending' | 'none' => {
    if (currentStep < 0) return 'none'
    const currentSegment = pathSegments[currentStep]
    if (!currentSegment) return 'none'

    if (currentSegment.from === componentId) return 'active'
    if (currentSegment.to === componentId) return 'active'

    // Check if visited in previous steps
    for (let i = 0; i < currentStep; i++) {
      if (pathSegments[i].from === componentId || pathSegments[i].to === componentId) {
        return 'visited'
      }
    }

    return 'pending'
  }

  return (
    <DiagramShell
      title="Service Discovery Simulator"
      subtitle="Wie erreichen Pods und externe Clients Services im Cluster?"
      className={className}
      actions={
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      }
      footer={
        <div className="space-y-1">
          <p><strong className="text-slate-400">Service-Typen:</strong></p>
          <p>
            <span className="text-purple-400">ClusterIP</span> - Nur cluster-intern erreichbar &nbsp;|&nbsp;
            <span className="text-amber-400">NodePort</span> - Offnet Port auf allen Nodes &nbsp;|&nbsp;
            <span className="text-pink-400">LoadBalancer</span> - Externe IP vom Cloud-Provider
          </p>
        </div>
      }
    >
      {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Service Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Service Typ</label>
            <select
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value as ServiceType)
                reset()
              }}
              disabled={isAnimating}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm"
            >
              <option value="ClusterIP">ClusterIP (intern)</option>
              <option value="NodePort">NodePort (+ Node-Ports)</option>
              <option value="LoadBalancer">LoadBalancer (+ externe IP)</option>
            </select>
          </div>

          {/* Source Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Anfrage von</label>
            <select
              value={sourceType}
              onChange={(e) => {
                setSourceType(e.target.value as 'pod' | 'external')
                reset()
              }}
              disabled={isAnimating}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm"
            >
              <option value="pod">Pod im Cluster</option>
              <option value="external">Externer Client</option>
            </select>
          </div>

          {/* Source Pod (if pod selected) */}
          {sourceType === 'pod' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Quell-Pod</label>
              <select
                value={selectedSourcePod}
                onChange={(e) => {
                  setSelectedSourcePod(e.target.value)
                  reset()
                }}
                disabled={isAnimating}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm"
              >
                {PODS.filter(p => p.labels.app !== 'api').map(pod => (
                  <option key={pod.id} value={pod.id}>
                    {pod.name} ({pod.ip})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Start Button */}
        <Button
          variant="primary"
          onClick={startSimulation}
          disabled={isAnimating}
          className="w-full"
        >
          {isAnimating ? 'Simulation läuft...' : '▶ Simulation starten'}
        </Button>

        {/* Cluster Visualization */}
        <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            {/* External Client */}
            {sourceType === 'external' && (
              <g>
                <motion.rect
                  x={10}
                  y={160}
                  width={80}
                  height={60}
                  rx={8}
                  fill={getHighlight('external') === 'active' ? '#3b82f620' : '#1e293b'}
                  stroke={getHighlight('external') === 'active' ? '#3b82f6' : '#475569'}
                  strokeWidth={2}
                  animate={{
                    fill: getHighlight('external') === 'active' ? '#3b82f620' : '#1e293b',
                  }}
                />
                <text x={50} y={185} textAnchor="middle" fill="#94a3b8" className="text-[10px]">🌐</text>
                <text x={50} y={205} textAnchor="middle" fill="#94a3b8" className="text-[10px]">External</text>
              </g>
            )}

            {/* LoadBalancer (if applicable) */}
            {serviceType === 'LoadBalancer' && (
              <g>
                <motion.rect
                  x={120}
                  y={140}
                  width={100}
                  height={100}
                  rx={8}
                  fill={getHighlight('loadbalancer') === 'active' ? '#ec489920' : '#1e293b'}
                  stroke={getHighlight('loadbalancer') === 'active' ? '#ec4899' : '#475569'}
                  strokeWidth={2}
                />
                <text x={170} y={175} textAnchor="middle" fill="#ec4899" className="text-[10px] font-medium">LoadBalancer</text>
                <text x={170} y={195} textAnchor="middle" fill="#94a3b8" className="text-[9px]">{service.externalIP}</text>
                <text x={170} y={210} textAnchor="middle" fill="#94a3b8" className="text-[9px]">Port: {service.port}</text>
              </g>
            )}

            {/* Cluster boundary */}
            <rect
              x={250}
              y={20}
              width={530}
              height={360}
              rx={12}
              fill="none"
              stroke="#475569"
              strokeWidth={2}
              strokeDasharray="8,4"
            />
            <text x={270} y={45} fill="#64748b" className="text-[10px]">Kubernetes Cluster</text>

            {/* DNS */}
            {sourceType === 'pod' && (
              <motion.g
                animate={{
                  opacity: getHighlight('dns') === 'active' ? 1 : 0.5,
                }}
              >
                <rect
                  x={280}
                  y={50}
                  width={80}
                  height={40}
                  rx={6}
                  fill={getHighlight('dns') === 'active' ? '#06b6d420' : '#1e293b'}
                  stroke={getHighlight('dns') === 'active' ? '#06b6d4' : '#475569'}
                  strokeWidth={2}
                />
                <text x={320} y={70} textAnchor="middle" fill="#06b6d4" className="text-[9px] font-medium">CoreDNS</text>
                <text x={320} y={82} textAnchor="middle" fill="#64748b" className="text-[8px]">Service Discovery</text>
              </motion.g>
            )}

            {/* NodePort visualization */}
            {(serviceType === 'NodePort' || serviceType === 'LoadBalancer') && (
              <motion.g
                animate={{
                  opacity: getHighlight('nodeport') === 'active' ? 1 : 0.6,
                }}
              >
                <rect
                  x={280}
                  y={110}
                  width={180}
                  height={50}
                  rx={6}
                  fill={getHighlight('nodeport') === 'active' ? '#f59e0b20' : '#1e293b'}
                  stroke={getHighlight('nodeport') === 'active' ? '#f59e0b' : '#475569'}
                  strokeWidth={2}
                />
                <text x={370} y={135} textAnchor="middle" fill="#f59e0b" className="text-[10px] font-medium">NodePort: {service.nodePort}</text>
                <text x={370} y={150} textAnchor="middle" fill="#64748b" className="text-[8px]">Auf allen Nodes verfügbar</text>
              </motion.g>
            )}

            {/* ClusterIP Service */}
            <motion.g
              animate={{
                opacity: getHighlight('clusterip') === 'active' ? 1 : 0.7,
              }}
            >
              <rect
                x={280}
                y={180}
                width={180}
                height={70}
                rx={8}
                fill={getHighlight('clusterip') === 'active' ? '#8b5cf620' : '#1e293b'}
                stroke={getHighlight('clusterip') === 'active' ? '#8b5cf6' : '#6366f1'}
                strokeWidth={2}
              />
              <text x={370} y={205} textAnchor="middle" fill="#8b5cf6" className="text-[11px] font-medium">{service.name}</text>
              <text x={370} y={222} textAnchor="middle" fill="#94a3b8" className="text-[9px]">ClusterIP: {service.clusterIP}</text>
              <text x={370} y={237} textAnchor="middle" fill="#64748b" className="text-[8px]">selector: app=api</text>
            </motion.g>

            {/* Nodes with Pods */}
            {NODES.map((node, nodeIndex) => {
              const nodePods = PODS.filter(p => p.nodeId === node.id)
              const nodeX = 500 + nodeIndex * 100
              const nodeY = 80

              return (
                <g key={node.id}>
                  {/* Node */}
                  <rect
                    x={nodeX}
                    y={nodeY}
                    width={90}
                    height={280}
                    rx={8}
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth={1}
                  />
                  <text x={nodeX + 45} y={nodeY + 20} textAnchor="middle" fill="#64748b" className="text-[9px]">{node.name}</text>
                  <text x={nodeX + 45} y={nodeY + 32} textAnchor="middle" fill="#475569" className="text-[8px]">{node.ip}</text>

                  {/* Pods in node */}
                  {nodePods.map((pod, podIndex) => {
                    const podY = nodeY + 50 + podIndex * 70
                    const highlight = getHighlight(pod.id)
                    const isMatching = matchingPods.some(p => p.id === pod.id)

                    return (
                      <motion.g key={pod.id}>
                        <motion.rect
                          x={nodeX + 10}
                          y={podY}
                          width={70}
                          height={55}
                          rx={6}
                          fill={
                            highlight === 'active' ? '#10b98130' :
                            isMatching ? '#10b98110' : '#1e293b'
                          }
                          stroke={
                            highlight === 'active' ? '#10b981' :
                            isMatching ? '#10b981' : '#475569'
                          }
                          strokeWidth={highlight === 'active' ? 3 : isMatching ? 2 : 1}
                          animate={{
                            fill: highlight === 'active' ? '#10b98130' : isMatching ? '#10b98110' : '#1e293b',
                          }}
                        />
                        <text
                          x={nodeX + 45}
                          y={podY + 18}
                          textAnchor="middle"
                          fill={isMatching ? '#10b981' : '#94a3b8'}
                          className="text-[8px] font-medium"
                        >
                          {pod.name.split('-').slice(-2).join('-')}
                        </text>
                        <text x={nodeX + 45} y={podY + 32} textAnchor="middle" fill="#64748b" className="text-[8px]">{pod.ip}</text>
                        <text x={nodeX + 45} y={podY + 45} textAnchor="middle" fill="#6366f1" className="text-[7px]">app={pod.labels.app}</text>

                        {/* Source pod indicator */}
                        {sourceType === 'pod' && pod.id === selectedSourcePod && (
                          <circle cx={nodeX + 75} cy={podY + 5} r={6} fill="#3b82f6" />
                        )}
                      </motion.g>
                    )
                  })}
                </g>
              )
            })}

            {/* Connection arrows - animated */}
            {sourceType === 'external' && serviceType === 'LoadBalancer' && (
              <motion.line
                x1={90} y1={190} x2={120} y2={190}
                stroke={currentStep >= 0 ? '#ec4899' : '#475569'}
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
                animate={{ opacity: currentStep >= 0 ? 1 : 0.3 }}
              />
            )}

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Path explanation */}
        <AnimatePresence>
          {pathSegments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <h4 className="text-sm font-medium text-slate-300">Request-Pfad:</h4>
              <div className="space-y-2">
                {pathSegments.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.3,
                      x: 0,
                    }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border
                      ${index === currentStep
                        ? 'bg-blue-900/30 border-blue-700/50'
                        : index < currentStep
                          ? 'bg-slate-800/50 border-slate-700'
                          : 'bg-slate-900/50 border-slate-800'}
                    `}
                  >
                    <span className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}
                    `}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-slate-200">{segment.label}</div>
                      <div className="text-xs text-slate-400">{segment.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

    </DiagramShell>
  )
}
