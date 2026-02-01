// src/content/web-technologies/diagrams/RenderingPipelineStepper.tsx
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface DomNode {
  tag: string
  id?: string
  className?: string
  textContent?: string
  children?: DomNode[]
  styles?: Record<string, string>
  inRenderTree?: boolean
}

interface CssRule {
  selector: string
  properties: Record<string, string>
}

interface PipelineStep {
  id: string
  title: string
  description: string
  blockedBy?: string[]
}

interface Example {
  id: string
  title: string
  html: string
  css: string
  blockers: string[]
}

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'html-parse',
    title: '1. HTML Parsing',
    description: 'Browser liest HTML und baut den DOM-Baum auf. Jedes Element wird ein Knoten.',
  },
  {
    id: 'css-parse',
    title: '2. CSS Parsing',
    description: 'Parallel wird CSS geparst und der CSSOM (CSS Object Model) erstellt.',
  },
  {
    id: 'render-tree',
    title: '3. Render Tree',
    description: 'DOM und CSSOM werden kombiniert. Nur sichtbare Elemente sind enthalten (kein display:none, kein head).',
  },
  {
    id: 'layout',
    title: '4. Layout (Reflow)',
    description: 'Position und Größe jedes Elements wird berechnet basierend auf Viewport und CSS.',
  },
  {
    id: 'paint',
    title: '5. Paint (FMP)',
    description: 'Pixel werden gezeichnet. First Meaningful Paint - der Nutzer sieht endlich Inhalte!',
  },
]

