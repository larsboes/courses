# Implementierung digitaler Geschäftsprozesse

[Probeklausur IPDG WS25.pdf](Probeklausur_IPDG_WS25.pdf)

<aside>
💡

Lean IT kommt nicht dran

Fiori kommt ran

wie ist die Abfolge von ETL Prozess

</aside>

- Notizen
    
    Klausur:
    
    3 Strategieziele:
    
    - Standardisierung GP
    - Standardisierung IT Infrastruktur
    - (Hier fehlt noch was)
    
    ERP-Template
    
    IT-Integrationsstrategie
    
    CRM
    
    Folie 26 Rechnung!
    
    !!!! Folie 8: BI 5.3 ETL-Prozess (das Diagramm)
    

[Ressourcen](Ressourcen%2026f9fe9bee2280b8b05ee23099936c0d.csv)

## 1. ERP – Enterprise Resource Planning

### Kerninhalte

<aside>
💡

**Definition:** Ein ERP-System ist eine integrierte, betriebswirtschaftliche Standardsoftware, die alle Geschäftsprozesse (Beschaffung, Produktion, Vertrieb, Finanzwesen usw.) auf einer gemeinsamen Datenbasis verbindet.

</aside>

<aside>
🏁

**Ziele der Einführung:**

- Standardisierung von Geschäftsprozessen (Prozesslandschaft vereinheitlichen).
- Standardisierung von Stammdaten (interne & externe).
- Standardisierung der IT-Infrastruktur (Hardware, Software, Rechenzentren).
</aside>

<aside>
📋

**ERP-Template:** 

Eine Vorlage, die 80-90% der Geschäftsprozesse standardisiert abbildet. Es wird zentral entwickelt, gewartet und ausgerollt.

- *Wichtig für die Klausur:* Das Template definiert globale Standards (Konten, Parameter).
</aside>

<aside>
📝

**Strategien zur Anpassung:**

- **Konfiguration:** Einstellung von Parametern im Standard-System ohne Programmierung (Hausmittel des ERPs nutzen).
- **Customization (Anpassung):** Programmierung zusätzlicher Funktionen, die im Standard nicht existieren (z.B. Schnittstellen, Reports).
</aside>

### **Datenqualitäts-dimensionen:**

- Genauigkeit
- Vollständigkeit
- Aktualität
- Konsistenz
- Eindeutigkeit
- Zugänglichkeit

![image.png](image.png)

### **Standardisierung der IT-Infrastruktur umfasst:**

- Hardware und Software
- Einkaufskonditionen und Wartungsverträge mit Lieferanten
- Konsolidierung von Datenbeständen
- Einheitliches Standard-ERP in allen Business Units + Entitäten eines Unternehmens
    
    → **Grundsatzfrage**: *Inhouse-Lösung (On-Premise)* oder *SaaS (Cloudlösung)*?
    
    → Antwort liefert oft: ***TCO (Total Cost of Ownership)***
    

![Unbenannt.jpg](Unbenannt.jpg)

<aside>
💰

**Kosten (TCO - Total Cost of Ownership):**

- **Direkte Kosten:** Budgetierbar, fallen bei Systembetrieb an
    - (Lizenzen, Hardware, Support).
- **Indirekte Kosten:** Schwer budgetierbar
    - (Schulung, Ausfallzeiten, Produktivitätsverlust).
</aside>

![image.png](86867ca3-e0ba-4d67-8ccc-892191abbbb7.png)

### **IT-Integrationsstrategien**

1. **Koexistenz / Symbiose**

*Sie existieren nebeneinander weiter, ohne dass eines verschwindet oder sich komplett vermischt.*

![image.png](image%201.png)

1. **Absorption / Übernahme**

*Das ist typisch für eine Übernahme, bei der das IT-System der gekauften Firma abgeschaltet und das eigene ausgerollt wird.*

![image.png](image%202.png)

1. **Best of Breed / Standardisierung**

*Man sucht sich aus beiden Welten das Beste heraus („Best of Breed“) und standardisiert es in einer gemeinsamen Lösung.*

![image.png](image%203.png)

1. **Transformation**

*Die alten Systeme werden durch eine komplett neue Systemlandschaft ersetzt.*

