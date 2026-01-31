// src/content/web-technologies/topics/javascript-dom.tsx
import type { Topic } from '@/core/types/content'
import { DomTreeDiagram } from '../diagrams/DomTreeDiagram'

export const javascriptDomTopic: Topic = {
  id: 'javascript-dom',
  title: 'JavaScript DOM',
  description: 'Document Object Model - Struktur, Selektion, Manipulation',
  examNotes: 'DOM-Methoden und Event-Handling verstehen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Das <strong>Document Object Model (DOM)</strong> ist eine Programmierschnittstelle
            für HTML-Dokumente. Es repräsentiert die Seite als <strong>Baumstruktur</strong>,
            in der jedes Element ein Knoten ist.
          </p>
          <p>
            JavaScript kann über das DOM auf alle Elemente zugreifen, sie lesen,
            ändern, hinzufügen oder entfernen. Das DOM verbindet HTML mit JavaScript.
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400">// Zugriff auf das DOM</div>
            <div><span className="text-purple-400">document</span>.querySelector(<span className="text-green-400">'h1'</span>)</div>
            <div><span className="text-purple-400">document</span>.getElementById(<span className="text-green-400">'app'</span>)</div>
          </div>
        </div>
      ),
    },
    {
      id: 'dom-tree',
      title: 'DOM Baum',
      content: (
        <div className="space-y-4">
          <p>
            Das DOM ist als <strong>Baum</strong> organisiert. Jedes HTML-Element wird
            zu einem <strong>Knoten (Node)</strong>. Klicke auf die Knoten für Details:
          </p>
          <div className="text-sm text-slate-400">
            <p>Wichtige Beziehungen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><code className="bg-slate-700 px-1 rounded">parentNode</code> - Elternknoten</li>
              <li><code className="bg-slate-700 px-1 rounded">childNodes</code> - Kindknoten</li>
              <li><code className="bg-slate-700 px-1 rounded">nextSibling</code> - Nächstes Geschwister</li>
            </ul>
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: DomTreeDiagram,
      },
    },
    {
      id: 'selection',
      title: 'Selektion',
      content: (
        <div className="space-y-4">
          <p>
            Um Elemente zu manipulieren, müssen wir sie zuerst <strong>selektieren</strong>.
            Es gibt verschiedene Methoden mit unterschiedlichen Rückgabetypen:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Methode</th>
                  <th className="text-left py-2 px-3">Rückgabe</th>
                  <th className="text-left py-2 px-3">Beispiel</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 font-mono text-xs">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 text-blue-400">getElementById()</td>
                  <td className="py-2 px-3 text-slate-400">Element | null</td>
                  <td className="py-2 px-3">getElementById('app')</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 text-blue-400">querySelector()</td>
                  <td className="py-2 px-3 text-slate-400">Element | null</td>
                  <td className="py-2 px-3">querySelector('.card')</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 text-blue-400">querySelectorAll()</td>
                  <td className="py-2 px-3 text-slate-400">NodeList</td>
                  <td className="py-2 px-3">querySelectorAll('li')</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 text-amber-400">getElementsByClassName()</td>
                  <td className="py-2 px-3 text-slate-400">HTMLCollection</td>
                  <td className="py-2 px-3">getElementsByClassName('btn')</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-amber-400">getElementsByTagName()</td>
                  <td className="py-2 px-3 text-slate-400">HTMLCollection</td>
                  <td className="py-2 px-3">getElementsByTagName('div')</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-800 text-sm">
            <strong className="text-amber-300">Tipp:</strong>{' '}
            <span className="text-slate-300">
              <code className="bg-slate-700 px-1 rounded">querySelector</code> und{' '}
              <code className="bg-slate-700 px-1 rounded">querySelectorAll</code> sind modern
              und flexibel - sie akzeptieren CSS-Selektoren.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'manipulation',
      title: 'Manipulation',
      content: (
        <div className="space-y-4">
          <p>
            Nach der Selektion können wir Elemente <strong>manipulieren</strong>:
            Inhalt ändern, Attribute setzen, Elemente erstellen oder entfernen.
          </p>

          <div className="space-y-3">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Inhalt ändern</div>
              <div className="font-mono text-sm space-y-1">
                <div>element.<span className="text-green-400">textContent</span> = <span className="text-amber-400">'Neuer Text'</span></div>
                <div>element.<span className="text-green-400">innerHTML</span> = <span className="text-amber-400">'&lt;strong&gt;HTML&lt;/strong&gt;'</span></div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Attribute & Klassen</div>
              <div className="font-mono text-sm space-y-1">
                <div>element.<span className="text-blue-400">setAttribute</span>(<span className="text-amber-400">'href'</span>, <span className="text-amber-400">'/page'</span>)</div>
                <div>element.<span className="text-blue-400">classList.add</span>(<span className="text-amber-400">'active'</span>)</div>
                <div>element.<span className="text-blue-400">classList.toggle</span>(<span className="text-amber-400">'hidden'</span>)</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Elemente erstellen & einfügen</div>
              <div className="font-mono text-sm space-y-1">
                <div><span className="text-slate-500">const</span> div = document.<span className="text-blue-400">createElement</span>(<span className="text-amber-400">'div'</span>)</div>
                <div>parent.<span className="text-blue-400">appendChild</span>(div)</div>
                <div>parent.<span className="text-blue-400">insertBefore</span>(div, sibling)</div>
                <div>element.<span className="text-red-400">remove</span>()</div>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 rounded-lg p-3 border border-red-800 text-sm">
            <strong className="text-red-300">Vorsicht:</strong>{' '}
            <span className="text-slate-300">
              <code className="bg-slate-700 px-1 rounded">innerHTML</code> kann XSS-Sicherheitslücken
              verursachen, wenn Benutzereingaben direkt eingefügt werden.
            </span>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'html', title: 'HTML', relationship: 'DOM Struktur aus' },
    { id: 'browser-rendering', title: 'Browser Rendering', relationship: 'DOM im Render Tree' },
    { id: 'playlist-app', title: 'Playlist App', relationship: 'Praxisbeispiel' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph HTML["HTML Document"]
    Source["&lt;div id='app'&gt;&lt;ul&gt;...&lt;/ul&gt;&lt;/div&gt;"]
  end

  subgraph DOM["DOM Tree"]
    Document["document"]
    Div["div#app"]
    Ul["ul"]
    Li1["li"]
    Li2["li"]
    Document --> Div
    Div --> Ul
    Ul --> Li1
    Ul --> Li2
  end

  subgraph JS["JavaScript"]
    Select["document.querySelector()"]
    Create["document.createElement()"]
    Modify["element.innerHTML = ..."]
  end

  Source -->|"Browser parst"| Document
  Select -->|"findet"| Div
  Create -->|"erstellt neues"| Li2
  Modify -->|"ändert"| Li1

  style DOM fill:#3b82f6,stroke:#1d4ed8
`,

  examTasks: [
    {
      id: 'html-css-js-dom-task',
      title: 'HTML, CSS, JavaScript & DOM',
      points: 30,
      context: (
        <div className="space-y-4">
          <p>Betrachten Sie folgenden HTML-Ausschnitt unserer Playlist Web-Seite:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-sm overflow-x-auto">
{`<body>
  <div class="playlist">
    <h2>Playlist Details</h2>
    <ul id="playlist"></ul>
    <div id="total-duration">Total Duration: 0:00</div>
    <button id="save-playlist">Save Playlist</button>
  </div>
</body>`}
          </pre>
          <p>Und folgendes JavaScript-Fragment:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-sm overflow-x-auto">
{`const playlistContainer = document.getElementById('playlist');

playlists[currentPlaylist].forEach((track, index) => {
  const li = document.createElement('li');
  li.innerHTML = \`
    <a href="\${track.link}" target="_blank">\${track.title}</a>
    <button onclick="removeTrack(\${index})">Remove</button>
  \`;
  playlistContainer.appendChild(li);
});`}
          </pre>
        </div>
      ),
      parts: [
        {
          id: 'html-css-js-a',
          type: 'free-text',
          question: 'Beschreiben Sie kurz die Zwecke von HTML und CSS. Welche Schritte führt der Browser vom Empfang einer Web-Seite bis zur Darstellung durch?',
          placeholder: 'HTML dient der...',
          modelAnswer: 'HTML (Hypertext Markup Language) beschreibt und strukturiert Web-Inhalte wie Text, Grafiken, Videos. CSS (Cascading Style Sheets) definiert die Darstellung (Farben, Fonts, Größen) und das Layout (Positionen, Abstände). Browser-Schritte: 1) HTML parsen → DOM erstellen, 2) CSS parsen → CSSOM erstellen, 3) DOM + CSSOM → Render Tree, 4) Layout berechnen (Geometrien), 5) First Meaningful Paint darstellen.',
          keyPoints: [
            'HTML für Struktur und Inhalt',
            'CSS für Styling und Layout',
            'DOM und CSSOM Erstellung',
            'Render Tree und Layout',
            'First Meaningful Paint',
          ],
          explanation: 'Der Browser baut schrittweise ein Modell der Seite auf, bevor er sie rendert.',
        },
        {
          id: 'html-css-js-b',
          type: 'code-write',
          language: 'css',
          question: 'Geben Sie CSS an, so dass der Header "Playlist Details" in grün dargestellt wird und die Elemente der Tracks in der Liste in blau.',
          placeholder: 'h2 {\n  ...\n}',
          modelAnswer: `h2 {
  color: green;
}

li a {
  color: blue;
}`,
          keyPoints: [
            'h2 Selektor für Header',
            'color: green für Überschrift',
            'li a Selektor für Links in Liste',
            'color: blue für Track-Links',
          ],
          explanation: 'CSS-Selektoren erlauben präzise Auswahl von Elementen. "li a" selektiert alle Links innerhalb von Listenelementen.',
        },
        {
          id: 'html-css-js-c',
          type: 'free-text',
          question: 'Erläutern Sie, was der JavaScript-Ausschnitt mit dem HTML-Dokument macht.',
          placeholder: 'Das JS-Programm holt sich zunächst...',
          modelAnswer: 'Das JS-Programm holt sich das Element mit der ID "playlist" aus dem Dokument - eine leere HTML-Liste (ul). Dann iteriert es über die Tracks der aktuellen Playlist. Für jeden Track wird ein Listeneintrag (li) erstellt und mit HTML-Inhalt gefüllt: ein Link zum Track und ein Remove-Button. Der neue Listeneintrag wird mit appendChild() an die HTML-Liste angehängt.',
          keyPoints: [
            'getElementById holt ul-Element',
            'forEach iteriert über Tracks',
            'createElement erstellt li-Elemente',
            'innerHTML setzt Link und Button',
            'appendChild fügt zur Liste hinzu',
          ],
          explanation: 'JavaScript manipuliert das DOM dynamisch, um Inhalte basierend auf Daten zu generieren.',
        },
        {
          id: 'html-css-js-d',
          type: 'free-text',
          question: 'Geben Sie das DOM der Playlist nach Durchführung des JavaScript-Ausschnitts als Baumstruktur an (ein Listeneintrag reicht).',
          placeholder: 'ul#playlist\n  └── li\n      ├── ...',
          modelAnswer: `ul#playlist
  └── li
      ├── a (href, target="_blank")
      │   └── [text: track.title]
      └── button (onclick)
          └── [text: "Remove"]`,
          keyPoints: [
            'ul als Wurzel',
            'li als Kind von ul',
            'a und button als Kinder von li',
            'Textknoten in a und button',
          ],
          explanation: 'Das DOM spiegelt die hierarchische Struktur des HTML-Dokuments wider.',
        },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        id: 'dom-selection',
        type: 'multiple-choice',
        question: 'Welche Methode gibt ein einzelnes Element zurück (nicht eine Liste)?',
        options: [
          'querySelectorAll()',
          'getElementsByClassName()',
          'querySelector()',
          'getElementsByTagName()',
        ],
        correctAnswer: 'querySelector()',
        explanation:
          'querySelector() gibt das erste passende Element zurück (oder null). Die anderen Methoden geben immer eine Liste zurück (NodeList oder HTMLCollection), auch wenn nur ein Element gefunden wird.',
      },
      {
        id: 'dom-event',
        type: 'multiple-choice',
        question: 'Wie fügt man einen Event-Handler korrekt hinzu?',
        options: [
          'element.onClick = function() {}',
          'element.addEventListener("click", function() {})',
          'element.addEvent("click", function() {})',
          'element.on("click", function() {})',
        ],
        correctAnswer: 'element.addEventListener("click", function() {})',
        explanation:
          'addEventListener() ist die moderne und empfohlene Methode. Sie erlaubt mehrere Handler für das gleiche Event und bietet mehr Kontrolle (z.B. capture/bubble Phase, einmaliges Ausführen).',
      },
      {
        id: 'dom-manipulation',
        type: 'multi-select',
        question: 'Welche Methoden fügen ein neues Element zum DOM hinzu? (Mehrere Antworten)',
        options: [
          'appendChild()',
          'textContent',
          'insertBefore()',
          'setAttribute()',
          'append()',
        ],
        correctAnswer: ['appendChild()', 'insertBefore()', 'append()'],
        explanation:
          'appendChild(), insertBefore() und append() fügen Elemente zum DOM hinzu. textContent ändert nur den Textinhalt, setAttribute() setzt Attribute eines existierenden Elements.',
      },
      {
        id: 'dom-tree-build',
        type: 'diagram-build',
        diagramType: 'dom-tree',
        question:
          'Zeichne das DOM der Playlist nach Ausführung des JavaScript-Codes. Die ul#playlist enthält ein li mit einem a-Element und einem button.',
        availableNodes: ['ul', 'li', 'a', 'button', 'div', 'h2'],
        expectedStructure: [
          { type: 'ul', children: ['li'] },
          { type: 'li', children: ['a', 'button'] },
          { type: 'a' },
          { type: 'button' },
        ],
        explanation:
          'Das DOM spiegelt die hierarchische Struktur des HTML-Dokuments wider.',
      },
    ],
  },
}
