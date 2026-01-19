Web Technologies and Applications
Prof. Dr. Jan Stehr
WS 2025/26

Web Technologies and Applications FHDW 2025 – Jan Stehr

1

Dr. rer. nat. Jan Stehr
1971 in Kassel geboren, lebt seit 1994 in Paderborn.
Broterwerb in der Informatik seit gut 30 Jahren.

Ausbildung zum Mathematisch-technischen Assistenten,
Studium Wirtschaftsinformatik,
Promotion in Informatik an der Uni Paderborn.

Professor für Informatik, AI und Cyber Security an der FHDW,
CISO, Systemarchitekt, Security Architect, Leitung Softwareentwicklung
in verschiedenen Unternehmen

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 2

Verwendungshinweise

Bitte beachten Sie:
• Dieses Dokument ist Grundlage der Vorlesung, ersetzt sie aber nicht.
• Dieses Dokument und die im Rahmen der Veranstaltung ausgegebenen weiteren
Dokumente sind nur für den internen Gebrauch an der FHDW durch Studierende
und Mitarbeiter der Hochschule bestimmt.

• Sie dürfen Dritten, auch auszugsweise, nur mit vorheriger schriftlicher Zustimmung

der FHDW zugänglich gemacht werden.

• Dies gilt für die Weitergabe in jedweder Form, ob elektronisch, z. B. Internet, oder

Papier.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 3

Organisatorisches

• 40 Kontaktstunden
• 85 Stunden Selbststudium
• 5 Credit Points
• Prüfungsleistung als Klausur,

Dauer 90 Minuten.

• Das Skript + Lösungen zu Übungen
bekommen Sie in elektronischer
Form (Ordner in Teams) immer nach
unseren Veranstaltungsterminen.
Ihren Dozenten erreichen Sie unter
jan.stehr@fhdw.de

•

• Warum findet die Veranstaltung

virtuell statt?

• Unterbrechen Sie bitte jederzeit bei
Fragen, Unklarheiten, wenn Sie
etwas vermissen oder ergänzen
möchten.
Im E-Learning dürfen Sie die
Kameras ausgeschaltet lassen.
• Melden Sie sich mit Fragen auch

•

gerne außerhalb der Veranstaltung.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 4

Literatur, Quellen, Systeme

•
•
•
•
•

•

•

•

https://www.w3.org/
https://www.w3schools.com/
https://developer.mozilla.org/en-US/
https://www.json.org/json-en.html
https://www.postman.com/

https://code.visualstudio.com/
https://nodejs.org/en
https://www.docker.com/

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 5

Inhalt

1. Einführung und Grundlagen
2. HTTP
3. HTML
4. CSS
5. JavaScript
6. JSON
7. Web-Architekturen
8. Web-APIs
9. Web-Security

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 6

1. Einführung und Grundlagen

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 7

Das Internet

• Das Internet ist ein weltweiter Verbund von Rechnernetzwerken, den autonomen

Systemen.

• Es ermöglicht die Nutzung von Internetdiensten wie WWW, E-Mail, Telnet, SSH,

XMPP, MQTT, FTP, SFTP, …

• Datenaustausch zwischen den über das Internet verbundenen Rechnern auf Basis

der Internetprotokollfamilie (TCP/IP).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 8

World Wide Web (WWW)

• Das World Wide Web (WWW) ist ein über das Internet abrufbares System von

elektronischen Hypertext-Dokumenten (Webseiten).

• Webseiten sind durch Hyperlinks untereinander verknüpft und werden im Internet

über die Protokolle HTTP oder HTTPS übertragen.

• Webseiten enthalten meist Texte, oft auch Bilder und andere Medien.
• Zur Darstellung der Webseiten wird ein Webbrowser verwendet.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 9

Webbrowser

• Ein Webbrowser (oder kurz: Browser) ist eine Software zur grafischen Darstellung

von Webseiten.

• Er stellt die Benutzeroberfläche für Webanwendungen dar.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 10

Webserver

• Ein Webserver ist ein Computer, der Dokumente an Clients (z. B. Webbrowser)

überträgt.

• Webserver werden lokal, in Unternehmensnetzwerken und überwiegend als WWW-

Dienst im Internet eingesetzt.

• Dokumente können statisch (unverändert) oder dynamisch (bei Abruf erstellt) sein.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 11

