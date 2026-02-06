// src/content/ipdg/diagrams/BiArchitectureDiagram.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator, useHighlightState } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface BiLayer {
  id: string
  color: HighlightColor
  label: string
  icon: string
  items: string[]
  description: string
}

interface BiArchitectureDiagramProps {
  className?: string
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

const layers: BiLayer[] = [
  { id: 'sources', color: 'red', label: 'Datenquellen', icon: '🗄️', items: ['ERP', 'CRM', 'Excel', 'Externe Daten'], description: 'Operative Systeme liefern Rohdaten (OLTP)' },
  { id: 'etl', color: 'amber', label: 'ETL-Prozess', icon: '🔄', items: ['Extract', 'Transform', 'Load'], description: 'Daten werden extrahiert, bereinigt, harmonisiert und geladen' },
  { id: 'warehouse', color: 'blue', label: 'Data Warehouse', icon: '🏢', items: ['Faktentabellen', 'Dimensionen', 'Sternschema'], description: 'Zentrale Datenhaltung für Analysen (strukturiert)' },
  { id: 'olap', color: 'purple', label: 'OLAP / Analyse', icon: '📊', items: ['Cubes', 'Drill-Down', 'Slice & Dice'], description: 'Multidimensionale Analyse der Daten' },
  { id: 'presentation', color: 'green', label: 'Präsentation', icon: '📈', items: ['Dashboards', 'Reports', 'KPIs'], description: 'Visualisierung für Management-Entscheidungen' },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function BiArchitectureDiagram({ className = '' }: BiArchitectureDiagramProps) {
  const stepper = useStepNavigator({ totalSteps: layers.length, autoPlayInterval: 1200 })
  const highlight = useHighlightState({ items: layers })

  return (
    <DiagramShell
      title="BI-Architektur"
      className={className}
      footer="Klicke auf eine Schicht für Details oder nutze die Navigation für den Datenfluss"
    >
      {/* Architecture Stack */}
      <div className="space-y-2">
        {layers.map((layer, index) => {
          const tokens = highlightColors[layer.color]
          const isCurrent = index === stepper.currentStep
          const isReached = index <= stepper.currentStep
          const isActive = highlight.isHighlighted(layer.id)

          return (
            <motion.div
              key={layer.id}
              className={`
                relative p-4 rounded-lg cursor-pointer border transition-colors
                ${isActive ? `${tokens.highlight} ${tokens.border} ring-1 ${tokens.border}` : isReached ? `${tokens.bg} ${tokens.border}` : `${tokens.bg} border-slate-700`}
              `}
              {...highlight.handlers(layer.id)}
              animate={{
                scale: isCurrent ? 1.02 : 1,
                boxShadow: isCurrent
                  ? '0 0 20px rgba(255,255,255,0.2)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{layer.icon}</span>
                  <div>
                    <div className={`font-medium ${tokens.text}`}>{layer.label}</div>
                    <div className="text-xs text-slate-400">{layer.description}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2 py-0.5 text-xs rounded-full ${tokens.bg} border ${tokens.border} ${tokens.text}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flow Arrow */}
              {index < layers.length - 1 && (
                <motion.div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-lg z-10 font-bold"
                  animate={{
                    color: isReached && index < stepper.currentStep
                      ? '#22c55e'
                      : isCurrent
                        ? '#3b82f6'
                        : '#475569',
                    y: isCurrent ? [0, 4, 0] : 0,
                  }}
                  transition={{
                    y: { repeat: isCurrent ? Infinity : 0, duration: 0.8 },
                    color: { duration: 0.3 },
                  }}
                >
                  ↓
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="numbers" />

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {highlight.activeItem && (
          <motion.div
            key={highlight.activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-lg border ${highlightColors[highlight.activeItem.color].bg} ${highlightColors[highlight.activeItem.color].border}`}
          >
            <h4 className={`font-medium mb-2 ${highlightColors[highlight.activeItem.color].text}`}>
              {highlight.activeItem.icon} {highlight.activeItem.label}
            </h4>
            <p className="text-sm text-slate-300 mb-3">{highlight.activeItem.description}</p>
            <div className="flex flex-wrap gap-2">
              {highlight.activeItem.items.map((item) => (
                <span
                  key={item}
                  className={`px-2 py-1 text-xs rounded-full ${highlightColors[highlight.activeItem!.color].solid} text-white`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OLTP vs OLAP Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg border ${highlightColors.green.bg} ${highlightColors.green.border}`}>
          <h4 className={`font-medium mb-2 ${highlightColors.green.text}`}>OLTP</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>&#10003; Operative Transaktionen</li>
            <li>&#10003; Schreiben & Lesen</li>
            <li>&#10003; Normalisierte DB</li>
            <li>&#10003; Aktueller Zustand</li>
          </ul>
        </div>
        <div className={`p-3 rounded-lg border ${highlightColors.purple.bg} ${highlightColors.purple.border}`}>
          <h4 className={`font-medium mb-2 ${highlightColors.purple.text}`}>OLAP</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>&#10003; Analytische Abfragen</li>
            <li>&#10003; Nur Lesen</li>
            <li>&#10003; Sternschema</li>
            <li>&#10003; Historische Daten</li>
          </ul>
        </div>
      </div>
    </DiagramShell>
  )
}
