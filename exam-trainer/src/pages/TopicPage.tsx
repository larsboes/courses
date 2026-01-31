// src/pages/TopicPage.tsx
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getTopic, getCourse } from '@/content'
import { Button } from '@/core/components/ui'
import { RelatedTopics, NextTopicSuggestion } from '@/core/components/content'
import { useProgress } from '@/core/hooks/useProgress'

export function TopicPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>()
  const topic = courseId && topicId ? getTopic(courseId, topicId) : undefined
  const course = courseId ? getCourse(courseId) : undefined
  const { progress } = useProgress(courseId ?? '')
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p>Topic nicht gefunden.</p>
          <Link to={`/course/${courseId}`} className="text-blue-400 hover:underline">
            Zurück zum Kurs
          </Link>
        </div>
      </div>
    )
  }

  const activeSection = topic.sections[activeSectionIndex]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/course/${courseId}`}
            className="text-slate-400 hover:text-slate-300"
          >
            ← Zurück zum Kurs
          </Link>
          {topic.quiz && (
            <Link to={`/course/${courseId}/topic/${topicId}/quiz`}>
              <Button variant="secondary" size="sm">
                Quiz starten
              </Button>
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
        {topic.examNotes && (
          <span className="text-sm px-2 py-1 bg-amber-900/50 text-amber-300 rounded">
            {topic.examNotes}
          </span>
        )}

        {/* Content Area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-8">
              {topic.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionIndex(index)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${index === activeSectionIndex
                      ? 'bg-blue-900/50 text-blue-300 border-l-2 border-blue-500'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Section */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold mb-4">{activeSection.title}</h2>

              {/* Section Content */}
              <div className="text-slate-300 mb-6">
                {activeSection.content}
              </div>

              {/* Section Diagram */}
              {activeSection.diagram && (
                <div className="mt-6">
                  <activeSection.diagram.component />
                </div>
              )}
            </div>

            {/* Section Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSectionIndex((i) => Math.max(0, i - 1))}
                disabled={activeSectionIndex === 0}
              >
                ← Vorherige
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSectionIndex((i) => Math.min(topic.sections.length - 1, i + 1))}
                disabled={activeSectionIndex === topic.sections.length - 1}
              >
                Nächste →
              </Button>
            </div>

            {/* Related Topics */}
            {topic.relatedTopics && topic.relatedTopics.length > 0 && (
              <RelatedTopics
                topics={topic.relatedTopics}
                courseId={courseId!}
                connectionDiagram={topic.connectionDiagram}
              />
            )}

            {/* Next Topic Suggestion */}
            {course && (
              <NextTopicSuggestion
                currentTopic={topic}
                allTopics={course.topics}
                progress={progress}
                courseId={courseId!}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
