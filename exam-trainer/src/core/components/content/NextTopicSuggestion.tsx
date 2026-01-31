// src/core/components/content/NextTopicSuggestion.tsx
import { Link } from 'react-router-dom'
import type { Topic, CourseProgress } from '@/core/types/content'

interface NextTopicSuggestionProps {
  currentTopic: Topic
  allTopics: Topic[]
  progress: CourseProgress
  courseId: string
}

interface SuggestedTopic {
  topic: Topic
  reason: string
}

function findNextTopic(
  currentTopic: Topic,
  allTopics: Topic[],
  progress: CourseProgress
): SuggestedTopic | null {
  const isCompleted = (topicId: string) => progress.topics[topicId]?.completed ?? false

  // 1. First uncompleted topic from relatedTopics
  if (currentTopic.relatedTopics && currentTopic.relatedTopics.length > 0) {
    for (const related of currentTopic.relatedTopics) {
      if (!isCompleted(related.id)) {
        const topic = allTopics.find((t) => t.id === related.id)
        if (topic) {
          return {
            topic,
            reason: related.relationship,
          }
        }
      }
    }
  }

  // 2. Fallback: next uncompleted topic in allTopics order
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopic.id)
  for (let i = currentIndex + 1; i < allTopics.length; i++) {
    if (!isCompleted(allTopics[i].id)) {
      return {
        topic: allTopics[i],
        reason: 'nächstes Thema im Kurs',
      }
    }
  }
  // Also check topics before current one
  for (let i = 0; i < currentIndex; i++) {
    if (!isCompleted(allTopics[i].id)) {
      return {
        topic: allTopics[i],
        reason: 'noch nicht abgeschlossen',
      }
    }
  }

  // 3. All done
  return null
}

export function NextTopicSuggestion({
  currentTopic,
  allTopics,
  progress,
  courseId,
}: NextTopicSuggestionProps) {
  const suggestion = findNextTopic(currentTopic, allTopics, progress)

  // All topics completed
  if (!suggestion) {
    return (
      <div className="mt-8 p-6 bg-green-900/30 rounded-lg border border-green-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <div className="text-lg font-medium text-green-300">
              Alle Themen abgeschlossen!
            </div>
            <div className="text-sm text-green-400/80 mt-1">
              Du hast alle Themen in diesem Kurs bearbeitet.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
      <div className="text-sm font-medium text-slate-300 mb-3">Weiter lernen</div>

      <Link
        to={`/course/${courseId}/topic/${suggestion.topic.id}`}
        className="group flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 group-hover:text-slate-300">
            {suggestion.reason}
          </span>
          <span className="text-lg text-blue-400 group-hover:text-blue-300 font-medium">
            {suggestion.topic.title}
          </span>
        </div>
        <span className="text-2xl text-slate-500 group-hover:text-slate-400 transition-colors">
          →
        </span>
      </Link>
    </div>
  )
}
