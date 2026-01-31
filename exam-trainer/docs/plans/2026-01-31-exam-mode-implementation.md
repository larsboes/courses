# Exam Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add exam-style question types (free-text, code-write, diagram-build) and exam simulation mode for realistic exam preparation.

**Architecture:** Extend the existing quiz system with 3 new question types. Each question type renders a specialized input component and uses self-assessment for validation. Add exam mode routes for timed multi-part tasks.

**Tech Stack:** React 18, TypeScript, Framer Motion, Tailwind CSS v4, @xyflow/react (for diagram builder)

---

## Phase 1: Free-Text Question Type

### Task 1: Add free-text type to content.ts

**Files:**
- Modify: `src/core/types/content.ts`

**Step 1: Add FreeTextQuestion interface**

Add after line 96 (after SystemBuilderQuestion):

```typescript
// Free-text question with self-check
export interface FreeTextQuestion extends BaseQuizQuestion {
  type: 'free-text'
  placeholder?: string
  modelAnswer: string
  keyPoints: string[]  // Checklist shown after submission
}
```

**Step 2: Update QuizQuestionType union**

Change line 63-70 to:

```typescript
export type QuizQuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'order-steps'
  | 'match-pairs'
  | 'identify-error'
  | 'fill-blank'
  | 'system-builder'
  | 'free-text'
```

**Step 3: Update QuizQuestion union**

Change line 98 to:

```typescript
export type QuizQuestion = StandardQuizQuestion | SystemBuilderQuestion | FreeTextQuestion
```

**Step 4: Commit**

```bash
git add src/core/types/content.ts
git commit -m "feat(types): add free-text question type"
```

---

### Task 2: Create FreeTextQuestion component

**Files:**
- Create: `src/core/components/quiz/FreeTextQuestion.tsx`

**Step 1: Create the component**

```tsx
// src/core/components/quiz/FreeTextQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'

interface FreeTextQuestionProps {
  question: FreeTextQuestionType
  onSubmit: (answer: string) => void
  showingResult: boolean
}

export function FreeTextQuestion({
  question,
  onSubmit,
  showingResult,
}: FreeTextQuestionProps) {
  const [answer, setAnswer] = useState('')
  const [selfAssessment, setSelfAssessment] = useState<'correct' | 'partial' | 'incorrect' | null>(null)

  const handleSubmit = () => {
    if (!showingResult && answer.trim()) {
      onSubmit(answer)
    }
  }

  const handleSelfAssess = (assessment: 'correct' | 'partial' | 'incorrect') => {
    setSelfAssessment(assessment)
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {/* Text Input */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={question.placeholder || 'Deine Antwort...'}
        disabled={showingResult}
        className={`
          w-full h-48 p-4 rounded-lg border-2 bg-slate-900 text-slate-100
          font-mono text-sm resize-none
          ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
          focus:outline-none
        `}
      />

      {/* Submit Button */}
      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full"
        >
          Antwort pruefen
        </Button>
      )}

      {/* Model Answer & Self-Assessment */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Model Answer */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-2 text-blue-400">Musterantwort:</div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {question.modelAnswer}
            </pre>
          </Card>

          {/* Key Points Checklist */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-3">Wichtige Punkte:</div>
            <ul className="space-y-2">
              {question.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>

          {/* Self-Assessment */}
          {!selfAssessment && (
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Wie hast du abgeschnitten?</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSelfAssess('correct')}
                  className="flex-1 bg-green-900/30 border-green-700 hover:bg-green-900/50"
                >
                  Richtig
                </Button>
                <Button
                  onClick={() => handleSelfAssess('partial')}
                  className="flex-1 bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
                >
                  Teilweise
                </Button>
                <Button
                  onClick={() => handleSelfAssess('incorrect')}
                  className="flex-1 bg-red-900/30 border-red-700 hover:bg-red-900/50"
                >
                  Falsch
                </Button>
              </div>
            </div>
          )}

          {selfAssessment && (
            <Card
              className={`p-4 ${
                selfAssessment === 'correct'
                  ? 'bg-green-900/20 border-green-700'
                  : selfAssessment === 'partial'
                  ? 'bg-amber-900/20 border-amber-700'
                  : 'bg-red-900/20 border-red-700'
              }`}
            >
              <div className="font-medium">
                {selfAssessment === 'correct' && 'Gut gemacht!'}
                {selfAssessment === 'partial' && 'Weiter ueben!'}
                {selfAssessment === 'incorrect' && 'Wiederhole das Thema.'}
              </div>
              <div className="text-sm text-slate-300 mt-1">{question.explanation}</div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
```

