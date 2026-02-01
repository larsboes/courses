// src/core/components/scenarios/RequestPacket.tsx
import { motion } from 'framer-motion'
import { CLUSTER_COMPONENTS } from './ClusterDiagram'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface RequestPacketProps {
  /** Current component ID where packet is located */
  componentId: string
  /** Whether the packet is currently animating */
  isAnimating?: boolean
  /** Packet color variant */
  variant?: 'request' | 'response' | 'dns'
}

// ─────────────────────────────────────────────────
// Position Mapping
// ─────────────────────────────────────────────────

// Map component IDs to packet positions (center of component)
function getPacketPosition(componentId: string): { x: number; y: number } {
  // Find component in cluster layout
  const component = CLUSTER_COMPONENTS.find(c => c.id === componentId)
  if (component) {
    return {
      x: component.x + component.width / 2,
      y: component.y + component.height / 2,
    }
  }

  // Default positions for components not in the static layout
  const fallbackPositions: Record<string, { x: number; y: number }> = {
    'user': { x: 90, y: 40 },
    'external': { x: 420, y: 40 },
    'nat': { x: 320, y: 90 },
    'dns-query': { x: 420, y: 332 },
    'labels': { x: 250, y: 340 },
  }

  return fallbackPositions[componentId] ?? { x: 250, y: 200 }
}

// ─────────────────────────────────────────────────
// Packet Colors
// ─────────────────────────────────────────────────

const packetColors: Record<string, { fill: string; glow: string }> = {
  request: { fill: '#22c55e', glow: 'rgba(34, 197, 94, 0.6)' },
  response: { fill: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
  dns: { fill: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)' },
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function RequestPacket({
  componentId,
  isAnimating = false,
  variant = 'request',
}: RequestPacketProps) {
  const position = getPacketPosition(componentId)
  const colors = packetColors[variant]

  return (
    <motion.g
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
    >
      {/* Glow effect */}
      <motion.circle
        r={16}
        fill={colors.glow}
        animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
          opacity: isAnimating ? [0.6, 0.3, 0.6] : 0.4,
        }}
        transition={{
          duration: 1,
          repeat: isAnimating ? Infinity : 0,
        }}
      />

      {/* Packet body */}
      <motion.circle
        r={8}
        fill={colors.fill}
        stroke="#fff"
        strokeWidth={2}
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
        }}
      />

      {/* Direction indicator (small arrow) */}
      <motion.path
        d="M-3,-3 L3,0 L-3,3 Z"
        fill="#fff"
        animate={{
          opacity: isAnimating ? 1 : 0.7,
        }}
      />
    </motion.g>
  )
}
