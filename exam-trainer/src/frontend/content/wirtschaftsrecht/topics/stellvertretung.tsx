// src/content/wirtschaftsrecht/topics/stellvertretung.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { StellvertretungFlow } from '../diagrams/StellvertretungFlow'

const vollmachtsartenDiagram = `flowchart TD
  VM["Vertretungsmacht"] --> GES["Gesetzliche<br/>z.B. § 1629 Eltern"]
  VM --> RG["Rechtsgeschäftliche<br/>(Vollmacht, § 166 II)"]
  VM --> RS["Rechtsschein"]
  RG --> IV["Innenvollmacht<br/>§ 167 I Var. 1"]
  RG --> AV["Außenvollmacht<br/>§ 167 I Var. 2"]
  RG --> PK["Prokura<br/>§§ 48, 49 HGB"]
  RS --> DV["Duldungsvollmacht"]
  RS --> ASV["Anscheinsvollmacht"]
  style VM fill:#1e40af,stroke:#3b82f6,color:#fff
  style GES fill:#065f46,stroke:#10b981,color:#fff
  style RG fill:#065f46,stroke:#10b981,color:#fff
  style RS fill:#92400e,stroke:#f59e0b,color:#fff
  style DV fill:#92400e,stroke:#f59e0b,color:#fff
  style ASV fill:#92400e,stroke:#f59e0b,color:#fff
`

const falsusFlowDiagram = `flowchart TD
  FP["Falsus Procurator<br/>Vertreter ohne Vertretungsmacht"] --> SW["Vertrag schwebend unwirksam<br/>§ 177 I"]
  SW --> GEN["Genehmigung<br/>durch Vertretenen?"]
  GEN -->|Ja| WIRK["Vertrag wird wirksam"]
  GEN -->|Nein| VERW["Genehmigung verweigert"]
  VERW --> HAFT["Haftung des Vertreters<br/>§ 179"]
  HAFT --> WAHL["Wahl des Dritten<br/>§ 179 I"]
  WAHL --> ERF["Erfüllung"]
  WAHL --> SE["Schadensersatz<br/>(positives Interesse)"]
  HAFT --> AUSNM["Ausnahmen"]
  AUSNM --> BG["Bösgläubiger Dritter<br/>§ 179 III S. 1:<br/>Kein SE"]
  AUSNM --> MJ["Minderjähriger Vertreter<br/>§ 179 III S. 2:<br/>Kein SE"]
  AUSNM --> GGV["Gutgläubiger Vertreter<br/>§ 179 II:<br/>Nur negatives Interesse"]
  style FP fill:#991b1b,stroke:#ef4444,color:#fff
  style SW fill:#92400e,stroke:#f59e0b,color:#fff
  style WIRK fill:#065f46,stroke:#10b981,color:#fff
  style VERW fill:#991b1b,stroke:#ef4444,color:#fff
`

