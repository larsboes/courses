// src/content/ipdg/topics/sap-plattform.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'

// ─────────────────────────────────────────────────
// Mermaid Diagrams
// ─────────────────────────────────────────────────

const orgHierarchyDiagram = `
flowchart TB
  M["Mandant\n(Konzern)"]
  BK1["Buchungskreis\nDeutschland GmbH"]
  BK2["Buchungskreis\nSchweiz AG"]
  W1["Werk\nMünchen"]
  W2["Werk\nHamburg"]
  W3["Werk\nZürich"]
  L1["Lagerort\nHalle A"]
  L2["Lagerort\nHalle B"]
  L3["Lagerort\nHauptlager"]

  M --> BK1
  M --> BK2
  BK1 --> W1
  BK1 --> W2
  BK2 --> W3
  W1 --> L1
  W1 --> L2
  W3 --> L3

  style M fill:#581c87,stroke:#a855f7,color:#f8fafc
  style BK1 fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
  style BK2 fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
  style W1 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style W2 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style W3 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style L1 fill:#78350f,stroke:#f59e0b,color:#f8fafc
  style L2 fill:#78350f,stroke:#f59e0b,color:#f8fafc
  style L3 fill:#78350f,stroke:#f59e0b,color:#f8fafc
`

const dataTypesDiagram = `
flowchart TB
  subgraph OD["Organisationsdaten"]
    O1["Mandant"]
    O2["Buchungskreis"]
    O3["Werk"]
  end

  subgraph SD["Stammdaten"]
    S1["Kunden"]
    S2["Material"]
    S3["Lieferanten"]
  end

  subgraph BD["Bewegungsdaten"]
    B1["Bestellungen"]
    B2["Rechnungen"]
    B3["Lieferscheine"]
  end

  OD -->|"definieren Struktur für"| SD
  SD -->|"werden referenziert in"| BD

  style O1 fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
  style O2 fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
  style O3 fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
  style S1 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style S2 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style S3 fill:#14532d,stroke:#22c55e,color:#f8fafc
  style B1 fill:#78350f,stroke:#f59e0b,color:#f8fafc
  style B2 fill:#78350f,stroke:#f59e0b,color:#f8fafc
  style B3 fill:#78350f,stroke:#f59e0b,color:#f8fafc
`

// ─────────────────────────────────────────────────
// Topic Definition
// ─────────────────────────────────────────────────