![image.png](image%204.png)

![image.png](image%205.png)

### ERP-Template-Lokaisierung

**So viel Standard wie möglich (Grün/Klammer), so wenig Anpassung wie nötig (Orange/Gelb).**

<aside>
📋

**Das ERP-Template:** Sorgt für Stabilität, Vergleichbarkeit der Daten und einen schnellen Rollout.

</aside>

<aside>
🌍

**Die Lokalisierung:** Anpassung an lokale Gegebenheiten (z.B. rechtliche Vorschriften, Steuern, Sprache), wo Standardisierung nicht möglich ist. Ziel: Auf 10-20% begrenzen.

</aside>

### **Organisational Readiness:**

<aside>
💡

**Definition:** Die Bereitschaft und Fähigkeit einer Organisation zur Veränderung. Maßnahmen: ITIL, CMMI, Lean IT.

</aside>

- ITIL, CMMI und Lean IT sind geeignete begleitende Maßnahmen, um Organisational Change Management für einen ERP-Template Rollout zu unterstützen.
- Es braucht mindestens CMMI-Reifegrad Level 2,um eine hinreichende Organisational Readinesszu erreichen. Dieser kann sich während desRollouts als Teil des Projekts erhöhen.
- ERP-Implementationen sind hauptsächlichorganisatorische und wenigertechnologische Herausforderungen.

### Reifegradlevel von CMMI

![image.png](image%206.png)

![image.png](image%207.png)

### 📖 Glossar & Begriffe (ERP)

> **Best Practice:** Bewährte Methoden/Prozesse, die als Industriestandard gelten. 
**Stammdaten (Master Data):** Statische Grunddaten (Kunden, Material), die sich selten ändern. Hohe Qualität ist essenziell (Genauigkeit, Vollständigkeit). 
**Bewegungsdaten:** Dynamische Daten aus Transaktionen (z.B. Bestellungen). 
**Lean IT:** Vermeidung von Verschwendung in IT-Prozessen (kein Wertbeitrag = Weglassen).
**Organisational Change Management:** Methode, um Akzeptanz für Veränderungen bei Mitarbeitern zu schaffen.
> 

---

## 2. Enterprise Architecture (Prozess- & IT-Architektur)

### Kerninhalte

<aside>
💡

- **Prozessarchitektur:** Strukturierte Gesamtheit aller Geschäftsprozesse. Ziel: Transparenz und Steuerung der Wertschöpfungskette.
- **IT-Architektur:** Modell der IT-Landschaft (Hardware, Software, Netze) als Basis für die Prozesse.
</aside>

![image.png](cde4339d-1b4f-4c7d-89e1-83e065873a10.png)

![Prozessarchitektur](image%208.png)

Prozessarchitektur

![Beispielhaftes Prozesshaus](image%209.png)

Beispielhaftes Prozesshaus

- **Prozesshaus (Ebenen):**
    1. Managementprozesse (Strategie)
    2. Kernprozesse (Wertschöpfung, z.B. Lead-to-Order, Order-to-Cash)
    3. Supportprozesse (Unterstützung, z.B. Hire-to-Retire)

- **Rollen im Prozessmanagement:**
    - **Process Owner (L3):** Definiert Standards, misst Performance.
    - **Process Group Owner (L2):** Verantwortet eine Prozessgruppe strategisch.
    - **Business Domain Owner:** Globale Verantwortung für einen funktionalen Bereich.

### 📖 Glossar & Begriffe (Architecture)

> **End-to-End (E2E):** Betrachtung eines Prozesses vom Anfang (Kundenbedarf) bis zum Ende (Leistungserbringung) über Abteilungsgrenzen hinweg.
> 
> 
> **Order-to-Cash:** Prozess von der Kundenbestellung bis zum Zahlungseingang. 
> **Purchase-to-Pay:** Prozess von der Bestellung beim Lieferanten bis zur Bezahlung.
> 

---

## 3. CRM – Customer Relationship Management

### Kerninhalte

<aside>
💡

**Definition:** Management der Kundenbeziehungen zur Maximierung des Customer Lifetime Value (CLV). Es ist teurer, Neukunden zu gewinnen, als Bestandskunden zu halten.

