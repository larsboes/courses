// src/content/web-technologies/diagrams/DockerLayerExplorer.tsx
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DiagramShell, StepNavigator, ChallengeBanner, ChallengeResult } from '@/core/components/diagrams'
import { useStepNavigator, useChallengeMode } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'
import type { Challenge } from '@/core/hooks'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface DockerLayer {
  instruction: string
  description: string
  size: string
  cached: boolean
  /** Index from which cache is invalidated when this layer's source changes */
  invalidatesFrom?: number
}

interface Dockerfile {
  id: string
  label: string
  title: string
  layers: DockerLayer[]
  /** Which file was changed (for cache visualization) */
  changedFile?: string
}

interface LayerChallenge extends Challenge {
  /** Indices of layers that should be selected as "rebuilt" */
  correctLayers: number[]
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

const dockerfiles: Dockerfile[] = [
  {
    id: 'python-app',
    label: 'Python Flask App',
    title: 'Python Flask App (optimiert)',
    layers: [
      { instruction: 'FROM python:3.11-slim', description: 'Base Image mit Python Runtime', size: '150MB', cached: true },
      { instruction: 'WORKDIR /app', description: 'Arbeitsverzeichnis setzen', size: '0B', cached: true },
      { instruction: 'COPY requirements.txt .', description: 'Nur Dependency-Datei kopieren', size: '2KB', cached: true },
      { instruction: 'RUN pip install -r requirements.txt', description: 'Dependencies installieren', size: '45MB', cached: true },
      { instruction: 'COPY . .', description: 'Restlichen Source Code kopieren', size: '50KB', cached: true },
      { instruction: 'EXPOSE 5000', description: 'Port dokumentieren', size: '0B', cached: true },
      { instruction: 'CMD ["python", "app.py"]', description: 'Startbefehl', size: '0B', cached: true },
    ],
  },
  {
    id: 'node-app',
    label: 'Node.js App',
    title: 'Node.js Express App (optimiert)',
    layers: [
      { instruction: 'FROM node:20-alpine', description: 'Base Image mit Node.js', size: '180MB', cached: true },
      { instruction: 'WORKDIR /app', description: 'Arbeitsverzeichnis setzen', size: '0B', cached: true },
      { instruction: 'COPY package.json package-lock.json ./', description: 'Package-Dateien zuerst kopieren', size: '5KB', cached: true },
      { instruction: 'RUN npm ci', description: 'Dependencies installieren (clean install)', size: '120MB', cached: true },
      { instruction: 'COPY . .', description: 'Source Code kopieren', size: '80KB', cached: true },
      { instruction: 'RUN npm run build', description: 'TypeScript kompilieren', size: '15MB', cached: true },
      { instruction: 'EXPOSE 3000', description: 'Port dokumentieren', size: '0B', cached: true },
      { instruction: 'CMD ["node", "dist/server.js"]', description: 'Startbefehl', size: '0B', cached: true },
    ],
  },
  {
    id: 'bad-dockerfile',
    label: 'Schlecht (Anti-Pattern)',
    title: 'Schlecht optimiertes Dockerfile',
    layers: [
      { instruction: 'FROM python:3.11', description: 'Vollstaendiges Python Image (nicht slim!)', size: '900MB', cached: true },
      { instruction: 'WORKDIR /app', description: 'Arbeitsverzeichnis setzen', size: '0B', cached: true },
      { instruction: 'COPY . .', description: 'ALLES auf einmal kopieren (schlecht!)', size: '50KB', cached: true },
      { instruction: 'RUN pip install -r requirements.txt', description: 'Dependencies nach Code-Kopie (nie gecacht!)', size: '45MB', cached: true },
      { instruction: 'CMD ["python", "app.py"]', description: 'Startbefehl', size: '0B', cached: true },
    ],
  },
]

const challenges: LayerChallenge[] = [
  {
    id: 'change-app-py',
    title: 'Challenge 1: app.py geaendert',
    description: 'Du aenderst app.py. Welche Layer muessen neu gebaut werden? (Klicke auf die betroffenen Layer)',
    targetValue: 'COPY . . und alle danach',
    correctLayers: [4, 5, 6], // COPY . ., EXPOSE, CMD in python-app
  },
  {
    id: 'change-requirements',
    title: 'Challenge 2: requirements.txt geaendert',
    description: 'Du aktualisierst requirements.txt. Welche Layer muessen neu gebaut werden?',
    targetValue: 'COPY requirements.txt, RUN pip install, und alle danach',
    correctLayers: [2, 3, 4, 5, 6], // From COPY requirements.txt onward
  },
  {
    id: 'best-practice',
    title: 'Challenge 3: Best Practice',
    description: 'Warum ist COPY package.json vor COPY . eine Best Practice? Wechsle zum Node.js Beispiel und klicke auf den Layer, der dadurch gecacht bleibt.',
    targetValue: 'npm ci Layer bleibt gecacht wenn nur Source Code sich aendert',
    correctLayers: [3], // RUN npm ci stays cached
  },
]

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

const layerColors = [
  highlightColors.blue,
  highlightColors.cyan,
  highlightColors.green,
  highlightColors.amber,
  highlightColors.purple,
  highlightColors.red,
  highlightColors.blue,
  highlightColors.cyan,
]

interface LayerBlockProps {
  layer: DockerLayer
  index: number
  visible: boolean
  cacheInvalidatedFrom: number | null
  isSelectable: boolean
  isSelected: boolean
  onSelect: (index: number) => void
}

function LayerBlock({
  layer,
  index,
  visible,
  cacheInvalidatedFrom,
  isSelectable,
  isSelected,
  onSelect,
}: LayerBlockProps) {
  const colorTokens = layerColors[index % layerColors.length]
  const isCached = cacheInvalidatedFrom === null || index < cacheInvalidatedFrom
  const isRebuilt = cacheInvalidatedFrom !== null && index >= cacheInvalidatedFrom

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scaleY: 0 }}
      animate={visible ? { opacity: 1, x: 0, scaleY: 1 } : { opacity: 0, x: -30, scaleY: 0 }}
      transition={{ duration: 0.4, delay: visible ? index * 0.15 : 0 }}
      className={`
        relative rounded-lg border-2 p-3 cursor-pointer transition-all
        ${isSelectable ? 'hover:ring-2 hover:ring-blue-400' : ''}
        ${isSelected ? 'ring-2 ring-amber-400 border-amber-500' : ''}
        ${isRebuilt && !isSelectable ? 'border-red-500 bg-red-900/20' : ''}
        ${isCached && !isRebuilt && !isSelectable ? 'border-green-500 bg-green-900/10' : ''}
        ${!isRebuilt && !isCached ? colorTokens.border + ' ' + colorTokens.bg : ''}
        ${isSelectable && !isSelected ? colorTokens.border + ' ' + colorTokens.bg : ''}
      `}
      onClick={() => isSelectable && onSelect(index)}
      style={{ originY: 1 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">L{index + 1}</span>
            <code className="text-sm font-mono text-slate-100 truncate">{layer.instruction}</code>
          </div>
          <p className="text-xs text-slate-400 mt-1">{layer.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-slate-500 font-mono">{layer.size}</span>
          {cacheInvalidatedFrom !== null && (
            <span className={`text-lg ${isCached ? 'text-green-400' : 'text-red-400'}`}>
              {isCached ? '\u2713' : '\u2717'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function DockerLayerExplorer({ className }: DiagramProps) {
  const [currentDockerfile, setCurrentDockerfile] = useState(0)
  const [selectedLayers, setSelectedLayers] = useState<Set<number>>(new Set())
  const [cacheInvalidatedFrom, setCacheInvalidatedFrom] = useState<number | null>(null)

  const dockerfile = dockerfiles[currentDockerfile]
  const totalLayers = dockerfile.layers.length

  const stepper = useStepNavigator({
    totalSteps: totalLayers,
    autoPlayInterval: 800,
  })

  const resetState = useCallback(() => {
    setSelectedLayers(new Set())
    setCacheInvalidatedFrom(null)
  }, [])

  const challenge = useChallengeMode<LayerChallenge>({
    challenges,
    onCheck: (ch) => {
      const correctSet = new Set(ch.correctLayers)
      if (selectedLayers.size !== correctSet.size) return false
      for (const idx of selectedLayers) {
        if (!correctSet.has(idx)) return false
      }
      return true
    },
    onReset: resetState,
  })

  const handleDockerfileChange = (id: string) => {
    const idx = dockerfiles.findIndex(d => d.id === id)
    if (idx >= 0) {
      setCurrentDockerfile(idx)
      stepper.reset()
      resetState()
      challenge.clearResult()
    }
  }

  const handleLayerClick = (index: number) => {
    if (challenge.isActive) {
      setSelectedLayers(prev => {
        const next = new Set(prev)
        if (next.has(index)) {
          next.delete(index)
        } else {
          next.add(index)
        }
        return next
      })
    } else {
      // Non-challenge mode: simulate cache invalidation from this layer
      setCacheInvalidatedFrom(prev => prev === index ? null : index)
    }
  }

  const samples = dockerfiles.map(d => ({ id: d.id, label: d.label }))

  return (
    <DiagramShell
      title="Docker Layer Explorer"
      subtitle={dockerfile.title}
      className={className}
      samples={samples}
      currentSample={dockerfile.id}
      onSampleChange={handleDockerfileChange}
      actions={
        <Button
          variant={challenge.isActive ? 'primary' : 'secondary'}
          size="sm"
          onClick={challenge.toggle}
        >
          {challenge.isActive ? 'Challenge AN' : 'Challenge'}
        </Button>
      }
      footer={
        <div className="space-y-2">
          <p>
            <strong className="text-slate-400">Layer Caching:</strong> Docker cached jeden Layer.
            Aendert sich ein Layer, werden alle nachfolgenden Layer ebenfalls neu gebaut.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <span className="text-green-400">{'\u2713'}</span>
              <span className="text-slate-400">Gecacht</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-red-400">{'\u2717'}</span>
              <span className="text-slate-400">Muss neu gebaut werden</span>
            </span>
          </div>
        </div>
      }
    >
      {/* Challenge Banner */}
      <ChallengeBanner
        challenge={challenge}
        challenges={challenges}
        showTargetValue={false}
      />

      {/* Dockerfile Source */}
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
        <div className="text-xs text-slate-500 mb-2 font-mono"># Dockerfile</div>
        <pre className="font-mono text-sm space-y-0.5">
          {dockerfile.layers.map((layer, i) => {
            const isVisible = i <= stepper.currentStep
            const parts = layer.instruction.split(' ')
            const keyword = parts[0]
            const rest = parts.slice(1).join(' ')
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className={`
                  ${cacheInvalidatedFrom !== null && i >= cacheInvalidatedFrom ? 'text-red-300' : ''}
                  ${selectedLayers.has(i) ? 'bg-amber-900/30 rounded px-1 -mx-1' : ''}
                `}
              >
                <span className="text-purple-400">{keyword} </span>
                <span className="text-amber-300">{rest}</span>
              </motion.div>
            )
          })}
        </pre>
      </div>

      {/* Layer Stack Visualization */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-400">
          Image Layers ({stepper.currentStep + 1}/{totalLayers})
          {!challenge.isActive && (
            <span className="text-xs text-slate-500 ml-2">
              (Klicke einen Layer um Cache-Invalidierung zu simulieren)
            </span>
          )}
        </div>
        <div className="flex flex-col-reverse gap-2">
          {dockerfile.layers.map((layer, i) => (
            <LayerBlock
              key={`${dockerfile.id}-${i}`}
              layer={layer}
              index={i}
              visible={i <= stepper.currentStep}
              cacheInvalidatedFrom={cacheInvalidatedFrom}
              isSelectable={challenge.isActive || !challenge.isActive}
              isSelected={selectedLayers.has(i)}
              onSelect={handleLayerClick}
            />
          ))}
        </div>
      </div>

      {/* Challenge: Check Answer Button */}
      {challenge.isActive && selectedLayers.size > 0 && !challenge.result && (
        <div className="flex justify-center">
          <Button variant="primary" onClick={challenge.check}>
            Antwort pruefen ({selectedLayers.size} Layer ausgewaehlt)
          </Button>
        </div>
      )}

      {/* Challenge Result */}
      <ChallengeResult
        challenge={challenge}
        hint={challenge.current.targetValue}
        successMessage="Richtig! Du verstehst Docker Layer Caching."
        failMessage="Nicht ganz richtig. Denke daran: Aendert sich ein Layer, werden ALLE nachfolgenden Layer ebenfalls neu gebaut."
      />

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="numbers" />
    </DiagramShell>
  )
}
