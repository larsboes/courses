// src/content/wirtschaftsrecht/topics/leistungsstoerungen.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { LeistungsstoerungMap } from '../diagrams/LeistungsstoerungMap'

const schuldverhaeltnisDiagram = `flowchart LR
  subgraph SV["Schuldverhältnis § 241"]
    G["Gläubiger"] <-->|"Sonderverbindung"| S["Schuldner"]
  end
  subgraph Pflichten
    LP["Leistungspflicht<br/>§ 241 I"]
    SP["Schutzpflicht<br/>§ 241 II"]
  end
  SV --> Pflichten
  style G fill:#1e40af,stroke:#3b82f6,color:#fff
  style S fill:#065f46,stroke:#10b981,color:#fff
`

const seAnspruchDiagram = `flowchart TD
  PV["Pflichtverletzung"] --> SE280["§ 280 I<br/>Grundnorm"]
  SE280 --> NEBEN["SE neben der Leistung<br/>§ 280 I, II"]
  SE280 --> STATT["SE statt der Leistung<br/>§ 280 III"]
  NEBEN --> VERZ["+ § 286 Verzug"]
  STATT --> UNM["+ § 283 Unmöglichkeit"]
  STATT --> SCHL["+ § 281 Schlechtleistung"]
  STATT --> NP["+ § 282 Nebenpflichtverletzung"]

  PV --> RUECK["Rücktritt §§ 323 ff."]
  RUECK --> KEINVM["KEIN Vertretenmüssen<br/>erforderlich!"]

  style PV fill:#991b1b,stroke:#ef4444,color:#fff
  style SE280 fill:#1e40af,stroke:#3b82f6,color:#fff
  style RUECK fill:#92400e,stroke:#f59e0b,color:#fff
  style KEINVM fill:#92400e,stroke:#f59e0b,color:#fff
`

const gegenleistungDiagram = `flowchart TD
  UNM["Unmöglichkeit"] --> FREE["Schuldner wird frei<br/>§ 275 I-III"]
  FREE --> GL["Gegenleistung?"]
  GL --> ENTF["Entfällt grundsätzlich<br/>§ 326 I S. 1"]
  GL --> BLEIBT["Besteht weiter<br/>§ 326 II"]
  BLEIBT --> GLVERSCH["Gläubiger hat Unmöglichkeit<br/>verschuldet"]
  BLEIBT --> ANNAHME["Annahmeverzug<br/>§§ 293 ff."]
  BLEIBT --> PREIS["Preisgefahr übergegangen<br/>z.B. §§ 446, 447"]

  style UNM fill:#991b1b,stroke:#ef4444,color:#fff
  style ENTF fill:#065f46,stroke:#10b981,color:#fff
  style BLEIBT fill:#92400e,stroke:#f59e0b,color:#fff
`

