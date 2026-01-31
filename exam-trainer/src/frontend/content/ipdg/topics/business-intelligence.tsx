// src/content/ipdg/topics/business-intelligence.tsx
import type { Topic } from '@/core/types/content'
import { BiArchitectureDiagram } from '../diagrams/BiArchitectureDiagram'
import { DwhLayerDrillDown } from '../diagrams/DwhLayerDrillDown'
import { OltpOlapGame } from '../diagrams/ConceptCategorizationGame'

export const businessIntelligenceTopic: Topic = {
  id: 'business-intelligence',
  title: 'Business Intelligence & Data Warehouse',
  description: 'BI Definition, OLTP vs OLAP, ETL, Data Warehouse, Sternschema',
  icon: '📊',
  examNotes: 'OLTP vs OLAP genau unterscheiden! Data Warehouse ≠ Data Lake!',

  sections: [
    {
      id: 'definition',
      title: 'Definition Business Intelligence',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Business Intelligence (BI)</strong> ist ein Oberbegriff für Anwendungen,
              Infrastruktur, Werkzeuge und Best Practices für den Zugang zu und die Analyse
              von Daten und Information für die <em>(strategische) Entscheidungsfindung</em> und
              Performanceverbesserung zur Erzielung von Marktvorteilen.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Nicht verwechseln:</strong> BI ≠ "Gesamtheit aller Führungsaufgaben" (das ist Informationsmanagement!)
          </div>
        </div>
      ),
    },
    {
      id: 'mss',
      title: 'Management Support Systeme (MSS)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200">
              <strong>MSS</strong> = IT-Anwendungssysteme, die das Management (Fach- und
              Führungskräfte) bei Planung, Organisation, Steuerung und Kontrolle unterstützen.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Klassische Ausprägungen:</h4>
            <div className="grid gap-2">
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-blue-400 font-mono">MIS</span> - Managementinformationssysteme
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-green-400 font-mono">DSS</span> - Decision Support Systeme
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-purple-400 font-mono">EIS</span> - Executive Information Systeme
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'oltp-olap',
      title: 'OLTP vs. OLAP',
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Aspekt</th>
                  <th className="text-left py-2 px-3 text-green-400">OLTP</th>
                  <th className="text-left py-2 px-3 text-blue-400">OLAP</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Bedeutung</td>
                  <td className="py-2 px-3">Online Transaction Processing</td>
                  <td className="py-2 px-3">Online Analytical Processing</td>
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
                <tr>
                  <td className="py-2 px-3 font-medium">Beispiel</td>
                  <td className="py-2 px-3">ERP-System</td>
                  <td className="py-2 px-3">Data Warehouse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <p className="text-green-200 text-sm">
              <strong>OLTP:</strong> Transaktionsorientierte Prozesse, welche die operativen
              Daten des Unternehmens in (standardisierten) Softwarelösungen bearbeiten und
              in normalisierten Datenbanken oder flachen Dateien speichern.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'etl',
      title: 'ETL-Prozess',
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="text-3xl font-bold text-amber-400">E</span>
              <div>
                <div className="font-medium text-amber-300">Extract</div>
                <div className="text-sm text-slate-400">Daten aus Quellsystemen ziehen</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <span className="text-3xl font-bold text-blue-400">T</span>
              <div>
                <div className="font-medium text-blue-300">Transform</div>
                <div className="text-sm text-slate-400">Bereinigen, Harmonisieren, Verdichten, Anreichern</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-3xl font-bold text-green-400">L</span>
              <div>
                <div className="font-medium text-green-300">Load</div>
                <div className="text-sm text-slate-400">Ins Data Warehouse laden</div>
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
    {
      id: 'dwh-layers',
      title: 'Data Warehouse Schichten',
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
    {
      id: 'oltp-olap-ueben',
      title: 'OLTP vs OLAP üben',
      content: (
        <div className="space-y-4">
          <p>
            Ordne die Eigenschaften dem richtigen System zu - eine klassische Klausurfrage!
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: OltpOlapGame,
      },
    },
    {
      id: 'data-warehouse-lake',
      title: 'Data Warehouse vs. Data Lake',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-2">Data Warehouse 🏢</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>Strukturierte</strong>, aufbereitete Daten</li>
                <li>• Schema-on-Write</li>
                <li>• Für OLAP & Reporting</li>
                <li>• Daten werden <em>transformiert</em></li>
              </ul>
            </div>
            <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
              <h4 className="font-bold text-cyan-300 mb-2">Data Lake 🌊</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>Rohdaten</strong> in Originalformaten</li>
                <li>• Schema-on-Read</li>
                <li>• Für Big Data Analytics</li>
                <li>• Strukturiert UND unstrukturiert</li>
              </ul>
            </div>
          </div>
          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>⚠️ Klausur-Falle:</strong> "Rohdaten in Originalformaten" beschreibt Data LAKE, nicht Data Warehouse!
          </div>
        </div>
      ),
    },
    {
      id: 'sternschema',
      title: 'Sternschema',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <p className="text-purple-200">
              Das <strong>Sternschema</strong> ist ein Datenmodell optimiert auf effiziente
              Leseoperationen für Data Warehouse und OLAP-Anwendungen.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="p-3 bg-slate-800 rounded">
              <h4 className="font-medium text-green-400 mb-2">Faktentabellen</h4>
              <p className="text-sm text-slate-300">
                Kenn-/Ergebniszahlen: Profitabilität, Kosten, Umsatz, Erlös
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded">
              <h4 className="font-medium text-blue-400 mb-2">Dimensionstabellen</h4>
              <p className="text-sm text-slate-300">
                Beschreibende Daten: statisch, kleiner als Faktentabellen
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'data-mining',
      title: 'Data Mining',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <p className="text-amber-200">
              <strong>Data Mining</strong> = Untersuchung von Beziehungsmustern durch
              logische/funktionale Abhängigkeiten in großen Datenmengen.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Anwendungsgebiete:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-slate-800 rounded">Marketing & Targeting</div>
              <div className="p-2 bg-slate-800 rounded">Kreditrisikomanagement</div>
              <div className="p-2 bg-slate-800 rounded">Betrugserkennung</div>
              <div className="p-2 bg-slate-800 rounded">Empfehlungssysteme</div>
            </div>
          </div>
          <div className="p-3 bg-blue-900/20 rounded border border-blue-800 text-sm mt-4">
            💡 Traditionelles Data Mining segmentiert Kunden in <strong>Gruppen</strong> für
            zielgruppenorientiertes Marketing - der Kunde existiert nicht als Individuum.
          </div>
        </div>
      ),
    },
  ],

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
        id: 'bi-data-mining-big-data',
        type: 'multiple-choice',
        question: 'Data Mining mit Big Data Bezug zeichnet sich dadurch aus, dass Kaufmustererkennung nach Kundengruppen und nicht nach individuellen Personen erfolgt. Der individuelle Kunde erscheint nicht, sondern es werden Zielgruppen identifiziert.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt TRADITIONELLES Data Mining! Big Data Analytics fokussiert auf den INDIVIDUELLEN Kunden, nicht Gruppen.',
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
    ],
  },

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

  relatedTopics: [
    { id: 'big-data', title: 'Big Data Analytics', relationship: 'erweitert BI' },
    { id: 'crm', title: 'CRM', relationship: 'nutzt BI-Methoden' },
    { id: 'erp-grundlagen', title: 'ERP', relationship: 'Datenquelle' },
  ],
}
