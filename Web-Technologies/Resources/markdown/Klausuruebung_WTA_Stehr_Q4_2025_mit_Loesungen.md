Beispiele für Klausuraufgaben Web Technologies and Applications

Enthalten bekannte Beispiele aus der Veranstaltung für bessere Nachvollziehbarkeit.

Punkte pro Aufgabe = Minuten für die Bearbeitung. Nehmen Sie das in der Prüfung als Richtlinie für
die Länge Ihrer Antworten.

Aufgabe 1 (20 Punkte)

Für unsere Meta Playlists haben wir einen REST Endpoint zur Abfrage von Playlists definiert:

/playlists – liefert die Namen aller Playlists.

a.  Was hat REST mit HTTP zu tun?

b.  Wie können wir die Abfrage erweitern um einen Zahlenwert, der die Mindestgesamtlaufzeit der
zurück gelieferten Playlists in Minuten angibt? Also, die Laufzeit aller Tracks in den Playlists
soll >= Wert sein. Erläutern Sie einen geeigneten Mechanismus, um die notwendige
Information an den Webserver zu übermitteln, nennen Sie Eigenschaften, ggf. Vor- und
Nachteile.

c.  Geben Sie eine beispielhafte, möglichst genaue HTTP Request zur Abfrage der Playlists mit

einer Laufzeit von mehr als 300 Minuten an und erläutern Sie dabei die allgemeine,
vollständige Struktur der Anfrage.

d.  Welche technischen Möglichkeiten gibt es, den Endpoint zu testen?

Zu a:

REST ist ein Architekturstil für verteilte Anwendungen, der eine Reihe von Eigenschaften definiert, z.
B. Zustandslosigkeit, eine einheitliche Schnittstelle auf Ressourcen in Form von URIs und HATEOAS,
d. h. Hypermedia wird genutzt, um Applikationszustände abzubilden.

HTTP ist ein zustandsloses Protokoll für Kommunikation im Web. REST kann auf seine Eigenschaften
aufsetzen und seine Methoden für Zugriffe auf Ressourcen nutzen, z. B. GET, POST, PUT, DELETE.

Zu b:

Die URL wird um einen Query Parameter duration erweitert.

Parameter in URL sichtbar, können wir als Bookmark setzen.

Liegt dann in der Browser History, was hier aber kein Nachteil sein sollte, da es keine vertrauliche
Information sein sollte.

URLs sind längenbeschränkt, aber auch das sollte hier praktisch kein Problem sein, da es sich um
eine Zahl in Minuten handelt.

Zu c:

GET /playlists?duration=300 HTTP/1.1
– Request line mit Zugriffsmethode, Ressourcenort und Version von HTTP

Host: playlist-server.com:8001
User-Agent: Mein Browser
Accept: application/json
– Request Header zur Detaillierung der Anfrage (welcher Host und Port), welche Daten werden
akzeptiert, womit greife ich zu.

– Leerzeile

– Body ist in diesem Fall leer.

Zu d:

Z. B. Aufruf des Endpoint über Kommandozeile mit curl, einen Client wie Postman nutzen oder URL in
den Browser eingeben, oder Aufruf aus Python oder JavaScript.

Aufgabe 2 (20 Punkte)

a.  Erstellen Sie für die Playlist-Klasse ein Beispielobjekt in JSON:

b.  Welche Vor- oder Nachteile würde der Einsatz von XML statt JSON hier im Kontext unserer

Meta-Playlist-Anwendung bieten?

Zu a:

{
    "name": "My Playlist",
    "user": "Ich",
    "duration": 10.30,
    "tracks": [
        {
            "title": "Track_1",
            "link": "https://somelink.com/track_1",
            "duration": 3.15,
            "access credentials": {
                "uID": "my_ID",
                "token": "some_token"
            }
        },
        {
            ...
        }
    ]
}

Zu b:

XML ist eine Metasprache, also eine Möglichkeit, komplexe Konstrukte wie HTML zu definieren und
Daten detailliert weiter zu attributieren, ihnen also weitere Eigenschaften zu geben. Das brauchen wir
hier nicht, d. h. XML würde die Datenmenge und den Verarbeitungsaufwand unserer Anwendung
erhöhen, ohne einen greifbaren Nutzen zu liefern. JSON ermöglicht uns schon die strukturierte
Speicherung, Verarbeitung und Übertragung der Playlists, ohne weiteren Overhead.

Aufgabe 3 (30 Punkte)

a.  Beschreiben Sie kurz die Zwecke von HTML und CSS. Welche Schritte führt der Browser vom

Empfang einer Web-Seite bis zur Darstellung durch?

Betrachten Sie folgenden Ausschnitt unserer Web-Seite und ein JavaScript-Fragment:

<body>
…
        <!-- Playlist Display -->
        <div class="playlist">
            <h2>Playlist Details</h2>
            <ul id="playlist"></ul>
            <div id="total-duration">Total Duration: 0:00</div>
            <button id="save-playlist">Save Playlist</button>
        </div>
…
</body>

