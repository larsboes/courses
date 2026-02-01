// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage, QuizPage, ExamPage, GlossaryPage, FlashcardsPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage />} />
        <Route path="/course/:courseId/exam" element={<ExamPage />} />
        <Route path="/course/:courseId/glossary" element={<GlossaryPage />} />
        <Route path="/course/:courseId/flashcards" element={<FlashcardsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
