// src/core/hooks/useProgress.ts
import { useState, useCallback, useEffect } from 'react'
import type { CourseProgress, TopicProgress, QuizProgress } from '@/core/types/content'

const STORAGE_KEY_PREFIX = 'exam-trainer-progress-'

function loadProgress(courseId: string): CourseProgress {
  const key = STORAGE_KEY_PREFIX + courseId
  const stored = localStorage.getItem(key)

  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Invalid JSON, return default
    }
  }

  return {
    courseId,
    lastUpdated: new Date().toISOString(),
    topics: {},
  }
}

function saveProgress(progress: CourseProgress): void {
  const key = STORAGE_KEY_PREFIX + progress.courseId
  localStorage.setItem(key, JSON.stringify(progress))
}

export function useProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress>(() => loadProgress(courseId))

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const markSectionViewed = useCallback((topicId: string, sectionId: string) => {
    setProgress((prev) => {
      const topicProgress = prev.topics[topicId] ?? {
        completed: false,
        sectionsViewed: [],
        quiz: null,
      }

      if (topicProgress.sectionsViewed.includes(sectionId)) {
        return prev
      }

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            sectionsViewed: [...topicProgress.sectionsViewed, sectionId],
          },
        },
      }
    })
  }, [])

  const markTopicCompleted = useCallback((topicId: string) => {
    setProgress((prev) => {
      const topicProgress = prev.topics[topicId] ?? {
        completed: false,
        sectionsViewed: [],
        quiz: null,
      }

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            completed: true,
          },
        },
      }
    })
  }, [])

  const saveQuizResult = useCallback(
    (topicId: string, score: number, totalQuestions: number) => {
      setProgress((prev) => {
        const topicProgress = prev.topics[topicId] ?? {
          completed: false,
          sectionsViewed: [],
          quiz: null,
        }

        const existingQuiz = topicProgress.quiz
        const newQuiz: QuizProgress = {
          bestScore: Math.max(existingQuiz?.bestScore ?? 0, score),
          totalQuestions,
          lastAttempt: new Date().toISOString(),
        }

        return {
          ...prev,
          lastUpdated: new Date().toISOString(),
          topics: {
            ...prev.topics,
            [topicId]: {
              ...topicProgress,
              quiz: newQuiz,
            },
          },
        }
      })
    },
    []
  )

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress | undefined => {
      return progress.topics[topicId]
    },
    [progress]
  )

  const resetProgress = useCallback(() => {
    setProgress({
      courseId,
      lastUpdated: new Date().toISOString(),
      topics: {},
    })
  }, [courseId])

  return {
    progress,
    markSectionViewed,
    markTopicCompleted,
    saveQuizResult,
    getTopicProgress,
    resetProgress,
  }
}
