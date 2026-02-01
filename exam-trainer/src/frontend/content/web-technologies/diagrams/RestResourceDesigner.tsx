// src/content/web-technologies/diagrams/RestResourceDesigner.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  requestBody?: string
  responseBody: string
  statusCode: number
}

interface BadDesign {
  id: string
  endpoint: string
  method: string
  problem: string
  explanation: string
  fixed: string
}

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const BAD_DESIGNS: BadDesign[] = [
  {
    id: 'verb-in-url',
    endpoint: 'GET /getPlaylist/42',
    method: 'GET',
    problem: 'Verb in URL',
    explanation: 'REST-Ressourcen sollten Substantive sein. Das HTTP-Verb zeigt die Aktion an.',
    fixed: 'GET /playlists/42',
  },
  {
    id: 'wrong-method-delete',
    endpoint: 'POST /playlists/delete/42',
    method: 'POST',
    problem: 'Falsche Methode',
    explanation: 'Zum Löschen sollte DELETE verwendet werden, nicht POST mit "delete" im Pfad.',
    fixed: 'DELETE /playlists/42',
  },
  {
    id: 'action-endpoint',
    endpoint: 'GET /playlists/42/getTrackCount',
    method: 'GET',
    problem: 'Action-Endpoint',
    explanation: 'Solche Informationen sollten Teil der Ressourcen-Repräsentation sein.',
    fixed: 'GET /playlists/42 (mit trackCount im Response)',
  },
  {
    id: 'plural-inconsistent',
    endpoint: 'GET /playlist/42',
    method: 'GET',
    problem: 'Inkonsistente Pluralisierung',
    explanation: 'Ressourcen-Namen sollten im Plural sein für Konsistenz.',
    fixed: 'GET /playlists/42',
  },
  {
    id: 'update-without-id',
    endpoint: 'PUT /playlists',
    method: 'PUT',
    problem: 'Update ohne ID',
    explanation: 'PUT/PATCH sollte eine spezifische Ressource via ID adressieren.',
    fixed: 'PUT /playlists/42',
  },
  {
    id: 'create-with-id',
    endpoint: 'POST /playlists/42',
    method: 'POST',
    problem: 'POST mit ID',
    explanation: 'POST erstellt neue Ressourcen - der Server vergibt die ID.',
    fixed: 'POST /playlists (Server vergibt ID)',
  },
]

const PRESET_RESOURCES = [
  'Playlist',
  'User',
  'Track',
  'Album',
  'Artist',
  'Comment',
  'Order',
  'Product',
]

// ─────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────

function pluralize(word: string): string {
  const lower = word.toLowerCase()
  if (lower.endsWith('y')) return lower.slice(0, -1) + 'ies'
  if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('ch') || lower.endsWith('sh')) {
    return lower + 'es'
  }
  return lower + 's'
}

