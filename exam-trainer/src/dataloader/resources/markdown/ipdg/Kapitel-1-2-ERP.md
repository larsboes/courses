# Implementierung digitaler Geschäftsprozesse - Kapitel 1 & 2

**Dozent:** Hüseyin Yilmaz
**Quelle:** K.-D. Gronwald - Integrierte Business-Informationssysteme

---

## 1. Einleitung

Enterprise Resource Planning (ERP), Supply Chain Management (SCM), Customer Relationship Management (CRM), Business Intelligence (BI) und Big Data Analytics (BDA) sind unternehmerische Aufgaben und Prozesse, die mit Hilfe standardisierter Softwaresysteme realisiert werden.

---

## 2. ERP - Enterprise Resource Planning

### 2.1 Definition und Ziele

> Ein **ERP-System** unterstützt sämtliche in einem Unternehmen ablaufenden Geschäftsprozesse. Es enthält Module für die Bereiche Beschaffung, Produktion, Vertrieb, Anlagenwirtschaft, Finanz- und Rechnungswesen usw., die über eine gemeinsame Datenbasis miteinander verbunden sind.

**Hauptziele der ERP-Implementierung:**
1. Standardisierung von Geschäftsprozessen
2. Standardisierung interner und externer Stammdaten
3. Standardisierung der IT-Infrastruktur

### SAP ERP Module (meistgenutzte)

**Rechnungswesen:**
- **FI** - Finanzwesen (Financial Accounting)
- **CO** - Kostenrechnung (Controlling)
- **PS** - Projektsystem (Project Systems)

**Logistik:**
- **SD** - Vertrieb (Sales & Distribution)
- **MM** - Materialwirtschaft (Material Management)
- **PP** - Produktionsplanung (Production Planning)
- **QM** - Qualitätsmanagement
- **PM** - Instandhaltung (Plant Maintenance)

**Personalwirtschaft:**
- **HCM** - Human Capital Management

### 2.2 Strategische Ziele

#### Geschäftsprozess-Standardisierung

> Ein **Geschäftsprozess** ist eine Folge von Wertschöpfungsketten mit einem oder mehreren Inputs und einem Kundennutzen stiftenden Output.

- Nicht an organisatorische Unternehmensgrenzen gebunden
- Kann zwischen Abteilungen / unternehmensübergreifend ablaufen
- Beispiel: **Order-to-Cash Prozess** (von Bestellung bis Bezahlung)

#### Lokalisierung

> **Lokalisierung** = Anpassung an lokale sprachliche, kulturelle und rechtliche Gegebenheiten

Betroffen sind:
- Länderspezifische Steuervorschriften
- Rechtliche Vorschriften
- Landessprachliche Anforderungen
- Kultur

**Wichtig:** Wo nicht standardisiert werden kann, wird lokalisiert. Lokalisierungen lassen sich auf **10-20% der Gesamtprozesse** reduzieren.

#### Stammdatenmanagement (Master Data Management)

> **Stammdaten** = wichtige Grunddaten eines Betriebs, die über einen gewissen Zeitraum nicht verändert werden (z.B. Artikel, Kunden, Mitarbeiter, Lieferanten, Stücklisten)

**Datenqualitätsdimensionen:**
1. Genauigkeit
2. Vollständigkeit
3. Aktualität
4. Konsistenz
5. Eindeutigkeit
6. Zugänglichkeit

**Warnung:** Bei Unternehmen ohne Stammdatenmanagement-Abteilung können im Laufe der Zeit **50% der Daten obsolet** werden!

#### IT-Infrastruktur Standardisierung

Umfasst:
- Hardware und Software
- Einkaufskonditionen und Wartungsverträge
- Konsolidierung von Datenbeständen
- Einheitliches Standard-ERP in allen Business Units

**Grundsatzfrage:** On-Premise oder SaaS (Cloud)?

### Total Cost of Ownership (TCO)

> **TCO** = Gesamtkosten von Investitionsgütern während ihrer Nutzungsdauer

