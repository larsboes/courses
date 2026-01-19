Übungen zu
Web Technologies and Applications
Prof. Dr. Jan Stehr
WS 2025/26

Web Technologies and Applications FHDW 2025 – Jan Stehr

1

Übung 1: Eine kleine Infrastruktur, praktisch mit Vagrant

1.

2.

Installieren Sie VirtualBox (oder nutzen Sie eine bereits bei Ihnen vorhandene, kompatible Virtualisierungslösung).

Installieren Sie Vagrant. Bitte beachten: Es gibt immer mal Inkompatibilitäten zwischen Vagrant und Provider der
VMs.

3.

Legen Sie ein Vagrantfile in einem geeigneten Verzeichnis an:

Vagrant.configure("2") do |config|
 config.vm.box = "ubuntu/jammy64"
 config.vm.network "private_network", ip: "10.0.0.10"

end

4. Wechseln Sie via Shell in das Verzeichnis, dann vagrant up

5. Nehmen Sie ersten Kontakt zur VM über den Internet Stack auf:

ping 10.0.0.10

6.

Loggen Sie sich in der VM ein mit vagrant ssh und schauen Sie sich die Netzwerkschnittstellen dort an: ip mit
verschiedenen Parametern, z. B. address

7. Was für Prozesse laufen in der VM? ps und ps -ef

8.

Probieren Sie verschiedene Vagrant-Kommandos aus:
vagrant, vagrant status, vagrant box list...

9.

Am Ende vagrant halt

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 2

Eine kleine Infrastruktur, praktisch mit Vagrant

vagrant up

Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'ubuntu/bionic64'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'ubuntu/bionic64' version '20230607.0.0' is up to date...
==> default: Setting the name of the VM: Lab1_default_1726732279824_59073
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...

default: Adapter 1: nat
default: Adapter 2: hostonly
==> default: Forwarding ports...

default: 22 (guest) => 2222 (host) (adapter 1)

==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...

default: SSH address: 127.0.0.1:2222
default: SSH username: vagrant
default: SSH auth method: private key
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Mounting shared folders...

default: /vagrant => /Users/janstehr/Documents/FHDW/WTA/Lab1

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 3

Eine kleine Infrastruktur, praktisch mit Vagrant

vagrant ssh

Welcome to Ubuntu 18.04.6 LTS (GNU/Linux 4.15.0-212-generic x86_64)

* Documentation: https://help.ubuntu.com
* Management: https://landscape.canonical.com
* Support: https://ubuntu.com/advantage

System information as of Thu Sep 19 13:12:05 UTC 2024

System load: 0.0 Processes: 88
Usage of /: 2.4% of 61.80GB Users logged in: 0
Memory usage: 11% IPv4 address for enp0s3: 10.0.2.15
Swap usage: 0% IPv4 address for enp0s8: 10.0.0.10

vagrant@ubuntu-bionic:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
link/ether 02:26:09:06:31:01 brd ff:ff:ff:ff:ff:ff
inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3
valid_lft 86393sec preferred_lft 86393sec
inet6 fe80::26:9ff:fe06:3101/64 scope link
valid_lft forever preferred_lft forever
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
link/ether 08:00:27:0e:25:0f brd ff:ff:ff:ff:ff:ff
inet 10.0.0.10/24 brd 10.0.0.255 scope global enp0s8
valid_lft forever preferred_lft forever
inet6 fe80::a00:27ff:fe0e:250f/64 scope link
valid_lft forever preferred_lft forever

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 4

Übung 2: HTTP-Analyse

Nutzen Sie Postman oder curl, um HTTP-Requests an verschiedene Webseiten
zu senden.
1. Senden Sie einen GET-Request an http://www.google.de. Was passiert?
2. Senden Sie einen GET-Request an https://www.google.de. Was ist der
Unterschied?
3. Analysieren Sie die Header der Response.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 5

HTTP-Analyse

curl -v http://www.google.de

