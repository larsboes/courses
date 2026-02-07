// src/content/web-technologies/diagrams/K8sManifestDiagramBuilder.tsx
import { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

type K8sComponentType =
  | 'Deployment' | 'ReplicaSet' | 'Pod'
  | 'Service' | 'ConfigMap'

interface ExpectedComponent {
  id: string
  type: K8sComponentType
  fields: Record<string, string | number>
}

interface ExpectedConnection {
  fromId: string
  toId: string
  label?: string
}

interface K8sBuilderExercise {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  manifest: string
  expectedComponents: ExpectedComponent[]
  expectedConnections: ExpectedConnection[]
  hints: string[]
}

interface PlacedComponent {
  id: string
  type: K8sComponentType
  x: number
  y: number
  fields: Record<string, string | number>
}

interface DrawnConnection {
  id: string
  fromId: string
  toId: string
}

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────

const COMPONENT_COLORS: Record<K8sComponentType, string> = {
  Deployment: '#3b82f6',
  ReplicaSet: '#8b5cf6',
  Pod: '#10b981',
  Service: '#ec4899',
  ConfigMap: '#f59e0b',
}

const COMPONENT_ICONS: Record<K8sComponentType, string> = {
  Deployment: 'D',
  ReplicaSet: 'RS',
  Pod: 'P',
  Service: 'S',
  ConfigMap: 'CM',
}

const TOOLBOX_TYPES: K8sComponentType[] = [
  'Deployment', 'ReplicaSet', 'Pod', 'Service', 'ConfigMap',
]

/** Approximate rendered dimensions of a ComponentBlock (used for center calculations). */
const BLOCK_WIDTH = 100
const BLOCK_HEIGHT = 40

const COMPONENT_FIELDS: Record<K8sComponentType, { key: string; label: string; type: 'text' | 'number' | 'select' | 'kv' }[]> = {
  Deployment: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'replicas', label: 'Replicas', type: 'number' },
    { key: 'labels', label: 'Labels', type: 'kv' },
  ],
  ReplicaSet: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'replicas', label: 'Replicas', type: 'number' },
  ],
  Pod: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'image', label: 'Image', type: 'text' },
    { key: 'containerPort', label: 'Container Port', type: 'number' },
  ],
  Service: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'serviceType', label: 'Typ', type: 'select' },
    { key: 'port', label: 'Port', type: 'number' },
    { key: 'targetPort', label: 'Target Port', type: 'number' },
    { key: 'selector', label: 'Selector', type: 'kv' },
  ],
  ConfigMap: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'dataKeys', label: 'Data Keys (kommagetrennt)', type: 'text' },
  ],
}

/** Keywords to highlight in YAML when hovering over a component type on the canvas. */
const YAML_HIGHLIGHT_KEYWORDS: Record<K8sComponentType, string[]> = {
  Deployment: ['kind: Deployment', 'replicas:', 'selector:', 'matchLabels:'],
  Service: ['kind: Service', 'type:', 'selector:', 'port:', 'targetPort:'],
  Pod: ['template:', 'containers:', 'image:', 'containerPort:'],
  ReplicaSet: ['replicas:', 'selector:'],
  ConfigMap: ['kind: ConfigMap', 'data:'],
}

// ─────────────────────────────────────────────────
// Exercise Data
// ─────────────────────────────────────────────────