| Kostenart | Beschreibung |
|-----------|--------------|
| **Direkte Kosten** | Kapitalkosten, Administration, technischer Support, budgetierbare Fixkosten (HW, Software, Netzwerk, Sicherheit, Services, Helpdesk) |
| **Indirekte Kosten** | Schulung, Verfügbarkeit der Systeme, Antwortzeiten |

### ERP-Template

> **ERP-Template** = Abbildung der Wertschöpfungskette, in dem 80-90% aller Geschäftsprozesse standardisiert enthalten sind

#### Configuration vs. Customization

| Begriff | Definition |
|---------|------------|
| **Configuration** | Abbildung durch Konfiguration von Parametern + Stammdaten, **ohne externe Programmierung** |
| **Customization** | Ergänzung/Modifikation durch **externe Programme**, die nicht im Standard enthalten sind |

### IT-Integrationsstrategien

1. **Koexistenz / Symbiose**
2. **Absorption / Übernahme**
3. **Best of Breed / Standardisierung**
4. **Transformation**

---

## 2.3-2.8 Organisational Readiness

> **Organisational Readiness** = Bereitschaft und Fähigkeit bei Mitarbeitern/im Unternehmen zu Veränderungen

**Wichtig:** ERP-Implementationen sind hauptsächlich **organisatorische** und weniger technologische Herausforderungen!

### Begleitende Maßnahmen

- **ITIL** - IT Infrastructure Library (Best Practices für IT-Services)
- **CMMI** - Capability Maturity Model Integration
- **Lean IT**
- **Six Sigma**

### CMMI Reifegrade

| Level | Bezeichnung |
|-------|-------------|
| 1 | Initial |
| 2 | Managed |
| 3 | Defined |
| 4 | Quantitatively Managed |
| 5 | Optimizing |

**Mindestens Level 2** ist erforderlich für hinreichende Organisational Readiness.

### ITIL - IT Infrastructure Library

> **ITIL** = Umfassende Best-Practices-Sammlung zur Planung und Erbringung von IT-Serviceleistungen

**Kernpublikationen:**
- Service Strategy
- Service Design
- Service Transition
- Service Operation
- Continual Service Improvement

### Organisational Change Management

> Methode, um Veränderungen bei Mitarbeitern/im Unternehmen zu implementieren

**Ziele:**
1. Erhöhung der Akzeptanz bei Endbenutzern
2. Erhöhung der Anpassungsgeschwindigkeit
3. Risikominimierung bzgl. Unterbrechungen
4. Schaffung einer Unternehmensorganisation zur Erreichung der Geschäftsziele

---

## Warum ERP-Projekte scheitern (Lidl-Beispiel)

1. **Unterschätzte Prozesskomplexität** - über Jahrzehnte gewachsene, heterogene Systemumgebungen
2. **Mangelnde Beratungsqualität** - fehlende erfahrene Fachkräfte
3. **Mangelnde Transparenz technischer Risiken**
4. **Überoptimistische Projektplanung** - unerfahrene Berater
5. **Entscheidungsparalyse** - schwierige Entscheidungen werden aufgeschoben

**Goldene Regel:**
```
1) Prozess → 2) System
NICHT: 1) System → 2) Prozess
```

Vor einer Entscheidung für einen Systemanbieter muss sichergestellt werden, dass die IST-Prozesse im neuen System abgebildet werden können!

---

## Klausurrelevante Definitionen

| Begriff | Definition |
|---------|------------|
| **ERP-System** | Unterstützt alle Geschäftsprozesse über gemeinsame Datenbasis |
| **Stammdaten** | Grunddaten die über längeren Zeitraum unverändert bleiben |
| **Configuration** | Anpassung ohne externe Programmierung |
| **Customization** | Anpassung durch externe Programmierung |
| **TCO** | Gesamtkosten während der Nutzungsdauer |
| **Lokalisierung** | Anpassung an lokale Gegebenheiten |
| **ITIL** | Best Practices für IT-Services |
| **Organisational Readiness** | Veränderungsbereitschaft im Unternehmen |
