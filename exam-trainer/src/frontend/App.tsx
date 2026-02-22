// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage, QuizPage, ExamPage, KlausurSimulationPage, GlossaryPage, FlashcardsPage, RequestTracerPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage />} />
        <Route path="/course/:courseId/exam" element={<ExamPage />} />
        <Route path="/course/:courseId/klausur-simulation" element={<KlausurSimulationPage />} />
        <Route path="/course/:courseId/glossary" element={<GlossaryPage />} />
        <Route path="/course/:courseId/flashcards" element={<FlashcardsPage />} />
        <Route path="/course/:courseId/request-tracing" element={<RequestTracerPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/request-tracing" element={<RequestTracerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
