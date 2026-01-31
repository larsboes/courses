// src/pages/CoursePage.tsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'
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

          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 shrink-0">
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
