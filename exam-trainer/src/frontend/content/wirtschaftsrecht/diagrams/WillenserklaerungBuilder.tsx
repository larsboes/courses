// src/content/wirtschaftsrecht/diagrams/WillenserklaerungBuilder.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface WEComponent {
  id: string
  label: string
  layer: 'outer' | 'inner'
  color: HighlightColor
  description: string
  required: boolean
  missingEffect: string
}

const weComponents: WEComponent[] = [
  {
    id: 'handlung',
    label: 'Handlung',
    layer: 'outer',
    color: 'blue',
    description:
      'Ein nach außen erkennbares Verhalten — eine Handlung, die von anderen wahrgenommen werden kann (z.B. Handzeichen, Unterschrift, mündliche Äußerung).',
    required: true,
    missingEffect: 'Ohne Handlung liegt keine Willenserklärung vor.',
  },
  {
    id: 'handlungswille',
    label: 'Handlungswille',
    layer: 'inner',
    color: 'green',
    description:
      'Der Wille, überhaupt eine Handlung vorzunehmen. Fehlt z.B. bei Reflexbewegungen oder Handeln im Schlaf.',
    required: true,
    missingEffect: 'Ohne Handlungswille keine WE — z.B. Reflexbewegung bei einer Auktion.',
  },
  {
    id: 'erklaerungswille',
    label: 'Erklärungswille',
    layer: 'inner',
    color: 'amber',
    description:
      'Das Bewusstsein, überhaupt eine rechtserhebliche Erklärung abzugeben. Der Erklärende muss wissen, dass sein Verhalten als Willenserklärung gedeutet werden kann.',
    required: false,
    missingEffect:
      'Str.! Nach h.M. ist die WE dennoch wirksam, aber anfechtbar (analog § 119 I). Der Erklärende wird so behandelt, als hätte er eine WE abgegeben — wie beim Trierer Weinversteigerungsfall.',
  },
  {
    id: 'geschaeftswille',
    label: 'Geschäftswille',
    layer: 'inner',
    color: 'purple',
    description:
      'Der Wille, ein ganz bestimmtes Rechtsgeschäft mit einem bestimmten Inhalt abzuschließen. Z.B. der Wille, genau dieses Auto zu genau diesem Preis zu kaufen.',
    required: false,
    missingEffect:
      'WE bleibt wirksam, aber anfechtbar (§ 119 I). Der Geschäftswille betrifft den konkreten Inhalt — fehlt er, liegt ein Inhalts- oder Erklärungsirrtum vor.',
  },
]

interface Scenario {
  id: string
  label: string
  activeComponents: string[]
  description: string
}

