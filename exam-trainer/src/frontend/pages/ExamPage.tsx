// src/pages/ExamPage.tsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Card } from '@/core/components/ui'
import { ExamTask } from '@/core/components/exam'
import { getCourse } from '@/content'
import type { ExamTask as ExamTaskType } from '@/core/types/content'

export function ExamPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined

  const [started, setStarted] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [taskScores, setTaskScores] = useState<number[][]>([])
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set())

  if (!course) {
    return <div className="min-h-screen bg-slate-900 text-slate-100 p-8">Kurs nicht gefunden</div>
  }

  // Collect all exam tasks from topics
  const allTasks: ExamTaskType[] = course.topics.flatMap(t => t.examTasks || [])

  // Initialize selection with all tasks on first render
  if (selectedTaskIds.size === 0 && allTasks.length > 0) {
    setSelectedTaskIds(new Set(allTasks.map(t => t.id)))
  }

  if (allTasks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Keine Prüfungsaufgaben</h1>
          <p className="text-slate-400 mb-6">
            Für diesen Kurs sind noch keine Prüfungsaufgaben definiert.
          </p>
          <Link to={`/course/${courseId}`}>
            <Button>Zurück zum Kurs</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const selectedTasks = allTasks.filter(t => selectedTaskIds.has(t.id))

  const toggleTask = (taskId: string) => {
    const newSelected = new Set(selectedTaskIds)
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId)
    } else {
      newSelected.add(taskId)
    }
    setSelectedTaskIds(newSelected)
  }

  const selectAll = () => setSelectedTaskIds(new Set(allTasks.map(t => t.id)))
  const selectNone = () => setSelectedTaskIds(new Set())

  const handleTaskComplete = (scores: number[]) => {
    setTaskScores([...taskScores, scores])
    if (currentTaskIndex < selectedTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
    }
  }

  const totalPoints = allTasks.reduce((sum, t) => sum + t.points, 0)
  const selectedPoints = selectedTasks.reduce((sum, t) => sum + t.points, 0)
  const isComplete = taskScores.length === selectedTasks.length && selectedTasks.length > 0

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Prüfungssimulation</h1>
          <p className="text-slate-400 mb-6">
            {allTasks.length} Aufgaben verfügbar, {totalPoints} Punkte gesamt
          </p>

          <div className="flex gap-2 mb-4">
            <button
              onClick={selectAll}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Alle auswählen
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={selectNone}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Keine auswählen
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {allTasks.map((task, i) => (
              <label
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTaskIds.has(task.id)
                    ? 'bg-blue-900/20 border-blue-700'
                    : 'bg-slate-800/50 border-slate-700 opacity-60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTaskIds.has(task.id)}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium">Aufgabe {i + 1}: {task.title}</span>
                  <span className="text-slate-500 ml-2">({task.parts.length} Teile)</span>
                </div>
                <span className="text-slate-400">{task.points} Punkte</span>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4 p-3 bg-slate-800/50 rounded-lg">
            <span className="text-slate-300">Ausgewählt:</span>
            <span className="font-medium">
              {selectedTasks.length} Aufgaben, {selectedPoints} Punkte
            </span>
          </div>

          <Button
            onClick={() => setStarted(true)}
            disabled={selectedTasks.length === 0}
            className="w-full"
          >
            {selectedTasks.length === allTasks.length
              ? 'Vollständige Prüfung starten'
              : selectedTasks.length === 1
              ? 'Aufgabe starten'
              : `${selectedTasks.length} Aufgaben starten`}
          </Button>
        </Card>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Prüfung abgeschlossen!</h1>
          <p className="text-slate-400 mb-6">
            Du hast {selectedTasks.length === 1 ? 'die Aufgabe' : `alle ${selectedTasks.length} Aufgaben`} bearbeitet.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to={`/course/${courseId}`}>
              <Button variant="secondary">Zurück zum Kurs</Button>
            </Link>
            <Button onClick={() => {
              setStarted(false)
              setCurrentTaskIndex(0)
              setTaskScores([])
            }}>
              Weitere Aufgaben üben
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {selectedTasks.length > 1 && (
          <div className="mb-4 text-sm text-slate-400">
            Aufgabe {currentTaskIndex + 1} von {selectedTasks.length}
          </div>
        )}
        <ExamTask
          task={selectedTasks[currentTaskIndex]}
          taskNumber={allTasks.findIndex(t => t.id === selectedTasks[currentTaskIndex].id) + 1}
          onComplete={handleTaskComplete}
        />
      </div>
    </div>
  )
}
