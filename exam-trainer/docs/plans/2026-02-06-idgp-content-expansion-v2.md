# IPDG Content Expansion v2 - Deep Understanding & Exam Coverage

## Context

The first content pass (v1) added core sections, diagrams, and ~74 quiz questions across 6 topics. This v2 pass fills remaining gaps from source materials, adds exam tasks where missing, and expands the glossary - focusing on content that aids **understanding through structure and visualization**.

## Source Material Gaps Analysis

After comparing all source files against current content:

### What's well-covered already
- Core definitions and concepts for all 6 topics
- Configuration vs Customization, CMMI, IT-Integration strategies
- 4 CRM types, Customer Journey, CLV
- OLTP vs OLAP, ETL, DWH vs Data Lake, Sternschema
- 7 Vs, Analytics Evolution, Text Mining, Levenshtein
- SAP org hierarchy, Fiori 3 app types, SD basics, Order-to-Cash overview

### What's still missing (from source materials)

| Topic | Missing Content | Source |
|-------|----------------|--------|
| **ERP** | Why ERP projects fail (Lidl) + golden rule, Org Change Mgmt goals, ITIL 5 publications | Kapitel-1-2-ERP.md |
| **CRM** | CRM-KPIs (CAC, Churn, ARPU, NPS), CRM Maßnahmen detail, Zeitliche Entwicklung, Auswirkungen gescheiterter Projekte | Kapitel-3-4-EA-CRM.md |
| **BI** | BI-Prozess 3 steps (Auswahl→Aufbereitung→Analyse), OLAP Cube detail | Kapitel-5-6-BI-BigData.md |
| **Big Data** | 4 globale Trends, Analytics Lifecycle (CRISP-DM/SEMMA), tf-idf/Vektorraummodell, Sentiment Analysis Vorgehen, Netflix Case Study | Kapitel-5-6-BI-BigData.md, Netflix-BigData-CaseStudy.md |
| **SAP** | Kundenauftrag detail (Kopf/Position/Einteilung), Terminierung, Verfügbarkeitsprüfung (3 methods), Versand details (5 steps), Fakturierungsmethoden (3 types), Belegfluss, 3 Migrationspfade, HANA compression example | SAP-SD-Vertrieb.md, SAP-Einfuehrung.md |
| **Exam Tasks** | Big Data has NO exam tasks, SAP has NO exam tasks | All sources |
| **Glossary** | SAP SD terms, CRM KPIs, Big Data terms (~15 new terms) | All sources |

---

## Tasks (6 parallel agents)

### Task 1: ERP - Add failure section + quiz (Agent: erp-agent)
**File:** `src/frontend/content/ipdg/topics/erp-grundlagen.tsx`

**Add sections:**
1. **Warum ERP-Projekte scheitern** section with:
   - 5 Gründe (Prozesskomplexität, Beratungsqualität, Transparenz, Projektplanung, Entscheidungsparalyse)
   - Goldene Regel: "1) Prozess → 2) System, NICHT umgekehrt"
   - Lidl-SAP Beispiel reference
2. **Organisational Change Management** section with:
   - Definition + 4 Ziele (Akzeptanz, Anpassungsgeschwindigkeit, Risikominimierung, Organisationsziele)
3. **ITIL Kernpublikationen** detail in org-readiness section:
   - Service Strategy, Service Design, Service Transition, Service Operation, Continual Service Improvement

**Add quiz questions (4-6 new MC):**
- Golden rule question (Prozess vor System)
- Org Change Management goal identification
- ITIL Kernpublikationen matching
- ERP project failure reasons (which is NOT a reason)
- Minimum CMMI for OCM

---

### Task 2: CRM - Add KPIs, Maßnahmen, failure impact + quiz (Agent: crm-agent)
**File:** `src/frontend/content/ipdg/topics/crm.tsx`

**Add sections:**
1. **CRM-KPIs** section with table:
   - Kundengewinnung: CAC, Lead→Customer Rate
   - Kundenbindung: Retention Rate, Churn Rate, Repeat Purchase
   - Wertbeitrag: CLV, ARPU
   - Engagement: NPS, Open/Click Rates
   - Service: First Response Time, FCR, CSAT
