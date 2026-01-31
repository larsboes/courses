// src/content/ipdg/topics/big-data.tsx
import type { Topic } from '@/core/types/content'

export const bigDataTopic: Topic = {
  id: 'big-data',
  title: 'Big Data Analytics',
  description: 'Die 7 Vs, Analytics Evolution, Paradigmenwechsel, Text Mining',
  icon: '🔮',
  examNotes: 'Vs kennen! Descriptive vs Predictive vs Prescriptive unterscheiden!',

  sections: [
    {
      id: 'definition',
      title: 'Was ist Big Data?',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <p className="text-purple-200">
              <strong>Big Data</strong> = Analyse großer, komplexer und sich schnell ändernder
              Datenmengen, die mit herkömmlichen Methoden schwer zu verarbeiten sind.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            Big Data ersetzt Intuition und Erfahrung durch datendominierte Prozesse
            und erfordert Flexibilität für Innovationen.
          </p>
        </div>
      ),
    },
    {
      id: 'vs',
      title: 'Die 7 Vs von Big Data',
      content: (
        <div className="space-y-3">
          <div className="grid gap-2">
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-blue-400">V</span>
              <div>
                <span className="font-medium text-blue-300">Volume</span>
                <span className="text-sm text-slate-400 ml-2">Große Datenmengen</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-green-400">V</span>
              <div>
                <span className="font-medium text-green-300">Velocity</span>
                <span className="text-sm text-slate-400 ml-2">Hohe Geschwindigkeit der Erzeugung</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-amber-400">V</span>
              <div>
                <span className="font-medium text-amber-300">Variety</span>
                <span className="text-sm text-slate-400 ml-2">Verschiedene Datentypen</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-red-400">V</span>
              <div>
                <span className="font-medium text-red-300">Veracity</span>
                <span className="text-sm text-slate-400 ml-2">Wahrhaftigkeit/Qualität</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-purple-400">V</span>
              <div>
                <span className="font-medium text-purple-300">Validity</span>
                <span className="text-sm text-slate-400 ml-2">Gültigkeit der Daten</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-cyan-400">V</span>
              <div>
                <span className="font-medium text-cyan-300">Volatility</span>
                <span className="text-sm text-slate-400 ml-2">Flüchtigkeit/Veränderlichkeit</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-pink-400">V</span>
              <div>
                <span className="font-medium text-pink-300">Value</span>
                <span className="text-sm text-slate-400 ml-2">Wert/Nutzen der Daten</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'paradigmenwechsel',
      title: 'Paradigmenwechsel: BI → Big Data',
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Aspekt</th>
                  <th className="text-left py-2 px-3 text-amber-400">Traditionelles Data Mining</th>
                  <th className="text-left py-2 px-3 text-green-400">Big Data Ansatz</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Fokus</td>
                  <td className="py-2 px-3">Kundengruppen</td>
                  <td className="py-2 px-3">Individueller Kunde</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">Analyse</td>
                  <td className="py-2 px-3">Zielgruppen klassifizieren</td>
                  <td className="py-2 px-3">Realtime individuelle Analyse</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Cross-/Up-Selling</td>
                  <td className="py-2 px-3">Produktorientiert</td>
                  <td className="py-2 px-3">Kundenorientiert</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-green-900/20 rounded border border-green-800 text-sm">
            💡 Big Data: Der Kunde existiert als <strong>Individuum, als Person</strong> -
            nicht nur als Teil einer Zielgruppe!
          </div>
        </div>
      ),
    },
    {
      id: 'analytics-evolution',
      title: 'Analytics Evolution',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">Descriptive Analytics 📊</h4>
            <p className="text-sm text-slate-300">
              <strong>Vergangenheit:</strong> Was ist passiert? Warum?
            </p>
            <p className="text-xs text-amber-400 mt-1">
              → Data Mining historischer Daten, Management Reports
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-bold text-blue-300 mb-2">Predictive Analytics 🔮</h4>
            <p className="text-sm text-slate-300">
              <strong>Zukunft:</strong> Was wird passieren?
            </p>
            <p className="text-xs text-blue-400 mt-1">
              → Machine Learning, statistische Modelle, Vorhersagen
            </p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-2">Prescriptive Analytics 🎯</h4>
            <p className="text-sm text-slate-300">
              <strong>Handlung:</strong> Was sollen wir tun? Wann und warum?
            </p>
            <p className="text-xs text-green-400 mt-1">
              → Entscheidungsoptionen, Echtzeit-Analyse, hybride Daten
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'text-mining',
      title: 'Text Mining & Sentiment Analysis',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <h4 className="font-bold text-cyan-300 mb-2">Text Mining</h4>
            <p className="text-sm text-slate-300">
              Prozess, um unstrukturierten Text für analytische Methoden aufzubereiten.
            </p>
            <p className="text-xs text-cyan-400 mt-1">
              Anwendung: Suchmaschinen, Spam-Filter, Fraud Detection
            </p>
          </div>

          <div className="p-4 bg-pink-900/30 rounded-lg border border-pink-700">
            <h4 className="font-bold text-pink-300 mb-2">Sentiment Analysis</h4>
            <p className="text-sm text-slate-300">
              Analyse von Emotionen, Meinungen und Haltungen in sozialen Medien.
            </p>
            <p className="text-xs text-pink-400 mt-1">
              Bewertung: Positiv / Negativ / Neutral
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg mt-4">
            <h4 className="font-bold text-amber-300 mb-2">Levenshtein-Distanz</h4>
            <p className="text-sm text-slate-300">
              Minimale Anzahl von Einfüge-, Lösch- und Ersetzungsoperationen,
              um Zeichenkette A in B umzuwandeln.
            </p>
            <div className="mt-2 p-2 bg-slate-900 rounded font-mono text-sm">
              "Sensor" → "Senator" = <span className="text-green-400">2 Operationen</span>
              <br />
              <span className="text-slate-500">(+A einfügen, S→T ersetzen)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'strukturiertheit',
      title: 'Strukturiertheit von Daten',
      content: (
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="p-2 bg-green-900/20 rounded border border-green-800">
              <span className="font-medium text-green-300">Strukturiert:</span>
              <span className="text-sm text-slate-400 ml-2">Klare Struktur (Datenbanktabellen)</span>
            </div>
            <div className="p-2 bg-blue-900/20 rounded border border-blue-800">
              <span className="font-medium text-blue-300">Semistrukturiert:</span>
              <span className="text-sm text-slate-400 ml-2">Teilweise Struktur (XML, JSON)</span>
            </div>
            <div className="p-2 bg-amber-900/20 rounded border border-amber-800">
              <span className="font-medium text-amber-300">Quasistrukturiert:</span>
              <span className="text-sm text-slate-400 ml-2">Gewisse Regelmäßigkeiten</span>
            </div>
            <div className="p-2 bg-red-900/20 rounded border border-red-800">
              <span className="font-medium text-red-300">Unstrukturiert:</span>
              <span className="text-sm text-slate-400 ml-2">Keine Struktur (Text, Bilder, Videos)</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            <strong>Hadoop</strong> = Open-Source-Framework für Map Reduce zur Verarbeitung
            unstrukturierter Daten.
          </p>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'bd-data-mining-gruppen',
        type: 'multiple-choice',
        question: 'Data Mining mit Big Data Bezug zeichnet sich dadurch aus, dass Kaufmustererkennung nach Kundengruppen und nicht nach individuellen Personen erfolgt. Der individuelle Kunde erscheint nicht, sondern es werden Zielgruppen identifiziert und dann mit entsprechenden Marketingaktionen adressiert.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt TRADITIONELLES Data Mining, nicht Big Data! Big Data fokussiert auf den INDIVIDUELLEN Kunden als Person, nicht auf Zielgruppen.',
      },
      {
        id: 'bd-lean-it',
        type: 'multiple-choice',
        question: 'Lean IT beschreibt nicht den Wandel von einer technologie- und dienstleistungsdominierten Organisation zu einer Organisation, die Prozesse und Aufwand vermeidet, die keinen Wert für das Unternehmen haben.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Doppelte Verneinung beachten! Lean IT BESCHREIBT genau diesen Wandel - Vermeidung von Verschwendung. Die Aussage "beschreibt nicht" ist also falsch.',
      },
      {
        id: 'bd-itil',
        type: 'multiple-choice',
        question: 'ITIL (IT Infrastructure Library) ist der De-facto-Standard für die Umwandlung einer IT-Organisation von einer Technologieverwaltung zu einem Dienstleistungsanbieter.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. ITIL ist die Best-Practice-Sammlung für IT-Service-Management.',
      },
      {
        id: 'bd-descriptive-analytics',
        type: 'multiple-choice',
        question: 'Descriptive Analytics ist zukunftsorientiert und beantwortet die Frage "Was wird passieren?"',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Descriptive Analytics ist VERGANGENHEITSBEZOGEN (Was ist passiert?). PREDICTIVE Analytics ist zukunftsorientiert.',
      },
      {
        id: 'bd-predictive-analytics',
        type: 'multiple-choice',
        question: 'Predictive Analytics verwendet historische Daten kombiniert mit Regeln, Algorithmen und externen Daten, um Vorhersagen über z.B. Marktentwicklungen zu treffen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Predictive Analytics nutzt Machine Learning und statistische Methoden für Vorhersagen.',
      },
      {
        id: 'bd-prescriptive-analytics',
        type: 'multiple-choice',
        question: 'Prescriptive Analytics beschreibt nicht nur wann ein Ereignis auftritt, sondern auch warum, und schlägt Entscheidungsoptionen vor.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Prescriptive Analytics geht über Vorhersagen hinaus und empfiehlt konkrete Handlungen.',
      },
      {
        id: 'bd-sentiment-analysis',
        type: 'multiple-choice',
        question: 'Sentiment Analysis befasst sich mit der Analyse von Emotionen, Ansichten, Meinungen und Haltungen einzelner Personen gegenüber Organisationen, Produkten oder Dienstleistungen über soziale Medien.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Sentiment Analysis bewertet Meinungen als positiv, negativ oder neutral.',
      },
      {
        id: 'bd-text-mining',
        type: 'multiple-choice',
        question: 'Text Mining ist der Prozess, strukturierten Text so aufzubereiten, dass er in einer relationalen Datenbank gespeichert werden kann.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Text Mining bereitet UNSTRUKTURIERTEN Text für analytische Methoden auf. Anwendung: Suchmaschinen, Spam-Filter, Fraud Detection.',
      },
      {
        id: 'bd-paradigmenwechsel',
        type: 'multiple-choice',
        question: 'Der Big-Data-Ansatz verwendet Data-Mining-Resultate zur Realtime-Analyse des Kundenverhaltens auf individueller Basis und zieht daraus Rückschlüsse auf Gruppenverhalten.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Big Data analysiert Individuen in Echtzeit - der umgekehrte Ansatz zum traditionellen Data Mining.',
      },
    ],
  },

  relatedTopics: [
    { id: 'business-intelligence', title: 'Business Intelligence', relationship: 'Grundlage' },
    { id: 'crm', title: 'CRM', relationship: 'Kundenanalyse' },
  ],
}
