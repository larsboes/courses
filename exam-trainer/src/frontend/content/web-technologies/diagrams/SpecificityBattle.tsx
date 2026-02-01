// src/content/web-technologies/diagrams/SpecificityBattle.tsx
import { Button } from '@/core/components/ui/Button'
import { Card } from '@/core/components/ui/Card'
import { DiagramShell } from '@/core/components/diagrams'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'

interface Specificity {
  inline: number
  ids: number
  classes: number
  elements: number
}

interface BattlePair {
  selector1: string
  selector2: string
  specificity1: Specificity
  specificity2: Specificity
  winner: 1 | 2
  explanation: string
}

const battlePairs: BattlePair[] = [
  {
    selector1: '#header',
    selector2: '.nav .link',
    specificity1: { inline: 0, ids: 1, classes: 0, elements: 0 },
    specificity2: { inline: 0, ids: 0, classes: 2, elements: 0 },
    winner: 1,
    explanation: 'Eine ID (0,1,0,0) schlägt beliebig viele Klassen (0,0,2,0).',
  },
  {
    selector1: 'div.active',
    selector2: 'div',
    specificity1: { inline: 0, ids: 0, classes: 1, elements: 1 },
    specificity2: { inline: 0, ids: 0, classes: 0, elements: 1 },
    winner: 1,
    explanation: 'Die zusätzliche Klasse erhöht die Spezifität von (0,0,0,1) auf (0,0,1,1).',
  },
  {
    selector1: '#main .content p',
    selector2: 'body div p',
    specificity1: { inline: 0, ids: 1, classes: 1, elements: 1 },
    specificity2: { inline: 0, ids: 0, classes: 0, elements: 3 },
    winner: 1,
    explanation: 'Eine ID (0,1,1,1) gewinnt immer gegen reine Element-Selektoren (0,0,0,3).',
  },
  {
    selector1: '.a.b.c',
    selector2: '#x',
    specificity1: { inline: 0, ids: 0, classes: 3, elements: 0 },
    specificity2: { inline: 0, ids: 1, classes: 0, elements: 0 },
    winner: 2,
    explanation: 'Eine einzelne ID (0,1,0,0) schlägt drei Klassen (0,0,3,0).',
  },
  {
    selector1: 'div div div',
    selector2: '.single',
    specificity1: { inline: 0, ids: 0, classes: 0, elements: 3 },
    specificity2: { inline: 0, ids: 0, classes: 1, elements: 0 },
    winner: 2,
    explanation: 'Eine Klasse (0,0,1,0) schlägt drei Elemente (0,0,0,3).',
  },
  {
    selector1: 'a:hover',
    selector2: 'a:visited',
    specificity1: { inline: 0, ids: 0, classes: 1, elements: 1 },
    specificity2: { inline: 0, ids: 0, classes: 1, elements: 1 },
    winner: 2,
    explanation: 'Beide haben (0,0,1,1) - bei gleicher Spezifität gewinnt die spätere Regel (hier: selector2).',
  },
  {
    selector1: '#nav ul li a',
    selector2: '#nav a',
    specificity1: { inline: 0, ids: 1, classes: 0, elements: 3 },
    specificity2: { inline: 0, ids: 1, classes: 0, elements: 1 },
    winner: 1,
    explanation: 'Beide haben eine ID, aber (0,1,0,3) > (0,1,0,1).',
  },
  {
    selector1: 'input[type="text"]',
    selector2: 'input.text-input',
    specificity1: { inline: 0, ids: 0, classes: 1, elements: 1 },
    specificity2: { inline: 0, ids: 0, classes: 1, elements: 1 },
    winner: 2,
    explanation: 'Attribut-Selektoren und Klassen zählen gleich (0,0,1,1) - spätere Regel gewinnt.',
  },
  {
    selector1: 'ul > li::before',
    selector2: 'ul li',
    specificity1: { inline: 0, ids: 0, classes: 0, elements: 3 },
    specificity2: { inline: 0, ids: 0, classes: 0, elements: 2 },
    winner: 1,
    explanation: 'Pseudo-Elemente (::before) zählen als Element (0,0,0,3) > (0,0,0,2).',
  },
  {
    selector1: '.card .title',
    selector2: 'article h2.title',
    specificity1: { inline: 0, ids: 0, classes: 2, elements: 0 },
    specificity2: { inline: 0, ids: 0, classes: 1, elements: 2 },
    winner: 1,
    explanation: 'Zwei Klassen (0,0,2,0) schlagen eine Klasse plus Elemente (0,0,1,2).',
  },
  {
    selector1: '#app #main',
    selector2: '#content',
    specificity1: { inline: 0, ids: 2, classes: 0, elements: 0 },
    specificity2: { inline: 0, ids: 1, classes: 0, elements: 0 },
    winner: 1,
    explanation: 'Zwei IDs (0,2,0,0) schlagen eine ID (0,1,0,0).',
  },
  {
    selector1: 'button:disabled',
    selector2: '.btn-disabled',
    specificity1: { inline: 0, ids: 0, classes: 1, elements: 1 },
    specificity2: { inline: 0, ids: 0, classes: 1, elements: 0 },
    winner: 1,
    explanation: 'Pseudo-Klasse plus Element (0,0,1,1) > nur Klasse (0,0,1,0).',
  },
]