Webanwendung

• Eine Webanwendung (Web Application) ist ein Anwendungsprogramm nach dem

Client-Server-Modell.

• Die Datenspeicherung und Datenverarbeitung findet teilweise oder vollständig auf

einem Webserver statt.

• Die Logik der Anwendung wird auf dem Webserver oder im Webbrowser ausgeführt.
• Die Interaktion mit dem Benutzer erfolgt über einen Webbrowser.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 12

Client-Server-Modell

• Das Client-Server-Modell beschreibt eine Möglichkeit, Aufgaben und Dienst-

leistungen innerhalb eines Netzwerkes zu verteilen.

• Die Aufgaben werden von Programmen erledigt, die in Clients und Server

unterteilt werden.

• Der Client kann auf Wunsch einen Dienst vom Server anfordern (Request).
• Der Server, der sich auf demselben oder einem anderen Rechner im Netzwerk

befindet, beantwortet die Anforderung (Response).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 13

Frontend und Backend

• Frontend und Backend bezeichnen die an den Benutzer gerichtete (Frontend) bzw.

die am System orientierte (Backend) Ebene einer Software-Architektur.

• Das Frontend ist typischerweise näher am Benutzer, während das Backend näher an

der Verarbeitung und Speicherung der Daten ist.

• Im Webkontext:
• Frontend: HTML, CSS, JavaScript, Ausführung im Browser
• Backend: Webserver, Datenbank, Anwendungslogik, Ausführung auf dem Server

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 14

Übung 1: Web-Technologien im Einsatz

Analysieren Sie eine beliebige moderne Webanwendung (z. B. Amazon,
Facebook, Google Maps, Online-Banking, …).
1. Welche Technologien werden im Frontend eingesetzt?
2. Welche Interaktionen finden zwischen Client und Server statt?
3. Welche Daten werden übertragen?

Nutzen Sie dazu die Entwicklertools Ihres Browsers (F12).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 15

2. HTTP

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 16

Hypertext Transfer Protocol (HTTP)

• Das Hypertext Transfer Protocol (HTTP) ist ein zustandsloses Protokoll zur

Übertragung von Daten auf der Anwendungsschicht über ein Rechnernetz.

• Es wird hauptsächlich eingesetzt, um Webseiten (Hypertext-Dokumente) aus dem

World Wide Web (WWW) in einen Webbrowser zu laden.

• HTTP/1.1 (1997/1999/2014) ist der am weitesten verbreitete Standard.
• HTTP/2 (2015) und HTTP/3 (2022) sind Weiterentwicklungen mit Fokus auf

Performance.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 17

HTTP-Request

• Ein HTTP-Request besteht aus:
• Request-Line (Methode, Pfad, Version)
• Header-Feldern (Metadaten)
• Leerzeile
• Body (optional, Nutzdaten)

Beispiel:
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 18

HTTP-Methoden

• GET: Ressource anfordern
• POST: Ressource erstellen oder Daten verarbeiten
• PUT: Ressource erstellen oder ersetzen
• DELETE: Ressource löschen
• HEAD: Nur Header anfordern (wie GET, aber ohne Body)
• PATCH: Ressource teilweise ändern
• OPTIONS: Verfügbare Methoden für Ressource abfragen

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 19

HTTP-Response

• Eine HTTP-Response besteht aus:
• Status-Line (Version, Status-Code, Reason-Phrase)
• Header-Feldern (Metadaten)
• Leerzeile
• Body (optional, Nutzdaten)

Beispiel:
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Content-Length: 123
Content-Type: text/html

<html>...</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 20

HTTP-Status-Codes

• 1xx: Informationen (z. B. 100 Continue)
• 2xx: Erfolg (z. B. 200 OK, 201 Created)
• 3xx: Umleitung (z. B. 301 Moved Permanently, 304 Not Modified)
• 4xx: Client-Fehler (z. B. 400 Bad Request, 401 Unauthorized, 404 Not Found)
• 5xx: Server-Fehler (z. B. 500 Internal Server Error, 503 Service Unavailable)

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 21

HTTPS

• Hypertext Transfer Protocol Secure (HTTPS) ist ein Kommunikationsprotokoll im

World Wide Web, um Daten abhörsicher zu übertragen.

