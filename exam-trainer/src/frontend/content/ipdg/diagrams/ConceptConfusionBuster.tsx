// src/content/ipdg/diagrams/ConceptConfusionBuster.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'

export interface ConceptPair {
  id: string
  conceptA: {
    term: string
    definition: string
    keyPoints: string[]
    icon: string
  }
  conceptB: {
    term: string
    definition: string
    keyPoints: string[]
    icon: string
  }
  keyDifference: string
  examTip: string
  colorA: string
  colorB: string
}

const defaultConceptPairs: ConceptPair[] = [
  {
    id: 'config-custom',
    conceptA: {
      term: 'Konfiguration',
      definition: 'Einstellung von Parametern innerhalb vorgesehener Optionen',
      keyPoints: [
        'Keine Programmierung noetig',
        'Tabellen/Parameter anpassen',
        'Update-sicher',
        'Schnell umsetzbar',
      ],
      icon: '⚙️',
    },
    conceptB: {
      term: 'Customization',
      definition: 'Individuelle Anpassung durch Programmierung',
      keyPoints: [
        'Eigener Code erforderlich',
        'ABAP/Erweiterungen',
        'Update-Risiko',
        'Mehr Aufwand',
      ],
      icon: '🔧',
    },
    keyDifference: 'Konfiguration = Schalter umlegen | Customization = Code schreiben',
    examTip: 'SAP empfiehlt: "Configure, don\'t customize" - Konfiguration ist immer vorzuziehen!',
    colorA: 'from-emerald-500 to-emerald-700',
    colorB: 'from-orange-500 to-orange-700',
  },
  {
    id: 'oltp-olap',
    conceptA: {
      term: 'OLTP',
      definition: 'Online Transaction Processing - operative Datenbankverarbeitung',
      keyPoints: [
        'Schreiben & Lesen',
        'Viele kleine Transaktionen',
        'Normalisierte Datenbank',
        'Aktueller Zustand',
      ],
      icon: '💾',
    },
    conceptB: {
      term: 'OLAP',
      definition: 'Online Analytical Processing - analytische Datenabfragen',
      keyPoints: [
        'Nur Lesen',
        'Komplexe Abfragen',
        'Sternschema/Cubes',
        'Historische Daten',
      ],
      icon: '📊',
    },
    keyDifference: 'OLTP = Tagesgeschaeft speichern | OLAP = Daten analysieren',
    examTip: 'OLTP ist fuer ERP-Systeme (Buchungen), OLAP fuer BI/Data Warehouse (Auswertungen)!',
    colorA: 'from-green-500 to-green-700',
    colorB: 'from-purple-500 to-purple-700',
  },
  {
    id: 'crm-types',
    conceptA: {
      term: 'Analytisches CRM',
      definition: 'Datenanalyse und Kundenverhalten verstehen',
      keyPoints: [
        'Data Mining',
        'Data Warehouse',
        'Kundensegmentierung',
        'Share of Wallet',
      ],
      icon: '📈',
    },
    conceptB: {
      term: 'Operatives CRM',
      definition: 'Praktische Umsetzung von Kundeninteraktionen',
      keyPoints: [
        'Kampagnenmanagement',
        'Sales Automation',
        'Service & Support',
        'Front-Office Systeme',
      ],
      icon: '⚡',
    },
    keyDifference: 'Analytisch = Daten auswerten | Operativ = Massnahmen umsetzen',
    examTip: 'Analytisch nutzt BI-Methoden, Operativ ist die praktische Umsetzung in Salesforce & Co.!',
    colorA: 'from-cyan-500 to-cyan-700',
    colorB: 'from-amber-500 to-amber-700',
  },
  {
    id: 'dw-dl',
    conceptA: {
      term: 'Data Warehouse',
      definition: 'Strukturierte, aufbereitete Daten fuer Analysen',
      keyPoints: [
        'Schema-on-Write',
        'ETL vor Speicherung',
        'Strukturierte Daten',
        'Hohe Datenqualitaet',
      ],
      icon: '🏢',
    },
    conceptB: {
      term: 'Data Lake',
      definition: 'Rohdaten aller Art in urspruenglichem Format',
      keyPoints: [
        'Schema-on-Read',
        'ELT - erst bei Abfrage',
        'Alle Datenformate',
        'Flexibel & guenstig',
      ],
      icon: '🌊',
    },
    keyDifference: 'Warehouse = sauberes Lager | Lake = Rohdaten-See',
    examTip: 'Data Warehouse: Daten VOR dem Speichern aufbereiten. Data Lake: Rohdaten rein, spaeter aufbereiten!',
    colorA: 'from-blue-500 to-blue-700',
    colorB: 'from-teal-500 to-teal-700',
  },
]

