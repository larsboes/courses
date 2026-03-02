// src/content/wirtschaftsrecht/diagrams/AnspruchspruefungFlow.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface PruefungsStage {
  id: string
  color: HighlightColor
  label: string
  question: string
  considerations: string[]
  paragraphs: string[]
  explanation: string
}

interface SampleCase {
  id: string
  label: string
  stages: PruefungsStage[]
}

const kaufpreisStages: PruefungsStage[] = [
  {
    id: 'entstanden',
    color: 'blue',
    label: 'Entstanden',
    question: 'Ist der Anspruch entstanden?',
    considerations: [
      'Wirksamer Kaufvertrag gem. § 433 BGB',
      'Einigung: Angebot und Annahme (§§ 145 ff.)',
      'Kein Wirksamkeitshindernis (Geschäftsfähigkeit, Form, Inhalt)',
      'Keine Nichtigkeit nach § 134 oder § 138',
    ],
    paragraphs: ['§ 433 II', '§§ 145 ff.', '§ 134', '§ 138'],
    explanation:
      'Zunächst muss geprüft werden, ob der Anspruch durch einen wirksamen Vertrag überhaupt entstanden ist. Hier: Kaufpreisanspruch aus § 433 II BGB setzt wirksamen Kaufvertrag voraus.',
  },
  {
    id: 'uebergegangen',
    color: 'green',
    label: 'Übergegangen',
    question: 'Ist der Anspruch übergegangen?',
    considerations: [
      'Rechtsgeschäftlicher Übergang: Abtretung (§ 398)',
      'Gesetzlicher Übergang: Legalzession (z.B. § 774)',
      'Hier: Keine Anhaltspunkte für einen Übergang',
    ],
    paragraphs: ['§ 398', '§ 774'],
    explanation:
      'Ansprüche können durch Abtretung oder kraft Gesetzes auf einen Dritten übergehen. Ist kein Übergang ersichtlich, wird dieser Punkt kurz festgestellt und weitergeprüft.',
  },
  {
    id: 'untergegangen',
    color: 'amber',
    label: 'Untergegangen',
    question: 'Ist der Anspruch untergegangen?',
    considerations: [
      'Erfüllung (§ 362 I)',
      'Aufrechnung (§§ 387 ff.)',
      'Anfechtung (§ 142 I) — Nichtigkeit ex tunc',
      'Rücktritt (§§ 346 ff.)',
      'Unmöglichkeit (§ 275)',
    ],
    paragraphs: ['§ 362', '§ 387', '§ 142', '§ 346', '§ 275'],
    explanation:
      'Rechtsvernichtende Einwendungen können den Anspruch nachträglich zum Erlöschen bringen. Die wichtigsten Gründe sind Erfüllung, Aufrechnung und Anfechtung.',
  },
  {
    id: 'durchsetzbar',
    color: 'red',
    label: 'Durchsetzbar',
    question: 'Ist der Anspruch durchsetzbar?',
    considerations: [
      'Verjährung (§§ 194 ff.) — Einrede, nicht Einwendung!',
      'Zurückbehaltungsrecht (§ 273)',
      'Einrede des nichterfüllten Vertrags (§ 320)',
      'Stundung, Verzicht',
    ],
    paragraphs: ['§§ 194 ff.', '§ 273', '§ 320'],
    explanation:
      'Selbst wenn ein Anspruch entstanden und nicht erloschen ist, kann er an Einreden scheitern. Wichtig: Verjährung ist eine Einrede — der Schuldner muss sie geltend machen.',
  },
]

