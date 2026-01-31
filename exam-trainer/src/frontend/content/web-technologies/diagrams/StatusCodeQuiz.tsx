// src/content/web-technologies/diagrams/StatusCodeQuiz.tsx
import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui'
import type { DiagramProps } from '@/core/types/content'

interface QuizQuestion {
  scenario: string
  correctCode: number
  options: number[]
  explanation: string
}

const allQuestions: QuizQuestion[] = [
  {
    scenario: 'Ressource wurde erfolgreich erstellt',
    correctCode: 201,
    options: [200, 201, 204, 301],
    explanation: '201 Created - Die Anfrage war erfolgreich und eine neue Ressource wurde erstellt.',
  },
  {
    scenario: 'Ungültiges JSON im Request Body',
    correctCode: 400,
    options: [400, 401, 404, 422],
    explanation: '400 Bad Request - Der Server kann die Anfrage nicht verarbeiten, da sie fehlerhaft ist.',
  },
  {
    scenario: 'Nicht eingeloggt, Authentifizierung erforderlich',
    correctCode: 401,
    options: [400, 401, 403, 404],
    explanation: '401 Unauthorized - Authentifizierung ist erforderlich, aber nicht vorhanden oder ungültig.',
  },
  {
    scenario: 'Eingeloggt, aber keine Berechtigung für diese Aktion',
    correctCode: 403,
    options: [401, 403, 404, 405],
    explanation: '403 Forbidden - Der Server verstanden die Anfrage, aber verweigert die Autorisierung.',
  },
  {
    scenario: 'Seite wurde nicht gefunden',
    correctCode: 404,
    options: [400, 403, 404, 410],
    explanation: '404 Not Found - Die angeforderte Ressource wurde auf dem Server nicht gefunden.',
  },
  {
    scenario: 'Server ist abgestürzt',
    correctCode: 500,
    options: [400, 500, 502, 503],
    explanation: '500 Internal Server Error - Ein unerwarteter Fehler ist auf dem Server aufgetreten.',
  },
  {
    scenario: 'Anfrage erfolgreich, Daten werden zurückgegeben',
    correctCode: 200,
    options: [200, 201, 204, 302],
    explanation: '200 OK - Die Anfrage war erfolgreich und die Antwort enthält die angeforderten Daten.',
  },
  {
    scenario: 'Anfrage erfolgreich, aber kein Inhalt zurückzugeben',
    correctCode: 204,
    options: [200, 201, 204, 304],
    explanation: '204 No Content - Die Anfrage war erfolgreich, aber es gibt keinen Inhalt zum Zurücksenden.',
  },
  {
    scenario: 'Server ist überlastet oder wartet',
    correctCode: 503,
    options: [500, 502, 503, 504],
    explanation: '503 Service Unavailable - Der Server ist vorübergehend nicht verfügbar (Überlastung/Wartung).',
  },
  {
    scenario: 'HTTP-Methode ist auf diesem Endpoint nicht erlaubt',
    correctCode: 405,
    options: [400, 403, 405, 415],
    explanation: '405 Method Not Allowed - Die angeforderte HTTP-Methode wird für diese Ressource nicht unterstützt.',
  },
  {
    scenario: 'Ressource wurde dauerhaft an eine neue URL verschoben',
    correctCode: 301,
    options: [301, 302, 307, 308],
    explanation: '301 Moved Permanently - Die Ressource wurde dauerhaft verschoben, alle Links sollten aktualisiert werden.',
  },
  {
    scenario: 'Temporäre Weiterleitung zu einer anderen URL',
    correctCode: 302,
    options: [301, 302, 304, 307],
    explanation: '302 Found - Die Ressource wurde temporär verschoben, der ursprüngliche Link bleibt gültig.',
  },
  {
    scenario: 'Gateway/Proxy erhält ungültige Antwort vom Upstream-Server',
    correctCode: 502,
    options: [500, 502, 503, 504],
    explanation: '502 Bad Gateway - Der Proxy/Gateway erhielt eine ungültige Antwort vom Backend-Server.',
  },
  {
    scenario: 'Anfrage dauert zu lange, Timeout',
    correctCode: 504,
    options: [408, 500, 503, 504],
    explanation: '504 Gateway Timeout - Der Proxy/Gateway erhielt keine rechtzeitige Antwort vom Backend.',
  },
  {
    scenario: 'Ressource existierte früher, ist jetzt aber dauerhaft entfernt',
    correctCode: 410,
    options: [404, 410, 451, 500],
    explanation: '410 Gone - Die Ressource existiert nicht mehr und wird auch nicht mehr zurückkehren.',
  },
]

