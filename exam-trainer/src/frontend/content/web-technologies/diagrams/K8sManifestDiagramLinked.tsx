// src/content/web-technologies/diagrams/K8sManifestDiagramLinked.tsx
import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface ManifestLine {
  lineNumber: number
  content: string
  indent: number
  key?: string
  value?: string
  regionId?: string
}

interface DiagramComponent {
  id: string
  type: 'deployment' | 'replicaset' | 'pod' | 'service' | 'container' | 'label'
  label: string
  description: string
  x: number
  y: number
  width: number
  height: number
  linkedRegions: string[]
  color: string
}

interface Manifest {
  id: string
  title: string
  description: string
  yaml: string
  components: DiagramComponent[]
}

// ─────────────────────────────────────────────────
// Manifest Data
// ─────────────────────────────────────────────────

const MANIFESTS: Manifest[] = [
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Ein Deployment verwaltet ReplicaSets und ermöglicht deklarative Updates.',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-api
  labels:
    app: playlist
spec:
  replicas: 3
  selector:
    matchLabels:
      app: playlist
  template:
    metadata:
      labels:
        app: playlist
    spec:
      containers:
      - name: api
        image: playlist-api:v1
        ports:
        - containerPort: 8080`,
    components: [
      {
        id: 'deployment',
        type: 'deployment',
        label: 'Deployment',
        description: 'Verwaltet ReplicaSets und Pods',
        x: 150,
        y: 20,
        width: 200,
        height: 280,
        linkedRegions: ['apiVersion', 'kind', 'metadata', 'spec'],
        color: '#3b82f6',
      },
      {
        id: 'replicaset',
        type: 'replicaset',
        label: 'ReplicaSet',
        description: 'Stellt sicher, dass immer 3 Pods laufen',
        x: 170,
        y: 60,
        width: 160,
        height: 180,
        linkedRegions: ['replicas', 'selector'],
        color: '#8b5cf6',
      },
      {
        id: 'pod1',
        type: 'pod',
        label: 'Pod 1',
        description: 'Instanz der Anwendung',
        x: 185,
        y: 100,
        width: 50,
        height: 50,
        linkedRegions: ['template', 'containers'],
        color: '#10b981',
      },
      {
        id: 'pod2',
        type: 'pod',
        label: 'Pod 2',
        description: 'Instanz der Anwendung',
        x: 225,
        y: 160,
        width: 50,
        height: 50,
        linkedRegions: ['template', 'containers'],
        color: '#10b981',
      },
      {
        id: 'pod3',
        type: 'pod',
        label: 'Pod 3',
        description: 'Instanz der Anwendung',
        x: 265,
        y: 100,
        width: 50,
        height: 50,
        linkedRegions: ['template', 'containers'],
        color: '#10b981',
      },
      {
        id: 'labels',
        type: 'label',
        label: 'app: playlist',
        description: 'Label für Selektion',
        x: 360,
        y: 130,
        width: 100,
        height: 30,
        linkedRegions: ['labels', 'matchLabels'],
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'service',
    title: 'Service',
    description: 'Ein Service exponiert Pods über eine stabile Netzwerk-Adresse.',
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: playlist-service
spec:
  type: ClusterIP
  selector:
    app: playlist
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP`,
    components: [
      {
        id: 'service',
        type: 'service',
        label: 'Service',
        description: 'Stabile Netzwerk-Adresse',
        x: 150,
        y: 20,
        width: 200,
        height: 100,
        linkedRegions: ['apiVersion', 'kind', 'metadata', 'spec', 'type'],
        color: '#ec4899',
      },
      {
        id: 'clusterip',
        type: 'label',
        label: 'ClusterIP: 10.0.0.1',
        description: 'Interne Cluster-IP',
        x: 170,
        y: 60,
        width: 120,
        height: 30,
        linkedRegions: ['type'],
        color: '#06b6d4',
      },
      {
        id: 'selector',
        type: 'label',
        label: 'selector: app=playlist',
        description: 'Findet passende Pods',
        x: 360,
        y: 50,
        width: 140,
        height: 30,
        linkedRegions: ['selector'],
        color: '#f59e0b',
      },
      {
        id: 'pods',
        type: 'pod',
        label: 'Pods',
        description: 'Ausgewählte Pods',
        x: 180,
        y: 160,
        width: 140,
        height: 60,
        linkedRegions: ['selector', 'ports'],
        color: '#10b981',
      },
    ],
  },
  {
    id: 'combined',
    title: 'Deployment + Service',
    description: 'Vollständiges Setup mit Deployment und Service.',
    yaml: `---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: playlist
  template:
    metadata:
      labels:
        app: playlist
    spec:
      containers:
      - name: api
        image: playlist:v1
---
apiVersion: v1
kind: Service
metadata:
  name: playlist-svc
spec:
  selector:
    app: playlist
  ports:
  - port: 80
    targetPort: 8080`,
    components: [
      {
        id: 'deployment',
        type: 'deployment',
        label: 'Deployment',
        description: 'Erstellt und verwaltet Pods',
        x: 50,
        y: 20,
        width: 150,
        height: 200,
        linkedRegions: ['deployment-api', 'deployment-kind', 'deployment-spec'],
        color: '#3b82f6',
      },
      {
        id: 'service',
        type: 'service',
        label: 'Service',
        description: 'Exponiert Pods',
        x: 300,
        y: 60,
        width: 150,
        height: 100,
        linkedRegions: ['service-api', 'service-kind', 'service-spec'],
        color: '#ec4899',
      },
      {
        id: 'pod1',
        type: 'pod',
        label: 'Pod 1',
        description: 'Instanz',
        x: 80,
        y: 80,
        width: 45,
        height: 45,
        linkedRegions: ['template'],
        color: '#10b981',
      },
      {
        id: 'pod2',
        type: 'pod',
        label: 'Pod 2',
        description: 'Instanz',
        x: 125,
        y: 140,
        width: 45,
        height: 45,
        linkedRegions: ['template'],
        color: '#10b981',
      },
      {
        id: 'connection',
        type: 'label',
        label: 'app: playlist',
        description: 'Verbindet Service mit Pods',
        x: 210,
        y: 110,
        width: 80,
        height: 25,
        linkedRegions: ['labels', 'matchLabels', 'selector-service'],
        color: '#f59e0b',
      },
    ],
  },
]

