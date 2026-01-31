// src/content/ipdg/topics/crm.tsx
import type { Topic } from '@/core/types/content'
import { CrmTypesDiagram } from '../diagrams/CrmTypesDiagram'
import { CrmTypesGame } from '../diagrams/ConceptCategorizationGame'

export const crmTopic: Topic = {
  id: 'crm',
  title: 'CRM - Customer Relationship Management',
  description: '4 CRM-Typen, Customer Journey, CLV, Share of Wallet',
  icon: '👥',
  examNotes: 'Die 4 CRM-Arten unterscheiden können! Strategisch ≠ Analytisch!',

  sections: [
    {
      id: 'definition',
      title: 'Definition CRM',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>CRM</strong> = Pflege von Kundenbeziehungen mit den Zielen:
              Kundengewinnung, Vergrößerung des Kundenstamms, Kundenselektion
              (profitable Kunden identifizieren) und Kundenbindung (Loyalty Management).
            </p>
          </div>
          <div className="p-3 bg-green-900/20 rounded border border-green-800">
            <strong>Kernziel:</strong> Maximierung des <em>Customer Lifetime Value (CLV)</em>
          </div>
          <div className="text-sm text-slate-400 mt-2">
            💡 Es ist erheblich teurer, an einen neuen Kunden zu verkaufen als an einen bestehenden!
          </div>
        </div>
      ),
    },
    {
      id: 'customer-journey',
      title: 'Customer Journey (5 Phasen)',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <span className="text-2xl">👀</span>
            <div>
              <div className="font-medium text-amber-300">1. Awareness</div>
              <div className="text-sm text-slate-400">Aufmerksamkeit wecken (Werbung, Social Media)</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <span className="text-2xl">🤔</span>
            <div>
              <div className="font-medium text-blue-300">2. Consideration</div>
              <div className="text-sm text-slate-400">Kunde vergleicht Alternativen</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <span className="text-2xl">🛒</span>
            <div>
              <div className="font-medium text-green-300">3. Purchase</div>
              <div className="text-sm text-slate-400">Kaufentscheidung</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <span className="text-2xl">🔄</span>
            <div>
              <div className="font-medium text-purple-300">4. Retention</div>
              <div className="text-sm text-slate-400">Bindung, Service, Wiederkauf</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <span className="text-2xl">📢</span>
            <div>
              <div className="font-medium text-pink-300">5. Advocacy</div>
              <div className="text-sm text-slate-400">Kunde empfiehlt aktiv weiter</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'crm-arten',
      title: 'Die 4 CRM-Arten',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <h4 className="font-bold text-indigo-300 mb-2">1. Strategisches CRM</h4>
            <p className="text-sm text-slate-300">
              Leitet sich aus der Unternehmensstrategie ab. Definiert <strong>welche Ziele</strong> mit
              <strong> welchen Kundengruppen</strong> durch <strong>welche Maßnahmen</strong> über
              <strong> welchen Zeitraum</strong> erreicht werden sollen.
            </p>
            <p className="text-xs text-indigo-400 mt-2">→ Baut Wissen auf, optimiert Interaktion, maximiert CLV</p>
          </div>

          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-bold text-cyan-300 mb-2">2. Analytisches CRM</h4>
            <p className="text-sm text-slate-300">
              Nutzt <strong>Business Intelligence Methoden</strong>: Data Warehouse, Data Mining, OLAP
              zur Kundenanalyse und Zielgruppenidentifikation.
            </p>
            <p className="text-xs text-cyan-400 mt-2">→ Quantifiziert Maßnahmen, ermittelt Share of Wallet</p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-2">3. Operatives CRM</h4>
            <p className="text-sm text-slate-300">
              Setzt die identifizierten Maßnahmen in <strong>automatisierten Lösungen</strong> für
              Marketing, Sales und Service um (Front-Office, Kampagnenmanagement).
            </p>
            <p className="text-xs text-green-400 mt-2">→ Umsetzung der Strategie</p>
          </div>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">4. Kommunikatives CRM</h4>
            <p className="text-sm text-slate-300">
              Management aller <strong>Kommunikationskanäle</strong> (Telefon, E-Mail, Web).
              Synchronisierung für bidirektionale Kommunikation.
            </p>
            <p className="text-xs text-amber-400 mt-2">→ Multi-Channel Management</p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>⚠️ Klausur-Falle:</strong> Strategisches CRM ≠ BI-Methoden!
            Das ist ANALYTISCHES CRM. Strategisch = Zielsetzung und Planung.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: CrmTypesDiagram,
      },
    },
    {
      id: 'crm-ueben',
      title: 'CRM-Typen üben',
      content: (
        <div className="space-y-4">
          <p>
            Ordne die Begriffe den richtigen CRM-Typen zu. Dies ist eine häufige Klausurfrage!
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: CrmTypesGame,
      },
    },
    {
      id: 'clv',
      title: 'Customer Lifetime Value (CLV)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <p className="text-green-200">
              <strong>CLV</strong> = Gesamtwert eines Kunden über die gesamte Dauer der Geschäftsbeziehung.
            </p>
          </div>
          <div className="p-3 bg-slate-800 rounded">
            <p className="font-mono text-sm">
              CLV = (Umsatz pro Jahr × Beziehungsdauer) - Kundenpflegekosten
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Share of Wallet</h4>
            <p className="text-slate-300 text-sm">
              Der Anteil der Kaufkraft eines Kunden, der beim Unternehmen bleibt.
              Ziel: Maximierung durch Cross-Selling und Up-Selling.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'scheitern',
      title: 'Warum CRM-Projekte scheitern',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
            <p className="text-red-200 text-xl font-bold">Misserfolgsquote: ~50%</p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Hauptgründe (in Reihenfolge):</h4>
            <ol className="list-decimal list-inside text-slate-300 space-y-2">
              <li>Mangel an bereichs- und funktionsübergreifender Koordination</li>
              <li>Keine CRM Business Strategie</li>
              <li>Fehlende Prozessänderungen</li>
              <li>Mangelnde Senior Executive Unterstützung</li>
            </ol>
          </div>
          <p className="text-sm text-amber-400 mt-4">
            💡 Bei CRM ist der "Faktor Mensch/Strategie" kritischer als bei reinen IT-Projekten!
          </p>
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
        explanation: 'Korrekt. Eine moderne CRM-Strategie bietet eine 360°-Kundensicht über alle Phasen.',
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
        id: 'crm-scheitern-quote',
        type: 'multiple-choice',
        question: 'CRM-Projekte haben eine unterdurchschnittlich niedrige Misserfolgsquote von etwa 10%, da sie hauptsächlich technische Herausforderungen darstellen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! CRM-Projekte haben eine Misserfolgsquote von ca. 50%. Der Hauptgrund ist der "Faktor Mensch/Strategie", nicht Technik.',
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
          modelAnswer: '1. Maximierung des Customer Lifetime Value (CLV) - langfristiger Kundenwert\n2. Reduzierung der Churn Rate - Kundenabwanderung minimieren\n3. Erhöhung des Share of Wallet - größerer Anteil der Kundenausgaben\n\nWeitere: Cross-/Up-Selling, Kundenzufriedenheit steigern, 360°-Kundensicht',
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
          modelAnswer: '1. Strategisches CRM: Definiert Ziele, Kundengruppen und Maßnahmen aus der Unternehmensstrategie\n2. Analytisches CRM: Nutzt BI-Methoden (Data Mining, OLAP) zur Kundenanalyse\n3. Operatives CRM: Setzt Maßnahmen in automatisierten Lösungen um (Marketing, Sales, Service)\n4. Kommunikatives CRM: Multi-Channel-Management aller Kundenkanäle\n\nZusammenspiel: Strategie → Analyse → Umsetzung → Kommunikation',
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
          question: 'Berechnen Sie den CLV für einen Kunden: Geschäftsbeziehung 10 Jahre, Konsole alle 2 Jahre für 500€, Kundenpflege 50€/Jahr.',
          placeholder: 'CLV = ...',
          modelAnswer: 'Umsatz: 5 Käufe × 500€ = 2.500€\nKosten: 10 Jahre × 50€ = 500€\n\nCLV = 2.500€ - 500€ = 2.000€\n\n(Vereinfachte Formel ohne Diskontierung)',
          keyPoints: [
            'Anzahl Käufe richtig berechnet',
            'Gesamtkosten ermittelt',
            'CLV = Umsatz - Kosten',
          ],
          explanation: 'Der CLV zeigt den Gesamtwert eines Kunden über die Beziehungsdauer.',
        },
      ],
    },
    {
      id: 'crm-scheitern-task',
      title: 'Warum CRM-Projekte scheitern',
      points: 15,
      context: (
        <p>
          Die Misserfolgsquote von CRM-Projekten liegt bei etwa 50% - deutlich höher
          als bei anderen IT-Projekten.
        </p>
      ),
      parts: [
        {
          id: 'crm-scheitern-a',
          type: 'free-text',
          question: 'Nennen Sie die vier Hauptgründe für das Scheitern von CRM-Projekten.',
          placeholder: '1. ...',
          modelAnswer: '1. Mangel an bereichs- und funktionsübergreifender Koordination\n2. Keine CRM Business Strategie\n3. Fehlende Prozessänderungen\n4. Mangelnde Senior Executive Unterstützung\n\nBesonderheit: Bei CRM ist der "Faktor Mensch/Strategie" kritischer als bei reinen IT-Projekten!',
          keyPoints: [
            'Fehlende Koordination',
            'Keine Strategie',
            'Fehlende Prozessänderungen',
            'Mangelnde Führungsunterstützung',
          ],
          explanation: 'CRM scheitert meist an organisatorischen, nicht technischen Gründen.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'erp-grundlagen', title: 'ERP', relationship: 'liefert Kundendaten' },
    { id: 'business-intelligence', title: 'Business Intelligence', relationship: 'Analysemethoden' },
    { id: 'big-data', title: 'Big Data', relationship: 'Kundenanalyse' },
  ],
}
