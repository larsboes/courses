// src/core/components/quiz/CodeWriteQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { HintButton } from './HintButton'
import type { CodeWriteQuestion as CodeWriteQuestionType } from '@/core/types/content'

interface CodeWriteQuestionProps {
  question: CodeWriteQuestionType
  onSubmit: (answer: string) => void
  showingResult: boolean
}

const languageLabels: Record<string, string> = {
  css: 'CSS',
  javascript: 'JavaScript',
  json: 'JSON',
  html: 'HTML',
  http: 'HTTP',
}

const languageColors: Record<string, string> = {
  css: 'text-pink-400',
  javascript: 'text-yellow-400',
  json: 'text-green-400',
  html: 'text-orange-400',
  http: 'text-blue-400',
}

export function CodeWriteQuestion({
  question,
  onSubmit,
  showingResult,
}: CodeWriteQuestionProps) {
  const [code, setCode] = useState('')
  const [selfAssessment, setSelfAssessment] = useState<'correct' | 'partial' | 'incorrect' | null>(null)

  const handleSubmit = () => {
    if (!showingResult && code.trim()) {
      onSubmit(code)
    }
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {/* Language Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm ${languageColors[question.language]}`}>
        <span className="w-2 h-2 rounded-full bg-current" />
        {languageLabels[question.language]}
      </div>

      {/* Code Input */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={question.placeholder || `// ${languageLabels[question.language]} hier eingeben...`}
          disabled={showingResult}
          spellCheck={false}
          aria-label={question.question}
          className={`
            w-full h-64 p-4 rounded-lg border-2 bg-slate-950 text-slate-100
            font-mono text-sm resize-none leading-relaxed
            ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
            focus:outline-none
          `}
        />
        <div className="absolute top-2 right-2 text-xs text-slate-500">
          {code.split('\n').length} Zeilen
        </div>
      </div>

      {/* Hint Button and Submit Button */}
      {!showingResult && (
        <div className="space-y-4">
          <HintButton
            question={question.question}
            modelAnswer={question.modelAnswer}
          />
          <Button
            onClick={handleSubmit}
            disabled={!code.trim()}
            className="w-full"
          >
            Code pruefen
          </Button>
        </div>
      )}

      {/* Model Answer & Self-Assessment - same pattern as FreeTextQuestion */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-4 bg-slate-950 border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-400">Musterantwort:</span>
              <span className={`text-xs ${languageColors[question.language]}`}>
                {languageLabels[question.language]}
              </span>
            </div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto">
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

          {!selfAssessment && (
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Wie hast du abgeschnitten?</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setSelfAssessment('correct')}
                  className="flex-1 bg-green-900/30 border-green-700 hover:bg-green-900/50"
                >
                  Richtig
                </Button>
                <Button
                  onClick={() => setSelfAssessment('partial')}
                  className="flex-1 bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
                >
                  Teilweise
                </Button>
                <Button
                  onClick={() => setSelfAssessment('incorrect')}
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
