// src/content/wirtschaftsrecht/topics/grundlagen.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { AnspruchspruefungFlow } from '../diagrams/AnspruchspruefungFlow'

const rechtsquellenDiagram = `flowchart TD
  R["Rechtsquellen"] --> L["Legislative"]
  R --> E["Exekutive"]
  R --> J["Judikative"]
  L --> G["Kodifiziertes Recht"]
  G --> G1["Gesetz"]
  G --> G2["Rechtsverordnung"]
  G --> G3["Satzung"]
  E --> GW["Gewohnheitsrecht"]
  J --> RR["Richterrecht"]
  style R fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style L fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style E fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style J fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
`

const trennungsprinzipDiagram = `flowchart LR
  subgraph VP["Verpflichtungsgeschaeft"]
    direction TB
    V1["schuldrechtlich"]
    V2["kausal"]
    V3["K > V: ss 433 I 1"]
    V4["V > K: ss 433 II"]
  end
  subgraph VF["Verfuegungsgeschaeft"]
    direction TB
    F1["dinglich"]
    F2["abstrakt"]
    F3["Uebereignung: ss 929 S.1"]
  end
  VP -- "ist das Kausalgeschaeft fuer die" --> VF
  style VP fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style VF fill:#1a3a2f,stroke:#22c55e,color:#86efac
`

