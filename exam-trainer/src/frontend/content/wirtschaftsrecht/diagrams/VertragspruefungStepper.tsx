// src/content/wirtschaftsrecht/diagrams/VertragspruefungStepper.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface VertragsStep {
  id: string
  color: HighlightColor
  icon: string
  label: string
  question: string
  paragraph: string
  explanation: string
  details: string[]
  achtung: string
}

const baseSteps: VertragsStep[] = [
  {
    id: 'angebot',
    color: 'blue',
    icon: '📨',
    label: 'Angebot',
    question: 'Angebot vorhanden?',
    paragraph: '§ 145',
    explanation:
      'Ein Angebot ist eine empfangsbedurftige Willenserklarung, die alle wesentlichen Vertragsbestandteile (essentialia negotii) enthalt und auf Abschluss eines Vertrages gerichtet ist.',
    details: [
      'Essentialia negotii: Parteien, Kaufsache, Preis',
      'Bindungswirkung ab Zugang (§ 145)',
      'Abgrenzung: Invitatio ad offerendum (Einladung zur Abgabe) ist KEIN Angebot',
      'Beispiel Invitatio: Schaufensterauslage, Online-Shop, Zeitungsanzeige',
    ],
    achtung: 'Invitatio ad offerendum ≠ Angebot! In der Klausur genau prufen, wer das Angebot abgibt.',
  },
  {
    id: 'zugang-angebot',
    color: 'cyan',
    icon: '📬',
    label: 'Zugang',
    question: 'Angebot zugegangen?',
    paragraph: '§ 130 I',
    explanation:
      'Empfangsbedurftige Willenserklarungen werden wirksam, wenn sie dem Empfanger zugehen. Zugang = in den Machtbereich gelangt und unter normalen Umstanden mit Kenntnisnahme zu rechnen ist.',
    details: [
      'Unter Abwesenden: In den Machtbereich gelangt (z.B. Briefkasten)',
      'Unter Anwesenden: Vernehmungstheorie (akustisch verstanden)',
      'Vor Zugang: Widerruf moglich (§ 130 I 2)',
      'Zugangsfiktion bei Zugangsvereitelung',
    ],
    achtung: 'Zugang ≠ Kenntnisnahme! Es reicht, dass der Empfanger unter normalen Umstanden Kenntnis nehmen KONNTE.',
  },
  {
    id: 'annahme',
    color: 'green',
    icon: '✅',
    label: 'Annahme',
    question: 'Annahme erklart?',
    paragraph: '§ 147',
    explanation:
      'Die Annahme ist die vorbehaltlose Zustimmung zum Angebot. Sie muss inhaltlich mit dem Angebot ubereinstimmen.',
    details: [
      'Vorbehaltlose Zustimmung zum Angebot',
      'Annahme unter Erweiterungen/Einschrankungen = Ablehnung + neues Angebot (§ 150 II)',
      'Schweigen ist grundsatzlich KEINE Annahme',
      'Ausnahme: Kaufmannisches Bestatigungsschreiben (HGB)',
    ],
    achtung: 'Modifizierte Annahme = neues Angebot (§ 150 II)! Das wird in Klausuren gerne ubersehen.',
  },
  {
    id: 'rechtzeitig',
    color: 'purple',
    icon: '⏰',
    label: 'Rechtzeitig?',
    question: 'Annahme rechtzeitig?',
    paragraph: '§§ 146-148',
    explanation:
      'Die Annahme muss innerhalb der Annahmefrist erfolgen. Verspatete Annahme gilt als neues Angebot.',
    details: [
      'Annahmefrist bestimmt (§ 148): Innerhalb der gesetzten Frist',
      'Keine Frist bestimmt (§ 147): Unter Anwesenden sofort, unter Abwesenden angemessene Zeit',
      'Verspatete Annahme = neues Angebot (§ 150 I)',
      'Verspatet abgesandte Annahme: § 149 (Anzeigepflicht des Anbietenden)',
    ],
    achtung: 'Verspatete Annahme ist ein NEUES Angebot des bisherigen Annehmenden (§ 150 I). Rollen tauschen!',
  },
  {
    id: 'ergebnis',
    color: 'green',
    icon: '🤝',
    label: 'Vertrag!',
    question: 'Vertrag geschlossen!',
    paragraph: '§§ 145 ff.',
    explanation:
      'Zwei ubereinstimmende Willenserklarungen (Angebot + Annahme) fuhren zum Vertragsschluss. Nun mussen die vertraglichen Pflichten erfullt werden.',
    details: [
      'Kaufer: Zahlung des Kaufpreises (§ 433 II)',
      'Verkaufer: Ubergabe und Ubereignung der Kaufsache (§ 433 I)',
      'Kaufsache: frei von Sach- und Rechtsmangeln (§ 433 I 2)',
      'Nachste Prufungsschritte: Wirksamkeitshindernisse (Geschaftsfahigkeit, Form, Stellvertretung, Anfechtung)',
    ],
    achtung: 'Vertrag geschlossen heisst noch nicht wirksam! Immer auch Wirksamkeitshindernisse prufen.',
  },
]

interface SampleCase {
  id: string
  label: string
  description: string
  stepNotes: string[]
}

