// src/content/ipdg/topics/business-intelligence.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { BiArchitectureDiagram } from '../diagrams/BiArchitectureDiagram'
import { DwhLayerDrillDown } from '../diagrams/DwhLayerDrillDown'
import { OltpOlapGame } from '../diagrams/ConceptCategorizationGame'

// ─────────────────────────────────────────────────
// Mermaid Diagrams
// ─────────────────────────────────────────────────

const biProcessDiagram = `
flowchart LR
  A["1. Auswahl\n(Datenquelle bestimmen)"]
  B["2. Aufbereitung\n(Daten modifizieren)"]
  C["3. Analyse\n(Muster erkennen)"]

  A -->|Welche Daten?| B
  B -->|Bereinigt & transformiert| C

  style A fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style B fill:#3b1f63,stroke:#8b5cf6,color:#c4b5fd
  style C fill:#14532d,stroke:#22c55e,color:#86efac
`

const etlDwhDiagram = `
flowchart TB
  subgraph Sources["Datenquellen (OLTP)"]
    ERP["ERP"]
    CRM["CRM"]
    Excel["Excel / CSV"]
    Ext["Externe Daten"]
  end

  subgraph ETL["ETL-Prozess"]
    E["Extract"]
    T["Transform\n(Bereinigen, Harmonisieren,\nVerdichten, Anreichern)"]
    L["Load"]
    E --> T --> L
  end

  subgraph DWH["Data Warehouse Schichten"]
    direction TB
    Staging["Staging Area\n(Rohdaten temporär)"]
    Core["Core / ODS\n(Integriert & bereinigt)"]
    Mart["Data Marts\n(Fachbereichsspezifisch)"]
    Staging --> Core --> Mart
  end

  Sources --> ETL
  ETL --> DWH

  style Sources fill:#1e293b,stroke:#64748b,color:#f8fafc
  style ETL fill:#431407,stroke:#f59e0b,color:#fde68a
  style DWH fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
`

const sternSchemaDiagram = `
flowchart TB
  subgraph Schema["Sternschema (im Data Mart)"]
    Fakt["Faktentabelle\n(Umsatz, Kosten, Gewinn)"]
    DimProd["Dim: Produkt"]
    DimZeit["Dim: Zeit"]
    DimReg["Dim: Region"]
    DimProd --- Fakt
    DimZeit --- Fakt
    DimReg --- Fakt
  end

  subgraph Analyse["OLAP & Reporting"]
    Cube["OLAP Cube"]
    Report["Dashboards"]
  end

  Schema --> Analyse

  style Schema fill:#3b1f63,stroke:#8b5cf6,color:#c4b5fd
  style Analyse fill:#14532d,stroke:#22c55e,color:#86efac
`

const olapCubeDiagram = `
flowchart TB
  subgraph Cube["OLAP Cube"]
    direction TB
    D1["Dimension: Produkt\n(Laptop, Handy, Tablet)"]
    D2["Dimension: Zeit\n(2023, 2024, Q1, Q2)"]
    D3["Dimension: Region\n(Nord, Süd, Ost, West)"]
    F["Fakt: Umsatz"]
    D1 --- F
    D2 --- F
    D3 --- F
  end

  subgraph Ops["OLAP Operationen"]
    DD["Drill-Down\nJahr -> Quartal -> Monat"]
    RU["Roll-Up\nMonat -> Quartal -> Jahr"]
    SL["Slice\nEine Dimension fixieren"]
    DI["Dice\nMehrere Dimensionen einschränken"]
  end

  Cube --> Ops

  style DD fill:#14532d,stroke:#22c55e,color:#86efac
  style RU fill:#3b1f63,stroke:#8b5cf6,color:#c4b5fd
  style SL fill:#431407,stroke:#f59e0b,color:#fde68a
  style DI fill:#164e63,stroke:#06b6d4,color:#a5f3fc
`

// ─────────────────────────────────────────────────
// Topic Definition
// ─────────────────────────────────────────────────

