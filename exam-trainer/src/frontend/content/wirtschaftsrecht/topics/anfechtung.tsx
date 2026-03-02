// src/content/wirtschaftsrecht/topics/anfechtung.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { AnfechtungDecisionTree } from '../diagrams/AnfechtungDecisionTree'

const anfechtungPruefungDiagram = `flowchart TD
  A["Anfechtungspruefung"] --> B["1. Anfechtungsgrund?"]
  B --> B1["ss 119 I: Erklaerungsirrtum / Inhaltsirrtum"]
  B --> B2["ss 119 II: Eigenschaftsirrtum"]
  B --> B3["ss 123: Arglistige Taeuschung / Drohung"]
  B1 --> C["2. Anfechtungserklaerung ss 143"]
  B2 --> C
  B3 --> C
  C --> D["3. Anfechtungsfrist"]
  D --> D1["ss 121: unverzueglich bei ss 119"]
  D --> D2["ss 124: 1 Jahr bei ss 123"]
  D1 --> E["4. Kein Ausschluss?"]
  D2 --> E
  E --> F["Rechtsfolge: ss 142 I WE von Anfang an nichtig"]
  style A fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style F fill:#3b1f1f,stroke:#ef4444,color:#fca5a5
`

const verjaehrungDiagram = `flowchart LR
  V["Verjaehrung ss 194 ff."] --> R["Regelverjaehrung ss 195: 3 Jahre"]
  R --> B["Beginn ss 199 I"]
  B --> B1["Schluss des Jahres in dem Anspruch entstand"]
  B --> B2["+ Kenntnis des Glaeubigers"]
  V --> E["Einrede ss 214 I"]
  E --> E1["Muss geltend gemacht werden!"]
  E1 --> E2["Anspruch dauernd nicht durchsetzbar"]
  style V fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style E2 fill:#3b1f1f,stroke:#ef4444,color:#fca5a5
`