// ─────────────────────────────────────────────────
// Region mapping for YAML lines
// ─────────────────────────────────────────────────

const REGION_MAPPINGS: Record<string, Record<string, string>> = {
  deployment: {
    'apiVersion': 'apiVersion',
    'kind': 'kind',
    'metadata': 'metadata',
    'name': 'metadata',
    'labels': 'labels',
    'app': 'labels',
    'spec': 'spec',
    'replicas': 'replicas',
    'selector': 'selector',
    'matchLabels': 'matchLabels',
    'template': 'template',
    'containers': 'containers',
    'image': 'containers',
    'ports': 'containers',
    'containerPort': 'containers',
  },
  service: {
    'apiVersion': 'apiVersion',
    'kind': 'kind',
    'metadata': 'metadata',
    'name': 'metadata',
    'spec': 'spec',
    'type': 'type',
    'ClusterIP': 'type',
    'selector': 'selector',
    'app': 'selector',
    'ports': 'ports',
    'port': 'ports',
    'targetPort': 'ports',
    'protocol': 'ports',
  },
  combined: {
    'apiVersion': 'apiVersion',
    'kind': 'kind',
    'Deployment': 'deployment-kind',
    'Service': 'service-kind',
    'metadata': 'metadata',
    'spec': 'spec',
    'replicas': 'replicas',
    'selector': 'selector',
    'template': 'template',
    'labels': 'labels',
    'matchLabels': 'matchLabels',
    'containers': 'containers',
    'ports': 'ports',
  },
}

// ─────────────────────────────────────────────────
// Annotations for YAML fields
// ─────────────────────────────────────────────────

