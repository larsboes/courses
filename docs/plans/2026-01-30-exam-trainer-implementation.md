# Exam Trainer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive exam preparation app with animated diagrams, explorable visualizations, and topic-based quizzes.

**Architecture:** React SPA with typed content modules. Core platform in `src/core/`, course content in `src/content/`. Three diagram types (animated, explorable, manipulatable) built with Framer Motion and React Flow. Progress saved as JSON in `progress/` folder.

**Tech Stack:** Bun, Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, React Flow, Docker

**Design Document:** `docs/plans/2026-01-30-exam-trainer-design.md`

---

## Phase 1: Project Foundation

### Task 1.1: Initialize Bun + Vite + React Project

**Files:**
- Create: `exam-trainer/package.json`
- Create: `exam-trainer/tsconfig.json`
- Create: `exam-trainer/vite.config.ts`
- Create: `exam-trainer/index.html`
- Create: `exam-trainer/src/main.tsx`
- Create: `exam-trainer/src/App.tsx`

**Step 1: Initialize project with Bun**

```bash
cd /home/lars/Developer/personal/courses/exam-trainer
bun init -y
```

**Step 2: Install dependencies**

```bash
bun add react react-dom react-router-dom framer-motion @xyflow/react
bun add -d @types/react @types/react-dom typescript vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

**Step 3: Create vite.config.ts**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
```

**Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 5: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 6: Create index.html**

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exam Trainer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 7: Create src/main.tsx**

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Step 8: Create src/App.tsx**

```tsx
// src/App.tsx
export function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold">Exam Trainer</h1>
    </div>
  )
}
```

**Step 9: Initialize Tailwind**

```bash
bunx tailwindcss init -p
```

**Step 10: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 11: Create src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 12: Update package.json scripts**

```json
{
  "name": "exam-trainer",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

**Step 13: Verify dev server runs**

```bash
bun run dev
```

Expected: Server starts at http://localhost:5173, shows "Exam Trainer" heading

**Step 14: Commit**

```bash
git add exam-trainer/
git commit -m "feat(exam-trainer): initialize project with Bun, Vite, React, Tailwind"
```

---

### Task 1.2: Docker Configuration

**Files:**
- Create: `exam-trainer/Dockerfile`
- Create: `exam-trainer/docker-compose.yml`
- Create: `exam-trainer/.dockerignore`

**Step 1: Create Dockerfile**

```dockerfile
# Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Development
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["bun", "run", "dev"]

# Build
FROM deps AS builder
COPY . .
RUN bun run build

# Production
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Step 2: Create docker-compose.yml**

```yaml
services:
  exam-trainer:
    build:
      context: .
      target: dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
```

**Step 3: Create .dockerignore**

```
node_modules
dist
.git
*.md
```

**Step 4: Test Docker build and run**

```bash
cd /home/lars/Developer/personal/courses/exam-trainer
docker compose up --build -d
```

Expected: Container starts, app accessible at http://localhost:5173

**Step 5: Stop container**

```bash
docker compose down
```

**Step 6: Commit**

```bash
git add exam-trainer/Dockerfile exam-trainer/docker-compose.yml exam-trainer/.dockerignore
git commit -m "feat(exam-trainer): add Docker configuration for dev and prod"
```

---

### Task 1.3: Core Type Definitions

**Files:**
- Create: `exam-trainer/src/core/types/content.ts`

**Step 1: Create directory structure**

```bash
mkdir -p exam-trainer/src/core/types
```

**Step 2: Create content.ts**

```typescript
// src/core/types/content.ts
import { ComponentType, ReactNode } from 'react'

// ─────────────────────────────────────────────────
// Course & Topic Structure
// ─────────────────────────────────────────────────

export interface Course {
  id: string
  title: string
  description: string
  topics: Topic[]
}

export interface Topic {
  id: string
  title: string
  description: string
  icon?: string
  examNotes?: string
  sections: Section[]
  quiz?: Quiz
}

export interface Section {
  id: string
  title: string
  content: ReactNode
  diagram?: DiagramConfig
}

// ─────────────────────────────────────────────────
// Diagram Types
// ─────────────────────────────────────────────────

export type DiagramType = 'animated' | 'manipulatable' | 'explorable'

export interface DiagramProps {
  className?: string
}

export interface DiagramConfig {
  type: DiagramType
  component: ComponentType<DiagramProps>
}

// ─────────────────────────────────────────────────
// Quiz Types
// ─────────────────────────────────────────────────

export interface Quiz {
  questions: QuizQuestion[]
}

export type QuizQuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'order-steps'
  | 'match-pairs'
  | 'identify-error'
  | 'fill-blank'

export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  question: string
  visual?: ReactNode
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  explanationVisual?: ReactNode
}

// ─────────────────────────────────────────────────
// Progress Types
// ─────────────────────────────────────────────────

export interface CourseProgress {
  courseId: string
  lastUpdated: string
  topics: Record<string, TopicProgress>
}

export interface TopicProgress {
  completed: boolean
  sectionsViewed: string[]
  quiz: QuizProgress | null
}

export interface QuizProgress {
  bestScore: number
  totalQuestions: number
  lastAttempt: string
}
```

**Step 3: Commit**

```bash
git add exam-trainer/src/core/types/
git commit -m "feat(exam-trainer): add core type definitions for content and progress"
```

---

### Task 1.4: Basic UI Components

**Files:**
- Create: `exam-trainer/src/core/components/ui/Button.tsx`
- Create: `exam-trainer/src/core/components/ui/Card.tsx`
- Create: `exam-trainer/src/core/components/ui/index.ts`

**Step 1: Create directory**

```bash
mkdir -p exam-trainer/src/core/components/ui
```

**Step 2: Create Button.tsx**

