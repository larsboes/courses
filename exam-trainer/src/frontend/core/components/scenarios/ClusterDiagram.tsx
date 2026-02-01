// src/core/components/scenarios/ClusterDiagram.tsx
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface ClusterComponent {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  type: 'node' | 'pod' | 'service' | 'external' | 'dns' | 'proxy'
}

export interface ClusterDiagramProps {
  /** IDs of components to highlight */
  highlighted: string[]
  /** Currently active component (packet location) */
  activeComponent?: string
  /** Callback when component is clicked */
  onComponentClick?: (id: string) => void
  /** Additional CSS classes */
  className?: string
}

// ─────────────────────────────────────────────────
// Cluster Layout Definition
// ─────────────────────────────────────────────────

const CLUSTER_COMPONENTS: ClusterComponent[] = [
  // External user (outside cluster)
  { id: 'user', label: 'User', x: 50, y: 20, width: 80, height: 40, type: 'external' },

  // Node 1 with pods
  { id: 'node', label: 'Node 1', x: 30, y: 100, width: 200, height: 180, type: 'node' },
  { id: 'pod', label: 'Pod A', x: 50, y: 160, width: 70, height: 50, type: 'pod' },
  { id: 'container', label: 'Container', x: 140, y: 160, width: 70, height: 50, type: 'pod' },
  { id: 'kube-proxy', label: 'kube-proxy', x: 50, y: 230, width: 160, height: 30, type: 'proxy' },

  // Node 2 with pods
  { id: 'node-2', label: 'Node 2', x: 270, y: 100, width: 200, height: 180, type: 'node' },
  { id: 'pod-b', label: 'Pod B', x: 290, y: 160, width: 70, height: 50, type: 'pod' },
  { id: 'pod-c', label: 'Pod C', x: 380, y: 160, width: 70, height: 50, type: 'pod' },
  { id: 'kube-proxy-2', label: 'kube-proxy', x: 290, y: 230, width: 160, height: 30, type: 'proxy' },

  // Services (middle area)
  { id: 'service', label: 'Service', x: 180, y: 310, width: 140, height: 45, type: 'service' },
  { id: 'cluster-ip', label: 'ClusterIP', x: 185, y: 325, width: 50, height: 20, type: 'service' },

  // CoreDNS
  { id: 'coredns', label: 'CoreDNS', x: 370, y: 310, width: 100, height: 45, type: 'dns' },

  // NodePort indicator
  { id: 'nodeport', label: 'NodePort :30080', x: 30, y: 70, width: 100, height: 25, type: 'service' },
  { id: 'node-ip', label: 'Node-IP', x: 140, y: 70, width: 70, height: 25, type: 'service' },

  // External/Internet
  { id: 'external', label: 'Internet', x: 380, y: 20, width: 80, height: 40, type: 'external' },
]

// ─────────────────────────────────────────────────
// Helper Components
// ─────────────────────────────────────────────────

const componentColors: Record<ClusterComponent['type'], { bg: string; border: string; text: string }> = {
  node: { bg: '#1e293b', border: '#475569', text: '#94a3b8' },
  pod: { bg: '#164e63', border: '#0891b2', text: '#67e8f9' },
  service: { bg: '#4c1d95', border: '#8b5cf6', text: '#c4b5fd' },
  external: { bg: '#374151', border: '#6b7280', text: '#d1d5db' },
  dns: { bg: '#065f46', border: '#10b981', text: '#6ee7b7' },
  proxy: { bg: '#78350f', border: '#f59e0b', text: '#fcd34d' },
}

function ClusterComponentBox({
  component,
  isHighlighted,
  isActive,
  onClick,
}: {
  component: ClusterComponent
  isHighlighted: boolean
  isActive: boolean
  onClick?: () => void
}) {
  const colors = componentColors[component.type]

  // Node components are rendered as larger containers
  if (component.type === 'node') {
    return (
      <motion.g
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        animate={{
          opacity: isHighlighted ? 1 : 0.6,
        }}
      >
        <motion.rect
          x={component.x}
          y={component.y}
          width={component.width}
          height={component.height}
          rx={8}
          fill={colors.bg}
          stroke={isHighlighted ? '#3b82f6' : colors.border}
          strokeWidth={isHighlighted ? 3 : 2}
          strokeDasharray={component.type === 'node' ? '8,4' : '0'}
          animate={{
            filter: isHighlighted ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'none',
          }}
        />
        <text
          x={component.x + 10}
          y={component.y + 20}
          fill={colors.text}
          fontSize="12"
          fontWeight="bold"
        >
          {component.label}
        </text>
      </motion.g>
    )
  }

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      animate={{
        opacity: isHighlighted ? 1 : 0.5,
      }}
    >
      <motion.rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={component.height}
        rx={4}
        fill={colors.bg}
        stroke={isHighlighted ? '#3b82f6' : isActive ? '#22c55e' : colors.border}
        strokeWidth={isHighlighted || isActive ? 3 : 1.5}
        animate={{
          filter: isHighlighted
            ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))'
            : isActive
              ? 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))'
              : 'none',
        }}
      />
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height / 2 + 4}
        fill={colors.text}
        fontSize="11"
        fontWeight="500"
        textAnchor="middle"
      >
        {component.label}
      </text>
    </motion.g>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function ClusterDiagram({
  highlighted,
  activeComponent,
  onComponentClick,
  className,
}: ClusterDiagramProps) {
  const highlightSet = new Set(highlighted)

  return (
    <g className={className}>
      {/* Connection lines */}
      <g stroke="#475569" strokeWidth={1} strokeDasharray="4,4" opacity={0.5}>
        {/* User to NodePort */}
        <line x1={90} y1={60} x2={90} y2={70} />
        {/* Service to pods */}
        <line x1={250} y1={310} x2={250} y2={280} />
        <line x1={250} y1={280} x2={120} y2={210} />
        <line x1={250} y1={280} x2={380} y2={210} />
        {/* CoreDNS connections */}
        <line x1={370} y1={332} x2={330} y2={332} />
      </g>

      {/* Render all components */}
      {CLUSTER_COMPONENTS.map((component) => (
        <ClusterComponentBox
          key={component.id}
          component={component}
          isHighlighted={highlightSet.has(component.id)}
          isActive={activeComponent === component.id}
          onClick={onComponentClick ? () => onComponentClick(component.id) : undefined}
        />
      ))}
    </g>
  )
}

export { CLUSTER_COMPONENTS }
