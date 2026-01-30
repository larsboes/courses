// src/pages/HomePage.tsx
import { Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Exam Trainer</h1>
        <p className="text-slate-400 mb-8">Wähle einen Kurs zum Lernen</p>

        <div className="grid gap-4">
          <Link to="/course/web-technologies">
            <Card hover className="p-6">
              <h2 className="text-xl font-semibold mb-2">Web Technologies</h2>
              <p className="text-slate-400">
                HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
