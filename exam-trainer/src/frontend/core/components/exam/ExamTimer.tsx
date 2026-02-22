// src/core/components/exam/ExamTimer.tsx
import { useState, useEffect, useRef, useCallback } from 'react'

interface ExamTimerProps {
  durationMinutes: number
  simulationId: string
  onTimeExpired: () => void
}

const STORAGE_PREFIX = 'klausur-timer-'

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

function getTimerColor(remaining: number, total: number): string {
  const ratio = remaining / total
  if (ratio > 0.25) return 'text-green-400 border-green-600'
  if (ratio > 0.08) return 'text-amber-400 border-amber-600'
  return 'text-red-400 border-red-600'
}

export function ExamTimer({ durationMinutes, simulationId, onTimeExpired }: ExamTimerProps) {
  const storageKey = STORAGE_PREFIX + simulationId
  const totalSeconds = durationMinutes * 60
  const expiredRef = useRef(false)

  const [remaining, setRemaining] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const { startTime } = JSON.parse(saved)
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      return Math.max(0, totalSeconds - elapsed)
    }
    // First mount: store start time
    localStorage.setItem(storageKey, JSON.stringify({ startTime: Date.now() }))
    return totalSeconds
  })

  const [isPaused, setIsPaused] = useState(false)

  const handleExpired = useCallback(() => {
    if (!expiredRef.current) {
      expiredRef.current = true
      localStorage.removeItem(storageKey)
      onTimeExpired()
    }
  }, [storageKey, onTimeExpired])

  useEffect(() => {
    if (isPaused || remaining <= 0) return

    const interval = setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1
        if (next <= 0) {
          clearInterval(interval)
          handleExpired()
          return 0
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, remaining, handleExpired])

  const colorClass = getTimerColor(remaining, totalSeconds)
  const isUrgent = remaining < totalSeconds * 0.08

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border bg-slate-800/80 backdrop-blur ${colorClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 uppercase tracking-wide">Zeit</span>
        <span className={`font-mono text-lg font-bold ${isUrgent ? 'animate-pulse' : ''}`}>
          {formatTime(remaining)}
        </span>
      </div>
      <button
        onClick={() => setIsPaused(p => !p)}
        className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
      >
        {isPaused ? 'Weiter' : 'Pause'}
      </button>
      {isPaused && (
        <span className="text-xs text-slate-500">pausiert</span>
      )}
    </div>
  )
}

/** Clean up timer state for a simulation */
export function clearTimerState(simulationId: string) {
  localStorage.removeItem(STORAGE_PREFIX + simulationId)
}
