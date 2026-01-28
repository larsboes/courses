# Playlist-Applikation

Die Meta-Playlist-App aus dem Kurs kann in der Klausur erweitert werden!

## Klassenstruktur

```
┌─────────────────────────────────────────┐
│              Playlist                    │
├─────────────────────────────────────────┤
│ - name: string                          │
│ - user: string                          │
│ - duration: number                      │
│ - tracks: Track[]                       │
└─────────────────────────────────────────┘
                    │
                    │ 1:n
                    ▼
┌─────────────────────────────────────────┐
│               Track                      │
├─────────────────────────────────────────┤
│ - title: string                         │
│ - link: string                          │
│ - duration: number                      │
│ - access_credentials?: AccessCredentials│
└─────────────────────────────────────────┘
                    │
                    │ 0..1
                    ▼
┌─────────────────────────────────────────┐
│         AccessCredentials               │
├─────────────────────────────────────────┤
│ - uID: string                           │
│ - token: string                         │
└─────────────────────────────────────────┘
```

## JSON-Beispiel (Klausur-Musterlösung)

```json
{
    "name": "My Playlist",
    "user": "Ich",
    "duration": 10.30,
    "tracks": [
        {
            "title": "Track_1",
            "link": "https://somelink.com/track_1",
            "duration": 3.15,
            "access_credentials": {
                "uID": "my_ID",
                "token": "some_token"
            }
        },
        {
            "title": "Track_2",
            "link": "https://somelink.com/track_2",
            "duration": 7.15
        }
    ]
}
```

## HTML-Struktur

```html
<body>
    <!-- Playlist Display -->
    <div class="playlist">
        <h2>Playlist Details</h2>
        <ul id="playlist"></ul>
        <div id="total-duration">Total Duration: 0:00</div>
        <button id="save-playlist">Save Playlist</button>
    </div>
</body>
```

## JavaScript: Playlist befüllen

```javascript
// 1. Element holen
const playlistContainer = document.getElementById('playlist');

// 2. Über Tracks iterieren
playlists[currentPlaylist].forEach((track, index) => {

    // 3. Neues <li> erstellen
    const li = document.createElement('li');

    // 4. Inhalt setzen
    li.innerHTML = `
        <a href="${track.link}" target="_blank">
            ${track.title} (${track.duration})
        </a>
        <button onclick="removeTrack(${index})">Remove</button>
    `;

    // 5. An Liste anhängen
    playlistContainer.appendChild(li);
});
```

## DOM nach JavaScript-Ausführung

```
<ul id="playlist">
├── <li>
│   ├── <a href="https://somelink.com/track_1" target="_blank">
│   │   └── "Track_1 (3.15)"
│   └── <button onclick="removeTrack(0)">
│       └── "Remove"
└── <li>
    ├── <a href="https://somelink.com/track_2" target="_blank">
    │   └── "Track_2 (7.15)"
    └── <button onclick="removeTrack(1)">
        └── "Remove"
```

## CSS für Playlist

```css
/* Header grün */
h2 {
    color: green;
}

/* Track-Links blau */
li a {
    color: blue;
}
```

## REST API Endpoints

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/playlists` | Alle Playlists abrufen |
| GET | `/playlists?duration=300` | Playlists mit Mindestlaufzeit |
| GET | `/playlists/{id}` | Eine Playlist abrufen |
| POST | `/playlists` | Neue Playlist erstellen |
| PUT | `/playlists/{id}` | Playlist aktualisieren |
| DELETE | `/playlists/{id}` | Playlist löschen |

## Beispiel HTTP Request

```http
GET /playlists?duration=300 HTTP/1.1
Host: playlist-server.com:8001
User-Agent: Mein Browser
Accept: application/json

```

## Architektur

```
┌─────────────┐       HTTP/REST       ┌─────────────┐
│   Browser   │ <===================> │   Flask     │
│  (Client)   │                       │  (Server)   │
│             │                       │             │
│ - HTML      │                       │ - Routes    │
│ - CSS       │                       │ - REST API  │
│ - JavaScript│                       │             │
└─────────────┘                       └─────────────┘
                                            │
                                            │ REST API
                                            ▼
                                      ┌─────────────┐
                                      │  CouchDB    │
                                      │ (Datenbank) │
                                      └─────────────┘
```

## Kubernetes Deployment

```yaml
# Deployment für Playlist-Server
apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: playlist
  template:
    spec:
      containers:
      - name: flask-container
        image: playlist-server:latest
        ports:
        - containerPort: 8000
---
# Service für externen Zugriff
kind: Service
metadata:
  name: playlist-service
spec:
  type: NodePort
  selector:
    app: playlist
  ports:
  - port: 8000
    nodePort: 22000
```
