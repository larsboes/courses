# FHDW Web Technologies - Alle Übungen

Übersicht aller Übungsaufgaben aus dem Kurs Web Technologies and Applications FHDW 2025.

---

## Übung 1: Eine kleine Infrastruktur mit Docker (Slide 27)

Sollte Vagrant nicht funktionsfähig/gewünscht/nötig sein:

1. Installieren Sie Docker (oder einen kompatiblen Verwandten davon).
2. Legen Sie eine Datei `docker-compose.yml` in einem geeigneten Verzeichnis an.
3. Starten Sie den Container mit `docker compose up -d` (Parameter d für *detached*).
4. Schauen Sie sich das Netzwerk zwischen den Containern an: `docker network ls` und `docker network inspect`
5. Starten Sie eine Shell in einem Container mit `docker exec -it container1 /bin/bash`
6. Was für Prozesse laufen im Container? Und außerhalb? `ps` und `ps -ef`
7. Wie sieht es mit Namespaces aus? `lsns`
8. Schauen Sie sich die Netzwerkschnittstellen mit `ifconfig` an. `ping`-en Sie den anderen Container über das Netz zwischen beiden an.
9. Verlassen mit `exit`, Container beenden mit `docker compose down`

---

## Übung 2: Verständnisfragen zu TLS (Slide 33)

Welche Aussagen sind richtig oder falsch und warum?

1. Die ausgetauschten Daten zwischen meinem Browser und dem Server sind durch TLS für Dritte nicht lesbar. Es sieht z. B. also niemand, was ich auf einer Website mache.

2. Das Zertifikat des Servers überprüft mein Client bei einer Zertifizierungsstelle (CA; Certificate Authority). Dadurch weiß ich genau, dass ich mit dem richtigen Server kommuniziere, z. B. dem meiner Bank.

---

## Übung 3: Praktische Nutzung von DNS (Slide 42)

Eine DNS-Abfrage können wir auch manuell mit `nslookup` oder `dig` auf der Kommandozeile durchführen, z. B.:

- `nslookup fhdw.de` – "nicht autorisierende Antwort" folgt darauf (die ersten beiden Zeilen sind Ihr DNS Resolver).
- `nslookup -type=NS fhdw.de` – verantwortliche Nameserver finden.

**Aufgaben:**

1. Fragen Sie Informationen über eine Website Ihrer Wahl mit den unterschiedlichen Parametern ab (z. B. den RR Types vorne für `-type`, `-debug`, oder weiteren über `-?` oder `--help`).

2. Was bedeutet es, wenn wir mehrere IP-Adressen für eine Domain bekommen? Wozu dient DNS auch?

3. Was sind potentielle Probleme, z. B. mit Sicherheit und Verfolgbarkeit, bei DNS in der einfachen, vorgestellten Form?

---

## Übung 4: Wir bauen uns einen kleinen Webserver (Slide 54)

Unsere minimale virtuelle Infrastruktur bauen wir jetzt aus: Wir lassen (die VM) einen Container mit einem Webserver ausführen. Also, wir "deployen" einen Container auf unserem (virtuellen) Knoten. Legen Sie in einem passenden Verzeichnis die Dateien unten an. Wenn der Webserver läuft, machen Sie ihn ansprechbar z. B. unter `wta.meinedomain.com` (Hinweis in Abschnitt DNS vorne).

**Variante 1: Python/Flask**
```python
from flask import Flask
webserver = Flask(__name__)

@webserver.route('/')
def home():
    return '<h1>Willkommen auf der minimalen WTA-Homepage!</h1>'

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8000)
```

**Variante 2: Docker direkt**
```dockerfile
FROM python:3.9.20-slim
RUN pip install flask
RUN mkdir /server
ADD webserver.py /server
WORKDIR /server
CMD ["python", "webserver.py"]
```

```bash
docker buildx build -t webserver .
docker run -p 8001:8000 webserver
curl -v localhost:8001
```

**Variante 3: Vagrant + Docker**
- Vagrantfile mit `config.vm.provision :docker`
- `vagrant up` und `curl -v 10.0.0.10:8001`

Nutzen Sie gerne auch andere Implementierungen in Go oder Java/Typescript.

---

## Übung 5: JSON (Slide 67)

