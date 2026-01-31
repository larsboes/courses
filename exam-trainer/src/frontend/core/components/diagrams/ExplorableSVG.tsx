// src/core/components/diagrams/ExplorableSVG.tsx
import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ExplorableRegion {
  id: string
  label: string
  description: ReactNode
}

interface ExplorableSVGProps {
  regions: ExplorableRegion[]
  children: (
    activeRegion: string | null,
    setActiveRegion: (id: string | null) => void
  ) => ReactNode
  className?: string
}

export function ExplorableSVG({ regions, children, className = '' }: ExplorableSVGProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const activeData = regions.find((r) => r.id === activeRegion)

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Interactive Diagram */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        {children(activeRegion, setActiveRegion)}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/50"
          >
            <div className="font-medium text-blue-300 mb-2">{activeData.label}</div>
            <div className="text-slate-300 text-sm">{activeData.description}</div>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-slate-500 py-4"
          >
            Klicke auf einen Bereich für Details
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
