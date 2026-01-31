// src/content/web-technologies/diagrams/DomTreeDiagram.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'document',
    label: 'document',
    description: (
      <>
        <p className="mb-2">Das <strong>document</strong>-Objekt ist der Einstiegspunkt zum DOM:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Repräsentiert die gesamte HTML-Seite</li>
          <li>Zugriff via <code className="bg-slate-700 px-1 rounded">document</code> global</li>
          <li>Enthält Methoden wie <code className="bg-slate-700 px-1 rounded">querySelector()</code></li>
          <li>Hat <code className="bg-slate-700 px-1 rounded">document.documentElement</code> als Kind</li>
        </ul>
      </>
    ),
  },
  {
    id: 'html',
    label: '<html>',
    description: (
      <>
        <p className="mb-2">Das <strong>html</strong>-Element ist das Wurzelelement:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Zugriff via <code className="bg-slate-700 px-1 rounded">document.documentElement</code></li>
          <li>Enthält immer <code className="bg-slate-700 px-1 rounded">&lt;head&gt;</code> und <code className="bg-slate-700 px-1 rounded">&lt;body&gt;</code></li>
          <li>Attribute wie <code className="bg-slate-700 px-1 rounded">lang="de"</code> sind hier</li>
        </ul>
      </>
    ),
  },
  {
    id: 'head',
    label: '<head>',
    description: (
      <>
        <p className="mb-2">Der <strong>head</strong>-Bereich enthält Metadaten:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Zugriff via <code className="bg-slate-700 px-1 rounded">document.head</code></li>
          <li>Enthält <code className="bg-slate-700 px-1 rounded">&lt;title&gt;</code>, <code className="bg-slate-700 px-1 rounded">&lt;meta&gt;</code>, <code className="bg-slate-700 px-1 rounded">&lt;link&gt;</code></li>
          <li>Nicht sichtbar auf der Seite</li>
          <li>Wichtig für SEO und Styles</li>
        </ul>
      </>
    ),
  },
  {
    id: 'body',
    label: '<body>',
    description: (
      <>
        <p className="mb-2">Der <strong>body</strong> enthält den sichtbaren Inhalt:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Zugriff via <code className="bg-slate-700 px-1 rounded">document.body</code></li>
          <li>Alle sichtbaren Elemente sind hier</li>
          <li>Event-Handler für Seiten-Events (load, scroll)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'title',
    label: '<title>',
    description: (
      <>
        <p className="mb-2">Das <strong>title</strong>-Element bestimmt den Tab-Titel:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Zugriff via <code className="bg-slate-700 px-1 rounded">document.title</code></li>
          <li>Kann dynamisch geändert werden</li>
          <li>Wichtig für SEO und Bookmarks</li>
        </ul>
      </>
    ),
  },
  {
    id: 'div',
    label: '<div>',
    description: (
      <>
        <p className="mb-2">Ein <strong>div</strong>-Container gruppiert Elemente:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Generischer Block-Container</li>
          <li>Häufig für Layout und Styling verwendet</li>
          <li>Kann beliebig viele Kinder haben</li>
          <li>Mit <code className="bg-slate-700 px-1 rounded">id</code> oder <code className="bg-slate-700 px-1 rounded">class</code> adressierbar</li>
        </ul>
      </>
    ),
  },
  {
    id: 'h1',
    label: '<h1>',
    description: (
      <>
        <p className="mb-2">Eine <strong>h1</strong>-Überschrift ist wichtig für Struktur:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Hauptüberschrift der Seite</li>
          <li>Textinhalt via <code className="bg-slate-700 px-1 rounded">element.textContent</code></li>
          <li>Wichtig für SEO und Zugänglichkeit</li>
          <li>Nur eine h1 pro Seite empfohlen</li>
        </ul>
      </>
    ),
  },
  {
    id: 'p',
    label: '<p>',
    description: (
      <>
        <p className="mb-2">Ein <strong>p</strong>-Element enthält Text:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Block-Element für Absätze</li>
          <li>Kann Inline-Elemente enthalten (a, span, strong)</li>
          <li>Text via <code className="bg-slate-700 px-1 rounded">textContent</code> oder <code className="bg-slate-700 px-1 rounded">innerHTML</code></li>
        </ul>
      </>
    ),
  },
]

