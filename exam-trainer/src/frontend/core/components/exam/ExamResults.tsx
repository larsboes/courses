// src/core/components/exam/ExamResults.tsx
import { Link } from 'react-router-dom'
import { Button, Card } from '@/core/components/ui'
import { motion } from 'framer-motion'

export interface TaskResult {
  taskTitle: string
  taskPoints: number
  partScores: number[]
}

interface ExamResultsProps {
  simulationTitle: string
  totalPoints: number
  taskResults: TaskResult[]
  timeTakenSeconds: number
  courseId: string
  onRetry: () => void
}

function calculateGrade(percentage: number): string {
  if (percentage >= 95) return '1.0'
  if (percentage >= 90) return '1.3'
  if (percentage >= 85) return '1.7'
  if (percentage >= 80) return '2.0'
  if (percentage >= 75) return '2.3'
  if (percentage >= 70) return '2.7'
  if (percentage >= 65) return '3.0'
  if (percentage >= 60) return '3.3'
  if (percentage >= 55) return '3.7'
  if (percentage >= 50) return '4.0'
  return '5.0'
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m} Min ${s} Sek`
}

function getScoreColor(percentage: number): string {
  if (percentage >= 80) return 'text-green-400'
  if (percentage >= 50) return 'text-amber-400'
  return 'text-red-400'
}

function getBarColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500'
  if (percentage >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export function ExamResults({
  simulationTitle,
  totalPoints,
  taskResults,
  timeTakenSeconds,
  courseId,
  onRetry,
}: ExamResultsProps) {
  const earnedPoints = taskResults.reduce(
    (sum, r) => sum + r.partScores.reduce((s, p) => s + p, 0),
    0
  )
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
  const grade = calculateGrade(percentage)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Klausur abgeschlossen!</h1>
          <p className="text-slate-400 mb-6">{simulationTitle}</p>

          {/* Score Ring */}
          <div className="flex justify-center mb-6">
            <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${
              percentage >= 80 ? 'border-green-500' : percentage >= 50 ? 'border-amber-500' : 'border-red-500'
            }`}>
              <span className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                {percentage}%
              </span>
              <span className="text-xs text-slate-400">
                {earnedPoints}/{totalPoints} P.
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-6 text-sm text-slate-400 mb-6">
            <div>
              <span className="text-slate-500">Note: </span>
              <span className="font-bold text-slate-200">{grade}</span>
            </div>
            <div>
              <span className="text-slate-500">Zeit: </span>
              <span className="font-bold text-slate-200">{formatDuration(timeTakenSeconds)}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Task Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ergebnisse pro Aufgabe</h2>
          <div className="space-y-4">
            {taskResults.map((result, i) => {
              const earned = result.partScores.reduce((s, p) => s + p, 0)
              const pct = result.taskPoints > 0 ? Math.round((earned / result.taskPoints) * 100) : 0

              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      Aufgabe {i + 1}: {result.taskTitle}
                    </span>
                    <span className={`font-bold ${getScoreColor(pct)}`}>
                      {earned}/{result.taskPoints} P.
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getBarColor(pct)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500">
                    {result.partScores.map((score, j) => (
                      <span key={j}>
                        Teil {String.fromCharCode(97 + j)}: {score}P
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex gap-3 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to={`/course/${courseId}`}>
          <Button variant="secondary">Zurück zum Kurs</Button>
        </Link>
        <Button onClick={onRetry}>
          Andere Klausur üben
        </Button>
      </motion.div>
    </div>
  )
}
