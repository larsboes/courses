// src/content/wirtschaftsrecht/topics/gesetzliche-sv.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'

const gesetzlicheSvUebersicht = `flowchart TD
  GS["Gesetzliche Schuldverhältnisse"] --> GOA["GoA<br/>§§ 677 ff."]
  GS --> BR["Bereicherungsrecht<br/>§§ 812 ff."]
  GS --> DR["Deliktsrecht<br/>§§ 823 ff."]
  GOA --> ZWECK1["Schutz des<br/>uneigennützig Helfenden<br/>& Schutz vor unberechtigter<br/>Einmischung"]
  BR --> ZWECK2["Ausgleich<br/>ungerechtfertigter<br/>Vermögensvorteile"]
  DR --> ZWECK3["Ausgleich von<br/>Schäden durch<br/>andere verursacht"]
  BR --> BLICK1["Blick auf<br/>Bereicherten<br/>(= Schuldner)"]
  DR --> BLICK2["Blick auf<br/>Geschädigten<br/>(= Gläubiger)"]

  style GS fill:#1e40af,stroke:#3b82f6,color:#fff
  style GOA fill:#065f46,stroke:#10b981,color:#fff
  style BR fill:#92400e,stroke:#f59e0b,color:#fff
  style DR fill:#991b1b,stroke:#ef4444,color:#fff
`

const goaArtenDiagram = `flowchart TD
  GOA["GoA §§ 677 ff."] --> ECHT["Echte GoA"]
  GOA --> UNECHT["Unechte GoA<br/>§ 687 I, II"]
  ECHT --> BER["Berechtigte GoA"]
  ECHT --> UNBER["Unberechtigte GoA"]
  BER --> RF1["§ 681 verweist auf §§ 666-668<br/>§§ 677, 683, 670<br/>Aufwendungsersatz"]
  UNBER --> RF2["§§ 684, 678<br/>Genehmigung möglich"]
  BER --> VORAUS["Geschäftsführung entspricht<br/>dem Willen/Interesse des GH"]
  UNBER --> VORAUS2["Geschäftsführung widerspricht<br/>dem Willen/Interesse des GH"]

  style GOA fill:#1e40af,stroke:#3b82f6,color:#fff
  style ECHT fill:#065f46,stroke:#10b981,color:#fff
  style UNECHT fill:#991b1b,stroke:#ef4444,color:#fff
  style BER fill:#065f46,stroke:#10b981,color:#fff
  style UNBER fill:#92400e,stroke:#f59e0b,color:#fff
`

const bereicherungsrechtDiagram = `flowchart TD
  BR["Bereicherungsrecht<br/>§§ 812 ff."] --> LK["Leistungskondiktion<br/>§ 812 I S.1 Alt.1"]
  BR --> NLK["Nichtleistungskondiktion<br/>(Eingriffskondiktion)"]
  LK --> ZWECK1["Durch Leistung bewirkte<br/>Vermögensverschiebung<br/>wird rückgängig gemacht"]
  NLK --> ZWECK2["Ohne Willen des Gläubigers<br/>eingetretene Vermögens-<br/>verschiebung rückgängig"]
  LK --> VORAUS["Voraussetzungen:"]
  VORAUS --> V1["1. Etwas erlangt"]
  VORAUS --> V2["2. Durch Leistung"]
  VORAUS --> V3["3. Ohne rechtl. Grund"]
  VORAUS --> V4["4. Kein Ausschlusstatbestand<br/>§ 814, § 817 II"]

  style BR fill:#1e40af,stroke:#3b82f6,color:#fff
  style LK fill:#065f46,stroke:#10b981,color:#fff
  style NLK fill:#92400e,stroke:#f59e0b,color:#fff
`

const deliktsrechtDiagram = `flowchart TD
  DH["Deliktische Haftung<br/>§§ 823 ff."] --> VA["Verschuldensabhängig"]
  DH --> VU["Verschuldensunabhängig<br/>(Gefährdungshaftung)"]
  VA --> TATS["Haftung für<br/>tatsächliches Verschulden"]
  VA --> VERM["Haftung für<br/>vermutetes Verschulden"]
  TATS --> NORMEN1["§§ 823 I, II, 824, 826"]
  VERM --> NORMEN2["BGB: §§ 831, 832, 833 S. 2,<br/>836-838<br/>Außerhalb: § 18 StVG"]
  VU --> NORMEN3["BGB: §§ 833 S. 1, 904 S. 2<br/>Außerhalb: § 7 I StVG,<br/>§ 1 ProdHaftG"]

  style DH fill:#1e40af,stroke:#3b82f6,color:#fff
  style VA fill:#065f46,stroke:#10b981,color:#fff
  style VU fill:#991b1b,stroke:#ef4444,color:#fff
`