```tsx
// src/core/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-300',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          rounded-lg font-medium transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

**Step 3: Create Card.tsx**

```tsx
// src/core/components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-slate-800 rounded-xl border border-slate-700
          ${hover ? 'hover:border-slate-600 hover:bg-slate-750 transition-colors cursor-pointer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
```

**Step 4: Create index.ts**

```typescript
// src/core/components/ui/index.ts
export { Button } from './Button'
export { Card } from './Card'
```

**Step 5: Commit**

```bash
git add exam-trainer/src/core/components/
git commit -m "feat(exam-trainer): add Button and Card UI components"
```

---

### Task 1.5: Routing Setup

**Files:**
- Modify: `exam-trainer/src/App.tsx`
- Create: `exam-trainer/src/pages/HomePage.tsx`
- Create: `exam-trainer/src/pages/CoursePage.tsx`
- Create: `exam-trainer/src/pages/TopicPage.tsx`
- Create: `exam-trainer/src/pages/index.ts`

**Step 1: Create pages directory**

```bash
mkdir -p exam-trainer/src/pages
```

**Step 2: Create HomePage.tsx**

```tsx
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
```

**Step 3: Create CoursePage.tsx**

```tsx
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
```

**Step 4: Create TopicPage.tsx**

```tsx
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
```

**Step 5: Create index.ts**

```typescript
// src/pages/index.ts
export { HomePage } from './HomePage'
export { CoursePage } from './CoursePage'
export { TopicPage } from './TopicPage'
```

**Step 6: Update App.tsx with router**

```tsx
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
```

**Step 7: Verify routing works**

```bash
bun run dev
```

Expected: Navigate between pages, URLs update correctly

**Step 8: Commit**

```bash
git add exam-trainer/src/
git commit -m "feat(exam-trainer): add routing with HomePage, CoursePage, TopicPage"
```

---

## Phase 2: Diagram System

### Task 2.1: Animation Step Hook

**Files:**
- Create: `exam-trainer/src/core/hooks/useAnimationStep.ts`
- Create: `exam-trainer/src/core/hooks/index.ts`

**Step 1: Create hooks directory**

```bash
mkdir -p exam-trainer/src/core/hooks
```

**Step 2: Create useAnimationStep.ts**

```typescript
// src/core/hooks/useAnimationStep.ts
import { useState, useCallback } from 'react'

export interface AnimationStep {
  id: string
  label: string
  description: string
}

interface UseAnimationStepReturn {
  currentStep: number
  step: AnimationStep | undefined
  isFirst: boolean
  isLast: boolean
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  reset: () => void
}

export function useAnimationStep(steps: AnimationStep[]): UseAnimationStepReturn {
  const [currentStep, setCurrentStep] = useState(0)

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setCurrentStep(Math.max(0, Math.min(index, steps.length - 1)))
    },
    [steps.length]
  )

  const reset = useCallback(() => {
    setCurrentStep(0)
  }, [])

  return {
    currentStep,
    step: steps[currentStep],
    isFirst: currentStep === 0,
    isLast: currentStep === steps.length - 1,
    next,
    previous,
    goTo,
    reset,
  }
}
```

**Step 3: Create index.ts**

```typescript
// src/core/hooks/index.ts
export { useAnimationStep } from './useAnimationStep'
export type { AnimationStep } from './useAnimationStep'
```

**Step 4: Commit**

```bash
git add exam-trainer/src/core/hooks/
git commit -m "feat(exam-trainer): add useAnimationStep hook for step-through diagrams"
```

---

### Task 2.2: Diagram Primitives

**Files:**
- Create: `exam-trainer/src/core/components/diagrams/primitives/Box.tsx`
- Create: `exam-trainer/src/core/components/diagrams/primitives/Arrow.tsx`
- Create: `exam-trainer/src/core/components/diagrams/primitives/Label.tsx`
- Create: `exam-trainer/src/core/components/diagrams/primitives/index.ts`

**Step 1: Create directory**

```bash
mkdir -p exam-trainer/src/core/components/diagrams/primitives
```

**Step 2: Create Box.tsx**

```tsx
// src/core/components/diagrams/primitives/Box.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BoxProps {
  children: ReactNode
  highlighted?: boolean
  variant?: 'default' | 'primary' | 'success' | 'warning'
  className?: string
}

const variants = {
  default: 'bg-slate-700 border-slate-600',
  primary: 'bg-blue-900/50 border-blue-500',
  success: 'bg-green-900/50 border-green-500',
  warning: 'bg-amber-900/50 border-amber-500',
}