export const stellvertretungTopic: Topic = {
  id: 'stellvertretung',
  title: 'Stellvertretung (§§ 164 ff.)',
  description: 'Voraussetzungen wirksamer Stellvertretung, Vollmachtsarten, Duldungs- und Anscheinsvollmacht, Vertreter ohne Vertretungsmacht',
  icon: '🎭',
  examNotes: 'Drei Voraussetzungen der Stellvertretung: Eigene WE + im fremden Namen + mit Vertretungsmacht!',

  sections: [
    {
      id: 'voraussetzungen',
      title: 'Voraussetzungen wirksamer Stellvertretung (§ 164 I)',
      content: (
        <div className="space-y-4">
          <p>
            Die <strong>Stellvertretung</strong> ermöglicht rechtsgeschäftliches Handeln mit Wirkung
            für und gegen einen anderen durch Abgabe oder Entgegennahme von Willenserklärungen
            (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 164 I S. 1</span>).
          </p>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Drei Voraussetzungen der Stellvertretung:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <div>
                  <strong>Eigene Willenserklärung des Vertreters</strong>
                  <p className="text-sm text-slate-300 mt-1">
                    Der Vertreter gibt eine <em>eigene</em> WE ab &mdash; er hat eigenen Entscheidungsspielraum.
                    Abgrenzung zum Boten, der nur eine <em>fremde</em> WE übermittelt.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <div>
                  <strong>Offenkundigkeitsprinzip (im fremden Namen)</strong>
                  <p className="text-sm text-slate-300 mt-1">
                    Der Vertreter muss erkennbar im Namen des Vertretenen handeln.
                    Ausnahme: Geschäft für den, den es angeht (z.B. Bargeschäfte).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <div>
                  <strong>Mit Vertretungsmacht</strong>
                  <p className="text-sm text-slate-300 mt-1">
                    Gesetzlich (z.B. <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 1629</span> Eltern),
                    rechtsgeschäftlich (Vollmacht) oder kraft Rechtsscheins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <strong>Rechtsfolge:</strong> Die Willenserklärung wirkt für und gegen den Vertretenen &mdash;
            nicht gegen den Vertreter.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Immer alle drei Voraussetzungen einzeln prüfen! Auch wenn eine
            offensichtlich vorliegt, muss sie in der Klausur kurz angesprochen werden. Der Dreischritt
            &bdquo;eigene WE &ndash; im fremden Namen &ndash; mit Vertretungsmacht&ldquo; ist das Prüfungsschema.
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: StellvertretungFlow,
      },
    },
    {
      id: 'bote-vertreter',
      title: 'Abgrenzung: Stellvertreter vs. Bote',
      content: (
        <div className="space-y-4">
          <p>
            Die Unterscheidung zwischen Stellvertreter und Bote ist klausurrelevant, da unterschiedliche
            Rechtsfolgen gelten.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Kriterium</th>
                  <th className="text-left py-2 px-3">Stellvertreter</th>
                  <th className="text-left py-2 px-3">Bote</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Willenserklärung</td>
                  <td className="py-2 px-3 text-blue-300">Eigene WE</td>
                  <td className="py-2 px-3 text-amber-300">Fremde WE (nur Übermittlung)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Entscheidungsspielraum</td>
                  <td className="py-2 px-3 text-blue-300">Ja &mdash; eigener Spielraum</td>
                  <td className="py-2 px-3 text-amber-300">Nein &mdash; nur Überbringer</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium">Geschäftsfähigkeit</td>
                  <td className="py-2 px-3 text-blue-300">Mind. beschränkt geschäftsfähig (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 165</span>)</td>
                  <td className="py-2 px-3 text-amber-300">Auch Geschäftsunfähige</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Abgrenzung</td>
                  <td className="py-2 px-3 text-slate-300" colSpan={2}>
                    Durch das nach außen erkennbare Auftreten der Mittelsperson
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Abgrenzung erfolgt <em>nicht</em> nach der internen Vereinbarung,
            sondern nach dem objektiv erkennbaren Auftreten! Wer eigenen Entscheidungsspielraum hat,
            ist Vertreter &mdash; auch wenn er sich selbst als &bdquo;Bote&ldquo; bezeichnet.
          </div>
        </div>
      ),
    },
    {
      id: 'vollmachtsarten',
      title: 'Vollmachtsarten',
      content: (
        <div className="space-y-4">
          <p>
            Die <strong>Vollmacht</strong> ist die rechtsgeschäftlich erteilte Vertretungsmacht
            (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 166 II</span>).
            Sie wird durch einseitige empfangsbedürftige Willenserklärung erteilt und ist
            abstrakt/unabhängig vom zugrundeliegenden Rechtsverhältnis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Innenvollmacht</h4>
              <p className="text-sm text-slate-300">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 167 I Var. 1</span>
                <br />Erklärung gegenüber dem Bevollmächtigten
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Außenvollmacht</h4>
              <p className="text-sm text-slate-300">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 167 I Var. 2</span>
                <br />Erklärung gegenüber dem Dritten
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Prokura (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 48, 49 HGB</span>)</h4>
            <p className="text-sm text-slate-300">
              Gesetzlich festgelegter Umfang der Vertretungsmacht. Ermächtigt zu allen Arten
              von gerichtlichen und außergerichtlichen Geschäften, die der Betrieb eines
              Handelsgewerbes mit sich bringt &mdash; mit Ausnahme der Veräußerung und Belastung
              von Grundstücken.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold mb-2">Umfang der Vollmacht</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li><strong>Individualvollmacht</strong> &mdash; für ein einzelnes Geschäft</li>
              <li><strong>Gattungs-/Bereichsvollmacht</strong> &mdash; für eine bestimmte Art von Geschäften</li>
              <li><strong>Generalvollmacht</strong> &mdash; für alle Geschäfte</li>
            </ul>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die Vollmacht kann im Außenverhältnis unbeschränkt, aber im
            Innenverhältnis beschränkt sein! Vollmacht ist i.d.R. nicht formbedürftig
            (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 167 II</span>).
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Erlöschen der Vollmacht (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 168</span>)</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Durch Erlöschen des Grundverhältnisses (Innenverhältnisses)</li>
              <li>Durch Widerruf (Innenwiderruf gegenüber Vertreter oder Außenwiderruf gegenüber Drittem)</li>
              <li>Grundsätzlich frei widerruflich (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 168 S. 2</span>)</li>
            </ul>
          </div>

          <MermaidDiagram chart={vollmachtsartenDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'duldungs-anscheinsvollmacht',
      title: 'Duldungs- und Anscheinsvollmacht',
      content: (
        <div className="space-y-4">
          <p>
            Die <strong>Rechtsscheinvollmacht</strong> schützt den gutgläubigen Geschäftspartner,
            wenn tatsächlich keine Vollmacht besteht, aber ein entsprechender Rechtsschein
            gesetzt wurde.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">Duldungsvollmacht</h4>
              <p className="text-sm text-slate-300 mb-2">
                Der Vertretene <strong>kennt</strong> das Handeln des Vertreters und
                unternimmt <strong>nichts dagegen</strong>.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Kenntnis des Vertretenen vom Vertreterhandeln</li>
                <li>Duldung (kein Einschreiten)</li>
                <li>Geschäftspartner durfte auf Vollmacht vertrauen</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-300 mb-2">Anscheinsvollmacht</h4>
              <p className="text-sm text-slate-300 mb-2">
                Der Vertretene <strong>kennt</strong> das Handeln nicht, <strong>hätte</strong> es aber
                bei pflichtgemäßer Sorgfalt erkennen <strong>können und müssen</strong>.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Wiederholtes Vertreterhandeln</li>
                <li>Fahrlässige Unkenntnis des Vertretenen</li>
                <li>Geschäftspartner durfte auf Vollmacht vertrauen</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Duldungsvollmacht = Vertretener <em>weiß</em> es, tut
            aber nichts. Anscheinsvollmacht = Vertretener weiß es <em>nicht</em>, hätte es
            aber wissen müssen. Nicht verwechseln!
          </div>
        </div>
      ),
    },
    {
      id: 'falsus-procurator',
      title: 'Vertreter ohne Vertretungsmacht (§ 177)',
      content: (
        <div className="space-y-4">
          <p>
            Der <strong>falsus procurator</strong> handelt als Vertreter, ohne tatsächlich
            Vertretungsmacht zu haben. Das Rechtsgeschäft ist zunächst
            <strong> schwebend unwirksam</strong>
            (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 177 I</span>).
          </p>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Rechtsfolgen:</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <strong className="text-green-300">Genehmigung (§ 177 I):</strong>
                <p className="text-sm text-slate-300 mt-1">
                  Der Vertretene kann das Geschäft nachträglich genehmigen &rarr; Vertrag wird wirksam.
                </p>
              </div>
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <strong className="text-red-300">Verweigerung der Genehmigung:</strong>
                <p className="text-sm text-slate-300 mt-1">
                  Vertrag ist endgültig unwirksam &rarr; Haftung des Vertreters nach
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono ml-1">§ 179</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Haftung nach § 179</h4>
            <p className="text-sm text-slate-300 mb-3">
              <strong>Voraussetzungen:</strong> Auftreten als Vertreter + keine Vertretungsmacht
              + Genehmigung verweigert + guter Glaube des Dritten
            </p>
            <p className="text-sm text-slate-300 mb-2">
              <strong>Nach Wahl des Dritten (§ 179 I):</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Erfüllung durch den Vertreter</li>
              <li>Schadensersatz (positives Interesse = &bdquo;gehörig erfüllt&ldquo;)</li>
            </ul>
            <p className="text-sm text-slate-300 mt-3 mb-2">
              <strong>Ausnahmen:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Bösgläubigkeit des Dritten &rarr; kein SE (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 179 III S. 1</span>)</li>
              <li>Minderjährigkeit des Vertreters &rarr; kein SE (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 179 III S. 2</span>)</li>
              <li>Gutgläubigkeit des Vertreters &rarr; nur negatives Interesse (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 179 II</span>)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Schadensersatzarten</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded">
                <strong className="text-blue-300">Negatives Interesse (Vertrauensschaden)</strong>
                <p className="text-slate-400 mt-1">&bdquo;Nie gesehen&ldquo; &mdash; so gestellt, als hätte man nie vom Geschäft erfahren</p>
              </div>
              <div className="p-3 bg-green-900/20 rounded">
                <strong className="text-green-300">Positives Interesse (Erfüllungsinteresse)</strong>
                <p className="text-slate-400 mt-1">&bdquo;Gehörig erfüllt&ldquo; &mdash; so gestellt, als wäre der Vertrag ordnungsgemäß erfüllt worden</p>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={falsusFlowDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'sv-q1',
        type: 'multiple-choice',
        question: 'Welche Voraussetzung gehört NICHT zu den drei Voraussetzungen der Stellvertretung nach § 164 I?',
        options: [
          'Eigene Willenserklärung des Vertreters',
          'Handeln im fremden Namen (Offenkundigkeitsprinzip)',
          'Handeln mit Vertretungsmacht',
          'Schriftliche Vollmachtsurkunde',
        ],
        correctAnswer: 'Schriftliche Vollmachtsurkunde',
        explanation: 'Die drei Voraussetzungen sind: (1) eigene WE, (2) im fremden Namen, (3) mit Vertretungsmacht. Eine Schriftform ist grundsätzlich nicht erforderlich (§ 167 II).',
      },
      {
        id: 'sv-q2',
        type: 'match-pairs',
        question: 'Ordne die Begriffe richtig zu:',
        options: [
          'Stellvertreter::Eigene Willenserklärung',
          'Bote::Fremde Willenserklärung',
          'Innenvollmacht::Erklärung gegenüber dem Bevollmächtigten',
          'Außenvollmacht::Erklärung gegenüber dem Dritten',
        ],
        correctAnswer: [
          'Stellvertreter::Eigene Willenserklärung',
          'Bote::Fremde Willenserklärung',
          'Innenvollmacht::Erklärung gegenüber dem Bevollmächtigten',
          'Außenvollmacht::Erklärung gegenüber dem Dritten',
        ],
        explanation: 'Der Stellvertreter gibt eine eigene WE ab, der Bote übermittelt nur eine fremde. Die Vollmacht kann als Innenvollmacht (ggü. Bevollmächtigtem) oder Außenvollmacht (ggü. Drittem) erteilt werden.',
      },
      {
        id: 'sv-q3',
        type: 'multiple-choice',
        question: 'Was ist der Unterschied zwischen Duldungsvollmacht und Anscheinsvollmacht?',
        options: [
          'Bei der Duldungsvollmacht kennt der Vertretene das Handeln, bei der Anscheinsvollmacht nicht',
          'Die Duldungsvollmacht muss schriftlich erteilt werden',
          'Die Anscheinsvollmacht gilt nur im Handelsrecht',
          'Es gibt keinen Unterschied',
        ],
        correctAnswer: 'Bei der Duldungsvollmacht kennt der Vertretene das Handeln, bei der Anscheinsvollmacht nicht',
        explanation: 'Duldungsvollmacht: Der Vertretene kennt das Handeln und duldet es. Anscheinsvollmacht: Der Vertretene kennt es nicht, hätte es aber bei pflichtgemäßer Sorgfalt erkennen können und müssen.',
      },
      {
        id: 'sv-q4',
        type: 'fill-blank',
        question: 'Ein Vertrag, der von einem Vertreter ohne Vertretungsmacht geschlossen wurde, ist zunächst ___.',
        options: ['schwebend unwirksam', 'nichtig', 'anfechtbar', 'wirksam'],
        correctAnswer: 'schwebend unwirksam',
        explanation: 'Nach § 177 I ist ein Vertrag, der von einem Vertreter ohne Vertretungsmacht (falsus procurator) geschlossen wurde, schwebend unwirksam. Der Vertretene kann ihn genehmigen.',
      },
      {
        id: 'sv-q5',
        type: 'multiple-choice',
        question: 'Welche Geschäftsfähigkeit muss ein Stellvertreter mindestens haben?',
        options: [
          'Volle Geschäftsfähigkeit',
          'Beschränkte Geschäftsfähigkeit (§ 165)',
          'Keine Geschäftsfähigkeit erforderlich',
          'Teilgeschäftsfähigkeit nach § 112',
        ],
        correctAnswer: 'Beschränkte Geschäftsfähigkeit (§ 165)',
        explanation: 'Gemäß § 165 genügt es, wenn der Stellvertreter beschränkt geschäftsfähig ist. Ein Bote kann dagegen auch geschäftsunfähig sein, da er nur eine fremde WE übermittelt.',
      },
      {
        id: 'sv-q6',
        type: 'multiple-choice',
        question: 'Wer haftet, wenn der Vertretene die Genehmigung verweigert und der Dritte gutgläubig war?',
        options: [
          'Der Vertretene auf Erfüllung',
          'Der Vertreter nach § 179 (Erfüllung oder SE nach Wahl des Dritten)',
          'Niemand',
          'Der Dritte trägt das Risiko',
        ],
        correctAnswer: 'Der Vertreter nach § 179 (Erfüllung oder SE nach Wahl des Dritten)',
        explanation: 'Nach § 179 I haftet der falsus procurator dem gutgläubigen Dritten wahlweise auf Erfüllung oder Schadensersatz (positives Interesse).',
      },
      {
        id: 'sv-q7',
        type: 'fill-blank',
        question: 'Die Prokura ist in ___ geregelt und ermächtigt zu allen Geschäften, die der Betrieb eines Handelsgewerbes mit sich bringt.',
        options: ['§§ 48, 49 HGB', '§§ 164 ff. BGB', '§§ 170 ff. BGB', '§§ 54 ff. HGB'],
        correctAnswer: '§§ 48, 49 HGB',
        explanation: 'Die Prokura ist in §§ 48, 49 HGB geregelt. Sie ist eine besondere handelsrechtliche Vollmacht mit gesetzlich festgelegtem Umfang.',
      },
      {
        id: 'sv-q8',
        type: 'free-text',
        question: 'Erklären Sie den Unterschied zwischen positivem und negativem Interesse im Kontext der Haftung nach § 179.',
        placeholder: 'Beschreiben Sie beide Schadensarten und wann welche relevant wird...',
        modelAnswer: 'Das negative Interesse (Vertrauensschaden) stellt den Geschädigten so, als hätte er nie von dem Geschäft erfahren ("nie gesehen"). Es umfasst z.B. vergebliche Aufwendungen. Das positive Interesse (Erfüllungsinteresse) stellt ihn so, als wäre der Vertrag ordnungsgemäß erfüllt worden ("gehörig erfüllt"). Bei § 179 I kann der gutgläubige Dritte wählen: Erfüllung oder SE (positives Interesse). Nur wenn der Vertreter gutgläubig war, ist er auf das negative Interesse beschränkt (§ 179 II).',
        keyPoints: [
          'Negatives Interesse = Vertrauensschaden = "nie gesehen"',
          'Positives Interesse = Erfüllungsinteresse = "gehörig erfüllt"',
          '§ 179 I: Wahlrecht des Dritten (Erfüllung oder SE)',
          '§ 179 II: Gutgläubiger Vertreter nur negatives Interesse',
          '§ 179 III: Kein SE bei bösgläubigem Dritten oder minderjährigem Vertreter',
        ],
        explanation: 'Die Unterscheidung zwischen positivem und negativem Interesse ist ein klassisches Klausurthema. § 179 staffelt die Haftung je nach Kenntnis der Beteiligten.',
      },
    ],
  },

  examTasks: [
    {
      id: 'fall-17',
      title: 'Fall 17: Der Strandkorb (Stellvertretung)',
      points: 15,
      context: (
        <div className="space-y-3">
          <p>
            Der Neureiche N interessiert sich für einen aufblasbaren &bdquo;Strandkorb&ldquo;. Er bittet
            seinen Freund F, für ihn beim Händler H einen solchen zu erwerben. In der Auswahl soll
            F frei sein. F begibt sich zu H, lässt sich verschiedene Modelle vorführen. Schlussendlich
            entscheidet er sich im Namen des N für ein grellgelbes Modell, das H anschließend gegen
            Rechnung an N liefert.
          </p>
          <p className="font-semibold">
            Frage: Hat H gegen N einen Anspruch auf Kaufpreiszahlung gemäß
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono ml-1">§ 433 II</span>?
          </p>
        </div>
      ),
      parts: [
        {
          id: 'fall-17-a',
          type: 'free-text',
          question: 'Liegt eine eigene Willenserklärung des F vor (§ 164 I)?',
          placeholder: 'Prüfen Sie, ob F eine eigene WE abgegeben hat oder nur Bote war...',
          modelAnswer: 'F hat so gehandelt, dass ein objektiver Betrachter in der Lage des H nur von einem eigenen Entscheidungsspielraum des F ausgehen konnte. F konnte in der Auswahl frei entscheiden. Das lässt allenfalls auf eine Vertretereigenschaft des F, nicht etwa auf eine Botenschaft schließen. Somit liegt eine eigene Willenserklärung des F vor.',
          keyPoints: [
            'Eigener Entscheidungsspielraum des F bei der Auswahl',
            'Objektiver Betrachter würde auf Vertretereigenschaft schließen',
            'Abgrenzung zum Boten: Bote hätte keinen eigenen Spielraum',
          ],
          explanation: 'Die Frage nach der eigenen WE dient der Abgrenzung zum Boten. Entscheidend ist der objektiv erkennbare Entscheidungsspielraum.',
        },
        {
          id: 'fall-17-b',
          type: 'free-text',
          question: 'Hat F im Namen des N gehandelt (§ 164 I)?',
          placeholder: 'Prüfen Sie das Offenkundigkeitsprinzip...',
          modelAnswer: 'F hat ausdrücklich erklärt, er wolle für N kaufen. Damit hat F im Namen des Vertretenen N gehandelt. Das Offenkundigkeitsprinzip ist erfüllt.',
          keyPoints: [
            'Ausdrückliche Erklärung, für N kaufen zu wollen',
            'Offenkundigkeitsprinzip erfüllt',
          ],
          explanation: 'Das Offenkundigkeitsprinzip verlangt, dass für den Geschäftspartner erkennbar ist, dass nicht der Handelnde selbst, sondern ein anderer berechtigt und verpflichtet werden soll.',
        },
        {
          id: 'fall-17-c',
          type: 'free-text',
          question: 'Hat F mit Vertretungsmacht gehandelt (§ 164 I)?',
          placeholder: 'Prüfen Sie die Vertretungsmacht des F...',
          modelAnswer: 'F handelte mit Vollmacht des N. N hat F gebeten, für ihn einen Strandkorb zu erwerben und ihm die freie Auswahl gelassen. N hat dem F somit eine entsprechende Vollmacht erteilt. Die Vertretungsmacht liegt vor. Die WE des F ist wegen der wirksamen Stellvertretung dem N zuzurechnen. Somit hat H gegen N einen Anspruch auf Kaufpreiszahlung gemäß § 433 II.',
          keyPoints: [
            'N hat F ausdrücklich beauftragt und Vollmacht erteilt',
            'Bitte zum Erwerb = Vollmachtserteilung',
            'Freie Auswahl = Umfang der Vollmacht',
            'Ergebnis: Anspruch H gegen N gem. § 433 II (+)',
          ],
          explanation: 'Die Vollmacht wurde durch die Bitte des N an F erteilt (Innenvollmacht, § 167 I Var. 1). Der Umfang umfasste die freie Auswahl eines Strandkorbs.',
        },
      ],
    },
    {
      id: 'fall-27',
      title: 'Fall 27: Der Obstler (Duldungsvollmacht)',
      points: 15,
      context: (
        <div className="space-y-3">
          <p>
            Der greise Großvater G weiß, dass seine Tochter T für ihn ab und an Einkäufe im
            Tante-Emma-Laden des L tätigt und hierbei in seinem Namen auftritt. Mit ihrem Handeln
            ist er nicht einverstanden, die durch L zugesandten Rechnungen begleicht G jedoch immer
            prompt. Eines Tages bringt T aus dem Laden eine Flasche Obstler mit, weil sie bemerkt hat,
            dass die Alkoholvorräte ihres Vaters langsam aber sicher zur Neige gehen. G ist empört,
            weil er noch nie Obstler, sondern zeitlebens preiswerten Frühstückskorn getrunken hat.
            Die durch L übermittelte Rechnung will er nicht begleichen. Er führt zutreffend aus, er
            habe der T nie eine Einkaufsvollmacht erteilt.
          </p>
          <p className="font-semibold">
            Frage: Hat L gegen G einen Anspruch auf Kaufpreiszahlung gemäß
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono ml-1">§ 433 II</span>?
          </p>
        </div>
      ),
      parts: [
        {
          id: 'fall-27-a',
          type: 'free-text',
          question: 'Liegen die Voraussetzungen einer Stellvertretung (eigene WE, im fremden Namen) vor?',
          placeholder: 'Prüfen Sie die ersten beiden Voraussetzungen...',
          modelAnswer: 'Es liegt eine eigene Willenserklärung der T vor, da sie eigenständig die Kaufentscheidung trifft. Zudem hat T im Namen des Vertretenen G gehandelt, da sie in seinem Namen im Laden auftritt. Die ersten beiden Voraussetzungen der Stellvertretung sind erfüllt.',
          keyPoints: [
            'Eigene WE der T (+)',
            'Im Namen des G (+)',
            'T tritt ausdrücklich als Vertreterin des G auf',
          ],
          explanation: 'Die ersten beiden Voraussetzungen sind hier unproblematisch, da T eigenständig handelt und ausdrücklich im Namen des G auftritt.',
        },
        {
          id: 'fall-27-b',
          type: 'free-text',
          question: 'Hat T eine ausdrückliche Vollmacht erhalten?',
          placeholder: 'Prüfen Sie, ob eine Bevollmächtigung vorliegt...',
          modelAnswer: 'Eine gesetzliche Vollmacht ist nicht ersichtlich. G hat der T auch keine rechtsgeschäftliche Vollmacht erteilt. Er führt zutreffend aus, dass er der T nie eine Einkaufsvollmacht erteilt hat. Eine ausdrückliche Bevollmächtigung liegt nicht vor.',
          keyPoints: [
            'Keine gesetzliche Vollmacht ersichtlich',
            'Keine rechtsgeschäftliche Bevollmächtigung durch G',
            'G hat zutreffend keine Vollmacht erteilt',
          ],
          explanation: 'G hat tatsächlich keine ausdrückliche Vollmacht erteilt. Es muss daher geprüft werden, ob eine Rechtsscheinvollmacht vorliegt.',
        },
        {
          id: 'fall-27-c',
          type: 'free-text',
          question: 'Liegt eine Duldungsvollmacht vor? Prüfen Sie die Voraussetzungen.',
          placeholder: 'Prüfen Sie die Grundsätze der Duldungsvollmacht...',
          modelAnswer: 'Fraglich ist, ob dem G die Willenserklärung der T nach den Grundsätzen der sogenannten Duldungsvollmacht zugerechnet werden kann. Ein Geschäftspartner genießt immer dann Schutz, wenn er auf eine tatsächlich nicht bestehende Vollmacht vertrauen darf. Zwar hat G der T keine Vollmacht erteilt. Er hat aber bemerkt, dass T als seine Vertreterin gehandelt hat und nichts dagegen unternommen. Die durch L zugesandten Rechnungen hat er immer prompt bezahlt. Insofern hat er ihr Handeln geduldet. Mithin ist von einer Duldungsvollmacht auszugehen. Also handelte T mit Vertretungsmacht. L hat gegen G einen Anspruch auf Kaufpreiszahlung gemäß § 433 II.',
          keyPoints: [
            'Duldungsvollmacht: Schutz des gutgläubigen Geschäftspartners',
            'G kannte das Handeln der T',
            'G hat nichts dagegen unternommen (Duldung)',
            'G hat sogar die Rechnungen immer bezahlt',
            'L durfte auf Vollmacht vertrauen',
            'Ergebnis: Duldungsvollmacht (+), Anspruch L gegen G gem. § 433 II (+)',
          ],
          explanation: 'Die Duldungsvollmacht ist hier gegeben: G kennt das Handeln der T, duldet es durch Bezahlung der Rechnungen, und L darf auf diese Vollmacht vertrauen. Dass G mit dem konkreten Kauf nicht einverstanden ist, spielt keine Rolle.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'willenserklaerung', title: 'Willenserklärung', relationship: 'Grundlage für' },
    { id: 'gesellschaftsrecht', title: 'Handels- und Gesellschaftsrecht', relationship: 'Prokura im HGB' },
  ],
}