interface TreeNodeProps {
  label: string
  isActive: boolean
  onClick: () => void
  x: number
  y: number
  color: string
}

function TreeNode({ label, isActive, onClick, x, y, color }: TreeNodeProps) {
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <motion.rect
        x={x - 45}
        y={y - 15}
        width={90}
        height={30}
        rx={6}
        fill={isActive ? color : '#334155'}
        stroke={isActive ? color : '#475569'}
        strokeWidth={2}
        animate={{
          fill: isActive ? color : '#334155',
          stroke: isActive ? color : '#475569',
        }}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        className="text-xs font-mono pointer-events-none select-none"
        fill={isActive ? '#fff' : '#94a3b8'}
      >
        {label}
      </text>
    </motion.g>
  )
}

function TreeLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#475569"
      strokeWidth={2}
    />
  )
}

export function DomTreeDiagram({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <svg viewBox="0 0 400 300" className="w-full max-w-lg mx-auto">
          {/* Connection lines */}
          {/* document -> html */}
          <TreeLine x1={200} y1={35} x2={200} y2={65} />
          {/* html -> head */}
          <TreeLine x1={200} y1={95} x2={120} y2={125} />
          {/* html -> body */}
          <TreeLine x1={200} y1={95} x2={280} y2={125} />
          {/* head -> title */}
          <TreeLine x1={120} y1={155} x2={120} y2={185} />
          {/* body -> div */}
          <TreeLine x1={280} y1={155} x2={280} y2={185} />
          {/* div -> h1 */}
          <TreeLine x1={280} y1={215} x2={220} y2={245} />
          {/* div -> p */}
          <TreeLine x1={280} y1={215} x2={340} y2={245} />

          {/* Nodes */}
          <TreeNode
            label="document"
            isActive={activeRegion === 'document'}
            onClick={() => setActiveRegion(activeRegion === 'document' ? null : 'document')}
            x={200}
            y={20}
            color="#7c3aed"
          />
          <TreeNode
            label="<html>"
            isActive={activeRegion === 'html'}
            onClick={() => setActiveRegion(activeRegion === 'html' ? null : 'html')}
            x={200}
            y={80}
            color="#2563eb"
          />
          <TreeNode
            label="<head>"
            isActive={activeRegion === 'head'}
            onClick={() => setActiveRegion(activeRegion === 'head' ? null : 'head')}
            x={120}
            y={140}
            color="#0891b2"
          />
          <TreeNode
            label="<body>"
            isActive={activeRegion === 'body'}
            onClick={() => setActiveRegion(activeRegion === 'body' ? null : 'body')}
            x={280}
            y={140}
            color="#059669"
          />
          <TreeNode
            label="<title>"
            isActive={activeRegion === 'title'}
            onClick={() => setActiveRegion(activeRegion === 'title' ? null : 'title')}
            x={120}
            y={200}
            color="#0891b2"
          />
          <TreeNode
            label="<div>"
            isActive={activeRegion === 'div'}
            onClick={() => setActiveRegion(activeRegion === 'div' ? null : 'div')}
            x={280}
            y={200}
            color="#059669"
          />
          <TreeNode
            label="<h1>"
            isActive={activeRegion === 'h1'}
            onClick={() => setActiveRegion(activeRegion === 'h1' ? null : 'h1')}
            x={220}
            y={260}
            color="#d97706"
          />
          <TreeNode
            label="<p>"
            isActive={activeRegion === 'p'}
            onClick={() => setActiveRegion(activeRegion === 'p' ? null : 'p')}
            x={340}
            y={260}
            color="#d97706"
          />
        </svg>
      )}
    </ExplorableSVG>
  )
}
