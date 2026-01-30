// src/core/hooks/useQuizState.ts
import { useState, useCallback, useMemo } from 'react'
import type { Quiz, QuizQuestion } from '@/core/types/content'

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

    const correct = currentQuestion.correctAnswer
    if (Array.isArray(correct)) {
      if (!Array.isArray(currentAnswer)) return false
      return (
        correct.length === currentAnswer.length &&
        correct.every((c) => currentAnswer.includes(c))
      )
    }
    return currentAnswer === correct
  }, [currentAnswer, currentQuestion])

  const score = useMemo(() => {
    let correct = 0
    quiz.questions.forEach((q) => {
      const answer = state.answers.get(q.id)
      if (!answer) return

      if (Array.isArray(q.correctAnswer)) {
        if (
          Array.isArray(answer) &&
          q.correctAnswer.length === answer.length &&
          q.correctAnswer.every((c) => answer.includes(c))
        ) {
          correct++
        }
      } else if (answer === q.correctAnswer) {
        correct++
      }
    })
    return correct
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
