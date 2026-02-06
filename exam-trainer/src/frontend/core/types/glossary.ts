// src/core/types/glossary.ts

export type TermCategory = string
export type ExamRelevance = 'high' | 'medium' | 'low'

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  details?: string
  category: TermCategory
  related: string[]
  examRelevance: ExamRelevance
}

export interface Comparison {
  id: string
  items: [string, string]
  differences: string[]
  commonConfusion: string
}

export interface ScenarioStep {
  component: string
  description: string
  highlight: string[]
}

export interface RequestScenario {
  id: string
  title: string
  description: string
  steps: ScenarioStep[]
}

export interface CourseGlossary {
  terms: GlossaryTerm[]
  comparisons: Comparison[]
  scenarios: RequestScenario[]
  categories: { id: string; label: string }[]
}

/** @deprecated Use CourseGlossary */
export type K8sGlossary = CourseGlossary
