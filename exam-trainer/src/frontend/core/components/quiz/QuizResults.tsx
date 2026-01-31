// src/core/components/quiz/QuizResults.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { getRecommendations, type RecommendResponse } from '@/core/services/api'
import { RecommendationsPanel } from './RecommendationsPanel'

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
  const [recommendations, setRecommendations] = useState<RecommendResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const percentage = totalQuestions > 0
    ? Math.round((score / totalQuestions) * 100)
    : 0
  const isPassing = percentage >= 70

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await getRecommendations({
          recent_results: [{
            topic_id: 'quiz',
            score: totalQuestions > 0 ? score / totalQuestions : 0,
            question_type: 'quiz',
          }],
          completed_topics: [],
        })
        setRecommendations(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Empfehlungen')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [score, totalQuestions])

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

      {/* Recommendations Section */}
      <div className="max-w-md mx-auto mt-6">
        {isLoading && (
          <Card className="p-4">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full"
              />
              <span>Empfehlungen werden geladen...</span>
            </div>
          </Card>
        )}

        {error && (
          <Card className="p-4 bg-red-900/20 border-red-700/50">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {recommendations && !isLoading && !error && (
          <RecommendationsPanel
            weakAreas={recommendations.weak_areas}
            recommendedTopics={recommendations.recommended_topics}
            message={recommendations.message}
          />
        )}
      </div>
    </motion.div>
  )
}