const sampleCases: SampleCase[] = [
  {
    id: 'normal',
    label: 'Normaler Kaufvertrag',
    description: 'A bietet B sein Fahrrad fur 200 Euro an. B sagt "Einverstanden!"',
    stepNotes: [
      'A erklart gegenuber B: "Ich verkaufe dir mein Fahrrad fur 200 Euro." → Bestimmtes Angebot mit allen essentialia negotii.',
      'B ist anwesend und hat das Angebot akustisch verstanden → Zugang unter Anwesenden (+).',
      'B sagt "Einverstanden!" → Vorbehaltlose Annahme ohne Modifikation.',
      'Annahme erfolgt sofort, also rechtzeitig (§ 147 I).',
      'Kaufvertrag gemas § 433 BGB. A schuldet Ubergabe des Fahrrads, B schuldet 200 Euro.',
    ],
  },
  {
    id: 'waermeflasche',
    label: 'Fall 12: Warmeflasche',
    description:
      'A schreibt B am 1.3. ein Angebot. B antwortet erst am 1.5. mit "Einverstanden".',
    stepNotes: [
      'A hat ein bestimmtes Angebot mit allen essentialia negotii abgegeben.',
      'Das Schreiben ging B zu, als es in seinen Briefkasten gelangte.',
      'B erklart die Annahme vorbehaltlos.',
      'Die Annahme ist verspatet! Keine Frist gesetzt → § 147 II: unter Abwesenden angemessene Frist. 2 Monate sind zu lang. → Verspatete Annahme = neues Angebot des B (§ 150 I).',
      'Kein Vertrag durch ursprungliches Angebot. Aber: B hat ein neues Angebot gemacht, das A noch annehmen kann.',
    ],
  },
  {
    id: 'boutique',
    label: 'Fall 4: Boutique',
    description:
      'Kundin sieht ein Kleid fur 89 Euro in der Schaufensterauslage und mochte es kaufen.',
    stepNotes: [
      'Die Schaufensterauslage ist eine Invitatio ad offerendum, KEIN Angebot! Das Angebot kommt erst von der Kundin an der Kasse.',
      'Das Angebot der Kundin geht der Verkauferin an der Kasse zu.',
      'Die Verkauferin nimmt das Angebot an (z.B. durch Eintippen in die Kasse).',
      'Annahme erfolgt sofort → rechtzeitig.',
      'Kaufvertrag gemas § 433 BGB. Achtung: Anbieter und Annehmender sind anders als erwartet!',
    ],
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

export function VertragspruefungStepper({ className = '' }: { className?: string }) {
  const stepper = useStepNavigator({ totalSteps: baseSteps.length, autoPlayInterval: 4000 })
  const [selectedSample, setSelectedSample] = useState(sampleCases[0].id)

  const current = baseSteps[stepper.currentStep]
  const tokens = highlightColors[current.color]
  const currentSample = sampleCases.find((s) => s.id === selectedSample)!

  return (
    <DiagramShell
      title="Vertragsprufung — Kaufvertrag"
      subtitle="Schritt fur Schritt zum Vertragsschluss"
      className={className}
      samples={sampleCases.map((s) => ({ id: s.id, label: s.label }))}
      currentSample={selectedSample}
      onSampleChange={setSelectedSample}
      footer="Gehe die Prufungsschritte fur einen Kaufvertrag (§ 433 BGB) durch"
    >
      {/* Step timeline */}
      <div className="flex items-center gap-1">
        {baseSteps.map((step, i) => {
          const t = highlightColors[step.color]
          const active = i === stepper.currentStep
          const reached = i <= stepper.currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <motion.button
                onClick={() => stepper.goTo(i)}
                className={`flex-1 p-2 rounded-lg border cursor-pointer text-center transition-colors
                  ${active ? `${t.highlight} ${t.border} ring-1 ring-white/20` : reached ? `${t.bg} ${t.border}` : 'bg-slate-800/50 border-slate-700'}`}
                animate={{ scale: active ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="text-xl">{step.icon}</div>
                <div className={`text-[10px] font-medium ${active ? t.text : 'text-slate-500'}`}>
                  {step.label}
                </div>
              </motion.button>
              {i < baseSteps.length - 1 && (
                <div className={`px-0.5 text-sm font-bold ${reached && i < stepper.currentStep ? 'text-green-500' : 'text-slate-600'}`}>
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail card */}
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
                <div className="flex items-center gap-2">
                  <h4 className={`font-semibold text-lg ${tokens.text}`}>
                    {current.question}
                  </h4>
                  <ParagraphBadge text={current.paragraph} />
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${tokens.solid} text-white`}>
              Schritt {stepper.currentStep + 1}/{baseSteps.length}
            </div>
          </div>

          {/* Explanation */}
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">{current.explanation}</p>

          {/* Details */}
          <div className="space-y-1.5 mb-4">
            {current.details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${tokens.solid} flex-shrink-0`} />
                <span className="text-sm text-slate-300">{detail}</span>
              </motion.div>
            ))}
          </div>

          {/* Achtung */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm mb-4">
            <span className="font-semibold text-amber-400">Achtung: </span>
            <span className="text-slate-300">{current.achtung}</span>
          </div>

          {/* Sample-specific note */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-sm">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
              {currentSample.label}
            </p>
            <p className="text-slate-300">{currentSample.stepNotes[stepper.currentStep]}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step navigator */}
      <StepNavigator stepper={stepper} variant="numbers" />
    </DiagramShell>
  )
}
