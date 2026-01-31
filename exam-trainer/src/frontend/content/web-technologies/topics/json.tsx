// src/content/web-technologies/topics/json.tsx
import type { Topic } from '@/core/types/content'

export const jsonTopic: Topic = {
  id: 'json',
  title: 'JSON - JavaScript Object Notation',
  description: 'Datenformat, Syntax, Datentypen, Verwendung',
  examNotes: 'Syntax und gültige Datentypen kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            JSON ist ein <strong>leichtgewichtiges Datenformat</strong> zum
            Austausch von strukturierten Daten zwischen Client und Server.
          </p>
          <p>
            Es ist <strong>sprachunabhängig</strong> und wird von praktisch
            allen Programmiersprachen unterstützt. JSON ist der De-facto-Standard
            für Web-APIs.
          </p>
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-medium text-slate-200 mb-2">Vorteile von JSON:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Menschenlesbar und leicht verständlich</li>
              <li>Kompakter als XML</li>
              <li>Einfaches Parsen in JavaScript</li>
              <li>Breite Unterstützung in allen Programmiersprachen</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'syntax',
      title: 'Syntax',
      content: (
        <div className="space-y-4">
          <p>JSON kennt genau <strong>sechs Datentypen</strong>:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Datentyp</th>
                  <th className="text-left py-2 px-3">Beispiel</th>
                  <th className="text-left py-2 px-3">Hinweis</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-blue-400">Object</td>
                  <td className="py-2 px-3 font-mono text-sm">{`{"name": "Max"}`}</td>
                  <td className="py-2 px-3 text-slate-400">Schlüssel-Wert-Paare in geschweiften Klammern</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-green-400">Array</td>
                  <td className="py-2 px-3 font-mono text-sm">{`[1, 2, 3]`}</td>
                  <td className="py-2 px-3 text-slate-400">Geordnete Liste in eckigen Klammern</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-amber-400">String</td>
                  <td className="py-2 px-3 font-mono text-sm">{`"Hallo Welt"`}</td>
                  <td className="py-2 px-3 text-slate-400">Immer in doppelten Anführungszeichen</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-purple-400">Number</td>
                  <td className="py-2 px-3 font-mono text-sm">42, 3.14, -17</td>
                  <td className="py-2 px-3 text-slate-400">Integer oder Dezimalzahl, keine Anführungszeichen</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-cyan-400">Boolean</td>
                  <td className="py-2 px-3 font-mono text-sm">true, false</td>
                  <td className="py-2 px-3 text-slate-400">Kleingeschrieben, keine Anführungszeichen</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-red-400">null</td>
                  <td className="py-2 px-3 font-mono text-sm">null</td>
                  <td className="py-2 px-3 text-slate-400">Repräsentiert "kein Wert"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-900/20 rounded-lg border border-amber-800">
            <h4 className="font-medium text-amber-300 mb-2">Wichtige Regeln:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Schlüssel müssen <strong>immer Strings</strong> in doppelten Anführungszeichen sein</li>
              <li>Kein Trailing Comma (kein Komma nach dem letzten Element)</li>
              <li>Keine Kommentare erlaubt</li>
              <li>Keine <code className="font-mono bg-slate-700 px-1 rounded">undefined</code> - nur <code className="font-mono bg-slate-700 px-1 rounded">null</code></li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'examples',
      title: 'Beispiele',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
              <span className="text-lg">✓</span> Gültiges JSON
            </h4>
            <pre className="p-4 bg-slate-800/70 rounded-lg border border-slate-700 font-mono text-sm overflow-x-auto">
              <code className="text-slate-200">{`{
  "name": "Anna Müller",
  "alter": 28,
  "istStudent": false,
  "hobbys": ["Lesen", "Schwimmen"],
  "adresse": {
    "stadt": "Berlin",
    "plz": "10115"
  },
  "telefon": null
}`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
              <span className="text-lg">✗</span> Ungültiges JSON
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/70 rounded-lg border border-red-800/50">
                <code className="font-mono text-sm text-slate-200">{`{ name: "Max" }`}</code>
                <p className="text-sm text-red-300 mt-1">Fehler: Schlüssel ohne Anführungszeichen</p>
              </div>
              <div className="p-3 bg-slate-800/70 rounded-lg border border-red-800/50">
                <code className="font-mono text-sm text-slate-200">{`{ "name": 'Max' }`}</code>
                <p className="text-sm text-red-300 mt-1">Fehler: Einfache Anführungszeichen statt doppelte</p>
              </div>
              <div className="p-3 bg-slate-800/70 rounded-lg border border-red-800/50">
                <code className="font-mono text-sm text-slate-200">{`{ "name": "Max", }`}</code>
                <p className="text-sm text-red-300 mt-1">Fehler: Trailing Comma nach letztem Element</p>
              </div>
              <div className="p-3 bg-slate-800/70 rounded-lg border border-red-800/50">
                <code className="font-mono text-sm text-slate-200">{`{ "wert": undefined }`}</code>
                <p className="text-sm text-red-300 mt-1">Fehler: undefined ist kein gültiger JSON-Wert</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <h4 className="font-medium text-blue-300 mb-2">JSON vs. JavaScript Object Literal</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 mb-2">JSON (strikt):</p>
                <pre className="p-2 bg-slate-800 rounded font-mono text-slate-200">{`{"name": "Max"}`}</pre>
              </div>
              <div>
                <p className="text-slate-400 mb-2">JS Object (flexibel):</p>
                <pre className="p-2 bg-slate-800 rounded font-mono text-slate-200">{`{name: "Max"}`}</pre>
              </div>
            </div>
            <p className="text-slate-300 mt-3 text-sm">
              JavaScript erlaubt unquotierte Schlüssel und Trailing Commas - JSON nicht!
            </p>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'rest', title: 'REST', relationship: 'API Datenformat' },
    { id: 'http', title: 'HTTP', relationship: 'im Body' },
    { id: 'kubernetes-manifests', title: 'K8s Manifests', relationship: 'ähnlich wie YAML' },
  ],

  examTasks: [
    {
      id: 'json-xml-task',
      title: 'JSON & Datenformate',
      points: 20,
      context: (
        <div className="space-y-2">
          <p>Für unsere Meta Playlists Anwendung speichern wir Playlist-Daten. Eine Playlist hat:</p>
          <ul className="list-disc list-inside text-slate-300 ml-4">
            <li>name (String)</li>
            <li>user (String)</li>
            <li>duration (Zahl in Minuten)</li>
            <li>tracks (Array von Track-Objekten mit title, link, duration)</li>
          </ul>
        </div>
      ),
      parts: [
        {
          id: 'json-xml-a',
          type: 'code-write',
          language: 'json',
          question: 'Erstellen Sie für die Playlist-Klasse ein Beispielobjekt in JSON mit mindestens 2 Tracks.',
          placeholder: '{\n  "name": "...",\n  ...\n}',
          modelAnswer: `{
  "name": "My Playlist",
  "user": "Max",
  "duration": 45.5,
  "tracks": [
    {
      "title": "Song 1",
      "link": "https://example.com/song1",
      "duration": 3.25
    },
    {
      "title": "Song 2",
      "link": "https://example.com/song2",
      "duration": 4.10
    }
  ]
}`,
          keyPoints: [
            'Gültiges JSON-Format',
            'Doppelte Anführungszeichen für Schlüssel und Strings',
            'Verschachtelte Objekte für Tracks',
            'Array-Syntax korrekt',
          ],
          explanation: 'JSON erfordert strenge Syntax: doppelte Anführungszeichen, kein Trailing Comma.',
        },
        {
          id: 'json-xml-b',
          type: 'free-text',
          question: 'Welche Vor- oder Nachteile würde der Einsatz von XML statt JSON hier im Kontext unserer Meta-Playlist-Anwendung bieten?',
          placeholder: 'XML ist eine Metasprache...',
          modelAnswer: 'XML ist eine Metasprache zur Definition komplexer Strukturen mit Attributen und Schemas. Für unsere Playlist-Anwendung bietet XML keinen Mehrwert: Es würde die Datenmenge und den Verarbeitungsaufwand erhöhen, ohne greifbaren Nutzen. JSON ermöglicht bereits die strukturierte Speicherung und Übertragung, ist kompakter, leichter lesbar und in JavaScript direkt nutzbar.',
          keyPoints: [
            'XML als Metasprache erklärt',
            'Kein Mehrwert für einfache Datenstrukturen',
            'JSON kompakter und einfacher',
            'Verarbeitungsaufwand bei XML höher',
          ],
          explanation: 'JSON ist für Web-APIs der De-facto-Standard, da es leichtgewichtig und JavaScript-nativ ist.',
        },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        id: 'json-datatypes',
        type: 'multi-select',
        question: 'Welche Datentypen gibt es in JSON? (Mehrere Antworten möglich)',
        options: ['String', 'Number', 'Boolean', 'undefined', 'null', 'Function'],
        correctAnswer: ['String', 'Number', 'Boolean', 'null'],
        explanation:
          'JSON unterstützt genau sechs Datentypen: Object, Array, String, Number, Boolean und null. "undefined" und "Function" sind JavaScript-spezifisch und existieren in JSON nicht.',
      },
      {
        id: 'json-valid-syntax',
        type: 'multiple-choice',
        question: 'Welches der folgenden Beispiele ist gültiges JSON?',
        options: [
          '{"name": "Max", "alter": 25}',
          '{name: "Max", alter: 25}',
          "{'name': 'Max', 'alter': 25}",
          '{"name": "Max", "alter": 25,}',
        ],
        correctAnswer: '{"name": "Max", "alter": 25}',
        explanation:
          'Nur die erste Option ist gültiges JSON: Schlüssel müssen in doppelten Anführungszeichen stehen, Strings ebenfalls, und es darf kein Trailing Comma geben.',
      },
      {
        id: 'json-vs-js',
        type: 'multiple-choice',
        question: 'Was ist der Hauptunterschied zwischen JSON und einem JavaScript Object Literal?',
        options: [
          'JSON erfordert doppelte Anführungszeichen für Schlüssel, JS Object Literals nicht',
          'JSON unterstützt mehr Datentypen als JS Objects',
          'JS Objects können nicht verschachtelt werden',
          'Es gibt keinen Unterschied',
        ],
        correctAnswer: 'JSON erfordert doppelte Anführungszeichen für Schlüssel, JS Object Literals nicht',
        explanation:
          'In JSON müssen alle Schlüssel in doppelten Anführungszeichen stehen. JavaScript Object Literals sind flexibler: Schlüssel können ohne Anführungszeichen geschrieben werden, wenn sie gültige Bezeichner sind.',
      },
    ],
  },
}
