// src/core/components/quiz/FreeTextQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { evaluateAnswer, type EvaluateResponse } from '@/core/services/api'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'

interface FreeTextQuestionProps {
  question: FreeTextQuestionType
  topicId: string
  onSubmit: (answer: string) => void
  showingResult: boolean
}

export function FreeTextQuestion({
  question,
  topicId,
  onSubmit,
  showingResult,
}: FreeTextQuestionProps) {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [evaluation, setEvaluation] = useState<EvaluateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!answer.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await evaluateAnswer({
        question: question.question,
        user_answer: answer,
        model_answer: question.modelAnswer,
        key_points: question.keyPoints,
        topic_id: topicId,
      })
      setEvaluation(result)
      onSubmit(answer)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Evaluation failed')
      // Fallback to showing model answer
      onSubmit(answer)
    } finally {
      setIsLoading(false)
    }
  }

  const scoreColor = evaluation
    ? evaluation.score >= 0.8
      ? 'text-green-400'
      : evaluation.score >= 0.5
      ? 'text-amber-400'
      : 'text-red-400'
    : ''

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">{question.question}</div>

      <textarea
        aria-label={question.question}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={question.placeholder || 'Deine Antwort...'}
        disabled={showingResult || isLoading}
        className={`
          w-full h-48 p-4 rounded-lg border-2 bg-slate-900 text-slate-100
          font-mono text-sm resize-none
          ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
          focus:outline-none
        `}
      />

      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Wird ausgewertet...' : 'Antwort pruefen'}
        </Button>
      )}

      {error && (
        <Card className="p-4 bg-red-900/20 border-red-700">
          <div className="text-sm text-red-300">{error}</div>
        </Card>
      )}

      {showingResult && evaluation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Score */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-medium">Bewertung:</span>
              <span className={`text-2xl font-bold ${scoreColor}`}>
                {Math.round(evaluation.score * 100)}%
              </span>
            </div>
          </Card>

          {/* Feedback */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Feedback:</div>
            <p className="text-slate-300">{evaluation.feedback}</p>
          </Card>

          {/* Missing Concepts */}
          {evaluation.missing_concepts.length > 0 && (
            <Card className="p-4 bg-amber-900/20 border-amber-700">
              <div className="font-medium mb-2">Fehlende Konzepte:</div>
              <ul className="space-y-1">
                {evaluation.missing_concepts.map((concept, i) => (
                  <li key={i} className="text-sm text-slate-300">• {concept}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* Suggestion */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-green-400">Tipp:</div>
            <p className="text-sm text-slate-300">{evaluation.suggestion}</p>
          </Card>

          {/* Model Answer (collapsible) */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300">
              Musterantwort anzeigen
            </summary>
            <Card className="mt-2 p-4 bg-slate-800/50 border-slate-600">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {question.modelAnswer}
              </pre>
            </Card>
          </details>
        </motion.div>
      )}

      {/* Fallback when no AI evaluation */}
      {showingResult && !evaluation && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Musterantwort:</div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {question.modelAnswer}
            </pre>
          </Card>
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-3">Wichtige Punkte:</div>
            <ul className="space-y-2">
              {question.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