export function Box({
  children,
  highlighted = false,
  variant = 'default',
  className = '',
}: BoxProps) {
  return (
    <motion.div
      className={`
        px-4 py-3 rounded-lg border-2 font-medium
        ${variants[variant]}
        ${className}
      `}
      animate={{
        scale: highlighted ? 1.05 : 1,
        boxShadow: highlighted
          ? '0 0 20px rgba(59, 130, 246, 0.5)'
          : '0 0 0px rgba(59, 130, 246, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

**Step 3: Create Arrow.tsx**

```tsx
// src/core/components/diagrams/primitives/Arrow.tsx
import { motion } from 'framer-motion'

interface ArrowProps {
  direction?: 'right' | 'left' | 'down' | 'up'
  animated?: boolean
  highlighted?: boolean
  label?: string
  className?: string
}

export function Arrow({
  direction = 'right',
  animated = false,
  highlighted = false,
  label,
  className = '',
}: ArrowProps) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {label && (
        <span className="text-xs text-slate-400">{label}</span>
      )}
      <motion.svg
        width="60"
        height="24"
        viewBox="0 0 60 24"
        style={{ rotate: rotations[direction] }}
        className="text-slate-500"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="45"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{
            pathLength: 1,
            stroke: highlighted ? '#3b82f6' : 'currentColor',
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.polygon
          points="45,6 60,12 45,18"
          fill="currentColor"
          initial={animated ? { opacity: 0 } : { opacity: 1 }}
          animate={{
            opacity: 1,
            fill: highlighted ? '#3b82f6' : 'currentColor',
          }}
          transition={{ duration: 0.3, delay: animated ? 0.3 : 0 }}
        />
      </motion.svg>
    </div>
  )
}
```

**Step 4: Create Label.tsx**

```tsx
// src/core/components/diagrams/primitives/Label.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
  highlighted?: boolean
  className?: string
}

export function Label({ children, highlighted = false, className = '' }: LabelProps) {
  return (
    <motion.span
      className={`text-sm ${className}`}
      animate={{
        color: highlighted ? '#f8fafc' : '#94a3b8',
        fontWeight: highlighted ? 600 : 400,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}
```

**Step 5: Create index.ts**

```typescript
// src/core/components/diagrams/primitives/index.ts
export { Box } from './Box'
export { Arrow } from './Arrow'
export { Label } from './Label'
```

**Step 6: Commit**

```bash
git add exam-trainer/src/core/components/diagrams/
git commit -m "feat(exam-trainer): add diagram primitives (Box, Arrow, Label)"
```

---

### Task 2.3: AnimatedFlow Component

**Files:**
- Create: `exam-trainer/src/core/components/diagrams/AnimatedFlow.tsx`
- Create: `exam-trainer/src/core/components/diagrams/index.ts`

**Step 1: Create AnimatedFlow.tsx**

```tsx
// src/core/components/diagrams/AnimatedFlow.tsx
import { ReactNode } from 'react'
import { Button } from '@/core/components/ui'
import { useAnimationStep, AnimationStep } from '@/core/hooks'

interface AnimatedFlowProps {
  steps: AnimationStep[]
  children: (currentStep: number, stepData: AnimationStep | undefined) => ReactNode
  className?: string
}

export function AnimatedFlow({ steps, children, className = '' }: AnimatedFlowProps) {
  const { currentStep, step, isFirst, isLast, next, previous, reset } = useAnimationStep(steps)

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Diagram Area */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        {children(currentStep, step)}
      </div>

      {/* Step Description */}
      {step && (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">
            Schritt {currentStep + 1} von {steps.length}
          </div>
          <div className="font-medium">{step.label}</div>
          <div className="text-slate-400 text-sm mt-1">{step.description}</div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={previous}
          disabled={isFirst}
        >
          ← Zurück
        </Button>

        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <Button variant="secondary" size="sm" onClick={reset}>
            Neu starten
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={next}>
            Weiter →
          </Button>
        )}
      </div>
    </div>
  )
}
```

**Step 2: Create diagrams/index.ts**

```typescript
// src/core/components/diagrams/index.ts
export { AnimatedFlow } from './AnimatedFlow'
export * from './primitives'
```

**Step 3: Commit**

```bash
git add exam-trainer/src/core/components/diagrams/
git commit -m "feat(exam-trainer): add AnimatedFlow component for step-through diagrams"
```

---

### Task 2.4: ExplorableSVG Component

**Files:**
- Create: `exam-trainer/src/core/components/diagrams/ExplorableSVG.tsx`
- Modify: `exam-trainer/src/core/components/diagrams/index.ts`

**Step 1: Create ExplorableSVG.tsx**

```tsx
// src/core/components/diagrams/ExplorableSVG.tsx
import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ExplorableRegion {
  id: string
  label: string
  description: ReactNode
}

interface ExplorableSVGProps {
  regions: ExplorableRegion[]
  children: (
    activeRegion: string | null,
    setActiveRegion: (id: string | null) => void
  ) => ReactNode
  className?: string
}

export function ExplorableSVG({ regions, children, className = '' }: ExplorableSVGProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const activeData = regions.find((r) => r.id === activeRegion)

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Interactive Diagram */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        {children(activeRegion, setActiveRegion)}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/50"
          >
            <div className="font-medium text-blue-300 mb-2">{activeData.label}</div>
            <div className="text-slate-300 text-sm">{activeData.description}</div>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-slate-500 py-4"
          >
            Klicke auf einen Bereich für Details
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Update index.ts**

```typescript
// src/core/components/diagrams/index.ts
export { AnimatedFlow } from './AnimatedFlow'
export { ExplorableSVG } from './ExplorableSVG'
export type { ExplorableRegion } from './ExplorableSVG'
export * from './primitives'
```

**Step 3: Commit**

```bash
git add exam-trainer/src/core/components/diagrams/
git commit -m "feat(exam-trainer): add ExplorableSVG component for click-to-explore diagrams"
```

---

## Phase 3: First Topic (HTTP)

### Task 3.1: HTTP Flow Diagram (Animated)

**Files:**
- Create: `exam-trainer/src/content/web-technologies/diagrams/HttpFlowDiagram.tsx`

**Step 1: Create directory structure**

```bash
mkdir -p exam-trainer/src/content/web-technologies/diagrams
```

**Step 2: Create HttpFlowDiagram.tsx**

```tsx
// src/content/web-technologies/diagrams/HttpFlowDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

const steps: AnimationStep[] = [
  {
    id: 'client-ready',
    label: 'Client bereit',
    description: 'Der Browser (Client) möchte eine Ressource vom Server abrufen.',
  },
  {
    id: 'request-sent',
    label: 'Request wird gesendet',
    description: 'Der Client sendet einen HTTP Request an den Server.',
  },
  {
    id: 'server-processing',
    label: 'Server verarbeitet',
    description: 'Der Server empfängt den Request und verarbeitet ihn.',
  },
  {
    id: 'response-sent',
    label: 'Response wird gesendet',
    description: 'Der Server sendet eine HTTP Response zurück an den Client.',
  },
  {
    id: 'client-receives',
    label: 'Client empfängt',
    description: 'Der Browser empfängt die Response und zeigt die Daten an.',
  },
]

export function HttpFlowDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex items-center justify-center gap-8">
          {/* Client */}
          <div className="flex flex-col items-center gap-2">
            <Box
              highlighted={currentStep === 0 || currentStep === 4}
              variant={currentStep === 4 ? 'success' : 'default'}
            >
              Client (Browser)
            </Box>
          </div>

          {/* Arrows */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Arrow
                direction="right"
                animated={currentStep === 1}
                highlighted={currentStep === 1}
                label="HTTP Request"
              />
            </div>
            <div className="flex items-center gap-2">
              <Arrow
                direction="left"
                animated={currentStep === 3}
                highlighted={currentStep === 3}
                label="HTTP Response"
              />
            </div>
          </div>

          {/* Server */}
          <div className="flex flex-col items-center gap-2">
            <Box
              highlighted={currentStep === 2}
              variant={currentStep === 2 ? 'primary' : 'default'}
            >
              Server
            </Box>
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
```

**Step 3: Commit**

```bash
git add exam-trainer/src/content/
git commit -m "feat(exam-trainer): add HTTP flow animated diagram"
```

---

### Task 3.2: HTTP Request Explorer (Explorable)

**Files:**
- Create: `exam-trainer/src/content/web-technologies/diagrams/HttpRequestExplorer.tsx`

**Step 1: Create HttpRequestExplorer.tsx**

```tsx
// src/content/web-technologies/diagrams/HttpRequestExplorer.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'request-line',
    label: 'Request Line',
    description: (
      <>
        <p className="mb-2">Die erste Zeile enthält:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>HTTP Methode</strong> (GET, POST, PUT, DELETE, ...)</li>
          <li><strong>URI</strong> mit optionalen Query Parametern</li>
          <li><strong>HTTP Version</strong> (HTTP/1.1)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'headers',
    label: 'Headers',
    description: (
      <>
        <p className="mb-2">Metadaten über den Request:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Host</strong> - Zielserver (required in HTTP/1.1)</li>
          <li><strong>Accept</strong> - Erwartetes Response-Format</li>
          <li><strong>Content-Type</strong> - Format des Body</li>
          <li><strong>User-Agent</strong> - Client-Informationen</li>
        </ul>
      </>
    ),
  },
  {
    id: 'empty-line',
    label: 'Leerzeile',
    description: (
      <p>
        Eine leere Zeile trennt die Headers vom Body. Sie signalisiert dem Server,
        dass alle Header gesendet wurden.
      </p>
    ),
  },
  {
    id: 'body',
    label: 'Body (optional)',
    description: (
      <>
        <p className="mb-2">Die eigentlichen Daten (bei POST, PUT, PATCH):</p>
        <ul className="list-disc list-inside space-y-1">
          <li>JSON, XML, Form-Daten, etc.</li>
          <li>Format durch Content-Type Header angegeben</li>
          <li>Bei GET-Requests meist leer</li>
        </ul>
      </>
    ),
  },
]

interface RegionBoxProps {
  id: string
  isActive: boolean
  onClick: () => void
  label: string
  content: string[]
  className?: string
}

function RegionBox({ id, isActive, onClick, label, content, className = '' }: RegionBoxProps) {
  return (
    <motion.div
      className={`
        p-3 cursor-pointer border-l-4 transition-colors
        ${isActive
          ? 'bg-blue-900/40 border-blue-500'
          : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="font-mono text-sm">
        {content.map((line, i) => (
          <div key={i} className={isActive ? 'text-blue-200' : 'text-slate-300'}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function HttpRequestExplorer({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="flex flex-col gap-1 max-w-lg mx-auto">
          <RegionBox
            id="request-line"
            isActive={activeRegion === 'request-line'}
            onClick={() => setActiveRegion(activeRegion === 'request-line' ? null : 'request-line')}
            label="REQUEST LINE"
            content={['GET /playlists?duration=300 HTTP/1.1']}
          />
          <RegionBox
            id="headers"
            isActive={activeRegion === 'headers'}
            onClick={() => setActiveRegion(activeRegion === 'headers' ? null : 'headers')}
            label="HEADERS"
            content={[
              'Host: playlist-server.com:8001',
              'Accept: application/json',
              'User-Agent: Mozilla/5.0',
            ]}
          />
          <RegionBox
            id="empty-line"
            isActive={activeRegion === 'empty-line'}
            onClick={() => setActiveRegion(activeRegion === 'empty-line' ? null : 'empty-line')}
            label="LEERZEILE"
            content={['']}
            className="min-h-[2rem]"
          />
          <RegionBox
            id="body"
            isActive={activeRegion === 'body'}
            onClick={() => setActiveRegion(activeRegion === 'body' ? null : 'body')}
            label="BODY (optional)"
            content={['{"name": "My Playlist"}']}
          />
        </div>
      )}
    </ExplorableSVG>
  )
}
```

**Step 2: Commit**

```bash
git add exam-trainer/src/content/
git commit -m "feat(exam-trainer): add HTTP request explorable diagram"
```

---

### Task 3.3: HTTP Topic Content

**Files:**
- Create: `exam-trainer/src/content/web-technologies/topics/http.tsx`
- Create: `exam-trainer/src/content/web-technologies/index.ts`

**Step 1: Create topics directory**

```bash
mkdir -p exam-trainer/src/content/web-technologies/topics
```

**Step 2: Create http.tsx**

```tsx
// src/content/web-technologies/topics/http.tsx
import type { Topic } from '@/core/types/content'
import { HttpFlowDiagram } from '../diagrams/HttpFlowDiagram'
import { HttpRequestExplorer } from '../diagrams/HttpRequestExplorer'

export const httpTopic: Topic = {
  id: 'http',
  title: 'HTTP - Hypertext Transfer Protocol',
  description: 'Requests & Responses, Aufbau, Methoden, Status Codes',
  examNotes: 'Struktur kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            HTTP ist ein <strong>zustandsloses Protokoll</strong> für die
            Kommunikation im Web auf der Anwendungsschicht (Layer 5).
          </p>
          <p>
            Der Client (z.B. Browser) sendet einen <strong>Request</strong>,
            der Server antwortet mit einer <strong>Response</strong>.
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: HttpFlowDiagram,
      },
    },
    {
      id: 'request-structure',
      title: 'HTTP Request Aufbau',
      content: (
        <p>
          Jeder HTTP Request besteht aus vier Teilen. Klicke auf die Bereiche
          für Details:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: HttpRequestExplorer,
      },
    },
    {
      id: 'methods',
      title: 'HTTP Methoden',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3">Methode</th>
                <th className="text-left py-2 px-3">Beschreibung</th>
                <th className="text-left py-2 px-3">Idempotent</th>
                <th className="text-left py-2 px-3">Body</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                <td className="py-2 px-3">Ressource abrufen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-green-400">POST</td>
                <td className="py-2 px-3">Neue Ressource erstellen</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-amber-400">PUT</td>
                <td className="py-2 px-3">Ressource ersetzen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                <td className="py-2 px-3">Ressource löschen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-purple-400">PATCH</td>
                <td className="py-2 px-3">Teilweise aktualisieren</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'status-codes',
      title: 'Status Codes',
      content: (
        <div className="space-y-4">
          <p>Status Codes zeigen das Ergebnis der Anfrage:</p>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-2xl font-bold text-green-400">2xx</span>
              <div>
                <div className="font-medium text-green-300">Erfolg</div>
                <div className="text-sm text-slate-400">200 OK, 201 Created, 204 No Content</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="text-2xl font-bold text-amber-400">4xx</span>
              <div>
                <div className="font-medium text-amber-300">Client-Fehler</div>
                <div className="text-sm text-slate-400">400 Bad Request, 401 Unauthorized, 404 Not Found</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-2xl font-bold text-red-400">5xx</span>
              <div>
                <div className="font-medium text-red-300">Server-Fehler</div>
                <div className="text-sm text-slate-400">500 Internal Server Error, 503 Service Unavailable</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'http-stateless',
        type: 'multiple-choice',
        question: 'Was bedeutet es, dass HTTP "zustandslos" ist?',
        options: [
          'Der Server speichert keine Informationen zwischen Requests',
          'HTTP kann nur GET-Anfragen verarbeiten',
          'Die Verbindung bleibt immer offen',
          'Jeder Request muss verschlüsselt sein',
        ],
        correctAnswer: 'Der Server speichert keine Informationen zwischen Requests',
        explanation:
          'Zustandslos bedeutet, dass jeder Request unabhängig ist. Der Server "erinnert" sich nicht an vorherige Requests. Für Sessions werden daher Cookies oder Tokens verwendet.',
      },
      {
        id: 'http-idempotent',
        type: 'multi-select',
        question: 'Welche HTTP-Methoden sind idempotent? (Mehrere Antworten möglich)',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        correctAnswer: ['GET', 'PUT', 'DELETE'],
        explanation:
          'Idempotent bedeutet: Mehrfaches Ausführen hat den gleichen Effekt wie einmaliges Ausführen. GET liest nur, PUT ersetzt komplett, DELETE löscht. POST und PATCH können bei Wiederholung unterschiedliche Ergebnisse erzeugen.',
      },
      {
        id: 'http-404',
        type: 'multiple-choice',
        question: 'Was bedeutet der Status Code 404?',
        options: [
          'Not Found - Die angeforderte Ressource wurde nicht gefunden',
          'Bad Request - Die Anfrage war fehlerhaft',
          'Unauthorized - Authentifizierung erforderlich',
          'Internal Server Error - Serverfehler',
        ],
        correctAnswer: 'Not Found - Die angeforderte Ressource wurde nicht gefunden',
        explanation:
          '404 ist ein Client-Fehler (4xx) und bedeutet, dass die URL nicht existiert. Der Server hat die Anfrage verstanden, aber keine passende Ressource gefunden.',
      },
    ],
  },
}
```

**Step 3: Create index.ts for course manifest**

```typescript
// src/content/web-technologies/index.ts
import type { Course } from '@/core/types/content'
import { httpTopic } from './topics/http'

export const webTechnologiesCourse: Course = {
  id: 'web-technologies',
  title: 'Web Technologies',
  description: 'HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS',
  topics: [
    httpTopic,
    // More topics will be added here
  ],
}
```

**Step 4: Commit**

```bash
git add exam-trainer/src/content/
git commit -m "feat(exam-trainer): add HTTP topic with content, diagrams, and quiz"
```

---

### Task 3.4: Connect Content to Pages

**Files:**
- Modify: `exam-trainer/src/pages/CoursePage.tsx`
- Modify: `exam-trainer/src/pages/TopicPage.tsx`
- Create: `exam-trainer/src/content/index.ts`

**Step 1: Create content/index.ts**

```typescript
// src/content/index.ts
import type { Course } from '@/core/types/content'
import { webTechnologiesCourse } from './web-technologies'

export const courses: Record<string, Course> = {
  'web-technologies': webTechnologiesCourse,
}

export function getCourse(courseId: string): Course | undefined {
  return courses[courseId]
}

export function getTopic(courseId: string, topicId: string) {
  const course = getCourse(courseId)
  return course?.topics.find((t) => t.id === topicId)
}
```

**Step 2: Update CoursePage.tsx**

```tsx
// src/pages/CoursePage.tsx
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'
import { getCourse } from '@/content'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p>Kurs nicht gefunden.</p>
          <Link to="/" className="text-blue-400 hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-slate-400 mb-8">{course.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {course.topics.map((topic) => (
            <Link key={topic.id} to={`/course/${courseId}/topic/${topic.id}`}>
              <Card hover className="p-4 h-full">
                <h3 className="font-semibold mb-1">{topic.title}</h3>
                <p className="text-sm text-slate-400 mb-2">{topic.description}</p>
                {topic.examNotes && (
                  <span className="text-xs px-2 py-1 bg-amber-900/50 text-amber-300 rounded">
                    {topic.examNotes}
                  </span>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Update TopicPage.tsx**

```tsx
// src/pages/TopicPage.tsx
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getTopic } from '@/content'
import { Button } from '@/core/components/ui'

export function TopicPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>()
  const topic = courseId && topicId ? getTopic(courseId, topicId) : undefined
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
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 4: Verify content displays correctly**

```bash
bun run dev
```

Expected: Navigate to HTTP topic, see sections with diagrams

**Step 5: Commit**

```bash
git add exam-trainer/src/
git commit -m "feat(exam-trainer): connect content to pages, display topics with diagrams"
```

---

## Phase 4: Quiz System

### Task 4.1: Quiz State Hook

**Files:**
- Create: `exam-trainer/src/core/hooks/useQuizState.ts`
- Modify: `exam-trainer/src/core/hooks/index.ts`

**Step 1: Create useQuizState.ts**

```typescript
// src/core/hooks/useQuizState.ts
import { useState, useCallback, useMemo } from 'react'
import type { Quiz, QuizQuestion } from '@/core/types/content'

interface QuizState {
  currentIndex: number
  answers: Map<string, string | string[]>
  showingResult: boolean
}

interface QuizActions {
  submitAnswer: (answer: string | string[]) => void
  nextQuestion: () => void
  previousQuestion: () => void
  reset: () => void
}

interface QuizInfo {
  currentQuestion: QuizQuestion | undefined
  isFirst: boolean
  isLast: boolean
  isAnswered: boolean
  isCorrect: boolean | null
  score: number
  totalQuestions: number
  isComplete: boolean
}

export function useQuizState(quiz: Quiz): [QuizState & QuizInfo, QuizActions] {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: new Map(),
    showingResult: false,
  })

  const currentQuestion = quiz.questions[state.currentIndex]
  const currentAnswer = state.answers.get(currentQuestion?.id ?? '')

  const isCorrect = useMemo(() => {
    if (!currentAnswer || !currentQuestion) return null

    const correct = currentQuestion.correctAnswer
    if (Array.isArray(correct)) {
      if (!Array.isArray(currentAnswer)) return false
      return (
        correct.length === currentAnswer.length &&
        correct.every((c) => currentAnswer.includes(c))
      )
    }
    return currentAnswer === correct
  }, [currentAnswer, currentQuestion])

  const score = useMemo(() => {
    let correct = 0
    quiz.questions.forEach((q) => {
      const answer = state.answers.get(q.id)
      if (!answer) return

      if (Array.isArray(q.correctAnswer)) {
        if (
          Array.isArray(answer) &&
          q.correctAnswer.length === answer.length &&
          q.correctAnswer.every((c) => answer.includes(c))
        ) {
          correct++
        }
      } else if (answer === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }, [quiz.questions, state.answers])

  const submitAnswer = useCallback((answer: string | string[]) => {
    if (!currentQuestion) return
    setState((prev) => ({
      ...prev,
      answers: new Map(prev.answers).set(currentQuestion.id, answer),
      showingResult: true,
    }))
  }, [currentQuestion])

  const nextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, quiz.questions.length - 1),
      showingResult: false,
    }))
  }, [quiz.questions.length])

  const previousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
      showingResult: false,
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: new Map(),
      showingResult: false,
    })
  }, [])

  return [
    {
      ...state,
      currentQuestion,
      isFirst: state.currentIndex === 0,
      isLast: state.currentIndex === quiz.questions.length - 1,
      isAnswered: currentAnswer !== undefined,
      isCorrect,
      score,
      totalQuestions: quiz.questions.length,
      isComplete: state.answers.size === quiz.questions.length,
    },
    { submitAnswer, nextQuestion, previousQuestion, reset },
  ]
}
```

**Step 2: Update hooks/index.ts**

```typescript
// src/core/hooks/index.ts
export { useAnimationStep } from './useAnimationStep'
export type { AnimationStep } from './useAnimationStep'
export { useQuizState } from './useQuizState'
```

**Step 3: Commit**

```bash
git add exam-trainer/src/core/hooks/
git commit -m "feat(exam-trainer): add useQuizState hook for quiz logic"
```

---

### Task 4.2: Quiz Components

**Files:**
- Create: `exam-trainer/src/core/components/quiz/QuizQuestion.tsx`
- Create: `exam-trainer/src/core/components/quiz/QuizResults.tsx`
- Create: `exam-trainer/src/core/components/quiz/index.ts`

**Step 1: Create quiz directory**

```bash
mkdir -p exam-trainer/src/core/components/quiz
```

**Step 2: Create QuizQuestion.tsx**

```tsx
// src/core/components/quiz/QuizQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import type { QuizQuestion as QuizQuestionType } from '@/core/types/content'

interface QuizQuestionProps {
  question: QuizQuestionType
  onSubmit: (answer: string | string[]) => void
  showingResult: boolean
  isCorrect: boolean | null
  selectedAnswer?: string | string[]
}

export function QuizQuestion({
  question,
  onSubmit,
  showingResult,
  isCorrect,
  selectedAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | string[]>(
    selectedAnswer ?? (question.type === 'multi-select' ? [] : '')
  )

  const handleOptionClick = (option: string) => {
    if (showingResult) return

    if (question.type === 'multi-select') {
      setSelected((prev) => {
        const arr = Array.isArray(prev) ? prev : []
        return arr.includes(option)
          ? arr.filter((o) => o !== option)
          : [...arr, option]
      })
    } else {
      setSelected(option)
    }
  }

  const handleSubmit = () => {
    if (!showingResult && selected) {
      onSubmit(selected)
    }
  }

  const isOptionSelected = (option: string) => {
    if (Array.isArray(selected)) {
      return selected.includes(option)
    }
    return selected === option
  }

  const isOptionCorrect = (option: string) => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(option)
    }
    return question.correctAnswer === option
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {question.type === 'multi-select' && (
        <p className="text-sm text-slate-400">Mehrere Antworten möglich</p>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = isOptionSelected(option)
          const correct = isOptionCorrect(option)

          let bgColor = 'bg-slate-800 hover:bg-slate-750 border-slate-700'
          if (showingResult) {
            if (correct) {
              bgColor = 'bg-green-900/30 border-green-500'
            } else if (isSelected && !correct) {
              bgColor = 'bg-red-900/30 border-red-500'
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-900/30 border-blue-500'
          }

          return (
            <motion.div
              key={option}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${bgColor}
                ${showingResult ? 'cursor-default' : ''}
              `}
              onClick={() => handleOptionClick(option)}
              whileHover={!showingResult ? { scale: 1.01 } : {}}
              whileTap={!showingResult ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-500'}
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Result */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className={`p-4 ${
              isCorrect
                ? 'bg-green-900/20 border-green-700'
                : 'bg-red-900/20 border-red-700'
            }`}
          >
            <div className="font-medium mb-2">
              {isCorrect ? '✓ Richtig!' : '✗ Leider falsch'}
            </div>
            <div className="text-sm text-slate-300">{question.explanation}</div>
          </Card>
        </motion.div>
      )}

      {/* Submit Button */}
      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={
            !selected || (Array.isArray(selected) && selected.length === 0)
          }
          className="w-full"
        >
          Antwort prüfen
        </Button>
      )}
    </div>
  )
}
```

**Step 3: Create QuizResults.tsx**

```tsx
// src/core/components/quiz/QuizResults.tsx
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onBack: () => void
}

