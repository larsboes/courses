# Wirtschaftsrecht Module — Integration Plan

## Source Material

| File | Content | Key Topics |
|------|---------|------------|
| `Präsentation.md` (3773 lines) | Full course slides (Prof. Pelke) | BGB AT, Schuldrecht AT/BT, Handels-/Gesellschaftsrecht |
| `Fall_I_WE_KV.md` | Fall 2 — Willenserklärung (Versteigerung) | Fehlender Erklärungswille |
| `Fall_I (2)_Invit._KV.md` | Fall 4 — Invitatio ad offerendum | Schaufenster ≠ Angebot |
| `Fall 12.md` | Fall 12 — Fristversäumnis | Verspätete Annahme → neues Angebot (§ 150) |
| `Fall 17.md` | Fall 17 — Stellvertretung (Grundfall) | §§ 164 ff., Vollmacht |
| `Fall 27.md` | Fall 27 — Duldungsvollmacht | Rechtsscheinvollmacht |
| `Fall 39.md` | Fall 39 — Erklärungsirrtum | § 119 I, Anfechtung |
| `Fall 40.md` | Fall 40 — Inhaltsirrtum | § 119 I, Verlautbarungsirrtum |
| `Fall 55.md` | Fall 55 — Verjährung | §§ 194 ff., 195, 199, 214 |
| `Fälle_III_Unm..md` | Fall 1 + 10 — Unmöglichkeit | § 275 I (Leistung), § 326 I 1 (Gegenleistung) |
| `Fälle_II_Anf._Verj..md` | Fall 39+40+55 (duplicate, with Fazit) | Anfechtung deep-dive + Verjährung |

---

## Module Structure

```
src/frontend/content/wirtschaftsrecht/
├── index.ts                    # Course definition
├── topics/
│   ├── grundlagen.tsx          # Topic 1: Grundlagen des Rechts
│   ├── willenserklaerung.tsx   # Topic 2: Willenserklärung & Vertragsschluss
│   ├── anfechtung.tsx          # Topic 3: Anfechtung & Verjährung
│   ├── stellvertretung.tsx     # Topic 4: Stellvertretung
│   ├── leistungsstoerungen.tsx # Topic 5: Schuldrecht & Leistungsstörungen
│   ├── kaufvertrag.tsx         # Topic 6: Kaufvertrag & Werkvertrag (Besonderes Schuldrecht)
│   ├── gesetzliche-sv.tsx      # Topic 7: Gesetzliche Schuldverhältnisse (GoA, Bereicherung, Delikt)
│   └── gesellschaftsrecht.tsx  # Topic 8: Handels- und Gesellschaftsrecht
└── diagrams/
    ├── index.ts
    ├── AnspruchspruefungFlow.tsx    # Interactive: Anspruch entstanden → untergegangen → durchsetzbar
    ├── WillenserklaerungBuilder.tsx # Interactive: Build a WE from components (äußerer/innerer Tatbestand)
    ├── AnfechtungDecisionTree.tsx   # Interactive: Walk through Anfechtungsprüfung
    ├── GutachtenstilTemplate.tsx    # Interactive: Drag-and-drop Gutachtenstil sentence builder
    ├── VertragspruefungStepper.tsx  # Interactive: Step through Kaufvertrag check
    ├── StellvertretungFlow.tsx      # Interactive: §164 ff. decision flow
    ├── LeistungsstoerungMap.tsx     # Interactive: Which Pflichtverletzung → which §§?
    ├── GesellschaftsformenMatrix.tsx # Interactive: Compare GbR/oHG/KG/GmbH/AG
    └── FallLoesungTrainer.tsx       # Reusable: Case solver component (Sachverhalt → guided Lösungsskizze)
```

---

## Topics Detail

### Topic 1: Grundlagen des Rechts ⚖️
**Priority: Phase 1** (foundation for everything else)

