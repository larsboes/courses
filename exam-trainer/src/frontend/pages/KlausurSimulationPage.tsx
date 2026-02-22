// src/pages/KlausurSimulationPage.tsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Card } from '@/core/components/ui'
import { ExamTask, ExamTimer, ExamResults, clearTimerState } from '@/core/components/exam'
import type { TaskResult } from '@/core/components/exam'
import type { ExamSimulation } from '@/core/types/content'
import { examSimulations } from '@/content/web-technologies/exam-simulations'
import { motion } from 'framer-motion'

type PageState = 'selection' | 'exam' | 'results'

const STORAGE_KEY = 'klausur-simulation-state'

interface SavedState {
  simulationId: string
  taskIndex: number
  results: TaskResult[]
  startTime: number
}

function loadSavedState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(state: SavedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}

export function KlausurSimulationPage() {
  const { courseId } = useParams<{ courseId: string }>()

  const [pageState, setPageState] = useState<PageState>('selection')
  const [selectedSim, setSelectedSim] = useState<ExamSimulation | null>(null)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [taskResults, setTaskResults] = useState<TaskResult[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [showRecovery, setShowRecovery] = useState(false)
  const [savedState, setSavedState] = useState<SavedState | null>(null)

  // Check for ongoing exam on mount
  useEffect(() => {
    const saved = loadSavedState()
    if (saved) {
      setSavedState(saved)
      setShowRecovery(true)
    }
  }, [])

  // Navigation guard
  useEffect(() => {
    if (pageState !== 'exam') return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [pageState])

  const startExam = (sim: ExamSimulation) => {
    setSelectedSim(sim)
    setCurrentTaskIndex(0)
    setTaskResults([])
    setStartTime(Date.now())
    setPageState('exam')
    setShowRecovery(false)
    clearTimerState(sim.id)
    saveState({
      simulationId: sim.id,
      taskIndex: 0,
      results: [],
      startTime: Date.now(),
    })
  }

  const resumeExam = () => {
    if (!savedState) return
    const sim = examSimulations.find(s => s.id === savedState.simulationId)
    if (!sim) return

    setSelectedSim(sim)
    setCurrentTaskIndex(savedState.taskIndex)
    setTaskResults(savedState.results)
    setStartTime(savedState.startTime)
    setPageState('exam')
    setShowRecovery(false)
  }

  const finishExam = useCallback(() => {
    setPageState('results')
    if (selectedSim) clearTimerState(selectedSim.id)
    clearState()
  }, [selectedSim])

  const handleTaskComplete = (scores: number[]) => {
    if (!selectedSim) return

    const task = selectedSim.tasks[currentTaskIndex]
    const result: TaskResult = {
      taskTitle: task.title,
      taskPoints: task.points,
      partScores: scores,
    }

    const newResults = [...taskResults, result]
    setTaskResults(newResults)

    if (currentTaskIndex < selectedSim.tasks.length - 1) {
      const nextIndex = currentTaskIndex + 1
      setCurrentTaskIndex(nextIndex)
      saveState({
        simulationId: selectedSim.id,
        taskIndex: nextIndex,
        results: newResults,
        startTime,
      })
    } else {
      finishExam()
    }
  }

  const handleTimeExpired = useCallback(() => {
    finishExam()
  }, [finishExam])

  const resetToSelection = () => {
    setPageState('selection')
    setSelectedSim(null)
    setCurrentTaskIndex(0)
    setTaskResults([])
    clearState()
  }

  // ─── Selection View ───
  if (pageState === 'selection') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <div className="max-w-3xl mx-auto">
          <Link to={`/course/${courseId}`} className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
            &larr; Zurück zum Kurs
          </Link>

          <h1 className="text-3xl font-bold mb-2">Klausur-Simulation</h1>
          <p className="text-slate-400 mb-8">
            Wähle eine Klausurvariante. Jede Simulation hat 4 Aufgaben mit Timer — genau wie in der echten Klausur.
          </p>

          {/* Recovery banner */}
          {showRecovery && savedState && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-amber-900/30 border border-amber-700 rounded-lg"
            >
              <p className="text-amber-200 font-medium mb-2">
                Laufende Klausur gefunden
              </p>
              <p className="text-sm text-slate-400 mb-3">
                Du hast eine Klausur begonnen ({examSimulations.find(s => s.id === savedState.simulationId)?.title}).
                Aufgabe {savedState.taskIndex + 1} von {examSimulations.find(s => s.id === savedState.simulationId)?.tasks.length}.
              </p>
              <div className="flex gap-2">
                <Button onClick={resumeExam} className="bg-amber-700 hover:bg-amber-600">
                  Fortsetzen
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    clearState()
                    if (savedState.simulationId) clearTimerState(savedState.simulationId)
                    setShowRecovery(false)
                    setSavedState(null)
                  }}
                >
                  Verwerfen
                </Button>
              </div>
            </motion.div>
          )}

          {/* Simulation cards */}
          <div className="space-y-4">
            {examSimulations.map((sim) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 hover:border-blue-500/50 transition-colors cursor-pointer group"
                  onClick={() => startExam(sim)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold group-hover:text-blue-300 transition-colors">
                        {sim.title}
                      </h2>
                      <p className="text-slate-400 mt-1 text-sm">{sim.description}</p>
                      <div className="flex gap-4 mt-3 text-sm">
                        <span className="text-slate-500">
                          {sim.tasks.length} Aufgaben
                        </span>
                        <span className="text-slate-500">
                          {sim.totalPoints} Punkte
                        </span>
                        <span className="text-slate-500">
                          {sim.durationMinutes} Minuten
                        </span>
                      </div>
                    </div>
                    <Button className="shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Starten
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── Exam View ───
  if (pageState === 'exam' && selectedSim) {
    const currentTask = selectedSim.tasks[currentTaskIndex]

    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with timer and progress */}
          <div className="flex items-center justify-between mb-6 sticky top-0 z-10 bg-slate-900/95 backdrop-blur py-3 -mx-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                {selectedSim.title}
              </span>
              <div className="flex gap-1.5">
                {selectedSim.tasks.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i < currentTaskIndex
                        ? 'bg-green-600 text-white'
                        : i === currentTaskIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <ExamTimer
              durationMinutes={selectedSim.durationMinutes}
              simulationId={selectedSim.id}
              onTimeExpired={handleTimeExpired}
            />
          </div>

          {/* Current task */}
          <ExamTask
            key={currentTask.id}
            task={currentTask}
            taskNumber={currentTaskIndex + 1}
            onComplete={handleTaskComplete}
          />
        </div>
      </div>
    )
  }

  // ─── Results View ───
  if (pageState === 'results' && selectedSim) {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)

    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <div className="max-w-3xl mx-auto">
          <ExamResults
            simulationTitle={selectedSim.title}
            totalPoints={selectedSim.totalPoints}
            taskResults={taskResults}
            timeTakenSeconds={timeTaken}
            courseId={courseId ?? 'web-technologies'}
            onRetry={resetToSelection}
          />
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <p>Etwas ist schiefgelaufen.</p>
        <Link to={`/course/${courseId}`}>
          <Button className="mt-4">Zurück zum Kurs</Button>
        </Link>
      </Card>
    </div>
  )
}