const playlistContainer = document.getElementById('playlist');
…
playlists[currentPlaylist].forEach((track, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
     <a href="${track.link}" target="_blank">${track.title} (${track.duration})</a>
     <button onclick="removeTrack(${index})">Remove</button>
    `;
    playlistContainer.appendChild(li);
});

b.  Geben Sie ein CSS an, so dass der Header „Playlist Details“ in grün dargestellt wird und die

Elemente der Tracks in der Liste in blau.

c.  Erläutern Sie, was der JavaScript-Ausschnitt mit dem HTML-Dokument macht.

d.  Geben Sie das DOM der Playlist nach Durchführung des JavaScript-Auschnitts als

Baumdiagramm an (ein Listeneintrag reicht).

Zu a:

Hypertext Markup Language dient der Beschreibung von Web-Dokumenten bzw. -Seiten. Sie
beschreibt und strukturiert die Inhalte, wie Text, Grafiken, Videos. Annotationen ermöglichen,
Semantik, also die Bedeutung der Elemente zu spezifizieren, z. B. ein Absatz <p>, oder Darstellung,
z. B. fetter Text mit <b>.

Cascading Style Sheets definieren die Darstellung, also Styling der Elemente (z. B. Farben, Fonts,
Größen) und Layout (Positionen, Abstände) von HTML-Dokumenten.

Nach Empfang einer Web-Seite liest (parsing) der Browser HTML und generiert daraus das Document
Object Model (DOM). Dann liest er das CSS der Seite und generiert das CSS Object Model (CSSOM).
DOM und CSSOM bilden zusammen den Rendering Tree, aus dem das initiale Layout generiert wird,
mit Geometrien der Elemente, also Breiten, Höhen, exakte Positionen. Damit stellt der Browser das
First Meaningful Paint (FMP) dar.

Zu b:

h2 {

    color: green;

}

li a {

    color: blue;

}

Zu c:

Das JS-Programm holt sich zunächst das Element mit der ID playlist aus dem Dokument. Das ist
eine leere HTML-Liste, <ul>. Sie wird gespeichert in der Variable playlistContainer.

Dann iteriert das Programm über die Tracks der aktuell ausgewählten Playlist,
playlists[currentPlaylist]. Für jeden Track in der Liste legt es einen Eintrag in der HTML-Liste an,
li, und weist dem Eintrag die HTML-Beschreibung mit Link, Titel, Dauer und einem Button zum Löschen
zu. Der neue Listeneintrag wird dann mit appendChild(li) an die HTML-Liste angehängt.

Zu d:

Aufgabe 4 (20 Punkte)

a.  In welchem Zusammenhang stehen Container und Kubernetes? Was sind in diesem

Zusammenhang Nodes und Pods?

b.  Gegeben ist folgendes Manifest:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
  labels:
    app: web-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web-container
        image: nginx:latest
        ports:
        - containerPort: 80

kind: Service
metadata:
  name: nginx-nodeport-service
  labels:
    app: web
spec:
  selector:
    app: web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 22000
  type: NodePort

Skizzieren Sie das entstehende System, wenn wir das Manifest K8s zur Anwendung
übergeben (Sie müssen die K8s Icons nicht zeichnen, nutzen Sie statt dessen die
Bezeichnungen).

c.  Wozu dient der Service? Warum stellen wir die Anfragen nicht direkt an die Container mit den

Webservern?

Zu a:

Kubernetes „orchestriert“ Container. D. h. wir bauen ein größeres System, eine Applikation aus vielen
verteilten Komponenten auf, die als einzelne containerisierte Anwendungen implementiert sind. Diese
einzelnen Container werden von Kubernetes gestartet, überwacht und gesteuert, so dass insgesamt
eine komplexe Web-Applikation aus vernetzten/verbundenen Prozessen in Containern zur Verfügung
steht.

Nodes sind physische oder virtuelle Rechner, die in einem Cluster über den Internet Stack vernetzt
sind. Pods bestehen aus einem oder mehreren Containern, die fachlich oder logisch
zusammengehören. Die Pods werden von Kubernetes Last-optimal auf die Nodes des Clusters
verteilt, um die oben beschriebene verteilte Applikation zu betreiben.

Zu b:

Zu c:

Die Container mit den Webservern sind Pods, die von Kubernetes dynamisch verwaltet werden, d. h.
sie werden nach Bedarf skaliert, neu gestartet nach Absturz etc. Dadurch können sich z. B. ihre
Adressen im Laufe des Betriebs ändern. Die Adressen der Pods und der darin enthaltenen Container
sind außerdem virtuelle Cluster IPs, die nur innerhalb des Clusters bekannt und erreichbar sind.

Wollen wir Komponenten unseres Systems von außen erreichbar und nutzbar machen, definieren wir
dafür einen Service. Dieser kann im hier gegebenen Fall einen Port 22000 nach außerhalb des
Clusters öffnen. So können wir nginx-Webserver über den Service nutzen, Kubernetes stellt sicher,
dass immer passende Pods den Service unterstützen, aber wir müssen uns nicht selbst laufend um
deren Zustand und Verfügbarkeit kümmern.


