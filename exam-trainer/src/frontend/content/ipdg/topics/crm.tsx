// src/content/ipdg/topics/crm.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { CrmTypesDiagram } from '../diagrams/CrmTypesDiagram'
import { CrmTypesGame } from '../diagrams/ConceptCategorizationGame'
import { CustomerJourneyDiagram } from '../diagrams/CustomerJourneyDiagram'

// ─────────────────────────────────────────────────
// Mermaid Diagrams
// ─────────────────────────────────────────────────

const customerJourneyDiagram = `
flowchart LR
  A["Awareness\n(Aufmerksamkeit)"]
  B["Consideration\n(Vergleich)"]
  C["Purchase\n(Kauf)"]
  D["Retention\n(Bindung)"]
  E["Advocacy\n(Empfehlung)"]

  A --> B --> C --> D --> E
  E -.->|"Mundpropaganda"| A

  style A fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style B fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style C fill:#14532d,stroke:#22c55e,color:#dcfce7
  style D fill:#3b0764,stroke:#a855f7,color:#f3e8ff
  style E fill:#831843,stroke:#ec4899,color:#fce7f3
`

const crmTypesOverviewDiagram = `
flowchart TB
  S["Strategisches CRM\n(Ziele & Planung)"]
  AN["Analytisches CRM\n(BI-Methoden)"]
  OP["Operatives CRM\n(Umsetzung)"]
  KO["Kommunikatives CRM\n(Multi-Channel)"]

  S -->|"definiert Ziele für"| AN
  AN -->|"quantifiziert für"| OP
  OP -->|"nutzt Kanäle von"| KO
  KO -.->|"Feedback an"| S

  style S fill:#3b0764,stroke:#a855f7,color:#f3e8ff
  style AN fill:#164e63,stroke:#06b6d4,color:#cffafe
  style OP fill:#14532d,stroke:#22c55e,color:#dcfce7
  style KO fill:#78350f,stroke:#f59e0b,color:#fef3c7
`