export const gesetzlicheSvTopic: Topic = {
  id: 'gesetzliche-sv',
  title: 'Gesetzliche Schuldverhältnisse',
  description: 'Geschäftsführung ohne Auftrag (GoA), Bereicherungsrecht (§§ 812 ff.), Deliktsrecht (§§ 823 ff.)',
  icon: '📋',
  examNotes: 'GoA: Berechtigte vs. unberechtigte Geschäftsführung unterscheiden! Bereicherungsrecht: Leistungs- vs. Eingriffskondiktion!',

  sections: [
    {
      id: 'goa',
      title: 'Geschäftsführung ohne Auftrag (GoA)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">GoA (§§ 677 ff.)</h4>
            <p className="text-sm text-slate-300">
              <strong>Zweck:</strong> Schutz des uneigennützig Helfenden und Schutz vor
              unberechtigter Einmischung. Absicht des Handelnden und Interessen des
              Betroffenen sind zu berücksichtigen.
            </p>
          </div>

          <MermaidDiagram chart={gesetzlicheSvUebersicht} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-2">Echte GoA</h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="p-3 bg-green-900/20 rounded">
                  <strong>Berechtigte GoA</strong>
                  <p className="text-slate-400 mt-1">
                    Geschäftsführung entspricht dem Willen/Interesse des Geschäftsherrn (GH).
                  </p>
                  <p className="text-slate-400 mt-1">
                    Rechtsfolge: Aufwendungsersatz
                    (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 677, 683, 670</span>)
                  </p>
                </div>
                <div className="p-3 bg-amber-900/20 rounded">
                  <strong>Unberechtigte GoA</strong>
                  <p className="text-slate-400 mt-1">
                    Geschäftsführung widerspricht dem Willen/Interesse des GH.
                  </p>
                  <p className="text-slate-400 mt-1">
                    Rechtsfolge: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 684, 678</span>;
                    Genehmigung möglich
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-300 mb-2">Unechte GoA (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 687 I, II</span>)</h4>
              <p className="text-sm text-slate-300">
                Keine echte Fremdgeschäftsführung. Der Handelnde führt ein objektiv
                fremdes Geschäft, jedoch ohne Fremdgeschäftsführungswillen (er hält es
                für sein eigenes Geschäft oder will es bewusst als eigenes führen).
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Anspruchsvoraussetzungen (§§ 677, 683, 670)</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Geschäft:</strong> Alle rechtsgeschäftlichen oder tatsächlichen Handlungen</li>
              <li><strong>Fremdheit:</strong> Objektiv fremdes Geschäft oder auch-fremdes Geschäft</li>
              <li><strong>Fremdgeschäftsführungswille:</strong> Bewusstsein und Wille, ein fremdes Geschäft zu führen</li>
              <li><strong>Ohne Auftrag:</strong> Kein Vertrag oder gesetzliches Schuldverhältnis zwischen GFührer und GHerrn</li>
              <li>
                <strong>§ 683:</strong> Übernahme im Interesse und/oder entsprechend dem Willen des GH
                <ul className="list-disc list-inside ml-4 mt-1 text-slate-400">
                  <li>Vorrang: tatsächlicher Wille (Ausnahme: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 679</span>)</li>
                  <li>Nachrangig: mutmaßlicher Wille</li>
                  <li>Genehmigung möglich (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 684 S. 2</span>)</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Rechtsfolgen bei berechtigter GoA</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Aufwendungsersatz:</strong> Freiwillige Vermögensopfer, die der GF bei Übernahme für erforderlich halten durfte. Risikotypische Begleitschäden sind mit erfasst.</li>
              <li><strong>Tätigkeitsvergütung:</strong> Grundsätzlich keine! Ausnahme: berufsspezifische Tätigkeit.</li>
            </ul>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Berechtigte und unberechtigte GoA genau unterscheiden!
            Bei berechtigter GoA: Aufwendungsersatz nach §§ 677, 683, 670.
            Bei unberechtigter GoA: Haftung nach § 678, aber Genehmigung möglich (§ 684 S. 2).
          </div>

          <MermaidDiagram chart={goaArtenDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'bereicherungsrecht',
      title: 'Bereicherungsrecht (§§ 812 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Zweck</h4>
            <p className="text-sm text-slate-300">
              Ausgleich ungerechtfertigter Vermögensvorteile. Der Blick auf den
              <strong> Bereicherten</strong> (= Schuldner) steht im Mittelpunkt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-2">Leistungskondiktion</h4>
              <p className="text-sm text-slate-300">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 812 I S. 1 Alt. 1</span>
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Die durch eine <strong>Leistung</strong> bewirkte Vermögensverschiebung
                wird rückgängig gemacht. Leistung = bewusste und zweckgerichtete
                Mehrung fremden Vermögens.
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">Nichtleistungskondiktion (Eingriffskondiktion)</h4>
              <p className="text-sm text-slate-300">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 812 I S. 1 Alt. 2</span>
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Die <strong>ohne den Willen</strong> des Gläubigers eingetretene
                Vermögensverschiebung soll rückgängig gemacht werden.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Voraussetzungen (§ 812 I S. 1 Alt. 1)</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Etwas erlangt:</strong> Jeder Vermögensvorteil</li>
              <li><strong>Durch Leistung:</strong> Bewusste und zweckgerichtete Mehrung fremden Vermögens (Leistungszweck: Erfüllung einer Verbindlichkeit)</li>
              <li><strong>Ohne rechtlichen Grund:</strong> Verpflichtungsgeschäft ist unwirksam</li>
              <li><strong>Kein Ausschlusstatbestand:</strong> <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 814</span> (Kenntnis der Nichtschuld), <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 817 II</span></li>
            </ol>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Umfang des Anspruchs (§§ 818 ff.)</h4>
            <p className="text-sm text-slate-300">
              Herausgabe des Erlangten einschließlich der gezogenen Nutzungen.
              Entreicherungseinwand (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 818 III</span>):
              Soweit der Bereicherte nicht mehr bereichert ist, entfällt der Anspruch.
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Das Bereicherungsrecht ist besonders im Zusammenhang mit dem
            <strong> Abstraktionsprinzip</strong> relevant: Bei Nichtigkeit des Verpflichtungsgeschäfts
            bleibt die Verfügung wirksam (Eigentum ist übertragen), aber es besteht ein
            Herausgabeanspruch nach <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 812</span>.
          </div>

          <MermaidDiagram chart={bereicherungsrechtDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'deliktsrecht',
      title: 'Deliktsrecht (§§ 823 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Zweck</h4>
            <p className="text-sm text-slate-300">
              Ausgleich von Schäden, die durch andere verursacht wurden. Der Blick auf den
              <strong> Geschädigten</strong> (= Gläubiger) steht im Mittelpunkt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-2 text-sm">Tatsächliches Verschulden</h4>
              <p className="text-sm text-slate-400">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 823 I, II, 824, 826</span>
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-amber-300 mb-2 text-sm">Vermutetes Verschulden</h4>
              <p className="text-sm text-slate-400">
                BGB: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 831, 832, 833 S. 2</span><br />
                Außerhalb: § 18 StVG
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2 text-sm">Gefährdungshaftung</h4>
              <p className="text-sm text-slate-400">
                BGB: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 833 S. 1, 904 S. 2</span><br />
                Außerhalb: § 7 I StVG, § 1 ProdHaftG
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Anspruchsvoraussetzungen <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 823 I</span></h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li>
                <strong>Rechtsgutsverletzung:</strong> Eines der in § 823 I aufgeführten Rechtsgüter
                (Leben, Körper, Gesundheit, Freiheit, Eigentum) oder ein sonstiges Recht
              </li>
              <li>
                <strong>Verletzungshandlung:</strong> Positives Tun oder Unterlassen
                (bei Pflicht zum Handeln, insb. Verkehrssicherungspflichten)
              </li>
              <li>
                <strong>Kausalität:</strong> Die Rechtsgutsverletzung muss auf der Verletzungshandlung beruhen
              </li>
              <li>
                <strong>Rechtswidrigkeit:</strong> In der Regel indiziert; Ausnahme bei Rechtfertigungsgründen
              </li>
              <li>
                <strong>Verschulden:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 text-slate-400">
                  <li>Vorsatz: Wissen &amp; Wollen des Erfolges bei Bewusstsein der Rechtswidrigkeit</li>
                  <li>Fahrlässigkeit: Die im Verkehr erforderliche Sorgfalt wird außer Acht gelassen (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 276 II</span>)</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Rechtsfolge: Schadensersatz</h4>
            <p className="text-sm text-slate-300">
              Bei Vorliegen aller Voraussetzungen hat der Geschädigte einen Anspruch auf
              Schadensersatz. Art und Umfang richten sich nach §§ 249 ff. (Grundsatz: Naturalrestitution).
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Prüfen Sie bei § 823 I immer alle fünf Voraussetzungen
            systematisch. Die Rechtswidrigkeit wird i.d.R. durch die Rechtsgutsverletzung
            indiziert (Lehre vom Erfolgsunrecht).
          </div>

          <MermaidDiagram chart={deliktsrechtDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'gsv-q1',
        type: 'multiple-choice',
        question: 'Was ist der Zweck der Geschäftsführung ohne Auftrag (GoA)?',
        options: [
          'Schutz des uneigennützig Helfenden und Schutz vor unberechtigter Einmischung',
          'Ausgleich ungerechtfertigter Vermögensvorteile',
          'Ausgleich deliktischer Schäden',
          'Regelung von Kaufverträgen',
        ],
        correctAnswer: 'Schutz des uneigennützig Helfenden und Schutz vor unberechtigter Einmischung',
        explanation: 'Die GoA schützt denjenigen, der uneigennützig für einen anderen handelt (Aufwendungsersatz), und schützt gleichzeitig vor unberechtigter Einmischung in fremde Angelegenheiten.',
      },
      {
        id: 'gsv-q2',
        type: 'match-pairs',
        question: 'Ordne die GoA-Arten den richtigen Rechtsfolgen zu:',
        options: [
          'Berechtigte GoA::Aufwendungsersatz (§§ 677, 683, 670)',
          'Unberechtigte GoA::Haftung (§ 678), Genehmigung möglich',
          'Echte GoA::Fremdgeschäftsführungswille vorhanden',
          'Unechte GoA::Kein Fremdgeschäftsführungswille (§ 687)',
        ],
        correctAnswer: [
          'Berechtigte GoA::Aufwendungsersatz (§§ 677, 683, 670)',
          'Unberechtigte GoA::Haftung (§ 678), Genehmigung möglich',
          'Echte GoA::Fremdgeschäftsführungswille vorhanden',
          'Unechte GoA::Kein Fremdgeschäftsführungswille (§ 687)',
        ],
        explanation: 'Die Unterscheidung zwischen echter und unechter GoA sowie berechtigter und unberechtigter GoA bestimmt die Rechtsfolgen.',
      },
      {
        id: 'gsv-q3',
        type: 'multiple-choice',
        question: 'Was ist der Unterschied zwischen Leistungskondiktion und Eingriffskondiktion?',
        options: [
          'Leistungskondiktion: durch Leistung bewirkt; Eingriffskondiktion: ohne Willen des Gläubigers',
          'Es gibt keinen Unterschied',
          'Leistungskondiktion nur bei Verträgen, Eingriffskondiktion nur bei Delikten',
          'Leistungskondiktion bei beweglichen Sachen, Eingriffskondiktion bei Grundstücken',
        ],
        correctAnswer: 'Leistungskondiktion: durch Leistung bewirkt; Eingriffskondiktion: ohne Willen des Gläubigers',
        explanation: 'Die Leistungskondiktion (§ 812 I S.1 Alt.1) macht durch Leistung bewirkte Vermögensverschiebungen rückgängig. Die Eingriffskondiktion (§ 812 I S.1 Alt.2) betrifft ohne Willen des Gläubigers eingetretene Verschiebungen.',
      },
      {
        id: 'gsv-q4',
        type: 'match-pairs',
        question: 'Ordne die Kondiktionsart den Voraussetzungen zu:',
        options: [
          'Leistungskondiktion::Bewusste zweckgerichtete Mehrung fremden Vermögens',
          'Eingriffskondiktion::Vermögenserwerb ohne Willen des Gläubigers',
          '§ 814::Kenntnis der Nichtschuld schließt Rückforderung aus',
          '§ 818 III::Entreicherungseinwand',
        ],
        correctAnswer: [
          'Leistungskondiktion::Bewusste zweckgerichtete Mehrung fremden Vermögens',
          'Eingriffskondiktion::Vermögenserwerb ohne Willen des Gläubigers',
          '§ 814::Kenntnis der Nichtschuld schließt Rückforderung aus',
          '§ 818 III::Entreicherungseinwand',
        ],
        explanation: 'Die einzelnen Normen des Bereicherungsrechts haben unterschiedliche Funktionen: § 812 begründet den Anspruch, § 814 und § 818 III können ihn einschränken.',
      },
      {
        id: 'gsv-q5',
        type: 'order-steps',
        question: 'Bringen Sie die Voraussetzungen des § 823 I in die richtige Prüfungsreihenfolge:',
        options: [
          'Rechtsgutsverletzung',
          'Verletzungshandlung',
          'Kausalität',
          'Rechtswidrigkeit',
          'Verschulden',
        ],
        correctAnswer: [
          'Rechtsgutsverletzung',
          'Verletzungshandlung',
          'Kausalität',
          'Rechtswidrigkeit',
          'Verschulden',
        ],
        explanation: 'Die fünf Voraussetzungen des § 823 I müssen in dieser Reihenfolge geprüft werden.',
      },
      {
        id: 'gsv-q6',
        type: 'fill-blank',
        question: 'Bei der Leistungskondiktion (§ 812 I S. 1 Alt. 1) muss der Bereicherungsschuldner etwas durch Leistung und ohne ___ erlangt haben.',
        options: ['rechtlichen Grund', 'Verschulden', 'Vertrag', 'Kenntnis'],
        correctAnswer: 'rechtlichen Grund',
        explanation: 'Die zentrale Voraussetzung der Leistungskondiktion ist, dass der Bereicherungsschuldner etwas "ohne rechtlichen Grund" erlangt hat, z.B. weil das zugrundeliegende Verpflichtungsgeschäft unwirksam ist.',
      },
      {
        id: 'gsv-q7',
        type: 'multi-select',
        question: 'Welche Rechtsgüter sind in § 823 I ausdrücklich genannt?',
        options: [
          'Leben',
          'Körper',
          'Gesundheit',
          'Freiheit',
          'Eigentum',
          'Vermögen',
        ],
        correctAnswer: ['Leben', 'Körper', 'Gesundheit', 'Freiheit', 'Eigentum'],
        explanation: 'Das reine Vermögen ist kein von § 823 I geschütztes Rechtsgut. Es wird nur über § 823 II (Schutzgesetz) oder § 826 (sittenwidrige Schädigung) geschützt.',
      },
      {
        id: 'gsv-q8',
        type: 'free-text',
        question: 'Erklären Sie den Zusammenhang zwischen dem Abstraktionsprinzip und dem Bereicherungsrecht (§ 812).',
        placeholder: 'Beschreiben Sie, warum § 812 beim Abstraktionsprinzip relevant wird...',
        modelAnswer: 'Aufgrund des Abstraktionsprinzips ist die Wirksamkeit der Verfügung (z.B. Übereignung nach § 929 S. 1) unabhängig von der Wirksamkeit des Verpflichtungsgeschäfts (z.B. Kaufvertrag). Ist der Kaufvertrag nichtig (z.B. wegen Anfechtung), bleibt die Übereignung dennoch wirksam. Der Herausgabeanspruch aus § 985 scheidet aus, da das Eigentum wirksam übertragen wurde. Der Ausgleich erfolgt über das Bereicherungsrecht: § 812 I S. 1 Alt. 1 gibt einen Anspruch auf Rückübertragung des Eigentums, da die Leistung (Übereignung) ohne rechtlichen Grund (nichtiger Kaufvertrag) erfolgte.',
        keyPoints: [
          'Abstraktionsprinzip: Verfügung ist unabhängig vom Verpflichtungsgeschäft wirksam',
          'Bei nichtigem Kaufvertrag: Eigentum trotzdem wirksam übertragen',
          '§ 985 (-): Eigentum wurde ja übertragen',
          '§ 812 (+): Leistung ohne rechtlichen Grund, Rückübertragungsanspruch',
        ],
        explanation: 'Das Bereicherungsrecht ist das zentrale Korrektiv des Abstraktionsprinzips. Es stellt sicher, dass ungerechtfertigte Vermögensverschiebungen rückgängig gemacht werden können.',
      },
    ],
  },

  relatedTopics: [
    { id: 'leistungsstoerungen', title: 'Leistungsstörungen', relationship: 'vertragliche Schuldverhältnisse' },
    { id: 'kaufvertrag', title: 'Kaufvertrag', relationship: 'vertragliche Ansprüche' },
  ],
}
