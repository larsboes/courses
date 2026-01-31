// src/content/web-technologies/topics/rest.tsx
import type { Topic } from '@/core/types/content'
import { RestEndpointsDiagram } from '../diagrams/RestEndpointsDiagram'

export const restTopic: Topic = {
  id: 'rest',
  title: 'REST - Representational State Transfer',
  description: 'REST-Prinzipien, Ressourcen, CRUD-Mapping, Best Practices',
  examNotes: 'HTTP-Methoden und URI-Design verstehen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            REST ist ein <strong>Architekturstil</strong> für verteilte Systeme,
            der auf HTTP aufbaut und standardisierte Schnittstellen definiert.
          </p>
          <div className="space-y-3">
            <h4 className="font-medium text-slate-200">Die 6 REST-Prinzipien:</h4>
            <div className="grid gap-2">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-blue-400">1. Client-Server</span>
                <p className="text-sm text-slate-400 mt-1">
                  Strikte Trennung von Client und Server ermöglicht unabhängige Entwicklung.
                </p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-green-400">2. Zustandslos (Stateless)</span>
                <p className="text-sm text-slate-400 mt-1">
                  Jeder Request enthält alle nötigen Informationen. Der Server speichert keinen Session-State.
                </p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-amber-400">3. Cacheable</span>
                <p className="text-sm text-slate-400 mt-1">
                  Responses können gecacht werden, um Performance zu verbessern.
                </p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-purple-400">4. Einheitliche Schnittstelle</span>
                <p className="text-sm text-slate-400 mt-1">
                  Ressourcen werden über URIs identifiziert, Manipulation über Repräsentationen.
                </p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-cyan-400">5. Schichtenarchitektur</span>
                <p className="text-sm text-slate-400 mt-1">
                  Client weiß nicht, ob er direkt mit dem Server oder einem Proxy kommuniziert.
                </p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="font-medium text-rose-400">6. Code on Demand (optional)</span>
                <p className="text-sm text-slate-400 mt-1">
                  Server kann ausführbaren Code an Client senden (z.B. JavaScript).
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'resources',
      title: 'Ressourcen',
      content: (
        <div className="space-y-4">
          <p>
            In REST ist alles eine <strong>Ressource</strong> - ein Objekt oder eine Sammlung
            von Objekten, die über eine URI angesprochen wird.
          </p>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-200">URI-Design:</h4>
            <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm space-y-2">
              <div className="text-slate-400"># Collection (Plural, Substantive)</div>
              <div className="text-blue-300">/users</div>
              <div className="text-blue-300">/products</div>
              <div className="text-blue-300">/orders</div>

              <div className="text-slate-400 mt-4"># Item (mit ID)</div>
              <div className="text-green-300">/users/123</div>
              <div className="text-green-300">/products/abc-456</div>

              <div className="text-slate-400 mt-4"># Verschachtelte Ressourcen</div>
              <div className="text-amber-300">/users/123/orders</div>
              <div className="text-amber-300">/users/123/orders/789</div>
            </div>
          </div>

          <div className="grid gap-3 mt-4">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-green-400 font-bold">DO</span>
              <div>
                <code className="text-green-300">/users</code>,{' '}
                <code className="text-green-300">/orders/123</code>
                <p className="text-sm text-slate-400 mt-1">Substantive, Plural, hierarchisch</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-red-400 font-bold">DON'T</span>
              <div>
                <code className="text-red-300">/getUsers</code>,{' '}
                <code className="text-red-300">/createOrder</code>
                <p className="text-sm text-slate-400 mt-1">Keine Verben - die HTTP-Methode bestimmt die Aktion</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'crud-mapping',
      title: 'CRUD Mapping',
      content: (
        <div className="space-y-4">
          <p>
            CRUD-Operationen werden auf HTTP-Methoden abgebildet.
            Klicke auf die Endpoints für Details:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">CRUD</th>
                  <th className="text-left py-2 px-3">HTTP</th>
                  <th className="text-left py-2 px-3">Endpoint</th>
                  <th className="text-left py-2 px-3">Response</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Create</td>
                  <td className="py-2 px-3 font-mono text-green-400">POST</td>
                  <td className="py-2 px-3 font-mono">/users</td>
                  <td className="py-2 px-3">201 Created</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Read (alle)</td>
                  <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                  <td className="py-2 px-3 font-mono">/users</td>
                  <td className="py-2 px-3">200 OK</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Read (einer)</td>
                  <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                  <td className="py-2 px-3 font-mono">/users/123</td>
                  <td className="py-2 px-3">200 OK</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Update</td>
                  <td className="py-2 px-3 font-mono text-amber-400">PUT</td>
                  <td className="py-2 px-3 font-mono">/users/123</td>
                  <td className="py-2 px-3">200 OK</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Delete</td>
                  <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                  <td className="py-2 px-3 font-mono">/users/123</td>
                  <td className="py-2 px-3">204 No Content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: RestEndpointsDiagram,
      },
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-2">Versionierung</h4>
              <div className="font-mono text-sm space-y-1 text-slate-300">
                <div>/api/<span className="text-green-400">v1</span>/users</div>
                <div>/api/<span className="text-green-400">v2</span>/users</div>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Version in der URL ermöglicht parallele API-Versionen.
              </p>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="font-medium text-amber-400 mb-2">Pagination</h4>
              <div className="font-mono text-sm text-slate-300">
                /users?<span className="text-amber-300">limit=20</span>&<span className="text-amber-300">offset=40</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Bei großen Collections: limit (Anzahl) und offset (Start) verwenden.
              </p>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="font-medium text-purple-400 mb-2">Filtering & Sorting</h4>
              <div className="font-mono text-sm space-y-1 text-slate-300">
                <div>/users?<span className="text-purple-300">role=admin</span>&<span className="text-purple-300">active=true</span></div>
                <div>/products?<span className="text-purple-300">sort=price</span>&<span className="text-purple-300">order=desc</span></div>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Query-Parameter für Filter und Sortierung, nicht im Pfad.
              </p>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="font-medium text-cyan-400 mb-2">Fehlerbehandlung</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300">
                <div>{'{'}</div>
                <div className="ml-4">"error": {'{'}</div>
                <div className="ml-8">"code": <span className="text-red-400">"USER_NOT_FOUND"</span>,</div>
                <div className="ml-8">"message": <span className="text-green-400">"User mit ID 123 existiert nicht"</span></div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Einheitliches Fehlerformat mit Code und lesbarer Nachricht.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'http', title: 'HTTP', relationship: 'baut auf' },
    { id: 'json', title: 'JSON', relationship: 'Datenformat' },
    { id: 'kubernetes-netzwerk', title: 'K8s Netzwerk', relationship: 'API-Zugriff' },
    { id: 'playlist-app', title: 'Playlist App', relationship: 'Praxisbeispiel' },
  ],

  connectionDiagram: `
flowchart LR
  subgraph Client["Client"]
    Browser["Browser"]
    App["App"]
  end

  subgraph API["REST API"]
    Endpoint["/api/v1/playlists"]
  end

  subgraph Server["Backend"]
    Handler["Request Handler"]
    DB["Datenbank"]
  end

  Browser -->|"HTTP GET"| Endpoint
  App -->|"HTTP POST"| Endpoint
  Endpoint -->|"Route"| Handler
  Handler -->|"Query"| DB
  Handler -->|"JSON Response"| Endpoint

  style Endpoint fill:#3b82f6,stroke:#1d4ed8
`,

  quiz: {
    questions: [
      {
        id: 'rest-principles',
        type: 'multi-select',
        question: 'Welche sind die REST-Prinzipien? (Mehrere Antworten)',
        options: [
          'Zustandslosigkeit (Stateless)',
          'Verbindungsorientiert',
          'Client-Server-Trennung',
          'Einheitliche Schnittstelle',
          'Synchrone Kommunikation',
        ],
        correctAnswer: [
          'Zustandslosigkeit (Stateless)',
          'Client-Server-Trennung',
          'Einheitliche Schnittstelle',
        ],
        explanation:
          'REST basiert auf 6 Prinzipien: Client-Server, Stateless, Cacheable, Einheitliche Schnittstelle, Schichtenarchitektur, und optional Code on Demand. "Verbindungsorientiert" und "Synchrone Kommunikation" sind keine REST-Prinzipien.',
      },
      {
        id: 'rest-http-mapping',
        type: 'multiple-choice',
        question: 'Welche HTTP-Methode wird verwendet, um eine neue Ressource zu erstellen?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 'POST',
        explanation:
          'POST wird für das Erstellen (Create) neuer Ressourcen verwendet. Der Server weist der neuen Ressource eine ID zu und gibt 201 Created zurück. PUT ersetzt eine existierende Ressource, GET liest und DELETE löscht.',
      },
      {
        id: 'rest-uri-design',
        type: 'multiple-choice',
        question: 'Welche URI folgt den REST-Konventionen?',
        options: [
          '/api/getUsers',
          '/api/users/create',
          '/api/v1/users',
          '/api/user/all',
        ],
        correctAnswer: '/api/v1/users',
        explanation:
          'REST-URIs verwenden Substantive im Plural (/users, nicht /user), keine Verben (/getUsers und /create sind falsch), und optionale Versionierung (/v1/). Die Aktion wird durch die HTTP-Methode bestimmt, nicht durch die URI.',
      },
    ],
  },
}
