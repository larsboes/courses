// src/content/web-technologies/diagrams/JsonPathExplorer.tsx
import { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, ChallengeBanner, ChallengeResult } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import { useChallengeMode } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

interface TreeNode {
  key: string
  value: JsonValue
  path: string
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'
  depth: number
  children?: TreeNode[]
}

interface JsonChallenge {
  id: string
  title: string
  description: string
  targetPath: string
  targetValue: string
}

// ─────────────────────────────────────────────────
// Sample Data
// ─────────────────────────────────────────────────

const SAMPLE_JSON: Record<string, { title: string; data: JsonValue }> = {
  playlist: {
    title: 'Playlist API Response',
    data: {
      id: 42,
      name: 'My Favorites',
      owner: {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
      },
      tracks: [
        { id: 101, title: 'Song One', duration: 180 },
        { id: 102, title: 'Song Two', duration: 240 },
        { id: 103, title: 'Song Three', duration: 200 },
      ],
      metadata: {
        created: '2024-01-15',
        modified: '2024-02-20',
        isPublic: true,
        tags: ['rock', 'classic', 'favorites'],
      },
    },
  },
  user: {
    title: 'User Profile',
    data: {
      user: {
        id: 123,
        profile: {
          name: 'Jane Smith',
          bio: 'Music lover',
          avatar: null,
        },
        settings: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
          },
        },
        playlists: [
          { id: 1, name: 'Workout' },
          { id: 2, name: 'Chill' },
        ],
      },
    },
  },
  api: {
    title: 'API Response',
    data: {
      status: 'success',
      data: {
        items: [
          { type: 'album', id: 1, title: 'Album A' },
          { type: 'album', id: 2, title: 'Album B' },
        ],
        pagination: {
          page: 1,
          totalPages: 5,
          hasNext: true,
        },
      },
      meta: {
        requestId: 'abc-123',
        timestamp: 1706886000,
      },
    },
  },
}

const SAMPLES = Object.entries(SAMPLE_JSON).map(([id, { title }]) => ({ id, label: title }))

const CHALLENGES: JsonChallenge[] = [
  {
    id: 'simple',
    title: 'Einfacher Pfad',
    description: 'Finde den Namen der Playlist',
    targetPath: 'name',
    targetValue: 'My Favorites',
  },
  {
    id: 'nested',
    title: 'Verschachtelt',
    description: 'Finde die E-Mail des Playlist-Owners',
    targetPath: 'owner.email',
    targetValue: 'john@example.com',
  },
  {
    id: 'array-index',
    title: 'Array-Index',
    description: 'Finde den Titel des zweiten Tracks',
    targetPath: 'tracks[1].title',
    targetValue: 'Song Two',
  },
  {
    id: 'deep',
    title: 'Tief verschachtelt',
    description: 'Finde das erste Tag der Playlist',
    targetPath: 'metadata.tags[0]',
    targetValue: 'rock',
  },
]

// ─────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────

function getValueType(value: JsonValue): TreeNode['type'] {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value as TreeNode['type']
}

function buildTree(value: JsonValue, key: string, path: string, depth: number): TreeNode {
  const type = getValueType(value)
  const node: TreeNode = { key, value, path, type, depth }

  if (type === 'object' && value !== null) {
    node.children = Object.entries(value as JsonObject).map(([k, v]) =>
      buildTree(v, k, path ? `${path}.${k}` : k, depth + 1)
    )
  } else if (type === 'array') {
    node.children = (value as JsonArray).map((v, i) =>
      buildTree(v, `[${i}]`, `${path}[${i}]`, depth + 1)
    )
  }

  return node
}

function getValueAtPath(data: JsonValue, path: string): JsonValue | undefined {
  if (!path) return data

  const parts = path.match(/([^.\[\]]+|\[\d+\])/g)
  if (!parts) return undefined

  let current: JsonValue = data
  for (const part of parts) {
    if (current === null || current === undefined) return undefined

    if (part.startsWith('[') && part.endsWith(']')) {
      const index = parseInt(part.slice(1, -1), 10)
      if (!Array.isArray(current)) return undefined
      current = current[index]
    } else {
      if (typeof current !== 'object' || Array.isArray(current)) return undefined
      current = (current as JsonObject)[part]
    }
  }

  return current
}

function formatValue(value: JsonValue): string {
  if (value === null) return 'null'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') {
    if (Array.isArray(value)) return `Array(${value.length})`
    return `Object(${Object.keys(value).length})`
  }
  return String(value)
}

// ─────────────────────────────────────────────────
// Tree Node Component
// ─────────────────────────────────────────────────

interface TreeNodeProps {
  node: TreeNode
  isExpanded: boolean
  onToggle: (path: string) => void
  onSelect: (path: string) => void
  highlightedPath: string | null
  selectedPath: string | null
}

