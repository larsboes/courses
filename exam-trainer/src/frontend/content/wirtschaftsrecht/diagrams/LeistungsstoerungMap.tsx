// src/content/wirtschaftsrecht/diagrams/LeistungsstoerungMap.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface Rechtsfolge {
  label: string
  paragraph: string
}

interface Pflichtverletzung {
  id: string
  color: HighlightColor
  icon: string
  label: string
  shortDesc: string
  paragraph: string
  voraussetzungen: string[]
  rechtsfolgen: Rechtsfolge[]
  examTip: string
}

const problems: Pflichtverletzung[] = [
  {
    id: 'unmoeglichkeit',
    color: 'red',
    icon: '🚫',
    label: 'Unmoglichkeit',
    shortDesc: 'Leistung kann nicht erbracht werden',
    paragraph: '§ 275 I',
    voraussetzungen: [
      'Leistungspflicht aus Schuldverhaltnis',
      'Leistung ist fur jedermann unmglich (objektiv) oder fur den Schuldner (subjektiv)',
      'Anfangliche oder nachtragliche Unmoglichkeit',
    ],
    rechtsfolgen: [
      { label: 'Befreiung von Leistungspflicht', paragraph: '§ 275 I' },
      { label: 'Gegenleistung entfallt', paragraph: '§ 326 I 1' },
      { label: 'SE statt der Leistung', paragraph: '§ 283, § 280 I, III' },
      { label: 'Rucktritt', paragraph: '§ 326 V' },
    ],
    examTip:
      'Unmoglichkeit = Leistung kann NICHT mehr erbracht werden. Immer zuerst prufen! § 275 I ist Einwendung (von Amts wegen), kein Einrede.',
  },
  {
    id: 'verzug',
    color: 'amber',
    icon: '⏰',
    label: 'Verzug',
    shortDesc: 'Leistung verspatet',
    paragraph: '§ 286',
    voraussetzungen: [
      'Falligkeit der Leistung',
      'Mahnung (oder Ausnahme nach § 286 II)',
      'Vertretenmussen (§ 286 IV, Verschulden vermutet)',
      'Keine Einrede des Schuldners',
    ],
    rechtsfolgen: [
      { label: 'Verzugsschaden', paragraph: '§ 280 I, II, § 286' },
      { label: 'SE statt der Leistung (nach Fristsetzung)', paragraph: '§ 280 I, III, § 281' },
      { label: 'Rucktritt (nach Fristsetzung)', paragraph: '§ 323' },
      { label: 'Haftung fur Zufall', paragraph: '§ 287' },
    ],
    examTip:
      'Mahnung ist der Dreh- und Angelpunkt! Ausnahmen: kalendermassig bestimmt (§ 286 II Nr. 1), Entbehrlichkeit (§ 286 II Nr. 4). Verzugszinsen: § 288.',
  },
  {
    id: 'schlechtleistung',
    color: 'purple',
    icon: '⚠️',
    label: 'Schlechtleistung',
    shortDesc: 'Leistung mangelhaft',
    paragraph: '§ 281',
    voraussetzungen: [
      'Leistung wurde erbracht, aber mangelhaft',
      'Fristsetzung zur Nacherfuellung (§ 281 I)',
      'Erfolgloser Fristablauf oder Entbehrlichkeit (§ 281 II)',
    ],
    rechtsfolgen: [
      { label: 'Nacherfullung', paragraph: '§ 439 (Kauf), § 635 (Werk)' },
      { label: 'SE statt der Leistung (nach Fristsetzung)', paragraph: '§ 280 I, III, § 281' },
      { label: 'Rucktritt (nach Fristsetzung)', paragraph: '§ 323' },
      { label: 'Minderung', paragraph: '§ 441 (Kauf), § 638 (Werk)' },
    ],
    examTip:
      'Schlechtleistung beim Kauf: Immer an § 437 Mangelfolgrechte denken! Reihenfolge: Nacherfullung → SE/Rucktritt/Minderung.',
  },
  {
    id: 'nebenpflicht',
    color: 'cyan',
    icon: '🛡️',
    label: 'Nebenpflichtverletzung',
    shortDesc: 'Schutz- und Rucksichtnahmepflicht',
    paragraph: '§ 241 II',
    voraussetzungen: [
      'Schuldverhaltnis (auch vorvertraglich, § 311 II)',
      'Verletzung von Schutz-, Rucksichtnahme- oder Aufklarungspflichten',
      'Vertretenmussen (§ 280 I 2, Verschulden vermutet)',
    ],
    rechtsfolgen: [
      { label: 'SE neben der Leistung', paragraph: '§ 280 I' },
      { label: 'Kundigung aus wichtigem Grund (Dauerschuldverhaltnis)', paragraph: '§ 314' },
    ],
    examTip:
      'Nebenpflichtverletzung = SE NEBEN der Leistung (§ 280 I allein). Keine Fristsetzung notwendig! Abgrenzung zur Schlechtleistung beachten.',
  },
  {
    id: 'agb',
    color: 'blue',
    icon: '📋',
    label: 'AGB-Verstoss',
    shortDesc: 'Unwirksame Klauseln',
    paragraph: '§§ 305 ff.',
    voraussetzungen: [
      'Vorformulierte Vertragsbedingungen fur Vielzahl von Vertragen (§ 305 I)',
      'Einbeziehungskontrolle (§ 305 II): Hinweis + Moglichkeit der Kenntnisnahme',
      'Keine uberraschende Klausel (§ 305c I)',
      'Inhaltskontrolle (§ 307): Keine unangemessene Benachteiligung',
    ],
    rechtsfolgen: [
      { label: 'Klausel unwirksam, Vertrag bleibt', paragraph: '§ 306 I, II' },
      { label: 'Gesetzliche Regelung tritt an die Stelle', paragraph: '§ 306 II' },
      { label: 'Ausnahme: Vertrag unzumutbar', paragraph: '§ 306 III' },
    ],
    examTip:
      'Prufungsreihenfolge: 1) AGB-Eigenschaft (§ 305 I) → 2) Einbeziehung (§ 305 II) → 3) Uberraschend? (§ 305c) → 4) Inhaltskontrolle (§ 307-309). Klauselverbote ohne Wertungsmoglichkeit (§ 309) zuerst prufen!',
  },
]

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function ParagraphBadge({ text, color = 'blue' }: { text: string; color?: HighlightColor }) {
  const t = highlightColors[color]
  return (
    <span className={`px-1.5 py-0.5 ${t.bg} border ${t.border} rounded ${t.text} text-sm font-mono`}>
      {text}
    </span>
  )
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function LeistungsstoerungMap({ className = '' }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = problems.find((p) => p.id === selectedId)

  return (
    <DiagramShell
      title="Leistungsstorungsrecht — Ubersicht"
      subtitle="Pflichtverletzung → Voraussetzungen → Rechtsfolge"
      className={className}
      footer="Wahle eine Pflichtverletzung, um die zugehorigen Paragraphen und Rechtsfolgen zu sehen"
    >
      {/* Problem selector grid */}
      <div className="grid grid-cols-5 gap-2">
        {problems.map((problem) => {
          const t = highlightColors[problem.color]
          const active = problem.id === selectedId

          return (
            <motion.button
              key={problem.id}
              onClick={() => setSelectedId(active ? null : problem.id)}
              className={`p-3 rounded-lg border text-center cursor-pointer transition-colors
                ${active ? `${t.highlight} ${t.border} ring-1 ring-white/20` : `${t.bg} ${t.border}`}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: active ? 1.05 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="text-2xl mb-1">{problem.icon}</div>
              <div className={`text-xs font-medium ${active ? t.text : 'text-slate-400'}`}>
                {problem.label}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className={`p-4 rounded-xl border ${highlightColors[selected.color].bg} ${highlightColors[selected.color].border}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{selected.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold text-lg ${highlightColors[selected.color].text}`}>
                      {selected.label}
                    </h4>
                    <ParagraphBadge text={selected.paragraph} color={selected.color} />
                  </div>
                  <p className="text-sm text-slate-400">{selected.shortDesc}</p>
                </div>
              </div>
            </div>

            {/* Flow: Voraussetzungen → Rechtsfolgen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voraussetzungen */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl border bg-slate-800/60 border-slate-700"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Voraussetzungen</p>
                <div className="space-y-2">
                  {selected.voraussetzungen.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-2"
                    >
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${highlightColors[selected.color].solid} text-white flex-shrink-0`}>
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-300">{v}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Rechtsfolgen */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl border bg-slate-800/60 border-slate-700"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Rechtsfolgen</p>
                <div className="space-y-2">
                  {selected.rechtsfolgen.map((rf, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className={`p-2.5 rounded-lg border ${highlightColors[selected.color].bg} ${highlightColors[selected.color].border} flex items-center justify-between gap-2`}
                    >
                      <span className="text-sm text-slate-300">{rf.label}</span>
                      <ParagraphBadge text={rf.paragraph} color={selected.color} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Exam tip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm"
            >
              <span className="font-semibold text-amber-400">Klausur-Tipp: </span>
              <span className="text-slate-300">{selected.examTip}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!selected && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-lg mb-1">Was ist schiefgelaufen?</p>
          <p className="text-sm">Wahle oben eine Pflichtverletzung aus</p>
        </div>
      )}
    </DiagramShell>
  )
}
