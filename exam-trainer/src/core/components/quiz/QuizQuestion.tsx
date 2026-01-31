// src/core/components/quiz/QuizQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { SystemBuilderExercise } from './SystemBuilderExercise'
import { FreeTextQuestion } from './FreeTextQuestion'
import { CodeWriteQuestion } from './CodeWriteQuestion'
import type { QuizQuestion as QuizQuestionType, SystemBuilderQuestion, StandardQuizQuestion, FreeTextQuestion as FreeTextQuestionType, CodeWriteQuestion as CodeWriteQuestionType } from '@/core/types/content'

interface QuizQuestionProps {
  question: QuizQuestionType
  onSubmit: (answer: string | string[]) => void
  showingResult: boolean
  isCorrect: boolean | null
  selectedAnswer?: string | string[]
}

// Separate component for system-builder to avoid hooks rules violation
function SystemBuilderQuizQuestion({
  question,
  onSubmit,
  showingResult,
  isCorrect,
}: {
  question: SystemBuilderQuestion
  onSubmit: (answer: string | string[]) => void
  showingResult: boolean
  isCorrect: boolean | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">{question.question}</div>
      <SystemBuilderExercise
        manifest={question.manifest}
        expectedNodes={question.expectedNodes}
        expectedEdges={question.expectedEdges}
        availableComponents={question.availableComponents}
        onComplete={(correct) => onSubmit(correct ? 'correct' : 'incorrect')}
      />
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className={`p-4 ${
              isCorrect
                ? 'bg-green-900/20 border-green-700'
                : 'bg-amber-900/20 border-amber-700'
            }`}
          >
            <div className="font-medium mb-2">
              {isCorrect ? 'Richtig!' : 'Hinweis:'}
            </div>
            <div className="text-sm text-slate-300">{question.explanation}</div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

// Separate component for standard questions
function StandardQuizQuestionComponent({
  question,
  onSubmit,
  showingResult,
  isCorrect,
  selectedAnswer,
}: {
  question: StandardQuizQuestion
  onSubmit: (answer: string | string[]) => void
  showingResult: boolean
  isCorrect: boolean | null
  selectedAnswer?: string | string[]
}) {
  const [selected, setSelected] = useState<string | string[]>(
    selectedAnswer ?? (question.type === 'multi-select' ? [] : '')
  )

  const handleOptionClick = (option: string) => {
    if (showingResult) return

    if (question.type === 'multi-select') {
      setSelected((prev) => {
        const arr = Array.isArray(prev) ? prev : []
        return arr.includes(option)
          ? arr.filter((o) => o !== option)
          : [...arr, option]
      })
    } else {
      setSelected(option)
    }
  }

  const handleSubmit = () => {
    if (!showingResult && selected) {
      onSubmit(selected)
    }
  }

  const isOptionSelected = (option: string) => {
    if (Array.isArray(selected)) {
      return selected.includes(option)
    }
    return selected === option
  }

  const isOptionCorrect = (option: string) => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(option)
    }
    return question.correctAnswer === option
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {question.type === 'multi-select' && (
        <p className="text-sm text-slate-400">Mehrere Antworten moglich</p>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = isOptionSelected(option)
          const correct = isOptionCorrect(option)

          let bgColor = 'bg-slate-800 hover:bg-slate-750 border-slate-700'
          if (showingResult) {
            if (correct) {
              bgColor = 'bg-green-900/30 border-green-500'
            } else if (isSelected && !correct) {
              bgColor = 'bg-red-900/30 border-red-500'
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-900/30 border-blue-500'
          }

          return (
            <motion.div
              key={option}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${bgColor}
                ${showingResult ? 'cursor-default' : ''}
              `}
              onClick={() => handleOptionClick(option)}
              whileHover={!showingResult ? { scale: 1.01 } : {}}
              whileTap={!showingResult ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-500'}
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Result */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className={`p-4 ${
              isCorrect
                ? 'bg-green-900/20 border-green-700'
                : 'bg-red-900/20 border-red-700'
            }`}
          >
            <div className="font-medium mb-2">
              {isCorrect ? 'Richtig!' : 'Leider falsch'}
            </div>
            <div className="text-sm text-slate-300">{question.explanation}</div>
          </Card>
        </motion.div>
      )}

      {/* Submit Button */}
      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={
            !selected || (Array.isArray(selected) && selected.length === 0)
          }
          className="w-full"
        >
          Antwort pruefen
        </Button>
      )}
    </div>
  )
}

export function QuizQuestion({
  question,
  onSubmit,
  showingResult,
  isCorrect,
  selectedAnswer,
}: QuizQuestionProps) {
  if (question.type === 'system-builder') {
    return (
      <SystemBuilderQuizQuestion
        question={question as SystemBuilderQuestion}
        onSubmit={onSubmit}
        showingResult={showingResult}
        isCorrect={isCorrect}
      />
    )
  }

  if (question.type === 'code-write') {
    return (
      <CodeWriteQuestion
        question={question as CodeWriteQuestionType}
        onSubmit={(answer) => onSubmit(answer)}
        showingResult={showingResult}
      />
    )
  }

  if (question.type === 'free-text') {
    return (
      <FreeTextQuestion
        question={question as FreeTextQuestionType}
        onSubmit={(answer) => onSubmit(answer)}
        showingResult={showingResult}
      />
    )
  }

  return (
    <StandardQuizQuestionComponent
      question={question as StandardQuizQuestion}
      onSubmit={onSubmit}
      showingResult={showingResult}
      isCorrect={isCorrect}
      selectedAnswer={selectedAnswer}
    />
  )
}