</aside>

- **Customer Journey (Phasen):**
    1. **Awareness:** Aufmerksamkeit wecken.
    2. **Consideration:** Kunde vergleicht Alternativen.
    3. **Purchase:** Kaufentscheidung.
    4. **Retention:** Bindung, Service, Wiederkauf.
    5. **Advocacy:** Kunde empfiehlt weiter.

- **4 Arten des CRM:**
    1. **Strategisch:** Langfristige Ausrichtung auf profitable Kunden.
    2. **Analytisch:** Auswertung von Daten (Data Mining, OLAP) zur Optimierung.
    3. **Operativ:** Umsetzung in Marketing, Sales, Service (Front-Office).
    4. **Kommunikativ:** Steuerung aller Kanäle (Multi-Channel).

<aside>
📉

**Scheitern von CRM-Projekten:** Quote ca. 50%. Hauptgründe: Mangelnde Strategie, fehlende Prozessänderungen, fehlender Management-Support (anders als bei reinen IT-Projekten ist hier der "Faktor Mensch/Strategie" kritischer).

</aside>

### Customer Lifetime Value (CLV)

![Unbenannt.jpg](Unbenannt%201.jpg)

### 📖 Glossar & Begriffe (CRM)

> **CLV (Customer Lifetime Value):** Der Gesamtwert eines Kunden über die gesamte Dauer der Beziehung.
**Customer Centricity:** Der Kunde steht im Zentrum aller Aktivitäten – von Entwicklung über Vertrieb bis Service.
**Share of Wallet:** Anteil der Ausgaben eines Kunden, den er bei *einem* Unternehmen tätigt. 
**Churn Rate:**Abwanderungsquote von Kunden. 
**Cross-Selling:** Verkauf ergänzender Produkte (z.B. Handyhülle zum Handy). 
**Up-Selling:** Verkauf eines höherwertigen Produkts.
> 

---

## 4. BI – Business Intelligence & Data Mining

### Kerninhalte

<aside>
💡

**Definition BI:** Prozess zur Transformation von fragmentierten Daten in handlungsrelevantes Wissen zur Entscheidungsunterstützung.

</aside>

- **BI-Prozess:**
    1. Datenintegration (Data Warehouse)
    2. Datenanalyse (OLAP)
    3. Visualisierung (Dashboards)

<aside>
🧾

**OLAP vs. OLTP:**

- **OLTP (Online Transaction Processing):** Operative Systeme (ERP), schreiben viele Transaktionen, normalisierte Datenbanken.
- **OLAP (Online Analytical Processing):** Analysesysteme (BI), lesen aggregierte Daten, multidimensionale Würfel (Cubes).
</aside>

<aside>
🎲 **ETL-Prozess:**

1. Extract (aus Quellen ziehen), 
2. Transform (reinigen, harmonisieren), 
3. Load (ins Data Warehouse laden).
</aside>

![image.png](image%2010.png)

### Sternschema

Das **Sternschema** ist eine besondere Form eines Datenmodells, dessen Ziel eine Optimierung auf effiziente Leseoperationen. Hauptanwendungsfeld sind Data-Warehouse und OLAP-Anwendungen. Es besteht aus:

<aside>
📊 **Faktentabellen** beinhalten Kenn- oder Ergebniszahlen, die sich aus dem laufenden Geschäft ableiten lassen und wirtschaftliche Leistung widerspiegeln, wie z. B. Profitabilität, Kosten, Leistung/Erlös, Ausgaben, Einnahmen, Aufwände, Erträge

</aside>

<aside>
🥶 **Dimensionstabellen** sind beschreibenden Daten und sind vergleichsweise statisch und üblicherweise erheblich kleiner als Faktentabellen.

</aside>

<aside>
⛏️ **Data Mining:** Suche nach Mustern und Korrelationen in großen Datenmengen (z.B. für Warenkorbanalyse).

</aside>

### 📖 Glossar & Begriffe (BI)

> **MSS (Management Support Systeme):** Oberbegriff für Systeme, die Führungskräfte unterstützen (MIS, DSS, EIS). 
**Data Warehouse:** Zentrale Datenbank, die Daten aus verschiedenen Quellen für Analysen zusammenführt. 
**Sternschema:** Datenmodell im Data Warehouse für effizientes Lesen (Faktentabelle in der Mitte, Dimensionstabellen drumherum).
> 

