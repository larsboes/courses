// src/core/components/diagrams/primitives/Label.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
  highlighted?: boolean
  className?: string
}

export function Label({ children, highlighted = false, className = '' }: LabelProps) {
  return (
    <motion.span
      className={`text-sm ${className}`}
      animate={{
        color: highlighted ? '#f8fafc' : '#94a3b8',
        fontWeight: highlighted ? 600 : 400,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}
