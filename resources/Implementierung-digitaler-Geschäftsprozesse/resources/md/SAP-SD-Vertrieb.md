# SAP SD - Vertrieb (Sales & Distribution)

**Quelle:** SAP UCC Magdeburg (Mai 2022) - Global Bike Curriculum

---

## Funktionalität des SD-Moduls

- Vertriebsunterstützung
- Verkauf
- Versand und Transport
- Fakturierung
- Kreditmanagement
- Außenhandel

---

## SD Organisationsstruktur

| Organisationseinheit | Beschreibung |
|---------------------|--------------|
| **Mandant** | Größte organisatorische Einheit |
| **Buchungskreis** | Kleinste Einheit für vollständige Buchhaltung |
| **Kreditkontrollbereich** | Gewährt und überwacht Kreditlinien |
| **Verkaufsorganisation** | Verantwortlich für Verkauf, Haftung, Rückgriffe |
| **Vertriebsweg** | Weg zum Kunden (Großhandel, Internet, Endkunde) |
| **Sparte** | Gruppierung von Materialien/Dienstleistungen |
| **Vertriebsbereich** | Kombination: VerkOrg + Vertriebsweg + Sparte |
| **Versandstelle** | Abwicklung des Versands |

---

## SD Stammdaten

### 1. Kundenstammsatz

> Enthält alle Informationen für Aufträge, Lieferungen, Rechnungen, Zahlungen

**3 Datenbereiche:**

| Bereich | Inhalt | Gültigkeit |
|---------|--------|------------|
| **Allgemeine Daten** | Name, Adresse, Kommunikation | Gesamter Konzern (Mandant) |
| **Buchungskreisdaten** | Konten, Zahlung, Bank | Pro Buchungskreis |
| **Vertriebsbereichsdaten** | Verkaufsbüro, Währung | Pro Vertriebsbereich |

### 2. Materialstammsatz

> Zentrale Quelle für materialspezifische Daten

**Sichten (funktionale Segmente):**
- Grunddaten
- Vertrieb
- Einkauf
- Arbeitsplanung
- Prognose
- Lagerverwaltung
- Kalkulation
- Qualitätsmanagement
- Buchhaltung

### 3. Konditionsstammsatz (Preisfindung)

Enthält:
- Preise
- Zuschläge
- Rabatte
- Frachten
- Steuern

Kann abhängig sein von:
- Material-spezifisch
- Kunden-spezifisch
- Beliebigem Belegfeld

---

## Order-to-Cash Prozess

```
Vorverkauf → Kundenauftrag → Verfügbarkeit → Materialbereitstellung
     ↓
Zahlungsbestätigung ← Rechnung ← Warenausgang ← Verpacken/Verladen
```

### 1. Vorverkaufsaktivitäten (CRM Light)

**Vorverkaufsdokumente:**
- **Anfrage** = Kundenanfrage ohne Kaufverpflichtung
- **Angebot** = Verbindliches Angebot (rechtlich bindend für Lieferanten)

### 2. Kundenauftrag

**Struktur:**
| Ebene | Inhalt |
|-------|--------|
| **Kopfbereich** | Kundendaten, Gesamtkosten |
| **Position(en)** | Material, Menge, Positionskosten |
| **Lieferplaneinteilung(en)** | Liefermengen und -termine |

**Ermittelte Informationen:**
- Termine (Lieferplan)
- Versandstelle und Route
- Verfügbarkeitsprüfung
- Transfer an MRP
- Preisfindung
- Kreditlimitprüfung

### 3. Terminierung

**Rückwärtsterminierung:**
Vom Wunschlieferdatum zurückrechnen → Materialbereitstellungsdatum

**Vorwärtsterminierung:**
Wenn Rückwärtsterminierung nicht möglich → Neues Lieferdatum vorwärts berechnen

**Zeiten:**
- Richtzeit (Material bereitstellen)
- Transportdisposition Vorlaufzeit
- Ladezeit
- Transitzeit

### 4. Verfügbarkeitsprüfung

**3 Liefermethoden:**
1. **Einmallieferung** - Alles auf einmal
2. **Komplettlieferung** - Warten bis alles verfügbar
3. **Liefervorschlag** - Teillieferungen

### 5. Versand & Transport

**Prozessschritte:**
1. **Lieferschein erstellen** - Steuert Folgeprozesse
2. **Kommissionierung** - Mengen zusammenstellen
3. **Verpackung** - Material verpacken
4. **Laden** - Auf Transportmittel verladen
5. **Warenausgang** - Besitzübergang, Bestandsreduzierung

### 6. Fakturierung

**Buchungsmethoden:**

| Methode | Beschreibung |
|---------|--------------|
| **Lieferbezogen** | 1 Lieferung → 1 Rechnung |
| **Sammelfakturierung** | Mehrere Lieferungen → 1 Rechnung |
| **Teilfakturierung** | 1 Lieferung → Mehrere Rechnungen |

**Automatische Buchungen:**
- Sollbuchung → Debitorenkonto
- Haben → Ertragskonto

### 7. Zahlung

- Letzter Schritt im Order-to-Cash
- Verwaltet durch Buchhaltung
- Ausgleich der Forderungen

---

## Belegfluss

> Ermöglicht Status-Verfolgung eines Auftrags zu jedem Zeitpunkt

SAP aktualisiert den Status bei jeder Änderung im Order-to-Cash-Zyklus.

---

## Klausurrelevante SD-Begriffe

| Begriff | Definition |
|---------|------------|
| **Verkaufsorganisation** | Verantwortlich für Verkauf und Haftung |
| **Vertriebsweg** | Kanal zum Kunden (Großhandel, Internet) |
| **Vertriebsbereich** | VerkOrg + Vertriebsweg + Sparte |
| **Kundenstamm** | Alle Kundeninformationen |
| **Materialstamm** | Zentrale Materialdaten |
| **Konditionsstamm** | Preise, Rabatte, Zuschläge |
| **Anfrage** | Kundenanfrage ohne Kaufverpflichtung |
| **Angebot** | Rechtlich bindendes Angebot |
| **Kundenauftrag** | Bestellung mit Kopf, Position, Lieferplan |
| **Verfügbarkeitsprüfung** | ATP (Available to Promise) |
| **Belegfluss** | Status-Verfolgung von Dokumenten |
| **Order-to-Cash** | Gesamtprozess von Bestellung bis Zahlung |
