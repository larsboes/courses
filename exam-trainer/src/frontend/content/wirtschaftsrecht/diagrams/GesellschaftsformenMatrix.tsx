// src/content/wirtschaftsrecht/diagrams/GesellschaftsformenMatrix.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

type Kategorie = 'person' | 'kapital'

interface Gesellschaftsform {
  id: string
  label: string
  abbr: string
  color: HighlightColor
  kategorie: Kategorie
  icon: string
  gesetzlicheGrundlage: string
  juristischePerson: boolean
  mindestkapital: string
  gruenderMindestzahl: string
  haftung: string
  geschaeftsfuehrung: string
  handelsregister: string
  organe: string[]
  examTip: string
}

const formen: Gesellschaftsform[] = [
  {
    id: 'gbr',
    label: 'Gesellschaft burgerlichen Rechts',
    abbr: 'GbR',
    color: 'blue',
    kategorie: 'person',
    icon: '👥',
    gesetzlicheGrundlage: '§§ 705 ff. BGB',
    juristischePerson: false,
    mindestkapital: 'Keins',
    gruenderMindestzahl: '2',
    haftung: 'Personlich, unbeschrankt, gesamtschuldnerisch',
    geschaeftsfuehrung: 'Alle Gesellschafter gemeinsam',
    handelsregister: 'Nein (optional: Gesellschaftsregister)',
    organe: ['Alle Gesellschafter'],
    examTip: 'GbR ist die Grundform der Personengesellschaften. Seit MoPeG 2024 rechtsfahig!',
  },
  {
    id: 'ohg',
    label: 'Offene Handelsgesellschaft',
    abbr: 'oHG',
    color: 'cyan',
    kategorie: 'person',
    icon: '🏪',
    gesetzlicheGrundlage: '§§ 105 ff. HGB',
    juristischePerson: false,
    mindestkapital: 'Keins',
    gruenderMindestzahl: '2',
    haftung: 'Personlich, unbeschrankt, gesamtschuldnerisch',
    geschaeftsfuehrung: 'Alle Gesellschafter (Einzelgeschaftsfuhrung)',
    handelsregister: 'Ja',
    organe: ['Alle Gesellschafter'],
    examTip: 'oHG = GbR + Handelsgewerbe. § 128 HGB: Personliche Haftung der Gesellschafter!',
  },
  {
    id: 'kg',
    label: 'Kommanditgesellschaft',
    abbr: 'KG',
    color: 'purple',
    kategorie: 'person',
    icon: '🏢',
    gesetzlicheGrundlage: '§§ 161 ff. HGB',
    juristischePerson: false,
    mindestkapital: 'Keins',
    gruenderMindestzahl: '2 (Komplementar + Kommanditist)',
    haftung: 'Komplementar: unbeschrankt; Kommanditist: beschrankt auf Einlage (§ 171 I HGB)',
    geschaeftsfuehrung: 'Nur Komplementar(e)',
    handelsregister: 'Ja',
    organe: ['Komplementar (Geschaftsfuhrung)', 'Kommanditist (Kontrollrecht § 166 HGB)'],
    examTip: 'KG: Zwei Gesellschafter-Typen! Kommanditist haftet nur mit Einlage, ist aber von Geschaftsfuhrung ausgeschlossen.',
  },
  {
    id: 'gmbh',
    label: 'Gesellschaft mit beschrankter Haftung',
    abbr: 'GmbH',
    color: 'green',
    kategorie: 'kapital',
    icon: '🏛️',
    gesetzlicheGrundlage: 'GmbHG',
    juristischePerson: true,
    mindestkapital: '25.000 Euro',
    gruenderMindestzahl: '1',
    haftung: 'Auf Gesellschaftsvermogen beschrankt',
    geschaeftsfuehrung: 'Geschaftsfuhrer (bestellt durch Gesellschafterversammlung)',
    handelsregister: 'Ja (konstitutiv)',
    organe: ['Geschaftsfuhrer', 'Gesellschafterversammlung', 'Aufsichtsrat (optional/ab Grosse)'],
    examTip: 'GmbH: Haftungsbeschrankung auf Gesellschaftsvermogen! Aber: Durchgriffshaftung bei Missbrauch moglich.',
  },
  {
    id: 'ag',
    label: 'Aktiengesellschaft',
    abbr: 'AG',
    color: 'amber',
    kategorie: 'kapital',
    icon: '📈',
    gesetzlicheGrundlage: 'AktG',
    juristischePerson: true,
    mindestkapital: '50.000 Euro',
    gruenderMindestzahl: '1',
    haftung: 'Auf Gesellschaftsvermogen beschrankt',
    geschaeftsfuehrung: 'Vorstand (bestellt durch Aufsichtsrat)',
    handelsregister: 'Ja (konstitutiv)',
    organe: ['Vorstand (Leitung)', 'Aufsichtsrat (Uberwachung)', 'Hauptversammlung (Grundsatzentscheidungen)'],
    examTip: 'AG: Strenge Organtrennung! Vorstand = Leitung, Aufsichtsrat = Uberwachung, HV = Grundlagenentscheidungen.',
  },
]

