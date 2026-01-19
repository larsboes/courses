# Übung 4: Flask Webserver in Docker auf VM

## Aufgabe
Unsere minimale virtuelle Infrastruktur bauen wir jetzt aus: Wir lassen (die VM) einen Container mit einem Webserver ausführen. Also, wir "deployen" einen Container auf unserem (virtuellen) Knoten. Legen Sie in einem passenden Verzeichnis die Dateien unten an. Wenn der Webserver läuft, machen Sie ihn ansprechbar z. B. unter `wta.meinedomain.com` (Hinweis in Abschnitt DNS vorne).

## Dateien
- `webserver.py` - Flask Webserver
- `Dockerfile` - Docker Container Konfiguration

## Verwendung

### Container bauen und starten
```bash
docker buildx build -t webserver .
docker run -p 8001:8000 webserver
```

### Testen
```bash
curl -v localhost:8001
```

### Container im Hintergrund laufen lassen
```bash
docker run -d -p 8001:8000 --name webserver webserver
docker ps
docker logs webserver
docker stop webserver
```

## Architektur
- Flask App läuft auf Port 8000 im Container
- Port 8001 auf localhost ist auf Port 8000 im Container gemappt
- Zugriff über `curl localhost:8001` oder Browser: `http://localhost:8001`