function formatSpecificity(spec: Specificity): string {
  return `(${spec.inline},${spec.ids},${spec.classes},${spec.elements})`
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface SelectorCardProps {
  selector: string
  specificity: Specificity
  onClick: () => void
  disabled: boolean
  revealed: boolean
  isWinner: boolean | null
  isSelected: boolean
}

function SelectorCard({
  selector,
  specificity,
  onClick,
  disabled,
  revealed,
  isWinner,
  isSelected,
}: SelectorCardProps) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Card
        hover={!disabled}
        className={`p-6 cursor-pointer transition-all duration-300 ${
          revealed
            ? isWinner
              ? 'border-green-500 bg-green-900/20'
              : 'border-red-500 bg-red-900/20'
            : isSelected
              ? 'border-blue-500'
              : ''
        }`}
        onClick={disabled ? undefined : onClick}
      >
        <div className="text-center">
          <code className="text-lg md:text-xl font-mono text-slate-100 block mb-4">
            {selector}
          </code>
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex justify-center gap-1 text-sm font-mono">
                  <span className="px-2 py-1 bg-blue-900/50 rounded text-blue-300">
                    {specificity.inline}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-2 py-1 bg-red-900/50 rounded text-red-300">
                    {specificity.ids}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-2 py-1 bg-amber-900/50 rounded text-amber-300">
                    {specificity.classes}
                  </span>
                  <span className="text-slate-500">,</span>
                  <span className="px-2 py-1 bg-purple-900/50 rounded text-purple-300">
                    {specificity.elements}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {formatSpecificity(specificity)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

export function SpecificityBattle() {
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<1 | 2 | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const rounds = useMemo(() => shuffleArray(battlePairs).slice(0, 10), [])

  const currentPair = rounds[currentRound]

  const handleSelect = (choice: 1 | 2) => {
    if (showResult) return

    setSelectedAnswer(choice)
    setShowResult(true)

    if (choice === currentPair.winner) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentRound < 9) {
      setCurrentRound((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameOver(true)
    }
  }

  const handleRestart = () => {
    setCurrentRound(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameOver(false)
    // Force re-shuffle by remounting
    window.location.reload()
  }

  if (gameOver) {
    return (
      <DiagramShell title="Specificity Battle" subtitle="Spiel beendet!">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl font-bold mb-2"
            >
              {score}/10
            </motion.div>
            <p className="text-slate-400">
              {score === 10
                ? 'Perfekt! Du bist ein CSS-Spezifitaets-Meister!'
                : score >= 7
                  ? 'Sehr gut! Du verstehst CSS-Spezifitaet gut.'
                  : score >= 5
                    ? 'Nicht schlecht! Etwas Übung hilft.'
                    : 'Weiter üben! Spezifität braucht Zeit.'}
            </p>
          </div>
          <Button onClick={handleRestart} size="lg">
            Nochmal spielen
          </Button>
        </motion.div>
      </DiagramShell>
    )
  }

  return (
    <DiagramShell
      title="Specificity Battle"
      subtitle={`Runde ${currentRound + 1}/10`}
      actions={
        <div className="text-slate-400">
          Punkte: <span className="text-white font-bold">{score}</span>
        </div>
      }
      footer={
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-900/50 rounded" />
            <span className="text-slate-400">Inline (1,0,0,0)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-900/50 rounded" />
            <span className="text-slate-400">IDs (0,1,0,0)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-900/50 rounded" />
            <span className="text-slate-400">Klassen (0,0,1,0)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-purple-900/50 rounded" />
            <span className="text-slate-400">Elemente (0,0,0,1)</span>
          </span>
        </div>
      }
    >
      {/* Progress Bar */}
      <div className="h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentRound + 1) / 10) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <h3 className="text-center text-xl mb-6 text-slate-300">
        Welcher Selektor hat die hoehere Spezifitaet?
      </h3>

      {/* Battle Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SelectorCard
          selector={currentPair.selector1}
          specificity={currentPair.specificity1}
          onClick={() => handleSelect(1)}
          disabled={showResult}
          revealed={showResult}
          isWinner={showResult ? currentPair.winner === 1 : null}
          isSelected={selectedAnswer === 1}
        />

        <div className="hidden md:flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-500">VS</span>
        </div>
        <div className="flex md:hidden items-center justify-center py-2">
          <span className="text-xl font-bold text-slate-500">VS</span>
        </div>

        <SelectorCard
          selector={currentPair.selector2}
          specificity={currentPair.specificity2}
          onClick={() => handleSelect(2)}
          disabled={showResult}
          revealed={showResult}
          isWinner={showResult ? currentPair.winner === 2 : null}
          isSelected={selectedAnswer === 2}
        />
      </div>

      {/* Result Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`p-4 mb-6 ${
                selectedAnswer === currentPair.winner
                  ? 'border-green-500 bg-green-900/20'
                  : 'border-red-500 bg-red-900/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {selectedAnswer === currentPair.winner ? '✓' : '✗'}
                </span>
                <div>
                  <p className="font-medium mb-1">
                    {selectedAnswer === currentPair.winner ? 'Richtig!' : 'Falsch!'}
                  </p>
                  <p className="text-slate-300 text-sm">{currentPair.explanation}</p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button onClick={handleNext} size="lg">
                {currentRound < 9 ? 'Nächste Runde' : 'Ergebnis anzeigen'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramShell>
  )
}
