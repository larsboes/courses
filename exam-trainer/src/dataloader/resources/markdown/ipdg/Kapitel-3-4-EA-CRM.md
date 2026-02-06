# Implementierung digitaler Geschäftsprozesse - Kapitel 3 & 4

**Dozent:** Hüseyin Yilmaz

---

## 3. Enterprise Architecture

### 3.1 Definition & Ziele

> **Prozessarchitektur** = strukturierte Gesamtheit aller Geschäftsprozesse eines Unternehmens und deren Beziehungen zueinander

> **IT-Architektur** = konzeptionelles Modell der IT-Landschaft (Hardware, Software, Netzwerke, Daten, Anwendungen)

**Wesentliche Frage:** Wie bringt man beide Welten zusammen?

### 3.2 Prozessarchitektur - Levels

| Level | Bezeichnung | Beschreibung |
|-------|-------------|--------------|
| 1 | Hauptprozess | End-to-End-Prozesse entlang der Wertschöpfungskette |
| 2 | Prozessgruppen | Logische Teilmengen der Wertschöpfungsketten |
| 3 | Prozess | Abfolge von Aktivitäten für bestimmtes Ergebnis |
| 4 | Subprozess | Modulare, wiederverwendbare Prozesskomponenten |
| 5 | Prozessschritte | Einzelne Aktivitäten oder Entscheidungen (BPMN) |

### Capability vs. Prozess

- **Capability** = WAS ein Unternehmen tun kann (Fähigkeit)
- **Prozess** = WIE es getan wird (Ablauf)

### Beispielhaftes Prozesshaus

**Management-Prozesse:**
- Strategy-to-Execution (V2E)
- Accounting-to-Reporting (A2R)
- Risk-to-Compliance (R2C)

**Kern-Prozesse:**
- Lead-to-Order (L2O)
- Order-to-Revenue (O2R)
- Source-to-Pay (S2P)
- Plan-to-Manufacture (P2M)
- Contact-to-Service (C2S)

**Support-Prozesse:**
- Hire-to-Retire (H2R)
- Demand-to-Release (D2R)

### Rollen in der Prozessarchitektur

| Rolle | Verantwortung |
|-------|---------------|
| **Business Domain Owner** | Globale Verantwortung für Geschäftsprozesse im funktionalen Bereich |
| **E2E Value-Chain-Owner** | Gestaltung und Verbesserung der End-to-End-Wertschöpfungskette |
| **Process Group Owner (L2)** | Verantwortung einer Prozessgruppe, Konsistenz sicherstellen |
| **Process Owner (L3)** | Förderung von Prozessexzellenz, Definition von Standards |
| **Subject Matter Expert (L4)** | Fachliche Autorität in spezifischem Themengebiet |

---

## 4. CRM - Customer Relationship Management

### 4.1 Ausgangslage

> **CRM** = Pflege von Kundenbeziehungen mit den Zielen:
> - Kundengewinnung
> - Vergrößerung des Kundenstamms
> - Kundenselektion (profitable Kunden identifizieren)
> - Kundenbindung (Loyalty Management)

### Zeitliche Entwicklung des CRM

1. Funktionales CRM
2. CRM - Kundenorientiertes Frontend
3. CRM - Strategischer Ansatz
4. Agile und flexible CRM-Strategie

### Customer Journey - Die 5 Phasen

| Phase | Beschreibung |
|-------|--------------|
| **Awareness** | Kunde wird erstmals aufmerksam (Werbung, Social Media) |
| **Consideration** | Kunde sammelt Informationen, vergleicht Alternativen |
| **Purchase** | Kaufentscheidung und Kaufprozess |
| **Retention** | Nach dem Kauf: Nutzung, Support, Kundenpflege |
| **Advocacy** | Zufriedener Kunde empfiehlt aktiv weiter |

### 4.2 CRM-Strategie

> **Ziel des CRM:** Möglichst umfassendes Wissen über Kunden aufbauen, um die Interaktion zu optimieren und den **Customer Lifetime Value (CLV)** zu maximieren.

### 4.3 CRM-Kundenbindung - Warum CRM wichtig ist

- Es ist **erheblich teurer** an einen neuen Kunden zu verkaufen als an einen existierenden
- Ein **unzufriedener Kunde** beeinflusst mehr Menschen als ein zufriedener
- Die Mehrzahl der **sich beschwerenden Kunden** bleiben, wenn ihr Problem gelöst wird

### 4.4 Die 4 CRM-Methoden

#### Strategisches CRM
Leitet sich aus der Unternehmensstrategie ab und spezifiziert:
- Welche Ziele
- Mit welchen Kundengruppen
- Durch welche Maßnahmen
- Über welchen Zeitraum