• Es stellt eine Transportverschlüsselung dar.
• Technisch ist es HTTP über TLS (Transport Layer Security).
• Authentifizierung des Servers durch Zertifikate.
• Vertraulichkeit und Integrität der Daten.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 22

Übung 2: HTTP-Analyse

Nutzen Sie Postman oder curl, um HTTP-Requests an verschiedene Webseiten
zu senden.
1. Senden Sie einen GET-Request an http://www.google.de. Was passiert?
2. Senden Sie einen GET-Request an https://www.google.de. Was ist der
Unterschied?
3. Analysieren Sie die Header der Response.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 23

3. HTML

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 24

Hypertext Markup Language (HTML)

• Die Hypertext Markup Language (HTML) ist eine textbasierte Auszeichnungssprache

zur Strukturierung digitaler Dokumente wie Texte mit Hyperlinks, Bildern und
anderen Inhalten.

• HTML-Dokumente sind die Grundlage des World Wide Web und werden von

Webbrowsern dargestellt.

• HTML5 ist die aktuelle Version (Living Standard).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 25

HTML-Grundgerüst

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Titel der Webseite</title>
  </head>
  <body>
    <h1>Überschrift</h1>
    <p>Ein Absatz mit Text.</p>
  </body>
</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 26

HTML-Elemente

• HTML-Elemente sind die Bausteine von HTML-Seiten.
• Sie werden durch Tags markiert:
• Start-Tag: <p>
• Inhalt: Hallo Welt
• End-Tag: </p>
• Attribute im Start-Tag: <a href="https://www.fhdw.de">FHDW</a>
• Leere Elemente (void elements): <br>, <img>, <input>, <meta>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 27

Wichtige HTML-Elemente

• Struktur: <html>, <head>, <body>, <header>, <footer>, <nav>, <main>,

<article>, <section>, <div>, <span>

• Text: <h1>-<h6>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <br>
• Medien: <img>, <audio>, <video>
• Links: <a>
• Formulare: <form>, <input>, <button>, <select>, <textarea>, <label>
• Tabellen: <table>, <tr>, <td>, <th>, <thead>, <tbody>, <tfoot>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 28

DOM (Document Object Model)

• Das Document Object Model (DOM) ist eine Spezifikation einer Schnittstelle für den

Zugriff auf HTML- und XML-Dokumente.

• Es repräsentiert das Dokument als Baumstruktur (DOM-Tree).
• Jeder Knoten im Baum ist ein Objekt, das Eigenschaften und Methoden hat.
• Mit Skriptsprachen wie JavaScript kann auf das DOM zugegriffen werden, um Inhalt,

Struktur und Stil des Dokuments zu ändern.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 29

Übung 3: HTML-Struktur

Erstellen Sie eine einfache HTML-Seite mit folgendem Inhalt:
1. Eine Hauptüberschrift (h1).
2. Zwei Unterüberschriften (h2).
3. Je einen Absatz (p) unter den Unterüberschriften.
4. Eine Liste (ul oder ol) mit drei Einträgen.
5. Ein Bild (img).
6. Einen Link (a) zu einer externen Seite.

Validieren Sie Ihren Code mit dem W3C Markup Validation Service.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 30

4. CSS

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 31

Cascading Style Sheets (CSS)

• Cascading Style Sheets (CSS) ist eine Stylesheet-Sprache für elektronische

Dokumente.

• Sie wird verwendet, um das Aussehen (Farben, Layout, Schriftarten) von HTML-

Dokumenten zu gestalten.

• Trennung von Inhalt (HTML) und Darstellung (CSS).
• CSS3 ist die aktuelle Version (modularisiert).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 32

Einbindung von CSS

• Inline-Style: Im style-Attribut eines HTML-Elements.
• <p style="color: red;">Rot</p>
• Internal Style Sheet: Im <style>-Element im <head>.
• <style> p { color: red; } </style>
• External Style Sheet: In einer separaten .css-Datei (empfohlen).
• <link rel="stylesheet" href="style.css">

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 33

CSS-Syntax

Selektor {
  Eigenschaft: Wert;
  Eigenschaft: Wert;
}

Beispiel:
h1 {
  color: blue;
  font-size: 24px;
}

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 34

Selektoren

