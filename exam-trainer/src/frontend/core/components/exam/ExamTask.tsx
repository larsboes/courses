// src/core/components/exam/ExamTask.tsx
import { useState } from 'react'
import { Button, Card } from '@/core/components/ui'
import { QuizQuestion } from '@/core/components/quiz'
import type { ExamTask as ExamTaskType } from '@/core/types/content'

interface ExamTaskProps {
  task: ExamTaskType
  taskNumber: number
  onComplete: (scores: number[]) => void
}

export function ExamTask({ task, taskNumber, onComplete }: ExamTaskProps) {
  const [currentPart, setCurrentPart] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [showingResult, setShowingResult] = useState(false)

  const handleSubmit = (_answer: string | string[]) => {
    setShowingResult(true)
  }

  const handleNext = (score: number) => {
    const newScores = [...scores, score]
    setScores(newScores)

    if (currentPart < task.parts.length - 1) {
      setCurrentPart(currentPart + 1)
      setShowingResult(false)
    } else {
      onComplete(newScores)
    }
  }

  const part = task.parts[currentPart]
  const partLetter = String.fromCharCode(97 + currentPart) // a, b, c, d
  const isLastPart = currentPart === task.parts.length - 1

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Aufgabe {taskNumber}: {task.title}
        </h2>
        <span className="text-lg text-slate-400">({task.points} Punkte)</span>
      </div>

      {/* Context */}
      {task.context && (
        <Card className="p-4 bg-slate-800/50 border-slate-600">
          {task.context}
        </Card>
      )}

      {/* Progress */}
      <div className="flex gap-2">
        {task.parts.map((_, i) => (
          <div
            key={i}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${i < currentPart ? 'bg-green-600' : i === currentPart ? 'bg-blue-600' : 'bg-slate-700'}
            `}
          >
            {String.fromCharCode(97 + i)}
          </div>
        ))}
      </div>

      {/* Current Part */}
      <Card className="p-6">
        <div className="text-sm text-slate-400 mb-4">
          Teil {partLetter}) - ca. {Math.round(task.points / task.parts.length)} Punkte
        </div>
        <QuizQuestion
          question={part}
          onSubmit={handleSubmit}
          showingResult={showingResult}
          isCorrect={null}
        />

        {/* Next button after showing result */}
        {showingResult && (
          <div className="mt-6">
            <Button onClick={() => handleNext(1)} className="w-full">
              {isLastPart ? 'Aufgabe abschliessen' : 'Weiter zu Teil ' + String.fromCharCode(98 + currentPart) + ')'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