export const anfechtungTopic: Topic = {
  id: 'anfechtung',
  title: 'Anfechtung & Verjaehrung',
  description:
    'Anfechtung als Gestaltungsrecht, Pruefungsaufbau, Anfechtungsgruende (ssss 119, 123), Fristen (ssss 121, 124), Verjaehrung (ssss 194 ff.)',
  icon: '\uD83D\uDD04',
  examNotes:
    'ss 142 betrifft die Willenserklaerung, nicht den Vertrag! Erklaerungsirrtum != Inhaltsirrtum!',

  sections: [
    // ───────────────────────────────────────────────
    // 1. Anfechtung als Gestaltungsrecht
    // ───────────────────────────────────────────────
    {
      id: 'anfechtung-gestaltungsrecht',
      title: 'Anfechtung als Gestaltungsrecht',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Die <strong>Anfechtung</strong> ist ein <strong>Gestaltungsrecht</strong>. Sie muss durch
              Erklaerung gegenueber dem Anfechtungsgegner ausgeuellt werden
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 143</span>).
              Nur wenn die Anfechtung erklaert wird, tritt die Rechtsfolge ein.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Was bedeutet Gestaltungsrecht?</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                Bei der Anfechtung handelt es sich um ein <strong>einseitiges Gestaltungsrecht</strong>:
                Durch die blosse Erklaerung der Anfechtung wird die Rechtslage unmittelbar veraendert &ndash;
                ohne dass der Anfechtungsgegner zustimmen muss.
              </p>
              <p>
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 142 I</span>:
                Ein anfechtbares Rechtsgeschaeft ist, wenn es angefochten wird, als <strong>von Anfang an nichtig</strong> anzusehen.
              </p>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Es gibt keinen &bdquo;Anspruch auf Anfechtung&ldquo;!
            Die Anfechtung ist ein Gestaltungsrecht, kein Anspruch. Auch das blosse Vorliegen eines
            Anfechtungsgrundes &bdquo;kippt&ldquo; den Anspruch nicht &ndash; die Anfechtung muss
            <em> erklaert</em> werden (<span className="font-mono">&sect; 143</span>).
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Wichtiger Denkfehler vermeiden:</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 142 I</span> betrifft
                die <strong>Willenserklaerung</strong>, nicht den Vertrag!
              </p>
              <p>
                Wenn eine WE angefochten wird und die Anfechtung wirksam ist, ist diese WE als von
                Anfang an nichtig anzusehen. Da der Vertrag aus zwei Willenserklaerungen besteht,
                fehlt dann eine der beiden WE &rarr; kein Vertrag &rarr; kein Anspruch.
              </p>
              <div className="p-3 bg-green-900/20 rounded border border-green-800 mt-2">
                <p className="text-green-300">
                  <strong>Einfach:</strong> ss 142 I meint Willenserklaerung. Wenn keine WE,
                  dann auch kein Vertrag. Wenn kein Vertrag, dann auch kein Anspruch.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Der Pruefungseinstieg in der Klausur lautet:
            &bdquo;[Partei] koennte jedoch seine zum Vertragsschluss fuehrende Willenserklaerung
            wirksam angefochten haben. Dann waere die Willenserklaerung als von Anfang an nichtig
            anzusehen, <span className="font-mono">&sect; 142 I</span>.&ldquo;
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Da <span className="font-mono">&sect; 142 I</span> bestimmt,
            dass die WE als <strong>von Anfang an nichtig</strong> anzusehen ist, spielt sich die
            Pruefung innerhalb des Pruefungspunktes &bdquo;<em>Anspruch entstanden</em>&ldquo; ab!
            Nicht bei &bdquo;Anspruch untergegangen&ldquo;.
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 2. Pruefungsaufbau
    // ───────────────────────────────────────────────
    {
      id: 'pruefungsaufbau',
      title: 'Pruefungsaufbau der Anfechtung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Die Anfechtungspruefung folgt einem festen Schema. Die Reihenfolge der Pruefungspunkte
              kann variieren, aber alle muessen geprueft werden.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/50 border border-green-700 text-green-300 font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-green-300">Anfechtungsgrund?</div>
                <div className="text-sm text-slate-400 mt-1">
                  Liegt ein Irrtum nach <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 119</span> oder
                  arglistige Taeuschung/Drohung nach <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 123</span> vor?
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-blue-300">Anfechtungserklaerung (<span className="font-mono">&sect; 143</span>)</div>
                <div className="text-sm text-slate-400 mt-1">
                  Hat der Anfechtende die Anfechtung gegenueber dem Anfechtungsgegner erklaert?
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-900/50 border border-amber-700 text-amber-300 font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-amber-300">Wahrung der Anfechtungsfrist</div>
                <div className="text-sm text-slate-400 mt-1">
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 121</span>: unverzueglich bei <span className="font-mono">&sect; 119</span> |{' '}
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 124</span>: ein Jahr bei <span className="font-mono">&sect; 123</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <div className="font-medium text-purple-300">Kein Ausschluss der Anfechtung?</div>
                <div className="text-sm text-slate-400 mt-1">
                  Kein Ausschlussgrund (z.B. Bestätigung, Kenntnis des Grundes)
                </div>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={anfechtungPruefungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp (Pelke):</strong> Grundsaetzlich wird empfohlen, mit dem Anfechtungsgrund
            zu beginnen. Aber: Wenn das Problem der Klausur in der Diskussion des Anfechtungsgrundes
            besteht, ist Problembewusstsein gefragt! Dann ggf. die Anfechtungserklaerung weiter hinten
            pruefen. Das Stichwort heisst: <em>Flexibilitaet</em>.
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 3. Anfechtungsgruende
    // ───────────────────────────────────────────────
    {
      id: 'anfechtungsgruende',
      title: 'Anfechtungsgruende',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Das BGB kennt verschiedene Anfechtungsgruende. Die wichtigsten sind in
              <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 119</span> und
              <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 123</span> geregelt.
            </p>
          </div>

          <div className="grid gap-4">
            {/* ss 119 I: Erklaerungsirrtum */}
            <div className="p-4 bg-slate-800 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 119 I Alt. 2</span> Erklaerungsirrtum
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Der Erklaerende will die Erklaerung <strong>so gar nicht abgeben</strong>. Er hat sich{' '}
                  <strong>verschrieben</strong> oder <strong>versprochen</strong>.
                </p>
                <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                  <strong className="text-blue-300">Merkmal:</strong> Erklärtes und Gewolltes fallen <em>unbewusst</em> auseinander.
                  Der Erklaerende wollte eine <em>andere</em> Erklaerung abgeben.
                </div>
                <div className="p-2 bg-slate-700/50 rounded text-slate-400">
                  <strong>Beispiel (Fall 39):</strong> R schreibt 20.000 &euro; statt 2.000 &euro; &ndash; er hat sich verschrieben.
                </div>
              </div>
            </div>

            {/* ss 119 I: Inhaltsirrtum */}
            <div className="p-4 bg-slate-800 rounded-lg border border-green-700">
              <h4 className="font-medium text-green-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 119 I Alt. 1</span> Inhaltsirrtum
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Der Erklaerende will die Erklaerung <strong>exakt so abgeben</strong>, aber{' '}
                  <strong>nicht mit diesem Inhalt</strong>. Er hat den Inhalt seiner Erklaerung{' '}
                  <em>falsch gewertet</em>.
                </p>
                <div className="p-3 bg-green-900/20 rounded border border-green-800">
                  <strong className="text-green-300">Sonderfall Verlautbarungsirrtum:</strong> Der Erklaerende
                  benutzt ein Wort, dessen Bedeutung er falsch versteht.
                </div>
                <div className="p-2 bg-slate-700/50 rounded text-slate-400">
                  <strong>Beispiel (Fall 40):</strong> S denkt, &bdquo;Schock&ldquo; bedeutet 10 Stueck,
                  tatsaechlich sind es 60 Stueck. Er wollte genau das sagen, hat aber den Inhalt falsch verstanden.
                </div>
              </div>
            </div>

            {/* ss 119 II: Eigenschaftsirrtum */}
            <div className="p-4 bg-slate-800 rounded-lg border border-amber-700">
              <h4 className="font-medium text-amber-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 119 II</span> Eigenschaftsirrtum
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Irrtum ueber eine <strong>verkehrswesentliche Eigenschaft</strong> der Person oder Sache.
                </p>
                <div className="p-2 bg-slate-700/50 rounded text-slate-400">
                  <strong>Beispiel:</strong> Kauf eines vermeintlichen Originalgemaeldes, das sich als Faelschung herausstellt.
                </div>
              </div>
            </div>

            {/* ss 123: Taeuschung / Drohung */}
            <div className="p-4 bg-slate-800 rounded-lg border border-red-700">
              <h4 className="font-medium text-red-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 123</span> Arglistige Taeuschung / widerrechtliche Drohung
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Der Erklaerende wurde durch arglistige Taeuschung oder widerrechtliche Drohung zur
                  Abgabe der WE bestimmt. Hier liegt kein Irrtum des Erklaerenden vor, sondern ein Fehlverhalten
                  des Anfechtungsgegners.
                </p>
                <div className="p-3 bg-red-900/20 rounded border border-red-800">
                  <strong className="text-red-300">Besonderheit:</strong> Laengere Anfechtungsfrist von{' '}
                  <strong>einem Jahr</strong> (<span className="font-mono">&sect; 124</span>) statt unverzueglich (<span className="font-mono">&sect; 121</span>).
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Erklaerungsirrtum &ne; Inhaltsirrtum!
            Beim <em>Erklaerungsirrtum</em> will der Erklaerende die Erklaerung so gar nicht abgeben (Verschreiben/Versprechen).
            Beim <em>Inhaltsirrtum</em> will der Erklaerende die Erklaerung exakt so abgeben, hat aber den Inhalt falsch gewertet.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp (Pelke):</strong> Im Rahmen einer Anfechtungspruefung spielt es nie eine
            Rolle, ob der Irrende den Irrtum haette vermeiden koennen. Unglaublich, aber wahr: Man darf
            richtig dumm sein.
          </div>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: AnfechtungDecisionTree,
      },
    },

    // ───────────────────────────────────────────────
    // 4. Fristen
    // ───────────────────────────────────────────────
    {
      id: 'anfechtungsfristen',
      title: 'Anfechtungsfristen',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Die Anfechtung muss innerhalb der gesetzlichen Frist erklaert werden.
              Die Frist richtet sich nach dem Anfechtungsgrund.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 121</span> Frist bei Irrtum (<span className="font-mono">&sect; 119</span>)
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Die Anfechtung muss <strong>unverzueglich</strong> (ohne schuldhaftes Zoegern) nach
                  Kenntnis des Anfechtungsgrundes erklaert werden.
                </p>
                <div className="p-2 bg-blue-900/20 rounded border border-blue-800">
                  <p className="text-blue-300">
                    &bdquo;Unverzueglich&ldquo; = ohne schuldhaftes Zoegern, nicht sofort!
                    Eine angemessene Ueberlegungsfrist ist zulaessig.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-red-700">
              <h4 className="font-medium text-red-300 mb-3">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 124</span> Frist bei Taeuschung/Drohung (<span className="font-mono">&sect; 123</span>)
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Die Anfechtung muss innerhalb von <strong>einem Jahr</strong> nach Entdeckung der
                  Taeuschung bzw. nach Beendigung der Zwangslage erklaert werden.
                </p>
                <div className="p-2 bg-red-900/20 rounded border border-red-800">
                  <p className="text-red-300">
                    Die laengere Frist bei <span className="font-mono">&sect; 123</span> beruecksichtigt die
                    besondere Schutzbeduerftigkeit des Getaeuschten/Bedrohten.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Merke die Zuordnung:{' '}
            <span className="font-mono">&sect; 119</span> &rarr; <span className="font-mono">&sect; 121</span> (unverzueglich) |{' '}
            <span className="font-mono">&sect; 123</span> &rarr; <span className="font-mono">&sect; 124</span> (ein Jahr).
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 5. Verjaehrung
    // ───────────────────────────────────────────────
    {
      id: 'verjaehrung',
      title: 'Verjaehrung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Die <strong>Verjaehrung</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 194 ff.</span>)
              betrifft die <strong>Durchsetzbarkeit</strong> eines Anspruchs. Ein verjaehrter Anspruch
              besteht zwar noch, kann aber vom Schuldner dauerhaft abgewehrt werden.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Regelverjaehrung</h4>
            <div className="grid gap-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                <div className="font-medium text-blue-300">
                  Frist (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 195</span>)
                </div>
                <p className="text-slate-400 mt-1">
                  Die regelmaessige Verjaehrungsfrist betraegt <strong>drei Jahre</strong>.
                </p>
              </div>
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <div className="font-medium text-green-300">
                  Beginn (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 199 I</span>)
                </div>
                <p className="text-slate-400 mt-1">
                  Die Verjaehrung beginnt mit dem <strong>Schluss des Jahres</strong>, in dem:
                </p>
                <ul className="text-slate-400 mt-1 ml-4 list-disc">
                  <li>der Anspruch entstanden ist, und</li>
                  <li>der Glaeueber von den anspruchsbegruendenden Umstaenden <strong>Kenntnis</strong> erlangt hat (oder ohne grobe Fahrlaessigkeit haette erlangen muessen)</li>
                </ul>
              </div>
              <div className="p-3 bg-amber-900/20 rounded border border-amber-800">
                <div className="font-medium text-amber-300">
                  Einrede (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 214 I</span>)
                </div>
                <p className="text-slate-400 mt-1">
                  Der Schuldner muss die Verjaehrungseinrede <strong>geltend machen</strong>! Die blosse
                  Verjaehrung allein hindert nicht die Durchsetzbarkeit. Zur Geltendmachung genuegt die
                  konkludente Berufung auf die Verjaehrung.
                </p>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={verjaehrungDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Pruefung im Anspruchsaufbau</h4>
            <p className="text-sm text-slate-300">
              Die Verjaehrung wird im Pruefungspunkt <strong>&bdquo;Anspruch durchsetzbar?&ldquo;</strong> geprueft.
              Wenn die Verjaehrungsvoraussetzungen vorliegen und die Verjaehrung geltend gemacht wurde,
              ist der Anspruch <strong>dauernd</strong> (= peremptorisch) nicht durchsetzbar.
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Verjaehrung vernichtet den Anspruch nicht! Der Anspruch
            besteht weiterhin, er ist nur <em>nicht durchsetzbar</em>. Der Schuldner muss die Einrede
            <strong> aktiv geltend machen</strong> (&bdquo;Mund aufmachen!&ldquo;). Im Ergebnissatz also:
            &bdquo;[X] hat gegen [Y] einen Anspruch auf [...]. Der Anspruch ist jedoch dauernd nicht durchsetzbar.&ldquo;
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp (Pelke):</strong> Schweigen ist Silber, Reden ist Gold! Der Anspruchsgegner
            muss die Verjaehrungseinrede geltend machen. Ohne Berufung auf die Verjaehrung bleibt der
            Anspruch durchsetzbar &ndash; auch wenn die Frist laengst abgelaufen ist.
          </div>
        </div>
      ),
    },
  ],

  // ───────────────────────────────────────────────
  // Quiz
  // ───────────────────────────────────────────────
  quiz: {
    questions: [
      {
        id: 'anf-q1',
        type: 'multiple-choice',
        question: 'Was ist der Unterschied zwischen Erklaerungsirrtum und Inhaltsirrtum?',
        options: [
          'Beim Erklaerungsirrtum will der Erklaerende die Erklaerung so gar nicht abgeben; beim Inhaltsirrtum will er sie exakt so abgeben, hat aber den Inhalt falsch gewertet',
          'Beim Inhaltsirrtum hat sich der Erklaerende verschrieben; beim Erklaerungsirrtum hat er den Inhalt falsch verstanden',
          'Es gibt keinen Unterschied, beides faellt unter ss 119 I',
          'Der Erklaerungsirrtum betrifft Eigenschaften der Sache, der Inhaltsirrtum den Preis',
        ],
        correctAnswer:
          'Beim Erklaerungsirrtum will der Erklaerende die Erklaerung so gar nicht abgeben; beim Inhaltsirrtum will er sie exakt so abgeben, hat aber den Inhalt falsch gewertet',
        explanation:
          'Erklaerungsirrtum (ss 119 I Alt. 2): Der Erklaerende hat sich verschrieben/versprochen und will eine ANDERE Erklaerung abgeben. Inhaltsirrtum (ss 119 I Alt. 1): Der Erklaerende will genau DAS sagen, hat aber den Inhalt falsch gewertet (z.B. "Schock" = 60, nicht 10).',
      },
      {
        id: 'anf-q2',
        type: 'free-text',
        question:
          'Formulieren Sie den Pruefungseinstieg einer Anfechtung im Gutachtenstil (bezogen auf eine Willenserklärung des Kaeufers K).',
        placeholder: 'K koennte jedoch ...',
        modelAnswer:
          'K koennte jedoch seine zum Vertragsschluss fuehrende Willenserklaerung wirksam angefochten haben. Dann waere die Willenserklaerung als von Anfang an nichtig anzusehen, ss 142 I.',
        keyPoints: [
          'Bezug auf die Willenserklaerung (nicht den Vertrag!)',
          'Verweis auf ss 142 I',
          'Rechtsfolge: "von Anfang an nichtig anzusehen"',
          'Konjunktiv ("koennte ... angefochten haben")',
        ],
        explanation:
          'Der Pruefungseinstieg muss ss 142 I beruecksichtigen. Die Anfechtung betrifft die WE, nicht den Vertrag. Dadurch wird klar, dass die Pruefung unter "Anspruch entstanden" stattfindet.',
      },
      {
        id: 'anf-q3',
        type: 'fill-blank',
        question:
          'Die Anfechtungsfrist bei ss 119 betraegt ___ (ss ___), bei ss 123 betraegt sie ___ (ss ___).',
        options: [
          'unverzueglich, 121, ein Jahr, 124',
          'ein Jahr, 124, unverzueglich, 121',
          'drei Jahre, 195, unverzueglich, 121',
          'unverzueglich, 121, drei Jahre, 195',
        ],
        correctAnswer: 'unverzueglich, 121, ein Jahr, 124',
        explanation:
          'Bei ss 119 (Irrtum) gilt ss 121: unverzueglich (ohne schuldhaftes Zoegern). Bei ss 123 (arglistige Taeuschung/Drohung) gilt ss 124: ein Jahr nach Entdeckung/Beendigung.',
      },
      {
        id: 'anf-q4',
        type: 'match-pairs',
        question: 'Ordnen Sie die Anfechtungsgruende den richtigen Paragraphen zu:',
        options: [
          'Erklaerungsirrtum (Verschreiben) :: ss 119 I Alt. 2',
          'Inhaltsirrtum (Verlautbarungsirrtum) :: ss 119 I Alt. 1',
          'Eigenschaftsirrtum :: ss 119 II',
          'Arglistige Taeuschung :: ss 123',
        ],
        correctAnswer: [
          'Erklaerungsirrtum (Verschreiben) :: ss 119 I Alt. 2',
          'Inhaltsirrtum (Verlautbarungsirrtum) :: ss 119 I Alt. 1',
          'Eigenschaftsirrtum :: ss 119 II',
          'Arglistige Taeuschung :: ss 123',
        ],
        explanation:
          'Die Zuordnung der Anfechtungsgruende zu den Paragraphen muss sicher beherrscht werden. ss 119 I enthält zwei Alternativen: Inhaltsirrtum (Alt. 1) und Erklaerungsirrtum (Alt. 2).',
      },
      {
        id: 'anf-q5',
        type: 'multiple-choice',
        question: 'Was ist die Rechtsfolge einer wirksamen Anfechtung gemaess ss 142 I?',
        options: [
          'Der Vertrag wird fuer die Zukunft aufgeloest',
          'Die angefochtene Willenserklaerung ist als von Anfang an nichtig anzusehen',
          'Der Anfechtende schuldet Schadensersatz statt Leistung',
          'Das Rechtsgeschaeft wird in ein anderes umgedeutet',
        ],
        correctAnswer:
          'Die angefochtene Willenserklaerung ist als von Anfang an nichtig anzusehen',
        explanation:
          'ss 142 I bestimmt: Das anfechtbare Rechtsgeschaeft (= die WE) ist als von Anfang an nichtig anzusehen. Dies fuehrt dazu, dass eine der fuer den Vertrag erforderlichen WE fehlt, also kein Vertrag besteht.',
      },
      {
        id: 'anf-q6',
        type: 'multiple-choice',
        question: 'Wo wird die Verjaehrung im Anspruchsaufbau geprueft?',
        options: [
          'Anspruch entstanden?',
          'Anspruch uebergegangen?',
          'Anspruch untergegangen?',
          'Anspruch durchsetzbar?',
        ],
        correctAnswer: 'Anspruch durchsetzbar?',
        explanation:
          'Die Verjaehrung wird im Pruefungspunkt "Anspruch durchsetzbar?" geprueft. Der Anspruch besteht weiterhin (er ist nicht untergegangen), er ist nur nicht mehr durchsetzbar, wenn die Einrede erhoben wird.',
      },
      {
        id: 'anf-q7',
        type: 'multiple-choice',
        question: 'Wie lange betraegt die regelmaessige Verjaehrungsfrist gemaess ss 195 BGB?',
        options: ['1 Jahr', '2 Jahre', '3 Jahre', '5 Jahre'],
        correctAnswer: '3 Jahre',
        explanation:
          'Die regelmaessige Verjaehrungsfrist gemaess ss 195 BGB betraegt drei Jahre. Sie beginnt mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Glaeueber Kenntnis erlangt hat (ss 199 I).',
      },
      {
        id: 'anf-q8',
        type: 'multiple-choice',
        question: 'Was muss der Schuldner tun, damit die Verjaehrung den Anspruch hemmt?',
        options: [
          'Nichts, die Verjaehrung wirkt automatisch',
          'Er muss die Verjaehrungseinrede geltend machen (ss 214 I)',
          'Er muss Klage erheben',
          'Er muss den Glaeueber schriftlich informieren',
        ],
        correctAnswer: 'Er muss die Verjaehrungseinrede geltend machen (ss 214 I)',
        explanation:
          'Der Schuldner muss die Verjaehrungseinrede aktiv geltend machen (ss 214 I). Die blosse Verjaehrung allein hindert nicht die Durchsetzbarkeit. Zur Geltendmachung genuegt auch die konkludente Berufung auf die Verjaehrung.',
      },
      {
        id: 'anf-q9',
        type: 'multiple-choice',
        question: 'R verschreibt sich und bietet 20.000 Euro statt 2.000 Euro. Welcher Irrtum liegt vor?',
        options: [
          'Inhaltsirrtum (ss 119 I Alt. 1)',
          'Erklaerungsirrtum (ss 119 I Alt. 2)',
          'Eigenschaftsirrtum (ss 119 II)',
          'Motivirrtum (nicht anfechtbar)',
        ],
        correctAnswer: 'Erklaerungsirrtum (ss 119 I Alt. 2)',
        explanation:
          'R hat sich verschrieben: Er wollte 2.000 Euro schreiben, hat aber 20.000 Euro geschrieben. Das ist ein klassischer Erklaerungsirrtum (ss 119 I Alt. 2). Erklärtes und Gewolltes fallen unbewusst auseinander, weil R eine andere Erklaerung abgeben wollte.',
      },
      {
        id: 'anf-q10',
        type: 'multiple-choice',
        question: 'S denkt, "Schock" bedeutet 10 Stueck (tatsaechlich: 60 Stueck). Welcher Irrtum liegt vor?',
        options: [
          'Erklaerungsirrtum (ss 119 I Alt. 2)',
          'Inhaltsirrtum / Verlautbarungsirrtum (ss 119 I Alt. 1)',
          'Eigenschaftsirrtum (ss 119 II)',
          'Kein anfechtbarer Irrtum',
        ],
        correctAnswer: 'Inhaltsirrtum / Verlautbarungsirrtum (ss 119 I Alt. 1)',
        explanation:
          'S hat genau das gesagt, was er sagen wollte ("20 Schock"), aber den Inhalt des Wortes "Schock" falsch gewertet (10 statt 60). Das ist ein Inhaltsirrtum (ss 119 I Alt. 1), genauer ein Verlautbarungsirrtum. Er hat sich nicht verschrieben, sondern den Bedeutungsinhalt falsch verstanden.',
      },
    ],
  },

  // ───────────────────────────────────────────────
  // Exam Tasks
  // ───────────────────────────────────────────────
  examTasks: [
    // ─── Fall 39: Buddha-Statue ───
    {
      id: 'fall-39-buddha',
      title: 'Fall 39: Buddha-Statue (Erklaerungsirrtum)',
      points: 15,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              R moechte auf seinem parkaehnlichen Grundstueck eine zwei Meter hohe Buddha-Statue aufstellen.
              Zu deren Erwerb wendet er sich schriftlich an den Asiatika-Sammler A, der unter anderem eine
              solche Statue sein Eigen nennt. Anstatt &ndash; wie gewollt &ndash; ein Angebot in Hoehe von
              2.000 &euro; zu unterbreiten, bringt R versehentlich eine Null zu viel zu Papier. A liest
              korrekt &bdquo;20.000 &euro;&ldquo; und antwortet entzueckt, er sei mit dem Verkauf einverstanden.
              Bei der Anlieferung verlangt er von R 20.000 &euro;. R erklaert gegenueber A, er fechte den
              Vertrag an, da er sich verschrieben habe. A beharrt auf Zahlung des schriftlich erklaerten Preises.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat A gegen R einen Kaufpreisanspruch in Hoehe von 20.000 &euro;
            gemaess <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>?
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-39-a',
          type: 'free-text',
          question: 'a) Ist zwischen A und R ein Kaufvertrag entstanden?',
          placeholder: 'Dies setzt einen wirksamen Kaufvertrag voraus ...',
          modelAnswer:
            'Dies setzt einen wirksamen Kaufvertrag, ss 433 zwischen den Parteien voraus. Ein Kaufvertrag besteht aus zwei uebereinstimmenden Willenserklaerungen, Angebot und Annahme. R hat bezueglich der Statue ein schriftliches Kaufangebot in Hoehe von 20.000 Euro abgegeben. A hat dieses Angebot angenommen. Mithin haben die Parteien einen diesbezueglichen Kaufvertrag geschlossen.',
          keyPoints: [
            'Angebot des R: schriftlich, 20.000 Euro (+)',
            'Annahme des A: Zustimmung zum Verkauf (+)',
            'Kaufvertrag entstanden (+)',
          ],
          explanation:
            'Der Kaufvertrag ist zunaechst wirksam zustande gekommen. Erst die Anfechtung kann die WE und damit den Vertrag beseitigen.',
        },
        {
          id: 'fall-39-b',
          type: 'free-text',
          question:
            'b) Liegt eine wirksame Anfechtung der Willenserklaerung des R vor? Pruefen Sie alle Voraussetzungen.',
          placeholder: 'R koennte jedoch seine zum Vertragsschluss fuehrende Willenserklaerung wirksam angefochten haben ...',
          modelAnswer:
            'R koennte jedoch seine zum Vertragsschluss fuehrende Willenserklaerung wirksam angefochten haben. Dann waere die Willenserklaerung als von Anfang an nichtig anzusehen, ss 142 I. Fraglich ist, ob ein Anfechtungsgrund besteht. In Betracht kommt eine Anfechtung der Willenserklaerung des R (Angebot) gemaess ss 119 I wegen eines Erklaerungsirrtums. R hat einen Kaufpreis von 20.000 Euro erklaert, wollte aber tatsaechlich einen Preis von 2.000 Euro erklaeren. Er hat sich verschrieben. Insofern fallen Erklaertes und Gewolltes auseinander. Demnach liegt ein Erklaerungsirrtum im Sinne des ss 119 I vor. Also besteht ein Anfechtungsgrund. Der Anfechtende muesste die Anfechtung gegenueber dem Anfechtungsgegner erklaert haben, ss 143. R hat gegenueber A die Anfechtung erklaert. Zudem hat R die Anfechtung in der im Falle des ss 119 geltenden Anfechtungsfrist des ss 121, naemlich unverzueglich nach Kenntnis des Anfechtungsgrundes erklaert. Ein Ausschluss der Anfechtung ist nicht ersichtlich. Da alle Voraussetzungen vorliegen, ist die Willenserklaerung des R gemaess ss 142 als von Anfang an nichtig anzusehen.',
          keyPoints: [
            'Pruefungseinstieg mit ss 142 I',
            'Anfechtungsgrund: Erklaerungsirrtum ss 119 I (Verschrieben)',
            'Erklaertes (20.000) und Gewolltes (2.000) fallen auseinander',
            'Anfechtungserklaerung ss 143: R gegenueber A (+)',
            'Frist ss 121: unverzueglich (+)',
            'Kein Ausschluss (+)',
            'Rechtsfolge: WE von Anfang an nichtig, kein Vertrag',
          ],
          explanation:
            'Alle vier Voraussetzungen der Anfechtung muessen systematisch geprueft werden: Grund, Erklaerung, Frist, kein Ausschluss.',
        },
        {
          id: 'fall-39-c',
          type: 'free-text',
          question: 'c) Wie lautet das Ergebnis?',
          placeholder: 'Demnach ist der Anspruch ...',
          modelAnswer:
            'Demnach ist der Anspruch nicht entstanden. A hat gegen R keinen Anspruch auf Kaufpreiszahlung in Hoehe von 20.000 Euro gemaess ss 433 II.',
          keyPoints: [
            'Anspruch nicht entstanden (WE nichtig = kein Vertrag)',
            'A gegen R Kaufpreiszahlung 20.000 Euro ss 433 II (-)',
          ],
          explanation:
            'Durch die wirksame Anfechtung ist die WE des R nichtig. Ohne WE kein Vertrag, ohne Vertrag kein Anspruch.',
        },
      ],
    },

    // ─── Fall 40: Senftuben ───
    {
      id: 'fall-40-senftuben',
      title: 'Fall 40: Senftuben (Inhaltsirrtum / Verlautbarungsirrtum)',
      points: 15,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              Grossvater G, der seit dem Krieg mit argen Existenzaengsten kaempft, hat seinen Keller mit
              Vorraeten jeglicher Art voll gestopft. Da er Platz fuer eine Palette Dosensuppe schaffen moechte,
              bietet er seinem Sohn S &bdquo;20 Schock Senftuben zu 0,20 &euro; die Tube&ldquo; an.
              S ist entzueckt und verspricht, die Tuben alsbald abzuholen. Bei der Zusage war er
              faelschlicherweise davon ausgegangen, bei einem Schock handele es sich um eine Grosspackung
              &agrave; zehn Tuben. Tatsaechlich bezeichnet die altertuemliche Mengenangabe &bdquo;Schock&ldquo;
              je 60 Stueck. Als S hiervon erfaehrt, erklaert er gegenueber G, er habe sich bezueglich der
              Menge geirrt und wolle deshalb am Vertrag nicht festhalten.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat G gegen S einen Kaufpreisanspruch in Hoehe von 240 &euro;
            gemaess <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>?
            <span className="text-slate-500 ml-1">(20 &times; 60 &times; 0,20 &euro; = 240 &euro;)</span>
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-40-a',
          type: 'free-text',
          question: 'a) Ueber welche Menge ist der Kaufvertrag zustande gekommen?',
          placeholder: 'G hat ein Angebot zum Verkauf von ...',
          modelAnswer:
            'G hat ein Angebot zum Verkauf von 20 Schock Senftuben a 0,20 Euro pro Tube, also 20 x 60 x 0,20 Euro = 240 Euro abgegeben. S hat durch seine allgemeine zustimmende Erklaerung genau dieses Angebot angenommen. Mithin haben die Parteien einen diesbezueglichen Kaufvertrag geschlossen. Der Vertrag lautet auf 1.200 Tuben (20 x 60) zu einem Gesamtpreis von 240 Euro.',
          keyPoints: [
            'Angebot des G: 20 Schock = 20 x 60 = 1.200 Tuben',
            'Gesamtpreis: 1.200 x 0,20 Euro = 240 Euro',
            'Annahme des S (+)',
            'Vertrag ueber 1.200 Tuben zu 240 Euro',
          ],
          explanation:
            'Der Vertrag kommt ueber die objektiv erklaerte Menge zustande (1.200 Tuben), nicht ueber die von S subjektiv gewollte Menge (200 Tuben).',
        },
        {
          id: 'fall-40-b',
          type: 'free-text',
          question:
            'b) Liegt ein Inhaltsirrtum oder ein Erklaerungsirrtum des S vor? Begruenden Sie.',
          placeholder: 'In Betracht kommt eine Anfechtung wegen ...',
          modelAnswer:
            'In Betracht kommt eine Anfechtung der Willenserklaerung des S (Annahme) gemaess ss 119 I wegen eines Inhaltsirrtums. S hat auf das Angebot des G allgemein entaeussert, er kaufe (20 x 60 =) 1.200 Tuben zu einem Preis von 0,20 Euro pro Tube. Tatsaechlich wollte er aber den Kauf von (20 x 10 =) 200 Tuben zum angegebenen Preis erklaeren. Insofern fallen Erklaertes und Gewolltes auseinander. Es liegt ein Inhaltsirrtum im Sinne des ss 119 I vor (sog. Verlautbarungsirrtum). S hat sich nicht nur versprochen oder verschrieben (Erklaerungsirrtum), sondern wollte genau das entaeussern, was er schlussendlich auch entaeussert hat. Er hat allerdings das, was er entaeussern wollte und auch entaeussert hat, inhaltlich falsch gewertet.',
          keyPoints: [
            'Inhaltsirrtum (ss 119 I Alt. 1), NICHT Erklaerungsirrtum',
            'Sog. Verlautbarungsirrtum',
            'S wollte genau das sagen, hat aber den Inhalt falsch gewertet',
            'Unterschied zum Erklaerungsirrtum: kein Verschreiben/Versprechen',
            'Beim Inhaltsirrtum will der Erklaerende die Erklaerung exakt so abgeben',
          ],
          explanation:
            'Die Abgrenzung Erklaerungsirrtum/Inhaltsirrtum ist der Kern dieses Falls. S hat sich nicht verschrieben, sondern "Schock" bewusst gesagt, aber den Inhalt des Wortes falsch verstanden.',
        },
        {
          id: 'fall-40-c',
          type: 'free-text',
          question: 'c) Wie lautet die Rechtsfolge?',
          placeholder: 'Da alle Voraussetzungen ...',
          modelAnswer:
            'Der Anfechtende muesste die Anfechtung gegenueber dem Anfechtungsgegner erklaert haben, ss 143. S hat gegenueber G die Anfechtung erklaert. Zudem hat S die Anfechtung in der im Falle des ss 119 geltenden Anfechtungsfrist des ss 121, naemlich unverzueglich nach Kenntnis des Anfechtungsgrundes erklaert. Ein Ausschluss der Anfechtung ist nicht ersichtlich. Da alle Voraussetzungen einer wirksamen Anfechtung vorliegen, ist die Willenserklaerung des S gemaess ss 142 als von Anfang an nichtig anzusehen. Mithin fehlt es an einer der beiden fuer einen Kaufvertragsabschluss erforderlichen Willenserklaerungen, also existiert auch kein Kaufvertrag. Demnach ist der Anspruch nicht entstanden. G hat gegen S keinen Anspruch auf Kaufpreiszahlung in Hoehe von 240 Euro gemaess ss 433 II.',
          keyPoints: [
            'Anfechtungserklaerung ss 143 (+)',
            'Anfechtungsfrist ss 121 unverzueglich (+)',
            'Kein Ausschluss (+)',
            'WE des S gemaess ss 142 von Anfang an nichtig',
            'Kein Kaufvertrag, Anspruch nicht entstanden',
            'G gegen S 240 Euro ss 433 II (-)',
          ],
          explanation:
            'Alle Voraussetzungen der Anfechtung liegen vor. Die WE des S ist nichtig, kein Vertrag, kein Anspruch.',
        },
      ],
    },

    // ─── Fall 55: Kuenstler & Galerist ───
    {
      id: 'fall-55-kuenstler',
      title: 'Fall 55: Kuenstler & Galerist (Verjaehrung)',
      points: 15,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              Der zerstreute Kuenstler K hat sich endlich entschlossen, seine Unterlagen zu ordnen.
              Hierbei faellt ihm wieder ein, dass der Galerist G, der ihm einen groesseren Geldbetrag
              aus einem Kaufvertrag schuldet, immer noch nicht gezahlt hat. Die Recherchen des K ergeben,
              dass seit der Entstehung der Schuld mehr als fuenf Jahre vergangen sind. Als K von G Zahlung
              verlangt, aeussert dieser, der Anspruch sei verjaehrt.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat K gegen G einen Anspruch auf Kaufpreiszahlung gemaess{' '}
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>?
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-55-a',
          type: 'free-text',
          question: 'a) Ist der Anspruch entstanden?',
          placeholder: 'Der Anspruch ist ...',
          modelAnswer:
            'Der Anspruch ist entstanden. K und G haben einen Kaufvertrag geschlossen, aus dem G zur Zahlung verpflichtet ist.',
          keyPoints: [
            'Kaufvertrag zwischen K und G (+)',
            'Anspruch auf Kaufpreiszahlung entstanden (+)',
          ],
          explanation: 'Die Entstehung des Anspruchs ist hier unproblematisch.',
        },
        {
          id: 'fall-55-b',
          type: 'free-text',
          question:
            'b) Ist der Anspruch durchsetzbar? Pruefen Sie die Verjaehrung (ssss 194 ff.).',
          placeholder: 'Die Durchsetzbarkeit koennte durch ...',
          modelAnswer:
            'Der Anspruch ist nicht untergegangen. Fraglich ist, ob der Anspruch durchsetzbar ist. Die Durchsetzbarkeit koennte durch Erhebung der Verjaehrungseinrede gemaess ss 214 I ausgeschlossen sein. Der Anspruch auf Kaufpreiszahlung unterliegt der regelmaessigen Verjaehrungsfrist des ss 195. Die Verjaehrungsfrist betraegt drei Jahre. Sie beginnt unter den Voraussetzungen des ss 199 I. Der Schluss des Jahres, in dem der Anspruch entstanden ist, liegt laenger als drei Jahre zurueck. Der Glaeueber K hatte Kenntnis im Sinne der Norm. Die Verjaehrungsfrist ist somit abgelaufen.',
          keyPoints: [
            'Regelverjaehrung ss 195: drei Jahre',
            'Beginn ss 199 I: Schluss des Jahres der Anspruchsentstehung + Kenntnis',
            'Mehr als fuenf Jahre vergangen: Frist abgelaufen',
            'Verjaehrungseinrede ss 214 I pruefen',
          ],
          explanation:
            'Die Verjaehrungsfrist (3 Jahre) ist bei ueber 5 Jahren seit Entstehung deutlich ueberschritten.',
        },
        {
          id: 'fall-55-c',
          type: 'free-text',
          question: 'c) Hat G die Verjaehrungseinrede erhoben? Wie lautet das Ergebnis?',
          placeholder: 'G hat die Verjaehrungseinrede ...',
          modelAnswer:
            'G hat die Verjaehrungseinrede im Uebrigen auch geltend gemacht, indem er aeusserte, der Anspruch sei verjaehrt. Also ist der Anspruch nicht durchsetzbar. K hat gegen G einen Anspruch auf Kaufpreiszahlung gemaess ss 433 II. Der Anspruch ist jedoch dauernd nicht durchsetzbar.',
          keyPoints: [
            'G hat Einrede geltend gemacht (+): "der Anspruch sei verjaehrt"',
            'Anspruch besteht, ist aber nicht durchsetzbar',
            'Ergebnis: Anspruch (+), aber dauernd nicht durchsetzbar',
          ],
          explanation:
            'Wichtig: Der Anspruch besteht weiterhin, ist aber wegen der erhobenen Verjaehrungseinrede dauernd (peremptorisch) nicht durchsetzbar. Der Ergebnissatz muss dies differenziert ausdruecken.',
        },
      ],
    },
  ],

  // ───────────────────────────────────────────────
  // Related Topics
  // ───────────────────────────────────────────────
  relatedTopics: [
    {
      id: 'grundlagen',
      title: 'Grundlagen des Rechts',
      relationship: 'required for',
    },
    {
      id: 'willenserklaerung',
      title: 'Willenserklaerung & Vertragsschluss',
      relationship: 'required for',
    },
  ],
}