---

## 5. Big Data Analytics

### Kerninhalte

<aside>
💡

**Definition:** Analyse großer, komplexer und sich schnell ändernder Datenmengen, die mit herkömmlichen Methoden schwer zu verarbeiten sind.

</aside>

> **Die V's von Big Data:**
> 
> 1. **Volume (Menge),** 
> 2. **Velocity (Geschwindigkeit),** 
> 3. **Variety (Vielfalt),** 
> 4. **Veracity (Wahrhaftigkeit),** 
> 5. **Value (Wert),**
> 6. Variability (Variabilität / Veränderlichkeit),
> 7. Visualization (Visualisierung)

![image.png](image%2011.png)

### **Analytics Evolution:**

<aside>
💡

- **Descriptive Analytics (Vergangenheit):**
    - *Frage:* Was ist passiert und warum?
    - *Methode:* Data Mining historischer Daten.
    - *Nutzen:* Management-Reports (Erfolgs-/Misserfolgsanalyse).
- **Predictive Analytics (Zukunft):**
    - *Frage:* Was wird passieren?
    - *Methode:* Kombination aus historischen Daten, externen Daten, Algorithmen und Machine Learning.
    - *Nutzen:* Prognosen (z. B. Marktentwicklungen).
- **Prescriptive Analytics (Handlung):**
    - *Frage:* Was sollen wir tun? (Warum und Wie?)
    - *Methode:* Hybride Daten (strukturiert & unstrukturiert wie Video/Ton), Geschäftsregeln und Echtzeit-Analyse.
    - *Nutzen:* Vorschlag konkreter Entscheidungsoptionen zur Risikominimierung oder Vorteilsnutzung.
</aside>

### **Methoden:**

<aside>
💡

- **Sentiment Analysis (Stimmungsanalyse):**
    - Analysiert Emotionen, Meinungen und Haltungen in sozialen Medien.
    - Fokus: Wie stehen Personen zu Marken, Produkten oder Ereignissen?
- **Text Mining:**
    - Prozess, um unstrukturierten Text für Analysen lesbar zu machen.
    - Anwendung: Suchmaschinen, Spam-Filter, Betrugserkennung (Fraud Detection).
</aside>

### **Levenshtein-Distanz:**

<aside>
💡

- **Definition:** Ein Maß für die Unterschiedlichkeit von zwei Zeichenketten.
- **Funktionsweise:** Zählt die minimale Anzahl an Operationen (Einfügen, Löschen, Ersetzen), die nötig sind, um Wort A in Wort B umzuwandeln.
- **Anwendung:** Finden von Tippfehlern (Rechtschreibkorrektur), Erkennen von Duplikaten, die leicht unterschiedlich geschrieben sind (z.B. "Maier" vs. "Mayer").
</aside>

### 📖 Glossar & Begriffe (Big Data)

> **Unstrukturierte Daten:** Daten ohne festes Format (Texte, Bilder, Videos), schwer in Tabellen zu speichern. 
**Hadoop/MapReduce:** Framework zur Verarbeitung riesiger Datenmengen durch Aufteilung auf viele Rechner.
> 

---

## 6. SAP S/4HANA Grundlagen

### 💡 Kerninhalte

- **S/4HANA:** Die aktuelle ERP-Generation von SAP. Basiert auf der **In-Memory Datenbank SAP HANA** (Daten liegen im Arbeitsspeicher -> extrem schnell).
- **Vorteile:** Echtzeit-Analysen, vereinfachtes Datenmodell (weniger Tabellen), moderne Oberfläche (Fiori).
- **Betriebsmodelle:**
    - **On-Premise:** Eigene Hardware, volle Kontrolle, individuelle Anpassung (Customizing) möglich.
    - **Cloud:** Software als Service, standardisiert, automatische Updates, weniger Anpassungsmöglichkeiten.
- **Organisationseinheiten:** Mandant (Konzern) > Buchungskreis (Firma mit eigener Bilanz) > Werk > Lagerort.