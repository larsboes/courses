// src/content/web-technologies/diagrams/CssCascadeSimulator.tsx
import { Button } from '@/core/components/ui/Button'
import { Card } from '@/core/components/ui/Card'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'

// CSS Rule origin types in cascade order (lower = less priority)
type CssOrigin = 'browser' | 'external' | 'internal' | 'inline'

interface CssRule {
  id: string
  origin: CssOrigin
  selector: string
  property: string
  value: string
  important: boolean
  specificity: [number, number, number, number] // inline, ids, classes, elements
}

interface CascadeExample {
  id: string
  title: string
  description: string
  targetElement: string
  rules: CssRule[]
  propertyToResolve: string
}

const cascadeExamples: CascadeExample[] = [
  {
    id: 'basic-origin',
    title: 'Origin: Inline vs External',
    description: 'Inline-Styles haben Vorrang vor externen Stylesheets.',
    targetElement: '<p class="text">Hello</p>',
    propertyToResolve: 'color',
    rules: [
      {
        id: '1',
        origin: 'external',
        selector: '.text',
        property: 'color',
        value: 'blue',
        important: false,
        specificity: [0, 0, 1, 0],
      },
      {
        id: '2',
        origin: 'inline',
        selector: 'style=""',
        property: 'color',
        value: 'red',
        important: false,
        specificity: [1, 0, 0, 0],
      },
    ],
  },
  {
    id: 'important-override',
    title: '!important ueberschreibt alles',
    description: '!important in externem CSS schlaegt sogar Inline-Styles.',
    targetElement: '<p class="alert" style="color: green">Warning</p>',
    propertyToResolve: 'color',
    rules: [
      {
        id: '1',
        origin: 'external',
        selector: '.alert',
        property: 'color',
        value: 'red',
        important: true,
        specificity: [0, 0, 1, 0],
      },
      {
        id: '2',
        origin: 'inline',
        selector: 'style=""',
        property: 'color',
        value: 'green',
        important: false,
        specificity: [1, 0, 0, 0],
      },
    ],
  },
  {
    id: 'specificity-battle',
    title: 'Spezifitaet entscheidet',
    description: 'Bei gleichem Origin gewinnt die hoehere Spezifitaet.',
    targetElement: '<div id="main"><p class="intro">Text</p></div>',
    propertyToResolve: 'font-size',
    rules: [
      {
        id: '1',
        origin: 'internal',
        selector: 'p',
        property: 'font-size',
        value: '14px',
        important: false,
        specificity: [0, 0, 0, 1],
      },
      {
        id: '2',
        origin: 'internal',
        selector: '.intro',
        property: 'font-size',
        value: '16px',
        important: false,
        specificity: [0, 0, 1, 0],
      },
      {
        id: '3',
        origin: 'internal',
        selector: '#main p',
        property: 'font-size',
        value: '18px',
        important: false,
        specificity: [0, 1, 0, 1],
      },
    ],
  },
  {
    id: 'source-order',
    title: 'Source Order als Tiebreaker',
    description: 'Bei gleicher Spezifitaet gewinnt die spaetere Regel.',
    targetElement: '<button class="btn primary">Click</button>',
    propertyToResolve: 'background',
    rules: [
      {
        id: '1',
        origin: 'external',
        selector: '.btn',
        property: 'background',
        value: 'gray',
        important: false,
        specificity: [0, 0, 1, 0],
      },
      {
        id: '2',
        origin: 'external',
        selector: '.primary',
        property: 'background',
        value: 'blue',
        important: false,
        specificity: [0, 0, 1, 0],
      },
    ],
  },
  {
    id: 'browser-defaults',
    title: 'Browser-Defaults ueberschreiben',
    description: 'Autor-Styles haben Vorrang vor Browser-Defaults.',
    targetElement: '<a href="#">Link</a>',
    propertyToResolve: 'color',
    rules: [
      {
        id: '1',
        origin: 'browser',
        selector: 'a',
        property: 'color',
        value: 'blue',
        important: false,
        specificity: [0, 0, 0, 1],
      },
      {
        id: '2',
        origin: 'external',
        selector: 'a',
        property: 'color',
        value: 'inherit',
        important: false,
        specificity: [0, 0, 0, 1],
      },
    ],
  },
  {
    id: 'complex-cascade',
    title: 'Komplexes Cascade-Szenario',
    description: 'Mehrere Regeln aus verschiedenen Quellen.',
    targetElement: '<div id="app"><span class="highlight">Text</span></div>',
    propertyToResolve: 'color',
    rules: [
      {
        id: '1',
        origin: 'browser',
        selector: 'span',
        property: 'color',
        value: 'black',
        important: false,
        specificity: [0, 0, 0, 1],
      },
      {
        id: '2',
        origin: 'external',
        selector: '.highlight',
        property: 'color',
        value: 'yellow',
        important: false,
        specificity: [0, 0, 1, 0],
      },
      {
        id: '3',
        origin: 'internal',
        selector: '#app span',
        property: 'color',
        value: 'green',
        important: false,
        specificity: [0, 1, 0, 1],
      },
      {
        id: '4',
        origin: 'external',
        selector: 'span',
        property: 'color',
        value: 'purple',
        important: true,
        specificity: [0, 0, 0, 1],
      },
    ],
  },
]

