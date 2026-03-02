// src/content/wirtschaftsrecht/diagrams/AnfechtungDecisionTree.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

type NodeType = 'question' | 'choice' | 'result'

interface TreeNode {
  id: string
  type: NodeType
  color: HighlightColor
  title: string
  description?: string
  paragraph?: string
  options?: { label: string; nextId: string }[]
}

const nodes: Record<string, TreeNode> = {
  start: {
    id: 'start',
    type: 'question',
    color: 'blue',
    title: 'Liegt ein Anfechtungsgrund vor?',
    description: 'Erster Prüfungsschritt: Gibt es einen gesetzlich anerkannten Grund für die Anfechtung?',
    options: [
      { label: 'Ja — Grund auswählen', nextId: 'grund_wahl' },
      { label: 'Nein', nextId: 'kein_grund' },
    ],
  },
  kein_grund: {
    id: 'kein_grund',
    type: 'result',
    color: 'red',
    title: 'Keine Anfechtung möglich',
    description: 'Ohne Anfechtungsgrund ist eine Anfechtung ausgeschlossen. Die Willenserklärung bleibt wirksam.',
  },
  grund_wahl: {
    id: 'grund_wahl',
    type: 'choice',
    color: 'purple',
    title: 'Welcher Anfechtungsgrund liegt vor?',
    description: 'Wähle den einschlägigen Anfechtungsgrund:',
    options: [
      { label: 'Erklärungsirrtum (§ 119 I Alt. 2)', nextId: 'erklaerungsirrtum' },
      { label: 'Inhaltsirrtum (§ 119 I Alt. 1)', nextId: 'inhaltsirrtum' },
      { label: 'Eigenschaftsirrtum (§ 119 II)', nextId: 'eigenschaftsirrtum' },
      { label: 'Arglistige Täuschung (§ 123 I Alt. 1)', nextId: 'taeuschung' },
      { label: 'Widerrechtliche Drohung (§ 123 I Alt. 2)', nextId: 'drohung' },
    ],
  },
  erklaerungsirrtum: {
    id: 'erklaerungsirrtum',
    type: 'question',
    color: 'amber',
    title: 'Erklärungsirrtum (§ 119 I Alt. 2)',
    paragraph: '§ 119 I Alt. 2',
    description:
      'Verschreiber, Versprecher, Vergreifen — der Erklärende hat etwas anderes erklärt, als er erklären wollte. Beispiel: Er schreibt "100" statt "1.000".',
    options: [{ label: 'Weiter: Anfechtungserklärung', nextId: 'erklaerung_119' }],
  },
  inhaltsirrtum: {
    id: 'inhaltsirrtum',
    type: 'question',
    color: 'amber',
    title: 'Inhaltsirrtum (§ 119 I Alt. 1)',
    paragraph: '§ 119 I Alt. 1',
    description:
      'Der Erklärende weiß, was er sagt, verkennt aber die rechtliche Bedeutung. Beispiel: Er denkt, "brutto" bedeute "ohne Steuern".',
    options: [{ label: 'Weiter: Anfechtungserklärung', nextId: 'erklaerung_119' }],
  },
  eigenschaftsirrtum: {
    id: 'eigenschaftsirrtum',
    type: 'question',
    color: 'amber',
    title: 'Eigenschaftsirrtum (§ 119 II)',
    paragraph: '§ 119 II',
    description:
      'Irrtum über eine verkehrswesentliche Eigenschaft der Person oder Sache. Beispiel: Ein als echt gekauftes Gemälde ist eine Fälschung.',
    options: [{ label: 'Weiter: Anfechtungserklärung', nextId: 'erklaerung_119' }],
  },
  taeuschung: {
    id: 'taeuschung',
    type: 'question',
    color: 'red',
    title: 'Arglistige Täuschung (§ 123 I Alt. 1)',
    paragraph: '§ 123 I Alt. 1',
    description:
      'Vorsätzliche Irreführung durch Vorspiegeln falscher oder Unterdrücken wahrer Tatsachen. Der Anfechtungsgegner oder ein Dritter hat den Irrtum vorsätzlich erregt.',
    options: [{ label: 'Weiter: Anfechtungserklärung', nextId: 'erklaerung_123' }],
  },
  drohung: {
    id: 'drohung',
    type: 'question',
    color: 'red',
    title: 'Widerrechtliche Drohung (§ 123 I Alt. 2)',
    paragraph: '§ 123 I Alt. 2',
    description:
      'Bestimmung zur Abgabe einer WE durch Ankündigung eines empfindlichen Übels, auf das der Drohende keinen Anspruch hat.',
    options: [{ label: 'Weiter: Anfechtungserklärung', nextId: 'erklaerung_123' }],
  },
  erklaerung_119: {
    id: 'erklaerung_119',
    type: 'question',
    color: 'cyan',
    title: 'Anfechtungserklärung abgegeben? (§ 143)',
    paragraph: '§ 143',
    description:
      'Die Anfechtung erfolgt durch Erklärung gegenüber dem Anfechtungsgegner (§ 143 I). Sie muss den Anfechtungswillen erkennen lassen (das Wort "Anfechtung" ist nicht erforderlich).',
    options: [
      { label: 'Ja', nextId: 'frist_119' },
      { label: 'Nein', nextId: 'keine_erklaerung' },
    ],
  },
  erklaerung_123: {
    id: 'erklaerung_123',
    type: 'question',
    color: 'cyan',
    title: 'Anfechtungserklärung abgegeben? (§ 143)',
    paragraph: '§ 143',
    description:
      'Die Anfechtung muss gegenüber dem Anfechtungsgegner erklärt werden. Bei Täuschung/Drohung durch Dritte gelten besondere Regeln (§ 123 II).',
    options: [
      { label: 'Ja', nextId: 'frist_123' },
      { label: 'Nein', nextId: 'keine_erklaerung' },
    ],
  },
  keine_erklaerung: {
    id: 'keine_erklaerung',
    type: 'result',
    color: 'red',
    title: 'Keine wirksame Anfechtung',
    description: 'Ohne Anfechtungserklärung gem. § 143 kann die Anfechtung nicht wirksam werden.',
  },
  frist_119: {
    id: 'frist_119',
    type: 'question',
    color: 'green',
    title: 'Frist eingehalten? — Unverzüglich (§ 121)',
    paragraph: '§ 121',
    description:
      'Bei § 119: Die Anfechtung muss unverzüglich (= ohne schuldhaftes Zögern) nach Kenntnis des Anfechtungsgrundes erfolgen. Absolute Frist: 10 Jahre (§ 121 II).',
    options: [
      { label: 'Ja — fristgerecht', nextId: 'ausschluss' },
      { label: 'Nein — verfristet', nextId: 'verfristet' },
    ],
  },
  frist_123: {
    id: 'frist_123',
    type: 'question',
    color: 'green',
    title: 'Frist eingehalten? — Ein Jahr (§ 124)',
    paragraph: '§ 124',
    description:
      'Bei § 123: Die Anfechtung muss innerhalb eines Jahres ab Entdeckung der Täuschung bzw. Wegfall der Zwangslage erfolgen. Absolute Frist: 10 Jahre (§ 124 III).',
    options: [
      { label: 'Ja — fristgerecht', nextId: 'ausschluss' },
      { label: 'Nein — verfristet', nextId: 'verfristet' },
    ],
  },
  verfristet: {
    id: 'verfristet',
    type: 'result',
    color: 'red',
    title: 'Anfechtung verfristet',
    description: 'Die Anfechtungsfrist wurde nicht eingehalten. Die Willenserklärung bleibt wirksam.',
  },
  ausschluss: {
    id: 'ausschluss',
    type: 'question',
    color: 'green',
    title: 'Kein Ausschlussgrund?',
    description:
      'Liegt ein Ausschluss vor? Z.B. Bestätigung des anfechtbaren Rechtsgeschäfts (§ 144), oder bei § 119: Anfechtung ausgeschlossen wenn der Erklärende das Risiko kannte.',
    options: [
      { label: 'Kein Ausschluss', nextId: 'erfolg' },
      { label: 'Ausschluss liegt vor', nextId: 'ausgeschlossen' },
    ],
  },
  ausgeschlossen: {
    id: 'ausgeschlossen',
    type: 'result',
    color: 'red',
    title: 'Anfechtung ausgeschlossen',
    description: 'Die Anfechtung ist z.B. durch Bestätigung (§ 144) ausgeschlossen. Die WE bleibt wirksam.',
  },
  erfolg: {
    id: 'erfolg',
    type: 'result',
    color: 'green',
    title: 'Anfechtung erfolgreich!',
    paragraph: '§ 142 I',
    description:
      'Die Willenserklärung ist gem. § 142 I von Anfang an nichtig (ex tunc). Bei Anfechtung nach § 119: Schadensersatzpflicht des Anfechtenden gem. § 122 (Vertrauensschaden).',
  },
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function AnfechtungDecisionTree({ className = '' }: { className?: string }) {
  const [path, setPath] = useState<string[]>(['start'])

  const currentId = path[path.length - 1]
  const currentNode = nodes[currentId]
  const tokens = highlightColors[currentNode.color]

  const handleChoice = (nextId: string) => {
    setPath((prev) => [...prev, nextId])
  }

  const handleBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1))
    }
  }

  const handleReset = () => {
    setPath(['start'])
  }

  return (
    <DiagramShell
      title="Anfechtungsprüfung"
      subtitle="Entscheidungsbaum zur Prüfung einer Anfechtung"
      className={className}
      footer="Klicke dich durch die Prüfungsschritte"
    >
      {/* Progress breadcrumb */}
      <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        {path.map((nodeId, index) => {
          const node = nodes[nodeId]
          const nodeTokens = highlightColors[node.color]
          const isLast = index === path.length - 1
          return (
            <div key={`${nodeId}-${index}`} className="flex items-center gap-1">
              <button
                onClick={() => setPath(path.slice(0, index + 1))}
                className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors
                  ${isLast ? `${nodeTokens.highlight} ${nodeTokens.text}` : 'hover:text-slate-300'}`}
              >
                {node.title.length > 30 ? node.title.slice(0, 30) + '...' : node.title}
              </button>
              {!isLast && <span>→</span>}
            </div>
          )
        })}
      </div>

      {/* Current Node */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border}`}
        >
          {/* Paragraph badge */}
          {currentNode.paragraph && (
            <span
              className={`inline-block px-1.5 py-0.5 mb-3 ${tokens.bg} border ${tokens.border} rounded ${tokens.text} text-sm font-mono`}
            >
              {currentNode.paragraph}
            </span>
          )}

          {/* Title */}
          <h4 className={`font-semibold text-lg mb-2 ${tokens.text}`}>{currentNode.title}</h4>

          {/* Description */}
          {currentNode.description && (
            <p className="text-sm text-slate-300 mb-4">{currentNode.description}</p>
          )}

          {/* Options */}
          {currentNode.options && (
            <div className="space-y-2">
              {currentNode.options.map((option) => (
                <motion.button
                  key={option.nextId}
                  onClick={() => handleChoice(option.nextId)}
                  className="w-full text-left p-3 rounded-lg bg-slate-800/60 border border-slate-600 text-sm text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Result state */}
          {currentNode.type === 'result' && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-2xl`}>{currentNode.color === 'green' ? '\u2713' : '\u2717'}</span>
              <span className={`text-sm font-medium ${tokens.text}`}>
                {currentNode.color === 'green' ? 'Prüfung abgeschlossen' : 'Anfechtung scheitert'}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={path.length <= 1}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Zurück
        </button>
        <span className="text-xs text-slate-600">
          Schritt {path.length} von {currentNode.type === 'result' ? path.length : '?'}
        </span>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Neustart
        </button>
      </div>
    </DiagramShell>
  )
}
