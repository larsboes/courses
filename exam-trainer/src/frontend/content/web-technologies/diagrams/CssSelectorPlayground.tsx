// src/content/web-technologies/diagrams/CssSelectorPlayground.tsx
import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface DomNode {
  tag: string
  id?: string
  classes?: string[]
  textContent?: string
  children?: DomNode[]
}

interface FlattenedNode {
  node: DomNode
  path: number[]
  depth: number
  parent?: FlattenedNode
}

// ─────────────────────────────────────────────────
// Sample DOM Structure
// ─────────────────────────────────────────────────

const sampleDom: DomNode = {
  tag: 'div',
  classes: ['container'],
  children: [
    {
      tag: 'header',
      id: 'main-header',
      children: [
        { tag: 'h1', textContent: 'Title' },
        {
          tag: 'nav',
          classes: ['navigation'],
          children: [
            { tag: 'a', classes: ['link', 'active'], textContent: 'Home' },
            { tag: 'a', classes: ['link'], textContent: 'About' },
          ],
        },
      ],
    },
    {
      tag: 'main',
      children: [
        {
          tag: 'article',
          classes: ['post'],
          children: [
            { tag: 'h2', textContent: 'Post Title' },
            { tag: 'p', classes: ['intro'], textContent: 'Intro paragraph' },
            { tag: 'p', textContent: 'Regular paragraph' },
          ],
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────
// Example Selectors
// ─────────────────────────────────────────────────

const exampleSelectors = [
  { selector: '.link', label: '.link', description: 'Class' },
  { selector: '#main-header', label: '#main-header', description: 'ID' },
  { selector: 'nav a', label: 'nav a', description: 'Descendant' },
  { selector: '.link.active', label: '.link.active', description: 'Multiple classes' },
  { selector: 'article > p', label: 'article > p', description: 'Direct child' },
  { selector: 'p:first-child', label: 'p:first-child', description: 'Pseudo-class' },
]

// ─────────────────────────────────────────────────
// Selector Matching Logic
// ─────────────────────────────────────────────────

function flattenDom(node: DomNode, path: number[] = [], parent?: FlattenedNode): FlattenedNode[] {
  const current: FlattenedNode = { node, path, depth: path.length, parent }
  const result: FlattenedNode[] = [current]

  if (node.children) {
    node.children.forEach((child, index) => {
      result.push(...flattenDom(child, [...path, index], current))
    })
  }

  return result
}

// Parse a simple selector (tag, .class, #id, or combinations)
function parseSimpleSelector(selector: string): {
  tag?: string
  id?: string
  classes: string[]
  pseudoClass?: string
} {
  const result: { tag?: string; id?: string; classes: string[]; pseudoClass?: string } = {
    classes: [],
  }

  // Extract pseudo-class
  const pseudoMatch = selector.match(/:(\w+(?:-\w+)*)$/)
  if (pseudoMatch) {
    result.pseudoClass = pseudoMatch[1]
    selector = selector.replace(`:${pseudoMatch[1]}`, '')
  }

  // Extract ID
  const idMatch = selector.match(/#([\w-]+)/)
  if (idMatch) {
    result.id = idMatch[1]
    selector = selector.replace(`#${idMatch[1]}`, '')
  }

  // Extract classes
  const classMatches = selector.match(/\.([\w-]+)/g)
  if (classMatches) {
    result.classes = classMatches.map((c) => c.slice(1))
    classMatches.forEach((c) => {
      selector = selector.replace(c, '')
    })
  }

  // Remaining is tag
  const tag = selector.trim()
  if (tag) {
    result.tag = tag
  }

  return result
}

function matchesSimpleSelector(
  flatNode: FlattenedNode,
  parsed: ReturnType<typeof parseSimpleSelector>,
  allNodes: FlattenedNode[]
): boolean {
  const { node, parent } = flatNode

  // Check tag
  if (parsed.tag && node.tag !== parsed.tag) {
    return false
  }

  // Check ID
  if (parsed.id && node.id !== parsed.id) {
    return false
  }

  // Check classes
  for (const cls of parsed.classes) {
    if (!node.classes?.includes(cls)) {
      return false
    }
  }

  // Check pseudo-class
  if (parsed.pseudoClass) {
    if (parsed.pseudoClass === 'first-child') {
      if (!parent) return false
      const siblings = allNodes.filter(
        (n) => n.parent === parent && n.depth === flatNode.depth
      )
      if (siblings[0] !== flatNode) return false
    } else if (parsed.pseudoClass === 'last-child') {
      if (!parent) return false
      const siblings = allNodes.filter(
        (n) => n.parent === parent && n.depth === flatNode.depth
      )
      if (siblings[siblings.length - 1] !== flatNode) return false
    }
    // Add more pseudo-classes as needed
  }

  return true
}

function matchSelector(selector: string, allNodes: FlattenedNode[]): Set<FlattenedNode> {
  const matches = new Set<FlattenedNode>()

  if (!selector.trim()) {
    return matches
  }

  // Split by combinator (space for descendant, > for direct child)
  // Simplified: handle single > or space combinator
  const parts: { selector: string; combinator: '' | '>' | ' ' }[] = []

  // Tokenize the selector
  const tokens = selector.match(/[^\s>]+|>|\s+/g) || []
  let currentSelector = ''
  let pendingCombinator: '' | '>' | ' ' = ''

  for (const token of tokens) {
    if (token === '>') {
      if (currentSelector) {
        parts.push({ selector: currentSelector, combinator: pendingCombinator })
        currentSelector = ''
      }
      pendingCombinator = '>'
    } else if (token.match(/^\s+$/)) {
      if (currentSelector) {
        parts.push({ selector: currentSelector, combinator: pendingCombinator })
        currentSelector = ''
        pendingCombinator = ' '
      } else if (pendingCombinator !== '>') {
        pendingCombinator = ' '
      }
    } else {
      currentSelector += token
    }
  }

  if (currentSelector) {
    parts.push({ selector: currentSelector, combinator: pendingCombinator })
  }

  if (parts.length === 0) {
    return matches
  }

  // Start with nodes matching first selector
  const firstParsed = parseSimpleSelector(parts[0].selector)
  let candidates = allNodes.filter((n) => matchesSimpleSelector(n, firstParsed, allNodes))

  // Apply subsequent parts with combinators
  for (let i = 1; i < parts.length; i++) {
    const { selector: sel, combinator } = parts[i]
    const parsed = parseSimpleSelector(sel)
    const nextCandidates: FlattenedNode[] = []

    for (const candidate of candidates) {
      if (combinator === '>') {
        // Direct child: find children of candidate that match
        const children = allNodes.filter(
          (n) => n.parent === candidate && matchesSimpleSelector(n, parsed, allNodes)
        )
        nextCandidates.push(...children)
      } else {
        // Descendant: find all descendants of candidate that match
        const descendants = allNodes.filter((n) => {
          if (!matchesSimpleSelector(n, parsed, allNodes)) return false
          // Check if candidate is an ancestor
          let current = n.parent
          while (current) {
            if (current === candidate) return true
            current = current.parent
          }
          return false
        })
        nextCandidates.push(...descendants)
      }
    }

    candidates = nextCandidates
  }

  candidates.forEach((c) => matches.add(c))
  return matches
}

// ─────────────────────────────────────────────────
// DOM Tree Visualization Component
// ─────────────────────────────────────────────────

interface DomNodeViewProps {
  flatNode: FlattenedNode
  isMatched: boolean
}

function DomNodeView({ flatNode, isMatched }: DomNodeViewProps) {
  const { node, depth } = flatNode
  const hasChildren = node.children && node.children.length > 0

  return (
    <motion.div
      className="relative"
      animate={{
        backgroundColor: isMatched ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Tree lines */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 border-l-2 border-slate-600"
          style={{ marginLeft: `${(depth - 1) * 24 + 11}px` }}
        />
      )}
      {depth > 0 && (
        <div
          className="absolute border-t-2 border-slate-600"
          style={{
            left: `${(depth - 1) * 24 + 11}px`,
            top: '14px',
            width: '12px',
          }}
        />
      )}

      {/* Node content */}
      <div
        className="flex items-center py-1 font-mono text-sm"
        style={{ paddingLeft: `${depth * 24}px` }}
      >
        <motion.div
          className={`
            px-2 py-0.5 rounded border-2 transition-colors
            ${isMatched
              ? 'bg-green-500/20 border-green-500 text-green-300'
              : 'bg-slate-800 border-slate-600 text-slate-300'
            }
          `}
          animate={{
            scale: isMatched ? [1, 1.05, 1] : 1,
            boxShadow: isMatched
              ? '0 0 12px rgba(34, 197, 94, 0.4)'
              : '0 0 0px rgba(34, 197, 94, 0)',
          }}
          transition={{ duration: 0.3 }}
        >
          <span className={isMatched ? 'text-green-400' : 'text-blue-400'}>
            {'<'}
          </span>
          <span className={isMatched ? 'text-green-300' : 'text-amber-300'}>
            {node.tag}
          </span>
          {node.id && (
            <>
              <span className="text-slate-400"> id=</span>
              <span className={isMatched ? 'text-green-300' : 'text-red-400'}>
                "{node.id}"
              </span>
            </>
          )}
          {node.classes && node.classes.length > 0 && (
            <>
              <span className="text-slate-400"> class=</span>
              <span className={isMatched ? 'text-green-300' : 'text-purple-400'}>
                "{node.classes.join(' ')}"
              </span>
            </>
          )}
          <span className={isMatched ? 'text-green-400' : 'text-blue-400'}>
            {'>'}
          </span>
          {node.textContent && (
            <span className="text-slate-400 ml-1">{node.textContent}</span>
          )}
          {!hasChildren && (
            <span className={isMatched ? 'text-green-400' : 'text-blue-400'}>
              {'</'}
              <span className={isMatched ? 'text-green-300' : 'text-amber-300'}>
                {node.tag}
              </span>
              {'>'}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function CssSelectorPlayground({ className }: DiagramProps) {
  const [selector, setSelector] = useState('')

  // Flatten DOM for easier manipulation
  const flattenedNodes = useMemo(() => flattenDom(sampleDom), [])

  // Find matching nodes
  const matchedNodes = useMemo(() => {
    try {
      return matchSelector(selector, flattenedNodes)
    } catch {
      return new Set<FlattenedNode>()
    }
  }, [selector, flattenedNodes])

  const handleSelectorClick = useCallback((sel: string) => {
    setSelector(sel)
  }, [])

  return (
    <Card className={`p-6 ${className ?? ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">
            CSS Selector Playground
          </h3>
          <AnimatePresence mode="wait">
            <motion.div
              key={matchedNodes.size}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                matchedNodes.size > 0
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-700/50 text-slate-400 border border-slate-600'
              }`}
            >
              {matchedNodes.size} {matchedNodes.size === 1 ? 'element' : 'elements'} match
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selector Input */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Enter CSS Selector:</label>
          <input
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            placeholder="e.g., .link, #main-header, nav a"
            className="w-full px-4 py-2 bg-slate-900 border-2 border-slate-600 rounded-lg
                       text-slate-100 font-mono text-sm placeholder:text-slate-500
                       focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Example Selectors */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Try these examples:</label>
          <div className="flex flex-wrap gap-2">
            {exampleSelectors.map(({ selector: sel, label, description }) => (
              <Button
                key={sel}
                variant={selector === sel ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleSelectorClick(sel)}
                className="font-mono"
              >
                <span>{label}</span>
                <span className="ml-2 text-xs opacity-60">({description})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* DOM Tree Visualization */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">DOM Structure:</label>
          <div className="bg-slate-900 rounded-lg border-2 border-slate-700 p-4 overflow-x-auto">
            <div className="min-w-fit">
              {flattenedNodes.map((flatNode) => (
                <DomNodeView
                  key={flatNode.path.join('-') || 'root'}
                  flatNode={flatNode}
                  isMatched={matchedNodes.has(flatNode)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="text-sm text-slate-400">
            <span className="text-slate-300 font-medium">Supported selectors:</span>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><code className="bg-slate-700 px-1 rounded">tag</code> - Element type (div, p, a)</li>
              <li><code className="bg-slate-700 px-1 rounded">.class</code> - Class selector</li>
              <li><code className="bg-slate-700 px-1 rounded">#id</code> - ID selector</li>
              <li><code className="bg-slate-700 px-1 rounded">parent child</code> - Descendant combinator</li>
              <li><code className="bg-slate-700 px-1 rounded">{'parent > child'}</code> - Direct child combinator</li>
              <li><code className="bg-slate-700 px-1 rounded">.class1.class2</code> - Multiple classes</li>
              <li><code className="bg-slate-700 px-1 rounded">:first-child</code>, <code className="bg-slate-700 px-1 rounded">:last-child</code> - Pseudo-classes</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}
