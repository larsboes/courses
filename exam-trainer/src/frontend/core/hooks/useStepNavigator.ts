// src/core/hooks/useStepNavigator.ts
import { useState, useCallback, useRef } from 'react'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface UseStepNavigatorOptions {
  /** Total number of steps */
  totalSteps: number
  /** Initial step (default: 0) */
  initialStep?: number
  /** Auto-play interval in ms (default: 1500) */
  autoPlayInterval?: number
  /** Callback when step changes */
  onStepChange?: (step: number) => void
}

export interface StepNavigatorState {
  /** Current step index (0-based) */
  currentStep: number
  /** Total number of steps */
  totalSteps: number
  /** Is at first step */
  isFirst: boolean
  /** Is at last step */
  isLast: boolean
  /** Is auto-playing */
  isAnimating: boolean
  /** Go to next step */
  next: () => void
  /** Go to previous step */
  prev: () => void
  /** Go to specific step */
  goTo: (step: number) => void
  /** Reset to first step */
  reset: () => void
  /** Start auto-play through all steps */
  autoPlay: () => void
  /** Stop auto-play */
  stop: () => void
}

// ─────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────

export function useStepNavigator({
  totalSteps,
  initialStep = 0,
  autoPlayInterval = 1500,
  onStepChange,
}: UseStepNavigatorOptions): StepNavigatorState {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const updateStep = useCallback((step: number) => {
    setCurrentStep(step)
    onStepChange?.(step)
  }, [onStepChange])

  const next = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      updateStep(currentStep + 1)
    }
  }, [currentStep, totalSteps, updateStep])

  const prev = useCallback(() => {
    if (currentStep > 0) {
      updateStep(currentStep - 1)
    }
  }, [currentStep, updateStep])

  const goTo = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps && !isAnimating) {
      updateStep(step)
    }
  }, [totalSteps, isAnimating, updateStep])

  const reset = useCallback(() => {
    // Clear any pending timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setIsAnimating(false)
    updateStep(0)
  }, [updateStep])

  const stop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setIsAnimating(false)
  }, [])

  const autoPlay = useCallback(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    setIsAnimating(true)
    updateStep(0)

    // Schedule all steps
    for (let i = 1; i < totalSteps; i++) {
      const timeout = setTimeout(() => {
        updateStep(i)
        if (i === totalSteps - 1) {
          setIsAnimating(false)
        }
      }, i * autoPlayInterval)
      timeoutsRef.current.push(timeout)
    }
  }, [totalSteps, autoPlayInterval, updateStep])

  return {
    currentStep,
    totalSteps,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    isAnimating,
    next,
    prev,
    goTo,
    reset,
    autoPlay,
    stop,
  }
}
