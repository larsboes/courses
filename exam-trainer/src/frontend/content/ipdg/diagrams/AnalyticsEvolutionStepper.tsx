// src/content/ipdg/diagrams/AnalyticsEvolutionStepper.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface AnalyticsStep {
  id: string
  color: HighlightColor
  label: string
  icon: string
  question: string
  timeframe: string
  methods: string[]
  example: string
  examTip: string
}

const steps: AnalyticsStep[] = [
  {
    id: 'descriptive',
    color: 'amber',
    label: 'Descriptive Analytics',
    icon: '📋',
    question: 'Was ist passiert?',
    timeframe: 'Vergangenheit',
    methods: ['Data Mining', 'Management Reports', 'Dashboards', 'KPIs'],
    example: 'Netflix: Welche Serien wurden am häufigsten geschaut? Wann brechen Nutzer ab?',
    examTip: 'Descriptive = VERGANGENHEIT. Wird oft mit Predictive verwechselt!',
  },
  {
    id: 'predictive',
    color: 'blue',
    label: 'Predictive Analytics',
    icon: '🔮',
    question: 'Was wird passieren?',
    timeframe: 'Zukunft',
    methods: ['Machine Learning', 'Statistische Modelle', 'Externe Daten', 'Vorhersagen'],
    example: 'Netflix: Welche Serie wird ein Nutzer als nächstes schauen? Wann wird er kündigen?',
    examTip: 'Predictive nutzt historische Daten + ML/Statistik für Zukunftsprognosen.',
  },
  {
    id: 'prescriptive',
    color: 'green',
    label: 'Prescriptive Analytics',
    icon: '🎯',
    question: 'Was sollen wir tun?',
    timeframe: 'Handlung',
    methods: ['Entscheidungsoptionen', 'Echtzeit-Analyse', 'Hybride Daten', 'Optimierung'],
    example: 'Netflix: Welche Serie soll dem Nutzer empfohlen werden? Welches Thumbnail überzeugt ihn?',
    examTip: 'Prescriptive geht über Vorhersagen hinaus → konkrete Handlungsempfehlungen.',
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

interface AnalyticsEvolutionStepperProps {
  className?: string
}

export function AnalyticsEvolutionStepper({ className = '' }: AnalyticsEvolutionStepperProps) {
  const stepper = useStepNavigator({ totalSteps: steps.length, autoPlayInterval: 3000 })
  const current = steps[stepper.currentStep]
  const tokens = highlightColors[current.color]

  return (
    <DiagramShell
      title="Analytics Evolution"
      subtitle="Von der Vergangenheit zur Handlungsempfehlung"
      className={className}
      footer="Navigiere durch die drei Analytics-Stufen"
    >
      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const stepTokens = highlightColors[step.color]
          const isReached = index <= stepper.currentStep
          const isCurrent = index === stepper.currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <motion.button
                onClick={() => stepper.goTo(index)}
                className={`
                  flex-1 p-3 rounded-lg border text-center cursor-pointer transition-colors
                  ${isCurrent ? `${stepTokens.highlight} ${stepTokens.border} ring-1 ${stepTokens.border}` : isReached ? `${stepTokens.bg} ${stepTokens.border}` : 'bg-slate-800/50 border-slate-700'}
                `}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="text-2xl mb-1">{step.icon}</div>
                <div className={`text-xs font-medium ${isCurrent ? stepTokens.text : 'text-slate-400'}`}>
                  {step.label}
                </div>
              </motion.button>
              {index < steps.length - 1 && (
                <motion.div
                  className="px-1 text-lg font-bold"
                  animate={{
                    color: isReached && index < stepper.currentStep ? '#22c55e' : '#475569',
                  }}
                >
                  →
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{current.icon}</span>
              <div>
                <h4 className={`font-semibold text-lg ${tokens.text}`}>{current.label}</h4>
                <p className="text-sm text-slate-400">{current.timeframe}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${tokens.solid} text-white font-medium text-sm`}>
              "{current.question}"
            </div>
          </div>

          {/* Methods */}
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Methoden</p>
            <div className="flex flex-wrap gap-2">
              {current.methods.map((method) => (
                <span
                  key={method}
                  className={`px-2.5 py-1 text-xs rounded-full border ${tokens.border} ${tokens.text}`}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className={`p-3 rounded-lg bg-slate-800/60 border border-slate-700 mb-4`}>
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Praxisbeispiel Netflix</p>
            <p className="text-sm text-slate-300">{current.example}</p>
          </div>

          {/* Exam Tip */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm">
            <span className="font-semibold text-amber-400">Klausur-Tipp: </span>
            <span className="text-slate-300">{current.examTip}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="dots" />
    </DiagramShell>
  )
}
