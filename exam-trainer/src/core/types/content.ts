// src/core/types/content.ts
import { ComponentType, ReactNode } from 'react'

// ─────────────────────────────────────────────────
// Course & Topic Structure
// ─────────────────────────────────────────────────

export interface Course {
  id: string
  title: string
  description: string
  topics: Topic[]
}

export interface Topic {
  id: string
  title: string
  description: string
  icon?: string
  examNotes?: string
  sections: Section[]
  quiz?: Quiz
}

export interface Section {
  id: string
  title: string
  content: ReactNode
  diagram?: DiagramConfig
}

// ─────────────────────────────────────────────────
// Diagram Types
// ─────────────────────────────────────────────────

export type DiagramType = 'animated' | 'manipulatable' | 'explorable'

export interface DiagramProps {
  className?: string
}

export interface DiagramConfig {
  type: DiagramType
  component: ComponentType<DiagramProps>
}

// ─────────────────────────────────────────────────
// Quiz Types
// ─────────────────────────────────────────────────

export interface Quiz {
  questions: QuizQuestion[]
}

export type QuizQuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'order-steps'
  | 'match-pairs'
  | 'identify-error'
  | 'fill-blank'

export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  question: string
  visual?: ReactNode
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  explanationVisual?: ReactNode
}

// ─────────────────────────────────────────────────
// Progress Types
// ─────────────────────────────────────────────────

export interface CourseProgress {
  courseId: string
  lastUpdated: string
  topics: Record<string, TopicProgress>
}

export interface TopicProgress {
  completed: boolean
  sectionsViewed: string[]
  quiz: QuizProgress | null
}

export interface QuizProgress {
  bestScore: number
  totalQuestions: number
  lastAttempt: string
}
