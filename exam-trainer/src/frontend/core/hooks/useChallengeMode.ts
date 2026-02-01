// src/core/hooks/useChallengeMode.ts
import { useState, useCallback } from 'react'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface Challenge {
  id: string
  title: string
  description: string
  targetValue: string
}

export interface UseChallengeOptions<T extends Challenge> {
  /** Array of challenges */
  challenges: T[]
  /** Function to check if current answer is correct */
  onCheck: (challenge: T) => boolean
  /** Called when challenge mode is toggled or challenge changes */
  onReset?: () => void
}

export interface ChallengeState<T extends Challenge> {
  /** Whether challenge mode is active */
  isActive: boolean
  /** Current challenge object */
  current: T
  /** Current challenge index */
  currentIndex: number
  /** Result of last check: success, fail, or null */
  result: 'success' | 'fail' | null
  /** Toggle challenge mode on/off */
  toggle: () => void
  /** Select a specific challenge by index */
  select: (index: number) => void
  /** Check the current answer */
  check: () => void
  /** Reset challenge mode (clear result, call onReset) */
  reset: () => void
  /** Clear just the result without full reset */
  clearResult: () => void
}

// ─────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────

export function useChallengeMode<T extends Challenge>({
  challenges,
  onCheck,
  onReset,
}: UseChallengeOptions<T>): ChallengeState<T> {
  const [isActive, setIsActive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)

  const current = challenges[currentIndex]

  const reset = useCallback(() => {
    setResult(null)
    onReset?.()
  }, [onReset])

  const toggle = useCallback(() => {
    setIsActive(prev => !prev)
    reset()
  }, [reset])

  const select = useCallback((index: number) => {
    if (index >= 0 && index < challenges.length) {
      setCurrentIndex(index)
      reset()
    }
  }, [challenges.length, reset])

  const check = useCallback(() => {
    const isCorrect = onCheck(current)
    setResult(isCorrect ? 'success' : 'fail')
  }, [current, onCheck])

  const clearResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    isActive,
    current,
    currentIndex,
    result,
    toggle,
    select,
    check,
    reset,
    clearResult,
  }
}
