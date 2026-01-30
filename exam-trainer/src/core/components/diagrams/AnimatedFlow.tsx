// src/core/components/diagrams/AnimatedFlow.tsx
import { ReactNode } from 'react'
import { Button } from '@/core/components/ui'
import { useAnimationStep, AnimationStep } from '@/core/hooks'

interface AnimatedFlowProps {
  steps: AnimationStep[]
  children: (currentStep: number, stepData: AnimationStep | undefined) => ReactNode
  className?: string
}

export function AnimatedFlow({ steps, children, className = '' }: AnimatedFlowProps) {
  const { currentStep, step, isFirst, isLast, next, previous, reset } = useAnimationStep(steps)

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Diagram Area */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        {children(currentStep, step)}
      </div>

      {/* Step Description */}
      {step && (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">
            Schritt {currentStep + 1} von {steps.length}
          </div>
          <div className="font-medium">{step.label}</div>
          <div className="text-slate-400 text-sm mt-1">{step.description}</div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={previous}
          disabled={isFirst}
        >
          ← Zurück
        </Button>

        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <Button variant="secondary" size="sm" onClick={reset}>
            Neu starten
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={next}>
            Weiter →
          </Button>
        )}
      </div>
    </div>
  )
}
