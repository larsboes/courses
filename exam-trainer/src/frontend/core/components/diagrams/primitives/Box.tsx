// src/core/components/diagrams/primitives/Box.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BoxProps {
  children: ReactNode
  highlighted?: boolean
  variant?: 'default' | 'primary' | 'success' | 'warning'
  className?: string
}

const variants = {
  default: 'bg-slate-700 border-slate-600',
  primary: 'bg-blue-900/50 border-blue-500',
  success: 'bg-green-900/50 border-green-500',
  warning: 'bg-amber-900/50 border-amber-500',
}

export function Box({
  children,
  highlighted = false,
  variant = 'default',
  className = '',
}: BoxProps) {
  return (
    <motion.div
      className={`
        px-4 py-3 rounded-lg border-2 font-medium
        ${variants[variant]}
        ${className}
      `}
      animate={{
        scale: highlighted ? 1.05 : 1,
        boxShadow: highlighted
          ? '0 0 20px rgba(59, 130, 246, 0.5)'
          : '0 0 0px rgba(59, 130, 246, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