const QUESTIONS_PER_ROUND = 10

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getStatusCodeCategory(code: number): { label: string; color: string } {
  if (code >= 100 && code < 200) return { label: 'Informational', color: 'text-slate-400' }
  if (code >= 200 && code < 300) return { label: 'Success', color: 'text-green-400' }
  if (code >= 300 && code < 400) return { label: 'Redirection', color: 'text-blue-400' }
  if (code >= 400 && code < 500) return { label: 'Client Error', color: 'text-amber-400' }
  if (code >= 500 && code < 600) return { label: 'Server Error', color: 'text-red-400' }
  return { label: 'Unknown', color: 'text-slate-400' }
}

interface OptionButtonProps {
  code: number
  onClick: () => void
  disabled: boolean
  state: 'default' | 'correct' | 'incorrect' | 'missed'
}

function OptionButton({ code, onClick, disabled, state }: OptionButtonProps) {
  const category = getStatusCodeCategory(code)

  const stateStyles = {
    default: 'bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-slate-500',
    correct: 'bg-green-900/50 border-green-500 ring-2 ring-green-500/50',
    incorrect: 'bg-red-900/50 border-red-500 ring-2 ring-red-500/50',
    missed: 'bg-green-900/30 border-green-500/50',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-4 rounded-lg border-2 transition-colors
        disabled:cursor-not-allowed
        ${stateStyles[state]}
      `}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      <div className="text-2xl font-mono font-bold text-white">{code}</div>
      <div className={`text-xs mt-1 ${category.color}`}>{category.label}</div>
    </motion.button>
  )
}

type QuizState = 'playing' | 'answered' | 'finished'

export function StatusCodeQuiz({ className }: DiagramProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(allQuestions).slice(0, QUESTIONS_PER_ROUND)
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizState, setQuizState] = useState<QuizState>('playing')

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + (quizState === 'answered' ? 1 : 0)) / QUESTIONS_PER_ROUND) * 100

  const handleAnswer = useCallback((code: number) => {
    if (quizState !== 'playing') return

    setSelectedAnswer(code)
    setQuizState('answered')

    if (code === currentQuestion.correctCode) {
      setScore(s => s + 1)
    }
  }, [quizState, currentQuestion])

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= QUESTIONS_PER_ROUND) {
      setQuizState('finished')
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
      setQuizState('playing')
    }
  }, [currentIndex])

  const handleRestart = useCallback(() => {
    setQuestions(shuffleArray(allQuestions).slice(0, QUESTIONS_PER_ROUND))
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizState('playing')
  }, [])

  const getOptionState = (code: number): OptionButtonProps['state'] => {
    if (quizState !== 'answered') return 'default'
    if (code === currentQuestion.correctCode) return 'correct'
    if (code === selectedAnswer) return 'incorrect'
    return 'default'
  }

  const scorePercentage = useMemo(() =>
    Math.round((score / QUESTIONS_PER_ROUND) * 100),
    [score]
  )

  const getScoreMessage = () => {
    if (scorePercentage === 100) return 'Perfekt! Du bist ein HTTP-Experte!'
    if (scorePercentage >= 80) return 'Sehr gut! Du kennst dich aus!'
    if (scorePercentage >= 60) return 'Gut gemacht! Weiter so!'
    if (scorePercentage >= 40) return 'Nicht schlecht, aber da geht noch mehr!'
    return 'Mehr Übung wird helfen!'
  }

  if (quizState === 'finished') {
    return (
      <Card className={`p-6 ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Quiz beendet!</h2>

          <div className="my-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-slate-700 border-4 border-slate-600"
            >
              <div>
                <div className="text-4xl font-bold text-white">{score}/{QUESTIONS_PER_ROUND}</div>
                <div className="text-sm text-slate-400">{scorePercentage}%</div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg mb-6 ${
              scorePercentage >= 80 ? 'text-green-400' :
              scorePercentage >= 60 ? 'text-blue-400' :
              scorePercentage >= 40 ? 'text-amber-400' :
              'text-red-400'
            }`}
          >
            {getScoreMessage()}
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            Nochmal spielen
          </motion.button>
        </motion.div>
      </Card>
    )
  }

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-400">
          Frage {currentIndex + 1} von {QUESTIONS_PER_ROUND}
        </div>
        <div className="text-sm font-medium text-white">
          Punkte: {score}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-white text-center">
              {currentQuestion.scenario}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentQuestion.options.map(code => (
              <OptionButton
                key={code}
                code={code}
                onClick={() => handleAnswer(code)}
                disabled={quizState === 'answered'}
                state={getOptionState(code)}
              />
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {quizState === 'answered' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === currentQuestion.correctCode
                    ? 'bg-green-900/30 border border-green-700'
                    : 'bg-red-900/30 border border-red-700'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === currentQuestion.correctCode ? (
                      <span className="text-green-400 font-medium">Richtig!</span>
                    ) : (
                      <span className="text-red-400 font-medium">Falsch!</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-300">{currentQuestion.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  {currentIndex + 1 >= QUESTIONS_PER_ROUND ? 'Ergebnis anzeigen' : 'Weiter'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
