// src/content/web-technologies/diagrams/DomTreeBuilderExercise.tsx
import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface DomNode {
  id: string
  tag: string
  parent: string | null
  attributes?: Record<string, string>
  textContent?: string
}

interface Exercise {
  id: string
  title: string
  description: string
  jsCode: string
  expectedDom: DomNode[]
  hints: string[]
}

// ─────────────────────────────────────────────────
// Exercise Data
// ─────────────────────────────────────────────────

const EXERCISES: Exercise[] = [
  {
    id: 'basic-list',
    title: 'Liste erstellen',
    description: 'Baue das DOM, das der JavaScript-Code erzeugt.',
    jsCode: `const ul = document.createElement('ul');
ul.id = 'playlist';

const li1 = document.createElement('li');
li1.textContent = 'Track 1';

const li2 = document.createElement('li');
li2.textContent = 'Track 2';

ul.appendChild(li1);
ul.appendChild(li2);
document.body.appendChild(ul);`,
    expectedDom: [
      { id: 'body', tag: 'body', parent: null },
      { id: 'ul', tag: 'ul', parent: 'body', attributes: { id: 'playlist' } },
      { id: 'li1', tag: 'li', parent: 'ul', textContent: 'Track 1' },
      { id: 'li2', tag: 'li', parent: 'ul', textContent: 'Track 2' },
    ],
    hints: [
      'Der Code erstellt zuerst eine ul mit id="playlist"',
      'Dann werden zwei li-Elemente erstellt',
      'Die li-Elemente werden mit appendChild an ul angehängt',
    ],
  },
  {
    id: 'nested-structure',
    title: 'Verschachtelte Struktur',
    description: 'Erstelle das DOM mit verschachtelten Elementen.',
    jsCode: `const div = document.createElement('div');
div.className = 'card';

const h2 = document.createElement('h2');
h2.textContent = 'Titel';

const p = document.createElement('p');
p.textContent = 'Beschreibung';

div.appendChild(h2);
div.appendChild(p);
document.body.appendChild(div);`,
    expectedDom: [
      { id: 'body', tag: 'body', parent: null },
      { id: 'div', tag: 'div', parent: 'body', attributes: { class: 'card' } },
      { id: 'h2', tag: 'h2', parent: 'div', textContent: 'Titel' },
      { id: 'p', tag: 'p', parent: 'div', textContent: 'Beschreibung' },
    ],
    hints: [
      'Ein div mit class="card" ist das Wurzelelement',
      'h2 und p sind Kinder des div',
      'Die Reihenfolge der appendChild-Aufrufe bestimmt die Reihenfolge im DOM',
    ],
  },
  {
    id: 'link-button',
    title: 'Link mit Button',
    description: 'Baue ein li-Element mit einem Link und einem Button.',
    jsCode: `const li = document.createElement('li');

const a = document.createElement('a');
a.href = '/track/1';
a.textContent = 'Track Link';

const btn = document.createElement('button');
btn.textContent = 'Remove';

li.appendChild(a);
li.appendChild(btn);
document.body.appendChild(li);`,
    expectedDom: [
      { id: 'body', tag: 'body', parent: null },
      { id: 'li', tag: 'li', parent: 'body' },
      { id: 'a', tag: 'a', parent: 'li', attributes: { href: '/track/1' }, textContent: 'Track Link' },
      { id: 'btn', tag: 'button', parent: 'li', textContent: 'Remove' },
    ],
    hints: [
      'li ist das Wurzelelement unter body',
      'a und button sind Geschwister innerhalb von li',
      'a hat ein href-Attribut',
    ],
  },
]

const AVAILABLE_TAGS = ['div', 'ul', 'li', 'a', 'button', 'h1', 'h2', 'h3', 'p', 'span', 'img']

