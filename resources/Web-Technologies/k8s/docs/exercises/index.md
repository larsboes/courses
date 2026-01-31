# Übungen - Antworten und Lösungen

Dokumentation zu allen 12 Übungen des FHDW Web Technologies Kurses.

## Übersicht

| Übung | Thema | Typ | Dokumentation |
|-------|-------|-----|---------------|
| Ü1 | Docker Networking | Praktisch | [K8s Overlay](../../overlays/uebung-01/) |
| Ü2 | TLS Verständnisfragen | Theorie | [Antworten](uebung-02-tls.md) |
| Ü3 | DNS Praktisch | Theorie | [Antworten](uebung-03-dns.md) |
| Ü4 | Flask Webserver | Praktisch | [K8s Overlay](../../overlays/uebung-04/) |
| Ü5 | JSON Strukturen | Theorie | [Antworten](uebung-05-json.md) |
| Ü6 | HTML Webserver | Praktisch | [K8s Overlay](../../overlays/uebung-06/) |
| Ü7 | Responsive UI | Praktisch | [K8s Overlay](../../overlays/uebung-07-08/) |
| Ü8 | JavaScript | Praktisch | [K8s Overlay](../../overlays/uebung-07-08/) |
| Ü9 | REST API | Praktisch | [K8s Overlay](../../overlays/uebung-09/) |
| Ü10 | CouchDB Integration | Praktisch | [K8s Overlay](../../overlays/uebung-10/) |
| Ü11 | K8s Basics | Praktisch | [K8s Overlay](../../overlays/uebung-11/) |
| Ü12 | K8s Production | Praktisch | [K8s Overlay](../../overlays/uebung-12/) |

## Theorie-Übungen

### [Übung 2: TLS](uebung-02-tls.md)
- Verschlüsselung vs. Metadaten
- Zertifikatsprüfung und CAs
- Grenzen von TLS

### [Übung 3: DNS](uebung-03-dns.md)
- DNS Record Types (A, AAAA, MX, NS, TXT)
- Load Balancing und Redundanz
- Sicherheitsprobleme und Lösungen

### [Übung 5: JSON](uebung-05-json.md)
- Warenkorb-Datenstruktur
- Einzelner vs. mehrere Warenkörbe
- Map vs. Array Strukturen

## Praktische Übungen

Alle praktischen Übungen können mit dem Deploy-Script ausgeführt werden:

```bash
cd /home/lars/Developer/courses/Web-Technologies/k8s
./scripts/deploy.sh uebung-XX
```

Siehe [README](../../README.md) für Details zu jeder Übung.