const originLabels: Record<CssOrigin, string> = {
  browser: 'Browser Default',
  external: 'Externes Stylesheet',
  internal: '<style> Block',
  inline: 'Inline style=""',
}

const originColors: Record<CssOrigin, string> = {
  browser: 'bg-slate-600 border-slate-500',
  external: 'bg-blue-900/50 border-blue-500',
  internal: 'bg-purple-900/50 border-purple-500',
  inline: 'bg-amber-900/50 border-amber-500',
}

const originPriority: Record<CssOrigin, number> = {
  browser: 1,
  external: 2,
  internal: 3,
  inline: 4,
}

function formatSpecificity(spec: [number, number, number, number]): string {
  return `(${spec.join(',')})`;
}

function compareSpecificity(a: [number, number, number, number], b: [number, number, number, number]): number {
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) return a[i] - b[i]
  }
  return 0
}

type CascadeStep = 'overview' | 'importance' | 'origin' | 'specificity' | 'order' | 'winner'

const stepInfo: Record<CascadeStep, { label: string; description: string }> = {
  overview: {
    label: 'Uebersicht',
    description: 'Alle konkurrierenden CSS-Regeln fuer diese Property.',
  },
  importance: {
    label: '1. Origin & Importance',
    description: '!important Regeln haben hoechste Prioritaet, dann kommt der Origin.',
  },
  origin: {
    label: '2. Origin-Hierarchie',
    description: 'Inline > Internal > External > Browser Defaults',
  },
  specificity: {
    label: '3. Spezifitaet',
    description: 'Hoehere Spezifitaet gewinnt bei gleichem Origin.',
  },
  order: {
    label: '4. Source Order',
    description: 'Bei gleicher Spezifitaet gewinnt die spaetere Regel.',
  },
  winner: {
    label: 'Gewinner',
    description: 'Der endgueltige Wert nach dem Cascade-Algorithmus.',
  },
}

interface RuleCardProps {
  rule: CssRule
  isWinner: boolean
  isEliminated: boolean
  showDetails: boolean
  highlightImportant: boolean
  highlightOrigin: boolean
  highlightSpecificity: boolean
  index: number
}

