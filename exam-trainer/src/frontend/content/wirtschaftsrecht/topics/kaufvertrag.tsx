// src/content/wirtschaftsrecht/topics/kaufvertrag.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { VertragspruefungStepper } from '../diagrams/VertragspruefungStepper'

const maengelrechteDiagram = `flowchart TD
  MG["Mangel festgestellt<br/>(Sach- oder Rechtsmangel)"] --> NE["1. Stufe: Nacherfüllung<br/>§ 439 (Vorrang!)"]
  NE --> WAHL["Wahl des Käufers"]
  WAHL --> MB["Mängelbeseitigung<br/>(Nachbesserung)"]
  WAHL --> NL["Nachlieferung<br/>(mangelfreie Sache)"]
  NE -->|"erfolglos"| STUFE2["2. Stufe"]
  STUFE2 --> RT["Rücktritt<br/>§ 323 V S. 2<br/>Nur bei erheblichem Mangel!"]
  STUFE2 --> MN["Minderung<br/>§ 441<br/>Auch bei unerheblichem Mangel"]
  STUFE2 --> SE["Schadensersatz<br/>§§ 280 ff."]

  style MG fill:#991b1b,stroke:#ef4444,color:#fff
  style NE fill:#1e40af,stroke:#3b82f6,color:#fff
  style RT fill:#92400e,stroke:#f59e0b,color:#fff
  style MN fill:#065f46,stroke:#10b981,color:#fff
  style SE fill:#7c2d12,stroke:#ea580c,color:#fff
`

const sachmangel434Diagram = `flowchart TD
  SM["Sachmangel § 434"] --> S1["1. Stufe: Subjektiv"]
  S1 --> S1a["§ 434 I S. 1<br/>Vereinbarte Beschaffenheit"]
  S1 --> S1b["§ 434 I S. 2 Nr. 1<br/>Vertragl. vorausgesetzte Verwendung"]

  SM --> S2["2. Stufe: Subj./Objektiv"]
  S2 --> S2a["§ 434 I S. 2 Nr. 2<br/>Gewöhnliche/übliche Verwendung"]
  S2 --> S2b["§ 434 I S. 3<br/>Werbeaussagen/Warenkennzeichen"]

  SM --> S3["3. Stufe: Objektiv"]
  S3 --> S3a["§ 434 II S. 1-2<br/>Fehlerhafte Montage(anleitung)"]
  S3 --> S3b["§ 434 III<br/>Aliud / Zu-wenig-Lieferung"]

  style SM fill:#1e40af,stroke:#3b82f6,color:#fff
  style S1 fill:#065f46,stroke:#10b981,color:#fff
  style S2 fill:#92400e,stroke:#f59e0b,color:#fff
  style S3 fill:#991b1b,stroke:#ef4444,color:#fff
`

const kaufWerkVergleichDiagram = `flowchart LR
  subgraph KV["Kaufvertrag §§ 433 ff."]
    K1["Verkäufer: Übergabe &<br/>Übereignung der Kaufsache"]
    K2["Käufer: Zahlung des<br/>Kaufpreises & Abnahme"]
    K3["Nacherfüllung § 439:<br/>Wahl des KÄUFERS"]
  end
  subgraph WV["Werkvertrag §§ 631 ff."]
    W1["Unternehmer: Herstellung<br/>eines Werkes (Erfolg!)"]
    W2["Besteller: Zahlung der<br/>Vergütung & Abnahme"]
    W3["Nacherfüllung § 635:<br/>Wahl des UNTERNEHMERS"]
  end

  style KV fill:#1e3a5f,stroke:#3b82f6
  style WV fill:#3b1f0b,stroke:#f59e0b
`

