// src/content/wirtschaftsrecht/topics/gesellschaftsrecht.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { GesellschaftsformenMatrix } from '../diagrams/GesellschaftsformenMatrix'

const kaufmannsartenDiagram = `flowchart TD
  KM["Kaufmann<br/>§§ 1 ff. HGB"] --> MK["Muss-Kaufmann<br/>§ 1 II"]
  KM --> KK["Kann-Kaufmann<br/>§ 2"]
  KM --> FK["Kaufmann kraft<br/>Rechtsform § 6 II"]
  MK --> MKD["Gewerbetreibender über<br/>Kleingewerbe hinaus.<br/>HR-Eintragung deklaratorisch (§ 29)"]
  KK --> KKD["Kleingewerbetreibender,<br/>freiwillige HR-Eintragung<br/>= konstitutiv"]
  FK --> FKD["Juristische Personen:<br/>OHG, KG, GmbH, AG<br/>sind Kaufleute kraft Rechtsform"]

  style KM fill:#1e40af,stroke:#3b82f6,color:#fff
  style MK fill:#065f46,stroke:#10b981,color:#fff
  style KK fill:#92400e,stroke:#f59e0b,color:#fff
  style FK fill:#7c2d12,stroke:#ea580c,color:#fff
`

const rechtsformenDiagram = `flowchart TD
  RF["Rechtsformen<br/>(Numerus Clausus)"] --> PG["Personengesellschaften"]
  RF --> KG_["Kapitalgesellschaften"]

  PG --> PGM["Persönlichkeit der<br/>Gesellschafter im Vordergrund"]
  PG --> PGA["Selbstorganschaft"]
  PG --> PGH["Persönliche Haftung"]

  KG_ --> KGM["Kapitalmäßige Beteiligung<br/>im Vordergrund"]
  KG_ --> KGA["Fremdorganschaft (Organe)"]
  KG_ --> KGH["Haftung beschränkt auf<br/>Gesellschaftsvermögen"]

  PG --> GBR["GbR § 705 BGB"]
  PG --> OHG["OHG § 105 HGB"]
  PG --> KGES["KG § 161 HGB"]

  KG_ --> GMBH["GmbH (GmbHG)"]
  KG_ --> AG["AG (AktG)"]
  KG_ --> KGAA["KGaA § 278 AktG"]

  style RF fill:#1e40af,stroke:#3b82f6,color:#fff
  style PG fill:#065f46,stroke:#10b981,color:#fff
  style KG_ fill:#92400e,stroke:#f59e0b,color:#fff
`

const haftungDiagram = `flowchart TD
  HF["Haftung der Gesellschafter"] --> PGH["Personengesellschaften"]
  HF --> KGH["Kapitalgesellschaften"]

  PGH --> GBR_H["GbR: Persönlich<br/>& unbeschränkt"]
  PGH --> OHG_H["OHG: Persönlich<br/>& unbeschränkt<br/>mit Privatvermögen"]
  PGH --> KG_H["KG"]
  KG_H --> KOMP["Komplementär:<br/>Unbeschränkt persönlich"]
  KG_H --> KOMM["Kommanditist:<br/>Nur bis zur Einlage"]

  KGH --> GMBH_H["GmbH: Nur mit<br/>Gesellschaftsvermögen<br/>(Stammkapital 25.000 €)"]
  KGH --> AG_H["AG: Nur mit<br/>Gesellschaftsvermögen<br/>(Grundkapital 50.000 €)"]
  KGH --> UG_H["UG: Wie GmbH,<br/>ab 1 € Stammkapital"]

  style HF fill:#1e40af,stroke:#3b82f6,color:#fff
  style PGH fill:#991b1b,stroke:#ef4444,color:#fff
  style KGH fill:#065f46,stroke:#10b981,color:#fff
  style KOMP fill:#991b1b,stroke:#ef4444,color:#fff
  style KOMM fill:#065f46,stroke:#10b981,color:#fff
`

