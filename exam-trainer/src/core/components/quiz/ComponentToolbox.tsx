// src/core/components/quiz/ComponentToolbox.tsx
import { DragEvent } from 'react'

interface ComponentToolboxProps {
  availableComponents: string[]
}

// K8s component icons (simple SVG representations)
const componentIcons: Record<string, string> = {
  Pod: 'P',
  Service: 'S',
  Node: 'N',
  Container: 'C',
  Deployment: 'D',
  ReplicaSet: 'RS',
}

const componentColors: Record<string, string> = {
  Pod: 'bg-blue-600 border-blue-500',
  Service: 'bg-green-600 border-green-500',
  Node: 'bg-slate-600 border-slate-500',
  Container: 'bg-purple-600 border-purple-500',
  Deployment: 'bg-amber-600 border-amber-500',
  ReplicaSet: 'bg-cyan-600 border-cyan-500',
}

export function ComponentToolbox({ availableComponents }: ComponentToolboxProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, componentType: string) => {
    event.dataTransfer.setData('application/k8s-component', componentType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-40 bg-slate-800/50 rounded-lg border border-slate-700 p-3">
      <h3 className="text-sm font-medium text-slate-300 mb-3">Komponenten</h3>
      <div className="space-y-2">
        {availableComponents.map((component) => (
          <div
            key={component}
            draggable
            onDragStart={(e) => onDragStart(e, component)}
            className={`
              flex items-center gap-2 p-2 rounded-lg border-2 cursor-grab
              ${componentColors[component] || 'bg-slate-700 border-slate-600'}
              hover:brightness-110 transition-all
              active:cursor-grabbing
            `}
          >
            <div className="w-8 h-8 flex items-center justify-center bg-black/20 rounded font-mono text-sm font-bold">
              {componentIcons[component] || component[0]}
            </div>
            <span className="text-sm font-medium">{component}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Ziehe Komponenten auf die Zeichenflaeche
      </p>
    </div>
  )
}
