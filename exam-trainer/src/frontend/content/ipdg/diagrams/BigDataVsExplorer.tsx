// src/content/ipdg/diagrams/BigDataVsExplorer.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { useHighlightState } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface BigDataV {
  id: string
  color: HighlightColor
  letter: string
  label: string
  shortDesc: string
  fullDesc: string
  example: string
  challenge: string
}

const sevenVs: BigDataV[] = [
  {
    id: 'volume',
    color: 'blue',
    letter: 'V',
    label: 'Volume',
    shortDesc: 'Große Datenmengen',
    fullDesc: 'Riesige Datenmengen, die in Terabytes (TB) und Petabytes (PB) gemessen werden. Traditionelle Datenbanken stoßen an ihre Grenzen, wenn die Datenmenge exponentiell wächst.',
    example: 'Facebook generiert täglich über 4 Petabyte an Daten durch Posts, Bilder, Videos und Interaktionen.',
    challenge: 'Speicherung und Verarbeitung erfordern verteilte Systeme (Hadoop, Spark).',
  },
  {
    id: 'velocity',
    color: 'green',
    letter: 'V',
    label: 'Velocity',
    shortDesc: 'Hohe Geschwindigkeit',
    fullDesc: 'Daten werden mit hoher Geschwindigkeit erzeugt und müssen oft in Echtzeit verarbeitet werden. Batch-Verarbeitung (einmal pro Nacht) reicht nicht mehr aus.',
    example: 'Börsenkurse ändern sich in Millisekunden. Sensordaten im IoT strömen kontinuierlich.',
    challenge: 'Stream Processing statt Batch Processing nötig.',
  },
  {
    id: 'variety',
    color: 'amber',
    letter: 'V',
    label: 'Variety',
    shortDesc: 'Verschiedene Datentypen',
    fullDesc: 'Daten kommen in unterschiedlichen Formaten: strukturiert (Datenbanken), semi-strukturiert (JSON, XML) und unstrukturiert (Text, Bilder, Videos, Audio).',
    example: 'Ein Unternehmen analysiert gleichzeitig CRM-Daten, E-Mails, Social-Media-Posts und Kamerabilder.',
    challenge: 'Data Lake statt Data Warehouse, um alle Formate zu speichern.',
  },
  {
    id: 'veracity',
    color: 'red',
    letter: 'V',
    label: 'Veracity',
    shortDesc: 'Qualität & Vertrauenswürdigkeit',
    fullDesc: 'Wahrhaftigkeit und Qualität der Daten. Nicht alle Daten sind korrekt, vollständig oder konsistent. Schlechte Datenqualität führt zu falschen Analysen ("Garbage in, Garbage out").',
    example: 'Social-Media-Daten enthalten Bots, Fake-Accounts und Spam, die gefiltert werden müssen.',
    challenge: 'Data Governance und Datenbereinigung werden kritisch.',
  },
  {
    id: 'validity',
    color: 'purple',
    letter: 'V',
    label: 'Validity',
    shortDesc: 'Gültigkeit der Daten',
    fullDesc: 'Gültigkeit bezieht sich darauf, ob die Daten korrekt und für den jeweiligen Anwendungszweck geeignet sind. Daten können technisch korrekt erfasst, aber dennoch für eine bestimmte Analyse ungültig sein.',
    example: 'Kundendaten aus 2015 sind für eine aktuelle Marktanalyse 2025 möglicherweise nicht mehr gültig.',
    challenge: 'Regelmäßige Validierung der Datenaktualität und -relevanz ist erforderlich.',
  },
  {
    id: 'volatility',
    color: 'cyan',
    letter: 'V',
    label: 'Volatility',
    shortDesc: 'Flüchtigkeit / Veränderlichkeit',
    fullDesc: 'Volatility beschreibt, wie lange Daten gültig und relevant bleiben. Manche Daten veralten schnell (z.B. Aktienkurse), andere bleiben lange stabil (z.B. Geburtsdaten). Die Aufbewahrungsdauer und Löschstrategie hängen davon ab.',
    example: 'Social-Media-Trends können innerhalb von Stunden veralten, während demographische Daten über Jahre stabil bleiben.',
    challenge: 'Data Lifecycle Management und passende Aufbewahrungsstrategien definieren.',
  },
  {
    id: 'value',
    color: 'green',
    letter: 'V',
    label: 'Value',
    shortDesc: 'Wert & Nutzen',
    fullDesc: 'Nicht alle Daten sind gleichwertig. Der Wert entsteht erst durch die richtige Analyse und Interpretation. Viele Daten sind "Noise" (Rauschen) und nur ein kleiner Teil enthält verwertbare Erkenntnisse.',
    example: 'Von Millionen Netflix-Interaktionen sind die Abbruchpunkte am wertvollsten für Empfehlungen.',
    challenge: 'ROI von Big-Data-Projekten nachweisen. Daten sammeln ist billig, Erkenntnisse gewinnen teuer.',
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

interface BigDataVsExplorerProps {
  className?: string
}

export function BigDataVsExplorer({ className = '' }: BigDataVsExplorerProps) {
  const highlight = useHighlightState({ items: sevenVs })

  return (
    <DiagramShell
      title="Die 7 Vs von Big Data"
      subtitle="Klicke auf ein V für Details, Beispiele und Herausforderungen"
      className={className}
      footer={
        <span>
          <strong className="text-amber-400">Klausur-Tipp:</strong>{' '}
          Alle 7 Vs auswendig kennen! "Validation" ist KEIN V.
        </span>
      }
    >
      {/* 7 Vs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sevenVs.map((v) => {
          const tokens = highlightColors[v.color]
          const active = highlight.isHighlighted(v.id)

          return (
            <motion.div
              key={v.id}
              className={`
                cursor-pointer rounded-xl border p-4 text-center transition-colors
                ${active ? `${tokens.highlight} ${tokens.border} ring-1 ${tokens.border}` : `${tokens.bg} ${tokens.border}`}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              {...highlight.handlers(v.id)}
            >
              <div className={`text-3xl font-black ${tokens.text} mb-1`}>V</div>
              <div className={`text-sm font-semibold ${tokens.text}`}>{v.label}</div>
              <div className="text-xs text-slate-400 mt-1">{v.shortDesc}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {highlight.activeItem && (() => {
          const item = highlight.activeItem
          const tokens = highlightColors[item.color]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl border p-5 ${tokens.bg} ${tokens.border}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-4xl font-black ${tokens.text}`}>V</span>
                <div>
                  <h4 className={`font-semibold text-lg ${tokens.text}`}>{item.label}</h4>
                  <p className="text-sm text-slate-400">{item.shortDesc}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-4">{item.fullDesc}</p>

              {/* Example & Challenge */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Praxisbeispiel</p>
                  <p className="text-sm text-slate-300">{item.example}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Herausforderung</p>
                  <p className="text-sm text-slate-300">{item.challenge}</p>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </DiagramShell>
  )
}
