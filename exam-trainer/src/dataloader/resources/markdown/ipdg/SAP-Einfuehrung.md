# Einführung in SAP S/4HANA

**Quelle:** SAP UCC Magdeburg (Mai 2022)

---

## SAP - Run Simple

- **Marktführer** in Unternehmens-Application Software
- **Drittgrößter** Software-Hersteller der Welt
- 400.000 zufriedene Kunden in 190 Ländern
- Ca. **35-40% Marktanteil** im ERP-Umfeld

### SAP-Geschichte (Meilensteine)

| Jahr | Ereignis |
|------|----------|
| 1972 | Gründung von SAP |
| 1981/82 | Einführung SAP R/2 |
| 1993/94 | Entwicklung SAP R/3 |
| 2005/06 | Veröffentlichung von SAP ERP |
| 2011 | Einführung SAP HANA Plattform |
| 2015 | **SAP S/4HANA** - Next Generation Business Suite |

---

## SAP S/4HANA

> **S/4HANA** = Next Generation Business Suite, größte Innovation seit SAP R/3

**Eigenschaften:**
- Verbindet Personen, Business Netzwerke und Geräte
- Arbeitet mit **Echtzeit-Daten**
- Steht für Effizienz, Vereinfachung und Innovation
- Zentralisierte Stammdaten für Partner, Kunden, Lieferanten

### Evolution

```
1979: R/2 → 1992: R/3 → 2004: ERP → 2015: S/4HANA
```

---

## Datentypen in ERP-Systemen

### Organisationsdaten

Definieren die Unternehmensstruktur:
- **Mandant** = Betriebswirtschaftlich größte Einheit
- **Buchungskreis** = Kleinste Einheit für vollständige Buchhaltung
- **Werk** = Produktionsstandort
- **Lagerort** = Physischer Lagerbereich
- **Verkaufsorganisation** = Verantwortlich für Verkauf
- **Vertriebsweg** = Weg zum Kunden (Großhandel, Internet)
- **Sparte** = Gruppierung von Materialien/Dienstleistungen

### Stammdaten

> Langfristige Daten, die Datensätze repräsentieren

Beispiele:
- Kundenstammdaten
- Materialstammdaten
- Lieferantenstammdaten
- Konditionsstammdaten (Preise)

### Bewegungsdaten (Transaktionsdaten)

> Vorgangsbezogene, kurzlebige Daten

Beispiele:
- Bestellungen
- Rechnungen
- Angebote
- Kundenaufträge

### Dokumente/Belege

> Datensätze bei Geschäftsvorfällen

- Verkaufsbeleg
- Einkaufsbeleg
- Materialbeleg
- Buchungsbeleg

**Belegfluss** = Status einer Bestellung zu beliebigem Zeitpunkt

---

## SAP S/4HANA Innovationen

### 1. In-Memory Datenbank (SAP HANA)

| Eigenschaft | Beschreibung |
|-------------|--------------|
| Spaltenorientiert | Effiziente Spaltenverarbeitung |
| In-Memory | Verarbeitung im Arbeitsspeicher |
| Komprimierung | Reduzierter Speicherbedarf |
| Parallele Verarbeitung | Schnellere Ausführung |

**Datenkompression (Beispiel):**
- Traditionelle DB: 593 GB
- HANA: 118,6 GB
- S/4 HANA: **42,4 GB**

### 2. SAP Fiori (Benutzeroberfläche)

- **Hardware-unabhängig** (Desktop, Tablet, Smartphone)
- **Echtzeit**
- Modernes, intuitives Design

**3 App-Typen:**
| App-Typ | Funktion |
|---------|----------|
| **Transaktions-Apps** | Erstellen, Ändern, Anzeigen mit geführter Navigation |
| **Analytische Apps** | Visueller/graphischer Überblick über Geschäftsdaten |
| **Factsheet-Apps** | Essenzielle Informationen über Objekte |

### 3. OLAP + OLTP zusammen

- Fusion von analytischen und transaktionalen Prozessen
- **Single Source of Truth**
- Keine Trennung mehr zwischen operativen und analytischen Daten

---

## On-Premise vs. Cloud

| Aspekt | Cloud | On-Premise |
|--------|-------|------------|
| **Lizenz** | Subscription | Traditional |
| **Wartung** | Von SAP | Vom Kunden |
| **Updates** | Automatisch (Quartal) | Kontrolliert |
| **Hardware** | SAP Cloud | Firmenstandort |
| **Anpassung** | In-App, limitiert | Volle ABAP-Erweiterbarkeit |
| **Kontrolle** | SAP | Kunde |

---

## Konvertierung zu S/4HANA

### 3 Migrationspfade

| Methode | Beschreibung | Vorteile |
|---------|--------------|----------|
| **Neu-Implementierung** (Greenfield) | Komplett neue Installation | Prozesse vereinfachen, schnelle Umsetzung |
| **Systemkonvertierung** | Bestehendes System konvertieren | Keine Re-Implementation, kein Geschäftsunterbrechung |
| **Transformation der Systemlandschaft** | Konsolidierung mehrerer Systeme | Selektive Transformation, niedrigerer TCO |

---

## Optimierungsbereiche

| Bereich | Ziel |
|---------|------|
| **Effizienz** | Ausführung beschleunigen, automatisieren |
| **Effektivität** | Prozesse vereinfachen, intelligent gestalten |
| **Agilität** | Prozessflexibilität, Innovationen integrieren |

---

## Klausurrelevante SAP-Begriffe

| Begriff | Definition |
|---------|------------|
| **Mandant** | Größte organisatorische Einheit in SAP |
| **Buchungskreis** | Kleinste Einheit für vollständige Buchhaltung |
| **Stammdaten** | Langfristige Grunddaten (Kunden, Material, Lieferanten) |
| **Bewegungsdaten** | Vorgangsbezogene, kurzlebige Transaktionsdaten |
| **SAP HANA** | In-Memory Datenbank |
| **SAP Fiori** | Moderne Benutzeroberfläche |
| **S/4HANA** | Next Generation Business Suite |
| **Belegfluss** | Status-Verfolgung von Dokumenten |
