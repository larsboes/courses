// src/content/ipdg/topics/big-data.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { AnalyticsEvolutionStepper } from '../diagrams/AnalyticsEvolutionStepper'
import { BigDataVsExplorer } from '../diagrams/BigDataVsExplorer'

export const bigDataTopic: Topic = {
  id: 'big-data',
  title: 'Big Data & Advanced Analytics',
  description: 'Von BI zu Big Data: 7 Vs, Analytics Evolution, CRISP-DM, Netflix',
  icon: '🔮',
  examNotes: 'Vs kennen! Descriptive vs Predictive vs Prescriptive unterscheiden! CRISP-DM Reihenfolge!',

  sections: [
    // ── Section 1: BI → Big Data Bridge ──────────────────────────
    {
      id: 'bi-zu-big-data',
      title: 'Von BI zu Big Data - Was hat sich verändert?',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200 text-sm">
              Im BI-Thema haben wir gelernt, wie <strong>strukturierte Daten</strong> im
              Data Warehouse analysiert werden - ETL, OLAP-Cubes, Sternschema.
              Aber was passiert, wenn die Daten <em>zu groß, zu schnell, zu vielfältig</em> werden?
            </p>
          </div>

          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <p className="text-purple-200">
              <strong>Big Data</strong> = Analyse großer, komplexer und sich schnell ändernder
              Datenmengen, die mit herkömmlichen Methoden schwer zu verarbeiten sind.
            </p>
            <p className="text-sm text-purple-300 mt-2">
              Big Data ersetzt Intuition und Erfahrung durch datendominierte Prozesse
              und erfordert Flexibilität für Innovationen.
            </p>
          </div>

          <MermaidDiagram
            chart={`flowchart LR
  subgraph BI["Traditionelles BI"]
    DW["Data Warehouse"]
    OLAP["OLAP Cubes"]
    REP["Reports & Dashboards"]
    DW --> OLAP --> REP
  end
  subgraph BD["Big Data"]
    DL["Data Lake"]
    ML["Machine Learning"]
    RT["Realtime Analytics"]
    DL --> ML --> RT
  end
  BI -->|"Daten zu groß,\\nzu schnell,\\nzu vielfältig"| BD
  style BI fill:#1e3a5f,stroke:#3b82f6
  style BD fill:#3b1f5e,stroke:#a855f7`}
            className="bg-slate-800/50 rounded-lg p-3"
          />

        </div>
      ),
    },

    // ── Section 2: Die 7 Vs ─────────────────────────────────────
    {
      id: 'vs',
      title: 'Die 7 Vs von Big Data',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Die 7 Vs beschreiben die Herausforderungen, die Big Data von traditioneller
            BI-Analyse unterscheiden. Jedes V steht für eine Dimension der Komplexität.
          </p>

          <div className="grid gap-2">
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-blue-400">V</span>
              <div>
                <span className="font-medium text-blue-300">Volume</span>
                <span className="text-sm text-slate-400 ml-2">Große Datenmengen (TB, PB)</span>
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
                <span className="text-sm text-slate-400 ml-2">Verschiedene Datentypen (Text, Bild, Video)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-red-400">V</span>
              <div>
                <span className="font-medium text-red-300">Veracity</span>
                <span className="text-sm text-slate-400 ml-2">Wahrhaftigkeit / Qualität der Daten</span>
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
                <span className="text-sm text-slate-400 ml-2">Flüchtigkeit / Veränderlichkeit</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-pink-400">V</span>
              <div>
                <span className="font-medium text-pink-300">Value</span>
                <span className="text-sm text-slate-400 ml-2">Wert / Nutzen der Daten</span>
              </div>
            </div>
          </div>

          <MermaidDiagram
            chart={`flowchart TB
  BD["Big Data"]
  BD --- VOL["Volume\\nGroße Mengen"]
  BD --- VEL["Velocity\\nHohe Geschwindigkeit"]
  BD --- VAR["Variety\\nViele Datentypen"]
  BD --- VERA["Veracity\\nQualität"]
  BD --- VALID["Validity\\nGültigkeit"]
  BD --- VOLAT["Volatility\\nFlüchtigkeit"]
  BD --- VAL["Value\\nNutzwert"]
  style BD fill:#7c3aed,stroke:#a855f7,color:#fff
  style VOL fill:#1e40af,stroke:#3b82f6,color:#fff
  style VEL fill:#166534,stroke:#22c55e,color:#fff
  style VAR fill:#92400e,stroke:#f59e0b,color:#fff
  style VERA fill:#991b1b,stroke:#ef4444,color:#fff
  style VALID fill:#581c87,stroke:#a855f7,color:#fff
  style VOLAT fill:#155e75,stroke:#06b6d4,color:#fff
  style VAL fill:#831843,stroke:#ec4899,color:#fff`}
            className="bg-slate-800/50 rounded-lg p-3"
          />

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Alle 7 Vs auswendig kennen!
            Veracity (Wahrhaftigkeit/Qualität) und Validity (Gültigkeit) nicht verwechseln.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: BigDataVsExplorer,
      },
    },

    // ── Section 3: Analytics Evolution ──────────────────────────
    {
      id: 'analytics-evolution',
      title: 'Analytics Evolution',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            BI beschränkt sich größtenteils auf <strong>Descriptive Analytics</strong> (Was ist passiert?).
            Big Data erweitert dies um Predictive und Prescriptive Analytics - von der Vergangenheit
            über die Zukunft bis zur konkreten Handlungsempfehlung.
          </p>

          <MermaidDiagram
            chart={`flowchart LR
  D["Descriptive\\n'Was ist passiert?'\\n--- Vergangenheit ---"]
  P["Predictive\\n'Was wird passieren?'\\n--- Zukunft ---"]
  PR["Prescriptive\\n'Was sollen wir tun?'\\n--- Handlung ---"]
  D -->|"+ ML & Statistik"| P -->|"+ Echtzeit & Optimierung"| PR
  style D fill:#92400e,stroke:#f59e0b,color:#fff
  style P fill:#1e40af,stroke:#3b82f6,color:#fff
  style PR fill:#166534,stroke:#22c55e,color:#fff`}
            className="bg-slate-800/50 rounded-lg p-3"
          />

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">Descriptive Analytics</h4>
            <p className="text-sm text-slate-300">
              <strong>Vergangenheit:</strong> Was ist passiert? Warum?
            </p>
            <p className="text-xs text-amber-400 mt-1">
              Data Mining historischer Daten, Management Reports, Dashboards
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-bold text-blue-300 mb-2">Predictive Analytics</h4>
            <p className="text-sm text-slate-300">
              <strong>Zukunft:</strong> Was wird passieren?
            </p>
            <p className="text-xs text-blue-400 mt-1">
              Machine Learning, statistische Modelle, Vorhersagen, externe Daten
            </p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-2">Prescriptive Analytics</h4>
            <p className="text-sm text-slate-300">
              <strong>Handlung:</strong> Was sollen wir tun? Wann und warum?
            </p>
            <p className="text-xs text-green-400 mt-1">
              Entscheidungsoptionen, Echtzeit-Analyse, hybride Daten
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Descriptive ist VERGANGENHEITSBEZOGEN.
            Predictive ist zukunftsorientiert. Prescriptive schlägt konkrete Handlungen vor.
            Diese drei Stufen werden sehr gerne in Wahr/Falsch-Fragen vertauscht!
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: AnalyticsEvolutionStepper,
      },
    },

    // ── Section 4: Analytics Lifecycle ──────────────────────────
    {
      id: 'analytics-lifecycle',
      title: 'Analytics Lifecycle - CRISP-DM vs SEMMA',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Wie geht man ein Big-Data-Projekt systematisch an? Zwei etablierte Prozessmodelle
            geben den Rahmen vor. Der entscheidende Unterschied: CRISP-DM beginnt mit dem
            Geschäftsverständnis, SEMMA mit der Stichprobe.
          </p>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-bold text-blue-300 mb-3">CRISP-DM</h4>
            <p className="text-xs text-slate-400 mb-2">Cross Industry Standard Process for Data Mining</p>
            <div className="flex flex-wrap gap-1 items-center">
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Business Understanding</span>
              <span className="text-blue-500">&rarr;</span>
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Data Understanding</span>
              <span className="text-blue-500">&rarr;</span>
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Data Preparation</span>
              <span className="text-blue-500">&rarr;</span>
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Modeling</span>
              <span className="text-blue-500">&rarr;</span>
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Evaluation</span>
              <span className="text-blue-500">&rarr;</span>
              <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Deployment</span>
            </div>
          </div>

          <MermaidDiagram
            chart={`flowchart TB
  BU["Business\\nUnderstanding"] --> DU["Data\\nUnderstanding"]
  DU --> DP["Data\\nPreparation"]
  DP --> MO["Modeling"]
  MO --> EV["Evaluation"]
  EV --> DE["Deployment"]
  DE -.->|"Iteration"| BU
  EV -.->|"Rücksprung"| DP
  DU -.->|"Rücksprung"| BU
  style BU fill:#1e40af,stroke:#3b82f6,color:#fff
  style DU fill:#1e40af,stroke:#3b82f6,color:#fff
  style DP fill:#1e40af,stroke:#3b82f6,color:#fff
  style MO fill:#1e40af,stroke:#3b82f6,color:#fff
  style EV fill:#1e40af,stroke:#3b82f6,color:#fff
  style DE fill:#1e40af,stroke:#3b82f6,color:#fff`}
            className="bg-slate-800/50 rounded-lg p-3"
          />

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-3">SEMMA (SAS)</h4>
            <div className="flex flex-wrap gap-1 items-center">
              <span className="px-2 py-1 bg-green-800/50 rounded text-xs text-green-200">Sample</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded text-xs text-green-200">Explore</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded text-xs text-green-200">Modify</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded text-xs text-green-200">Model</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded text-xs text-green-200">Assess</span>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> CRISP-DM beginnt mit <strong>Business Understanding</strong> (Geschäftsverständnis),
            SEMMA beginnt mit <strong>Sample</strong> (Stichprobe). Die CRISP-DM-Reihenfolge
            muss man auswendig kennen!
          </div>
        </div>
      ),
    },

    // ── Section 5: Netflix Case Study ───────────────────────────
    {
      id: 'netflix-case-study',
      title: 'Netflix - Big Data in der Praxis',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Netflix zeigt exemplarisch, wie alle Big-Data-Konzepte zusammenwirken:
            Volume (Millionen Nutzer), Velocity (Echtzeit-Tracking), Variety (Viewing Habits,
            Bewertungen, Suchen), Predictive Analytics (Empfehlungen) und Datafication.
          </p>

          <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
            <h4 className="font-bold text-red-300 mb-2">Datafication</h4>
            <p className="text-sm text-slate-300">
              "Quantifizierung der Welt" - Phänomene werden quantifiziert, tabelliert und analysiert.
              Netflix quantifiziert jede Nutzerinteraktion: Wann pausiert, spult, verlässt der Nutzer?
            </p>
          </div>

          <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
            <h4 className="font-bold text-purple-300 mb-2">Netflix Quantum Theory</h4>
            <p className="text-sm text-slate-300">
              <strong className="text-purple-200">76.897 Micro-Genres</strong> durch detailliertes Tagging
            </p>
            <p className="text-xs text-purple-400 mt-1">
              Tags: Romance Rating, Ending Rating, Plot Tags, u.v.m.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Statt grober Kategorien (Action, Comedy) nutzt Netflix tausende feingranulare
              Genre-Kombinationen für präzise Empfehlungen.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-bold text-blue-300 mb-2">Von 5-Sterne zu Viewing Habits</h4>
            <p className="text-sm text-slate-300">
              Nutzer bewerten "Qualität" statt "Enjoyment" - Bewertungen sind unzuverlässig.
            </p>
            <p className="text-xs text-blue-400 mt-1">
              Netflix analysiert stattdessen: Wann pausiert / spult / verlässt der Nutzer?
              Verhaltensdaten sind ehrlicher als explizite Bewertungen.
            </p>
          </div>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">Korrelation =/= Kausalität</h4>
            <p className="text-sm text-slate-300">
              Daten zeigten: Nutzer mögen Fincher + Spacey + Political Drama
            </p>
            <p className="text-xs text-amber-400 mt-1">
              Das GARANTIERT keinen Erfolg. Die finale Entscheidung braucht auch
              Erfahrung: "Informed Intuition" (Reed Hastings)
            </p>
          </div>

          <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
            <h4 className="font-bold text-green-300 mb-2">Closed Commercial Loop</h4>
            <div className="flex flex-wrap gap-1 items-center text-xs text-green-200">
              <span className="px-2 py-1 bg-green-800/50 rounded">Mehr Daten</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded">Bessere Empfehlungen</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded">Mehr Nutzung</span>
              <span className="text-green-500">&rarr;</span>
              <span className="px-2 py-1 bg-green-800/50 rounded">Mehr Daten</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Ein selbstverstärkender Kreislauf - je mehr Nutzer, desto besser die Daten,
              desto besser die Empfehlungen, desto mehr Nutzung.
            </p>
          </div>

          <div className="p-3 bg-slate-700/30 rounded border border-slate-600 text-sm text-slate-300">
            <strong>Netflix vereint alle Big-Data-Konzepte:</strong> Die 7 Vs (Volume, Velocity, Variety...),
            Predictive Analytics (Empfehlungen), unstrukturierte Daten (Viewing Habits),
            Datafication und den Paradigmenwechsel von Gruppen zu Individuen.
          </div>
        </div>
      ),
    },

    // ── Section 6: 4 Globale Trends ─────────────────────────────
    {
      id: 'globale-trends',
      title: '4 Globale Trends - Warum jetzt?',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Vier technologische Megatrends machen Big Data Analytics erst möglich.
            Ohne diese Enabler wäre die Verarbeitung solcher Datenmengen nicht wirtschaftlich.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-1">Moore's Law</h4>
              <p className="text-sm text-slate-300">
                Transistoren verdoppeln sich alle 24 Monate
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Computerleistung wird exponentiell billiger
              </p>
            </div>
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-bold text-green-300 mb-1">Mobile Computing</h4>
              <p className="text-sm text-slate-300">
                Smartphones und Tablets als Datenquellen
              </p>
              <p className="text-xs text-green-400 mt-1">
                Ständige Datenerzeugung unterwegs
              </p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
              <h4 className="font-bold text-purple-300 mb-1">Social Networking</h4>
              <p className="text-sm text-slate-300">
                Soziale Medien erzeugen massive Datenmengen
              </p>
              <p className="text-xs text-purple-400 mt-1">
                Posts, Likes, Shares, Kommentare
              </p>
            </div>
            <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
              <h4 className="font-bold text-amber-300 mb-1">Cloud Computing</h4>
              <p className="text-sm text-slate-300">
                Skalierbare Infrastruktur für Big Data Verarbeitung
              </p>
              <p className="text-xs text-amber-400 mt-1">
                On-Demand Rechenkapazität
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-800 rounded text-sm text-slate-400">
            Diese 4 Trends erklären, warum Big Data erst in den letzten Jahren zum
            Mainstream wurde: Die Daten waren vorher schon da, aber die Technologie
            zur Verarbeitung war zu teuer.
          </div>
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
        id: 'bd-which-v-quality',
        type: 'multiple-choice',
        question: 'Welches "V" von Big Data beschreibt die Wahrhaftigkeit bzw. Qualität und Vertrauenswürdigkeit der Daten?',
        options: [
          'Veracity',
          'Volatility',
          'Value',
          'Velocity',
        ],
        correctAnswer: 'Veracity',
        explanation: 'Veracity = Wahrhaftigkeit/Qualität der Daten. Value = Wert/Nutzen. Velocity = Geschwindigkeit. Volatility = Flüchtigkeit/Veränderlichkeit.',
      },
      {
        id: 'bd-analytics-predictive',
        type: 'multiple-choice',
        question: 'Welche Analytics-Stufe beantwortet die Frage "Was wird passieren?" und nutzt Machine Learning und statistische Modelle?',
        options: [
          'Predictive Analytics',
          'Descriptive Analytics',
          'Prescriptive Analytics',
          'Diagnostic Analytics',
        ],
        correctAnswer: 'Predictive Analytics',
        explanation: 'Predictive = Zukunft (Was wird passieren?). Descriptive = Vergangenheit (Was ist passiert?). Prescriptive = Handlung (Was sollen wir tun?).',
      },
      {
        id: 'bd-analytics-prescriptive',
        type: 'multiple-choice',
        question: 'Prescriptive Analytics ...',
        options: [
          '... schlägt konkrete Entscheidungsoptionen vor und nutzt Echtzeit-Analyse mit hybriden Daten',
          '... analysiert nur historische Daten zur Erfolgs-/Misserfolgsanalyse',
          '... erstellt Vorhersagen basierend auf Machine Learning Algorithmen',
          '... beschränkt sich auf die Visualisierung von Daten in Dashboards',
        ],
        correctAnswer: '... schlägt konkrete Entscheidungsoptionen vor und nutzt Echtzeit-Analyse mit hybriden Daten',
        explanation: 'Prescriptive Analytics geht über Vorhersagen hinaus: Was sollen wir tun? Wann? Warum? Es nutzt hybride Daten und schlägt Handlungsoptionen vor.',
      },
      {
        id: 'bd-not-a-v',
        type: 'multiple-choice',
        question: 'Welches der folgenden ist KEIN "V" von Big Data?',
        options: [
          'Validation',
          'Volume',
          'Variety',
          'Veracity',
        ],
        correctAnswer: 'Validation',
        explanation: 'Die 7 Vs: Volume, Velocity, Variety, Veracity, Validity, Volatility, Value. "Validation" gehört nicht dazu.',
      },
      {
        id: 'bd-globale-trends',
        type: 'multiple-choice',
        question: 'Welcher ist KEIN globaler Trend, der Big Data Analytics vorantreibt?',
        options: [
          'Lean IT Management',
          "Moore's Law (steigende Rechenleistung)",
          'Cloud Computing',
          'Social Networking',
        ],
        correctAnswer: 'Lean IT Management',
        explanation: 'Die 4 globalen Trends: Moore\'s Law, Mobile Computing, Social Networking, Cloud Computing. Lean IT ist kein Big Data Trend.',
      },
      {
        id: 'bd-crisp-dm',
        type: 'multiple-choice',
        question: 'Welches ist die korrekte Reihenfolge der CRISP-DM Phasen?',
        options: [
          'Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment',
          'Data Preparation → Modeling → Business Understanding → Evaluation → Deployment',
          'Sample → Explore → Modify → Model → Assess',
          'Extract → Transform → Load → Analyze → Report',
        ],
        correctAnswer: 'Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment',
        explanation: 'CRISP-DM beginnt mit Business Understanding. SEMMA (SAS) = Sample → Explore → Modify → Model → Assess. ETL ist ein anderer Prozess.',
      },
      {
        id: 'bd-netflix-paradigm',
        type: 'multiple-choice',
        question: 'Welchen Paradigmenwechsel zeigt Netflix im Vergleich zum traditionellen Data Mining?',
        options: [
          'Von gruppenbasierter Analyse zu individueller Echtzeit-Analyse des Kundenverhaltens',
          'Von digitalen zu analogen Datenquellen',
          'Von Cloud Computing zu On-Premise Lösungen',
          'Von unstrukturierten zu ausschließlich strukturierten Daten',
        ],
        correctAnswer: 'Von gruppenbasierter Analyse zu individueller Echtzeit-Analyse des Kundenverhaltens',
        explanation: 'Netflix analysiert individuelles Verhalten (Viewing Habits) statt Kundengruppen. Der Kunde existiert als Individuum, als Person.',
      },
      {
        id: 'bd-datafication',
        type: 'multiple-choice',
        question: 'Was beschreibt der Begriff "Datafication"?',
        options: [
          'Die Quantifizierung von Phänomenen, um sie zu tabellieren und zu analysieren',
          'Die Löschung von veralteten Datenbeständen',
          'Die Verschlüsselung sensibler Kundendaten',
          'Die Migration von Daten in Cloud-Systeme',
        ],
        correctAnswer: 'Die Quantifizierung von Phänomenen, um sie zu tabellieren und zu analysieren',
        explanation: 'Datafication = "Quantifizierung der Welt". Phänomene werden in messbare Daten umgewandelt für Analyse und Entscheidungsfindung.',
      },
      {
        id: 'bd-korrelation-kausalitaet',
        type: 'multiple-choice',
        question: 'Netflix-Daten zeigten, dass Nutzer David Fincher, Kevin Spacey und Political Dramas mögen. Was bedeutet das für die Produktion von "House of Cards"?',
        options: [
          'Die Korrelation garantiert keinen Erfolg - die finale Entscheidung braucht auch Erfahrung und Intuition ("Informed Intuition")',
          'Der Erfolg war durch die Daten zu 100% garantiert',
          'Die Daten waren irrelevant für die Entscheidung',
          'Netflix hat die Serie ohne Datenanalyse produziert',
        ],
        correctAnswer: 'Die Korrelation garantiert keinen Erfolg - die finale Entscheidung braucht auch Erfahrung und Intuition ("Informed Intuition")',
        explanation: 'Korrelation =/= Kausalität. Netflix kombiniert Daten-Insights mit erfahrener Entscheidungsfindung ("Informed Intuition" - Reed Hastings). Daten allein reichen nicht.',
      },
    ],
  },

  examTasks: [
    {
      id: 'big-data-analytics-task',
      title: 'Big Data Analytics',
      points: 25,
      context: (
        <p>
          Ein Unternehmen möchte seine Entscheidungsfindung durch Big Data Analytics
          verbessern und prüft verschiedene Ansätze.
        </p>
      ),
      parts: [
        {
          id: 'bd-task-a',
          type: 'free-text',
          question: 'Nennen und erklären Sie die 7 Vs von Big Data.',
          placeholder: '1. Volume...',
          modelAnswer:
            '1. Volume - Große Datenmengen\n2. Velocity - Hohe Geschwindigkeit der Datenerzeugung\n3. Variety - Verschiedene Datentypen (strukturiert, unstrukturiert)\n4. Veracity - Wahrhaftigkeit/Qualität der Daten\n5. Validity - Gültigkeit der Daten\n6. Volatility - Flüchtigkeit/Veränderlichkeit\n7. Value - Wert/Nutzen der Daten',
          keyPoints: [
            'Volume',
            'Velocity',
            'Variety',
            'Veracity',
            'Validity',
            'Volatility',
            'Value',
          ],
          explanation:
            'Die 7 Vs beschreiben die Charakteristiken von Big Data und helfen bei der Einordnung von Datenherausforderungen.',
        },
        {
          id: 'bd-task-b',
          type: 'free-text',
          question:
            'Unterscheiden Sie Descriptive, Predictive und Prescriptive Analytics.',
          placeholder: 'Descriptive Analytics...',
          modelAnswer:
            'Descriptive Analytics (Vergangenheit): Was ist passiert? Warum? → Data Mining historischer Daten, Management Reports\n\nPredictive Analytics (Zukunft): Was wird passieren? → Machine Learning, statistische Modelle, externe Daten\n\nPrescriptive Analytics (Handlung): Was sollen wir tun? → Entscheidungsoptionen vorschlagen, Echtzeit-Analyse, hybride Daten',
          keyPoints: [
            'Descriptive = Vergangenheit',
            'Predictive = Zukunft',
            'Prescriptive = Handlung',
          ],
          explanation:
            'Die drei Analytics-Stufen bauen aufeinander auf und werden zunehmend wertvoll aber auch komplexer.',
        },
        {
          id: 'bd-task-c',
          type: 'free-text',
          question:
            'Beschreiben Sie anhand des Netflix-Beispiels, wie Big Data Analytics in der Praxis eingesetzt wird.',
          placeholder: 'Netflix nutzt Big Data...',
          modelAnswer:
            'Netflix nutzt Big Data für:\n1. Micro-Genre Tagging (76.897 Genres) durch detailliertes Taggen jedes Films\n2. Analyse von Viewing Habits statt expliziter Bewertungen (Pausieren, Vorspulen, Abbrechen)\n3. Personalisierte Empfehlungen basierend auf individuellem Verhalten\n4. Datenbasierte Originalproduktionen (z.B. House of Cards)\n\nWichtig: "Informed Intuition" - Kombination aus Daten und Erfahrung. Korrelation =/= Kausalität!',
          keyPoints: [
            'Micro-Genres',
            'Viewing Habits statt Bewertungen',
            'Personalisierung',
            'Informed Intuition',
          ],
          explanation:
            'Netflix zeigt den Paradigmenwechsel: vom gruppenbasierten zum individuellen Kundenverständnis.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'business-intelligence', title: 'Business Intelligence', relationship: 'Grundlage' },
    { id: 'crm', title: 'CRM', relationship: 'Kundenanalyse' },
  ],

  connectionDiagram: `flowchart TB
  subgraph Grundlage["Grundlage: BI"]
    BI["Business Intelligence\\nStrukturierte Daten, OLAP, ETL"]
  end
  subgraph Erweiterung["Erweiterung: Big Data"]
    BD["Big Data & Advanced Analytics\\n7 Vs, Predictive, Prescriptive"]
  end
  subgraph Anwendung["Anwendung"]
    CRM["CRM\\nKundenanalyse & Personalisierung"]
  end
  BI -->|"erweitert durch\\nunstrukturierte Daten,\\nRealtime, ML"| BD
  BD -->|"liefert Insights für"| CRM
  CRM -->|"generiert Daten für"| BD
  style Grundlage fill:#1e293b,stroke:#3b82f6
  style Erweiterung fill:#1e293b,stroke:#a855f7
  style Anwendung fill:#1e293b,stroke:#22c55e`,
}