export const leistungsstoerungenTopic: Topic = {
  id: 'leistungsstoerungen',
  title: 'Schuldrecht & Leistungsstörungen',
  description: 'Schuldverhältnis, AGB-Kontrolle, Pflichtverletzungen (Unmöglichkeit, Verzug, Schlechtleistung), Schadensersatz und Rücktritt',
  icon: '⚡',
  examNotes: 'NIEMALS § 275 I (Leistungspflicht) und § 326 I 1 (Gegenleistungspflicht) verwechseln!',

  sections: [
    {
      id: 'schuldverhaeltnis',
      title: 'Schuldverhältnis (§ 241)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Definition Schuldverhältnis</h4>
            <p className="text-sm text-slate-300">
              Sonderverbindung zwischen zwei (oder mehreren) Personen, kraft derer der
              <strong> Gläubiger</strong> berechtigt ist, vom <strong>Schuldner</strong> eine
              Leistung zu fordern
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 241 I</span>).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Wirkung</h4>
            <p className="text-sm text-slate-300">
              Das Schuldverhältnis ist <strong>relativ</strong> &mdash; es wirkt nur zwischen den
              beteiligten Parteien (im Gegensatz zu dinglichen Rechten, die absolut wirken).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Entstehung der Schuldverhältnisse</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded">
                <strong className="text-blue-300">Rechtsgeschäftlich</strong>
                <p className="text-slate-400 mt-1">Durch Vertrag (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 311 I</span>)</p>
              </div>
              <div className="p-3 bg-amber-900/20 rounded">
                <strong className="text-amber-300">Vorvertraglich</strong>
                <p className="text-slate-400 mt-1">Bei Vertragsanbahnung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 311 II</span>)</p>
              </div>
              <div className="p-3 bg-green-900/20 rounded">
                <strong className="text-green-300">Gesetzlich</strong>
                <p className="text-slate-400 mt-1">Verwirklichung eines gesetzlichen Tatbestandes (GoA, Delikt, Bereicherung)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Pflichten aus dem Schuldverhältnis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded">
                <strong className="text-blue-300">Primärpflichten</strong>
                <ul className="list-disc list-inside text-slate-400 mt-1 space-y-1">
                  <li>Leistungspflicht (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 241 I</span>)</li>
                  <li>Schutzpflicht (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 241 II</span>)</li>
                </ul>
              </div>
              <div className="p-3 bg-red-900/20 rounded">
                <strong className="text-red-300">Sekundärpflichten</strong>
                <ul className="list-disc list-inside text-slate-400 mt-1 space-y-1">
                  <li>Neben der Leistung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 280 I, II</span>)</li>
                  <li>Anstelle der Leistung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 280 III</span>)</li>
                </ul>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={schuldverhaeltnisDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'agb-kontrolle',
      title: 'AGB-Kontrolle (§§ 305 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Definition AGB (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 305 I</span>)</h4>
            <p className="text-sm text-slate-300">
              &bdquo;Alle für eine Vielzahl von Verträgen vorformulierte Vertragsbedingungen,
              die eine Vertragspartei (Verwender) der anderen bei Abschluss eines Vertrages stellt.&ldquo;
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-3">Prüfschema AGB-Kontrolle</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Anwendbarkeit</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 310</span>): Sachlicher und persönlicher Anwendungsbereich</li>
              <li><strong>AGB-Eigenschaft</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 305 I</span>): Vorformuliert, Vielzahl (bei b2c reicht einmalige Verwendung, § 310 III), Stellen</li>
              <li><strong>Einbeziehung</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 305 II</span>): Hinweis, Möglichkeit der Kenntnisnahme, Einverständnis (nur bei b2c!)</li>
              <li><strong>Überraschende Klauseln</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 305c I</span>)</li>
              <li><strong>Schwarze Liste</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 309</span>, nur b2c)</li>
              <li><strong>Graue Liste</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 308</span>, nur b2c)</li>
              <li><strong>Generalklausel</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 307</span>)</li>
            </ol>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Einbeziehungsvoraussetzungen des § 305 II und die
            Klauselverbote §§ 308, 309 gelten nur bei <strong>b2c</strong>-Verträgen!
            Bei b2b-Verträgen gelten die übrigen Vorschriften einschließlich der Generalklausel § 307.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Bei sich widersprechenden AGB im b2b-Bereich: Nach h.M.
            liegt Dissens vor. Die Lücke wird durch Auslegung oder dispositives Recht gefüllt
            (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 306</span>).
            Der &bdquo;last shot&ldquo; ist nach h.M. abzulehnen.
          </div>
        </div>
      ),
    },
    {
      id: 'pflichtverletzung',
      title: 'Pflichtverletzung: Unmöglichkeit, Verzug, Schlechtleistung',
      content: (
        <div className="space-y-4">
          <p>
            Bei Problemen in der Abwicklung eines Schuldverhältnisses unterscheidet man vier Arten
            der Pflichtverletzung:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-300 mb-2">Unmöglichkeit (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 275</span>)</h4>
              <p className="text-sm text-slate-300 mb-2">Geschuldete Leistung kann dauerhaft nicht erbracht werden.</p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li><strong>§ 275 I</strong>: Echte Unmöglichkeit (Einwendung &rarr; Primäranspruch entfällt)</li>
                <li><strong>§ 275 II</strong>: Faktische Unmöglichkeit (grobes Missverhältnis)</li>
                <li><strong>§ 275 III</strong>: Moralische Unmöglichkeit (persönliche Gründe)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">Verzug (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 286</span>)</h4>
              <p className="text-sm text-slate-300 mb-2">Verzögerung der Leistung.</p>
              <p className="text-sm text-slate-400">Leistung ist möglich, wird aber nicht rechtzeitig erbracht.</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-300 mb-2">Schlechtleistung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 281</span>)</h4>
              <p className="text-sm text-slate-300 mb-2">Leistung wird erbracht, aber mangelhaft.</p>
              <p className="text-sm text-slate-400">Ergänzungen durch besonderes Schuldrecht (z.B. Kaufvertrag).</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-300 mb-2">Nebenpflichtverletzung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 241 II</span>)</h4>
              <p className="text-sm text-slate-300 mb-2">Verletzung von Schutz- und Rücksichtnahmepflichten.</p>
              <p className="text-sm text-slate-400">Nicht die Hauptleistung, sondern Nebenpflichten betroffen.</p>
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Unmöglichkeit im Detail</h4>
            <p className="text-sm text-slate-300">
              Bei einer <strong>Stückschuld</strong> (nur einmal existierender Gegenstand, z.B. gebrauchter PKW)
              liegt bei Zerstörung <strong>objektive Unmöglichkeit</strong> vor: Niemand kann die Leistung erbringen.
              Bei einer <strong>Gattungsschuld</strong> ist erst nach Konkretisierung
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 243 II</span>)
              Unmöglichkeit möglich.
            </p>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die Einteilung der Pflichtverletzung ist erforderlich, da es
            Rechtsfolgen gibt, die nur an bestimmte Pflichtverletzungen anknüpfen. Im besonderen
            Schuldrecht (z.B. Kaufvertrag) gibt es Ergänzungen und Modifikationen.
          </div>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: LeistungsstoerungMap,
      },
    },
    {
      id: 'schadensersatz',
      title: 'Schadensersatz (§§ 280 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Voraussetzungen des § 280 I (Grundnorm)</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Schuldverhältnis</strong> (rechtsgeschäftlich, gesetzlich oder vorvertraglich)</li>
              <li><strong>Pflichtverletzung</strong> (grundsätzlich wird jede Pflichtverletzung von § 280 erfasst)</li>
              <li><strong>Vertretenmüssen</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 280 I S. 2</span>: Schuldner muss nachweisen, dass ihn kein Verschulden trifft &mdash; Beweislastumkehr!)</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">SE neben der Leistung</h4>
              <p className="text-sm text-slate-300">
                Der Gläubiger fordert/erhält die volle und mangelfreie Leistung, hat aber an
                anderen Rechtsgütern oder seinem Vermögen einen ersatzfähigen Schaden erlitten
                (Begleitschaden).
              </p>
              <p className="text-sm text-slate-400 mt-2">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 280 I, II</span> + ggf. <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 286</span> (Verzug)
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">SE statt der Leistung</h4>
              <p className="text-sm text-slate-300">
                Der Gläubiger verlangt Ersatz für den Teil der Leistung, der pflichtwidrig
                nicht dem geschuldeten Leistungsprogramm entspricht. Der Anspruch auf Erfüllung
                besteht nicht mehr.
              </p>
              <p className="text-sm text-slate-400 mt-2">
                <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 280 III</span> + <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 281-283</span>
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Art und Umfang (§§ 249 ff.)</h4>
            <p className="text-sm text-slate-300">
              Unter <strong>Schaden</strong> versteht man jede unfreiwillige Einbuße an Gütern.
              Ermittlung durch Vergleich: gegenwärtige Lage vs. Lage ohne Schadensereignis.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              <strong>Grundsatz:</strong> Naturalrestitution geht vor (Herstellung des Zustands ohne Rechtsverletzung).
            </p>
          </div>

          <MermaidDiagram chart={seAnspruchDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'ruecktritt',
      title: 'Rücktritt (§§ 323 ff.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Voraussetzungen des Rücktritts</h4>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Rücktrittsrecht</strong> (Pflichtverletzung)</li>
              <li><strong>KEIN Vertretenmüssen</strong> erforderlich (anders als beim SE!)</li>
              <li><strong>Fristsetzung</strong> (grundsätzlich erforderlich)</li>
              <li><strong>Rücktrittserklärung</strong></li>
            </ol>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Für den Rücktritt nach §§ 323 ff. ist KEIN Vertretenmüssen
            erforderlich! Das ist der zentrale Unterschied zum Schadensersatz (§ 280), der
            Verschulden voraussetzt. Häufiger Fehler in Klausuren!
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Rücktritt vs. Schadensersatz</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Kriterium</th>
                    <th className="text-left py-2 px-3">Rücktritt (§ 323)</th>
                    <th className="text-left py-2 px-3">Schadensersatz (§ 280)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">Vertretenmüssen</td>
                    <td className="py-2 px-3 text-green-300">Nein</td>
                    <td className="py-2 px-3 text-red-300">Ja (§ 280 I S. 2)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">Fristsetzung</td>
                    <td className="py-2 px-3">Grundsätzlich ja</td>
                    <td className="py-2 px-3">Bei § 281 ja</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Rechtsfolge</td>
                    <td className="py-2 px-3">Rückabwicklung (§§ 346 ff.)</td>
                    <td className="py-2 px-3">Ersatz des Schadens (§§ 249 ff.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'gegenleistung',
      title: 'Gegenleistung bei Unmöglichkeit (§ 326 I 1)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
            <h4 className="font-semibold text-red-300 mb-2">KRITISCHE Unterscheidung!</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Anspruch</th>
                    <th className="text-left py-2 px-3">Norm</th>
                    <th className="text-left py-2 px-3">Wirkung</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-medium">Leistungspflicht</td>
                    <td className="py-2 px-3"><span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 275 I</span></td>
                    <td className="py-2 px-3">Anspruch ist <strong>ausgeschlossen</strong></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Gegenleistungspflicht</td>
                    <td className="py-2 px-3"><span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 326 I 1</span></td>
                    <td className="py-2 px-3">Anspruch ist <strong>entfallen</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Der Anspruch auf die <em>Leistung</em> (z.B. Übereignung)
            kann <strong>immer nur</strong> nach § 275 I ausgeschlossen sein. Der Anspruch auf die
            <em> Gegenleistung</em> (z.B. Kaufpreiszahlung) kann <strong>immer nur</strong> nach
            § 326 I 1 entfallen! Eine Fehlentscheidung in diesem Bereich mag der Korrektor
            <strong> überhaupt nicht!</strong>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Grundsatz: Ohne Leistung keine Gegenleistung</h4>
            <p className="text-sm text-slate-300">
              Wird der Schuldner nach <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 275 I-III</span> frei,
              entfällt grundsätzlich auch der Anspruch auf die Gegenleistung
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 326 I S. 1</span>).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Ausnahmen: Gegenleistung besteht weiter (§ 326 II)</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Gläubiger hat Unmöglichkeit verschuldet</strong></li>
              <li><strong>Annahmeverzug</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 293 ff.</span>)</li>
              <li><strong>Preisgefahr übergegangen</strong> (z.B. <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 446, 447, 644, 645</span>)</li>
            </ul>
          </div>

          <MermaidDiagram chart={gegenleistungDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'ls-q1',
        type: 'multiple-choice',
        question: 'Was ist ein Schuldverhältnis?',
        options: [
          'Ein dingliches Recht, das gegenüber jedermann wirkt',
          'Eine Sonderverbindung zwischen Gläubiger und Schuldner (§ 241 I)',
          'Ein öffentlich-rechtlicher Verwaltungsakt',
          'Eine strafrechtliche Verpflichtung',
        ],
        correctAnswer: 'Eine Sonderverbindung zwischen Gläubiger und Schuldner (§ 241 I)',
        explanation: 'Ein Schuldverhältnis ist eine relative Sonderverbindung zwischen Gläubiger und Schuldner. Es wirkt nur zwischen den beteiligten Parteien, im Gegensatz zu dinglichen Rechten.',
      },
      {
        id: 'ls-q2',
        type: 'multiple-choice',
        question: 'Welche Norm regelt den Ausschluss der Leistungspflicht bei Unmöglichkeit?',
        options: [
          '§ 275 I BGB',
          '§ 326 I 1 BGB',
          '§ 280 I BGB',
          '§ 323 BGB',
        ],
        correctAnswer: '§ 275 I BGB',
        explanation: '§ 275 I regelt den Ausschluss der LEISTUNGS-pflicht. § 326 I 1 regelt das Entfallen der GEGENLEISTUNGS-pflicht. Diese Unterscheidung ist klausurrelevant!',
      },
      {
        id: 'ls-q3',
        type: 'multiple-choice',
        question: 'Welche Norm regelt das Entfallen der Gegenleistungspflicht bei Unmöglichkeit?',
        options: [
          '§ 275 I BGB',
          '§ 326 I 1 BGB',
          '§ 280 I BGB',
          '§ 286 BGB',
        ],
        correctAnswer: '§ 326 I 1 BGB',
        explanation: '§ 326 I 1 regelt das Entfallen der GEGENLEISTUNGS-pflicht, wenn der Schuldner nach § 275 I-III nicht zu leisten braucht.',
      },
      {
        id: 'ls-q4',
        type: 'multi-select',
        question: 'Welche sind Voraussetzungen des § 280 I für Schadensersatz?',
        options: [
          'Schuldverhältnis',
          'Pflichtverletzung',
          'Vertretenmüssen',
          'Fristsetzung',
          'Rücktrittserklärung',
        ],
        correctAnswer: ['Schuldverhältnis', 'Pflichtverletzung', 'Vertretenmüssen'],
        explanation: 'Die drei Voraussetzungen des § 280 I sind: (1) Schuldverhältnis, (2) Pflichtverletzung, (3) Vertretenmüssen (§ 280 I S. 2 mit Beweislastumkehr).',
      },
      {
        id: 'ls-q5',
        type: 'multiple-choice',
        question: 'Was ist der zentrale Unterschied zwischen Rücktritt (§ 323) und Schadensersatz (§ 280)?',
        options: [
          'Für den Rücktritt ist kein Vertretenmüssen erforderlich',
          'Für den Schadensersatz ist keine Pflichtverletzung nötig',
          'Der Rücktritt erfordert immer eine Fristsetzung, SE nie',
          'Es gibt keinen Unterschied',
        ],
        correctAnswer: 'Für den Rücktritt ist kein Vertretenmüssen erforderlich',
        explanation: 'Der Rücktritt nach § 323 erfordert kein Verschulden/Vertretenmüssen. Der SE nach § 280 setzt dagegen Vertretenmüssen voraus (§ 280 I S. 2).',
      },
      {
        id: 'ls-q6',
        type: 'order-steps',
        question: 'Bringen Sie das AGB-Prüfschema in die richtige Reihenfolge:',
        options: [
          'Anwendbarkeit (§ 310)',
          'AGB-Eigenschaft (§ 305 I)',
          'Einbeziehung (§ 305 II)',
          'Überraschende Klauseln (§ 305c)',
          'Schwarze Liste (§ 309)',
          'Graue Liste (§ 308)',
          'Generalklausel (§ 307)',
        ],
        correctAnswer: [
          'Anwendbarkeit (§ 310)',
          'AGB-Eigenschaft (§ 305 I)',
          'Einbeziehung (§ 305 II)',
          'Überraschende Klauseln (§ 305c)',
          'Schwarze Liste (§ 309)',
          'Graue Liste (§ 308)',
          'Generalklausel (§ 307)',
        ],
        explanation: 'Das AGB-Prüfschema folgt einer festen Reihenfolge: Erst Anwendbarkeit, dann AGB-Eigenschaft, Einbeziehung, und schließlich die Inhaltskontrolle von speziell (§ 309) nach allgemein (§ 307).',
      },
      {
        id: 'ls-q7',
        type: 'match-pairs',
        question: 'Ordne die Pflichtverletzungsarten den richtigen Normen zu:',
        options: [
          'Unmöglichkeit::§ 275',
          'Verzug::§ 286',
          'Schlechtleistung::§ 281',
          'Nebenpflichtverletzung::§ 241 II',
        ],
        correctAnswer: [
          'Unmöglichkeit::§ 275',
          'Verzug::§ 286',
          'Schlechtleistung::§ 281',
          'Nebenpflichtverletzung::§ 241 II',
        ],
        explanation: 'Die vier Arten der Pflichtverletzung haben jeweils eigene Rechtsfolgen und Normen.',
      },
      {
        id: 'ls-q8',
        type: 'fill-blank',
        question: 'Eine Stückschuld liegt vor, wenn der geschuldete Gegenstand nur ___ existiert.',
        options: ['einmal', 'zweimal', 'mehrfach', 'selten'],
        correctAnswer: 'einmal',
        explanation: 'Eine Stückschuld ist ein nur einmal existierender Gegenstand (z.B. ein gebrauchter PKW). Bei Zerstörung liegt objektive Unmöglichkeit vor.',
      },
      {
        id: 'ls-q9',
        type: 'multiple-choice',
        question: 'Was bedeutet "Beweislastumkehr" bei § 280 I S. 2?',
        options: [
          'Der Schuldner muss beweisen, dass ihn kein Verschulden trifft',
          'Der Gläubiger muss Verschulden des Schuldners beweisen',
          'Das Gericht muss den Beweis führen',
          'Kein Beweis ist erforderlich',
        ],
        correctAnswer: 'Der Schuldner muss beweisen, dass ihn kein Verschulden trifft',
        explanation: 'Nach § 280 I S. 2 wird das Verschulden des Schuldners vermutet. Er muss beweisen, dass ihn kein Verschulden trifft (Exkulpation).',
      },
      {
        id: 'ls-q10',
        type: 'free-text',
        question: 'Erklären Sie den Unterschied zwischen SE neben der Leistung und SE statt der Leistung.',
        placeholder: 'Beschreiben Sie beide Arten und ihre Rechtsfolgen...',
        modelAnswer: 'SE neben der Leistung (§ 280 I, II): Der Gläubiger fordert/erhält die volle Leistung, hat aber an anderen Rechtsgütern einen Schaden erlitten (Begleitschaden). Der Erfüllungsanspruch bleibt bestehen. SE statt der Leistung (§ 280 III + §§ 281-283): Der Gläubiger verlangt Geldersatz anstelle der geschuldeten Leistung. Der Erfüllungsanspruch besteht nicht mehr. Beispiel: Beim Verzugsschaden (SE neben der Leistung nach § 280 I, II, 286) fordert der Gläubiger weiterhin die Leistung plus Ersatz des Verzugsschadens.',
        keyPoints: [
          'SE neben der Leistung: Erfüllungsanspruch bleibt bestehen',
          'SE statt der Leistung: Erfüllungsanspruch entfällt',
          'Neben: § 280 I, II (ggf. + § 286 bei Verzug)',
          'Statt: § 280 III + §§ 281-283',
        ],
        explanation: 'Die Unterscheidung ist wichtig für die richtige Anspruchsgrundlage und die Rechtsfolgen.',
      },
      {
        id: 'ls-q11',
        type: 'fill-blank',
        question: 'Klauselverbote der schwarzen Liste (§ 309) und grauen Liste (§ 308) gelten nur bei ___ -Verträgen.',
        options: ['b2c', 'b2b', 'allen', 'internationalen'],
        correctAnswer: 'b2c',
        explanation: 'Die Klauselverbote der §§ 308, 309 und die Einbeziehungsvoraussetzungen des § 305 II gelten nur bei Verbraucherverträgen (b2c). Bei b2b-Verträgen gilt nur die Generalklausel (§ 307).',
      },
      {
        id: 'ls-q12',
        type: 'multiple-choice',
        question: 'Wann besteht die Gegenleistungspflicht trotz Unmöglichkeit weiter (§ 326 II)?',
        options: [
          'Wenn der Gläubiger die Unmöglichkeit verschuldet hat',
          'Wenn der Schuldner gutgläubig war',
          'Immer',
          'Nie',
        ],
        correctAnswer: 'Wenn der Gläubiger die Unmöglichkeit verschuldet hat',
        explanation: 'Nach § 326 II besteht die Gegenleistungspflicht weiter, wenn der Gläubiger die Unmöglichkeit verschuldet hat, bei Annahmeverzug oder wenn die Preisgefahr übergegangen ist.',
      },
    ],
  },

  examTasks: [
    {
      id: 'fall-1-unm',
      title: 'Fall 1: Der Porsche (Leistungsanspruch)',
      points: 15,
      context: (
        <div className="space-y-3">
          <p>
            Der Industrielle P ist stolzer Eigentümer eines Porsche 911, Baujahr 1977. Wegen des
            Kaufs eines neuen Autos muss er sich von dem alten Wagen trennen. Er verkauft deshalb
            das Auto am 01.08. für 15.000 &euro; an K. Der Vertrag soll erst am 08.08. abgewickelt
            werden, da P das schöne Wetter noch für einige Ausfahrten nutzen will. Bei einer der
            Spritztouren wird P in einen Unfall verwickelt. Die allein von X verschuldete
            Karambolage führt dazu, dass der Porsche total zerstört ist.
          </p>
          <p className="font-semibold">
            Frage: Hat K gegen P einen Anspruch auf Übereignung gemäß
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono ml-1">§ 433 I 1</span>?
          </p>
        </div>
      ),
      parts: [
        {
          id: 'fall-1-a',
          type: 'free-text',
          question: 'Ist der Anspruch entstanden? Liegt ein wirksamer Kaufvertrag vor?',
          placeholder: 'Prüfen Sie die Anspruchsentstehung...',
          modelAnswer: 'Dies setzt einen wirksamen Kaufvertrag zwischen den Parteien voraus. P und K haben einen Kaufvertrag (§ 433) über ein bestimmtes Auto zum Preis von 15.000 € geschlossen. Der Anspruch ist entstanden.',
          keyPoints: [
            'Kaufvertrag § 433 zwischen P und K',
            'Bestimmtes Auto zum Preis von 15.000 €',
            'Anspruch entstanden (+)',
          ],
          explanation: 'Die Anspruchsentstehung ist hier unproblematisch. Der Kaufvertrag wurde wirksam geschlossen.',
        },
        {
          id: 'fall-1-b',
          type: 'free-text',
          question: 'Handelt es sich bei dem Porsche um eine Stückschuld? Warum ist das relevant?',
          placeholder: 'Prüfen Sie die Schuldart...',
          modelAnswer: 'Bei dem geschuldeten Gegenstand könnte es sich um eine Stückschuld handeln. Eine Stückschuld liegt vor, wenn der geschuldete Gegenstand nur einmal existiert. Das ist insbesondere bei gebrauchten Gegenständen und bei neuen Einzelstücken zu bejahen. Der Kaufgegenstand ist eine gebrauchte Sache (Porsche 911, Baujahr 1977), also eine Stückschuld. Dies ist relevant, weil bei Zerstörung einer Stückschuld objektive Unmöglichkeit eintreten kann.',
          keyPoints: [
            'Stückschuld = nur einmal existierender Gegenstand',
            'Gebrauchter PKW = Stückschuld (+)',
            'Relevant für Frage der Unmöglichkeit',
          ],
          explanation: 'Die Einordnung als Stückschuld ist entscheidend für die Frage der Unmöglichkeit. Bei Gattungsschulden wäre erst nach Konkretisierung (§ 243 II) Unmöglichkeit möglich.',
        },
        {
          id: 'fall-1-c',
          type: 'free-text',
          question: 'Ist der Anspruch nach § 275 I ausgeschlossen? Formulieren Sie das Ergebnis.',
          placeholder: 'Prüfen Sie die Unmöglichkeit und formulieren Sie die Lösung...',
          modelAnswer: 'Der Anspruch des K könnte gemäß § 275 I ausgeschlossen sein. Die Übereignung einer beweglichen Sache erfordert gemäß § 929 S. 1 eine Einigung über den Eigentumsübergang und die Übergabe der Sache. Weder P noch eine andere Person kann die Übereignung vornehmen, da der Pkw zerstört ist. Demnach liegt eine objektive Unmöglichkeit vor. Also sind alle Voraussetzungen des § 275 I erfüllt. Der Anspruch des K aus § 433 I 1 ist folglich ausgeschlossen. K hat gegen P keinen Übereignungsanspruch gemäß § 433 I 1.',
          keyPoints: [
            '§ 275 I: Leistung ist ausgeschlossen bei Unmöglichkeit',
            'Übereignung § 929 S. 1: Einigung + Übergabe',
            'PKW zerstört: Niemand kann übereignen',
            'Objektive Unmöglichkeit (+)',
            'Ergebnis: Anspruch K gegen P gem. § 433 I 1 (-)',
          ],
          explanation: 'Hier wird § 275 I angewendet, da die LEISTUNGSPFLICHT (Übereignung) ausgeschlossen ist. NICHT § 326 I 1 verwenden!',
        },
      ],
    },
    {
      id: 'fall-10-unm',
      title: 'Fall 10: Der Porsche (Gegenleistungsanspruch)',
      points: 15,
      context: (
        <div className="space-y-3">
          <p>
            <em>(Gleicher Sachverhalt wie Fall 1)</em><br />
            Der Industrielle P ist stolzer Eigentümer eines Porsche 911, Baujahr 1977. Er verkauft
            das Auto am 01.08. für 15.000 &euro; an K. Bei einer Spritztour wird der Porsche durch
            die allein von X verschuldete Karambolage total zerstört.
          </p>
          <p className="font-semibold">
            Frage: Hat P gegen K einen Anspruch auf Kaufpreiszahlung gemäß
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono ml-1">§ 433 II</span>?
          </p>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Beachten Sie: Jetzt geht es um die GEGENLEISTUNG (Kaufpreiszahlung),
            nicht mehr um die Leistung (Übereignung). Daher andere Norm!
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-10-a',
          type: 'free-text',
          question: 'Ist der Anspruch auf Kaufpreiszahlung entstanden?',
          placeholder: 'Prüfen Sie die Anspruchsentstehung...',
          modelAnswer: 'Dies setzt einen wirksamen Kaufvertrag zwischen den Parteien voraus. P und K haben einen Kaufvertrag (§ 433) über ein bestimmtes Auto zum Preis von 15.000 € geschlossen. Demnach ist der Anspruch entstanden.',
          keyPoints: [
            'Kaufvertrag § 433 zwischen P und K',
            'Anspruch entstanden (+)',
          ],
          explanation: 'Wie bei Fall 1 ist die Anspruchsentstehung unproblematisch.',
        },
        {
          id: 'fall-10-b',
          type: 'free-text',
          question: 'Welche Norm ist für das mögliche Entfallen des Gegenleistungsanspruchs einschlägig? Warum nicht § 275 I?',
          placeholder: 'Erklären Sie die korrekte Normanwendung...',
          modelAnswer: 'Der Anspruch des P könnte gemäß § 326 I 1 entfallen sein. NICHT § 275 I, denn: § 275 I regelt den Ausschluss der LEISTUNGSPFLICHT. § 326 I 1 regelt das Entfallen der GEGENLEISTUNGSPFLICHT. Der Anspruch auf Kaufpreiszahlung ist die Gegenleistung (P möchte ja Geld von K). Er ist entfallen, wenn ein gegenseitiger Vertrag vorliegt und der Schuldner nach § 275 I bis III nicht zu leisten braucht.',
          keyPoints: [
            '§ 326 I 1 ist die richtige Norm (nicht § 275 I!)',
            '§ 275 I = Leistungspflicht (Übereignung)',
            '§ 326 I 1 = Gegenleistungspflicht (Kaufpreiszahlung)',
            'Voraussetzung: gegenseitiger Vertrag + Leistungsbefreiung nach § 275',
          ],
          explanation: 'Die korrekte Zuordnung der Normen ist DAS Klausurthema bei Unmöglichkeit. § 275 I nur für die Leistung, § 326 I 1 nur für die Gegenleistung!',
        },
        {
          id: 'fall-10-c',
          type: 'free-text',
          question: 'Ist der Anspruch auf Kaufpreiszahlung entfallen? Formulieren Sie das Ergebnis.',
          placeholder: 'Prüfen Sie die Voraussetzungen des § 326 I 1...',
          modelAnswer: 'P und K haben einen Kaufvertrag, also einen gegenseitigen Vertrag geschlossen. Wie in Fall 1 festgestellt, liegt objektive Unmöglichkeit vor: Der Pkw ist zerstört, niemand kann übereignen. Damit braucht der Schuldner nach § 275 I nicht zu leisten. Also sind alle Voraussetzungen des § 326 I 1 erfüllt. Der Anspruch des P aus § 433 II ist folglich entfallen. P hat gegen K keinen Anspruch auf Kaufpreiszahlung gemäß § 433 II.',
          keyPoints: [
            'Gegenseitiger Vertrag (+): Kaufvertrag',
            'Leistungsbefreiung nach § 275 I (+): objektive Unmöglichkeit',
            'Alle Voraussetzungen § 326 I 1 erfüllt',
            'Ergebnis: Anspruch P gegen K gem. § 433 II (-)',
          ],
          explanation: 'Da die Übereignung unmöglich ist (§ 275 I), entfällt auch die Kaufpreispflicht (§ 326 I 1). Ohne Leistung keine Gegenleistung.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'kaufvertrag', title: 'Kaufvertrag & Werkvertrag', relationship: 'besonderes Leistungsstörungsrecht' },
    { id: 'gesetzliche-sv', title: 'Gesetzliche Schuldverhältnisse', relationship: 'gesetzliche Entstehung' },
  ],
}
