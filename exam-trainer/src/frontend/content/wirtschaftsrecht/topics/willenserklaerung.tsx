// src/content/wirtschaftsrecht/topics/willenserklaerung.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { WillenserklaerungBuilder } from '../diagrams/WillenserklaerungBuilder'
import { VertragspruefungStepper } from '../diagrams/VertragspruefungStepper'

const zugangDiagram = `flowchart TD
  WE["Willenserklaerung"] --> NE["Nicht empfangsbeduerft."]
  WE --> E["Empfangsbeduerft."]
  NE --> W1["Wirksam wenn Erklaerungsvorgang beendet"]
  NE --> B1["z.B. Testament ss 2247"]
  E --> AN["Gegenueber Anwesend"]
  E --> AB["Gegenueber Abwesend ss 130"]
  AN --> W2["Analog ss 130"]
  AB --> W3["Zugang erforderlich"]
  W3 --> ZU["In den Machtbereich gelangt + unter normalen Umstaenden Kenntnisnahme zu erwarten"]
  style WE fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style E fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style NE fill:#1a3a2f,stroke:#22c55e,color:#86efac
  style ZU fill:#3b1f1f,stroke:#ef4444,color:#fca5a5
`

const vertragsschlussDiagram = `flowchart LR
  A["Angebot WE"] --> AN["Annahme WE"]
  AN --> V["Vertrag"]
  A --> EN["Essentialia negotii"]
  V --> ZW["Zwei inhaltlich uebereinstimmende WE"]
  style A fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
  style AN fill:#1a3a2f,stroke:#22c55e,color:#86efac
  style V fill:#2d1a4e,stroke:#a855f7,color:#c4b5fd
`