• Element-Selektor: p { ... } (alle <p>)
• Klassen-Selektor: .intro { ... } (alle Elemente mit class="intro")
• ID-Selektor: #header { ... } (das Element mit id="header")
• Attribut-Selektor: [type="text"] { ... }
• Kombinatoren:
• Nachfahren: div p { ... } (p innerhalb von div)
• Kind: div > p { ... } (p direkt in div)
• Geschwister: h1 + p { ... } (p direkt nach h1)
• Pseudo-Klassen: a:hover { ... }, li:first-child { ... }

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 35

Box-Modell

• Jedes HTML-Element wird als rechteckige Box betrachtet.
• Content: Der eigentliche Inhalt (Text, Bild).
• Padding: Innenabstand (zwischen Content und Border).
• Border: Rahmen.
• Margin: Außenabstand (Abstand zu anderen Elementen).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 36

Layout mit CSS

• Display: block, inline, inline-block, none
• Position: static, relative, absolute, fixed, sticky
• Float: left, right (veraltet für Layout)
• Flexbox: Ein-dimensionales Layout (Zeile oder Spalte).
• Grid: Zwei-dimensionales Layout (Zeilen und Spalten).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 37

Responsive Webdesign

• Anpassung der Darstellung an verschiedene Bildschirmgrößen (Desktop, Tablet,

Smartphone).

• Viewport Meta Tag: <meta name="viewport" content="width=device-width,

initial-scale=1.0">

• Media Queries: CSS-Regeln, die nur unter bestimmten Bedingungen gelten.
• @media (max-width: 600px) { ... }
• Flexible Layouts (Prozent, Flexbox, Grid).
• Flexible Bilder (max-width: 100%).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 38

Übung 4: CSS-Styling

Gestalten Sie Ihre HTML-Seite aus Übung 3 mit CSS:
1. Setzen Sie eine Schriftart (font-family) für das gesamte Dokument.
2. Färben Sie die Hauptüberschrift ein.
3. Geben Sie den Absätzen einen Innenabstand (padding) und einen Rahmen
(border).
4. Nutzen Sie Flexbox, um die Listeneinträge nebeneinander darzustellen.
5. Sorgen Sie dafür, dass sich das Layout auf kleinen Bildschirmen ändert (Media
Query).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 39

5. JavaScript

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 40

JavaScript (JS)

• JavaScript (JS) ist eine Skriptsprache, die ursprünglich für dynamisches HTML in

Webbrowsern entwickelt wurde.

• Heute wird sie auch auf Servern (Node.js) und in anderen Bereichen eingesetzt.
• ECMAScript ist der Standard, auf dem JavaScript basiert.
• JavaScript ermöglicht Interaktivität, Manipulation des DOM, Kommunikation mit

Servern (AJAX/Fetch) und vieles mehr.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 41

Einbindung von JavaScript

• Inline: Im Event-Handler-Attribut (nicht empfohlen).
• <button onclick="alert('Hallo')">Klick mich</button>
• Internal: Im <script>-Element.
• <script> console.log('Hallo'); </script>
• External: In einer separaten .js-Datei (empfohlen).
• <script src="script.js"></script>
• Positionierung meist am Ende des <body> oder im <head> mit defer/async.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 42

Syntax und Grundlagen

• Variablen: let, const (var veraltet)
• Datentypen: Number, String, Boolean, Object, Array, Null, Undefined, Symbol
• Operatoren: +, -, *, /, %, =, ==, ===, !=, !==, &&, ||, !
• Kontrollstrukturen: if, else, switch, for, while, do-while
• Funktionen: function name() { ... }, const name = () => { ... }

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 43

DOM-Manipulation

• Zugriff auf Elemente:
• document.getElementById('id')
• document.querySelector('.class')
• document.querySelectorAll('tag')
• Änderung von Inhalten: element.textContent, element.innerHTML
• Änderung von Stilen: element.style.property
• Änderung von Attributen: element.setAttribute(), element.getAttribute()
• Erstellen und Hinzufügen: document.createElement(), parent.appendChild()

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 44

Event Handling

• Reagieren auf Benutzeraktionen (Klick, Tastatur, Mausbewegung, ...).
• element.addEventListener('event', function)
• Beispiel:
const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Button geklickt!');
});

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 45

Asynchrone Programmierung

• JavaScript ist single-threaded.
• Asynchrone Operationen (z. B. Netzwerkrequests, Timer) blockieren nicht den

Hauptthread.

