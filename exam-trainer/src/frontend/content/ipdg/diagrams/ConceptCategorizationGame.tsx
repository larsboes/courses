// src/content/ipdg/diagrams/ConceptCategorizationGame.tsx
import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

export interface Term {
  id: string
  label: string
  categoryId: string
}

export interface Category {
  id: string
  label: string
  color: string // Tailwind gradient classes e.g., 'from-blue-500 to-blue-700'
  description?: string
}

export interface GameConfig {
  title: string
  instruction: string
  categories: Category[]
  terms: Term[]
}

// Predefined game configurations
export const CRM_TYPES_GAME: GameConfig = {
  title: 'CRM-Typen zuordnen',
  instruction: 'Ordne die Begriffe der richtigen CRM-Art zu',
  categories: [
    {
      id: 'analytical',
      label: 'Analytisches CRM',
      color: 'from-cyan-500 to-cyan-700',
      description: 'Datenanalyse & BI',
    },
    {
      id: 'operative',
      label: 'Operatives CRM',
      color: 'from-green-500 to-green-700',
      description: 'Umsetzung & Automatisierung',
    },
    {
      id: 'strategic',
      label: 'Strategisches CRM',
      color: 'from-indigo-500 to-indigo-700',
      description: 'Ziele & Planung',
    },
  ],
  terms: [
    { id: 'data-mining', label: 'Data Mining', categoryId: 'analytical' },
    { id: 'olap', label: 'OLAP-Analysen', categoryId: 'analytical' },
    { id: 'data-warehouse', label: 'Data Warehouse', categoryId: 'analytical' },
    { id: 'share-of-wallet', label: 'Share of Wallet Analyse', categoryId: 'analytical' },
    { id: 'kampagnen', label: 'Kampagnenmanagement', categoryId: 'operative' },
    { id: 'salesforce', label: 'Salesforce Automation', categoryId: 'operative' },
    { id: 'service-desk', label: 'Service Desk', categoryId: 'operative' },
    { id: 'front-office', label: 'Front-Office Systeme', categoryId: 'operative' },
    { id: 'clv', label: 'CLV maximieren', categoryId: 'strategic' },
    { id: 'zielgruppen', label: 'Zielgruppendefinition', categoryId: 'strategic' },
    { id: 'kundenstrategie', label: 'Kundenbindungsstrategie', categoryId: 'strategic' },
    { id: 'langfristig', label: 'Langfristige Planung', categoryId: 'strategic' },
  ],
}

export const OLTP_OLAP_GAME: GameConfig = {
  title: 'OLTP vs OLAP',
  instruction: 'Ordne die Eigenschaften dem richtigen System zu',
  categories: [
    {
      id: 'oltp',
      label: 'OLTP',
      color: 'from-amber-500 to-amber-700',
      description: 'Online Transaction Processing',
    },
    {
      id: 'olap',
      label: 'OLAP',
      color: 'from-purple-500 to-purple-700',
      description: 'Online Analytical Processing',
    },
  ],
  terms: [
    { id: 'oltp-transaktionen', label: 'Viele kleine Transaktionen', categoryId: 'oltp' },
    { id: 'oltp-aktuell', label: 'Aktuelle Daten', categoryId: 'oltp' },
    { id: 'oltp-normalisiert', label: 'Normalisierte Datenbank', categoryId: 'oltp' },
    { id: 'oltp-insert-update', label: 'INSERT, UPDATE, DELETE', categoryId: 'oltp' },
    { id: 'oltp-operativ', label: 'Operativer Betrieb', categoryId: 'oltp' },
    { id: 'oltp-schnell', label: 'Schnelle Einzelzugriffe', categoryId: 'oltp' },
    { id: 'olap-analyse', label: 'Komplexe Analysen', categoryId: 'olap' },
    { id: 'olap-historisch', label: 'Historische Daten', categoryId: 'olap' },
    { id: 'olap-star', label: 'Star-Schema / Snowflake', categoryId: 'olap' },
    { id: 'olap-select', label: 'Hauptsächlich SELECT', categoryId: 'olap' },
    { id: 'olap-entscheidung', label: 'Entscheidungsunterstützung', categoryId: 'olap' },
    { id: 'olap-aggregiert', label: 'Aggregierte Daten', categoryId: 'olap' },
  ],
}

interface PlacedTerm {
  term: Term
  isCorrect: boolean
}

interface CategoryBoxProps {
  category: Category
  placedTerms: PlacedTerm[]
  onDrop: (termId: string) => void
  showResults: boolean
  isDropTarget: boolean
}

