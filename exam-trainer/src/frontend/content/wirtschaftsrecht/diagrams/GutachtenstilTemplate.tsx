// src/content/wirtschaftsrecht/diagrams/GutachtenstilTemplate.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface GutachtenStep {
  id: string
  label: string
  color: HighlightColor
  description: string
  prefix: string
}

const gutachtenSteps: GutachtenStep[] = [
  {
    id: 'obersatz',
    label: 'Obersatz',
    color: 'blue',
    description: 'Die Hypothese — was soll geprüft werden? Formuliert als Frage oder Vermutung.',
    prefix: 'Fraglich ist, ob...',
  },
  {
    id: 'definition',
    label: 'Definition',
    color: 'green',
    description: 'Abstrakte Definition der Tatbestandsmerkmale. Was verlangt das Gesetz?',
    prefix: 'Dies setzt voraus, dass... / Unter ... versteht man...',
  },
  {
    id: 'subsumtion',
    label: 'Subsumtion',
    color: 'amber',
    description: 'Anwendung der Definition auf den konkreten Sachverhalt. Passt der Fall?',
    prefix: 'Vorliegend hat X... / Hier liegt vor, dass...',
  },
  {
    id: 'ergebnis',
    label: 'Ergebnis',
    color: 'purple',
    description: 'Zusammenfassung: Ist das Tatbestandsmerkmal erfüllt oder nicht?',
    prefix: 'Somit ist/ist nicht... / Folglich liegt ... vor.',
  },
]

interface SampleCase {
  id: string
  label: string
  context: string
  fragments: SampleFragment[]
}

interface SampleFragment {
  text: string
  stepId: string
}

const sampleCases: SampleCase[] = [
  {
    id: 'kaufpreis',
    label: 'Kaufpreisanspruch (§ 433 II)',
    context: 'K und V einigen sich mündlich: V verkauft K sein Fahrrad für 200 EUR.',
    fragments: [
      {
        text: 'Fraglich ist, ob V von K Zahlung von 200 EUR gem. § 433 II BGB verlangen kann.',
        stepId: 'obersatz',
      },
      {
        text: 'Dies setzt voraus, dass zwischen V und K ein wirksamer Kaufvertrag gem. § 433 BGB zustande gekommen ist. Ein Kaufvertrag erfordert zwei übereinstimmende Willenserklärungen — Angebot und Annahme (§§ 145, 147 BGB).',
        stepId: 'definition',
      },
      {
        text: 'Vorliegend hat V dem K angeboten, sein Fahrrad für 200 EUR zu verkaufen. K hat dieses Angebot angenommen. Die Willenserklärungen stimmen inhaltlich überein. Wirksamkeitshindernisse sind nicht ersichtlich.',
        stepId: 'subsumtion',
      },
      {
        text: 'Somit ist ein wirksamer Kaufvertrag zustande gekommen. V hat gegen K einen Anspruch auf Zahlung von 200 EUR gem. § 433 II BGB.',
        stepId: 'ergebnis',
      },
    ],
  },
  {
    id: 'anfechtung',
    label: 'Wirksame Anfechtung (§ 119 I)',
    context: 'K bestellt online 10 Drucker, meint aber 10 Druckerpatronen (Erklärungsirrtum).',
    fragments: [
      {
        text: 'Fraglich ist, ob K seine auf den Kauf von 10 Druckern gerichtete Willenserklärung wirksam anfechten kann.',
        stepId: 'obersatz',
      },
      {
        text: 'Eine Anfechtung wegen Erklärungsirrtums gem. § 119 I Alt. 2 BGB setzt voraus, dass der Erklärende bei der Abgabe seiner Willenserklärung über deren Inhalt im Irrtum war — er also etwas anderes erklärte, als er erklären wollte (Verschreiber, Versprecher, Vergreifen).',
        stepId: 'definition',
      },
      {
        text: 'Vorliegend wollte K 10 Druckerpatronen bestellen, hat aber im Online-Formular "10 Drucker" ausgewählt. Er hat sich damit bei der Eingabe vergriffen und objektiv etwas anderes erklärt, als er subjektiv erklären wollte. Ein Erklärungsirrtum liegt vor.',
        stepId: 'subsumtion',
      },
      {
        text: 'Somit liegt ein Anfechtungsgrund gem. § 119 I Alt. 2 BGB vor. Sofern K die Anfechtung unverzüglich erklärt (§ 121 BGB), ist seine Willenserklärung gem. § 142 I BGB von Anfang an nichtig.',
        stepId: 'ergebnis',
      },
    ],
  },
]

