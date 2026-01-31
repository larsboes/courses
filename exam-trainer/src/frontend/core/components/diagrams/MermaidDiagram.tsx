// src/core/components/diagrams/MermaidDiagram.tsx
import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#1e40af',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    lineColor: '#64748b',
    textColor: '#f8fafc',
    mainBkg: '#1e293b',
    nodeBorder: '#3b82f6',
    clusterBkg: '#1e293b',
    clusterBorder: '#475569',
    titleColor: '#f8fafc',
    edgeLabelBackground: '#1e293b',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
})

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return

      try {
        const id = `mermaid-${Math.random().toString(36).substring(7)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render diagram')
        console.error('Mermaid render error:', err)
      }
    }

    renderChart()
  }, [chart])

  if (error) {
    return (
      <div className={`p-4 bg-red-900/20 border border-red-700 rounded-lg ${className}`}>
        <div className="text-red-400 text-sm">Diagram error: {error}</div>
        <pre className="mt-2 text-xs text-slate-400 overflow-auto">{chart}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`flex justify-center overflow-auto ${className}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid output is trusted
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