function CategoryBox({
  category,
  placedTerms,
  onDrop,
  showResults,
  isDropTarget,
}: CategoryBoxProps) {
  return (
    <motion.div
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200 min-h-[160px]
        ${isDropTarget
          ? 'border-white/50 bg-slate-700/50 scale-[1.02]'
          : 'border-slate-600 bg-slate-800/50'
        }
      `}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        e.preventDefault()
        const termId = e.dataTransfer.getData('text/plain')
        if (termId) {
          onDrop(termId)
        }
      }}
    >
      {/* Category Header */}
      <div className={`mb-3 p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
        <h4 className="font-semibold text-white text-center">{category.label}</h4>
        {category.description && (
          <p className="text-xs text-white/80 text-center">{category.description}</p>
        )}
      </div>

      {/* Placed Terms */}
      <div className="space-y-2">
        <AnimatePresence>
          {placedTerms.map(({ term, isCorrect }) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium text-center
                ${showResults
                  ? isCorrect
                    ? 'bg-green-900/50 border border-green-500 text-green-300'
                    : 'bg-red-900/50 border border-red-500 text-red-300'
                  : 'bg-slate-700 border border-slate-600 text-slate-200'
                }
              `}
            >
              <span className="flex items-center justify-center gap-2">
                {showResults && (
                  <span>{isCorrect ? '✓' : '✗'}</span>
                )}
                {term.label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {placedTerms.length === 0 && (
        <div className="text-slate-500 text-sm text-center py-4">
          Ziehe Begriffe hierher
        </div>
      )}
    </motion.div>
  )
}

interface DraggableTermProps {
  term: Term
  onDragStart: (termId: string) => void
  onDragEnd: () => void
}

function DraggableTerm({ term, onDragStart, onDragEnd }: DraggableTermProps) {
  return (
    <motion.div
      draggable
      onDragStart={(e) => {
        // @ts-ignore - DragEvent type
        e.dataTransfer?.setData('text/plain', term.id)
        onDragStart(term.id)
      }}
      onDragEnd={onDragEnd}
      className="
        px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600
        rounded-lg cursor-grab active:cursor-grabbing
        text-sm font-medium text-slate-200 select-none
        transition-colors
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {term.label}
    </motion.div>
  )
}

interface ConceptCategorizationGameProps extends DiagramProps {
  config?: GameConfig
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function ConceptCategorizationGame({
  config = CRM_TYPES_GAME,
  className = '',
}: ConceptCategorizationGameProps) {
  const [availableTerms, setAvailableTerms] = useState<Term[]>(() =>
    shuffleArray(config.terms)
  )
  const [placements, setPlacements] = useState<Record<string, PlacedTerm[]>>(() =>
    Object.fromEntries(config.categories.map(c => [c.id, []]))
  )
  const [showResults, setShowResults] = useState(false)
  const [draggingTermId, setDraggingTermId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  const score = useMemo(() => {
    if (!showResults) return { correct: 0, total: 0 }

    let correct = 0
    let total = 0

    Object.values(placements).forEach(terms => {
      terms.forEach(({ isCorrect }) => {
        total++
        if (isCorrect) correct++
      })
    })

    return { correct, total }
  }, [placements, showResults])

  const allPlaced = availableTerms.length === 0

  const handleDrop = useCallback((categoryId: string, termId: string) => {
    const term = availableTerms.find(t => t.id === termId)
    if (!term) return

    const isCorrect = term.categoryId === categoryId

    setAvailableTerms(prev => prev.filter(t => t.id !== termId))
    setPlacements(prev => ({
      ...prev,
      [categoryId]: [...prev[categoryId], { term, isCorrect }]
    }))
    setDraggingTermId(null)
    setDropTargetId(null)
  }, [availableTerms])

  const handleCheckAnswers = useCallback(() => {
    setShowResults(true)
  }, [])

  const handleReset = useCallback(() => {
    setAvailableTerms(shuffleArray(config.terms))
    setPlacements(Object.fromEntries(config.categories.map(c => [c.id, []])))
    setShowResults(false)
    setDraggingTermId(null)
    setDropTargetId(null)
  }, [config])

  const handleDragStart = useCallback((termId: string) => {
    setDraggingTermId(termId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggingTermId(null)
    setDropTargetId(null)
  }, [])

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{config.title}</h3>
        <p className="text-slate-400">{config.instruction}</p>
      </div>

      {/* Score Display (when results shown) */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              mb-6 p-4 rounded-lg text-center
              ${score.correct === score.total
                ? 'bg-green-900/30 border border-green-700'
                : score.correct >= score.total / 2
                  ? 'bg-amber-900/30 border border-amber-700'
                  : 'bg-red-900/30 border border-red-700'
              }
            `}
          >
            <div className="text-2xl font-bold mb-1">
              {score.correct} / {score.total} richtig
            </div>
            <div className="text-sm text-slate-400">
              {score.correct === score.total
                ? 'Perfekt! Alle Begriffe korrekt zugeordnet!'
                : score.correct >= score.total / 2
                  ? 'Gut gemacht! Schau dir die Fehler an.'
                  : 'Weiter üben! Die roten Begriffe sind falsch platziert.'
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className={`grid gap-4 mb-6 ${
        config.categories.length === 2
          ? 'md:grid-cols-2'
          : config.categories.length === 3
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {config.categories.map(category => (
          <div
            key={category.id}
            onDragOver={(e) => {
              e.preventDefault()
              setDropTargetId(category.id)
            }}
            onDragLeave={() => setDropTargetId(null)}
          >
            <CategoryBox
              category={category}
              placedTerms={placements[category.id]}
              onDrop={(termId) => handleDrop(category.id, termId)}
              showResults={showResults}
              isDropTarget={dropTargetId === category.id && draggingTermId !== null}
            />
          </div>
        ))}
      </div>

      {/* Available Terms */}
      {availableTerms.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            Verfügbare Begriffe ({availableTerms.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableTerms.map(term => (
              <DraggableTerm
                key={term.id}
                term={term}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        {allPlaced && !showResults && (
          <Button onClick={handleCheckAnswers} size="lg">
            Antworten prüfen
          </Button>
        )}
        <Button onClick={handleReset} variant="secondary">
          Zurücksetzen
        </Button>
      </div>

      {/* Instructions */}
      {!showResults && availableTerms.length > 0 && (
        <p className="text-xs text-slate-500 mt-4 text-center">
          Ziehe die Begriffe per Drag & Drop in die passende Kategorie
        </p>
      )}
    </Card>
  )
}

// Export preconfigured variants for easy use
export function CrmTypesGame(props: Omit<ConceptCategorizationGameProps, 'config'>) {
  return <ConceptCategorizationGame {...props} config={CRM_TYPES_GAME} />
}

export function OltpOlapGame(props: Omit<ConceptCategorizationGameProps, 'config'>) {
  return <ConceptCategorizationGame {...props} config={OLTP_OLAP_GAME} />
}