export const grundlagenTopic: Topic = {
  id: 'grundlagen',
  title: 'Grundlagen des Rechts',
  description: 'Rechtsquellen, Rechtsgebiete, Privatautonomie, Trennungs- und Abstraktionsprinzip, Subsumtion & Anspruchspruefung',
  icon: '\u2696\uFE0F',
  examNotes: 'Pruefungsreihenfolge & Trennungs-/Abstraktionsprinzip sind Dauerbrenner!',

  sections: [
    // ───────────────────────────────────────────────
    // 1. Rechtsquellen
    // ───────────────────────────────────────────────
    {
      id: 'rechtsquellen',
      title: 'Rechtsquellen',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Recht</strong> ist die Regelung des menschlichen Zusammenlebens, ausgerichtet an
              der Rechtsidee (<em>Rechtssicherheit</em> und <em>Gerechtigkeit</em>), durchgesetzt mit
              staatlichem Zwang.
            </p>
          </div>

          <h4 className="font-medium pt-2">Urheber des Rechts:</h4>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-blue-300">Legislative (Gesetzgebung)</div>
                <div className="text-sm text-slate-400 mt-1">
                  Erzeugt <strong>kodifiziertes Recht</strong>: Gesetze, Rechtsverordnungen, Satzungen
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/50 border border-green-700 text-green-300 font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-green-300">Exekutive (Brauch)</div>
                <div className="text-sm text-slate-400 mt-1">
                  Erzeugt <strong>Gewohnheitsrecht</strong> &mdash; langjaehrige, gleichmaessige Uebung mit Rechtsueberzeugung
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-purple-300">Judikative (Rechtsprechung)</div>
                <div className="text-sm text-slate-400 mt-1">
                  Erzeugt <strong>Richterrecht</strong> &mdash; durch Gerichtsurteile gebildete Rechtsregeln
                </div>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={rechtsquellenDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die drei Rechtsquellen und ihre Zuordnung zu den Staatsgewalten
            werden gerne als Einstiegsfrage gestellt. Merke: Legislative = Gesetz, Exekutive = Gewohnheitsrecht, Judikative = Richterrecht.
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 2. Oeffentliches Recht vs. Privatrecht
    // ───────────────────────────────────────────────
    {
      id: 'rechtsgebiete',
      title: 'Oeffentliches Recht vs. Privatrecht',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Das Recht gliedert sich in zwei grosse Bereiche: <strong>Oeffentliches Recht</strong> (Staat &harr; Buerger,
              Ueber-/Unterordnung) und <strong>Privatrecht</strong> (Buerger &harr; Buerger, Gleichordnung).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-red-300 mb-3">Oeffentliches Recht</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>&#x2022; Voelkerrecht</li>
                <li>&#x2022; Staats- und Verfassungsrecht</li>
                <li>&#x2022; Verwaltungsrecht (Allg. / Besonderes)</li>
                <li>&#x2022; Sozialrecht</li>
                <li>&#x2022; Steuerrecht</li>
                <li>&#x2022; Prozessrecht</li>
                <li>&#x2022; Strafrecht</li>
                <li>&#x2022; Kirchenrecht</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-green-300 mb-3">Privatrecht (Zivilrecht)</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>&#x2022; <strong>Buergerliches Recht (BGB)</strong></li>
                <li>&#x2022; Sonderprivatrecht:</li>
                <li className="pl-4">&ndash; Arbeitsrecht</li>
                <li className="pl-4">&ndash; Handels- / Gesellschaftsrecht</li>
                <li className="pl-4">&ndash; Wirtschaftsrecht</li>
                <li className="pl-4">&ndash; Immaterialgueterrecht</li>
                <li className="pl-4">&ndash; Privatversicherungsrecht</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Das BGB ist Teil des <em>Privatrechts</em>, nicht des oeffentlichen Rechts!
            Steuerrecht und Strafrecht gehoeren zum oeffentlichen Recht, obwohl sie auch Private betreffen.
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Das BGB &mdash; Zeittafel</h4>
            <p className="text-sm text-slate-400 mb-2">
              Das BGB wurde 1896 verabschiedet und trat am <strong>01.01.1900</strong> in Kraft.
              Es wurde seitdem durch politische Einfluesse, Aenderung der Wertvorstellungen,
              technische Entwicklungen und wirtschaftliche Veraenderungen fortlaufend angepasst.
            </p>
            <p className="text-sm text-slate-400">
              Das &bdquo;innere System&ldquo; des BGB dreht sich um die <strong>subjektiven Rechte</strong>:
              Entstehung &rarr; Uebertragung &rarr; Untergang &rarr; Durchsetzbarkeit.
            </p>
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 3. Privatautonomie & Vertragsfreiheit
    // ───────────────────────────────────────────────
    {
      id: 'privatautonomie',
      title: 'Privatautonomie & Vertragsfreiheit',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Privatautonomie</strong>: Das Gesetz gibt dem Einzelnen die Freiheit, selbst eine
              Regelung seiner Lebensverhaeltnisse zu treffen, die von der Rechtsordnung anerkannt wird.
            </p>
          </div>

          <h4 className="font-medium pt-2">Vertragsfreiheit und ihre Schranken:</h4>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/50 border border-green-700 text-green-300 font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-green-300">Abschlussfreiheit</div>
                <div className="text-sm text-slate-400 mt-1">
                  Ob und mit wem ein Vertrag geschlossen wird, entscheidet jeder selbst.
                </div>
                <div className="text-sm text-red-300 mt-1">
                  Schranke: <strong>Kontrahierungszwang</strong> (z.B. Pflichtversicherung)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-blue-300">Inhaltsfreiheit</div>
                <div className="text-sm text-slate-400 mt-1">
                  Was im Vertrag vereinbart wird, bestimmen die Parteien.
                </div>
                <div className="text-sm text-red-300 mt-1">
                  Schranken: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 134</span> (gesetzliches Verbot),{' '}
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 138</span> (Sittenwidrigkeit),{' '}
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 242</span> (Treu und Glauben)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-purple-300">Formfreiheit</div>
                <div className="text-sm text-slate-400 mt-1">
                  Vertraege koennen grundsaetzlich in jeder Form geschlossen werden (muendlich, schriftlich, konkludent).
                </div>
                <div className="text-sm text-red-300 mt-1">
                  Schranke: <strong>Formzwang</strong>, z.B.{' '}
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 311b</span> (Grundstueckskaufvertrag bedarf notarieller Beurkundung)
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Inhaltliche Grenzen eines Rechtsgeschaefts</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <div className="font-medium text-red-300 mb-1">Gesetzliches Verbot (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 134</span>)</div>
                <p className="text-slate-400">Normzweck missbilligt das RG &rarr; RG nichtig</p>
              </div>
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <div className="font-medium text-red-300 mb-1">Sittenwidrigkeit (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 138</span>)</div>
                <p className="text-slate-400">Verstoss gegen das &bdquo;Anstandsgefuehl aller billig und gerecht Denkenden&ldquo;</p>
                <p className="text-slate-500 mt-1">Allgemein (<span className="font-mono">&sect; 138 I</span>) oder Wucher (<span className="font-mono">&sect; 138 II</span>)</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Merke die Dreiheit: Abschlussfreiheit &ndash; Inhaltsfreiheit &ndash; Formfreiheit.
            Jede hat ihre gesetzlichen Schranken. Paragraphen ohne Bezeichnung sind solche des BGB!
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 4. Trennungs- und Abstraktionsprinzip
    // ───────────────────────────────────────────────
    {
      id: 'trennungs-abstraktionsprinzip',
      title: 'Trennungs- und Abstraktionsprinzip',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Das <strong>Trennungsprinzip</strong> und das <strong>Abstraktionsprinzip</strong> sind
              Grundpfeiler des deutschen Zivilrechts und muessen in jeder Klausur beherrscht werden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-3">Trennungsprinzip</h4>
              <p className="text-sm text-slate-300 mb-2">
                <strong>Verpflichtungsgeschaeft</strong> und <strong>Verfuegungsgeschaeft</strong> sind
                zwei getrennte Rechtsgeschaefte.
              </p>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-900/30 rounded border border-blue-800">
                  <div className="font-medium text-blue-300">Verpflichtung (schuldrechtlich / kausal)</div>
                  <p className="text-slate-400">Rechtsgeschaeft, durch das Leistungspflichten begruendet werden</p>
                  <p className="text-slate-500 mt-1">
                    K &gt; V: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 I 1</span>{' '}
                    V &gt; K: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>
                  </p>
                </div>
                <div className="p-2 bg-green-900/30 rounded border border-green-800">
                  <div className="font-medium text-green-300">Verfuegung (dinglich / abstrakt)</div>
                  <p className="text-slate-400">Einwirkung auf ein bestehendes Recht: Uebertragung, Belastung, Inhaltsaenderung, Aufhebung</p>
                  <p className="text-slate-500 mt-1">
                    Uebereignung: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 929 S.1</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-green-700">
              <h4 className="font-medium text-green-300 mb-3">Abstraktionsprinzip</h4>
              <p className="text-sm text-slate-300 mb-2">
                Die Wirksamkeit des einen Geschaefts ist <strong>unabhaengig</strong> von der Wirksamkeit des anderen.
              </p>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-amber-900/20 rounded border border-amber-800">
                  <div className="font-medium text-amber-300">Nichtigkeit der Verfuegung</div>
                  <p className="text-slate-400">&rarr; Anspruch aus Verpflichtung bleibt bestehen</p>
                </div>
                <div className="p-2 bg-amber-900/20 rounded border border-amber-800">
                  <div className="font-medium text-amber-300">Nichtigkeit der Verpflichtung</div>
                  <p className="text-slate-400">
                    &rarr; <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 985</span> (-) Eigentum ist wirksam uebertragen
                  </p>
                  <p className="text-slate-400">
                    &rarr; <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 812</span> (+) Anspruch auf Rueckuebertragung (ungerechtfertigte Bereicherung)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={trennungsprinzipDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Auch wenn der Kaufvertrag (Verpflichtung) nichtig ist, bleibt
            die Uebereignung (Verfuegung) wirksam! Der Kaeufer wird trotzdem Eigentuemer. Der Verkaeufer muss
            ueber <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 812</span> (Bereicherungsrecht)
            die Rueckuebertragung verlangen.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Beim Kaufvertrag immer beide Ebenen trennen:
            1. Schuldrechtliche Ebene (Verpflichtung, <span className="font-mono">&sect; 433</span>) und
            2. Sachenrechtliche Ebene (Verfuegung, <span className="font-mono">&sect; 929</span>).
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 5. Subsumtion & Anspruchspruefung
    // ───────────────────────────────────────────────
    {
      id: 'subsumtion-anspruchspruefung',
      title: 'Subsumtion & Anspruchspruefung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Subsumtion</strong> ist die Unterordnung eines Sachverhaltes unter einen Rechtssatz.
              Die Subsumtion erfolgt mit Hilfe der <strong>Auslegung</strong> (Interpretation des Gesetzes).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Auslegungsmethoden:</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-300 shrink-0">&#x1F4D6;</span>
                <div><strong className="text-blue-300">Wortlaut</strong> &ndash; Grammatische Auslegung des Gesetzestextes</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-300 shrink-0">&#x1F3AF;</span>
                <div><strong className="text-green-300">Teleologisch</strong> &ndash; Sinn und Zweck der Norm</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-300 shrink-0">&#x1F4DC;</span>
                <div><strong className="text-purple-300">Historisch</strong> &ndash; Entstehungsgeschichte der Norm</div>
              </div>
            </div>
          </div>

          <h4 className="font-medium pt-2">Pruefungsreihenfolge der Anspruchspruefung:</h4>
          <p className="text-sm text-slate-400">
            Jeder Anspruch wird in vier Schritten geprueft. Diese Reihenfolge ist zwingend einzuhalten:
          </p>

          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/50 border border-green-700 text-green-300 font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-green-300">Anspruch entstanden?</div>
                <div className="text-sm text-slate-400 mt-1">
                  Liegen die <strong>Anspruchsvoraussetzungen i.e.S.</strong> vor?
                  Gibt es <strong>rechtshindernde Einwendungen</strong>?
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-blue-300">Anspruch uebergegangen?</div>
                <div className="text-sm text-slate-400 mt-1">
                  <strong>Derivativer Erwerb</strong> von Dritten? <strong>Verlust</strong> an Dritte?
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-900/50 border border-amber-700 text-amber-300 font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-amber-300">Anspruch untergegangen?</div>
                <div className="text-sm text-slate-400 mt-1">
                  <strong>Rechtsvernichtende Einwendungen</strong> (z.B. Erfuellung, Aufrechnung, Ruecktritt)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <div className="font-medium text-purple-300">Anspruch durchsetzbar?</div>
                <div className="text-sm text-slate-400 mt-1">
                  <strong>Peremptorische Einreden</strong> (dauerhaft, z.B. Verjaehrung) und{' '}
                  <strong>dilatorische Einreden</strong> (voruebergehend, z.B. Zurueckbehaltungsrecht)
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Pruefungsreihenfolge ist zwingend! Niemals mit &bdquo;Anspruch durchsetzbar&ldquo;
            beginnen, sondern immer mit &bdquo;Anspruch entstanden&ldquo;. Nur wenn der Anspruch entstanden ist,
            ist weiterzupruefen.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Der Obersatz im Gutachtenstil lautet immer:
            &bdquo;X koennte gegen Y einen Anspruch auf [Leistung] gemaess &sect; [Norm] haben.&ldquo;
            Dann folgt die Pruefung: &bdquo;Dann muesste der Anspruch zunaechst entstanden sein.&ldquo;
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: AnspruchspruefungFlow,
      },
    },
  ],

  // ───────────────────────────────────────────────
  // Quiz
  // ───────────────────────────────────────────────
  quiz: {
    questions: [
      {
        id: 'gl-q1',
        type: 'multiple-choice',
        question: 'Was regelt das Trennungsprinzip?',
        options: [
          'Trennung von Oeffentlichem Recht und Privatrecht',
          'Trennung von Verpflichtungsgeschaeft und Verfuegungsgeschaeft',
          'Trennung von Angebot und Annahme',
          'Trennung von materiellem und formellem Recht',
        ],
        correctAnswer: 'Trennung von Verpflichtungsgeschaeft und Verfuegungsgeschaeft',
        explanation:
          'Das Trennungsprinzip besagt, dass Verpflichtungsgeschaeft (schuldrechtlich, z.B. Kaufvertrag gemaess ss 433) und Verfuegungsgeschaeft (dinglich, z.B. Uebereignung gemaess ss 929) zwei getrennte Rechtsgeschaefte sind.',
      },
      {
        id: 'gl-q2',
        type: 'match-pairs',
        question: 'Ordnen Sie die Rechtsgebiete den richtigen Kategorien zu:',
        options: [
          'Steuerrecht :: Oeffentliches Recht',
          'Handelsrecht :: Privatrecht',
          'Strafrecht :: Oeffentliches Recht',
          'Arbeitsrecht :: Privatrecht',
        ],
        correctAnswer: [
          'Steuerrecht :: Oeffentliches Recht',
          'Handelsrecht :: Privatrecht',
          'Strafrecht :: Oeffentliches Recht',
          'Arbeitsrecht :: Privatrecht',
        ],
        explanation:
          'Steuerrecht und Strafrecht gehoeren zum oeffentlichen Recht (Ueber-/Unterordnungsverhaeltnis). Handelsrecht und Arbeitsrecht sind Sonderprivatrecht (Gleichordnungsverhaeltnis).',
      },
      {
        id: 'gl-q3',
        type: 'order-steps',
        question: 'Bringen Sie die Pruefungsreihenfolge der Anspruchspruefung in die richtige Reihenfolge:',
        options: [
          'Anspruch durchsetzbar?',
          'Anspruch entstanden?',
          'Anspruch untergegangen?',
          'Anspruch uebergegangen?',
        ],
        correctAnswer: [
          'Anspruch entstanden?',
          'Anspruch uebergegangen?',
          'Anspruch untergegangen?',
          'Anspruch durchsetzbar?',
        ],
        explanation:
          'Die zwingende Pruefungsreihenfolge lautet: 1. Entstanden (Anspruchsvoraussetzungen + rechtshindernde Einwendungen), 2. Uebergegangen (Erwerb/Verlust an Dritte), 3. Untergegangen (rechtsvernichtende Einwendungen), 4. Durchsetzbar (Einreden).',
      },
      {
        id: 'gl-q4',
        type: 'free-text',
        question:
          'Erklaeren Sie den Unterschied zwischen Verpflichtungsgeschaeft und Verfuegungsgeschaeft anhand eines Kaufvertrags.',
        placeholder: 'Das Verpflichtungsgeschaeft ...',
        modelAnswer:
          'Das Verpflichtungsgeschaeft (z.B. Kaufvertrag, ss 433 BGB) begruendet lediglich schuldrechtliche Leistungspflichten zwischen den Parteien: Der Verkaeufer verpflichtet sich zur Uebereignung der Sache, der Kaeufer zur Zahlung des Kaufpreises. Das Verfuegungsgeschaeft (z.B. Uebereignung, ss 929 S.1 BGB) bewirkt die tatsaechliche dingliche Rechtsaenderung: Das Eigentum geht auf den Kaeufer ueber. Beide Geschaefte sind nach dem Trennungsprinzip voneinander getrennte Rechtsgeschaefte und nach dem Abstraktionsprinzip in ihrer Wirksamkeit voneinander unabhaengig.',
        keyPoints: [
          'Verpflichtungsgeschaeft begruendet Leistungspflichten (schuldrechtlich)',
          'Verfuegungsgeschaeft bewirkt dingliche Rechtsaenderung',
          'Trennungsprinzip: zwei getrennte Rechtsgeschaefte',
          'Abstraktionsprinzip: Wirksamkeit voneinander unabhaengig',
          'Beispiel: ss 433 (Verpflichtung) vs. ss 929 (Verfuegung)',
        ],
        explanation:
          'Das Trennungs- und Abstraktionsprinzip ist ein Grundpfeiler des deutschen Zivilrechts. Die schuldrechtliche Ebene (Verpflichtung) und die sachenrechtliche Ebene (Verfuegung) muessen stets getrennt geprueft werden.',
      },
      {
        id: 'gl-q5',
        type: 'multiple-choice',
        question: 'Was ist die Rechtsfolge, wenn das Verpflichtungsgeschaeft (Kaufvertrag) nichtig ist, die Uebereignung aber wirksam erfolgt ist?',
        options: [
          'Die Uebereignung wird automatisch auch nichtig',
          'Der Kaeufer muss die Sache zurueckgeben, da er kein Eigentum erworben hat',
          'Der Kaeufer ist Eigentuemer geworden, der Verkaeufer hat einen Anspruch aus ss 812 BGB (ungerechtfertigte Bereicherung)',
          'Der Kaufvertrag wird rueckwirkend wirksam',
        ],
        correctAnswer:
          'Der Kaeufer ist Eigentuemer geworden, der Verkaeufer hat einen Anspruch aus ss 812 BGB (ungerechtfertigte Bereicherung)',
        explanation:
          'Nach dem Abstraktionsprinzip bleibt die Verfuegung (Uebereignung) wirksam, auch wenn die Verpflichtung (Kaufvertrag) nichtig ist. Der Kaeufer ist Eigentuemer. Der Verkaeufer kann die Sache ueber ss 812 BGB (Bereicherungsrecht) zurueckfordern, nicht ueber ss 985 BGB (Herausgabeanspruch).',
      },
      {
        id: 'gl-q6',
        type: 'multiple-choice',
        question: 'Welche der folgenden Aussagen zur Privatautonomie ist korrekt?',
        options: [
          'Formfreiheit bedeutet, dass Vertraege immer schriftlich geschlossen werden muessen',
          'Abschlussfreiheit bedeutet, dass jeder frei entscheiden kann, ob und mit wem er einen Vertrag schliesst',
          'Inhaltsfreiheit ist unbegrenzt und kennt keine Schranken',
          'Kontrahierungszwang ist der Regelfall im deutschen Recht',
        ],
        correctAnswer:
          'Abschlussfreiheit bedeutet, dass jeder frei entscheiden kann, ob und mit wem er einen Vertrag schliesst',
        explanation:
          'Abschlussfreiheit ist ein Kernbestandteil der Vertragsfreiheit. Formfreiheit bedeutet gerade, dass KEINE bestimmte Form erforderlich ist (mit Ausnahmen). Inhaltsfreiheit wird durch ssss 134, 138, 242 BGB begrenzt.',
      },
      {
        id: 'gl-q7',
        type: 'fill-blank',
        question:
          'Die drei Schranken der Inhaltsfreiheit sind: gesetzliches Verbot (ss ___), Sittenwidrigkeit (ss ___) und Treu und Glauben (ss ___).',
        options: ['134, 138, 242', '138, 134, 242', '242, 134, 138', '134, 242, 138'],
        correctAnswer: '134, 138, 242',
        explanation:
          'Die Inhaltsfreiheit wird begrenzt durch ss 134 BGB (gesetzliches Verbot), ss 138 BGB (Sittenwidrigkeit) und ss 242 BGB (Treu und Glauben).',
      },
      {
        id: 'gl-q8',
        type: 'multi-select',
        question: 'Welche Rechtsgebiete gehoeren zum Privatrecht? (Mehrere Antworten moeglich)',
        options: [
          'Buergerliches Recht',
          'Strafrecht',
          'Handelsrecht',
          'Verwaltungsrecht',
          'Arbeitsrecht',
          'Steuerrecht',
        ],
        correctAnswer: ['Buergerliches Recht', 'Handelsrecht', 'Arbeitsrecht'],
        explanation:
          'Zum Privatrecht gehoeren das Buergerliche Recht sowie das Sonderprivatrecht (Arbeitsrecht, Handels-/Gesellschaftsrecht, Wirtschaftsrecht, Immaterialgueterrecht, Privatversicherungsrecht). Strafrecht, Verwaltungsrecht und Steuerrecht gehoeren zum oeffentlichen Recht.',
      },
      {
        id: 'gl-q9',
        type: 'multiple-choice',
        question: 'Welche Rechtsquelle wird durch die Judikative erzeugt?',
        options: [
          'Gewohnheitsrecht',
          'Gesetze',
          'Richterrecht',
          'Rechtsverordnungen',
        ],
        correctAnswer: 'Richterrecht',
        explanation:
          'Die Judikative (Rechtsprechung) erzeugt Richterrecht durch Gerichtsurteile. Gesetze und Rechtsverordnungen werden durch die Legislative erzeugt. Gewohnheitsrecht entsteht durch die Exekutive (Brauch).',
      },
    ],
  },

  // ───────────────────────────────────────────────
  // Related Topics
  // ───────────────────────────────────────────────
  relatedTopics: [
    {
      id: 'willenserklaerung',
      title: 'Willenserklaerung & Vertragsschluss',
      relationship: 'builds on',
    },
    {
      id: 'anfechtung',
      title: 'Anfechtung & Verjaehrung',
      relationship: 'builds on',
    },
  ],
}
