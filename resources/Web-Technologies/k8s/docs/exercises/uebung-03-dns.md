# Übung 3: Praktische Nutzung von DNS

## Aufgabenstellung

1. Fragen Sie Informationen über eine Website mit verschiedenen Parametern ab
2. Was bedeutet es, wenn wir mehrere IP-Adressen bekommen?
3. Was sind potentielle Probleme mit DNS?

---

## Aufgabe 1: DNS-Abfragen

### Wichtige DNS Record Types

| Type | Beschreibung | Beispiel |
|------|--------------|----------|
| A | IPv4-Adresse | `104.20.47.113` |
| AAAA | IPv6-Adresse | `2606:4700::6812:2f71` |
| NS | Nameserver | `ns1.example.com` |
| MX | Mail-Server | `mail.example.com` |
| TXT | Text-Records | SPF, DKIM, Verifikation |
| CNAME | Alias | `www` → `example.com` |
| SOA | Start of Authority | Zone-Informationen |

### Befehle

```bash
# Einfache Abfrage
nslookup fhdw.de

# Spezifische Record-Typen
nslookup -type=NS fhdw.de      # Nameserver
nslookup -type=MX fhdw.de      # Mail-Server
nslookup -type=TXT fhdw.de     # TXT-Records (SPF, etc.)
nslookup -type=AAAA fhdw.de    # IPv6

# Mit dig (detaillierter)
dig fhdw.de ANY               # Alle Records
dig +trace fhdw.de            # Vollständige Auflösung zeigen
dig +short fhdw.de            # Nur IP-Adressen
```

### Beispiel-Ergebnisse für fhdw.de

```
A-Records:     104.20.47.113, 172.66.148.245 (Cloudflare)
NS-Records:    jason.ns.cloudflare.com, amalia.ns.cloudflare.com
MX-Records:    fhdw-de.mail.protection.outlook.com (Microsoft 365)
TXT-Records:   SPF, Google/MS Verifikation, Autodesk
```

---

## Aufgabe 2: Mehrere IP-Adressen

### Warum mehrere IPs?

1. **Load Balancing**: Verteilung der Last auf mehrere Server
2. **Redundanz/Hochverfügbarkeit**: Ausfall eines Servers → andere übernehmen
3. **Geographische Verteilung**: CDN liefert nächsten Server (GeoDNS)
4. **DDoS-Schutz**: Angriffe werden auf mehrere Ziele verteilt

### DNS als Load Balancer

```
Client → DNS-Anfrage → Antwort mit mehreren IPs
                       [104.20.47.113, 172.66.148.245]

Client wählt erste IP → Server 1
Nächster Client      → Server 2 (Round-Robin)
```

### Weitere DNS-Funktionen

- **Service Discovery**: SRV-Records für Dienste
- **E-Mail-Routing**: MX-Records mit Prioritäten
- **Verifizierung**: TXT-Records für SPF, DKIM, Domain-Ownership
- **Aliase**: CNAME für www, cdn, api Subdomains

---

## Aufgabe 3: Sicherheitsprobleme

### 1. DNS Spoofing / Cache Poisoning

```
Angreifer → Falscher DNS-Eintrag → Cache des Resolvers
User fragt "bank.de" → Bekommt Angreifer-IP → Phishing-Seite
```

**Schutz**: DNSSEC (signierte DNS-Antworten)

### 2. Fehlende Verschlüsselung

```
DNS-Anfragen sind im Klartext!
→ ISP sieht alle besuchten Domains
→ Hotspot-Betreiber können mitlesen
→ Staatliche Überwachung möglich
```

**Schutz**:
- DoH (DNS over HTTPS) - Port 443
- DoT (DNS over TLS) - Port 853

### 3. Verfolgbarkeit / Tracking

- ISP protokolliert DNS-Anfragen (Vorratsdatenspeicherung)
- Kostenlose DNS-Dienste (Google 8.8.8.8) sammeln Daten
- Werbenetzwerke nutzen DNS für Tracking

**Schutz**: Private DNS-Resolver, Pi-hole, NextDNS

### 4. Zensur und Manipulation

- Staatliche DNS-Sperren (leicht zu umgehen)
- ISP-Manipulation für Werbung
- Captive Portals in Hotels/Flughäfen

### 5. DNS Rebinding Attacks

- Angreifer ändert DNS-Eintrag nach erstem Zugriff
- Umgeht Same-Origin-Policy im Browser
- Zugriff auf lokale Netzwerk-Geräte möglich

---

## Zusammenfassung Sicherheitsmaßnahmen

| Problem | Lösung |
|---------|--------|
| Spoofing | DNSSEC |
| Mitlesen | DoH / DoT |
| Tracking | Private Resolver |
| Zensur | Alternative DNS-Server |
| Rebinding | Browser-Schutz, TTL-Limits |
