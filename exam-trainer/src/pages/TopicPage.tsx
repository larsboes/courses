// src/pages/TopicPage.tsx
import { useParams, Link } from 'react-router-dom'

export function TopicPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>()

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to={`/course/${courseId}`}
          className="text-slate-400 hover:text-slate-300 mb-4 inline-block"
        >
          ← Zurück zum Kurs
        </Link>

        <h1 className="text-3xl font-bold mb-4">Topic: {topicId}</h1>
        <p className="text-slate-400">Content coming soon...</p>
      </div>
    </div>
  )
}
