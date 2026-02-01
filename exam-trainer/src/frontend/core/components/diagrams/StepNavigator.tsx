// src/core/components/diagrams/StepNavigator.tsx
import { motion } from 'framer-motion'
import { Button } from '@/core/components/ui/Button'
import type { StepNavigatorState } from '@/core/hooks/useStepNavigator'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface StepNavigatorProps {
  /** Stepper state from useStepNavigator hook */
  stepper: StepNavigatorState
  /** Visual variant: dots (small circles) or numbers (numbered steps) */
  variant?: 'dots' | 'numbers'
  /** Show auto-play button (default: true) */
  showAutoPlay?: boolean
  /** Show text labels on prev/next buttons (default: true) */
  showLabels?: boolean
  /** Additional CSS classes */
  className?: string
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function StepNavigator({
  stepper,
  variant = 'dots',
  showAutoPlay = true,
  showLabels = true,
  className,
}: StepNavigatorProps) {
  const { currentStep, totalSteps, isFirst, isLast, isAnimating, next, prev, goTo, autoPlay } = stepper

  return (
    <div className={`flex items-center justify-between pt-4 border-t border-slate-700 ${className ?? ''}`}>
      {/* Previous button */}
      <Button
        variant="secondary"
        onClick={prev}
        disabled={isFirst || isAnimating}
      >
        ← {showLabels && 'Zurück'}
      </Button>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {variant === 'dots' ? (
          // Dots variant
          Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              disabled={isAnimating}
              className={`
                w-3 h-3 rounded-full transition-colors
                ${i === currentStep
                  ? 'bg-blue-500'
                  : i < currentStep
                    ? 'bg-green-500'
                    : 'bg-slate-600'}
                ${!isAnimating && 'hover:ring-2 hover:ring-slate-400'}
              `}
              aria-label={`Go to step ${i + 1}`}
            />
          ))
        ) : (
          // Numbers variant
          Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.button
                onClick={() => goTo(i)}
                disabled={isAnimating}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${i === currentStep
                    ? 'bg-blue-600 text-white'
                    : i < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400'}
                  ${!isAnimating && 'cursor-pointer'}
                `}
                whileHover={!isAnimating ? { scale: 1.1 } : undefined}
                animate={{
                  backgroundColor: i === currentStep ? '#2563eb' : i < currentStep ? '#16a34a' : '#334155',
                }}
              >
                {i < currentStep ? '✓' : i + 1}
              </motion.button>
              {i < totalSteps - 1 && (
                <div className={`w-6 h-1 mx-1 ${i < currentStep ? 'bg-green-600' : 'bg-slate-700'}`} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Auto-play / Next button */}
      {showAutoPlay ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={autoPlay}
            disabled={isAnimating}
          >
            ▶
          </Button>
          <Button
            variant="secondary"
            onClick={next}
            disabled={isLast || isAnimating}
          >
            {showLabels && 'Weiter'} →
          </Button>
        </div>
      ) : (
        <Button
          variant="secondary"
          onClick={next}
          disabled={isLast || isAnimating}
        >
          {showLabels && 'Weiter'} →
        </Button>
      )}
    </div>
  )
}
