// src/content/ipdg/diagrams/ErpModuleMap.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'

interface ModuleData {
  id: string
  label: string
  fullName: string
  color: string
  borderColor: string
  textColor: string
  glowColor: string
  category: 'finance' | 'logistics' | 'hr'
  functions: string[]
  integrations: string[]
  integrationDetails: Record<string, string>
}

const modules: ModuleData[] = [
  {
    id: 'fi',
    label: 'FI',
    fullName: 'Finanzwesen',
    color: 'bg-emerald-900/60',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-300',
    glowColor: 'shadow-emerald-500/50',
    category: 'finance',
    functions: [
      'Hauptbuchhaltung (General Ledger)',
      'Debitorenbuchhaltung (Forderungen)',
      'Kreditorenbuchhaltung (Verbindlichkeiten)',
      'Anlagenbuchhaltung',
      'Bankbuchhaltung',
    ],
    integrations: ['co', 'mm', 'sd'],
    integrationDetails: {
      co: 'Kostenrechnung erhält Buchungen, Primärkostenverrechnung',
      mm: 'Wareneingang erzeugt Verbindlichkeit, Rechnungsprüfung',
      sd: 'Faktura erzeugt Forderung, Zahlungseingänge',
    },
  },
  {
    id: 'co',
    label: 'CO',
    fullName: 'Controlling',
    color: 'bg-teal-900/60',
    borderColor: 'border-teal-500',
    textColor: 'text-teal-300',
    glowColor: 'shadow-teal-500/50',
    category: 'finance',
    functions: [
      'Kostenstellenrechnung',
      'Profit Center Rechnung',
      'Produktkostenrechnung',
      'Ergebnis- und Marktsegmentrechnung',
      'Innenaufträge',
    ],
    integrations: ['fi', 'pp', 'sd'],
    integrationDetails: {
      fi: 'Übernahme der Primärkosten aus FI-Buchungen',
      pp: 'Kalkulation der Herstellkosten, Istkosten',
      sd: 'Deckungsbeitragsrechnung, Ergebnisrechnung',
    },
  },
  {
    id: 'mm',
    label: 'MM',
    fullName: 'Materialwirtschaft',
    color: 'bg-blue-900/60',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-300',
    glowColor: 'shadow-blue-500/50',
    category: 'logistics',
    functions: [
      'Einkauf (Bestellanforderung, Bestellung)',
      'Bestandsführung',
      'Lagerverwaltung',
      'Rechnungsprüfung',
      'Materialstamm',
    ],
    integrations: ['fi', 'pp', 'sd'],
    integrationDetails: {
      fi: 'Wareneingang bucht Verbindlichkeit, Bestandsbewertung',
      pp: 'Materialbereitstellung für Fertigung, Bedarfsplanung',
      sd: 'Verfügbarkeitsprüfung, Lieferschein aus Lager',
    },
  },
  {
    id: 'sd',
    label: 'SD',
    fullName: 'Vertrieb',
    color: 'bg-violet-900/60',
    borderColor: 'border-violet-500',
    textColor: 'text-violet-300',
    glowColor: 'shadow-violet-500/50',
    category: 'logistics',
    functions: [
      'Kundenauftragsabwicklung',
      'Preisfindung & Konditionen',
      'Versand & Transport',
      'Fakturierung',
      'Kundenstamm',
    ],
    integrations: ['fi', 'co', 'mm', 'pp'],
    integrationDetails: {
      fi: 'Faktura erzeugt Forderung im Debitorenbuch',
      co: 'Erlöse fließen in Ergebnisrechnung',
      mm: 'Verfügbarkeitsprüfung, Kommissionierung',
      pp: 'Kundenauftrag löst Fertigung aus (MTO)',
    },
  },
  {
    id: 'pp',
    label: 'PP',
    fullName: 'Produktionsplanung',
    color: 'bg-amber-900/60',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-300',
    glowColor: 'shadow-amber-500/50',
    category: 'logistics',
    functions: [
      'Absatz- und Produktionsplanung (SOP)',
      'Materialbedarfsplanung (MRP)',
      'Fertigungsaufträge',
      'Kapazitätsplanung',
      'Rückmeldungen & Wareneingang',
    ],
    integrations: ['co', 'mm', 'sd'],
    integrationDetails: {
      co: 'Istkosten, Fertigungskostenstellen, Kalkulation',
      mm: 'Planaufträge erzeugen Bestellanforderungen',
      sd: 'Kundeneinzelauftrag triggert Planauftrag',
    },
  },
  {
    id: 'hr',
    label: 'HR/HCM',
    fullName: 'Human Capital Management',
    color: 'bg-rose-900/60',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-300',
    glowColor: 'shadow-rose-500/50',
    category: 'hr',
    functions: [
      'Personaladministration',
      'Zeitwirtschaft',
      'Personalabrechnung',
      'Organisationsmanagement',
      'Personalentwicklung',
    ],
    integrations: ['fi', 'co'],
    integrationDetails: {
      fi: 'Lohn- und Gehaltsbuchungen, Sozialabgaben',
      co: 'Personalkosten auf Kostenstellen',
    },
  },
]

