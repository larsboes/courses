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

export interface RelatedTopicRef {
  id: string
  title: string
  relationship: string // e.g., "builds on", "required for", "related to"
}

export interface Topic {
  id: string
  title: string
  description: string
  icon?: string
  examNotes?: string
  sections: Section[]
  quiz?: Quiz
  relatedTopics?: RelatedTopicRef[]
  connectionDiagram?: string // Mermaid diagram showing topic relationships
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
  | 'system-builder'
  | 'free-text'
  | 'code-write'
  | 'diagram-build'

// Base question fields
interface BaseQuizQuestion {
  id: string
  type: QuizQuestionType
  question: string
  visual?: ReactNode
  explanation: string
  explanationVisual?: ReactNode
}

// Standard question with options
export interface StandardQuizQuestion extends BaseQuizQuestion {
  type: 'multiple-choice' | 'multi-select' | 'order-steps' | 'match-pairs' | 'identify-error' | 'fill-blank'
  options?: string[]
  correctAnswer: string | string[]
}

// System builder question
export interface SystemBuilderQuestion extends BaseQuizQuestion {
  type: 'system-builder'
  manifest: string
  expectedNodes: { type: string; count: number }[]
  expectedEdges: { from: string; to: string }[]
  availableComponents: string[]
}

// Free-text question with self-check
export interface FreeTextQuestion extends BaseQuizQuestion {
  type: 'free-text'
  placeholder?: string
  modelAnswer: string
  keyPoints: string[]  // Checklist shown after submission
}

// Code-write question with syntax highlighting
export interface CodeWriteQuestion extends BaseQuizQuestion {
  type: 'code-write'
  language: 'css' | 'javascript' | 'json' | 'html' | 'http'
  placeholder?: string
  modelAnswer: string
  keyPoints: string[]
}

// Diagram-build question (DOM tree, K8s system)
export interface DiagramBuildQuestion extends BaseQuizQuestion {
  type: 'diagram-build'
  diagramType: 'dom-tree' | 'k8s-system'
  availableNodes: string[]
  expectedStructure: { type: string; children?: string[] }[]
}

export type QuizQuestion = StandardQuizQuestion | SystemBuilderQuestion | FreeTextQuestion | CodeWriteQuestion | DiagramBuildQuestion

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
