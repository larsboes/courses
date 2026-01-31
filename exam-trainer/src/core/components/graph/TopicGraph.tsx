// src/core/components/graph/TopicGraph.tsx
import { useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ReactFlow,
  Background,
  Controls,
  type Edge,
  type NodeTypes,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import type { Topic, CourseProgress } from '@/core/types/content'
import { TopicNode, type TopicNodeType } from './TopicNode'

interface TopicGraphProps {
  topics: Topic[]
  progress: CourseProgress
}

// Node positions by topic ID - organized in logical groups
const nodePositions: Record<string, { x: number; y: number }> = {
  // Foundation (x=0)
  http: { x: 0, y: 0 },
  json: { x: 0, y: 120 },

  // Frontend (x=300)
  html: { x: 300, y: 0 },
  css: { x: 300, y: 120 },
  'javascript-dom': { x: 300, y: 240 },
  'browser-rendering': { x: 300, y: 360 },

  // Backend (x=600)
  rest: { x: 600, y: 0 },
  'docker-basics': { x: 600, y: 120 },
  'kubernetes-begriffe': { x: 600, y: 240 },
  'kubernetes-manifests': { x: 600, y: 360 },
  'kubernetes-netzwerk': { x: 600, y: 480 },
  'dns-tls': { x: 600, y: 600 },

  // Capstone (x=300, bottom)
  'playlist-app': { x: 300, y: 550 },
}

const nodeTypes: NodeTypes = {
  topic: TopicNode,
}

export function TopicGraph({ topics, progress }: TopicGraphProps) {
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()

  const nodes = useMemo((): TopicNodeType[] => {
    return topics.map((topic) => {
      const position = nodePositions[topic.id] ?? { x: 0, y: 0 }
      return {
        id: topic.id,
        type: 'topic' as const,
        position,
        data: {
          id: topic.id,
          title: topic.title,
          description: topic.description,
          examNotes: topic.examNotes,
          progress: progress.topics[topic.id],
        },
      }
    })
  }, [topics, progress])

  const edges: Edge[] = useMemo(() => {
    const edgeList: Edge[] = []
    const seenPairs = new Set<string>()

    topics.forEach((topic) => {
      topic.relatedTopics?.forEach((related) => {
        // Only create edges for topics that exist in the graph
        const targetExists = topics.some((t) => t.id === related.id)
        if (!targetExists) return

        // Avoid duplicate edges (A->B and B->A should only show once)
        const pairKey = [topic.id, related.id].sort().join('-')
        if (seenPairs.has(pairKey)) return
        seenPairs.add(pairKey)

        edgeList.push({
          id: `${topic.id}-${related.id}`,
          source: topic.id,
          target: related.id,
          animated: true,
          style: {
            stroke: '#475569',
            strokeWidth: 1,
            strokeDasharray: '5 5',
          },
        })
      })
    })

    return edgeList
  }, [topics])

  const onNodeClick: NodeMouseHandler<TopicNodeType> = useCallback(
    (_event, node) => {
      if (courseId) {
        navigate(`/course/${courseId}/topic/${node.id}`)
      }
    },
    [courseId, navigate]
  )

  return (
    <div className="w-full h-[600px] bg-slate-900 rounded-xl border border-slate-700">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5,
        }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'default',
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls
          className="!bg-slate-800 !border-slate-700 !rounded-lg !shadow-lg [&>button]:!bg-slate-800 [&>button]:!border-slate-700 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  )
}
