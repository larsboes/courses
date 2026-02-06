// src/content/ipdg/diagrams/DwhLayerDrillDown.tsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { useHighlightState } from '@/core/hooks'
import type { HighlightColor } from '@/core/styles/highlightColors'

interface DwhLayer {
  id: string
  label: string
  icon: string
  color: HighlightColor
  bgColor: string
  hoverColor: string
  description: string
  whatHappens: string
  exampleTransformation: string
  characteristics: string[]
}

const layers: DwhLayer[] = [
  {
    id: 'sources',
    label: 'Datenquellen',
    icon: '🗄️',
    color: 'red',
    bgColor: 'bg-slate-600',
    hoverColor: 'hover:bg-slate-500',
    description: 'Operative Systeme liefern Rohdaten',
    whatHappens: 'Daten entstehen in operativen Systemen durch tägliche Geschäftsprozesse. Jedes System hat eigene Formate und Strukturen.',
    exampleTransformation: 'ERP: Bestellung #12345 -> CRM: Kunde "Meier GmbH" -> Excel: Umsatzzahlen Q3',
    characteristics: [
      'Heterogene Datenformate',
      'OLTP-optimiert (schnelles Schreiben)',
      'Normalisierte Strukturen',
      'Aktuelle operative Daten',
    ],
  },
  {
    id: 'etl',
    label: 'ETL-Prozess',
    icon: '🔄',
    color: 'amber',
    bgColor: 'bg-amber-600',
    hoverColor: 'hover:bg-amber-500',
    description: 'Extract, Transform, Load',
    whatHappens: 'Daten werden aus Quellsystemen extrahiert, bereinigt, vereinheitlicht und in das Zielsystem geladen. Läuft meist nächtlich.',
    exampleTransformation: 'Kunde "MEIER GMBH" + "Meier GmbH" + "meier gmbh" -> vereinheitlicht zu "Meier GmbH" (Kunden-ID: K001)',
    characteristics: [
      'Extract: Daten aus Quellen lesen',
      'Transform: Bereinigen, Harmonisieren',
      'Load: In Zielsystem laden',
      'Batch-Verarbeitung (oft nächtlich)',
    ],
  },
  {
    id: 'staging',
    label: 'Staging Area',
    icon: '📦',
    color: 'cyan',
    bgColor: 'bg-cyan-600',
    hoverColor: 'hover:bg-cyan-500',
    description: 'Temporärer Zwischenspeicher',
    whatHappens: 'Rohdaten werden unbearbeitet zwischengespeichert. Ermöglicht Fehlerbehandlung und erneutes Laden ohne erneute Extraktion.',
    exampleTransformation: 'Rohdaten 1:1 kopiert, keine Transformation. Bei Fehler: Rollback möglich.',
    characteristics: [
      'Temporäre Speicherung',
      'Keine Transformation',
      'Ermöglicht Wiederherstellung',
      'Entkopplung von Quelle',
    ],
  },
  {
    id: 'warehouse',
    label: 'Data Warehouse',
    icon: '🏢',
    color: 'blue',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-500',
    description: 'Zentrale Datenhaltung',
    whatHappens: 'Alle Unternehmensdaten werden zentral, integriert und historisiert gespeichert. Optimiert für analytische Abfragen.',
    exampleTransformation: 'Faktentabelle: Umsatz (Betrag, Datum_FK, Produkt_FK, Kunde_FK) + Dimensionstabellen (Zeit, Produkt, Kunde)',
    characteristics: [
      'Sternschema / Snowflake',
      'Historisierte Daten',
      'Unternehmensweite Integration',
      'OLAP-optimiert (schnelles Lesen)',
    ],
  },
  {
    id: 'datamarts',
    label: 'Data Marts',
    icon: '🏬',
    color: 'purple',
    bgColor: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-500',
    description: 'Abteilungsspezifische Sichten',
    whatHappens: 'Abteilungen erhalten vorkonfigurierte Datenauszüge. Schneller Zugriff auf relevante Daten ohne komplexe Queries.',
    exampleTransformation: 'Vertriebsmart: Nur Umsatz, Kunden, Produkte | HR-Mart: Nur Mitarbeiter, Gehälter, Abteilungen',
    characteristics: [
      'Abteilungsspezifisch',
      'Schnellerer Zugriff',
      'Voraggregierte Daten',
      'Vereinfachte Struktur',
    ],
  },
  {
    id: 'olap',
    label: 'OLAP Cubes',
    icon: '🎲',
    color: 'blue',
    bgColor: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-500',
    description: 'Multidimensionale Analyse',
    whatHappens: 'Daten werden in Würfeln organisiert für schnelle multidimensionale Analysen mit Drill-Down, Roll-Up, Slice & Dice.',
    exampleTransformation: 'Umsatz nach: Zeit (Jahr->Quartal->Monat) x Produkt (Kategorie->Gruppe->Artikel) x Region (Land->Stadt)',
    characteristics: [
      'Multidimensionale Struktur',
      'Drill-Down / Roll-Up',
      'Slice & Dice',
      'Vorberechnete Aggregate',
    ],
  },
  {
    id: 'presentation',
    label: 'Präsentation',
    icon: '📊',
    color: 'green',
    bgColor: 'bg-green-600',
    hoverColor: 'hover:bg-green-500',
    description: 'Reports, Dashboards, KPIs',
    whatHappens: 'Endnutzer greifen über intuitive Oberflächen auf die Daten zu. Management-Entscheidungen werden unterstützt.',
    exampleTransformation: 'Dashboard: Umsatz Q3 +15%, Top 10 Kunden, Regionen-Heatmap, KPI-Ampeln',
    characteristics: [
      'Self-Service BI',
      'Interaktive Dashboards',
      'Automatisierte Reports',
      'KPI-Monitoring',
    ],
  },
]

