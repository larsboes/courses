// src/core/hooks/useAnimationStep.ts
import { useState, useCallback } from 'react'

export interface AnimationStep {
  id: string
  label: string
  description: string
}

interface UseAnimationStepReturn {
  currentStep: number
  step: AnimationStep | undefined
  isFirst: boolean
  isLast: boolean
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  reset: () => void
}

export function useAnimationStep(steps: AnimationStep[]): UseAnimationStepReturn {
  const [currentStep, setCurrentStep] = useState(0)

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setCurrentStep(Math.max(0, Math.min(index, steps.length - 1)))
    },
    [steps.length]
  )

  const reset = useCallback(() => {
    setCurrentStep(0)
  }, [])

  return {
    currentStep,
    step: steps[currentStep],
    isFirst: currentStep === 0,
    isLast: currentStep === steps.length - 1,
    next,
    previous,
    goTo,
    reset,
  }
}
