// src/core/components/diagrams/ChallengeResult.tsx
import { motion, AnimatePresence } from 'framer-motion'
import type { Challenge, ChallengeState } from '@/core/hooks/useChallengeMode'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface ChallengeResultProps<T extends Challenge> {
  /** Challenge state from useChallengeMode hook */
  challenge: ChallengeState<T>
  /** Hint to show on failure (e.g., correct answer) */
  hint?: string
  /** Custom success message */
  successMessage?: string
  /** Custom fail message */
  failMessage?: string
  /** Additional CSS classes */
  className?: string
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function ChallengeResult<T extends Challenge>({
  challenge,
  hint,
  successMessage = 'Korrekt!',
  failMessage = 'Nicht ganz',
  className,
}: ChallengeResultProps<T>) {
  const { result } = challenge

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`
            p-4 rounded-lg text-center
            ${result === 'success'
              ? 'bg-green-900/30 border border-green-700/50'
              : 'bg-red-900/30 border border-red-700/50'}
            ${className ?? ''}
          `}
        >
          {result === 'success' ? (
            <div className="text-green-400">
              <span className="text-2xl">🎉</span>
              <p className="font-semibold mt-2">{successMessage}</p>
            </div>
          ) : (
            <div className="text-red-400">
              <span className="text-2xl">❌</span>
              <p className="font-semibold mt-2">{failMessage}</p>
              {hint && (
                <p className="text-sm text-slate-300 mt-1">
                  Tipp: <code className="bg-slate-700 px-1 rounded">{hint}</code>
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