const scenarios: Scenario[] = [
  {
    id: 'normal',
    label: 'Normaler Kaufvertrag',
    activeComponents: ['handlung', 'handlungswille', 'erklaerungswille', 'geschaeftswille'],
    description:
      'A sagt zu B: "Ich kaufe dein Fahrrad für 200 EUR." Alle Elemente der Willenserklärung liegen vor.',
  },
  {
    id: 'versteigerung',
    label: 'Fall 2: Versteigerung',
    activeComponents: ['handlung', 'handlungswille', 'geschaeftswille'],
    description:
      'Student S hebt bei einer Weinversteigerung die Hand, um seinen Freund zu grüßen. Er weiß nicht, dass Handzeichen als Gebote gelten. Es fehlt der Erklärungswille.',
  },
  {
    id: 'scherz',
    label: 'Scherzerklärung',
    activeComponents: ['handlung', 'handlungswille', 'erklaerungswille'],
    description:
      'A sagt scherzhaft: "Ich verkaufe dir mein Haus für 1 EUR." Er weiß, dass es als WE aufgefasst werden könnte, will aber nicht dieses Geschäft. § 118 BGB: Nichtige WE.',
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function WillenserklaerungBuilder({ className = '' }: { className?: string }) {
  const [activeComponents, setActiveComponents] = useState<Set<string>>(
    new Set(['handlung', 'handlungswille', 'erklaerungswille', 'geschaeftswille'])
  )
  const [currentScenario, setCurrentScenario] = useState<string>('normal')
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null)

  const handleScenarioChange = (id: string) => {
    setCurrentScenario(id)
    const scenario = scenarios.find((s) => s.id === id)
    if (scenario) {
      setActiveComponents(new Set(scenario.activeComponents))
    }
  }

  const toggleComponent = (id: string) => {
    setCurrentScenario('')
    setActiveComponents((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const allRequired = weComponents.filter((c) => c.required).every((c) => activeComponents.has(c.id))
  const hasErklaerungswille = activeComponents.has('erklaerungswille')
  const hasGeschaeftswille = activeComponents.has('geschaeftswille')
  const hasHandlung = activeComponents.has('handlung')
  const hasHandlungswille = activeComponents.has('handlungswille')

  const getStatus = (): { text: string; color: HighlightColor } => {
    if (!hasHandlung || !hasHandlungswille) {
      return { text: 'Keine Willenserklärung', color: 'red' }
    }
    if (!hasErklaerungswille) {
      return { text: 'Str.! WE nach h.M. wirksam, aber anfechtbar (analog § 119 I)', color: 'amber' }
    }
    if (!hasGeschaeftswille) {
      return { text: 'WE wirksam, aber anfechtbar (§ 119 I) — Scherzerklärung: § 118', color: 'amber' }
    }
    return { text: 'Wirksame Willenserklärung', color: 'green' }
  }

  const status = getStatus()
  const statusTokens = highlightColors[status.color]

  const outerComponents = weComponents.filter((c) => c.layer === 'outer')
  const innerComponents = weComponents.filter((c) => c.layer === 'inner')

  return (
    <DiagramShell
      title="Willenserklärung — Baukasten"
      subtitle="Baue eine Willenserklärung aus ihren Bestandteilen"
      className={className}
      samples={scenarios.map((s) => ({ id: s.id, label: s.label }))}
      currentSample={currentScenario}
      onSampleChange={handleScenarioChange}
      footer="Klicke auf die Bestandteile, um sie ein-/auszuschalten"
    >
      {/* Scenario description */}
      <AnimatePresence mode="wait">
        {currentScenario && (
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 rounded-lg bg-purple-900/20 border border-purple-700 text-sm text-purple-300"
          >
            {scenarios.find((s) => s.id === currentScenario)?.description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Builder */}
      <div className="space-y-4">
        {/* Outer layer */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Äußerer Tatbestand</p>
          <div className="grid gap-2">
            {outerComponents.map((comp) => {
              const isActive = activeComponents.has(comp.id)
              const t = highlightColors[comp.color]
              const isExpanded = expandedComponent === comp.id
              return (
                <div key={comp.id}>
                  <motion.button
                    onClick={() => toggleComponent(comp.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer
                      ${isActive ? `${t.highlight} ${t.border}` : 'bg-slate-800/30 border-slate-700 opacity-50'}`}
                    animate={{ scale: isActive ? 1 : 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full border-2 ${isActive ? t.solid : 'border-slate-600'}`} />
                        <span className={`font-medium ${isActive ? t.text : 'text-slate-500'}`}>
                          {comp.label}
                        </span>
                        {comp.required && (
                          <span className="text-[10px] text-red-400 font-mono">(erforderlich)</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedComponent(isExpanded ? null : comp.id)
                        }}
                        className="text-xs text-slate-500 hover:text-slate-300 px-1"
                      >
                        {isExpanded ? 'weniger' : 'mehr'}
                      </button>
                    </div>
                  </motion.button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 overflow-hidden"
                      >
                        <div className="py-2 text-sm text-slate-400">{comp.description}</div>
                        {!isActive && (
                          <div className="pb-2 text-sm text-amber-400">{comp.missingEffect}</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Inner layer */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Innerer Tatbestand</p>
          <div className="grid gap-2">
            {innerComponents.map((comp) => {
              const isActive = activeComponents.has(comp.id)
              const t = highlightColors[comp.color]
              const isExpanded = expandedComponent === comp.id
              return (
                <div key={comp.id}>
                  <motion.button
                    onClick={() => toggleComponent(comp.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer
                      ${isActive ? `${t.highlight} ${t.border}` : 'bg-slate-800/30 border-slate-700 opacity-50'}`}
                    animate={{ scale: isActive ? 1 : 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full border-2 ${isActive ? t.solid : 'border-slate-600'}`} />
                        <span className={`font-medium ${isActive ? t.text : 'text-slate-500'}`}>
                          {comp.label}
                        </span>
                        {comp.required && (
                          <span className="text-[10px] text-red-400 font-mono">(erforderlich)</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedComponent(isExpanded ? null : comp.id)
                        }}
                        className="text-xs text-slate-500 hover:text-slate-300 px-1"
                      >
                        {isExpanded ? 'weniger' : 'mehr'}
                      </button>
                    </div>
                  </motion.button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 overflow-hidden"
                      >
                        <div className="py-2 text-sm text-slate-400">{comp.description}</div>
                        {!isActive && (
                          <div className="pb-2 text-sm text-amber-400">{comp.missingEffect}</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <motion.div
        key={status.text}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-4 rounded-xl border text-center ${statusTokens.bg} ${statusTokens.border}`}
      >
        <p className={`font-semibold text-lg ${statusTokens.text}`}>{status.text}</p>
        {allRequired && hasErklaerungswille && hasGeschaeftswille && (
          <p className="text-sm text-slate-400 mt-1">
            Alle Bestandteile liegen vor — die Willenserklärung ist wirksam.
          </p>
        )}
      </motion.div>
    </DiagramShell>
  )
}
