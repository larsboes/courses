# IPDG Content Restructure Plan

## Problem
- 6 topics with flat sections, duplicated content, no progressive disclosure
- DWH vs Data Lake covered redundantly in BI + separate section
- O2C taught twice (EA generic + SAP specific) without connection
- No Mermaid connectionDiagrams, no inline MermaidDiagram components
- K8s content is the gold standard: progressive sections, Mermaid, narrative flow

## Solution: 6 → 8 Topics

### New Topic Map

```
Geschäftsprozesse ──→ ERP-Systeme ──→ SAP Plattform ──→ SAP SD
       │                    │
       │              Projekt & CM
       │
       ├──→ CRM (refs BI for analytics)
       │
       └──→ Business Intelligence ──→ Big Data
```

### Topic Details

#### 1. Geschäftsprozesse & Architektur (geschaeftsprozesse.tsx)
- **Source:** enterprise-architecture.tsx (all)
- **Flow:** What is a process → 5 Levels → Prozesshaus → E2E processes → Roles → Capability vs Prozess
- **Diagrams:** OrderToCashDiagram (keep), ProcessFlowBuilder (keep), MermaidDiagram for hierarchy
- **connectionDiagram:** Links to ERP, CRM, BI

#### 2. ERP-Systeme (erp-systeme.tsx)
- **Source:** erp-grundlagen.tsx (keep: definition, goals, Stammdaten, Config/Custom, Template, TCO, Integration)
- **REMOVE → Topic 3:** OCM, CMMI, ITIL, Lokalisierung, "Warum scheitern"
- **Diagrams:** ErpModuleMap (keep), MermaidDiagram for integration strategies
- **connectionDiagram:** Links to Geschäftsprozesse, SAP, Projekt-CM

#### 3. Projekt & Change Management (projekt-change-management.tsx) - NEW
- **Source:** erp-grundlagen.tsx fragments (OCM, CMMI, ITIL, Lokalisierung, "Warum scheitern")
- **Flow:** Why projects fail → OCM → CMMI maturity → ITIL → Lokalisierung
- **Diagrams:** MermaidDiagram for CMMI progression, failure factors
- **connectionDiagram:** Links to ERP, SAP

#### 4. SAP S/4HANA Plattform (sap-plattform.tsx)
- **Source:** sap-s4hana.tsx (platform parts only)
- **Flow:** Overview → Evolution → HANA → Fiori → On-Prem/Cloud → Org units → Data types → Migration
- **REMOVE → Topic 5:** All SD sections
- **Diagrams:** MermaidDiagram for evolution, org hierarchy
- **connectionDiagram:** Links to ERP, SAP SD

#### 5. SAP SD - Vertriebsprozess (sap-sd-vertrieb.tsx) - NEW
- **Source:** sap-s4hana.tsx (SD parts)
- **Flow:** SD Org → Stammdaten → O2C overview → Detail steps → Belegfluss
- **Bridge:** Explicit reference to Geschäftsprozesse E2E → this is how it works in SAP
- **Diagrams:** MermaidDiagram for O2C SAP flow, Belegfluss chain
- **connectionDiagram:** Links to Geschäftsprozesse, SAP Plattform

#### 6. CRM (crm.tsx) - REWRITE
- **Source:** crm.tsx
- **Flow:** Customer Journey → 4 Types → CLV → KPIs → Maßnahmen → Failure
- **Clean:** Analytical CRM → cross-ref to BI topic, don't repeat DW/OLAP
- **Diagrams:** CrmTypesDiagram (keep), MermaidDiagram for Customer Journey
- **connectionDiagram:** Links to BI, Geschäftsprozesse

#### 7. Business Intelligence (business-intelligence.tsx) - REWRITE
- **Source:** business-intelligence.tsx
- **Flow:** Why BI? → BI Process → OLTP/OLAP → DWH Architecture (ETL+Layers+Schema+DW-vs-DL as ONE progressive flow) → OLAP Cube → Data Mining
- **Key change:** Consolidate fragmented DWH content into single progressive section
- **Diagrams:** BiArchitectureDiagram (keep), DwhLayerDrillDown (keep), MermaidDiagram for BI stack
- **connectionDiagram:** Links to Big Data, CRM

#### 8. Big Data & Advanced Analytics (big-data.tsx) - REWRITE
- **Source:** big-data.tsx
- **Flow:** BI→Big Data shift → 7 Vs → Structuredness → Analytics evolution → Text Mining → CRISP-DM → Netflix → Trends
- **Key change:** Clear "builds on BI" opening, not standalone
- **Diagrams:** MermaidDiagram for analytics evolution, data spectrum
- **connectionDiagram:** Links to BI

### Style Guide (all topics)

1. **Progressive disclosure:** Sections build on each other (overview → concept → detail → practice)
2. **connectionDiagram:** Mermaid string on Topic object showing neighbor relationships
3. **MermaidDiagram:** Use `import { MermaidDiagram } from '@/core/components/diagrams'` within sections for process flows, hierarchies
4. **Narrative flow:** Start each section with WHY, then WHAT, then detail
5. **Color-coded cards:** Green/orange for comparisons, blue/purple for categories
6. **Exam callouts:** Red/amber boxes for exam-critical distinctions
7. **Cross-references:** "Mehr dazu im Thema XY" instead of repeating content

### New Topic IDs
- geschaeftsprozesse (was: enterprise-architecture)
- erp-systeme (was: erp-grundlagen)
- projekt-change-management (NEW)
- sap-plattform (was: sap-s4hana)
- sap-sd-vertrieb (NEW)
- crm (unchanged)
- business-intelligence (unchanged)
- big-data (unchanged)

### Registration Updates
After all topics created:
1. Update /content/ipdg/index.ts with new imports
2. Delete old files: enterprise-architecture.tsx, erp-grundlagen.tsx, sap-s4hana.tsx
3. Build verify
