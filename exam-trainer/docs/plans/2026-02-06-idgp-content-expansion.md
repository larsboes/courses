# IDGP Exam Trainer Content Expansion

## Goal

Expand quiz questions and content sections across all 6 IDGP topics to fully cover the Probeklausur and similar exam-style questions. Convert from Wahr/Falsch-only format to proper 4-option multiple-choice. Add missing content areas identified in gap analysis.

## Constraints

- Exam format: multiple-choice with up to 4 options
- "Lean IT kommt nicht dran" (skip Lean IT)
- "Fiori kommt dran" (expand Fiori coverage)
- All 25 Probeklausur questions must be answerable from trainer content
- Questions should test understanding, not just memorization
- Follow existing code patterns in topic files (TSX with sections + quiz)
- No new diagrams needed - focus on content sections and quiz questions

## Tasks

### Task 1: ERP-Grundlagen - Add IT-Integrationsstrategien + CMMI + Convert to 4-option MC

**File:** `src/frontend/content/ipdg/topics/erp-grundlagen.tsx`

**Add sections:**
1. **IT-Integrationsstrategien** section with 4 strategies:
   - Koexistenz/Symbiose (systems coexist)
   - Absorption/Übernahme (one absorbs other)
   - Best of Breed/Standardisierung (best from both)
   - Transformation (completely new system)

2. **Organisational Readiness & CMMI** section:
   - Definition of Organisational Readiness
   - CMMI 5 Reifegrade (Initial → Optimizing)
   - Minimum Level 2 needed for ERP rollout
   - Note: ERP = organizational challenge, not technical
   - ITIL definition (De-facto-Standard for IT service management)

3. **Bewegungsdaten** clarification in Stammdaten section

**Convert/add quiz questions to 4-option MC format:**
- Keep existing 10 Wahr/Falsch questions
- Add 8+ new 4-option MC questions covering:
  - IT-Integrationsstrategien (which strategy fits which scenario?)
  - CMMI Reifegrade (which level = which characteristics?)
  - Organisational Readiness
  - ITIL definition
  - 3 Ziele der ERP-Einführung (what are they? what are they NOT?)
  - Stammdaten vs. Bewegungsdaten
  - Datenqualitätsdimensionen
  - ERP-Template Lokalisierung percentage (10-20%)

### Task 2: Enterprise Architecture - Add 4-option MC questions

**File:** `src/frontend/content/ipdg/topics/enterprise-architecture.tsx`

**Add quiz questions (4-option MC):**
- Which process type is Order-to-Cash? (Kern/Management/Support)
- Which role is responsible for L3 process standards?
- What are the 3 layers of the Prozesshaus?
- Purchase-to-Pay belongs to which category?
- Hire-to-Retire is a ___ process
- Capability vs. Prozess distinction
- Process levels (L1-L5) identification
- E2E Value Chain Owner responsibilities

Target: 5+ additional 4-option MC questions beyond existing 5 Wahr/Falsch.

### Task 3: CRM - Add Cross/Up-Selling + Churn + 4-option MC

**File:** `src/frontend/content/ipdg/topics/crm.tsx`

**Add section:**
1. **CRM Glossar & Kennzahlen** with Cross-Selling, Up-Selling, Churn Rate definitions

**Add quiz questions (4-option MC):**
- Which CRM type uses BI methods? (4 options with CRM types)
- Customer Journey phase ordering
- CLV calculation scenario
- Cross-Selling vs. Up-Selling example
- CRM failure reasons (which is NOT a reason?)
- Share of Wallet definition
- Which CRM type = Multi-Channel?
- Customer Centricity definition

Target: 6+ additional 4-option MC questions beyond existing 9 Wahr/Falsch.

### Task 4: Business Intelligence - Add 4-option MC questions

**File:** `src/frontend/content/ipdg/topics/business-intelligence.tsx`

**Add quiz questions (4-option MC):**
- ETL steps in correct order
- What belongs in Faktentabelle vs. Dimensionstabelle?
- OLTP characteristic identification
- OLAP characteristic identification
- Data Warehouse vs. Data Lake distinction
- MSS subtypes (MIS, DSS, EIS)
- Sternschema purpose/optimization target
- ETL Transform step activities

Target: 6+ additional 4-option MC questions beyond existing 11 Wahr/Falsch.

### Task 5: Big Data - Remove Lean IT question + Add 4-option MC

**File:** `src/frontend/content/ipdg/topics/big-data.tsx`

**Changes:**
- Remove `bd-lean-it` question (Lean IT kommt nicht dran)
- Keep ITIL question but note it's in ERP/Org Readiness context

**Add sections:**
1. Small note about Hadoop/MapReduce framework

**Add quiz questions (4-option MC):**
- Which V describes data quality? (Veracity)
- Descriptive vs. Predictive vs. Prescriptive - match question to type
- Traditional Data Mining vs. Big Data approach
- Levenshtein distance calculation example
- Sentiment Analysis application
- Text Mining vs. Sentiment Analysis distinction
- 7 Vs identification (which is NOT a V?)
- Structured vs. unstructured data examples

Target: 6+ additional 4-option MC questions beyond existing ~8 Wahr/Falsch.

### Task 6: SAP S/4HANA - Expand Fiori + Add SAP SD content + 4-option MC

**File:** `src/frontend/content/ipdg/topics/sap-s4hana.tsx`

**Add/expand sections:**
1. **Fiori expanded** - 3 App-Typen with more detail (Transaktions-Apps, Analytische Apps, Factsheet-Apps), hardwareunabhängig, Echtzeit
2. **SAP SD (Sales & Distribution) Grundlagen:**
   - SD Organisationsstruktur (Verkaufsorganisation, Vertriebsweg, Sparte → Vertriebsbereich)
   - Kundenstammsatz (3-Ebenen: Mandant, Buchungskreis, Vertriebsbereich)
   - Materialstammsatz (Sichten/Views)
   - Konditionsstammsatz (Preisfindung)
   - Order-to-Cash Prozessschritte in SAP SD: Anfrage → Angebot → Kundenauftrag → Lieferung → Warenausgang → Fakturierung → Zahlungseingang
   - Verfügbarkeitsprüfung, Kreditlimitprüfung
3. **Vorverkaufsaktivitäten** - Anfrage und Angebot

**Add quiz questions (4-option MC):**
- Organisationseinheiten hierarchy ordering
- Buchungskreis definition
- Fiori App-Typen matching
- SAP HANA characteristics
- On-Premise vs. Cloud differences
- SD Vertriebsbereich composition (Verkaufsorg + Vertriebsweg + Sparte)
- Order-to-Cash steps in SAP SD ordering
- Kundenstammsatz 3-Ebenen
- Materialstammsatz Sichten
- Stammdaten vs. Bewegungsdaten vs. Organisationsdaten in SAP

Target: 10+ additional 4-option MC questions beyond existing 4 Wahr/Falsch.

## Acceptance Criteria

- [ ] All 25 Probeklausur questions can be answered from trainer content
- [ ] Each topic has at least 8 4-option MC questions in addition to Wahr/Falsch
- [ ] IT-Integrationsstrategien fully covered with section + questions
- [ ] CMMI Reifegrade covered with section + questions
- [ ] SAP SD basics covered with sections + questions
- [ ] Fiori expanded with more detail
- [ ] Lean IT question removed from Big Data
- [ ] Build passes: `docker compose exec app bun run build`
- [ ] Total new questions: ~45+ across all topics