const EXERCISES: K8sBuilderExercise[] = [
  {
    id: 'simple-deployment',
    title: 'Einfaches Deployment',
    difficulty: 'easy',
    manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80`,
    expectedComponents: [
      { id: 'deploy-web', type: 'Deployment', fields: { name: 'web-app', replicas: 3 } },
      { id: 'rs-web', type: 'ReplicaSet', fields: { name: 'web-app', replicas: 3 } },
      { id: 'pod-1', type: 'Pod', fields: { image: 'nginx:1.24', containerPort: 80 } },
      { id: 'pod-2', type: 'Pod', fields: { image: 'nginx:1.24', containerPort: 80 } },
      { id: 'pod-3', type: 'Pod', fields: { image: 'nginx:1.24', containerPort: 80 } },
    ],
    expectedConnections: [
      { fromId: 'deploy-web', toId: 'rs-web', label: 'verwaltet' },
      { fromId: 'rs-web', toId: 'pod-1' },
      { fromId: 'rs-web', toId: 'pod-2' },
      { fromId: 'rs-web', toId: 'pod-3' },
    ],
    hints: [
      'Ein Deployment erstellt automatisch ein ReplicaSet.',
      'Das ReplicaSet sorgt für die gewünschte Anzahl an Pods (replicas: 3).',
      'Jeder Pod enthält den Container nginx:1.24 mit Port 80.',
    ],
  },
  {
    id: 'deployment-service',
    title: 'Deployment mit Service',
    difficulty: 'medium',
    manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: node
        image: node:18
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
  - port: 8080
    targetPort: 3000`,
    expectedComponents: [
      { id: 'deploy-api', type: 'Deployment', fields: { name: 'api-server', replicas: 2 } },
      { id: 'rs-api', type: 'ReplicaSet', fields: { name: 'api-server', replicas: 2 } },
      { id: 'pod-1', type: 'Pod', fields: { image: 'node:18', containerPort: 3000 } },
      { id: 'pod-2', type: 'Pod', fields: { image: 'node:18', containerPort: 3000 } },
      { id: 'svc-api', type: 'Service', fields: { name: 'api-service', serviceType: 'ClusterIP', port: 8080, targetPort: 3000 } },
    ],
    expectedConnections: [
      { fromId: 'deploy-api', toId: 'rs-api', label: 'verwaltet' },
      { fromId: 'rs-api', toId: 'pod-1' },
      { fromId: 'rs-api', toId: 'pod-2' },
      { fromId: 'svc-api', toId: 'pod-1', label: 'selector: app=api' },
      { fromId: 'svc-api', toId: 'pod-2', label: 'selector: app=api' },
    ],
    hints: [
      'Es gibt zwei Ressourcen: ein Deployment und einen Service.',
      'Das Deployment erstellt ein ReplicaSet mit 2 Pods.',
      'Der Service vom Typ ClusterIP leitet Traffic an Pods mit dem Label app=api.',
      'Port-Mapping: Service port 8080 -> Pod targetPort 3000.',
    ],
  },
  {
    id: 'microservice-architecture',
    title: 'Microservice-Architektur',
    difficulty: 'hard',
    manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: node
        image: node:18
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: backend-config
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - port: 3000
    targetPort: 3000
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
data:
  DATABASE_URL: "postgres://db:5432/app"
  API_KEY: "secret-key-123"`,
    expectedComponents: [
      { id: 'deploy-fe', type: 'Deployment', fields: { name: 'frontend', replicas: 2 } },
      { id: 'rs-fe', type: 'ReplicaSet', fields: { replicas: 2 } },
      { id: 'pod-fe-1', type: 'Pod', fields: { image: 'nginx:1.24', containerPort: 80 } },
      { id: 'pod-fe-2', type: 'Pod', fields: { image: 'nginx:1.24', containerPort: 80 } },
      { id: 'deploy-be', type: 'Deployment', fields: { name: 'backend', replicas: 2 } },
      { id: 'rs-be', type: 'ReplicaSet', fields: { replicas: 2 } },
      { id: 'pod-be-1', type: 'Pod', fields: { image: 'node:18', containerPort: 3000 } },
      { id: 'pod-be-2', type: 'Pod', fields: { image: 'node:18', containerPort: 3000 } },
      { id: 'svc-fe', type: 'Service', fields: { name: 'frontend-service', serviceType: 'NodePort', port: 80, targetPort: 80 } },
      { id: 'svc-be', type: 'Service', fields: { name: 'backend-service', serviceType: 'ClusterIP', port: 3000, targetPort: 3000 } },
      { id: 'cm-be', type: 'ConfigMap', fields: { name: 'backend-config', dataKeys: 'DATABASE_URL,API_KEY' } },
    ],
    expectedConnections: [
      { fromId: 'deploy-fe', toId: 'rs-fe' },
      { fromId: 'rs-fe', toId: 'pod-fe-1' },
      { fromId: 'rs-fe', toId: 'pod-fe-2' },
      { fromId: 'deploy-be', toId: 'rs-be' },
      { fromId: 'rs-be', toId: 'pod-be-1' },
      { fromId: 'rs-be', toId: 'pod-be-2' },
      { fromId: 'svc-fe', toId: 'pod-fe-1', label: 'selector: app=frontend' },
      { fromId: 'svc-fe', toId: 'pod-fe-2', label: 'selector: app=frontend' },
      { fromId: 'svc-be', toId: 'pod-be-1', label: 'selector: app=backend' },
      { fromId: 'svc-be', toId: 'pod-be-2', label: 'selector: app=backend' },
      { fromId: 'cm-be', toId: 'pod-be-1', label: 'envFrom' },
      { fromId: 'cm-be', toId: 'pod-be-2', label: 'envFrom' },
    ],
    hints: [
      'Es gibt 5 Ressourcen: 2 Deployments, 2 Services und 1 ConfigMap.',
      'Jedes Deployment erzeugt ein ReplicaSet mit jeweils 2 Pods.',
      'Der Frontend-Service ist vom Typ NodePort (Port 30080 extern).',
      'Der Backend-Service ist vom Typ ClusterIP (nur intern erreichbar).',
      'Die ConfigMap backend-config wird per envFrom in die Backend-Pods eingebunden.',
    ],
  },
]

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwer',
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-amber-400',
  hard: 'text-red-400',
}

// ─────────────────────────────────────────────────
// YAML Syntax Highlighter
// ─────────────────────────────────────────────────

function YamlPanel({ yaml, highlightType }: { yaml: string; highlightType: K8sComponentType | null }) {
  const lines = yaml.split('\n')

  // Determine which line indices should be highlighted
  const highlightedLines = useMemo(() => {
    if (!highlightType) return new Set<number>()
    const keywords = YAML_HIGHLIGHT_KEYWORDS[highlightType] ?? []
    const set = new Set<number>()
    lines.forEach((line, idx) => {
      const trimmed = line.trim()
      for (const kw of keywords) {
        if (trimmed.includes(kw)) {
          set.add(idx)
          break
        }
      }
    })
    return set
  }, [highlightType, lines])

  const highlightColor = highlightType ? COMPONENT_COLORS[highlightType] : null

  return (
    <div className="rounded-lg bg-slate-900 border border-slate-700 overflow-auto max-h-[600px]">
      <div className="p-4 font-mono text-sm">
        {lines.map((line, index) => {
          const trimmed = line.trim()
          const isHighlighted = highlightedLines.has(index)

          // Separator line
          if (trimmed === '---') {
            return (
              <div key={index} className="flex py-0.5 px-2 -mx-2">
                <span className="text-slate-500 select-none w-6 text-right mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-slate-500">{trimmed}</span>
              </div>
            )
          }

          // Comments
          if (trimmed.startsWith('#')) {
            return (
              <div key={index} className="flex py-0.5 px-2 -mx-2">
                <span className="text-slate-500 select-none w-6 text-right mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-slate-500">{line}</span>
              </div>
            )
          }

          // Key-value pairs
          const colonIndex = trimmed.indexOf(':')
          const isDash = trimmed.startsWith('- ')

          let keyPart = ''
          let valuePart = ''
          let hasColon = false

          if (isDash) {
            const afterDash = trimmed.substring(2)
            const dashColonIdx = afterDash.indexOf(':')
            if (dashColonIdx !== -1) {
              keyPart = afterDash.substring(0, dashColonIdx)
              valuePart = afterDash.substring(dashColonIdx + 1).trim()
              hasColon = true
            } else {
              valuePart = afterDash
            }
          } else if (colonIndex !== -1) {
            keyPart = trimmed.substring(0, colonIndex)
            valuePart = trimmed.substring(colonIndex + 1).trim()
            hasColon = true
          }

          const indent = line.search(/\S|$/)

          return (
            <div
              key={index}
              className={`flex py-0.5 px-2 -mx-2 rounded transition-colors duration-150 ${
                isHighlighted ? 'border-l-2' : 'hover:bg-slate-800/50'
              }`}
              style={isHighlighted ? {
                backgroundColor: (highlightColor ?? '#3b82f6') + '20',
                borderLeftColor: highlightColor ?? '#3b82f6',
              } : undefined}
            >
              <span className="text-slate-500 select-none w-6 text-right mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span className="flex-1">
                <span style={{ marginLeft: indent * 0.5 + 'ch' }} />
                {isDash && <span className="text-slate-400">- </span>}
                {keyPart && (
                  <span className="text-cyan-400">{keyPart}</span>
                )}
                {hasColon && <span className="text-slate-500">: </span>}
                {valuePart && (
                  <span className="text-amber-300">{valuePart}</span>
                )}
                {!keyPart && !isDash && !hasColon && (
                  <span className="text-slate-400">{trimmed}</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Key-Value Pair Editor
// ─────────────────────────────────────────────────

function KvEditor({
  value,
  onChange,
}: {
  value: Record<string, string | number>
  onChange: (kv: Record<string, string | number>) => void
}) {
  const [newKey, setNewKey] = useState('')
  const [newVal, setNewVal] = useState('')

  const entries = Object.entries(value)

  const addPair = () => {
    if (!newKey.trim()) return
    onChange({ ...value, [newKey.trim()]: newVal.trim() })
    setNewKey('')
    setNewVal('')
  }

  const removePair = (key: string) => {
    const next = { ...value }
    delete next[key]
    onChange(next)
  }

  return (
    <div className="space-y-1">
      {entries.map(([k, v]) => (
        <div key={k} className="flex items-center gap-1 text-xs">
          <span className="bg-slate-700 px-1.5 py-0.5 rounded font-mono">{k}</span>
          <span className="text-slate-500">=</span>
          <span className="bg-slate-700 px-1.5 py-0.5 rounded font-mono">{String(v)}</span>
          <button
            onClick={() => removePair(k)}
            className="ml-1 text-slate-500 hover:text-red-400"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Key"
          className="w-20 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-xs"
          onKeyDown={(e) => e.key === 'Enter' && addPair()}
        />
        <input
          type="text"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          placeholder="Value"
          className="w-20 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-xs"
          onKeyDown={(e) => e.key === 'Enter' && addPair()}
        />
        <button
          onClick={addPair}
          className="px-1.5 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-xs text-slate-300"
        >
          +
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Properties Panel
// ─────────────────────────────────────────────────

function PropertiesPanel({
  component,
  onUpdate,
  onClose,
}: {
  component: PlacedComponent
  onUpdate: (fields: Record<string, string | number>) => void
  onClose: () => void
}) {
  const fieldDefs = COMPONENT_FIELDS[component.type] || []
  const color = COMPONENT_COLORS[component.type]

  const updateField = (key: string, value: string | number) => {
    onUpdate({ ...component.fields, [key]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 rounded-lg border bg-slate-800/90 backdrop-blur-sm"
      style={{ borderColor: color + '60' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {COMPONENT_ICONS[component.type]}
          </span>
          <span className="text-sm font-medium text-slate-200">
            {component.type} Eigenschaften
          </span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fieldDefs.map((field) => {
          if (field.type === 'kv') {
            // Build KV record from fields that look like they belong to this key
            const kvValue: Record<string, string | number> = {}
            const prefix = field.key + '.'
            Object.entries(component.fields).forEach(([k, v]) => {
              if (k.startsWith(prefix)) {
                kvValue[k.substring(prefix.length)] = v
              }
            })
            return (
              <div key={field.key} className="col-span-2">
                <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
                <KvEditor
                  value={kvValue}
                  onChange={(kv) => {
                    const next = { ...component.fields }
                    // Remove old kv entries
                    Object.keys(next).forEach(k => {
                      if (k.startsWith(prefix)) delete next[k]
                    })
                    // Add new kv entries
                    Object.entries(kv).forEach(([k, v]) => {
                      next[prefix + k] = v
                    })
                    onUpdate(next)
                  }}
                />
              </div>
            )
          }

          if (field.type === 'select' && field.key === 'serviceType') {
            return (
              <div key={field.key}>
                <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
                <select
                  value={String(component.fields[field.key] || 'ClusterIP')}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-700 border border-slate-600 text-sm text-slate-200"
                >
                  <option value="ClusterIP">ClusterIP</option>
                  <option value="NodePort">NodePort</option>
                  <option value="LoadBalancer">LoadBalancer</option>
                </select>
              </div>
            )
          }

          return (
            <div key={field.key}>
              <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
              <input
                type={field.type === 'number' ? 'number' : 'text'}
                value={component.fields[field.key] ?? ''}
                onChange={(e) =>
                  updateField(
                    field.key,
                    field.type === 'number' ? Number(e.target.value) || 0 : e.target.value,
                  )
                }
                className="w-full px-2 py-1 rounded bg-slate-700 border border-slate-600 text-sm text-slate-200"
                placeholder={field.label}
              />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Canvas Component Block
// ─────────────────────────────────────────────────

function ComponentBlock({
  component,
  isSelected,
  isConnecting,
  isConnectionSource,
  validationStatus,
  onSelect,
  onDelete,
  onStartConnect,
  onCompleteConnect,
  onDrag,
  onHoverEnter,
  onHoverLeave,
  canvasRef,
  isSolutionFaded,
}: {
  component: PlacedComponent
  isSelected: boolean
  isConnecting: boolean
  isConnectionSource: boolean
  validationStatus?: 'correct' | 'extra' | null
  onSelect: () => void
  onDelete: () => void
  onStartConnect: () => void
  onCompleteConnect: () => void
  onDrag: (x: number, y: number) => void
  onHoverEnter?: () => void
  onHoverLeave?: () => void
  canvasRef: React.RefObject<HTMLDivElement | null>
  isSolutionFaded?: boolean
}) {
  const dragStartRef = useRef<{ offsetX: number; offsetY: number } | null>(null)
  const didDragRef = useRef(false)

  const color = COMPONENT_COLORS[component.type]
  const displayName = (component.fields.name as string) || component.type

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on primary button (left click)
    if (e.button !== 0) return
    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStartRef.current = {
      offsetX: e.clientX - canvasRect.left - component.x,
      offsetY: e.clientY - canvasRect.top - component.y,
    }
    didDragRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return
    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return
    didDragRef.current = true
    const x = Math.max(0, Math.min(e.clientX - canvasRect.left - dragStartRef.current.offsetX, canvasRect.width - BLOCK_WIDTH))
    const y = Math.max(0, Math.min(e.clientY - canvasRect.top - dragStartRef.current.offsetY, canvasRect.height - BLOCK_HEIGHT))
    onDrag(x, y)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    const wasDragging = didDragRef.current
    dragStartRef.current = null
    didDragRef.current = false

    // If this was a drag (not a click), don't fire click-like actions
    if (wasDragging) return

    // Treat as click
    if (isConnecting && !isConnectionSource) {
      onCompleteConnect()
    } else {
      onSelect()
    }
  }

  const validationRingClass =
    validationStatus === 'correct' ? 'ring-2 ring-green-400/70' :
    validationStatus === 'extra' ? 'ring-2 ring-red-400/70' : ''

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isSolutionFaded ? 0.3 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="absolute group cursor-grab active:cursor-grabbing select-none"
      style={{ left: component.x, top: component.y, zIndex: 1 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <div
        className={`
          relative px-3 py-2 rounded-lg border-2 transition-shadow min-w-[100px]
          ${isSelected ? 'ring-2 ring-white/30 shadow-lg' : ''}
          ${isConnecting && !isConnectionSource ? 'ring-2 ring-dashed ring-green-400/50' : ''}
          ${isConnectionSource ? 'ring-2 ring-amber-400/70' : ''}
          ${!isSelected && !isConnecting && !isConnectionSource ? validationRingClass : ''}
        `}
        style={{
          backgroundColor: color + '20',
          borderColor: isSelected ? color : color + '80',
        }}
      >
        {/* Delete button */}
        <button
          onPointerDown={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Type icon */}
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {COMPONENT_ICONS[component.type]}
          </span>
          <div className="min-w-0">
            <div className="text-xs font-medium text-slate-200 truncate">{displayName}</div>
            <div className="text-[10px] text-slate-400">{component.type}</div>
          </div>
        </div>

        {/* Connection handle (bottom) */}
        <div
          className={`
            absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 cursor-pointer
            transition-colors
            ${isConnectionSource
              ? 'bg-amber-400 border-amber-300'
              : 'bg-slate-600 border-slate-500 hover:bg-blue-400 hover:border-blue-300'}
          `}
          onPointerDown={(e) => {
            e.stopPropagation()
            if (isConnecting && !isConnectionSource) {
              onCompleteConnect()
            } else {
              onStartConnect()
            }
          }}
        />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Connection Lines (SVG overlay)
// ─────────────────────────────────────────────────

function ConnectionLines({
  connections,
  components,
  onDelete,
}: {
  connections: DrawnConnection[]
  components: PlacedComponent[]
  onDelete: (id: string) => void
}) {
  const getCenter = (compId: string): { x: number; y: number } | null => {
    const comp = components.find(c => c.id === compId)
    if (!comp) return null
    return { x: comp.x + BLOCK_WIDTH / 2, y: comp.y + BLOCK_HEIGHT / 2 }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {connections.map((conn) => {
        const from = getCenter(conn.fromId)
        const to = getCenter(conn.toId)
        if (!from || !to) return null

        // Offset the start to the bottom handle
        const startX = from.x
        const startY = from.y + 20
        const endX = to.x
        const endY = to.y - 10

        return (
          <g key={conn.id}>
            {/* Invisible wider path for easier clicking */}
            <path
              d={`M ${startX} ${startY} C ${startX} ${startY + 30}, ${endX} ${endY - 30}, ${endX} ${endY}`}
              fill="none"
              stroke="transparent"
              strokeWidth={16}
              className="pointer-events-auto cursor-pointer"
              onClick={() => onDelete(conn.id)}
            />
            {/* Visible path */}
            <path
              d={`M ${startX} ${startY} C ${startX} ${startY + 30}, ${endX} ${endY - 30}, ${endX} ${endY}`}
              fill="none"
              stroke="#475569"
              strokeWidth={2}
              strokeDasharray="6,3"
              className="pointer-events-none"
            />
            {/* Arrow head */}
            <circle
              cx={endX}
              cy={endY}
              r={3}
              fill="#475569"
              className="pointer-events-none"
            />
          </g>
        )
      })}
    </svg>
  )
}

// ─────────────────────────────────────────────────
// Validation Logic
// ─────────────────────────────────────────────────

interface ValidationResult {
  isCorrect: boolean
  componentScore: number
  connectionScore: number
  totalExpectedComponents: number
  totalExpectedConnections: number
  messages: string[]
  matchedComponentIds: Set<string>
  missingTypes: Set<K8sComponentType>
}

/** Fields to validate per component type (key fields only, ignoring name). */
const VALIDATED_FIELDS: Partial<Record<K8sComponentType, string[]>> = {
  Deployment: ['replicas'],
  Service: ['serviceType', 'port', 'targetPort'],
  Pod: ['image', 'containerPort'],
}

/**
 * Match placed components to expected components by type, then greedily match
 * by field correctness. Returns a mapping from expected-id to placed-id.
 */
function buildComponentMapping(
  placed: PlacedComponent[],
  expected: ExpectedComponent[],
  messages: string[],
): { mapping: Map<string, string>; score: number } {
  // Group expected and placed by type
  const expectedByType: Record<string, ExpectedComponent[]> = {}
  const placedByType: Record<string, PlacedComponent[]> = {}

  for (const c of expected) {
    ;(expectedByType[c.type] ??= []).push(c)
  }
  for (const c of placed) {
    ;(placedByType[c.type] ??= []).push(c)
  }

  const mapping = new Map<string, string>() // expected-id -> placed-id
  let score = 0

  for (const [type, exps] of Object.entries(expectedByType)) {
    const available = [...(placedByType[type] ?? [])]
    const actual = available.length

    if (actual === 0) {
      messages.push(`${type}: fehlt (${exps.length} erwartet)`)
      continue
    }
    if (actual < exps.length) {
      messages.push(`${type}: ${actual} von ${exps.length} erwartet`)
    } else if (actual > exps.length) {
      messages.push(`${type}: ${actual} platziert, aber nur ${exps.length} erwartet`)
    }

    const fieldsToCheck = VALIDATED_FIELDS[type as K8sComponentType] ?? []

    // Greedy match: for each expected, find best available placed component
    for (const exp of exps) {
      let bestIdx = -1
      let bestMatches = -1

      for (let i = 0; i < available.length; i++) {
        let matches = 0
        for (const key of fieldsToCheck) {
          if (key in exp.fields && String(available[i].fields[key]) === String(exp.fields[key])) {
            matches++
          }
        }
        if (matches > bestMatches) {
          bestMatches = matches
          bestIdx = i
        }
      }

      if (bestIdx === -1) continue // no more available of this type

      const matched = available.splice(bestIdx, 1)[0]
      mapping.set(exp.id, matched.id)

      // Validate key fields on the matched component
      let allFieldsOk = true
      for (const key of fieldsToCheck) {
        if (!(key in exp.fields)) continue
        const expectedVal = String(exp.fields[key])
        const actualVal = String(matched.fields[key] ?? '')
        if (actualVal !== expectedVal) {
          allFieldsOk = false
          const label = key === 'serviceType' ? 'Typ' : key
          messages.push(
            `${type} "${matched.fields.name || matched.id}": ${label} ist "${actualVal}", erwartet "${expectedVal}"`,
          )
        }
      }

      if (allFieldsOk) {
        score++
      }
    }
  }

  return { mapping, score }
}

function validateSolution(
  placed: PlacedComponent[],
  drawn: DrawnConnection[],
  exercise: K8sBuilderExercise,
): ValidationResult {
  const messages: string[] = []

  // --- Component validation with field checking ---
  const { mapping, score: componentScore } = buildComponentMapping(placed, exercise.expectedComponents, messages)

  // --- Connection validation by type-matching ---
  // Build a lookup from placed-id to type for fast access
  const placedById = new Map(placed.map(c => [c.id, c]))

  // For each drawn connection, determine the (fromType, toType) pair
  const drawnTypePairs = drawn.map(conn => {
    const fromComp = placedById.get(conn.fromId)
    const toComp = placedById.get(conn.toId)
    return {
      conn,
      fromType: fromComp?.type ?? null,
      toType: toComp?.type ?? null,
    }
  })

  // Build reverse mapping: placed-id -> expected-id
  const reverseMapping = new Map<string, string>()
  for (const [expId, plId] of mapping) {
    reverseMapping.set(plId, expId)
  }

  // For each expected connection, try to find a matching drawn connection
  const usedDrawn = new Set<string>()
  let connectionScore = 0

  for (const expConn of exercise.expectedConnections) {
    const expFromType = exercise.expectedComponents.find(c => c.id === expConn.fromId)?.type
    const expToType = exercise.expectedComponents.find(c => c.id === expConn.toId)?.type

    let matched = false
    for (const { conn, fromType, toType } of drawnTypePairs) {
      if (usedDrawn.has(conn.id)) continue
      if (fromType !== expFromType || toType !== expToType) continue

      // Additional check: if both endpoints are mapped to specific expected components,
      // verify the mapping matches (handles multiple components of the same type)
      const expFromMapped = reverseMapping.get(conn.fromId)
      const expToMapped = reverseMapping.get(conn.toId)

      if (expFromMapped && expFromMapped !== expConn.fromId) continue
      if (expToMapped && expToMapped !== expConn.toId) continue

      usedDrawn.add(conn.id)
      connectionScore++
      matched = true
      break
    }

    if (!matched) {
      const label = expConn.label ? ` (${expConn.label})` : ''
      messages.push(`Verbindung fehlt: ${expFromType} → ${expToType}${label}`)
    }
  }

  // Check for extra connections that don't match any expected
  const extraConns = drawn.length - usedDrawn.size
  if (extraConns > 0) {
    messages.push(`${extraConns} überflüssige Verbindung${extraConns > 1 ? 'en' : ''}`)
  }

  const totalExpComp = exercise.expectedComponents.length
  const totalExpConn = exercise.expectedConnections.length
  const isCorrect = componentScore === totalExpComp && connectionScore === totalExpConn && messages.length === 0

  if (isCorrect) {
    messages.push('Alle Komponenten und Verbindungen sind korrekt!')
  }

  // Collect matched placed-component IDs
  const matchedComponentIds = new Set<string>(mapping.values())

  // Determine which expected types are completely missing from placed components
  const placedTypeSet = new Set(placed.map(c => c.type))
  const missingTypes = new Set<K8sComponentType>()
  for (const exp of exercise.expectedComponents) {
    if (!placedTypeSet.has(exp.type)) {
      missingTypes.add(exp.type)
    }
  }

  return {
    isCorrect,
    componentScore,
    connectionScore,
    totalExpectedComponents: totalExpComp,
    totalExpectedConnections: totalExpConn,
    messages,
    matchedComponentIds,
    missingTypes,
  }
}

// ─────────────────────────────────────────────────
// Solution Layout & Overlay
// ─────────────────────────────────────────────────

interface SolutionLayoutItem {
  id: string
  type: K8sComponentType
  fields: Record<string, string | number>
  x: number
  y: number
}

function layoutSolutionComponents(exercise: K8sBuilderExercise, canvasWidth: number): SolutionLayoutItem[] {
  const { expectedComponents, expectedConnections } = exercise

  // Build adjacency: from -> to[]
  const children = new Map<string, string[]>()
  const hasParent = new Set<string>()

  for (const conn of expectedConnections) {
    const list = children.get(conn.fromId) ?? []
    list.push(conn.toId)
    children.set(conn.fromId, list)
    hasParent.add(conn.toId)
  }

  // Find roots: components that appear as fromId but never as toId
  const roots = expectedComponents
    .filter(c => !hasParent.has(c.id))
    .map(c => c.id)

  // BFS to assign levels
  const levels = new Map<string, number>()
  const queue = [...roots]
  for (const r of roots) levels.set(r, 0)

  while (queue.length > 0) {
    const current = queue.shift()!
    const level = levels.get(current) ?? 0
    for (const child of children.get(current) ?? []) {
      if (!levels.has(child)) {
        levels.set(child, level + 1)
        queue.push(child)
      }
    }
  }

  // Assign level to any components not reached by BFS
  for (const c of expectedComponents) {
    if (!levels.has(c.id)) levels.set(c.id, 0)
  }

  // Group by level
  const byLevel = new Map<number, ExpectedComponent[]>()
  for (const c of expectedComponents) {
    const lv = levels.get(c.id) ?? 0
    const list = byLevel.get(lv) ?? []
    list.push(c)
    byLevel.set(lv, list)
  }

  const result: SolutionLayoutItem[] = []
  const usableWidth = Math.max(canvasWidth - 40, 200)

  for (const [level, comps] of byLevel) {
    const y = 20 + level * 80
    const spacing = usableWidth / (comps.length + 1)
    comps.forEach((c, i) => {
      result.push({
        id: c.id,
        type: c.type,
        fields: c.fields,
        x: spacing * (i + 1) - BLOCK_WIDTH / 2 + 20,
        y,
      })
    })
  }

  return result
}

function SolutionComponentBlock({
  item,
  index,
}: {
  item: SolutionLayoutItem
  index: number
}) {
  const color = COMPONENT_COLORS[item.type]
  const displayName = (item.fields.name as string) || item.type

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.7, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ delay: index * 0.15, duration: 0.3 }}
      className="absolute pointer-events-none"
      style={{ left: item.x, top: item.y, zIndex: 2 }}
    >
      <div
        className="px-3 py-2 rounded-lg border-2 border-dashed min-w-[100px]"
        style={{
          backgroundColor: color + '15',
          borderColor: color + '60',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white/70 flex-shrink-0"
            style={{ backgroundColor: color + '80' }}
          >
            {COMPONENT_ICONS[item.type]}
          </span>
          <div className="min-w-0">
            <div className="text-xs font-medium text-slate-300/70 truncate">{displayName}</div>
            <div className="text-[10px] text-slate-500">{item.type}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SolutionConnectionLines({
  connections,
  layoutItems,
}: {
  connections: ExpectedConnection[]
  layoutItems: SolutionLayoutItem[]
}) {
  const getCenter = (id: string): { x: number; y: number } | null => {
    const item = layoutItems.find(i => i.id === id)
    if (!item) return null
    return { x: item.x + BLOCK_WIDTH / 2, y: item.y + BLOCK_HEIGHT / 2 }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
      {connections.map((conn, idx) => {
        const from = getCenter(conn.fromId)
        const to = getCenter(conn.toId)
        if (!from || !to) return null

        const startX = from.x
        const startY = from.y + 20
        const endX = to.x
        const endY = to.y - 10

        return (
          <motion.g
            key={`${conn.fromId}-${conn.toId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: idx * 0.1 + 0.3, duration: 0.3 }}
          >
            <path
              d={`M ${startX} ${startY} C ${startX} ${startY + 30}, ${endX} ${endY - 30}, ${endX} ${endY}`}
              fill="none"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="4,4"
            />
            <circle cx={endX} cy={endY} r={3} fill="#10b981" opacity={0.6} />
            {conn.label && (
              <text
                x={(startX + endX) / 2}
                y={(startY + endY) / 2 - 6}
                textAnchor="middle"
                fontSize={9}
                fill="#10b981"
                opacity={0.6}
              >
                {conn.label}
              </text>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function K8sManifestDiagramBuilder({ className }: DiagramProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([])
  const [connections, setConnections] = useState<DrawnConnection[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null)
  const [currentHint, setCurrentHint] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [propertiesOpen, setPropertiesOpen] = useState(true)
  const [hoveredComponentType, setHoveredComponentType] = useState<K8sComponentType | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const placedCountRef = useRef(0)

  const exercise = EXERCISES[currentExercise]

  // Reset state
  const reset = useCallback(() => {
    setPlacedComponents([])
    setConnections([])
    setSelectedId(null)
    setConnectingFromId(null)
    setCurrentHint(0)
    setShowSolution(false)
    setValidation(null)
    setPropertiesOpen(true)
    setHoveredComponentType(null)
    placedCountRef.current = 0
  }, [])

  // Add component to canvas
  const addComponent = useCallback((type: K8sComponentType) => {
    const count = placedCountRef.current
    placedCountRef.current += 1

    // Stagger positions
    const col = count % 4
    const row = Math.floor(count / 4)
    const x = 20 + col * 130
    const y = 20 + row * 80

    const newComp: PlacedComponent = {
      id: generateId(),
      type,
      x,
      y,
      fields: {},
    }

    setPlacedComponents(prev => [...prev, newComp])
    setSelectedId(newComp.id)
    setValidation(null)
  }, [])

  // Update component position
  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setPlacedComponents(prev =>
      prev.map(c => c.id === id ? { ...c, x: Math.max(0, x), y: Math.max(0, y) } : c),
    )
  }, [])

  // Update component fields
  const updateFields = useCallback((id: string, fields: Record<string, string | number>) => {
    setPlacedComponents(prev =>
      prev.map(c => c.id === id ? { ...c, fields } : c),
    )
    setValidation(null)
  }, [])

  // Delete component
  const deleteComponent = useCallback((id: string) => {
    setPlacedComponents(prev => prev.filter(c => c.id !== id))
    setConnections(prev => prev.filter(c => c.fromId !== id && c.toId !== id))
    if (selectedId === id) setSelectedId(null)
    if (connectingFromId === id) setConnectingFromId(null)
    setValidation(null)
  }, [selectedId, connectingFromId])

  // Start connection
  const startConnect = useCallback((fromId: string) => {
    setConnectingFromId(fromId)
  }, [])

  // Complete connection
  const completeConnect = useCallback((toId: string) => {
    if (!connectingFromId || connectingFromId === toId) {
      setConnectingFromId(null)
      return
    }

    // Check for duplicate
    const exists = connections.some(
      c => (c.fromId === connectingFromId && c.toId === toId) ||
           (c.fromId === toId && c.toId === connectingFromId),
    )

    if (!exists) {
      setConnections(prev => [...prev, {
        id: generateId(),
        fromId: connectingFromId,
        toId,
      }])
    }

    setConnectingFromId(null)
    setValidation(null)
  }, [connectingFromId, connections])

  // Delete connection
  const deleteConnection = useCallback((id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id))
    setValidation(null)
  }, [])

  // Click canvas background to deselect
  const handleCanvasClick = useCallback(() => {
    setSelectedId(null)
    if (connectingFromId) setConnectingFromId(null)
  }, [connectingFromId])

  // Validate
  const handleValidate = useCallback(() => {
    const result = validateSolution(placedComponents, connections, exercise)
    setValidation(result)
  }, [placedComponents, connections, exercise])

  // Selected component
  const selectedComponent = useMemo(
    () => placedComponents.find(c => c.id === selectedId) ?? null,
    [placedComponents, selectedId],
  )

  // Per-component validation status
  const componentValidationStatus = useMemo(() => {
    if (!validation) return new Map<string, 'correct' | 'extra'>()
    const map = new Map<string, 'correct' | 'extra'>()
    for (const comp of placedComponents) {
      if (validation.matchedComponentIds.has(comp.id)) {
        map.set(comp.id, 'correct')
      } else {
        map.set(comp.id, 'extra')
      }
    }
    return map
  }, [validation, placedComponents])

  // Solution layout items (computed when solution is shown)
  const solutionLayout = useMemo(() => {
    if (!showSolution) return []
    const canvasWidth = canvasRef.current?.clientWidth ?? 600
    return layoutSolutionComponents(exercise, canvasWidth)
  }, [showSolution, exercise])

  return (
    <DiagramShell
      title="K8s Manifest → Diagramm Builder"
      subtitle={`${exercise.title} (${DIFFICULTY_LABELS[exercise.difficulty]})`}
      className={className}
      actions={
        <>
          <select
            value={currentExercise}
            onChange={(e) => {
              setCurrentExercise(Number(e.target.value))
              reset()
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-sm"
          >
            {EXERCISES.map((ex, i) => (
              <option key={ex.id} value={i}>
                {ex.title} ({DIFFICULTY_LABELS[ex.difficulty]})
              </option>
            ))}
          </select>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </>
      }
      footer={
        <>
          <strong className="text-slate-400">Tipp:</strong> Lies das YAML-Manifest links und baue rechts das
          entsprechende Architektur-Diagramm. Klicke auf Toolbox-Buttons um Komponenten hinzuzufügen,
          verbinde sie über die Handles am unteren Rand.
        </>
      }
    >
      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left Panel: YAML (40%) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-300">YAML Manifest</h4>
            <span className={`text-xs font-medium ${DIFFICULTY_COLORS[exercise.difficulty]}`}>
              {DIFFICULTY_LABELS[exercise.difficulty]}
            </span>
          </div>

          <YamlPanel yaml={exercise.manifest} highlightType={hoveredComponentType} />

          {/* Hints */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentHint(prev => Math.min(prev + 1, exercise.hints.length))}
              disabled={currentHint >= exercise.hints.length}
            >
              Hinweis ({currentHint}/{exercise.hints.length})
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

          {/* Solution reveal */}
          <div className="space-y-2">
            <Button
              variant={showSolution ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? 'Lösung ausblenden' : 'Lösung anzeigen'}
            </Button>
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-700/50 space-y-2">
                    <div className="text-xs font-medium text-emerald-400">Erwartete Komponenten:</div>
                    {exercise.expectedComponents.map(c => (
                      <div key={c.id} className="flex items-center gap-2 text-xs">
                        <span
                          className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: COMPONENT_COLORS[c.type] }}
                        >
                          {COMPONENT_ICONS[c.type]}
                        </span>
                        <span className="text-slate-300">{c.type}</span>
                        {c.fields.name && (
                          <span className="text-slate-500">({String(c.fields.name)})</span>
                        )}
                      </div>
                    ))}
                    <div className="text-xs font-medium text-emerald-400 mt-2">Erwartete Verbindungen:</div>
                    {exercise.expectedConnections.map((conn, i) => (
                      <div key={i} className="text-xs text-slate-400">
                        {conn.fromId} → {conn.toId}
                        {conn.label && <span className="text-slate-500 ml-1">({conn.label})</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Builder (60%) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Toolbox */}
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="text-xs text-slate-400 mb-2">Komponenten hinzufügen:</div>
            <div className="flex flex-wrap gap-2">
              {TOOLBOX_TYPES.map(type => {
                const isMissing = validation && !validation.isCorrect && validation.missingTypes.has(type)
                return (
                  <button
                    key={type}
                    onClick={() => addComponent(type)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-slate-700 hover:bg-slate-600 text-slate-200 ${
                      isMissing ? 'animate-pulse ring-2 ring-amber-400/60' : ''
                    }`}
                    style={{ borderLeft: `3px solid ${COMPONENT_COLORS[type]}` }}
                  >
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ backgroundColor: COMPONENT_COLORS[type] }}
                    >
                      {COMPONENT_ICONS[type]}
                    </span>
                    {type}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Connecting mode indicator */}
          <AnimatePresence>
            {connectingFromId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3 py-2 rounded-lg bg-amber-900/30 border border-amber-700/50 text-xs text-amber-300"
              >
                Verbindungsmodus: Klicke auf eine andere Komponente um die Verbindung herzustellen.
                <button
                  onClick={() => setConnectingFromId(null)}
                  className="ml-2 underline hover:text-amber-200"
                >
                  Abbrechen
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="relative rounded-lg bg-slate-900 border border-slate-700 overflow-hidden"
            style={{ minHeight: 400 }}
            onClick={handleCanvasClick}
          >
            {/* Grid background */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <defs>
                <pattern id="k8s-builder-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#k8s-builder-grid)" />
            </svg>

            {/* Connection lines */}
            <ConnectionLines
              connections={connections}
              components={placedComponents}
              onDelete={deleteConnection}
            />

            {/* Empty state */}
            {placedComponents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm" style={{ zIndex: 1 }}>
                Klicke oben auf eine Komponente um sie auf der Leinwand zu platzieren.
              </div>
            )}

            {/* Placed components */}
            <AnimatePresence>
              {placedComponents.map(comp => (
                <ComponentBlock
                  key={comp.id}
                  component={comp}
                  isSelected={selectedId === comp.id}
                  isConnecting={connectingFromId !== null}
                  isConnectionSource={connectingFromId === comp.id}
                  validationStatus={componentValidationStatus.get(comp.id) ?? null}
                  onSelect={() => {
                    setSelectedId(comp.id)
                    setPropertiesOpen(true)
                  }}
                  onDelete={() => deleteComponent(comp.id)}
                  onStartConnect={() => startConnect(comp.id)}
                  onCompleteConnect={() => completeConnect(comp.id)}
                  onDrag={(x, y) => updatePosition(comp.id, x, y)}
                  onHoverEnter={() => setHoveredComponentType(comp.type)}
                  onHoverLeave={() => setHoveredComponentType(null)}
                  canvasRef={canvasRef}
                  isSolutionFaded={showSolution}
                />
              ))}
            </AnimatePresence>

            {/* Solution overlay */}
            <AnimatePresence>
              {showSolution && (
                <>
                  <SolutionConnectionLines
                    connections={exercise.expectedConnections}
                    layoutItems={solutionLayout}
                  />
                  {solutionLayout.map((item, index) => (
                    <SolutionComponentBlock key={item.id} item={item} index={index} />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Properties panel (collapsible) */}
          <AnimatePresence>
            {selectedComponent && propertiesOpen && (
              <PropertiesPanel
                component={selectedComponent}
                onUpdate={(fields) => updateFields(selectedComponent.id, fields)}
                onClose={() => setPropertiesOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Stats bar */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Komponenten: {placedComponents.length}</span>
            <span>Verbindungen: {connections.length}</span>
            {exercise.expectedComponents.length > 0 && (
              <span className="text-slate-600">
                (Erwartet: {exercise.expectedComponents.length} Komp., {exercise.expectedConnections.length} Verb.)
              </span>
            )}
          </div>

          {/* Validate */}
          <div className="flex items-center gap-4">
            <Button variant="primary" size="sm" onClick={handleValidate}>
              Überprüfen
            </Button>
            <AnimatePresence>
              {validation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`
                    flex-1 px-3 py-2 rounded-lg text-sm
                    ${validation.isCorrect
                      ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                      : 'bg-red-900/30 text-red-400 border border-red-700/50'}
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {validation.isCorrect ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Korrekt!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium">
                          Noch nicht ganz richtig
                          ({validation.componentScore}/{validation.totalExpectedComponents} Komp.,
                          {' '}{validation.connectionScore}/{validation.totalExpectedConnections} Verb.)
                        </span>
                      </>
                    )}
                  </div>
                  {validation.messages.length > 0 && (
                    <ul className="text-xs space-y-0.5 ml-6">
                      {validation.messages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            {TOOLBOX_TYPES.map(type => (
              <span key={type} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: COMPONENT_COLORS[type] + '30', border: `2px solid ${COMPONENT_COLORS[type]}` }}
                />
                <span className="text-slate-400">{type}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </DiagramShell>
  )
}
