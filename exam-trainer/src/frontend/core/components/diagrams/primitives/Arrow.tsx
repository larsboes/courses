// src/core/components/diagrams/primitives/Arrow.tsx
import { motion } from 'framer-motion'

interface ArrowProps {
  direction?: 'right' | 'left' | 'down' | 'up'
  animated?: boolean
  highlighted?: boolean
  label?: string
  className?: string
}

export function Arrow({
  direction = 'right',
  animated = false,
  highlighted = false,
  label,
  className = '',
}: ArrowProps) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {label && (
        <span className="text-xs text-slate-400">{label}</span>
      )}
      <motion.svg
        width="60"
        height="24"
        viewBox="0 0 60 24"
        style={{ rotate: rotations[direction] }}
        className="text-slate-500"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="45"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{
            pathLength: 1,
            stroke: highlighted ? '#3b82f6' : 'currentColor',
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.polygon
          points="45,6 60,12 45,18"
          fill="currentColor"
          initial={animated ? { opacity: 0 } : { opacity: 1 }}
          animate={{
            opacity: 1,
            fill: highlighted ? '#3b82f6' : 'currentColor',
          }}
          transition={{ duration: 0.3, delay: animated ? 0.3 : 0 }}
        />
      </motion.svg>
    </div>
  )
}
