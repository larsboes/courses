// src/content/ipdg/diagrams/CrmTypesDiagram.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { useHighlightState } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface CrmType {
  id: string
  color: HighlightColor
  label: string
  icon: string
  shortDesc: string
  fullDesc: string
  keywords: string[]
  notConfuseWith: string
}

const crmTypes: CrmType[] = [
  {
    id: 'strategic',
    color: 'purple',
    label: 'Strategisches CRM',
    icon: '🎯',
    shortDesc: 'Ziele & Planung',
    fullDesc:
      'Leitet sich aus der Unternehmensstrategie ab. Definiert welche Ziele mit welchen Kundengruppen durch welche Maßnahmen erreicht werden sollen.',
    keywords: ['Unternehmensstrategie', 'Zielgruppen', 'CLV maximieren', 'Langfristige Planung'],
    notConfuseWith: 'Nutzt KEINE BI-Methoden direkt - das ist analytisches CRM!',
  },
  {
    id: 'analytical',
    color: 'cyan',
    label: 'Analytisches CRM',
    icon: '📊',
    shortDesc: 'Datenanalyse',
    fullDesc:
      'Nutzt Business Intelligence Methoden wie Data Warehouse, Data Mining und OLAP zur Kundenanalyse und Zielgruppenidentifikation.',
    keywords: ['Data Mining', 'OLAP', 'Data Warehouse', 'Share of Wallet'],
    notConfuseWith: 'Das ist der BI-Teil des CRM!',
  },
  {
    id: 'operative',
    color: 'green',
    label: 'Operatives CRM',
    icon: '⚙️',
    shortDesc: 'Umsetzung',
    fullDesc:
      'Setzt die identifizierten Maßnahmen in automatisierten Lösungen für Marketing, Sales und Service um.',
    keywords: ['Front-Office', 'Kampagnenmanagement', 'Salesforce', 'Automatisierung'],
    notConfuseWith: 'Die praktische Umsetzung in Systemen und Prozessen.',
  },
  {
    id: 'communicative',
    color: 'amber',
    label: 'Kommunikatives CRM',
    icon: '📱',
    shortDesc: 'Multi-Channel',
    fullDesc:
      'Management aller Kommunikationskanäle (Telefon, E-Mail, Web). Synchronisierung für bidirektionale Kommunikation.',
    keywords: ['Multi-Channel', 'Telefonie', 'E-Mail', 'Social Media'],
    notConfuseWith: 'Auch bekannt als Multi-Channel Management.',
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

interface CrmTypesDiagramProps {
  className?: string
}

export function CrmTypesDiagram({ className = '' }: CrmTypesDiagramProps) {
  const highlight = useHighlightState({ items: crmTypes, defaultColor: 'blue' })

  return (
    <DiagramShell
      title="Die 4 CRM-Arten"
      className={className}
      footer="Klicke auf einen CRM-Typ für Details"
    >
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {crmTypes.map((type) => {
          const tokens = highlightColors[type.color]
          const active = highlight.isHighlighted(type.id)

          return (
            <motion.div
              key={type.id}
              className={`relative cursor-pointer rounded-xl border p-4 transition-colors ${tokens.bg} ${tokens.border} ${
                active ? 'ring-2 ring-white/60' : ''
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              {...highlight.handlers(type.id)}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <h4 className={`text-sm font-semibold ${tokens.text}`}>{type.label}</h4>
              <p className="text-xs text-slate-400 mt-1">{type.shortDesc}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {highlight.activeItem && (
          <motion.div
            key={highlight.activeItem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className={`mt-6 rounded-xl border p-5 ${
              highlightColors[highlight.activeItem.color].bg
            } ${highlightColors[highlight.activeItem.color].border}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{highlight.activeItem.icon}</span>
              <h4
                className={`font-semibold text-lg ${
                  highlightColors[highlight.activeItem.color].text
                }`}
              >
                {highlight.activeItem.label}
              </h4>
            </div>

            {/* Description */}
            <p className="text-slate-300 mb-4 leading-relaxed">
              {highlight.activeItem.fullDesc}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {highlight.activeItem.keywords.map((kw) => (
                <span
                  key={kw}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    highlightColors[highlight.activeItem!.color].solid
                  } text-white`}
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Exam tip */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm">
              <span className="font-semibold text-amber-400">Merke: </span>
              <span className="text-slate-300">
                {highlight.activeItem.notConfuseWith}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}
