# Übung 2: Verständnisfragen zu TLS

## Aufgabenstellung

Welche Aussagen sind richtig oder falsch und warum?

---

## Frage 1

> Die ausgetauschten Daten zwischen meinem Browser und dem Server sind durch TLS für Dritte nicht lesbar. Es sieht z.B. also niemand, was ich auf einer Website mache.

### Antwort: **Teilweise richtig**

**Was TLS schützt:**
- ✅ Der **Inhalt** der Kommunikation (HTTP-Body, Formulardaten, Passwörter) ist verschlüsselt
- ✅ Dritte im Netzwerk (z.B. im WLAN) können den Inhalt nicht mitlesen
- ✅ Man-in-the-Middle-Angriffe werden erkannt (durch Zertifikatsprüfung)

**Was TLS NICHT verbirgt:**
- ❌ **Welche Domain** besucht wird (SNI - Server Name Indication ist unverschlüsselt)
- ❌ **IP-Adressen** von Client und Server sind sichtbar
- ❌ **Zeitpunkt und Datenmenge** der Kommunikation
- ❌ **DNS-Anfragen** (ohne DoH/DoT) zeigen besuchte Domains

**Wer kann trotzdem etwas sehen:**
- Der Server selbst sieht alles (Logs, Analytics)
- Der Arbeitgeber/Schule bei MITM-Proxy mit eigenem Root-Zertifikat
- Browser-Extensions mit entsprechenden Berechtigungen

---

## Frage 2

> Das Zertifikat des Servers überprüft mein Client bei einer Zertifizierungsstelle (CA). Dadurch weiß ich genau, dass ich mit dem richtigen Server kommuniziere.

### Antwort: **Falsch / Irreführend**

**Wie es wirklich funktioniert:**

1. **Keine direkte CA-Anfrage**: Der Browser fragt die CA nicht bei jeder Verbindung
2. **Lokale Prüfung**: Das Zertifikat wird lokal gegen vorinstallierte Root-Zertifikate geprüft
3. **Zertifikatskette**: Server → Intermediate CA → Root CA (im Browser/OS gespeichert)

**Was das Zertifikat wirklich bestätigt:**
- ✅ Der Server besitzt den privaten Schlüssel zum Zertifikat
- ✅ Eine CA hat die Domain-Kontrolle zum Ausstellungszeitpunkt verifiziert
- ⚠️ Bei DV-Zertifikaten: Nur Domain-Kontrolle, keine Identitätsprüfung
- ⚠️ Bei EV-Zertifikaten: Auch rechtliche Identität der Organisation

**Schwachstellen:**
- Kompromittierte CAs können falsche Zertifikate ausstellen
- Staatliche Akteure können CAs zwingen
- Malware kann Root-Zertifikate installieren
- Phishing-Domains bekommen legitime Zertifikate (z.B. `g00gle.com`)

**Zusätzliche Schutzmechanismen:**
- **Certificate Transparency (CT)**: Öffentliches Log aller ausgestellten Zertifikate
- **HSTS**: Erzwingt HTTPS, verhindert Downgrade-Angriffe
- **HPKP** (veraltet): Certificate Pinning im Browser

---

## Zusammenfassung

| Aspekt | TLS bietet | TLS bietet NICHT |
|--------|-----------|------------------|
| Vertraulichkeit | Inhalt verschlüsselt | Metadaten verborgen |
| Integrität | Manipulation erkannt | Schutz vor Server-Logs |
| Authentizität | Domain-Verifikation | 100% Identitätsgarantie |