• Callbacks: Funktionen, die nach Abschluss ausgeführt werden (Callback Hell).
• Promises: Objekte, die den zukünftigen Wert einer Operation repräsentieren.
• .then(), .catch(), .finally()
• Async/Await: Syntaktischer Zucker für Promises, macht asynchronen Code lesbarer.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 46

Fetch API

• Moderne Schnittstelle für Netzwerkrequests (Ersatz für XMLHttpRequest).
• Basiert auf Promises.
• Beispiel:
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 47

Übung 5: Interaktive Webseite

Erweitern Sie Ihre Webseite um JavaScript-Funktionalität:
1. Fügen Sie einen Button hinzu.
2. Wenn der Button geklickt wird, soll sich der Text der Hauptüberschrift ändern.
3. Fügen Sie ein Eingabefeld hinzu.
4. Wenn der Benutzer etwas eingibt und Enter drückt, soll der Text als neues
Element der Liste hinzugefügt werden.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 48

6. JSON

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 49

JavaScript Object Notation (JSON)

• Die JavaScript Object Notation (JSON) ist ein kompaktes Datenformat in einer

einfach lesbaren Textform.

• Es dient dem Datenaustausch zwischen Anwendungen.
• Es ist von JavaScript abgeleitet, aber sprachunabhängig.
• Datentypen: Objekt {}, Array [], String "", Zahl, Boolean, null.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 50

JSON-Beispiel

{
  "name": "Max Mustermann",
  "alter": 25,
  "istStudent": true,
  "hobbies": ["Lesen", "Reisen", "Coden"],
  "adresse": {
    "strasse": "Musterstraße 1",
    "stadt": "Musterstadt"
  }
}

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 51

JSON in JavaScript

• JSON.parse(string): Wandelt einen JSON-String in ein JavaScript-Objekt um.
• JSON.stringify(object): Wandelt ein JavaScript-Objekt in einen JSON-String um.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 52

Übung 6: JSON-Verarbeitung

1. Erstellen Sie eine JSON-Datei mit Daten zu mehreren Büchern (Titel, Autor,
Erscheinungsjahr).
2. Laden Sie diese Datei in Ihrer Webseite per Fetch API.
3. Stellen Sie die Bücher in einer HTML-Tabelle dar.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 53

7. Web-Architekturen

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 54

Statische Webseiten

• HTML-Dateien liegen fertig auf dem Webserver.
• Bei Anfrage werden sie unverändert ausgeliefert.
• Einfach, schnell, sicher, aber keine Interaktion oder Personalisierung.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 55

Server-Side Rendering (SSR)

• Webseiten werden bei jeder Anfrage auf dem Server dynamisch generiert (z. B. mit

PHP, Java, Python, Node.js).

• Datenbankabfragen fließen in die HTML-Erstellung ein.
• Das fertige HTML wird an den Client gesendet.
• Gut für SEO, initialer Load kann langsamer sein.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 56

Client-Side Rendering (CSR) / SPA

• Single Page Application (SPA).
• Server liefert nur eine leere Hülle (HTML) und JavaScript.
• JavaScript lädt Daten (JSON) nach und baut das DOM im Browser auf.
• Schnelle Interaktion nach initialem Laden, App-Feeling.
• SEO herausfordernder (aber lösbar).
• Frameworks: React, Angular, Vue.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 57

Static Site Generators (SSG)

• Webseiten werden zur Build-Zeit generiert (aus Templates und Inhalten).
• Das Ergebnis sind statische HTML-Dateien.
• Kombination aus Vorteilen von statischen Seiten (Performance, Sicherheit) und

CMS (Verwaltung).

• Tools: Jekyll, Hugo, Gatsby, Next.js (kann auch SSR).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 58

Microservices

• Architekturmuster, bei dem eine Anwendung aus vielen kleinen, unabhängigen

Diensten besteht.

• Jeder Dienst hat eine eigene Aufgabe und kommuniziert über APIs (meist HTTP/

REST) mit anderen.

• Skalierbarkeit, Flexibilität, Technologieunabhängigkeit.
• Komplexität in Verteilung und Betrieb.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 59

Übung 7: Architektur-Diskussion

Diskutieren Sie Vor- und Nachteile von SSR vs. CSR (SPA) für folgende
Szenarien:
1. Ein persönlicher Blog.
2. Ein Online-Shop.
3. Ein Dashboard für interne Unternehmensdaten.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 60

