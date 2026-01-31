# Exam Mode Design

Improve exam-trainer to support realistic exam preparation with writing exercises, diagram building, and exam simulation.

## Problem

The current app has multiple-choice quizzes, but the actual exam requires:
- Writing HTTP requests, JSON objects, CSS rules
- Drawing DOM trees and K8s system diagrams
- Multi-part tasks with shared context
- Time management (points = minutes)

## Solution

### 1. New Question Types

#### `free-text` - Writing Exercises
- Textarea input for HTTP requests, explanations, short answers
- Self-check validation: submit → see model answer → self-assess
- UI shows "Key Points" checklist after submission

#### `code-write` - Syntax-Highlighted Code Input
- Code editor with syntax highlighting (CSS, JSON, JavaScript, HTTP)
- Language selector for proper formatting
- Model answer with diff-style comparison (optional)

#### `diagram-build` - Drag-and-Drop Diagram Builder
- Canvas with draggable node palette
- Click-to-connect for parent-child relationships
- Two variants:
  - **DOM Tree Builder**: HTML element nodes (div, ul, li, a, button, etc.)
  - **K8s System Builder**: K8s components (Node, Pod, Service, Deployment, Container)
- Structural validation (checks required components and connections)

### 2. Exam Task Format

Group related questions into multi-part tasks matching exam style:

```typescript
interface ExamTask {
  id: string
  title: string
  points: number
  context?: ReactNode        // Shared context for all parts
  parts: QuizQuestion[]      // Sub-questions (a, b, c, d)
}
```

Each part shows:
- Point value
- Suggested time (points = minutes)
- Question type indicator

### 3. Exam Simulation Mode

New exam simulation feature with:
- **Configuration**: Select topics, duration (45/90 min), difficulty
- **Timer**: Countdown with optional pause, warns at 10 min remaining
- **No hints**: Model answers hidden until full submission
- **Self-assessment**: Rate each answer after seeing model solution
- **Review**: See all answers with model comparisons

### 4. Architecture

#### New Types (`src/core/types/content.ts`)

```typescript
type QuizQuestionType =
  | 'multiple-choice' | 'multi-select' | 'order-steps'
  | 'match-pairs' | 'identify-error' | 'fill-blank'
  | 'free-text' | 'code-write' | 'diagram-build'  // NEW

interface ExamTask {
  id: string
  title: string
  points: number
  context?: ReactNode
  parts: QuizQuestion[]
}

interface DiagramBuilderConfig {
  type: 'dom-tree' | 'k8s-system'
  availableNodes: string[]
  expectedStructure: DiagramNode[]
  hints?: string[]
}
```

#### New Components

```
src/core/components/
├── quiz/
│   ├── FreeTextQuestion.tsx
│   ├── CodeWriteQuestion.tsx
│   └── DiagramBuildQuestion.tsx
├── diagrams/
│   └── DiagramBuilder/
│       ├── Canvas.tsx
│       ├── NodePalette.tsx
│       ├── DomTreeBuilder.tsx
│       └── K8sSystemBuilder.tsx
└── exam/
    ├── ExamTask.tsx
    ├── ExamTimer.tsx
    ├── ExamSimulation.tsx
    └── SelfAssessment.tsx
```

#### New Routes

```
/course/:courseId/exam           → Configure exam simulation
/course/:courseId/exam/active    → Timed exam in progress
/course/:courseId/exam/review    → Review answers vs model
```

### 5. Content Updates

Add `examTasks` to each topic with exam-style questions based on the example exam:

- **HTTP/REST**: Write requests, explain query params, testing methods
- **JSON**: Create Playlist object, compare JSON vs XML
- **HTML/CSS/JS**: Style elements, explain DOM manipulation, draw DOM tree
- **Kubernetes**: Explain concepts, diagram manifest, explain Services

### 6. Implementation Order

1. **Phase 1 - Question Types**
   - Add `free-text` question type with self-check UI
   - Add `code-write` with syntax highlighting
   - Update QuizQuestion component to render new types

2. **Phase 2 - Diagram Builder**
   - Create DiagramBuilder base components (Canvas, Palette)
   - Implement DomTreeBuilder
   - Implement K8sSystemBuilder
   - Add `diagram-build` question type

3. **Phase 3 - Exam Mode**
   - Create ExamTask component for multi-part questions
   - Add ExamTimer component
   - Build ExamSimulation page with configuration
   - Implement review/self-assessment flow

4. **Phase 4 - Content**
   - Add exam-style tasks to HTTP, JSON, HTML/CSS, JS/DOM topics
   - Add exam-style tasks to Kubernetes topics
   - Create sample exam simulation with mixed topics

## Success Criteria

- [ ] Can write HTTP requests and see model answer
- [ ] Can write CSS/JSON with syntax highlighting
- [ ] Can build DOM tree diagram via drag-and-drop
- [ ] Can build K8s system diagram via drag-and-drop
- [ ] Can take timed exam simulation with multiple tasks
- [ ] Can review all answers against model solutions
- [ ] Exam tasks match the style of the example exam
