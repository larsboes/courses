// src/core/components/scenarios/FullStackDiagram.tsx
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface FullStackDiagramProps {
  /** IDs of components to highlight */
  highlighted: string[]
  /** Currently active component (packet location) */
  activeComponent?: string
  /** Callback when component is clicked */
  onComponentClick?: (id: string) => void
}

interface DiagramComponent {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  type: 'client' | 'network' | 'gateway' | 'app' | 'data'
}

// ─────────────────────────────────────────────────
// Layout Definition
// ─────────────────────────────────────────────────

const FULL_STACK_COMPONENTS: DiagramComponent[] = [
  // Client layer
  { id: 'browser', label: 'Browser', x: 30, y: 120, width: 80, height: 60, type: 'client' },

  // Network layer
  { id: 'dns-resolver', label: 'DNS', x: 140, y: 120, width: 70, height: 60, type: 'network' },
  { id: 'tls-handshake', label: 'TLS', x: 240, y: 120, width: 70, height: 60, type: 'network' },
  { id: 'http-request', label: 'HTTP', x: 340, y: 120, width: 70, height: 60, type: 'network' },

  // K8s cluster components
  { id: 'nodeport', label: 'NodePort', x: 450, y: 120, width: 75, height: 60, type: 'gateway' },
  { id: 'service', label: 'Service', x: 545, y: 120, width: 75, height: 60, type: 'gateway' },
  { id: 'pod', label: 'Pod', x: 640, y: 100, width: 70, height: 50, type: 'app' },
  { id: 'flask-app', label: 'Flask', x: 640, y: 160, width: 70, height: 40, type: 'app' },
  { id: 'database', label: 'CouchDB', x: 730, y: 120, width: 75, height: 60, type: 'data' },

  // Additional K8s components (shown smaller, below main flow)
  { id: 'kube-proxy', label: 'kube-proxy', x: 470, y: 230, width: 80, height: 35, type: 'gateway' },
  { id: 'cluster-ip', label: 'ClusterIP', x: 570, y: 230, width: 80, height: 35, type: 'gateway' },
  { id: 'rest-api', label: 'REST API', x: 670, y: 230, width: 80, height: 35, type: 'app' },

  // Workload components (below)
  { id: 'deployment', label: 'Deployment', x: 470, y: 280, width: 80, height: 35, type: 'app' },
  { id: 'replicaset', label: 'ReplicaSet', x: 570, y: 280, width: 80, height: 35, type: 'app' },
  { id: 'container', label: 'Container', x: 670, y: 280, width: 80, height: 35, type: 'app' },
  { id: 'node', label: 'Node', x: 450, y: 50, width: 60, height: 30, type: 'gateway' },
  { id: 'labels', label: 'Labels', x: 530, y: 50, width: 60, height: 30, type: 'gateway' },
]

// ─────────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────────

const componentColors: Record<DiagramComponent['type'], { bg: string; border: string; text: string }> = {
  client: { bg: '#1e3a5f', border: '#3b82f6', text: '#93c5fd' },
  network: { bg: '#3b1f5e', border: '#a855f7', text: '#d8b4fe' },
  gateway: { bg: '#4c1d95', border: '#8b5cf6', text: '#c4b5fd' },
  app: { bg: '#164e63', border: '#0891b2', text: '#67e8f9' },
  data: { bg: '#065f46', border: '#10b981', text: '#6ee7b7' },
}

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

function ComponentBox({
  component,
  isHighlighted,
  isActive,
  onClick,
}: {
  component: DiagramComponent
  isHighlighted: boolean
  isActive: boolean
  onClick?: () => void
}) {
  const colors = componentColors[component.type]

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      animate={{ opacity: isHighlighted ? 1 : 0.45 }}
    >
      <motion.rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={component.height}
        rx={6}
        fill={colors.bg}
        stroke={isHighlighted ? '#3b82f6' : isActive ? '#22c55e' : colors.border}
        strokeWidth={isHighlighted || isActive ? 2.5 : 1.5}
        animate={{
          filter: isHighlighted
            ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
            : isActive
              ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))'
              : 'none',
        }}
      />
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height / 2 + 4}
        fill={colors.text}
        fontSize={component.height <= 35 ? '9' : '11'}
        fontWeight="500"
        textAnchor="middle"
      >
        {component.label}
      </text>
    </motion.g>
  )
}

// ─────────────────────────────────────────────────
// Arrow helper
// ─────────────────────────────────────────────────