**Sections:**
1. Rechtsquellen (Legislative, Exekutive, Judikative)
2. Öffentliches Recht vs. Privatrecht
3. Privatautonomie & Vertragsfreiheit (Abschluss-/Inhalts-/Formfreiheit)
4. Trennungs- und Abstraktionsprinzip
5. Subsumtion & Anspruchsprüfung (entstanden → übergegangen → untergegangen → durchsetzbar)

**Diagram:** `AnspruchspruefungFlow` — Interactive stepper through the 4-stage claim analysis

**Quiz:** 8-10 questions
- MC: "Was regelt das Trennungsprinzip?"
- Match-pairs: Rechtsgebiete ↔ Beispiele
- Order-steps: Prüfungsreihenfolge sortieren
- Free-text: "Erklären Sie den Unterschied zwischen Verpflichtungs- und Verfügungsgeschäft"

---

### Topic 2: Willenserklärung & Vertragsschluss 🤝
**Priority: Phase 1** (core exam topic, 3 Fälle available)

**Sections:**
1. Tatbestand der Willenserklärung (äußerer: Handlung → innerer: Handlungswille, Erklärungswille, Geschäftswille)
2. Abgabe & Zugang (Herrschaftsbereich, "unter normalen Umständen")
3. Angebot & Annahme (§§ 145 ff.)
4. Invitatio ad offerendum
5. Schweigen als Willenserklärung
6. Fristen & verspätete Annahme (§§ 146, 148, 150)

**Diagrams:**
- `WillenserklaerungBuilder` — Assemble a valid WE from building blocks
- `VertragspruefungStepper` — Walk through: Angebot? → Zugang? → Frist? → Annahme? → Vertrag!

**Quiz:** 10-12 questions
- Free-text (Gutachtenstil): "Prüfen Sie, ob E ein wirksames Gebot abgegeben hat" (Fall 2 variant)
- MC: "Wann gilt ein Brief als zugegangen?"
- Identify-error: Spot the flaw in a Gutachten passage

**Exam Tasks (Falllösung):**
- **Fall 2** (Versteigerung) — 3-part guided analysis
- **Fall 4** (Boutique/Invitatio) — 3-part guided analysis
- **Fall 12** (Wärmeflasche/Fristen) — 4-part analysis (most complex)

---

### Topic 3: Anfechtung & Verjährung 🔄
**Priority: Phase 1** (Dauerbrenner in Klausur)

**Sections:**
1. Anfechtung als Gestaltungsrecht (§ 142)
2. Prüfungsaufbau der Anfechtung (Anfechtungsgrund → Erklärung → Frist → Kein Ausschluss)
3. Anfechtungsgründe: Erklärungsirrtum vs. Inhaltsirrtum (§ 119 I), Eigenschaftsirrtum (§ 119 II), arglistige Täuschung/Drohung (§ 123)
4. Fristen (§ 121 unverzüglich vs. § 124 ein Jahr)
5. Verjährung (§§ 194 ff.) — Regelverjährung 3 Jahre, Beginn § 199

**Diagram:** `AnfechtungDecisionTree` — Interactive decision tree: Which §? → Frist? → Rechtsfolge?

**Quiz:** 10 questions
- MC: "Unterschied Erklärungsirrtum vs. Inhaltsirrtum?"
- Free-text: "Formulieren Sie den Prüfungseinstieg einer Anfechtung im Gutachtenstil"
- Fill-blank: "Die Anfechtungsfrist bei § 119 beträgt ___ (§ ___)"

**Exam Tasks:**
- **Fall 39** (Buddha-Statue, Verschreiber) — Erklärungsirrtum
- **Fall 40** (Schock Senftuben) — Inhaltsirrtum/Verlautbarungsirrtum
- **Fall 55** (Künstler & Galerist) — Verjährung

---

### Topic 4: Stellvertretung 🎭
**Priority: Phase 2**

**Sections:**
1. Voraussetzungen wirksamer Stellvertretung (§ 164 I)
2. Abgrenzung: Stellvertreter vs. Bote
3. Vollmachtsarten (Vollmacht, Prokura §§ 48 ff. HGB)
4. Duldungs- und Anscheinsvollmacht
5. Vertreter ohne Vertretungsmacht (§ 177)

