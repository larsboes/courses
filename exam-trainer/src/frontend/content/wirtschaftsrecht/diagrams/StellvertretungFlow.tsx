// src/content/wirtschaftsrecht/diagrams/StellvertretungFlow.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface DecisionStep {
  id: string
  question: string
  paragraph: string
  explanation: string
  yesLabel: string
  noLabel: string
  noResult: { title: string; detail: string; color: HighlightColor }
  authorityTypes?: { label: string; detail: string; color: HighlightColor }[]
}

interface FinalResult {
  title: string
  detail: string
  color: HighlightColor
}

const steps: DecisionStep[] = [
  {
    id: 'willen',
    question: 'Eigene Willenserklarung des Vertreters?',
    paragraph: '§ 164 I',
    explanation:
      'Der Vertreter muss eine eigene Willenserklarung abgeben, d.h. einen eigenen Entscheidungsspielraum haben. Er ist nicht bloss Ubermittler.',
    yesLabel: 'Ja, eigene WE',
    noLabel: 'Nein, nur Ubermittlung',
    noResult: {
      title: 'Bote, nicht Vertreter!',
      detail:
        'Ein Bote ubermittelt nur eine fremde Willenserklarung. Er hat keinen eigenen Entscheidungsspielraum. Die Regeln der Stellvertretung finden keine Anwendung.',
      color: 'red',
    },
  },
  {
    id: 'name',
    question: 'Im fremden Namen gehandelt?',
    paragraph: '§ 164 I',
    explanation:
      'Offenkundigkeitsprinzip: Fur den Geschaftspartner muss erkennbar sein, dass der Handelnde nicht fur sich selbst, sondern fur einen Dritten handelt.',
    yesLabel: 'Ja, im fremden Namen',
    noLabel: 'Nein, im eigenen Namen',
    noResult: {
      title: 'Eigengeschaft des Handelnden',
      detail:
        'Handelt jemand im eigenen Namen, liegt ein Eigengeschaft vor. Die Rechtsfolgen treffen den Handelnden selbst, nicht den Hintermann. Ggf. mittelbarer Stellvertreter.',
      color: 'red',
    },
  },
  {
    id: 'macht',
    question: 'Mit Vertretungsmacht?',
    paragraph: '§ 164 I',
    explanation:
      'Die Vertretungsmacht kann sich aus verschiedenen Grundlagen ergeben. Ohne Vertretungsmacht ist das Geschaft zunachst schwebend unwirksam.',
    yesLabel: 'Ja, Vertretungsmacht liegt vor',
    noLabel: 'Nein, ohne Vertretungsmacht',
    noResult: {
      title: 'Vertreter ohne Vertretungsmacht (§ 177)',
      detail:
        'Das Geschaft ist schwebend unwirksam. Der Vertretene kann genehmigen (§ 177 I). Verweigert er die Genehmigung, haftet der Vertreter dem Geschaftspartner (§ 179).',
      color: 'amber',
    },
    authorityTypes: [
      {
        label: 'Gesetzlich',
        detail: 'Eltern (§ 1629 BGB), Vormund (§ 1793 BGB), Betreuer',
        color: 'blue',
      },
      {
        label: 'Rechtsgeschaftlich',
        detail: 'Vollmacht (§ 167), Prokura (§ 48 HGB), Handlungsvollmacht (§ 54 HGB)',
        color: 'purple',
      },
      {
        label: 'Rechtsscheinvollmacht',
        detail: 'Duldungsvollmacht (wissentlich geduldet) oder Anscheinsvollmacht (bei Sorgfalt erkennbar)',
        color: 'cyan',
      },
    ],
  },
]

const successResult: FinalResult = {
  title: 'Wirksame Stellvertretung!',
  detail:
    'Alle Voraussetzungen sind erfullt. Die Rechtsfolgen des Rechtsgeschafts treffen unmittelbar den Vertretenen (§ 164 I BGB).',
  color: 'green',
}

interface SampleCase {
  id: string
  label: string
  description: string
  answers: ('yes' | 'no')[]
  explanation: string
}

