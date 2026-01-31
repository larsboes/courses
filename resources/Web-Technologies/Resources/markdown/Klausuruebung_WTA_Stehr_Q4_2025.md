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
soll >= Wert sein. Erläutern Sie einen geeigneten  Mechanismus, um die notwendige
Information an den Webserver zu übermitteln, nennen Sie Eigenschaften, ggf. Vor- und
Nachteile.

c.  Geben Sie eine beispielhafte,  möglichst genaue HTTP Request zur Abfrage der Playlists mit

einer Laufzeit von mehr als 300 Minuten an und erläutern Sie dabei  die allgemeine,
vollständige  Struktur der Anfrage.

d.  Welche technischen Möglichkeiten gibt es, den Endpoint zu testen?

Aufgabe 2 (20 Punkte)

a.  Erstellen Sie für die Playlist-Klasse ein Beispielobjekt  in JSON:

b.  Welche Vor- oder Nachteile würde der Einsatz von XML statt JSON hier im Kontext unserer

Meta-Playlist-Anwendung bieten?

Aufgabe 3 (30 Punkte)

a.  Beschreiben Sie kurz die Zwecke von HTML und CSS. Welche Schritte führt der Browser vom

Empfang einer Web-Seite bis zur Darstellung  durch?

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

b.  Geben Sie ein CSS an, so dass der Header „Playlist Details“ in grün dargestellt  wird und die

Elemente der Tracks in der Liste in blau.

c.  Erläutern Sie, was der JavaScript-Ausschnitt mit dem HTML-Dokument macht.

d.  Geben Sie das DOM der Playlist nach Durchführung des JavaScript-Auschnitts als

Baumdiagramm an (ein Listeneintrag  reicht).

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

Skizzieren Sie das entstehende  System, wenn wir das Manifest K8s zur Anwendung
übergeben (Sie müssen die K8s Icons nicht zeichnen, nutzen Sie statt dessen  die
Bezeichnungen).

c.  Wozu dient der Service? Warum stellen wir die Anfragen nicht direkt an die Container mit den

Webservern?


