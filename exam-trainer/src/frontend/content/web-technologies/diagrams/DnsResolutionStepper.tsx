// src/content/web-technologies/diagrams/DnsResolutionStepper.tsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator, ChallengeBanner, ChallengeResult } from '@/core/components/diagrams'
import { useStepNavigator, useChallengeMode } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'
import type { Challenge } from '@/core/hooks'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface DnsStep {
  id: string
  server: string
  label: string
  description: string
  query: string
  response: string
  recordType: string
  /** Position in SVG (percentage) */
  x: number
  y: number
}

interface DnsPreset {
  id: string
  label: string
  domain: string
  ip: string
  steps: DnsStep[]
}

interface DnsChallenge extends Challenge {
  /** Step index where the answer applies */
  stepIndex: number
  correctRecordType: string
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

function makeSteps(domain: string, ip: string): DnsStep[] {
  const parts = domain.split('.')
  const tld = parts[parts.length - 1]
  const sld = parts.slice(-2).join('.')

  return [
    {
      id: 'browser-cache',
      server: 'Browser',
      label: 'Browser Cache',
      description: `Browser prueft lokalen DNS-Cache. Wurde ${domain} kuerzlich aufgeloest? Falls ja: fertig!`,
      query: `Lookup: ${domain}`,
      response: 'Cache Miss - weiter zum OS',
      recordType: 'Cache',
      x: 10,
      y: 80,
    },
    {
      id: 'os-resolver',
      server: 'Betriebssystem',
      label: 'OS Resolver',
      description: `OS prueft /etc/hosts und eigenen DNS-Cache. Falls nicht gefunden, wird der konfigurierte DNS-Resolver gefragt.`,
      query: `Lookup: ${domain}`,
      response: 'Nicht gefunden - frage Recursive Resolver',
      recordType: 'Cache / hosts',
      x: 25,
      y: 80,
    },
    {
      id: 'recursive-resolver',
      server: 'Recursive Resolver',
      label: 'Recursive Resolver (ISP)',
      description: `Der rekursive Resolver (oft vom ISP oder z.B. 8.8.8.8) uebernimmt die Aufloesungsarbeit. Er fragt nacheinander die DNS-Hierarchie ab.`,
      query: `Query: ${domain} (Type A)`,
      response: `Frage Root Server nach .${tld}`,
      recordType: 'Referral',
      x: 45,
      y: 80,
    },
    {
      id: 'root-server',
      server: 'Root Server',
      label: 'Root DNS Server',
      description: `Einer der 13 Root-Server (a.root-servers.net bis m.root-servers.net). Kennt die TLD-Server fuer .${tld}`,
      query: `Wer ist zustaendig fuer .${tld}?`,
      response: `Referral: .${tld} TLD-Server ist ns1.nic.${tld}`,
      recordType: 'NS (Referral)',
      x: 50,
      y: 15,
    },
    {
      id: 'tld-server',
      server: `TLD Server (.${tld})`,
      label: `TLD Server (.${tld})`,
      description: `Der TLD-Server fuer .${tld} kennt die autoritativen Nameserver fuer ${sld}.`,
      query: `Wer ist zustaendig fuer ${sld}?`,
      response: `Referral: Autoritativer NS ist ns1.${sld}`,
      recordType: 'NS (Referral)',
      x: 70,
      y: 35,
    },
    {
      id: 'authoritative-ns',
      server: `Autoritativer NS`,
      label: `Autoritativer Nameserver (${sld})`,
      description: `Der autoritative Nameserver hat die tatsaechlichen DNS-Records fuer ${domain}. Er antwortet mit der IP-Adresse.`,
      query: `A Record fuer ${domain}?`,
      response: `A ${domain} → ${ip} (TTL: 3600)`,
      recordType: 'A Record',
      x: 90,
      y: 55,
    },
  ]
}

const presets: DnsPreset[] = [
  {
    id: 'playlist-app',
    label: 'playlist-app.example.com',
    domain: 'playlist-app.example.com',
    ip: '93.184.216.34',
    steps: makeSteps('playlist-app.example.com', '93.184.216.34'),
  },
  {
    id: 'api-server',
    label: 'api.myservice.de',
    domain: 'api.myservice.de',
    ip: '185.12.64.100',
    steps: makeSteps('api.myservice.de', '185.12.64.100'),
  },
  {
    id: 'cdn',
    label: 'cdn.webapp.io',
    domain: 'cdn.webapp.io',
    ip: '104.26.10.78',
    steps: makeSteps('cdn.webapp.io', '104.26.10.78'),
  },
]

const dnsChallenges: DnsChallenge[] = [
  {
    id: 'record-type-root',
    title: 'Challenge 1: Root Server',
    description: 'Welchen Record-Typ gibt der Root Server zurueck? Klicke auf den richtigen Schritt.',
    targetValue: 'NS (Referral)',
    stepIndex: 3,
    correctRecordType: 'NS (Referral)',
  },
  {
    id: 'record-type-auth',
    title: 'Challenge 2: Autoritativer NS',
    description: 'Welchen Record-Typ gibt der autoritative Nameserver zurueck?',
    targetValue: 'A Record',
    stepIndex: 5,
    correctRecordType: 'A Record',
  },
  {
    id: 'record-type-tld',
    title: 'Challenge 3: TLD Server',
    description: 'Was antwortet der TLD-Server? Welcher Record-Typ?',
    targetValue: 'NS (Referral)',
    stepIndex: 4,
    correctRecordType: 'NS (Referral)',
  },
]

// ─────────────────────────────────────────────────
// SVG Server Icons
// ─────────────────────────────────────────────────

const serverColors: Record<string, { fill: string; stroke: string; text: string }> = {
  'browser-cache': { fill: '#1e3a5f', stroke: '#3b82f6', text: highlightColors.blue.text },
  'os-resolver': { fill: '#1e3a5f', stroke: '#3b82f6', text: highlightColors.blue.text },
  'recursive-resolver': { fill: '#1a3326', stroke: '#22c55e', text: highlightColors.green.text },
  'root-server': { fill: '#3b1a3e', stroke: '#a855f7', text: highlightColors.purple.text },
  'tld-server': { fill: '#3b2a10', stroke: '#f59e0b', text: highlightColors.amber.text },
  'authoritative-ns': { fill: '#0e3333', stroke: '#06b6d4', text: highlightColors.cyan.text },
}

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

interface ServerNodeProps {
  step: DnsStep
  isActive: boolean
  isCompleted: boolean
  isTarget: boolean
  onClick: () => void
}

function ServerNode({ step, isActive, isCompleted, isTarget, onClick }: ServerNodeProps) {
  const colors = serverColors[step.id]
  return (
    <motion.g
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
      style={{ transformOrigin: `${step.x}% ${step.y}%` }}
    >
      {/* Server box */}
      <motion.rect
        x={`${step.x - 6}%`}
        y={`${step.y - 8}%`}
        width="12%"
        height="16%"
        rx="6"
        fill={colors.fill}
        stroke={isActive ? '#f59e0b' : isTarget ? '#ef4444' : isCompleted ? colors.stroke : '#475569'}
        strokeWidth={isActive || isTarget ? 3 : 2}
        animate={{
          strokeWidth: isActive ? [2, 3, 2] : 2,
          opacity: isCompleted || isActive ? 1 : 0.5,
        }}
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
      />
      {/* Server label */}
      <text
        x={`${step.x}%`}
        y={`${step.y - 1}%`}
        textAnchor="middle"
        className={`text-[10px] font-semibold fill-slate-200`}
      >
        {step.server}
      </text>
      {/* Status indicator */}
      {isCompleted && (
        <text
          x={`${step.x + 5}%`}
          y={`${step.y - 5}%`}
          textAnchor="middle"
          className="text-[14px] fill-green-400"
        >
          {'\u2713'}
        </text>
      )}
    </motion.g>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function DnsResolutionStepper({ className }: DiagramProps) {
  const [currentPreset, setCurrentPreset] = useState(0)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  const preset = presets[currentPreset]
  const totalSteps = preset.steps.length

  const stepper = useStepNavigator({
    totalSteps,
    autoPlayInterval: 2000,
  })

  const resetState = useCallback(() => {
    setSelectedStep(null)
  }, [])

  const challenge = useChallengeMode<DnsChallenge>({
    challenges: dnsChallenges,
    onCheck: (ch) => {
      return selectedStep === ch.stepIndex
    },
    onReset: resetState,
  })

  const handlePresetChange = (id: string) => {
    const idx = presets.findIndex(p => p.id === id)
    if (idx >= 0) {
      setCurrentPreset(idx)
      stepper.reset()
      resetState()
      challenge.clearResult()
    }
  }

  const handleStepClick = (index: number) => {
    if (challenge.isActive) {
      setSelectedStep(prev => prev === index ? null : index)
    } else {
      stepper.goTo(index)
    }
  }

  const currentStep = preset.steps[stepper.currentStep]
  const samples = presets.map(p => ({ id: p.id, label: p.label }))

  return (
    <DiagramShell
      title="DNS Resolution Stepper"
      subtitle={`Aufloesung von ${preset.domain}`}
      className={className}
      samples={samples}
      currentSample={preset.id}
      onSampleChange={handlePresetChange}
      actions={
        <Button
          variant={challenge.isActive ? 'primary' : 'secondary'}
          size="sm"
          onClick={challenge.toggle}
        >
          {challenge.isActive ? 'Challenge AN' : 'Challenge'}
        </Button>
      }
      footer={
        <div className="space-y-2">
          <p>
            <strong className="text-slate-400">DNS Hierarchie:</strong> Browser Cache
            {' \u2192 '} OS Resolver {' \u2192 '} Recursive Resolver {' \u2192 '} Root
            {' \u2192 '} TLD {' \u2192 '} Autoritativer NS
          </p>
          <p>
            Jede Antwort wird mit einer TTL gecacht, um kuenftige Abfragen zu beschleunigen.
          </p>
        </div>
      }
    >
      {/* Challenge Banner */}
      <ChallengeBanner
        challenge={challenge}
        challenges={dnsChallenges}
        showTargetValue={false}
      />

      {/* Domain Display */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700">
        <span className="text-sm text-slate-400">Domain:</span>
        <code className="text-lg font-mono text-blue-400">{preset.domain}</code>
        <span className="text-slate-500">{'\u2192'}</span>
        <AnimatePresence mode="wait">
          {stepper.isLast ? (
            <motion.code
              key="ip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-lg font-mono text-green-400"
            >
              {preset.ip}
            </motion.code>
          ) : (
            <motion.span
              key="resolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-500 text-sm"
            >
              Wird aufgeloest...
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Diagram */}
      <div className="relative rounded-lg bg-slate-900/50 border border-slate-700 overflow-hidden">
        <svg viewBox="0 0 800 300" className="w-full h-auto" style={{ minHeight: '250px' }}>
          {/* Connection lines between steps */}
          {preset.steps.map((step, i) => {
            if (i === 0) return null
            const prev = preset.steps[i - 1]
            const isActive = i <= stepper.currentStep
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${step.x}%`}
                y2={`${step.y}%`}
                stroke={isActive ? '#3b82f6' : '#334155'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? '0' : '5,5'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0.3 }}
                transition={{ duration: 0.5, delay: isActive ? i * 0.1 : 0 }}
              />
            )
          })}

          {/* Animated packet */}
          {stepper.currentStep > 0 && stepper.currentStep < totalSteps && (
            <motion.circle
              r="6"
              fill="#f59e0b"
              initial={{
                cx: `${preset.steps[stepper.currentStep - 1].x}%`,
                cy: `${preset.steps[stepper.currentStep - 1].y}%`,
              }}
              animate={{
                cx: `${preset.steps[stepper.currentStep].x}%`,
                cy: `${preset.steps[stepper.currentStep].y}%`,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}

          {/* Server nodes */}
          {preset.steps.map((step, i) => (
            <ServerNode
              key={step.id}
              step={step}
              isActive={i === stepper.currentStep}
              isCompleted={i < stepper.currentStep}
              isTarget={challenge.isActive && selectedStep === i}
              onClick={() => handleStepClick(i)}
            />
          ))}
        </svg>
      </div>

      {/* Step Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`
            p-4 rounded-lg border-l-4
            ${serverColors[currentStep.id]
              ? `border-l-[${serverColors[currentStep.id].stroke}]`
              : 'border-l-blue-500'}
            bg-slate-800/50
          `}
          style={{ borderLeftColor: serverColors[currentStep.id]?.stroke }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">
              Schritt {stepper.currentStep + 1}/{totalSteps}
            </span>
            <span className="font-semibold text-slate-100">{currentStep.label}</span>
          </div>
          <p className="text-slate-300 text-sm mb-3">{currentStep.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2 rounded bg-slate-900 border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">Query</div>
              <code className="text-xs text-blue-300 font-mono">{currentStep.query}</code>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">Response</div>
              <code className="text-xs text-green-300 font-mono">{currentStep.response}</code>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-slate-500">Record-Typ:</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-amber-300 font-mono">
              {currentStep.recordType}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Challenge: select step + check */}
      {challenge.isActive && selectedStep !== null && !challenge.result && (
        <div className="flex justify-center">
          <Button variant="primary" onClick={challenge.check}>
            Antwort pruefen (Schritt {selectedStep + 1} ausgewaehlt)
          </Button>
        </div>
      )}

      {/* Challenge Result */}
      <ChallengeResult
        challenge={challenge}
        hint={challenge.current.targetValue}
        successMessage="Richtig! Du kennst die DNS-Record-Typen."
        failMessage="Nicht ganz. Denke an die DNS-Hierarchie und welcher Server welchen Record-Typ zurueckgibt."
      />

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="dots" />
    </DiagramShell>
  )
}
