// src/core/components/quiz/DomTreeBuilder.tsx
import { useState } from 'react'
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
              {connecting ? 'Wähle Kind...' : 'Verbinden'}
            </Button>
            <Button
              onClick={deleteNode}
              disabled={!selectedNode}
              className="w-full text-sm bg-red-900/30 border-red-700"
            >
              Löschen
            </Button>
            <Button onClick={clear} className="w-full text-sm">
              Zurücksetzen
            </Button>
          </div>
        </div>
      </div>

      {!showResult && (
        <Button onClick={checkAnswer} className="w-full" disabled={nodes.length === 0}>
          Antwort prüfen
        </Button>
      )}

      {showResult && (
        <Card className={`p-4 ${isCorrect ? 'bg-green-900/20 border-green-700' : 'bg-amber-900/20 border-amber-700'}`}>
          <div className="font-medium">
            {isCorrect ? 'Richtig! Die DOM-Struktur stimmt.' : 'Prüfe die Struktur nochmal.'}
          </div>
          <div className="text-sm text-slate-300 mt-1">
            Erwartete Elemente: {expectedStructure.map(e => e.type).join(', ')}
          </div>
        </Card>
      )}
    </div>
  )
}
