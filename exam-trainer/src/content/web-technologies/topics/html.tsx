// src/content/web-technologies/topics/html.tsx
import type { Topic } from '@/core/types/content'
import { HtmlStructureExplorer } from '../diagrams/HtmlStructureExplorer'

export const htmlTopic: Topic = {
  id: 'html',
  title: 'HTML - Hypertext Markup Language',
  description: 'Dokumentstruktur, semantische Elemente, Formulare, Attribute',
  examNotes: 'Grundstruktur und semantische Elemente kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            HTML ist die <strong>Auszeichnungssprache</strong> für Webseiten.
            Sie definiert die <strong>Struktur</strong> und den <strong>Inhalt</strong> einer Seite.
          </p>
          <p>
            HTML besteht aus <strong>Elementen</strong>, die durch Tags gekennzeichnet werden.
            Die meisten Elemente haben ein öffnendes und schließendes Tag:
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-slate-400">&lt;</span>
            <span className="text-blue-400">tagname</span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-300">Inhalt</span>
            <span className="text-slate-400">&lt;/</span>
            <span className="text-blue-400">tagname</span>
            <span className="text-slate-400">&gt;</span>
          </div>
          <p>
            Einige Elemente sind <strong>selbstschließend</strong> (z.B. <code className="text-blue-400">&lt;br&gt;</code>, <code className="text-blue-400">&lt;img&gt;</code>).
          </p>
        </div>
      ),
    },
    {
      id: 'structure',
      title: 'Grundstruktur',
      content: (
        <p>
          Jedes HTML-Dokument hat eine feste Grundstruktur. Klicke auf die Bereiche
          für Details:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: HtmlStructureExplorer,
      },
    },
    {
      id: 'elements',
      title: 'Wichtige Elemente',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-slate-200 mb-3">Semantische Elemente</h4>
            <p className="text-sm text-slate-400 mb-3">
              Semantische Elemente beschreiben ihre <strong>Bedeutung</strong>, nicht nur ihr Aussehen:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;header&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Kopfbereich</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;nav&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Navigation</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;main&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Hauptinhalt</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;article&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Eigenständiger Inhalt</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;section&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Thematischer Abschnitt</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-green-400">&lt;footer&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Fußbereich</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-slate-200 mb-3">Formularelemente</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Element</th>
                    <th className="text-left py-2 px-3">Beschreibung</th>
                    <th className="text-left py-2 px-3">Wichtige Attribute</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono text-purple-400">&lt;form&gt;</td>
                    <td className="py-2 px-3">Formular-Container</td>
                    <td className="py-2 px-3">action, method</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono text-purple-400">&lt;input&gt;</td>
                    <td className="py-2 px-3">Eingabefeld</td>
                    <td className="py-2 px-3">type, name, value, required</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono text-purple-400">&lt;label&gt;</td>
                    <td className="py-2 px-3">Beschriftung</td>
                    <td className="py-2 px-3">for (verknüpft mit id)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono text-purple-400">&lt;button&gt;</td>
                    <td className="py-2 px-3">Schaltfläche</td>
                    <td className="py-2 px-3">type (submit, button, reset)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-purple-400">&lt;select&gt;</td>
                    <td className="py-2 px-3">Dropdown-Liste</td>
                    <td className="py-2 px-3">name, multiple</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-slate-200 mb-3">Links und Medien</h4>
            <div className="space-y-3">
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-amber-400">&lt;a href="url"&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Hyperlink - Verbindung zu anderen Seiten</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <code className="text-amber-400">&lt;img src="bild.jpg" alt="..."&gt;</code>
                <p className="text-sm text-slate-400 mt-1">Bild - alt ist wichtig für Accessibility</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'attributes',
      title: 'Attribute',
      content: (
        <div className="space-y-4">
          <p>
            Attribute erweitern HTML-Elemente mit zusätzlichen Informationen.
            Sie stehen im öffnenden Tag:
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-slate-400">&lt;</span>
            <span className="text-blue-400">tag</span>
            {' '}
            <span className="text-green-400">attribut</span>
            <span className="text-slate-400">=</span>
            <span className="text-amber-400">"wert"</span>
            <span className="text-slate-400">&gt;</span>
          </div>

          <div className="grid gap-3 mt-4">
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <code className="text-blue-400 font-mono whitespace-nowrap">id</code>
              <div>
                <div className="font-medium text-slate-200">Eindeutige Identifikation</div>
                <div className="text-sm text-slate-400">Darf nur einmal pro Seite vorkommen. Für CSS (#id) und JavaScript.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <code className="text-green-400 font-mono whitespace-nowrap">class</code>
              <div>
                <div className="font-medium text-slate-200">Klassenzugehörigkeit</div>
                <div className="text-sm text-slate-400">Mehrere Elemente können dieselbe Klasse haben. Für CSS (.class) und JavaScript.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <code className="text-purple-400 font-mono whitespace-nowrap">data-*</code>
              <div>
                <div className="font-medium text-slate-200">Eigene Datenattribute</div>
                <div className="text-sm text-slate-400">Speichert benutzerdefinierte Daten am Element. Z.B. data-user-id="123".</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <code className="text-amber-400 font-mono whitespace-nowrap">style</code>
              <div>
                <div className="font-medium text-slate-200">Inline-CSS</div>
                <div className="text-sm text-slate-400">Direkte CSS-Regeln am Element (vermeiden wenn möglich).</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mt-4">
            <div className="font-medium text-blue-300 mb-2">Globale Attribute</div>
            <p className="text-sm text-slate-300">
              Einige Attribute können bei <strong>allen</strong> Elementen verwendet werden:
              id, class, style, title, hidden, tabindex, lang.
            </p>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'html-semantic',
        type: 'multiple-choice',
        question: 'Welches Element ist KEIN semantisches HTML5-Element?',
        options: [
          '<div>',
          '<header>',
          '<article>',
          '<nav>',
        ],
        correctAnswer: '<div>',
        explanation:
          '<div> ist ein generisches Container-Element ohne semantische Bedeutung. Im Gegensatz dazu beschreiben <header>, <article> und <nav> die Bedeutung ihres Inhalts (Kopfbereich, Artikel, Navigation).',
      },
      {
        id: 'html-structure',
        type: 'multiple-choice',
        question: 'Was muss in einem korrekten HTML5-Dokument IMMER als erstes stehen?',
        options: [
          '<!DOCTYPE html>',
          '<html>',
          '<head>',
          '<meta charset="UTF-8">',
        ],
        correctAnswer: '<!DOCTYPE html>',
        explanation:
          'Die DOCTYPE-Deklaration muss immer die erste Zeile sein. Sie teilt dem Browser mit, dass es sich um HTML5 handelt und aktiviert den Standardmodus.',
      },
      {
        id: 'html-form',
        type: 'multi-select',
        question: 'Welche Attribute gehören zu einem vollständigen Formular-Input? (Mehrere Antworten möglich)',
        options: ['type', 'name', 'href', 'value', 'src'],
        correctAnswer: ['type', 'name', 'value'],
        explanation:
          'type definiert die Art des Inputs (text, password, email, etc.), name ist wichtig für die Formularübertragung, und value enthält den aktuellen Wert. href gehört zu <a>-Links, src zu <img>-Bildern.',
      },
    ],
  },
}
