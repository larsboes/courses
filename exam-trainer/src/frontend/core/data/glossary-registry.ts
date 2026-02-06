// src/core/data/glossary-registry.ts
import type { CourseGlossary, GlossaryTerm, Comparison, RequestScenario } from '@/core/types/glossary'
import { k8sGlossary } from './k8s-glossary'
import { ipdgGlossary } from './ipdg-glossary'

const registry: Record<string, CourseGlossary> = {
  'web-technologies': k8sGlossary,
  'ipdg': ipdgGlossary,
}

const emptyGlossary: CourseGlossary = {
  terms: [],
  comparisons: [],
  scenarios: [],
  categories: [],
}

export function getGlossaryForCourse(courseId: string): CourseGlossary {
  return registry[courseId] ?? emptyGlossary
}

export function getTermById(courseId: string, id: string): GlossaryTerm | undefined {
  return getGlossaryForCourse(courseId).terms.find(t => t.id === id)
}

export function getTermsByCategory(courseId: string, category: string): GlossaryTerm[] {
  return getGlossaryForCourse(courseId).terms.filter(t => t.category === category)
}

export function getComparisonsForTerm(courseId: string, termId: string): Comparison[] {
  return getGlossaryForCourse(courseId).comparisons.filter(c => c.items.includes(termId))
}

export function getComparisonById(courseId: string, id: string): Comparison | undefined {
  return getGlossaryForCourse(courseId).comparisons.find(c => c.id === id)
}

export function getScenarioById(courseId: string, id: string): RequestScenario | undefined {
  return getGlossaryForCourse(courseId).scenarios.find(s => s.id === id)
}
