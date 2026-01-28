# Web Technologies - Klausurvorbereitung

> **Schnellstart:** [00-Cheat-Sheet.md](./00-Cheat-Sheet.md) - Alles auf einen Blick!

## Klausurrelevante Themen

| Thema | Details | Hinweise |
|-------|---------|----------|
| [**Cheat-Sheet**](./00-Cheat-Sheet.md) | Alles kompakt | Zum schnellen Wiederholen |
| [**HTTP**](./01-HTTP.md) | Requests & Responses, Aufbau | Struktur kennen |
| [**JSON**](./02-JSON.md) | Syntax und Struktur | - |
| [**HTML**](./03-HTML.md) | Grundlagen | - |
| [**CSS**](./04-CSS.md) | Grundlagen | - |
| [**JavaScript & DOM**](./05-JavaScript-DOM.md) | Event Listener, `getElementById`, DOM-Manipulation | Evtl. 1-2 Zeilen Code schreiben |
| [**REST**](./06-REST.md) | RESTful APIs, HTTP-Methoden | - |
| [**Kubernetes Begriffe**](./07-Kubernetes-Begriffe.md) | Nodes, Pods, Services, Volumes, PVC, Cluster IP, Node IP | Begriffe erklären |
| [**Kubernetes Manifests**](./08-Kubernetes-Manifests.md) | Lesen und als Diagramm darstellen | Nicht schreiben! |
| [**Kubernetes Netzwerk**](./09-Kubernetes-Netzwerk.md) | Virtuelles Netz, Node-Einbindung, Pod-Verteilung | **Sehr wichtig!!** |
| [**DNS & TLS**](./10-DNS-TLS.md) | Was ist es? Wozu wird es eingesetzt? | Nur oberflächlich |
| [**Playlist-App**](./11-Playlist-Applikation.md) | Klassenstruktur, JSON, DOM, API | Kann erweitert werden! |

## Quick Reference

### HTTP Request Struktur
```
GET /playlists?duration=300 HTTP/1.1
Host: server.com:8001
Accept: application/json

[Body optional]
```

### JSON Beispiel
```json
{"name": "Playlist", "tracks": [{"title": "Song 1"}]}
```

### JavaScript DOM
```javascript
const el = document.getElementById('playlist');
el.addEventListener('click', () => { ... });
const li = document.createElement('li');
container.appendChild(li);
```

### CSS Selektoren
```css
h2 { color: green; }      /* Element */
.class { }                 /* Klasse */
#id { }                    /* ID */
li a { color: blue; }     /* Verschachtelt */
```

### Kubernetes Begriffe
- **Node** = Rechner im Cluster (hat Node IP)
- **Pod** = Container-Gruppe (hat Cluster IP, nur intern)
- **Service** = Stabile Adresse für Pods
- **Deployment** = Gewünschter Zustand (replicas)

### Playlist-Applikation
Die im Kurs entwickelte Meta-Playlist-App kann in der Klausur erweitert werden!