**Step 2: Export from quiz index**

Add to `src/core/components/quiz/index.ts`:

```typescript
export { FreeTextQuestion } from './FreeTextQuestion'
```

**Step 3: Verify build**

```bash
cd /home/lars/Developer/personal/courses/.worktrees/exam-mode/exam-trainer && bun run build
```

**Step 4: Commit**

```bash
git add src/core/components/quiz/FreeTextQuestion.tsx src/core/components/quiz/index.ts
git commit -m "feat(quiz): add FreeTextQuestion component"
```

---

### Task 3: Integrate FreeTextQuestion into QuizQuestion

**Files:**
- Modify: `src/core/components/quiz/QuizQuestion.tsx`

**Step 1: Import FreeTextQuestion**

Add import at top:

```typescript
import { FreeTextQuestion } from './FreeTextQuestion'
import type { FreeTextQuestion as FreeTextQuestionType } from '@/core/types/content'
```

**Step 2: Add free-text rendering branch**

In the main `QuizQuestion` function (around line 207), add before the return:

```typescript
if (question.type === 'free-text') {
  return (
    <FreeTextQuestion
      question={question as FreeTextQuestionType}
      onSubmit={(answer) => onSubmit(answer)}
      showingResult={showingResult}
    />
  )
}
```

**Step 3: Verify build**

```bash
bun run build
```

**Step 4: Commit**

```bash
git add src/core/components/quiz/QuizQuestion.tsx
git commit -m "feat(quiz): integrate FreeTextQuestion into quiz renderer"
```

---

### Task 4: Add sample free-text question to HTTP topic

**Files:**
- Modify: `src/content/web-technologies/topics/http.tsx`

**Step 1: Add quiz with free-text question**

Add after `connectionDiagram` (around line 160):

```typescript
quiz: {
  questions: [
    {
      id: 'http-request-write',
      type: 'free-text',
      question: 'Schreiben Sie einen HTTP GET Request, der alle Playlists mit einer Mindestlaufzeit von 300 Minuten abfragt. Server: server.com:8001',
      placeholder: 'GET /playlists...',
      modelAnswer: `GET /playlists?min_duration=300 HTTP/1.1
Host: server.com:8001
Accept: application/json`,
      keyPoints: [
        'GET Methode fuer Abfrage',
        'Query-Parameter fuer Filterung (?min_duration=300)',
        'Host-Header mit Port',
        'Accept-Header fuer JSON-Antwort',
      ],
      explanation: 'HTTP Requests bestehen aus Request-Line, Headers und optionalem Body. Query-Parameter werden fuer Filterung verwendet.',
    },
  ],
},
```

**Step 2: Verify build**

```bash
bun run build
```

**Step 3: Test manually**

```bash
bun run dev
# Navigate to http://localhost:5173/course/web-technologies/topic/http/quiz
```

**Step 4: Commit**

```bash
git add src/content/web-technologies/topics/http.tsx
git commit -m "feat(content): add free-text HTTP request question"
```

---

## Phase 2: Code-Write Question Type

### Task 5: Add code-write type to content.ts

**Files:**
- Modify: `src/core/types/content.ts`

**Step 1: Add CodeWriteQuestion interface**

Add after FreeTextQuestion interface:

```typescript
// Code-write question with syntax highlighting
export interface CodeWriteQuestion extends BaseQuizQuestion {
  type: 'code-write'
  language: 'css' | 'javascript' | 'json' | 'html' | 'http'
  placeholder?: string
  modelAnswer: string
  keyPoints: string[]
}
```

**Step 2: Update QuizQuestionType union**

Add `'code-write'` to the union.

**Step 3: Update QuizQuestion union**

```typescript
export type QuizQuestion = StandardQuizQuestion | SystemBuilderQuestion | FreeTextQuestion | CodeWriteQuestion
```

**Step 4: Commit**

```bash
git add src/core/types/content.ts
git commit -m "feat(types): add code-write question type"
```

---

### Task 6: Create CodeWriteQuestion component

**Files:**
- Create: `src/core/components/quiz/CodeWriteQuestion.tsx`

**Step 1: Create component with syntax highlighting**

```tsx
// src/core/components/quiz/CodeWriteQuestion.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import type { CodeWriteQuestion as CodeWriteQuestionType } from '@/core/types/content'

interface CodeWriteQuestionProps {
  question: CodeWriteQuestionType
  onSubmit: (answer: string) => void
  showingResult: boolean
}

const languageLabels: Record<string, string> = {
  css: 'CSS',
  javascript: 'JavaScript',
  json: 'JSON',
  html: 'HTML',
  http: 'HTTP',
}

const languageColors: Record<string, string> = {
  css: 'text-pink-400',
  javascript: 'text-yellow-400',
  json: 'text-green-400',
  html: 'text-orange-400',
  http: 'text-blue-400',
}

export function CodeWriteQuestion({
  question,
  onSubmit,
  showingResult,
}: CodeWriteQuestionProps) {
  const [code, setCode] = useState('')
  const [selfAssessment, setSelfAssessment] = useState<'correct' | 'partial' | 'incorrect' | null>(null)

  const handleSubmit = () => {
    if (!showingResult && code.trim()) {
      onSubmit(code)
    }
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-medium">{question.question}</div>

      {/* Language Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm ${languageColors[question.language]}`}>
        <span className="w-2 h-2 rounded-full bg-current" />
        {languageLabels[question.language]}
      </div>

      {/* Code Input */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={question.placeholder || `// ${languageLabels[question.language]} hier eingeben...`}
          disabled={showingResult}
          spellCheck={false}
          className={`
            w-full h-64 p-4 rounded-lg border-2 bg-slate-950 text-slate-100
            font-mono text-sm resize-none leading-relaxed
            ${showingResult ? 'border-slate-600 opacity-75' : 'border-slate-700 focus:border-blue-500'}
            focus:outline-none
          `}
        />
        <div className="absolute top-2 right-2 text-xs text-slate-500">
          {code.split('\n').length} Zeilen
        </div>
      </div>

      {/* Submit Button */}
      {!showingResult && (
        <Button
          onClick={handleSubmit}
          disabled={!code.trim()}
          className="w-full"
        >
          Code pruefen
        </Button>
      )}

      {/* Model Answer & Self-Assessment */}
      {showingResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Model Answer */}
          <Card className="p-4 bg-slate-950 border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-400">Musterantwort:</span>
              <span className={`text-xs ${languageColors[question.language]}`}>
                {languageLabels[question.language]}
              </span>
            </div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto">
              {question.modelAnswer}
            </pre>
          </Card>

          {/* Key Points */}
          <Card className="p-4 bg-slate-800/50 border-slate-600">
            <div className="font-medium mb-3">Wichtige Punkte:</div>
            <ul className="space-y-2">
              {question.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>

          {/* Self-Assessment */}
          {!selfAssessment && (
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Wie hast du abgeschnitten?</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setSelfAssessment('correct')}
                  className="flex-1 bg-green-900/30 border-green-700 hover:bg-green-900/50"
                >
                  Richtig
                </Button>
                <Button
                  onClick={() => setSelfAssessment('partial')}
                  className="flex-1 bg-amber-900/30 border-amber-700 hover:bg-amber-900/50"
                >
                  Teilweise
                </Button>
                <Button
                  onClick={() => setSelfAssessment('incorrect')}
                  className="flex-1 bg-red-900/30 border-red-700 hover:bg-red-900/50"
                >
                  Falsch
                </Button>
              </div>
            </div>
          )}

          {selfAssessment && (
            <Card
              className={`p-4 ${
                selfAssessment === 'correct'
                  ? 'bg-green-900/20 border-green-700'
                  : selfAssessment === 'partial'
                  ? 'bg-amber-900/20 border-amber-700'
                  : 'bg-red-900/20 border-red-700'
              }`}
            >
              <div className="text-sm text-slate-300">{question.explanation}</div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
```

**Step 2: Export and integrate**

Add to `src/core/components/quiz/index.ts`:
```typescript
export { CodeWriteQuestion } from './CodeWriteQuestion'
```

**Step 3: Integrate into QuizQuestion.tsx**

Import and add rendering branch similar to Task 3.

**Step 4: Verify build and commit**

```bash
bun run build
git add src/core/components/quiz/
git commit -m "feat(quiz): add CodeWriteQuestion component"
```

---

### Task 7: Add CSS code-write question

**Files:**
- Modify: `src/content/web-technologies/topics/css.tsx`

**Step 1: Add code-write question to CSS topic quiz**

```typescript
{
  id: 'css-playlist-styling',
  type: 'code-write',
  language: 'css',
  question: 'Schreiben Sie CSS, sodass der Header "Playlist Details" (h2 in .playlist) gruen und die Track-Links (a in .playlist li) blau dargestellt werden.',
  placeholder: '.playlist h2 {\n  \n}',
  modelAnswer: `.playlist h2 {
  color: green;
}

.playlist li a {
  color: blue;
}`,
  keyPoints: [
    'Verschachtelte Selektoren (.playlist h2)',
    'color Property fuer Textfarbe',
    'Spezifitaet: Element in Klasse',
  ],
  explanation: 'CSS Selektoren koennen verschachtelt werden um spezifische Elemente zu stylen.',
}
```

**Step 2: Verify and commit**

```bash
bun run build
git add src/content/web-technologies/topics/css.tsx
git commit -m "feat(content): add CSS code-write question"
```

---

## Phase 3: DOM Tree Diagram Builder

### Task 8: Create DomTreeBuilder component

**Files:**
- Create: `src/core/components/quiz/DomTreeBuilder.tsx`

**Step 1: Create the drag-and-drop DOM tree builder**

```tsx
// src/core/components/quiz/DomTreeBuilder.tsx
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'

interface DomNode {
  id: string
  type: string
  children: string[]
  x: number
  y: number
}

interface DomTreeBuilderProps {
  availableNodes: string[]
  expectedStructure: { type: string; children?: string[] }[]
  onComplete: (isCorrect: boolean) => void
  question: string
}

export function DomTreeBuilder({
  availableNodes,
  expectedStructure,
  onComplete,
  question,
}: DomTreeBuilderProps) {
  const [nodes, setNodes] = useState<DomNode[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const addNode = (type: string) => {
    const newNode: DomNode = {
      id: `node-${Date.now()}`,
      type,
      children: [],
      x: 200 + nodes.length * 30,
      y: 100 + Math.floor(nodes.length / 3) * 80,
    }
    setNodes([...nodes, newNode])
  }

  const handleNodeClick = (nodeId: string) => {
    if (connecting && selectedNode && selectedNode !== nodeId) {
      // Create parent-child connection
      setNodes(nodes.map(n =>
        n.id === selectedNode
          ? { ...n, children: [...n.children, nodeId] }
          : n
      ))
      setConnecting(false)
      setSelectedNode(null)
    } else {
      setSelectedNode(nodeId)
    }
  }

  const startConnection = () => {
    if (selectedNode) {
      setConnecting(true)
    }
  }

  const deleteNode = () => {
    if (selectedNode) {
      setNodes(nodes.filter(n => n.id !== selectedNode).map(n => ({
        ...n,
        children: n.children.filter(c => c !== selectedNode)
      })))
      setSelectedNode(null)
    }
  }

  const checkAnswer = () => {
    // Simple structural validation
    const nodeTypes = nodes.map(n => n.type)
    const expectedTypes = expectedStructure.map(e => e.type)
    const hasAllTypes = expectedTypes.every(t => nodeTypes.includes(t))
    const correctCount = expectedTypes.length === nodeTypes.length

    setIsCorrect(hasAllTypes && correctCount)
    setShowResult(true)
    onComplete(hasAllTypes && correctCount)
  }

  const clear = () => {
    setNodes([])
    setSelectedNode(null)
    setConnecting(false)
    setShowResult(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">{question}</div>

      <div className="flex gap-4">
        {/* Canvas */}
        <div className="flex-1 relative h-96 bg-slate-900 rounded-lg border-2 border-slate-700 overflow-hidden">
          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none">
            {nodes.map(node =>
              node.children.map(childId => {
                const child = nodes.find(n => n.id === childId)
                if (!child) return null
                return (
                  <line
                    key={`${node.id}-${childId}`}
                    x1={node.x + 40}
                    y1={node.y + 40}
                    x2={child.x + 40}
                    y2={child.y}
                    stroke="#64748b"
                    strokeWidth={2}
                  />
                )
              })
            )}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => {
                setNodes(nodes.map(n =>
                  n.id === node.id
                    ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y }
                    : n
                ))
              }}
              className={`
                absolute w-20 h-10 flex items-center justify-center
                rounded-lg border-2 cursor-pointer font-mono text-sm
                ${selectedNode === node.id
                  ? 'bg-blue-900/50 border-blue-500'
                  : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
                ${connecting && selectedNode !== node.id ? 'ring-2 ring-green-500/50' : ''}
              `}
              style={{ left: node.x, top: node.y }}
              onClick={() => handleNodeClick(node.id)}
            >
              &lt;{node.type}&gt;
            </motion.div>
          ))}

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              Ziehe Elemente von rechts auf die Canvas
            </div>
          )}
        </div>

        {/* Toolbox */}
        <div className="w-48 space-y-3">
          <div className="text-sm font-medium text-slate-400">Elemente:</div>
          <div className="grid grid-cols-2 gap-2">
            {availableNodes.map(type => (
              <button
                key={type}
                onClick={() => addNode(type)}
                className="p-2 text-xs font-mono bg-slate-800 rounded border border-slate-700 hover:border-slate-500"
              >
                &lt;{type}&gt;
              </button>
            ))}
          </div>

          <hr className="border-slate-700" />

          <div className="space-y-2">
            <Button
              onClick={startConnection}
              disabled={!selectedNode || connecting}
              className="w-full text-sm"
            >
              {connecting ? 'Waehle Kind...' : 'Verbinden'}
            </Button>
            <Button
              onClick={deleteNode}
              disabled={!selectedNode}
              className="w-full text-sm bg-red-900/30 border-red-700"
            >
              Loeschen
            </Button>
            <Button onClick={clear} className="w-full text-sm">
              Zuruecksetzen
            </Button>
          </div>
        </div>
      </div>

      {!showResult && (
        <Button onClick={checkAnswer} className="w-full" disabled={nodes.length === 0}>
          Antwort pruefen
        </Button>
      )}

      {showResult && (
        <Card className={`p-4 ${isCorrect ? 'bg-green-900/20 border-green-700' : 'bg-amber-900/20 border-amber-700'}`}>
          <div className="font-medium">
            {isCorrect ? 'Richtig! Die DOM-Struktur stimmt.' : 'Pruefe die Struktur nochmal.'}
          </div>
          <div className="text-sm text-slate-300 mt-1">
            Erwartete Elemente: {expectedStructure.map(e => e.type).join(', ')}
          </div>
        </Card>
      )}
    </div>
  )
}
```

**Step 2: Export from index**

**Step 3: Commit**

```bash
git add src/core/components/quiz/DomTreeBuilder.tsx src/core/components/quiz/index.ts
git commit -m "feat(quiz): add DomTreeBuilder component"
```

---

### Task 9: Add diagram-build question type

**Files:**
- Modify: `src/core/types/content.ts`

**Step 1: Add DiagramBuildQuestion interface**

```typescript
// Diagram-build question (DOM tree, K8s system)
export interface DiagramBuildQuestion extends BaseQuizQuestion {
  type: 'diagram-build'
  diagramType: 'dom-tree' | 'k8s-system'
  availableNodes: string[]
  expectedStructure: { type: string; children?: string[] }[]
}
```

**Step 2: Update unions**

Add `'diagram-build'` to QuizQuestionType and DiagramBuildQuestion to QuizQuestion union.

**Step 3: Commit**

```bash
git add src/core/types/content.ts
git commit -m "feat(types): add diagram-build question type"
```

---

### Task 10: Integrate DomTreeBuilder into QuizQuestion

**Files:**
- Modify: `src/core/components/quiz/QuizQuestion.tsx`

**Step 1: Import and add rendering branch**

```typescript
import { DomTreeBuilder } from './DomTreeBuilder'
import type { DiagramBuildQuestion } from '@/core/types/content'