**Diagram:** `StellvertretungFlow` — Decision flow: Eigene WE? → Im fremden Namen? → Vertretungsmacht?

**Quiz:** 8 questions
**Exam Tasks:**
- **Fall 17** (Strandkorb, Freund kauft) — Grundfall Stellvertretung
- **Fall 27** (Tochter kauft für Großvater) — Duldungsvollmacht

---

### Topic 5: Schuldrecht & Leistungsstörungen ⚡
**Priority: Phase 2**

**Sections:**
1. Schuldverhältnis (§ 241) — Relativ, Gläubiger/Schuldner
2. AGB-Kontrolle (§§ 305 ff.) — Einbeziehung, Inhaltskontrolle, Klauselverbote
3. Pflichtverletzung: Unmöglichkeit (§ 275), Verzug (§ 286), Schlechtleistung (§ 281), Nebenpflichtverletzung
4. Schadensersatz (§§ 280 ff.) — neben der Leistung vs. statt der Leistung
5. Rücktritt (§§ 323 ff.) — Fristsetzung, Erklärung
6. Gegenleistung bei Unmöglichkeit (§ 326 I 1)

**Diagram:** `LeistungsstoerungMap` — Interactive: "Was ist passiert?" → richtige §§ → Rechtsfolge

**Quiz:** 12 questions
**Exam Tasks:**
- **Fall 1** (Porsche zerstört — Leistungsanspruch) — § 275 I, Stückschuld
- **Fall 10** (Porsche zerstört — Gegenleistungsanspruch) — § 326 I 1

---

### Topic 6: Besonderes Schuldrecht (Kauf- & Werkvertrag) 🛒
**Priority: Phase 3**

**Sections:**
1. Kaufvertrag (§§ 433 ff.) — Pflichten Käufer/Verkäufer
2. Sachmangel (§ 434) — subjektiver/objektiver Fehlerbegriff
3. Mängelrechte (Nacherfüllung, Rücktritt, Minderung, SE)
4. Rügepflicht (§ 377 HGB)
5. Werkvertrag (§§ 631 ff.) — Abgrenzung zum Kaufvertrag

**Diagram:** `VertragspruefungStepper` (reused with Kaufvertrag-specific path)

**Quiz:** 10 questions (no dedicated Fälle yet — create synthetic cases from slides)

---

### Topic 7: Gesetzliche Schuldverhältnisse 📋
**Priority: Phase 3**

**Sections:**
1. Geschäftsführung ohne Auftrag (GoA) — echte/unechte, berechtigte/unberechtigte
2. Bereicherungsrecht (§§ 812 ff.) — Leistungskondiktion, Eingriffskondiktion
3. Deliktsrecht (§§ 823 ff.)

**Quiz:** 8 questions (theory-focused, from slides)

---

### Topic 8: Handels- und Gesellschaftsrecht 🏢
**Priority: Phase 3**

**Sections:**
1. HGB-Grundlagen, Kaufmannsbegriff
2. Personengesellschaften (GbR, oHG, KG)
3. Kapitalgesellschaften (GmbH, AG)
4. Sonderformen (KGaA, SE, UG, Ltd.)

**Diagram:** `GesellschaftsformenMatrix` — Interactive comparison table with filter/sort

**Quiz:** 10 questions
- Match-pairs: Gesellschaftsform ↔ Eigenschaft
- MC: "Wer haftet persönlich bei einer KG?"
- Multi-select: "Welche sind juristische Personen?"

---

## Special Components

### `FallLoesungTrainer` (Reusable)
The crown jewel. A case-study training component that:
1. Shows **Sachverhalt** (case facts)
2. Shows **Frage** (legal question)
3. Guides through **Lösungsskizze** step by step (collapsible steps)
4. Each step has a free-text field where user writes their Gutachtenstil answer
5. After submission, shows **Formulierungsvorschlag** (model answer) for comparison
6. AI evaluation via Gemini (keyPoints matching)

This maps perfectly to the existing `ExamTask` + `FreeTextQuestion` types.

