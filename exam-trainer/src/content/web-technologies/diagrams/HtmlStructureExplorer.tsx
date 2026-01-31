// src/content/web-technologies/diagrams/HtmlStructureExplorer.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'doctype',
    label: 'DOCTYPE Deklaration',
    description: (
      <>
        <p className="mb-2">Die DOCTYPE-Deklaration:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Muss</strong> die allererste Zeile im Dokument sein</li>
          <li>Teilt dem Browser mit, dass es sich um <strong>HTML5</strong> handelt</li>
          <li>Aktiviert den <strong>Standardmodus</strong> (kein Quirks Mode)</li>
          <li>Ist <strong>kein HTML-Element</strong>, sondern eine Anweisung</li>
        </ul>
      </>
    ),
  },
  {
    id: 'html',
    label: 'html Element',
    description: (
      <>
        <p className="mb-2">Das Wurzelelement des Dokuments:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Umschließt</strong> das gesamte HTML-Dokument</li>
          <li>Das <strong>lang</strong>-Attribut definiert die Sprache (z.B. "de" für Deutsch)</li>
          <li>Wichtig für <strong>Accessibility</strong> und SEO</li>
          <li>Enthält genau <strong>head</strong> und <strong>body</strong></li>
        </ul>
      </>
    ),
  },
  {
    id: 'head',
    label: 'head Element',
    description: (
      <>
        <p className="mb-2">Metadaten und Ressourcen (nicht sichtbar):</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>title</strong> - Titel im Browser-Tab (erforderlich)</li>
          <li><strong>meta charset</strong> - Zeichenkodierung (UTF-8)</li>
          <li><strong>meta viewport</strong> - Responsive Design</li>
          <li><strong>link</strong> - CSS-Dateien einbinden</li>
          <li><strong>script</strong> - JavaScript einbinden</li>
        </ul>
      </>
    ),
  },
  {
    id: 'body',
    label: 'body Element',
    description: (
      <>
        <p className="mb-2">Der sichtbare Inhalt der Seite:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Alles, was der Benutzer <strong>sieht</strong></li>
          <li>Semantische Elemente: header, nav, main, footer</li>
          <li>Inhaltselemente: h1-h6, p, div, span, etc.</li>
          <li>Interaktive Elemente: a, button, form, input</li>
        </ul>
      </>
    ),
  },
]

interface RegionBoxProps {
  isActive: boolean
  onClick: () => void
  label: string
  content: string[]
  indent?: number
  className?: string
}

function RegionBox({ isActive, onClick, label, content, indent = 0, className = '' }: RegionBoxProps) {
  return (
    <motion.div
      className={`
        p-3 cursor-pointer border-l-4 transition-colors
        ${isActive
          ? 'bg-blue-900/40 border-blue-500'
          : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
        ${className}
      `}
      style={{ marginLeft: `${indent * 1.5}rem` }}
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="font-mono text-sm">
        {content.map((line, i) => (
          <div key={i} className={isActive ? 'text-blue-200' : 'text-slate-300'}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function HtmlStructureExplorer({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="flex flex-col gap-1 max-w-lg mx-auto">
          <RegionBox
            isActive={activeRegion === 'doctype'}
            onClick={() => setActiveRegion(activeRegion === 'doctype' ? null : 'doctype')}
            label="DOCTYPE"
            content={['<!DOCTYPE html>']}
          />
          <RegionBox
            isActive={activeRegion === 'html'}
            onClick={() => setActiveRegion(activeRegion === 'html' ? null : 'html')}
            label="HTML ELEMENT"
            content={['<html lang="de">']}
          />
          <RegionBox
            isActive={activeRegion === 'head'}
            onClick={() => setActiveRegion(activeRegion === 'head' ? null : 'head')}
            label="HEAD"
            content={[
              '<head>',
              '  <meta charset="UTF-8">',
              '  <meta name="viewport" content="...">',
              '  <title>Meine Seite</title>',
              '</head>',
            ]}
            indent={1}
          />
          <RegionBox
            isActive={activeRegion === 'body'}
            onClick={() => setActiveRegion(activeRegion === 'body' ? null : 'body')}
            label="BODY"
            content={[
              '<body>',
              '  <header>...</header>',
              '  <main>...</main>',
              '  <footer>...</footer>',
              '</body>',
            ]}
            indent={1}
          />
          <div className="font-mono text-sm text-slate-300 pl-3 mt-1">
            {'</html>'}
          </div>
        </div>
      )}
    </ExplorableSVG>
  )
}
