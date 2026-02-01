// src/content/ipdg/diagrams/ProcessFlowBuilder.tsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Button } from '@/core/components/ui/Button'
import { Card } from '@/core/components/ui/Card'
import { DiagramShell } from '@/core/components/diagrams'

interface ProcessStep {
  id: string
  label: string
  icon: string
  description: string
}

interface ProcessConfig {
  id: string
  name: string
  description: string
  steps: ProcessStep[]
}

const processes: ProcessConfig[] = [
  {
    id: 'otc',
    name: 'Order-to-Cash (OTC)',
    description: 'Vom Kundenauftrag bis zur Zahlung - der Vertriebsprozess',
    steps: [
      {
        id: 'order',
        label: 'Kundenauftrag',
        icon: '📝',
        description: 'Kunde bestellt Produkt/Dienstleistung',
      },
      {
        id: 'delivery',
        label: 'Lieferung',
        icon: '🚚',
        description: 'Ware wird an Kunden versendet',
      },
      {
        id: 'invoice',
        label: 'Faktura',
        icon: '🧾',
        description: 'Rechnung wird erstellt',
      },
      {
        id: 'payment',
        label: 'Zahlung',
        icon: '💰',
        description: 'Kunde bezahlt die Rechnung',
      },
    ],
  },
  {
    id: 'p2p',
    name: 'Procure-to-Pay (P2P)',
    description: 'Von der Bedarfsanforderung bis zur Bezahlung - der Beschaffungsprozess',
    steps: [
      {
        id: 'requisition',
        label: 'Bedarfsanforderung',
        icon: '📋',
        description: 'Bedarf wird im System erfasst (BANF)',
      },
      {
        id: 'order',
        label: 'Bestellung',
        icon: '📦',
        description: 'Bestellung wird beim Lieferanten aufgegeben',
      },
      {
        id: 'goods-receipt',
        label: 'Wareneingang',
        icon: '🏭',
        description: 'Ware wird angenommen und geprüft',
      },
      {
        id: 'invoice-verification',
        label: 'Rechnungsprüfung',
        icon: '🔍',
        description: 'Rechnung wird mit Bestellung/Lieferung abgeglichen',
      },
      {
        id: 'payment',
        label: 'Zahlung',
        icon: '💳',
        description: 'Lieferant wird bezahlt',
      },
    ],
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface DraggableStepProps {
  step: ProcessStep
  index: number
  isCorrect: boolean | null
  showValidation: boolean
}

function DraggableStep({ step, isCorrect, showValidation }: DraggableStepProps) {
  return (
    <motion.div
      className={`
        p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing
        transition-colors select-none
        ${
          showValidation
            ? isCorrect
              ? 'border-green-500 bg-green-900/30'
              : 'border-red-500 bg-red-900/30'
            : 'border-slate-600 bg-slate-800 hover:border-slate-500'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{step.icon}</span>
        <div>
          <div className="font-medium text-slate-100">{step.label}</div>
          <div className="text-xs text-slate-400">{step.description}</div>
        </div>
        {showValidation && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-xl"
          >
            {isCorrect ? '✓' : '✗'}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

interface ProcessFlowBuilderProps {
  className?: string
}

export function ProcessFlowBuilder({ className = '' }: ProcessFlowBuilderProps) {
  const [selectedProcess, setSelectedProcess] = useState<ProcessConfig | null>(null)
  const [userOrder, setUserOrder] = useState<ProcessStep[]>([])
  const [showValidation, setShowValidation] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)

  const startProcess = useCallback((process: ProcessConfig) => {
    setSelectedProcess(process)
    setUserOrder(shuffleArray([...process.steps]))
    setShowValidation(false)
    setShowHint(false)
    setAttempts(0)
    setCompleted(false)
  }, [])

  const validateOrder = useCallback(() => {
    if (!selectedProcess) return

    setShowValidation(true)
    setAttempts((prev) => prev + 1)

    const isCorrect = userOrder.every(
      (step, index) => step.id === selectedProcess.steps[index].id
    )

    if (isCorrect) {
      setCompleted(true)
    }
  }, [selectedProcess, userOrder])

  const getNextHint = useCallback(() => {
    if (!selectedProcess) return null

    for (let i = 0; i < userOrder.length; i++) {
      if (userOrder[i].id !== selectedProcess.steps[i].id) {
        return {
          position: i + 1,
          correctStep: selectedProcess.steps[i],
        }
      }
    }
    return null
  }, [selectedProcess, userOrder])

  const resetExercise = useCallback(() => {
    if (selectedProcess) {
      setUserOrder(shuffleArray([...selectedProcess.steps]))
      setShowValidation(false)
      setShowHint(false)
    }
  }, [selectedProcess])

  const goBack = useCallback(() => {
    setSelectedProcess(null)
    setUserOrder([])
    setShowValidation(false)
    setShowHint(false)
    setAttempts(0)
    setCompleted(false)
  }, [])

  // Process Selection View
  if (!selectedProcess) {
    return (
      <DiagramShell
        title="Process Flow Builder"
        subtitle="Ordne die Prozessschritte in der richtigen Reihenfolge an."
        className={className}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {processes.map((process) => (
            <Card
              key={process.id}
              hover
              className="p-6"
              onClick={() => startProcess(process)}
            >
              <h4 className="text-lg font-semibold text-slate-100 mb-2">{process.name}</h4>
              <p className="text-sm text-slate-400 mb-4">{process.description}</p>
              <div className="flex flex-wrap gap-2">
                {process.steps.map((step, index) => (
                  <span
                    key={step.id}
                    className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
                  >
                    {index + 1}. {step.icon}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </DiagramShell>
    )
  }

  const hint = showHint ? getNextHint() : null
  const correctCount = userOrder.filter(
    (step, index) => step.id === selectedProcess.steps[index].id
  ).length

  // Exercise View
  return (
    <DiagramShell
      title={selectedProcess.name}
      subtitle="Ziehe die Blöcke in die richtige Reihenfolge."
      className={className}
      actions={
        <>
          <button
            onClick={goBack}
            className="text-sm text-slate-400 hover:text-slate-200 flex items-center gap-1"
          >
            <span>←</span> Zurück
          </button>
          <div className="text-sm text-slate-400">
            Versuche: <span className="text-slate-200 font-medium">{attempts}</span>
          </div>
        </>
      }
    >

      {/* Sortable Steps */}
      <div className="mb-6">
        <Reorder.Group
          axis="y"
          values={userOrder}
          onReorder={(newOrder) => {
            if (!completed) {
              setUserOrder(newOrder)
              setShowValidation(false)
              setShowHint(false)
            }
          }}
          className="space-y-2"
        >
          {userOrder.map((step, index) => {
            const isCorrect =
              showValidation && step.id === selectedProcess.steps[index].id

            return (
              <Reorder.Item
                key={step.id}
                value={step}
                dragListener={!completed}
              >
                <DraggableStep
                  step={step}
                  index={index}
                  isCorrect={isCorrect}
                  showValidation={showValidation}
                />
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </div>

      {/* Hint System */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-amber-900/30 border border-amber-600 rounded-lg"
          >
            <div className="flex items-center gap-2 text-amber-300">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-medium">Hinweis</p>
                <p className="text-sm text-amber-200">
                  Position {hint.position} sollte{' '}
                  <strong>
                    {hint.correctStep.icon} {hint.correctStep.label}
                  </strong>{' '}
                  sein.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Message */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-4 p-4 bg-green-900/30 border border-green-500 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="text-3xl"
              >
                🎉
              </motion.span>
              <div>
                <p className="font-semibold text-green-300">Perfekt!</p>
                <p className="text-sm text-green-200">
                  Du hast den {selectedProcess.name} Prozess korrekt sortiert
                  {attempts === 1 ? ' beim ersten Versuch!' : ` in ${attempts} Versuchen.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation Progress */}
      {showValidation && !completed && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Fortschritt</span>
            <span>
              {correctCount}/{userOrder.length} richtig
            </span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(correctCount / userOrder.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {!completed && (
          <>
            <Button onClick={validateOrder}>Überprüfen</Button>
            {showValidation && !completed && (
              <Button
                variant="secondary"
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                💡 Hinweis anzeigen
              </Button>
            )}
            <Button variant="ghost" onClick={resetExercise}>
              Neu mischen
            </Button>
          </>
        )}
        {completed && (
          <>
            <Button onClick={goBack}>Anderen Prozess wählen</Button>
            <Button variant="secondary" onClick={resetExercise}>
              Nochmal versuchen
            </Button>
          </>
        )}
      </div>

      {/* Correct Order Reference (only after completion) */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-slate-800/50 rounded-lg"
          >
            <h4 className="text-sm font-medium text-slate-400 mb-3">
              Korrekte Reihenfolge:
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {selectedProcess.steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-700 rounded text-sm">
                    <span>{step.icon}</span>
                    <span className="text-slate-200">{step.label}</span>
                  </div>
                  {index < selectedProcess.steps.length - 1 && (
                    <span className="mx-2 text-slate-500">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}
