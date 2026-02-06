// src/core/hooks/useGlossary.ts
import { useMemo, useState, useCallback } from 'react'
import {
  getGlossaryForCourse,
  getTermById,
  getTermsByCategory,
  getComparisonsForTerm,
  getComparisonById,
  getScenarioById,
} from '@/core/data/glossary-registry'
import type { GlossaryTerm, Comparison, RequestScenario } from '@/core/types/glossary'

export interface UseGlossaryOptions {
  courseId: string
  category?: string
}

export interface GlossaryState {
  terms: GlossaryTerm[]
  filteredTerms: GlossaryTerm[]
  comparisons: Comparison[]
  scenarios: RequestScenario[]
  searchQuery: string
  selectedCategory: string | null
}

export function useGlossary(options: UseGlossaryOptions) {
  const { courseId } = options
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    options.category ?? null
  )

  const glossary = useMemo(() => getGlossaryForCourse(courseId), [courseId])

  const terms = useMemo(() => {
    if (selectedCategory) {
      return getTermsByCategory(courseId, selectedCategory)
    }
    return glossary.terms
  }, [courseId, glossary, selectedCategory])

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) {
      return terms
    }
    const query = searchQuery.toLowerCase()
    return terms.filter(
      t =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query)
    )
  }, [terms, searchQuery])

  const getTerm = useCallback((id: string) => getTermById(courseId, id), [courseId])

  const getComparisons = useCallback(
    (termId: string) => getComparisonsForTerm(courseId, termId),
    [courseId]
  )

  const getComparison = useCallback(
    (id: string) => getComparisonById(courseId, id),
    [courseId]
  )

  const getScenario = useCallback(
    (id: string) => getScenarioById(courseId, id),
    [courseId]
  )

  return {
    // Data
    terms,
    filteredTerms,
    comparisons: glossary.comparisons,
    scenarios: glossary.scenarios,
    categories: glossary.categories,

    // State
    searchQuery,
    selectedCategory,

    // Actions
    setSearchQuery,
    setSelectedCategory,

    // Getters
    getTerm,
    getComparisons,
    getComparison,
    getScenario,
  }
}