export function QuizResults({
  score,
  totalQuestions,
  onRestart,
  onBack,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPassing = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <Card className="p-8 max-w-md mx-auto">
        <div
          className={`text-6xl font-bold mb-4 ${
            isPassing ? 'text-green-400' : 'text-amber-400'
          }`}
        >
          {percentage}%
        </div>

        <div className="text-xl mb-2">
          {score} von {totalQuestions} richtig
        </div>

        <div className="text-slate-400 mb-6">
          {isPassing
            ? 'Super! Du hast das Thema gut verstanden.'
            : 'Noch etwas Übung nötig. Schau dir die Inhalte nochmal an.'}
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onBack}>
            Zurück zum Thema
          </Button>
          <Button onClick={onRestart}>Nochmal versuchen</Button>
        </div>
      </Card>
    </motion.div>
  )
}
```

**Step 4: Create index.ts**

```typescript
// src/core/components/quiz/index.ts
export { QuizQuestion } from './QuizQuestion'
export { QuizResults } from './QuizResults'
```

**Step 5: Commit**

```bash
git add exam-trainer/src/core/components/quiz/
git commit -m "feat(exam-trainer): add QuizQuestion and QuizResults components"
```

---

### Task 4.3: Quiz Page

**Files:**
- Create: `exam-trainer/src/pages/QuizPage.tsx`
- Modify: `exam-trainer/src/pages/index.ts`
- Modify: `exam-trainer/src/App.tsx`

**Step 1: Create QuizPage.tsx**

```tsx
// src/pages/QuizPage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTopic } from '@/content'
import { useQuizState } from '@/core/hooks'
import { QuizQuestion, QuizResults } from '@/core/components/quiz'
import { Button } from '@/core/components/ui'

