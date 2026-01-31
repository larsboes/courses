// src/content/ipdg/topics/enterprise-architecture.tsx
import type { Topic } from '@/core/types/content'
import { OrderToCashDiagram } from '../diagrams/OrderToCashDiagram'

export const enterpriseArchitectureTopic: Topic = {
  id: 'enterprise-architecture',
  title: 'Enterprise Architecture',
  description: 'Prozessarchitektur, IT-Architektur, Prozesshaus, Rollen',
  icon: '🏗️',
  examNotes: 'Prozesslevels und Rollen kennen! E2E-Prozesse verstehen!',

  sections: [
    {
      id: 'definition',
      title: 'Prozess- und IT-Architektur',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-2">Prozessarchitektur</h4>
              <p className="text-sm text-slate-300">
                Strukturierte Gesamtheit aller <strong>Geschäftsprozesse</strong> und deren
                Beziehungen zueinander.
              </p>
              <p className="text-xs text-blue-400 mt-2">
                → Transparenz und Steuerung der Wertschöpfungskette
              </p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
              <h4 className="font-bold text-purple-300 mb-2">IT-Architektur</h4>
              <p className="text-sm text-slate-300">
                Konzeptionelles Modell der <strong>IT-Landschaft</strong> (Hardware, Software,
                Netze, Daten, Anwendungen).
              </p>
              <p className="text-xs text-purple-400 mt-2">
                → Stabile, skalierbare Basis für Prozesse
              </p>
            </div>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Zentrale Frage:</strong> Wie bringt man beide Welten zusammen?
          </div>
        </div>
      ),
    },
    {
      id: 'prozesslevels',
      title: 'Prozessarchitektur - Die 5 Levels',
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-300">Level 1: Hauptprozess</span>
              <span className="text-xs text-slate-500">E2E-Prozesse</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              End-to-End-Prozesse entlang der Wertschöpfungskette, übergreifend über Abteilungen
            </p>
          </div>
          <div className="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-500 ml-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-300">Level 2: Prozessgruppen</span>
              <span className="text-xs text-slate-500">Logische Teilmengen</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Gruppierung von Prozessen mit Fokus auf Wertschöpfungsziele
            </p>
          </div>
          <div className="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-500 ml-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-300">Level 3: Prozess</span>
              <span className="text-xs text-slate-500">Aktivitätenfolge</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Abfolge von Aktivitäten für ein bestimmtes Ergebnis
            </p>
          </div>
          <div className="p-3 bg-amber-900/30 rounded-lg border-l-4 border-amber-500 ml-12">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-300">Level 4: Subprozess</span>
              <span className="text-xs text-slate-500">Wiederverwendbar</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Modulare, wiederverwendbare Prozesskomponenten
            </p>
          </div>
          <div className="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-500 ml-16">
            <div className="flex justify-between items-center">
              <span className="font-bold text-red-300">Level 5: Prozessschritte</span>
              <span className="text-xs text-slate-500">BPMN</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Einzelne Aktivitäten oder Entscheidungen in Flussdiagrammen
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'prozesshaus',
      title: 'Das Prozesshaus',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg">
            <div className="space-y-3">
              <div className="p-3 bg-indigo-900/40 rounded border border-indigo-700">
                <h4 className="font-medium text-indigo-300 mb-2">Management-Prozesse (Dach)</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-indigo-800 rounded">Strategy-to-Execution</span>
                  <span className="px-2 py-1 bg-indigo-800 rounded">Accounting-to-Reporting</span>
                  <span className="px-2 py-1 bg-indigo-800 rounded">Risk-to-Compliance</span>
                </div>
              </div>
              <div className="p-3 bg-green-900/40 rounded border border-green-700">
                <h4 className="font-medium text-green-300 mb-2">Kern-Prozesse (Wertschöpfung)</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-800 rounded">Lead-to-Order (L2O)</span>
                  <span className="px-2 py-1 bg-green-800 rounded">Order-to-Revenue (O2R)</span>
                  <span className="px-2 py-1 bg-green-800 rounded">Source-to-Pay (S2P)</span>
                  <span className="px-2 py-1 bg-green-800 rounded">Plan-to-Manufacture (P2M)</span>
                  <span className="px-2 py-1 bg-green-800 rounded">Contact-to-Service (C2S)</span>
                </div>
              </div>
              <div className="p-3 bg-amber-900/40 rounded border border-amber-700">
                <h4 className="font-medium text-amber-300 mb-2">Support-Prozesse (Fundament)</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-amber-800 rounded">Hire-to-Retire (H2R)</span>
                  <span className="px-2 py-1 bg-amber-800 rounded">Demand-to-Release (D2R)</span>
                  <span className="px-2 py-1 bg-amber-800 rounded">Requirements-to-Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'e2e-prozesse',
      title: 'End-to-End Prozesse',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <p className="text-cyan-200">
              <strong>End-to-End (E2E)</strong> = Betrachtung eines Prozesses vom Anfang
              (Kundenbedarf) bis zum Ende (Leistungserbringung) über Abteilungsgrenzen hinweg.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            Interaktives Beispiel: Order-to-Cash Prozess (klicke unten auf die Schritte)
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: OrderToCashDiagram,
      },
    },
    {
      id: 'e2e-beispiele',
      title: 'Wichtige E2E-Prozesse',
      content: (
        <div className="space-y-4">
          <div className="mt-4">
            <h4 className="font-medium mb-3">Wichtige E2E-Prozesse:</h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-800 rounded flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                <div>
                  <span className="font-medium text-green-300">Order-to-Cash (O2C)</span>
                  <p className="text-xs text-slate-400">Von Kundenbestellung bis Zahlungseingang</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800 rounded flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <span className="font-medium text-blue-300">Purchase-to-Pay (P2P)</span>
                  <p className="text-xs text-slate-400">Von Bestellung beim Lieferanten bis Bezahlung</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800 rounded flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <div>
                  <span className="font-medium text-purple-300">Hire-to-Retire (H2R)</span>
                  <p className="text-xs text-slate-400">Vom Recruiting bis zum Ausscheiden</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800 rounded flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <span className="font-medium text-amber-300">Idea-to-Market (I2M)</span>
                  <p className="text-xs text-slate-400">Von der Produktidee bis zur Markteinführung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'rollen',
      title: 'Rollen im Prozessmanagement',
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
            <h4 className="font-medium text-purple-300">Business Domain Owner</h4>
            <p className="text-sm text-slate-400 mt-1">
              Globale Verantwortung für Geschäftsprozesse im funktionalen Bereich.
              Setzt Unternehmensstrategie in Bereichsstrategie um.
            </p>
          </div>
          <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-medium text-blue-300">E2E Value-Chain-Owner (VCO)</h4>
            <p className="text-sm text-slate-400 mt-1">
              Gestaltung und Verbesserung der End-to-End-Wertschöpfungskette.
              Koordiniert bereichsübergreifende Initiativen.
            </p>
          </div>
          <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-medium text-green-300">Process Group Owner (L2)</h4>
            <p className="text-sm text-slate-400 mt-1">
              Verantwortet Prozessgruppe strategisch. Stellt Konsistenz sicher,
              genehmigt lokale Varianten.
            </p>
          </div>
          <div className="p-3 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-medium text-amber-300">Process Owner (L3)</h4>
            <p className="text-sm text-slate-400 mt-1">
              Definiert Prozessstandards, misst und berichtet Prozessleistung global.
              Fördert Prozessexzellenz.
            </p>
          </div>
          <div className="p-3 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-medium text-cyan-300">Subject Matter Expert (L4)</h4>
            <p className="text-sm text-slate-400 mt-1">
              Fachliche Autorität in spezifischem Themengebiet.
              Zentrale Ansprechperson für komplexe Fragen.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'capability',
      title: 'Capability vs. Prozess',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-2">Capability</h4>
              <p className="text-sm text-slate-300">
                <strong>WAS</strong> ein Unternehmen tun kann (Fähigkeit)
              </p>
              <p className="text-xs text-blue-400 mt-2">
                Beispiel: "Kundendaten analysieren"
              </p>
            </div>
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-bold text-green-300 mb-2">Prozess</h4>
              <p className="text-sm text-slate-300">
                <strong>WIE</strong> es getan wird (Ablauf)
              </p>
              <p className="text-xs text-green-400 mt-2">
                Beispiel: "Kundendaten in CRM eingeben, Report erstellen"
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'ea-e2e-definition',
        type: 'multiple-choice',
        question: 'End-to-End (E2E) bezeichnet die Betrachtung eines Prozesses vom Anfang (Kundenbedarf) bis zum Ende (Leistungserbringung) über Abteilungsgrenzen hinweg.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. E2E-Prozesse überspannen mehrere Abteilungen und betrachten den gesamten Wertschöpfungsfluss.',
      },
      {
        id: 'ea-order-to-cash',
        type: 'multiple-choice',
        question: 'Order-to-Cash beschreibt den Prozess von der Bestellung beim Lieferanten bis zur Bezahlung.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das ist Purchase-to-Pay (P2P)! Order-to-Cash (O2C) beschreibt den Prozess von der Kundenbestellung bis zum Zahlungseingang.',
      },
      {
        id: 'ea-process-owner',
        type: 'multiple-choice',
        question: 'Der Process Owner (L3) ist für die Förderung von Prozessexzellenz durch die Definition von Prozessstandards sowie die globale Messung und Berichterstattung der Prozessleistung verantwortlich.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Der Process Owner auf Level 3 definiert Standards und misst die Performance.',
      },
      {
        id: 'ea-capability-prozess',
        type: 'multiple-choice',
        question: 'Eine Capability beschreibt WIE etwas getan wird, während ein Prozess beschreibt WAS getan werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Umgekehrt! Capability = WAS (Fähigkeit), Prozess = WIE (Ablauf).',
      },
      {
        id: 'ea-prozesshaus',
        type: 'multiple-choice',
        question: 'Im Prozesshaus bilden die Kern-Prozesse (wie Order-to-Cash) das Dach, während Management-Prozesse das Fundament bilden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Umgekehrt! Management-Prozesse bilden das Dach (strategische Steuerung), Kern-Prozesse die Mitte (Wertschöpfung), Support-Prozesse das Fundament.',
      },
    ],
  },

  relatedTopics: [
    { id: 'erp-grundlagen', title: 'ERP', relationship: 'implementiert Prozesse' },
    { id: 'crm', title: 'CRM', relationship: 'Customer Journey' },
  ],
}
