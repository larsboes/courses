// src/content/web-technologies/topics/css.tsx
import type { Topic } from '@/core/types/content'
import { CssSpecificityDiagram } from '../diagrams/CssSpecificityDiagram'
import { CssSelectorPlayground } from '../diagrams/CssSelectorPlayground'
import { SpecificityBattle } from '../diagrams/SpecificityBattle'
import { CssCascadeSimulator } from '../diagrams/CssCascadeSimulator'

export const cssTopic: Topic = {
  id: 'css',
  title: 'CSS - Cascading Style Sheets',
  description: 'Selektoren, Spezifität, Box Model, Styling',
  examNotes: 'Spezifität berechnen können',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            CSS (Cascading Style Sheets) ist die Sprache zur{' '}
            <strong>visuellen Gestaltung</strong> von HTML-Dokumenten. CSS
            trennt Inhalt (HTML) von Darstellung (Design).
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400">/* CSS Syntax */</div>
            <div>
              <span className="text-amber-400">selektor</span>
              {' { '}
            </div>
            <div className="pl-4">
              <span className="text-blue-400">eigenschaft</span>:{' '}
              <span className="text-green-400">wert</span>;
            </div>
            <div>{'}'}</div>
          </div>
          <p className="text-slate-400 text-sm">
            Beispiel: <code className="text-amber-400">h1</code>{' '}
            <code>{'{ '}</code>
            <code className="text-blue-400">color</code>:{' '}
            <code className="text-green-400">red</code>;{' '}
            <code>{'}'}</code>
          </p>
        </div>
      ),
    },
    {
      id: 'selectors',
      title: 'Selektoren',
      content: (
        <div className="space-y-4">
          <p>
            Selektoren bestimmen, <strong>welche Elemente</strong> gestylt
            werden:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Typ</th>
                  <th className="text-left py-2 px-3">Syntax</th>
                  <th className="text-left py-2 px-3">Beispiel</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Element</td>
                  <td className="py-2 px-3 font-mono text-purple-400">tag</td>
                  <td className="py-2 px-3 font-mono">p, div, h1</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Klasse</td>
                  <td className="py-2 px-3 font-mono text-amber-400">.name</td>
                  <td className="py-2 px-3 font-mono">.button, .card</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">ID</td>
                  <td className="py-2 px-3 font-mono text-red-400">#name</td>
                  <td className="py-2 px-3 font-mono">#header, #main</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Nachfahre</td>
                  <td className="py-2 px-3 font-mono text-blue-400">A B</td>
                  <td className="py-2 px-3 font-mono">nav a</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Kind</td>
                  <td className="py-2 px-3 font-mono text-blue-400">A &gt; B</td>
                  <td className="py-2 px-3 font-mono">ul &gt; li</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Attribut</td>
                  <td className="py-2 px-3 font-mono text-green-400">[attr]</td>
                  <td className="py-2 px-3 font-mono">[type=&quot;text&quot;]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'specificity',
      title: 'Spezifität',
      content: (
        <div className="space-y-4">
          <p>
            Bei mehreren passenden Regeln gewinnt die mit der{' '}
            <strong>höchsten Spezifität</strong>. Die Berechnung folgt dem
            Schema:
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-800">
              <div className="font-bold text-blue-400">Inline</div>
              <div className="text-xs text-slate-400">style=&quot;...&quot;</div>
              <div className="text-2xl font-mono mt-1">1,0,0,0</div>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg border border-red-800">
              <div className="font-bold text-red-400">ID</div>
              <div className="text-xs text-slate-400">#name</div>
              <div className="text-2xl font-mono mt-1">0,1,0,0</div>
            </div>
            <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-800">
              <div className="font-bold text-amber-400">Klasse</div>
              <div className="text-xs text-slate-400">.name, :hover</div>
              <div className="text-2xl font-mono mt-1">0,0,1,0</div>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-800">
              <div className="font-bold text-purple-400">Element</div>
              <div className="text-xs text-slate-400">div, ::before</div>
              <div className="text-2xl font-mono mt-1">0,0,0,1</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            <strong>!important</strong> überschreibt alle Spezifitäten (sollte
            vermieden werden).
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: CssSpecificityDiagram,
      },
    },
    {
      id: 'box-model',
      title: 'Box Model',
      content: (
        <div className="space-y-4">
          <p>
            Jedes HTML-Element ist eine <strong>rechteckige Box</strong> mit
            vier Schichten:
          </p>
          <div className="relative p-4">
            {/* Margin */}
            <div className="bg-orange-900/30 border-2 border-dashed border-orange-500 p-4 rounded-lg">
              <div className="text-xs text-orange-400 absolute -top-0.5 left-2 bg-slate-900 px-1">
                margin
              </div>
              {/* Border */}
              <div className="bg-yellow-900/30 border-4 border-yellow-500 p-4 rounded">
                <div className="text-xs text-yellow-400 -mt-7 mb-3">border</div>
                {/* Padding */}
                <div className="bg-green-900/30 border-2 border-dashed border-green-500 p-4 rounded">
                  <div className="text-xs text-green-400 -mt-7 mb-3">padding</div>
                  {/* Content */}
                  <div className="bg-blue-900/50 border border-blue-500 p-4 rounded text-center">
                    <span className="text-blue-300">content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-800 p-3 rounded-lg">
              <code className="text-blue-400">box-sizing: content-box</code>
              <p className="text-slate-400 text-xs mt-1">
                width/height gilt nur für Content (Standard)
              </p>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <code className="text-green-400">box-sizing: border-box</code>
              <p className="text-slate-400 text-xs mt-1">
                width/height schließt padding + border ein
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'selector-playground',
      title: 'Selector Playground',
      content: (
        <p>
          Teste CSS-Selektoren live an einem Mini-DOM:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: CssSelectorPlayground,
      },
    },
    {
      id: 'specificity-battle',
      title: 'Specificity Battle',
      content: (
        <p>
          Welcher Selektor gewinnt? Teste dein Wissen über CSS-Spezifität:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: SpecificityBattle,
      },
    },
    {
      id: 'cascade-simulator',
      title: 'Cascade Simulator',
      content: (
        <p>
          Verstehe die CSS Cascade: Wenn mehrere Regeln auf ein Element zutreffen,
          welche gewinnt? Simuliere verschiedene Szenarien:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: CssCascadeSimulator,
      },
    },
  ],

  relatedTopics: [
    { id: 'html', title: 'HTML', relationship: 'styled HTML' },
    { id: 'browser-rendering', title: 'Browser Rendering', relationship: 'CSSOM im Render Tree' },
  ],

  quiz: {
    questions: [
      {
        id: 'css-specificity-calc',
        type: 'multiple-choice',
        question:
          'Welche Spezifität hat der Selektor "#nav .menu li a:hover"?',
        options: ['0,1,2,2', '0,2,1,1', '0,1,1,2', '0,0,3,2'],
        correctAnswer: '0,1,2,2',
        explanation:
          'Der Selektor enthält: 1 ID (#nav) = 0,1,0,0 + 2 Klassen (.menu, :hover) = 0,0,2,0 + 2 Elemente (li, a) = 0,0,0,2. Zusammen: 0,1,2,2.',
      },
      {
        id: 'css-box-model',
        type: 'multiple-choice',
        question:
          'Bei "box-sizing: border-box" und "width: 200px; padding: 20px; border: 5px solid" - wie breit ist die Content-Box?',
        options: ['200px', '150px', '175px', '250px'],
        correctAnswer: '150px',
        explanation:
          'Bei border-box ist die Gesamtbreite 200px. Davon abziehen: 2x padding (40px) + 2x border (10px) = 50px. Die Content-Box ist also 200px - 50px = 150px breit.',
      },
      {
        id: 'css-units',
        type: 'multiple-choice',
        question: 'Welche CSS-Einheit ist relativ zur Schriftgröße des Elternelements?',
        options: ['em', 'rem', 'px', 'vh'],
        correctAnswer: 'em',
        explanation:
          'em ist relativ zur Schriftgröße des Elternelements. rem ist relativ zur Root-Schriftgröße (html). px ist absolut. vh ist relativ zur Viewport-Höhe.',
      },
      {
        id: 'css-playlist-styling',
        type: 'code-write',
        language: 'css',
        question: 'Schreiben Sie CSS, sodass der Header "Playlist Details" (h2 in .playlist) grün und die Track-Links (a in .playlist li) blau dargestellt werden.',
        placeholder: '.playlist h2 {\n  \n}',
        modelAnswer: `.playlist h2 {
  color: green;
}

.playlist li a {
  color: blue;
}`,
        keyPoints: [
          'Verschachtelte Selektoren (.playlist h2)',
          'color Property für Textfarbe',
          'Spezifität: Element in Klasse',
        ],
        explanation: 'CSS Selektoren können verschachtelt werden um spezifische Elemente zu stylen.',
      },
    ],
  },
}