const featureLabels: { key: keyof Gesellschaftsform; label: string }[] = [
  { key: 'gesetzlicheGrundlage', label: 'Gesetzliche Grundlage' },
  { key: 'mindestkapital', label: 'Mindestkapital' },
  { key: 'gruenderMindestzahl', label: 'Grunder-Mindestanzahl' },
  { key: 'haftung', label: 'Haftung' },
  { key: 'geschaeftsfuehrung', label: 'Geschaftsfuhrung' },
  { key: 'handelsregister', label: 'Handelsregisterpflicht' },
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

export function GesellschaftsformenMatrix({ className = '' }: { className?: string }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['gbr', 'gmbh'])
  const [viewMode, setViewMode] = useState<'matrix' | 'detail'>('matrix')

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]
      }
      return [...prev, id]
    })
  }

  const selectedForms = formen.filter((f) => selectedIds.includes(f.id))

  return (
    <DiagramShell
      title="Gesellschaftsformen — Vergleichsmatrix"
      subtitle="Wahle bis zu 3 Formen zum Vergleich"
      className={className}
      actions={
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${
              viewMode === 'matrix' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => setViewMode('detail')}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${
              viewMode === 'detail' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}
          >
            Detail
          </button>
        </div>
      }
      footer="Wahle 2-3 Gesellschaftsformen zum Vergleich. Personengesellschaften links, Kapitalgesellschaften rechts."
    >
      {/* Selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 uppercase tracking-wide w-32">Personengesellschaften</span>
          <div className="flex gap-2 flex-1">
            {formen.filter((f) => f.kategorie === 'person').map((form) => {
              const t = highlightColors[form.color]
              const active = selectedIds.includes(form.id)
              return (
                <motion.button
                  key={form.id}
                  onClick={() => toggleSelection(form.id)}
                  className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition-colors
                    ${active ? `${t.highlight} ${t.border} ring-1 ring-white/20` : `${t.bg} ${t.border} opacity-60`}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-2xl mb-1">{form.icon}</div>
                  <div className={`text-sm font-bold ${t.text}`}>{form.abbr}</div>
                </motion.button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 uppercase tracking-wide w-32">Kapitalgesellschaften</span>
          <div className="flex gap-2 flex-1">
            {formen.filter((f) => f.kategorie === 'kapital').map((form) => {
              const t = highlightColors[form.color]
              const active = selectedIds.includes(form.id)
              return (
                <motion.button
                  key={form.id}
                  onClick={() => toggleSelection(form.id)}
                  className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition-colors
                    ${active ? `${t.highlight} ${t.border} ring-1 ring-white/20` : `${t.bg} ${t.border} opacity-60`}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-2xl mb-1">{form.icon}</div>
                  <div className={`text-sm font-bold ${t.text}`}>{form.abbr}</div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        {viewMode === 'matrix' ? (
          <motion.div
            key="matrix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedForms.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>Wahle mindestens eine Gesellschaftsform aus</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-slate-500 text-xs uppercase tracking-wide border-b border-slate-700">
                        Merkmal
                      </th>
                      {selectedForms.map((form) => {
                        const t = highlightColors[form.color]
                        return (
                          <th key={form.id} className={`p-2 text-center border-b ${t.border}`}>
                            <div className="text-lg">{form.icon}</div>
                            <div className={`font-bold ${t.text}`}>{form.abbr}</div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Kategorie */}
                    <tr>
                      <td className="p-2 text-slate-400 border-b border-slate-800">Rechtsform</td>
                      {selectedForms.map((form) => (
                        <td key={form.id} className="p-2 text-center text-slate-300 border-b border-slate-800">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            form.kategorie === 'person' ? 'bg-blue-900/50 text-blue-300' : 'bg-green-900/50 text-green-300'
                          }`}>
                            {form.kategorie === 'person' ? 'Personenges.' : 'Kapitalges.'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    {/* Juristische Person */}
                    <tr>
                      <td className="p-2 text-slate-400 border-b border-slate-800">Juristische Person</td>
                      {selectedForms.map((form) => (
                        <td key={form.id} className="p-2 text-center border-b border-slate-800">
                          <span className={form.juristischePerson ? 'text-green-400' : 'text-red-400'}>
                            {form.juristischePerson ? 'Ja' : 'Nein'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    {/* Dynamic features */}
                    {featureLabels.map(({ key, label }) => (
                      <tr key={key}>
                        <td className="p-2 text-slate-400 border-b border-slate-800">{label}</td>
                        {selectedForms.map((form) => {
                          const val = form[key] as string
                          const isHighlight = key === 'haftung' || key === 'mindestkapital'
                          return (
                            <td key={form.id} className={`p-2 text-center text-slate-300 border-b border-slate-800 text-xs ${isHighlight ? 'font-medium' : ''}`}>
                              {val}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {selectedForms.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>Wahle mindestens eine Gesellschaftsform aus</p>
              </div>
            ) : (
              selectedForms.map((form) => {
                const t = highlightColors[form.color]
                return (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-xl border ${t.bg} ${t.border}`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{form.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold text-lg ${t.text}`}>{form.abbr}</h4>
                          <ParagraphBadge text={form.gesetzlicheGrundlage} color={form.color} />
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            form.kategorie === 'person' ? 'bg-blue-900/50 text-blue-300' : 'bg-green-900/50 text-green-300'
                          }`}>
                            {form.kategorie === 'person' ? 'Personengesellschaft' : 'Kapitalgesellschaft'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{form.label}</p>
                      </div>
                    </div>

                    {/* Key facts */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700">
                        <p className="text-xs text-slate-500 mb-1">Mindestkapital</p>
                        <p className="text-sm font-medium text-slate-200">{form.mindestkapital}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700">
                        <p className="text-xs text-slate-500 mb-1">Grunder</p>
                        <p className="text-sm font-medium text-slate-200">{form.gruenderMindestzahl}</p>
                      </div>
                    </div>

                    {/* Haftung */}
                    <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 mb-3">
                      <p className="text-xs text-slate-500 mb-1">Haftung</p>
                      <p className="text-sm text-slate-200 font-medium">{form.haftung}</p>
                    </div>

                    {/* Organe */}
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Organe</p>
                      <div className="flex flex-wrap gap-2">
                        {form.organe.map((organ) => (
                          <span key={organ} className={`px-2.5 py-1 text-xs rounded-full border ${t.border} ${t.text}`}>
                            {organ}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Exam tip */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm">
                      <span className="font-semibold text-amber-400">Klausur-Tipp: </span>
                      <span className="text-slate-300">{form.examTip}</span>
                    </div>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}