export const crmTopic: Topic = {
  id: 'crm',
  title: 'CRM - Customer Relationship Management',
  description: '4 CRM-Typen, Customer Journey, CLV, KPIs',
  icon: '\u{1F465}',
  examNotes: 'Die 4 CRM-Arten unterscheiden! Strategisch = Ziele/Planung, Analytisch = BI-Methoden!',

  sections: [
    // ──── 1. Warum CRM? ────
    {
      id: 'warum-crm',
      title: 'Warum CRM?',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              "Der Kunde ist König" - aber wie pflegt man Beziehungen zu <strong>10.000+ Kunden</strong> gleichzeitig?
              CRM-Systeme machen genau das möglich: systematische Kundengewinnung, -selektion und -bindung.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg">
            <p className="text-slate-300">
              <strong>CRM</strong> = Pflege von Kundenbeziehungen mit den Zielen:
              Kundengewinnung, Vergrößerung des Kundenstamms, Kundenselektion
              (profitable Kunden identifizieren) und Kundenbindung (Loyalty Management).
            </p>
          </div>
          <div className="p-3 bg-green-900/20 rounded border border-green-800">
            <strong>Kernziel:</strong> Maximierung des <em>Customer Lifetime Value (CLV)</em>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            Es ist erheblich <strong>teurer</strong>, an einen neuen Kunden zu verkaufen als an einen bestehenden!
            Daher ist Kundenbindung (Retention) so zentral für CRM.
          </div>
        </div>
      ),
    },

    // ──── 2. Customer Journey ────
    {
      id: 'customer-journey',
      title: 'Customer Journey - 5 Phasen',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Die Customer Journey beschreibt den gesamten Lebenszyklus einer Kundenbeziehung
            - von der ersten Wahrnehmung bis zur aktiven Weiterempfehlung.
          </p>

          <MermaidDiagram chart={customerJourneyDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl">{'\u{1F440}'}</span>
              <div>
                <div className="font-medium text-amber-300">1. Awareness</div>
                <div className="text-sm text-slate-400">Aufmerksamkeit wecken (Werbung, Social Media)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl">{'\u{1F914}'}</span>
              <div>
                <div className="font-medium text-blue-300">2. Consideration</div>
                <div className="text-sm text-slate-400">Kunde vergleicht Alternativen</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl">{'\u{1F6D2}'}</span>
              <div>
                <div className="font-medium text-green-300">3. Purchase</div>
                <div className="text-sm text-slate-400">Kaufentscheidung</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl">{'\u{1F504}'}</span>
              <div>
                <div className="font-medium text-purple-300">4. Retention</div>
                <div className="text-sm text-slate-400">Bindung, Service, Wiederkauf</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl">{'\u{1F4E2}'}</span>
              <div>
                <div className="font-medium text-pink-300">5. Advocacy</div>
                <div className="text-sm text-slate-400">Kunde empfiehlt aktiv weiter</div>
              </div>
            </div>
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: CustomerJourneyDiagram,
      },
    },

    // ──── 3. Die 4 CRM-Arten ────
    {
      id: 'crm-arten',
      title: 'Die 4 CRM-Arten',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm mb-2">
            CRM gliedert sich in vier Teilbereiche, die aufeinander aufbauen:
            Strategie definieren, analysieren, umsetzen, kommunizieren.
          </p>

          <MermaidDiagram chart={crmTypesOverviewDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <h4 className="font-bold text-indigo-300 mb-2">1. Strategisches CRM</h4>
            <p className="text-sm text-slate-300">
              Leitet sich aus der Unternehmensstrategie ab. Definiert <strong>welche Ziele</strong> mit
              <strong> welchen Kundengruppen</strong> durch <strong>welche Maßnahmen</strong> über
              <strong> welchen Zeitraum</strong> erreicht werden sollen.
            </p>
            <p className="text-xs text-indigo-400 mt-2">Baut Wissen auf, optimiert Interaktion, maximiert CLV</p>
          </div>

          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-bold text-cyan-300 mb-2">2. Analytisches CRM</h4>
            <p className="text-sm text-slate-300">
              Nutzt Methoden aus der <strong>Business Intelligence</strong>{' '}
              (<span className="text-cyan-400">siehe BI-Thema</span>):
              Data Warehouse, Data Mining, OLAP-Analyse zur Kundenanalyse und Zielgruppenidentifikation.
            </p>
            <p className="text-xs text-cyan-400 mt-2">Quantifiziert Maßnahmen und Kundenwert</p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-2">3. Operatives CRM</h4>
            <p className="text-sm text-slate-300">
              Setzt die identifizierten Maßnahmen in <strong>automatisierten Lösungen</strong> für
              Marketing, Sales und Service um (Front-Office, Kampagnenmanagement).
            </p>
            <p className="text-xs text-green-400 mt-2">Umsetzung der Strategie</p>
          </div>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">4. Kommunikatives CRM</h4>
            <p className="text-sm text-slate-300">
              Management aller <strong>Kommunikationskanäle</strong> (Telefon, E-Mail, Web).
              Synchronisierung für bidirektionale Kommunikation.
            </p>
            <p className="text-xs text-amber-400 mt-2">Multi-Channel Management</p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Strategisches CRM nutzt KEINE BI-Methoden!
            Das ist ANALYTISCHES CRM. Strategisch = Zielsetzung und Planung.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: CrmTypesDiagram,
      },
    },

    // ──── 4. CRM-Typen üben ────
    {
      id: 'crm-ueben',
      title: 'CRM-Typen üben',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Ordne die Begriffe den richtigen CRM-Typen zu. Dies ist eine häufige Klausurfrage!
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: CrmTypesGame,
      },
    },

    // ──── 5. Customer Lifetime Value (CLV) & Share of Wallet ────
    {
      id: 'clv',
      title: 'Customer Lifetime Value (CLV) & Share of Wallet',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <p className="text-green-200">
              <strong>CLV</strong> = Gesamtwert eines Kunden über die gesamte Dauer der Geschäftsbeziehung.
              Dies ist DIE zentrale Kennzahl im CRM.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">Vereinfachte Formel:</p>
            <p className="font-mono text-sm text-center text-slate-200">
              CLV = (Umsatz pro Periode × Anzahl Perioden) − Gesamtkosten
            </p>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Gesamtkosten = Akquisitionskosten (CAC) + Kundenpflegekosten über die Beziehungsdauer
            </p>
          </div>

          {/* CLV Rechenbeispiel 1 */}
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <h4 className="font-medium text-blue-300 mb-2">Rechenbeispiel 1: Telekom-Vertrag</h4>
            <div className="text-sm text-slate-300 space-y-1">
              <p>Monatsbeitrag: 40 EUR → <strong>480 EUR/Jahr</strong></p>
              <p>Durchschnittliche Vertragsdauer: <strong>5 Jahre</strong></p>
              <p>Akquisitionskosten: <strong>200 EUR</strong> (Werbung, Beratung)</p>
              <p>Servicekosten: <strong>60 EUR/Jahr</strong></p>
            </div>
            <div className="mt-2 p-2 bg-slate-800 rounded font-mono text-sm text-green-300">
              CLV = (480 × 5) − 200 − (60 × 5) = 2.400 − 200 − 300 = <strong>1.900 EUR</strong>
            </div>
          </div>

          {/* CLV Rechenbeispiel 2 */}
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
            <h4 className="font-medium text-purple-300 mb-2">Rechenbeispiel 2: Gaming-Konsolen (Klausurformat)</h4>
            <div className="text-sm text-slate-300 space-y-1">
              <p>Geschäftsbeziehung: <strong>10 Jahre</strong></p>
              <p>Konsole alle 2 Jahre: <strong>500 EUR</strong> → 5 Käufe</p>
              <p>Kundenpflege: <strong>50 EUR/Jahr</strong></p>
            </div>
            <div className="mt-2 p-2 bg-slate-800 rounded font-mono text-sm text-green-300">
              CLV = (5 × 500) − (10 × 50) = 2.500 − 500 = <strong>2.000 EUR</strong>
            </div>
          </div>

          {/* Share of Wallet */}
          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-bold text-cyan-300 mb-2">Share of Wallet</h4>
            <p className="text-sm text-slate-300">
              Der <strong>Anteil der Ausgaben eines Kunden in einer Produktkategorie</strong>,
              der an das eigene Unternehmen geht.
            </p>
            <div className="mt-2 p-2 bg-slate-800 rounded font-mono text-sm text-center text-slate-200">
              Share of Wallet = Eigener Umsatz beim Kunden / Gesamtausgaben des Kunden in der Kategorie
            </div>
            <p className="text-xs text-cyan-400 mt-2">
              Ein Kunde gibt 200 EUR/Monat für Mobilfunk aus, davon 80 EUR bei der Telekom → Share of Wallet = 40%.
              Ziel: diesen Anteil erhöhen (z.B. durch Cross-Selling von Internet, TV, Festnetz).
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> CLV-Berechnung kommt häufig als Rechenaufgabe!
            Achte auf: Kaufhäufigkeit × Preis × Dauer − Kosten. Share of Wallet zeigt Wachstumspotenzial
            bei bestehenden Kunden.
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> CLV ist NICHT der einmalige Umsatz eines Kaufs,
            sondern der <em>gesamte Wert über die komplette Geschäftsbeziehung</em>.
            Share of Wallet ist NICHT dasselbe wie Marktanteil (Marktanteil = Anteil am Gesamtmarkt,
            Share of Wallet = Anteil bei einem einzelnen Kunden).
          </div>
        </div>
      ),
    },

    // ──── 6. CRM-KPIs nach Kategorie ────
    {
      id: 'kpis',
      title: 'CRM-KPIs nach Kategorie',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            CRM-Erfolg wird über verschiedene KPI-Kategorien gemessen.
            Diese Kennzahlen sind klausurrelevant!
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Kategorie</th>
                  <th className="text-left py-2 px-3">KPI</th>
                  <th className="text-left py-2 px-3">Beschreibung</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-amber-300" rowSpan={3}>Kundengewinnung</td>
                  <td className="py-2 px-3">CAC</td>
                  <td className="py-2 px-3">Customer Acquisition Cost</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Lead-to-Customer Rate</td>
                  <td className="py-2 px-3">Anteil der Leads, die zu Kunden werden</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">MQL/SQL Ratio</td>
                  <td className="py-2 px-3">Marketing vs. Sales Qualified Leads</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-green-300" rowSpan={3}>Kundenbindung</td>
                  <td className="py-2 px-3">Retention Rate</td>
                  <td className="py-2 px-3">Anteil gehaltener Kunden</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Churn Rate</td>
                  <td className="py-2 px-3">Abwanderungsquote</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Repeat Purchase Rate</td>
                  <td className="py-2 px-3">Wiederkaufrate</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-blue-300" rowSpan={2}>Wertbeitrag</td>
                  <td className="py-2 px-3">CLV</td>
                  <td className="py-2 px-3">Customer Lifetime Value</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">ARPU</td>
                  <td className="py-2 px-3">Average Revenue Per User</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-purple-300" rowSpan={3}>Engagement</td>
                  <td className="py-2 px-3">Engagement Score</td>
                  <td className="py-2 px-3">Gesamtinteraktionswert</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Open/Click Rates</td>
                  <td className="py-2 px-3">Öffnungs-/Klickraten (E-Mail)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">NPS</td>
                  <td className="py-2 px-3">Net Promoter Score (0-10)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-cyan-300" rowSpan={3}>Service</td>
                  <td className="py-2 px-3">First Response Time</td>
                  <td className="py-2 px-3">Erstantwortzeit</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">FCR</td>
                  <td className="py-2 px-3">First Contact Resolution</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">CSAT</td>
                  <td className="py-2 px-3">Customer Satisfaction</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-red-300" rowSpan={3}>Sales</td>
                  <td className="py-2 px-3">Sales Cycle</td>
                  <td className="py-2 px-3">Dauer des Verkaufszyklus</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Pipeline Value</td>
                  <td className="py-2 px-3">Wert der Verkaufspipeline</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Win Rate</td>
                  <td className="py-2 px-3">Abschlussquote</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },

    // ──── 7. CRM Maßnahmen ────
    {
      id: 'massnahmen',
      title: 'CRM Maßnahmen',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Fünf zentrale Maßnahmen, die ein CRM-System unterstützt. Jede Maßnahme wird
            durch das Zusammenspiel verschiedener CRM-Typen ermöglicht und wirkt an
            unterschiedlichen Punkten der Customer Journey.
          </p>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-blue-300">E-Mail-Kampagnen</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Awareness → Retention</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Personalisierte E-Mails basierend auf Kundendaten (Kaufhistorie, Interessen, Verhalten).
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400">Analytisches CRM</span> segmentiert die Zielgruppe,{' '}
              <span className="text-green-400">Operatives CRM</span> steuert den Versand,{' '}
              <span className="text-amber-400">Kommunikatives CRM</span> wählt den Kanal.
            </p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-green-300">Up-/Cross-Selling</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-800/50 text-green-300">Purchase → Retention</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              <strong>Upselling:</strong> Verkauf eines höherwertigen Produkts (Standard → Premium).{' '}
              <strong>Cross-Selling:</strong> Verkauf eines ergänzenden Produkts (Handy → Hülle).
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400">Analytisches CRM</span> erkennt Kaufmuster und empfiehlt passende Produkte,{' '}
              <span className="text-green-400">Operatives CRM</span> präsentiert das Angebot im Kaufprozess.
            </p>
          </div>

          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-purple-300">Loyalty-Programme</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-800/50 text-purple-300">Retention → Advocacy</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Belohnung für Treue: Punkte, Rabatte, Early-Access, exklusive Angebote.
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-purple-400">Strategisches CRM</span> definiert das Belohnungsmodell,{' '}
              <span className="text-cyan-400">Analytisches CRM</span> berechnet den Kundenwert (CLV) als Basis.
            </p>
          </div>

          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-cyan-300">Serviceverbesserungen</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-800/50 text-cyan-300">Retention</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Schnellere Reaktionszeiten, proaktive Informationen, Self-Service-Portale.
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400">Analytisches CRM</span> identifiziert Service-Schwächen (CSAT, FCR),{' '}
              <span className="text-green-400">Operatives CRM</span> setzt Verbesserungen im Ticketsystem um.
            </p>
          </div>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-300">Reaktivierungsmaßnahmen</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-800/50 text-amber-300">Churn Prevention</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              "Wir vermissen Sie"-Kampagnen für inaktive Kunden mit speziellen Rückkehr-Angeboten.
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400">Analytisches CRM</span> erkennt Churn-Risiko und inaktive Kunden,{' '}
              <span className="text-green-400">Operatives CRM</span> löst automatisch die Reaktivierungskampagne aus.
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Beachte den Kreislauf: <span className="text-purple-400">Strategisches CRM</span> definiert
            die Ziele → <span className="text-cyan-400">Analytisches CRM</span> liefert die Datengrundlage →{' '}
            <span className="text-green-400">Operatives CRM</span> setzt um → <span className="text-amber-400">Kommunikatives CRM</span> wählt den Kanal.
          </div>
        </div>
      ),
    },

    // ──── 8. CRM Glossar & Kennzahlen ────
    {
      id: 'glossar',
      title: 'CRM Glossar & Kennzahlen',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-bold text-amber-300 mb-1">Cross-Selling</h4>
            <p className="text-sm text-slate-300">
              Verkauf ergänzender Produkte (z.B. Handyhülle zum Handy)
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-bold text-blue-300 mb-1">Up-Selling</h4>
            <p className="text-sm text-slate-300">
              Verkauf eines höherwertigen Produkts (z.B. Premium statt Standard)
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-bold text-red-300 mb-1">Churn Rate</h4>
            <p className="text-sm text-slate-300">
              Abwanderungsquote von Kunden
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-bold text-green-300 mb-1">Customer Centricity</h4>
            <p className="text-sm text-slate-300">
              Der Kunde steht im Zentrum aller Aktivitäten - von Entwicklung über Vertrieb bis Service
            </p>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'crm-strategisch-bi',
        type: 'multiple-choice',
        question: 'Strategisches CRM nutzt Business-Intelligence-Methoden für zielgruppenorientiertes Marketing.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das ist ANALYTISCHES CRM, nicht strategisches! Strategisches CRM definiert Ziele und Kundengruppen. Analytisches CRM nutzt BI-Methoden (Data Mining, OLAP).',
      },
      {
        id: 'crm-operativ',
        type: 'multiple-choice',
        question: 'Operatives CRM setzt die identifizierten Maßnahmen des strategischen CRM, die im analytischen CRM quantifiziert wurden, in Form von automatisierten Lösungen für Marketing, Vertrieb und Service um.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Operatives CRM ist die praktische Umsetzung in Systemen und Prozessen.',
      },
      {
        id: 'crm-ziel-strategisch',
        type: 'multiple-choice',
        question: 'Ziel des strategischen CRM ist es, so viel Wissen wie möglich über die Kunden aufzubauen und dieses Wissen zu nutzen, um die Interaktion zwischen Unternehmen und Kunden zu optimieren, mit dem Ziel, den Customer Lifetime Value für das Unternehmen zu maximieren.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Dies beschreibt das übergeordnete Ziel des strategischen CRM.',
      },
      {
        id: 'crm-kommunikativ',
        type: 'multiple-choice',
        question: 'Kommunikatives CRM umfasst das Management aller Kommunikationskanäle zwischen Kunde und Unternehmen. Die verschiedenen Kommunikationskanäle werden synchronisiert, kontrolliert und gezielt gesteuert, um eine bidirektionale Kommunikation zwischen Kunden und Unternehmen zu ermöglichen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Kommunikatives CRM = Multi-Channel Management.',
      },
      {
        id: 'crm-agil-flexibel',
        type: 'multiple-choice',
        question: 'Eine agile und flexible CRM-Strategie bündelt alle Aktivitäten mit Kunden zu einer einheitlichen Sicht, unabhängig von den Zielen des Kundenkontakts (Presales, Sales, Post Sales).',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Eine moderne CRM-Strategie bietet eine 360-Grad-Kundensicht über alle Phasen.',
      },
      {
        id: 'crm-analytisch-bi',
        type: 'multiple-choice',
        question: 'Analytisches CRM nutzt traditionelle Business Intelligence (BI) Methoden wie Data Warehouse, Data Mining und Online Analytical Processing Systeme (OLAP), um Kundenzufriedenheit und Kundentreue (Share of Wallet) zu bestimmen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Analytisches CRM ist der BI-Teil des CRM und nutzt diese Methoden zur Kundenanalyse.',
      },
      {
        id: 'crm-clv',
        type: 'multiple-choice',
        question: 'Customer Lifetime Value (CLV) ist der einmalige Umsatz, den ein Kunde bei einem einzelnen Kauf generiert.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'CLV ist der GESAMTWERT eines Kunden über die gesamte Dauer der Geschäftsbeziehung, nicht ein einzelner Kauf.',
      },
      {
        id: 'crm-teurer-neukunde',
        type: 'multiple-choice',
        question: 'Es ist erheblich günstiger, an einen neuen Kunden zu verkaufen als an einen bestehenden Kunden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Umgekehrt! Es ist erheblich TEURER, Neukunden zu gewinnen. Daher ist Kundenbindung (Retention) so wichtig.',
      },
      {
        id: 'crm-welcher-typ-bi',
        type: 'multiple-choice',
        question: 'Welcher CRM-Typ nutzt Business-Intelligence-Methoden wie Data Mining, OLAP und Data Warehouse zur Kundenanalyse?',
        options: [
          'Analytisches CRM',
          'Strategisches CRM',
          'Operatives CRM',
          'Kommunikatives CRM',
        ],
        correctAnswer: 'Analytisches CRM',
        explanation: 'Analytisches CRM nutzt BI-Methoden. Häufige Klausurfalle: Strategisches CRM definiert nur Ziele und Planung, NICHT BI-Methoden!',
      },
      {
        id: 'crm-cross-selling',
        type: 'multiple-choice',
        question: 'Ein Mobilfunkanbieter empfiehlt einem Kunden beim Handykauf eine passende Schutzhülle. Welche Vertriebsstrategie wird hier angewendet?',
        options: [
          'Cross-Selling',
          'Up-Selling',
          'Churn Prevention',
          'Customer Acquisition',
        ],
        correctAnswer: 'Cross-Selling',
        explanation: 'Cross-Selling = Verkauf ergänzender Produkte. Up-Selling wäre z.B. der Verkauf eines teureren Handymodells.',
      },
      {
        id: 'crm-multi-channel',
        type: 'multiple-choice',
        question: 'Welcher CRM-Typ ist für das Management aller Kommunikationskanäle (Telefon, E-Mail, Web) zwischen Kunde und Unternehmen verantwortlich?',
        options: [
          'Kommunikatives CRM',
          'Operatives CRM',
          'Analytisches CRM',
          'Strategisches CRM',
        ],
        correctAnswer: 'Kommunikatives CRM',
        explanation: 'Kommunikatives CRM = Multi-Channel Management. Es synchronisiert und steuert alle Kanäle für bidirektionale Kommunikation.',
      },
      {
        id: 'crm-journey-phase3',
        type: 'multiple-choice',
        question: 'In welcher Phase der Customer Journey trifft der Kunde die Kaufentscheidung?',
        options: [
          'Purchase',
          'Consideration',
          'Retention',
          'Awareness',
        ],
        correctAnswer: 'Purchase',
        explanation: 'Die 5 Phasen: Awareness -> Consideration -> Purchase (Kaufentscheidung) -> Retention -> Advocacy.',
      },
      {
        id: 'crm-operativ-aufgabe',
        type: 'multiple-choice',
        question: 'Was ist die Hauptaufgabe des operativen CRM?',
        options: [
          'Umsetzung der CRM-Maßnahmen in automatisierten Lösungen für Marketing, Sales und Service',
          'Definition der CRM-Strategie und Kundengruppenziele',
          'Analyse von Kundendaten mit Data Mining und OLAP',
          'Synchronisierung aller Kommunikationskanäle',
        ],
        correctAnswer: 'Umsetzung der CRM-Maßnahmen in automatisierten Lösungen für Marketing, Sales und Service',
        explanation: 'Operatives CRM setzt die strategisch definierten und analytisch quantifizierten Maßnahmen in der Praxis um (Front-Office, Kampagnenmanagement).',
      },
      {
        id: 'crm-kpi-churn',
        type: 'multiple-choice',
        question: 'Was misst die Churn Rate?',
        options: [
          'Die Abwanderungsquote von Kunden',
          'Den durchschnittlichen Umsatz pro Kunde',
          'Die Kosten für Neukundengewinnung',
          'Die Kundenzufriedenheit auf einer Skala von 1-10',
        ],
        correctAnswer: 'Die Abwanderungsquote von Kunden',
        explanation: 'Churn Rate = Abwanderungsquote. Sie misst, wie viele Kunden das Unternehmen in einem Zeitraum verloren hat. Je niedriger, desto besser.',
      },
      {
        id: 'crm-kpi-nps',
        type: 'multiple-choice',
        question: 'Der Net Promoter Score (NPS) misst ...',
        options: [
          '... die Weiterempfehlungsbereitschaft von Kunden auf einer Skala von 0-10',
          '... den Gesamtumsatz pro Kundengruppe',
          '... die Anzahl neuer Leads pro Monat',
          '... die durchschnittliche Bearbeitungszeit im Service',
        ],
        correctAnswer: '... die Weiterempfehlungsbereitschaft von Kunden auf einer Skala von 0-10',
        explanation: 'NPS = "Wie wahrscheinlich empfehlen Sie uns weiter?" (0-10). Promoters (9-10), Passives (7-8), Detractors (0-6). NPS = % Promoters - % Detractors.',
      },
      {
        id: 'crm-massnahme-loyalty',
        type: 'multiple-choice',
        question: 'Ein Telekommunikationsunternehmen bietet treuen Kunden nach 2 Jahren ein kostenloses Smartphone-Upgrade an. Welche CRM-Maßnahme wird hier eingesetzt?',
        options: [
          'Loyalty-Programm',
          'Reaktivierungsmaßnahme',
          'Cross-Selling',
          'E-Mail-Kampagne',
        ],
        correctAnswer: 'Loyalty-Programm',
        explanation: 'Loyalty-Programme belohnen treue Kunden (Punkte, Rabatte, Upgrades, Early-Access). Reaktivierung wäre für INAKTIVE Kunden.',
      },
      {
        id: 'crm-kpi-cac',
        type: 'multiple-choice',
        question: 'Was beschreibt der Customer Acquisition Cost (CAC)?',
        options: [
          'Die Kosten, die aufgewendet werden müssen, um einen neuen Kunden zu gewinnen',
          'Der Gesamtwert eines Kunden über die gesamte Geschäftsbeziehung',
          'Die monatlichen Kosten für die CRM-Software',
          'Der Anteil der Kaufkraft eines Kunden beim Unternehmen',
        ],
        correctAnswer: 'Die Kosten, die aufgewendet werden müssen, um einen neuen Kunden zu gewinnen',
        explanation: 'CAC = Customer Acquisition Cost = Kosten pro gewonnenem Neukunden. CLV = Gesamtwert über Beziehungsdauer. Share of Wallet = Kaufkraftanteil.',
      },
    ],
  },

  examTasks: [
    {
      id: 'crm-telekom-task',
      title: 'CRM bei der Deutschen Telekom',
      points: 30,
      context: (
        <p>
          Die Deutsche Telekom nutzt CRM-Systeme zur Analyse, Bewertung und Optimierung
          von Kundenbeziehungen. Als CRM-Berater sollen Sie verschiedene Aspekte analysieren.
        </p>
      ),
      parts: [
        {
          id: 'crm-task-a',
          type: 'free-text',
          question: 'Nennen Sie drei strategische CRM-Ziele, die für die Deutsche Telekom besonders relevant sind.',
          placeholder: '1. ...',
          modelAnswer: '1. Maximierung des Customer Lifetime Value (CLV) - langfristiger Kundenwert\n2. Reduzierung der Churn Rate - Kundenabwanderung minimieren\n3. Erhöhung des Share of Wallet - größerer Anteil der Kundenausgaben\n\nWeitere: Cross-/Up-Selling, Kundenzufriedenheit steigern, 360-Grad-Kundensicht',
          keyPoints: [
            'CLV maximieren',
            'Churn Rate reduzieren',
            'Share of Wallet erhöhen',
          ],
          explanation: 'CRM-Ziele orientieren sich immer am Kundenwert und der Kundenbindung.',
        },
        {
          id: 'crm-task-b',
          type: 'free-text',
          question: 'Erklären Sie die vier CRM-Arten und deren Zusammenspiel.',
          placeholder: 'Strategisches CRM...',
          modelAnswer: '1. Strategisches CRM: Definiert Ziele, Kundengruppen und Maßnahmen aus der Unternehmensstrategie\n2. Analytisches CRM: Nutzt BI-Methoden (Data Mining, OLAP) zur Kundenanalyse\n3. Operatives CRM: Setzt Maßnahmen in automatisierten Lösungen um (Marketing, Sales, Service)\n4. Kommunikatives CRM: Multi-Channel-Management aller Kundenkanäle\n\nZusammenspiel: Strategie -> Analyse -> Umsetzung -> Kommunikation',
          keyPoints: [
            'Strategisch = Zieldefinition',
            'Analytisch = BI-Methoden',
            'Operativ = Umsetzung',
            'Kommunikativ = Multi-Channel',
          ],
          explanation: 'Die vier CRM-Arten bauen aufeinander auf und bilden einen geschlossenen Kreislauf.',
        },
        {
          id: 'crm-task-c',
          type: 'free-text',
          question: 'Berechnen Sie den CLV für einen Kunden: Geschäftsbeziehung 10 Jahre, Konsole alle 2 Jahre für 500 EUR, Kundenpflege 50 EUR/Jahr.',
          placeholder: 'CLV = ...',
          modelAnswer: 'Umsatz: 5 Käufe x 500 EUR = 2.500 EUR\nKosten: 10 Jahre x 50 EUR = 500 EUR\n\nCLV = 2.500 EUR - 500 EUR = 2.000 EUR\n\n(Vereinfachte Formel ohne Diskontierung)',
          keyPoints: [
            'Anzahl Käufe richtig berechnet',
            'Gesamtkosten ermittelt',
            'CLV = Umsatz - Kosten',
          ],
          explanation: 'Der CLV zeigt den Gesamtwert eines Kunden über die Beziehungsdauer.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'business-intelligence', title: 'Business Intelligence', relationship: 'Analytisches CRM nutzt BI-Methoden' },
    { id: 'projekt-change-management', title: 'Projekt & Change Management', relationship: 'Warum CRM-Projekte scheitern' },
    { id: 'erp-systeme', title: 'ERP', relationship: 'liefert Kundendaten' },
    { id: 'big-data', title: 'Big Data', relationship: 'Kundenanalyse' },
  ],

  connectionDiagram: `
flowchart TB
  CRM["CRM\n(Customer Relationship\nManagement)"]

  subgraph Analyse["Analysemethoden"]
    BI["Business Intelligence\n(Data Warehouse, OLAP,\nData Mining)"]
  end

  subgraph Risiken["Projektrisiken"]
    PCM["Projekt &\nChange Management"]
  end

  CRM -->|"Analytisches CRM\nnutzt"| BI
  CRM -->|"Scheitern verstehen\nmit"| PCM
  BI -->|"Kundendaten\nanalysieren"| CRM

  style CRM fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style BI fill:#164e63,stroke:#06b6d4,color:#cffafe
  style PCM fill:#7f1d1d,stroke:#ef4444,color:#fecaca
`,
}
