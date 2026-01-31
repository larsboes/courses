// src/core/components/graph/TopicNode.tsx
import { memo } from 'react'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import type { TopicProgress } from '@/core/types/content'

export type TopicNodeData = {
  id: string
  title: string
  description: string
  examNotes?: string
  progress?: TopicProgress
}

export type TopicNodeType = Node<TopicNodeData, 'topic'>

function getBorderColor(progress?: TopicProgress): string {
  if (!progress) return 'border-slate-600'
  if (progress.completed) return 'border-green-500'
  if (progress.sectionsViewed.length > 0 || progress.quiz) return 'border-blue-500'
  return 'border-slate-600'
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

function TopicNodeComponent({ data }: NodeProps<TopicNodeType>) {
  const borderColor = getBorderColor(data.progress)
  const quizScore = data.progress?.quiz
    ? `${data.progress.quiz.bestScore}/${data.progress.quiz.totalQuestions}`
    : null

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-500 !w-2 !h-2 !border-0"
      />
      <div
        className={`
          bg-slate-800 rounded-lg border-2 ${borderColor}
          p-3 w-48 cursor-pointer
          hover:bg-slate-750 transition-colors
          shadow-lg
        `}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-slate-50 leading-tight">
            {data.title}
          </h3>
          {data.progress?.completed && (
            <span className="text-green-400 text-xs shrink-0">ok</span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {truncate(data.description, 60)}
        </p>
        <div className="flex gap-1.5 flex-wrap mt-2">
          {data.examNotes && (
            <span className="text-[10px] px-1.5 py-0.5 bg-amber-900/50 text-amber-300 rounded">
              {data.examNotes}
            </span>
          )}
          {quizScore && (
            <span className="text-[10px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded">
              {quizScore}
            </span>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-500 !w-2 !h-2 !border-0"
      />
    </>
  )
}

export const TopicNode = memo(TopicNodeComponent)