8. Web-APIs

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 61

Application Programming Interface (API)

• Eine Schnittstelle, die es Softwareanwendungen ermöglicht, miteinander zu

kommunizieren.

• Web-APIs nutzen HTTP als Transportprotokoll.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 62

REST (Representational State Transfer)

• Architekturstil für verteilte Systeme.
• Ressourcen werden durch URIs identifiziert.
• Manipulation der Ressourcen über Standard-HTTP-Methoden (GET, POST, PUT,

DELETE).

• Zustandslosigkeit (jeder Request enthält alle nötigen Infos).
• Repräsentation der Ressourcen oft als JSON oder XML.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 63

RESTful API Design

• Ressource: /users
• GET /users: Liste aller User
• GET /users/123: User mit ID 123
• POST /users: Neuen User anlegen
• PUT /users/123: User 123 aktualisieren
• DELETE /users/123: User 123 löschen
• Naming Conventions: Plural für Ressourcen, keine Verben in URIs.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 64

GraphQL

• Abfragesprache für APIs und Laufzeitumgebung.
• Client spezifiziert genau, welche Daten er benötigt.
• Vermeidet Over-Fetching und Under-Fetching.
• Nur ein Endpunkt (meist POST /graphql).
• Stark typisiertes Schema.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 65

Übung 8: API-Design

Entwerfen Sie eine REST-API für eine einfache ToDo-Liste.
1. Welche Ressourcen gibt es?
2. Welche Endpunkte (Methoden und Pfade) werden benötigt?
3. Wie sehen Request- und Response-Bodys (JSON) beispielhaft aus?

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 66

9. Web-Security

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 67

OWASP Top 10

• Open Web Application Security Project (OWASP).
• Liste der 10 kritischsten Sicherheitsrisiken für Webanwendungen.
• Aktuelle Version (2021):
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 68

Cross-Site Scripting (XSS)

• Angreifer schleust bösartigen Code (meist JavaScript) in eine vertrauenswürdige

Webseite ein.

• Der Code wird im Browser des Opfers ausgeführt.
• Folgen: Session-Hijacking, Datendiebstahl, Manipulation.
• Schutz: Input Validation, Output Encoding, Content Security Policy (CSP).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 69

SQL Injection

• Angreifer schleust SQL-Befehle in Datenbankabfragen ein.
• Folgen: Datenleck, Datenverlust, Umgehung von Authentifizierung.
• Schutz: Prepared Statements (Parametrisierte Abfragen), Input Validation, ORM

nutzen.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 70

Cross-Site Request Forgery (CSRF)

• Angreifer bringt das Opfer dazu, eine ungewollte Aktion auf einer Webseite

auszuführen, auf der das Opfer eingeloggt ist.

• Folgen: Zustandsänderungen (Passwort ändern, Geld überweisen).
• Schutz: Anti-CSRF-Token, SameSite-Cookie-Attribut.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 71

Übung 9: Security-Check

Untersuchen Sie Ihren Code aus den vorherigen Übungen auf mögliche
Sicherheitslücken.
1. Wo werden Benutzereingaben verarbeitet?
2. Werden diese validiert und escaped?
3. Wie könnten Sie die Sicherheit verbessern?

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 72

Übung 10: Meta Playlists

Wir wollen eine Web-Applikation entwickeln, mit der wir Playlists von
verschiedenen Streaming-Diensten (Spotify, Apple Music, Deezer, Youtube
Music, …) zusammenführen können.
1. Welche Funktionalitäten brauchen wir?
2. Welche Daten müssen wir speichern?
3. Wie könnte die Architektur aussehen?
4. Welche APIs der Streaming-Dienste können wir nutzen?

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 73

Übung 11: Meta Playlists – Architektur

Entwerfen Sie eine Architektur für die Meta Playlists Applikation.
1. Welche Komponenten (Frontend, Backend, Datenbank) werden benötigt?
2. Wie kommunizieren diese miteinander?
3. Erstellen Sie ein Diagramm.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 74

Übung 12: Meta Playlists – API

Spezifizieren Sie die API für das Backend der Meta Playlists Applikation.
1. Definieren Sie die Endpunkte für Playlists (CRUD).
2. Definieren Sie die Endpunkte für Songs in Playlists.
3. Dokumentieren Sie die API (z. B. mit OpenAPI/Swagger).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 75