interface DataParticle {
  id: number
  layer: number
  progress: number
}

interface DwhLayerDrillDownProps {
  className?: string
}

export function DwhLayerDrillDown({ className = '' }: DwhLayerDrillDownProps = {}) {
  const highlight = useHighlightState({ items: layers, defaultColor: 'blue' })
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<DataParticle[]>([])
  const [highlightedLayer, setHighlightedLayer] = useState(-1)

  const startDataFlow = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    highlight.clearSelection()
    setParticles([])
    setHighlightedLayer(0)

    // Create initial particles
    const initialParticles: DataParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      layer: 0,
      progress: i * 0.15,
    }))
    setParticles(initialParticles)
  }, [isAnimating, highlight.clearSelection])

  // Animation loop for particles
  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticles = prev.map((p) => {
          const newProgress = p.progress + 0.02
          if (newProgress >= 1) {
            if (p.layer < layers.length - 1) {
              return { ...p, layer: p.layer + 1, progress: 0 }
            }
            return { ...p, progress: 1.1 } // Mark for removal
          }
          return { ...p, progress: newProgress }
        }).filter((p) => p.progress <= 1.05)

        // Update highlighted layer based on leading particle
        if (newParticles.length > 0) {
          const maxLayer = Math.max(...newParticles.map((p) => p.layer))
          setHighlightedLayer(maxLayer)
        }

        // Stop animation when all particles are done
        if (newParticles.length === 0) {
          setIsAnimating(false)
          setHighlightedLayer(-1)
        }

        return newParticles
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  const selected = layers.find((l) => l.id === highlight.activeId)

  return (
    <DiagramShell
      title="Data Warehouse Architektur"
      className={className}
      actions={
        <button
          onClick={startDataFlow}
          disabled={isAnimating}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
        >
          <span>{isAnimating ? '...' : '>'}</span>
          Datenfluss starten
        </button>
      }
      footer="Klicke auf eine Schicht für Details oder starte den animierten Datenfluss"
    >
      {/* Architecture Layers with Particles */}
      <div className="relative space-y-1">
        {layers.map((layer, index) => (
          <div key={layer.id} className="relative">
            {/* Layer Box */}
            <motion.div
              className={`relative p-4 rounded-lg cursor-pointer transition-all ${layer.bgColor} ${layer.hoverColor} ${
                highlight.isSelected(layer.id) ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
              }`}
              onClick={highlight.handlers(layer.id).onClick}
              animate={{
                scale: highlightedLayer === index ? 1.02 : 1,
                boxShadow: highlightedLayer === index
                  ? '0 0 25px rgba(255, 255, 255, 0.3)'
                  : 'none',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{layer.icon}</span>
                  <div>
                    <div className="font-semibold text-white">{layer.label}</div>
                    <div className="text-xs text-white/70">{layer.description}</div>
                  </div>
                </div>
                <motion.div
                  className="text-white/50"
                  animate={{ rotate: highlight.isSelected(layer.id) ? 180 : 0 }}
                >
                  ▼
                </motion.div>
              </div>

              {/* Particles on this layer */}
              {particles
                .filter((p) => p.layer === index)
                .map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"
                    style={{
                      left: `${10 + particle.progress * 80}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
            </motion.div>

            {/* Arrow between layers */}
            {index < layers.length - 1 && (
              <div className="flex justify-center py-1">
                <motion.div
                  className="text-xl"
                  animate={{
                    color: highlightedLayer === index ? '#fbbf24' : '#475569',
                    y: highlightedLayer === index ? [0, 4, 0] : 0,
                  }}
                  transition={{ duration: 0.4, repeat: highlightedLayer === index ? Infinity : 0 }}
                >
                  ↓
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 p-5 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selected.icon}</span>
                <div>
                  <h4 className="font-bold text-xl text-white">{selected.label}</h4>
                  <p className="text-slate-400">{selected.description}</p>
                </div>
              </div>

              {/* What happens */}
              <div className="mb-4">
                <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <span>⚡</span> Was passiert hier?
                </h5>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.whatHappens}
                </p>
              </div>

              {/* Example Transformation */}
              <div className="mb-4">
                <h5 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <span>🔄</span> Beispiel-Transformation
                </h5>
                <div className="p-3 bg-slate-900/50 rounded-lg font-mono text-sm text-slate-300 border border-slate-700">
                  {selected.exampleTransformation}
                </div>
              </div>

              {/* Key Characteristics */}
              <div>
                <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <span>📋</span> Merkmale
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {selected.characteristics.map((char, i) => (
                    <motion.div
                      key={char}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-green-500">✓</span>
                      {char}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OLTP vs OLAP Quick Reference */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-emerald-900/30 rounded-lg border border-emerald-700">
          <h4 className="font-semibold text-emerald-400 mb-2 text-sm">
            Datenquellen (OLTP)
          </h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>* Viele kleine Transaktionen</li>
            <li>* INSERT, UPDATE, DELETE</li>
            <li>* Normalisiert (3NF)</li>
            <li>* Aktuelle Daten</li>
          </ul>
        </div>
        <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
          <h4 className="font-semibold text-blue-400 mb-2 text-sm">
            Data Warehouse (OLAP)
          </h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>* Wenige komplexe Abfragen</li>
            <li>* Nur SELECT</li>
            <li>* Sternschema (denormalisiert)</li>
            <li>* Historische Daten</li>
          </ul>
        </div>
      </div>
    </DiagramShell>
  )
}
