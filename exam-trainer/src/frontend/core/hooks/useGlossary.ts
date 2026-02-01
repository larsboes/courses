// src/core/hooks/useGlossary.ts
import { useMemo, useState, useCallback } from 'react'
import {
  k8sGlossary,
  getTermById,
  getTermsByCategory,
  getComparisonsForTerm,
  getComparisonById,
  getScenarioById,
} from '@/core/data/k8s-glossary'
import type { GlossaryTerm, Comparison, RequestScenario, TermCategory } from '@/core/types/glossary'

export interface UseGlossaryOptions {
  category?: TermCategory
}

export interface GlossaryState {
  terms: GlossaryTerm[]
  filteredTerms: GlossaryTerm[]
  comparisons: Comparison[]
  scenarios: RequestScenario[]
  searchQuery: string
  selectedCategory: TermCategory | null
}

export function useGlossary(options: UseGlossaryOptions = {}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | null>(
    options.category ?? null
  )

  const terms = useMemo(() => {
    if (selectedCategory) {
      return getTermsByCategory(selectedCategory)
    }
    return k8sGlossary.terms
  }, [selectedCategory])

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

  const getTerm = useCallback((id: string) => getTermById(id), [])

  const getComparisons = useCallback(
    (termId: string) => getComparisonsForTerm(termId),
    []
  )

  const getComparison = useCallback(
    (id: string) => getComparisonById(id),
    []
  )

  const getScenario = useCallback(
    (id: string) => getScenarioById(id),
    []
  )

  return {
    // Data
    terms,
    filteredTerms,
    comparisons: k8sGlossary.comparisons,
    scenarios: k8sGlossary.scenarios,

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