// In QuizQuestion function:
if (question.type === 'diagram-build' && question.diagramType === 'dom-tree') {
  return (
    <DomTreeBuilder
      question={question.question}
      availableNodes={question.availableNodes}
      expectedStructure={question.expectedStructure}
      onComplete={(correct) => onSubmit(correct ? 'correct' : 'incorrect')}
    />
  )
}
```

**Step 2: Verify and commit**

```bash
bun run build
git add src/core/components/quiz/QuizQuestion.tsx
git commit -m "feat(quiz): integrate DomTreeBuilder"
```

---

### Task 11: Add DOM tree question to JavaScript/DOM topic

**Files:**
- Modify: `src/content/web-technologies/topics/javascript-dom.tsx`

**Step 1: Add diagram-build question**

```typescript
{
  id: 'dom-tree-build',
  type: 'diagram-build',
  diagramType: 'dom-tree',
  question: 'Zeichne das DOM der Playlist nach Ausfuehrung des JavaScript-Codes. Die ul#playlist enthaelt ein li mit einem a-Element und einem button.',
  availableNodes: ['ul', 'li', 'a', 'button', 'div', 'h2'],
  expectedStructure: [
    { type: 'ul', children: ['li'] },
    { type: 'li', children: ['a', 'button'] },
    { type: 'a' },
    { type: 'button' },
  ],
  explanation: 'Das DOM spiegelt die hierarchische Struktur des HTML-Dokuments wider.',
}
```

**Step 2: Commit**

```bash
git add src/content/web-technologies/topics/javascript-dom.tsx
git commit -m "feat(content): add DOM tree diagram question"
```

---

## Phase 4: Exam Simulation Mode

### Task 12: Create ExamTask type and component

**Files:**
- Modify: `src/core/types/content.ts`
- Create: `src/core/components/exam/ExamTask.tsx`

**Step 1: Add ExamTask interface to types**

```typescript
// Exam task (groups related questions)
export interface ExamTask {
  id: string
  title: string
  points: number
  context?: ReactNode
  parts: QuizQuestion[]
}