Legen Sie zu der Warenkorb-Klassen-Struktur links eine beispielhafte JSON-Struktur an (einfach als Text, oder in einer Programmiersprache Ihrer Wahl).

```
┌─────────────┐     ┌─────────────┐
│   Basket    │     │  Customer   │
├─────────────┤     ├─────────────┤
│ id: String  │     │ name: String│
│ checkout:   │     │ address:    │
│   Boolean   │     │   String    │
└──────┬──────┘     │ email:      │
       │            │   String    │
       ◇            └─────────────┘
       │ *
┌──────┴──────┐
│   Product   │
├─────────────┤
│ name: String│
│ amount:     │
│   number    │
│ price:      │
│   number    │
└─────────────┘
```

- **Alternative 1**: Ein einzelner Warenkorb.
- **Alternative 2**: Eine Struktur mit mehreren Warenkörben, auf die man über ihre ID zugreifen kann.

---

## Übung 6: Ein Webserver schickt HTML-Seiten (Slide 75)

Unseren Webserver gestalten wir nun etwas um: Er soll uns statische HTML-Seiten aus Verzeichnissen schicken.

**webserver.py**
```python
from flask import Flask, send_from_directory

webserver = Flask(__name__)

@webserver.route('/')
def home():
    return send_from_directory('root-page', 'index.html')

@webserver.route('/<path:path>')
def static_pages(path):
    return send_from_directory('root-page', path)

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8000)
```

**Dockerfile**
```dockerfile
FROM python:3.9.20-slim
RUN pip install flask
RUN mkdir /server
COPY ./webserver.py /server
COPY ./root-page /server/root-page
WORKDIR /server
CMD ["python", "webserver.py"]
```

**Beispiel HTML-Seiten**

`/root-page/index.html`:
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <title>Ein Webserver im Container</title>
</head>
<body>
    <h1>Hallo sagt der Python Flask Webserver!</h1>
    <p>Das ist eine einfache, statische HTML-Seite, geschickt von Flask in einem Container.</p>
</body>
</html>
```

`/root-page/pages/page1.html`:
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <title>Weitere Seite</title>
</head>
<body>
    <h1>Eine weitere Beispielseite in HTML</h1>
    <p>Das ist noch eine einfache, statische HTML-Seite, geschickt von Flask in einem Container.</p>
</body>
</html>
```

In Ihrem Arbeitsverzeichnis von Vagrant oder Docker brauchen Sie hier nun ein Unterverzeichnis `/root-page` mit der Struktur von HTML-Seiten für den Webserver.

---

## Übung 7: Eine Oberfläche für eine responsive Web App (Slide 85)

Implementieren Sie ein **User Interface** für eine **Meta Playlist App**, mit der wir Musik von mehreren Streaming-Diensten verwalten können.

1. Implementieren Sie die notwendigen **Elemente** mit **HTML**.

2. Implementieren Sie ein passendes **Layout** mit **CSS**. Es soll responsiv sein, sich also auf Desktop und Mobilgeräten anpassen.

Sie können das UI selbst schreiben, auf eine Gruppe aufteilen, und/oder einen AI-Assistenten nutzen.

*Im Job und in der Klausur müssen Sie aber wissen, wie das Produkt funktioniert, es erklären und Modifikationen beschreiben können.*

---

## Übung 8: Das Verhalten unserer responsiven Web App (Slide 93)

Erweitern Sie die Meta Playlist App mit JavaScript:

1. Fügen Sie *EventListener* für Funktionen hinzu, die auf die einzelnen Buttons reagieren.

2. Implementieren Sie diese *Funktionen* zum *Anlegen* und *Löschen* einer Playlist, *Hinzufügen* und *Löschen von Songs*, *Berechnung der Gesamtspielzeit*.

3. Verwalten Sie die Playlists intern *in Form von JSON*.

4. *Speichern* Sie die JSON-Struktur *lokal*.

---

## Übung 9: Ein Server für unsere Meta Playlist App (Slide 108)

Wir wollen unsere Playlists nicht mehr lokal, sondern auf einem Server speichern. Außerdem wollen wir die Playlist-Verwaltung als Dienst anbieten, der von unserer Web App, aber auch von anderen Clients benutzt werden kann.

