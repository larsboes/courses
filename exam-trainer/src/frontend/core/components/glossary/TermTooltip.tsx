// src/core/components/glossary/TermTooltip.tsx
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlossary } from '@/core/hooks'

interface TermTooltipProps {
  term: string
  children: ReactNode
}

export function TermTooltip({ term, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const { getTerm, getComparisons } = useGlossary()

  const glossaryTerm = getTerm(term)
  const comparisons = getComparisons(term)

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const spaceBelow = window.innerHeight - rect.bottom
      setPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
    }
  }, [isOpen])

  if (!glossaryTerm) {
    return <span>{children}</span>
  }

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        className="border-b border-dashed border-blue-400/50 cursor-help hover:border-blue-400 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-72 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl ${
              position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            } left-1/2 -translate-x-1/2`}
          >
            <div className="text-sm">
              <div className="font-semibold text-blue-400 mb-1">
                {glossaryTerm.term}
              </div>
              <div className="text-slate-300 leading-relaxed">
                {glossaryTerm.definition}
              </div>

              {glossaryTerm.details && (
                <div className="mt-2 text-slate-400 text-xs leading-relaxed">
                  {glossaryTerm.details}
                </div>
              )}

              <div className="mt-2 pt-2 border-t border-slate-700 flex gap-2 text-xs">
                <span className="text-slate-500">
                  {glossaryTerm.category}
                </span>
                {comparisons.length > 0 && (
                  <span className="text-purple-400">
                    {comparisons.length} Vergleich{comparisons.length > 1 ? 'e' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-slate-600 rotate-45 ${
                position === 'top'
                  ? 'bottom-[-5px] border-b border-r'
                  : 'top-[-5px] border-t border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