// Add to Topic interface:
examTasks?: ExamTask[]
```

**Step 2: Create ExamTask component**

```tsx
// src/core/components/exam/ExamTask.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/core/components/ui'
import { QuizQuestion } from '@/core/components/quiz'
import type { ExamTask as ExamTaskType } from '@/core/types/content'

interface ExamTaskProps {
  task: ExamTaskType
  taskNumber: number
  onComplete: (scores: number[]) => void
}

export function ExamTask({ task, taskNumber, onComplete }: ExamTaskProps) {
  const [currentPart, setCurrentPart] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [showingResult, setShowingResult] = useState(false)

  const handleSubmit = (answer: string | string[]) => {
    setShowingResult(true)
  }

  const handleNext = (score: number) => {
    const newScores = [...scores, score]
    setScores(newScores)

    if (currentPart < task.parts.length - 1) {
      setCurrentPart(currentPart + 1)
      setShowingResult(false)
    } else {
      onComplete(newScores)
    }
  }

  const part = task.parts[currentPart]
  const partLetter = String.fromCharCode(97 + currentPart) // a, b, c, d

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Aufgabe {taskNumber}: {task.title}
        </h2>
        <span className="text-lg text-slate-400">({task.points} Punkte)</span>
      </div>

      {/* Context */}
      {task.context && (
        <Card className="p-4 bg-slate-800/50 border-slate-600">
          {task.context}
        </Card>
      )}

      {/* Progress */}
      <div className="flex gap-2">
        {task.parts.map((_, i) => (
          <div
            key={i}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${i < currentPart ? 'bg-green-600' : i === currentPart ? 'bg-blue-600' : 'bg-slate-700'}
            `}
          >
            {String.fromCharCode(97 + i)}
          </div>
        ))}
      </div>

      {/* Current Part */}
      <Card className="p-6">
        <div className="text-sm text-slate-400 mb-4">
          Teil {partLetter}) - ca. {Math.round(task.points / task.parts.length)} Punkte
        </div>
        <QuizQuestion
          question={part}
          onSubmit={handleSubmit}
          showingResult={showingResult}
          isCorrect={null}
        />
      </Card>
    </div>
  )
}
```

**Step 3: Create index export**

```typescript
// src/core/components/exam/index.ts
export { ExamTask } from './ExamTask'
```

**Step 4: Commit**

```bash
git add src/core/types/content.ts src/core/components/exam/
git commit -m "feat(exam): add ExamTask component"
```

---

### Task 13: Create ExamSimulation page

**Files:**
- Create: `src/pages/ExamPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/index.ts`

**Step 1: Create ExamPage**

```tsx
// src/pages/ExamPage.tsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Card } from '@/core/components/ui'
import { ExamTask } from '@/core/components/exam'
import { courses } from '@/content'
import type { ExamTask as ExamTaskType } from '@/core/types/content'

export function ExamPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courses.find(c => c.id === courseId)

  const [started, setStarted] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [taskScores, setTaskScores] = useState<number[][]>([])

  if (!course) {
    return <div>Kurs nicht gefunden</div>
  }

  // Collect all exam tasks from topics
  const allTasks: ExamTaskType[] = course.topics
    .flatMap(t => t.examTasks || [])

  if (allTasks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Keine Pruefungsaufgaben</h1>
          <p className="text-slate-400 mb-6">
            Fuer diesen Kurs sind noch keine Pruefungsaufgaben definiert.
          </p>
          <Link to={`/course/${courseId}`}>
            <Button>Zurueck zum Kurs</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleTaskComplete = (scores: number[]) => {
    setTaskScores([...taskScores, scores])
    if (currentTaskIndex < allTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
    }
  }

  const totalPoints = allTasks.reduce((sum, t) => sum + t.points, 0)
  const isComplete = taskScores.length === allTasks.length

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Pruefungssimulation</h1>
          <p className="text-slate-400 mb-6">
            {allTasks.length} Aufgaben, {totalPoints} Punkte gesamt
          </p>
          <div className="space-y-2 mb-6">
            {allTasks.map((task, i) => (
              <div key={task.id} className="flex justify-between text-sm">
                <span>Aufgabe {i + 1}: {task.title}</span>
                <span className="text-slate-500">{task.points} Punkte</span>
              </div>
            ))}
          </div>
          <Button onClick={() => setStarted(true)} className="w-full">
            Pruefung starten
          </Button>
        </Card>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Pruefung abgeschlossen!</h1>
          <p className="text-slate-400 mb-6">
            Du hast alle {allTasks.length} Aufgaben bearbeitet.
          </p>
          <Link to={`/course/${courseId}`}>
            <Button>Zurueck zum Kurs</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <ExamTask
          task={allTasks[currentTaskIndex]}
          taskNumber={currentTaskIndex + 1}
          onComplete={handleTaskComplete}
        />
      </div>
    </div>
  )
}
```

**Step 2: Add route to App.tsx**

```tsx
<Route path="/course/:courseId/exam" element={<ExamPage />} />
```

**Step 3: Export from pages/index.ts**

```typescript
export { ExamPage } from './ExamPage'
```

**Step 4: Commit**

```bash
git add src/pages/ExamPage.tsx src/pages/index.ts src/App.tsx
git commit -m "feat(exam): add exam simulation page"
```

---

### Task 14: Add exam tasks to topics

**Files:**
- Modify: `src/content/web-technologies/topics/http.tsx`
- Modify: `src/content/web-technologies/topics/json.tsx`
- Modify: `src/content/web-technologies/topics/kubernetes-begriffe.tsx`

**Step 1: Add exam task to HTTP topic**

Based on example exam Aufgabe 1:

```typescript
examTasks: [
  {
    id: 'rest-http-task',
    title: 'REST & HTTP',
    points: 20,
    context: (
      <p>
        Fuer unsere Meta Playlists haben wir einen REST Endpoint zur Abfrage von Playlists definiert:
        <code className="mx-2 px-2 py-1 bg-slate-700 rounded">/playlists</code>
        – liefert die Namen aller Playlists.
      </p>
    ),
    parts: [
      {
        id: 'rest-http-a',
        type: 'free-text',
        question: 'Was hat REST mit HTTP zu tun?',
        modelAnswer: 'REST nutzt HTTP als Transportprotokoll. RESTful APIs verwenden HTTP-Methoden (GET, POST, PUT, DELETE) um CRUD-Operationen auf Ressourcen durchzufuehren. HTTP stellt die Grundlage fuer die zustandslose Kommunikation.',
        keyPoints: [
          'HTTP als Transportprotokoll',
          'HTTP-Methoden fuer CRUD',
          'Zustandslose Kommunikation',
        ],
        explanation: 'REST ist ein Architekturstil, HTTP das Protokoll.',
      },
      // ... more parts
    ],
  },
],
```

**Step 2: Commit**

```bash
git add src/content/web-technologies/topics/
git commit -m "feat(content): add exam tasks to topics"
```

---

### Task 15: Add exam link to CoursePage

**Files:**
- Modify: `src/pages/CoursePage.tsx`

**Step 1: Add exam button**

Add after topic grid/graph toggle:

```tsx
<Link to={`/course/${courseId}/exam`}>
  <Button className="bg-purple-900/30 border-purple-700 hover:bg-purple-900/50">
    Pruefungssimulation starten
  </Button>
</Link>
```

**Step 2: Commit**

```bash
git add src/pages/CoursePage.tsx
git commit -m "feat(ui): add exam simulation link to course page"
```

---

## Verification

### Task 16: Full integration test

**Step 1: Run build**

```bash
cd /home/lars/Developer/personal/courses/.worktrees/exam-mode/exam-trainer
bun run build
```

**Step 2: Manual testing**

```bash
bun run dev
```

Test:
1. Navigate to `/course/web-technologies/topic/http/quiz` - test free-text question
2. Navigate to `/course/web-technologies/topic/css/quiz` - test code-write question
3. Navigate to `/course/web-technologies/topic/javascript-dom/quiz` - test DOM builder
4. Navigate to `/course/web-technologies/exam` - test exam simulation

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete exam mode implementation"
```

---

## Summary

| Phase | Tasks | Features |
|-------|-------|----------|
| 1 | 1-4 | Free-text questions with self-check |
| 2 | 5-7 | Code-write questions with syntax highlighting |
| 3 | 8-11 | DOM tree diagram builder |
| 4 | 12-15 | Exam simulation with multi-part tasks |
| 5 | 16 | Integration verification |

Total: ~16 tasks, each 2-5 minutes
