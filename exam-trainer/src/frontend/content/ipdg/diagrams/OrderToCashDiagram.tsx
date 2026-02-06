// src/content/ipdg/diagrams/OrderToCashDiagram.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

interface OrderToCashDiagramProps {
  className?: string
}

const steps = [
  {
    id: 'order',
    label: 'Kundenauftrag',
    icon: '📝',
    color: 'blue' as HighlightColor,
    description: 'Kunde bestellt Produkt/Dienstleistung. Auftrag wird im System erfasst.',
  },
  {
    id: 'credit',
    label: 'Kreditprüfung',
    icon: '💳',
    color: 'amber' as HighlightColor,
    description: 'Bonität des Kunden wird geprüft. Bei Überschreitung des Kreditlimits: Sperre.',
  },
  {
    id: 'fulfillment',
    label: 'Auftragsabwicklung',
    icon: '📦',
    color: 'green' as HighlightColor,
    description: 'Kommissionierung, Verpackung und Versand der Ware.',
  },
  {
    id: 'delivery',
    label: 'Lieferung',
    icon: '🚚',
    color: 'cyan' as HighlightColor,
    description: 'Transport zum Kunden. Warenausgang wird gebucht.',
  },
  {
    id: 'invoice',
    label: 'Fakturierung',
    icon: '🧾',
    color: 'purple' as HighlightColor,
    description: 'Rechnung wird erstellt. Debitor-Konto wird belastet.',
  },
  {
    id: 'payment',
    label: 'Zahlung',
    icon: '💰',
    color: 'green' as HighlightColor,
    description: 'Kunde bezahlt. Forderung wird ausgeglichen. Prozess abgeschlossen.',
  },
]

export function OrderToCashDiagram({ className = '' }: OrderToCashDiagramProps) {
  const stepper = useStepNavigator({ totalSteps: steps.length, autoPlayInterval: 1200 })
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const selectedStepData = steps.find((s) => s.id === selectedStep)
  const selectedStepIndex = steps.findIndex((s) => s.id === selectedStep)

  return (
    <DiagramShell
      title="Order-to-Cash Prozess"
      className={className}
      footer="Klicke auf einen Schritt für Details"
    >
      {/* Process Flow */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {steps.map((step, index) => {
          const isReached = index <= stepper.currentStep
          const isCurrent = index === stepper.currentStep
          const colors = highlightColors[step.color]

          return (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={`relative cursor-pointer p-3 rounded-lg border-2 transition-all ${
                  selectedStep === step.id
                    ? `border-white ${colors.bg}`
                    : isReached
                    ? `border-transparent ${colors.bg}`
                    : 'border-slate-700 bg-slate-800'
                }`}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                animate={{
                  scale: isCurrent ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl mb-1 text-center">{step.icon}</div>
                <div className="text-xs text-center whitespace-nowrap">{step.label}</div>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className="mx-1 text-slate-500"
                  animate={{
                    color: index < stepper.currentStep ? '#22c55e' : '#64748b',
                  }}
                >
                  →
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedStepData && (
          <motion.div
            key={selectedStepData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 mb-6 bg-slate-800 rounded-lg border-l-4 ${highlightColors[selectedStepData.color].border}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-sm font-bold ${highlightColors[selectedStepData.color].text}`}>
                {selectedStepIndex + 1}
              </span>
              <span className="text-2xl">{selectedStepData.icon}</span>
              <h4 className="font-semibold text-lg">{selectedStepData.label}</h4>
            </div>
            <p className="text-slate-400">{selectedStepData.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="numbers" showAutoPlay={true} />
    </DiagramShell>
  )
}