* Trying 142.250.186.67:80...
* Connected to www.google.de (142.250.186.67) port 80 (#0)
> GET / HTTP/1.1
> Host: www.google.de
> User-Agent: curl/8.1.2
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Location: http://www.google.de/
< Content-Type: text/html; charset=UTF-8
< Date: Thu, 19 Sep 2024 13:14:58 GMT
< Expires: Sat, 19 Oct 2024 13:14:58 GMT
< Cache-Control: public, max-age=2592000
< Server: gws
< Content-Length: 218
< X-XSS-Protection: 0
< X-Frame-Options: SAMEORIGIN
<
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.de/">here</A>.
</BODY></HTML>
* Connection #0 to host www.google.de left intact

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 6

HTTP-Analyse

curl -v https://www.google.de

* Trying [2a00:1450:4001:830::2003]:443...
* Connected to www.google.de (2a00:1450:4001:830::2003) port 443 (#0)
* ALPN: offers h2,http/1.1
* (304) (OUT), TLS handshake, Client hello (1):
* (304) (IN), TLS handshake, Server hello (2):
* (304) (IN), TLS handshake, Unknown (8):
* (304) (IN), TLS handshake, Certificate (11):
* (304) (IN), TLS handshake, CERT verify (15):
* (304) (IN), TLS handshake, Finished (20):
* (304) (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / AEAD-CHACHA20-POLY1305-SHA256
* ALPN: server accepted h2
* Server certificate:
* subject: CN=www.google.com
* start date: Aug 12 08:20:06 2024 GMT
* expire date: Nov 4 08:20:05 2024 GMT
* subjectAltName: host "www.google.de" matched cert's "www.google.de"
* issuer: C=US; O=Google Trust Services LLC; CN=GTS CA 1C3
* SSL certificate verify ok.
* using HTTP/2
* h2 [:method: GET]
* h2 [:path: /]
* h2 [:scheme: https]
* h2 [:authority: www.google.de]
* h2 [user-agent: curl/8.1.2]
* h2 [accept: */*]
* Using Stream ID: 1 (easy handle 0x120008200)
> GET / HTTP/2
> Host: www.google.de
> User-Agent: curl/8.1.2
> Accept: */*
>
< HTTP/2 200
< date: Thu, 19 Sep 2024 13:15:35 GMT
< expires: -1
< cache-control: private, max-age=0
< content-type: text/html; charset=ISO-8859-1
< p3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
< content-encoding: br
< server: gws
< content-length: 19163
< x-xss-protection: 0
< x-frame-options: SAMEORIGIN
< set-cookie: 1P_JAR=2024-09-19-13; expires=Sat, 19-Oct-2024 13:15:35 GMT; path=/; domain=.google.de; Secure
< set-cookie: AEC=AVYB7co...; expires=Tue, 18-Mar-2025 13:15:35 GMT; path=/; domain=.google.de; Secure; HttpOnly; SameSite=lax
< set-cookie: NID=517=...; expires=Fri, 21-Mar-2025 13:15:35 GMT; path=/; domain=.google.de; HttpOnly
< alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
<
<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="de"><head><meta content="text/html; charset=UTF-8" http-
equiv="Content-Type"><meta content="/images/branding/googleg/1x/googleg_standard_color_128dp.png" itemprop="image"><title>Google</title>...

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 7

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

                                 8

HTML-Struktur

<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meine erste Webseite</title>
</head>
<body>

<h1>Willkommen auf meiner Webseite</h1>

<h2>Über mich</h2>
<p>Ich bin ein Informatik-Student an der FHDW.</p>

<h2>Meine Hobbys</h2>
<p>In meiner Freizeit mache ich gerne Sport und programmiere.</p>

<ul>
<li>Fußball</li>
<li>Lesen</li>
<li>Reisen</li>
</ul>

<img src="https://via.placeholder.com/150" alt="Platzhalterbild">

<br>
<a href="https://www.fhdw.de" target="_blank">Besuchen Sie die FHDW</a>

</body>
</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 9

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

                                 10

CSS-Styling

<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meine erste Webseite mit CSS</title>
<style>
body {
font-family: Arial, sans-serif;
}

h1 {
color: navy;
}

p {
padding: 10px;
border: 1px solid #ccc;
}

ul {
display: flex;
list-style-type: none;
padding: 0;
}

li {
margin-right: 20px;
background-color: #f0f0f0;
padding: 5px;
}

@media (max-width: 600px) {
ul {
flex-direction: column;
}
li {
margin-right: 0;
margin-bottom: 10px;
}
}
</style>
</head>
<body>
... (HTML wie in Übung 3) ...
</body>
</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 11

Übung 5: Interaktive Webseite

Erweitern Sie Ihre Webseite um JavaScript-Funktionalität:
1. Fügen Sie einen Button hinzu.
2. Wenn der Button geklickt wird, soll sich der Text der Hauptüberschrift ändern.
3. Fügen Sie ein Eingabefeld hinzu.
4. Wenn der Benutzer etwas eingibt und Enter drückt, soll der Text als neues
Element der Liste hinzugefügt werden.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 12

Interaktive Webseite

...
<h1>Willkommen auf meiner Webseite</h1>
<button id="changeTitleBtn">Titel ändern</button>

<br><br>
<input type="text" id="newItemInput" placeholder="Neues Hobby hinzufügen">

<script>
const title = document.querySelector('h1');
const btn = document.getElementById('changeTitleBtn');
const input = document.getElementById('newItemInput');
const list = document.querySelector('ul');

btn.addEventListener('click', () => {
title.textContent = 'Hallo JavaScript!';
});

input.addEventListener('keypress', (event) => {
if (event.key === 'Enter') {
const newItemText = input.value;
if (newItemText) {
const newItem = document.createElement('li');
newItem.textContent = newItemText;
list.appendChild(newItem);
input.value = '';
}
}
});
</script>
...

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 13

Übung 6: JSON-Verarbeitung

1. Erstellen Sie eine JSON-Datei mit Daten zu mehreren Büchern (Titel, Autor,
Erscheinungsjahr).
2. Laden Sie diese Datei in Ihrer Webseite per Fetch API.
3. Stellen Sie die Bücher in einer HTML-Tabelle dar.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 14

JSON-Verarbeitung (books.json)

[
  {
    "titel": "Der Herr der Ringe",
    "autor": "J.R.R. Tolkien",
    "jahr": 1954
  },
  {
    "titel": "1984",
    "autor": "George Orwell",
    "jahr": 1949
  },
  {
    "titel": "Der kleine Prinz",
    "autor": "Antoine de Saint-Exupéry",
    "jahr": 1943
  }
]

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 15

JSON-Verarbeitung (HTML/JS)

...
<table id="booksTable" border="1">
<thead>
<tr>
<th>Titel</th>
<th>Autor</th>
<th>Jahr</th>
</tr>
</thead>
<tbody>
<!-- Hier kommen die Bücher rein -->
</tbody>
</table>

<script>
fetch('books.json')
.then(response => response.json())
.then(books => {
const tableBody = document.querySelector('#booksTable tbody');
books.forEach(book => {
const row = document.createElement('tr');
row.innerHTML = `
<td>${book.titel}</td>
<td>${book.autor}</td>
<td>${book.jahr}</td>
`;
tableBody.appendChild(row);
});
})
.catch(error => console.error('Fehler beim Laden der Bücher:', error));
</script>
...

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 16

Übung 6: Ein Webserver schickt HTML-Seiten

1.

2.

3.

4.

5.

6.

Schauen Sie sich das Vagrantfile an. Was
passiert da?

Starten Sie die VM mit vagrant up

Überprüfen Sie, ob der Container läuft:
vagrant ssh und dann docker ps

Rufen Sie im Browser auf Ihrem Host-System
http://localhost:8001 auf. Was sehen Sie?

Ändern Sie die index.html im Ordner
root-page auf Ihrem Host-System.
Laden Sie die Seite im Browser neu. Was
passiert? Warum?

Stoppen Sie die VM mit vagrant halt

Vagrant.configure("2") do |config|
 config.vm.box = "ubuntu/jammy64"
 config.vm.provision :docker

 config.vm.network "forwarded_port", guest: 8000, host: 8001

 config.vm.synced_folder "./root-page", "/root-page"

 config.vm.provision "docker" do |d|
   d.run "python-server",
     image: "python:3.9-slim",
     args: "-v /root-page:/www -p 8000:8000 -w /www",
     cmd: "python3 -m http.server 8000"
 end
end

In Ihrem Arbeitsverzeichnis von Vagrant oder
Docker brauchen Sie hier nun ein Unterverzeichnis
/root-page mit der Struktur von HTML-Seiten für
den Webserver.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 17

Ein Webserver schickt HTML-Seiten

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Hallo Welt</title>
</head>
<body>
    <h1>Hallo Welt!</h1>
    <p>Das ist eine einfache HTML-Seite, ausgeliefert von einem Python-Webserver im Docker-Container.</p>
</body>
</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 18

Übung 6: Ein Webserver schickt HTML-Seiten

Vagrant.configure("2") do |config|
 config.vm.box = "ubuntu/jammy64"
 config.vm.provision :docker

 config.vm.network "forwarded_port", guest: 8000, host: 8001

 config.vm.synced_folder "./root-page", "/root-page"

 config.vm.provision "docker" do |d|
   d.build_image "/vagrant", args: "-t webserver"
   d.run "webserver", args: "-v /root-page:/app/templates -p 8000:5000"
 end
end

FROM python:3.9-slim
WORKDIR /app
RUN pip install flask
COPY app.py .
CMD ["python", "app.py"]

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 19

Ein Webserver schickt HTML-Seiten

<!DOCTYPE html>
<html lang="de">
<head>
   <meta charset="UTF-8">
   <title>Startseite</title>
</head>
<body>
   <h1>Willkommen auf der Startseite</h1>
   <p>Dies ist die Startseite unserer Flask-Anwendung.</p>
   <a href="/about">Über uns</a>
</body>
</html>

<!DOCTYPE html>
<html lang="de">
<head>
   <meta charset="UTF-8">
   <title>Über uns</title>
</head>
<body>
   <h1>Über uns</h1>
   <p>Wir sind ein tolles Team.</p>
   <a href="/">Zurück zur Startseite</a>
</body>
</html>

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 20

Übung 6: Ein Webserver schickt HTML-Seiten

1.

2.

3.

4.

5.

Schauen Sie sich das Vagrantfile an. Was
passiert da?

Starten Sie die VM mit vagrant up

Rufen Sie im Browser auf Ihrem Host-System
http://localhost:8001 auf. Was sehen Sie?

Ändern Sie die index.html im Ordner
root-page auf Ihrem Host-System.
Laden Sie die Seite im Browser neu. Was
passiert? Warum?

Stoppen Sie die VM mit vagrant halt

Vagrant.configure("2") do |config|
 config.vm.box = "ubuntu/jammy64"
 config.vm.provision :docker

 config.vm.network "forwarded_port", guest: 8000, host: 8001

 config.vm.provision "shell", inline: <<-SHELL
   mkdir ./root-page
   cp -r /vagrant/root-page/* ./root-page/
 SHELL

 config.vm.provision "docker" do |d|
   d.build_image "/vagrant", args: "-t webserver"
   d.run "webserver", args: "-p 8000:5000"
 end

end

In Ihrem Arbeitsverzeichnis von Vagrant oder
Docker brauchen Sie hier nun ein Unterverzeichnis
/root-page mit der Struktur von HTML-Seiten für
den Webserver.

Web Technologies and Applications FHDW 2025 – Jan Stehr

                                 21

Ein Webserver schickt HTML-Seiten

<!DOCTYPE html>
<html lang="de">
<head>
   <meta charset="UTF-8">
   <title>Startseite</title>
</head>
<body>
   <h1>Hallo sagt der Python Flask
Webserver!</h1>
   <p>Das ist eine einfache, statische HTML-
Seite, geschickt von Flask in einem
Container.</p>
</body>
</html>

<!DOCTYPE html>
<html lang="de">
<head>
   <meta charset="UTF-8">
   <title>Über uns</title>
</head
