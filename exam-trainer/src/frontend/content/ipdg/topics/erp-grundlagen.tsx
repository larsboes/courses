// src/content/ipdg/topics/erp-grundlagen.tsx
import type { Topic } from '@/core/types/content'
import { ErpModuleMap } from '../diagrams/ErpModuleMap'
import { ProcessFlowBuilder } from '../diagrams/ProcessFlowBuilder'
import { ConceptConfusionBuster } from '../diagrams/ConceptConfusionBuster'

export const erpGrundlagenTopic: Topic = {
  id: 'erp-grundlagen',
  title: 'ERP - Enterprise Resource Planning',
  description: 'Definition, Ziele, Template, Configuration vs. Customization, TCO',
  icon: '🏢',
  examNotes: 'Definitionen genau kennen - Unterschied Configuration/Customization!',

  sections: [
    {
      id: 'definition',
      title: 'Definition ERP-System',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Ein <strong>ERP-System</strong> unterstützt sämtliche in einem Unternehmen
              ablaufenden Geschäftsprozesse. Es enthält Module für Beschaffung, Produktion,
              Vertrieb, Finanz- und Rechnungswesen usw., die über eine{' '}
              <strong>gemeinsame Datenbasis</strong> verbunden sind.
            </p>
          </div>
          <p>
            Die Standardisierung von Geschäftsprozessen über Organisationsgrenzen hinaus
            kann enorme Synergieeffekte haben. ERP wird als <em>Business-Tool</em> und
            nicht als IT-Tool wahrgenommen.
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: ErpModuleMap,
      },
    },
    {
      id: 'ziele',
      title: 'Ziele der ERP-Implementierung',
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-2xl">📋</span>
              <div>
                <div className="font-medium text-green-300">1. Standardisierung von Geschäftsprozessen</div>
                <div className="text-sm text-slate-400">Einheitliche und durchgängige Prozesslandschaft schaffen</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <span className="text-2xl">🗄️</span>
              <div>
                <div className="font-medium text-blue-300">2. Standardisierung von Stammdaten</div>
                <div className="text-sm text-slate-400">Interne und externe Stammdaten vereinheitlichen</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <span className="text-2xl">🖥️</span>
              <div>
                <div className="font-medium text-purple-300">3. Standardisierung der IT-Infrastruktur</div>
                <div className="text-sm text-slate-400">Hardware, Software, Wartungsverträge konsolidieren</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'stammdaten',
      title: 'Stammdaten & Datenqualität',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <p className="text-amber-200">
              <strong>Stammdaten</strong> sind wichtige Grunddaten eines Betriebs, die über
              einen gewissen Zeitraum <em>nicht verändert</em> werden (z.B. Artikel, Kunden,
              Mitarbeiter, Lieferanten, Stücklisten).
            </p>
          </div>
          <p className="text-red-300 text-sm">
            ⚠️ Bei Unternehmen ohne Stammdatenmanagement können im Laufe der Zeit
            <strong> 50% der Daten obsolet</strong> werden!
          </p>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Datenqualitätsdimensionen:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-slate-800 rounded">✓ Genauigkeit</div>
              <div className="p-2 bg-slate-800 rounded">✓ Vollständigkeit</div>
              <div className="p-2 bg-slate-800 rounded">✓ Aktualität</div>
              <div className="p-2 bg-slate-800 rounded">✓ Konsistenz</div>
              <div className="p-2 bg-slate-800 rounded">✓ Eindeutigkeit</div>
              <div className="p-2 bg-slate-800 rounded">✓ Zugänglichkeit</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'template',
      title: 'ERP-Template',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200">
              Das <strong>ERP-Template</strong> ist die Abbildung der Wertschöpfungskette,
              in dem <strong>80-90%</strong> aller Geschäftsprozesse standardisiert enthalten sind.
              Es wird zentral entwickelt, gewartet und ausgerollt.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Template-Bestandteile:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Globale Konten</li>
              <li>Globale Parameter</li>
              <li>Grundlegende Stammdatenstandards</li>
            </ul>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            💡 Das <em>Referenzsystem</em> (nicht das Prozesscluster!) definiert alle
            global anwendbaren Anwendungssystemstrukturen und Datenstandards.
          </p>
        </div>
      ),
    },
    {
      id: 'config-vs-custom',
      title: 'Configuration vs. Customization',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-bold text-green-300 mb-2">Configuration ✓</h4>
              <p className="text-sm text-slate-300">
                Abbildung der Wertschöpfungskette durch Konfiguration von Parametern
                + Stammdaten unter <strong>ausschließlicher Verwendung von Standard-Modulen</strong>.
              </p>
              <p className="text-xs text-green-400 mt-2">→ OHNE externe Programmierung</p>
            </div>
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-700">
              <h4 className="font-bold text-orange-300 mb-2">Customization ⚙️</h4>
              <p className="text-sm text-slate-300">
                Ergänzung/Modifikation von Geschäftsprozessmodulen durch
                <strong> externe Programme</strong>, die nicht im Standard existieren.
              </p>
              <p className="text-xs text-orange-400 mt-2">→ MIT externer Programmierung</p>
            </div>
          </div>
          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>⚠️ Klausur-Falle:</strong> Die Definitionen werden oft vertauscht abgefragt!
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: ConceptConfusionBuster,
      },
    },
    {
      id: 'geschaeftsprozesse',
      title: 'Geschäftsprozesse üben',
      content: (
        <div className="space-y-4">
          <p>
            Ordne die Schritte der wichtigsten ERP-Geschäftsprozesse in die richtige Reihenfolge.
            Dies hilft beim Verständnis der Prozessabläufe.
          </p>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: ProcessFlowBuilder,
      },
    },
    {
      id: 'tco',
      title: 'Total Cost of Ownership (TCO)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <p>
              <strong>TCO</strong> = Gesamtkosten von Investitionsgütern während ihrer
              gesamten <em>Nutzungsdauer</em> (nicht Lebenszyklus!).
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Kostenart</th>
                  <th className="text-left py-2 px-3">Beschreibung</th>
                  <th className="text-left py-2 px-3">Budgetierbar</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-green-400">Direkte Kosten</td>
                  <td className="py-2 px-3">Kapitalkosten, Administration, Support, HW, SW, Netzwerk</td>
                  <td className="py-2 px-3">✓ Ja</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-amber-400">Indirekte Kosten</td>
                  <td className="py-2 px-3">Schulung, Verfügbarkeit, Antwortzeiten</td>
                  <td className="py-2 px-3">✗ Schwer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'lokalisierung',
      title: 'Lokalisierung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <p className="text-cyan-200">
              <strong>Lokalisierung</strong> = Anpassung an lokale sprachliche, kulturelle
              und rechtliche Gegebenheiten (Steuervorschriften, Sprache, Kultur).
            </p>
          </div>
          <p>
            <strong>Grundsatz:</strong> So viel Standard wie möglich, so wenig Anpassung wie nötig.
          </p>
          <div className="p-3 bg-green-900/20 rounded border border-green-800">
            Lokalisierungen lassen sich auf <strong>10-20%</strong> der Gesamtprozesse reduzieren.
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'erp-stammdaten-dynamik',
        type: 'multiple-choice',
        question: 'Stammdaten zeichnen sich durch eine hohe Dynamik aus und können nur mit unvertretbar hohem Aufwand global vereinheitlicht werden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Stammdaten sind gerade NICHT dynamisch - sie sind statische Grunddaten, die über längere Zeit unverändert bleiben. BEWEGUNGSDATEN sind dynamisch.',
      },
      {
        id: 'erp-konfiguration-def',
        type: 'multiple-choice',
        question: 'Konfiguration ist die Abbildung der Wertschöpfungskette eines Unternehmens mit einem ERP-System durch die Konfiguration von Parametern in Kombination mit den entsprechenden Stammdaten unter ausschließlicher Verwendung von standardisierten Geschäftsprozessmodulen des Systems ohne externe Programmierung.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Diese Definition ist korrekt. Configuration nutzt nur Standard-Funktionen ohne Programmierung.',
      },
      {
        id: 'erp-customization-def',
        type: 'multiple-choice',
        question: 'Customization ist die Abbildung der Wertschöpfungskette eines Unternehmens mit einem ERP-System durch die Konfiguration von Parametern ohne externe Programmierung.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das ist die Definition von CONFIGURATION, nicht Customization. Customization erfordert externe Programmierung für Funktionen, die nicht im Standard existieren.',
      },
      {
        id: 'erp-template-referenzsystem',
        type: 'multiple-choice',
        question: 'ERP-Template: Das Referenzsystem definiert alle global anwendbaren Anwendungssystemstrukturen und Datenstandards wie globale Konten, globale Parameter, grundlegende Stammdatenstandards.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Das Referenzsystem (nicht das Prozesscluster!) definiert die globalen Standards.',
      },
      {
        id: 'erp-template-prozesscluster',
        type: 'multiple-choice',
        question: 'ERP-Template: Das Prozesscluster definiert alle global anwendbaren Anwendungssystemstrukturen und Datenstandards wie globale Konten, globale Parameter, grundlegende Stammdatenstandards.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Das REFERENZSYSTEM (nicht das Prozesscluster) definiert die globalen Standards.',
      },
      {
        id: 'erp-direkte-kosten',
        type: 'multiple-choice',
        question: 'Direkte Kosten fallen bei den Endnutzern und beim Systembetrieb an. Sie können von der Qualität der Endnutzerunterstützung beeinflusst werden und sind schwer zu budgetieren.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt INDIREKTE Kosten! Direkte Kosten (HW, SW, Support) sind budgetierbar. Indirekte Kosten (Schulung, Ausfallzeiten) sind schwer zu budgetieren.',
      },
      {
        id: 'erp-it-infrastruktur',
        type: 'multiple-choice',
        question: 'Die Standardisierung der IT-Infrastruktur umfasst die Vereinheitlichung von Hard- und Software, die Konsolidierung von globalen Einkaufskonditionen und Wartungsverträgen mit Lieferanten, die Konsolidierung von globalen Rechenzentren und die Entscheidung für eine einheitliche ERP-Software.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Die IT-Infrastruktur-Standardisierung umfasst all diese Aspekte.',
      },
      {
        id: 'erp-tco-def',
        type: 'multiple-choice',
        question: 'Total Cost of Ownership (TCO) sind die Gesamtkosten von Investitionen während ihres gesamten Lebenszyklus. Sie umfassen direkte und indirekte Kosten.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Fast richtig, aber: TCO bezieht sich auf die NUTZUNGSDAUER, nicht den "Lebenszyklus". Die Unterscheidung in direkte/indirekte Kosten stimmt.',
      },
      {
        id: 'erp-lokalisierung',
        type: 'multiple-choice',
        question: 'Die Lokalisierung von ERP-Vorlagen ermöglicht die Integration von regionalen, lokalen ERP-Systemen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Lokalisierung bedeutet die Anpassung an lokale Gegebenheiten (Steuern, Sprache, Recht), NICHT die Integration verschiedener Systeme.',
      },
      {
        id: 'erp-grundlegende-ziele',
        type: 'multiple-choice',
        question: 'Die grundlegenden Unternehmensziele einer ERP-Einführung sind: größtmögliche Lokalisierung der Geschäftsprozesse, Stammdatensysteme über Synonyme kompatibel machen, bestehende IT-Systeme pflegen und über Schnittstellen integrieren.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Die Ziele sind: STANDARDISIERUNG (nicht Lokalisierung!) von Prozessen, Stammdaten und IT-Infrastruktur.',
      },
    ],
  },

  examTasks: [
    {
      id: 'erp-einfuehrung-task',
      title: 'ERP-Einführung bei der Telekom',
      points: 25,
      context: (
        <p>
          Sie erhalten vom Managementboard der Telekom die Aufgabe, ein neues ERP-System
          für die Bereiche Finanzen, Personalwesen, Fertigung, Logistik, Service, Sales
          und Beschaffung einzuführen.
        </p>
      ),
      parts: [
        {
          id: 'erp-task-a',
          type: 'free-text',
          question: 'Was sind die drei grundlegenden Ziele einer ERP-Einführung?',
          placeholder: 'Standardisierung von...',
          modelAnswer: '1. Standardisierung von Geschäftsprozessen (einheitliche Prozesslandschaft)\n2. Standardisierung von Stammdaten (interne und externe)\n3. Standardisierung der IT-Infrastruktur (Hardware, Software, Wartungsverträge)',
          keyPoints: [
            'Standardisierung Geschäftsprozesse',
            'Standardisierung Stammdaten',
            'Standardisierung IT-Infrastruktur',
          ],
          explanation: 'Die drei Säulen der ERP-Standardisierung bilden das Fundament jeder erfolgreichen Einführung.',
        },
        {
          id: 'erp-task-b',
          type: 'free-text',
          question: 'Erklären Sie den Unterschied zwischen Configuration und Customization.',
          placeholder: 'Configuration ist...',
          modelAnswer: 'Configuration: Anpassung durch Parameter und Stammdaten OHNE externe Programmierung - nur Standard-Module werden genutzt.\n\nCustomization: Ergänzung/Modifikation durch externe Programmierung für Funktionen, die im Standard nicht existieren (z.B. Schnittstellen, Reports).',
          keyPoints: [
            'Configuration ohne Programmierung',
            'Customization mit Programmierung',
            'Standard-Module vs. Erweiterungen',
          ],
          explanation: 'Diese Unterscheidung ist fundamental für die Bewertung von ERP-Projekten.',
        },
        {
          id: 'erp-task-c',
          type: 'free-text',
          question: 'Ein Berater schlägt vor, den Systemanbieter auf Basis von Best-Practice-Erfahrungen auszuwählen, bevor die IST-Prozesse analysiert werden. Wie reagieren Sie?',
          placeholder: 'Die Reihenfolge sollte...',
          modelAnswer: 'Die Reihenfolge ist falsch! Erst müssen die IST-Prozesse dokumentiert und analysiert werden, dann kann ein passendes System ausgewählt werden. Sonst besteht das Risiko, dass die Unternehmensprozesse nicht abgebildet werden können (siehe Lidl-SAP-Desaster).',
          keyPoints: [
            'IST-Prozesse zuerst',
            'Dann Systemauswahl',
            'Risiko bei falscher Reihenfolge',
          ],
          explanation: 'Prozess vor System - eine goldene Regel der ERP-Einführung.',
        },
      ],
    },
    {
      id: 'tco-task',
      title: 'Total Cost of Ownership',
      points: 15,
      context: (
        <p>
          Sie müssen die Entscheidung zwischen On-Premise und Cloud-Lösung für das
          neue ERP-System treffen.
        </p>
      ),
      parts: [
        {
          id: 'tco-task-a',
          type: 'free-text',
          question: 'Was bedeutet TCO und welche Kostenarten umfasst es?',
          placeholder: 'TCO steht für...',
          modelAnswer: 'TCO = Total Cost of Ownership = Gesamtkosten während der Nutzungsdauer.\n\nDirekte Kosten: Budgetierbar (Lizenzen, Hardware, Support, Netzwerk)\nIndirekte Kosten: Schwer budgetierbar (Schulung, Ausfallzeiten, Produktivitätsverlust)',
          keyPoints: [
            'TCO = Gesamtkosten Nutzungsdauer',
            'Direkte Kosten (budgetierbar)',
            'Indirekte Kosten (schwer budgetierbar)',
          ],
          explanation: 'TCO ist entscheidend für die On-Premise vs. Cloud-Entscheidung.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'enterprise-architecture', title: 'Enterprise Architecture', relationship: 'Prozess- & IT-Architektur' },
    { id: 'crm', title: 'CRM', relationship: 'nutzt ERP-Daten' },
    { id: 'sap-s4hana', title: 'SAP S/4HANA', relationship: 'ERP-System' },
  ],
}
