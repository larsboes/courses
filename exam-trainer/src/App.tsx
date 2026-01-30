// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  )
}
