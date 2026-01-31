// src/content/ipdg/topics/sap-s4hana.tsx
import type { Topic } from '@/core/types/content'

export const sapS4HanaTopic: Topic = {
  id: 'sap-s4hana',
  title: 'SAP S/4HANA Grundlagen',
  description: 'SAP Geschichte, S/4HANA, HANA, Fiori, Organisationseinheiten',
  icon: '🔷',
  examNotes: 'Organisationseinheiten-Hierarchie kennen! On-Premise vs Cloud!',

  sections: [
    {
      id: 'überblick',
      title: 'SAP im Überblick',
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
              <span className="text-blue-300 font-medium">Marktführer</span>
              <span className="text-sm text-slate-400 ml-2">in Unternehmens-Application Software</span>
            </div>
            <div className="p-3 bg-green-900/20 rounded border border-green-800">
              <span className="text-green-300 font-medium">~35-40%</span>
              <span className="text-sm text-slate-400 ml-2">Marktanteil im ERP-Umfeld</span>
            </div>
            <div className="p-3 bg-purple-900/20 rounded border border-purple-800">
              <span className="text-purple-300 font-medium">400.000+</span>
              <span className="text-sm text-slate-400 ml-2">Kunden in 190 Ländern</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 's4hana',
      title: 'SAP S/4HANA',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200">
              <strong>S/4HANA</strong> = Next Generation Business Suite, größte Innovation seit SAP R/3.
              Basiert auf der In-Memory Datenbank <strong>SAP HANA</strong>.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Evolution:</h4>
            <div className="flex items-center gap-2 text-sm overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-slate-800 rounded">1979: R/2</span>
              <span className="text-slate-500">→</span>
              <span className="px-3 py-1 bg-slate-800 rounded">1992: R/3</span>
              <span className="text-slate-500">→</span>
              <span className="px-3 py-1 bg-slate-800 rounded">2004: ERP</span>
              <span className="text-slate-500">→</span>
              <span className="px-3 py-1 bg-blue-800 rounded text-blue-200">2015: S/4HANA</span>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Eigenschaften:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
              <li>Arbeitet mit <strong>Echtzeit-Daten</strong></li>
              <li>Vereinfachtes Datenmodell (weniger Tabellen)</li>
              <li>Moderne Oberfläche (Fiori)</li>
              <li>Fusion von OLAP + OLTP möglich</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'hana-fiori',
      title: 'SAP HANA & Fiori',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-bold text-cyan-300 mb-2">SAP HANA</h4>
            <p className="text-sm text-slate-300">
              In-Memory Datenbank: Daten liegen im Arbeitsspeicher → extrem schnell
            </p>
            <ul className="text-xs text-cyan-400 mt-2 space-y-1">
              <li>• Spaltenorientierte Datenbank</li>
              <li>• In-Memory Verarbeitung</li>
              <li>• Komprimierung</li>
              <li>• Parallele Verarbeitung</li>
            </ul>
          </div>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">SAP Fiori</h4>
            <p className="text-sm text-slate-300">
              Moderne Benutzeroberfläche - hardwareunabhängig, Echtzeit
            </p>
            <div className="mt-2 text-xs">
              <span className="text-amber-400">3 App-Typen:</span>
              <ul className="text-slate-400 mt-1 space-y-1">
                <li>• <strong>Transaktions-Apps</strong> - Erstellen, Ändern, Anzeigen</li>
                <li>• <strong>Analytische Apps</strong> - Visueller Überblick</li>
                <li>• <strong>Factsheet-Apps</strong> - Essenzielle Infos zu Objekten</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'on-premise-cloud',
      title: 'On-Premise vs. Cloud',
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Aspekt</th>
                  <th className="text-left py-2 px-3 text-blue-400">Cloud</th>
                  <th className="text-left py-2 px-3 text-green-400">On-Premise</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Lizenz</td>
                  <td className="py-2 px-3">Subscription</td>
                  <td className="py-2 px-3">Traditional</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Wartung</td>
                  <td className="py-2 px-3">Von SAP</td>
                  <td className="py-2 px-3">Vom Kunden</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Updates</td>
                  <td className="py-2 px-3">Automatisch (Quartal)</td>
                  <td className="py-2 px-3">Kontrolliert</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Hardware</td>
                  <td className="py-2 px-3">SAP Cloud</td>
                  <td className="py-2 px-3">Firmenstandort</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Anpassung</td>
                  <td className="py-2 px-3">Limitiert (In-App)</td>
                  <td className="py-2 px-3">Volle ABAP-Erweiterbarkeit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'organisationseinheiten',
      title: 'Organisationseinheiten',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Hierarchie (von oben nach unten):</h4>
            <div className="space-y-2">
              <div className="p-2 bg-purple-900/30 rounded border-l-4 border-purple-500">
                <span className="font-medium text-purple-300">Mandant</span>
                <span className="text-sm text-slate-400 ml-2">= Konzern (größte Einheit)</span>
              </div>
              <div className="p-2 bg-blue-900/30 rounded border-l-4 border-blue-500 ml-4">
                <span className="font-medium text-blue-300">Buchungskreis</span>
                <span className="text-sm text-slate-400 ml-2">= Firma mit eigener Bilanz</span>
              </div>
              <div className="p-2 bg-green-900/30 rounded border-l-4 border-green-500 ml-8">
                <span className="font-medium text-green-300">Werk</span>
                <span className="text-sm text-slate-400 ml-2">= Produktionsstandort</span>
              </div>
              <div className="p-2 bg-amber-900/30 rounded border-l-4 border-amber-500 ml-12">
                <span className="font-medium text-amber-300">Lagerort</span>
                <span className="text-sm text-slate-400 ml-2">= Physischer Lagerbereich</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Wichtige Begriffe (Vertrieb):</h4>
            <div className="grid gap-2 text-sm">
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-cyan-400 font-medium">Verkaufsorganisation</span>
                <span className="text-slate-400 ml-2">- Verantwortlich für Verkauf</span>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-pink-400 font-medium">Vertriebsweg</span>
                <span className="text-slate-400 ml-2">- Kanal zum Kunden (Großhandel, Internet)</span>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-amber-400 font-medium">Sparte</span>
                <span className="text-slate-400 ml-2">- Gruppierung von Produkten</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'datentypen',
      title: 'Datentypen in SAP',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 bg-blue-900/30 rounded border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-2">Organisationsdaten</h4>
              <p className="text-xs text-slate-400">Definieren Unternehmensstruktur</p>
              <p className="text-xs text-slate-500 mt-1">Mandant, Buchungskreis, Werk...</p>
            </div>
            <div className="p-3 bg-green-900/30 rounded border border-green-700">
              <h4 className="font-medium text-green-300 mb-2">Stammdaten</h4>
              <p className="text-xs text-slate-400">Langfristige Grunddaten</p>
              <p className="text-xs text-slate-500 mt-1">Kunden, Material, Lieferanten...</p>
            </div>
            <div className="p-3 bg-amber-900/30 rounded border border-amber-700">
              <h4 className="font-medium text-amber-300 mb-2">Bewegungsdaten</h4>
              <p className="text-xs text-slate-400">Kurzlebige Transaktionsdaten</p>
              <p className="text-xs text-slate-500 mt-1">Bestellungen, Rechnungen...</p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'sap-mandant',
        type: 'multiple-choice',
        question: 'Der Mandant ist die betriebswirtschaftlich kleinste organisatorische Einheit in einem SAP-System, für die eine vollständige Buchhaltung abgebildet werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Der Mandant ist die GRÖSSTE Einheit (Konzern). Der BUCHUNGSKREIS ist die kleinste Einheit für vollständige Buchhaltung.',
      },
      {
        id: 'sap-hana',
        type: 'multiple-choice',
        question: 'SAP HANA ist eine In-Memory Datenbank, bei der die Daten im Arbeitsspeicher liegen und daher extrem schnell verarbeitet werden können.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. HANA = High-Performance Analytic Appliance mit In-Memory-Technologie.',
      },
      {
        id: 'sap-fiori',
        type: 'multiple-choice',
        question: 'SAP Fiori ist eine alte Benutzeroberfläche, die nur auf Desktop-Computern funktioniert.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Fiori ist eine MODERNE, hardwareunabhängige Oberfläche (Desktop, Tablet, Smartphone).',
      },
      {
        id: 'sap-buchungskreis',
        type: 'multiple-choice',
        question: 'Ein Buchungskreis ist die betriebswirtschaftlich kleinste Organisationseinheit, für die eine vollständige, in sich abgeschlossene Buchhaltung (Bilanz, GuV) abgebildet werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Jeder Buchungskreis erstellt seine eigene Bilanz und GuV.',
      },
    ],
  },

  relatedTopics: [
    { id: 'erp-grundlagen', title: 'ERP', relationship: 'SAP ist ERP-System' },
    { id: 'business-intelligence', title: 'BI', relationship: 'HANA ermöglicht Echtzeit-BI' },
  ],
}
