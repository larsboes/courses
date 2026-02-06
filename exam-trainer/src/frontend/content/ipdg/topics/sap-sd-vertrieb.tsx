// src/content/ipdg/topics/sap-sd-vertrieb.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'

// ─────────────────────────────────────────────────
// Mermaid Diagrams
// ─────────────────────────────────────────────────

const kundenauftragStrukturDiagram = `
graph TD
  Kopf["Kopfbereich\\n(Auftraggeber, Warenempfänger,\\nGesamtkonditionen)"]
  Pos1["Position 1\\n(Material A, Menge, Preis)"]
  Pos2["Position 2\\n(Material B, Menge, Preis)"]
  LPE1["Lieferplaneinteilung 1\\n(Menge: 50, Termin: 15.03.)"]
  LPE2["Lieferplaneinteilung 2\\n(Menge: 50, Termin: 01.04.)"]
  LPE3["Lieferplaneinteilung 1\\n(Menge: 100, Termin: 20.03.)"]
  Kopf --> Pos1
  Kopf --> Pos2
  Pos1 --> LPE1
  Pos1 --> LPE2
  Pos2 --> LPE3
  style Kopf fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style Pos1 fill:#14532d,stroke:#22c55e,color:#dcfce7
  style Pos2 fill:#14532d,stroke:#22c55e,color:#dcfce7
  style LPE1 fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style LPE2 fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style LPE3 fill:#78350f,stroke:#f59e0b,color:#fef3c7
`

const terminierungDiagram = `
graph LR
  subgraph rueck["Rückwärtsterminierung (Standard)"]
    direction RL
    WLD["Wunschlieferdatum\\n(vom Kunden)"]
    Transit["- Transitzeit"]
    Lade["- Ladezeit"]
    TransVL["- Transportdispo.\\nVorlaufzeit"]
    Richt["- Richtzeit\\n(Materialbereitstellung)"]
    MBD["= Materialbereit-\\nstellungsdatum"]
    WLD --> Transit --> Lade --> TransVL --> Richt --> MBD
  end
  subgraph vorw["Vorwärtsterminierung (Fallback)"]
    direction LR
    Heute["Heute\\n(Tagesdatum)"]
    R2["+ Richtzeit"]
    TV2["+ Transportdispo.\\nVorlaufzeit"]
    L2["+ Ladezeit"]
    T2["+ Transitzeit"]
    NLD["= Neues\\nLieferdatum"]
    Heute --> R2 --> TV2 --> L2 --> T2 --> NLD
  end
  MBD -.->|"liegt in der\\nVergangenheit?"| Heute
  style WLD fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style MBD fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
  style Heute fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style NLD fill:#14532d,stroke:#22c55e,color:#dcfce7
`

const verfuegbarkeitDiagram = `
graph TD
  VP["Verfügbarkeitsprüfung"]
  Q{"Alles sofort\\nverfügbar?"}
  VP --> Q
  Q -->|"Ja"| EL["Einmallieferung\\n(alles auf einmal)"]
  Q -->|"Nein"| Q2{"Kunde will\\nwarten?"}
  Q2 -->|"Ja, komplett"| KL["Komplettlieferung\\n(warten bis alles da)"]
  Q2 -->|"Nein, Teile ok"| LV["Liefervorschlag\\n(Teillieferungen)"]
  style VP fill:#312e81,stroke:#6366f1,color:#e0e7ff
  style EL fill:#14532d,stroke:#22c55e,color:#dcfce7
  style KL fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style LV fill:#581c87,stroke:#a855f7,color:#f3e8ff
`

const preisfindungDiagram = `
graph TD
  KT["Konditionstechnik\\n(automatische Preisfindung)"]
  BP["Bruttopreis\\n(Grundpreis PR00)"]
  R["- Rabatte\\n(z.B. Kundenrabatt,\\nMaterialrabatt)"]
  Z["+ Zuschläge\\n(z.B. Fracht,\\nVerpackung)"]
  NP["= Nettopreis"]
  KT --> BP --> R --> Z --> NP
  subgraph quellen["Konditionsquellen"]
    K1["Kundenstamm"]
    K2["Materialstamm"]
    K3["Preislisten"]
    K4["Kundenvereinbarungen"]
  end
  quellen -.->|"füttert"| KT
  style KT fill:#312e81,stroke:#6366f1,color:#e0e7ff
  style BP fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style R fill:#14532d,stroke:#22c55e,color:#dcfce7
  style Z fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style NP fill:#581c87,stroke:#a855f7,color:#f3e8ff
`

const kreditpruefungDiagram = `
graph LR
  KA["Kundenauftrag\\nerfasst"]
  KP{"Automatische\\nKreditprüfung"}
  KL["Kreditlimit\\ndes Kunden"]
  OS["Offene\\nPosten"]
  AW["Auftragswert"]
  KA --> KP
  KL --> KP
  OS --> KP
  AW --> KP
  KP -->|"Limit OK"| OK["Auftrag\\nfreigegeben"]
  KP -->|"Limit überschritten"| BL["Auftrag\\nGESPERRT"]
  BL --> PR["Manuelle Prüfung\\ndurch Kreditmanagement"]
  PR -->|"Freigabe"| OK
  PR -->|"Ablehnung"| AB["Auftrag\\nabgelehnt"]
  style KA fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style OK fill:#14532d,stroke:#22c55e,color:#dcfce7
  style BL fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
  style AB fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
`

const versandProzessDiagram = `
graph LR
  KA["Kundenauftrag"]
  LE["Lieferung\\nerstellen"]
  LB["Lieferbeleg"]
  RF["Routenfindung\\n(automatisch)"]
  KA --> LE
  LE --> LB
  LE --> RF
  RF --> VS["Versandstelle"]
  RF --> TM["Transportmittel"]
  style KA fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style LB fill:#312e81,stroke:#6366f1,color:#e0e7ff
  style RF fill:#78350f,stroke:#f59e0b,color:#fef3c7
`

