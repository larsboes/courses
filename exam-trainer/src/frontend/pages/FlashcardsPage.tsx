// src/pages/FlashcardsPage.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFlashcards, useStudyProgress } from '@/core/hooks'
import { FlashcardCard } from '@/core/components/flashcards'
import type { StudyMode } from '@/core/hooks'
const modes: { id: StudyMode; label: string; description: string }[] = [
  { id: 'due', label: 'Fällig heute', description: 'Karten zur Wiederholung' },
  { id: 'weak', label: 'Schwache Karten', description: 'Karten mit < 70% Erfolg' },
  { id: 'all', label: 'Alle Karten', description: 'Alle verfügbaren Karten' },
]

export function FlashcardsPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [mode, setMode] = useState<StudyMode>('due')
  const [category, setCategory] = useState<string | undefined>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 })
  const [isComplete, setIsComplete] = useState(false)
  const [useTimed, setUseTimed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const timerRef = useRef<number | null>(null)

  const { cards, categories, reviewCard } = useFlashcards({ courseId: courseId ?? '', mode, category })
  const { recordSession } = useStudyProgress()

  const currentCard = cards[currentIndex]

  // Timer effect
  useEffect(() => {
    if (!useTimed || isComplete || !currentCard) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    setTimeLeft(10)
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(false)
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [currentIndex, useTimed, isComplete, currentCard])

  const handleAnswer = (knew: boolean) => {
    if (!currentCard) return

    reviewCard(currentCard.id, knew)
    const newStats = {
      reviewed: sessionStats.reviewed + 1,
      correct: sessionStats.correct + (knew ? 1 : 0),
    }
    setSessionStats(newStats)

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      recordSession(newStats.reviewed, newStats.correct)
      setIsComplete(true)
    }
  }

  const resetSession = () => {
    setCurrentIndex(0)
    setSessionStats({ reviewed: 0, correct: 0 })
    setIsComplete(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={courseId ? `/course/${courseId}` : '/'}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Zurück
              </Link>
              <h1 className="text-xl font-bold">Flashcards</h1>
            </div>
            {!isComplete && cards.length > 0 && (
              <div className="text-slate-400">
                {currentIndex + 1} / {cards.length}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Mode selector (only when not in session) */}
        {currentIndex === 0 && !isComplete && (
          <div className="mb-8 space-y-4">
            {/* Mode selection */}
            <div className="flex gap-2 flex-wrap">
              {modes.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    mode === m.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCategory(undefined)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  !category
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Alle Kategorien
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    category === c.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Timer toggle */}
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={useTimed}
                onChange={e => setUseTimed(e.target.checked)}
                className="rounded"
              />
              Timer (10s pro Karte)
            </label>
          </div>
        )}

        {/* Timer display */}
        {useTimed && !isComplete && currentCard && (
          <div className="mb-4 flex justify-center">
            <div className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-slate-400'}`}>
              {timeLeft}s
            </div>
          </div>
        )}

        {/* Progress bar */}
        {!isComplete && cards.length > 0 && (
          <div className="mb-8 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        )}

        {/* Card display */}
        <AnimatePresence mode="wait">
          {!isComplete && currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <FlashcardCard
                card={currentCard}
                onKnow={() => handleAnswer(true)}
                onDontKnow={() => handleAnswer(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No cards message */}
        {!isComplete && cards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              {mode === 'due'
                ? 'Keine Karten fällig heute!'
                : mode === 'weak'
                ? 'Keine schwachen Karten!'
                : 'Keine Karten verfügbar.'}
            </div>
            <button
              onClick={() => setMode('all')}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Alle Karten lernen
            </button>
          </div>
        )}

        {/* Completion screen */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Session abgeschlossen!</h2>
            <div className="text-slate-400 mb-8">
              <p>Karten durchgearbeitet: {sessionStats.reviewed}</p>
              <p>Richtig: {sessionStats.correct} ({sessionStats.reviewed > 0 ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0}%)</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetSession}
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Nochmal
              </button>
              <Link
                to={courseId ? `/course/${courseId}` : '/'}
                className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Zurück zum Kurs
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
