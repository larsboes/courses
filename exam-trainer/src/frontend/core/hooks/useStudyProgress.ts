// src/core/hooks/useStudyProgress.ts
import { useState, useEffect, useCallback } from 'react'
import type { StudyProgress, CardProgress } from '@/core/types/study'
import { createEmptyProgress, calculateNextReview } from '@/core/types/study'

const API_BASE = '/api'

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress>(createEmptyProgress)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch(`${API_BASE}/study-progress`)
        if (response.ok) {
          const data = await response.json()
          setProgress(data)
        }
      } catch (err) {
        console.error('Failed to load study progress:', err)
        setError('Failed to load progress')
      } finally {
        setIsLoading(false)
      }
    }
    loadProgress()
  }, [])

  // Save progress to backend
  const saveProgress = useCallback(async (newProgress: StudyProgress) => {
    try {
      await fetch(`${API_BASE}/study-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress),
      })
    } catch (err) {
      console.error('Failed to save study progress:', err)
    }
  }, [])

  // Record a card review
  const recordCardReview = useCallback(
    (cardId: string, knew: boolean) => {
      setProgress(prev => {
        const existing = prev.cards[cardId]
        const currentStreak = existing?.streak ?? 0
        const { nextReview, newStreak } = calculateNextReview(knew, currentStreak)

        const updatedCard: CardProgress = {
          lastSeen: new Date().toISOString(),
          nextReview,
          streak: newStreak,
          totalSeen: (existing?.totalSeen ?? 0) + 1,
          totalCorrect: (existing?.totalCorrect ?? 0) + (knew ? 1 : 0),
        }

        const newProgress: StudyProgress = {
          ...prev,
          lastUpdated: new Date().toISOString(),
          cards: {
            ...prev.cards,
            [cardId]: updatedCard,
          },
        }

        // Save async
        saveProgress(newProgress)

        return newProgress
      })
    },
    [saveProgress]
  )

  // Record a study session
  const recordSession = useCallback(
    (cardsReviewed: number, correctCount: number) => {
      setProgress(prev => {
        const newProgress: StudyProgress = {
          ...prev,
          lastUpdated: new Date().toISOString(),
          sessions: [
            ...prev.sessions,
            {
              date: new Date().toISOString().split('T')[0],
              cardsReviewed,
              correctCount,
            },
          ],
        }

        saveProgress(newProgress)
        return newProgress
      })
    },
    [saveProgress]
  )

  // Get cards due for review
  const getCardsDue = useCallback((): string[] => {
    const today = new Date().toISOString().split('T')[0]
    return Object.entries(progress.cards)
      .filter(([_, card]) => card.nextReview <= today)
      .map(([id]) => id)
  }, [progress.cards])

  // Get weak cards (< 70% correct rate)
  const getWeakCards = useCallback((): string[] => {
    return Object.entries(progress.cards)
      .filter(([_, card]) => {
        if (card.totalSeen < 2) return false
        return card.totalCorrect / card.totalSeen < 0.7
      })
      .map(([id]) => id)
  }, [progress.cards])

  // Get card progress
  const getCardProgress = useCallback(
    (cardId: string): CardProgress | undefined => {
      return progress.cards[cardId]
    },
    [progress.cards]
  )

  return {
    progress,
    isLoading,
    error,
    recordCardReview,
    recordSession,
    getCardsDue,
    getWeakCards,
    getCardProgress,
  }
}