export const sapPlattformTopic: Topic = {
  id: 'sap-plattform',
  title: 'SAP S/4HANA Plattform',
  description:
    'SAP Marktposition, HANA In-Memory, Fiori UI, On-Prem vs Cloud, Organisationseinheiten, Datentypen',
  icon: '🔷',
  examNotes:
    'Organisationseinheiten-Hierarchie kennen! On-Premise vs Cloud Unterschiede! Fiori App-Typen!',

  sections: [
    // ── 1. SAP - Der Marktführer ──────────────────────
    {
      id: 'marktfuehrer',
      title: 'SAP S/4HANA - Überblick',
      content: (
        <div className="space-y-4">
          <p>
            <strong>SAP</strong> (Systeme, Anwendungen und Produkte in der Datenverarbeitung),
            gegründet 1972 in Walldorf, ist <strong>Weltmarktführer für Unternehmens-Software</strong>{' '}
            mit ~35-40% Marktanteil im ERP-Umfeld. Über 400.000 Kunden in 190 Ländern &mdash;
            77% aller Geschäftstransaktionen weltweit berühren ein SAP-System.
          </p>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>SAP S/4HANA</strong> ist die aktuelle ERP-Generation von SAP. Das{' '}
              <strong>&quot;S&quot;</strong> steht für <em>Simple</em>, <strong>&quot;4&quot;</strong>{' '}
              für die vierte Produktgeneration, und <strong>&quot;HANA&quot;</strong> für die
              zugrundeliegende In-Memory-Datenbank. S/4HANA löst die Vorgänger <em>SAP R/3</em>{' '}
              und <em>SAP ECC</em> ab.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-medium mb-2">Was ist neu gegenüber den Vorgängern?</h4>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>In-Memory-Datenbank</strong> (HANA) statt klassischer Festplatten-DB</li>
              <li><strong>Vereinfachtes Datenmodell</strong> &mdash; deutlich weniger Tabellen und Aggregate</li>
              <li><strong>Echtzeit-Analysen</strong> &mdash; OLTP und OLAP in einem System</li>
              <li><strong>Moderne Oberfläche</strong> (Fiori) statt dem alten SAP GUI</li>
            </ul>
          </div>
        </div>
      ),
    },

    // ── 2. SAP HANA - In-Memory ─────────────────────
    {
      id: 'hana',
      title: 'SAP HANA - In-Memory Datenbank',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>HANA</strong> (High-Performance Analytic Appliance) hält{' '}
              <strong>alle Daten im Arbeitsspeicher (RAM)</strong> statt auf Festplatten
              &mdash; bis zu 100.000x schneller.
            </p>
          </div>

          <h4 className="font-medium">3 technische Geschwindigkeitsfaktoren:</h4>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="font-medium text-green-300 text-sm">In-Memory</div>
              <p className="text-xs text-slate-400 mt-1">
                Daten liegen im RAM &mdash; kein langsamer Festplatten-I/O nötig
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="font-medium text-blue-300 text-sm">Column Store</div>
              <p className="text-xs text-slate-400 mt-1">
                Spaltenorientierte Speicherung &mdash; ideal für analytische Abfragen,
                die nur wenige Spalten lesen
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="font-medium text-purple-300 text-sm">Komprimierung</div>
              <p className="text-xs text-slate-400 mt-1">
                Dictionary Encoding reduziert Speicherbedarf drastisch
              </p>
            </div>
          </div>

          <h4 className="font-medium mt-2">Was bedeutet das für den Anwender?</h4>
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
            <ul className="text-sm text-slate-300 space-y-2">
              <li>
                <strong>Echtzeit-Analysen</strong> &mdash; Berichte und Auswertungen laufen
                direkt auf den operativen Daten, kein separates Data Warehouse nötig
              </li>
              <li>
                <strong>Vereinfachtes Datenmodell</strong> &mdash; Aggregate und Indextabellen
                entfallen, da HANA schnell genug ist, um direkt auf Rohdaten zuzugreifen
              </li>
              <li>
                <strong>OLTP + OLAP in einem System</strong> &mdash; Transaktionen und
                Analysen auf derselben Datenbasis, ohne Daten erst kopieren zu müssen
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // ── 4. SAP Fiori ────────────────────────────────
    {
      id: 'fiori',
      title: 'SAP Fiori - Moderne Benutzeroberfläche',
      content: (
        <div className="space-y-4">
          <p>
            Das alte <strong>SAP GUI</strong> war komplex, zeichenbasiert und nur am Desktop
            nutzbar &mdash; mit steiler Lernkurve. <strong>SAP Fiori</strong> ersetzt es durch
            eine moderne, <strong>hardwareunabhängige</strong> Oberfläche (Desktop, Tablet,
            Smartphone), basierend auf SAPUI5/HTML5.
          </p>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">3 App-Typen:</h4>
            <div className="space-y-2">
              <div className="p-2 bg-green-900/20 rounded border border-green-800">
                <span className="text-green-300 font-medium">Transaktions-Apps</span>
                <p className="text-xs text-slate-400 mt-1">
                  Erstellen, Ändern, Genehmigen von Geschäftsobjekten (z.B. Bestellung anlegen,
                  Urlaubsantrag genehmigen)
                </p>
              </div>
              <div className="p-2 bg-blue-900/20 rounded border border-blue-800">
                <span className="text-blue-300 font-medium">Analytische Apps</span>
                <p className="text-xs text-slate-400 mt-1">
                  KPI-Dashboards mit Echtzeit-Daten aus HANA &mdash; Drill-down in
                  Details möglich
                </p>
              </div>
              <div className="p-2 bg-purple-900/20 rounded border border-purple-800">
                <span className="text-purple-300 font-medium">Factsheet-Apps</span>
                <p className="text-xs text-slate-400 mt-1">
                  Alle essenziellen Informationen zu einem Objekt (z.B. Kunde, Material)
                  auf einen Blick &mdash; Kontextnavigation zu verwandten Objekten
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">5 Design Principles:</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 bg-amber-900/30 rounded border border-amber-700 text-amber-300 shrink-0">
                  Role-based
                </span>
                <span className="text-slate-400 text-xs">
                  Jeder Nutzer sieht nur die Apps und Daten, die für seine Rolle relevant sind
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 bg-amber-900/30 rounded border border-amber-700 text-amber-300 shrink-0">
                  Responsive
                </span>
                <span className="text-slate-400 text-xs">
                  Passt sich automatisch an jede Bildschirmgröße an (Desktop, Tablet, Smartphone)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 bg-amber-900/30 rounded border border-amber-700 text-amber-300 shrink-0">
                  Simple
                </span>
                <span className="text-slate-400 text-xs">
                  Fokus auf die Kernaufgabe &mdash; nur die nötigen Funktionen anzeigen, kein Overload
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 bg-amber-900/30 rounded border border-amber-700 text-amber-300 shrink-0">
                  Coherent
                </span>
                <span className="text-slate-400 text-xs">
                  Einheitliches Look-and-Feel über alle Apps hinweg &mdash; einmal gelernt, überall anwendbar
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 bg-amber-900/30 rounded border border-amber-700 text-amber-300 shrink-0">
                  Delightful
                </span>
                <span className="text-slate-400 text-xs">
                  Ansprechendes Design, das Spaß macht &mdash; motiviert zur Nutzung
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> 3 App-Typen und 5 Design Principles auswendig
            kennen! &quot;Fiori kommt dran&quot; (laut Vorlesung).
          </div>
        </div>
      ),
    },

    // ── 5. Organisationseinheiten ────────────────────
    {
      id: 'organisationseinheiten',
      title: 'Organisationseinheiten',
      content: (
        <div className="space-y-4">
          <p>
            SAP bildet die Unternehmensstruktur über eine Hierarchie von
            Organisationseinheiten ab. Diese Hierarchie bestimmt, wer was sehen und
            buchen darf (Berechtigungen), wie Berichte aggregiert werden und wie
            die finanzielle Konsolidierung funktioniert.
          </p>

          <MermaidDiagram
            chart={orgHierarchyDiagram}
            className="bg-slate-800/50 rounded-lg p-4"
          />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Hierarchie (von oben nach unten):</h4>
            <div className="space-y-2">
              <div className="p-2 bg-purple-900/30 rounded border-l-4 border-purple-500">
                <span className="font-medium text-purple-300">Mandant</span>
                <span className="text-sm text-slate-400 ml-2">
                  = Konzern (größte organisatorische Einheit)
                </span>
              </div>
              <div className="p-2 bg-blue-900/30 rounded border-l-4 border-blue-500 ml-4">
                <span className="font-medium text-blue-300">Buchungskreis</span>
                <span className="text-sm text-slate-400 ml-2">
                  = Firma mit eigener Bilanz und GuV (kleinste Einheit für vollständige
                  Buchhaltung)
                </span>
              </div>
              <div className="p-2 bg-green-900/30 rounded border-l-4 border-green-500 ml-8">
                <span className="font-medium text-green-300">Werk</span>
                <span className="text-sm text-slate-400 ml-2">
                  = Produktionsstandort oder Verteilzentrum
                </span>
              </div>
              <div className="p-2 bg-amber-900/30 rounded border-l-4 border-amber-500 ml-12">
                <span className="font-medium text-amber-300">Lagerort</span>
                <span className="text-sm text-slate-400 ml-2">
                  = Physischer Lagerbereich innerhalb eines Werks
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Tipp: Häufige Falle - der Mandant ist die GRÖSSTE Einheit, nicht die
              kleinste! Der Buchungskreis ist die kleinste Einheit für eine vollständige
              Buchhaltung.
            </p>
          </div>
        </div>
      ),
    },

    // ── 6. On-Premise vs. Cloud ──────────────────────
    {
      id: 'on-premise-cloud',
      title: 'On-Premise vs. Cloud',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            SAP S/4HANA gibt es in zwei Bereitstellungsmodellen. Die Wahl hängt von den
            individuellen Anforderungen des Unternehmens ab - es gibt kein pauschales "besser".
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/20 rounded-lg border-2 border-blue-700">
              <h4 className="font-bold text-blue-300 mb-3 text-center">Cloud</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-900/20 rounded">
                  <span className="text-blue-400 font-medium">Lizenz:</span>
                  <span className="text-slate-300 ml-2">Subscription (monatlich/jährlich)</span>
                </div>
                <div className="p-2 bg-blue-900/20 rounded">
                  <span className="text-blue-400 font-medium">Wartung:</span>
                  <span className="text-slate-300 ml-2">Von SAP übernommen</span>
                </div>
                <div className="p-2 bg-blue-900/20 rounded">
                  <span className="text-blue-400 font-medium">Updates:</span>
                  <span className="text-slate-300 ml-2">Automatisch (quartalweise)</span>
                </div>
                <div className="p-2 bg-blue-900/20 rounded">
                  <span className="text-blue-400 font-medium">Hardware:</span>
                  <span className="text-slate-300 ml-2">SAP Cloud Infrastruktur</span>
                </div>
                <div className="p-2 bg-blue-900/20 rounded">
                  <span className="text-blue-400 font-medium">Anpassung:</span>
                  <span className="text-slate-300 ml-2">Limitiert (In-App Extensibility)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-900/20 rounded-lg border-2 border-green-700">
              <h4 className="font-bold text-green-300 mb-3 text-center">On-Premise</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-green-900/20 rounded">
                  <span className="text-green-400 font-medium">Lizenz:</span>
                  <span className="text-slate-300 ml-2">Traditional (Einmalkauf + Wartung)</span>
                </div>
                <div className="p-2 bg-green-900/20 rounded">
                  <span className="text-green-400 font-medium">Wartung:</span>
                  <span className="text-slate-300 ml-2">Vom Kunden selbst</span>
                </div>
                <div className="p-2 bg-green-900/20 rounded">
                  <span className="text-green-400 font-medium">Updates:</span>
                  <span className="text-slate-300 ml-2">Kontrolliert durch den Kunden</span>
                </div>
                <div className="p-2 bg-green-900/20 rounded">
                  <span className="text-green-400 font-medium">Hardware:</span>
                  <span className="text-slate-300 ml-2">Eigene Server am Firmenstandort</span>
                </div>
                <div className="p-2 bg-green-900/20 rounded">
                  <span className="text-green-400 font-medium">Anpassung:</span>
                  <span className="text-slate-300 ml-2">Volle ABAP-Erweiterbarkeit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-medium mb-2">Wann welches Modell?</h4>
            <div className="grid gap-2 md:grid-cols-2 text-sm">
              <div className="p-2 bg-blue-900/20 rounded">
                <span className="text-blue-300 font-medium">Cloud bevorzugen wenn:</span>
                <p className="text-xs text-slate-400 mt-1">
                  Standardprozesse ausreichen, schnelle Einführung gewünscht,
                  wenig eigene IT-Kapazität, Kosten planbar halten (OPEX)
                </p>
              </div>
              <div className="p-2 bg-green-900/20 rounded">
                <span className="text-green-300 font-medium">On-Premise bevorzugen wenn:</span>
                <p className="text-xs text-slate-400 mt-1">
                  Hoher Anpassungsbedarf (ABAP), volle Kontrolle über Updates und
                  Daten nötig, starke eigene IT-Abteilung vorhanden
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> Die Unterschiede Lizenzmodell, Update-Kontrolle und
            Anpassungsmöglichkeiten sind klausurrelevant. Cloud = weniger Kontrolle, weniger
            Aufwand. On-Premise = volle Kontrolle, mehr Verantwortung.
          </div>
        </div>
      ),
    },

    // ── 7. Datentypen in SAP ─────────────────────────
    {
      id: 'datentypen',
      title: 'Datentypen in SAP',
      content: (
        <div className="space-y-4">
          <p>
            SAP unterscheidet drei Datentypen, die aufeinander aufbauen:
            Organisationsdaten definieren die <em>Struktur</em>, Stammdaten leben
            <em> innerhalb</em> dieser Struktur, und Bewegungsdaten{' '}
            <em>referenzieren</em> beide bei jeder Transaktion.
          </p>

          <MermaidDiagram
            chart={dataTypesDiagram}
            className="bg-slate-800/50 rounded-lg p-4"
          />

          <div className="grid gap-3 md:grid-cols-3">
            <div className="p-3 bg-blue-900/30 rounded border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-1">Organisationsdaten</h4>
              <p className="text-xs text-slate-400">
                Bilden die <strong>Unternehmensstruktur</strong> ab (Mandant,
                Buchungskreis, Werk). Werden beim Systemaufbau einmalig
                angelegt und ändern sich nur bei Restrukturierungen.
              </p>
            </div>
            <div className="p-3 bg-green-900/30 rounded border border-green-700">
              <h4 className="font-medium text-green-300 mb-1">Stammdaten</h4>
              <p className="text-xs text-slate-400">
                <strong>Beschreibende Grunddaten</strong> zu Geschäftsobjekten
                (Kunden, Material, Lieferanten). Relativ stabil, aber
                nicht unveränderlich &mdash; z.B. neue Kundenadresse.
              </p>
            </div>
            <div className="p-3 bg-amber-900/30 rounded border border-amber-700">
              <h4 className="font-medium text-amber-300 mb-1">Bewegungsdaten</h4>
              <p className="text-xs text-slate-400">
                Entstehen aus <strong>Transaktionen</strong> (Bestellungen,
                Rechnungen, Lieferscheine). Kurzlebig, hochvolumig, und
                referenzieren immer Stamm- und Organisationsdaten.
              </p>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> Die Unterscheidung der drei Datentypen wird
            gerne über Beispiele abgefragt: &quot;Eine Kundenbestellung ist...?&quot;
            &rarr; Bewegungsdaten. &quot;Ein Kundenstammsatz ist...?&quot; &rarr; Stammdaten.
          </div>
        </div>
      ),
    },

  ],

  // ─────────────────────────────────────────────────
  // Quiz (platform questions only, no SD)
  // ─────────────────────────────────────────────────
  quiz: {
    questions: [
      {
        id: 'sap-mandant',
        type: 'multiple-choice',
        question:
          'Der Mandant ist die betriebswirtschaftlich kleinste organisatorische Einheit in einem SAP-System, für die eine vollständige Buchhaltung abgebildet werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation:
          'Der Mandant ist die GRÖSSTE Einheit (Konzern). Der BUCHUNGSKREIS ist die kleinste Einheit für vollständige Buchhaltung.',
      },
      {
        id: 'sap-hana',
        type: 'multiple-choice',
        question:
          'SAP HANA ist eine In-Memory Datenbank, bei der die Daten im Arbeitsspeicher liegen und daher extrem schnell verarbeitet werden können.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation:
          'Korrekt. HANA = High-Performance Analytic Appliance mit In-Memory-Technologie.',
      },
      {
        id: 'sap-fiori',
        type: 'multiple-choice',
        question:
          'SAP Fiori ist eine alte Benutzeroberfläche, die nur auf Desktop-Computern funktioniert.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation:
          'Fiori ist eine MODERNE, hardwareunabhängige Oberfläche (Desktop, Tablet, Smartphone).',
      },
      {
        id: 'sap-buchungskreis',
        type: 'multiple-choice',
        question:
          'Ein Buchungskreis ist die betriebswirtschaftlich kleinste Organisationseinheit, für die eine vollständige, in sich abgeschlossene Buchhaltung (Bilanz, GuV) abgebildet werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation:
          'Korrekt. Jeder Buchungskreis erstellt seine eigene Bilanz und GuV.',
      },
      {
        id: 'sap-org-hierarchy',
        type: 'multiple-choice',
        question:
          'Welche Reihenfolge der SAP-Organisationseinheiten ist korrekt (von der größten zur kleinsten)?',
        options: [
          'Mandant -> Buchungskreis -> Werk -> Lagerort',
          'Buchungskreis -> Mandant -> Werk -> Lagerort',
          'Werk -> Buchungskreis -> Mandant -> Lagerort',
          'Mandant -> Werk -> Buchungskreis -> Lagerort',
        ],
        correctAnswer: 'Mandant -> Buchungskreis -> Werk -> Lagerort',
        explanation:
          'Mandant (Konzern, größte Einheit) -> Buchungskreis (Firma mit eigener Bilanz) -> Werk (Produktionsstandort) -> Lagerort (physischer Lagerbereich).',
      },
      {
        id: 'sap-buchungskreis-detail',
        type: 'multiple-choice',
        question: 'Was zeichnet einen Buchungskreis in SAP aus?',
        options: [
          'Die kleinste Organisationseinheit, für die eine vollständige, in sich abgeschlossene Buchhaltung (Bilanz, GuV) abgebildet werden kann',
          'Die größte Organisationseinheit im SAP-System, die den gesamten Konzern repräsentiert',
          'Ein physischer Produktionsstandort mit eigenen Fertigungskapazitäten',
          'Eine logische Gruppierung von Materialien und Produkten',
        ],
        correctAnswer:
          'Die kleinste Organisationseinheit, für die eine vollständige, in sich abgeschlossene Buchhaltung (Bilanz, GuV) abgebildet werden kann',
        explanation:
          'Der Buchungskreis ist die betriebswirtschaftlich kleinste Einheit für vollständige Buchhaltung. Der MANDANT ist die größte Einheit.',
      },
      {
        id: 'sap-fiori-app-typ',
        type: 'multiple-choice',
        question:
          'Welcher SAP Fiori App-Typ bietet einen visuellen Überblick mit KPIs und Echtzeit-Daten?',
        options: [
          'Analytische Apps',
          'Transaktions-Apps',
          'Factsheet-Apps',
          'Workflow-Apps',
        ],
        correctAnswer: 'Analytische Apps',
        explanation:
          'Analytische Apps = KPIs, Dashboards, Echtzeit. Transaktions-Apps = Erstellen/Ändern/Anzeigen. Factsheet-Apps = Essenzielle Infos zu Objekten.',
      },
      {
        id: 'sap-hana-merkmal',
        type: 'multiple-choice',
        question: 'Welches Merkmal beschreibt SAP HANA korrekt?',
        options: [
          'In-Memory Datenbank mit spaltenorientierter Speicherung und paralleler Verarbeitung',
          'Traditionelle festplattenbasierte Datenbank mit zeilenorientierter Speicherung',
          'Eine reine Cloud-Datenbank ohne On-Premise-Option',
          'Ein reines Reporting-Tool ohne Transaktionsverarbeitung',
        ],
        correctAnswer:
          'In-Memory Datenbank mit spaltenorientierter Speicherung und paralleler Verarbeitung',
        explanation:
          'SAP HANA = In-Memory (Arbeitsspeicher), spaltenorientiert, komprimiert, parallel verarbeitet - extrem schnell.',
      },
      {
        id: 'sap-cloud-vs-onprem',
        type: 'multiple-choice',
        question:
          'Welche Aussage über SAP S/4HANA Cloud vs. On-Premise ist korrekt?',
        options: [
          'Cloud hat automatische Updates und limitierte Anpassung; On-Premise hat volle ABAP-Erweiterbarkeit',
          'On-Premise hat automatische Updates; Cloud ermöglicht volle ABAP-Erweiterbarkeit',
          'Beide Varianten bieten identische Anpassungsmöglichkeiten',
          'Cloud ist immer günstiger als On-Premise',
        ],
        correctAnswer:
          'Cloud hat automatische Updates und limitierte Anpassung; On-Premise hat volle ABAP-Erweiterbarkeit',
        explanation:
          'Cloud = Subscription, automatische Updates (Quartal), limitierte Anpassung (In-App). On-Premise = eigene HW, kontrollierte Updates, volle ABAP-Erweiterbarkeit.',
      },
      {
        id: 'sap-stamm-vs-beweg-vs-org',
        type: 'multiple-choice',
        question: 'Eine Kundenbestellung in SAP ist ein Beispiel für ...',
        options: [
          'Bewegungsdaten',
          'Stammdaten',
          'Organisationsdaten',
          'Konfigurationsdaten',
        ],
        correctAnswer: 'Bewegungsdaten',
        explanation:
          'Bewegungsdaten = kurzlebige Transaktionsdaten (Bestellungen, Rechnungen). Stammdaten = langfristige Grunddaten (Kunden, Material). Organisationsdaten = Unternehmensstruktur.',
      },
      {
        id: 'sap-fiori-design-principles',
        type: 'multiple-choice',
        question:
          'Welches ist KEIN offizielles SAP Fiori Design Principle?',
        options: [
          'Scalable',
          'Role-based',
          'Responsive',
          'Simple',
        ],
        correctAnswer: 'Scalable',
        explanation:
          'Die 5 Fiori Design Principles sind: Role-based, Responsive, Simple, Coherent, Delightful. "Scalable" gehört nicht dazu.',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // Exam Tasks (platform only)
  // ─────────────────────────────────────────────────
  examTasks: [
    {
      id: 'sap-s4hana-plattform-task',
      title: 'SAP S/4HANA Plattform',
      points: 25,
      context: (
        <p>
          Ein Mittelständler plant die Migration zu SAP S/4HANA und muss grundlegende
          Plattform-Entscheidungen treffen.
        </p>
      ),
      parts: [
        {
          id: 'sap-plattform-task-a',
          type: 'free-text',
          question:
            'Vergleichen Sie die Deployment-Varianten On-Premise und Cloud anhand von mindestens 4 Kriterien. (12 Punkte)',
          placeholder: 'Cloud:...',
          modelAnswer:
            'Cloud: Subscription-Lizenzmodell, automatische Updates (quartalweise), limitierte Anpassung (In-App), SAP-Hardware.\nOn-Premise: Traditionelle Lizenz, kontrollierte Updates, volle ABAP-Erweiterbarkeit, eigene Hardware am Firmenstandort.',
          keyPoints: [
            'Lizenzmodell unterschieden',
            'Updates unterschieden',
            'Anpassungsmöglichkeiten unterschieden',
            'Hardware unterschieden',
          ],
          explanation:
            'Die Wahl zwischen Cloud und On-Premise hängt von den individuellen Anforderungen ab.',
        },
        {
          id: 'sap-plattform-task-b',
          type: 'free-text',
          question:
            'Erläutern Sie die SAP-Organisationseinheiten-Hierarchie (Mandant bis Lagerort) und erklären Sie, welche Einheit für die vollständige Buchhaltung relevant ist. (13 Punkte)',
          placeholder: 'Die Hierarchie beginnt mit...',
          modelAnswer:
            'Hierarchie: Mandant (Konzern, größte Einheit) -> Buchungskreis (Firma) -> Werk (Standort) -> Lagerort (physischer Lagerbereich). Der BUCHUNGSKREIS ist die kleinste Organisationseinheit, für die eine vollständige, in sich abgeschlossene Buchhaltung (Bilanz, GuV) abgebildet werden kann.',
          keyPoints: [
            'Hierarchie korrekt: Mandant > Buchungskreis > Werk > Lagerort',
            'Buchungskreis als kleinste Einheit für Buchhaltung identifiziert',
          ],
          explanation:
            'Die Organisationseinheiten bilden das Rückgrat jeder SAP-Implementierung.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────
  // Connection Diagram & Related Topics
  // ─────────────────────────────────────────────────
  connectionDiagram: `
flowchart LR
  subgraph Grundlagen["Grundlagen"]
    ERP["ERP-Systeme"]
  end

  subgraph SAP["SAP Plattform"]
    PLAT["SAP S/4HANA\nPlattform"]
  end

  subgraph Anwendung["Anwendung"]
    SD["SAP SD\nVertrieb"]
  end

  subgraph Management["Management"]
    PCM["Projekt- &\nChange-Management"]
  end

  ERP -->|"SAP ist\nMarktführer"| PLAT
  PLAT -->|"Vertriebsprozess\nals Beispiel"| SD
  PLAT -->|"Einführung\nals Projekt"| PCM

  style ERP fill:#14532d,stroke:#22c55e,color:#f8fafc
  style PLAT fill:#1e40af,stroke:#3b82f6,color:#f8fafc
  style SD fill:#581c87,stroke:#a855f7,color:#f8fafc
  style PCM fill:#78350f,stroke:#f59e0b,color:#f8fafc
`,

  relatedTopics: [
    {
      id: 'erp-systeme',
      title: 'ERP-Systeme',
      relationship: 'SAP ist der Marktführer im ERP-Umfeld',
    },
    {
      id: 'sap-sd-vertrieb',
      title: 'SAP SD Vertrieb',
      relationship: 'Der Vertriebsprozess als konkretes Anwendungsbeispiel',
    },
    {
      id: 'projekt-change-management',
      title: 'Projekt- & Change-Management',
      relationship: 'SAP-Einführung ist ein komplexes Projekt',
    },
  ],
}
