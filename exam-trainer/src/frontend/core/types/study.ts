// src/core/types/study.ts

export interface CardProgress {
  lastSeen: string
  nextReview: string
  streak: number
  totalSeen: number
  totalCorrect: number
}

export interface StudySession {
  date: string
  cardsReviewed: number
  correctCount: number
}

export interface StudyProgress {
  lastUpdated: string
  cards: Record<string, CardProgress>
  sessions: StudySession[]
}

export function createEmptyProgress(): StudyProgress {
  return {
    lastUpdated: new Date().toISOString(),
    cards: {},
    sessions: [],
  }
}

export function calculateNextReview(knew: boolean, currentStreak: number): { nextReview: string; newStreak: number } {
  const today = new Date()

  if (knew) {
    const daysUntilReview = Math.max(2, (currentStreak + 1) * 2)
    const nextDate = new Date(today)
    nextDate.setDate(nextDate.getDate() + daysUntilReview)
    return {
      nextReview: nextDate.toISOString().split('T')[0],
      newStreak: currentStreak + 1,
    }
  } else {
    const nextDate = new Date(today)
    nextDate.setDate(nextDate.getDate() + 1)
    return {
      nextReview: nextDate.toISOString().split('T')[0],
      newStreak: 0,
    }
  }
}
