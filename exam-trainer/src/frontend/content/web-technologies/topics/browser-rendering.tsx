// src/content/web-technologies/topics/browser-rendering.tsx
import type { Topic } from '@/core/types/content'
import { RenderingPipelineDiagram } from '../diagrams/RenderingPipelineDiagram'

export const browserRenderingTopic: Topic = {
  id: 'browser-rendering',
  title: 'Browser Rendering',
  description: 'Wie der Browser HTML, CSS und JavaScript zu einer sichtbaren Seite verarbeitet',
  examNotes: 'Rendering Pipeline verstehen, FMP kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Wenn du eine URL eingibst, passiert im Browser viel mehr als nur
            "Seite anzeigen". Der Browser muss HTML, CSS und JavaScript
            verarbeiten und in <strong>sichtbare Pixel</strong> umwandeln.
          </p>
          <p>
            Dieser Prozess heißt <strong>Rendering Pipeline</strong> (auch
            "Critical Rendering Path"). Das Verständnis dieser Pipeline ist
            wichtig für die <strong>Performance-Optimierung</strong> von
            Webseiten.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-300">
              <strong className="text-white">Merke:</strong> Der Browser kann
              nichts anzeigen, bis die Rendering Pipeline abgeschlossen ist.
              Alles was diese Pipeline blockiert, verzögert die Anzeige!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'rendering-pipeline',
      title: 'Rendering Pipeline',
      content: (
        <div className="space-y-4">
          <p>
            Die Rendering Pipeline besteht aus <strong>fünf Schritten</strong>.
            Klicke durch die Animation um jeden Schritt zu verstehen:
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 font-mono text-sm">
            <div className="text-slate-300">
              <span className="text-blue-400">HTML</span> {'->'} DOM {'-'}
              {'---'}
              {'---'}
              {'-'}+
            </div>
            <div className="text-slate-300 ml-14">|</div>
            <div className="text-slate-300 ml-14">
              +{'--'}
              {'>'} <span className="text-green-400">Render Tree</span> {'->'}{' '}
              <span className="text-amber-400">Layout</span> {'->'}{' '}
              <span className="text-purple-400">Paint (FMP)</span>
            </div>
            <div className="text-slate-300 ml-14">|</div>
            <div className="text-slate-300">
              <span className="text-cyan-400">CSS</span> {'->'} CSSOM {'---'}+
            </div>
          </div>
          <div className="grid gap-3 mt-4">
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <span className="text-lg font-bold text-blue-400 min-w-8">1.</span>
              <div>
                <div className="font-medium text-blue-300">HTML Parsing {'->'} DOM</div>
                <div className="text-sm text-slate-400">
                  HTML wird in den Document Object Model (DOM) Baum umgewandelt
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-cyan-900/20 rounded-lg border border-cyan-800">
              <span className="text-lg font-bold text-cyan-400 min-w-8">2.</span>
              <div>
                <div className="font-medium text-cyan-300">CSS Parsing {'->'} CSSOM</div>
                <div className="text-sm text-slate-400">
                  CSS wird parallel zum CSS Object Model (CSSOM) verarbeitet
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-lg font-bold text-green-400 min-w-8">3.</span>
              <div>
                <div className="font-medium text-green-300">Render Tree</div>
                <div className="text-sm text-slate-400">
                  DOM + CSSOM = Render Tree (nur sichtbare Elemente, kein{' '}
                  <code className="bg-slate-700 px-1 rounded">display:none</code>)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="text-lg font-bold text-amber-400 min-w-8">4.</span>
              <div>
                <div className="font-medium text-amber-300">Layout (Reflow)</div>
                <div className="text-sm text-slate-400">
                  Berechnung der genauen Position und Größe jedes Elements
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <span className="text-lg font-bold text-purple-400 min-w-8">5.</span>
              <div>
                <div className="font-medium text-purple-300">Paint</div>
                <div className="text-sm text-slate-400">
                  Pixel werden auf den Bildschirm gezeichnet - der Nutzer sieht die Seite!
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: RenderingPipelineDiagram,
      },
    },
    {
      id: 'performance',
      title: 'Performance',
      content: (
        <div className="space-y-4">
          <p>
            <strong>First Meaningful Paint (FMP)</strong> ist der Zeitpunkt, an
            dem der Nutzer zum ersten Mal sinnvolle Inhalte sieht. Je schneller
            der FMP, desto besser die User Experience.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="font-medium text-white mb-2">Was blockiert das Rendering?</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                <strong className="text-red-400">CSS</strong> ist{' '}
                <strong>render-blocking</strong> - ohne CSSOM kein Render Tree
              </li>
              <li>
                <strong className="text-amber-400">JavaScript</strong> ist{' '}
                <strong>parser-blocking</strong> - stoppt HTML Parsing
              </li>
              <li>
                Große Bilder und Schriftarten verzögern den Paint
              </li>
            </ul>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800 mt-4">
            <h4 className="font-medium text-green-300 mb-2">Optimierungstipps</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                CSS im <code className="bg-slate-700 px-1 rounded">&lt;head&gt;</code>{' '}
                laden (früh verfügbar)
              </li>
              <li>
                JavaScript mit{' '}
                <code className="bg-slate-700 px-1 rounded">defer</code> oder{' '}
                <code className="bg-slate-700 px-1 rounded">async</code> laden
              </li>
              <li>
                Critical CSS inline einbetten für schnellen FMP
              </li>
              <li>
                Bilder lazy-loaden mit{' '}
                <code className="bg-slate-700 px-1 rounded">loading="lazy"</code>
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Metrik</th>
                  <th className="text-left py-2 px-3">Bedeutung</th>
                  <th className="text-left py-2 px-3">Guter Wert</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-purple-400">FCP</td>
                  <td className="py-2 px-3">First Contentful Paint</td>
                  <td className="py-2 px-3">&lt; 1.8s</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-green-400">LCP</td>
                  <td className="py-2 px-3">Largest Contentful Paint</td>
                  <td className="py-2 px-3">&lt; 2.5s</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-amber-400">CLS</td>
                  <td className="py-2 px-3">Cumulative Layout Shift</td>
                  <td className="py-2 px-3">&lt; 0.1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'html', title: 'HTML', relationship: 'DOM Quelle' },
    { id: 'css', title: 'CSS', relationship: 'CSSOM Quelle' },
    { id: 'javascript-dom', title: 'JavaScript DOM', relationship: 'DOM Manipulation' },
    { id: 'http', title: 'HTTP', relationship: 'liefert Ressourcen' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph Netzwerk["HTTP Response"]
    HTML["HTML"]
    CSS["CSS"]
    JS["JavaScript"]
  end

  subgraph Browser["Browser Engine"]
    DOM["DOM Tree"]
    CSSOM["CSSOM"]
    RenderTree["Render Tree"]
    Layout["Layout"]
    Paint["Paint"]
  end

  HTML -->|"Parse"| DOM
  CSS -->|"Parse"| CSSOM
  DOM --> RenderTree
  CSSOM --> RenderTree
  JS -.->|"kann modifizieren"| DOM
  JS -.->|"kann modifizieren"| CSSOM
  RenderTree --> Layout
  Layout --> Paint
  Paint -->|"Pixel auf Bildschirm"| Display["Display"]

  style RenderTree fill:#3b82f6,stroke:#1d4ed8
  style Paint fill:#22c55e,stroke:#16a34a
`,

  quiz: {
    questions: [
      {
        id: 'render-tree-composition',
        type: 'multiple-choice',
        question: 'Woraus besteht der Render Tree?',
        options: [
          'DOM + CSSOM (nur sichtbare Elemente)',
          'HTML + CSS + JavaScript',
          'Nur das DOM',
          'Alle HTML-Elemente inklusive <head>',
        ],
        correctAnswer: 'DOM + CSSOM (nur sichtbare Elemente)',
        explanation:
          'Der Render Tree ist die Kombination aus DOM und CSSOM, enthält aber nur sichtbare Elemente. Elemente mit display:none oder im <head> sind nicht enthalten.',
      },
      {
        id: 'rendering-order',
        type: 'order-steps',
        question: 'Bringe die Schritte der Rendering Pipeline in die richtige Reihenfolge:',
        options: [
          'Paint',
          'Layout',
          'HTML Parsing',
          'Render Tree erstellen',
          'CSS Parsing',
        ],
        correctAnswer: [
          'HTML Parsing',
          'CSS Parsing',
          'Render Tree erstellen',
          'Layout',
          'Paint',
        ],
        explanation:
          'Die korrekte Reihenfolge ist: 1) HTML Parsing (DOM), 2) CSS Parsing (CSSOM) - parallel zu 1, 3) Render Tree aus DOM+CSSOM, 4) Layout (Positionen berechnen), 5) Paint (Pixel zeichnen).',
      },
      {
        id: 'render-blocking',
        type: 'multi-select',
        question: 'Was kann das Rendering blockieren? (Mehrere Antworten möglich)',
        options: [
          'CSS im <head>',
          'JavaScript ohne defer/async',
          'Bilder',
          'HTML-Kommentare',
        ],
        correctAnswer: ['CSS im <head>', 'JavaScript ohne defer/async'],
        explanation:
          'CSS ist render-blocking - ohne CSSOM kann kein Render Tree erstellt werden. JavaScript ohne defer/async ist parser-blocking und stoppt das HTML Parsing. Bilder und Kommentare blockieren das Rendering nicht.',
      },
    ],
  },

  examTasks: [
    {
      id: 'rendering-pipeline-task',
      title: 'Browser Rendering Pipeline',
      points: 20,
      context: (
        <p>
          Wenn ein Benutzer die Playlist-App im Browser aufruft, durchläuft die Seite
          die gesamte Rendering Pipeline. Die folgenden Fragen testen Ihr Verständnis
          dieses Prozesses.
        </p>
      ),
      parts: [
        {
          id: 'rendering-task-a',
          type: 'free-text' as const,
          question: 'Beschreiben Sie die 5 Schritte der Browser Rendering Pipeline vom Empfang des HTML bis zur Anzeige der Pixel auf dem Bildschirm.',
          placeholder: '1. HTML Parsing...\n2. ...',
          modelAnswer: '1. HTML Parsing → DOM: Der Browser parst das HTML-Dokument und erstellt den Document Object Model (DOM) Baum.\n2. CSS Parsing → CSSOM: Parallel wird CSS geparst und der CSS Object Model (CSSOM) Baum erstellt.\n3. Render Tree: DOM und CSSOM werden kombiniert zum Render Tree. Nur sichtbare Elemente sind enthalten (kein display:none, kein <head>).\n4. Layout (Reflow): Die genaue Position und Größe jedes Elements wird berechnet (Box Model, Viewport-abhängig).\n5. Paint: Die Pixel werden auf den Bildschirm gezeichnet. Dies ist der Moment des First Meaningful Paint (FMP).',
          keyPoints: [
            'HTML Parsing → DOM',
            'CSS Parsing → CSSOM (parallel)',
            'Render Tree = DOM + CSSOM (nur sichtbare Elemente)',
            'Layout/Reflow: Position und Größe berechnen',
            'Paint: Pixel zeichnen',
          ],
          explanation: 'Die Rendering Pipeline ist der Kernprozess, wie Browser Webseiten darstellen.',
        },
        {
          id: 'rendering-task-b',
          type: 'free-text' as const,
          question: 'Was ist der Unterschied zwischen einem Reflow (Layout) und einem Repaint? Geben Sie jeweils ein Beispiel für eine CSS-Änderung, die einen Reflow bzw. nur einen Repaint auslöst.',
          placeholder: 'Reflow bedeutet...\nRepaint bedeutet...',
          modelAnswer: 'Reflow (Layout): Die Position und Größe von Elementen wird neu berechnet. Dies passiert bei Änderungen, die das Layout betreffen: width, height, margin, padding, position, display, font-size. Beispiel: element.style.width = "200px" löst Reflow aus.\n\nRepaint: Nur die visuellen Eigenschaften werden neu gezeichnet, ohne das Layout zu ändern. Beispiel: element.style.color = "red" oder element.style.backgroundColor = "blue" löst nur Repaint aus.\n\nReflow ist teurer als Repaint, da er immer auch einen Repaint nach sich zieht.',
          keyPoints: [
            'Reflow: Neuberechnung von Position/Größe',
            'Repaint: Nur visuelle Änderungen',
            'Korrektes Beispiel für Reflow (z.B. width, height)',
            'Korrektes Beispiel für Repaint (z.B. color, background)',
            'Reflow ist teurer und löst Repaint aus',
          ],
          explanation: 'Das Verständnis von Reflow vs Repaint ist wichtig für Performance-Optimierung.',
        },
        {
          id: 'rendering-task-c',
          type: 'free-text' as const,
          question: 'Erklären Sie den Unterschied zwischen <script>, <script defer> und <script async>. Wie beeinflusst jede Variante die Rendering Pipeline?',
          placeholder: '<script>: ...\n<script defer>: ...\n<script async>: ...',
          modelAnswer: '<script>: Blockiert das HTML-Parsing. Der Browser stoppt, lädt das Script herunter und führt es aus, bevor er weitermacht. Parser-blocking.\n\n<script defer>: Das Script wird parallel heruntergeladen, aber erst nach dem vollständigen HTML-Parsing ausgeführt. Die Ausführungsreihenfolge bleibt erhalten. Blockiert das Parsing nicht.\n\n<script async>: Das Script wird parallel heruntergeladen und sofort nach dem Download ausgeführt (unterbricht das Parsing). Die Ausführungsreihenfolge ist nicht garantiert. Gut für unabhängige Scripts wie Analytics.',
          keyPoints: [
            '<script> blockiert Parsing (parser-blocking)',
            'defer: parallel laden, nach Parsing ausführen',
            'async: parallel laden, sofort ausführen',
            'defer behält Reihenfolge, async nicht',
          ],
          explanation: 'Die richtige Script-Ladestrategie ist entscheidend für die Ladeperformance.',
        },
        {
          id: 'rendering-task-d',
          type: 'multiple-choice' as const,
          question: 'Welche CSS-Änderung löst NUR einen Repaint aus (keinen Reflow)?',
          options: [
            'width: 200px → width: 300px',
            'color: red → color: blue',
            'display: block → display: none',
            'padding: 10px → padding: 20px',
          ],
          correctAnswer: 'color: red → color: blue',
          explanation: 'Eine Farbänderung beeinflusst nur die visuelle Darstellung, nicht das Layout. width, display und padding ändern die Geometrie und lösen daher einen Reflow aus.',
        },
      ],
    },
  ],
}
