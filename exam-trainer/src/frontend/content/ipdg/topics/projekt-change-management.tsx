// src/content/ipdg/topics/projekt-change-management.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'

// ─────────────────────────────────────────────────
// Mermaid Diagrams
// ─────────────────────────────────────────────────

const failureCauseEffectDiagram = `
flowchart LR
  subgraph Ursachen["Ursachen"]
    U1["Unterschätzte\nProzesskomplexität"]
    U2["Mangelnde\nBeratungsqualität"]
    U3["Fehlende Transparenz\ntechnischer Risiken"]
    U4["Überoptimistische\nProjektplanung"]
    U5["Entscheidungs-\nparalyse"]
  end

  subgraph Wirkung["Wirkung"]
    W1["Budgetüberschreitung"]
    W2["Zeitverzug"]
    W3["Qualitätsmängel"]
    W4["Projektabbruch"]
  end

  U1 --> W1
  U1 --> W2
  U2 --> W3
  U2 --> W2
  U3 --> W4
  U4 --> W1
  U4 --> W2
  U5 --> W2
  U5 --> W4

  style U1 fill:#7f1d1d,stroke:#dc2626
  style U2 fill:#7f1d1d,stroke:#dc2626
  style U3 fill:#7f1d1d,stroke:#dc2626
  style U4 fill:#7f1d1d,stroke:#dc2626
  style U5 fill:#7f1d1d,stroke:#dc2626
  style W1 fill:#78350f,stroke:#f59e0b
  style W2 fill:#78350f,stroke:#f59e0b
  style W3 fill:#78350f,stroke:#f59e0b
  style W4 fill:#450a0a,stroke:#ef4444
`

const cmmiProgressionDiagram = `
flowchart TB
  L1["Level 1: Initial\nChaotisch, ad-hoc"]
  L2["Level 2: Managed\nGeplant, überwacht"]
  L3["Level 3: Defined\nStandardisiert, dokumentiert"]
  L4["Level 4: Quantitatively Managed\nGemessen, statistisch gesteuert"]
  L5["Level 5: Optimizing\nKontinuierlich verbessert"]

  L1 -->|Grundlegendes\nProjektmanagement| L2
  L2 -->|Organisationsweite\nStandards| L3
  L3 -->|Metriken und\nstatistische Kontrolle| L4
  L4 -->|Proaktive\nOptimierung| L5

  style L1 fill:#7f1d1d,stroke:#dc2626
  style L2 fill:#78350f,stroke:#f59e0b
  style L3 fill:#14532d,stroke:#22c55e
  style L4 fill:#1e3a5f,stroke:#3b82f6
  style L5 fill:#3b0764,stroke:#a855f7
`

const erfolgsfaktorenDiagram = `
flowchart TB
  subgraph Strategie["Strategie"]
    S1["Prozess vor System"]
    S2["Klare Zieldefinition"]
    S3["Realistische Planung"]
  end

  subgraph Menschen["Menschen"]
    M1["Stakeholder-Einbindung"]
    M2["Führungsunterstützung"]
    M3["Schulung und Training"]
  end

  subgraph Technik["Technik"]
    T1["CMMI Readiness"]
    T2["Qualitätssicherung"]
    T3["Risikomanagement"]
  end

  Erfolg["Projekterfolg"]

  S1 --> Erfolg
  S2 --> Erfolg
  S3 --> Erfolg
  M1 --> Erfolg
  M2 --> Erfolg
  M3 --> Erfolg
  T1 --> Erfolg
  T2 --> Erfolg
  T3 --> Erfolg

  style Erfolg fill:#14532d,stroke:#22c55e
  style S1 fill:#1e3a5f,stroke:#3b82f6
  style S2 fill:#1e3a5f,stroke:#3b82f6
  style S3 fill:#1e3a5f,stroke:#3b82f6
  style M1 fill:#3b0764,stroke:#a855f7
  style M2 fill:#3b0764,stroke:#a855f7
  style M3 fill:#3b0764,stroke:#a855f7
  style T1 fill:#78350f,stroke:#f59e0b
  style T2 fill:#78350f,stroke:#f59e0b
  style T3 fill:#78350f,stroke:#f59e0b
`

// ─────────────────────────────────────────────────
// Topic Export
// ─────────────────────────────────────────────────

