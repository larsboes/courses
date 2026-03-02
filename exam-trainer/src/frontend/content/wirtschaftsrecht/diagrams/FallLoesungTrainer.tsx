// src/content/wirtschaftsrecht/diagrams/FallLoesungTrainer.tsx
import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types (exported for reuse)
// ─────────────────────────────────────────────────

export interface FallStep {
  id: string
  title: string
  hint?: string
  modelAnswer: string
  keyPoints: string[]
}

export interface FallData {
  id: string
  title: string
  sachverhalt: ReactNode
  frage: string
  steps: FallStep[]
}

export type { FallData as FallDataType, FallStep as FallStepType }

interface FallLoesungTrainerProps {
  fall: FallData
  className?: string
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function FallLoesungTrainer({ fall, className = '' }: FallLoesungTrainerProps) {
  const stepper = useStepNavigator({ totalSteps: fall.steps.length })
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [revealedSteps, setRevealedSteps] = useState<Set<string>>(new Set())
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set())
  const [selfScores, setSelfScores] = useState<Record<string, Set<number>>>({})
  const [showSummary, setShowSummary] = useState(false)

  const currentStep = fall.steps[stepper.currentStep]
  const isRevealed = revealedSteps.has(currentStep.id)
  const isHintExpanded = expandedHints.has(currentStep.id)

  const handleAnswerChange = (value: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentStep.id]: value }))
  }

  const handleReveal = () => {
    setRevealedSteps((prev) => new Set(prev).add(currentStep.id))
  }

  const toggleHint = () => {
    setExpandedHints((prev) => {
      const next = new Set(prev)
      if (next.has(currentStep.id)) {
        next.delete(currentStep.id)
      } else {
        next.add(currentStep.id)
      }
      return next
    })
  }

  const toggleKeyPoint = (stepId: string, pointIndex: number) => {
    setSelfScores((prev) => {
      const current = prev[stepId] ?? new Set<number>()
      const next = new Set(current)
      if (next.has(pointIndex)) {
        next.delete(pointIndex)
      } else {
        next.add(pointIndex)
      }
      return { ...prev, [stepId]: next }
    })
  }

  const allRevealed = fall.steps.every((s) => revealedSteps.has(s.id))

  // Summary stats
  const totalKeyPoints = fall.steps.reduce((sum, s) => sum + s.keyPoints.length, 0)
  const checkedKeyPoints = Object.values(selfScores).reduce((sum, set) => sum + set.size, 0)

  if (showSummary) {
    const tokens = highlightColors.green
    return (
      <DiagramShell
        title={fall.title}
        subtitle="Zusammenfassung"
        className={className}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border} text-center`}>
            <p className={`text-lg font-semibold ${tokens.text} mb-2`}>Falllösung abgeschlossen</p>
            <p className="text-sm text-slate-400">
              {checkedKeyPoints} von {totalKeyPoints} Prüfungspunkten selbst als korrekt bewertet
            </p>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: totalKeyPoints > 0 ? `${(checkedKeyPoints / totalKeyPoints) * 100}%` : '0%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Per-step summary */}
          <div className="space-y-2">
            {fall.steps.map((step) => {
              const stepScore = selfScores[step.id]?.size ?? 0
              const stepTotal = step.keyPoints.length
              const pct = stepTotal > 0 ? Math.round((stepScore / stepTotal) * 100) : 0
              const stepColor = pct >= 80 ? 'green' : pct >= 50 ? 'amber' : 'red'
              const t = highlightColors[stepColor]

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border ${t.bg} ${t.border} flex items-center justify-between`}
                >
                  <span className="text-sm text-slate-300">{step.title}</span>
                  <span className={`text-sm font-mono ${t.text}`}>
                    {stepScore}/{stepTotal}
                  </span>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => {
              setShowSummary(false)
              setUserAnswers({})
              setRevealedSteps(new Set())
              setExpandedHints(new Set())
              setSelfScores({})
              stepper.goTo(0)
            }}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400 cursor-pointer hover:text-slate-200 transition-colors"
          >
            Nochmal lösen
          </button>
        </motion.div>
      </DiagramShell>
    )
  }

  return (
    <DiagramShell
      title={fall.title}
      subtitle={`Schritt ${stepper.currentStep + 1} von ${fall.steps.length}`}
      className={className}
      footer={
        allRevealed ? (
          <button
            onClick={() => setShowSummary(true)}
            className="px-4 py-2 rounded-lg bg-green-900/50 border border-green-700 text-green-300 text-sm cursor-pointer hover:bg-green-900/70 transition-colors"
          >
            Zusammenfassung anzeigen
          </button>
        ) : (
          `${revealedSteps.size}/${fall.steps.length} Schritte aufgedeckt`
        )
      }
    >
      {/* Sachverhalt */}
      <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-700">
        <p className="text-xs text-amber-400 mb-2 uppercase tracking-wide font-medium">Sachverhalt</p>
        <div className="text-sm text-amber-200 leading-relaxed">{fall.sachverhalt}</div>
      </div>

      {/* Frage */}
      <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-700">
        <p className="text-xs text-blue-400 mb-1 uppercase tracking-wide">Frage</p>
        <p className="text-sm text-blue-300 font-medium">{fall.frage}</p>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {/* Step title */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-200">{currentStep.title}</h4>
            {revealedSteps.has(currentStep.id) && (
              <span className="px-1.5 py-0.5 bg-green-900/50 border border-green-700 rounded text-green-300 text-[10px]">
                aufgedeckt
              </span>
            )}
          </div>

          {/* User input */}
          <textarea
            value={userAnswers[currentStep.id] ?? ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Schreibe hier deine Lösung im Gutachtenstil..."
            className="w-full h-32 p-3 rounded-lg bg-slate-800/80 border border-slate-600 text-sm text-slate-300 placeholder:text-slate-600 resize-y focus:outline-none focus:border-cyan-600 transition-colors"
          />

          {/* Hint */}
          {currentStep.hint && (
            <div>
              <button
                onClick={toggleHint}
                className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"
              >
                {isHintExpanded ? 'Hinweis ausblenden' : 'Hinweis anzeigen'}
              </button>
              <AnimatePresence>
                {isHintExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-3 rounded-lg bg-cyan-900/20 border border-cyan-800 text-sm text-cyan-300">
                      {currentStep.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Reveal button */}
          {!isRevealed && (
            <button
              onClick={handleReveal}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-slate-400 cursor-pointer hover:border-slate-400 hover:text-slate-200 transition-colors"
            >
              Lösung anzeigen
            </button>
          )}

          {/* Model answer */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-lg bg-green-900/20 border border-green-700">
                  <p className="text-xs text-green-400 mb-2 uppercase tracking-wide">Formulierungsvorschlag</p>
                  <p className="text-sm text-green-200 leading-relaxed whitespace-pre-line">
                    {currentStep.modelAnswer}
                  </p>
                </div>

                {/* Key points checklist */}
                <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">
                    Selbstbewertung — Prüfungspunkte
                  </p>
                  <div className="space-y-2">
                    {currentStep.keyPoints.map((point, i) => {
                      const isChecked = selfScores[currentStep.id]?.has(i) ?? false
                      return (
                        <label
                          key={i}
                          className="flex items-start gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleKeyPoint(currentStep.id, i)}
                            className="mt-0.5 accent-green-500"
                          />
                          <span className={`text-sm ${isChecked ? 'text-green-300' : 'text-slate-400'} group-hover:text-slate-200 transition-colors`}>
                            {point}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <StepNavigator stepper={stepper} variant="numbers" />
    </DiagramShell>
  )
}
