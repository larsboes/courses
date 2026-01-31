// src/content/web-technologies/topics/playlist-app.tsx
import type { Topic } from '@/core/types/content'

export const playlistAppTopic: Topic = {
  id: 'playlist-app',
  title: 'Playlist App - Exam Projekt',
  description: 'Frontend, Backend, REST API und Kubernetes Deployment',
  examNotes: 'Zusammenhang zwischen allen Komponenten verstehen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Das Exam-Projekt ist eine vollständige <strong>Playlist-App</strong>,
            die alle gelernten Web-Technologien kombiniert: HTML/CSS/JS Frontend,
            REST API Backend und Kubernetes Deployment.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-sm text-slate-400 mb-3">Projektanforderungen:</div>
            <div className="grid gap-3">
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                <div className="text-blue-400 font-medium mb-1">Frontend</div>
                <div className="text-sm text-slate-300">
                  HTML5-Struktur, CSS-Styling, JavaScript für DOM-Manipulation und API-Kommunikation
                </div>
              </div>
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <div className="text-green-400 font-medium mb-1">Backend</div>
                <div className="text-sm text-slate-300">
                  REST API mit CRUD-Operationen für Playlists und Songs
                </div>
              </div>
              <div className="p-3 bg-purple-900/20 rounded border border-purple-800">
                <div className="text-purple-400 font-medium mb-1">Deployment</div>
                <div className="text-sm text-slate-300">
                  Kubernetes Manifeste für Frontend und Backend Services
                </div>
              </div>
            </div>
          </div>
          <p>
            Die App ermöglicht es Nutzern, <strong>Playlists zu erstellen</strong>,
            <strong>Songs hinzuzufügen</strong> und <strong>Playlists zu verwalten</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'frontend',
      title: 'Frontend',
      content: (
        <div className="space-y-4">
          <p>
            Das Frontend besteht aus <strong>HTML</strong> für die Struktur,
            <strong>CSS</strong> für das Styling und <strong>JavaScript</strong>
            für die Interaktivität und API-Kommunikation.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">HTML-Struktur</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Playlist App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Meine Playlists</h1>
  </header>
  <main>
    <section id="playlist-form">
      <input type="text" id="playlist-name">
      <button id="create-btn">Erstellen</button>
    </section>
    <section id="playlists">
      <!-- Dynamisch gefüllt -->
    </section>
  </main>
  <script src="app.js"></script>
</body>
</html>`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">JavaScript API-Kommunikation</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// Alle Playlists laden
async function loadPlaylists() {
  const response = await fetch('/api/v1/playlists');
  const playlists = await response.json();
  renderPlaylists(playlists);
}

// Neue Playlist erstellen
async function createPlaylist(name) {
  const response = await fetch('/api/v1/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (response.status === 201) {
    loadPlaylists(); // Liste aktualisieren
  }
}

// Event-Handler
document.getElementById('create-btn')
  .addEventListener('click', () => {
    const name = document.getElementById('playlist-name').value;
    createPlaylist(name);
  });`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>fetch()</strong> - Moderne API für HTTP-Requests</li>
              <li><strong>async/await</strong> - Asynchrone Programmierung</li>
              <li><strong>JSON.stringify()</strong> - JavaScript-Objekt zu JSON</li>
              <li><strong>addEventListener()</strong> - Event-Handling</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'backend',
      title: 'Backend',
      content: (
        <div className="space-y-4">
          <p>
            Das Backend implementiert eine <strong>REST API</strong> mit CRUD-Operationen.
            Die API folgt REST-Konventionen: Ressourcen als Substantive, HTTP-Methoden
            für Aktionen.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">Playlist Endpoints</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3">Methode</th>
                      <th className="text-left py-2 px-3">Endpoint</th>
                      <th className="text-left py-2 px-3">Beschreibung</th>
                      <th className="text-left py-2 px-3">Response</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists</td>
                      <td className="py-2 px-3">Alle Playlists</td>
                      <td className="py-2 px-3">200 OK</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id</td>
                      <td className="py-2 px-3">Eine Playlist</td>
                      <td className="py-2 px-3">200 OK</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-green-400">POST</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists</td>
                      <td className="py-2 px-3">Playlist erstellen</td>
                      <td className="py-2 px-3">201 Created</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-amber-400">PUT</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id</td>
                      <td className="py-2 px-3">Playlist aktualisieren</td>
                      <td className="py-2 px-3">200 OK</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id</td>
                      <td className="py-2 px-3">Playlist löschen</td>
                      <td className="py-2 px-3">204 No Content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">Song Endpoints (verschachtelt)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3">Methode</th>
                      <th className="text-left py-2 px-3">Endpoint</th>
                      <th className="text-left py-2 px-3">Beschreibung</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id/songs</td>
                      <td className="py-2 px-3">Alle Songs einer Playlist</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-2 px-3 font-mono text-green-400">POST</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id/songs</td>
                      <td className="py-2 px-3">Song zur Playlist hinzufügen</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                      <td className="py-2 px-3 font-mono">/api/v1/playlists/:id/songs/:songId</td>
                      <td className="py-2 px-3">Song aus Playlist entfernen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-purple-400 mb-3">JSON Response Beispiel</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// GET /api/v1/playlists/1
{
  "id": 1,
  "name": "Workout Mix",
  "songs": [
    { "id": 1, "title": "Song A", "artist": "Artist X" },
    { "id": 2, "title": "Song B", "artist": "Artist Y" }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'deployment',
      title: 'Deployment',
      content: (
        <div className="space-y-4">
          <p>
            Die Playlist-App wird in <strong>Kubernetes</strong> deployed.
            Frontend und Backend laufen als separate Services, verbunden über
            interne DNS-Namen.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">Backend Deployment</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-api
  labels:
    app: playlist-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: playlist-api
  template:
    metadata:
      labels:
        app: playlist-api
    spec:
      containers:
      - name: api
        image: playlist-api:1.0
        ports:
        - containerPort: 8001`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">Backend Service</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: v1
kind: Service
metadata:
  name: playlist-api-service
spec:
  selector:
    app: playlist-api
  ports:
  - port: 80
    targetPort: 8001
  type: ClusterIP`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-purple-400 mb-3">Frontend Deployment + Service</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: playlist-frontend
  template:
    metadata:
      labels:
        app: playlist-frontend
    spec:
      containers:
      - name: frontend
        image: playlist-frontend:1.0
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: playlist-frontend-service
spec:
  selector:
    app: playlist-frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer`}</pre>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
              <div className="text-blue-400 font-medium mb-1">Backend Service</div>
              <div className="text-sm text-slate-300">
                <code className="bg-slate-700 px-1 rounded">ClusterIP</code> - nur intern erreichbar,
                Frontend kommuniziert über DNS-Namen
              </div>
            </div>
            <div className="p-3 bg-green-900/20 rounded border border-green-800">
              <div className="text-green-400 font-medium mb-1">Frontend Service</div>
              <div className="text-sm text-slate-300">
                <code className="bg-slate-700 px-1 rounded">LoadBalancer</code> - extern erreichbar
                für Benutzer
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Kommunikation im Cluster:</div>
            <p className="text-sm text-slate-300">
              Das Frontend erreicht das Backend über den Service-DNS-Namen:{' '}
              <code className="bg-slate-700 px-1 rounded">http://playlist-api-service/api/v1/playlists</code>.
              Kubernetes löst den Namen automatisch zur ClusterIP auf.
            </p>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'rest', title: 'REST', relationship: 'API Design' },
    { id: 'http', title: 'HTTP', relationship: 'Request/Response' },
    { id: 'json', title: 'JSON', relationship: 'Datenformat' },
    { id: 'html', title: 'HTML', relationship: 'Frontend Struktur' },
    { id: 'css', title: 'CSS', relationship: 'Frontend Styling' },
    { id: 'javascript-dom', title: 'JavaScript DOM', relationship: 'Interaktivität' },
    { id: 'kubernetes-manifests', title: 'K8s Manifests', relationship: 'Deployment' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph Frontend["Frontend (Browser)"]
    HTML["HTML Struktur"]
    CSS["CSS Styling"]
    JS["JavaScript DOM"]
  end

  subgraph Backend["Backend (Server)"]
    REST["REST API"]
    Logic["Business Logic"]
    DB["Datenbank"]
  end

  subgraph Deploy["Deployment (K8s)"]
    Pod1["Frontend Pod"]
    Pod2["Backend Pod"]
    Service["Service"]
  end

  HTML --> JS
  CSS --> HTML
  JS -->|"HTTP/JSON"| REST
  REST --> Logic
  Logic --> DB

  Pod1 -->|"enthält"| Frontend
  Pod2 -->|"enthält"| Backend
  Service -->|"loadbalancer"| Pod2

  style REST fill:#3b82f6,stroke:#1d4ed8
  style JS fill:#22c55e,stroke:#16a34a
`,

  quiz: {
    questions: [
      {
        id: 'playlist-api-endpoints',
        type: 'multiple-choice',
        question: 'Welcher Endpoint wird verwendet, um einen neuen Song zu einer Playlist hinzuzufügen?',
        options: [
          'PUT /api/v1/playlists/:id',
          'POST /api/v1/songs',
          'POST /api/v1/playlists/:id/songs',
          'PATCH /api/v1/playlists/:id/songs',
        ],
        correctAnswer: 'POST /api/v1/playlists/:id/songs',
        explanation:
          'Songs sind eine verschachtelte Ressource unter Playlists. POST erstellt eine neue Ressource, und der Pfad /playlists/:id/songs zeigt die Zugehörigkeit zur Playlist. Dies folgt REST-Konventionen für hierarchische Ressourcen.',
      },
      {
        id: 'playlist-frontend-backend',
        type: 'multiple-choice',
        question: 'Wie kommuniziert das Frontend mit dem Backend in der Playlist-App?',
        options: [
          'Über WebSockets mit bidirektionaler Verbindung',
          'Über HTTP-Requests mit fetch() und JSON-Daten',
          'Über direkten Datenbankzugriff aus dem Browser',
          'Über Server-Side Rendering ohne API-Calls',
        ],
        correctAnswer: 'Über HTTP-Requests mit fetch() und JSON-Daten',
        explanation:
          'Das Frontend nutzt die fetch()-API für asynchrone HTTP-Requests. Daten werden im JSON-Format ausgetauscht (Content-Type: application/json). Dies ist das Standard-Pattern für moderne Webanwendungen mit REST-APIs.',
      },
      {
        id: 'playlist-k8s-services',
        type: 'multiple-choice',
        question: 'Warum hat das Backend einen ClusterIP-Service und das Frontend einen LoadBalancer-Service?',
        options: [
          'ClusterIP ist schneller als LoadBalancer',
          'Das Backend braucht nur interne Erreichbarkeit, das Frontend muss extern erreichbar sein',
          'LoadBalancer funktioniert nur mit statischen Dateien',
          'Es gibt keinen technischen Grund, beide könnten LoadBalancer sein',
        ],
        correctAnswer: 'Das Backend braucht nur interne Erreichbarkeit, das Frontend muss extern erreichbar sein',
        explanation:
          'ClusterIP macht Services nur cluster-intern erreichbar - ideal für Backends, die nur von anderen Services angesprochen werden. LoadBalancer erstellt einen externen Endpunkt für Benutzer. Das Frontend ist der Einstiegspunkt und muss daher extern erreichbar sein.',
      },
    ],
  },
}
