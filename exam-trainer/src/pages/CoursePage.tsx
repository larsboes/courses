// src/pages/CoursePage.tsx
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'
import { getCourse } from '@/content'
import { useProgress } from '@/core/hooks'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined
  const { getTopicProgress } = useProgress(courseId ?? '')

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
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-slate-400 mb-8">{course.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {course.topics.map((topic) => {
            const progress = getTopicProgress(topic.id)
            const isCompleted = progress?.completed
            const quizScore = progress?.quiz
              ? `${progress.quiz.bestScore}/${progress.quiz.totalQuestions}`
              : null

            return (
              <Link key={topic.id} to={`/course/${courseId}/topic/${topic.id}`}>
                <Card hover className="p-4 h-full relative">
                  {isCompleted && (
                    <div className="absolute top-2 right-2 text-green-400">✓</div>
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
      </div>
    </div>
  )
}