#### Analytisches CRM
- Nutzt Kundendaten für profitable Beziehungen
- Verwendet **Business Intelligence (BI)** Methoden:
  - Data Warehouse
  - Data Mining
  - OLAP-Systeme
- Bestimmt Kundenzufriedenheit und Kundentreue (Share of Wallet)

#### Operatives CRM
Setzt die identifizierten Maßnahmen um als automatisierte Lösungen für:
- Marketing
- Sales
- Services
- Front-Office / Back-Office
- Salesforce Management
- Kampagnenmanagement

#### Kommunikatives CRM
- Management aller Kommunikationskanäle (Telefon, Internet, E-Mail, Direct Mailing)
- Synchronisierung und Steuerung der Kanäle
- Ermöglicht bidirektionale Kommunikation
- = **Multi Channel Management**

### 4.5 CRM-Maßnahmen

| Maßnahme | Beschreibung |
|----------|--------------|
| **E-Mail-Kampagnen** | Personalisierte E-Mails basierend auf Kundendaten |
| **Up-/Cross-Selling** | Upselling: höherwertiges Produkt; Cross-Selling: ergänzendes Produkt |
| **Loyalty-Programme** | Belohnung für Treue (Punkte, Rabatte, Early-Access) |
| **Serviceverbesserungen** | Schnellere Reaktionszeiten, proaktive Informationen |
| **Reaktivierungsmaßnahmen** | "Wir vermissen Sie"-Kampagnen |

### CRM-KPIs

| Kategorie | KPIs |
|-----------|------|
| **Kundengewinnung** | CAC (Customer Acquisition Cost), Lead→Customer Rate, MQL/SQL Ratio |
| **Kundenbindung** | Retention Rate, Churn Rate, Repeat Purchase |
| **Wertbeitrag** | CLV (Customer Lifetime Value), ARPU (Average Revenue Per User) |
| **Engagement** | Engagement Score, Open/Click Rates, NPS (Net Promoter Score) |
| **Service** | First Response Time, FCR (First Contact Resolution), CSAT |
| **Sales** | Sales Cycle, Pipeline Value, Win Rate |

### Customer Lifetime Value (CLV)

> **CLV** = Langfristiger Wert eines Kunden über die gesamte Geschäftsbeziehung

**Formel:**
```
CLV = (Durchschnittlicher Umsatz pro Jahr × Dauer der Beziehung) - Kundenpflegekosten
```

**Beispielrechnung:**
- Dauer T = 10 Jahre
- Kauf alle 2 Jahre = 500 €
- Kundenpflege = 50 €/Jahr
- Umsatz: 5 × 500 € = 2.500 €
- Kosten: 10 × 50 € = 500 €
- **CLV = 2.000 €**

### 4.5 Loyalty Management und Share of Wallet

> **Share of Wallet** = Anteil der Kaufkraft eines Kunden, der beim Unternehmen bleibt

### 4.6 Warum CRM-Projekte scheitern

**CRM-Projekte haben eine Misserfolgsquote von ca. 50%!**

**Hauptgründe:**
1. Mangel an bereichs- und funktionsübergreifender Koordination
2. Keine CRM Business Strategie
3. Fehlende Prozessänderungen
4. Mangelnde Senior Executive Unterstützung

### 4.7 Auswirkungen gescheiterter CRM-Projekte

| Bereich | Auswirkungen |
|---------|--------------|
| **Finanzen** | Verlust von Marktanteilen, kein ROI, Budgetüberschreitungen |
| **Kundenservice** | Kundenunzufriedenheit, verminderter Servicelevel |
| **Sales** | Rückgang der Produktivität, Zynismus |
| **Unternehmenskultur** | Niedrige Moral, Resistance against Change, Vertrauensverlust |

---

## Klausurrelevante Definitionen

| Begriff | Definition |
|---------|------------|
| **CRM** | Pflege von Kundenbeziehungen (Gewinnung, Bindung, Selektion) |
| **Strategisches CRM** | Ableitung aus Unternehmensstrategie, Zieldefinition |
| **Analytisches CRM** | BI-Methoden zur Kundenanalyse |
| **Operatives CRM** | Umsetzung in automatisierte Lösungen |
| **Kommunikatives CRM** | Multi Channel Management |
| **CLV** | Customer Lifetime Value - langfristiger Kundenwert |
| **Share of Wallet** | Anteil der Kaufkraft beim Unternehmen |
| **Prozessarchitektur** | Strukturierte Gesamtheit aller Geschäftsprozesse |
| **Customer Journey** | Kundenreise: Awareness → Consideration → Purchase → Retention → Advocacy |
