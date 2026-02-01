// src/pages/CoursePage.tsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Card } from '@/core/components/ui'
import { TopicGraph } from '@/core/components/graph'
import { getCourse } from '@/content'
import { useProgress } from '@/core/hooks'

type ViewMode = 'grid' | 'graph'

const VIEW_MODE_STORAGE_KEY = 'exam-trainer-view-mode'

function getStoredViewMode(): ViewMode {
  const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY)
  return stored === 'graph' ? 'graph' : 'grid'
}

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined
  const { progress, getTopicProgress } = useProgress(courseId ?? '')
  const [viewMode, setViewMode] = useState<ViewMode>(getStoredViewMode)

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode)
  }, [viewMode])

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p>Kurs nicht gefunden.</p>
          <Link to="/" className="text-blue-400 hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
          ← Zurück
        </Link>

        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-slate-400">{course.description}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to={`/course/${courseId}/exam`}>
              <Button className="bg-purple-900/30 border border-purple-700 hover:bg-purple-900/50">
                Prüfungssimulation starten
              </Button>
            </Link>

            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${viewMode === 'grid'
                    ? 'bg-slate-700 text-slate-50'
                    : 'text-slate-400 hover:text-slate-300'}
                `}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('graph')}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${viewMode === 'graph'
                    ? 'bg-slate-700 text-slate-50'
                    : 'text-slate-400 hover:text-slate-300'}
                `}
              >
                Graph
              </button>
            </div>
          </div>
        </div>

        {course.examFocus && course.examFocus.length > 0 && (
          <div className="mb-8 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <h2 className="text-lg font-semibold text-amber-300 mb-3">Klausur-Fokus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.examFocus.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">{index + 1}.</span>
                  <div>
                    <span className="font-medium text-amber-200">{item.title}</span>
                    <p className="text-sm text-slate-400 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Tools */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Link
            to={`/course/${courseId}/glossary`}
            className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-colors group"
          >
            <div className="text-lg font-semibold text-blue-400 group-hover:text-blue-300">
              K8s Glossar
            </div>
            <div className="text-sm text-slate-400 mt-1">
              Begriffe nachschlagen
            </div>
          </Link>
          <Link
            to={`/course/${courseId}/flashcards`}
            className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors group"
          >
            <div className="text-lg font-semibold text-purple-400 group-hover:text-purple-300">
              Flashcards
            </div>
            <div className="text-sm text-slate-400 mt-1">
              Begriffe lernen
            </div>
          </Link>
          <Link
            to={`/course/${courseId}/request-tracing`}
            className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-green-500/50 transition-colors group"
          >
            <div className="text-lg font-semibold text-green-400 group-hover:text-green-300">
              Request Tracing
            </div>
            <div className="text-sm text-slate-400 mt-1">
              Request-Flows visualisieren
            </div>
          </Link>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.topics.map((topic) => {
              const topicProgress = getTopicProgress(topic.id)
              const isCompleted = topicProgress?.completed
              const quizScore = topicProgress?.quiz
                ? `${topicProgress.quiz.bestScore}/${topicProgress.quiz.totalQuestions}`
                : null

              return (
                <Link key={topic.id} to={`/course/${courseId}/topic/${topic.id}`}>
                  <Card hover className="p-4 h-full relative">
                    {isCompleted && (
                      <div className="absolute top-2 right-2 text-green-400">ok</div>
                    )}
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">{topic.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {topic.examNotes && (
                        <span className="text-xs px-2 py-1 bg-amber-900/50 text-amber-300 rounded">
                          {topic.examNotes}
                        </span>
                      )}
                      {quizScore && (
                        <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                          Quiz: {quizScore}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <TopicGraph topics={course.topics} progress={progress} />
        )}
      </div>
    </div>
  )
}
