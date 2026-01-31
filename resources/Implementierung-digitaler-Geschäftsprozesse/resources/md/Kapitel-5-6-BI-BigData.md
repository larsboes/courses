# Implementierung digitaler Geschäftsprozesse - Kapitel 5 & 6

**Dozent:** Hüseyin Yilmaz

---

## 5. Business Intelligence (BI)

### 5.1 Einleitung und Definitionen

> **Business Intelligence (BI)** = Oberbegriff für Anwendungen, Infrastruktur, Werkzeuge und Best Practices für den Zugang zu und die Analyse von Daten und Information für die (strategische) Entscheidungsfindung und Performanceverbesserung zur Erzielung von Marktvorteilen.

> **Management Support Systeme (MSS)** = IT-Anwendungssysteme, die das Management (Fach- und Führungskräfte) bei Planung, Organisation, Steuerung und Kontrolle unterstützen.

**Klassische Ausprägungen von MSS:**
- **MIS** - Managementinformationssysteme
- **DSS** - Decision Support Systeme
- **EIS** - Executive Information Systeme

> **Informationsmanagement** = Gesamtheit aller Führungsaufgaben bezogen auf das computergestützte Informations- und Kommunikationssystem

### BI-Prozess (3 Schritte)

1. **Auswahl** - Datenquelle wird bestimmt
2. **Aufbereitung** - Datenbestand wird für Analyse modifiziert
3. **Analyse** - Beziehungsmuster werden destilliert und durch logische Abhängigkeiten beschrieben

### 5.2 OLAP und OLTP

| Begriff | Definition |
|---------|------------|
| **OLTP** (Online Transaction Processing) | Transaktionsorientierte Prozesse, die operative Daten in normalisierten Datenbanken bearbeiten |
| **OLAP** (Online Analytical Processing) | Greift auf Daten aus dem Data Warehouse für Analyse und Data Mining zu |

#### OLAP Cube (Datenwürfel)

- Aggregieren Fakten aus jeder Ebene einer Dimension
- Dimensionen: Produkte, Zeit, Regionen, Umsatz, Gewinn...

#### Sternschema

> **Sternschema** = Datenmodell optimiert auf effiziente Leseoperationen (Data Warehouse, OLAP)

| Tabellentyp | Inhalt |
|-------------|--------|
| **Faktentabellen** | Kenn-/Ergebniszahlen (Profitabilität, Kosten, Umsatz, Erlös) |
| **Dimensionstabellen** | Beschreibende Daten (relativ statisch, kleiner als Faktentabellen) |

### 5.3 ETL-Prozess

> **ETL** = Extract, Transform, Load

**Transformation umfasst:**
1. **Bereinigen** - Syntaktische und semantische Mängel beseitigen, Datenformate vereinheitlichen
2. **Harmonisieren** - Synonyme, Homonyme und unterschiedliche Kodierungen beseitigen
3. **Verdichten** - Summation auf verschiedenen Aggregationsstufen
4. **Anreichern** - Berechnung und Speicherung wichtiger Kennzahlen

### 5.4 Data Mining

> **Data Mining** = Untersuchung von Beziehungsmustern durch logische/funktionale Abhängigkeiten

**Anwendungsgebiete:**
- Datenbank Marketing und Targeting
- Kreditrisikomanagement
- Betrugserkennung und -prävention
- Gesundheitswesen / Bioinformatik
- Spam-Filterung
- Empfehlungssysteme
- Sentiment-Analyse
- Qualitatives Data Mining

---

## 6. Big Data Analytics

### 6.1 Standortbestimmung

**Big Data Tools:**
- Hadoop
- In-Memory Computing
- NoSQL-Datenbanken
- Social Media Analytics
- Data Mining

**Big Data...**
- ersetzt Intuition und Erfahrung durch datendominierte Prozesse
- erfordert Flexibilität für Innovationen
- lässt sich outsourcen
- erfordert von der IT die Bereitstellung großer Datenmengen

### 4 globale Trends für Big Data Analytics

1. **Moore's Law** - Transistoren verdoppeln sich alle 24 Monate → Computerleistung wird billiger
2. **Mobile Computing**
3. **Social Networking**
4. **Cloud-Computing**

### 6.2 Big Data im Spannungsfeld von Daten und Intuition

- Datengetriebene Unternehmenskultur steht im Fokus
- **ABER:** Amazon setzt bei Mitarbeitereinstellung auf Bauchgefühl und Intuition
- Datenspezialisten berücksichtigen Emotionen bei datengetriebenen Entscheidungsprozessen

### 6.3 Paradigmenwechsel

| Traditionelles Data Mining (BI) | Big Data Ansatz |
|---------------------------------|-----------------|
| Segmentiert Kunden in **Gruppen** | Realtime-Analyse auf **individueller Basis** |
| Sucht Parameter für Kundengruppen-Klassifikation | Rückschlüsse auf Gruppenverhalten aus Individuum |
| Kunde existiert nicht als Individuum | Fokus auf individuellen Kunden als **Person** |
| Produktorientietes Cross-/Up-Selling | **Kundenorientiertes** Cross-/Up-Selling |

### 6.4 Die 7+ Vs von Big Data

| V | Bedeutung |
|---|-----------|
| **Volume** | Große Datenmengen |
| **Velocity** | Hohe Geschwindigkeit der Datenerzeugung |
| **Variety** | Verschiedene Datentypen (strukturiert, unstrukturiert) |
| **Veracity** | Wahrhaftigkeit/Qualität der Daten |
| **Validity** | Gültigkeit der Daten |
| **Volatility** | Flüchtigkeit/Veränderlichkeit |
| **Value** | Wert/Nutzen der Daten |

