// src/core/components/diagrams/ChallengeBanner.tsx
import { motion, AnimatePresence } from 'framer-motion'
import type { Challenge, ChallengeState } from '@/core/hooks/useChallengeMode'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface ChallengeBannerProps<T extends Challenge> {
  /** Challenge state from useChallengeMode hook */
  challenge: ChallengeState<T>
  /** All available challenges (for selector) */
  challenges: T[]
  /** Optional: show target value hint */
  showTargetValue?: boolean
  /** Additional CSS classes */
  className?: string
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function ChallengeBanner<T extends Challenge>({
  challenge,
  challenges,
  showTargetValue = true,
  className,
}: ChallengeBannerProps<T>) {
  const { isActive, current, currentIndex, select, reset } = challenge

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`overflow-hidden ${className ?? ''}`}
        >
          <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-700/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span className="font-semibold text-blue-300">{current.title}</span>
              </div>
              {challenges.length > 1 && (
                <select
                  value={currentIndex}
                  onChange={(e) => {
                    select(Number(e.target.value))
                    reset()
                  }}
                  className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-sm"
                >
                  {challenges.map((c, i) => (
                    <option key={c.id} value={i}>{c.title}</option>
                  ))}
                </select>
              )}
            </div>
            <p className="text-slate-300">{current.description}</p>
            {showTargetValue && (
              <p className="text-sm text-slate-500 mt-1">
                Gesuchter Wert: <code className="bg-slate-700 px-1 rounded">{current.targetValue}</code>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