const FIELD_ANNOTATIONS: Record<string, string> = {
  'apiVersion': 'API-Gruppe und Version für diese Ressource',
  'kind': 'Typ der Kubernetes-Ressource',
  'metadata': 'Identifizierende Informationen (Name, Labels)',
  'name': 'Eindeutiger Name im Namespace',
  'labels': 'Key-Value-Paare zur Kategorisierung',
  'spec': 'Gewünschter Zustand (Desired State)',
  'replicas': 'Anzahl der gewünschten Pod-Instanzen',
  'selector': 'Welche Pods gehören zu dieser Ressource',
  'matchLabels': 'Labels die Pods haben müssen',
  'template': 'Vorlage für zu erstellende Pods',
  'containers': 'Container-Definitionen im Pod',
  'image': 'Docker-Image für den Container',
  'ports': 'Netzwerk-Ports des Containers',
  'containerPort': 'Port auf dem der Container lauscht',
  'type': 'Service-Typ (ClusterIP, NodePort, LoadBalancer)',
  'targetPort': 'Port auf dem der Pod lauscht',
}

// ─────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────

function parseYaml(yaml: string, manifestId: string): ManifestLine[] {
  const lines = yaml.split('\n')
  const regionMapping = REGION_MAPPINGS[manifestId] || {}

  return lines.map((content, index) => {
    const indent = content.search(/\S|$/)
    const trimmed = content.trim()

    // Extract key and value
    const colonIndex = trimmed.indexOf(':')
    let key: string | undefined
    let value: string | undefined

    if (colonIndex !== -1 && !trimmed.startsWith('-')) {
      key = trimmed.substring(0, colonIndex)
      value = trimmed.substring(colonIndex + 1).trim()
    } else if (trimmed.startsWith('- ')) {
      key = trimmed.substring(2).split(':')[0]
      value = trimmed.substring(2).split(':')[1]?.trim()
    }

    // Find matching region
    let regionId: string | undefined
    if (key) {
      regionId = regionMapping[key]
    }
    // Also check value for things like "kind: Deployment"
    if (value && regionMapping[value]) {
      regionId = regionMapping[value]
    }

    return {
      lineNumber: index + 1,
      content,
      indent,
      key,
      value,
      regionId,
    }
  })
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function K8sManifestDiagramLinked({ className }: DiagramProps) {
  const [currentManifest, setCurrentManifest] = useState(0)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hideDiagram, setHideDiagram] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const yamlRef = useRef<HTMLDivElement>(null)

  const manifest = MANIFESTS[currentManifest]
  const parsedYaml = useMemo(() => parseYaml(manifest.yaml, manifest.id), [manifest])

  // Get active region (hovered or selected)
  const activeRegion = hoveredRegion || selectedRegion

  // Find components linked to active region
  const highlightedComponents = useMemo(() => {
    if (!activeRegion) return new Set<string>()
    return new Set(
      manifest.components
        .filter(c => c.linkedRegions.includes(activeRegion))
        .map(c => c.id)
    )
  }, [activeRegion, manifest.components])

  // Find YAML lines linked to active component
  const highlightedLines = useMemo(() => {
    if (!activeRegion) return new Set<number>()
    const lines = new Set<number>()
    parsedYaml.forEach(line => {
      if (line.regionId === activeRegion) {
        lines.add(line.lineNumber)
      }
    })
    // Also highlight lines where components link to this region
    manifest.components.forEach(comp => {
      if (comp.id === activeRegion) {
        parsedYaml.forEach(line => {
          if (line.regionId && comp.linkedRegions.includes(line.regionId)) {
            lines.add(line.lineNumber)
          }
        })
      }
    })
    return lines
  }, [activeRegion, parsedYaml, manifest.components])

  // Scroll to highlighted line
  useEffect(() => {
    if (highlightedLines.size > 0 && yamlRef.current) {
      const firstLine = Math.min(...highlightedLines)
      const lineElement = yamlRef.current.querySelector(`[data-line="${firstLine}"]`)
      lineElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlightedLines])

  // Get annotation for a line
  const getAnnotation = (line: ManifestLine): string | null => {
    if (!showAnnotations || !line.key) return null
    return FIELD_ANNOTATIONS[line.key] || null
  }

  return (
    <DiagramShell
      title="K8s Manifest Explorer"
      subtitle={`${manifest.title}: ${manifest.description}`}
      className={className}
      actions={
        <>
          <select
            value={currentManifest}
            onChange={(e) => {
              setCurrentManifest(Number(e.target.value))
              setSelectedRegion(null)
              setHoveredRegion(null)
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-sm"
          >
            {MANIFESTS.map((m, i) => (
              <option key={m.id} value={i}>{m.title}</option>
            ))}
          </select>
          <Button
            variant={showAnnotations ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setShowAnnotations(!showAnnotations)}
          >
            Annotationen
          </Button>
          <Button
            variant={hideDiagram ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setHideDiagram(!hideDiagram)}
          >
            {hideDiagram ? 'Diagramm zeigen' : 'Übungsmodus'}
          </Button>
        </>
      }
      footer={
        <>
          <strong className="text-slate-400">Tipp:</strong> Hover über YAML-Zeilen oder Diagramm-Elemente
          um Verknüpfungen zu sehen. Der Übungsmodus hilft beim Lernen für die Klausur.
        </>
      }
    >

        {/* Main Content */}
        <div className={`grid gap-6 ${hideDiagram ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* YAML Panel */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300">YAML Manifest</h4>
            <div
              ref={yamlRef}
              className="rounded-lg bg-slate-900 border border-slate-700 overflow-auto max-h-[500px]"
            >
              <div className="p-4 font-mono text-sm">
                {parsedYaml.map((line) => {
                  const isHighlighted = highlightedLines.has(line.lineNumber)
                  const annotation = getAnnotation(line)

                  return (
                    <div
                      key={line.lineNumber}
                      data-line={line.lineNumber}
                      className="group relative"
                    >
                      <motion.div
                        className={`
                          flex items-start py-0.5 px-2 -mx-2 rounded cursor-pointer
                          ${isHighlighted
                            ? 'bg-blue-500/20 border-l-2 border-blue-500'
                            : 'hover:bg-slate-800/50 border-l-2 border-transparent'}
                        `}
                        onMouseEnter={() => line.regionId && setHoveredRegion(line.regionId)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => line.regionId && setSelectedRegion(
                          selectedRegion === line.regionId ? null : line.regionId
                        )}
                        animate={{
                          backgroundColor: isHighlighted ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        }}
                      >
                        <span className="text-slate-500 select-none w-6 text-right mr-3 flex-shrink-0">
                          {line.lineNumber}
                        </span>
                        <span className="flex-1">
                          {line.content === '---' ? (
                            <span className="text-slate-500">{line.content}</span>
                          ) : line.key ? (
                            <>
                              <span style={{ marginLeft: line.indent * 0.5 + 'ch' }} />
                              <span className={`${isHighlighted ? 'text-blue-300' : 'text-cyan-400'}`}>
                                {line.content.trim().startsWith('-') ? '- ' : ''}
                                {line.key}
                              </span>
                              {line.value !== undefined && (
                                <>
                                  <span className="text-slate-500">: </span>
                                  <span className={`${isHighlighted ? 'text-blue-100' : 'text-amber-300'}`}>
                                    {line.value}
                                  </span>
                                </>
                              )}
                              {line.value === undefined && line.content.includes(':') && (
                                <span className="text-slate-500">:</span>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-400">
                              {line.content}
                            </span>
                          )}
                        </span>
                      </motion.div>

                      {/* Annotation tooltip */}
                      {annotation && (
                        <div className="hidden group-hover:block absolute left-full top-0 ml-2 z-10 w-64">
                          <div className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 shadow-lg">
                            <div className="text-xs text-blue-400 font-medium mb-1">{line.key}</div>
                            <div className="text-xs text-slate-300">{annotation}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-500/30 border-l-2 border-blue-500" />
                Verknüpft
              </span>
              <span>Klicke auf eine Zeile für Details</span>
            </div>
          </div>

          {/* Diagram Panel */}
          <AnimatePresence>
            {!hideDiagram && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                <h4 className="text-sm font-medium text-slate-300">Architektur</h4>
                <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 min-h-[350px] relative">
                  <svg viewBox="0 0 500 300" className="w-full h-full">
                    {/* Connection lines between components */}
                    {manifest.id === 'combined' && (
                      <>
                        <line
                          x1={200}
                          y1={120}
                          x2={300}
                          y2={110}
                          stroke={activeRegion === 'selector' || activeRegion === 'labels' ? '#f59e0b' : '#475569'}
                          strokeWidth={2}
                          strokeDasharray="4,4"
                        />
                      </>
                    )}

                    {/* Components */}
                    {manifest.components.map((comp) => {
                      const isHighlighted = highlightedComponents.has(comp.id) || activeRegion === comp.id

                      return (
                        <motion.g
                          key={comp.id}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredRegion(comp.id)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          onClick={() => setSelectedRegion(selectedRegion === comp.id ? null : comp.id)}
                        >
                          <motion.rect
                            x={comp.x}
                            y={comp.y}
                            width={comp.width}
                            height={comp.height}
                            rx={8}
                            fill={isHighlighted ? `${comp.color}30` : `${comp.color}15`}
                            stroke={comp.color}
                            strokeWidth={isHighlighted ? 3 : 2}
                            animate={{
                              fill: isHighlighted ? `${comp.color}30` : `${comp.color}15`,
                              strokeWidth: isHighlighted ? 3 : 2,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <text
                            x={comp.x + comp.width / 2}
                            y={comp.y + comp.height / 2 - (comp.type === 'pod' ? 0 : 8)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isHighlighted ? '#fff' : '#94a3b8'}
                            className="text-xs font-medium pointer-events-none"
                          >
                            {comp.label}
                          </text>
                          {comp.type !== 'pod' && comp.type !== 'label' && (
                            <text
                              x={comp.x + comp.width / 2}
                              y={comp.y + comp.height / 2 + 10}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#64748b"
                              className="text-[10px] pointer-events-none"
                            >
                              {comp.type}
                            </text>
                          )}
                        </motion.g>
                      )
                    })}
                  </svg>

                  {/* Selected component info */}
                  <AnimatePresence>
                    {selectedRegion && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-4 right-4"
                      >
                        <div className="p-3 rounded-lg bg-slate-800/90 border border-slate-600 backdrop-blur-sm">
                          {(() => {
                            const comp = manifest.components.find(c => c.id === selectedRegion)
                            if (comp) {
                              return (
                                <>
                                  <div className="font-medium text-slate-100">{comp.label}</div>
                                  <div className="text-sm text-slate-400">{comp.description}</div>
                                </>
                              )
                            }
                            const annotation = FIELD_ANNOTATIONS[selectedRegion]
                            if (annotation) {
                              return (
                                <>
                                  <div className="font-medium text-slate-100">{selectedRegion}</div>
                                  <div className="text-sm text-slate-400">{annotation}</div>
                                </>
                              )
                            }
                            return null
                          })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Component legend */}
                <div className="flex flex-wrap gap-3 text-xs">
                  {[
                    { type: 'deployment', color: '#3b82f6', label: 'Deployment' },
                    { type: 'replicaset', color: '#8b5cf6', label: 'ReplicaSet' },
                    { type: 'pod', color: '#10b981', label: 'Pod' },
                    { type: 'service', color: '#ec4899', label: 'Service' },
                    { type: 'label', color: '#f59e0b', label: 'Label/Selector' },
                  ].map(item => (
                    <span key={item.type} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: `${item.color}30`, border: `2px solid ${item.color}` }}
                      />
                      <span className="text-slate-400">{item.label}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exercise Mode Info */}
        <AnimatePresence>
          {hideDiagram && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <span className="font-semibold text-amber-300">Übungsmodus</span>
                </div>
                <p className="text-sm text-slate-300">
                  Das Diagramm ist ausgeblendet. Versuche dir die Kubernetes-Architektur
                  anhand des YAML-Manifests vorzustellen. Welche Ressourcen werden erstellt?
                  Wie sind sie verbunden?
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-400">
                  <li>• Welcher <code className="bg-slate-700 px-1 rounded">kind</code> wird definiert?</li>
                  <li>• Wie viele <code className="bg-slate-700 px-1 rounded">replicas</code>?</li>
                  <li>• Welches Label verbindet alles?</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

    </DiagramShell>
  )
}