### 6.5 Strukturiertheit von Daten

| Typ | Beschreibung |
|-----|--------------|
| **Strukturiert** | Klare Struktur (Datenbanktabellen) |
| **Semistrukturiert** | Teilweise Struktur (XML, JSON) |
| **Quasistrukturiert** | Gewisse Regelmäßigkeiten |
| **Unstrukturiert** | Keine Struktur (Text, Bilder, Videos) |

**Hadoop** = Open-Source-Schnittstelle zu **Map Reduce** für unstrukturierte Daten

### 6.6 Analytics Evolution

| Analytics-Typ | Zeitbezug | Fragestellung |
|---------------|-----------|---------------|
| **Descriptive** | Vergangenheit | Was ist passiert? Warum? |
| **Predictive** | Zukunft | Was wird passieren? |
| **Prescriptive** | Zukunft | Was sollen wir tun? |

#### Descriptive Analytics
- Vergangenheitsbezogen
- Data Mining auf historische Daten
- Faktoren für Erfolg/Misserfolg
- Meiste Management-Reports

#### Predictive Analytics
- Zukunftsorientiert
- Historische Daten + Regeln + Algorithmen + externe Daten
- Statistische Methoden, Machine Learning
- Vorhersagen für Marktentwicklungen

#### Prescriptive Analytics
- Beschreibt wann UND warum ein Ereignis auftritt
- Schlägt Entscheidungsoptionen vor
- Hybride Daten (strukturiert + unstrukturiert)
- Echtzeit-Analyse, kontinuierliche Aktualisierung

#### Sentiment Analysis
- Analyse von Emotionen, Meinungen, Haltungen
- Über soziale Medien online kommuniziert
- Gegenüber Organisationen, Produkten, Personen, Themen

### 6.7 Analytics Lifecycle - Prozessmodelle

- **CRISP-DM** - Cross Industry Standard Process for Data Mining
- **Big Data Discovery** (Bill Franks)
- **SAS SEMMA** - Sample, Explore, Modify, Model, Assess

### 6.8 Text Mining

> **Text Mining** = Prozess, unstrukturierten Text für analytische Methoden aufzubereiten

**Prozesse:**
- Search and Information Retrieval
- Document Clustering
- Document Classification
- Web Mining
- Information Extraction
- Natural Language Processing
- Concept Extraction

#### Vektorraummodell
- Vektor repräsentiert einen Term (Konzept, Keyword)
- Gewichtungswert = Wichtigkeit des Terms für Dokumentsemantik
- **tf-idf-Gewichtung:**
  - **tf** (Term Frequency) = Häufigkeit eines Terms pro Dokument
  - **idf** (Inversed Document Frequency) = Auftreten in allen Dokumenten

#### Levenshtein-Distanz
> Minimale Anzahl von Einfüge-, Lösch- und Ersetzungsoperationen, um eine Zeichenkette in eine andere umzuwandeln

Beispiel: "Sensor" → "Senator" = **2 Schritte** (A einfügen, S→T ändern)

### 6.9 Sentiment Analysis

> **Sentiment Analysis** = Prozess der Bewertung polarisierter Meinungen in Texten

**Bewertungskriterien:** Positiv, Negativ, Neutral

**Vorgehen:**
1. Numerische Transformation
2. Vergleich mit Wortsammlung (positiv/negativ)
3. Berechnung Punktewert
4. Tools: z.B. IBM Tone Analyzer

---

## Data Warehouse vs. Data Lake

| Aspekt | Data Warehouse | Data Lake |
|--------|----------------|-----------|
| **Daten** | Strukturiert, aufbereitet | Roh, alle Formate |
| **Schema** | Schema-on-Write | Schema-on-Read |
| **Zweck** | OLAP, Reporting | Big Data Analytics |
| **Speicherung** | Transformierte Daten | Originaldaten |

---

## Klausurrelevante Definitionen

| Begriff | Definition |
|---------|------------|
| **Business Intelligence** | Oberbegriff für Anwendungen zur Datenanalyse für strategische Entscheidungen |
| **MSS** | Management Support Systeme - IT-Systeme zur Managementunterstützung |
| **OLTP** | Online Transaction Processing - operative Transaktionsverarbeitung |
| **OLAP** | Online Analytical Processing - analytische Datenverarbeitung |
| **ETL** | Extract, Transform, Load - Datenaufbereitungsprozess |
| **Data Mining** | Untersuchung von Beziehungsmustern in Daten |
| **Data Warehouse** | Zentrale Datenhaltung für BI (strukturiert) |
| **Data Lake** | Speicherung von Rohdaten in Originalformaten |
| **Descriptive Analytics** | Vergangenheitsbezogene Analyse (Was ist passiert?) |
| **Predictive Analytics** | Zukunftsorientierte Vorhersagen (Was wird passieren?) |
| **Prescriptive Analytics** | Handlungsempfehlungen (Was sollen wir tun?) |
| **Sentiment Analysis** | Bewertung von Meinungen/Emotionen in Texten |
| **Text Mining** | Aufbereitung unstrukturierter Texte für Analyse |
| **Levenshtein-Distanz** | Minimale Operationen zur Umwandlung von Zeichenketten |
