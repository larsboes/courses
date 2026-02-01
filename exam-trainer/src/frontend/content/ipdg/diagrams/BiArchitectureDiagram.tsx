// src/content/ipdg/diagrams/BiArchitectureDiagram.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'

interface BiArchitectureDiagramProps {
  className?: string
}

const layers = [
  {
    id: 'sources',
    label: 'Datenquellen',
    icon: '🗄️',
    color: 'bg-slate-600',
    items: ['ERP', 'CRM', 'Excel', 'Externe Daten'],
    description: 'Operative Systeme liefern Rohdaten (OLTP)',
  },
  {
    id: 'etl',
    label: 'ETL-Prozess',
    icon: '🔄',
    color: 'bg-amber-600',
    items: ['Extract', 'Transform', 'Load'],
    description: 'Daten werden extrahiert, bereinigt, harmonisiert und geladen',
  },
  {
    id: 'warehouse',
    label: 'Data Warehouse',
    icon: '🏢',
    color: 'bg-blue-600',
    items: ['Faktentabellen', 'Dimensionen', 'Sternschema'],
    description: 'Zentrale Datenhaltung für Analysen (strukturiert)',
  },
  {
    id: 'olap',
    label: 'OLAP / Analyse',
    icon: '📊',
    color: 'bg-purple-600',
    items: ['Cubes', 'Drill-Down', 'Slice & Dice'],
    description: 'Multidimensionale Analyse der Daten',
  },
  {
    id: 'presentation',
    label: 'Präsentation',
    icon: '📈',
    color: 'bg-green-600',
    items: ['Dashboards', 'Reports', 'KPIs'],
    description: 'Visualisierung für Management-Entscheidungen',
  },
]

export function BiArchitectureDiagram({ className = '' }: BiArchitectureDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)
  const [flowStep, setFlowStep] = useState(-1)

  const startFlow = () => {
    setAnimating(true)
    setFlowStep(0)

    const interval = setInterval(() => {
      setFlowStep((prev) => {
        if (prev >= layers.length - 1) {
          clearInterval(interval)
          setAnimating(false)
          return -1
        }
        return prev + 1
      })
    }, 1200)
  }

  return (
    <DiagramShell
      title="BI-Architektur"
      className={className}
      actions={
        <button
          onClick={startFlow}
          disabled={animating}
          className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded transition-colors"
        >
          Datenfluss zeigen
        </button>
      }
      footer="Klicke auf eine Schicht für Details oder starte den Datenfluss"
    >
      {/* Architecture Stack */}
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className={`relative p-4 rounded-lg cursor-pointer transition-all ${
              activeLayer === layer.id
                ? 'ring-2 ring-white'
                : ''
            } ${layer.color}`}
            onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
            animate={{
              scale: flowStep === index ? 1.02 : 1,
              boxShadow: flowStep === index ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{layer.icon}</span>
                <div>
                  <div className="font-medium">{layer.label}</div>
                  <div className="text-xs text-white/70">{layer.description}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs bg-black/20 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Flow Arrow */}
            {index < layers.length - 1 && (
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xl z-10"
                animate={{
                  color: flowStep === index ? '#22c55e' : '#64748b',
                  y: flowStep === index ? [0, 5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                ↓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* OLTP vs OLAP Comparison */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
          <h4 className="font-medium text-green-300 mb-2">OLTP</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>* Operative Transaktionen</li>
            <li>* Schreiben & Lesen</li>
            <li>* Normalisierte DB</li>
            <li>* Aktueller Zustand</li>
          </ul>
        </div>
        <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
          <h4 className="font-medium text-purple-300 mb-2">OLAP</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>* Analytische Abfragen</li>
            <li>* Nur Lesen</li>
            <li>* Sternschema</li>
            <li>* Historische Daten</li>
          </ul>
        </div>
      </div>
    </DiagramShell>
  )
}
