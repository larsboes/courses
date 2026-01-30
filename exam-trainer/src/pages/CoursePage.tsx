// src/pages/CoursePage.tsx
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-3xl font-bold mb-2">Web Technologies</h1>
        <p className="text-slate-400 mb-8">Kurs: {courseId}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to={`/course/${courseId}/topic/http`}>
            <Card hover className="p-4">
              <h3 className="font-semibold">HTTP</h3>
              <p className="text-sm text-slate-400">Requests & Responses</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