const schadensersatzStages: PruefungsStage[] = [
  {
    id: 'entstanden',
    color: 'blue',
    label: 'Entstanden',
    question: 'Ist der Anspruch entstanden?',
    considerations: [
      'Schuldverhältnis (vertragliches oder gesetzliches)',
      'Pflichtverletzung (§ 280 I S. 1)',
      'Vertretenmüssen (§ 280 I S. 2) — Verschulden wird vermutet!',
      'Kausaler Schaden (§§ 249 ff.)',
    ],
    paragraphs: ['§ 280 I', '§ 276', '§§ 249 ff.'],
    explanation:
      'Der Schadensersatzanspruch aus § 280 I setzt ein Schuldverhältnis, eine Pflichtverletzung, Vertretenmüssen und einen kausalen Schaden voraus. Beachte: Das Verschulden wird vermutet (Beweislastumkehr).',
  },
  {
    id: 'uebergegangen',
    color: 'green',
    label: 'Übergegangen',
    question: 'Ist der Anspruch übergegangen?',
    considerations: [
      'Abtretung des Schadensersatzanspruchs (§ 398)',
      'Legalzession z.B. an Versicherer (§ 86 VVG)',
      'Hier: In der Regel kein Übergang',
    ],
    paragraphs: ['§ 398', '§ 86 VVG'],
    explanation:
      'Auch Schadensersatzansprüche können abgetreten werden oder kraft Gesetzes übergehen, z.B. auf den Versicherer nach Regulierung.',
  },
  {
    id: 'untergegangen',
    color: 'amber',
    label: 'Untergegangen',
    question: 'Ist der Anspruch untergegangen?',
    considerations: [
      'Erfüllung durch Schadensersatzleistung (§ 362)',
      'Aufrechnung (§ 387)',
      'Mitverschulden kann Anspruch mindern (§ 254)',
      'Vergleich (§ 779)',
    ],
    paragraphs: ['§ 362', '§ 387', '§ 254', '§ 779'],
    explanation:
      'Der Schadensersatzanspruch kann insbesondere durch Erfüllung, Aufrechnung oder einen Vergleich untergehen. § 254 (Mitverschulden) kann den Anspruch der Höhe nach beschränken.',
  },
  {
    id: 'durchsetzbar',
    color: 'red',
    label: 'Durchsetzbar',
    question: 'Ist der Anspruch durchsetzbar?',
    considerations: [
      'Regelverjährung 3 Jahre (§ 195)',
      'Beginn: Ende des Jahres der Kenntnis (§ 199 I)',
      'Zurückbehaltungsrecht (§ 273)',
      'Keine besonderen Ausschlussfristen?',
    ],
    paragraphs: ['§ 195', '§ 199', '§ 273'],
    explanation:
      'Die Regelverjährung beträgt 3 Jahre und beginnt mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Gläubiger Kenntnis erlangt hat (§ 199 I).',
  },
]

const samples: SampleCase[] = [
  { id: 'kaufpreis', label: 'Kaufpreisanspruch (§ 433 II)', stages: kaufpreisStages },
  { id: 'schadensersatz', label: 'Schadensersatzanspruch (§ 280 I)', stages: schadensersatzStages },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function AnspruchspruefungFlow({ className = '' }: { className?: string }) {
  const [currentSample, setCurrentSample] = useState(samples[0].id)
  const activeSample = samples.find((s) => s.id === currentSample) ?? samples[0]
  const stepper = useStepNavigator({ totalSteps: activeSample.stages.length, autoPlayInterval: 4000 })
  const current = activeSample.stages[stepper.currentStep]
  const tokens = highlightColors[current.color]

  return (
    <DiagramShell
      title="Anspruchsprüfung"
      subtitle="4-Stufen-Schema der Anspruchsprüfung"
      className={className}
      samples={samples.map((s) => ({ id: s.id, label: s.label }))}
      currentSample={currentSample}
      onSampleChange={(id) => {
        setCurrentSample(id)
        stepper.goTo(0)
      }}
      footer="Navigiere durch die 4 Prüfungsstufen"
    >
      {/* Stage Timeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {activeSample.stages.map((stage, index) => {
          const stageTokens = highlightColors[stage.color]
          const isCurrent = index === stepper.currentStep
          const isReached = index <= stepper.currentStep

          return (
            <div key={stage.id} className="flex items-center flex-1 min-w-0">
              <motion.button
                onClick={() => stepper.goTo(index)}
                className={`
                  flex-1 min-w-0 p-2 rounded-lg border text-center cursor-pointer transition-colors
                  ${isCurrent ? `${stageTokens.highlight} ${stageTokens.border}` : isReached ? `${stageTokens.bg} ${stageTokens.border}` : 'bg-slate-800/50 border-slate-700'}
                `}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className={`text-xs font-bold ${isCurrent ? stageTokens.text : 'text-slate-500'}`}>
                  {index + 1}
                </div>
                <div className={`text-[10px] font-medium truncate ${isCurrent ? stageTokens.text : 'text-slate-500'}`}>
                  {stage.label}
                </div>
              </motion.button>
              {index < activeSample.stages.length - 1 && (
                <motion.span
                  className="text-sm font-bold shrink-0 px-0.5"
                  animate={{ color: isReached && index < stepper.currentStep ? '#22c55e' : '#475569' }}
                >
                  →
                </motion.span>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSample}-${current.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border}`}
        >
          {/* Question */}
          <h4 className={`font-semibold text-lg mb-3 ${tokens.text}`}>
            {stepper.currentStep + 1}. {current.question}
          </h4>

          {/* Paragraphs as badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {current.paragraphs.map((p) => (
              <span
                key={p}
                className={`px-1.5 py-0.5 ${tokens.bg} border ${tokens.border} rounded ${tokens.text} text-sm font-mono`}
              >
                {p}
              </span>
            ))}
          </div>

          {/* Considerations */}
          <div className="space-y-2 mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Prüfungspunkte</p>
            <ul className="space-y-1.5">
              {current.considerations.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full ${tokens.solid} shrink-0`} />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Explanation */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Erläuterung</p>
            <p className="text-sm text-slate-300">{current.explanation}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <StepNavigator stepper={stepper} variant="numbers" />
    </DiagramShell>
  )
}
