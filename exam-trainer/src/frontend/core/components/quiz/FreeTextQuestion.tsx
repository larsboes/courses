// src/core/components/quiz/FreeTextQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { evaluateAnswer, type EvaluateResponse } from '@/core/services/api'
import { HintButton } from './HintButton'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'

interface FreeTextQuestionProps {
  question: FreeTextQuestionType
  topicId: string
  onSubmit: (answer: string) => void
  showingResult: boolean
}

// Circular progress component
function ScoreRing({ score }: { score: number }) {
  const percentage = Math.round(score * 100)
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (score * circumference)

  const color = score >= 0.8 ? '#4ade80' : score >= 0.5 ? '#fbbf24' : '#f87171'
  const bgColor = score >= 0.8 ? 'rgba(74, 222, 128, 0.1)' : score >= 0.5 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(248, 113, 113, 0.1)'

  const emoji = score >= 0.8 ? '🎉' : score >= 0.6 ? '👍' : score >= 0.4 ? '💪' : '📚'
  const message = score >= 0.8 ? 'Ausgezeichnet!' : score >= 0.6 ? 'Gut gemacht!' : score >= 0.4 ? 'Guter Ansatz!' : 'Weiter üben!'

  return (
    <div className="flex flex-col items-center py-4" style={{ backgroundColor: bgColor, borderRadius: '12px' }}>
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="56"
            cy="56"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{percentage}%</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="text-lg font-medium text-slate-200">{message}</span>
      </div>
    </div>
  )
}

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
  const [checkedConcepts, setCheckedConcepts] = useState<Set<number>>(new Set())

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
      onSubmit(answer)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleConcept = (index: number) => {
    const newChecked = new Set(checkedConcepts)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedConcepts(newChecked)
  }

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
        <div className="space-y-4">
          <HintButton
            question={question.question}
            modelAnswer={question.modelAnswer}
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Wird ausgewertet...' : 'Antwort pruefen'}
          </Button>
        </div>
      )}

      {error && (
        <Card className="p-4 bg-red-900/20 border-red-700">
          <div className="text-sm text-red-300">{error}</div>
        </Card>
      )}

      {showingResult && evaluation && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Score Ring */}
          <motion.div variants={itemVariants}>
            <Card className="p-2 bg-slate-800/30 border-slate-700">
              <ScoreRing score={evaluation.score} />
            </Card>
          </motion.div>

          {/* Feedback */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-slate-800/50 border-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💬</span>
                <span className="font-semibold text-blue-400">Feedback</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{evaluation.feedback}</p>
            </Card>
          </motion.div>

          {/* Missing Concepts */}
          {evaluation.missing_concepts.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="p-4 bg-amber-900/20 border-amber-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚠️</span>
                  <span className="font-semibold text-amber-400">Fehlende Konzepte</span>
                  <span className="text-xs text-slate-500 ml-auto">Klicke zum Abhaken</span>
                </div>
                <ul className="space-y-2">
                  {evaluation.missing_concepts.map((concept, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 cursor-pointer group"
                      onClick={() => toggleConcept(i)}
                    >
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                        transition-colors duration-200
                        ${checkedConcepts.has(i)
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-500 group-hover:border-amber-400'}
                      `}>
                        {checkedConcepts.has(i) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm transition-all duration-200 ${
                        checkedConcepts.has(i)
                          ? 'text-slate-500 line-through'
                          : 'text-slate-300'
                      }`}>
                        {concept}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Suggestion */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-emerald-900/20 border-emerald-700/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <span className="font-semibold text-emerald-400">Tipp</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{evaluation.suggestion}</p>
            </Card>
          </motion.div>

          {/* Model Answer (collapsible) */}
          <motion.div variants={itemVariants}>
            <details className="group">
              <summary className="cursor-pointer flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors">
                <span className="text-lg">📖</span>
                <span>Musterantwort anzeigen</span>
                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-180 ml-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <Card className="mt-3 p-4 bg-slate-800/50 border-slate-600">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {question.modelAnswer}
                </pre>
              </Card>
            </details>
          </motion.div>
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
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📖</span>
              <span className="font-semibold text-blue-400">Musterantwort</span>
            </div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {question.modelAnswer}
            </pre>
          </Card>
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✅</span>
              <span className="font-semibold">Wichtige Punkte</span>
            </div>
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
