// src/content/ipdg/topics/erp-systeme.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { ErpModuleMap } from '../diagrams/ErpModuleMap'
import { ProcessFlowBuilder } from '../diagrams/ProcessFlowBuilder'

export const erpSystemeTopic: Topic = {
  id: 'erp-systeme',
  title: 'ERP-Systeme',
  description: 'Definition, Ziele, Stammdaten, Template, Configuration vs. Customization, TCO, IT-Integration',
  icon: '\u{1F3E2}',
  examNotes: 'Definitionen genau kennen - Unterschied Configuration/Customization ist Dauerbrenner in der Klausur!',

  sections: [
    // ───────────────────────────────────────────────
    // 1. Was ist ein ERP-System?
    // ───────────────────────────────────────────────
    {
      id: 'was-ist-erp',
      title: 'Was ist ein ERP-System?',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <p className="text-slate-300 italic">
              Stellen Sie sich vor, ein Unternehmen betreibt separate Systeme für Finanzen,
              Personal, Lager, Vertrieb und Produktion. Jede Abteilung pflegt eigene Daten,
              eigene Formate, eigene Wahrheiten. Das Ergebnis: Fehler, Verzögerungen, keine Transparenz.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              Ein <strong>ERP-System</strong> (Enterprise Resource Planning) ist eine{' '}
              <strong>integrierte, betriebswirtschaftliche Standardsoftware</strong>, die alle
              Geschäftsprozesse (Beschaffung, Produktion, Vertrieb, Finanzwesen usw.)
              auf einer <strong>gemeinsamen Datenbasis</strong> verbindet.
            </p>
            <p className="text-blue-300 text-sm mt-2">
              ERP wird als <em>Business-Tool</em> wahrgenommen, nicht als IT-Tool &mdash;
              es geht um Prozesse, nicht um Technik.
            </p>
          </div>

          <h4 className="font-medium pt-2">Drei Ziele jeder ERP-Einführung:</h4>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/50 border border-green-700 text-green-300 font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-green-300">Standardisierung von Geschäftsprozessen</div>
                <div className="text-sm text-slate-400 mt-1">
                  Einheitliche Prozesslandschaft &mdash; alle Standorte arbeiten nach denselben Abläufen.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-blue-300">Standardisierung von Stammdaten</div>
                <div className="text-sm text-slate-400 mt-1">
                  Ein Kunde, ein Datensatz &mdash; weltweit.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-purple-300">Standardisierung der IT-Infrastruktur</div>
                <div className="text-sm text-slate-400 mt-1">
                  Vereinheitlichung von Hardware und Software, Konsolidierung globaler
                  Einkaufskonditionen und Wartungsverträge, Konsolidierung der Rechenzentren
                  und Entscheidung für ein einheitliches Standard-ERP in allen Business Units.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700 text-sm">
            <p className="text-cyan-200">
              <strong>Zentrale Erkenntnis:</strong> ERP-Einführungen sind <em>hauptsächlich
              organisatorische</em> und weniger technologische Herausforderungen. Der Erfolg
              hängt nicht von der Software ab, sondern davon, ob Prozesse und Menschen
              bereit für die Veränderung sind.
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Die Ziele sind <em>Standardisierung</em>,
            nicht Lokalisierung, Automatisierung oder Optimierung!
            ERP = gemeinsame Datenbasis + integrierte Module &mdash; nicht isolierte
            Einzellösungen über Schnittstellen.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: ErpModuleMap,
      },
    },

    // ───────────────────────────────────────────────
    // 2. Stammdaten & Datenqualität
    // ───────────────────────────────────────────────
    {
      id: 'stammdaten',
      title: 'Stammdaten & Datenqualität',
      content: (
        <div className="space-y-4">
          <p>
            Bevor ein ERP-System seine Stärke ausspielen kann, braucht es ein solides
            Fundament: saubere <strong>Stammdaten</strong>. Da alle Module auf einer{' '}
            <em>gemeinsamen Datenbasis</em> arbeiten, hat schlechte Datenqualität in einem
            Bereich Auswirkungen auf das gesamte System &mdash; eine falsche Kundenadresse
            im Vertrieb führt zu falschen Lieferungen, fehlerhaften Rechnungen und
            ungenauen Finanzberichten.
          </p>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <p className="text-amber-200">
              <strong>Stammdaten</strong> sind wichtige Grunddaten eines Betriebs, die über
              einen gewissen Zeitraum <em>nicht verändert</em> werden (z.B. Artikel, Kunden,
              Mitarbeiter, Lieferanten, Stücklisten).
            </p>
          </div>

          <p className="text-red-300 text-sm">
            Bei Unternehmen ohne Stammdatenmanagement können im Laufe der Zeit
            <strong> 50% der Daten obsolet</strong> werden!
          </p>

          <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Bewegungsdaten</strong> sind das Gegenstück zu Stammdaten: dynamische
              Daten, die aus Transaktionen entstehen (z.B. Bestellungen, Rechnungen,
              Lieferscheine). Sie verändern sich ständig und referenzieren Stammdaten.
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-3">Die 6 Datenqualitätsdimensionen:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Genauigkeit</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Daten bilden die Realität korrekt ab</p>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Vollständigkeit</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Keine fehlenden Pflichtfelder oder Datensätze</p>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Aktualität</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Daten spiegeln den aktuellen Stand wider</p>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Konsistenz</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Keine Widersprüche zwischen Systemen</p>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Eindeutigkeit</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Jeder Datensatz ist nur einmal vorhanden</p>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&#10003;</span>
                  <span className="font-medium">Zugänglichkeit</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Daten sind für Berechtigte auffindbar und nutzbar</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 3. Das ERP-Template
    // ───────────────────────────────────────────────
    {
      id: 'erp-template',
      title: 'Das ERP-Template',
      content: (
        <div className="space-y-4">
          <p>
            Wie rollt man ein ERP-System in einem Konzern mit Dutzenden Standorten aus?
            Die Antwort: mit einem <strong>Template</strong> &mdash; einer vorkonfigurierten
            Blaupause.
          </p>

          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <p className="text-indigo-200">
              Das <strong>ERP-Template</strong> ist die Abbildung der Wertschöpfungskette,
              in dem <strong>80-90%</strong> aller Geschäftsprozesse standardisiert enthalten sind.
              Es wird zentral entwickelt, gewartet und ausgerollt.
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Template-Bestandteile:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Globale Konten</li>
              <li>Globale Parameter</li>
              <li>Grundlegende Stammdatenstandards</li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-2">Referenzsystem</h4>
              <p className="text-sm text-slate-300">
                Definiert alle global anwendbaren <strong>Anwendungssystemstrukturen</strong> und
                Datenstandards (Konten, Parameter, Stammdaten).
              </p>
              <p className="text-xs text-green-400 mt-2">= Definiert die Standards</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
              <h4 className="font-bold text-slate-300 mb-2">Prozesscluster</h4>
              <p className="text-sm text-slate-300">
                Gruppiert verwandte Geschäftsprozesse. Ist <strong>nicht</strong> für
                die Definition der globalen Standards zuständig.
              </p>
              <p className="text-xs text-amber-400 mt-2">&#8800; Definiert nicht die Standards</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">Template-Lokalisierung</h4>
            <p className="text-sm text-slate-300">
              Das Template deckt <strong>80-90%</strong> der Prozesse standardisiert ab.
              Die verbleibenden <strong>10-20%</strong> erfordern <em>Lokalisierung</em> &mdash;
              Anpassung an lokale Gegebenheiten wie rechtliche Vorschriften, Steuern und Sprache.
            </p>
            <p className="text-xs text-amber-400 mt-2">
              Grundsatz: So viel Standard wie möglich, so wenig Anpassung wie nötig.
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> Das <em>Referenzsystem</em> (nicht das
            Prozesscluster!) definiert die globalen Standards. Wird gerne vertauscht
            abgefragt!
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 4. Configuration vs. Customization
    // ───────────────────────────────────────────────
    {
      id: 'config-vs-custom',
      title: 'Configuration vs. Customization',
      content: (
        <div className="space-y-4">
          <p>
            Das ERP-Template entsteht durch <strong>Configuration</strong> &mdash; die
            standardisierten 80-90% werden durch Parametereinstellung abgebildet.
            Für die restlichen 10-20%, die sich nicht über den Standard lösen lassen,
            kommt <strong>Customization</strong> ins Spiel. Die Unterscheidung zwischen
            beiden ist ein Klausur-Dauerbrenner.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-bold text-green-300 mb-2">Configuration</h4>
              <p className="text-sm text-slate-300">
                Abbildung der Wertschöpfungskette durch Konfiguration von Parametern
                + Stammdaten unter <strong>ausschließlicher Verwendung von Standard-Modulen</strong>.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                z.B. Tabellen und Parameter anpassen, Hausmittel des ERP nutzen.
              </p>
              <div className="mt-3 p-2 bg-green-900/30 rounded text-xs text-green-400">
                OHNE externe Programmierung &mdash; update-sicher (releasefähig)
              </div>
            </div>
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-700">
              <h4 className="font-bold text-orange-300 mb-2">Customization</h4>
              <p className="text-sm text-slate-300">
                Ergänzung/Modifikation von Geschäftsprozessmodulen durch
                <strong> externe Programme</strong>, die nicht im Standard existieren.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                z.B. eigene Schnittstellen, Reports, ABAP-Erweiterungen.
              </p>
              <div className="mt-3 p-2 bg-orange-900/30 rounded text-xs text-orange-400">
                MIT externer Programmierung &mdash; Update-Risiko (Anpassungen können brechen)
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Dauerbrenner:</strong> Die Definitionen werden oft vertauscht
            abgefragt! Merke: <em>Configuration</em> = nur Standard,
            <em> Customization</em> = externe Programmierung nötig.
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 5. Total Cost of Ownership (TCO)
    // ───────────────────────────────────────────────
    {
      id: 'tco',
      title: 'Total Cost of Ownership (TCO)',
      content: (
        <div className="space-y-4">
          <p>
            ERP-Systeme kosten nicht nur bei der Anschaffung &mdash; die wahren Kosten
            zeigen sich erst über die gesamte Nutzungsdauer. Hier kommt TCO ins Spiel.
          </p>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <p>
              <strong>TCO</strong> = Gesamtkosten von Investitionsgütern während ihrer
              gesamten <em>Nutzungsdauer</em> (nicht Lebenszyklus!).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Kostenart</th>
                  <th className="text-left py-2 px-3">Beschreibung</th>
                  <th className="text-left py-2 px-3">Budgetierbar</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-medium text-green-400">Direkte Kosten</td>
                  <td className="py-2 px-3">
                    Lizenzen, Hardware, Software, Netzwerk, Administration, Support
                    <div className="text-xs text-slate-500 mt-1">Fallen beim Systembetrieb an</div>
                  </td>
                  <td className="py-2 px-3 text-green-400">Ja</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-amber-400">Indirekte Kosten</td>
                  <td className="py-2 px-3">
                    Schulung, Ausfallzeiten, Antwortzeiten, Produktivitätsverlust
                    <div className="text-xs text-slate-500 mt-1">
                      Fallen bei den <em>Endnutzern</em> an, beeinflusst durch Qualität
                      der Endnutzerunterstützung
                    </div>
                  </td>
                  <td className="py-2 px-3 text-red-400">Schwer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
            <h4 className="font-bold text-indigo-300 mb-2">Grundsatzfrage: On-Premise oder Cloud/SaaS?</h4>
            <p className="text-sm text-slate-300">
              Die IT-Infrastruktur-Standardisierung führt zwangsläufig zur Frage:
              eigene Server (<strong>On-Premise / Inhouse</strong>) oder Software als
              Dienst (<strong>Cloud / SaaS</strong>)? Die TCO-Analyse liefert die
              Entscheidungsgrundlage &mdash; denn Cloud-Lösungen verschieben Kosten
              von Kapitalausgaben (CAPEX) zu laufenden Betriebskosten (OPEX).
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Falle:</strong> TCO bezieht sich auf die <em>Nutzungsdauer</em>,
            nicht den &quot;Lebenszyklus&quot;. Indirekte Kosten fallen bei den
            <em> Endnutzern</em> an und sind schwer zu budgetieren &mdash; nicht die direkten!
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 6. IT-Integrationsstrategien
    // ───────────────────────────────────────────────
    {
      id: 'it-integration',
      title: 'IT-Integrationsstrategien',
      content: (
        <div className="space-y-4">
          <p>
            Bei Fusionen und Übernahmen stellt sich die zentrale Frage: Wie führt
            man die IT-Landschaften zusammen? Es gibt vier grundlegende Strategien &mdash;
            jede mit eigenen Vor- und Nachteilen.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="font-bold text-blue-300 mb-2">Koexistenz / Symbiose</h4>
              <p className="text-sm text-slate-300">
                Systeme existieren nebeneinander weiter, verbunden über <strong>Schnittstellen</strong>.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Wann: Wenn Integration nicht dringend ist oder Systeme zu unterschiedlich sind.
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Geringster Aufwand, aber hohe laufende Schnittstellenkosten
              </p>
            </div>
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-700">
              <h4 className="font-bold text-orange-300 mb-2">Absorption / Übernahme</h4>
              <p className="text-sm text-slate-300">
                IT-System der gekauften Firma wird <strong>abgeschaltet</strong>, eigenes System
                wird ausgerollt.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Wann: Klarer Größenunterschied &mdash; ein System ist dem anderen überlegen.
              </p>
              <p className="text-xs text-orange-400 mt-1">
                Typisch für Übernahmen, schnell aber ggf. Widerstand bei Übernommenen
              </p>
            </div>
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
              <h4 className="font-bold text-green-300 mb-2">Best of Breed / Standardisierung</h4>
              <p className="text-sm text-slate-300">
                Aus beiden Welten das <strong>Beste heraussuchen</strong> und standardisieren.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Wann: Merger of Equals &mdash; beide Systeme haben Stärken, die erhalten bleiben sollen.
              </p>
              <p className="text-xs text-green-400 mt-1">
                Erfordert detaillierte Analyse und Vergleich beider Systeme
              </p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
              <h4 className="font-bold text-purple-300 mb-2">Transformation</h4>
              <p className="text-sm text-slate-300">
                Alte Systeme beider Unternehmen durch <strong>komplett neue Systemlandschaft</strong> ersetzen.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Wann: Beide Systeme sind veraltet oder strategischer Neuanfang gewünscht.
              </p>
              <p className="text-xs text-purple-400 mt-1">
                Höchster Aufwand und Risiko, aber größtes Optimierungspotenzial
              </p>
            </div>
          </div>

          <div className="mt-4">
            <MermaidDiagram
              chart={`flowchart LR
  subgraph Koex["Koexistenz"]
    A1["System A"] <--> A2["System B"]
  end
  subgraph Absorp["Absorption"]
    B1["System A"] --> B2["System A\n(übernommen)"]
  end
  subgraph BoB["Best of Breed"]
    C1["Beste aus A"] --> C3["Neuer\nStandard"]
    C2["Beste aus B"] --> C3
  end
  subgraph Trans["Transformation"]
    D1["System A"] --> D3["Komplett\nneues System"]
    D2["System B"] --> D3
  end`}
            />
          </div>
        </div>
      ),
    },

    // ───────────────────────────────────────────────
    // 7. Geschäftsprozesse ordnen
    // ───────────────────────────────────────────────
    {
      id: 'geschaeftsprozesse',
      title: 'Geschäftsprozesse ordnen',
      content: (
        <div className="space-y-4">
          <p>
            ERP-Systeme bilden <strong>End-to-End-Prozesse</strong> ab, die mehrere Module
            durchlaufen. Ein E2E-Prozess betrachtet den gesamten Ablauf vom Auslöser
            (z.B. Kundenbedarf) bis zum Ergebnis (z.B. Zahlungseingang) &mdash; über
            Abteilungsgrenzen hinweg.
          </p>

          <div className="grid gap-3">
            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="font-medium text-blue-300">Order-to-Cash (OTC)</div>
              <div className="text-sm text-slate-400 mt-1">
                Vom Kundenauftrag bis zum Zahlungseingang &mdash; der Vertriebsprozess.
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Kundenauftrag → Lieferung → Faktura → Zahlung
              </div>
            </div>
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-medium text-green-300">Procure-to-Pay (P2P)</div>
              <div className="text-sm text-slate-400 mt-1">
                Von der Bedarfsanforderung bis zur Bezahlung &mdash; der Beschaffungsprozess.
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Bedarfsanforderung → Bestellung → Wareneingang → Rechnungsprüfung → Zahlung
              </div>
            </div>
            <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="font-medium text-purple-300">Record-to-Report (R2R)</div>
              <div className="text-sm text-slate-400 mt-1">
                Von der Buchung bis zum Abschluss &mdash; der Finanzprozess.
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Buchung → Abstimmung → Konsolidierung → Berichterstattung
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-900/20 rounded border border-indigo-800 text-sm">
            <strong>Klausur-Tipp:</strong> Die Reihenfolge der Schritte wird gerne
            abgefragt. Überlege dir bei jedem Schritt, welche Daten und Dokumente
            fließen müssen &mdash; das ergibt die logische Reihenfolge.
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: ProcessFlowBuilder,
      },
    },
  ],

  quiz: {
    questions: [
      {
        id: 'erp-stammdaten-dynamik',
        type: 'multiple-choice',
        question: 'Stammdaten zeichnen sich durch eine hohe Dynamik aus und können nur mit unvertretbar hohem Aufwand global vereinheitlicht werden.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Stammdaten sind gerade NICHT dynamisch - sie sind statische Grunddaten, die über längere Zeit unverändert bleiben. BEWEGUNGSDATEN sind dynamisch.',
      },
      {
        id: 'erp-konfiguration-def',
        type: 'multiple-choice',
        question: 'Konfiguration ist die Abbildung der Wertschöpfungskette eines Unternehmens mit einem ERP-System durch die Konfiguration von Parametern in Kombination mit den entsprechenden Stammdaten unter ausschließlicher Verwendung von standardisierten Geschäftsprozessmodulen des Systems ohne externe Programmierung.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Diese Definition ist korrekt. Configuration nutzt nur Standard-Funktionen ohne Programmierung.',
      },
      {
        id: 'erp-customization-def',
        type: 'multiple-choice',
        question: 'Customization ist die Abbildung der Wertschöpfungskette eines Unternehmens mit einem ERP-System durch die Konfiguration von Parametern ohne externe Programmierung.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das ist die Definition von CONFIGURATION, nicht Customization. Customization erfordert externe Programmierung für Funktionen, die nicht im Standard existieren.',
      },
      {
        id: 'erp-template-referenzsystem',
        type: 'multiple-choice',
        question: 'ERP-Template: Das Referenzsystem definiert alle global anwendbaren Anwendungssystemstrukturen und Datenstandards wie globale Konten, globale Parameter, grundlegende Stammdatenstandards.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Das Referenzsystem (nicht das Prozesscluster!) definiert die globalen Standards.',
      },
      {
        id: 'erp-template-prozesscluster',
        type: 'multiple-choice',
        question: 'ERP-Template: Das Prozesscluster definiert alle global anwendbaren Anwendungssystemstrukturen und Datenstandards wie globale Konten, globale Parameter, grundlegende Stammdatenstandards.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Das REFERENZSYSTEM (nicht das Prozesscluster) definiert die globalen Standards.',
      },
      {
        id: 'erp-direkte-kosten',
        type: 'multiple-choice',
        question: 'Direkte Kosten fallen bei den Endnutzern und beim Systembetrieb an. Sie können von der Qualität der Endnutzerunterstützung beeinflusst werden und sind schwer zu budgetieren.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Das beschreibt INDIREKTE Kosten! Direkte Kosten (HW, SW, Support) sind budgetierbar. Indirekte Kosten (Schulung, Ausfallzeiten) sind schwer zu budgetieren.',
      },
      {
        id: 'erp-it-infrastruktur',
        type: 'multiple-choice',
        question: 'Die Standardisierung der IT-Infrastruktur umfasst die Vereinheitlichung von Hard- und Software, die Konsolidierung von globalen Einkaufskonditionen und Wartungsverträgen mit Lieferanten, die Konsolidierung von globalen Rechenzentren und die Entscheidung für eine einheitliche ERP-Software.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Wahr',
        explanation: 'Korrekt. Die IT-Infrastruktur-Standardisierung umfasst all diese Aspekte.',
      },
      {
        id: 'erp-tco-def',
        type: 'multiple-choice',
        question: 'Total Cost of Ownership (TCO) sind die Gesamtkosten von Investitionen während ihres gesamten Lebenszyklus. Sie umfassen direkte und indirekte Kosten.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Fast richtig, aber: TCO bezieht sich auf die NUTZUNGSDAUER, nicht den "Lebenszyklus". Die Unterscheidung in direkte/indirekte Kosten stimmt.',
      },
      {
        id: 'erp-grundlegende-ziele',
        type: 'multiple-choice',
        question: 'Die grundlegenden Unternehmensziele einer ERP-Einführung sind: größtmögliche Lokalisierung der Geschäftsprozesse, Stammdatensysteme über Synonyme kompatibel machen, bestehende IT-Systeme pflegen und über Schnittstellen integrieren.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! Die Ziele sind: STANDARDISIERUNG (nicht Lokalisierung!) von Prozessen, Stammdaten und IT-Infrastruktur.',
      },
      {
        id: 'erp-3-ziele',
        type: 'multiple-choice',
        question: 'Welche der folgenden Aussagen beschreibt die drei grundlegenden Ziele einer ERP-Einführung korrekt?',
        options: [
          'Standardisierung von Geschäftsprozessen, Stammdaten und IT-Infrastruktur',
          'Lokalisierung von Geschäftsprozessen, Stammdaten und IT-Infrastruktur',
          'Automatisierung von Marketing, Vertrieb und Service',
          'Optimierung von Beschaffung, Produktion und Logistik',
        ],
        correctAnswer: 'Standardisierung von Geschäftsprozessen, Stammdaten und IT-Infrastruktur',
        explanation: 'Die drei grundlegenden Ziele sind die STANDARDISIERUNG (nicht Lokalisierung!) von Geschäftsprozessen, Stammdaten und IT-Infrastruktur.',
      },
      {
        id: 'erp-integration-absorption',
        type: 'multiple-choice',
        question: 'Welche IT-Integrationsstrategie wird typischerweise bei einer Unternehmensübernahme angewendet, bei der das IT-System der gekauften Firma abgeschaltet und das eigene System ausgerollt wird?',
        options: [
          'Absorption / Übernahme',
          'Koexistenz / Symbiose',
          'Best of Breed',
          'Transformation',
        ],
        correctAnswer: 'Absorption / Übernahme',
        explanation: 'Bei der Absorption wird das System der übernommenen Firma durch das eigene ersetzt - typisch für Übernahmen.',
      },
      {
        id: 'erp-integration-transformation',
        type: 'multiple-choice',
        question: 'Bei welcher IT-Integrationsstrategie werden die alten Systeme beider Unternehmen durch eine komplett neue Systemlandschaft ersetzt?',
        options: [
          'Transformation',
          'Best of Breed',
          'Absorption',
          'Koexistenz',
        ],
        correctAnswer: 'Transformation',
        explanation: 'Bei der Transformation werden alle bestehenden Systeme durch eine völlig neue Lösung ersetzt.',
      },
      {
        id: 'erp-stamm-vs-bewegung',
        type: 'multiple-choice',
        question: 'Welche Aussage über Stammdaten und Bewegungsdaten ist korrekt?',
        options: [
          'Stammdaten sind statische Grunddaten (z.B. Kunden, Material), Bewegungsdaten sind dynamische Transaktionsdaten (z.B. Bestellungen)',
          'Stammdaten ändern sich ständig, Bewegungsdaten bleiben über Jahre gleich',
          'Beide Datentypen sind gleich dynamisch und werden täglich aktualisiert',
          'Stammdaten existieren nur in ERP-Systemen, Bewegungsdaten nur in CRM-Systemen',
        ],
        correctAnswer: 'Stammdaten sind statische Grunddaten (z.B. Kunden, Material), Bewegungsdaten sind dynamische Transaktionsdaten (z.B. Bestellungen)',
        explanation: 'Stammdaten = statisch (Kunden, Material, Lieferanten). Bewegungsdaten = dynamisch aus Transaktionen (Bestellungen, Rechnungen).',
      },
      {
        id: 'erp-datenqualitaet',
        type: 'multiple-choice',
        question: 'Welche der folgenden ist KEINE Datenqualitätsdimension für Stammdaten?',
        options: [
          'Profitabilität',
          'Genauigkeit',
          'Vollständigkeit',
          'Konsistenz',
        ],
        correctAnswer: 'Profitabilität',
        explanation: 'Die 6 Datenqualitätsdimensionen sind: Genauigkeit, Vollständigkeit, Aktualität, Konsistenz, Eindeutigkeit, Zugänglichkeit. Profitabilität gehört nicht dazu.',
      },
      {
        id: 'erp-template-anteil',
        type: 'multiple-choice',
        question: 'Wie viel Prozent der Geschäftsprozesse sollte ein ERP-Template standardisiert abbilden?',
        options: [
          '80-90%',
          '50-60%',
          '30-40%',
          '100%',
        ],
        correctAnswer: '80-90%',
        explanation: 'Ein ERP-Template bildet 80-90% der Geschäftsprozesse standardisiert ab. Die restlichen 10-20% werden durch Lokalisierung abgedeckt.',
      },
      {
        id: 'erp-lokalisierung',
        type: 'multiple-choice',
        question: 'Was versteht man unter Lokalisierung im Kontext eines ERP-Templates?',
        options: [
          'Anpassung an lokale Gegebenheiten (Recht, Steuern, Sprache) für die 10-20%, die nicht standardisiert werden können',
          'Übersetzung der Benutzeroberfläche in verschiedene Sprachen',
          'Verteilung der Server auf lokale Rechenzentren',
          'Einführung lokaler IT-Abteilungen in jeder Niederlassung',
        ],
        correctAnswer: 'Anpassung an lokale Gegebenheiten (Recht, Steuern, Sprache) für die 10-20%, die nicht standardisiert werden können',
        explanation: 'Lokalisierung = Anpassung des Templates an lokale Anforderungen (Recht, Steuern, Sprache). Grundsatz: So viel Standard wie möglich, so wenig Anpassung wie nötig.',
      },
      {
        id: 'erp-integration-szenario',
        type: 'multiple-choice',
        question: 'Unternehmen A übernimmt Unternehmen B. Beide nutzen unterschiedliche ERP-Systeme. A entscheidet, das System von B abzuschalten und das eigene System bei B auszurollen. Welche Strategie ist das?',
        options: [
          'Absorption / Übernahme',
          'Koexistenz / Symbiose',
          'Best of Breed',
          'Transformation',
        ],
        correctAnswer: 'Absorption / Übernahme',
        explanation: 'Bei der Absorption wird das IT-System der übernommenen Firma abgeschaltet und durch das eigene ersetzt. Typisch für Übernahme-Szenarien.',
      },
      {
        id: 'erp-on-prem-vs-cloud',
        type: 'multiple-choice',
        question: 'Welche Analyse liefert die Entscheidungsgrundlage für die Grundsatzfrage "On-Premise oder Cloud/SaaS"?',
        options: [
          'Total Cost of Ownership (TCO)',
          'SWOT-Analyse',
          'CMMI-Reifegrad-Analyse',
          'Stakeholder-Analyse',
        ],
        correctAnswer: 'Total Cost of Ownership (TCO)',
        explanation: 'Die TCO-Analyse vergleicht Gesamtkosten über die Nutzungsdauer: On-Premise (hohe Kapitalkosten, volle Kontrolle) vs. Cloud (laufende Betriebskosten, weniger Anpassung).',
      },
    ],
  },

  examTasks: [
    {
      id: 'erp-einfuehrung-task',
      title: 'ERP-Einführung bei der Telekom',
      points: 25,
      context: (
        <p>
          Sie erhalten vom Managementboard der Telekom die Aufgabe, ein neues ERP-System
          für die Bereiche Finanzen, Personalwesen, Fertigung, Logistik, Service, Sales
          und Beschaffung einzuführen.
        </p>
      ),
      parts: [
        {
          id: 'erp-task-a',
          type: 'free-text',
          question: 'Was sind die drei grundlegenden Ziele einer ERP-Einführung?',
          placeholder: 'Standardisierung von...',
          modelAnswer: '1. Standardisierung von Geschäftsprozessen (einheitliche Prozesslandschaft)\n2. Standardisierung von Stammdaten (interne und externe)\n3. Standardisierung der IT-Infrastruktur (Hardware, Software, Wartungsverträge)',
          keyPoints: [
            'Standardisierung Geschäftsprozesse',
            'Standardisierung Stammdaten',
            'Standardisierung IT-Infrastruktur',
          ],
          explanation: 'Die drei Säulen der ERP-Standardisierung bilden das Fundament jeder erfolgreichen Einführung.',
        },
        {
          id: 'erp-task-b',
          type: 'free-text',
          question: 'Erklären Sie den Unterschied zwischen Configuration und Customization.',
          placeholder: 'Configuration ist...',
          modelAnswer: 'Configuration: Anpassung durch Parameter und Stammdaten OHNE externe Programmierung - nur Standard-Module werden genutzt.\n\nCustomization: Ergänzung/Modifikation durch externe Programmierung für Funktionen, die im Standard nicht existieren (z.B. Schnittstellen, Reports).',
          keyPoints: [
            'Configuration ohne Programmierung',
            'Customization mit Programmierung',
            'Standard-Module vs. Erweiterungen',
          ],
          explanation: 'Diese Unterscheidung ist fundamental für die Bewertung von ERP-Projekten.',
        },
        {
          id: 'erp-task-c',
          type: 'free-text',
          question: 'Was ist ein ERP-Template und was versteht man unter Lokalisierung? Wie ist das Verhältnis?',
          placeholder: 'Ein ERP-Template ist...',
          modelAnswer: 'Ein ERP-Template ist eine vorkonfigurierte Blaupause, die 80-90% der Geschäftsprozesse standardisiert abbildet. Es wird zentral entwickelt, gewartet und ausgerollt.\n\nLokalisierung bezeichnet die Anpassung an lokale Gegebenheiten (Recht, Steuern, Sprache) für die verbleibenden 10-20% der Prozesse.\n\nGrundsatz: So viel Standard wie möglich, so wenig Anpassung wie nötig.',
          keyPoints: [
            'Template = 80-90% standardisiert',
            'Lokalisierung = 10-20% lokale Anpassung',
            'Recht, Steuern, Sprache',
          ],
          explanation: 'Das Verhältnis 80-90% Standard zu 10-20% Lokalisierung ist ein zentrales Konzept bei ERP-Rollouts in internationalen Konzernen.',
        },
        {
          id: 'erp-task-d',
          type: 'free-text',
          question: 'Nennen und erklären Sie die vier IT-Integrationsstrategien bei Fusionen/Übernahmen.',
          placeholder: '1. Koexistenz...',
          modelAnswer: '1. Koexistenz/Symbiose: Systeme existieren nebeneinander, verbunden über Schnittstellen. Geringster Aufwand, aber hohe laufende Kosten.\n\n2. Absorption/Übernahme: System der übernommenen Firma wird abgeschaltet, eigenes System wird ausgerollt. Typisch für Übernahmen.\n\n3. Best of Breed: Aus beiden Systemen das Beste heraussuchen und zu einem neuen Standard kombinieren. Erfordert detaillierte Analyse.\n\n4. Transformation: Alle alten Systeme durch eine komplett neue Systemlandschaft ersetzen. Höchster Aufwand, aber größtes Potenzial.',
          keyPoints: [
            'Koexistenz = nebeneinander',
            'Absorption = eines abschalten',
            'Best of Breed = Bestes kombinieren',
            'Transformation = komplett neu',
          ],
          explanation: 'Die vier Strategien unterscheiden sich fundamental im Aufwand und in der Zielsetzung.',
        },
      ],
    },
    {
      id: 'tco-task',
      title: 'Total Cost of Ownership',
      points: 15,
      context: (
        <p>
          Sie müssen die Entscheidung zwischen On-Premise und Cloud-Lösung für das
          neue ERP-System treffen.
        </p>
      ),
      parts: [
        {
          id: 'tco-task-a',
          type: 'free-text',
          question: 'Was bedeutet TCO und welche Kostenarten umfasst es?',
          placeholder: 'TCO steht für...',
          modelAnswer: 'TCO = Total Cost of Ownership = Gesamtkosten während der Nutzungsdauer.\n\nDirekte Kosten: Budgetierbar (Lizenzen, Hardware, Support, Netzwerk)\nIndirekte Kosten: Schwer budgetierbar (Schulung, Ausfallzeiten, Produktivitätsverlust)',
          keyPoints: [
            'TCO = Gesamtkosten Nutzungsdauer',
            'Direkte Kosten (budgetierbar)',
            'Indirekte Kosten (schwer budgetierbar)',
          ],
          explanation: 'TCO ist entscheidend für die On-Premise vs. Cloud-Entscheidung.',
        },
      ],
    },
  ],

  relatedTopics: [
    { id: 'sap-plattform', title: 'SAP-Plattform', relationship: 'Konkretes ERP-System' },
    { id: 'projekt-change-management', title: 'Projekt & Change Management', relationship: 'Einführung & Risiken' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph ERP["ERP-Systeme"]
    Definition["Definition &<br/>Ziele"]
    Template["Template &<br/>Standards"]
    ConfigCustom["Configuration vs.<br/>Customization"]
    TCO["TCO"]
  end
  subgraph Related["Verwandte Themen"]
    SAP["SAP-Plattform"]
    PCM["Projekt &<br/>Change Management"]
  end
  Definition --> Template
  Template --> ConfigCustom
  ConfigCustom --> TCO
  ERP -->|"konkretes<br/>System"| SAP
  ERP -->|"Einführung<br/>& Risiken"| PCM
`,
}
