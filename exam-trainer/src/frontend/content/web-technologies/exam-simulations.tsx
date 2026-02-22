// src/content/web-technologies/exam-simulations.tsx
import type { ExamSimulation } from '@/core/types/content'
import { httpTopic } from './topics/http'
import { jsonTopic } from './topics/json'
import { javascriptDomTopic } from './topics/javascript-dom'
import { kubernetesManifestsTopic } from './topics/kubernetes-manifests'

// ─────────────────────────────────────────────────
// Set 1: Probeklausur (Original)
// Referenziert die existierenden Exam Tasks aus den Topics
// ─────────────────────────────────────────────────

const probeklausur: ExamSimulation = {
  id: 'probeklausur',
  title: 'Probeklausur (Original)',
  description: 'Die originale Probeklausur von Prof. Stehr mit 4 Aufgaben. Identisch zur Übungsklausur.',
  durationMinutes: 90,
  totalPoints: 90,
  tasks: [
    httpTopic.examTasks![0],             // REST & HTTP (20P)
    jsonTopic.examTasks![0],             // JSON & Datenformate (20P)
    javascriptDomTopic.examTasks![0],    // HTML, CSS, JS & DOM (30P)
    kubernetesManifestsTopic.examTasks![0], // Container & Kubernetes (20P)
  ],
}

// ─────────────────────────────────────────────────
// Set 2: Variante A
// Gleiche Themen, andere Fragen - basierend auf
// wahrscheinlichen Klausur-Variationen
// ─────────────────────────────────────────────────

