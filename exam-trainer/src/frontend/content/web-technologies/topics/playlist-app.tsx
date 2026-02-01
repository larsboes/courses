// src/content/web-technologies/topics/playlist-app.tsx
import type { Topic } from '@/core/types/content'
import { PlaylistEvolutionTimeline, PlaylistApiExplorer, StorageEvolutionComparison } from '../diagrams'

export const playlistAppTopic: Topic = {
  id: 'playlist-app',
  title: 'Playlist App - Exam Projekt',
  description: 'Frontend, Backend, REST API und Kubernetes Deployment',
  examNotes: 'Zusammenhang zwischen allen Komponenten verstehen',

  sections: [
    {
      id: 'evolution-overview',
      title: 'Evolution der Playlist App',
      content: (
        <div className="space-y-6">
          <p>
            Die Playlist-App ist das zentrale <strong>Exam-Projekt</strong>, das alle
            Konzepte des Kurses vereint. Anstatt sie als fertiges Produkt zu betrachten,
            werden wir ihre <strong>Evolution</strong> verstehen - von einer einfachen
            HTML-Seite bis zur vollständigen Cloud-Anwendung.
          </p>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-700">
            <div className="text-blue-300 font-medium mb-3">Lernreise durch die Übungen:</div>
            <div className="text-sm text-slate-300">
              Jede Übung baut auf der vorherigen auf und führt neue Technologien ein.
              Diese schrittweise Entwicklung zeigt, wie moderne Webanwendungen entstehen.
            </div>
          </div>

          <PlaylistEvolutionTimeline />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">4</div>
              <div className="text-sm text-slate-300">Entwicklungsstufen</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-1">8+</div>
              <div className="text-sm text-slate-300">Technologien</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-purple-400 mb-1">1</div>
              <div className="text-sm text-slate-300">Vollständige App</div>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Was du lernen wirst:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li>HTML/CSS für Struktur und Styling (Ü7)</li>
              <li>JavaScript und localStorage für Interaktivität (Ü8)</li>
              <li>REST API mit Backend-Kommunikation (Ü10)</li>
              <li>Kubernetes Deployment für Production (Ü11)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'stage-ui',
      title: 'Stage 1: UI Foundation (Ü7)',
      content: (
        <div className="space-y-6">
          <p>
            In der ersten Stage bauen wir die <strong>Benutzeroberfläche</strong> mit
            HTML und CSS. Diese bildet das Fundament der gesamten Anwendung - die
            Struktur bleibt durch alle weiteren Stages erhalten.
          </p>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
            <div className="text-blue-300 font-medium mb-2">Übung 7: HTML/CSS Grundlagen</div>
            <div className="text-sm text-slate-300">
              Erstelle eine responsive Playlist-Manager-Oberfläche mit Formular,
              Playlist-Auswahl und Track-Liste.
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">HTML-Struktur (index.html)</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Playlist Manager</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Meta Playlist Manager</h1>

        <!-- Playlist Selection and Creation -->
        <div class="playlist-controls">
            <input type="text" id="playlist-name" placeholder="New Playlist Name" required>
            <button id="create-playlist">Create Playlist</button>
            <select id="playlist-select">
                <option value="" disabled selected>Select a Playlist</option>
            </select>
            <button id="delete-playlist">Delete Playlist</button>
        </div>

        <!-- Track Input Form -->
        <form id="track-form">
            <input type="text" id="title" placeholder="Track Title" required>
            <input type="url" id="link" placeholder="Track URL (Streaming Service Link)" required>
            <input type="text" id="duration" placeholder="Duration (mm:ss)">
            <button type="submit">Add Track</button>
        </form>

        <!-- Playlist Display -->
        <div class="playlist">
            <h2>Playlist Details</h2>
            <ul id="playlist"></ul>
            <div id="total-duration">Total Duration: 0:00</div>
            <button id="save-playlist">Save Playlist</button>
        </div>
    </div>
</body>
</html>`}</pre>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h4 className="font-medium text-green-400 mb-3">Semantische Elemente</h4>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li><code className="bg-slate-700 px-1 rounded">&lt;form&gt;</code> - Gruppiert Eingabefelder</li>
                  <li><code className="bg-slate-700 px-1 rounded">&lt;input&gt;</code> - Verschiedene Typen (text, url)</li>
                  <li><code className="bg-slate-700 px-1 rounded">&lt;select&gt;</code> - Dropdown für Playlist-Auswahl</li>
                  <li><code className="bg-slate-700 px-1 rounded">&lt;ul&gt;/&lt;li&gt;</code> - Liste für Tracks</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h4 className="font-medium text-purple-400 mb-3">ID-Attribute</h4>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li><code className="bg-slate-700 px-1 rounded">id="playlist-name"</code> - Für JS-Zugriff</li>
                  <li><code className="bg-slate-700 px-1 rounded">id="track-form"</code> - Form-Handler</li>
                  <li><code className="bg-slate-700 px-1 rounded">id="playlist"</code> - Dynamische Liste</li>
                  <li><code className="bg-slate-700 px-1 rounded">id="total-duration"</code> - Display-Element</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte in Stage 1:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>Viewport Meta Tag</strong> - Responsive Design auf Mobile</li>
              <li><strong>Semantische HTML5</strong> - Struktur durch bedeutungsvolle Tags</li>
              <li><strong>Form Elements</strong> - Input-Typen mit Validierung (required, type="url")</li>
              <li><strong>CSS-Verlinkung</strong> - Externe Stylesheet für Styling</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Status nach Stage 1:</div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">HTML Struktur</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">CSS Styling</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">Keine Funktionalität</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'stage-javascript',
      title: 'Stage 2: JavaScript + localStorage (Ü8)',
      content: (
        <div className="space-y-6">
          <p>
            In Stage 2 erwecken wir die App zum Leben. Mit <strong>JavaScript</strong>
            fügen wir Interaktivität hinzu und nutzen <strong>localStorage</strong>,
            um Daten im Browser zu speichern.
          </p>

          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
            <div className="text-green-300 font-medium mb-2">Übung 8: JavaScript & localStorage</div>
            <div className="text-sm text-slate-300">
              Implementiere CRUD-Operationen für Playlists und Tracks mit Persistenz
              im Browser-Storage.
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">DOM-Element-Referenzen</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// DOM elements
const playlistNameInput = document.getElementById('playlist-name');
const playlistSelect = document.getElementById('playlist-select');
const createPlaylistButton = document.getElementById('create-playlist');
const deletePlaylistButton = document.getElementById('delete-playlist');
const trackForm = document.getElementById('track-form');
const titleInput = document.getElementById('title');
const linkInput = document.getElementById('link');
const durationInput = document.getElementById('duration');
const playlistContainer = document.getElementById('playlist');
const savePlaylistButton = document.getElementById('save-playlist');
const totalDurationDisplay = document.getElementById('total-duration');

// Initialize playlists object to store multiple playlists
let playlists = {};
let currentPlaylist = null;`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">localStorage: Laden und Speichern</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// Load playlists from localStorage
window.onload = function() {
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
        updatePlaylistSelect();
    }
};

// Save all playlists to localStorage
savePlaylistButton.addEventListener('click', function() {
    const playlistsJSON = JSON.stringify(playlists);
    localStorage.setItem('playlists', playlistsJSON);
    alert('All playlists saved!');
});`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-purple-400 mb-3">Event Handling: Playlist erstellen</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// Create a new playlist
createPlaylistButton.addEventListener('click', function() {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        currentPlaylist = playlistName;
        updatePlaylistSelect();
        renderPlaylist();
        playlistNameInput.value = '';
        alert(\`Playlist "\${playlistName}" created!\`);
    } else {
        alert('Playlist name is required or already exists.');
    }
});`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-amber-400 mb-3">DOM-Manipulation: Playlist rendern</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`// Render the current playlist
function renderPlaylist() {
    playlistContainer.innerHTML = '';
    if (currentPlaylist && playlists[currentPlaylist]) {
        playlists[currentPlaylist].forEach((track, index) => {
            const li = document.createElement('li');
            li.innerHTML = \`
                <a href="\${track.link}" target="_blank">
                  \${track.title} (\${track.duration})
                </a>
                <button onclick="removeTrack(\${index})">Remove</button>
            \`;
            playlistContainer.appendChild(li);
        });
        updateTotalDuration();
    }
}`}</pre>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <div className="text-blue-300 font-medium mb-2">localStorage API</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">getItem(key)</code> - Wert lesen</li>
                <li><code className="bg-slate-700 px-1 rounded">setItem(key, value)</code> - Wert speichern</li>
                <li><code className="bg-slate-700 px-1 rounded">removeItem(key)</code> - Wert löschen</li>
                <li>Nur Strings - JSON.parse/stringify nötig!</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
              <div className="text-green-300 font-medium mb-2">DOM API</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">getElementById()</code> - Element finden</li>
                <li><code className="bg-slate-700 px-1 rounded">createElement()</code> - Element erstellen</li>
                <li><code className="bg-slate-700 px-1 rounded">appendChild()</code> - Element einfügen</li>
                <li><code className="bg-slate-700 px-1 rounded">innerHTML</code> - HTML setzen</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte in Stage 2:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>JSON.stringify/parse</strong> - Objekte zu/von Strings konvertieren</li>
              <li><strong>Event Listeners</strong> - Auf Benutzeraktionen reagieren</li>
              <li><strong>DOM Manipulation</strong> - Seite dynamisch aktualisieren</li>
              <li><strong>Closure</strong> - Zugriff auf äußere Variablen in Callbacks</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Status nach Stage 2:</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">HTML Struktur</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">CSS Styling</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">JavaScript Logic</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Browser Storage</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">Kein Backend</span>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
            <div className="text-purple-300 font-medium mb-2">Limitierung von localStorage:</div>
            <p className="text-sm text-slate-300">
              Daten sind nur auf diesem einen Browser/Gerät verfügbar. Andere Benutzer
              oder Geräte sehen die Playlists nicht. Dafür brauchen wir ein Backend!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'stage-rest',
      title: 'Stage 3: REST API (Ü9)',
      content: (
        <div className="space-y-6">
          <p>
            In Stage 3 ersetzen wir localStorage durch eine <strong>REST API</strong>.
            Das Backend mit Flask verwaltet die Daten zentral, sodass mehrere
            Benutzer dieselben Playlists sehen können.
          </p>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
            <div className="text-blue-300 font-medium mb-2">Übung 9: Flask REST API</div>
            <div className="text-sm text-slate-300">
              Implementiere einen Flask-Webserver mit REST-Endpoints für CRUD-Operationen
              auf Playlists und verbinde das Frontend über fetch().
            </div>
          </div>

          <PlaylistApiExplorer />

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">Flask Backend (webserver.py)</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`from flask import Flask, request, jsonify, send_from_directory

webserver = Flask(__name__)

# In-memory Storage für unsere Playlists
playlists = {}

@webserver.route('/')
def home():
    return send_from_directory('/pages', 'index.html')

@webserver.route('/playlists', methods=['GET'])
def get_playlists():
    return_playlists = []
    for name, plist in playlists.items():
        return_playlists.append(name)
    return jsonify(return_playlists)

@webserver.route('/playlists/<string:playlist_name>', methods=['GET'])
def get_playlist(playlist_name):
    playlist = playlists.get(playlist_name)
    if playlist is None:
        return jsonify({"error": "Playlist not found"}), 404
    return_playlist = {'name': playlist_name, 'tracks': playlist}
    return jsonify(return_playlist)

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    if not data or 'name' not in data or 'tracks' not in data:
        return jsonify({"error": "Invalid data"}), 400

    playlist_name = data['name']
    playlists[playlist_name] = data['tracks']
    return jsonify({"message": f"Playlist '{playlist_name}' added/updated."}), 201

@webserver.route('/playlists/<string:playlist_name>', methods=['DELETE'])
def delete_playlist(playlist_name):
    if playlist_name in playlists:
        del playlists[playlist_name]
        return jsonify({"message": f"Playlist '{playlist_name}' deleted."}), 200
    return jsonify({"error": "Playlist not found"}), 404

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8000)`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-purple-400 mb-3">Frontend: Von localStorage zu fetch()</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`const apiBaseUrl = "http://localhost:8001";

// Fetch all playlists from the Flask server
async function fetchPlaylists() {
  try {
    const response = await fetch(\`\${apiBaseUrl}/playlists\`);
    if (!response.ok) throw new Error("Failed to fetch playlists");
    const playlists = await response.json();

    // Update playlist select dropdown
    playlistSelect.innerHTML = '<option value="" disabled selected>Select a Playlist</option>';
    playlists.forEach((playlist) => {
      const option = document.createElement("option");
      option.value = playlist;
      option.textContent = playlist;
      playlistSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
}

// Save the current playlist to the Flask server
savePlaylistButton.addEventListener("click", async () => {
  try {
    const response = await fetch(\`\${apiBaseUrl}/playlists\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentPlaylist),
    });
    if (!response.ok) throw new Error("Failed to save playlist");
    alert("Playlist saved!");
    fetchPlaylists();
  } catch (error) {
    console.error("Error saving playlist:", error);
  }
});`}</pre>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
              <div className="text-green-300 font-medium mb-2">Flask Decorators</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">@webserver.route()</code> - URL-Mapping</li>
                <li><code className="bg-slate-700 px-1 rounded">methods=['GET']</code> - HTTP-Methode</li>
                <li><code className="bg-slate-700 px-1 rounded">jsonify()</code> - Python dict zu JSON</li>
                <li><code className="bg-slate-700 px-1 rounded">request.get_json()</code> - JSON parsen</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <div className="text-blue-300 font-medium mb-2">fetch() API</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">fetch(url)</code> - GET Request</li>
                <li><code className="bg-slate-700 px-1 rounded">method: "POST"</code> - Andere Methode</li>
                <li><code className="bg-slate-700 px-1 rounded">headers</code> - Content-Type setzen</li>
                <li><code className="bg-slate-700 px-1 rounded">body</code> - Request Body als JSON</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte in Stage 3:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>REST-Konventionen</strong> - Ressourcen als URLs, HTTP-Verben für Aktionen</li>
              <li><strong>HTTP Status Codes</strong> - 200 OK, 201 Created, 404 Not Found, 400 Bad Request</li>
              <li><strong>JSON Request/Response</strong> - Content-Type: application/json</li>
              <li><strong>async/await</strong> - Asynchrone Programmierung mit Promises</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Status nach Stage 3:</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">HTML/CSS</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Flask Backend</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">REST API</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">In-Memory (flüchtig)</span>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
            <div className="text-purple-300 font-medium mb-2">Limitierung von In-Memory Storage:</div>
            <p className="text-sm text-slate-300">
              Daten gehen bei Server-Neustart verloren! Für persistente Daten brauchen
              wir eine echte Datenbank wie CouchDB.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'stage-microservices',
      title: 'Stage 4: Microservices (Ü10)',
      content: (
        <div className="space-y-6">
          <p>
            In Stage 4 containerisieren wir die Anwendung und fügen <strong>CouchDB</strong>
            als persistente Datenbank hinzu. Mit <strong>Docker Compose</strong> orchestrieren
            wir beide Services.
          </p>

          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-800">
            <div className="text-orange-300 font-medium mb-2">Übung 10: Docker Compose + CouchDB</div>
            <div className="text-sm text-slate-300">
              Definiere eine Multi-Container-Umgebung mit Flask und CouchDB.
              Nutze Service-Dependencies und Healthchecks für zuverlässigen Start.
            </div>
          </div>

          <StorageEvolutionComparison />

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">docker-compose.yml</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`version: '3.8'
services:
  flask-webserver:
    build: .
    ports:
      - "8001:8001"
    depends_on:
      couchdb:
        condition: service_healthy
    environment:
      - COUCHDB_URL=http://\${COUCHDB_USER}:\${COUCHDB_PASSWORD}@couchdb:5984
    env_file:
      - .env

  couchdb:
    image: couchdb:latest
    restart: always
    ports:
      - "5984:5984"
    volumes:
      - ./local.ini:/opt/couchdb/etc/local.d/10-admins.ini
      - ./dbdata:/opt/couchdb/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5984"]
      interval: 10s
      timeout: 5s
      retries: 5`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">Flask mit CouchDB (webserver.py)</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`from flask import Flask, request, jsonify
import requests
import os

webserver = Flask(__name__)

couchdb_user = os.environ["COUCHDB_USER"]
couchdb_password = os.environ["COUCHDB_PASSWORD"]
couchdb_url = os.environ["COUCHDB_URL"]

def create_databases():
    databases = ["_users", "playlists"]
    for db in databases:
        response = requests.put(couchdb_url+"/"+db)
        if response.status_code == 201:
            print(f"Database {db} created successfully.")

@webserver.route('/playlists', methods=['GET'])
def get_playlists():
    response = requests.get(couchdb_url+"/playlists/_all_docs")
    if response.status_code == 200:
        playlists = [ row["id"].split(':')[1] for row in response.json()["rows"] ]
        return jsonify(playlists)
    return jsonify({"error": "Failed to retrieve playlists"}), response.status_code

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    doc_id = f"playlist:{data['name']}"
    playlist_doc = {
        "_id": doc_id,
        "name": data["name"],
        "tracks": data["tracks"]
    }
    response = requests.put(couchdb_url+"/playlists/"+doc_id, json=playlist_doc)
    if response.status_code in [201, 202]:
        return jsonify({"message": f"Playlist added/updated."}), 201
    return jsonify({"error": "Failed to save playlist"}), response.status_code

create_databases()

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8001)`}</pre>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <div className="text-blue-300 font-medium mb-2">Docker Compose Konzepte</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">depends_on</code> - Start-Reihenfolge</li>
                <li><code className="bg-slate-700 px-1 rounded">condition: service_healthy</code> - Warten auf Health</li>
                <li><code className="bg-slate-700 px-1 rounded">environment</code> - Env-Variablen</li>
                <li><code className="bg-slate-700 px-1 rounded">volumes</code> - Persistente Daten</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
              <div className="text-green-300 font-medium mb-2">Healthcheck</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><code className="bg-slate-700 px-1 rounded">test</code> - Check-Kommando</li>
                <li><code className="bg-slate-700 px-1 rounded">interval</code> - Prüfintervall</li>
                <li><code className="bg-slate-700 px-1 rounded">timeout</code> - Max. Wartezeit</li>
                <li><code className="bg-slate-700 px-1 rounded">retries</code> - Wiederholungen</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte in Stage 4:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>Service Discovery</strong> - Services erreichen sich über Container-Namen (couchdb:5984)</li>
              <li><strong>Environment Variables</strong> - Konfiguration über .env Files</li>
              <li><strong>Healthchecks</strong> - Sicherstellen, dass Abhängigkeiten bereit sind</li>
              <li><strong>Volumes</strong> - Daten überleben Container-Neustarts</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Status nach Stage 4:</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Frontend</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Flask API</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">CouchDB</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Docker Compose</span>
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Persistenz</span>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
            <div className="text-purple-300 font-medium mb-2">Von Docker zu Kubernetes:</div>
            <p className="text-sm text-slate-300">
              Docker Compose ist ideal für lokale Entwicklung. Für Production-Deployments
              mit Skalierung, Rolling Updates und Self-Healing brauchen wir Kubernetes!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'stage-kubernetes',
      title: 'Stage 5: Kubernetes (Ü12)',
      content: (
        <div className="space-y-6">
          <p>
            In der finalen Stage deployen wir die Anwendung in <strong>Kubernetes</strong>.
            Wir nutzen Deployments, Services und PersistentVolumeClaims für eine
            produktionsreife Architektur.
          </p>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
            <div className="text-purple-300 font-medium mb-2">Übung 12: Kubernetes Deployment</div>
            <div className="text-sm text-slate-300">
              Übersetze die Docker-Compose-Konfiguration in Kubernetes-Manifeste.
              Verstehe den Unterschied zwischen NodePort und ClusterIP Services.
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-blue-400 mb-3">Webserver Deployment</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webserver
  template:
    metadata:
      labels:
        app: webserver
    spec:
      containers:
      - name: webserver
        image: webserver:local
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
        env:
        - name: COUCHDB_URL
          value: couchdb:5984
        - name: COUCHDB_USER
          value: admin
        - name: COUCHDB_PASSWORD
          value: admin123`}</pre>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-green-400 mb-3">Webserver NodePort Service</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: v1
kind: Service
metadata:
  name: webserver
spec:
  selector:
    app: webserver
  ports:
  - protocol: TCP
    port: 8080
    targetPort: 8080
    nodePort: 32000
  type: NodePort`}</pre>
              </div>
              <div className="mt-3 text-sm text-slate-400">
                <strong>NodePort</strong>: Extern erreichbar auf Port 32000 aller Cluster-Nodes
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h4 className="font-medium text-orange-400 mb-3">CouchDB Deployment</h4>
                <div className="bg-slate-900 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: couchdb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: couchdb
  template:
    spec:
      containers:
      - name: couchdb
        image: couchdb:latest
        ports:
        - containerPort: 5984
        env:
        - name: COUCHDB_USER
          value: admin
        - name: COUCHDB_PASSWORD
          value: admin123
        volumeMounts:
        - name: couchdb-data
          mountPath: /opt/couchdb/data
      volumes:
      - name: couchdb-data
        persistentVolumeClaim:
          claimName: couchdb-pvc`}</pre>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h4 className="font-medium text-cyan-400 mb-3">CouchDB ClusterIP Service</h4>
                <div className="bg-slate-900 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre>{`apiVersion: v1
kind: Service
metadata:
  name: couchdb
spec:
  selector:
    app: couchdb
  ports:
  - protocol: TCP
    port: 5984
    targetPort: 5984
  type: ClusterIP`}</pre>
                </div>
                <div className="mt-3 text-sm text-slate-400">
                  <strong>ClusterIP</strong>: Nur intern erreichbar, Webserver nutzt DNS-Namen "couchdb"
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-pink-400 mb-3">PersistentVolume + PersistentVolumeClaim</h4>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`apiVersion: v1
kind: PersistentVolume
metadata:
  name: couchdb-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data/couchdb
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: couchdb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi`}</pre>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <div className="text-blue-300 font-medium mb-2">NodePort vs ClusterIP</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li><strong>NodePort</strong>: Extern erreichbar</li>
                <li><strong>ClusterIP</strong>: Nur intern</li>
                <li>Port 30000-32767 für NodePort</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
              <div className="text-green-300 font-medium mb-2">Service Discovery</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>DNS-Name = Service-Name</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">couchdb:5984</code></li>
                <li>Automatische Auflösung</li>
              </ul>
            </div>
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
              <div className="text-purple-300 font-medium mb-2">Persistent Storage</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>PV: Storage-Ressource</li>
                <li>PVC: Storage-Anfrage</li>
                <li>Daten überleben Pod-Tod</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-300 font-medium mb-2">Wichtige Konzepte in Stage 5:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>Deployment</strong> - Verwaltet ReplicaSets, ermöglicht Rolling Updates</li>
              <li><strong>Service</strong> - Stabile Netzwerk-Identität für Pods</li>
              <li><strong>Labels &amp; Selectors</strong> - Verbinden Services mit Pods</li>
              <li><strong>Environment Variables</strong> - Konfiguration im Container</li>
              <li><strong>PersistentVolumeClaim</strong> - Anforderung von persistentem Storage</li>
            </ul>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-700">
            <div className="text-green-300 font-medium mb-2">Finale Architektur:</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Frontend (HTML/CSS/JS)</span>
              <span className="text-slate-500">→</span>
              <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-sm">Flask API (Deployment)</span>
              <span className="text-slate-500">→</span>
              <span className="px-3 py-1 bg-orange-900/50 text-orange-400 rounded-full text-sm">CouchDB (Deployment + PVC)</span>
            </div>
            <div className="mt-3 text-sm text-slate-300">
              Vollständige Cloud-Native Anwendung mit Skalierbarkeit, Persistenz und Service Discovery!
            </div>
          </div>
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
