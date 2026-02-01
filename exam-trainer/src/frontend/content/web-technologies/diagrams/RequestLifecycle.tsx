// src/content/web-technologies/diagrams/RequestLifecycle.tsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Card, Button } from '@/core/components/ui'
import type { DiagramProps } from '@/core/types/content'

interface Step {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

const steps: Step[] = [
  {
    id: 'browser',
    title: 'Browser',
    description: 'User gibt URL ein (z.B. https://api.example.com/playlists)',
    icon: '🌐',
    color: 'blue',
  },
  {
    id: 'dns',
    title: 'DNS Lookup',
    description: 'Browser fragt DNS-Server nach IP-Adresse für api.example.com',
    icon: '🔍',
    color: 'purple',
  },
  {
    id: 'tcp',
    title: 'TCP Handshake',
    description: '3-Way Handshake: SYN → SYN-ACK → ACK',
    icon: '🤝',
    color: 'cyan',
  },
  {
    id: 'tls',
    title: 'TLS Handshake',
    description: 'Verschlüsselung aushandeln, Zertifikat prüfen',
    icon: '🔒',
    color: 'amber',
  },
  {
    id: 'http-request',
    title: 'HTTP Request',
    description: 'GET /playlists HTTP/1.1 wird gesendet',
    icon: '📤',
    color: 'orange',
  },
  {
    id: 'server',
    title: 'Server Processing',
    description: 'Server verarbeitet Anfrage, greift auf Datenbank zu',
    icon: '⚙️',
    color: 'slate',
  },
  {
    id: 'http-response',
    title: 'HTTP Response',
    description: '200 OK mit JSON-Body wird zurückgesendet',
    icon: '📥',
    color: 'green',
  },
  {
    id: 'rendering',
    title: 'Browser Rendering',
    description: 'Browser parsed und zeigt die Daten an',
    icon: '🖼️',
    color: 'emerald',
  },
]

const colorVariants: Record<string, { bg: string; border: string; glow: string }> = {
  blue: {
    bg: 'bg-blue-900/50',
    border: 'border-blue-500',
    glow: 'shadow-blue-500/50',
  },
  purple: {
    bg: 'bg-purple-900/50',
    border: 'border-purple-500',
    glow: 'shadow-purple-500/50',
  },
  cyan: {
    bg: 'bg-cyan-900/50',
    border: 'border-cyan-500',
    glow: 'shadow-cyan-500/50',
  },
  amber: {
    bg: 'bg-amber-900/50',
    border: 'border-amber-500',
    glow: 'shadow-amber-500/50',
  },
  orange: {
    bg: 'bg-orange-900/50',
    border: 'border-orange-500',
    glow: 'shadow-orange-500/50',
  },
  slate: {
    bg: 'bg-slate-700/50',
    border: 'border-slate-500',
    glow: 'shadow-slate-500/50',
  },
  green: {
    bg: 'bg-green-900/50',
    border: 'border-green-500',
    glow: 'shadow-green-500/50',
  },
  emerald: {
    bg: 'bg-emerald-900/50',
    border: 'border-emerald-500',
    glow: 'shadow-emerald-500/50',
  },
}

const speedOptions = [
  { label: '0.5x', value: 4000 },
  { label: '1x', value: 2000 },
  { label: '2x', value: 1000 },
]

export function RequestLifecycle({ className = '' }: DiagramProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(2000)

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const next = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [])

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrentStep(index)
    setIsPlaying(false)
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isLast) {
      setCurrentStep(0)
      setIsPlaying(true)
    } else {
      setIsPlaying((prev) => !prev)
    }
  }, [isLast])

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      next()
    }, speed)

    return () => clearInterval(interval)
  }, [isPlaying, speed, next])

  const controlsContent = (
    <div className="flex items-center justify-between flex-wrap gap-4">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={previous}
          disabled={isFirst}
        >
          Zurueck
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : isLast ? 'Replay' : 'Play'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={next}
          disabled={isLast}
        >
          Weiter
        </Button>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">Geschwindigkeit:</span>
        <div className="flex gap-1">
          {speedOptions.map((option) => (
            <Button
              key={option.value}
              variant={speed === option.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSpeed(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button variant="ghost" size="sm" onClick={reset}>
        Reset
      </Button>
    </div>
  )

  const footerContent = (
    <div className="flex justify-center gap-2">
      {steps.map((s, index) => (
        <button
          key={s.id}
          onClick={() => goTo(index)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
            ${index === currentStep
              ? 'bg-blue-500 scale-125'
              : index < currentStep
                ? 'bg-slate-500'
                : 'bg-slate-700'
            }
          `}
          title={s.title}
        />
      ))}
    </div>
  )

  return (
    <DiagramShell
      title="Request Lifecycle"
      subtitle={`Schritt ${currentStep + 1} von ${steps.length}: ${step.title}`}
      className={className}
      actions={controlsContent}
      footer={footerContent}
    >
      <div className="space-y-6">
        {/* Horizontal Flow Diagram */}
        <div className="overflow-x-auto">
        <div className="flex items-center justify-start gap-2 min-w-max pb-4">
          {steps.map((s, index) => {
            const colors = colorVariants[s.color]
            const isActive = index === currentStep
            const isPast = index < currentStep
            const isFuture = index > currentStep

            return (
              <div key={s.id} className="flex items-center">
                {/* Step Box */}
                <motion.button
                  onClick={() => goTo(index)}
                  className={`
                    relative flex flex-col items-center justify-center
                    w-20 h-20 rounded-xl border-2 cursor-pointer
                    transition-colors
                    ${isActive ? `${colors.bg} ${colors.border}` : 'bg-slate-800 border-slate-700'}
                    ${isPast ? 'opacity-50' : ''}
                    ${isFuture ? 'opacity-30' : ''}
                  `}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    boxShadow: isActive ? `0 0 30px ${colors.glow}` : '0 0 0px transparent',
                  }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: isActive ? 1.15 : 1.05 }}
                >
                  <span className="text-2xl mb-1">{s.icon}</span>
                  <span className="text-xs text-center font-medium leading-tight px-1">
                    {s.title}
                  </span>

                  {/* Step number badge */}
                  <motion.div
                    className={`
                      absolute -top-2 -right-2 w-5 h-5 rounded-full
                      flex items-center justify-center text-xs font-bold
                      ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'}
                    `}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.button>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="flex items-center mx-1"
                    animate={{
                      opacity: index < currentStep ? 0.3 : index === currentStep ? 1 : 0.2,
                    }}
                  >
                    <motion.svg
                      width="40"
                      height="20"
                      viewBox="0 0 40 20"
                      className="text-slate-500"
                    >
                      <motion.line
                        x1="0"
                        y1="10"
                        x2="28"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                          stroke: index === currentStep ? '#3b82f6' : 'currentColor',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.polygon
                        points="28,5 40,10 28,15"
                        fill="currentColor"
                        animate={{
                          fill: index === currentStep ? '#3b82f6' : 'currentColor',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.svg>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Timeline Progress Bar */}
        <div className="relative mt-4 pt-4 border-t border-slate-700">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Start</span>
            <span>Schritt {currentStep + 1} / {steps.length}</span>
            <span>Ende</span>
          </div>
        </div>
        </div>

        {/* Step Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`
                    flex items-center justify-center w-16 h-16 rounded-xl
                    ${colorVariants[step.color].bg} ${colorVariants[step.color].border} border-2
                  `}
                >
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-400 mb-1">
                    Schritt {currentStep + 1}: {step.title}
                  </div>
                  <div className="text-lg font-medium text-slate-100 mb-2">
                    {step.title}
                  </div>
                  <div className="text-slate-400">
                    {step.description}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </DiagramShell>
  )
}