const kommissionierungDiagram = `
graph LR
  LB["Lieferbeleg"]
  KO["Kommissionierung\\n(Picking)"]
  TO["Transportauftrag\\n(Transfer Order)"]
  LP["Lagerplatz\\n(Entnahme)"]
  WA["Bereitstellzone\\n(Warenausgang)"]
  LB --> KO
  KO --> TO
  TO --> LP
  LP -->|"Material entnehmen"| WA
  style LB fill:#312e81,stroke:#6366f1,color:#e0e7ff
  style KO fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style TO fill:#164e63,stroke:#06b6d4,color:#cffafe
  style LP fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style WA fill:#14532d,stroke:#22c55e,color:#dcfce7
`

const ladenTransportDiagram = `
graph LR
  KOM["Kommissioniert"]
  VP["Verpacken\\n(Handling Units)"]
  LA["Laden\\n(auf Transportmittel)"]
  WA["Warenausgang\\n(Bestandsreduzierung)"]
  TR["Transport\\n(zum Kunden)"]
  KOM --> VP --> LA --> WA --> TR
  WA -.->|"Buchung"| FI["Bestandsbuchung\\n(MM/FI)"]
  style KOM fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style VP fill:#164e63,stroke:#06b6d4,color:#cffafe
  style LA fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style WA fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
  style TR fill:#14532d,stroke:#22c55e,color:#dcfce7
  style FI fill:#581c87,stroke:#a855f7,color:#f3e8ff
`

// ─────────────────────────────────────────────────
// Topic Definition
// ─────────────────────────────────────────────────

