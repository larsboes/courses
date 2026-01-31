// src/core/components/quiz/SystemBuilderExercise.tsx
import { useState, useCallback, useRef, useMemo, DragEvent, memo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
  type NodeProps,
  type OnConnect,
  type Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Button, Card } from '@/core/components/ui'
import { ComponentToolbox } from './ComponentToolbox'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface SystemBuilderExerciseProps {
  manifest: string
  expectedNodes: { type: string; count: number }[]
  expectedEdges: { from: string; to: string }[]
  availableComponents: string[]
  onComplete: (correct: boolean) => void
}

type K8sNodeData = {
  label: string
  componentType: string
  status?: 'correct' | 'incorrect' | 'neutral'
}

type K8sNode = Node<K8sNodeData, 'k8s'>

// ─────────────────────────────────────────────────
// K8s Node Component
// ─────────────────────────────────────────────────

const componentColors: Record<string, { bg: string; border: string; borderCorrect: string; borderIncorrect: string }> = {
  Pod: { bg: 'bg-blue-600', border: 'border-blue-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
  Service: { bg: 'bg-green-600', border: 'border-green-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
  Node: { bg: 'bg-slate-600', border: 'border-slate-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
  Container: { bg: 'bg-purple-600', border: 'border-purple-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
  Deployment: { bg: 'bg-amber-600', border: 'border-amber-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
  ReplicaSet: { bg: 'bg-cyan-600', border: 'border-cyan-500', borderCorrect: 'border-green-400', borderIncorrect: 'border-red-400' },
}

const componentIcons: Record<string, string> = {
  Pod: 'P',
  Service: 'S',
  Node: 'N',
  Container: 'C',
  Deployment: 'D',
  ReplicaSet: 'RS',
}

function K8sNodeComponent({ data }: NodeProps<K8sNode>) {
  const colors = componentColors[data.componentType] || {
    bg: 'bg-slate-700',
    border: 'border-slate-600',
    borderCorrect: 'border-green-400',
    borderIncorrect: 'border-red-400',
  }

  const borderClass = data.status === 'correct'
    ? colors.borderCorrect
    : data.status === 'incorrect'
    ? colors.borderIncorrect
    : colors.border

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-300 !w-3 !h-3 !border-2 !border-slate-500"
      />
      <div
        className={`
          ${colors.bg} rounded-lg border-2 ${borderClass}
          p-3 min-w-24 cursor-move
          shadow-lg transition-colors
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-black/20 rounded font-mono text-sm font-bold">
            {componentIcons[data.componentType] || data.componentType[0]}
          </div>
          <div>
            <div className="text-xs text-white/70">{data.componentType}</div>
            <div className="text-sm font-medium">{data.label}</div>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-300 !w-3 !h-3 !border-2 !border-slate-500"
      />
    </>
  )
}

const K8sNodeMemo = memo(K8sNodeComponent)

const nodeTypes: NodeTypes = {
  k8s: K8sNodeMemo,
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function SystemBuilderExercise({
  manifest,
  expectedNodes,
  expectedEdges,
  availableComponents,
  onComplete,
}: SystemBuilderExerciseProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<K8sNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [nodeIdCounter, setNodeIdCounter] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState<string[]>([])

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        animated: true,
      }, eds))
    },
    [setEdges]
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      const componentType = event.dataTransfer.getData('application/k8s-component')
      if (!componentType) return

      const wrapper = reactFlowWrapper.current
      if (!wrapper) return

      const bounds = wrapper.getBoundingClientRect()
      const position = {
        x: event.clientX - bounds.left - 60,
        y: event.clientY - bounds.top - 30,
      }

      const newNode: K8sNode = {
        id: `node-${nodeIdCounter}`,
        type: 'k8s',
        position,
        data: {
          label: `${componentType}-${nodeIdCounter}`,
          componentType,
          status: 'neutral',
        },
      }

      setNodes((nds) => [...nds, newNode])
      setNodeIdCounter((prev) => prev + 1)
    },
    [nodeIdCounter, setNodes]
  )

  const validateSolution = useCallback(() => {
    const newFeedback: string[] = []
    let allCorrect = true

    // Count nodes by type
    const nodeCounts: Record<string, number> = {}
    nodes.forEach((node) => {
      const type = node.data.componentType
      nodeCounts[type] = (nodeCounts[type] || 0) + 1
    })

    // Check expected nodes
    const nodeStatusMap = new Map<string, 'correct' | 'incorrect'>()

    expectedNodes.forEach(({ type, count }) => {
      const actual = nodeCounts[type] || 0
      if (actual === count) {
        newFeedback.push(`${type}: ${actual}/${count} korrekt`)
      } else {
        newFeedback.push(`${type}: ${actual}/${count} (erwartet: ${count})`)
        allCorrect = false
      }
    })

    // Mark nodes with status
    const updatedNodes = nodes.map((node) => {
      const type = node.data.componentType
      const expected = expectedNodes.find((e) => e.type === type)
      const actualCount = nodeCounts[type] || 0

      let status: 'correct' | 'incorrect' | 'neutral' = 'neutral'
      if (expected) {
        status = actualCount <= expected.count ? 'correct' : 'incorrect'
      } else {
        status = 'incorrect'
        if (!nodeStatusMap.has(type)) {
          newFeedback.push(`${type}: unerwartete Komponente`)
          nodeStatusMap.set(type, 'incorrect')
          allCorrect = false
        }
      }

      return {
        ...node,
        data: { ...node.data, status },
      }
    })

    setNodes(updatedNodes)
    setFeedback(newFeedback)
    setIsCorrect(allCorrect)
    setShowResult(true)
    onComplete(allCorrect)
  }, [nodes, expectedNodes, setNodes, onComplete])

  const showSolution = useCallback(() => {
    // Clear existing nodes
    setNodes([])
    setEdges([])

    // Create solution nodes
    const solutionNodes: K8sNode[] = []
    let id = 1
    let yOffset = 50

    expectedNodes.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        solutionNodes.push({
          id: `solution-${id}`,
          type: 'k8s',
          position: { x: 150 + (i * 150), y: yOffset },
          data: {
            label: `${type}-${i + 1}`,
            componentType: type,
            status: 'correct',
          },
        })
        id++
      }
      yOffset += 120
    })

    setNodes(solutionNodes)

    // Create solution edges based on expected edges
    const solutionEdges: Edge[] = expectedEdges.map((edge, index) => {
      // Find matching nodes for edge
      const sourceNode = solutionNodes.find((n) => n.data.componentType === edge.from)
      const targetNode = solutionNodes.find((n) => n.data.componentType === edge.to)

      return {
        id: `solution-edge-${index}`,
        source: sourceNode?.id || '',
        target: targetNode?.id || '',
        style: { stroke: '#22c55e', strokeWidth: 2 },
        animated: true,
      }
    }).filter((e) => e.source && e.target)

    setEdges(solutionEdges)
    setShowResult(true)
    setIsCorrect(false)
    setFeedback(['Loesung angezeigt'])
    onComplete(false)
  }, [expectedNodes, expectedEdges, setNodes, setEdges, onComplete])

  const reset = useCallback(() => {
    setNodes([])
    setEdges([])
    setShowResult(false)
    setFeedback([])
    setNodeIdCounter(1)
  }, [setNodes, setEdges])

  // Memoize flow options
  const flowOptions = useMemo(() => ({
    fitView: true,
    fitViewOptions: { padding: 0.2 },
    minZoom: 0.5,
    maxZoom: 2,
    proOptions: { hideAttribution: true },
  }), [])

  return (
    <div className="space-y-4">
      {/* Manifest Display */}
      <Card className="p-4">
        <h4 className="text-sm font-medium text-slate-400 mb-2">
          Kubernetes Manifest:
        </h4>
        <pre className="bg-slate-900 p-3 rounded-lg text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre">
          {manifest}
        </pre>
        <p className="text-sm text-slate-400 mt-3">
          Baue das Diagramm, das dieses Manifest erzeugt.
        </p>
      </Card>

      {/* Builder Area */}
      <div className="flex gap-4">
        {/* Toolbox */}
        <ComponentToolbox availableComponents={availableComponents} />

        {/* Canvas */}
        <div
          ref={reactFlowWrapper}
          className="flex-1 h-96 bg-slate-900 rounded-xl border border-slate-700"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            {...flowOptions}
          >
            <Background color="#334155" gap={20} size={1} />
            <Controls
              className="!bg-slate-800 !border-slate-700 !rounded-lg !shadow-lg [&>button]:!bg-slate-800 [&>button]:!border-slate-700 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <Card
          className={`p-4 ${
            isCorrect
              ? 'bg-green-900/20 border-green-700'
              : 'bg-amber-900/20 border-amber-700'
          }`}
        >
          <div className="font-medium mb-2">
            {isCorrect ? 'Richtig!' : 'Ergebnis:'}
          </div>
          <ul className="text-sm text-slate-300 space-y-1">
            {feedback.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={validateSolution} disabled={nodes.length === 0}>
          Pruefen
        </Button>
        <Button variant="secondary" onClick={showSolution}>
          Loesung zeigen
        </Button>
        <Button variant="ghost" onClick={reset}>
          Zuruecksetzen
        </Button>
      </div>
    </div>
  )
}