const EXAMPLES: Example[] = [
  {
    id: 'basic',
    title: 'Einfache Seite',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello World</h1>
  <p>Welcome to the page!</p>
</body>
</html>`,
    css: `h1 {
  color: blue;
  font-size: 24px;
}
p {
  color: gray;
  margin: 10px 0;
}`,
    blockers: ['link[rel="stylesheet"]'],
  },
  {
    id: 'hidden',
    title: 'Mit display:none',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hidden Elements</title>
</head>
<body>
  <header>
    <h1>Visible Title</h1>
  </header>
  <div class="hidden">Hidden Content</div>
  <main>
    <p>Main content here</p>
  </main>
</body>
</html>`,
    css: `header {
  background: #333;
  color: white;
}
.hidden {
  display: none;
}
main {
  padding: 20px;
}`,
    blockers: [],
  },
  {
    id: 'script-blocking',
    title: 'Mit Script-Blocking',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Script Blocking</title>
  <script src="analytics.js"></script>
</head>
<body>
  <h1>Dashboard</h1>
  <script>
    // Inline script
    console.log('loaded');
  </script>
  <p>Content after script</p>
</body>
</html>`,
    css: `h1 { color: navy; }
p { font-size: 14px; }`,
    blockers: ['script[src]', 'script (inline)'],
  },
]

// ─────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────

function parseSimpleHtml(html: string): DomNode[] {
  const nodes: DomNode[] = []

  // Very simple regex-based parser for demo purposes
  const tagRegex = /<(\w+)([^>]*)>([^<]*)<\/\1>|<(\w+)([^>]*)\/?>(?!<\/)/g
  let match

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[1] || match[4]
    const attrs = match[2] || match[5] || ''
    const content = match[3] || ''

    if (['!DOCTYPE', 'meta', 'link', 'br', 'hr', 'img'].includes(tag)) continue

    const node: DomNode = { tag }

    // Extract id and class
    const idMatch = attrs.match(/id="([^"]*)"/)
    const classMatch = attrs.match(/class="([^"]*)"/)
    if (idMatch) node.id = idMatch[1]
    if (classMatch) node.className = classMatch[1]
    if (content.trim()) node.textContent = content.trim()

    nodes.push(node)
  }

  return nodes
}

function parseCss(css: string): CssRule[] {
  const rules: CssRule[] = []
  const ruleRegex = /([^{]+)\s*\{([^}]+)\}/g
  let match

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim()
    const propsStr = match[2].trim()
    const properties: Record<string, string> = {}

    propsStr.split(';').forEach(prop => {
      const [key, value] = prop.split(':').map(s => s.trim())
      if (key && value) {
        properties[key] = value
      }
    })

    rules.push({ selector, properties })
  }

  return rules
}

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

function DomTreeView({ nodes, title }: { nodes: DomNode[]; title: string }) {
  const renderNode = (node: DomNode, depth: number = 0): React.ReactElement => (
    <div key={`${node.tag}-${depth}`} style={{ marginLeft: depth * 16 }} className="py-0.5">
      <span className="text-cyan-400">&lt;{node.tag}</span>
      {node.id && <span className="text-amber-400"> id="{node.id}"</span>}
      {node.className && <span className="text-purple-400"> class="{node.className}"</span>}
      <span className="text-cyan-400">&gt;</span>
      {node.textContent && (
        <span className="text-slate-400 ml-1">"{node.textContent}"</span>
      )}
      {node.inRenderTree === false && (
        <span className="text-red-400 text-xs ml-2">(nicht im Render Tree)</span>
      )}
      {node.children?.map((child) => renderNode(child, depth + 1))}
    </div>
  )

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-slate-400">{title}</div>
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm overflow-auto max-h-[200px]">
        {nodes.map((node) => renderNode(node, 0))}
      </div>
    </div>
  )
}

function CssomView({ rules }: { rules: CssRule[] }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-slate-400">CSSOM</div>
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm overflow-auto max-h-[200px]">
        {rules.map((rule, i) => (
          <div key={i} className="mb-2">
            <span className="text-purple-400">{rule.selector}</span>
            <span className="text-slate-500"> {'{'}</span>
            {Object.entries(rule.properties).map(([key, value], j) => (
              <div key={j} className="ml-4">
                <span className="text-cyan-400">{key}</span>
                <span className="text-slate-500">: </span>
                <span className="text-amber-400">{value}</span>
                <span className="text-slate-500">;</span>
              </div>
            ))}
            <span className="text-slate-500">{'}'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LayoutView({ nodes, cssRules }: { nodes: DomNode[]; cssRules: CssRule[] }) {
  // Simulate box model calculations
  const boxes = nodes
    .filter(n => !['html', 'head', 'title', 'script', 'style', 'link'].includes(n.tag))
    .filter(n => {
      // Check if hidden by CSS
      const rule = cssRules.find(r =>
        r.selector === `.${n.className}` || r.selector === n.tag
      )
      return rule?.properties['display'] !== 'none'
    })
    .map((node, i) => ({
      ...node,
      box: {
        width: node.tag === 'body' ? '100%' : node.tag.startsWith('h') ? '100%' : 'auto',
        height: 'auto',
        x: 0,
        y: i * 40,
      },
    }))

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-slate-400">Layout Berechnung</div>
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 space-y-2">
        {boxes.map((box, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2 rounded border border-slate-700 bg-slate-800/50"
          >
            <span className="text-cyan-400 font-mono text-sm">&lt;{box.tag}&gt;</span>
            <span className="text-slate-400 text-xs">
              width: {box.box.width}, height: {box.box.height}
            </span>
            <span className="text-slate-500 text-xs ml-auto">
              position: ({box.box.x}, {box.box.y})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaintPreview({ nodes, cssRules }: { nodes: DomNode[]; cssRules: CssRule[] }) {
  const getStyles = (node: DomNode): React.CSSProperties => {
    const styles: React.CSSProperties = {}
    const rules = cssRules.filter(r =>
      r.selector === node.tag ||
      r.selector === `.${node.className}` ||
      r.selector === `#${node.id}`
    )
    rules.forEach(rule => {
      if (rule.properties['color']) styles.color = rule.properties['color']
      if (rule.properties['background']) styles.background = rule.properties['background']
      if (rule.properties['font-size']) styles.fontSize = rule.properties['font-size']
      if (rule.properties['padding']) styles.padding = rule.properties['padding']
      if (rule.properties['margin']) styles.margin = rule.properties['margin']
    })
    return styles
  }

  const visibleNodes = nodes.filter(n => {
    if (['html', 'head', 'title', 'script', 'style', 'link', 'meta'].includes(n.tag)) return false
    const rule = cssRules.find(r => r.selector === `.${n.className}`)
    return rule?.properties['display'] !== 'none'
  })

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-slate-400">Paint Preview (FMP)</div>
      <div className="p-4 rounded-lg bg-white min-h-[150px]">
        {visibleNodes.map((node, i) => {
          if (node.tag === 'body') return null
          const styles = getStyles(node)

          return React.createElement(
            node.tag,
            { key: i, style: styles, className: 'mb-2' },
            node.textContent || node.tag
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function RenderingPipelineStepper({ className }: DiagramProps) {
  const [currentExample, setCurrentExample] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const example = EXAMPLES[currentExample]
  const step = PIPELINE_STEPS[currentStep]

  // Parse HTML and CSS
  const domNodes = useMemo(() => parseSimpleHtml(example.html), [example.html])
  const cssRules = useMemo(() => parseCss(example.css), [example.css])

  // Navigation
  const nextStep = () => {
    if (currentStep < PIPELINE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setIsAnimating(false)
  }

  // Auto-play through steps
  const autoPlay = () => {
    setIsAnimating(true)
    setCurrentStep(0)

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setTimeout(() => {
        setCurrentStep(i)
        if (i === PIPELINE_STEPS.length - 1) {
          setIsAnimating(false)
        }
      }, (i + 1) * 1500)
    }
  }

  const samples = EXAMPLES.map((ex, i) => ({ id: String(i), label: ex.title }))

  return (
    <DiagramShell
      title="Browser Rendering Pipeline"
      subtitle="Schritt fur Schritt vom HTML zum Paint"
      className={className}
      samples={samples}
      currentSample={String(currentExample)}
      onSampleChange={(id) => {
        setCurrentExample(Number(id))
        reset()
      }}
      actions={
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      }
      footer={
        <p>
          <strong className="text-slate-400">Render-Blocking:</strong> CSS und sync Scripts blockieren das Rendering.
          Async/defer fur Scripts, kritisches CSS inline laden.
        </p>
      }
    >
      {/* Pipeline Steps Progress */}
        <div className="flex items-center gap-2">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <motion.div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer
                  ${i === currentStep
                    ? 'bg-blue-600 text-white'
                    : i < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400'}
                `}
                onClick={() => !isAnimating && setCurrentStep(i)}
                whileHover={{ scale: 1.1 }}
                animate={{
                  backgroundColor: i === currentStep ? '#2563eb' : i < currentStep ? '#16a34a' : '#334155',
                }}
              >
                {i < currentStep ? '✓' : i + 1}
              </motion.div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div
                  className={`w-8 h-1 ${i < currentStep ? 'bg-green-600' : 'bg-slate-700'}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Info */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-blue-900/20 border border-blue-700/50"
        >
          <h4 className="text-lg font-semibold text-blue-300">{step.title}</h4>
          <p className="text-slate-300 mt-1">{step.description}</p>

          {/* Render-blocking warning */}
          {currentStep < 2 && example.blockers.length > 0 && (
            <div className="mt-3 p-2 rounded bg-amber-900/30 border border-amber-700/50">
              <span className="text-amber-400 text-sm">⚠️ Render-blocking resources:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {example.blockers.map((blocker, i) => (
                  <code key={i} className="text-xs bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                    {blocker}
                  </code>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Content based on current step */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Source code */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400">HTML</div>
              <pre className={`
                p-3 rounded-lg bg-slate-900 border font-mono text-sm overflow-auto max-h-[250px]
                ${currentStep === 0 ? 'border-blue-500' : 'border-slate-700'}
              `}>
                <code className="text-slate-300">{example.html}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400">CSS</div>
              <pre className={`
                p-3 rounded-lg bg-slate-900 border font-mono text-sm overflow-auto max-h-[150px]
                ${currentStep === 1 ? 'border-blue-500' : 'border-slate-700'}
              `}>
                <code className="text-slate-300">{example.css}</code>
              </pre>
            </div>
          </div>

          {/* Right: Step visualization */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="dom"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DomTreeView nodes={domNodes} title="DOM Tree" />
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="cssom"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <CssomView rules={cssRules} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="render-tree"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-xs font-medium text-slate-400">Render Tree (nur sichtbare Elemente)</div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm">
                    {domNodes
                      .filter(n => !['html', 'head', 'title', 'script', 'style', 'link', 'meta'].includes(n.tag))
                      .map((node, i) => {
                        const isHidden = cssRules.some(r =>
                          r.selector === `.${node.className}` && r.properties['display'] === 'none'
                        )
                        return (
                          <div key={i} className={`py-1 ${isHidden ? 'line-through opacity-50' : ''}`}>
                            <span className={isHidden ? 'text-red-400' : 'text-green-400'}>
                              {isHidden ? '✗' : '✓'}
                            </span>
                            <span className="text-cyan-400 ml-2">&lt;{node.tag}&gt;</span>
                            {node.className && (
                              <span className="text-purple-400">.{node.className}</span>
                            )}
                            {isHidden && (
                              <span className="text-red-400 text-xs ml-2">(display: none)</span>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="layout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <LayoutView nodes={domNodes} cssRules={cssRules} />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="paint"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <PaintPreview nodes={domNodes} cssRules={cssRules} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 0 || isAnimating}
          >
            ← Zurück
          </Button>

          <Button
            variant="ghost"
            onClick={autoPlay}
            disabled={isAnimating}
          >
            ▶ Auto-Play
          </Button>

          <Button
            variant="secondary"
            onClick={nextStep}
            disabled={currentStep === PIPELINE_STEPS.length - 1 || isAnimating}
          >
            Weiter →
          </Button>
        </div>

    </DiagramShell>
  )
}
