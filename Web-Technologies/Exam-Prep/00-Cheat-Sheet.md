# WTA Klausur Cheat-Sheet

## HTTP

```
REQUEST:                          RESPONSE:
┌─────────────────────────┐       ┌─────────────────────────┐
│ GET /path?key=val HTTP/1.1│     │ HTTP/1.1 200 OK         │
│ Host: server.com        │       │ Content-Type: app/json  │
│ Accept: application/json│       │                         │
│                         │       │ {"data": "..."}         │
└─────────────────────────┘       └─────────────────────────┘
```

**Methoden:** GET (lesen), POST (erstellen), PUT (ersetzen), DELETE (löschen)

**Status:** 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error

---

## REST

- **Architekturstil** für verteilte Anwendungen
- Nutzt **HTTP-Methoden** für Ressourcen-Zugriff
- **Zustandslos** - jede Anfrage enthält alle Infos
- Ressourcen über **URIs** identifiziert

---

## JSON

```json
{
    "string": "text",
    "number": 42,
    "boolean": true,
    "null": null,
    "array": [1, 2, 3],
    "object": {"key": "value"}
}
```

**Regeln:** Doppelte Anführungszeichen, kein trailing comma, true/false/null kleingeschrieben

---

## HTML

```html
<!DOCTYPE html>
<html>
<head><title>Titel</title></head>
<body>
    <div id="eindeutig" class="mehrfach">
        <h1>Überschrift</h1>
        <p>Absatz</p>
        <ul><li>Liste</li></ul>
        <a href="url">Link</a>
        <button>Klick</button>
    </div>
</body>
</html>
```

---

## CSS

```css
element { }        /* alle <element> */
.class { }         /* class="class" */
#id { }            /* id="id" */
li a { }           /* <a> in <li> */

/* Wichtige Eigenschaften */
color: green;
background-color: #fff;
font-size: 16px;
margin: 10px;
padding: 10px;
```

---

## JavaScript DOM

```javascript
// Element holen
document.getElementById('id')
document.querySelector('.class')

// Element erstellen & anhängen
const el = document.createElement('li');
el.innerHTML = `<a href="${url}">${text}</a>`;
container.appendChild(el);

// Event Listener
button.addEventListener('click', () => { });
```

---

## Browser Rendering

```
HTML → DOM → ─────┐
                  ├──→ Rendering Tree → Layout → Paint (FMP)
CSS → CSSOM → ────┘
```

---

## Kubernetes Begriffe

| Begriff | Bedeutung |
|---------|-----------|
| **Node** | Rechner im Cluster (Node IP = von außen erreichbar) |
| **Pod** | Container-Gruppe (Cluster IP = nur intern) |
| **Service** | Stabile Adresse für Pods |
| **Deployment** | Gewünschter Zustand (replicas) |
| **Volume/PVC** | Persistenter Speicher |

---

## K8s Manifest lesen

```yaml
kind: Deployment
spec:
  replicas: 2           # → 2 Pods
  template:
    spec:
      containers:
      - image: nginx    # → nginx Container
        ports:
        - containerPort: 80
---
kind: Service
spec:
  type: NodePort
  ports:
  - nodePort: 22000     # → Von außen erreichbar
    port: 80
    targetPort: 80
  selector:
    app: web            # → Verbindet mit Pods label=app:web
```

---

## K8s Netzwerk

```
Außen → NodeIP:NodePort → Service → Pod (ClusterIP)
        192.168.1.10:22000         10.0.0.5:80
```

**Warum Service?**
- Pod-IPs ändern sich (dynamisch)
- Cluster-IPs nur intern erreichbar
- Service = stabile Adresse + Load Balancing

---

## DNS & TLS (oberflächlich)

**DNS:** Domain → IP-Adresse (`www.fhdw.de` → `185.x.x.x`)

**TLS:** Verschlüsselt Kommunikation (HTTP + TLS = HTTPS, Port 443)

---

## Playlist Quick Reference

**JSON:**
```json
{"name": "...", "user": "...", "duration": 10.5,
 "tracks": [{"title": "...", "link": "...", "duration": 3.5}]}
```

**JS Code erklären:**
1. `getElementById` → Element holen
2. `forEach` → Über Array iterieren
3. `createElement` → Neues Element
4. `innerHTML` → Inhalt setzen
5. `appendChild` → Anhängen

**CSS für Playlist:**
```css
h2 { color: green; }
li a { color: blue; }
```

---

## Klausur-Tipps

- **Punkte = Minuten** (20 Punkte → 20 Min)
- Aufgabe 3 ist die größte (30 Punkte)
- Manifests **lesen**, nicht schreiben
- DOM als **Baumdiagramm** zeichnen können
- Bei HTTP Request: Request Line + Headers + Leerzeile + Body
