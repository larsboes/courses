// src/core/components/quiz/FreeTextQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'

interface FreeTextQuestionProps {
  question: FreeTextQuestionType
  onSubmit: (answer: string) => void
  showingResult: boolean
}

export function FreeTextQuestion({
  question,
  onSubmit,
  showingResult,
}: FreeTextQuestionProps) {
  const [answer, setAnswer] = useState('')
  const [selfAssessment, setSelfAssessment] = useState<'correct' | 'partial' | 'incorrect' | null>(null)

  const handleSubmit = () => {
    if (!showingResult && answer.trim()) {
      onSubmit(answer)
    }
  }

  const handleSelfAssess = (assessment: 'correct' | 'partial' | 'incorrect') => {
    setSelfAssessment(assessment)
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {/* Text Input */}
      <textarea
        aria-label={question.question}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={question.placeholder || 'Deine Antwort...'}
        disabled={showingResult}
        className={`
          w-full h-48 p-4 rounded-lg border-2 bg-slate-900 text-slate-100
          font-mono text-sm resize-none
          ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
          focus:outline-none
        `}
      />

      {/* Submit Button */}
      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full"
        >
          Antwort pruefen
        </Button>
      )}

      {/* Model Answer & Self-Assessment */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Model Answer */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Musterantwort:</div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {question.modelAnswer}
            </pre>
          </Card>

          {/* Key Points Checklist */}
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

          {/* Self-Assessment */}
          {!selfAssessment && (
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Wie hast du abgeschnitten?</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSelfAssess('correct')}
                  className="flex-1 bg-green-900/30 border-green-700 hover:bg-green-900/50"
                >
                  Richtig
                </Button>
                <Button
                  onClick={() => handleSelfAssess('partial')}
                  className="flex-1 bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
                >
                  Teilweise
                </Button>
                <Button
                  onClick={() => handleSelfAssess('incorrect')}
                  className="flex-1 bg-red-900/30 border-red-700 hover:bg-red-900/50"
                >
                  Falsch
                </Button>
              </div>
            </div>
          )}

          {selfAssessment && (
            <Card
              className={`p-4 ${
                selfAssessment === 'correct'
                  ? 'bg-green-900/20 border-green-700'
                  : selfAssessment === 'partial'
                  ? 'bg-amber-900/20 border-amber-700'
                  : 'bg-red-900/20 border-red-700'
              }`}
            >
              <div className="font-medium">
                {selfAssessment === 'correct' && 'Gut gemacht!'}
                {selfAssessment === 'partial' && 'Weiter üben!'}
                {selfAssessment === 'incorrect' && 'Wiederhole das Thema.'}
              </div>
              <div className="text-sm text-slate-300 mt-1">{question.explanation}</div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
