// src/content/ipdg/diagrams/OrderToCashDiagram.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    id: 'order',
    label: 'Kundenauftrag',
    icon: '📝',
    color: 'bg-blue-500',
    description: 'Kunde bestellt Produkt/Dienstleistung. Auftrag wird im System erfasst.',
  },
  {
    id: 'credit',
    label: 'Kreditprüfung',
    icon: '💳',
    color: 'bg-amber-500',
    description: 'Bonität des Kunden wird geprüft. Bei Überschreitung des Kreditlimits: Sperre.',
  },
  {
    id: 'fulfillment',
    label: 'Auftragsabwicklung',
    icon: '📦',
    color: 'bg-green-500',
    description: 'Kommissionierung, Verpackung und Versand der Ware.',
  },
  {
    id: 'delivery',
    label: 'Lieferung',
    icon: '🚚',
    color: 'bg-cyan-500',
    description: 'Transport zum Kunden. Warenausgang wird gebucht.',
  },
  {
    id: 'invoice',
    label: 'Fakturierung',
    icon: '🧾',
    color: 'bg-purple-500',
    description: 'Rechnung wird erstellt. Debitor-Konto wird belastet.',
  },
  {
    id: 'payment',
    label: 'Zahlung',
    icon: '💰',
    color: 'bg-emerald-500',
    description: 'Kunde bezahlt. Forderung wird ausgeglichen. Prozess abgeschlossen.',
  },
]

export function OrderToCashDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [animationStep, setAnimationStep] = useState(0)

  const startAnimation = () => {
    setAnimationStep(0)
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Order-to-Cash Prozess</h3>
        <button
          onClick={startAnimation}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          ▶ Animation starten
        </button>
      </div>

      {/* Process Flow */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`relative cursor-pointer p-3 rounded-lg border-2 transition-all ${
                activeStep === step.id
                  ? 'border-white bg-slate-700'
                  : animationStep >= index
                  ? `border-transparent ${step.color}/30`
                  : 'border-slate-700 bg-slate-800'
              }`}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              animate={{
                scale: animationStep === index ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl mb-1 text-center">{step.icon}</div>
              <div className="text-xs text-center whitespace-nowrap">{step.label}</div>
              {animationStep >= index && (
                <motion.div
                  className={`absolute inset-0 rounded-lg ${step.color}/20`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className="mx-1 text-slate-500"
                animate={{
                  color: animationStep > index ? '#22c55e' : '#64748b',
                }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      {activeStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-slate-800 rounded-lg border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">
              {steps.find((s) => s.id === activeStep)?.icon}
            </span>
            <h4 className="font-semibold text-lg">
              {steps.find((s) => s.id === activeStep)?.label}
            </h4>
          </div>
          <p className="text-slate-400">
            {steps.find((s) => s.id === activeStep)?.description}
          </p>
        </motion.div>
      )}

      <p className="text-xs text-slate-500 mt-4 text-center">
        Klicke auf einen Schritt für Details
      </p>
    </div>
  )
}