### `GutachtenstilTemplate`
Interactive tool that teaches the Gutachten style:
- **Obersatz** (hypothesis) → **Definition** → **Subsumtion** → **Ergebnis**
- Drag sentence fragments into correct order
- Highlight which part is which in real case solutions

---

## Implementation Phases

### Phase 1 (MVP) — Topics 1-3
**Estimated: ~4000 lines across 3 topics + 4 diagrams**

Core BGB AT content with all 8 available Fälle converted to exam tasks.
This covers the highest-frequency exam material.

Files:
- `topics/grundlagen.tsx`
- `topics/willenserklaerung.tsx`
- `topics/anfechtung.tsx`
- `diagrams/AnspruchspruefungFlow.tsx`
- `diagrams/WillenserklaerungBuilder.tsx`
- `diagrams/AnfechtungDecisionTree.tsx`
- `diagrams/GutachtenstilTemplate.tsx`
- `index.ts` (course registration)
- Update `content/index.ts`

### Phase 2 — Topics 4-5
Stellvertretung + Leistungsstörungen. Adds 4 more Fälle.

Files:
- `topics/stellvertretung.tsx`
- `topics/leistungsstoerungen.tsx`
- `diagrams/StellvertretungFlow.tsx`
- `diagrams/LeistungsstoerungMap.tsx`

### Phase 3 — Topics 6-8
Besonderes Schuldrecht + Gesellschaftsrecht. Theory-heavy, fewer Fälle.

Files:
- `topics/kaufvertrag.tsx`
- `topics/gesetzliche-sv.tsx`
- `topics/gesellschaftsrecht.tsx`
- `diagrams/GesellschaftsformenMatrix.tsx`

---

## Question Types Per Topic

| Topic | MC | Multi | Order | Match | Fill | Free-text | Case (ExamTask) |
|-------|----|-------|-------|-------|------|-----------|-----------------|
| 1 Grundlagen | 3 | 1 | 2 | 2 | - | 2 | - |
| 2 WE & Vertrag | 3 | 1 | 1 | - | 2 | 2 | 3 (Fall 2,4,12) |
| 3 Anfechtung | 3 | 1 | 1 | - | 2 | 1 | 3 (Fall 39,40,55) |
| 4 Stellvertretung | 2 | 1 | - | 1 | 1 | 1 | 2 (Fall 17,27) |
| 5 Leistungsstörung | 3 | 2 | 1 | 1 | 2 | 1 | 2 (Fall 1,10) |
| 6 Kaufvertrag | 3 | 1 | 1 | 1 | 2 | 1 | - |
| 7 Gesetzl. SV | 2 | 1 | - | 2 | 1 | 1 | - |
| 8 Gesellschaftsr. | 2 | 2 | - | 3 | 1 | 1 | - |
| **Total** | **21** | **10** | **6** | **10** | **11** | **10** | **10** |

~78 questions + 10 multi-part exam tasks across all phases.

---

## Key Design Decisions

1. **German content**: All content stays in German (course language). UI chrome in German too.
2. **Case-first pedagogy**: Each topic opens with a short Sachverhalt to hook interest, then teaches the theory needed to solve it.
3. **Gutachtenstil emphasis**: Every free-text answer expects proper Gutachten structure. Model answers from Prof. Pelke's Formulierungsvorschläge.
4. **§-References**: BGB paragraphs rendered as styled badges/chips. Future: link to dejure.org.
5. **Exam-relevance markers**: Pelke's exam tips ("Klausur-Falle", "Dauerbrenner") prominently displayed.
6. **Progressive difficulty**: Grundlagen → WE → Anfechtung follows the course progression.

---

## Next Steps

1. `task up` — verify exam-trainer still builds/runs
2. Scaffold Phase 1 file structure
3. Implement `grundlagen.tsx` (smallest topic, establishes patterns)
4. Build `AnspruchspruefungFlow.tsx` diagram
5. Implement `willenserklaerung.tsx` with Fall 2, 4, 12
6. Implement `anfechtung.tsx` with Fall 39, 40, 55
7. Register course in `content/index.ts`
8. Test in browser