function generateEndpoints(resourceName: string): Endpoint[] {
  const plural = pluralize(resourceName)
  const singular = resourceName.toLowerCase()

  return [
    {
      method: 'GET',
      path: `/${plural}`,
      description: `Alle ${resourceName}s abrufen`,
      responseBody: `[
  { "id": 1, "name": "${singular} 1" },
  { "id": 2, "name": "${singular} 2" }
]`,
      statusCode: 200,
    },
    {
      method: 'GET',
      path: `/${plural}/:id`,
      description: `Einzelne/n ${resourceName} abrufen`,
      responseBody: `{
  "id": 42,
  "name": "${singular} details",
  "createdAt": "2024-01-15T10:30:00Z"
}`,
      statusCode: 200,
    },
    {
      method: 'POST',
      path: `/${plural}`,
      description: `Neue/n ${resourceName} erstellen`,
      requestBody: `{
  "name": "New ${singular}"
}`,
      responseBody: `{
  "id": 43,
  "name": "New ${singular}",
  "createdAt": "2024-02-20T14:00:00Z"
}`,
      statusCode: 201,
    },
    {
      method: 'PUT',
      path: `/${plural}/:id`,
      description: `${resourceName} vollständig aktualisieren`,
      requestBody: `{
  "name": "Updated ${singular}",
  "description": "Full update"
}`,
      responseBody: `{
  "id": 42,
  "name": "Updated ${singular}",
  "description": "Full update"
}`,
      statusCode: 200,
    },
    {
      method: 'PATCH',
      path: `/${plural}/:id`,
      description: `${resourceName} teilweise aktualisieren`,
      requestBody: `{
  "name": "Patched ${singular}"
}`,
      responseBody: `{
  "id": 42,
  "name": "Patched ${singular}"
}`,
      statusCode: 200,
    },
    {
      method: 'DELETE',
      path: `/${plural}/:id`,
      description: `${resourceName} löschen`,
      responseBody: '(No Content)',
      statusCode: 204,
    },
  ]
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function RestResourceDesigner({ className }: DiagramProps) {
  const [resourceName, setResourceName] = useState('Playlist')
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)
  const [quizMode, setQuizMode] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const endpoints = useMemo(() => generateEndpoints(resourceName), [resourceName])
  const currentBadDesign = BAD_DESIGNS[currentQuiz]

  // Handle quiz answer
  const handleQuizAnswer = (answer: 'correct' | 'incorrect') => {
    setUserAnswer(answer)
    setShowExplanation(true)
    if (answer === 'incorrect') {
      // All these designs are bad, so "incorrect" is the right answer
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }))
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }))
    }
  }

  // Next quiz question
  const nextQuestion = () => {
    setUserAnswer(null)
    setShowExplanation(false)
    setCurrentQuiz(prev => (prev + 1) % BAD_DESIGNS.length)
  }

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuiz(0)
    setUserAnswer(null)
    setShowExplanation(false)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <DiagramShell
      title="REST Resource Designer"
      subtitle={quizMode ? 'Finde die REST-Designfehler' : 'Entwirf RESTful API Endpoints'}
      className={className}
      actions={
        <Button
          variant={quizMode ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => {
            setQuizMode(!quizMode)
            if (quizMode) {
              resetQuiz()
            }
          }}
        >
          {quizMode ? 'Designer-Modus' : "What's Wrong?"}
        </Button>
      }
      footer={
        <div className="space-y-1">
          <p><strong className="text-slate-400">REST-Prinzipien:</strong></p>
          <p>
            * <strong>Substantive</strong> fur URLs, <strong>Verben</strong> via HTTP-Methoden &nbsp;|&nbsp;
            * Plural fur Collections (<code className="bg-slate-700 px-1 rounded">/playlists</code>)
          </p>
          <p>
            * <strong>GET</strong> = Lesen &nbsp;|&nbsp;
            <strong>POST</strong> = Erstellen &nbsp;|&nbsp;
            <strong>PUT</strong> = Ersetzen &nbsp;|&nbsp;
            <strong>PATCH</strong> = Teilupdate &nbsp;|&nbsp;
            <strong>DELETE</strong> = Loschen
          </p>
        </div>
      }
    >
      {/* Quiz Mode */}
        <AnimatePresence mode="wait">
          {quizMode ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Frage {currentQuiz + 1} / {BAD_DESIGNS.length}
                </span>
                <span className="text-sm text-slate-400">
                  Score: {score.correct} / {score.total}
                </span>
              </div>

              {/* Quiz Card */}
              <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
                <p className="text-sm text-slate-400 mb-4">Ist dieser REST-Endpoint korrekt designed?</p>

                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`
                      px-3 py-1.5 rounded-lg font-bold font-mono text-sm border
                      ${METHOD_COLORS[currentBadDesign.method]}
                    `}
                  >
                    {currentBadDesign.method}
                  </span>
                  <code className="text-lg font-mono text-slate-100">
                    {currentBadDesign.endpoint.replace(currentBadDesign.method + ' ', '')}
                  </code>
                </div>

                {/* Answer buttons */}
                {!userAnswer && (
                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => handleQuizAnswer('correct')}
                      className="flex-1"
                    >
                      ✓ Korrekt
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleQuizAnswer('incorrect')}
                      className="flex-1"
                    >
                      ✗ Falsch
                    </Button>
                  </div>
                )}

                {/* Result */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-4"
                    >
                      <div
                        className={`
                          p-4 rounded-lg
                          ${userAnswer === 'incorrect'
                            ? 'bg-green-900/30 border border-green-700/50'
                            : 'bg-red-900/30 border border-red-700/50'}
                        `}
                      >
                        {userAnswer === 'incorrect' ? (
                          <div className="text-green-400">
                            <span className="text-xl">✓</span>
                            <span className="ml-2 font-semibold">Richtig erkannt!</span>
                          </div>
                        ) : (
                          <div className="text-red-400">
                            <span className="text-xl">✗</span>
                            <span className="ml-2 font-semibold">Leider falsch</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-amber-900/20 border border-amber-700/50">
                          <div className="text-sm font-medium text-amber-400 mb-1">
                            Problem: {currentBadDesign.problem}
                          </div>
                          <p className="text-sm text-slate-300">{currentBadDesign.explanation}</p>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-700/50">
                          <div className="text-sm font-medium text-emerald-400 mb-1">Besser:</div>
                          <code className="font-mono text-slate-200">{currentBadDesign.fixed}</code>
                        </div>
                      </div>

                      <Button variant="primary" onClick={nextQuestion} className="w-full">
                        Nächste Frage
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="designer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Resource Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Ressourcen-Name</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={resourceName}
                    onChange={(e) => {
                      setResourceName(e.target.value)
                      setSelectedEndpoint(null)
                    }}
                    placeholder="z.B. Playlist, User, Track"
                    className="
                      flex-1 px-4 py-2 rounded-lg border border-slate-600
                      bg-slate-900 text-slate-100
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_RESOURCES.map(preset => (
                    <button
                      key={preset}
                      onClick={() => {
                        setResourceName(preset)
                        setSelectedEndpoint(null)
                      }}
                      className={`
                        px-3 py-1 rounded-lg text-sm transition-colors
                        ${resourceName === preset
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
                      `}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoints Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Generated REST Endpoints</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700 text-left">
                        <th className="py-2 px-3 text-slate-400 text-sm font-medium">Method</th>
                        <th className="py-2 px-3 text-slate-400 text-sm font-medium">Endpoint</th>
                        <th className="py-2 px-3 text-slate-400 text-sm font-medium">Beschreibung</th>
                        <th className="py-2 px-3 text-slate-400 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints.map((endpoint, i) => (
                        <motion.tr
                          key={`${endpoint.method}-${endpoint.path}`}
                          className={`
                            border-b border-slate-800 cursor-pointer transition-colors
                            ${selectedEndpoint === endpoint
                              ? 'bg-blue-900/30'
                              : 'hover:bg-slate-800/50'}
                          `}
                          onClick={() => setSelectedEndpoint(
                            selectedEndpoint === endpoint ? null : endpoint
                          )}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <td className="py-3 px-3">
                            <span
                              className={`
                                inline-block px-2 py-0.5 rounded font-bold font-mono text-xs border
                                ${METHOD_COLORS[endpoint.method]}
                              `}
                            >
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-sm text-slate-200">
                            {endpoint.path}
                          </td>
                          <td className="py-3 px-3 text-sm text-slate-400">
                            {endpoint.description}
                          </td>
                          <td className="py-3 px-3 text-sm text-slate-500">
                            {endpoint.statusCode}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selected Endpoint Details */}
              <AnimatePresence>
                {selectedEndpoint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            px-3 py-1 rounded-lg font-bold font-mono text-sm border
                            ${METHOD_COLORS[selectedEndpoint.method]}
                          `}
                        >
                          {selectedEndpoint.method}
                        </span>
                        <code className="font-mono text-slate-100">{selectedEndpoint.path}</code>
                      </div>

                      {selectedEndpoint.requestBody && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-slate-400">Request Body:</div>
                          <pre className="p-3 rounded-lg bg-slate-900 text-sm font-mono text-blue-300 overflow-x-auto">
                            {selectedEndpoint.requestBody}
                          </pre>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-400">Response:</span>
                          <span
                            className={`
                              px-2 py-0.5 rounded text-xs font-mono
                              ${selectedEndpoint.statusCode < 300
                                ? 'bg-green-900/30 text-green-400'
                                : 'bg-amber-900/30 text-amber-400'}
                            `}
                          >
                            {selectedEndpoint.statusCode}
                          </span>
                        </div>
                        <pre className="p-3 rounded-lg bg-slate-900 text-sm font-mono text-green-300 overflow-x-auto">
                          {selectedEndpoint.responseBody}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

    </DiagramShell>
  )
}