2. **CRM Maßnahmen** section:
   - E-Mail-Kampagnen, Up-/Cross-Selling, Loyalty-Programme, Serviceverbesserungen, Reaktivierungsmaßnahmen
3. **Auswirkungen gescheiterter CRM-Projekte** (add to scheitern section):
   - Finanzen, Kundenservice, Sales, Unternehmenskultur

**Add quiz questions (4-6 new MC):**
- CRM KPI matching (which KPI measures what?)
- NPS definition
- Which CRM Maßnahme is described? (scenario-based)
- Auswirkungen - which area is affected by what?
- Retention Rate vs Churn Rate

---

### Task 3: Big Data - Add trends, lifecycle, Netflix + exam tasks (Agent: bigdata-agent)
**File:** `src/frontend/content/ipdg/topics/big-data.tsx`

**Add sections:**
1. **4 Globale Trends für Big Data** section:
   - Moore's Law, Mobile Computing, Social Networking, Cloud Computing
2. **Analytics Lifecycle - Prozessmodelle** section:
   - CRISP-DM (Cross Industry Standard Process for Data Mining)
   - SEMMA (Sample, Explore, Modify, Model, Assess)
3. **Sentiment Analysis Vorgehen** detail (expand text-mining section):
   - Numerische Transformation → Vergleich mit Wortsammlung → Punktewert berechnen
4. **Netflix Case Study** section:
   - Datafication concept
   - Netflix Quantum Theory (76.897 Micro-Genres)
   - From 5-Sterne to Viewing Habits
   - Korrelation ≠ Kausalität
   - "Informed Intuition" (Kombination Daten + Erfahrung)

**Add exam tasks:**
1. Big Data Analytics task:
   - Part a: Die 7 Vs benennen und erklären
   - Part b: Descriptive vs Predictive vs Prescriptive unterscheiden
   - Part c: Netflix Case Study - wie nutzt Netflix Big Data?
2. Text Mining & Levenshtein task:
   - Part a: Text Mining Prozess erklären
   - Part b: Levenshtein-Distanz berechnen (Beispiel)

**Add quiz questions (4-6 new MC):**
- Which is NOT a global Big Data trend?
- CRISP-DM vs SEMMA matching
- Netflix-related scenario question
- Datafication definition
- Korrelation ≠ Kausalität scenario

---

### Task 4: SAP - Add SD detail, migration, compression + exam tasks (Agent: sap-agent)
**File:** `src/frontend/content/ipdg/topics/sap-s4hana.tsx`

**Add/expand sections:**
1. **Kundenauftrag im Detail** section:
   - Kopfbereich (Kundendaten, Gesamtkosten)
   - Position(en) (Material, Menge, Positionskosten)
   - Lieferplaneinteilung(en) (Liefermengen und -termine)
   - Ermittelte Infos: Termine, Versandstelle, Route, Verfügbarkeit, Preisfindung, Kreditlimit
2. **Terminierung** section:
   - Rückwärtsterminierung (vom Wunschlieferdatum zurückrechnen)
   - Vorwärtsterminierung (wenn Rückwärts nicht möglich)
   - Zeiten: Richtzeit, Transportdisposition, Ladezeit, Transitzeit
3. **Verfügbarkeitsprüfung** section:
   - 3 Liefermethoden: Einmallieferung, Komplettlieferung, Liefervorschlag (Teillieferungen)
4. **Versand & Transport** section:
   - 5 Schritte: Lieferschein → Kommissionierung → Verpackung → Laden → Warenausgang
5. **Fakturierungsmethoden** section:
   - Lieferbezogen (1:1), Sammelfakturierung (n:1), Teilfakturierung (1:n)
   - Automatische Buchungen (Soll→Debitorenkonto, Haben→Ertragskonto)
6. **Belegfluss** section:
   - Konzept: Status-Verfolgung eines Auftrags zu jedem Zeitpunkt
7. **Migrationspfade zu S/4HANA** section:
   - Greenfield (Neu-Implementierung)
   - Systemkonvertierung (Brownfield)
   - Transformation der Systemlandschaft (Selective)
