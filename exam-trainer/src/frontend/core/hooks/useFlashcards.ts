// src/core/hooks/useFlashcards.ts
import { useMemo, useCallback } from 'react'
import { getGlossaryForCourse } from '@/core/data/glossary-registry'
import { useStudyProgress } from './useStudyProgress'
import type { FlashcardData } from '@/core/components/flashcards'

export type StudyMode = 'due' | 'weak' | 'all' | 'category'

export interface UseFlashcardsOptions {
  courseId: string
  mode?: StudyMode
  category?: string
  limit?: number
}

export function useFlashcards(options: UseFlashcardsOptions) {
  const { courseId, mode = 'all', category, limit } = options
  const { getCardsDue, getWeakCards, getCardProgress, recordCardReview } = useStudyProgress()

  const glossary = useMemo(() => getGlossaryForCourse(courseId), [courseId])

  // Generate all possible cards from glossary
  const allCards = useMemo((): FlashcardData[] => {
    const cards: FlashcardData[] = []

    // Term → Definition cards
    for (const term of glossary.terms) {
      cards.push({
        id: `term-def-${term.id}`,
        type: 'term-to-definition',
        front: `Was ist ein ${term.term}?`,
        back: term.definition,
        category: term.category,
      })

      // Definition → Term cards
      cards.push({
        id: `def-term-${term.id}`,
        type: 'definition-to-term',
        front: term.definition,
        back: term.term,
        category: term.category,
      })
    }

    // Comparison cards
    for (const comparison of glossary.comparisons) {
      const [term1, term2] = comparison.items.map(id =>
        glossary.terms.find(t => t.id === id)
      )
      if (term1 && term2) {
        cards.push({
          id: `comparison-${comparison.id}`,
          type: 'comparison',
          front: `Was ist der Unterschied zwischen ${term1.term} und ${term2.term}?`,
          back: comparison.differences.join('\n\n'),
          category: term1.category,
        })
      }
    }

    // Scenario cards
    for (const scenario of glossary.scenarios) {
      cards.push({
        id: `scenario-${scenario.id}`,
        type: 'scenario',
        front: scenario.description,
        back: scenario.steps.map((s, i) => `${i + 1}. ${s.description}`).join('\n'),
        category: 'scenario',
      })
    }

    return cards
  }, [glossary])

  // Filter cards based on mode
  const filteredCards = useMemo((): FlashcardData[] => {
    let cards = allCards

    // Filter by category if specified
    if (category) {
      cards = cards.filter(c => c.category === category)
    }

    // Filter by mode
    switch (mode) {
      case 'due': {
        const dueIds = new Set(getCardsDue())
        // Include cards that are due OR haven't been seen yet
        cards = cards.filter(c => dueIds.has(c.id) || !getCardProgress(c.id))
        break
      }
      case 'weak': {
        const weakIds = new Set(getWeakCards())
        cards = cards.filter(c => weakIds.has(c.id))
        break
      }
      case 'all':
      default:
        // No additional filtering
        break
    }

    // Apply limit
    if (limit && limit > 0) {
      cards = cards.slice(0, limit)
    }

    return cards
  }, [allCards, mode, category, limit, getCardsDue, getWeakCards, getCardProgress])

  // Shuffle cards
  const shuffledCards = useMemo(() => {
    const shuffled = [...filteredCards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [filteredCards])

  const reviewCard = useCallback(
    (cardId: string, knew: boolean) => {
      recordCardReview(cardId, knew)
    },
    [recordCardReview]
  )

  return {
    cards: shuffledCards,
    totalCards: allCards.length,
    categories: glossary.categories,
    reviewCard,
    getCardProgress,
  }
}