const TAG_COLORS: Record<string, string> = {
  body: '#7c3aed',
  div: '#2563eb',
  ul: '#059669',
  li: '#10b981',
  a: '#f59e0b',
  button: '#ef4444',
  h1: '#8b5cf6',
  h2: '#8b5cf6',
  h3: '#8b5cf6',
  p: '#06b6d4',
  span: '#6366f1',
  img: '#ec4899',
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// ─────────────────────────────────────────────────
// Tree Visualization Component
// ─────────────────────────────────────────────────

interface TreeNodeDisplayProps {
  node: DomNode
  allNodes: DomNode[]
  depth: number
  onRemove: (id: string) => void
  isExpected?: boolean
}

function TreeNodeDisplay({ node, allNodes, depth, onRemove, isExpected }: TreeNodeDisplayProps) {
  const children = allNodes.filter(n => n.parent === node.id)
  const color = TAG_COLORS[node.tag] || '#64748b'

  return (
    <div className="relative" style={{ marginLeft: depth > 0 ? 24 : 0 }}>
      {depth > 0 && (
        <div
          className="absolute left-[-16px] top-0 h-5 border-l-2 border-b-2 border-slate-600 w-3"
          style={{ borderBottomLeftRadius: 4 }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-1
          ${isExpected ? 'border-2 border-dashed border-slate-500' : 'border border-slate-600'}
        `}
        style={{ backgroundColor: isExpected ? 'transparent' : `${color}20` }}
      >
        <span
          className="text-sm font-mono font-medium"
          style={{ color: isExpected ? '#64748b' : color }}
        >
          &lt;{node.tag}&gt;
        </span>
        {node.attributes && Object.entries(node.attributes).map(([key, value]) => (
          <span key={key} className="text-xs text-slate-400">
            {key}="{value}"
          </span>
        ))}
        {node.textContent && (
          <span className="text-xs text-slate-300 italic">"{node.textContent}"</span>
        )}
        {!isExpected && node.tag !== 'body' && (
          <button
            onClick={() => onRemove(node.id)}
            className="ml-1 p-0.5 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {children.map(child => (
          <TreeNodeDisplay
            key={child.id}
            node={child}
            allNodes={allNodes}
            depth={depth + 1}
            onRemove={onRemove}
            isExpected={isExpected}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Code Highlighter Component
// ─────────────────────────────────────────────────

function CodeHighlight({ code, highlightLine }: { code: string; highlightLine: number | null }) {
  const lines = code.split('\n')

  return (
    <div className="font-mono text-sm">
      {lines.map((line, index) => {
        // Simple syntax highlighting
        let highlighted = line
          .replace(/(const|let|var|document|createElement|appendChild|getElementById|textContent|className|href|id)/g,
            '<span class="text-purple-400">$1</span>')
          .replace(/('.*?'|".*?")/g, '<span class="text-green-400">$1</span>')
          .replace(/(\.\w+)(?=\()/g, '<span class="text-blue-400">$1</span>')

        return (
          <motion.div
            key={index}
            className={`
              px-3 py-0.5 border-l-2 transition-colors
              ${highlightLine === index
                ? 'bg-yellow-500/20 border-yellow-500'
                : 'border-transparent hover:bg-slate-700/50'}
            `}
            animate={{
              backgroundColor: highlightLine === index ? 'rgba(234, 179, 8, 0.2)' : 'transparent',
            }}
          >
            <span className="text-slate-500 select-none w-6 inline-block">{index + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: highlighted }} />
          </motion.div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function DomTreeBuilderExercise({ className }: DiagramProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userNodes, setUserNodes] = useState<DomNode[]>([
    { id: 'body', tag: 'body', parent: null },
  ])
  const [selectedParent, setSelectedParent] = useState<string | null>('body')
  const [currentHint, setCurrentHint] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [stepMode, setStepMode] = useState(false)
  const [currentLine, setCurrentLine] = useState<number | null>(null)
  const [validated, setValidated] = useState<boolean | null>(null)

  const exercise = EXERCISES[currentExercise]

  // Validate user's DOM against expected
  const validate = useCallback(() => {
    const expected = exercise.expectedDom
    const user = userNodes

    // Check if all expected nodes exist with correct parents
    const isValid = expected.every(expectedNode => {
      const userNode = user.find(n => n.tag === expectedNode.tag)
      if (!userNode) return false

      // Check parent relationship
      if (expectedNode.parent) {
        const expectedParentTag = expected.find(n => n.id === expectedNode.parent)?.tag
        const userParent = user.find(n => n.id === userNode.parent)
        if (!userParent || userParent.tag !== expectedParentTag) return false
      }

      return true
    })

    setValidated(isValid)
    return isValid
  }, [exercise.expectedDom, userNodes])

  // Add a new node
  const addNode = (tag: string) => {
    if (!selectedParent) return

    const newNode: DomNode = {
      id: generateId(),
      tag,
      parent: selectedParent,
    }

    setUserNodes(prev => [...prev, newNode])
    setValidated(null)
  }

  // Remove a node and all its children
  const removeNode = (id: string) => {
    const removeIds = new Set<string>()

    const collectChildren = (nodeId: string) => {
      removeIds.add(nodeId)
      userNodes.filter(n => n.parent === nodeId).forEach(n => collectChildren(n.id))
    }

    collectChildren(id)
    setUserNodes(prev => prev.filter(n => !removeIds.has(n.id)))
    setValidated(null)
  }

  // Reset to initial state
  const reset = () => {
    setUserNodes([{ id: 'body', tag: 'body', parent: null }])
    setSelectedParent('body')
    setCurrentHint(0)
    setShowSolution(false)
    setStepMode(false)
    setCurrentLine(null)
    setValidated(null)
  }

  // Step through code
  const stepForward = () => {
    const lines = exercise.jsCode.split('\n').length
    if (currentLine === null) {
      setCurrentLine(0)
    } else if (currentLine < lines - 1) {
      setCurrentLine(currentLine + 1)
    }
  }

  const stepBack = () => {
    if (currentLine !== null && currentLine > 0) {
      setCurrentLine(currentLine - 1)
    } else {
      setCurrentLine(null)
    }
  }

  // Get selectable parent nodes
  const selectableNodes = useMemo(() => {
    return userNodes.map(n => ({
      id: n.id,
      label: `<${n.tag}>${n.id === 'body' ? '' : ` (${n.id.slice(0, 4)})`}`,
    }))
  }, [userNodes])

  return (
    <Card className={`p-6 ${className ?? ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              DOM Tree Builder
            </h3>
            <p className="text-sm text-slate-400">
              {exercise.title}: {exercise.description}
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={currentExercise}
              onChange={(e) => {
                setCurrentExercise(Number(e.target.value))
                reset()
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-sm"
            >
              {EXERCISES.map((ex, i) => (
                <option key={ex.id} value={i}>{ex.title}</option>
              ))}
            </select>
            <Button variant="ghost" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: JavaScript Code */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-300">JavaScript Code</h4>
              <div className="flex gap-2">
                <Button
                  variant={stepMode ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setStepMode(!stepMode)
                    setCurrentLine(null)
                  }}
                >
                  Step Mode
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-700 overflow-hidden">
              <CodeHighlight code={exercise.jsCode} highlightLine={stepMode ? currentLine : null} />
            </div>

            {/* Step controls */}
            <AnimatePresence>
              {stepMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2"
                >
                  <Button variant="secondary" size="sm" onClick={stepBack} disabled={currentLine === null}>
                    ← Zurück
                  </Button>
                  <Button variant="secondary" size="sm" onClick={stepForward}>
                    Weiter →
                  </Button>
                  <span className="text-sm text-slate-400 self-center ml-2">
                    Zeile {currentLine !== null ? currentLine + 1 : '-'} / {exercise.jsCode.split('\n').length}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hints */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentHint(prev => Math.min(prev + 1, exercise.hints.length))}
                disabled={currentHint >= exercise.hints.length}
              >
                💡 Hinweis ({currentHint}/{exercise.hints.length})
              </Button>
              <AnimatePresence>
                {currentHint > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {exercise.hints.slice(0, currentHint).map((hint, i) => (
                      <div key={i} className="text-sm text-amber-300 bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-800/50">
                        {hint}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: DOM Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-300">DOM Tree</h4>
              <Button
                variant={showSolution ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
              >
                {showSolution ? 'Lösung ausblenden' : 'Lösung zeigen'}
              </Button>
            </div>

            {/* Node Toolbox */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Elemente hinzufügen:</div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => addNode(tag)}
                    disabled={!selectedParent}
                    className={`
                      px-2 py-1 rounded text-xs font-mono transition-colors
                      ${selectedParent
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                    `}
                    style={{ borderLeft: `3px solid ${TAG_COLORS[tag] || '#64748b'}` }}
                  >
                    &lt;{tag}&gt;
                  </button>
                ))}
              </div>
            </div>

            {/* Parent Selector */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Parent-Element wählen:</div>
              <div className="flex flex-wrap gap-2">
                {selectableNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedParent(node.id)}
                    className={`
                      px-2 py-1 rounded text-xs font-mono transition-all
                      ${selectedParent === node.id
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
                    `}
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            </div>

            {/* User's DOM Tree */}
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 min-h-[200px]">
              <div className="text-xs text-slate-500 mb-3">Dein DOM:</div>
              <AnimatePresence mode="popLayout">
                {userNodes.filter(n => n.parent === null).map(rootNode => (
                  <TreeNodeDisplay
                    key={rootNode.id}
                    node={rootNode}
                    allNodes={userNodes}
                    depth={0}
                    onRemove={removeNode}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Solution (animated reveal) */}
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/50">
                    <div className="text-xs text-emerald-400 mb-3">Erwartetes DOM:</div>
                    {exercise.expectedDom.filter(n => n.parent === null).map(rootNode => (
                      <TreeNodeDisplay
                        key={rootNode.id}
                        node={rootNode}
                        allNodes={exercise.expectedDom}
                        depth={0}
                        onRemove={() => {}}
                        isExpected
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Validate Button */}
            <div className="flex items-center gap-4">
              <Button variant="primary" onClick={validate}>
                Überprüfen
              </Button>
              <AnimatePresence>
                {validated !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg
                      ${validated
                        ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                        : 'bg-red-900/30 text-red-400 border border-red-700/50'}
                    `}
                  >
                    {validated ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Korrekt!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Nicht ganz richtig
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
          <strong className="text-slate-400">Tipp:</strong> Wähle zuerst ein Parent-Element, dann klicke auf ein Tag um es als Kind hinzuzufügen.
          Nutze den Step Mode um den Code Zeile für Zeile durchzugehen.
        </div>
      </div>
    </Card>
  )
}
