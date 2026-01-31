// src/pages/QuizPage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTopic } from '@/content'
import { useQuizState, useProgress } from '@/core/hooks'
import { QuizQuestion, QuizResults } from '@/core/components/quiz'
import { Button } from '@/core/components/ui'

export function QuizPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>()
  const navigate = useNavigate()
  const topic = courseId && topicId ? getTopic(courseId, topicId) : undefined
  const { saveQuizResult, markTopicCompleted } = useProgress(courseId ?? '')

  if (!topic?.quiz) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p>Quiz nicht gefunden.</p>
          <Link to={`/course/${courseId}`} className="text-blue-400 hover:underline">
            Zurück zum Kurs
          </Link>
        </div>
      </div>
    )
  }

  const [state, actions] = useQuizState(topic.quiz)

  const handleBack = () => {
    navigate(`/course/${courseId}/topic/${topicId}`)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/course/${courseId}/topic/${topicId}`}
            className="text-slate-400 hover:text-slate-300"
          >
            ← Zurück zum Thema
          </Link>
          <div className="text-slate-400">
            Frage {state.currentIndex + 1} von {state.totalQuestions}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Quiz: {topic.title}</h1>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${((state.currentIndex + 1) / state.totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* Quiz Content */}
        {state.isComplete && state.showingResult ? (
          <QuizResults
            score={state.score}
            totalQuestions={state.totalQuestions}
            onRestart={actions.reset}
            onBack={() => {
              saveQuizResult(topicId!, state.score, state.totalQuestions)
              if (state.score / state.totalQuestions >= 0.7) {
                markTopicCompleted(topicId!)
              }
              handleBack()
            }}
          />
        ) : state.currentQuestion ? (
          <>
            <QuizQuestion
              question={state.currentQuestion}
              onSubmit={actions.submitAnswer}
              showingResult={state.showingResult}
              isCorrect={state.isCorrect}
              selectedAnswer={state.answers.get(state.currentQuestion.id)}
              topicId={topicId}
            />

            {/* Navigation */}
            {state.showingResult && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={actions.previousQuestion}
                  disabled={state.isFirst}
                >
                  ← Vorherige
                </Button>
                <Button onClick={actions.nextQuestion}>
                  {state.isLast ? 'Ergebnis anzeigen' : 'Nächste →'}
                </Button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}
