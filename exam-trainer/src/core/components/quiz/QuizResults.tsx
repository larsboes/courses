// src/core/components/quiz/QuizResults.tsx
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onBack: () => void
}

export function QuizResults({
  score,
  totalQuestions,
  onRestart,
  onBack,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPassing = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <Card className="p-8 max-w-md mx-auto">
        <div
          className={`text-6xl font-bold mb-4 ${
            isPassing ? 'text-green-400' : 'text-amber-400'
          }`}
        >
          {percentage}%
        </div>

        <div className="text-xl mb-2">
          {score} von {totalQuestions} richtig
        </div>

        <div className="text-slate-400 mb-6">
          {isPassing
            ? 'Super! Du hast das Thema gut verstanden.'
            : 'Noch etwas Übung nötig. Schau dir die Inhalte nochmal an.'}
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onBack}>
            Zurück zum Thema
          </Button>
          <Button onClick={onRestart}>Nochmal versuchen</Button>
        </div>
      </Card>
    </motion.div>
  )
}