// ─────────────────────────────────────────────────
// Shuffle mode helpers
// ─────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

type Mode = 'learn' | 'zuordnen'

export function GutachtenstilTemplate({ className = '' }: { className?: string }) {
  const [currentSample, setCurrentSample] = useState(sampleCases[0].id)
  const [mode, setMode] = useState<Mode>('learn')

  const activeCase = sampleCases.find((c) => c.id === currentSample) ?? sampleCases[0]

  return (
    <DiagramShell
      title="Gutachtenstil"
      subtitle="Die 4 Schritte des juristischen Gutachtenstils"
      className={className}
      samples={sampleCases.map((c) => ({ id: c.id, label: c.label }))}
      currentSample={currentSample}
      onSampleChange={(id) => {
        setCurrentSample(id)
      }}
      actions={
        <div className="flex gap-1">
          <button
            onClick={() => setMode('learn')}
            className={`px-2 py-1 rounded text-xs cursor-pointer transition-colors
              ${mode === 'learn' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Lernen
          </button>
          <button
            onClick={() => setMode('zuordnen')}
            className={`px-2 py-1 rounded text-xs cursor-pointer transition-colors
              ${mode === 'zuordnen' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Zuordnen
          </button>
        </div>
      }
      footer={
        mode === 'learn'
          ? 'Navigiere durch die 4 Gutachten-Schritte'
          : 'Ordne die Satzfragmente dem richtigen Schritt zu'
      }
    >
      {/* Case context */}
      <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-700">
        <p className="text-xs text-purple-400 mb-1 uppercase tracking-wide">Sachverhalt</p>
        <p className="text-sm text-purple-300">{activeCase.context}</p>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'learn' ? (
          <LearnMode key={`learn-${currentSample}`} sampleCase={activeCase} />
        ) : (
          <ZuordnenMode key={`zuordnen-${currentSample}`} sampleCase={activeCase} />
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}

// ─────────────────────────────────────────────────
// Learn Mode
// ─────────────────────────────────────────────────

function LearnMode({ sampleCase }: { sampleCase: SampleCase }) {
  const stepper = useStepNavigator({ totalSteps: gutachtenSteps.length })
  const current = gutachtenSteps[stepper.currentStep]
  const tokens = highlightColors[current.color]
  const fragment = sampleCase.fragments.find((f) => f.stepId === current.id)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Step buttons */}
      <div className="flex gap-1">
        {gutachtenSteps.map((step, index) => {
          const stepTokens = highlightColors[step.color]
          const isCurrent = index === stepper.currentStep
          return (
            <motion.button
              key={step.id}
              onClick={() => stepper.goTo(index)}
              className={`flex-1 p-2 rounded-lg border text-center cursor-pointer transition-colors
                ${isCurrent ? `${stepTokens.highlight} ${stepTokens.border}` : 'bg-slate-800/50 border-slate-700'}`}
              animate={{ scale: isCurrent ? 1.05 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className={`text-xs font-bold ${isCurrent ? stepTokens.text : 'text-slate-500'}`}>
                {index + 1}
              </div>
              <div className={`text-[10px] font-medium ${isCurrent ? stepTokens.text : 'text-slate-500'}`}>
                {step.label}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border}`}
        >
          <h4 className={`font-semibold text-lg mb-1 ${tokens.text}`}>
            {stepper.currentStep + 1}. {current.label}
          </h4>
          <p className="text-sm text-slate-400 mb-3">{current.description}</p>
          <p className={`text-xs ${tokens.text} mb-3 italic`}>{current.prefix}</p>

          {fragment && (
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Beispiel</p>
              <p className="text-sm text-slate-300 leading-relaxed">{fragment.text}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <StepNavigator stepper={stepper} variant="numbers" />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Zuordnen Mode (click-to-categorize)
// ─────────────────────────────────────────────────

function ZuordnenMode({ sampleCase }: { sampleCase: SampleCase }) {
  const [shuffled] = useState(() => shuffleArray(sampleCase.fragments))
  const [assignments, setAssignments] = useState<Record<number, string>>({})
  const [selectedFragment, setSelectedFragment] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleAssign = (stepId: string) => {
    if (selectedFragment === null) return
    setAssignments((prev) => ({ ...prev, [selectedFragment]: stepId }))
    setSelectedFragment(null)
  }

  const allAssigned = Object.keys(assignments).length === shuffled.length

  const checkResults = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAssignments({})
    setSelectedFragment(null)
    setShowResults(false)
  }

  const correctCount = shuffled.filter((f, i) => assignments[i] === f.stepId).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <p className="text-xs text-slate-500">
        Wähle ein Fragment und ordne es dem richtigen Gutachten-Schritt zu.
      </p>

      {/* Fragments */}
      <div className="space-y-2">
        {shuffled.map((fragment, index) => {
          const isSelected = selectedFragment === index
          const assignedStep = assignments[index]
          const stepDef = assignedStep ? gutachtenSteps.find((s) => s.id === assignedStep) : null
          const stepTokens = stepDef ? highlightColors[stepDef.color] : null
          const isCorrect = showResults && assignments[index] === fragment.stepId
          const isWrong = showResults && assignments[index] !== fragment.stepId

          return (
            <motion.button
              key={index}
              onClick={() => !showResults && setSelectedFragment(isSelected ? null : index)}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-colors cursor-pointer
                ${isSelected ? 'bg-cyan-900/30 border-cyan-600' : ''}
                ${!isSelected && assignedStep && stepTokens ? `${stepTokens.bg} ${stepTokens.border}` : ''}
                ${!isSelected && !assignedStep ? 'bg-slate-800/50 border-slate-700' : ''}
                ${isCorrect ? 'ring-2 ring-green-500' : ''}
                ${isWrong ? 'ring-2 ring-red-500' : ''}`}
              whileHover={!showResults ? { scale: 1.01 } : {}}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-slate-300">{fragment.text}</p>
                {stepDef && (
                  <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${stepTokens!.text} ${stepTokens!.bg} border ${stepTokens!.border}`}>
                    {stepDef.label}
                  </span>
                )}
              </div>
              {isWrong && (
                <p className="text-xs text-red-400 mt-1">
                  Richtig: {gutachtenSteps.find((s) => s.id === fragment.stepId)?.label}
                </p>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Step target buttons */}
      {selectedFragment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          {gutachtenSteps.map((step) => {
            const t = highlightColors[step.color]
            return (
              <button
                key={step.id}
                onClick={() => handleAssign(step.id)}
                className={`flex-1 p-2 rounded-lg border ${t.bg} ${t.border} ${t.text} text-xs font-medium cursor-pointer hover:brightness-125 transition-all`}
              >
                {step.label}
              </button>
            )
          })}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        {allAssigned && !showResults && (
          <button
            onClick={checkResults}
            className="px-4 py-2 rounded-lg bg-green-900/50 border border-green-700 text-green-300 text-sm cursor-pointer hover:bg-green-900/70 transition-colors"
          >
            Überprüfen
          </button>
        )}
        {showResults && (
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${correctCount === shuffled.length ? 'text-green-400' : 'text-amber-400'}`}>
              {correctCount}/{shuffled.length} richtig
            </span>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400 cursor-pointer hover:text-slate-200 transition-colors"
            >
              Nochmal
            </button>
          </div>
        )}
        {!allAssigned && !showResults && (
          <span className="text-xs text-slate-600">
            {Object.keys(assignments).length}/{shuffled.length} zugeordnet
          </span>
        )}
      </div>
    </motion.div>
  )
}
