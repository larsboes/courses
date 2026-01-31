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

  if (!course) {
    return <div className="min-h-screen bg-slate-900 text-slate-100 p-8">Kurs nicht gefunden</div>
  }

  // Collect all exam tasks from topics
  const allTasks: ExamTaskType[] = course.topics.flatMap(t => t.examTasks || [])

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

  const handleTaskComplete = (scores: number[]) => {
    setTaskScores([...taskScores, scores])
    if (currentTaskIndex < allTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
    }
  }

  const totalPoints = allTasks.reduce((sum, t) => sum + t.points, 0)
  const isComplete = taskScores.length === allTasks.length

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Prüfungssimulation</h1>
          <p className="text-slate-400 mb-6">
            {allTasks.length} Aufgaben, {totalPoints} Punkte gesamt
          </p>
          <div className="space-y-2 mb-6">
            {allTasks.map((task, i) => (
              <div key={task.id} className="flex justify-between text-sm">
                <span>Aufgabe {i + 1}: {task.title}</span>
                <span className="text-slate-500">{task.points} Punkte</span>
              </div>
            ))}
          </div>
          <Button onClick={() => setStarted(true)} className="w-full">
            Prüfung starten
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
            Du hast alle {allTasks.length} Aufgaben bearbeitet.
          </p>
          <Link to={`/course/${courseId}`}>
            <Button>Zurück zum Kurs</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <ExamTask
          task={allTasks[currentTaskIndex]}
          taskNumber={currentTaskIndex + 1}
          onComplete={handleTaskComplete}
        />
      </div>
    </div>
  )
}