interface FlipCardProps {
  pair: ConceptPair
  isFlipped: boolean
  onFlip: () => void
}

function FlipCard({ pair, isFlipped, onFlip }: FlipCardProps) {
  return (
    <div
      className="relative h-80 cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card - Both Concepts */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl bg-slate-800 border border-slate-700 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full flex flex-col">
            {/* Concept A */}
            <div className={`flex-1 p-4 bg-gradient-to-br ${pair.colorA}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{pair.conceptA.icon}</span>
                <h4 className="font-bold text-white">{pair.conceptA.term}</h4>
              </div>
              <p className="text-sm text-white/90">{pair.conceptA.definition}</p>
            </div>

            {/* VS Divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-300">VS</span>
              </div>
            </div>

            {/* Concept B */}
            <div className={`flex-1 p-4 bg-gradient-to-br ${pair.colorB}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{pair.conceptB.icon}</span>
                <h4 className="font-bold text-white">{pair.conceptB.term}</h4>
              </div>
              <p className="text-sm text-white/90">{pair.conceptB.definition}</p>
            </div>
          </div>

          {/* Tap hint */}
          <div className="absolute bottom-2 right-2 text-xs text-white/50 bg-black/30 px-2 py-1 rounded">
            Tippen zum Umdrehen
          </div>
        </div>

        {/* Back of Card - Key Differences */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl bg-slate-800 border border-slate-700 p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col">
            <h4 className="text-center font-semibold text-slate-200 mb-4">
              {pair.conceptA.term} vs. {pair.conceptB.term}
            </h4>

            {/* Side by side comparison */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              {/* Concept A Points */}
              <div className={`p-3 rounded-lg bg-gradient-to-br ${pair.colorA} bg-opacity-20`}>
                <div className="flex items-center gap-1 mb-2">
                  <span>{pair.conceptA.icon}</span>
                  <span className="text-xs font-medium text-white">{pair.conceptA.term}</span>
                </div>
                <ul className="space-y-1">
                  {pair.conceptA.keyPoints.map((point, i) => (
                    <li key={i} className="text-xs text-white/80 flex items-start gap-1">
                      <span className="text-green-400">+</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concept B Points */}
              <div className={`p-3 rounded-lg bg-gradient-to-br ${pair.colorB} bg-opacity-20`}>
                <div className="flex items-center gap-1 mb-2">
                  <span>{pair.conceptB.icon}</span>
                  <span className="text-xs font-medium text-white">{pair.conceptB.term}</span>
                </div>
                <ul className="space-y-1">
                  {pair.conceptB.keyPoints.map((point, i) => (
                    <li key={i} className="text-xs text-white/80 flex items-start gap-1">
                      <span className="text-blue-400">+</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Difference */}
            <div className="mt-3 p-2 bg-slate-700 rounded-lg">
              <p className="text-xs text-center text-slate-200 font-medium">
                {pair.keyDifference}
              </p>
            </div>

            {/* Exam Tip */}
            <div className="mt-2 p-2 bg-amber-900/40 rounded-lg border border-amber-700">
              <p className="text-xs text-amber-200">
                <span className="font-bold">Pruefungstipp:</span> {pair.examTip}
              </p>
            </div>

            {/* Tap hint */}
            <div className="absolute bottom-2 right-2 text-xs text-slate-500">
              Tippen zum Zurueck
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export interface ConceptConfusionBusterProps {
  conceptPairs?: ConceptPair[]
  title?: string
  className?: string
}

export function ConceptConfusionBuster({
  conceptPairs = defaultConceptPairs,
  title = 'Concept Confusion Buster',
  className = '',
}: ConceptConfusionBusterProps = {}) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const flipAll = () => {
    const allIds = conceptPairs.map((p) => p.id)
    const allFlipped = allIds.every((id) => flippedCards.has(id))

    if (allFlipped) {
      setFlippedCards(new Set())
    } else {
      setFlippedCards(new Set(allIds))
    }
  }

  const allFlipped = conceptPairs.every((p) => flippedCards.has(p.id))

  return (
    <DiagramShell
      title={title}
      subtitle="Klicke auf eine Karte um die wichtigsten Unterschiede zu sehen"
      className={className}
      actions={
        <button
          onClick={flipAll}
          className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
        >
          {allFlipped ? 'Alle zurueckdrehen' : 'Alle umdrehen'}
        </button>
      }
      footer="Lerne die Unterschiede - diese werden gerne in Pruefungen abgefragt!"
    >
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conceptPairs.map((pair) => (
          <FlipCard
            key={pair.id}
            pair={pair}
            isFlipped={flippedCards.has(pair.id)}
            onFlip={() => toggleFlip(pair.id)}
          />
        ))}
      </div>
    </DiagramShell>
  )
}