export const sapSdVertriebTopic: Topic = {
  id: 'sap-sd-vertrieb',
  title: 'SAP SD - Vertriebsprozess',
  description: 'Kundenauftrag, Terminierung, Verfügbarkeitsprüfung, Preisfindung, Kreditprüfung, Versand & Kommissionierung',
  icon: '📦',
  examNotes: 'Lieferplaneinteilung-Struktur kennen! Rückwärts- vs Vorwärtsterminierung! 3 Lieferoptionen unterscheiden! Konditionstechnik (Brutto - Rabatte + Zuschläge = Netto)! Kreditprüfung: Limit überschritten = Auftrag gesperrt!',

  connectionDiagram: `
graph LR
  EA["Enterprise Architecture\\n(E2E-Konzept)"]
  SD["SAP SD\\nVertriebsprozess"]
  SP["SAP S/4HANA\\n(Plattform)"]
  ERP["ERP-Systeme\\n(Grundlagen)"]
  EA -->|"generischer O2C"| SD
  SP -->|"läuft auf"| SD
  ERP -->|"Modul von"| SD
  style SD fill:#312e81,stroke:#6366f1,color:#e0e7ff
`,

  sections: [
    // ── Section 1: Der Kundenauftrag ──
    {
      id: 'sd-kundenauftrag',
      title: 'Der Kundenauftrag',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200">
              Der <strong>Kundenauftrag</strong> ist der zentrale Beleg im SAP SD Vertriebsprozess.
              Er wird aus einer Kundenanfrage oder einem Angebot erstellt und löst automatisch
              Terminierung, Verfügbarkeitsprüfung, Preisfindung und Kreditprüfung aus.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">3-Ebenen-Struktur des Kundenauftrags:</h4>
            <div className="space-y-2">
              <div className="p-2 bg-blue-900/30 rounded border-l-4 border-blue-500">
                <span className="font-medium text-blue-300">Kopfbereich</span>
                <span className="text-sm text-slate-400 ml-2">Auftraggeber, Warenempfänger, Gesamtkonditionen</span>
              </div>
              <div className="p-2 bg-green-900/30 rounded border-l-4 border-green-500 ml-4">
                <span className="font-medium text-green-300">Position(en)</span>
                <span className="text-sm text-slate-400 ml-2">Material, Menge, Positionspreis</span>
              </div>
              <div className="p-2 bg-amber-900/30 rounded border-l-4 border-amber-500 ml-8">
                <span className="font-medium text-amber-300">Lieferplaneinteilung(en)</span>
                <span className="text-sm text-slate-400 ml-2">Liefermengen und Liefertermine pro Position</span>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={kundenauftragStrukturDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Lieferplaneinteilung im Detail:</h4>
            <p className="text-sm text-slate-400 mb-3">
              Jede <strong className="text-amber-300">Position</strong> kann mehrere Lieferplaneinteilungen haben.
              Jede Einteilung legt eine <strong className="text-amber-300">Teilmenge</strong> und einen{' '}
              <strong className="text-amber-300">Liefertermin</strong> fest.
            </p>
            <div className="text-sm text-slate-400">
              <p>Beispiel: Position 1 = 100 Stück Material A</p>
              <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li>Einteilung 1: 50 Stück am 15.03.</li>
                <li>Einteilung 2: 50 Stück am 01.04.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Die 3-Ebenen-Struktur (Kopf &rarr; Position &rarr; Lieferplaneinteilung)
              wird gerne abgefragt! Lieferplaneinteilungen bestimmen WANN und WIEVIEL geliefert wird.
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 2: Terminierung ──
    {
      id: 'sd-terminierung',
      title: 'Terminierung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Bei der Auftragserfassung berechnet SAP automatisch die Termine für die
              Lieferplaneinteilungen. Dabei werden <strong>Richtzeit</strong>,{' '}
              <strong>Transportdispositions-Vorlaufzeit</strong>, <strong>Ladezeit</strong> und{' '}
              <strong>Transitzeit</strong> berücksichtigt.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-2">Rückwärtsterminierung (Standard)</h4>
              <p className="text-sm text-slate-400">
                Vom <strong className="text-blue-200">Wunschlieferdatum</strong> des Kunden wird{' '}
                <strong className="text-blue-200">zurückgerechnet</strong>:
              </p>
              <ul className="text-xs text-slate-400 mt-2 space-y-1 list-disc list-inside">
                <li>Wunschlieferdatum - Transitzeit</li>
                <li>- Ladezeit</li>
                <li>- Transportdispo-Vorlaufzeit</li>
                <li>- Richtzeit (Materialbereitstellung)</li>
                <li>= <strong className="text-blue-200">Materialbereitstellungsdatum</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
              <h4 className="font-medium text-amber-300 mb-2">Vorwärtsterminierung (Fallback)</h4>
              <p className="text-sm text-slate-400">
                Wenn das Materialbereitstellungsdatum{' '}
                <strong className="text-amber-200">in der Vergangenheit</strong> liegt:
              </p>
              <ul className="text-xs text-slate-400 mt-2 space-y-1 list-disc list-inside">
                <li>Ab <strong className="text-amber-200">heute</strong> vorwärts rechnen</li>
                <li>+ Richtzeit + Transportdispo-Vorlaufzeit</li>
                <li>+ Ladezeit + Transitzeit</li>
                <li>= <strong className="text-amber-200">Neues Lieferdatum</strong></li>
              </ul>
            </div>
          </div>

          <MermaidDiagram chart={terminierungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Die 4 relevanten Zeiten:</h4>
            <div className="grid gap-2 text-sm">
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Richtzeit</span>
                <span className="text-slate-400 ml-2">- Material im Lager bereitstellen</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Transportdispo-Vorlaufzeit</span>
                <span className="text-slate-400 ml-2">- Transport organisieren</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Ladezeit</span>
                <span className="text-slate-400 ml-2">- Ware auf Transportmittel laden</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Transitzeit</span>
                <span className="text-slate-400 ml-2">- Transport zum Kunden</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Rückwärtsterminierung = Standard (vom Wunschdatum zurück).
              Vorwärtsterminierung = Fallback, nur wenn Rückwärts ein Datum in der Vergangenheit
              ergibt. Dann wird ab HEUTE vorwärts gerechnet.
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 3: Verfuegbarkeitspruefung ──
    {
      id: 'sd-verfuegbarkeit',
      title: 'Verfügbarkeitsprüfung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Nach der Terminierung prüft SAP, ob das Material zum ermittelten Termin
              verfügbar ist. Je nach Ergebnis stehen <strong>drei Lieferoptionen</strong> zur Verfügung.
            </p>
          </div>

          <MermaidDiagram chart={verfuegbarkeitDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="grid gap-4">
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-medium text-green-300 mb-2">Einmallieferung</h4>
              <p className="text-sm text-slate-400">
                Gesamte Bestellmenge wird <strong className="text-green-200">auf einmal</strong> geliefert.
              </p>
              <p className="text-xs text-green-400 mt-1">Voraussetzung: Alles ist sofort verfügbar.</p>
            </div>
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-2">Komplettlieferung</h4>
              <p className="text-sm text-slate-400">
                <strong className="text-blue-200">Warten</strong> bis alles verfügbar ist, dann komplett liefern.
              </p>
              <p className="text-xs text-blue-400 mt-1">Kunde akzeptiert Verzögerung, will aber alles auf einmal.</p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
              <h4 className="font-medium text-purple-300 mb-2">Liefervorschlag (Teillieferungen)</h4>
              <p className="text-sm text-slate-400">
                Was verfügbar ist wird <strong className="text-purple-200">sofort geliefert</strong>, Rest wird nachgeliefert.
              </p>
              <p className="text-xs text-purple-400 mt-1">Flexibelste Option - erzeugt mehrere Lieferbelege.</p>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Die 3 Optionen klar unterscheiden!
              Einmallieferung = sofort komplett. Komplettlieferung = später komplett.
              Liefervorschlag = Teillieferungen erlaubt.
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 4: Preisfindung ── (NEW)
    {
      id: 'sd-preisfindung',
      title: 'Preisfindung (Konditionstechnik)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              SAP ermittelt den Preis im Kundenauftrag <strong>automatisch</strong> über die{' '}
              <strong>Konditionstechnik</strong>. Dabei werden verschiedene Konditionsarten
              (Grundpreis, Rabatte, Zuschläge) zu einem Nettopreis verrechnet.
            </p>
          </div>

          <MermaidDiagram chart={preisfindungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Preisberechnung im Kundenauftrag:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                <span className="text-blue-300 font-mono font-medium w-24">Bruttopreis</span>
                <span className="text-sm text-slate-400">Grundpreis (Konditionsart PR00) aus Materialstamm oder Preisliste</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                <span className="text-green-300 font-mono font-medium w-24">- Rabatte</span>
                <span className="text-sm text-slate-400">Kundenrabatt, Materialrabatt, Mengenrabatt, Aktionsrabatt</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-amber-900/30 rounded">
                <span className="text-amber-300 font-mono font-medium w-24">+ Zuschläge</span>
                <span className="text-sm text-slate-400">Fracht, Verpackung, Versicherung, Mindermengenzuschlag</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-900/30 rounded border-2 border-purple-600">
                <span className="text-purple-300 font-mono font-bold w-24">= Nettopreis</span>
                <span className="text-sm text-slate-400">Endgültiger Preis für den Kunden</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Konditionstechnik - Ablauf:</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-cyan-400 font-medium">1. Zugriffsfolge:</span>{' '}
                SAP sucht Konditionen in definierter Reihenfolge (Kunde, Material, Preisliste...)
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-cyan-400 font-medium">2. Konditionsarten:</span>{' '}
                Jede Art (PR00, K004, K007...) hat eigene Rechenregel (absolut, prozentual, gestaffelt)
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-cyan-400 font-medium">3. Preisschema:</span>{' '}
                Definiert die Reihenfolge und Verrechnung aller Konditionsarten zum Endpreis
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Konditionstechnik = automatische Preisfindung in SAP.
              Formel merken: Bruttopreis - Rabatte + Zuschläge = Nettopreis.
              Preisfindung läuft automatisch bei Kundenauftragserfassung!
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 5: Kreditpruefung ── (NEW)
    {
      id: 'sd-kreditpruefung',
      title: 'Kreditprüfung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Bei der Auftragserfassung führt SAP eine <strong>automatische Kreditprüfung</strong> durch.
              Das System vergleicht den Auftragswert mit dem <strong>Kreditlimit</strong> des Kunden
              und berücksichtigt offene Posten.
            </p>
          </div>

          <MermaidDiagram chart={kreditpruefungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Kreditprüfung - Ablauf:</h4>
            <div className="space-y-2">
              <div className="p-2 bg-slate-700/50 rounded text-sm">
                <span className="text-cyan-400 font-medium">1. Kreditlimit festgelegt:</span>
                <span className="text-slate-400 ml-2">Maximaler Kreditrahmen pro Kunde im Kundenstamm</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded text-sm">
                <span className="text-cyan-400 font-medium">2. Automatische Prüfung:</span>
                <span className="text-slate-400 ml-2">Offene Posten + Auftragswert &le; Kreditlimit?</span>
              </div>
              <div className="p-2 bg-green-900/30 rounded text-sm">
                <span className="text-green-400 font-medium">3a. Limit OK:</span>
                <span className="text-slate-400 ml-2">Auftrag wird freigegeben</span>
              </div>
              <div className="p-2 bg-red-900/30 rounded text-sm">
                <span className="text-red-400 font-medium">3b. Limit überschritten:</span>
                <span className="text-slate-400 ml-2">Auftrag wird GESPERRT (Kreditsperre)</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded text-sm">
                <span className="text-cyan-400 font-medium">4. Manuelle Freigabe:</span>
                <span className="text-slate-400 ml-2">Kreditmanagement prüft und entscheidet</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Kreditprüfung = automatisch bei Auftragserfassung.
              Wenn Kreditlimit überschritten &rarr; Auftrag wird gesperrt &rarr; manuelle Prüfung nötig.
              Formel: Offene Posten + Auftragswert muss kleiner/gleich Kreditlimit sein!
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 6: Versand - Lieferung erstellen ──
    {
      id: 'sd-versand-lieferung',
      title: 'Versand - Lieferung erstellen',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Nach Freigabe des Kundenauftrags wird eine <strong>Lieferung</strong> erstellt.
              SAP erzeugt einen <strong>Lieferbeleg</strong> und ermittelt automatisch die{' '}
              <strong>Route</strong> und <strong>Versandstelle</strong>.
            </p>
          </div>

          <MermaidDiagram chart={versandProzessDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-2">Lieferbeleg</h4>
              <p className="text-sm text-slate-400">
                Zentrales Dokument für den Versandprozess. Enthält Materialien, Mengen,
                Liefertermin und steuert alle Folgeprozesse (Kommissionierung, Verpackung, Warenausgang).
              </p>
            </div>
            <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
              <h4 className="font-medium text-amber-300 mb-2">Routenfindung</h4>
              <p className="text-sm text-slate-400">
                SAP ermittelt automatisch die <strong className="text-amber-200">Route</strong> basierend auf
                Versandstelle (Absender), Warenempfänger (Empfänger) und Transportgruppe.
                Die Route bestimmt Transitzeit und Transportkosten.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Routenfindung bestimmt durch:</h4>
            <div className="grid gap-2 text-sm">
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Versandstelle</span>
                <span className="text-slate-400 ml-2">- Wo wird versendet? (Abgangsort)</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Warenempfänger</span>
                <span className="text-slate-400 ml-2">- Wohin wird geliefert? (Zielort)</span>
              </div>
              <div className="p-2 bg-slate-700/50 rounded">
                <span className="text-green-400 font-medium">Transportgruppe</span>
                <span className="text-slate-400 ml-2">- Wie wird transportiert? (LKW, Bahn, Schiff...)</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Der Lieferbeleg steuert alle Folgeprozesse!
              Routenfindung = automatisch anhand von Versandstelle + Warenempfänger + Transportgruppe.
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 7: Kommissionierung ──
    {
      id: 'sd-kommissionierung',
      title: 'Kommissionierung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              <strong>Kommissionierung</strong> (Picking) ist das Zusammenstellen der bestellten Materialien
              im Lager. SAP erstellt dafür einen <strong>Transportauftrag</strong> (Transfer Order),
              der den Lagerarbeiter vom Lagerplatz zur Bereitstellzone führt.
            </p>
          </div>

          <MermaidDiagram chart={kommissionierungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Kommissionierung - Ablauf:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-700 rounded-full text-sm font-bold text-blue-100">1</span>
                <div>
                  <h5 className="font-medium text-blue-300">Lieferbeleg als Basis</h5>
                  <p className="text-xs text-slate-400">Aus dem Lieferbeleg wird ersichtlich, welche Materialien in welcher Menge benötigt werden.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-cyan-700 rounded-full text-sm font-bold text-cyan-100">2</span>
                <div>
                  <h5 className="font-medium text-cyan-300">Transportauftrag erstellen</h5>
                  <p className="text-xs text-slate-400">SAP erzeugt einen Transportauftrag (Transfer Order) mit Entnahme- und Einlagerplatz.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-amber-700 rounded-full text-sm font-bold text-amber-100">3</span>
                <div>
                  <h5 className="font-medium text-amber-300">Material entnehmen</h5>
                  <p className="text-xs text-slate-400">Lagerarbeiter entnimmt Material vom Lagerplatz und bringt es zur Bereitstellzone (Warenausgangszone).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-green-700 rounded-full text-sm font-bold text-green-100">4</span>
                <div>
                  <h5 className="font-medium text-green-300">Quittierung</h5>
                  <p className="text-xs text-slate-400">Transportauftrag wird quittiert - die Kommissionierung ist abgeschlossen.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Kommissionierung = Picking im Lager. Wird über einen Transportauftrag
              (Transfer Order) gesteuert. Material geht vom Lagerplatz zur Bereitstellzone.
            </p>
          </div>
        </div>
      ),
    },

    // ── Section 8: Laden, Verpacken & Transport ──
    {
      id: 'sd-laden-transport',
      title: 'Laden, Verpacken & Transport',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Nach der Kommissionierung folgen <strong>Verpacken</strong>, <strong>Laden</strong> auf
              das Transportmittel und der <strong>Warenausgang</strong> (Bestandsreduzierung).
              Danach beginnt der <strong>Transport</strong> zum Kunden.
            </p>
          </div>

          <MermaidDiagram chart={ladenTransportDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-cyan-900/20 rounded-lg border border-cyan-800">
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-cyan-700 rounded-full text-sm font-bold text-cyan-100">1</span>
              <div>
                <h5 className="font-medium text-cyan-300">Verpacken</h5>
                <p className="text-xs text-slate-400">Material wird in Handling Units (Packeinheiten) verpackt. SAP dokumentiert welches Material in welcher Verpackung ist.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-amber-700 rounded-full text-sm font-bold text-amber-100">2</span>
              <div>
                <h5 className="font-medium text-amber-300">Laden</h5>
                <p className="text-xs text-slate-400">Verpackte Ware wird auf das Transportmittel (LKW, Container...) verladen.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-red-700 rounded-full text-sm font-bold text-red-100">3</span>
              <div>
                <h5 className="font-medium text-red-300">Warenausgang</h5>
                <p className="text-xs text-slate-400">
                  <strong>Entscheidender Schritt:</strong> Bestand wird reduziert, Materialbeleg wird erzeugt,
                  buchhalterisch findet der Besitzübergang statt. Automatische Buchung in MM und FI.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-green-700 rounded-full text-sm font-bold text-green-100">4</span>
              <div>
                <h5 className="font-medium text-green-300">Transport</h5>
                <p className="text-xs text-slate-400">Ware wird zum Kunden transportiert. Die Route und Transitzeit wurden bereits bei der Liefererstellung ermittelt.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/30 rounded border border-amber-600">
            <p className="text-amber-300 text-sm font-medium">
              Klausur-Hinweis: Der Warenausgang ist der buchhalterisch entscheidende Schritt -
              hier findet die Bestandsreduzierung und der Besitzübergang statt!
              Reihenfolge: Kommissionierung &rarr; Verpacken &rarr; Laden &rarr; Warenausgang &rarr; Transport.
            </p>
          </div>
        </div>
      ),
    },
  ],

  // ─────────────────────────────────────────────────
  // Quiz Questions (exam-focused, rewritten)
  // ─────────────────────────────────────────────────
  quiz: {
    questions: [
      {
        id: 'sd-kundenauftrag-struktur',
        type: 'multiple-choice',
        question: 'Aus welchen drei Ebenen besteht ein Kundenauftrag in SAP SD?',
        options: [
          'Kopfbereich, Position(en), Lieferplaneinteilung(en)',
          'Mandant, Buchungskreis, Vertriebsbereich',
          'Anfrage, Angebot, Bestellung',
          'Material, Menge, Preis',
        ],
        correctAnswer: 'Kopfbereich, Position(en), Lieferplaneinteilung(en)',
        explanation: 'Kundenauftrag: Kopf (Kundendaten, Gesamtkonditionen) \u2192 Position (Material, Menge) \u2192 Lieferplaneinteilung (Liefermengen und -termine pro Position).',
      },
      {
        id: 'sd-lieferplaneinteilung',
        type: 'multiple-choice',
        question: 'Was wird in einer Lieferplaneinteilung festgelegt?',
        options: [
          'Die Liefermenge und der Liefertermin für eine Position',
          'Die Route und das Transportmittel',
          'Der Bruttopreis und die Rabatte',
          'Das Kreditlimit des Kunden',
        ],
        correctAnswer: 'Die Liefermenge und der Liefertermin für eine Position',
        explanation: 'Jede Position kann mehrere Lieferplaneinteilungen haben. Jede Einteilung definiert eine Teilmenge und einen Liefertermin.',
      },
      {
        id: 'sd-terminierung',
        type: 'multiple-choice',
        question: 'Was passiert bei der Vorwärtsterminierung in SAP SD?',
        options: [
          'Wenn die Rückwärtsterminierung ein Datum in der Vergangenheit ergibt, wird ab heute ein neues Lieferdatum vorwärts berechnet',
          'Das Lieferdatum wird automatisch um 7 Tage verlängert',
          'Der Kundenauftrag wird storniert',
          'Die Preisfindung wird neu berechnet',
        ],
        correctAnswer: 'Wenn die Rückwärtsterminierung ein Datum in der Vergangenheit ergibt, wird ab heute ein neues Lieferdatum vorwärts berechnet',
        explanation: 'Rückwärtsterminierung: vom Wunschlieferdatum zurückrechnen. Wenn das Materialbereitstellungsdatum in der Vergangenheit liegt \u2192 Vorwärtsterminierung: ab heute vorwärts rechnen.',
      },
      {
        id: 'sd-rueckwaerts',
        type: 'multiple-choice',
        question: 'Was ist der Ausgangspunkt der Rückwärtsterminierung?',
        options: [
          'Das Wunschlieferdatum des Kunden',
          'Das heutige Tagesdatum',
          'Das Materialbereitstellungsdatum',
          'Das Bestelldatum des Kundenauftrags',
        ],
        correctAnswer: 'Das Wunschlieferdatum des Kunden',
        explanation: 'Bei der Rückwärtsterminierung wird vom Wunschlieferdatum des Kunden zurückgerechnet (abzüglich Transitzeit, Ladezeit, Transportdispo-Vorlaufzeit, Richtzeit), um das Materialbereitstellungsdatum zu ermitteln.',
      },
      {
        id: 'sd-verfuegbarkeit',
        type: 'multiple-choice',
        question: 'Welche Liefermethode ermöglicht Teillieferungen, wenn nicht alle Materialien sofort verfügbar sind?',
        options: [
          'Liefervorschlag',
          'Einmallieferung',
          'Komplettlieferung',
          'Sofortlieferung',
        ],
        correctAnswer: 'Liefervorschlag',
        explanation: 'Liefervorschlag = Teillieferungen möglich (was da ist wird geliefert, Rest nachgeliefert). Einmallieferung = alles auf einmal. Komplettlieferung = warten bis alles verfügbar, dann komplett.',
      },
      {
        id: 'sd-komplettlieferung',
        type: 'multiple-choice',
        question: 'Was bedeutet "Komplettlieferung" bei der Verfügbarkeitsprüfung?',
        options: [
          'Es wird gewartet bis alle Materialien verfügbar sind, dann wird komplett geliefert',
          'Alle Materialien werden sofort geliefert',
          'Es werden Teillieferungen durchgeführt',
          'Die Lieferung wird storniert',
        ],
        correctAnswer: 'Es wird gewartet bis alle Materialien verfügbar sind, dann wird komplett geliefert',
        explanation: 'Komplettlieferung = Der Kunde akzeptiert eine Verzögerung, will aber alles auf einmal erhalten. Es wird gewartet bis die gesamte Menge verfügbar ist.',
      },
      {
        id: 'sd-preisfindung',
        type: 'multiple-choice',
        question: 'Wie lautet die Formel der Preisfindung in SAP SD?',
        options: [
          'Bruttopreis - Rabatte + Zuschläge = Nettopreis',
          'Nettopreis + Rabatte - Zuschläge = Bruttopreis',
          'Grundpreis + Rabatte + Zuschläge = Endpreis',
          'Einkaufspreis + Marge = Verkaufspreis',
        ],
        correctAnswer: 'Bruttopreis - Rabatte + Zuschläge = Nettopreis',
        explanation: 'Die Konditionstechnik berechnet: Bruttopreis (Grundpreis PR00) - Rabatte (Kundenrabatt, Materialrabatt...) + Zuschläge (Fracht, Verpackung...) = Nettopreis.',
      },
      {
        id: 'sd-konditionstechnik',
        type: 'multiple-choice',
        question: 'Was ist die "Konditionstechnik" in SAP SD?',
        options: [
          'Das automatische Verfahren zur Preisfindung im Kundenauftrag',
          'Die manuelle Eingabe von Preisen durch den Sachbearbeiter',
          'Die Berechnung der Transitzeit für den Transport',
          'Die Methode zur Kreditprüfung',
        ],
        correctAnswer: 'Das automatische Verfahren zur Preisfindung im Kundenauftrag',
        explanation: 'Die Konditionstechnik ist das SAP-Verfahren zur automatischen Preisfindung. Sie ermittelt über Zugriffsfolgen und Konditionsarten den Preis bei der Kundenauftragserfassung.',
      },
      {
        id: 'sd-kreditpruefung',
        type: 'multiple-choice',
        question: 'Was passiert, wenn bei der automatischen Kreditprüfung das Kreditlimit überschritten wird?',
        options: [
          'Der Kundenauftrag wird gesperrt und muss manuell freigegeben werden',
          'Der Kundenauftrag wird automatisch storniert',
          'Der Preis wird automatisch reduziert',
          'Die Lieferung wird auf Vorkasse umgestellt',
        ],
        correctAnswer: 'Der Kundenauftrag wird gesperrt und muss manuell freigegeben werden',
        explanation: 'Wenn Offene Posten + Auftragswert > Kreditlimit, wird der Auftrag gesperrt (Kreditsperre). Das Kreditmanagement muss dann manuell prüfen und ggf. freigeben.',
      },
      {
        id: 'sd-routenfindung',
        type: 'multiple-choice',
        question: 'Anhand welcher Kriterien wird die Route in SAP SD automatisch ermittelt?',
        options: [
          'Versandstelle, Warenempfänger und Transportgruppe',
          'Kundenauftrag, Lieferbeleg und Faktura',
          'Bruttopreis, Nettopreis und Rabatte',
          'Materialstamm, Kundenstamm und Konditionsstamm',
        ],
        correctAnswer: 'Versandstelle, Warenempfänger und Transportgruppe',
        explanation: 'Die Routenfindung basiert auf: Versandstelle (Absender), Warenempfänger (Ziel) und Transportgruppe (Art des Transports). Die Route bestimmt Transitzeit und Transportkosten.',
      },
      {
        id: 'sd-kommissionierung',
        type: 'multiple-choice',
        question: 'Was wird bei der Kommissionierung (Picking) im Lager erstellt?',
        options: [
          'Ein Transportauftrag (Transfer Order) vom Lagerplatz zur Bereitstellzone',
          'Ein Lieferbeleg für den Kunden',
          'Eine Faktura für die Buchhaltung',
          'Ein Kundenauftrag mit Preisfindung',
        ],
        correctAnswer: 'Ein Transportauftrag (Transfer Order) vom Lagerplatz zur Bereitstellzone',
        explanation: 'Bei der Kommissionierung erzeugt SAP einen Transportauftrag, der den Lagerarbeiter anweist, Material vom Lagerplatz zu entnehmen und zur Bereitstellzone (Warenausgangszone) zu bringen.',
      },
      {
        id: 'sd-warenausgang',
        type: 'multiple-choice',
        question: 'Welche Auswirkung hat der Warenausgang im SAP SD Versandprozess?',
        options: [
          'Bestandsreduzierung und Besitzübergang - automatische Buchung in MM und FI',
          'Erstellung des Kundenauftrags',
          'Start der Kommissionierung',
          'Berechnung des Nettopreises',
        ],
        correctAnswer: 'Bestandsreduzierung und Besitzübergang - automatische Buchung in MM und FI',
        explanation: 'Der Warenausgang ist buchhalterisch entscheidend: Bestand wird reduziert, ein Materialbeleg wird erzeugt, und der Besitzübergang findet statt. Automatische Buchungen in MM (Materialwirtschaft) und FI (Finanzbuchhaltung).',
      },
      {
        id: 'sd-versand-reihenfolge',
        type: 'multiple-choice',
        question: 'Welche Reihenfolge des Versandprozesses in SAP SD ist korrekt?',
        options: [
          'Lieferung erstellen \u2192 Kommissionierung \u2192 Verpacken \u2192 Laden \u2192 Warenausgang \u2192 Transport',
          'Kommissionierung \u2192 Lieferung erstellen \u2192 Laden \u2192 Verpacken \u2192 Transport',
          'Warenausgang \u2192 Lieferung erstellen \u2192 Kommissionierung \u2192 Verpacken \u2192 Laden',
          'Verpacken \u2192 Kommissionierung \u2192 Lieferung erstellen \u2192 Laden \u2192 Warenausgang',
        ],
        correctAnswer: 'Lieferung erstellen \u2192 Kommissionierung \u2192 Verpacken \u2192 Laden \u2192 Warenausgang \u2192 Transport',
        explanation: 'Die Lieferung (Lieferbeleg) steuert alle Folgeprozesse. Dann: Kommissionieren \u2192 Verpacken \u2192 Laden \u2192 Warenausgang (Besitzübergang) \u2192 Transport zum Kunden.',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // Exam Tasks (exam-focused, rewritten)
  // ─────────────────────────────────────────────────
  examTasks: [
    {
      id: 'sd-auftragsbearbeitung-task',
      title: 'Kundenauftrag & Terminierung',
      points: 25,
      context: (
        <p>
          Ein Kunde bestellt 200 Stück eines Materials mit Wunschlieferdatum 20. März.
          Die Rückwärtsterminierung ergibt ein Materialbereitstellungsdatum vom 28. Februar,
          das bereits in der Vergangenheit liegt (heute ist der 5. März).
        </p>
      ),
      parts: [
        {
          id: 'sd-auftragsbearbeitung-task-a',
          type: 'free-text',
          question: 'Beschreiben Sie die 3-Ebenen-Struktur eines Kundenauftrags und erklären Sie die Rolle der Lieferplaneinteilung.',
          placeholder: 'Ein Kundenauftrag besteht aus...',
          modelAnswer: 'Ein Kundenauftrag hat 3 Ebenen: 1. Kopfbereich (Auftraggeber, Warenempfänger, Gesamtkonditionen), 2. Position(en) (Material, Menge, Positionspreis), 3. Lieferplaneinteilung(en) (Liefermenge und Liefertermin pro Position). Die Lieferplaneinteilung legt fest, WANN und WIEVIEL pro Position geliefert wird. Eine Position kann mehrere Einteilungen haben (z.B. 100 Stück am 15.03., 100 Stück am 01.04.).',
          keyPoints: [
            '3 Ebenen korrekt benannt (Kopf, Position, Lieferplaneinteilung)',
            'Lieferplaneinteilung = Menge + Termin',
            'Mehrere Einteilungen pro Position möglich',
          ],
          explanation: 'Die 3-Ebenen-Struktur mit Lieferplaneinteilungen ist ein zentrales Konzept im SAP SD Kundenauftrag.',
        },
        {
          id: 'sd-auftragsbearbeitung-task-b',
          type: 'free-text',
          question: 'Erklären Sie was in diesem Szenario passiert: Warum greift die Vorwärtsterminierung und was ist das Ergebnis?',
          placeholder: 'Die Rückwärtsterminierung ergibt...',
          modelAnswer: 'Die Rückwärtsterminierung rechnet vom Wunschlieferdatum (20. März) zurück und ergibt als Materialbereitstellungsdatum den 28. Februar. Da heute der 5. März ist, liegt dieses Datum in der Vergangenheit - die Richtzeit, Transportdispo-Vorlaufzeit etc. können nicht mehr eingehalten werden. Daher greift die Vorwärtsterminierung als Fallback: Ab dem heutigen Datum (5. März) wird vorwärts gerechnet (+ Richtzeit + Transportdispo-Vorlaufzeit + Ladezeit + Transitzeit), um ein neues, realistisches Lieferdatum zu ermitteln.',
          keyPoints: [
            'Rückwärts = vom Wunschdatum zurück',
            'Ergebnis liegt in der Vergangenheit',
            'Vorwärts = Fallback ab heute',
            'Neues realistisches Lieferdatum als Ergebnis',
          ],
          explanation: 'Die Vorwärtsterminierung ist der automatische Fallback wenn die Rückwärtsterminierung ein nicht einhaltbares Datum ergibt.',
        },
        {
          id: 'sd-auftragsbearbeitung-task-c',
          type: 'free-text',
          question: 'Nennen und erklären Sie die 3 Lieferoptionen der Verfügbarkeitsprüfung. Für welche Option würde sich ein Kunde entscheiden, der die Ware so schnell wie möglich braucht?',
          placeholder: 'Die 3 Lieferoptionen sind...',
          modelAnswer: '1. Einmallieferung: Alles auf einmal liefern (nur wenn sofort verfügbar). 2. Komplettlieferung: Warten bis alles verfügbar, dann komplett liefern. 3. Liefervorschlag: Teillieferungen - was da ist sofort liefern, Rest nachliefern. Für einen Kunden der schnellstmöglich Ware braucht: Liefervorschlag, da er sofort die verfügbare Menge erhält und den Rest nachgeliefert bekommt.',
          keyPoints: [
            'Alle 3 Optionen korrekt benannt und erklärt',
            'Liefervorschlag als Antwort für schnellste Option',
          ],
          explanation: 'Die Unterscheidung der 3 Lieferoptionen ist ein häufiges Prüfungsthema.',
        },
      ],
    },
    {
      id: 'sd-preisfindung-versand-task',
      title: 'Preisfindung, Kreditprüfung & Versand',
      points: 25,
      context: (
        <p>
          Ein Handelsunternehmen erfasst einen Kundenauftrag über 50.000 EUR. Der Kunde hat
          ein Kreditlimit von 80.000 EUR und offene Posten von 40.000 EUR.
        </p>
      ),
      parts: [
        {
          id: 'sd-preisfindung-versand-task-a',
          type: 'free-text',
          question: 'Erklären Sie die Konditionstechnik und beschreiben Sie den Weg vom Bruttopreis zum Nettopreis.',
          placeholder: 'Die Konditionstechnik ist...',
          modelAnswer: 'Die Konditionstechnik ist das automatische Verfahren zur Preisfindung in SAP. Bei der Kundenauftragserfassung ermittelt SAP automatisch den Preis: Bruttopreis (Grundpreis PR00 aus Materialstamm/Preisliste) - Rabatte (Kundenrabatt, Materialrabatt, Mengenrabatt) + Zuschläge (Fracht, Verpackung, Versicherung) = Nettopreis. Die Konditionsarten werden über Zugriffsfolgen in definierter Reihenfolge gesucht.',
          keyPoints: [
            'Konditionstechnik = automatische Preisfindung',
            'Formel: Brutto - Rabatte + Zuschläge = Netto',
            'Beispiele für Rabatte und Zuschläge',
            'Automatisch bei Auftragserfassung',
          ],
          explanation: 'Die Konditionstechnik ist das zentrale Preisfindungsverfahren in SAP SD.',
        },
        {
          id: 'sd-preisfindung-versand-task-b',
          type: 'free-text',
          question: 'Wird der Kundenauftrag aus dem Szenario (50.000 EUR, Kreditlimit 80.000 EUR, offene Posten 40.000 EUR) freigegeben oder gesperrt? Begründen Sie.',
          placeholder: 'Bei der Kreditprüfung wird...',
          modelAnswer: 'Der Auftrag wird GESPERRT. Berechnung: Offene Posten (40.000) + Auftragswert (50.000) = 90.000 EUR. Das Kreditlimit beträgt nur 80.000 EUR. Da 90.000 > 80.000, wird das Kreditlimit überschritten und der Auftrag bekommt eine Kreditsperre. Das Kreditmanagement muss den Auftrag manuell prüfen und entscheiden ob er trotzdem freigegeben oder abgelehnt wird.',
          keyPoints: [
            'Gesperrt (nicht freigegeben)',
            'Berechnung: 40.000 + 50.000 = 90.000 > 80.000',
            'Kreditsperre erwähnt',
            'Manuelle Prüfung durch Kreditmanagement',
          ],
          explanation: 'Die Kreditprüfung ist eine automatische Sicherheitsfunktion im SAP SD Auftragsprozess.',
        },
        {
          id: 'sd-preisfindung-versand-task-c',
          type: 'free-text',
          question: 'Beschreiben Sie den Versandprozess von der Liefererstellung bis zum Transport. Welche Rolle spielt die Routenfindung?',
          placeholder: 'Nach Freigabe des Kundenauftrags...',
          modelAnswer: 'Versandprozess: 1. Lieferung erstellen (Lieferbeleg steuert alle Folgeprozesse), 2. Kommissionierung (Transportauftrag, Material vom Lagerplatz zur Bereitstellzone), 3. Verpacken (Handling Units), 4. Laden (auf Transportmittel), 5. Warenausgang (Bestandsreduzierung, Besitzübergang, automatische Buchung in MM/FI), 6. Transport zum Kunden. Die Routenfindung erfolgt automatisch bei der Liefererstellung anhand von Versandstelle (Absender), Warenempfänger (Ziel) und Transportgruppe. Sie bestimmt die Transitzeit und Transportkosten.',
          keyPoints: [
            'Alle Versandschritte in richtiger Reihenfolge',
            'Warenausgang als buchhalterisch entscheidender Schritt',
            'Routenfindung: Versandstelle + Warenempfänger + Transportgruppe',
          ],
          explanation: 'Der Versandprozess und die Routenfindung sind zentrale operative Prozesse im SAP SD.',
        },
        {
          id: 'sd-preisfindung-versand-task-d',
          type: 'free-text',
          question: 'Was ist der Unterschied zwischen Kommissionierung und Warenausgang? Warum ist der Warenausgang buchhalterisch entscheidend?',
          placeholder: 'Die Kommissionierung ist...',
          modelAnswer: 'Kommissionierung = physisches Zusammenstellen (Picking) der Ware im Lager. Ein Transportauftrag führt den Lagerarbeiter vom Lagerplatz zur Bereitstellzone. Der Warenausgang ist der buchhalterisch entscheidende Schritt: Hier wird der Bestand im System reduziert, ein Materialbeleg erzeugt und der Besitzübergang dokumentiert. Es erfolgen automatische Buchungen in der Materialwirtschaft (MM) und der Finanzbuchhaltung (FI).',
          keyPoints: [
            'Kommissionierung = physisches Picking',
            'Warenausgang = buchhalterischer Schritt',
            'Bestandsreduzierung und Besitzübergang',
            'Automatische Buchung in MM und FI',
          ],
          explanation: 'Der Warenausgang ist der buchhalterisch relevante Schritt im Versandprozess.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'sap-plattform', title: 'SAP S/4HANA Plattform', relationship: 'Läuft auf SAP-Plattform' },
    { id: 'erp-systeme', title: 'ERP-Systeme', relationship: 'SD ist ERP-Modul' },
  ],
}