function TreeNodeComponent({
  node,
  isExpanded,
  onToggle,
  onSelect,
  highlightedPath,
  selectedPath,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const isHighlighted = highlightedPath === node.path
  const isSelected = selectedPath === node.path
  const isInPath = highlightedPath?.startsWith(node.path + '.') ||
                   highlightedPath?.startsWith(node.path + '[')

  const typeColors: Record<string, string> = {
    object: 'text-purple-400',
    array: 'text-blue-400',
    string: 'text-green-400',
    number: 'text-amber-400',
    boolean: 'text-cyan-400',
    null: 'text-slate-500',
  }

  return (
    <div style={{ marginLeft: node.depth > 0 ? 16 : 0 }}>
      <motion.div
        className={`
          flex items-center gap-2 px-2 py-1 rounded cursor-pointer
          ${isHighlighted || isSelected
            ? 'bg-blue-500/30 ring-1 ring-blue-500'
            : isInPath
              ? 'bg-blue-500/10'
              : 'hover:bg-slate-700/50'}
        `}
        onClick={() => onSelect(node.path)}
        animate={{
          backgroundColor: isHighlighted || isSelected
            ? 'rgba(59, 130, 246, 0.3)'
            : 'transparent',
        }}
      >
        {/* Expand/collapse button */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle(node.path)
            }}
            className="w-4 h-4 flex items-center justify-center text-slate-500 hover:text-slate-300"
          >
            <motion.svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 90 : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Key */}
        <span className="font-mono text-sm">
          {node.key.startsWith('[') ? (
            <span className="text-slate-500">{node.key}</span>
          ) : (
            <span className="text-cyan-400">"{node.key}"</span>
          )}
          <span className="text-slate-500">: </span>
        </span>

        {/* Value preview */}
        <span className={`font-mono text-sm ${typeColors[node.type]}`}>
          {hasChildren ? (
            <>
              {node.type === 'array' ? '[' : '{'}
              {!isExpanded && (
                <span className="text-slate-500">
                  {' '}...{node.children?.length} items{' '}
                </span>
              )}
              {!isExpanded && (node.type === 'array' ? ']' : '}')}
            </>
          ) : (
            formatValue(node.value)
          )}
        </span>

        {/* Type badge */}
        <span className="ml-auto text-[10px] text-slate-600 uppercase">
          {node.type}
        </span>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {node.children?.map((child, i) => (
              <TreeNodeComponent
                key={child.path || i}
                node={child}
                isExpanded={true}
                onToggle={onToggle}
                onSelect={onSelect}
                highlightedPath={highlightedPath}
                selectedPath={selectedPath}
              />
            ))}
            <div className={`ml-4 font-mono text-sm ${typeColors[node.type]}`}>
              {node.type === 'array' ? ']' : '}'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function JsonPathExplorer({ className }: DiagramProps) {
  const [currentSample, setCurrentSample] = useState<keyof typeof SAMPLE_JSON>('playlist')
  const [pathInput, setPathInput] = useState('')
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['', 'owner', 'tracks', 'metadata']))
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const sample = SAMPLE_JSON[currentSample]

  // Use ref to access current pathInput in challenge check
  const pathInputRef = useRef(pathInput)
  pathInputRef.current = pathInput

  // Challenge mode
  const challenge = useChallengeMode({
    challenges: CHALLENGES,
    onCheck: (ch) => {
      const value = getValueAtPath(sample.data, pathInputRef.current)
      return value !== undefined &&
             String(value) === ch.targetValue &&
             pathInputRef.current === ch.targetPath
    },
    onReset: () => {
      setPathInput('')
      setSelectedPath(null)
      setExpandedPaths(new Set(['', 'owner', 'tracks', 'metadata']))
    },
  })

  // Build tree structure
  const tree = useMemo(() => {
    return buildTree(sample.data, 'root', '', 0)
  }, [sample.data])

  // Get value at current path
  const valueAtPath = useMemo(() => {
    if (!pathInput.trim()) return undefined
    return getValueAtPath(sample.data, pathInput)
  }, [pathInput, sample.data])

  // Path suggestions based on current input
  const suggestions = useMemo(() => {
    const allPaths: string[] = []

    function collectPaths(node: TreeNode) {
      if (node.path) allPaths.push(node.path)
      node.children?.forEach(collectPaths)
    }

    if (tree.children) {
      tree.children.forEach(collectPaths)
    }

    if (!pathInput) return allPaths.slice(0, 8)

    return allPaths
      .filter(p => p.toLowerCase().startsWith(pathInput.toLowerCase()))
      .slice(0, 6)
  }, [pathInput, tree])

  // Toggle expand/collapse
  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }, [])

  // Handle node selection
  const handleSelect = useCallback((path: string) => {
    setSelectedPath(path)
    setPathInput(path)
    // Expand all parent paths
    const parts = path.match(/([^.\[\]]+|\[\d+\])/g)
    if (parts) {
      const newExpanded = new Set(expandedPaths)
      let current = ''
      for (const part of parts) {
        if (part.startsWith('[')) {
          current += part
        } else {
          current = current ? `${current}.${part}` : part
        }
        newExpanded.add(current)
      }
      setExpandedPaths(newExpanded)
    }
  }, [expandedPaths])

  // Expand all
  const expandAll = () => {
    const allPaths: string[] = ['']
    function collectPaths(node: TreeNode) {
      if (node.path !== undefined) allPaths.push(node.path)
      node.children?.forEach(collectPaths)
    }
    tree.children?.forEach(collectPaths)
    setExpandedPaths(new Set(allPaths))
  }

  // Collapse all
  const collapseAll = () => {
    setExpandedPaths(new Set(['']))
  }

  return (
    <DiagramShell
      title="JSON Path Explorer"
      subtitle={sample.title}
      className={className}
      samples={SAMPLES}
      currentSample={currentSample}
      onSampleChange={(id) => {
        setCurrentSample(id as keyof typeof SAMPLE_JSON)
        challenge.reset()
      }}
      actions={
        <Button
          variant={challenge.isActive ? 'primary' : 'ghost'}
          size="sm"
          onClick={challenge.toggle}
        >
          Challenge
        </Button>
      }
      footer={
        <div className="space-y-1">
          <p><strong className="text-slate-400">Pfad-Syntax:</strong></p>
          <p>
            <code className="bg-slate-700 px-1 rounded">key</code> - Objekt-Eigenschaft &nbsp;|&nbsp;
            <code className="bg-slate-700 px-1 rounded">key.subkey</code> - Verschachtelt &nbsp;|&nbsp;
            <code className="bg-slate-700 px-1 rounded">array[0]</code> - Array-Index
          </p>
        </div>
      }
    >
      {/* Challenge Banner */}
      <ChallengeBanner challenge={challenge} challenges={CHALLENGES} />

      {/* Path Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">JSON Path</label>
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={pathInput}
                onChange={(e) => {
                  setPathInput(e.target.value)
                  setSelectedPath(e.target.value)
                  challenge.clearResult()
                }}
                placeholder="z.B. owner.email oder tracks[0].title"
                className="
                  w-full px-4 py-2 rounded-lg border border-slate-600
                  bg-slate-900 text-slate-100 font-mono
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
              {/* Suggestions dropdown */}
              {pathInput && suggestions.length > 0 && (
                <div className="absolute z-10 top-full left-0 right-0 mt-1 py-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {suggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setPathInput(suggestion)
                        setSelectedPath(suggestion)
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm font-mono hover:bg-slate-700 text-slate-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {challenge.isActive && (
              <Button variant="primary" onClick={challenge.check}>
                Prüfen
              </Button>
            )}
          </div>
        </div>

        {/* Value result */}
        {pathInput && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-3 rounded-lg border font-mono text-sm
              ${valueAtPath !== undefined
                ? 'bg-green-900/20 border-green-700/50'
                : 'bg-red-900/20 border-red-700/50'}
            `}
          >
            {valueAtPath !== undefined ? (
              <div>
                <span className="text-slate-400">Wert: </span>
                <span className="text-green-400">
                  {typeof valueAtPath === 'object'
                    ? JSON.stringify(valueAtPath, null, 2)
                    : formatValue(valueAtPath)}
                </span>
              </div>
            ) : (
              <span className="text-red-400">Pfad nicht gefunden</span>
            )}
          </motion.div>
        )}

        {/* Challenge result */}
        <ChallengeResult
          challenge={challenge}
          hint={challenge.current.targetPath}
        />
      </div>

      {/* Tree View */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">JSON Struktur</label>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={expandAll}>
              Alle öffnen
            </Button>
            <Button variant="ghost" size="sm" onClick={collapseAll}>
              Alle schließen
            </Button>
          </div>
        </div>
        <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 max-h-[400px] overflow-auto">
          <div className="font-mono text-sm text-purple-400">{'{'}</div>
          {tree.children?.map((child, i) => (
            <TreeNodeComponent
              key={child.path || i}
              node={child}
              isExpanded={expandedPaths.has(child.path)}
              onToggle={toggleExpand}
              onSelect={handleSelect}
              highlightedPath={pathInput || null}
              selectedPath={selectedPath}
            />
          ))}
          <div className="font-mono text-sm text-purple-400">{'}'}</div>
        </div>
      </div>
    </DiagramShell>
  )
}