const varianteA: ExamSimulation = {
  id: 'variante-a',
  title: 'Variante A – Alternativklausur',
  description: 'Alternative Klausur mit ähnlichen Themen aber anderen Fragestellungen. POST statt GET, Track statt Playlist, addEventListener, ConfigMap.',
  durationMinutes: 90,
  totalPoints: 90,
  tasks: [
    // ── Aufgabe 1: REST & HTTP (20P) ──
    {
      id: 'va-rest-http',
      title: 'REST & HTTP',
      points: 20,
      context: (
        <div className="space-y-2">
          <p>
            Für unsere Meta Playlists haben wir folgende REST Endpoints definiert:
          </p>
          <ul className="list-disc list-inside text-slate-300 ml-4">
            <li><code className="px-1.5 py-0.5 bg-slate-700 rounded text-sm">GET /playlists</code> – liefert alle Playlists</li>
            <li><code className="px-1.5 py-0.5 bg-slate-700 rounded text-sm">GET /playlists/:id</code> – liefert eine Playlist nach ID</li>
            <li><code className="px-1.5 py-0.5 bg-slate-700 rounded text-sm">POST /playlists/:id/tracks</code> – fügt einen Track hinzu</li>
          </ul>
        </div>
      ),
      parts: [
        {
          id: 'va-rest-a',
          type: 'free-text' as const,
          question: 'Was ist der Unterschied zwischen GET und POST? Wann verwendet man welche Methode?',
          placeholder: 'GET wird verwendet um...',
          modelAnswer: 'GET wird verwendet, um Daten abzufragen – es ist idempotent (mehrfaches Aufrufen hat den gleichen Effekt) und hat keinen Request Body. Die Parameter werden in der URL übergeben. POST wird verwendet, um neue Daten zu erstellen oder zu senden – es hat einen Request Body und ist nicht idempotent (jeder Aufruf kann eine neue Ressource erzeugen). GET-Anfragen können gecached und als Bookmark gespeichert werden, POST nicht.',
          keyPoints: [
            'GET für Abfragen, POST für Erstellen/Senden',
            'GET ist idempotent, POST nicht',
            'GET hat keinen Body, POST hat Body',
            'GET-Parameter in URL, POST-Daten im Body',
          ],
          explanation: 'HTTP-Methoden haben definierte Semantik: GET liest, POST erstellt.',
        },
        {
          id: 'va-rest-b',
          type: 'free-text' as const,
          question: 'Was ist der Unterschied zwischen Path-Parametern (z.B. /playlists/:id) und Query-Parametern (z.B. /playlists?duration=300)? Wann nutzt man was?',
          placeholder: 'Path-Parameter identifizieren...',
          modelAnswer: 'Path-Parameter identifizieren eine spezifische Ressource (z.B. /playlists/42 für Playlist mit ID 42). Sie sind Teil der Ressourcen-Hierarchie. Query-Parameter filtern oder modifizieren die Abfrage (z.B. /playlists?duration=300 für Playlists mit Mindestlaufzeit). Path-Parameter für Identifikation, Query-Parameter für Filterung/Sortierung/Paginierung.',
          keyPoints: [
            'Path-Parameter identifizieren Ressourcen',
            'Query-Parameter für Filter/Sortierung',
            'Path = Teil der URL-Hierarchie',
            'Query = nach dem ? angehängt',
          ],
          explanation: 'Die Unterscheidung ist zentral für gutes REST-API-Design.',
        },
        {
          id: 'va-rest-c',
          type: 'code-write' as const,
          language: 'http' as const,
          question: 'Schreiben Sie einen vollständigen HTTP Request, um einen neuen Track zur Playlist mit ID 5 hinzuzufügen. Der Track hat den Titel "Stairway to Heaven" und den Link "https://spotify.com/track/123".',
          placeholder: 'POST /playlists/...',
          modelAnswer: `POST /playlists/5/tracks HTTP/1.1
Host: playlist-server.com:8001
Content-Type: application/json
Accept: application/json

{
  "title": "Stairway to Heaven",
  "link": "https://spotify.com/track/123"
}`,
          keyPoints: [
            'POST Methode (nicht GET)',
            'Korrekter Path mit ID: /playlists/5/tracks',
            'Content-Type: application/json Header',
            'JSON Body mit title und link',
          ],
          explanation: 'POST-Requests haben im Gegensatz zu GET einen Body. Content-Type teilt dem Server das Format mit.',
        },
        {
          id: 'va-rest-d',
          type: 'free-text' as const,
          question: 'Erklären Sie die HTTP Status Codes 200, 201, 404 und 500. In welchem Kontext treten sie bei unserer API auf?',
          placeholder: '200 bedeutet...',
          modelAnswer: '200 OK: Erfolgreiche Anfrage (z.B. GET /playlists liefert die Liste). 201 Created: Neue Ressource erfolgreich erstellt (z.B. POST /playlists/5/tracks erstellt einen neuen Track). 404 Not Found: Ressource existiert nicht (z.B. GET /playlists/999 wenn ID 999 nicht existiert). 500 Internal Server Error: Serverfehler (z.B. Datenbankverbindung fehlgeschlagen). 2xx = Erfolg, 4xx = Client-Fehler, 5xx = Server-Fehler.',
          keyPoints: [
            '200 = Erfolg (GET-Antwort)',
            '201 = Erstellt (POST-Antwort)',
            '404 = Nicht gefunden (falsche ID)',
            '500 = Serverfehler',
          ],
          explanation: 'Status Codes sind in Kategorien unterteilt: 2xx Erfolg, 3xx Umleitung, 4xx Client-Fehler, 5xx Server-Fehler.',
        },
      ],
    },

    // ── Aufgabe 2: JSON & Datenformate (20P) ──
    {
      id: 'va-json',
      title: 'JSON & Datenformate',
      points: 20,
      context: (
        <div className="space-y-2">
          <p>In unserer Playlist-Anwendung hat ein einzelner Track folgende Eigenschaften:</p>
          <ul className="list-disc list-inside text-slate-300 ml-4">
            <li>title (String)</li>
            <li>link (String – URL zum Streaming-Dienst)</li>
            <li>duration (Zahl in Minuten, z.B. 3.45)</li>
            <li>access_credentials (Objekt mit uID und token)</li>
          </ul>
        </div>
      ),
      parts: [
        {
          id: 'va-json-a',
          type: 'code-write' as const,
          language: 'json' as const,
          question: 'Erstellen Sie ein Beispiel-Track-Objekt als gültiges JSON.',
          placeholder: '{\n  "title": "...",\n  ...\n}',
          modelAnswer: `{
  "title": "Bohemian Rhapsody",
  "link": "https://spotify.com/track/456",
  "duration": 5.55,
  "access_credentials": {
    "uID": "user_42",
    "token": "abc123xyz"
  }
}`,
          keyPoints: [
            'Gültiges JSON mit doppelten Anführungszeichen',
            'Alle 4 Felder vorhanden',
            'Verschachteltes Objekt für access_credentials',
            'Korrekte Datentypen (String, Number, Object)',
          ],
          explanation: 'JSON erfordert strenge Syntax: doppelte Anführungszeichen, kein Trailing Comma, keine Kommentare.',
        },
        {
          id: 'va-json-b',
          type: 'free-text' as const,
          question: 'Finden Sie die Fehler im folgenden JSON und erklären Sie, warum sie ungültig sind.',
          visual: (
            <pre className="p-3 bg-slate-800 rounded-lg font-mono text-sm overflow-x-auto text-red-300">
{`{
  name: "My Playlist",
  'user': "Max",
  "duration": 45.5,
  "tracks": [
    {
      "title": "Song 1",
      "link": "https://example.com",
    },
  ],
}`}
            </pre>
          ),
          placeholder: 'Fehler 1: ...',
          modelAnswer: 'Fehler 1: "name" hat keine Anführungszeichen um den Schlüssel – JSON erfordert doppelte Anführungszeichen für alle Schlüssel. Fehler 2: \'user\' nutzt einfache Anführungszeichen – JSON erlaubt nur doppelte. Fehler 3: Trailing Comma nach "https://example.com" im Track-Objekt. Fehler 4: Trailing Comma nach dem letzten Element im tracks-Array. Fehler 5: Trailing Comma nach dem Array-Ende (vor der schließenden Klammer).',
          keyPoints: [
            'Schlüssel müssen in doppelten Anführungszeichen stehen',
            'Keine einfachen Anführungszeichen erlaubt',
            'Kein Trailing Comma erlaubt',
          ],
          explanation: 'JSON ist strenger als JavaScript-Objektliterale. Häufige Fehler: fehlende Anführungszeichen und Trailing Commas.',
        },
        {
          id: 'va-json-c',
          type: 'free-text' as const,
          question: 'Vergleichen Sie JSON und YAML. Was sind Vor- und Nachteile der beiden Formate im Kontext von Web-Anwendungen und Kubernetes?',
          placeholder: 'JSON ist...',
          modelAnswer: 'JSON: kompakt, streng definiert, in JavaScript direkt nutzbar (JSON.parse), Standard für Web-APIs und Datenübertragung. Nachteil: keine Kommentare, weniger lesbar bei tiefer Verschachtelung. YAML: besser lesbar (Einrückung statt Klammern), unterstützt Kommentare, Standard für Kubernetes-Manifests und Konfigurationsdateien. Nachteil: Einrückungsfehler können schwer zu finden sein, nicht direkt in JavaScript nutzbar, komplexere Parsing-Regeln. Für Web-APIs: JSON. Für Konfiguration: YAML.',
          keyPoints: [
            'JSON: streng, kompakt, JavaScript-nativ',
            'YAML: lesbar, Kommentare, K8s-Standard',
            'JSON für APIs, YAML für Konfiguration',
            'YAML-Einrückung fehleranfällig',
          ],
          explanation: 'Beide Formate können die gleichen Datenstrukturen abbilden, haben aber unterschiedliche Stärken.',
        },
      ],
    },

    // ── Aufgabe 3: HTML, CSS, JavaScript & DOM (30P) ──
    {
      id: 'va-html-css-js',
      title: 'HTML, CSS, JavaScript & DOM',
      points: 30,
      context: (
        <div className="space-y-4">
          <p>Betrachten Sie folgenden HTML-Ausschnitt einer Musikplayer-Seite:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-sm overflow-x-auto">
{`<body>
  <header id="main-header">
    <h1>Music Player</h1>
    <nav class="main-nav">
      <a href="/playlists">Playlists</a>
      <a href="/search">Search</a>
    </nav>
  </header>
  <main>
    <div class="track-list">
      <ul id="tracks"></ul>
    </div>
    <button id="load-btn">Load Tracks</button>
  </main>
</body>`}
          </pre>
          <p>Und folgendes JavaScript-Fragment:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-sm overflow-x-auto">
{`const loadBtn = document.getElementById('load-btn');
const trackList = document.getElementById('tracks');

loadBtn.addEventListener('click', () => {
  fetch('/api/tracks')
    .then(response => response.json())
    .then(tracks => {
      trackList.innerHTML = '';
      tracks.forEach(track => {
        const li = document.createElement('li');
        li.className = 'track-item';
        li.textContent = track.title + ' (' + track.duration + ')';
        trackList.appendChild(li);
      });
    });
});`}
          </pre>
        </div>
      ),
      parts: [
        {
          id: 'va-hcj-a',
          type: 'free-text' as const,
          question: 'Beschreiben Sie die Zwecke von HTML, CSS und JavaScript im Zusammenspiel. Was ist das DOM?',
          placeholder: 'HTML dient...',
          modelAnswer: 'HTML beschreibt die Struktur und den Inhalt einer Web-Seite (Überschriften, Absätze, Listen, Links). CSS definiert das visuelle Erscheinungsbild: Farben, Schriften, Größen, Positionen und Layout. JavaScript fügt Interaktivität hinzu: Event-Handling, dynamische Inhaltsänderungen, API-Aufrufe. Das DOM (Document Object Model) ist die baumartige Repräsentation des HTML-Dokuments im Speicher des Browsers. JavaScript kann das DOM lesen und manipulieren, um die Seite dynamisch zu verändern.',
          keyPoints: [
            'HTML für Struktur/Inhalt',
            'CSS für Styling/Layout',
            'JavaScript für Interaktivität',
            'DOM als Baumstruktur im Browser',
          ],
          explanation: 'Die Trennung von Struktur (HTML), Darstellung (CSS) und Verhalten (JS) ist ein fundamentales Web-Prinzip.',
        },
        {
          id: 'va-hcj-b',
          type: 'code-write' as const,
          language: 'css' as const,
          question: 'Schreiben Sie CSS, so dass: 1) Der Header (#main-header) einen dunklen Hintergrund hat. 2) Die Navigation-Links (.main-nav a) in weiß dargestellt werden. 3) Jedes Track-Element (.track-item) einen unteren Rand bekommt.',
          placeholder: '#main-header {\n  ...\n}',
          modelAnswer: `#main-header {
  background-color: #1a1a2e;
}

.main-nav a {
  color: white;
}

.track-item {
  border-bottom: 1px solid #333;
}`,
          keyPoints: [
            'ID-Selektor mit # für main-header',
            'Verschachtelter Selektor .main-nav a',
            'Klassen-Selektor .track-item',
            'Korrekte CSS-Properties (background-color, color, border-bottom)',
          ],
          explanation: 'CSS-Selektoren: #id für IDs, .klasse für Klassen, element für Tags. Verschachtelte Selektoren (parent child) wählen Kinder innerhalb eines Elternelements.',
        },
        {
          id: 'va-hcj-c',
          type: 'free-text' as const,
          question: 'Erläutern Sie Schritt für Schritt, was das JavaScript-Fragment macht. Was passiert, wenn der Benutzer auf den Button klickt?',
          placeholder: 'Zunächst holt sich das Programm...',
          modelAnswer: 'Zunächst holt sich das Programm zwei DOM-Elemente: den Button mit ID "load-btn" und die leere Liste mit ID "tracks". Dann wird ein Event Listener auf den Button registriert, der auf Click-Events reagiert. Wenn der Button geklickt wird: 1) fetch() sendet einen GET-Request an /api/tracks. 2) Die JSON-Antwort wird geparst. 3) Die bestehende Liste wird geleert (innerHTML = \'\'). 4) Für jeden Track wird ein neues li-Element erstellt, mit der CSS-Klasse "track-item" versehen und mit Titel und Dauer als Textinhalt befüllt. 5) Jedes li wird mit appendChild() an die ul-Liste angehängt.',
          keyPoints: [
            'getElementById holt Button und Liste',
            'addEventListener registriert Click-Handler',
            'fetch() für API-Aufruf',
            'innerHTML leert die Liste',
            'createElement + appendChild für neue Einträge',
          ],
          explanation: 'Dieses Pattern – Event → fetch → DOM-Update – ist typisch für dynamische Web-Anwendungen.',
        },
        {
          id: 'va-hcj-d',
          type: 'free-text' as const,
          question: 'Geben Sie das DOM des <main>-Bereichs nach dem Laden von 2 Tracks als Baumstruktur an.',
          placeholder: 'main\n  ├── div.track-list\n  │   └── ...',
          modelAnswer: `main
  ├── div.track-list
  │   └── ul#tracks
  │       ├── li.track-item
  │       │   └── [text: "Song 1 (3:45)"]
  │       └── li.track-item
  │           └── [text: "Song 2 (4:20)"]
  └── button#load-btn
      └── [text: "Load Tracks"]`,
          keyPoints: [
            'main als Wurzel',
            'div.track-list enthält ul#tracks',
            '2 li.track-item als Kinder von ul',
            'Textknoten in jedem li',
            'button#load-btn als Geschwister von div',
          ],
          explanation: 'Das DOM nach JS-Ausführung enthält die dynamisch erstellten Elemente. Textknoten sind Blätter des Baums.',
        },
      ],
    },

    // ── Aufgabe 4: Kubernetes (20P) ──
    {
      id: 'va-kubernetes',
      title: 'Container & Kubernetes',
      points: 20,
      context: (
        <div className="space-y-4">
          <p>Gegeben ist folgendes Kubernetes-Manifest:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-xs overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: playlist
  template:
    metadata:
      labels:
        app: playlist
    spec:
      containers:
      - name: api-container
        image: playlist-api:v2
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: api-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  DB_HOST: "postgres-service"
  DB_PORT: "5432"
  API_VERSION: "v2"
---
apiVersion: v1
kind: Service
metadata:
  name: playlist-service
spec:
  selector:
    app: playlist
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP`}
          </pre>
        </div>
      ),
      parts: [
        {
          id: 'va-k8s-a',
          type: 'free-text' as const,
          question: 'Was ist ein Deployment und warum setzen wir replicas auf 3? Was passiert, wenn ein Pod abstürzt?',
          placeholder: 'Ein Deployment beschreibt...',
          modelAnswer: 'Ein Deployment beschreibt den gewünschten Zustand einer Anwendung: welches Container-Image, wie viele Instanzen (replicas), welche Konfiguration. replicas: 3 bedeutet, dass Kubernetes stets 3 Pods gleichzeitig betreibt. Das erhöht die Verfügbarkeit (Ausfallsicherheit) und ermöglicht Load Balancing über die Pods. Wenn ein Pod abstürzt, erkennt Kubernetes das automatisch und startet einen neuen Pod, um wieder auf 3 replicas zu kommen (Self-Healing).',
          keyPoints: [
            'Deployment = gewünschter Zustand',
            'replicas für Verfügbarkeit/Skalierung',
            'Self-Healing bei Pod-Absturz',
            'Load Balancing über mehrere Pods',
          ],
          explanation: 'Deployments sind der Standard-Weg, um zustandslose Anwendungen in Kubernetes zu betreiben.',
        },
        {
          id: 'va-k8s-b',
          type: 'free-text' as const,
          question: 'Was ist die ConfigMap in diesem Manifest? Warum nutzen wir sie statt die Werte direkt im Container-Image zu speichern?',
          placeholder: 'Eine ConfigMap ist...',
          modelAnswer: 'Eine ConfigMap speichert Konfigurationsdaten als Schlüssel-Wert-Paare (hier: DB_HOST, DB_PORT, API_VERSION). Der Container liest diese über envFrom als Umgebungsvariablen. Vorteile: 1) Konfiguration ist vom Container-Image getrennt – das gleiche Image kann in verschiedenen Umgebungen (Dev, Staging, Prod) mit unterschiedlicher Konfiguration laufen. 2) Konfigurationsänderungen erfordern kein neues Image-Build. 3) Zentrale Verwaltung der Konfiguration im Cluster.',
          keyPoints: [
            'ConfigMap = Schlüssel-Wert-Konfiguration',
            'Trennung von Code und Konfiguration',
            'Gleiches Image, verschiedene Umgebungen',
            'Änderung ohne Image-Rebuild',
          ],
          explanation: 'ConfigMaps folgen dem 12-Factor-App-Prinzip: Konfiguration gehört nicht in den Code.',
        },
        {
          id: 'va-k8s-c',
          type: 'free-text' as const,
          question: 'Der Service hat type: ClusterIP. Erklären Sie die drei Service-Typen ClusterIP, NodePort und LoadBalancer. Warum reicht hier ClusterIP?',
          placeholder: 'ClusterIP bedeutet...',
          modelAnswer: 'ClusterIP (Standard): Service ist nur innerhalb des Clusters erreichbar. Bekommt eine virtuelle IP, die nur cluster-intern auflösbar ist. NodePort: Öffnet einen Port (30000-32767) auf jedem Node des Clusters. Von außen erreichbar über Node-IP:NodePort. LoadBalancer: Erstellt einen externen Load Balancer (z.B. bei Cloud-Providern). Verteilt Traffic an die Pods. ClusterIP reicht hier, weil die Playlist-API vermutlich von anderen Services im Cluster (z.B. einem Frontend) aufgerufen wird und nicht direkt von außen erreichbar sein muss. Der Name "playlist-service" kann cluster-intern als DNS-Name verwendet werden.',
          keyPoints: [
            'ClusterIP: nur cluster-intern',
            'NodePort: Port auf jedem Node, von außen erreichbar',
            'LoadBalancer: externer LB (Cloud)',
            'ClusterIP reicht für interne Kommunikation',
          ],
          explanation: 'Die Wahl des Service-Typs hängt davon ab, wer den Service erreichen muss: intern oder extern.',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────
// Export all simulations
// ─────────────────────────────────────────────────

export const examSimulations: ExamSimulation[] = [
  probeklausur,
  varianteA,
]
