// src/core/hooks/useQuizState.ts
import { useState, useCallback, useMemo } from 'react'
import type { Quiz, QuizQuestion, StandardQuizQuestion } from '@/core/types/content'

// Helper to check if a question has correctAnswer property
function isStandardQuestion(q: QuizQuestion): q is StandardQuizQuestion {
  return q.type !== 'system-builder'
}

interface QuizState {
  currentIndex: number
  answers: Map<string, string | string[]>
  showingResult: boolean
}

interface QuizActions {
  submitAnswer: (answer: string | string[]) => void
  nextQuestion: () => void
  previousQuestion: () => void
  reset: () => void
}

interface QuizInfo {
  currentQuestion: QuizQuestion | undefined
  isFirst: boolean
  isLast: boolean
  isAnswered: boolean
  isCorrect: boolean | null
  score: number
  totalQuestions: number
  isComplete: boolean
}

export function useQuizState(quiz: Quiz): [QuizState & QuizInfo, QuizActions] {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: new Map(),
    showingResult: false,
  })

  const currentQuestion = quiz.questions[state.currentIndex]
  const currentAnswer = state.answers.get(currentQuestion?.id ?? '')

  const isCorrect = useMemo(() => {
    if (!currentAnswer || !currentQuestion) return null

    // System-builder questions use 'correct'/'incorrect' as answer
    if (currentQuestion.type === 'system-builder') {
      return currentAnswer === 'correct'
    }

    // Standard questions with correctAnswer property
    if (isStandardQuestion(currentQuestion)) {
      const correct = currentQuestion.correctAnswer
      if (Array.isArray(correct)) {
        if (!Array.isArray(currentAnswer)) return false
        return (
          correct.length === currentAnswer.length &&
          correct.every((c: string) => currentAnswer.includes(c))
        )
      }
      return currentAnswer === correct
    }

    return null
  }, [currentAnswer, currentQuestion])

  const score = useMemo(() => {
    let correctCount = 0
    quiz.questions.forEach((q) => {
      const answer = state.answers.get(q.id)
      if (!answer) return

      // System-builder questions use 'correct'/'incorrect' as answer
      if (q.type === 'system-builder') {
        if (answer === 'correct') {
          correctCount++
        }
        return
      }

      // Standard questions with correctAnswer property
      if (isStandardQuestion(q)) {
        if (Array.isArray(q.correctAnswer)) {
          if (
            Array.isArray(answer) &&
            q.correctAnswer.length === answer.length &&
            q.correctAnswer.every((c: string) => answer.includes(c))
          ) {
            correctCount++
          }
        } else if (answer === q.correctAnswer) {
          correctCount++
        }
      }
    })
    return correctCount
  }, [quiz.questions, state.answers])

  const submitAnswer = useCallback((answer: string | string[]) => {
    if (!currentQuestion) return
    setState((prev) => ({
      ...prev,
      answers: new Map(prev.answers).set(currentQuestion.id, answer),
      showingResult: true,
    }))
  }, [currentQuestion])

  const nextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, quiz.questions.length - 1),
      showingResult: false,
    }))
  }, [quiz.questions.length])

  const previousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
      showingResult: false,
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: new Map(),
      showingResult: false,
    })
  }, [])

  return [
    {
      ...state,
      currentQuestion,
      isFirst: state.currentIndex === 0,
      isLast: state.currentIndex === quiz.questions.length - 1,
      isAnswered: currentAnswer !== undefined,
      isCorrect,
      score,
      totalQuestions: quiz.questions.length,
      isComplete: state.answers.size === quiz.questions.length,
    },
    { submitAnswer, nextQuestion, previousQuestion, reset },
  ]
}