Übung 13: Meta Playlists – Frontend

Erstellen Sie einen Prototyp für das Frontend der Meta Playlists Applikation.
1. Startseite mit Liste der Playlists.
2. Detailansicht einer Playlist mit Songs.
3. Formular zum Erstellen einer neuen Playlist.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 76

OAuth 2.0 und OpenID Connect (OIDC)

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 77

Warum OAuth 2.0?

• Problem: Wie kann ich einer Anwendung Zugriff auf meine Daten bei einem

anderen Dienst geben, ohne mein Passwort weiterzugeben?

• Beispiel: Eine Foto-Druck-App möchte auf meine Fotos bei Google Photos

zugreifen.

• Lösung: OAuth 2.0 (Open Authorization) ist ein offener Standard für

Delegierung von Zugriffsrechten.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 78

Rollen in OAuth 2.0

• Resource Owner: Der Benutzer, dem die Daten gehören.
• Client: Die Anwendung, die Zugriff auf die Daten möchte.
• Resource Server: Der Server, auf dem die Daten liegen (API).
• Authorization Server: Der Server, der den Benutzer authentifiziert und Access

Tokens ausstellt.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 79

OAuth 2.0 Flow (Authorization Code Flow)

1. Client leitet Resource Owner zum Authorization Server weiter.
2. Resource Owner authentifiziert sich und stimmt dem Zugriff zu (Consent).
3. Authorization Server leitet Resource Owner mit einem Authorization Code zum

Client zurück.

4. Client tauscht den Authorization Code beim Authorization Server gegen ein

Access Token (und evtl. Refresh Token).

5. Client nutzt das Access Token, um auf den Resource Server zuzugreifen.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 80

OpenID Connect (OIDC)

• OAuth 2.0 ist nur für Autorisierung (Was darf ich?), nicht für Authentifizierung

(Wer bin ich?).

• OIDC ist eine Identitätsschicht auf Basis von OAuth 2.0.
• Es ermöglicht Clients, die Identität des Endbenutzers zu verifizieren und grund-

legende Profilinformationen zu erhalten.

• ID Token: Ein JWT (JSON Web Token), das Informationen über den Benutzer

enthält.

• UserInfo Endpoint: API, um weitere Benutzerdaten abzufragen.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 81

ID Token (JWT)

• Header: Algorithmus, Typ.
• Payload (Claims):
• sub (Subject): Eindeutige ID des Benutzers.
• iss (Issuer): Wer hat das Token ausgestellt?
• aud (Audience): Für wen ist das Token bestimmt?
• exp (Expiration): Wann läuft es ab?
• iat (Issued At): Wann wurde es ausgestellt?
• Signature: Zur Überprüfung der Integrität.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 82

OAuth 2.0 / OIDC in der Praxis

• "Login with Google / Facebook / Apple / ..."
• Single Sign-On (SSO) in Unternehmen.
• Absicherung von SPAs und Mobile Apps.
• Bibliotheken und SDKs nutzen, nicht selbst implementieren!

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 83

Begriffe

• Authentication (AuthN): Feststellung der Identität (Wer bist du?).
• Authorization (AuthZ): Feststellung der Berechtigung (Was darfst du?).
• Scope: Umfang des Zugriffs (z. B. "read:photos", "write:calendar").
• Grant Type: Art und Weise, wie das Access Token erlangt wird (z. B. Authorization

Code, Client Credentials).

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 84

Sicherheit bei OAuth 2.0

• HTTPS ist Pflicht.
• State Parameter gegen CSRF.
• PKCE (Proof Key for Code Exchange) für Public Clients (SPAs, Mobile Apps).
• Validierung von Redirect URIs.
• Kurze Lebensdauer von Access Tokens.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 85

Ablauf im Detail

1. Der User klickt in unserer App (Client) auf „Login“.
2. Die App leitet den User auf den Authorization Server weiter (Redirect).
Dabei werden Client-ID, Redirect-URI, Response-Type (code), Scope (openid
profile email) und State übergeben.
3. Der User loggt sich beim Authorization Server ein (wenn nicht schon geschehen).
4. Der Authorization Server fragt den User: „Darf die App XYZ auf dein Profil und
deine E-Mail zugreifen?“ (Consent Screen).
5. Der User bestätigt.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 86