function Arrow({ x1, y1, x2, y2, highlighted }: { x1: number; y1: number; x2: number; y2: number; highlighted?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={highlighted ? '#3b82f6' : '#475569'}
      strokeWidth={highlighted ? 2 : 1}
      strokeDasharray={highlighted ? '0' : '4,4'}
      opacity={highlighted ? 0.8 : 0.4}
      markerEnd="url(#arrowhead)"
    />
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function FullStackDiagram({
  highlighted,
  activeComponent,
  onComponentClick,
}: FullStackDiagramProps) {
  const highlightSet = new Set(highlighted)

  function isFlowArrowHighlighted(fromId: string, toId: string) {
    return highlightSet.has(fromId) || highlightSet.has(toId)
  }

  return (
    <svg
      viewBox="0 0 830 330"
      className="w-full mx-auto"
      style={{ background: '#0f172a', borderRadius: '8px' }}
    >
      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#475569" />
        </marker>
      </defs>

      {/* K8s cluster boundary */}
      <rect
        x={435}
        y={35}
        width={385}
        height={295}
        rx={10}
        fill="none"
        stroke="#334155"
        strokeWidth={2}
        strokeDasharray="10,5"
      />
      <text x={627} y={28} fill="#64748b" fontSize="11" textAnchor="middle">
        Kubernetes Cluster
      </text>

      {/* Section labels */}
      <text x={70} y={105} fill="#64748b" fontSize="9" textAnchor="middle">Client</text>
      <text x={240} y={105} fill="#64748b" fontSize="9" textAnchor="middle">Network</text>

      {/* Main flow arrows (horizontal) */}
      <Arrow x1={110} y1={150} x2={140} y2={150} highlighted={isFlowArrowHighlighted('browser', 'dns-resolver')} />
      <Arrow x1={210} y1={150} x2={240} y2={150} highlighted={isFlowArrowHighlighted('dns-resolver', 'tls-handshake')} />
      <Arrow x1={310} y1={150} x2={340} y2={150} highlighted={isFlowArrowHighlighted('tls-handshake', 'http-request')} />
      <Arrow x1={410} y1={150} x2={450} y2={150} highlighted={isFlowArrowHighlighted('http-request', 'nodeport')} />
      <Arrow x1={525} y1={150} x2={545} y2={150} highlighted={isFlowArrowHighlighted('nodeport', 'service')} />
      <Arrow x1={620} y1={150} x2={640} y2={140} highlighted={isFlowArrowHighlighted('service', 'pod')} />
      <Arrow x1={710} y1={140} x2={730} y2={150} highlighted={isFlowArrowHighlighted('pod', 'database')} />

      {/* Secondary connections (vertical) */}
      <Arrow x1={490} y1={180} x2={490} y2={230} highlighted={highlightSet.has('kube-proxy')} />
      <Arrow x1={600} y1={180} x2={600} y2={230} highlighted={highlightSet.has('cluster-ip')} />
      <Arrow x1={675} y1={200} x2={700} y2={230} highlighted={highlightSet.has('rest-api')} />

      {/* Workload connections */}
      <Arrow x1={510} y1={265} x2={510} y2={280} highlighted={highlightSet.has('deployment')} />
      <Arrow x1={550} y1={265} x2={600} y2={280} highlighted={highlightSet.has('replicaset')} />
      <Arrow x1={710} y1={265} x2={710} y2={280} highlighted={highlightSet.has('container')} />

      {/* Render all components */}
      {FULL_STACK_COMPONENTS.map((component) => (
        <ComponentBox
          key={component.id}
          component={component}
          isHighlighted={highlightSet.has(component.id)}
          isActive={activeComponent === component.id}
          onClick={onComponentClick ? () => onComponentClick(component.id) : undefined}
        />
      ))}

      {/* Legend */}
      <g transform="translate(20, 320)">
        <text fill="#64748b" fontSize="9">
          Blau = Aktueller Schritt | Gestrichelt = Datenfluss
        </text>
      </g>
    </svg>
  )
}

/** Component positions for RequestPacket integration */
export const FULL_STACK_COMPONENT_POSITIONS: Record<string, { x: number; y: number }> = Object.fromEntries(
  FULL_STACK_COMPONENTS.map(c => [c.id, { x: c.x + c.width / 2, y: c.y + c.height / 2 }])
)

export { FULL_STACK_COMPONENTS }
