// src/content/web-technologies/topics/http.tsx
import type { Topic } from '@/core/types/content'
import { HttpFlowDiagram } from '../diagrams/HttpFlowDiagram'
import { HttpRequestExplorer } from '../diagrams/HttpRequestExplorer'

export const httpTopic: Topic = {
  id: 'http',
  title: 'HTTP - Hypertext Transfer Protocol',
  description: 'Requests & Responses, Aufbau, Methoden, Status Codes',
  examNotes: 'Struktur kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            HTTP ist ein <strong>zustandsloses Protokoll</strong> für die
            Kommunikation im Web auf der Anwendungsschicht (Layer 5).
          </p>
          <p>
            Der Client (z.B. Browser) sendet einen <strong>Request</strong>,
            der Server antwortet mit einer <strong>Response</strong>.
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: HttpFlowDiagram,
      },
    },
    {
      id: 'request-structure',
      title: 'HTTP Request Aufbau',
      content: (
        <p>
          Jeder HTTP Request besteht aus vier Teilen. Klicke auf die Bereiche
          für Details:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: HttpRequestExplorer,
      },
    },
    {
      id: 'methods',
      title: 'HTTP Methoden',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3">Methode</th>
                <th className="text-left py-2 px-3">Beschreibung</th>
                <th className="text-left py-2 px-3">Idempotent</th>
                <th className="text-left py-2 px-3">Body</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                <td className="py-2 px-3">Ressource abrufen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-green-400">POST</td>
                <td className="py-2 px-3">Neue Ressource erstellen</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-amber-400">PUT</td>
                <td className="py-2 px-3">Ressource ersetzen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                <td className="py-2 px-3">Ressource löschen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-purple-400">PATCH</td>
                <td className="py-2 px-3">Teilweise aktualisieren</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'status-codes',
      title: 'Status Codes',
      content: (
        <div className="space-y-4">
          <p>Status Codes zeigen das Ergebnis der Anfrage:</p>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-2xl font-bold text-green-400">2xx</span>
              <div>
                <div className="font-medium text-green-300">Erfolg</div>
                <div className="text-sm text-slate-400">200 OK, 201 Created, 204 No Content</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="text-2xl font-bold text-amber-400">4xx</span>
              <div>
                <div className="font-medium text-amber-300">Client-Fehler</div>
                <div className="text-sm text-slate-400">400 Bad Request, 401 Unauthorized, 404 Not Found</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-2xl font-bold text-red-400">5xx</span>
              <div>
                <div className="font-medium text-red-300">Server-Fehler</div>
                <div className="text-sm text-slate-400">500 Internal Server Error, 503 Service Unavailable</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'rest', title: 'REST', relationship: 'erweitert durch' },
    { id: 'dns-tls', title: 'DNS/TLS', relationship: 'HTTPS' },
    { id: 'browser-rendering', title: 'Browser Rendering', relationship: 'liefert HTML/CSS/JS' },
    { id: 'json', title: 'JSON', relationship: 'Datenformat im Body' },
  ],

  connectionDiagram: `
flowchart LR
  subgraph Request["HTTP Request"]
    Method["GET /playlists"]
    Headers["Host, Accept"]
    ReqBody["Body (optional)"]
  end

  subgraph Response["HTTP Response"]
    Status["200 OK"]
    RespHeaders["Content-Type"]
    RespBody["JSON/HTML Body"]
  end

  Client["Client"] -->|"1. Request"| Request
  Request -->|"2. Senden"| Server["Server"]
  Server -->|"3. Verarbeiten"| Response
  Response -->|"4. Antwort"| Client

  style Request fill:#3b82f6,stroke:#1d4ed8
  style Response fill:#22c55e,stroke:#16a34a
`,

  quiz: {
    questions: [
      {
        id: 'http-stateless',
        type: 'multiple-choice',
        question: 'Was bedeutet es, dass HTTP "zustandslos" ist?',
        options: [
          'Der Server speichert keine Informationen zwischen Requests',
          'HTTP kann nur GET-Anfragen verarbeiten',
          'Die Verbindung bleibt immer offen',
          'Jeder Request muss verschlüsselt sein',
        ],
        correctAnswer: 'Der Server speichert keine Informationen zwischen Requests',
        explanation:
          'Zustandslos bedeutet, dass jeder Request unabhängig ist. Der Server "erinnert" sich nicht an vorherige Requests. Für Sessions werden daher Cookies oder Tokens verwendet.',
      },
      {
        id: 'http-idempotent',
        type: 'multi-select',
        question: 'Welche HTTP-Methoden sind idempotent? (Mehrere Antworten möglich)',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        correctAnswer: ['GET', 'PUT', 'DELETE'],
        explanation:
          'Idempotent bedeutet: Mehrfaches Ausführen hat den gleichen Effekt wie einmaliges Ausführen. GET liest nur, PUT ersetzt komplett, DELETE löscht. POST und PATCH können bei Wiederholung unterschiedliche Ergebnisse erzeugen.',
      },
      {
        id: 'http-404',
        type: 'multiple-choice',
        question: 'Was bedeutet der Status Code 404?',
        options: [
          'Not Found - Die angeforderte Ressource wurde nicht gefunden',
          'Bad Request - Die Anfrage war fehlerhaft',
          'Unauthorized - Authentifizierung erforderlich',
          'Internal Server Error - Serverfehler',
        ],
        correctAnswer: 'Not Found - Die angeforderte Ressource wurde nicht gefunden',
        explanation:
          '404 ist ein Client-Fehler (4xx) und bedeutet, dass die URL nicht existiert. Der Server hat die Anfrage verstanden, aber keine passende Ressource gefunden.',
      },
      {
        id: 'http-request-write',
        type: 'free-text',
        question:
          'Schreiben Sie einen HTTP GET Request, der alle Playlists mit einer Mindestlaufzeit von 300 Minuten abfragt. Server: server.com:8001',
        placeholder: 'GET /playlists...',
        modelAnswer: `GET /playlists?min_duration=300 HTTP/1.1
Host: server.com:8001
Accept: application/json`,
        keyPoints: [
          'GET Methode fuer Abfrage',
          'Query-Parameter fuer Filterung (?min_duration=300)',
          'Host-Header mit Port',
          'Accept-Header fuer JSON-Antwort',
        ],
        explanation:
          'HTTP Requests bestehen aus Request-Line, Headers und optionalem Body. Query-Parameter werden fuer Filterung verwendet.',
      },
    ],
  },

  examTasks: [
    {
      id: 'rest-http-task',
      title: 'REST & HTTP',
      points: 20,
      context: (
        <p>
          Für unsere Meta Playlists haben wir einen REST Endpoint zur Abfrage von Playlists definiert:
          <code className="mx-2 px-2 py-1 bg-slate-700 rounded">/playlists</code>
          – liefert die Namen aller Playlists.
        </p>
      ),
      parts: [
        {
          id: 'rest-http-a',
          type: 'free-text',
          question: 'Was hat REST mit HTTP zu tun?',
          placeholder: 'REST nutzt HTTP...',
          modelAnswer: 'REST nutzt HTTP als Transportprotokoll. RESTful APIs verwenden HTTP-Methoden (GET, POST, PUT, DELETE) um CRUD-Operationen auf Ressourcen durchzuführen. HTTP stellt die Grundlage für die zustandslose Kommunikation.',
          keyPoints: [
            'HTTP als Transportprotokoll',
            'HTTP-Methoden für CRUD',
            'Zustandslose Kommunikation',
          ],
          explanation: 'REST ist ein Architekturstil, HTTP das Protokoll.',
        },
        {
          id: 'rest-http-b',
          type: 'free-text',
          question: 'Wie können wir die Abfrage erweitern um einen Zahlenwert für Mindestlaufzeit? Erläutern Sie den Mechanismus.',
          placeholder: 'Query-Parameter...',
          modelAnswer: 'Durch Query-Parameter in der URL: /playlists?min_duration=300. Query-Parameter werden nach dem ? angehängt und mit & getrennt. Vorteil: einfach, cachebar. Nachteil: in URL sichtbar, begrenzte Länge.',
          keyPoints: [
            'Query-Parameter nach ?',
            'Name=Wert Format',
            'Vor-/Nachteile erwähnt',
          ],
          explanation: 'Query-Parameter sind der Standard-Mechanismus für Filterung in REST APIs.',
        },
        {
          id: 'rest-http-c',
          type: 'code-write',
          language: 'http',
          question: 'Geben Sie einen HTTP Request für Playlists mit Laufzeit > 300 Minuten an.',
          placeholder: 'GET /playlists...',
          modelAnswer: `GET /playlists?min_duration=300 HTTP/1.1
Host: server.com:8001
Accept: application/json`,
          keyPoints: [
            'GET Methode',
            'Query-Parameter min_duration=300',
            'Host Header',
            'Accept Header',
          ],
          explanation: 'Ein vollständiger HTTP Request besteht aus Request-Line, Headers und optionalem Body.',
        },
        {
          id: 'rest-http-d',
          type: 'free-text',
          question: 'Welche technischen Möglichkeiten gibt es, den Endpoint zu testen?',
          placeholder: 'curl, Postman...',
          modelAnswer: 'curl (Kommandozeile), Postman/Insomnia (GUI), Browser DevTools, automatisierte Tests (Jest, pytest), OpenAPI/Swagger UI.',
          keyPoints: [
            'Kommandozeilen-Tools (curl)',
            'GUI-Tools (Postman)',
            'Browser DevTools',
            'Automatisierte Tests',
          ],
          explanation: 'Es gibt viele Möglichkeiten, REST APIs zu testen - von manuell bis automatisiert.',
        },
      ],
    },
  ],
}