export const kaufvertragTopic: Topic = {
  id: 'kaufvertrag',
  title: 'Kaufvertrag & Werkvertrag',
  description: 'Kaufvertragspflichten, Sachmangel (§ 434), Mängelrechte, Rügepflicht (§ 377 HGB), Werkvertrag (§§ 631 ff.)',
  icon: '🛒',
  examNotes: 'Mängelrechte erst nach erfolgloser Nacherfüllung! § 377 HGB Rügepflicht bei Handelskauf!',

  sections: [
    {
      id: 'kaufvertrag-grundlagen',
      title: 'Kaufvertrag (§§ 433 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Definition</h4>
            <p className="text-sm text-slate-300">
              Vertrag, in dem sich die Parteien über die Übereignung eines Kaufgegenstandes
              und die Höhe des Kaufpreises einigen
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 433</span>).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-300 mb-2">Pflichten des Verkäufers (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 433 I</span>)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Übergabe der Kaufsache</li>
                <li>Übereignung (Verschaffung des Eigentums)</li>
                <li>Frei von Sach- und Rechtsmängeln</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-2">Pflichten des Käufers (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 433 II</span>)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Zahlung des Kaufpreises</li>
                <li>Abnahme der Kaufsache</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Besonderes Leistungsstörungsrecht im Kaufvertrag</h4>
            <p className="text-sm text-slate-300">
              Bei <strong>mangelhafter Leistung</strong> greifen die besonderen Mängelrechte des Käufers
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 437</span>).
              Das besondere Mängelhaftungsrecht hat <strong>Vorrang</strong> vor dem allgemeinen
              Leistungsstörungsrecht. Soweit keine Regelung besteht, gilt das allgemeine
              Leistungsstörungsrecht (§§ 280 ff.).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'sachmangel',
      title: 'Sachmangel (§ 434)',
      content: (
        <div className="space-y-4">
          <p>
            Der Sachmangelbegriff des <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434</span> ist
            dreistufig aufgebaut:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-2">1. Stufe: Subjektiver Fehlerbegriff</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 I S. 1</span>:
                  Vereinbarte Beschaffenheit
                </li>
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 I S. 2 Nr. 1</span>:
                  Eignung für die vertraglich vorausgesetzte Verwendung
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">2. Stufe: Subjektiv/Objektiv</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 I S. 2 Nr. 2</span>:
                  Eignung für die gewöhnliche/übliche Verwendung
                </li>
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 I S. 3</span>:
                  Werbeaussagen und Warenkennzeichen
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-300 mb-2">3. Stufe: Objektiver Fehlerbegriff</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 II</span>:
                  Fehlerhafte Montage / fehlerhafte Montageanleitung
                </li>
                <li>
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 434 III</span>:
                  Aliud (falsche Sache) / Zu-wenig-Lieferung
                </li>
              </ul>
            </div>
          </div>

          <MermaidDiagram chart={sachmangel434Diagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'maengelrechte',
      title: 'Mängelrechte des Käufers (§ 437)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Vorrang der Nacherfüllung (&bdquo;Recht zur zweiten Andienung&ldquo;)</h4>
            <p className="text-sm text-slate-300">
              Der Käufer muss dem Verkäufer zunächst Gelegenheit zur Nacherfüllung geben,
              bevor er weitere Rechte geltend machen kann.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-2">§ 437 Nr. 1: Nacherfüllung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 439</span>)</h4>
              <p className="text-sm text-slate-300">
                <strong>Wahl des Käufers</strong> zwischen:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                <li><strong>Mängelbeseitigung</strong> (Nachbesserung/Reparatur)</li>
                <li><strong>Nachlieferung</strong> (Lieferung einer mangelfreien Sache)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-2">§ 437 Nr. 2: Rücktritt oder Minderung</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-2">
                <div className="p-3 bg-amber-900/20 rounded">
                  <strong className="text-amber-300">Rücktritt (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 323 V S. 2</span>)</strong>
                  <p className="text-slate-400 mt-1">Nur bei <strong>erheblichem Mangel</strong>!</p>
                </div>
                <div className="p-3 bg-green-900/20 rounded">
                  <strong className="text-green-300">Minderung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 441</span>)</strong>
                  <p className="text-slate-400 mt-1">Auch bei <strong>unerheblichem Mangel</strong> möglich!</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-2">§ 437 Nr. 3: Schadensersatz (§§ 280 ff.)</h4>
              <p className="text-sm text-slate-300">
                Neben Rücktritt und Minderung kann der Käufer Schadensersatz verlangen
                (setzt Verschulden voraus).
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Ausschluss der Mängelhaftung</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Durch Gesetz:</strong> <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 442</span> bei Kenntnis oder grob fahrlässiger Unkenntnis des Käufers</li>
              <li><strong>Durch Vertrag:</strong> Grundsätzlich zulässig, aber Grenzen: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 444</span> (Arglist), <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 475</span> (Verbrauchsgüter), <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 309 Nr. 8b</span> (AGB)</li>
            </ul>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Der Rücktritt ist bei unerheblichem Mangel ausgeschlossen
            (§ 323 V S. 2), die Minderung aber nicht! Immer erst Nacherfüllung prüfen, bevor
            weitere Rechte geprüft werden.
          </div>

          <MermaidDiagram chart={maengelrechteDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
      diagram: {
        type: 'animated',
        component: VertragspruefungStepper,
      },
    },
    {
      id: 'ruegepflicht',
      title: 'Rügepflicht im Handelskauf (§ 377 HGB)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
            <h4 className="font-semibold text-red-300 mb-2">ACHTUNG: Nur bei Handelskauf (beide Seiten Kaufleute)!</h4>
            <p className="text-sm text-slate-300">
              <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 377 HGB</span> verpflichtet
              den Käufer zur <strong>unverzüglichen Prüfung</strong> der Ware nach Ablieferung
              und zur <strong>unverzüglichen Anzeige</strong> von Mängeln.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-3">Prüfschema § 377 HGB</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Handelskauf:</strong> Beide Parteien müssen Kaufleute sein</li>
              <li><strong>Ablieferung:</strong> Ware wurde übergeben</li>
              <li><strong>Unverzügliche Prüfung:</strong> Ohne schuldhaftes Zögern nach Ablieferung</li>
              <li><strong>Mängelanzeige:</strong> Unverzüglich nach Entdeckung</li>
            </ol>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Unterlässt der Käufer die Rüge oder rügt er zu spät, gilt die
            Ware als <strong>genehmigt</strong>! Damit verliert er sämtliche Mängelrechte.
            Die Rügepflicht ist eine der wichtigsten Sonderregelungen des HGB gegenüber dem BGB.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die Rügepflicht dient der raschen Abwicklung im Handelsverkehr
            und der erhöhten Selbstverantwortung von Kaufleuten. Sie ist Ausdruck des Grundsatzes,
            dass das HGB das BGB modifiziert.
          </div>
        </div>
      ),
    },
    {
      id: 'werkvertrag',
      title: 'Werkvertrag (§§ 631 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Definition</h4>
            <p className="text-sm text-slate-300">
              Herstellung eines Werkes &mdash; es wird ein <strong>Erfolg</strong> geschuldet
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 631</span>).
              Abgrenzung zum Dienstvertrag (§ 611), bei dem nur das <em>Tätigwerden</em> geschuldet wird.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">Pflichten des Unternehmers</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Herstellung eines Werkes (Erfolg!)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-2">Pflichten des Bestellers</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Zahlung der Vergütung</li>
                <li>Abnahme des Werkes</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Mängelrechte des Bestellers (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 634</span>)</h4>
            <p className="text-sm text-slate-300 mb-3">Ähnlich wie beim Kaufvertrag, aber mit wichtigen Unterschieden:</p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li>
                <strong>§ 634 Nr. 1: Nacherfüllung</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 635</span>)
                &mdash; Wahl obliegt dem <strong>Unternehmer</strong> (nicht dem Besteller!)
              </li>
              <li><strong>§ 634 Nr. 2: Rücktritt / Minderung</strong> (alternativ)</li>
              <li><strong>§ 634 Nr. 3: Schadensersatz / § 634 Nr. 4: Aufwendungsersatz</strong> (nebeneinander)</li>
            </ul>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Beim Werkvertrag hat der <strong>Unternehmer</strong> das
            Wahlrecht bei der Nacherfüllung (§ 635), beim Kaufvertrag der <strong>Käufer</strong> (§ 439)!
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-3">Vergleich: Kaufvertrag vs. Werkvertrag</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Kriterium</th>
                    <th className="text-left py-2 px-3">Kaufvertrag (§ 433)</th>
                    <th className="text-left py-2 px-3">Werkvertrag (§ 631)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-medium">Leistung</td>
                    <td className="py-2 px-3">Übergabe & Übereignung</td>
                    <td className="py-2 px-3">Herstellung eines Werkes (Erfolg)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-medium">Mängelrechte</td>
                    <td className="py-2 px-3">§ 437</td>
                    <td className="py-2 px-3">§ 634</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-medium">Nacherfüllung</td>
                    <td className="py-2 px-3">Wahl des <strong>Käufers</strong> (§ 439)</td>
                    <td className="py-2 px-3">Wahl des <strong>Unternehmers</strong> (§ 635)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-medium">Rücktritt & Minderung</td>
                    <td className="py-2 px-3">Nebeneinander</td>
                    <td className="py-2 px-3">Alternativ</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Besonderheit</td>
                    <td className="py-2 px-3">§ 377 HGB Rügepflicht bei Handelskauf</td>
                    <td className="py-2 px-3">Abnahme des Werkes erforderlich</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <MermaidDiagram chart={kaufWerkVergleichDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'kv-q1',
        type: 'multiple-choice',
        question: 'Welches Recht hat bei Mängeln im Kaufvertrag Vorrang?',
        options: [
          'Rücktritt',
          'Nacherfüllung (§ 439)',
          'Minderung',
          'Schadensersatz',
        ],
        correctAnswer: 'Nacherfüllung (§ 439)',
        explanation: 'Die Nacherfüllung hat Vorrang ("Recht zur zweiten Andienung"). Erst nach erfolgloser Nacherfüllung kann der Käufer Rücktritt, Minderung oder SE geltend machen.',
      },
      {
        id: 'kv-q2',
        type: 'multiple-choice',
        question: 'Was liegt vor, wenn eine Sache nicht die vereinbarte Beschaffenheit aufweist (§ 434 I S. 1)?',
        options: [
          'Rechtsmangel',
          'Sachmangel (subjektiver Fehlerbegriff)',
          'Aliud-Lieferung',
          'Zu-wenig-Lieferung',
        ],
        correctAnswer: 'Sachmangel (subjektiver Fehlerbegriff)',
        explanation: 'Die vereinbarte Beschaffenheit (§ 434 I S. 1) ist die erste Stufe des Sachmangelbegriffs (subjektiver Fehlerbegriff).',
      },
      {
        id: 'kv-q3',
        type: 'order-steps',
        question: 'Bringen Sie die Mängelrechte des Käufers in die richtige Reihenfolge (Prüfung):',
        options: [
          'Nacherfüllung (§ 439) prüfen',
          'Nacherfüllung erfolglos?',
          'Rücktritt (§ 323) oder Minderung (§ 441)',
          'Schadensersatz (§§ 280 ff.)',
        ],
        correctAnswer: [
          'Nacherfüllung (§ 439) prüfen',
          'Nacherfüllung erfolglos?',
          'Rücktritt (§ 323) oder Minderung (§ 441)',
          'Schadensersatz (§§ 280 ff.)',
        ],
        explanation: 'Vorrang der Nacherfüllung! Erst wenn diese fehlschlägt, kommen Rücktritt, Minderung und SE in Betracht.',
      },
      {
        id: 'kv-q4',
        type: 'match-pairs',
        question: 'Ordne die Pflichten dem richtigen Vertragstyp zu:',
        options: [
          'Übergabe & Übereignung::Kaufvertrag (Verkäufer)',
          'Herstellung eines Werkes::Werkvertrag (Unternehmer)',
          'Abnahme der Kaufsache::Kaufvertrag (Käufer)',
          'Abnahme des Werkes::Werkvertrag (Besteller)',
        ],
        correctAnswer: [
          'Übergabe & Übereignung::Kaufvertrag (Verkäufer)',
          'Herstellung eines Werkes::Werkvertrag (Unternehmer)',
          'Abnahme der Kaufsache::Kaufvertrag (Käufer)',
          'Abnahme des Werkes::Werkvertrag (Besteller)',
        ],
        explanation: 'Die Pflichten der Vertragsparteien unterscheiden sich je nach Vertragstyp.',
      },
      {
        id: 'kv-q5',
        type: 'multiple-choice',
        question: 'Wer hat beim Werkvertrag das Wahlrecht bei der Nacherfüllung (§ 635)?',
        options: [
          'Der Besteller',
          'Der Unternehmer',
          'Beide gemeinsam',
          'Das Gericht entscheidet',
        ],
        correctAnswer: 'Der Unternehmer',
        explanation: 'Anders als beim Kaufvertrag (§ 439: Wahl des Käufers) hat beim Werkvertrag der Unternehmer das Wahlrecht bei der Nacherfüllung (§ 635).',
      },
      {
        id: 'kv-q6',
        type: 'multiple-choice',
        question: 'Was passiert, wenn ein Kaufmann die Rüge nach § 377 HGB unterlässt?',
        options: [
          'Die Ware gilt als genehmigt, Mängelrechte gehen verloren',
          'Die Verjährungsfrist wird verlängert',
          'Der Verkäufer muss trotzdem nacherfüllen',
          'Nichts, § 377 HGB ist nur eine Ordnungsvorschrift',
        ],
        correctAnswer: 'Die Ware gilt als genehmigt, Mängelrechte gehen verloren',
        explanation: 'Bei unterlassener oder verspäteter Rüge nach § 377 HGB gilt die Ware als genehmigt. Der Käufer verliert sämtliche Mängelrechte!',
      },
      {
        id: 'kv-q7',
        type: 'fill-blank',
        question: 'Ein Rücktritt bei Sachmangel ist nach § 323 V S. 2 nur bei einem ___ Mangel möglich.',
        options: ['erheblichen', 'unerheblichen', 'offensichtlichen', 'versteckten'],
        correctAnswer: 'erheblichen',
        explanation: 'Der Rücktritt ist nach § 323 V S. 2 bei unerheblichem Mangel ausgeschlossen. Die Minderung (§ 441) ist dagegen auch bei unerheblichem Mangel möglich.',
      },
      {
        id: 'kv-q8',
        type: 'multiple-choice',
        question: 'Was schuldet der Unternehmer beim Werkvertrag?',
        options: [
          'Einen Erfolg (Herstellung eines Werkes)',
          'Nur das Tätigwerden (Dienste)',
          'Die Übergabe einer Kaufsache',
          'Eine Mietzahlung',
        ],
        correctAnswer: 'Einen Erfolg (Herstellung eines Werkes)',
        explanation: 'Beim Werkvertrag wird ein Erfolg geschuldet (§ 631), beim Dienstvertrag (§ 611) nur das Tätigwerden.',
      },
      {
        id: 'kv-q9',
        type: 'fill-blank',
        question: 'Die Rügepflicht nach § 377 HGB gilt nur bei einem ___, also wenn beide Parteien Kaufleute sind.',
        options: ['Handelskauf', 'Verbrauchsgüterkauf', 'Werkvertrag', 'Dienstvertrag'],
        correctAnswer: 'Handelskauf',
        explanation: '§ 377 HGB gilt nur beim Handelskauf, wenn beide Vertragsparteien Kaufleute sind.',
      },
      {
        id: 'kv-q10',
        type: 'multi-select',
        question: 'Welche Sachmangel-Tatbestände sind in § 434 geregelt?',
        options: [
          'Vereinbarte Beschaffenheit fehlt',
          'Eignung für gewöhnliche Verwendung fehlt',
          'Fehlerhafte Montageanleitung',
          'Aliud-Lieferung (falsche Sache)',
          'Verspätete Lieferung',
        ],
        correctAnswer: [
          'Vereinbarte Beschaffenheit fehlt',
          'Eignung für gewöhnliche Verwendung fehlt',
          'Fehlerhafte Montageanleitung',
          'Aliud-Lieferung (falsche Sache)',
        ],
        explanation: 'Eine verspätete Lieferung ist kein Sachmangel, sondern ein Fall des Verzugs (§ 286). Alle anderen Tatbestände sind in § 434 geregelt.',
      },
    ],
  },

  relatedTopics: [
    { id: 'leistungsstoerungen', title: 'Leistungsstörungen', relationship: 'allgemeines Leistungsstörungsrecht' },
    { id: 'gesellschaftsrecht', title: 'Handels- und Gesellschaftsrecht', relationship: 'Rügepflicht § 377 HGB' },
  ],
}
