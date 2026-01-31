// src/content/ipdg/diagrams/CrmTypesDiagram.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const crmTypes = [
  {
    id: 'strategic',
    label: 'Strategisches CRM',
    icon: '🎯',
    color: 'from-indigo-500 to-indigo-700',
    shortDesc: 'Ziele & Planung',
    fullDesc: 'Leitet sich aus der Unternehmensstrategie ab. Definiert welche Ziele mit welchen Kundengruppen durch welche Maßnahmen erreicht werden sollen.',
    keywords: ['Unternehmensstrategie', 'Zielgruppen', 'CLV maximieren', 'Langfristige Planung'],
    notConfuseWith: 'Nutzt KEINE BI-Methoden direkt - das ist analytisches CRM!',
  },
  {
    id: 'analytical',
    label: 'Analytisches CRM',
    icon: '📊',
    color: 'from-cyan-500 to-cyan-700',
    shortDesc: 'Datenanalyse',
    fullDesc: 'Nutzt Business Intelligence Methoden wie Data Warehouse, Data Mining und OLAP zur Kundenanalyse und Zielgruppenidentifikation.',
    keywords: ['Data Mining', 'OLAP', 'Data Warehouse', 'Share of Wallet'],
    notConfuseWith: 'Das ist der BI-Teil des CRM!',
  },
  {
    id: 'operative',
    label: 'Operatives CRM',
    icon: '⚙️',
    color: 'from-green-500 to-green-700',
    shortDesc: 'Umsetzung',
    fullDesc: 'Setzt die identifizierten Maßnahmen in automatisierten Lösungen für Marketing, Sales und Service um.',
    keywords: ['Front-Office', 'Kampagnenmanagement', 'Salesforce', 'Automatisierung'],
    notConfuseWith: 'Die praktische Umsetzung in Systemen und Prozessen.',
  },
  {
    id: 'communicative',
    label: 'Kommunikatives CRM',
    icon: '📱',
    color: 'from-amber-500 to-amber-700',
    shortDesc: 'Multi-Channel',
    fullDesc: 'Management aller Kommunikationskanäle (Telefon, E-Mail, Web). Synchronisierung für bidirektionale Kommunikation.',
    keywords: ['Multi-Channel', 'Telefonie', 'E-Mail', 'Social Media'],
    notConfuseWith: 'Auch bekannt als Multi-Channel Management.',
  },
]

export function CrmTypesDiagram() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
        Die 4 CRM-Arten
      </h3>

      {/* Circular Layout */}
      <div className="relative w-full max-w-md mx-auto aspect-square">
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600">
          <div className="text-center">
            <div className="text-2xl">👥</div>
            <div className="text-xs text-slate-400">CRM</div>
          </div>
        </div>

        {/* CRM Type Nodes */}
        {crmTypes.map((type, index) => {
          const angle = (index * 90 - 45) * (Math.PI / 180)
          const radius = 120
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={type.id}
              className={`absolute w-24 cursor-pointer`}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${type.color} ${
                  selectedType === type.id ? 'ring-2 ring-white' : ''
                }`}
              >
                <div className="text-2xl text-center">{type.icon}</div>
                <div className="text-xs text-center text-white font-medium mt-1">
                  {type.shortDesc}
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {crmTypes.map((type, index) => {
            const angle = (index * 90 - 45) * (Math.PI / 180)
            const radius = 70
            const x = Math.cos(angle) * radius + 200
            const y = Math.sin(angle) * radius + 200

            return (
              <line
                key={type.id}
                x1="50%"
                y1="50%"
                x2={x}
                y2={y}
                stroke={selectedType === type.id ? '#fff' : '#475569'}
                strokeWidth="2"
                strokeDasharray="4"
              />
            )
          })}
        </svg>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700"
          >
            {(() => {
              const type = crmTypes.find((t) => t.id === selectedType)!
              return (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{type.icon}</span>
                    <h4 className="font-semibold text-lg">{type.label}</h4>
                  </div>
                  <p className="text-slate-300 mb-3">{type.fullDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {type.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-1 text-xs bg-slate-700 rounded"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="p-2 bg-amber-900/30 rounded border border-amber-800 text-sm">
                    <span className="text-amber-400">💡 Merke: </span>
                    <span className="text-slate-300">{type.notConfuseWith}</span>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Klicke auf einen CRM-Typ für Details
      </p>
    </div>
  )
}
