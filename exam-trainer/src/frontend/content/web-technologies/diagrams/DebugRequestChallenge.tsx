// src/content/web-technologies/diagrams/DebugRequestChallenge.tsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface ErrorSpan {
  id: string
  text: string
  isError: boolean
  errorType?: string
  explanation?: string
}

interface HttpLine {
  id: string
  type: 'request-line' | 'status-line' | 'header' | 'empty' | 'body'
  spans: ErrorSpan[]
}

interface Challenge {
  id: string
  title: string
  description: string
  isRequest: boolean
  lines: HttpLine[]
  totalErrors: number
}

// ─────────────────────────────────────────────────
// Challenge Data
// ─────────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'POST Request mit fehlenden Headers',
    description: 'Ein POST Request zum Erstellen einer neuen Playlist. Finde die 3 Fehler!',
    isRequest: true,
    totalErrors: 3,
    lines: [
      {
        id: 'line-1',
        type: 'request-line',
        spans: [
          { id: 's1', text: 'POST', isError: false },
          { id: 's2', text: ' /playlists ', isError: false },
          { id: 's3', text: 'HTTP/1.1', isError: false },
        ],
      },
      {
        id: 'line-2',
        type: 'header',
        spans: [
          { id: 's4', text: 'Host', isError: false },
          { id: 's5', text: ': ', isError: false },
          { id: 's6', text: 'api.example.com', isError: false },
        ],
      },
      {
        id: 'line-3',
        type: 'header',
        spans: [
          { id: 's7', text: 'Accept', isError: false },
          { id: 's8', text: ': ', isError: false },
          { id: 's9', text: 'application/json', isError: false },
        ],
      },
      {
        id: 'line-4',
        type: 'empty',
        spans: [
          {
            id: 's10',
            text: '[ Content-Type Header fehlt ]',
            isError: true,
            errorType: 'Missing Header',
            explanation:
              'Bei POST Requests mit JSON Body muss der Content-Type Header gesetzt sein: "Content-Type: application/json". Ohne diesen Header weiß der Server nicht, wie er den Body interpretieren soll.',
          },
        ],
      },
      {
        id: 'line-5',
        type: 'body',
        spans: [
          { id: 's11', text: '{"name": "My Playlist"', isError: false },
          {
            id: 's12',
            text: ' "tracks": []',
            isError: true,
            errorType: 'Malformed JSON',
            explanation:
              'Zwischen "My Playlist" und "tracks" fehlt ein Komma. Korrektes JSON: {"name": "My Playlist", "tracks": []}',
          },
          { id: 's13', text: '}', isError: false },
        ],
      },
      {
        id: 'line-6',
        type: 'body',
        spans: [
          {
            id: 's14',
            text: '[ Content-Length Header fehlt ]',
            isError: true,
            errorType: 'Missing Header',
            explanation:
              'Bei Requests mit Body sollte der Content-Length Header die Größe des Bodys in Bytes angeben. Dies hilft dem Server zu wissen, wann der Body vollständig empfangen wurde.',
          },
        ],
      },
    ],
  },
  {
    id: 'challenge-2',
    title: 'GET Request mit unerlaubtem Body',
    description: 'Ein GET Request zum Abrufen von Daten. Finde die 3 Fehler!',
    isRequest: true,
    totalErrors: 3,
    lines: [
      {
        id: 'line-1',
        type: 'request-line',
        spans: [
          {
            id: 's1',
            text: 'GET',
            isError: true,
            errorType: 'Wrong Method',
            explanation:
              'GET Requests sollten keinen Body haben. Wenn Daten übermittelt werden sollen, entweder Query-Parameter verwenden oder POST/PUT nutzen.',
          },
          { id: 's2', text: ' /search ', isError: false },
          { id: 's3', text: 'HTTP/1.1', isError: false },
        ],
      },
      {
        id: 'line-2',
        type: 'header',
        spans: [
          { id: 's4', text: 'Host', isError: false },
          { id: 's5', text: ': ', isError: false },
          { id: 's6', text: 'api.example.com', isError: false },
        ],
      },
      {
        id: 'line-3',
        type: 'header',
        spans: [
          {
            id: 's7',
            text: 'Content-Type',
            isError: true,
            errorType: 'Unnecessary Header',
            explanation:
              'Content-Type ist bei GET Requests ohne Body unnötig und deutet auf einen Designfehler hin. GET sollte keine Daten im Body senden.',
          },
          { id: 's8', text: ': ', isError: false },
          { id: 's9', text: 'application/json', isError: false },
        ],
      },
      {
        id: 'line-4',
        type: 'empty',
        spans: [{ id: 's10', text: '', isError: false }],
      },
      {
        id: 'line-5',
        type: 'body',
        spans: [
          {
            id: 's11',
            text: '{"query": "playlist"}',
            isError: true,
            errorType: 'Body in GET',
            explanation:
              'GET Requests dürfen laut HTTP-Spezifikation keinen Body haben. Stattdessen sollte ein Query-Parameter verwendet werden: GET /search?query=playlist',
          },
        ],
      },
    ],
  },
  {
    id: 'challenge-3',
    title: 'Response mit falschen Status Codes',
    description: 'Eine Server-Antwort auf einen POST Request. Finde die 3 Fehler!',
    isRequest: false,
    totalErrors: 3,
    lines: [
      {
        id: 'line-1',
        type: 'status-line',
        spans: [
          { id: 's1', text: 'HTTP/1.1 ', isError: false },
          {
            id: 's2',
            text: '200 OK',
            isError: true,
            errorType: 'Wrong Status Code',
            explanation:
              'Wenn eine neue Ressource erstellt wurde, sollte der Status Code 201 Created sein, nicht 200 OK. 200 OK wird für erfolgreiche GET Requests verwendet.',
          },
        ],
      },
      {
        id: 'line-2',
        type: 'header',
        spans: [
          { id: 's3', text: 'Content-Type', isError: false },
          { id: 's4', text: ': ', isError: false },
          { id: 's5', text: 'application/json', isError: false },
        ],
      },
      {
        id: 'line-3',
        type: 'header',
        spans: [
          {
            id: 's6',
            text: '[ Location Header fehlt ]',
            isError: true,
            errorType: 'Missing Header',
            explanation:
              'Bei 201 Created Responses sollte ein Location Header mit der URL der neu erstellten Ressource enthalten sein, z.B.: Location: /playlists/123',
          },
        ],
      },
      {
        id: 'line-4',
        type: 'empty',
        spans: [{ id: 's7', text: '', isError: false }],
      },
      {
        id: 'line-5',
        type: 'body',
        spans: [
          { id: 's8', text: '{"id": 123, "name": "My Playlist", ', isError: false },
          {
            id: 's9',
            text: '"created": true',
            isError: true,
            errorType: 'Redundant Information',
            explanation:
              'Das Feld "created": true ist redundant und schlechtes API Design. Der Status Code 201 Created zeigt bereits an, dass die Ressource erstellt wurde. APIs sollten keine Statusinformationen duplizieren.',
          },
          { id: 's10', text: '}', isError: false },
        ],
      },
    ],
  },
  {
    id: 'challenge-4',
    title: 'DELETE Response mit Protokollfehler',
    description: 'Eine Antwort auf einen DELETE Request. Finde die 3 Fehler!',
    isRequest: false,
    totalErrors: 3,
    lines: [
      {
        id: 'line-1',
        type: 'status-line',
        spans: [
          {
            id: 's1',
            text: 'HTTP/2',
            isError: true,
            errorType: 'Protocol Mismatch',
            explanation:
              'Wenn der Request mit HTTP/1.1 gesendet wurde, muss die Antwort ebenfalls HTTP/1.1 sein. Ein Protokollwechsel ohne Upgrade ist nicht erlaubt.',
          },
          { id: 's2', text: ' ', isError: false },
          {
            id: 's3',
            text: '201 Created',
            isError: true,
            errorType: 'Wrong Status Code',
            explanation:
              'DELETE Requests sollten mit 204 No Content (bei Erfolg ohne Body) oder 200 OK (bei Erfolg mit Body) antworten. 201 Created ist nur für das Erstellen neuer Ressourcen gedacht.',
          },
        ],
      },
      {
        id: 'line-2',
        type: 'header',
        spans: [
          { id: 's4', text: 'Content-Type', isError: false },
          { id: 's5', text: ': ', isError: false },
          { id: 's6', text: 'application/json', isError: false },
        ],
      },
      {
        id: 'line-3',
        type: 'empty',
        spans: [{ id: 's7', text: '', isError: false }],
      },
      {
        id: 'line-4',
        type: 'body',
        spans: [
          { id: 's8', text: '{"', isError: false },
          {
            id: 's9',
            text: 'deleted',
            isError: true,
            errorType: 'Inconsistent Response',
            explanation:
              'Bei 204 No Content darf kein Body vorhanden sein. Wenn ein Body mit Informationen über die gelöschte Ressource gewünscht ist, sollte 200 OK verwendet werden.',
          },
          { id: 's10', text: '": true}', isError: false },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────────
// Helper Components
// ─────────────────────────────────────────────────

interface ErrorSpanProps {
  span: ErrorSpan
  isFound: boolean
  onSelect: (span: ErrorSpan) => void
}

function ErrorSpanComponent({ span, isFound, onSelect }: ErrorSpanProps) {
  const isClickable = span.isError
  const isPlaceholder = span.text.startsWith('[') && span.text.endsWith(']')

  return (
    <motion.span
      className={`
        ${isClickable ? 'cursor-pointer' : ''}
        ${
          isFound
            ? 'bg-green-500/30 text-green-300 line-through decoration-green-400'
            : isClickable
              ? 'hover:bg-red-500/20 rounded px-0.5 -mx-0.5 transition-colors'
              : ''
        }
        ${isPlaceholder && !isFound ? 'text-red-400/60 italic text-xs' : ''}
      `}
      whileHover={isClickable && !isFound ? { scale: 1.02 } : {}}
      whileTap={isClickable && !isFound ? { scale: 0.98 } : {}}
      onClick={() => isClickable && !isFound && onSelect(span)}
    >
      {span.text}
    </motion.span>
  )
}

interface ExplanationPopupProps {
  span: ErrorSpan
  onClose: () => void
}

function ExplanationPopup({ span, onClose }: ExplanationPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute z-10 left-0 right-0 mx-4 mt-2"
    >
      <div className="bg-slate-700 border border-green-500/50 rounded-lg p-4 shadow-xl">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">
              {span.errorType}
            </span>
            <span className="text-green-400 text-sm font-medium">Fehler gefunden!</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed">{span.explanation}</p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function DebugRequestChallenge({ className }: DiagramProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [foundErrors, setFoundErrors] = useState<Set<string>>(new Set())
  const [selectedSpan, setSelectedSpan] = useState<ErrorSpan | null>(null)
  const [wrongClicks, setWrongClicks] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [showChallengeComplete, setShowChallengeComplete] = useState(false)

  const currentChallenge = CHALLENGES[currentChallengeIndex]
  const errorsFound = foundErrors.size
  const totalErrors = currentChallenge.totalErrors

  const handleSpanSelect = useCallback(
    (span: ErrorSpan) => {
      if (span.isError && !foundErrors.has(span.id)) {
        const newFoundErrors = new Set(foundErrors)
        newFoundErrors.add(span.id)
        setFoundErrors(newFoundErrors)
        setSelectedSpan(span)

        // Check if challenge is complete
        if (newFoundErrors.size === totalErrors) {
          const challengeScore = Math.max(0, 100 - wrongClicks * 10)
          setTotalScore((prev) => prev + challengeScore)
          setChallengesCompleted((prev) => prev + 1)
          setTimeout(() => setShowChallengeComplete(true), 500)
        }
      } else if (!span.isError) {
        setWrongClicks((prev) => prev + 1)
        // Brief shake animation on wrong click
      }
    },
    [foundErrors, totalErrors, wrongClicks]
  )

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prev) => (prev + 1) % CHALLENGES.length)
    setFoundErrors(new Set())
    setSelectedSpan(null)
    setWrongClicks(0)
    setShowChallengeComplete(false)
  }

  const handleReset = () => {
    setCurrentChallengeIndex(0)
    setFoundErrors(new Set())
    setSelectedSpan(null)
    setWrongClicks(0)
    setTotalScore(0)
    setChallengesCompleted(0)
    setShowChallengeComplete(false)
  }

  const getLineColor = (type: HttpLine['type']) => {
    switch (type) {
      case 'request-line':
      case 'status-line':
        return 'text-cyan-400'
      case 'header':
        return 'text-orange-400'
      case 'body':
        return 'text-slate-300'
      default:
        return 'text-slate-500'
    }
  }

  return (
    <Card className={`p-6 ${className ?? ''}`}>
      <div className="space-y-6">
        {/* Header with score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Debug the Request
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Klicke auf die fehlerhaften Teile des HTTP Request/Response
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Score display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-200 font-medium">{challengesCompleted}/{CHALLENGES.length}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-slate-200 font-medium">{totalScore}</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>

        {/* Challenge selector */}
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map((challenge, index) => (
            <motion.button
              key={challenge.id}
              onClick={() => {
                setCurrentChallengeIndex(index)
                setFoundErrors(new Set())
                setSelectedSpan(null)
                setWrongClicks(0)
                setShowChallengeComplete(false)
              }}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${
                  currentChallengeIndex === index
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Challenge {index + 1}
            </motion.button>
          ))}
        </div>

        {/* Challenge info */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <h4 className="text-slate-100 font-medium mb-1">{currentChallenge.title}</h4>
          <p className="text-sm text-slate-400">{currentChallenge.description}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">
              Fehler gefunden: {errorsFound} / {totalErrors}
            </span>
            {wrongClicks > 0 && (
              <span className="text-red-400">Fehlklicks: {wrongClicks}</span>
            )}
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${(errorsFound / totalErrors) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* HTTP Request/Response display */}
        <div className="relative">
          <motion.div
            className="rounded-lg border-2 border-slate-600 bg-slate-900 overflow-hidden"
            animate={wrongClicks > 0 ? { x: [0, -5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            key={wrongClicks}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs font-medium text-slate-400">
                {currentChallenge.isRequest ? 'HTTP REQUEST' : 'HTTP RESPONSE'}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  currentChallenge.isRequest
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}
              >
                {currentChallenge.isRequest ? 'Request' : 'Response'}
              </span>
            </div>

            <pre className="p-4 text-sm font-mono overflow-x-auto">
              {currentChallenge.lines.map((line) => (
                <div
                  key={line.id}
                  className={`${getLineColor(line.type)} ${line.type === 'empty' ? 'min-h-[1.5em]' : ''}`}
                >
                  {line.spans.map((span) => (
                    <ErrorSpanComponent
                      key={span.id}
                      span={span}
                      isFound={foundErrors.has(span.id)}
                      onSelect={handleSpanSelect}
                    />
                  ))}
                </div>
              ))}
            </pre>
          </motion.div>

          {/* Explanation popup */}
          <AnimatePresence>
            {selectedSpan && (
              <ExplanationPopup span={selectedSpan} onClose={() => setSelectedSpan(null)} />
            )}
          </AnimatePresence>
        </div>

        {/* Challenge complete overlay */}
        <AnimatePresence>
          {showChallengeComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <svg
                  className="w-12 h-12 mx-auto text-green-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <h4 className="text-xl font-bold text-green-400 mb-2">Challenge bestanden!</h4>
              <p className="text-slate-300 mb-4">
                Du hast alle Fehler gefunden.
                {wrongClicks === 0
                  ? ' Perfekt - keine Fehlklicks!'
                  : ` ${wrongClicks} Fehlklick${wrongClicks > 1 ? 's' : ''}.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" onClick={handleNextChallenge}>
                  Nächste Challenge
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Alle neu starten
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hints section */}
        <div className="text-xs text-slate-500 space-y-1 border-t border-slate-700 pt-4">
          <p>
            <strong className="text-slate-400">Tipp:</strong> Achte auf fehlende Headers,
            falsche Status Codes, JSON-Syntax und Protokollfehler.
          </p>
          <p>
            <strong className="text-slate-400">Scoring:</strong> 100 Punkte pro Challenge,
            minus 10 Punkte pro Fehlklick.
          </p>
        </div>
      </div>
    </Card>
  )
}