Ablauf im Detail (2)

6. Der Authorization Server leitet den User zurück zur Redirect-URI der App.
In der URL ist ein Authorization Code enthalten.
7. Die App nimmt den Code und sendet ihn (im Hintergrund) zusammen mit der
Client-ID und dem Client-Secret (nur bei Confidential Clients) an den Token-
Endpoint des Authorization Servers.
8. Der Authorization Server prüft den Code und antwortet mit:
• Access Token (für Zugriff auf APIs)
• ID Token (enthält User-Infos)
• Refresh Token (optional, um neue Access Tokens zu holen)

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 87

Ablauf im Detail (3)

9. Die App validiert das ID Token (Signatur, Issuer, Audience, Expiration).
10. Die App hat nun die User-ID und kann den User als „eingeloggt“ betrachten.
11. Wenn die App weitere Daten braucht, kann sie mit dem Access Token den
UserInfo-Endpoint oder andere APIs (Resource Server) aufrufen.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 88

Client Types

• Confidential Clients: Können ein Geheimnis (Client Secret) sicher bewahren.
Beispiel: Webanwendungen auf einem Server (Backend).
• Public Clients: Können kein Geheimnis sicher bewahren.
Beispiel: SPAs (JavaScript im Browser), Mobile Apps.
Hier ist PKCE (Proof Key for Code Exchange) zwingend erforderlich, da kein
Client Secret verwendet werden kann.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 89

Tokens

• Access Token:
• "Schlüssel" für die API.
• Oft ein JWT (kann aber auch ein opaker String sein).
• Hat eine begrenzte Lebensdauer (z. B. 1 Stunde).
• Wird im Authorization Header gesendet: Authorization: Bearer <token>
• Refresh Token:
• Langlebig (Tage, Wochen, Monate).
• Wird genutzt, um ein neues Access Token zu holen, wenn das alte abgelaufen ist,
ohne dass der User sich neu einloggen muss.
• Muss besonders sicher gespeichert werden.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 90

Scopes

• Definieren den Zugriffsbereich.
• openid: Signalisiert, dass OIDC genutzt werden soll.
• profile: Zugriff auf Name, Bild, etc.
• email: Zugriff auf E-Mail-Adresse.
• offline_access: Anforderung eines Refresh Tokens.
• Kundenspezifische Scopes: z. B. read:orders, write:posts.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 91

Discovery Document

• OIDC-Provider stellen oft ein Discovery Document unter
/.well-known/openid-configuration bereit.
• Enthält alle wichtigen URLs (Authorization Endpoint, Token Endpoint, JWKS URI,
...) und unterstützte Features.
• Erleichtert die Konfiguration im Client enorm.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 92

JWT Debugger

• https://jwt.io/
• Nützlich zum Dekodieren und Inspizieren von JWTs (ID Tokens, Access Tokens).
• Achtung: Niemals echte Tokens mit sensiblen Daten auf öffentlichen Webseiten
einfügen!

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 93

Zusammenfassung OIDC

• OIDC baut auf OAuth 2.0 auf.
• Es standardisiert Authentifizierung und User-Infos.
• ID Token ist das zentrale Element für Identität.
• Access Token ist für Autorisierung (API-Zugriff).
• Ermöglicht sicheres und standardisiertes Identitätsmanagement im Web.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 94

Übung 14: OIDC/OAuth für unsere Meta Playlist

Erstellen Sie ein Konzept (keine Implementierung), um OIDC/OAuth in unsere
Web-Architektur der Meta Playlists zu integrieren.
1. Welche unterschiedlichen Ansätze und Möglichkeiten gibt es hier?
2. Wie sieht dann jeweils die Zuordnung der Komponenten aus?

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 95

In den Unterlagen genutzte Icons

<a href="https://www.flaticon.com/free-icons/iphone" title="iphone icons">Iphone icons
created by Good Ware - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/webserver" title="webserver icons">Webserver
icons created by Danteee82 - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/webpage" title="webpage icons">Webpage icons
created by Design View - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created
by Hilmy Abiyyu A. - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by
Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/validation" title="validation icons">Validation
icons created by orvipixel - Flaticon</a>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 96

Vielen Dank!

Fragen?

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 97
