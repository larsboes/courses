// src/content/web-technologies/topics/rest.tsx
import type { Topic } from '@/core/types/content'
import { RestEndpointsDiagram } from '../diagrams/RestEndpointsDiagram'
import { RestEndpointDesigner } from '../diagrams/RestEndpointDesigner'

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
      id: 'endpoint-designer',
      title: 'Endpoint Designer (Interaktiv)',
      content: (
        <div className="space-y-4">
          <p>
            Teste dein Verstaendnis von REST-Endpoint-Design: Ordne Operationen den
            richtigen HTTP-Methoden, Pfaden und Status Codes zu. Drei Schwierigkeitsgrade
            von Basis-CRUD bis Query-Parameter.
          </p>
          <p className="text-sm text-slate-400">
            Klicke links auf eine Operation und dann rechts auf den passenden Endpoint.
          </p>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: RestEndpointDesigner,
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

  examTasks: [
    {
      id: 'rest-api-design-task',
      title: 'REST API Design',
      points: 20,
      context: (
        <p>
          Für die Playlist-App soll eine RESTful API entworfen werden. Die API verwaltet
          Playlists und deren Songs. Basis-URL: <code className="mx-1 px-2 py-1 bg-slate-700 rounded">http://api.example.com/v1</code>
        </p>
      ),
      parts: [
        {
          id: 'rest-task-a',
          type: 'free-text' as const,
          question: 'Was macht eine API "RESTful"? Nennen Sie mindestens 4 der 6 REST-Constraints und erklären Sie kurz, was jeder bedeutet.',
          placeholder: '1. Client-Server...\n2. ...',
          modelAnswer: 'Eine RESTful API erfüllt folgende Constraints:\n1. Client-Server: Strikte Trennung von Client und Server, unabhängige Entwicklung möglich.\n2. Stateless: Jeder Request enthält alle nötigen Informationen. Der Server speichert keinen Session-State.\n3. Cacheable: Responses müssen als cacheable oder non-cacheable markiert sein.\n4. Uniform Interface: Einheitliche Schnittstelle - Ressourcen über URIs identifiziert, Manipulation über Repräsentationen (JSON/XML).\n5. Layered System: Client weiß nicht, ob er direkt mit dem Server oder einem Proxy kommuniziert.\n6. Code on Demand (optional): Server kann ausführbaren Code senden (z.B. JavaScript).',
          keyPoints: [
            'Mindestens 4 Constraints genannt',
            'Client-Server Trennung',
            'Stateless (zustandslos)',
            'Uniform Interface / einheitliche Schnittstelle',
            'Kurze Erklärung zu jedem Constraint',
          ],
          explanation: 'REST ist ein Architekturstil mit klaren Prinzipien, nicht nur "HTTP mit JSON".',
        },
        {
          id: 'rest-task-b',
          type: 'code-write' as const,
          language: 'http' as const,
          question: 'Entwerfen Sie die REST-Endpoints für eine Playlist-CRUD-API. Listen Sie für jede Operation die HTTP-Methode, den Pfad und den erwarteten Status Code auf.',
          placeholder: '# Create Playlist\nPOST /v1/playlists → 201\n\n# Read all...',
          modelAnswer: `# Create Playlist
POST /v1/playlists → 201 Created

# Read all Playlists
GET /v1/playlists → 200 OK

# Read single Playlist
GET /v1/playlists/:id → 200 OK

# Update Playlist
PUT /v1/playlists/:id → 200 OK

# Delete Playlist
DELETE /v1/playlists/:id → 204 No Content

# Add Song to Playlist
POST /v1/playlists/:id/songs → 201 Created

# Get Songs of Playlist
GET /v1/playlists/:id/songs → 200 OK

# Delete Song from Playlist
DELETE /v1/playlists/:id/songs/:songId → 204 No Content`,
          keyPoints: [
            'CRUD korrekt auf HTTP-Methoden gemappt',
            'Ressourcen als Substantive im Plural',
            'Verschachtelte Ressource für Songs',
            'Korrekte Status Codes (201, 200, 204)',
          ],
          explanation: 'REST-Endpoints folgen Konventionen: Substantive für Ressourcen, HTTP-Methoden für Aktionen.',
        },
        {
          id: 'rest-task-c',
          type: 'free-text' as const,
          question: 'Erklären Sie das Konzept der Idempotenz. Welche HTTP-Methoden sind idempotent und welche nicht? Warum ist das wichtig?',
          placeholder: 'Idempotenz bedeutet...',
          modelAnswer: 'Idempotenz bedeutet, dass mehrfaches Ausführen derselben Operation das gleiche Ergebnis liefert wie einmaliges Ausführen.\n\nIdempotente Methoden: GET (liest nur), PUT (ersetzt komplett - gleiches Ergebnis), DELETE (nach dem ersten Löschen ist die Ressource weg - erneutes DELETE ändert nichts).\n\nNicht idempotent: POST (jeder Request kann neue Ressource erstellen), PATCH (kann je nach Implementierung unterschiedliche Ergebnisse haben).\n\nWichtigkeit: Bei Netzwerkfehlern kann ein Request wiederholt werden. Bei idempotenten Methoden ist das sicher, bei POST könnte eine doppelte Ressource entstehen.',
          keyPoints: [
            'Definition von Idempotenz korrekt',
            'GET, PUT, DELETE als idempotent identifiziert',
            'POST als nicht-idempotent identifiziert',
            'Praktische Relevanz (Netzwerkfehler, Retry)',
          ],
          explanation: 'Idempotenz ist ein wichtiges Konzept für zuverlässige verteilte Systeme.',
        },
        {
          id: 'rest-task-d',
          type: 'code-write' as const,
          language: 'json' as const,
          question: 'Schreiben Sie die JSON-Response für GET /v1/playlists/1. Die Playlist heißt "Workout Mix", hat 2 Songs und wurde am 15.01.2024 erstellt.',
          placeholder: '{\n  "id": 1,\n  ...\n}',
          modelAnswer: `{
  "id": 1,
  "name": "Workout Mix",
  "songs": [
    {
      "id": 1,
      "title": "Eye of the Tiger",
      "artist": "Survivor",
      "duration": "4:05"
    },
    {
      "id": 2,
      "title": "Lose Yourself",
      "artist": "Eminem",
      "duration": "5:26"
    }
  ],
  "createdAt": "2024-01-15T00:00:00Z"
}`,
          keyPoints: [
            'Korrektes JSON-Format (Kommas, Anführungszeichen)',
            'Playlist-Felder: id, name, songs',
            'Songs als Array mit Objekten',
            'Datum im ISO-Format',
          ],
          explanation: 'JSON ist das Standard-Datenformat für REST APIs. Die Struktur sollte konsistent und selbstbeschreibend sein.',
        },
      ],
    },
  ],
}