export function QuizPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>()
  const navigate = useNavigate()
  const topic = courseId && topicId ? getTopic(courseId, topicId) : undefined

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
            onBack={handleBack}
          />
        ) : state.currentQuestion ? (
          <>
            <QuizQuestion
              question={state.currentQuestion}
              onSubmit={actions.submitAnswer}
              showingResult={state.showingResult}
              isCorrect={state.isCorrect}
              selectedAnswer={state.answers.get(state.currentQuestion.id)}
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
```

**Step 2: Update pages/index.ts**

```typescript
// src/pages/index.ts
export { HomePage } from './HomePage'
export { CoursePage } from './CoursePage'
export { TopicPage } from './TopicPage'
export { QuizPage } from './QuizPage'
```

**Step 3: Update App.tsx**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, CoursePage, TopicPage, QuizPage } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Step 4: Verify quiz works**

```bash
bun run dev
```

Expected: Navigate to HTTP topic, click "Quiz starten", answer questions, see results

**Step 5: Commit**

```bash
git add exam-trainer/src/
git commit -m "feat(exam-trainer): add QuizPage with full quiz flow"
```

---

## Phase 5: Progress Persistence

### Task 5.1: Progress Hook

**Files:**
- Create: `exam-trainer/src/core/hooks/useProgress.ts`
- Create: `exam-trainer/progress/.gitkeep`
- Modify: `exam-trainer/src/core/hooks/index.ts`

**Step 1: Create progress directory**

```bash
mkdir -p exam-trainer/progress
touch exam-trainer/progress/.gitkeep
```

**Step 2: Create useProgress.ts**

```typescript
// src/core/hooks/useProgress.ts
import { useState, useCallback, useEffect } from 'react'
import type { CourseProgress, TopicProgress, QuizProgress } from '@/core/types/content'

const STORAGE_KEY_PREFIX = 'exam-trainer-progress-'

function loadProgress(courseId: string): CourseProgress {
  const key = STORAGE_KEY_PREFIX + courseId
  const stored = localStorage.getItem(key)

  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Invalid JSON, return default
    }
  }

  return {
    courseId,
    lastUpdated: new Date().toISOString(),
    topics: {},
  }
}