const sampleCases: SampleCase[] = [
  {
    id: 'strandkorb',
    label: 'Fall 17: Strandkorb',
    description: 'A beauftragt B, fur ihn einen Strandkorb zu kaufen. B handelt im Namen des A und hat Vollmacht.',
    answers: ['yes', 'yes', 'yes'],
    explanation: 'Alle drei Voraussetzungen liegen vor. Wirksame Stellvertretung gemas § 164 I BGB.',
  },
  {
    id: 'obstler',
    label: 'Fall 27: Obstler',
    description:
      'Angestellter bestellt regelmasig Waren im Namen des Chefs. Chef weiss davon und lasst es geschehen, ohne ausdruckliche Vollmacht zu erteilen.',
    answers: ['yes', 'yes', 'yes'],
    explanation:
      'Vertretungsmacht liegt als Duldungsvollmacht vor: Der Chef kennt das Handeln und duldet es. Der Geschaftspartner darf auf die Vertretungsmacht vertrauen.',
  },
]

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function ParagraphBadge({ text }: { text: string }) {
  return (
    <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">
      {text}
    </span>
  )
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function StellvertretungFlow({ className = '' }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<('yes' | 'no' | null)[]>([null, null, null])
  const [selectedSample, setSelectedSample] = useState(sampleCases[0].id)
  const [showResult, setShowResult] = useState(false)

  const currentSample = sampleCases.find((s) => s.id === selectedSample)!

  const handleAnswer = (answer: 'yes' | 'no') => {
    const newAnswers = [...answers] as ('yes' | 'no' | null)[]
    newAnswers[currentStep] = answer
    setAnswers(newAnswers)

    if (answer === 'no') {
      setShowResult(true)
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers([null, null, null])
    setShowResult(false)
  }

  const loadSample = (id: string) => {
    setSelectedSample(id)
    reset()
  }

  const activeStep = steps[currentStep]
  const lastAnswer = answers[currentStep]
  const isNoResult = showResult && lastAnswer === 'no'
  const isSuccess = showResult && !isNoResult

  return (
    <DiagramShell
      title="Stellvertretung — Entscheidungsbaum"
      subtitle="§ 164 ff. BGB"
      className={className}
      samples={sampleCases.map((s) => ({ id: s.id, label: s.label }))}
      currentSample={selectedSample}
      onSampleChange={loadSample}
      footer="Prufe die drei Voraussetzungen der Stellvertretung Schritt fur Schritt"
    >
      {/* Progress indicators */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => {
          const answered = answers[i]
          const isCurrent = i === currentStep && !showResult

          let bgClass = 'bg-slate-800/50 border-slate-700'
          let textClass = 'text-slate-500'

          if (answered === 'yes') {
            bgClass = `${highlightColors.green.highlight} ${highlightColors.green.border}`
            textClass = highlightColors.green.text
          } else if (answered === 'no') {
            bgClass = `${highlightColors.red.highlight} ${highlightColors.red.border}`
            textClass = highlightColors.red.text
          } else if (isCurrent) {
            bgClass = `${highlightColors.blue.highlight} ${highlightColors.blue.border}`
            textClass = highlightColors.blue.text
          }

          return (
            <div key={step.id} className="flex items-center flex-1">
              <motion.div
                className={`flex-1 p-2 rounded-lg border text-center ${bgClass}`}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="text-lg">
                  {answered === 'yes' ? '✓' : answered === 'no' ? '✗' : `${i + 1}`}
                </div>
                <div className={`text-[10px] font-medium ${textClass}`}>
                  {step.id === 'willen' ? 'Eigene WE' : step.id === 'name' ? 'Fremder Name' : 'Vertretungsmacht'}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className={`px-1 text-lg font-bold ${answers[i] === 'yes' ? 'text-green-500' : 'text-slate-600'}`}>
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Sample case info */}
      <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Sachverhalt</p>
        <p className="text-sm text-slate-300">{currentSample.description}</p>
      </div>

      {/* Decision area */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-5 rounded-xl border ${highlightColors.blue.bg} ${highlightColors.blue.border}`}
          >
            {/* Question */}
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl">❓</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold text-lg ${highlightColors.blue.text}`}>
                    Schritt {currentStep + 1}: {activeStep.question}
                  </h4>
                  <ParagraphBadge text={activeStep.paragraph} />
                </div>
                <p className="text-sm text-slate-300">{activeStep.explanation}</p>
              </div>
            </div>

            {/* Authority types for step 3 */}
            {activeStep.authorityTypes && (
              <div className="mb-4 space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Arten der Vertretungsmacht</p>
                {activeStep.authorityTypes.map((type) => {
                  const t = highlightColors[type.color]
                  return (
                    <div
                      key={type.label}
                      className={`p-2.5 rounded-lg border ${t.bg} ${t.border}`}
                    >
                      <span className={`text-sm font-semibold ${t.text}`}>{type.label}: </span>
                      <span className="text-sm text-slate-300">{type.detail}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Answer buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => handleAnswer('yes')}
                className={`flex-1 p-3 rounded-lg border cursor-pointer font-medium text-sm
                  ${highlightColors.green.bg} ${highlightColors.green.border} ${highlightColors.green.text}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✓ {activeStep.yesLabel}
              </motion.button>
              <motion.button
                onClick={() => handleAnswer('no')}
                className={`flex-1 p-3 rounded-lg border cursor-pointer font-medium text-sm
                  ${highlightColors.red.bg} ${highlightColors.red.border} ${highlightColors.red.text}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✗ {activeStep.noLabel}
              </motion.button>
            </div>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-5 rounded-xl border ${highlightColors.green.bg} ${highlightColors.green.border}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">✅</span>
              <h4 className={`font-semibold text-lg ${highlightColors.green.text}`}>{successResult.title}</h4>
            </div>
            <p className="text-slate-300 mb-3">{successResult.detail}</p>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm">
              <span className="font-semibold text-amber-400">Fall-Losung: </span>
              <span className="text-slate-300">{currentSample.explanation}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="no-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-5 rounded-xl border ${highlightColors[activeStep.noResult.color].bg} ${highlightColors[activeStep.noResult.color].border}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚠️</span>
              <h4 className={`font-semibold text-lg ${highlightColors[activeStep.noResult.color].text}`}>
                {activeStep.noResult.title}
              </h4>
            </div>
            <p className="text-slate-300">{activeStep.noResult.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-sm text-slate-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nochmal prufen
          </motion.button>
        </motion.div>
      )}
    </DiagramShell>
  )
}