// Category colors for legends
const categoryInfo = {
  finance: { label: 'Finanzen', color: 'bg-emerald-600' },
  logistics: { label: 'Logistik', color: 'bg-blue-600' },
  hr: { label: 'Personal', color: 'bg-rose-600' },
}

// Hexagonal positions (center + 5 around in a hex pattern, with HR slightly offset)
const hexPositions: Record<string, { x: number; y: number }> = {
  fi: { x: 50, y: 20 },      // Top
  co: { x: 80, y: 35 },      // Top-right
  sd: { x: 80, y: 65 },      // Bottom-right
  pp: { x: 50, y: 80 },      // Bottom
  mm: { x: 20, y: 65 },      // Bottom-left
  hr: { x: 20, y: 35 },      // Top-left
}

interface ErpModuleMapProps {
  className?: string
}

export function ErpModuleMap({ className = '' }: ErpModuleMapProps = {}) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)

  // Calculate which connections to highlight
  const activeConnections = useMemo(() => {
    if (!selectedModule && !hoveredModule) return new Set<string>()
    const activeId = selectedModule || hoveredModule
    const module = modules.find((m) => m.id === activeId)
    if (!module) return new Set<string>()

    const connections = new Set<string>()
    module.integrations.forEach((targetId) => {
      // Create a consistent connection key (alphabetically sorted)
      const key = [activeId, targetId].sort().join('-')
      connections.add(key)
    })
    return connections
  }, [selectedModule, hoveredModule])

  // Generate all unique connections
  const allConnections = useMemo(() => {
    const connections: { from: string; to: string; key: string }[] = []
    const seen = new Set<string>()

    modules.forEach((module) => {
      module.integrations.forEach((targetId) => {
        const key = [module.id, targetId].sort().join('-')
        if (!seen.has(key)) {
          seen.add(key)
          connections.push({ from: module.id, to: targetId, key })
        }
      })
    })
    return connections
  }, [])

  const selectedModuleData = modules.find((m) => m.id === selectedModule)

  return (
    <DiagramShell
      title="SAP ERP Module Map"
      className={className}
      footer="Klicke auf ein Modul um Details und Integrationen zu sehen"
    >
      {/* Legend */}
      <div className="flex justify-center gap-4 mb-4">
        {Object.entries(categoryInfo).map(([key, info]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${info.color}`} />
            <span className="text-xs text-slate-400">{info.label}</span>
          </div>
        ))}
      </div>

      {/* Hexagonal Module Layout */}
      <div className="relative w-full max-w-lg mx-auto aspect-square">
        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {allConnections.map(({ from, to, key }) => {
            const fromPos = hexPositions[from]
            const toPos = hexPositions[to]
            const isActive = activeConnections.has(key)

            return (
              <motion.line
                key={key}
                x1={`${fromPos.x}%`}
                y1={`${fromPos.y}%`}
                x2={`${toPos.x}%`}
                y2={`${toPos.y}%`}
                stroke={isActive ? '#60a5fa' : '#334155'}
                strokeWidth={isActive ? 3 : 1.5}
                strokeDasharray={isActive ? '0' : '4'}
                filter={isActive ? 'url(#glow)' : undefined}
                initial={false}
                animate={{
                  stroke: isActive ? '#60a5fa' : '#334155',
                  strokeWidth: isActive ? 3 : 1.5,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            )
          })}
        </svg>

        {/* Central SAP Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-700/80 rounded-xl flex items-center justify-center border-2 border-slate-500 z-10">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-200">SAP</div>
            <div className="text-[10px] text-slate-400">S/4HANA</div>
          </div>
        </div>

        {/* Module Hexagons */}
        {modules.map((module) => {
          const pos = hexPositions[module.id]
          const isSelected = selectedModule === module.id
          const isHovered = hoveredModule === module.id
          const isConnected =
            selectedModule &&
            modules
              .find((m) => m.id === selectedModule)
              ?.integrations.includes(module.id)

          return (
            <motion.div
              key={module.id}
              className="absolute"
              style={{
                top: `${pos.y}%`,
                left: `${pos.x}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: modules.indexOf(module) * 0.1,
              }}
            >
              <motion.div
                className={`
                  relative w-20 h-20 cursor-pointer
                  flex items-center justify-center
                  rounded-2xl border-2 transition-colors
                  ${module.color} ${module.borderColor}
                  ${isSelected ? `ring-2 ring-white shadow-lg ${module.glowColor}` : ''}
                  ${isConnected ? 'ring-2 ring-blue-400' : ''}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow:
                    isSelected || isHovered
                      ? '0 0 20px rgba(255,255,255,0.2)'
                      : 'none',
                }}
                onClick={() =>
                  setSelectedModule(isSelected ? null : module.id)
                }
                onHoverStart={() => setHoveredModule(module.id)}
                onHoverEnd={() => setHoveredModule(null)}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${module.textColor}`}>
                    {module.label}
                  </div>
                  <div className="text-[10px] text-slate-400 px-1 truncate max-w-[76px]">
                    {module.fullName}
                  </div>
                </div>

                {/* Integration count badge */}
                <div
                  className={`
                    absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                    flex items-center justify-center text-[10px] font-medium
                    bg-slate-700 border border-slate-500 text-slate-300
                  `}
                >
                  {module.integrations.length}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedModuleData && (
          <motion.div
            key={selectedModuleData.id}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={`p-4 rounded-lg border-2 ${selectedModuleData.color} ${selectedModuleData.borderColor}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4
                    className={`text-xl font-bold ${selectedModuleData.textColor}`}
                  >
                    {selectedModuleData.label} - {selectedModuleData.fullName}
                  </h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${categoryInfo[selectedModuleData.category].color}`}
                  >
                    {categoryInfo[selectedModuleData.category].label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Two-column layout */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Key Functions */}
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h5 className="text-sm font-semibold text-slate-300 mb-2">
                    Kernfunktionen
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedModuleData.functions.map((func) => (
                      <li
                        key={func}
                        className="flex items-start gap-2 text-sm text-slate-400"
                      >
                        <span className={`mt-1 ${selectedModuleData.textColor}`}>
                          *
                        </span>
                        {func}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Integration Points */}
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h5 className="text-sm font-semibold text-slate-300 mb-2">
                    Integrationen
                  </h5>
                  <div className="space-y-2">
                    {selectedModuleData.integrations.map((targetId) => {
                      const target = modules.find((m) => m.id === targetId)
                      if (!target) return null

                      return (
                        <motion.div
                          key={targetId}
                          className={`p-2 rounded border cursor-pointer transition-colors
                            ${target.color} border-slate-600 hover:border-slate-400`}
                          onClick={() => setSelectedModule(targetId)}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-bold ${target.textColor}`}
                            >
                              {target.label}
                            </span>
                            <span className="text-xs text-slate-500">
                              {target.fullName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            {selectedModuleData.integrationDetails[targetId]}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}
