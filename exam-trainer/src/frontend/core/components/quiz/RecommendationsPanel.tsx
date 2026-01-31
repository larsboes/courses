// src/frontend/core/components/quiz/RecommendationsPanel.tsx
import { motion } from 'framer-motion'
import { Card } from '@/core/components/ui'

export interface RecommendationsPanelProps {
  weakAreas: string[]
  recommendedTopics: string[]
  message: string
}

// Animation variants for staggered appearance
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

export function RecommendationsPanel({
  weakAreas,
  recommendedTopics,
  message,
}: RecommendationsPanelProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Main Message */}
      <motion.div variants={itemVariants}>
        <Card className="p-4 bg-emerald-900/20 border-emerald-700/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <span className="font-semibold text-emerald-400">Empfehlung</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{message}</p>
        </Card>
      </motion.div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-amber-900/20 border-amber-700/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <span className="font-semibold text-amber-400">Schwachstellen</span>
            </div>
            <ul className="space-y-2">
              {weakAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-amber-400 mt-0.5">-</span>
                  {area}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Recommended Topics */}
      {recommendedTopics.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-blue-900/20 border-blue-700/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📚</span>
              <span className="font-semibold text-blue-400">Empfohlene Themen</span>
            </div>
            <ul className="space-y-2">
              {recommendedTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 mt-0.5">-</span>
                  {topic}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