function saveProgress(progress: CourseProgress): void {
  const key = STORAGE_KEY_PREFIX + progress.courseId
  localStorage.setItem(key, JSON.stringify(progress))
}

export function useProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress>(() => loadProgress(courseId))

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const markSectionViewed = useCallback((topicId: string, sectionId: string) => {
    setProgress((prev) => {
      const topicProgress = prev.topics[topicId] ?? {
        completed: false,
        sectionsViewed: [],
        quiz: null,
      }

      if (topicProgress.sectionsViewed.includes(sectionId)) {
        return prev
      }

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            sectionsViewed: [...topicProgress.sectionsViewed, sectionId],
          },
        },
      }
    })
  }, [])

  const markTopicCompleted = useCallback((topicId: string) => {
    setProgress((prev) => {
      const topicProgress = prev.topics[topicId] ?? {
        completed: false,
        sectionsViewed: [],
        quiz: null,
      }

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            completed: true,
          },
        },
      }
    })
  }, [])

  const saveQuizResult = useCallback(
    (topicId: string, score: number, totalQuestions: number) => {
      setProgress((prev) => {
        const topicProgress = prev.topics[topicId] ?? {
          completed: false,
          sectionsViewed: [],
          quiz: null,
        }

        const existingQuiz = topicProgress.quiz
        const newQuiz: QuizProgress = {
          bestScore: Math.max(existingQuiz?.bestScore ?? 0, score),
          totalQuestions,
          lastAttempt: new Date().toISOString(),
        }

        return {
          ...prev,
          lastUpdated: new Date().toISOString(),
          topics: {
            ...prev.topics,
            [topicId]: {
              ...topicProgress,
              quiz: newQuiz,
            },
          },
        }
      })
    },
    []
  )

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress | undefined => {
      return progress.topics[topicId]
    },
    [progress]
  )

  const resetProgress = useCallback(() => {
    setProgress({
      courseId,
      lastUpdated: new Date().toISOString(),
      topics: {},
    })
  }, [courseId])

  return {
    progress,
    markSectionViewed,
    markTopicCompleted,
    saveQuizResult,
    getTopicProgress,
    resetProgress,
  }
}
```

**Step 3: Update hooks/index.ts**

```typescript
// src/core/hooks/index.ts
export { useAnimationStep } from './useAnimationStep'
export type { AnimationStep } from './useAnimationStep'
export { useQuizState } from './useQuizState'
export { useProgress } from './useProgress'
```

**Step 4: Commit**

```bash
git add exam-trainer/src/core/hooks/ exam-trainer/progress/
git commit -m "feat(exam-trainer): add useProgress hook for progress persistence"
```

---

### Task 5.2: Integrate Progress into Pages

**Files:**
- Modify: `exam-trainer/src/pages/CoursePage.tsx`
- Modify: `exam-trainer/src/pages/QuizPage.tsx`

**Step 1: Update CoursePage.tsx to show progress**

```tsx
// src/pages/CoursePage.tsx
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/core/components/ui'
import { getCourse } from '@/content'
import { useProgress } from '@/core/hooks'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined
  const { getTopicProgress } = useProgress(courseId ?? '')

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p>Kurs nicht gefunden.</p>
          <Link to="/" className="text-blue-400 hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-slate-400 mb-8">{course.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {course.topics.map((topic) => {
            const progress = getTopicProgress(topic.id)
            const isCompleted = progress?.completed
            const quizScore = progress?.quiz
              ? `${progress.quiz.bestScore}/${progress.quiz.totalQuestions}`
              : null

            return (
              <Link key={topic.id} to={`/course/${courseId}/topic/${topic.id}`}>
                <Card hover className="p-4 h-full relative">
                  {isCompleted && (
                    <div className="absolute top-2 right-2 text-green-400">✓</div>
                  )}
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{topic.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {topic.examNotes && (
                      <span className="text-xs px-2 py-1 bg-amber-900/50 text-amber-300 rounded">
                        {topic.examNotes}
                      </span>
                    )}
                    {quizScore && (
                      <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                        Quiz: {quizScore}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Update QuizPage.tsx to save results**

Add to QuizPage.tsx after the useQuizState hook:

```tsx
// Add import
import { useQuizState, useProgress } from '@/core/hooks'

// Inside QuizPage component, after useQuizState:
const { saveQuizResult, markTopicCompleted } = useProgress(courseId ?? '')

// Update the QuizResults component call:
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
) : // ... rest
```

**Step 3: Verify progress saves**

```bash
bun run dev
```

Expected: Complete a quiz, see score saved on course page

**Step 4: Commit**

```bash
git add exam-trainer/src/pages/
git commit -m "feat(exam-trainer): integrate progress tracking into pages"
```

---

## Checkpoint: Functional MVP

At this point you have a working exam trainer with:
- ✅ Project foundation (Bun, Vite, React, Tailwind)
- ✅ Docker setup
- ✅ Type definitions
- ✅ Routing
- ✅ Diagram system (AnimatedFlow, ExplorableSVG)
- ✅ HTTP topic with diagrams
- ✅ Quiz system
- ✅ Progress persistence

**Test the full flow:**
1. Start with `docker compose up` or `bun run dev`
2. Navigate through topics
3. View animated HTTP flow diagram
4. Explore HTTP request structure
5. Take the HTTP quiz
6. See progress saved

**Remaining phases (can continue or pause here):**
- Phase 6: More topics (JSON, HTML, CSS, JS, REST, Kubernetes, DNS/TLS)
- Phase 7: Polish (responsive design, keyboard navigation, final styling)

---
