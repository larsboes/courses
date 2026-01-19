# Übung 3: DNS-Abfragen

## Aufgabenstellung

### Aufgabe 1: Informationen über eine Website abfragen
Fragen Sie Informationen über eine Website Ihrer Wahl mit den unterschiedlichen Parametern ab (z.B. den RR Types vorne für `-type`, `-debug`, oder weiteren über `-?` oder `--help`).

### Aufgabe 2: Mehrere IP-Adressen für eine Domain
Was bedeutet es, wenn wir mehrere IP-Adressen für eine Domain bekommen? Wozu dient DNS auch?

### Aufgabe 3: Potentielle Probleme mit DNS
Was sind potentielle Probleme, z.B. mit Sicherheit und Verfolgbarkeit, bei DNS in der einfachen, vorgestellten Form?

---

## DNS-Abfrage Tools

DNS-Abfragen können manuell mit `nslookup` oder `dig` auf der Kommandozeile durchgeführt werden.

### Beispiel Website: fhdw.de

## Aufgabe 1: DNS-Abfragen mit verschiedenen Parametern

### Grundlegende Abfragen mit nslookup

```bash
# Einfache DNS-Abfrage (A-Record)
nslookup fhdw.de

# NS-Records abfragen (verantwortliche Nameserver)
nslookup -type=NS fhdw.de

# MX-Records abfragen (Mail-Server)
nslookup -type=MX fhdw.de

# TXT-Records abfragen (z.B. SPF-Einträge)
nslookup -type=TXT fhdw.de

# SOA-Record abfragen (Start of Authority)
nslookup -type=SOA fhdw.de

# AAAA-Record abfragen (IPv6-Adressen)
nslookup -type=AAAA fhdw.de

# Alle verfügbaren Records abfragen
nslookup -type=ANY fhdw.de

# Debug-Modus aktivieren
nslookup -debug fhdw.de
```

### Grundlegende Abfragen mit dig

```bash
# Einfache DNS-Abfrage (A-Record)
dig fhdw.de

# NS-Records abfragen
dig fhdw.de NS

# MX-Records abfragen
dig fhdw.de MX

# TXT-Records abfragen
dig fhdw.de TXT

# Kurze Ausgabe
dig fhdw.de +short

# Ausführliche Ausgabe
dig fhdw.de +trace

# Reverse DNS-Lookup
dig -x 8.8.8.8
```

### Hilfe und weitere Optionen

```bash
# nslookup Hilfe
nslookup -?
nslookup --help
man nslookup

# dig Hilfe
dig -h
man dig
```

## Aufgabe 2: Mehrere IP-Adressen für eine Domain

### Bedeutung mehrerer IP-Adressen

Wenn eine DNS-Abfrage mehrere IP-Adressen zurückgibt, bedeutet dies:

1. **Load Balancing**: Lastverteilung auf mehrere Server
   - Anfragen werden auf verschiedene Server verteilt
   - Verbessert Performance und Skalierbarkeit

2. **Redundanz/Ausfallsicherheit**:
   - Wenn ein Server ausfällt, sind andere noch erreichbar
   - Erhöht die Verfügbarkeit des Dienstes

3. **Geografische Verteilung**:
   - Server in verschiedenen Rechenzentren weltweit
   - Nutzer werden zum nächstgelegenen Server geleitet

### Wozu dient DNS?

DNS (Domain Name System) dient zu:

- **Namensauflösung**: Übersetzung von Domain-Namen (z.B. fhdw.de) in IP-Adressen
- **Reverse Lookup**: Übersetzung von IP-Adressen in Domain-Namen
- **Mail-Routing**: MX-Records zeigen auf Mail-Server
- **Service-Discovery**: SRV-Records für verschiedene Dienste
- **Lastverteilung**: Verteilung über mehrere IPs
- **Flexibilität**: IP-Adressen können geändert werden, ohne dass sich die Domain ändert

## Aufgabe 3: Potentielle Probleme mit DNS

### Sicherheitsprobleme

1. **DNS Spoofing/Cache Poisoning**:
   - Angreifer können gefälschte DNS-Antworten einschleusen
   - Nutzer werden auf falsche/bösartige Websites umgeleitet

2. **Man-in-the-Middle-Angriffe**:
   - DNS-Anfragen sind standardmäßig unverschlüsselt
   - Angreifer können Anfragen abfangen und manipulieren

3. **DNS Amplification (DDoS)**:
   - DNS-Server werden für Verstärkungsangriffe missbraucht
   - Kleine Anfragen erzeugen große Antworten

4. **DNS Tunneling**:
   - DNS kann für Datenexfiltration missbraucht werden
   - Umgehung von Firewalls

### Verfolgbarkeitsprobleme

1. **Fehlende Verschlüsselung**:
   - DNS-Anfragen sind im Klartext sichtbar
   - ISPs und andere können sehen, welche Websites besucht werden

2. **Logging/Tracking**:
   - DNS-Resolver protokollieren alle Anfragen
   - Erstellt detaillierte Nutzerprofile

3. **Zensur**:
   - DNS kann für Internetzensur genutzt werden
   - Bestimmte Domains werden blockiert

### Lösungsansätze

- **DNSSEC**: Digitale Signaturen für DNS-Antworten
- **DNS over HTTPS (DoH)**: Verschlüsselte DNS-Anfragen über HTTPS
- **DNS over TLS (DoT)**: Verschlüsselte DNS-Anfragen über TLS
- **Private DNS-Resolver**: Nutzung vertrauenswürdiger DNS-Server (z.B. 1.1.1.1, 8.8.8.8)

---

## Praktische Befehle zum Ausprobieren

```bash
# Test mit verschiedenen Websites
nslookup google.com
nslookup amazon.com
nslookup github.com

# Mehrere IPs demonstrieren
dig google.com +short

# Debug-Informationen anzeigen
nslookup -debug google.com

# Trace durch DNS-Hierarchie
dig google.com +trace

# Spezifischen DNS-Server verwenden
nslookup fhdw.de 8.8.8.8
dig @8.8.8.8 fhdw.de
```

## Dokumentation der Ergebnisse

Führen Sie die Befehle aus und dokumentieren Sie:
- Welche IP-Adressen werden zurückgegeben?
- Wie viele Nameserver sind verantwortlich?
- Welche MX-Records existieren?
- Was zeigt der Debug-Modus?