export const businessIntelligenceTopic: Topic = {
  id: 'business-intelligence',
  title: 'Business Intelligence & Data Warehouse',
  description: 'BI-Prozess, OLTP vs OLAP, Datenarchitektur (ETL, DWH, Sternschema), OLAP Cube',
  icon: '📊',
  examNotes: 'OLTP vs OLAP genau unterscheiden! Sternschema: Fakten- vs Dimensionstabellen! Data Warehouse ≠ Data Lake!',

  sections: [
    // ── 1. Warum BI? (inkl. MSS) ────────────────────
    {
      id: 'warum-bi',
      title: 'Warum Business Intelligence?',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-300 italic mb-3">
              Stell dir vor: Der CEO muss entscheiden, ob das Unternehmen in einen neuen Markt
              expandiert. Er braucht Umsatzdaten der letzten 5 Jahre, Kundentrends und
              Wettbewerbsanalysen. Aber die operativen Systeme (ERP, CRM) speichern nur
              aktuelle Transaktionen - keine historischen Analysen.
            </p>
            <p className="text-slate-300">
              Genau hier setzt <strong className="text-blue-400">Business Intelligence</strong> an:
              Daten aus operativen Systemen zusammenführen, aufbereiten und analysierbar machen.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Business Intelligence (BI)</strong> ist ein Oberbegriff für Anwendungen,
              Infrastruktur, Werkzeuge und Best Practices für den Zugang zu und die Analyse
              von Daten und Information für die <em>(strategische) Entscheidungsfindung</em> und
              Performanceverbesserung zur Erzielung von Marktvorteilen.
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Nicht verwechseln:</strong> BI ≠ "Gesamtheit aller Führungsaufgaben"
            (das ist <em>Informationsmanagement</em>!)
          </div>

          {/* MSS as compact subsection */}
          <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800">
            <h4 className="font-medium text-indigo-300 mb-2">Management Support Systeme (MSS)</h4>
            <p className="text-sm text-slate-400 mb-2">
              BI-Werkzeuge sind moderne Weiterentwicklungen dieser klassischen MSS-Typen:
            </p>
            <ul className="space-y-1 text-sm text-slate-300">
              <li><span className="text-blue-400 font-mono font-bold">MIS</span> - Managementinformationssysteme: Standardberichte und Kennzahlen</li>
              <li><span className="text-green-400 font-mono font-bold">DSS</span> - Decision Support Systeme: What-if-Analysen und Simulationen</li>
              <li><span className="text-purple-400 font-mono font-bold">EIS</span> - Executive Information Systeme: Verdichtete Dashboards für die Geschäftsführung</li>
            </ul>
          </div>
        </div>
      ),
    },

    // ── 2. Der BI-Prozess ─────────────────────────
    {
      id: 'bi-prozess',
      title: 'Der BI-Prozess (3 Schritte)',
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <span className="text-3xl font-bold text-blue-400">1</span>
              <div>
                <div className="font-medium text-blue-300">Auswahl</div>
                <div className="text-sm text-slate-400">Datenquelle wird bestimmt</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <span className="text-3xl font-bold text-purple-400">2</span>
              <div>
                <div className="font-medium text-purple-300">Aufbereitung</div>
                <div className="text-sm text-slate-400">Datenbestand wird für die Analyse modifiziert</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-3xl font-bold text-green-400">3</span>
              <div>
                <div className="font-medium text-green-300">Analyse</div>
                <div className="text-sm text-slate-400">Muster erkennen und Erkenntnisse ableiten</div>
              </div>
            </div>
          </div>
          <MermaidDiagram chart={biProcessDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },

    // ── 3. OLTP vs OLAP ──────────────────────────
    {
      id: 'oltp-olap',
      title: 'OLTP vs. OLAP',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Die <strong>wichtigste Unterscheidung</strong> in der BI-Welt: Operative Systeme
            (OLTP) liefern die Daten, analytische Systeme (OLAP) werten sie aus.
          </p>

          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <h4 className="font-medium text-blue-400 mb-2">OLTP - Das operative System</h4>
            <p className="text-sm text-slate-300">
              Ein Kunde bestellt im Onlineshop. Das ERP-System bucht die Bestellung,
              aktualisiert den Lagerbestand, erstellt eine Rechnung. Alles in Echtzeit,
              alles normalisiert, alles auf den <em>aktuellen Zustand</em> optimiert.
            </p>
          </div>

          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
            <h4 className="font-medium text-purple-400 mb-2">OLAP - Das analytische System</h4>
            <p className="text-sm text-slate-300">
              Der Vertriebsleiter will wissen: "Wie haben sich unsere Umsätze pro Region in
              den letzten 3 Jahren entwickelt?" Das ERP kann das nicht effizient beantworten -
              dafür braucht man historische, aggregierte Daten im <em>Sternschema</em>.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Aspekt</th>
                  <th className="text-left py-2 px-3 text-blue-400">OLTP</th>
                  <th className="text-left py-2 px-3 text-purple-400">OLAP</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Bedeutung</td>
                  <td className="py-2 px-3"><span className="text-blue-300">Online Transaction Processing</span></td>
                  <td className="py-2 px-3"><span className="text-purple-300">Online Analytical Processing</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Zweck</td>
                  <td className="py-2 px-3">Operative Transaktionen</td>
                  <td className="py-2 px-3">Analyse & Reporting</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Daten</td>
                  <td className="py-2 px-3">Aktuelle, operative Daten</td>
                  <td className="py-2 px-3">Historische, aggregierte Daten</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Datenbank</td>
                  <td className="py-2 px-3">Normalisiert</td>
                  <td className="py-2 px-3">Denormalisiert (Sternschema)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Operationen</td>
                  <td className="py-2 px-3">Viele Schreibzugriffe</td>
                  <td className="py-2 px-3">Vor allem Lesezugriffe</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Beispiel</td>
                  <td className="py-2 px-3">ERP-System</td>
                  <td className="py-2 px-3">Data Warehouse</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Fokus:</strong> OLTP vs OLAP ist eine der häufigsten Prüfungsfragen!
            Merke: <span className="text-blue-400">OLTP = Tagesgeschäft</span>,{' '}
            <span className="text-purple-400">OLAP = Analyse</span>. Die Datenbank-Struktur
            unterscheidet sich grundlegend (normalisiert vs. Sternschema).
          </div>
        </div>
      ),
    },

    // ── 4. ETL & Data Warehouse ─────────────────────
    {
      id: 'etl-data-warehouse',
      title: 'ETL & Data Warehouse',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Wie kommen Daten aus operativen Systemen ins Data Warehouse? Durch den <strong>ETL-Prozess</strong>,
            der die Daten extrahiert, transformiert und in die DWH-Schichten lädt.
          </p>

          <MermaidDiagram chart={etlDwhDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          {/* ETL */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-amber-400">Der ETL-Prozess</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
                <span className="text-2xl font-bold text-amber-400">E</span>
                <div>
                  <div className="font-medium text-amber-300">Extract</div>
                  <div className="text-sm text-slate-400">Daten aus Quellsystemen ziehen (ERP, CRM, Excel, externe APIs)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
                <span className="text-2xl font-bold text-amber-400">T</span>
                <div>
                  <div className="font-medium text-amber-300">Transform</div>
                  <div className="text-sm text-slate-400">Bereinigen, Harmonisieren, Verdichten, Anreichern</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
                <span className="text-2xl font-bold text-amber-400">L</span>
                <div>
                  <div className="font-medium text-amber-300">Load</div>
                  <div className="text-sm text-slate-400">Ins Data Warehouse laden</div>
                </div>
              </div>
            </div>
          </div>

          {/* DWH Layers */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-400">DWH-Schichten</h4>
            <div className="space-y-2">
              <div className="p-3 bg-blue-900/15 rounded-lg border border-blue-900">
                <span className="font-medium text-blue-300">Staging Area</span>
                <span className="text-slate-400 text-sm"> - Rohdaten landen hier temporär, 1:1 Kopie der Quellsysteme</span>
              </div>
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                <span className="font-medium text-blue-300">Core / ODS (Operational Data Store)</span>
                <span className="text-slate-400 text-sm"> - Bereinigte, integrierte Daten aus allen Quellen</span>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                <span className="font-medium text-blue-300">Data Marts</span>
                <span className="text-slate-400 text-sm"> - Fachbereichsspezifische Ausschnitte (Vertrieb, Finanzen, Marketing)</span>
              </div>
            </div>
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: BiArchitectureDiagram,
      },
    },

    // ── DWH Layer Drill-Down (Interactive) ────────
    {
      id: 'dwh-layers',
      title: 'Data Warehouse Schichten (interaktiv)',
      content: (
        <div className="space-y-4">
          <p>
            Klicke durch die Schichten der Data-Warehouse-Architektur um zu verstehen,
            was in jeder Ebene passiert.
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: DwhLayerDrillDown,
      },
    },

    // ── 5. Datenmodellierung ────────────────────────
    {
      id: 'datenmodellierung',
      title: 'Datenmodellierung',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Innerhalb der Data Marts werden Daten im <strong>Sternschema</strong> modelliert -
            optimiert auf effiziente Leseoperationen für OLAP-Analysen.
          </p>

          <MermaidDiagram chart={sternSchemaDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          {/* Sternschema */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-400">Das Sternschema</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-slate-800 rounded border border-green-800/50">
                <h5 className="font-medium text-green-400 mb-2">Faktentabellen</h5>
                <p className="text-sm text-slate-300">
                  Kenn-/Ergebniszahlen: Profitabilität, Kosten, Umsatz, Erlös
                </p>
                <p className="text-xs text-slate-500 mt-1">Groß, dynamisch, viele Datensätze</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-blue-800/50">
                <h5 className="font-medium text-blue-400 mb-2">Dimensionstabellen</h5>
                <p className="text-sm text-slate-300">
                  Beschreibende Daten: Produkt, Zeit, Region, Kunde
                </p>
                <p className="text-xs text-slate-500 mt-1">Kleiner, vergleichsweise statisch</p>
              </div>
            </div>
            <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
              <strong>Klausur-Falle:</strong> Faktentabellen enthalten <em>Kennzahlen</em> (Umsatz, Kosten),
              Dimensionstabellen enthalten <em>beschreibende Daten</em> (Produktname, Region).
              Nicht verwechseln!
            </div>
          </div>

          {/* DW vs Data Lake */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-cyan-400">Data Warehouse vs. Data Lake</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700">
                <h5 className="font-bold text-blue-300 mb-2">Data Warehouse</h5>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>* <strong>Strukturierte</strong>, aufbereitete Daten</li>
                  <li>* Schema-on-Write</li>
                  <li>* Für OLAP & Reporting</li>
                </ul>
              </div>
              <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-700">
                <h5 className="font-bold text-cyan-300 mb-2">Data Lake</h5>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>* <strong>Rohdaten</strong> in Originalformaten</li>
                  <li>* Schema-on-Read</li>
                  <li>* Strukturiert UND unstrukturiert</li>
                </ul>
              </div>
            </div>
            <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
              <strong>Klausur-Falle:</strong> "Rohdaten in Originalformaten" beschreibt Data <strong>Lake</strong>,
              nicht Data Warehouse!
            </div>
          </div>
        </div>
      ),
    },

    // ── 6. Der OLAP Cube ──────────────────────────
    {
      id: 'olap-cube',
      title: 'Der OLAP Cube (Datenwürfel)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <p className="text-purple-200">
              <strong>OLAP Cube</strong> = Multidimensionaler Datenwürfel, der Fakten aus jeder
              Ebene einer Dimension aggregiert. Die Dimensionen bilden die "Achsen" des Würfels.
            </p>
          </div>

          <MermaidDiagram chart={olapCubeDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-3 bg-slate-800 rounded border border-cyan-800/50">
              <h4 className="font-medium text-cyan-400 mb-2">Dimensionen</h4>
              <p className="text-sm text-slate-300">Die "Achsen": Produkte, Zeit, Regionen</p>
              <p className="text-xs text-slate-500 mt-1">Jede Dimension hat Hierarchien (Jahr &gt; Quartal &gt; Monat)</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-amber-800/50">
              <h4 className="font-medium text-amber-400 mb-2">Fakten (Measures)</h4>
              <p className="text-sm text-slate-300">Die "Werte": Umsatz, Gewinn, Menge</p>
              <p className="text-xs text-slate-500 mt-1">Werden über Dimensionen aggregiert (SUM, AVG, COUNT)</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-3">Die 4 OLAP Operationen:</h4>
            <div className="grid gap-2">
              <div className="p-3 bg-green-900/20 rounded-lg border border-green-800">
                <span className="font-medium text-green-300">Drill-Down</span>
                <p className="text-sm text-slate-400 mt-1">
                  Von einer aggregierten Ebene zu detaillierteren Daten navigieren
                  (z.B. Jahr &rarr; Quartal &rarr; Monat)
                </p>
              </div>
              <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800">
                <span className="font-medium text-purple-300">Roll-Up</span>
                <p className="text-sm text-slate-400 mt-1">
                  Von detaillierten Daten zu einer höheren Aggregationsebene
                  (Monat &rarr; Quartal &rarr; Jahr)
                </p>
              </div>
              <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-800">
                <span className="font-medium text-amber-300">Slice</span>
                <p className="text-sm text-slate-400 mt-1">
                  Eine "Scheibe" aus dem Würfel schneiden (eine Dimension fixieren,
                  z.B. nur Region = "Europa")
                </p>
              </div>
              <div className="p-3 bg-cyan-900/20 rounded-lg border border-cyan-800">
                <span className="font-medium text-cyan-300">Dice</span>
                <p className="text-sm text-slate-400 mt-1">
                  Einen "Teilwürfel" ausschneiden (mehrere Dimensionen einschränken,
                  z.B. Region = "Europa" UND Zeit = "2024")
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ── 7. OLTP vs OLAP üben ─────────────────────
    {
      id: 'oltp-olap-ueben',
      title: 'OLTP vs OLAP üben',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Ordne die Eigenschaften dem richtigen System zu - eine klassische Klausurfrage!
          </p>
          <ul className="text-sm text-slate-400 space-y-1 ml-4 list-disc">
            <li><span className="text-blue-400">OLTP</span> = operativ, normalisiert, viele Schreibzugriffe</li>
            <li><span className="text-purple-400">OLAP</span> = analytisch, Sternschema, vor allem Lesezugriffe</li>
            <li>Tipp: Frage dich bei jeder Eigenschaft - geht es um <em>Tagesgeschäft</em> oder <em>Analyse</em>?</li>
          </ul>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: OltpOlapGame,
      },
    },
  ],

  // ─────────────────────────────────────────────────
  // Quiz
  // ─────────────────────────────────────────────────

  quiz: {
    questions: [
      {
        id: 'bi-definition',
        type: 'multiple-choice',
        question: 'Business Intelligence (BI) ist ein Oberbegriff für Anwendungen, Infrastruktur, Werkzeuge und Best Practices für den Zugang zu und die Analyse von Daten und Information für die (strategische) Entscheidungsfindung und Performanceverbesserung zur Erzielung von Marktvorteilen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Dies ist die korrekte Definition von Business Intelligence.',
      },
      {
        id: 'bi-fuehrungsaufgaben',
        type: 'multiple-choice',
        question: 'Business Intelligence ist die Gesamtheit aller Führungsaufgaben in einer Organisation bezogen auf deren computergestütztes bzw. computerunterstützbares Informations- und Kommunikationssystem.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das ist die Definition von INFORMATIONSMANAGEMENT, nicht Business Intelligence!',
      },
      {
        id: 'bi-oltp',
        type: 'multiple-choice',
        question: 'Online Transaction Processing (OLTP) sind transaktionsorientierte Prozesse, welche die operativen Daten des Unternehmens in (standardisierten) Softwarelösungen bearbeiten und in normalisierten Datenbanken oder flachen Dateien speichern.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekte Definition von OLTP.',
      },
      {
        id: 'bi-data-warehouse',
        type: 'multiple-choice',
        question: 'In einem Data Warehouse werden die Rohdaten in ihren Originalformaten (strukturiert und unstrukturiert) gespeichert, bis sie benötigt werden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt einen DATA LAKE, nicht ein Data Warehouse! Im Data Warehouse werden Daten transformiert und strukturiert gespeichert.',
      },
      {
        id: 'bi-data-lake',
        type: 'multiple-choice',
        question: 'Die Kombination von OLAP und OLTP führt direkt zur Aufgabe des Data Warehouses und zum Data Lake. In einem Data Lake werden die Rohdaten in ihren Originalformaten (strukturiert und unstrukturiert) gespeichert, bis sie benötigt werden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Die erste Aussage ist fragwürdig - OLAP+OLTP führt nicht "direkt" zu Data Lake. Die Data Lake Definition ist aber korrekt.',
      },
      {
        id: 'bi-mss',
        type: 'multiple-choice',
        question: 'Als Management Support Systeme (MSS) bzw. Managementunterstützungssysteme werden alle IT-Anwendungssysteme bezeichnet, die das Management, d. h. die Fach- und Führungskräfte einer Unternehmung, bei ihren vielfältigen Aufgaben unterstützen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekte Definition von Management Support Systemen.',
      },
      {
        id: 'bi-etl-definition',
        type: 'multiple-choice',
        question: 'Der ETL-Prozess (Extract, Transform, Load) ist ein Verfahren, das die Daten für das Business Warehouse aufbereitet. In der Transformation erfolgt das Bereinigen, Harmonisieren, Verdichten und Anreichern der Daten.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. ETL ist der Standardprozess zur Datenaufbereitung für das Data Warehouse.',
      },
      {
        id: 'bi-sternschema',
        type: 'multiple-choice',
        question: 'Das Sternschema ist ein Datenmodell für OLTP-Systeme, das auf häufige Schreiboperationen optimiert ist.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Das Sternschema ist für OLAP und Data Warehouse optimiert - für effiziente LESE-Operationen, nicht Schreiben.',
      },
      {
        id: 'bi-olap-cube',
        type: 'multiple-choice',
        question: 'OLAP greift auf Daten aus dem Business Warehouse für Analyse und Data Mining zu. OLAP Datenwürfel (OLAP Cube) aggregieren Fakten aus jeder Ebene einer Dimension.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. OLAP Cubes ermöglichen multidimensionale Analysen mit Drill-Down, Slice & Dice.',
      },
      {
        id: 'bi-faktentabellen',
        type: 'multiple-choice',
        question: 'Faktentabellen im Sternschema beinhalten beschreibende Daten und sind vergleichsweise statisch.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt DIMENSIONSTABELLEN! Faktentabellen enthalten Kenn-/Ergebniszahlen (Umsatz, Kosten, Gewinn).',
      },
      {
        id: 'bi-etl-reihenfolge',
        type: 'multiple-choice',
        question: 'In welcher Reihenfolge laufen die Schritte des ETL-Prozesses ab?',
        options: [
          'Extract → Transform → Load',
          'Transform → Extract → Load',
          'Load → Extract → Transform',
          'Extract → Load → Transform',
        ],
        correctAnswer: 'Extract → Transform → Load',
        explanation: 'ETL = Extract (aus Quellen ziehen) → Transform (bereinigen, harmonisieren, verdichten, anreichern) → Load (ins Data Warehouse laden).',
      },
      {
        id: 'bi-fakten-vs-dimension',
        type: 'multiple-choice',
        question: 'Welche Daten gehören in eine Faktentabelle im Sternschema?',
        options: [
          'Kenn- und Ergebniszahlen wie Umsatz, Kosten und Profitabilität',
          'Beschreibende, statische Daten wie Produktkategorien und Regionen',
          'Operative Transaktionsdaten aus dem ERP-System',
          'Kundenstammdaten und Lieferanteninformationen',
        ],
        correctAnswer: 'Kenn- und Ergebniszahlen wie Umsatz, Kosten und Profitabilität',
        explanation: 'Faktentabellen enthalten Kennzahlen/Ergebniszahlen (Umsatz, Kosten, Profitabilität). Dimensionstabellen enthalten beschreibende, statische Daten.',
      },
      {
        id: 'bi-oltp-merkmal',
        type: 'multiple-choice',
        question: 'Welches Merkmal ist typisch für OLTP-Systeme?',
        options: [
          'Normalisierte Datenbanken mit operativen, aktuellen Daten',
          'Denormalisierte Datenbanken mit historischen, aggregierten Daten',
          'Sternschema optimiert auf Leseoperationen',
          'Multidimensionale Datenwürfel (OLAP Cubes)',
        ],
        correctAnswer: 'Normalisierte Datenbanken mit operativen, aktuellen Daten',
        explanation: 'OLTP = normalisierte DBs, aktuelle operative Daten, viele Schreiboperationen. OLAP = denormalisiert (Sternschema), historische Daten, Leseoperationen.',
      },
      {
        id: 'bi-mss-typen',
        type: 'multiple-choice',
        question: 'Welche drei klassischen Ausprägungen gehören zu den Management Support Systemen (MSS)?',
        options: [
          'MIS (Managementinformationssysteme), DSS (Decision Support Systeme), EIS (Executive Information Systeme)',
          'ERP, CRM und SCM',
          'OLTP, OLAP und ETL',
          'Data Warehouse, Data Lake und Data Mining',
        ],
        correctAnswer: 'MIS (Managementinformationssysteme), DSS (Decision Support Systeme), EIS (Executive Information Systeme)',
        explanation: 'Die drei klassischen MSS-Typen sind MIS, DSS und EIS. Sie unterstützen Fach- und Führungskräfte bei verschiedenen Aufgaben.',
      },
      {
        id: 'bi-dwh-vs-lake',
        type: 'multiple-choice',
        question: 'Was ist der wesentliche Unterschied zwischen Data Warehouse und Data Lake?',
        options: [
          'Data Warehouse speichert strukturierte, transformierte Daten (Schema-on-Write); Data Lake speichert Rohdaten in Originalformaten (Schema-on-Read)',
          'Data Lake ist teurer als Data Warehouse',
          'Data Warehouse kann nur strukturierte Daten speichern, Data Lake nur unstrukturierte',
          'Data Lake ist eine ältere Technologie als Data Warehouse',
        ],
        correctAnswer: 'Data Warehouse speichert strukturierte, transformierte Daten (Schema-on-Write); Data Lake speichert Rohdaten in Originalformaten (Schema-on-Read)',
        explanation: 'DW = Schema-on-Write (Daten werden vor Speicherung transformiert). Data Lake = Schema-on-Read (Rohdaten, strukturiert UND unstrukturiert).',
      },
      {
        id: 'bi-transform-aktivitaeten',
        type: 'multiple-choice',
        question: 'Welche Aktivitäten gehören zum "Transform"-Schritt im ETL-Prozess?',
        options: [
          'Bereinigen, Harmonisieren, Verdichten und Anreichern',
          'Extrahieren, Laden und Speichern',
          'Analysieren, Visualisieren und Berichten',
          'Komprimieren, Verschlüsseln und Archivieren',
        ],
        correctAnswer: 'Bereinigen, Harmonisieren, Verdichten und Anreichern',
        explanation: 'Transform = Bereinigen (Fehler entfernen), Harmonisieren (Formate angleichen), Verdichten (Aggregieren), Anreichern (Kennzahlen berechnen).',
      },
      {
        id: 'bi-prozess-schritte',
        type: 'multiple-choice',
        question: 'In welcher Reihenfolge laufen die Schritte des BI-Prozesses ab?',
        options: [
          'Auswahl → Aufbereitung → Analyse',
          'Analyse → Auswahl → Aufbereitung',
          'Aufbereitung → Analyse → Auswahl',
          'Analyse → Aufbereitung → Auswahl',
        ],
        correctAnswer: 'Auswahl → Aufbereitung → Analyse',
        explanation: 'BI-Prozess: 1. Auswahl (Datenquelle bestimmen) → 2. Aufbereitung (Datenbestand modifizieren) → 3. Analyse (Beziehungsmuster destillieren).',
      },
      {
        id: 'bi-olap-drill-down',
        type: 'multiple-choice',
        question: 'Welche OLAP-Operation navigiert von einer aggregierten Ebene zu detaillierteren Daten (z.B. von Jahr zu Quartal zu Monat)?',
        options: [
          'Drill-Down',
          'Roll-Up',
          'Slice',
          'Dice',
        ],
        correctAnswer: 'Drill-Down',
        explanation: 'Drill-Down = von aggregiert zu detailliert (Jahr→Quartal→Monat). Roll-Up = umgekehrt. Slice = eine Dimension fixieren. Dice = Teilwürfel ausschneiden.',
      },
      {
        id: 'bi-olap-slice-dice',
        type: 'multiple-choice',
        question: 'Beim "Slice" einer OLAP-Analyse wird ...',
        options: [
          '... eine Dimension fixiert und eine "Scheibe" aus dem Datenwürfel geschnitten',
          '... von detaillierten Daten zu einer höheren Aggregationsebene navigiert',
          '... ein kompletter Datenwürfel kopiert',
          '... der gesamte Datenbestand gelöscht und neu aufgebaut',
        ],
        correctAnswer: '... eine Dimension fixiert und eine "Scheibe" aus dem Datenwürfel geschnitten',
        explanation: 'Slice = eine Dimension fixieren (z.B. nur Region "Europa"). Dice = mehrere Dimensionen einschränken (Teilwürfel). Drill-Down/Roll-Up = Navigation zwischen Aggregationsebenen.',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // Exam Tasks
  // ─────────────────────────────────────────────────

  examTasks: [
    {
      id: 'bi-architecture-task',
      title: 'BI-Architektur',
      points: 20,
      context: (
        <p>
          Ein Unternehmen möchte ein Business Intelligence System aufbauen, um
          bessere strategische Entscheidungen treffen zu können.
        </p>
      ),
      parts: [
        {
          id: 'bi-task-a',
          type: 'free-text',
          question: 'Erklären Sie den Unterschied zwischen OLTP und OLAP.',
          placeholder: 'OLTP ist...',
          modelAnswer: 'OLTP (Online Transaction Processing):\n- Operative Transaktionen\n- Schreiben und Lesen\n- Normalisierte Datenbanken\n- Aktueller Zustand\n- Beispiel: ERP-System\n\nOLAP (Online Analytical Processing):\n- Analytische Abfragen\n- Nur Lesen\n- Sternschema (denormalisiert)\n- Historische Daten\n- Beispiel: Data Warehouse',
          keyPoints: [
            'OLTP = operative Transaktionen',
            'OLAP = analytische Abfragen',
            'Normalisiert vs. Sternschema',
          ],
          explanation: 'OLTP und OLAP erfüllen unterschiedliche Aufgaben im Unternehmen.',
        },
        {
          id: 'bi-task-b',
          type: 'free-text',
          question: 'Beschreiben Sie den ETL-Prozess und seine Schritte.',
          placeholder: 'ETL steht für...',
          modelAnswer: 'ETL = Extract, Transform, Load\n\n1. Extract: Daten aus Quellsystemen (ERP, CRM, Excel) ziehen\n2. Transform: Bereinigen (Fehler), Harmonisieren (Formate), Verdichten (Aggregieren), Anreichern (Kennzahlen)\n3. Load: Ins Data Warehouse laden\n\nZiel: Daten für Analysen aufbereiten',
          keyPoints: [
            'Extract aus Quellsystemen',
            'Transform = Bereinigen, Harmonisieren, Verdichten, Anreichern',
            'Load ins Data Warehouse',
          ],
          explanation: 'ETL ist der Standardprozess zur Befüllung eines Data Warehouse.',
        },
        {
          id: 'bi-task-c',
          type: 'free-text',
          question: 'Was ist der Unterschied zwischen Data Warehouse und Data Lake?',
          placeholder: 'Data Warehouse...',
          modelAnswer: 'Data Warehouse:\n- Strukturierte, transformierte Daten\n- Schema-on-Write\n- Für OLAP und Reporting\n- Daten werden vor Speicherung aufbereitet\n\nData Lake:\n- Rohdaten in Originalformaten\n- Schema-on-Read\n- Strukturiert UND unstrukturiert\n- Daten werden bei Bedarf aufbereitet',
          keyPoints: [
            'DW = strukturiert, transformiert',
            'DL = Rohdaten, alle Formate',
            'Schema-on-Write vs. Schema-on-Read',
          ],
          explanation: 'Data Lake ermöglicht die Speicherung unstrukturierter Big Data.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────
  // Related Topics & Connection Diagram
  // ─────────────────────────────────────────────────

  relatedTopics: [
    { id: 'big-data', title: 'Big Data Analytics', relationship: 'erweitert BI' },
    { id: 'crm', title: 'CRM', relationship: 'nutzt BI-Methoden' },
    { id: 'erp-systeme', title: 'ERP', relationship: 'Datenquelle' },
  ],

  connectionDiagram: `
flowchart LR
  subgraph BI["Business Intelligence"]
    DWH["Data Warehouse"]
    OLAP["OLAP"]
  end

  subgraph Quellen["Datenquellen"]
    ERP["ERP-Grundlagen"]
    CRM["CRM"]
  end

  subgraph Erweiterung["Erweiterung"]
    BD["Big Data Analytics"]
  end

  ERP -->|"liefert operative Daten"| DWH
  CRM -->|"Kundendaten"| DWH
  DWH --> OLAP
  OLAP -->|"Predictive Analytics"| BD
  BD -->|"Data Lake ergänzt"| DWH

  style BI fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style Quellen fill:#1e293b,stroke:#64748b,color:#f8fafc
  style Erweiterung fill:#3b1f63,stroke:#8b5cf6,color:#c4b5fd
`,
}