export const gesellschaftsrechtTopic: Topic = {
  id: 'gesellschaftsrecht',
  title: 'Handels- und Gesellschaftsrecht',
  description: 'HGB-Grundlagen, Kaufmannsbegriff, Personengesellschaften, Kapitalgesellschaften, Haftung',
  icon: '🏢',
  examNotes: 'Haftung ist DER Klausurhit: Wer haftet persönlich, wer nur mit Einlage?',

  sections: [
    {
      id: 'hgb-grundlagen',
      title: 'HGB-Grundlagen & Kaufmannsbegriff',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Handelsrecht (§§ 1 ff. HGB)</h4>
            <p className="text-sm text-slate-300">
              Das HGB <strong>modifiziert bzw. ersetzt</strong> zum Teil das BGB, um eine schnellere
              Abwicklung und Rechtssicherheit zu schaffen. Adressat des HGB sind
              <strong> Kaufleute</strong> (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 1 ff.</span>) bzw.
              Gesellschaften (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 6</span>).
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Sonderregelungen des HGB gegenüber dem BGB</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">HGB</th>
                    <th className="text-left py-2 px-3">BGB</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">Handelsbräuche (§ 346)</td>
                    <td className="py-2 px-3">Verkehrssitte (§§ 157, 242)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">Sorgfalt eines ordentlichen Kaufmanns (§ 347)</td>
                    <td className="py-2 px-3">Im Verkehr erforderliche Sorgfalt (§ 276)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">Vertragsstrafe: Keine Herabsetzung (§ 348)</td>
                    <td className="py-2 px-3">Herabsetzung möglich (§ 343)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Keine Einrede der Vorausklage (§ 349)</td>
                    <td className="py-2 px-3">Bürge hat Einrede der Vorausklage (§ 771)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Kaufmannsbegriff</h4>
            <p className="text-sm text-slate-300 mb-3">
              Kaufmann ist jeder <strong>Gewerbetreibende</strong> &mdash; mit Ausnahme der Kleingewerbetreibenden,
              deren Unternehmen nach Art oder Umfang einen kaufmännischen Geschäftsbetrieb nicht erfordert.
            </p>
            <p className="text-sm text-slate-300">
              <strong>Gewerbe:</strong> Nach außen erkennbare, erlaubte, selbstständige, planmäßige,
              auf gewisse Dauer mit Gewinnerzielungsabsicht ausgeübte Tätigkeit, die KEIN freier Beruf ist.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-300 mb-1">Muss-Kaufmann (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 1 II</span>)</h4>
              <p className="text-sm text-slate-300">
                Gewerbetreibender über Kleingewerbe hinaus. Ist zwingend Kaufmann.
                HR-Eintragung ist <strong>deklaratorisch</strong> (§ 29).
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-1">Kann-Kaufmann (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 2</span>)</h4>
              <p className="text-sm text-slate-300">
                Kleingewerbetreibender, der sich freiwillig ins HR eintragen lässt.
                HR-Eintragung ist <strong>konstitutiv</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-300 mb-1">Kaufmann kraft Rechtsform (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 6 II</span>)</h4>
              <p className="text-sm text-slate-300">
                Juristische Personen als Handelsgesellschaften sind kraft ihrer Rechtsform Kaufleute
                (Formkaufmann). OHG und KG sind Kaufleute.
              </p>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Deklaratorisch vs. konstitutiv bei der HR-Eintragung
            nicht verwechseln! Beim Muss-Kaufmann ist die Eintragung nur deklaratorisch (er ist
            auch ohne Eintragung Kaufmann), beim Kann-Kaufmann ist sie konstitutiv (er wird erst
            durch Eintragung zum Kaufmann).
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Hilfspersonen der Kaufleute</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-900/20 rounded">
                <strong className="text-blue-300">Unselbstständig</strong>
                <ul className="list-disc list-inside text-slate-400 mt-1 space-y-1">
                  <li>Prokurist (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 48 ff.</span>)</li>
                  <li>Handelsbevollmächtigter (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 54</span>)</li>
                  <li>Ladenangestellter (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 56</span>)</li>
                </ul>
              </div>
              <div className="p-3 bg-amber-900/20 rounded">
                <strong className="text-amber-300">Selbstständig</strong>
                <ul className="list-disc list-inside text-slate-400 mt-1 space-y-1">
                  <li>Handelsvertreter (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 84 ff.</span>)</li>
                  <li>Handelsmakler (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 93 ff.</span>)</li>
                  <li>Kommissionär (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 383 ff.</span>)</li>
                </ul>
              </div>
            </div>
          </div>

          <MermaidDiagram chart={kaufmannsartenDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'personengesellschaften',
      title: 'Personengesellschaften (GbR, OHG, KG)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Merkmale von Personengesellschaften</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Persönlichkeit der Gesellschafter steht im Vordergrund</li>
              <li>Vom Bestand der Gesellschafter abhängig</li>
              <li>Persönliche Mitarbeit und <strong>Selbstorganschaft</strong></li>
              <li><strong>Persönliche Haftung</strong> der Gesellschafter für Schulden der Gesellschaft</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-2">GbR &mdash; Gesellschaft bürgerlichen Rechts (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 705 ff. BGB</span>)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>Zusammenschluss von mind. zwei Personen &bdquo;zur Förderung eines gemeinsamen Zweckes&ldquo;</li>
                <li>Kein Handelsgewerbe i.S.d. § 1 II HGB (sonst wird es eine OHG)</li>
                <li>Gesellschaftsvertrag formfrei; auch konkludent möglich (z.B. Schülerband)</li>
                <li>Gesamthänderische Beteiligung am Gesellschaftsvermögen</li>
                <li className="text-red-300"><strong>Haftung: Persönlich und unbeschränkt</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">OHG &mdash; Offene Handelsgesellschaft (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 105 ff. HGB</span>)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>&bdquo;Große Schwester&ldquo; der GbR: Personenhandelsgesellschaft</li>
                <li>Mind. zwei Personen betreiben unter gemeinsamer Firma ein Handelsgewerbe</li>
                <li>HR-Eintrag erforderlich (Abt. A)</li>
                <li>Gewinnbeteiligung: 4% des Kapitals, Rest nach Köpfen (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 121 HGB</span>)</li>
                <li>Geschäftsführung durch jeden Gesellschafter einzeln (wenn nicht anders vereinbart)</li>
                <li className="text-red-300"><strong>Haftung: Persönlich und unbeschränkt mit Privatvermögen</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-amber-300 mb-2">KG &mdash; Kommanditgesellschaft (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 161 ff. HGB</span>)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>Mind. ein Komplementär (Vollhafter) + mind. ein Kommanditist (Teilhafter)</li>
                <li>HR-Eintrag erforderlich (Abt. A)</li>
                <li>Geschäftsführung allein durch Komplementär; Kommanditisten ausgeschlossen (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 164 HGB</span>)</li>
                <li className="text-red-300"><strong>Komplementär: Unbeschränkt persönlich haftend</strong></li>
                <li className="text-green-300"><strong>Kommanditist: Nur bis zur Höhe der Kommanditeinlage</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">GmbH &amp; Co. KG</h4>
              <p className="text-sm text-slate-300">
                Sonderform der KG, bei der die Stellung des Komplementärs durch eine <strong>GmbH</strong>
                ausgefüllt wird. Die GmbH haftet als Komplementärin zwar unbeschränkt, ist aber selbst
                haftungsbeschränkt. Somit: <strong>Personengesellschaft mit beschränkter Haftung</strong>.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die GbR wird zur OHG, sobald das Unternehmen nach Art und
            Umfang einen kaufmännischen Geschäftsbetrieb erfordert. &bdquo;Große Schwester&ldquo;-Prinzip.
          </div>

          <MermaidDiagram chart={haftungDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'kapitalgesellschaften',
      title: 'Kapitalgesellschaften (GmbH, AG)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-300 mb-2">Merkmale von Kapitalgesellschaften</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Kapitalmäßige Beteiligung steht im Vordergrund</li>
              <li>Unabhängig vom Bestand der Gesellschafter</li>
              <li>Handelt durch Organe (<strong>Fremdorganschaft</strong>)</li>
              <li>Juristische Personen mit eigener Rechtspersönlichkeit</li>
              <li><strong>Haftung beschränkt</strong> auf das Gesellschaftsvermögen</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-green-300 mb-2">GmbH &mdash; Gesellschaft mit beschränkter Haftung</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Gründung:</strong> Durch eine oder mehrere Personen; notarieller Gesellschaftsvertrag (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 2 GmbHG</span>). Vereinfachtes Verfahren mit Musterprotokoll bei kleinen Gesellschaften.</p>
              <p><strong>Mindestkapital:</strong> <span className="text-amber-300 font-bold">25.000 &euro;</span> Stammkapital</p>
              <p><strong>Firma:</strong> Muss &bdquo;GmbH&ldquo; enthalten</p>
              <p><strong>Entstehung:</strong> Als juristische Person durch Eintragung ins Handelsregister. Formkaufmann (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 13 III GmbHG i.V.m. § 6 HGB</span>).</p>
              <p><strong>Organe:</strong> Gesellschafterversammlung + Geschäftsführer (+ ggf. Aufsichtsrat, <span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 52 GmbHG</span>)</p>
              <p className="text-green-300"><strong>Haftung:</strong> Nur mit dem Gesellschaftsvermögen. In wenigen Ausnahmen &bdquo;Durchgriff&ldquo; auf Gesellschafter möglich.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">AG &mdash; Aktiengesellschaft</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Gründung:</strong> Durch Umwandlung oder Gründung. Gründer = Aktionäre, die Satzung feststellen.</p>
              <p><strong>Mindestkapital:</strong> <span className="text-amber-300 font-bold">50.000 &euro;</span> Grundkapital (in Aktien zerlegt)</p>
              <p><strong>Firma:</strong> Muss &bdquo;AG&ldquo; enthalten. Formkaufmann (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 3 AktG</span>).</p>
              <p><strong>Organe (drei!):</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-slate-400">
                <li><strong>Vorstand:</strong> Leitet unter eigener Verantwortung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 76 AktG</span>) &mdash; kein Weisungsrecht der Aktionäre!</li>
                <li><strong>Aufsichtsrat:</strong> Bestellt/beruft Vorstand ab, überwacht Geschäftsführung (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 111 AktG</span>)</li>
                <li><strong>Hauptversammlung:</strong> Grundlagengeschäfte (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 119 AktG</span>)</li>
              </ul>
              <p className="text-green-300"><strong>Haftung:</strong> Nur mit dem Gesellschaftsvermögen.</p>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Der Vorstand einer AG unterliegt KEINEM Weisungsrecht
            der Aktionäre (§ 76 AktG: eigene Verantwortung). Anders als der Geschäftsführer einer
            GmbH, der weisungsgebunden ist!
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> In der Praxis wird die Haftungsbeschränkung der GmbH
            oft durch persönliche Bürgschaft des Gesellschafters für Firmenkredite faktisch
            aufgehoben. Die Einpersonen-GmbH ist häufig.
          </div>

          <MermaidDiagram chart={rechtsformenDiagram} className="bg-slate-800/50 rounded-lg p-4" />
        </div>
      ),
    },
    {
      id: 'sonderformen',
      title: 'Sonderformen (UG, KGaA, SE, Ltd.)',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-green-300 mb-2">UG (haftungsbeschränkt) &mdash; Unternehmergesellschaft</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li>Keine neue Rechtsform, sondern <strong>GmbH mit geringerem Mindestkapital</strong> (ab 1 &euro;)</li>
              <li>Eingeführt durch MoMiG (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§ 5a GmbHG</span>)</li>
              <li>Pflicht: Jährlich 25% des Jahresüberschusses in Rücklage einstellen</li>
              <li>Bei Erreichen von 25.000 &euro; (Stammkapital + Rücklage): Umfirmierung zur GmbH möglich</li>
              <li>Existenzgründerfreundliche Variante</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-amber-300 mb-2">KGaA &mdash; Kommanditgesellschaft auf Aktien (<span className="px-1.5 py-0.5 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm font-mono">§§ 278 ff. AktG</span>)</h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li>Juristische Person, verbindet Elemente von AG und KG</li>
              <li>Persönlich haftende Gesellschafter (Komplementäre) statt Vorstand</li>
              <li>Kommanditaktionäre haften nur mit ihren Aktien</li>
              <li>Gilt als <strong>übernahmeresistent</strong> (Kontrolle nicht an Kapitalbeteiligung gekoppelt)</li>
              <li>Beispiele: Henkel KGaA, Merck KGaA, Borussia Dortmund GmbH &amp; Co. KGaA</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">SE (Societas Europaea)</h4>
              <p className="text-sm text-slate-300">
                Europäische Rechtsform für Aktiengesellschaften in der EU. Auch als
                &bdquo;Europa-AG&ldquo; bezeichnet. Ermöglicht grenzüberschreitende Gründung
                nach einheitlichen Rechtsprinzipien.
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-cyan-300 mb-2">Ltd. (Private Company Limited by shares)</h4>
              <p className="text-sm text-slate-300">
                Britische Kapitalgesellschaft, entspricht ca. einer GmbH.
                Vor Einführung der UG beliebt bei Gründern, die die GmbH-Mindesteinlage
                nicht aufbringen konnten. Sitz i.d.R. im Ausland.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die UG ist keine eigenständige Rechtsform, sondern eine
            GmbH mit besonderer Bezeichnung und geringerem Mindestkapital. Alle GmbH-Regeln gelten.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: GesellschaftsformenMatrix,
      },
    },
  ],

  quiz: {
    questions: [
      {
        id: 'gr-q1',
        type: 'match-pairs',
        question: 'Ordne die Gesellschaftsform der Eigenschaft zu:',
        options: [
          'GbR::Persönliche und unbeschränkte Haftung, kein HR-Eintrag',
          'OHG::Persönliche Haftung, HR-Eintrag erforderlich (Abt. A)',
          'GmbH::Haftung nur mit Gesellschaftsvermögen, 25.000 € Stammkapital',
          'AG::Drei Organe (Vorstand, Aufsichtsrat, HV), 50.000 € Grundkapital',
        ],
        correctAnswer: [
          'GbR::Persönliche und unbeschränkte Haftung, kein HR-Eintrag',
          'OHG::Persönliche Haftung, HR-Eintrag erforderlich (Abt. A)',
          'GmbH::Haftung nur mit Gesellschaftsvermögen, 25.000 € Stammkapital',
          'AG::Drei Organe (Vorstand, Aufsichtsrat, HV), 50.000 € Grundkapital',
        ],
        explanation: 'Jede Gesellschaftsform hat eigene Haftungsregeln, Mindestkapitalanforderungen und Organstrukturen.',
      },
      {
        id: 'gr-q2',
        type: 'multiple-choice',
        question: 'Wer haftet persönlich bei einer KG?',
        options: [
          'Nur der Komplementär',
          'Nur der Kommanditist',
          'Komplementär und Kommanditist gleichermaßen',
          'Niemand',
        ],
        correctAnswer: 'Nur der Komplementär',
        explanation: 'Der Komplementär (Vollhafter) haftet unbeschränkt persönlich. Der Kommanditist (Teilhafter) haftet nur bis zur Höhe seiner Kommanditeinlage.',
      },
      {
        id: 'gr-q3',
        type: 'multi-select',
        question: 'Welche Gesellschaftsformen sind juristische Personen?',
        options: [
          'GmbH',
          'AG',
          'GbR',
          'OHG',
          'KGaA',
          'UG (haftungsbeschränkt)',
        ],
        correctAnswer: ['GmbH', 'AG', 'KGaA', 'UG (haftungsbeschränkt)'],
        explanation: 'GmbH, AG, KGaA und UG sind juristische Personen (Kapitalgesellschaften). Die GbR und OHG sind Personengesellschaften ohne eigene Rechtspersönlichkeit im klassischen Sinne.',
      },
      {
        id: 'gr-q4',
        type: 'fill-blank',
        question: 'Das Mindestkapital einer GmbH beträgt ___ Euro.',
        options: ['25.000', '50.000', '1', '10.000'],
        correctAnswer: '25.000',
        explanation: 'Das Stammkapital einer GmbH beträgt mindestens 25.000 €. Bei der AG (Grundkapital) sind es 50.000 €, bei der UG ab 1 €.',
      },
      {
        id: 'gr-q5',
        type: 'multiple-choice',
        question: 'Was unterscheidet den Muss-Kaufmann vom Kann-Kaufmann?',
        options: [
          'Muss-Kaufmann: HR-Eintragung deklaratorisch; Kann-Kaufmann: HR-Eintragung konstitutiv',
          'Der Muss-Kaufmann muss eine GmbH gründen',
          'Der Kann-Kaufmann braucht kein Gewerbe',
          'Es gibt keinen Unterschied',
        ],
        correctAnswer: 'Muss-Kaufmann: HR-Eintragung deklaratorisch; Kann-Kaufmann: HR-Eintragung konstitutiv',
        explanation: 'Der Muss-Kaufmann (§ 1 II) ist auch ohne Eintragung Kaufmann (deklaratorisch). Der Kann-Kaufmann (§ 2) wird erst durch Eintragung zum Kaufmann (konstitutiv).',
      },
      {
        id: 'gr-q6',
        type: 'multiple-choice',
        question: 'Was ist die Besonderheit der GmbH & Co. KG?',
        options: [
          'Der Komplementär ist eine GmbH, wodurch faktisch beschränkte Haftung entsteht',
          'Es handelt sich um eine reine Kapitalgesellschaft',
          'Es gibt keine persönlich haftenden Gesellschafter',
          'Sie braucht kein Mindestkapital',
        ],
        correctAnswer: 'Der Komplementär ist eine GmbH, wodurch faktisch beschränkte Haftung entsteht',
        explanation: 'Bei der GmbH & Co. KG ist die Komplementärin eine GmbH, die zwar unbeschränkt haftet, aber selbst haftungsbeschränkt ist. Somit: Personengesellschaft mit beschränkter Haftung.',
      },
      {
        id: 'gr-q7',
        type: 'multiple-choice',
        question: 'Wie viele Organe hat eine AG?',
        options: [
          'Drei: Vorstand, Aufsichtsrat, Hauptversammlung',
          'Zwei: Geschäftsführer, Gesellschafterversammlung',
          'Eins: Vorstand',
          'Vier: Vorstand, Aufsichtsrat, HV, Beirat',
        ],
        correctAnswer: 'Drei: Vorstand, Aufsichtsrat, Hauptversammlung',
        explanation: 'Die AG hat drei Organe: Vorstand (leitet, § 76 AktG), Aufsichtsrat (überwacht, § 111 AktG) und Hauptversammlung (Grundlagengeschäfte, § 119 AktG). Die GmbH hat mindestens zwei Organe.',
      },
      {
        id: 'gr-q8',
        type: 'fill-blank',
        question: 'Die UG (haftungsbeschränkt) muss jährlich ___ % des Jahresüberschusses in eine Rücklage einstellen.',
        options: ['25', '50', '10', '75'],
        correctAnswer: '25',
        explanation: 'Die UG muss jährlich 25% des Jahresüberschusses in eine Rücklage einstellen, bis zusammen mit dem Stammkapital 25.000 € erreicht sind.',
      },
      {
        id: 'gr-q9',
        type: 'match-pairs',
        question: 'Ordne die Kaufmannsarten den Beschreibungen zu:',
        options: [
          'Muss-Kaufmann (§ 1 II)::Gewerbetreibender über Kleingewerbe, HR-Eintragung deklaratorisch',
          'Kann-Kaufmann (§ 2)::Kleingewerbetreibender, HR-Eintragung konstitutiv',
          'Formkaufmann (§ 6 II)::Juristische Person kraft Rechtsform (z.B. GmbH)',
        ],
        correctAnswer: [
          'Muss-Kaufmann (§ 1 II)::Gewerbetreibender über Kleingewerbe, HR-Eintragung deklaratorisch',
          'Kann-Kaufmann (§ 2)::Kleingewerbetreibender, HR-Eintragung konstitutiv',
          'Formkaufmann (§ 6 II)::Juristische Person kraft Rechtsform (z.B. GmbH)',
        ],
        explanation: 'Die drei Kaufmannsarten unterscheiden sich in den Voraussetzungen und der Wirkung der HR-Eintragung.',
      },
      {
        id: 'gr-q10',
        type: 'multiple-choice',
        question: 'Unterliegt der Vorstand einer AG einem Weisungsrecht der Aktionäre?',
        options: [
          'Nein, er leitet unter eigener Verantwortung (§ 76 AktG)',
          'Ja, die Hauptversammlung kann Weisungen erteilen',
          'Ja, der Aufsichtsrat kann Weisungen erteilen',
          'Nur bei Grundlagengeschäften',
        ],
        correctAnswer: 'Nein, er leitet unter eigener Verantwortung (§ 76 AktG)',
        explanation: 'Der Vorstand einer AG leitet die Gesellschaft unter eigener Verantwortung (§ 76 AktG). Anders als der Geschäftsführer einer GmbH ist er nicht weisungsgebunden.',
      },
    ],
  },

  relatedTopics: [
    { id: 'stellvertretung', title: 'Stellvertretung', relationship: 'Prokura (§§ 48 ff. HGB)' },
    { id: 'kaufvertrag', title: 'Kaufvertrag', relationship: 'Rügepflicht § 377 HGB' },
  ],
}