function RuleCard({
  rule,
  isWinner,
  isEliminated,
  showDetails,
  highlightImportant,
  highlightOrigin,
  highlightSpecificity,
  index,
}: RuleCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isEliminated ? 0.4 : 1,
        x: 0,
        scale: isWinner ? 1.02 : 1,
      }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card
        className={`p-4 transition-all duration-300 ${
          isWinner
            ? 'border-green-500 bg-green-900/30 ring-2 ring-green-500/50'
            : isEliminated
              ? 'border-slate-600 opacity-60'
              : 'border-slate-600'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Origin Badge */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
              <motion.span
                className={`px-2 py-0.5 text-xs rounded ${originColors[rule.origin]}`}
                animate={{
                  scale: highlightOrigin ? [1, 1.1, 1] : 1,
                  boxShadow: highlightOrigin ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none',
                }}
                transition={{ duration: 0.5 }}
              >
                {originLabels[rule.origin]}
              </motion.span>
              {rule.important && (
                <motion.span
                  className="px-2 py-0.5 text-xs rounded bg-red-900/50 border border-red-500 text-red-300"
                  animate={{
                    scale: highlightImportant ? [1, 1.2, 1] : 1,
                    boxShadow: highlightImportant ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none',
                  }}
                  transition={{ duration: 0.5, repeat: highlightImportant ? 2 : 0 }}
                >
                  !important
                </motion.span>
              )}
            </div>

            {/* CSS Rule */}
            <code className="text-sm font-mono">
              <span className="text-slate-400">{rule.selector}</span>
              {' { '}
              <span className="text-cyan-400">{rule.property}</span>
              {': '}
              <span className="text-amber-400">{rule.value}</span>
              {rule.important && <span className="text-red-400"> !important</span>}
              {' }'}
            </code>

            {/* Specificity */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-xs"
              >
                <span className="text-slate-500">Spezifitaet:</span>
                <motion.div
                  className="flex gap-0.5 font-mono"
                  animate={{
                    scale: highlightSpecificity ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="px-1.5 py-0.5 bg-blue-900/50 rounded text-blue-300">
                    {rule.specificity[0]}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-1.5 py-0.5 bg-red-900/50 rounded text-red-300">
                    {rule.specificity[1]}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-1.5 py-0.5 bg-amber-900/50 rounded text-amber-300">
                    {rule.specificity[2]}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-1.5 py-0.5 bg-purple-900/50 rounded text-purple-300">
                    {rule.specificity[3]}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Status Icon */}
          <div className="flex-shrink-0">
            {isWinner && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
              >
                <span className="text-white font-bold">&#10003;</span>
              </motion.div>
            )}
            {isEliminated && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center"
              >
                <span className="text-red-400 font-bold">&#10007;</span>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

interface InteractiveRuleProps {
  rule: CssRule
  onToggleImportant: () => void
  onChangeSpecificity: (delta: number) => void
}

function InteractiveRule({ rule, onToggleImportant, onChangeSpecificity }: InteractiveRuleProps) {
  return (
    <Card className={`p-4 ${originColors[rule.origin]}`}>
      <div className="flex flex-col gap-3">
        {/* Origin Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs rounded bg-slate-700 border border-slate-600">
            {originLabels[rule.origin]}
          </span>
        </div>

        {/* CSS Rule */}
        <code className="text-sm font-mono">
          <span className="text-slate-400">{rule.selector}</span>
          {' { '}
          <span className="text-cyan-400">{rule.property}</span>
          {': '}
          <span className="text-amber-400">{rule.value}</span>
          {rule.important && <span className="text-red-400"> !important</span>}
          {' }'}
        </code>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-600">
          {/* Toggle !important */}
          <button
            onClick={onToggleImportant}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              rule.important
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {rule.important ? '!important AN' : '!important AUS'}
          </button>

          {/* Specificity Controls */}
          {rule.origin !== 'inline' && rule.origin !== 'browser' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Spezifitaet:</span>
              <button
                onClick={() => onChangeSpecificity(-1)}
                className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm"
              >
                -
              </button>
              <span className="font-mono text-xs">{formatSpecificity(rule.specificity)}</span>
              <button
                onClick={() => onChangeSpecificity(1)}
                className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function calculateWinner(rules: CssRule[]): CssRule {
  // 1. Separate !important from normal rules
  const importantRules = rules.filter((r) => r.important)
  const normalRules = rules.filter((r) => !r.important)

  // If there are !important rules, only consider those
  const candidateRules = importantRules.length > 0 ? importantRules : normalRules

  // 2. Sort by origin priority (descending)
  const sortedByOrigin = [...candidateRules].sort(
    (a, b) => originPriority[b.origin] - originPriority[a.origin]
  )

  // Get highest origin priority
  const highestOriginPriority = originPriority[sortedByOrigin[0].origin]
  const sameOriginRules = sortedByOrigin.filter(
    (r) => originPriority[r.origin] === highestOriginPriority
  )

  // 3. Sort by specificity (descending)
  const sortedBySpecificity = [...sameOriginRules].sort((a, b) =>
    compareSpecificity(b.specificity, a.specificity)
  )

  // Get highest specificity rules
  const highestSpecificity = sortedBySpecificity[0].specificity
  const sameSpecificityRules = sortedBySpecificity.filter(
    (r) => compareSpecificity(r.specificity, highestSpecificity) === 0
  )

  // 4. Source order - last rule wins (highest index in original array)
  const winner = sameSpecificityRules.reduce((prev, curr) => {
    const prevIndex = rules.findIndex((r) => r.id === prev.id)
    const currIndex = rules.findIndex((r) => r.id === curr.id)
    return currIndex > prevIndex ? curr : prev
  })

  return winner
}

function getEliminatedRules(
  rules: CssRule[],
  step: CascadeStep,
  winner: CssRule
): Set<string> {
  const eliminated = new Set<string>()

  if (step === 'overview') return eliminated

  const importantRules = rules.filter((r) => r.important)
  const normalRules = rules.filter((r) => !r.important)

  if (step === 'importance' || step === 'origin' || step === 'specificity' || step === 'order' || step === 'winner') {
    // Eliminate non-important rules if there are important ones
    if (importantRules.length > 0) {
      normalRules.forEach((r) => eliminated.add(r.id))
    }
  }

  if (step === 'origin' || step === 'specificity' || step === 'order' || step === 'winner') {
    // Eliminate lower origin priority rules
    const candidateRules = importantRules.length > 0 ? importantRules : normalRules
    const remaining = candidateRules.filter((r) => !eliminated.has(r.id))
    const maxOrigin = Math.max(...remaining.map((r) => originPriority[r.origin]))
    remaining.forEach((r) => {
      if (originPriority[r.origin] < maxOrigin) {
        eliminated.add(r.id)
      }
    })
  }

  if (step === 'specificity' || step === 'order' || step === 'winner') {
    // Eliminate lower specificity rules
    const remaining = rules.filter((r) => !eliminated.has(r.id))
    if (remaining.length > 1) {
      const maxSpec = remaining.reduce((max, r) =>
        compareSpecificity(r.specificity, max) > 0 ? r.specificity : max
      , remaining[0].specificity)
      remaining.forEach((r) => {
        if (compareSpecificity(r.specificity, maxSpec) < 0) {
          eliminated.add(r.id)
        }
      })
    }
  }

  if (step === 'order' || step === 'winner') {
    // Eliminate all except winner (source order)
    rules.forEach((r) => {
      if (r.id !== winner.id) {
        eliminated.add(r.id)
      }
    })
  }

  return eliminated
}

interface CssCascadeSimulatorProps {
  className?: string
}

export function CssCascadeSimulator({ className = '' }: CssCascadeSimulatorProps = {}) {
  const [selectedExample, setSelectedExample] = useState(0)
  const [currentStep, setCurrentStep] = useState<CascadeStep>('overview')
  const [isInteractive, setIsInteractive] = useState(false)
  const [interactiveRules, setInteractiveRules] = useState<CssRule[]>([])

  const example = cascadeExamples[selectedExample]
  const activeRules = isInteractive ? interactiveRules : example.rules
  const winner = useMemo(() => calculateWinner(activeRules), [activeRules])
  const eliminatedIds = useMemo(
    () => getEliminatedRules(activeRules, currentStep, winner),
    [activeRules, currentStep, winner]
  )

  const steps: CascadeStep[] = ['overview', 'importance', 'origin', 'specificity', 'order', 'winner']
  const stepIndex = steps.indexOf(currentStep)

  const handleExampleChange = (index: number) => {
    setSelectedExample(index)
    setCurrentStep('overview')
    setIsInteractive(false)
    setInteractiveRules([])
  }

  const handleToggleInteractive = () => {
    if (!isInteractive) {
      setInteractiveRules(JSON.parse(JSON.stringify(example.rules)))
    }
    setIsInteractive(!isInteractive)
    setCurrentStep('overview')
  }

  const handleToggleImportant = (ruleId: string) => {
    setInteractiveRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, important: !r.important } : r))
    )
  }

  const handleChangeSpecificity = (ruleId: string, delta: number) => {
    setInteractiveRules((prev) =>
      prev.map((r) => {
        if (r.id !== ruleId) return r
        const newSpec = [...r.specificity] as [number, number, number, number]
        // Modify classes count (index 2) for simplicity
        newSpec[2] = Math.max(0, newSpec[2] + delta)
        return { ...r, specificity: newSpec }
      })
    )
  }

  const handleReorderRules = (fromIndex: number, toIndex: number) => {
    setInteractiveRules((prev) => {
      const newRules = [...prev]
      const [removed] = newRules.splice(fromIndex, 1)
      newRules.splice(toIndex, 0, removed)
      return newRules
    })
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">CSS Cascade Simulator</h2>
        <p className="text-slate-400">
          Verstehe, wie der Browser entscheidet, welche CSS-Regel gewinnt.
        </p>
      </div>

      {/* Example Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {cascadeExamples.map((ex, index) => (
            <button
              key={ex.id}
              onClick={() => handleExampleChange(index)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedExample === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      {/* Example Info */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-lg">{example.title}</h3>
            <p className="text-slate-400 text-sm">{example.description}</p>
          </div>
          <Button
            variant={isInteractive ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleToggleInteractive}
          >
            {isInteractive ? 'Interaktiv AN' : 'Interaktiv AUS'}
          </Button>
        </div>
        <div className="mt-3 p-3 bg-slate-900 rounded-lg">
          <span className="text-xs text-slate-500">Ziel-Element:</span>
          <code className="block text-sm font-mono text-green-400 mt-1">
            {example.targetElement}
          </code>
        </div>
      </Card>

      {/* Interactive Mode - Reorder Instructions */}
      {isInteractive && (
        <Card className="p-4 mb-4 border-amber-500/50 bg-amber-900/20">
          <p className="text-sm text-amber-300">
            <strong>Interaktiver Modus:</strong> Aendere !important, Spezifitaet, oder
            verschiebe Regeln per Drag & Drop, um zu sehen, wie sich der Gewinner aendert.
          </p>
        </Card>
      )}

      {/* Rules List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-400">
            Konkurrierende Regeln fuer <code className="text-cyan-400">{example.propertyToResolve}</code>:
          </h4>
          <span className="text-xs text-slate-500">
            {activeRules.length} Regeln
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {isInteractive ? (
            // Interactive mode with controls
            <div className="space-y-3">
              {interactiveRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  {/* Reorder buttons */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    {index > 0 && (
                      <button
                        onClick={() => handleReorderRules(index, index - 1)}
                        className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 text-xs"
                        title="Nach oben"
                      >
                        &#9650;
                      </button>
                    )}
                    {index < interactiveRules.length - 1 && (
                      <button
                        onClick={() => handleReorderRules(index, index + 1)}
                        className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 text-xs"
                        title="Nach unten"
                      >
                        &#9660;
                      </button>
                    )}
                  </div>
                  <InteractiveRule
                    rule={rule}
                    onToggleImportant={() => handleToggleImportant(rule.id)}
                    onChangeSpecificity={(delta) => handleChangeSpecificity(rule.id, delta)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            // Normal step-through mode
            <div className="space-y-3">
              {activeRules.map((rule, index) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  index={index}
                  isWinner={currentStep === 'winner' && rule.id === winner.id}
                  isEliminated={eliminatedIds.has(rule.id)}
                  showDetails={stepIndex >= 2}
                  highlightImportant={currentStep === 'importance' && rule.important}
                  highlightOrigin={currentStep === 'origin'}
                  highlightSpecificity={currentStep === 'specificity'}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Step Navigation (only in non-interactive mode) */}
      {!isInteractive && (
        <>
          {/* Step Info */}
          <Card className="p-4 mb-4 border-blue-500/30">
            <div className="text-sm text-slate-400 mb-1">
              Schritt {stepIndex + 1} von {steps.length}
            </div>
            <div className="font-medium text-lg">{stepInfo[currentStep].label}</div>
            <div className="text-slate-400 text-sm mt-1">
              {stepInfo[currentStep].description}
            </div>
          </Card>

          {/* Winner Display */}
          <AnimatePresence>
            {currentStep === 'winner' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Card className="p-6 border-green-500 bg-green-900/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-white">&#10003;</span>
                    </div>
                    <div>
                      <div className="text-sm text-green-400 mb-1">Gewinner</div>
                      <div className="text-xl font-mono">
                        <span className="text-cyan-400">{winner.property}</span>
                        {': '}
                        <span className="text-amber-400">{winner.value}</span>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        aus {originLabels[winner.origin]}
                        {winner.important && ' mit !important'}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentStep(steps[Math.max(0, stepIndex - 1)])}
              disabled={stepIndex === 0}
            >
              &#8592; Zurueck
            </Button>

            <div className="flex gap-1">
              {steps.map((step, index) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === stepIndex
                      ? 'bg-blue-500'
                      : index < stepIndex
                        ? 'bg-blue-800'
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {stepIndex < steps.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentStep(steps[stepIndex + 1])}
              >
                Weiter &#8594;
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentStep('overview')}
              >
                Neu starten
              </Button>
            )}
          </div>
        </>
      )}

      {/* Interactive Mode - Live Result */}
      {isInteractive && (
        <Card className="p-6 border-green-500/50 bg-green-900/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/80 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl text-white">&#10003;</span>
            </div>
            <div>
              <div className="text-sm text-green-400 mb-1">Aktueller Gewinner</div>
              <div className="text-xl font-mono">
                <span className="text-cyan-400">{winner.property}</span>
                {': '}
                <span className="text-amber-400">{winner.value}</span>
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {winner.selector} aus {originLabels[winner.origin]}
                {winner.important && ' mit !important'}
                {' - Spezifitaet: '}
                {formatSpecificity(winner.specificity)}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Legend */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
        <h4 className="text-sm font-medium text-slate-400 mb-3">Cascade-Algorithmus:</h4>
        <div className="grid gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-900/50 border border-red-500" />
            <span className="text-slate-300">
              1. <strong>!important</strong> - Hoechste Prioritaet
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-900/50 border border-amber-500" />
            <span className="text-slate-300">
              2. <strong>Origin</strong> - Inline {'>'} Internal {'>'} External {'>'} Browser
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-blue-900/50 border border-blue-500" />
            <span className="text-slate-300">
              3. <strong>Spezifitaet</strong> - (inline, IDs, Klassen, Elemente)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-purple-900/50 border border-purple-500" />
            <span className="text-slate-300">
              4. <strong>Source Order</strong> - Spaetere Regel gewinnt
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
