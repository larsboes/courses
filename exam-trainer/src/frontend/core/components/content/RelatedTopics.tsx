// src/core/components/content/RelatedTopics.tsx
import { Link } from 'react-router-dom'
import { MermaidDiagram } from '../diagrams'

export interface RelatedTopic {
  id: string
  title: string
  relationship: string // e.g., "builds on", "required for", "related to"
}

interface RelatedTopicsProps {
  topics: RelatedTopic[]
  courseId: string
  connectionDiagram?: string // Optional Mermaid diagram showing relationships
}

export function RelatedTopics({ topics, courseId, connectionDiagram }: RelatedTopicsProps) {
  if (topics.length === 0) return null

  return (
    <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
      <div className="text-sm font-medium text-slate-300 mb-3">Verwandte Themen:</div>

      {connectionDiagram && (
        <div className="mb-4">
          <MermaidDiagram chart={connectionDiagram} className="bg-slate-800/50 rounded-lg p-3" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/course/${courseId}/topic/${topic.id}`}
            className="group flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <span className="text-xs text-slate-400 group-hover:text-slate-300">
              {topic.relationship}
            </span>
            <span className="text-blue-400 group-hover:text-blue-300">
              {topic.title}
            </span>
            <span className="text-slate-500 group-hover:text-slate-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