export const projektChangeManagementTopic: Topic = {
  id: 'projekt-change-management',
  title: 'Projekt & Change Management',
  description: 'Warum IT-Projekte scheitern, CMMI-Reifegrade, Erfolgsfaktoren',
  icon: '🔄',
  examNotes: 'CMMI-Level-Definitionen auswendig lernen! Goldene Regel: Prozess vor System!',

  sections: [
    // ── Section 1: Why do IT projects fail? ──
    {
      id: 'warum-scheitern',
      title: 'Warum scheitern IT-Projekte?',
      content: (
        <div className="space-y-4">
          <p>
            Große IT-Projekte &mdash; ob ERP, CRM oder andere digitale Transformationen &mdash;
            gehören zu den risikoreichsten Vorhaben in Unternehmen. CRM-Projekte haben eine
            Misserfolgsquote von ca. <strong>50%</strong>, bei ERP-Projekten ist sie ähnlich hoch
            (Beispiel: Lidl-SAP-Desaster mit über 500 Mio. EUR Verlust).
          </p>

          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <p className="text-amber-200">
              <strong>Das Muster ist klar:</strong> IT-Projekte scheitern selten an der Technik.
              Die Hauptursachen sind <em>organisatorisch</em> &mdash; fehlende Strategie, mangelnde
              Führungsunterstützung, unterschätzte Prozesskomplexität und der Widerstand
              gegen Veränderung.
            </p>
          </div>

          <h4 className="font-medium mt-2">Die 5 häufigsten Fehlerursachen:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-lg font-bold text-red-400">1</span>
              <div>
                <div className="font-medium text-red-300">Unterschätzte Prozesskomplexität</div>
                <div className="text-sm text-slate-400">
                  Über Jahrzehnte gewachsene, heterogene Systemumgebungen mit Hunderten
                  Sonderprozessen sind schwer zu durchdringen und zu migrieren.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-lg font-bold text-red-400">2</span>
              <div>
                <div className="font-medium text-red-300">Mangelnde Beratungsqualität</div>
                <div className="text-sm text-slate-400">
                  Fehlende erfahrene Fachkräfte auf Beraterseite führen zu Fehleinschätzungen
                  und falschen Empfehlungen &mdash; gerade bei komplexen Branchenprozessen.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-lg font-bold text-red-400">3</span>
              <div>
                <div className="font-medium text-red-300">Mangelnde Transparenz technischer Risiken</div>
                <div className="text-sm text-slate-400">
                  Technische Risiken (z.B. Datenmigrationsaufwand, Schnittstellenkomplexität)
                  werden nicht rechtzeitig erkannt oder verschwiegen.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-lg font-bold text-red-400">4</span>
              <div>
                <div className="font-medium text-red-300">Überoptimistische Projektplanung</div>
                <div className="text-sm text-slate-400">
                  Aufwand, Zeit und Budget werden systematisch unterschätzt &mdash; oft um den
                  Zuschlag für das Projekt zu bekommen.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-lg font-bold text-red-400">5</span>
              <div>
                <div className="font-medium text-red-300">Entscheidungsparalyse</div>
                <div className="text-sm text-slate-400">
                  Schwierige Entscheidungen werden aufgeschoben, weil Verantwortlichkeiten
                  unklar sind oder Konsens fehlt &mdash; das Projekt verliert Momentum.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2 text-slate-300">Ursache-Wirkungs-Ketten:</h4>
            <MermaidDiagram chart={failureCauseEffectDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          </div>

          <div className="p-3 bg-blue-900/20 rounded border border-blue-800 text-sm">
            <strong>CRM-Projekte zeigen das gleiche Muster:</strong> Mangel an bereichsübergreifender
            Koordination, keine Business-Strategie, fehlende Prozessänderungen und mangelnde
            Senior-Executive-Unterstützung. Das Problem ist immer organisatorisch, nicht technisch.
          </div>
        </div>
      ),
    },

    // ── Section 3: The Golden Rule ──
    {
      id: 'goldene-regel',
      title: 'Die Goldene Regel',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700">
            <h4 className="font-bold text-amber-300 mb-2">Goldene Regel der IT-Einführung</h4>
            <p className="text-lg text-center font-mono text-amber-200">
              1) Prozess &rarr; 2) System
            </p>
            <p className="text-center text-sm text-red-400 mt-1">
              NICHT: 1) System &rarr; 2) Prozess
            </p>
          </div>

          <p>
            Bevor ein Systemanbieter gewählt wird, müssen zuerst die <strong>IST-Prozesse</strong>{' '}
            analysiert und dokumentiert werden. Nur wer seine eigenen Abläufe kennt, kann
            beurteilen, welches System diese am besten unterstützt. Wer zuerst das System
            wählt, riskiert, dass die Unternehmensprozesse nicht abbildbar sind.
          </p>

          <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
            <h4 className="font-medium text-red-300 mb-2">Warnendes Beispiel: Lidl-SAP-Desaster</h4>
            <p className="text-sm text-slate-300">
              Lidl investierte geschätzt über <strong>500 Mio. Euro</strong> in ein SAP-Projekt,
              das nach 7 Jahren abgebrochen wurde. Einer der Hauptgründe: Die bestehenden
              Geschäftsprozesse konnten im neuen System nicht abgebildet werden, da die
              Systemauswahl vor der Prozessanalyse stattfand.
            </p>
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> Die Goldene Regel wird häufig in verschiedenen
            Formulierungen abgefragt. Merke: Immer erst den Prozess verstehen, dann das
            System wählen - nicht umgekehrt!
          </div>
        </div>
      ),
    },

    // ── Section 4: Organisational Change Management & CMMI ──
    {
      id: 'cmmi',
      title: 'Change Management & CMMI',
      content: (
        <div className="space-y-4">
          <p>
            Wie stellt man sicher, dass eine Organisation bereit für eine große
            IT-Veränderung ist? Dafür gibt es zwei Konzepte: <strong>Organisational
            Change Management</strong> als Disziplin und <strong>CMMI</strong> als Maßstab
            für die Reife.
          </p>

          <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700">
            <p className="text-cyan-200">
              <strong>Organisational Change Management (OCM)</strong> ist die Methode, um
              Akzeptanz für Veränderungen bei Mitarbeitern zu schaffen. Es geht um
              Kommunikation, Schulung und Einbindung &mdash; nicht um Technik.
            </p>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200">
              <strong>Organisational Readiness</strong> = Die Bereitschaft und Fähigkeit einer
              Organisation zur Veränderung. Geeignete begleitende Maßnahmen zur Bewertung
              und Steigerung der Readiness:
            </p>
            <ul className="text-sm text-blue-300 mt-2 space-y-1 list-disc list-inside">
              <li><strong>CMMI</strong> (Capability Maturity Model Integration) &mdash; misst den Prozessreifegrad</li>
              <li><strong>ITIL</strong> (IT Infrastructure Library) &mdash; Best Practices für IT-Service-Management</li>
            </ul>
          </div>

          <h4 className="font-medium mt-4 mb-2">CMMI &mdash; 5 Reifegrade</h4>
          <div className="space-y-3">
            <div className="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-300">Level 1: Initial</span>
                <span className="text-xs text-slate-500">Chaotisch</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Ad-hoc-Prozesse, Erfolg hängt von Einzelpersonen ab. Keine definierten
                Vorgehensweisen &mdash; jedes Projekt erfindet das Rad neu.
              </p>
            </div>
            <div className="p-3 bg-amber-900/30 rounded-lg border-l-4 border-amber-500 ml-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-300">Level 2: Managed</span>
                <span className="text-xs text-slate-500">Geplant</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Grundlegendes Projektmanagement etabliert. Projekte haben Pläne,
                Meilensteine und werden aktiv überwacht. Ergebnisse sind wiederholbar.
              </p>
            </div>
            <div className="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-500 ml-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-300">Level 3: Defined</span>
                <span className="text-xs text-slate-500">Standardisiert</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Standardprozesse <em>organisationsweit</em> definiert und dokumentiert.
                Nicht nur einzelne Projekte, sondern die ganze Organisation arbeitet
                nach einheitlichen Vorgehensweisen.
              </p>
            </div>
            <div className="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-500 ml-12">
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-300">Level 4: Quantitatively Managed</span>
                <span className="text-xs text-slate-500">Gemessen</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Prozesse werden durch Metriken und statistische Methoden quantitativ
                gesteuert. Abweichungen werden erkannt und korrigiert.
              </p>
            </div>
            <div className="p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-500 ml-16">
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-300">Level 5: Optimizing</span>
                <span className="text-xs text-slate-500">Kontinuierlich</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Kontinuierliche, proaktive Verbesserung. Die Organisation erkennt
                Schwächen selbst und optimiert Prozesse systematisch weiter.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2 text-slate-300">CMMI-Reifegradprogression:</h4>
            <MermaidDiagram chart={cmmiProgressionDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          </div>

          <div className="p-3 bg-amber-900/20 rounded border border-amber-800 text-sm">
            <strong>Mindestens CMMI Level 2 nötig für ERP-Rollout.</strong> Dieser kann sich
            während des Rollouts als Teil des Projekts erhöhen.
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> Die CMMI-Stufen und ihre Beschreibungen werden
            häufig abgefragt. Merke die Schlüsselwörter: Initial=Chaotisch, Managed=Geplant,
            Defined=Standardisiert, Quantitatively Managed=Gemessen, Optimizing=Kontinuierlich.
          </div>
        </div>
      ),
    },

    // ── Section 5: Erfolgsfaktoren ──
    {
      id: 'erfolgsfaktoren',
      title: 'Erfolgsfaktoren digitaler Transformationsprojekte',
      content: (
        <div className="space-y-4">
          <p>
            Jede der fünf Fehlerursachen hat eine Kehrseite &mdash; einen Erfolgsfaktor.
            Diese lassen sich in drei Säulen einteilen, die alle gleichzeitig erfüllt
            sein müssen. Fehlt eine, kippt das Projekt.
          </p>

          <div className="grid gap-3 md:grid-cols-3 mt-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <h4 className="font-bold text-blue-300 mb-2">Strategie</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li><strong>Prozess vor System</strong> &mdash; IST-Prozesse analysieren, dann
                  System wählen. Verhindert Fehler #1 (Prozesskomplexität unterschätzt)</li>
                <li><strong>Klare Zieldefinition</strong> &mdash; messbare Ziele vereinbaren,
                  damit Erfolg überprüfbar wird</li>
                <li><strong>Realistische Planung</strong> &mdash; Zeit, Budget und Ressourcen
                  ehrlich schätzen. Verhindert Fehler #4 (überoptimistische Planung)</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
              <h4 className="font-bold text-purple-300 mb-2">Menschen</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li><strong>Stakeholder-Einbindung</strong> &mdash; Betroffene frühzeitig
                  einbinden, um Widerstand zu vermeiden. Verhindert Fehler #5
                  (Entscheidungsparalyse)</li>
                <li><strong>Führungsunterstützung</strong> &mdash; Senior Executive Sponsoring
                  sicherstellen, das Projekt braucht Rückhalt von oben</li>
                <li><strong>Schulung und Training</strong> &mdash; Mitarbeiter <em>befähigen</em>,
                  nicht nur informieren. OCM in der Praxis</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
              <h4 className="font-bold text-amber-300 mb-2">Technik & Prozesse</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li><strong>CMMI Readiness</strong> &mdash; mind. Level 2 vor dem Rollout
                  erreichen, sonst fehlt die organisatorische Basis</li>
                <li><strong>Qualitätssicherung</strong> &mdash; Standards und Kontrollen
                  etablieren. Verhindert Fehler #2 (mangelnde Beratungsqualität)</li>
                <li><strong>Risikomanagement</strong> &mdash; technische Risiken transparent
                  kommunizieren. Verhindert Fehler #3 (versteckte Risiken)</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <MermaidDiagram chart={erfolgsfaktorenDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          </div>

          <div className="p-3 bg-red-900/20 rounded border border-red-800 text-sm">
            <strong>Klausur-Hinweis:</strong> In Aufgaben wird oft nach Maßnahmen gefragt,
            um ein gescheitertes Projekt zu retten. Antworte immer entlang der drei
            Säulen: Strategie (Prozess vor System), Menschen (Stakeholder einbinden,
            Führung sichern) und Technik (CMMI, Qualitätssicherung, Risikomanagement).
          </div>
        </div>
      ),
    },
  ],

  // ─────────────────────────────────────────────────
  // Quiz
  // ─────────────────────────────────────────────────

  quiz: {
    questions: [
      {
        id: 'pcm-goldene-regel',
        type: 'multiple-choice',
        question: 'Was besagt die "Goldene Regel" bei IT-Einführungen?',
        options: [
          'Erst die IST-Prozesse analysieren, dann den Systemanbieter wählen',
          'Erst den günstigsten Anbieter wählen, dann die Prozesse anpassen',
          'Best-of-Breed Strategie immer bevorzugen',
          'Customization vor Configuration durchführen',
        ],
        correctAnswer: 'Erst die IST-Prozesse analysieren, dann den Systemanbieter wählen',
        explanation: 'Die goldene Regel: 1) Prozess -> 2) System. Vor der Systemauswahl müssen die IST-Prozesse dokumentiert werden, damit diese im neuen System abgebildet werden können (Lidl-SAP-Desaster als warnendes Beispiel).',
      },
      {
        id: 'pcm-scheitern-grund',
        type: 'multiple-choice',
        question: 'Was ist KEIN typischer Grund für das Scheitern von ERP-Projekten?',
        options: [
          'Zu niedrige Softwarelizenzkosten',
          'Unterschätzte Prozesskomplexität',
          'Mangelnde Beratungsqualität',
          'Entscheidungsparalyse',
        ],
        correctAnswer: 'Zu niedrige Softwarelizenzkosten',
        explanation: 'Typische Gründe für ERP-Scheitern: Prozesskomplexität, mangelnde Beratungsqualität, fehlende Transparenz technischer Risiken, überoptimistische Planung, Entscheidungsparalyse. Zu niedrige Lizenzkosten sind kein Problem.',
      },
      {
        id: 'pcm-crm-scheitern',
        type: 'multiple-choice',
        question: 'CRM-Projekte haben eine unterdurchschnittlich niedrige Misserfolgsquote von etwa 10%, da sie hauptsächlich technische Herausforderungen darstellen.',
        options: ['Wahr', 'Falsch'],
        correctAnswer: 'Falsch',
        explanation: 'Falsch! CRM-Projekte haben eine Misserfolgsquote von ca. 50%. Der Hauptgrund ist der "Faktor Mensch/Strategie", nicht Technik.',
      },
      {
        id: 'pcm-cmmi-level2',
        type: 'multiple-choice',
        question: 'Welcher CMMI-Reifegrad ist mindestens erforderlich, um eine hinreichende Organisational Readiness für einen ERP-Template-Rollout zu erreichen?',
        options: [
          'Level 2: Managed',
          'Level 1: Initial',
          'Level 3: Defined',
          'Level 5: Optimizing',
        ],
        correctAnswer: 'Level 2: Managed',
        explanation: 'Mindestens CMMI Level 2 (Managed) ist erforderlich. Dieser kann sich während des Rollouts als Teil des Projekts erhöhen.',
      },
      {
        id: 'pcm-cmmi-level3',
        type: 'multiple-choice',
        question: 'Welcher CMMI-Level zeichnet sich dadurch aus, dass Standardprozesse organisationsweit definiert und dokumentiert sind?',
        options: [
          'Level 3: Defined',
          'Level 2: Managed',
          'Level 4: Quantitatively Managed',
          'Level 1: Initial',
        ],
        correctAnswer: 'Level 3: Defined',
        explanation: 'CMMI Level 3 (Defined) = Standardprozesse sind organisationsweit definiert und dokumentiert. Level 2 hat nur grundlegendes Projektmanagement, Level 4 nutzt Metriken.',
      },
      {
        id: 'pcm-herausforderung',
        type: 'multiple-choice',
        question: 'IT-Implementationen (ERP, CRM) sind hauptsächlich ...',
        options: [
          '... organisatorische Herausforderungen',
          '... technologische Herausforderungen',
          '... finanzielle Herausforderungen',
          '... rechtliche Herausforderungen',
        ],
        correctAnswer: '... organisatorische Herausforderungen',
        explanation: 'IT-Implementationen sind hauptsächlich organisatorische und weniger technologische Herausforderungen. Der Faktor Mensch und Veränderungsbereitschaft ist entscheidend - das gilt für ERP und CRM gleichermaßen.',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // Exam Tasks
  // ─────────────────────────────────────────────────

  examTasks: [
    {
      id: 'pcm-projekterfolg-task',
      title: 'Analyse von Projekterfolg und -scheitern',
      points: 25,
      context: (
        <p>
          Ein mittelständisches Unternehmen (2.000 Mitarbeiter, 5 Standorte in 3 Ländern)
          plant die Einführung eines neuen ERP-Systems. Der IT-Leiter möchte direkt mit der
          Systemauswahl beginnen, um Zeit zu sparen. Die Geschäftsführung ist skeptisch, da
          ein früheres CRM-Projekt bereits gescheitert ist.
        </p>
      ),
      parts: [
        {
          id: 'pcm-task-a',
          type: 'free-text',
          question: 'Nennen Sie die 5 häufigsten Gründe, warum ERP-Projekte scheitern. (5 Punkte)',
          placeholder: '1. ...',
          modelAnswer: '1. Unterschätzte Prozesskomplexität - über Jahrzehnte gewachsene heterogene Systeme\n2. Mangelnde Beratungsqualität - fehlende erfahrene Fachkräfte\n3. Mangelnde Transparenz technischer Risiken - Risiken nicht kommuniziert\n4. Überoptimistische Projektplanung - Aufwand, Zeit, Budget unterschätzt\n5. Entscheidungsparalyse - schwierige Entscheidungen aufgeschoben',
          keyPoints: [
            'Prozesskomplexität',
            'Beratungsqualität',
            'Technische Risikotransparenz',
            'Überoptimistische Planung',
            'Entscheidungsparalyse',
          ],
          explanation: 'Diese 5 Gründe gelten als die Hauptursachen für gescheiterte ERP-Projekte.',
        },
        {
          id: 'pcm-task-b',
          type: 'free-text',
          question: 'Warum ist der Vorschlag des IT-Leiters, direkt mit der Systemauswahl zu beginnen, problematisch? Begründen Sie mit der "Goldenen Regel". (8 Punkte)',
          placeholder: 'Die Reihenfolge sollte...',
          modelAnswer: 'Die Goldene Regel besagt: 1) Prozess -> 2) System. Erst müssen die IST-Prozesse analysiert und dokumentiert werden, dann kann ein passendes System ausgewählt werden. Sonst besteht das Risiko, dass die Unternehmensprozesse nicht im neuen System abgebildet werden können (siehe Lidl-SAP-Desaster: >500 Mio. EUR Verlust). Der IT-Leiter will die Reihenfolge umkehren - genau der Fehler, der häufig zu Projektscheitern führt.',
          keyPoints: [
            'Goldene Regel: Prozess vor System',
            'IST-Prozesse zuerst analysieren',
            'Risiko bei falscher Reihenfolge',
            'Lidl-SAP als warnendes Beispiel',
          ],
          explanation: 'Prozess vor System - die goldene Regel der IT-Einführung.',
        },
        {
          id: 'pcm-task-c',
          type: 'free-text',
          question: 'Welchen CMMI-Reifegrad benötigt das Unternehmen mindestens? Beschreiben Sie kurz alle 5 CMMI-Level. (12 Punkte)',
          placeholder: 'Mindestens CMMI Level...',
          modelAnswer: 'Mindestens CMMI Level 2 (Managed) für den ERP-Rollout.\n\nDie 5 Level:\n1. Initial - Chaotisch, ad-hoc, unvorhersehbar\n2. Managed - Geplant, überwacht, grundlegendes PM\n3. Defined - Organisationsweite Standardprozesse\n4. Quantitatively Managed - Metriken, statistische Kontrolle\n5. Optimizing - Kontinuierliche proaktive Verbesserung\n\nDer Reifegrad kann sich während des Rollouts als Teil des Projekts erhöhen.',
          keyPoints: [
            'Mind. Level 2 erforderlich',
            'Level 1: Initial/Chaotisch',
            'Level 2: Managed/Geplant',
            'Level 3: Defined/Standardisiert',
            'Level 4: Quantitatively Managed/Gemessen',
            'Level 5: Optimizing/Kontinuierlich',
          ],
          explanation: 'CMMI-Stufen sind ein Standardthema in der Klausur.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────
  // Related Topics & Connection Diagram
  // ─────────────────────────────────────────────────

  relatedTopics: [
    { id: 'erp-systeme', title: 'ERP-Systeme', relationship: 'ERP-Implementierung managen' },
    { id: 'sap-plattform', title: 'SAP-Plattform', relationship: 'SAP-Rollout Readiness' },
  ],

  connectionDiagram: `
flowchart LR
  subgraph PCM["Projekt & Change Management"]
    GR["Goldene Regel\nProzess vor System"]
    CMMI["CMMI\nReadiness"]
    EF["Erfolgs-\nfaktoren"]
  end

  subgraph Anwendung["Anwendungsgebiete"]
    ERP["ERP-Systeme"]
    SAP["SAP-Plattform"]
  end

  GR -->|steuert| ERP
  GR -->|steuert| SAP
  CMMI -->|Voraussetzung| ERP
  CMMI -->|Voraussetzung| SAP
  EF -->|sichert| ERP
  EF -->|sichert| SAP

  style GR fill:#78350f,stroke:#f59e0b
  style CMMI fill:#3b0764,stroke:#a855f7
  style EF fill:#14532d,stroke:#22c55e
  style ERP fill:#1e3a5f,stroke:#3b82f6
  style SAP fill:#164e63,stroke:#06b6d4
`,
}
