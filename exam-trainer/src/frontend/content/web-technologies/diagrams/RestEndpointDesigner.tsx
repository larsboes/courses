// src/content/web-technologies/diagrams/RestEndpointDesigner.tsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, ChallengeBanner, ChallengeResult } from '@/core/components/diagrams'
import { useChallengeMode } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'
import type { Challenge } from '@/core/hooks'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  status: number
  statusText: string
}

interface Operation {
  id: string
  label: string
  description: string
  correctEndpoint: Endpoint
}

interface ExerciseLevel {
  id: string
  label: string
  title: string
  resource: string
  operations: Operation[]
  endpoints: Endpoint[]
}

interface DesignChallenge extends Challenge {
  levelId: string
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: 'bg-blue-900/40', text: 'text-blue-400' },
  POST: { bg: 'bg-green-900/40', text: 'text-green-400' },
  PUT: { bg: 'bg-amber-900/40', text: 'text-amber-400' },
  PATCH: { bg: 'bg-orange-900/40', text: 'text-orange-400' },
  DELETE: { bg: 'bg-red-900/40', text: 'text-red-400' },
}

const levels: ExerciseLevel[] = [
  {
    id: 'basic',
    label: 'Level 1: Basis CRUD',
    title: 'Playlists - Basis CRUD',
    resource: 'Playlists',
    operations: [
      {
        id: 'create',
        label: 'Neue Playlist erstellen',
        description: 'Erstellt eine neue Playlist mit Name und Beschreibung',
        correctEndpoint: { method: 'POST', path: '/api/v1/playlists', status: 201, statusText: 'Created' },
      },
      {
        id: 'list',
        label: 'Alle Playlists abrufen',
        description: 'Gibt eine Liste aller Playlists zurueck',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists', status: 200, statusText: 'OK' },
      },
      {
        id: 'get-one',
        label: 'Eine Playlist abrufen',
        description: 'Gibt eine einzelne Playlist per ID zurueck',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists/:id', status: 200, statusText: 'OK' },
      },
      {
        id: 'update',
        label: 'Playlist aktualisieren',
        description: 'Aktualisiert eine bestehende Playlist komplett',
        correctEndpoint: { method: 'PUT', path: '/api/v1/playlists/:id', status: 200, statusText: 'OK' },
      },
      {
        id: 'delete',
        label: 'Playlist loeschen',
        description: 'Loescht eine Playlist per ID',
        correctEndpoint: { method: 'DELETE', path: '/api/v1/playlists/:id', status: 204, statusText: 'No Content' },
      },
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/playlists', status: 201, statusText: 'Created' },
      { method: 'GET', path: '/api/v1/playlists', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists/:id', status: 200, statusText: 'OK' },
      { method: 'PUT', path: '/api/v1/playlists/:id', status: 200, statusText: 'OK' },
      { method: 'DELETE', path: '/api/v1/playlists/:id', status: 204, statusText: 'No Content' },
      // Distractors
      { method: 'GET', path: '/api/v1/playlist', status: 200, statusText: 'OK' },
      { method: 'POST', path: '/api/v1/playlists/:id', status: 201, statusText: 'Created' },
      { method: 'DELETE', path: '/api/v1/playlists', status: 204, statusText: 'No Content' },
    ],
  },
  {
    id: 'nested',
    label: 'Level 2: Verschachtelt',
    title: 'Songs in Playlists - Nested Resources',
    resource: 'Songs in Playlists',
    operations: [
      {
        id: 'add-song',
        label: 'Song zu Playlist hinzufuegen',
        description: 'Fuegt einen Song zu einer bestimmten Playlist hinzu',
        correctEndpoint: { method: 'POST', path: '/api/v1/playlists/:id/songs', status: 201, statusText: 'Created' },
      },
      {
        id: 'list-songs',
        label: 'Songs einer Playlist abrufen',
        description: 'Gibt alle Songs einer Playlist zurueck',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists/:id/songs', status: 200, statusText: 'OK' },
      },
      {
        id: 'get-song',
        label: 'Einzelnen Song abrufen',
        description: 'Gibt einen bestimmten Song einer Playlist zurueck',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists/:id/songs/:songId', status: 200, statusText: 'OK' },
      },
      {
        id: 'remove-song',
        label: 'Song aus Playlist entfernen',
        description: 'Entfernt einen Song aus einer Playlist',
        correctEndpoint: { method: 'DELETE', path: '/api/v1/playlists/:id/songs/:songId', status: 204, statusText: 'No Content' },
      },
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/playlists/:id/songs', status: 201, statusText: 'Created' },
      { method: 'GET', path: '/api/v1/playlists/:id/songs', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists/:id/songs/:songId', status: 200, statusText: 'OK' },
      { method: 'DELETE', path: '/api/v1/playlists/:id/songs/:songId', status: 204, statusText: 'No Content' },
      // Distractors
      { method: 'POST', path: '/api/v1/songs', status: 201, statusText: 'Created' },
      { method: 'GET', path: '/api/v1/playlists/songs', status: 200, statusText: 'OK' },
      { method: 'PUT', path: '/api/v1/playlists/:id/songs', status: 200, statusText: 'OK' },
    ],
  },
  {
    id: 'query-params',
    label: 'Level 3: Query Parameters',
    title: 'Playlists mit Filtern und Pagination',
    resource: 'Playlists (erweitert)',
    operations: [
      {
        id: 'paginate',
        label: 'Playlists mit Pagination',
        description: 'Ruft die zweite Seite mit je 10 Playlists ab',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists?limit=10&offset=10', status: 200, statusText: 'OK' },
      },
      {
        id: 'filter-genre',
        label: 'Nach Genre filtern',
        description: 'Gibt nur Rock-Playlists zurueck',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists?genre=rock', status: 200, statusText: 'OK' },
      },
      {
        id: 'sort',
        label: 'Sortiert nach Erstellungsdatum',
        description: 'Playlists absteigend nach Datum sortiert',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists?sort=created&order=desc', status: 200, statusText: 'OK' },
      },
      {
        id: 'search',
        label: 'Playlists durchsuchen',
        description: 'Sucht nach Playlists die "Sommer" im Namen haben',
        correctEndpoint: { method: 'GET', path: '/api/v1/playlists?search=Sommer', status: 200, statusText: 'OK' },
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/playlists?limit=10&offset=10', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists?genre=rock', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists?sort=created&order=desc', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists?search=Sommer', status: 200, statusText: 'OK' },
      // Distractors
      { method: 'POST', path: '/api/v1/playlists/search?q=Sommer', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists/genre/rock', status: 200, statusText: 'OK' },
      { method: 'GET', path: '/api/v1/playlists?page=2&size=10', status: 200, statusText: 'OK' },
    ],
  },
]

const designChallenges: DesignChallenge[] = [
  {
    id: 'basic-crud',
    title: 'Basis CRUD entwerfen',
    description: 'Ordne jeder Operation den richtigen Endpoint zu.',
    targetValue: '5 von 5 korrekt',
    levelId: 'basic',
  },
  {
    id: 'nested-resources',
    title: 'Nested Resources',
    description: 'Ordne die Operationen fuer verschachtelte Ressourcen zu.',
    targetValue: '4 von 4 korrekt',
    levelId: 'nested',
  },
  {
    id: 'query-params',
    title: 'Query Parameters',
    description: 'Waehle die richtigen Endpoints mit Query-Parametern.',
    targetValue: '4 von 4 korrekt',
    levelId: 'query-params',
  },
]

// ─────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────

function endpointKey(ep: Endpoint): string {
  return `${ep.method}:${ep.path}:${ep.status}`
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function RestEndpointDesigner({ className }: DiagramProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [incorrectMatch, setIncorrectMatch] = useState<string | null>(null)
  const [shuffledEndpoints, setShuffledEndpoints] = useState(() => shuffleArray(levels[0].endpoints))

  const level = levels[currentLevel]

  const resetState = useCallback(() => {
    setSelectedOperation(null)
    setMatches({})
    setIncorrectMatch(null)
  }, [])

  const challenge = useChallengeMode<DesignChallenge>({
    challenges: designChallenges,
    onCheck: () => {
      // Check all operations have correct matches
      return level.operations.every(op => {
        const matchedKey = matches[op.id]
        const correctKey = endpointKey(op.correctEndpoint)
        return matchedKey === correctKey
      })
    },
    onReset: resetState,
  })

  const handleLevelChange = (id: string) => {
    const idx = levels.findIndex(l => l.id === id)
    if (idx >= 0) {
      setCurrentLevel(idx)
      setShuffledEndpoints(shuffleArray(levels[idx].endpoints))
      resetState()
      challenge.clearResult()
    }
  }

  const handleOperationClick = (opId: string) => {
    setSelectedOperation(prev => prev === opId ? null : opId)
    setIncorrectMatch(null)
  }

  const handleEndpointClick = (endpoint: Endpoint) => {
    if (!selectedOperation) return

    const epKey = endpointKey(endpoint)
    const operation = level.operations.find(op => op.id === selectedOperation)
    if (!operation) return

    const correctKey = endpointKey(operation.correctEndpoint)

    if (epKey === correctKey) {
      // Correct match
      setMatches(prev => ({ ...prev, [selectedOperation]: epKey }))
      setSelectedOperation(null)
      setIncorrectMatch(null)
    } else {
      // Incorrect match
      setIncorrectMatch(epKey)
      setTimeout(() => setIncorrectMatch(null), 1000)
    }
  }

  const isEndpointMatched = (endpoint: Endpoint): boolean => {
    const epKey = endpointKey(endpoint)
    return Object.values(matches).includes(epKey)
  }

  const getMatchedOperation = (endpoint: Endpoint): Operation | undefined => {
    const epKey = endpointKey(endpoint)
    const opId = Object.entries(matches).find(([, v]) => v === epKey)?.[0]
    return level.operations.find(op => op.id === opId)
  }

  const allMatched = level.operations.every(op => matches[op.id])

  const samples = levels.map(l => ({ id: l.id, label: l.label }))

  return (
    <DiagramShell
      title="REST Endpoint Designer"
      subtitle={level.title}
      className={className}
      samples={samples}
      currentSample={level.id}
      onSampleChange={handleLevelChange}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => { resetState(); setShuffledEndpoints(shuffleArray(level.endpoints)) }}>
            Reset
          </Button>
          <Button
            variant={challenge.isActive ? 'primary' : 'secondary'}
            size="sm"
            onClick={challenge.toggle}
          >
            {challenge.isActive ? 'Challenge AN' : 'Challenge'}
          </Button>
        </div>
      }
      footer={
        <p>
          <strong className="text-slate-400">REST Konventionen:</strong> Substantive im Plural,
          keine Verben in URIs, HTTP-Methode bestimmt die Aktion, Query-Parameter fuer Filterung.
        </p>
      }
    >
      {/* Challenge Banner */}
      <ChallengeBanner
        challenge={challenge}
        challenges={designChallenges}
        showTargetValue={false}
      />

      {/* Instructions */}
      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300">
        <strong className="text-slate-200">Anleitung:</strong>{' '}
        Klicke links auf eine Operation, dann rechts auf den passenden Endpoint.
        {selectedOperation && (
          <span className={`ml-2 ${highlightColors.amber.text}`}>
            Waehle jetzt einen Endpoint...
          </span>
        )}
      </div>

      {/* Matching Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Operations */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">Operationen</div>
          <div className="space-y-2">
            {level.operations.map(op => {
              const isMatched = !!matches[op.id]
              const isSelected = selectedOperation === op.id
              return (
                <motion.div
                  key={op.id}
                  whileHover={!isMatched ? { scale: 1.01 } : {}}
                  whileTap={!isMatched ? { scale: 0.99 } : {}}
                >
                  <button
                    onClick={() => !isMatched && handleOperationClick(op.id)}
                    disabled={isMatched}
                    className={`
                      w-full text-left p-3 rounded-lg border-2 transition-all
                      ${isMatched
                        ? 'border-green-500 bg-green-900/20 opacity-70'
                        : isSelected
                          ? 'border-amber-500 bg-amber-900/20'
                          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-200">{op.label}</div>
                        <div className="text-xs text-slate-400 mt-1">{op.description}</div>
                      </div>
                      {isMatched && <span className="text-green-400 text-lg">{'\u2713'}</span>}
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Endpoints */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">Endpoints</div>
          <div className="space-y-2">
            {shuffledEndpoints.map((ep, i) => {
              const epKey = endpointKey(ep)
              const matched = isEndpointMatched(ep)
              const matchedOp = getMatchedOperation(ep)
              const isIncorrect = incorrectMatch === epKey
              const methodStyle = methodColors[ep.method]

              return (
                <motion.div
                  key={`${epKey}-${i}`}
                  whileHover={!matched && selectedOperation ? { scale: 1.01 } : {}}
                  whileTap={!matched && selectedOperation ? { scale: 0.99 } : {}}
                  animate={isIncorrect ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={isIncorrect ? { duration: 0.4 } : {}}
                >
                  <button
                    onClick={() => handleEndpointClick(ep)}
                    disabled={matched || !selectedOperation}
                    className={`
                      w-full text-left p-3 rounded-lg border-2 transition-all
                      ${matched
                        ? 'border-green-500 bg-green-900/20 opacity-70'
                        : isIncorrect
                          ? 'border-red-500 bg-red-900/20'
                          : selectedOperation
                            ? 'border-slate-600 bg-slate-800/50 hover:border-blue-500 cursor-pointer'
                            : 'border-slate-700 bg-slate-800/30 cursor-default'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`
                        px-2 py-0.5 rounded text-xs font-bold font-mono
                        ${methodStyle.bg} ${methodStyle.text}
                      `}>
                        {ep.method}
                      </span>
                      <code className="text-sm text-slate-200 flex-1 font-mono">{ep.path}</code>
                      <span className="text-xs text-slate-500">{ep.status} {ep.statusText}</span>
                    </div>
                    {matched && matchedOp && (
                      <div className="text-xs text-green-400 mt-1 ml-1">
                        = {matchedOp.label}
                      </div>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Score / Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {Object.keys(matches).length} / {level.operations.length} zugeordnet
        </span>
        <div className="h-2 flex-1 mx-4 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            animate={{ width: `${(Object.keys(matches).length / level.operations.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Check Button */}
      {challenge.isActive && allMatched && !challenge.result && (
        <div className="flex justify-center">
          <Button variant="primary" onClick={challenge.check}>
            Antwort pruefen
          </Button>
        </div>
      )}

      {/* All Matched (non-challenge) */}
      <AnimatePresence>
        {!challenge.isActive && allMatched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg bg-green-900/20 border border-green-700/50 text-center"
          >
            <p className="text-green-400 font-semibold">
              Alle Operationen korrekt zugeordnet!
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Probiere das naechste Level oder aktiviere den Challenge-Modus.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge Result */}
      <ChallengeResult
        challenge={challenge}
        hint="Pruefe HTTP-Methode, Pfad und Status Code genau."
        successMessage="Perfekt! Alle Endpoints korrekt zugeordnet."
        failMessage="Noch nicht ganz richtig. Pruefe deine Zuordnungen nochmal."
      />
    </DiagramShell>
  )
}