8. **HANA Datenkompression** - add to hana-fiori section:
   - Traditionelle DB: 593 GB → HANA: 118,6 GB → S/4 HANA: 42,4 GB

**Add exam tasks:**
1. SAP SD Order-to-Cash task (30 points):
   - Part a: Die 7 Schritte des O2C-Prozesses nennen
   - Part b: Unterschied Anfrage vs. Angebot erklären
   - Part c: Vertriebsbereich-Zusammensetzung erklären
   - Part d: Die 3 Ebenen des Kundenstammsatzes
2. SAP S/4HANA Grundlagen task (20 points):
   - Part a: 3 Innovationen von S/4HANA nennen
   - Part b: On-Premise vs. Cloud vergleichen
   - Part c: 3 Migrationspfade beschreiben

**Add quiz questions (6-8 new MC):**
- Terminierung: Rückwärts vs Vorwärts
- Verfügbarkeitsprüfung: 3 Methoden matching
- Versand Schritte ordering
- Fakturierungsmethode: scenario-based
- Belegfluss definition
- Migrationspfad matching
- HANA compression comparison
- Kundenauftrag Struktur (Kopf/Position/Einteilung)

---

### Task 5: BI - Add BI-Prozess + extra quiz (Agent: bi-agent)
**File:** `src/frontend/content/ipdg/topics/business-intelligence.tsx`

**Add sections:**
1. **BI-Prozess (3 Schritte)** section (before OLTP/OLAP):
   - Auswahl (Datenquelle bestimmen)
   - Aufbereitung (Datenbestand für Analyse modifizieren)
   - Analyse (Beziehungsmuster destillieren, logische Abhängigkeiten)
2. **OLAP Cube Detail** (expand oltp-olap section):
   - Multidimensionaler Datenwürfel
   - Dimensionen: Produkte, Zeit, Regionen
   - Fakten: Umsatz, Gewinn
   - Operationen: Drill-Down, Roll-Up, Slice, Dice

**Add quiz questions (3-4 new MC):**
- BI-Prozess Schritte ordering
- OLAP Cube operation matching (Drill-Down vs Slice etc.)
- BI definition vs Informationsmanagement (scenario)
- Which is a Data Mining Anwendungsgebiet?

---

### Task 6: Glossary Expansion (Agent: glossary-agent)
**File:** `src/frontend/core/data/ipdg-glossary.ts`

**Add ~20 new terms:**

**ERP category:**
- Organisational Change Management
- Bewegungsdaten (with comparison to Stammdaten)
- ITIL (expand existing or add)

**CRM category:**
- CAC (Customer Acquisition Cost)
- NPS (Net Promoter Score)
- ARPU (Average Revenue Per User)
- Retention Rate
- Customer Journey (if not exists)

**BI & Big Data category:**
- Datafication
- CRISP-DM
- OLAP Cube
- Hadoop/MapReduce (if not exists)
- Vektorraummodell
- tf-idf

**SAP category:**
- Belegfluss
- Konditionsstammsatz
- Anfrage (SAP SD)
- Angebot (SAP SD)
- Vertriebsbereich
- Kreditkontrollbereich
- Greenfield Migration

**Add comparisons:**
- Anfrage vs Angebot
- Greenfield vs Brownfield vs Selective migration
- Descriptive vs Predictive vs Prescriptive Analytics

---

## Execution Strategy

All 6 tasks are **independent** and can run in parallel:
- Tasks 1-5 each modify a single topic file
- Task 6 modifies only the glossary file
- No cross-file dependencies

**After all tasks complete:**
- Run build: `docker compose exec app bun run build`
- Verify no TypeScript errors
- Spot-check content renders correctly

## Acceptance Criteria

- [ ] All source material content represented in exam trainer
- [ ] Big Data has exam tasks
- [ ] SAP has exam tasks
- [ ] BI-Prozess 3-step section added
- [ ] CRM KPIs section added
- [ ] ERP failure section with golden rule added
- [ ] SAP SD detailed process steps added (Terminierung, Verfügbarkeit, Versand, Fakturierung)
- [ ] Glossary expanded by ~20 terms
- [ ] Total new quiz questions: ~25-35
- [ ] Build passes: `docker compose exec app bun run build`
