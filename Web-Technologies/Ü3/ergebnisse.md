# DNS-Abfrage Ergebnisse für fhdw.de

## A-Record (IPv4-Adressen)
```
IP-Adressen:
- 104.20.47.113
- 172.66.148.245

DNS-Resolver: 172.29.15.254
```

**Bedeutung**: fhdw.de hat 2 IPv4-Adressen → Load Balancing & Redundanz über Cloudflare CDN

---

## NS-Records (Nameserver)
```
Verantwortliche Nameserver:
- jason.ns.cloudflare.com
- amalia.ns.cloudflare.com
```

**Bedeutung**: Domain wird von Cloudflare DNS verwaltet

---

## MX-Record (Mail-Server)
```
Mail-Server:
- 0 fhdw-de.mail.protection.outlook.com
```

**Bedeutung**: E-Mails für @fhdw.de werden über Microsoft Outlook/Exchange verarbeitet (Priorität 0)

---

## TXT-Records (Verifizierung & SPF)
```
Domain-Verifizierungen:
- autodesk-domain-verification=yoAraueLfSUU73v7GBkj
- MS=ms40602103
- google-site-verification=GS5GfRLOt3JF_3Eg9l9pI2-Ts4AXl6yh8OZ1_9flFQ0
- ca3-bfd3bc714dd941d0a1f4ba6543cd42e5
- ca3-73e9b2e268544bb9bf72d399ee4a7238

SPF-Record (E-Mail-Authentifizierung):
v=spf1 ptr ip4:217.29.41.139/32 ip4:193.22.64.0/20 ip4:172.16.0.0/12
ip4:195.14.231.82/30 ip4:188.1.242.78/30 ip4:188.1.242.242/30
ip4:188.1.230.78/30 ip4:188.1.239.18/30
a:vpro0139.proserver.punkt.de
include:spf.protection.outlook.com a mx -all
```

**Bedeutung**:
- Verifizierung für Google, Microsoft, Autodesk
- SPF verhindert E-Mail-Spoofing (nur autorisierte Server dürfen E-Mails senden)

---

## SOA-Record (Start of Authority)
```
Primary Nameserver: amalia.ns.cloudflare.com
Mail-Adresse: dns.cloudflare.com
Serial: 2384790463
Refresh: 10000 (2h 46m 40s)
Retry: 2400 (40 min)
Expire: 604800 (7 Tage)
Minimum TTL: 1800 (30 min)
```

**Bedeutung**: Konfiguration für DNS-Zone-Updates zwischen Nameservern

---

## AAAA-Records (IPv6-Adressen)
```
IPv6-Adressen:
- 2606:4700:10::6814:2f71
- 2606:4700:10::ac42:94f5
```

**Bedeutung**: fhdw.de ist über IPv6 erreichbar (moderne Internet-Protokoll-Version)

---

## Debug-Modus Erkenntnisse
```
TTL (Time to Live):
- A-Records: 228 Sekunden
- NS-Records: 21540 Sekunden (~6h)
- Nameserver IPs: 86304 Sekunden (~24h)

Nameserver IP-Adressen:
jason.ns.cloudflare.com:
- 172.64.33.179
- 173.245.59.179
- 108.162.193.179

amalia.ns.cloudflare.com:
- 162.159.38.94
- 172.64.34.94
- 108.162.194.94
```

**Bedeutung**:
- Kurze TTL für A-Records ermöglicht schnelle IP-Wechsel
- Jeder Nameserver hat 3 IP-Adressen für Hochverfügbarkeit

---

## Zusammenfassung

### Aufgabe 2: Mehrere IP-Adressen
- **2 IPv4-Adressen** und **2 IPv6-Adressen** für fhdw.de
- **Zweck**: Load Balancing und Ausfallsicherheit über Cloudflare CDN
- **DNS dient auch zu**:
  - E-Mail-Routing (MX-Records → Outlook)
  - Domain-Verifizierung (TXT-Records)
  - E-Mail-Sicherheit (SPF-Records)
  - IPv4 & IPv6 Unterstützung

### Aufgabe 3: Sicherheitsprobleme erkannt
1. **Unverschlüsselte Abfragen**: DNS läuft über Port 53 (kein TLS/HTTPS)
2. **Sichtbare Daten**: Jeder im Netzwerk kann DNS-Anfragen mitlesen
3. **SPF als Schutz**: Verhindert E-Mail-Spoofing
4. **DNSSEC**: In den Antworten sichtbar (rdata_46 = Signaturen)
   - Schützt vor DNS-Spoofing/Poisoning