1. Spezifizieren Sie für den Server eine **REST API** im Format von OpenAPI mit folgenden Möglichkeiten: Alle Playlists abrufen, eine Playlist anlegen oder aktualisieren, eine bestimmte Playlist abrufen, eine Playlist löschen. Die Daten sollen in JSON ausgetauscht werden.

2. Ergänzen Sie den Webserver um die passenden Routen und Funktionen. Die Playlists speichern Sie zunächst einfach lokal in einer Variable im Speicher des Servers als JSON-Struktur, wie wir das vorher schon im Client gemacht haben. Den Client liefert der Server als HTML-Dokument zurück, z. B. direkt als `index.html` auf der Default Route `/`.

3. Stellen Sie den Webserver als Container bereit und testen Sie ihn auf geeignete Weise (*curl*, *Swagger*, *Postman*, o. ä.) zunächst gesondert als Subsystem.

4. Passen Sie die Client App auf die Schnittstelle des Servers an und testen Sie die Integration.

*Sie müssen nicht unbedingt alles ausimplementieren. Wichtig ist es, dass Sie die Konzepte, Funktionsweisen und Abläufe praktisch nachvollziehen.*

---

## Übung 10: Eine Datenhaltung für unseren Web-Dienst (Slide 113)

Wir wollen unsere Playlists in einer Datenhaltung ablegen. Dazu binden wir die dokumentenorientierte Datenbank *CouchDB* (`couchdb.apache.org`) an unseren Webserver an.

1. CouchDB nutzen wir als Container, die Datenbank wird über eine REST API angesprochen. Es gibt ein fertiges Image, das wir einfach zusammen mit unserem Webserver in ein `docker-compose.yaml` integrieren. Diese Datei, mit einigen abhängigen Dateien, ist als Ausgangspunkt gegeben (liegt auf Teams). Wir gehen die zunächst einmal gemeinsam durch.

2. Der Webserver muss nun die JSON-Objekte der Playlists über die REST API an die CouchDB übergeben bzw. von dort abfragen. Die Funktionen des Webservers modifizieren wir entsprechend – finden Sie heraus, wie das geht. Den Client sollte der Webserver wie in Übung 9 liefern.

3. Testen Sie die Gesamtlösung auf geeignete Weisen, also z. B. den Server über seine REST API, dann zusammen mit dem Client. Beantworten Sie dabei folgende Fragen:
   - a. Wie genau findet sich hier das Microservice-Konzept umgesetzt?
   - b. Welches wichtige Element läuft im CouchDB-Container neben der Datenbank selbst?
   - c. Wie sieht die Architektur aus, welche Komponenten gibt es, über welche Schnittstellen kommunizieren die?

---

## Übung 11: K8s zum Ausprobieren (Slide 122)

1. Installieren Sie **Minikube**: https://minikube.sigs.k8s.io/

2. Installieren Sie **kubectl**: https://kubernetes.io/docs/tasks/tools/

3. Starten Sie Ihren K8s Cluster mit `minikube start`
   Unter MacOS und Linux sollten Sie mit `--driver=docker` die Control Plane im Container nutzen.

4. Orientieren Sie sich auf dem Dashboard mit `minikube dashboard` und finden Sie die Informationen zu Ihrem lokalen Node.
   Alternativ auf der Kommandozeile:
   ```bash
   kubectl get nodes
   kubectl describe node [NAME]
   ```

5. Warum bezeichnet man K8s als "Betriebssystem der Cloud"? Welches sind die Analogien?

Falls Sie alternative Installationen zum lokalen Testen ausprobieren möchten, gibt es z. B. https://devopscube.com/kubernetes-cluster-vagrant/

---

## Übung 12: Unsere Meta Playlist auf Kubernetes (Slide 128)

1. Entwerfen Sie mit den vorgestellten und *ggf. weiteren* K8s Icons eine Zielarchitektur der Komponenten unserer Web-Applikation auf dem Node von Minikube oder Ihren eigenen Nodes (z. B. *draw.io* hat die Icons).

2. Spezifizieren Sie passende Manifests für die Pods und den Service.

3. Wenn möglich: Wenden Sie die Manifests in K8s an und testen Sie das Ergebnis mit dem Web Client.

---

## Hinweis

*Sie müssen nicht unbedingt alles ausimplementieren. Wichtig ist es, dass Sie die Konzepte, Funktionsweisen und Abläufe praktisch nachvollziehen.*