export const willenserklaerungTopic: Topic = {
  id: 'willenserklaerung',
  title: 'Willenserklaerung & Vertragsschluss',
  description:
    'Tatbestand der WE, Abgabe & Zugang, Angebot & Annahme, Invitatio ad offerendum, Schweigen als WE, Fristen',
  icon: '\uD83E\uDD1D',
  examNotes:
    'Pruefe immer: Aeusserer Tatbestand (+) -> Innerer Tatbestand (Handlungswille, Erklaerungswille, Geschaeftswille)!',

  sections: [
    // ───────────────────────────────────────────────
    // 1. Tatbestand der Willenserklaerung
    // ───────────────────────────────────────────────
    {
      id: 'tatbestand-we',
      title: 'Tatbestand der Willenserklaerung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Die <strong>Willenserklaerung</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 116&ndash;144</span>)
              ist eine private Willensaeusserung, die auf die Herbeifuehrung einer Rechtsfolge gerichtet ist.
              Sie ist das <strong>zentrale Wesensmerkmal des Rechtsgeschaefts</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border border-blue-700">
              <h4 className="font-medium text-blue-300 mb-3">Aeusserer Tatbestand (objektiv)</h4>
              <p className="text-sm text-slate-300 mb-2">
                Die Erklaerung muss aeusserlich erkennbar sein. Es gibt drei Formen:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 shrink-0">&#x1F4AC;</span>
                  <div><strong>Ausdruecklich</strong> &ndash; Worte, Schrift</div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 shrink-0">&#x1F91D;</span>
                  <div><strong>Konkludent</strong> &ndash; Schluessiges Handeln (z.B. Ware auf Band legen)</div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 shrink-0">&#x1F910;</span>
                  <div><strong>Schweigen</strong> &ndash; Nur ausnahmsweise eine WE (s. unten)</div>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-green-700">
              <h4 className="font-medium text-green-300 mb-3">Innerer Tatbestand (subjektiv / Wille)</h4>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-green-900/20 rounded border border-green-800">
                  <div className="font-medium text-green-300">Handlungswille</div>
                  <p className="text-slate-400">Wille, eine Erklaerungshandlung vorzunehmen</p>
                  <p className="text-red-300 text-xs mt-1">Bei Fehlen: Keine WE</p>
                </div>
                <div className="p-2 bg-blue-900/20 rounded border border-blue-800">
                  <div className="font-medium text-blue-300">Erklaerungsbewusstsein (Erklaerungswille)</div>
                  <p className="text-slate-400">Bewusstsein, etwas rechtlich Verbindliches zu erklaeren</p>
                  <p className="text-amber-300 text-xs mt-1">Bei Fehlen: Strittig! WE (+) nur wenn fuer Erklaerenden erkennbar, dass seine Handlung als WE gewertet wird</p>
                </div>
                <div className="p-2 bg-purple-900/20 rounded border border-purple-800">
                  <div className="font-medium text-purple-300">Geschaeftswille</div>
                  <p className="text-slate-400">Wille, eine konkrete Rechtsfolge herbeizufuehren</p>
                  <p className="text-amber-300 text-xs mt-1">Bei Fehlen: WE liegt vor, ist aber ggf. anfechtbar (<span className="font-mono">&sect;&sect; 119 I, 122</span>)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Das Fehlen des <em>Handlungswillens</em> fuehrt stets zum Ausschluss
            einer WE (z.B. Reflexbewegung). Das Fehlen des <em>Erklaerungswillens</em> ist streitig &ndash;
            nach der Literaturmeinung kann dennoch eine WE vorliegen, wenn der Erklaerende fahrlaeessig
            verkannt hat, dass sein Handeln als WE gewertet werden kann. Das Fehlen des <em>Geschaeftswillens</em>
            macht die WE nicht unwirksam, sondern nur anfechtbar!
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> In der Klausur immer zweistufig pruefen: Erst den aeusseren Tatbestand
            (liegt aeusserlich eine WE vor?), dann den inneren Tatbestand (Handlungswille &rarr; Erklaerungswille &rarr; Geschaeftswille).
          </div>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: WillenserklaerungBuilder,
      },
    },

    // ───────────────────────────────────────────────
    // 2. Abgabe & Zugang
    // ───────────────────────────────────────────────
    {
      id: 'abgabe-zugang',
      title: 'Abgabe & Zugang',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Eine empfangsbeduertige Willenserklaerung wird erst mit <strong>Abgabe</strong> und{' '}
              <strong>Zugang</strong> wirksam (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 130</span>).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-3">Abgabe</h4>
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800 text-sm">
                <p className="text-slate-300">
                  Eine Willenserklaerung ist <strong>abgegeben</strong>, wenn der Erklaerende die Erklaerung
                  wissentlich und willentlich so in den Verkehr bringt, dass er damit rechnen kann,
                  sie werde dem Adressaten ohne sein weiteres Zutun zugehen.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-green-300 mb-3">Zugang</h4>
              <div className="p-3 bg-green-900/20 rounded border border-green-800 text-sm">
                <p className="text-slate-300">
                  Der <strong>Zugang</strong> ist erfolgt, wenn die Erklaerung so in den{' '}
                  <strong>Herrschaftsbereich</strong> des Empfaengers gelangt, dass dieser unter{' '}
                  <strong>normalen Umstaenden</strong> mit der Kenntnisnahme zu rechnen ist.
                </p>
                <p className="text-red-300 mt-2">
                  Auf die <em>tatsaechliche</em> Kenntnisnahme kommt es nicht an!
                </p>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={zugangDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Empfangsbeduertig vs. nicht empfangsbeduertig</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <div className="font-medium text-green-300 mb-1">Nicht empfangsbeduertig</div>
                <p className="text-slate-400">WE ist nicht an eine Person gerichtet &rarr; wirksam, wenn Erklaerungsvorgang beendet</p>
                <p className="text-slate-500 mt-1">z.B. Testament (<span className="font-mono">&sect; 2247</span>)</p>
              </div>
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                <div className="font-medium text-blue-300 mb-1">Empfangsbeduertig</div>
                <p className="text-slate-400">WE richtet sich an eine Person &rarr; erst wirksam mit Zugang</p>
                <p className="text-slate-500 mt-1">Typisch fuer: Vertrag, Gestaltungsrechte (Anfechtung, Ruecktritt)</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Ein Brief, der um 21:00 Uhr in den Briefkasten eingeworfen wird,
            gilt erst am <em>naechsten Morgen</em> als zugegangen, weil Briefkaesten ueblicherweise nicht abends,
            sondern am folgenden Tag geleert werden! Die tatsaechliche Kenntnisnahme ist irrelevant.
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 3. Angebot & Annahme
    // ───────────────────────────────────────────────
    {
      id: 'angebot-annahme',
      title: 'Angebot & Annahme',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Ein <strong>Vertrag</strong> besteht aus zwei inhaltlich uebereinstimmenden
              Willenserklaerungen: <strong>Angebot</strong> und <strong>Annahme</strong>{' '}
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 145 ff.</span>).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-3">Angebot (Antrag)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>&#x2022; Empfangsbeduertige Willenserklaerung</li>
                <li>&#x2022; Muss die <strong>essentialia negotii</strong> enthalten (wesentliche Vertragsbestandteile)</li>
                <li>&#x2022; Beim Kaufvertrag: Kaufgegenstand + Kaufpreis</li>
                <li>&#x2022; Bindungswirkung ab Zugang (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 145</span>)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-green-300 mb-3">Annahme</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>&#x2022; Vorbehaltlose Zustimmung zum Angebot (&bdquo;Ja&ldquo;)</li>
                <li>&#x2022; Muss inhaltlich mit dem Angebot uebereinstimmen</li>
                <li>&#x2022; Bei Aenderungen: gilt als <strong>Ablehnung + neues Angebot</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 150 II</span>)</li>
              </ul>
            </div>
          </div>

          <MermaidDiagram chart={vertragsschlussDiagram} className="bg-slate-800/50 rounded-lg p-4" />

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Dissens (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 154, 155</span>)</h4>
            <p className="text-sm text-slate-300 mb-2">
              Wenn sich die Willenserklaerungen der Parteien nicht decken, liegt ein <strong>Dissens</strong> vor:
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-amber-900/20 rounded border border-amber-800">
                <div className="font-medium text-amber-300">Offener Dissens (<span className="font-mono">&sect; 154 I</span>)</div>
                <p className="text-slate-400">Keine Einigung ueber essentialia negotii &rarr; kein Vertrag</p>
              </div>
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <div className="font-medium text-red-300">Versteckter Dissens (<span className="font-mono">&sect; 155</span>)</div>
                <p className="text-slate-400">Beide Parteien wissen nicht, dass keine Einigung vorliegt</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Der Sonderfall <strong>Versteigerung</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 156</span>):
            Hier heisst das Angebot &bdquo;Gebot&ldquo; und die Annahme &bdquo;Zuschlag&ldquo;. Der Vertrag kommt durch
            den Zuschlag des Auktionators zustande.
          </div>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: VertragspruefungStepper,
      },
    },

    // ───────────────────────────────────────────────
    // 4. Invitatio ad offerendum
    // ───────────────────────────────────────────────
    {
      id: 'invitatio',
      title: 'Invitatio ad offerendum',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Eine <strong>Invitatio ad offerendum</strong> (Einladung zur Abgabe eines Angebots) ist
              <em> kein</em> Angebot im Rechtssinne, sondern lediglich eine Aufforderung an andere,
              ihrerseits ein Angebot abzugeben.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Warum ist das Ausstellen von Ware im Schaufenster kein Angebot?</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                Im Ausstellen eines Artikels im Schaufenster ist schon aeusserlich <strong>keine Willenserklaerung</strong> zu
                erkennen. Es fehlt an der objektiven Entaeusserung eines Geschaeftswillens.
              </p>
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <strong className="text-red-300">Das Problem:</strong> Wuerde man das Ausstellen als Angebot werten, koennten
                mehrere Personen gleichzeitig &bdquo;annehmen&ldquo;. Es laegen dann mehrere Kaufvertraege vor, aber
                der Verkaeufer kann den Kaufgegenstand nur <strong>einmal</strong> uebereignen. Gegenueber den
                anderen Kaeufer waere die Leistung unmoeglich &rarr; Schadensersatzansprueche.
              </div>
              <p>
                <strong>Loesung:</strong> In der Ausstellung ist lediglich eine <em>invitatio ad offerendum</em> zu sehen.
                Das eigentliche Angebot geht von der Person aus, die den Laden betritt und den Kaufwunsch aeussert.
                Der Geschaeftsinhaber ist <strong>nicht verpflichtet</strong>, dieses Angebot anzunehmen &ndash; er kann
                frei waehlen, mit wem er einen Vertrag schliesst.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Typische Beispiele fuer Invitatio ad offerendum:</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>&#x2022; Auslage im Schaufenster (mit Preisschild)</li>
              <li>&#x2022; Katalogversand / Online-Shop-Darstellung</li>
              <li>&#x2022; Zeitungsannoncen und Werbung</li>
              <li>&#x2022; Speisekarte im Restaurant</li>
            </ul>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Schaufensterauslage ist <em>kein</em> Angebot!
            Der Kunde macht das Angebot, der Haendler kann frei annehmen oder ablehnen.
            Das gilt insbesondere bei Einzelstuecken &ndash; der Haendler muss sich aussuchen koennen,
            an wen er verkauft.
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> In der Klausur bei Invitatio immer drei Schritte:
            1. Ist das Ausstellen ein Angebot? (-) &rarr; Invitatio ad offerendum.
            2. Wer hat dann das Angebot abgegeben? Der Kunde.
            3. Hat der Geschaeftsinhaber dieses Angebot angenommen?
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 5. Schweigen als Willenserklaerung
    // ───────────────────────────────────────────────
    {
      id: 'schweigen-als-we',
      title: 'Schweigen als Willenserklaerung',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Grundsatz:</strong> Schweigen ist grundsaetzlich <em>keine</em> Willenserklaerung,
              da der Erklaerungstatbestand fehlt.
            </p>
          </div>

          <h4 className="font-medium pt-2">Ausnahmen:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-3">Normiertes Schweigen</h4>
              <p className="text-sm text-slate-300 mb-2">
                Das BGB hat in einigen Faellen angeordnet, dass Schweigen als Erklaerung bestimmten Inhaltes gewertet wird:
              </p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>&#x2022; Schweigen als Annahme: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 516 II 2, 362 I HGB</span></li>
                <li>&#x2022; Schweigen als Genehmigung: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 416 I 2</span></li>
                <li>&#x2022; Sonderfaelle HGB: <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect;&sect; 75h, 91a HGB</span></li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-green-300 mb-3">Beredtes Schweigen</h4>
              <p className="text-sm text-slate-300 mb-2">
                Schweigen/Nichtstun wird zur Willenserklaerung, wenn sich die Parteien <strong>zuvor
                darueber geeinigt</strong> haben und dem Schweigen so eine Erklaerungsbedeutung zugewiesen haben.
              </p>
              <div className="p-2 bg-green-900/20 rounded border border-green-800 text-sm mt-2">
                <p className="text-slate-400">
                  Sonderfall: <strong>Kaufmaennisches Bestaetigungsschreiben (KBS)</strong> &ndash;
                  Schweigen gilt kraft Gewohnheitsrecht als Zustimmung.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> In der Klausur immer zuerst den Grundsatz nennen (&bdquo;Schweigen ist
            grundsaetzlich keine WE&ldquo;), dann pruefen, ob eine der Ausnahmen greift (normiertes Schweigen
            oder beredtes Schweigen).
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 6. Fristen & verspaetete Annahme
    // ───────────────────────────────────────────────
    {
      id: 'fristen',
      title: 'Fristen & verspaetete Annahme',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Ein Angebot erlischt, wenn es nicht rechtzeitig angenommen wird
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 146</span>).
              Der Anbietende kann eine Annahmefrist bestimmen
              (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 148</span>).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-3">Die wichtigsten Fristenregeln:</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                <div className="font-medium text-blue-300">
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 146</span> Erloeschen des Angebots
                </div>
                <p className="text-slate-400 mt-1">Das Angebot erlischt, wenn es abgelehnt oder nicht rechtzeitig angenommen wird.</p>
              </div>
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <div className="font-medium text-green-300">
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 148</span> Annahmefrist
                </div>
                <p className="text-slate-400 mt-1">Hat der Antragende eine Frist bestimmt, kann die Annahme nur innerhalb dieser Frist erfolgen.</p>
              </div>
              <div className="p-3 bg-amber-900/20 rounded border border-amber-800">
                <div className="font-medium text-amber-300">
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 150 I</span> Verspaetete Annahme = neues Angebot
                </div>
                <p className="text-slate-400 mt-1">Die verspaetete Annahme eines Antrags gilt als <strong>neuer Antrag</strong>.</p>
              </div>
              <div className="p-3 bg-red-900/20 rounded border border-red-800">
                <div className="font-medium text-red-300">
                  <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 150 II</span> Annahme unter Aenderungen
                </div>
                <p className="text-slate-400 mt-1">Annahme mit Aenderungen gilt als <strong>Ablehnung + neues Angebot (Gegenangebot)</strong>.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die verspaetete Annahme ist <em>keine</em> Annahme, sondern ein
            neues Angebot (<span className="font-mono">&sect; 150 I</span>)! Das urspruengliche Angebot ist durch Fristablauf erloschen
            (<span className="font-mono">&sect;&sect; 146, 148</span>). Ebenso: Annahme mit Aenderungen = Ablehnung + neues Angebot
            (<span className="font-mono">&sect; 150 II</span>).
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Bei Faellen mit mehreren Angeboten und Gegenangeboten immer
            <strong> chronologisch</strong> pruefen: Wer hat wann welches Angebot gemacht? Wer hat wann welches
            Angebot angenommen? Jedes Gegenangebot verschiebt die Verhandlung.
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
        id: 'we-q1',
        type: 'multiple-choice',
        question: 'Wann gilt ein Brief als zugegangen?',
        options: [
          'Sobald er in den Briefkasten des Empfaengers eingeworfen wird',
          'Wenn der Empfaenger den Brief tatsaechlich liest',
          'Wenn der Brief in den Herrschaftsbereich des Empfaengers gelangt und unter normalen Umstaenden mit der Kenntnisnahme zu rechnen ist',
          'Sobald der Absender den Brief abgeschickt hat',
        ],
        correctAnswer:
          'Wenn der Brief in den Herrschaftsbereich des Empfaengers gelangt und unter normalen Umstaenden mit der Kenntnisnahme zu rechnen ist',
        explanation:
          'Der Zugang einer WE ist erfolgt, wenn die Erklaerung so in den Herrschaftsbereich des Empfaengers gelangt, dass dieser unter normalen Umstaenden mit der Kenntnisnahme zu rechnen ist. Auf die tatsaechliche Kenntnisnahme kommt es nicht an.',
      },
      {
        id: 'we-q2',
        type: 'multi-select',
        question: 'Welche Elemente gehoeren zum inneren Tatbestand der Willenserklaerung? (Mehrere Antworten)',
        options: [
          'Handlungswille',
          'Ausdrueckliche Erklaerung',
          'Erklaerungsbewusstsein (Erklaerungswille)',
          'Geschaeftswille',
          'Konkludentes Handeln',
        ],
        correctAnswer: ['Handlungswille', 'Erklaerungsbewusstsein (Erklaerungswille)', 'Geschaeftswille'],
        explanation:
          'Der innere Tatbestand umfasst: Handlungswille (Wille zu handeln), Erklaerungsbewusstsein (Bewusstsein, etwas rechtlich Verbindliches zu erklaeren) und Geschaeftswille (Wille, eine konkrete Rechtsfolge herbeizufuehren). Ausdrueckliche Erklaerung und konkludentes Handeln gehoeren zum aeusseren Tatbestand.',
      },
      {
        id: 'we-q3',
        type: 'multiple-choice',
        question: 'Was ist eine Invitatio ad offerendum?',
        options: [
          'Ein verbindliches Kaufangebot',
          'Eine Einladung zur Abgabe eines Angebots',
          'Eine Annahmeerklaerung',
          'Ein Vertrag unter Vorbehalt',
        ],
        correctAnswer: 'Eine Einladung zur Abgabe eines Angebots',
        explanation:
          'Eine Invitatio ad offerendum (z.B. Schaufensterauslage) ist kein bindendes Angebot, sondern lediglich eine Aufforderung an andere, ihrerseits ein Angebot abzugeben. Der Geschaeftsinhaber kann dann frei entscheiden, welches Angebot er annimmt.',
      },
      {
        id: 'we-q4',
        type: 'fill-blank',
        question: 'Die verspaetete Annahme eines Antrags gilt gemaess ss ___ als neuer Antrag.',
        options: ['150 I', '146', '148', '145'],
        correctAnswer: '150 I',
        explanation:
          'Gemaess ss 150 I BGB gilt die verspaetete Annahme eines Antrags als neues Angebot. Das urspruengliche Angebot ist durch Fristablauf erloschen (ssss 146, 148).',
      },
      {
        id: 'we-q5',
        type: 'multiple-choice',
        question: 'Was bewirkt die Annahme unter Aenderungen gemaess ss 150 II BGB?',
        options: [
          'Der Vertrag kommt mit den Aenderungen zustande',
          'Der Vertrag kommt zu den urspruenglichen Bedingungen zustande',
          'Sie gilt als Ablehnung verbunden mit einem neuen Antrag',
          'Der Vertragsschluss wird aufgeschoben',
        ],
        correctAnswer: 'Sie gilt als Ablehnung verbunden mit einem neuen Antrag',
        explanation:
          'Gemaess ss 150 II BGB gilt die Annahme unter Erweiterungen, Einschraenkungen oder sonstigen Aenderungen als Ablehnung verbunden mit einem neuen Antrag (Gegenangebot).',
      },
      {
        id: 'we-q6',
        type: 'free-text',
        question:
          'Pruefen Sie im Gutachtenstil, ob E bei der Versteigerung ein wirksames Gebot abgegeben hat, als er den Arm hob, um einem Bekannten zuzuwinken. (Fall 2)',
        placeholder: 'Fraglich ist, ob E ein Gebot unterbreitet hat ...',
        modelAnswer:
          'Fraglich ist, ob E ein Gebot unterbreitet hat. Ein Gebot des E scheitert nicht schon am mangelnden aeusseren Tatbestand der Willenserklaerung. Von aussen betrachtet laesst das Armheben des E aus der Sicht eines objektiven Dritten (Empfaengerhorizont) auf ein Kaufgebot schliessen. Fraglich erscheint jedoch, wie es sich auswirkt, dass E nicht wusste, was ein Armheben in der Versteigerung bedeutet. Es koennte ein Mindestbestandteil des inneren Tatbestandes fehlen. E hatte beim Armheben das grundsaetzliche Bewusstsein zu handeln, also einen Handlungswillen. Weitere Voraussetzung innerhalb des inneren Tatbestandes ist jedoch das Vorliegen eines Erklaerungswillens. E hatte beim Heben des Armes aber eben nicht das Bewusstsein, hierdurch irgendetwas rechtlich Erhebliches zu erklaeren. Es fehlte demnach am erforderlichen Erklaerungswillen. Eine Literaturmeinung nimmt dennoch ausnahmsweise trotz Fehlens des Erklaerungswillens eine Willenserklaerung an, wenn der Erklaerende fahrlaessig verkannt hat, dass sein Handeln als Willenserklaerung gewertet werden kann. E war mit den Gepflogenheiten einer Versteigerung aber nicht vertraut und wusste nicht, welche rechtlichen Folgen ein Armheben haben kann. Demnach ist wegen des fehlenden Erklaerungswillens nicht von einer Willenserklaerung, also einem Gebot des E auszugehen.',
        keyPoints: [
          'Aeusserer Tatbestand (+): Armheben laesst auf Gebot schliessen',
          'Handlungswille (+): Grundsaetzliches Bewusstsein zu handeln',
          'Erklaerungswille (-): Kein Bewusstsein, etwas rechtlich Erhebliches zu erklaeren',
          'Literaturmeinung: WE trotz fehlendem Erklaerungswillen bei Fahrlaessigkeit',
          'Hier (-): E war mit Gepflogenheiten nicht vertraut, keine Fahrlaessigkeit',
          'Ergebnis: Kein Gebot des E',
        ],
        explanation:
          'Dies ist der klassische Fall zur Pruefung des inneren Tatbestands der Willenserklaerung. Der aeussere Tatbestand liegt vor (objektiv sieht es wie ein Gebot aus), aber der Erklaerungswille fehlt. Auch die erweiterte Literaturmeinung hilft nicht, da E die Gepflogenheiten nicht kannte.',
      },
      {
        id: 'we-q7',
        type: 'fill-blank',
        question: 'Bei der Versteigerung kommt der Vertrag durch Gebot und ___ zustande (ss ___).',
        options: ['Zuschlag, 156', 'Annahme, 145', 'Zuschlag, 145', 'Annahme, 156'],
        correctAnswer: 'Zuschlag, 156',
        explanation:
          'Die Versteigerung ist ein Sonderfall des Kaufvertrags. Der Vertrag kommt durch Gebot (= Angebot) und Zuschlag (= Annahme) zustande, gemaess ss 156 BGB.',
      },
      {
        id: 'we-q8',
        type: 'multiple-choice',
        question:
          'Wie ist es rechtlich zu bewerten, wenn ein Geschaeftsinhaber einen Artikel mit Preisschild im Schaufenster ausstellt?',
        options: [
          'Es handelt sich um ein bindendes Angebot an jedermann',
          'Es handelt sich um eine invitatio ad offerendum',
          'Es handelt sich um eine Annahme eines kuenftigen Angebots',
          'Es handelt sich um einen aufschiebend bedingten Vertrag',
        ],
        correctAnswer: 'Es handelt sich um eine invitatio ad offerendum',
        explanation:
          'Die Schaufensterauslage ist kein bindendes Angebot, sondern eine invitatio ad offerendum (Einladung zur Abgabe eines Angebots). Sonst koennten mehrere Personen gleichzeitig annehmen, was zu mehreren Kaufvertraegen fuehren wuerde, obwohl der Gegenstand nur einmal uebereignet werden kann.',
      },
      {
        id: 'we-q9',
        type: 'multiple-choice',
        question: 'Was passiert bei fehlendem Handlungswillen?',
        options: [
          'Die WE ist wirksam, aber anfechtbar',
          'Die WE ist unwirksam (keine WE)',
          'Die WE wird einer anderen Person zugerechnet',
          'Die WE ist schwebend unwirksam',
        ],
        correctAnswer: 'Die WE ist unwirksam (keine WE)',
        explanation:
          'Ohne Handlungswille liegt keine Willenserklaerung vor. Beispiel: Reflexbewegung im Schlaf. Im Gegensatz dazu fuehrt das Fehlen des Geschaeftswillens nur zur Anfechtbarkeit (ssss 119 I, 122).',
      },
      {
        id: 'we-q10',
        type: 'multiple-choice',
        question: 'Ist Schweigen grundsaetzlich eine Willenserklaerung?',
        options: [
          'Ja, Schweigen gilt immer als Zustimmung',
          'Nein, Schweigen ist grundsaetzlich keine WE, da der Erklaerungstatbestand fehlt',
          'Ja, aber nur bei Kaufvertraegen',
          'Nein, es sei denn, der Schweiger ist Kaufmann',
        ],
        correctAnswer:
          'Nein, Schweigen ist grundsaetzlich keine WE, da der Erklaerungstatbestand fehlt',
        explanation:
          'Grundsatz: Schweigen ist keine WE. Ausnahmen bestehen beim normierten Schweigen (z.B. ssss 516 II 2, 362 I HGB) und beim beredten Schweigen (vorherige Vereinbarung der Parteien). Sonderfall: Kaufmaennisches Bestaetigungsschreiben (KBS).',
      },
      {
        id: 'we-q11',
        type: 'match-pairs',
        question: 'Ordnen Sie die Paragraphen den richtigen Regelungen zu:',
        options: [
          'ss 145 :: Bindung an den Antrag',
          'ss 146 :: Erloeschen des Angebots',
          'ss 150 I :: Verspaetete Annahme = neues Angebot',
          'ss 150 II :: Annahme unter Aenderungen = Ablehnung + neues Angebot',
        ],
        correctAnswer: [
          'ss 145 :: Bindung an den Antrag',
          'ss 146 :: Erloeschen des Angebots',
          'ss 150 I :: Verspaetete Annahme = neues Angebot',
          'ss 150 II :: Annahme unter Aenderungen = Ablehnung + neues Angebot',
        ],
        explanation:
          'Diese Paragraphen regeln den Vertragsschluss: ss 145 (Bindungswirkung), ss 146 (Erloeschen), ss 148 (Fristbestimmung), ss 150 I (verspaetete Annahme), ss 150 II (Annahme mit Aenderungen).',
      },
    ],
  },

  // ───────────────────────────────────────────────
  // Exam Tasks
  // ───────────────────────────────────────────────
  examTasks: [
    // ─── Fall 2: Versteigerung ───
    {
      id: 'fall-2-versteigerung',
      title: 'Fall 2: Versteigerung (Willenserklaerung)',
      points: 15,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              E erfuellt sich einen Kindheitstraum und besucht zum ersten Mal eine Versteigerung. Mit den
              Gepflogenheiten einer solchen Veranstaltung ist er nicht vertraut. Als er den Versteigerungssaal
              betritt, nickt ihm ein Bekannter zur Begruessung laechelnd entgegen. E hebt entzueckt den Arm
              und winkt seinerseits gruessend zurueck. Im selben Moment erteilt der Auktionator A dem E den
              Zuschlag (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 156 BGB</span>)
              fuer 100 Regenschirme gegen Zahlung von 20 &euro;. E wusste nicht, dass das Armheben in einer
              Versteigerung als Abgabe eines Kaufgebots gewertet wird.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat der Auktionator gegen E einen Anspruch auf Kaufpreiszahlung
            gemaess <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>?
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-2-a',
          type: 'free-text',
          question:
            'a) Liegt ein Angebot (Gebot) des E vor? Pruefen Sie den aeusseren und inneren Tatbestand der Willenserklaerung.',
          placeholder: 'Fraglich ist, ob E ein Gebot unterbreitet hat ...',
          modelAnswer:
            'Ein Gebot des E scheitert nicht schon am mangelnden aeusseren Tatbestand der Willenserklaerung. Von aussen betrachtet laesst das Armheben des E aus der Sicht eines objektiven Dritten (Empfaengerhorizont) auf ein Kaufgebot schliessen. Fraglich erscheint jedoch, ob der innere Tatbestand vorliegt. E hatte beim Armheben das grundsaetzliche Bewusstsein zu handeln, also einen Handlungswillen (+). Weitere Voraussetzung ist das Vorliegen eines Erklaerungswillens. E hatte beim Heben des Armes nicht das Bewusstsein, hierdurch irgendetwas rechtlich Erhebliches zu erklaeren. Der erforderliche Erklaerungswille fehlt.',
          keyPoints: [
            'Aeusserer Tatbestand (+): Armheben = objektiv ein Gebot',
            'Handlungswille (+): Bewusstsein zu handeln',
            'Erklaerungswille (-): Kein Bewusstsein, rechtlich Erhebliches zu erklaeren',
          ],
          explanation:
            'Der Fall prueft den inneren Tatbestand der Willenserklaerung. Der aeussere Tatbestand liegt vor, aber der Erklaerungswille fehlt.',
        },
        {
          id: 'fall-2-b',
          type: 'free-text',
          question:
            'b) Koennte trotz fehlenden Erklaerungswillens eine WE vorliegen? (Literaturmeinung)',
          placeholder: 'Eine Literaturmeinung nimmt an ...',
          modelAnswer:
            'Eine Literaturmeinung nimmt dennoch ausnahmsweise trotz Fehlens des Erklaerungswillens eine Willenserklaerung an, wenn der Erklaerende fahrlaessig verkannt hat, dass sein Handeln als Willenserklaerung gewertet werden kann. E war mit den Gepflogenheiten einer Versteigerung aber nicht vertraut und wusste nicht, welche rechtlichen Folgen ein Armheben haben kann bzw. hat. Er konnte bei Anwendung der im Verkehr erforderlichen Sorgfalt nicht erkennen, dass sein Verhalten als Willenserklaerung gewertet wird. Demnach ist wegen des fehlenden Erklaerungswillens nicht von einer Willenserklaerung, also einem Gebot des E auszugehen.',
          keyPoints: [
            'Literaturmeinung: WE (+) bei fahrlaessiger Verkennung',
            'Hier: E war mit Gepflogenheiten nicht vertraut',
            'Keine Fahrlaessigkeit bei Anwendung der Sorgfalt',
            'Ergebnis: Kein Gebot des E',
          ],
          explanation:
            'Auch die erweiterte Literaturmeinung hilft nicht, da E keine Fahrlaessigkeit vorgeworfen werden kann.',
        },
        {
          id: 'fall-2-c',
          type: 'free-text',
          question: 'c) Wie lautet das Ergebnis?',
          placeholder: 'A hat gegen E ...',
          modelAnswer:
            'Also besteht kein Kaufvertrag zwischen A und E. Demnach ist der Anspruch nicht entstanden. A hat gegen E keinen Anspruch auf Kaufpreiszahlung gemaess ss 433 II.',
          keyPoints: [
            'Kein Kaufvertrag (kein Gebot = kein Angebot)',
            'Anspruch nicht entstanden',
            'A gegen E Kaufpreiszahlung gemaess ss 433 II (-)',
          ],
          explanation: 'Ohne Gebot (Angebot) kein Kaufvertrag, ohne Kaufvertrag kein Anspruch.',
        },
      ],
    },

    // ─── Fall 4: Boutique / Invitatio ───
    {
      id: 'fall-4-boutique',
      title: 'Fall 4: Boutique (Invitatio ad offerendum)',
      points: 15,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              Die Freundinnen X und Y stehen kaufrauschbesetzt vor dem Schaufenster der In-Boutique G.
              Beide erblicken einen Schlangenleder-Lederguertel fuer 100 &euro; mit dem Hinweiszettel
              &bdquo;Einzelstueck&ldquo; und stuerzen in den Verkaufsraum. Zuerst ruft X, dann auch Y dem
              anwesenden Geschaeftsinhaber G frohmuetig entgegen: &bdquo;Ich kaufe den Guertel aus dem
              Schaufenster!&ldquo; G wendet sich mit einem lapidaren &bdquo;OK&ldquo; an Y, entnimmt den
              Guertel der Auslage und will ihn der Y aushaendigen. X ist mit dieser Vorgehensweise gar
              nicht einverstanden und fordert die Uebereignung des Guertels.
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat X gegen G einen Anspruch auf Uebereignung des Guertels gemaess{' '}
            <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 I 1</span>?
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-4-a',
          type: 'free-text',
          question:
            'a) Hat G durch das Ausstellen des Guertels im Schaufenster ein Angebot abgegeben? (Invitatio ad offerendum)',
          placeholder: 'Fraglich ist, ob G ein Angebot unterbreitet hat ...',
          modelAnswer:
            'Moeglicherweise fehlt bereits der aeussere Tatbestand der Willenserklaerung. Im Ausstellen eines Artikels im Schaufenster eines Geschaefts ist schon aeusserlich keine Willenserklaerung zu erkennen. Es fehlt an der objektiven Entaeusserung eines Geschaeftswillens. Wuerde man das Ausstellen insgesamt als Angebot werten, bestuende etwa die Moeglichkeit, dass zwei oder mehrere Personen gleichzeitig entaeussern, sie wollen das Angebot annehmen. Dies haette zur Folge, dass mehrere Kaufvertraege bestuenden. Der Verkaeufer kann den Kaufgegenstand jedoch nur einmal uebereignen. In der Ausstellung eines Artikels im Schaufenster ist deshalb nicht ein Angebot, sondern lediglich eine Aufforderung oder Einladung zum Angebot zu sehen (invitatio ad offerendum). Schon mangels aeusseren Tatbestandes der Willenserklaerung hat G kein Angebot erklaert.',
          keyPoints: [
            'Aeusserer Tatbestand (-): Keine Willenserklaerung erkennbar',
            'Problem: Mehrere gleichzeitige Annahmen moeglich',
            'Folge: Mehrere Kaufvertraege, aber nur einmal uebereignen',
            'Ergebnis: Invitatio ad offerendum, kein Angebot',
          ],
          explanation:
            'Die Schaufensterauslage ist eine invitatio ad offerendum, kein bindendes Angebot.',
        },
        {
          id: 'fall-4-b',
          type: 'free-text',
          question: 'b) Wer hat dann das Angebot abgegeben?',
          placeholder: 'Das Angebot zum Kaufvertragsschluss koennte durch X erklaert worden sein ...',
          modelAnswer:
            'Das Angebot zum Kaufvertragsschluss koennte durch X erklaert worden sein. X hat gegenueber G im Laden entaeussert: "Ich kaufe den Guertel aus dem Schaufenster!" Da das Ausstellen der Ware lediglich eine invitatio ad offerendum darstellt, kann der entaeusserte Kaufwunsch der X nur als Angebot gewertet werden.',
          keyPoints: [
            'X hat das Angebot abgegeben (nicht G)',
            'Kaufwunsch im Laden = Angebot des Kunden',
            'Grund: Ausstellen = nur invitatio ad offerendum',
          ],
          explanation:
            'Da das Ausstellen nur eine Einladung ist, geht das Angebot vom Kunden aus, der den Kaufwunsch aeussert.',
        },
        {
          id: 'fall-4-c',
          type: 'free-text',
          question: 'c) Hat G das Angebot der X angenommen?',
          placeholder: 'Fraglich ist, ob G das Angebot der X angenommen hat ...',
          modelAnswer:
            'Fraglich ist aber, ob G das Angebot der X auch angenommen hat. G ist nicht verpflichtet, auf ein auf einer invitatio ad offerendum basierendes Angebot einer kaufwilligen Person die Annahme zu erklaeren. Er ist in seiner Entscheidung frei, ob er ein Angebot annehmen will. Ausserdem steht es ihm frei, das Angebot einer anderen Person anzunehmen. G hat sich dazu entschieden, nicht das Angebot der X, sondern das Angebot der Y anzunehmen. Eine Annahme des Angebots der X liegt demnach nicht vor. Also besteht kein Kaufvertrag zwischen X und G. X hat gegen G keinen Anspruch auf Uebereignung des Guertels gemaess ss 433 I 1.',
          keyPoints: [
            'G ist bei Invitatio nicht verpflichtet, Angebot anzunehmen',
            'Vertragsfreiheit: G kann frei waehlen',
            'G hat Angebot der Y (nicht X) angenommen',
            'Kein Kaufvertrag X-G, Ergebnis: Anspruch (-)',
          ],
          explanation:
            'Bei der Invitatio ad offerendum ist der Geschaeftsinhaber frei in seiner Entscheidung, welches Angebot er annimmt.',
        },
      ],
    },

    // ─── Fall 12: Waermeflasche / Fristen ───
    {
      id: 'fall-12-waermeflasche',
      title: 'Fall 12: Waermeflasche (Fristen & verspaetete Annahme)',
      points: 20,
      context: (
        <div className="space-y-3">
          <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-300">
            <p>
              Dem Sammler S liegt ein schriftliches Angebot des V vom 03.01. vor, der ein von S lange
              ersehntes Exemplar einer Waermeflasche fuer 100 &euro; verkaufen moechte. V hat das Angebot
              bis zum 15.01. befristet. Die Bemuehungen des S, am 15.01. telefonisch mit V Kontakt
              aufzunehmen, scheitern. Deshalb fertigt S eine schriftliche Annahmeerklaerung, die er
              gegen 21:00 Uhr in den Briefkasten des V einwirft. Am 16.01. nimmt V vormittags von dem
              Brief Kenntnis. Sofort ruft er bei S an und spricht auf dessen Anrufbeantworter:
              &bdquo;Leider hast du die Frist versaeumt. Ich schicke dir die Waermeflasche, will jetzt
              aber 120 &euro; haben.&ldquo; Anschliessend packt er die Waermeflasche ein und uebersendet
              sie an S. Auch die Nachricht nimmt S wahr. Er erklaert: &bdquo;Ich will das Stueck auf
              jeden Fall behalten.&ldquo;
            </p>
          </div>
          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Frage:</strong> Hat V gegen S einen Kaufpreisanspruch in Hoehe von 120 &euro; oder 100 &euro;
            gemaess <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">&sect; 433 II</span>?
          </div>
        </div>
      ),
      parts: [
        {
          id: 'fall-12-a',
          type: 'free-text',
          question: 'a) Liegt ein Angebot des V vor?',
          placeholder: 'V hat gegenueber S ...',
          modelAnswer:
            'V hat gegenueber S ein Angebot zum Kauf der Waermeflasche fuer 100 Euro unterbreitet. Das schriftliche Angebot ist bis zum 15.01. befristet (ss 148 BGB).',
          keyPoints: [
            'Schriftliches Angebot des V ueber 100 Euro',
            'Befristung bis 15.01. (ss 148 BGB)',
          ],
          explanation: 'Das Angebot des V liegt unproblematisch vor.',
        },
        {
          id: 'fall-12-b',
          type: 'free-text',
          question:
            'b) Hat S das Angebot fristgerecht angenommen? Pruefen Sie Abgabe und Zugang der Annahmeerklaerung.',
          placeholder: 'S muesste das Angebot des V angenommen haben ...',
          modelAnswer:
            'S muesste das Angebot des V angenommen haben. Zunaechst muesste er die Annahmeerklaerung abgegeben haben. S hat die Annahmeerklaerung in den Briefkasten des V eingeworfen, also abgegeben (+). Ausserdem muesste die Annahmeerklaerung dem V zugegangen sein. V hat bezueglich der Annahme eine Frist bis zum 15.01. gesetzt (ss 148). S hat die Annahmeerklaerung am 15.01. gegen 21:00 Uhr in den Briefkasten des V eingeworfen. Der Brief ist damit rechtzeitig in den Herrschaftsbereich des V gelangt. Allerdings ist unter normalen Umstaenden erst am naechsten Morgen (16.01.) mit der Kenntnisnahme zu rechnen, weil Briefkaesten ueblicherweise nicht am Abend, sondern am folgenden Tag geleert werden. Somit ist der Zugang und damit die Annahme nicht innerhalb der gesetzten Frist erfolgt. S hat das Angebot des V nicht rechtzeitig angenommen.',
          keyPoints: [
            'Abgabe (+): Einwurf in Briefkasten',
            'Zugang (-): Erst am 16.01. unter normalen Umstaenden',
            'Briefkaesten werden ueblicherweise erst am Folgetag geleert',
            'Frist (15.01.) nicht eingehalten',
          ],
          explanation:
            'Der entscheidende Punkt: Obwohl der Brief am 15.01. in den Briefkasten gelangt, ist unter normalen Umstaenden erst am 16.01. mit Kenntnisnahme zu rechnen.',
        },
        {
          id: 'fall-12-c',
          type: 'free-text',
          question:
            'c) Liegt durch die verspaetete Annahme ein neues Angebot des S vor (ss 150 I)?',
          placeholder: 'Seitens S koennte ein neues Angebot vorliegen ...',
          modelAnswer:
            'Seitens S koennte jedoch ein neues Angebot bezueglich des Kaufs der Waermeflasche fuer 100 Euro vorliegen. Gemaess ssss 146, 148 erlischt das urspruengliche Angebot, wenn es nicht fristgerecht angenommen wird. S hat das Angebot des V verspaetet angenommen. ss 150 I bestimmt, dass die verspaetete Annahme eines Antrags als neues Angebot zu werten ist. Die erst am 16.01. erfolgte, also verspaetete Annahme durch S stellt somit ein neues Angebot zum Kauf der Waermeflasche in Hoehe desselben Kaufpreises (100 Euro) dar.',
          keyPoints: [
            'Urspruengliches Angebot erloschen (ssss 146, 148)',
            'ss 150 I: Verspaetete Annahme = neues Angebot',
            'Neues Angebot des S: Waermeflasche fuer 100 Euro',
          ],
          explanation:
            'Die verspaetete Annahme wird kraft Gesetzes (ss 150 I) als neues Angebot behandelt.',
        },
        {
          id: 'fall-12-d',
          type: 'free-text',
          question:
            'd) Hat V das neue Angebot angenommen oder liegt ein Gegenangebot vor (ss 150 II)?',
          placeholder: 'Fraglich erscheint, ob V das neue Angebot des S angenommen hat ...',
          modelAnswer:
            'Fraglich erscheint, ob V das neue Angebot des S angenommen hat. Gemaess ss 150 II gilt die Annahme unter Aenderungen als Ablehnung des Angebots. V hat nicht die Annahme des Angebots fuer 100 Euro erklaert. Er hat die Waermeflasche an S geschickt und nunmehr 120 Euro verlangt. Das Angebot des S gilt als abgelehnt. Gemaess ss 150 II gilt die Annahme unter Aenderungen jedoch nicht nur als Ablehnung, sondern auch als neues Angebot. V hat also ein wiederum neues Angebot in Hoehe von 120 Euro erklaert. Dieses Angebot hat S angenommen, indem er erklaerte, er wolle die Waermeflasche auf jeden Fall behalten. Damit hat er signalisiert, dass er mit dem Preis von 120 Euro einverstanden ist. Also besteht ein Kaufvertrag ueber 120 Euro. V hat gegen S einen Anspruch auf Kaufpreiszahlung in Hoehe von 120 Euro gemaess ss 433 II.',
          keyPoints: [
            'V hat nicht das 100-Euro-Angebot angenommen',
            'ss 150 II: Annahme mit Aenderung = Ablehnung + neues Angebot',
            'Neues Angebot des V: 120 Euro',
            'S nimmt an: "Ich will das Stueck auf jeden Fall behalten"',
            'Ergebnis: Kaufvertrag ueber 120 Euro',
          ],
          explanation:
            'Durch die Kette verspaetete Annahme (ss 150 I) und Gegenangebot (ss 150 II) kommt letztlich ein Vertrag ueber 120 Euro zustande.',
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
      id: 'anfechtung',
      title: 'Anfechtung & Verjaehrung',
      relationship: 'builds on',
    },
  ],
}
