// src/frontend/core/components/quiz/HintButton.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { getHint, type HintResponse } from '@/core/services/api'

interface HintButtonProps {
  question: string
  modelAnswer: string
  disabled?: boolean
}

export function HintButton({ question, modelAnswer, disabled }: HintButtonProps) {
  const [hints, setHints] = useState<string[]>([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetHint = async () => {
    if (currentLevel >= 3) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await getHint({
        question,
        model_answer: modelAnswer,
        hint_level: currentLevel + 1,
        previous_hints: hints,
      })
      setHints([...hints, result.hint])
      setCurrentLevel(result.hint_level)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to get hint')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleGetHint}
        disabled={disabled || currentLevel >= 3 || isLoading}
        className="bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
      >
        {isLoading
          ? 'Lade Hint...'
          : currentLevel >= 3
          ? 'Keine Hints mehr'
          : `Hint ${currentLevel + 1}/3 anfordern`}
      </Button>

      {error && (
        <div className="text-sm text-red-400">{error}</div>
      )}

      <AnimatePresence>
        {hints.map((hint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-3 bg-amber-900/20 border-amber-700/50">
              <div className="text-xs text-amber-400 mb-1">Hint {i + 1}</div>
              <div className="text-sm text-slate-300">{hint}</div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
