// exam-trainer/src/frontend/content/web-technologies/diagrams/StorageEvolutionComparison.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type StorageType = 'localStorage' | 'inMemory' | 'couchdb'

interface StorageInfo {
  title: string
  exercise: string
  persistence: string
  multiUser: boolean
  scalability: string
  dataLocation: string
  pros: string[]
  cons: string[]
}

const storageInfo: Record<StorageType, StorageInfo> = {
  localStorage: {
    title: 'localStorage (Ü8)',
    exercise: 'Ü8',
    persistence: 'Browser-basiert',
    multiUser: false,
    scalability: 'Keine',
    dataLocation: 'Lokal im Browser',
    pros: ['Einfach zu implementieren', 'Kein Server nötig', 'Schnell'],
    cons: ['Nur ~5MB Speicher', 'Nicht geräteübergreifend', 'Kein Multi-User'],
  },
  inMemory: {
    title: 'In-Memory Dict (Ü9)',
    exercise: 'Ü9',
    persistence: 'Nur zur Laufzeit',
    multiUser: true,
    scalability: 'Begrenzt (RAM)',
    dataLocation: 'Server RAM',
    pros: ['Multi-User möglich', 'REST API', 'Einfache Implementierung'],
    cons: ['Daten bei Neustart verloren', 'RAM-begrenzt', 'Nicht skalierbar'],
  },
  couchdb: {
    title: 'CouchDB (Ü10/Ü12)',
    exercise: 'Ü10',
    persistence: 'Persistent (Disk)',
    multiUser: true,
    scalability: 'Horizontal skalierbar',
    dataLocation: 'Datenbank auf Disk',
    pros: ['Persistente Speicherung', 'Multi-User', 'Skalierbar', 'JSON-nativ'],
    cons: ['Komplexere Infrastruktur', 'Mehr Ressourcen', 'Latenz'],
  },
}

function DataFlowAnimation({ type, isActive }: { type: StorageType; isActive: boolean }) {
  if (!isActive) return null

  return (
    <svg viewBox="0 0 400 150" className="w-full max-w-[400px] mx-auto">
      {type === 'localStorage' && (
        <g>
          <rect x={50} y={40} width={100} height={70} rx={8} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={100} y={70} fill="#93c5fd" textAnchor="middle" fontSize={12} fontWeight={500}>Browser</text>
          <text x={100} y={88} fill="#64748b" textAnchor="middle" fontSize={10}>JavaScript</text>

          <motion.path
            d="M 150 75 L 200 75"
            stroke="#22c55e"
            strokeWidth={2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
          />
          <motion.circle cx={175} cy={75} r={4} fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />

          <rect x={200} y={40} width={120} height={70} rx={8} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
          <text x={260} y={70} fill="#86efac" textAnchor="middle" fontSize={12} fontWeight={500}>localStorage</text>
          <text x={260} y={88} fill="#64748b" textAnchor="middle" fontSize={10}>5MB max</text>
        </g>
      )}

      {type === 'inMemory' && (
        <g>
          <rect x={30} y={40} width={80} height={60} rx={6} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={70} y={70} fill="#93c5fd" textAnchor="middle" fontSize={11} fontWeight={500}>Browser</text>

          <motion.path
            d="M 110 70 L 160 70"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
          />
          <text x={135} y={60} fill="#fcd34d" textAnchor="middle" fontSize={8}>HTTP</text>

          <rect x={160} y={40} width={90} height={60} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
          <text x={205} y={65} fill="#d8b4fe" textAnchor="middle" fontSize={11} fontWeight={500}>Flask</text>
          <text x={205} y={80} fill="#64748b" textAnchor="middle" fontSize={9}>REST API</text>

          <motion.path
            d="M 250 70 L 290 70"
            stroke="#64748b"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.2 }}
          />

          <rect x={290} y={45} width={80} height={50} rx={6} fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth={1} strokeDasharray="4 2" />
          <text x={330} y={70} fill="#94a3b8" textAnchor="middle" fontSize={10}>RAM Dict</text>
          <text x={330} y={85} fill="#ef4444" textAnchor="middle" fontSize={8}>Volatile!</text>
        </g>
      )}

      {type === 'couchdb' && (
        <g>
          <rect x={20} y={40} width={70} height={55} rx={6} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          <text x={55} y={65} fill="#93c5fd" textAnchor="middle" fontSize={10} fontWeight={500}>Browser</text>

          <motion.path d="M 90 67 L 130 67" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={130} y={40} width={80} height={55} rx={6} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth={2} />
          <text x={170} y={65} fill="#d8b4fe" textAnchor="middle" fontSize={10} fontWeight={500}>Flask</text>

          <motion.path d="M 210 67 L 250 67" stroke="#22c55e" strokeWidth={2} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={250} y={40} width={80} height={55} rx={6} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth={2} />
          <text x={290} y={65} fill="#86efac" textAnchor="middle" fontSize={10} fontWeight={500}>CouchDB</text>

          <motion.path d="M 290 95 L 290 115" stroke="#f59e0b" strokeWidth={1} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatType: 'loop', repeatDelay: 1.5 }} />

          <rect x={250} y={115} width={80} height={30} rx={4} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth={1} />
          <text x={290} y={135} fill="#fcd34d" textAnchor="middle" fontSize={9}>Volume (Disk)</text>
        </g>
      )}
    </svg>
  )
}

export function StorageEvolutionComparison({ className }: DiagramProps) {
  const [selectedType, setSelectedType] = useState<StorageType>('localStorage')
  const showAnimation = true

  const info = storageInfo[selectedType]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Storage Evolution
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Vergleich der Speicher-Strategien im Playlist-Projekt
      </p>

      {/* Storage Type Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['localStorage', 'inMemory', 'couchdb'] as StorageType[]).map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedType(type)}
          >
            {storageInfo[type].title}
          </Button>
        ))}
      </div>

      {/* Data Flow Animation */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
        <DataFlowAnimation type={selectedType} isActive={showAnimation} />
      </div>

      {/* Info Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Persistenz</div>
            <div className="text-sm text-slate-200 font-medium">{info.persistence}</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Multi-User</div>
            <div className={`text-sm font-medium ${info.multiUser ? 'text-green-400' : 'text-red-400'}`}>
              {info.multiUser ? 'Ja' : 'Nein'}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Skalierbarkeit</div>
            <div className="text-sm text-slate-200">{info.scalability}</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Datenspeicherort</div>
            <div className="text-sm text-slate-200">{info.dataLocation}</div>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <div className="text-xs text-green-400 mb-2">Vorteile</div>
            <ul className="text-sm text-slate-300 space-y-1">
              {info.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <div className="text-xs text-red-400 mb-2">Nachteile</div>
            <ul className="text-sm text-slate-300 space-y-1">
              {info.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
