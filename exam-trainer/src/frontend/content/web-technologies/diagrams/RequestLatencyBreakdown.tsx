// src/content/web-technologies/diagrams/RequestLatencyBreakdown.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button } from '@/core/components/ui'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types & Configuration
// ─────────────────────────────────────────────────

type GeographicDistance = 'local' | 'regional' | 'cross-continent'
type ResponseSize = 'small-api' | 'medium-page' | 'large-file'

interface RequestConfig {
  geographicDistance: GeographicDistance
  dnsCached: boolean
  connectionReuse: boolean
  tlsResumption: boolean
  responseSize: ResponseSize
}

interface Phase {
  id: string
  name: string
  color: string
  bgColor: string
  analogy: string
  description: string
}

const PHASES: Phase[] = [
  {
    id: 'dns',
    name: 'DNS Lookup',
    color: 'rgb(168, 85, 247)', // purple
    bgColor: 'bg-purple-500/20',
    analogy: 'Telefonbuch nachschlagen',
    description: 'Domain zu IP-Adresse auflösen',
  },
  {
    id: 'tcp',
    name: 'TCP Connection',
    color: 'rgb(34, 211, 238)', // cyan
    bgColor: 'bg-cyan-500/20',
    analogy: 'Türklingel und Händeschütteln',
    description: '3-Way Handshake: SYN → SYN-ACK → ACK',
  },
  {
    id: 'tls',
    name: 'TLS Handshake',
    color: 'rgb(251, 191, 36)', // amber
    bgColor: 'bg-amber-500/20',
    analogy: 'Ausweis zeigen und Geheimsprache vereinbaren',
    description: 'Zertifikat prüfen, Verschlüsselung aushandeln',
  },
  {
    id: 'request',
    name: 'Request Send',
    color: 'rgb(249, 115, 22)', // orange
    bgColor: 'bg-orange-500/20',
    analogy: 'Brief in den Briefkasten werfen',
    description: 'HTTP-Anfrage zum Server senden',
  },
  {
    id: 'server',
    name: 'Server Processing',
    color: 'rgb(100, 116, 139)', // slate
    bgColor: 'bg-slate-500/20',
    analogy: 'Koch bereitet Bestellung vor',
    description: 'TTFB - Zeit bis zum ersten Byte',
  },
  {
    id: 'download',
    name: 'Response Download',
    color: 'rgb(34, 197, 94)', // green
    bgColor: 'bg-green-500/20',
    analogy: 'Paket wird ausgeliefert',
    description: 'Inhalt wird übertragen',
  },
]

// Base latencies in ms for local connection
const BASE_LATENCIES = {
  dns: { uncached: 50, cached: 0 },
  tcp: { new: 10, reused: 0 },
  tls: { full: 30, resumed: 5, reused: 0 },
  request: { small: 1, medium: 5, large: 20 },
  server: 50, // Base server processing time
  download: { small: 5, medium: 50, large: 500 },
}

// RTT multipliers for geographic distance
const DISTANCE_MULTIPLIERS: Record<GeographicDistance, number> = {
  local: 1,
  regional: 3,
  'cross-continent': 10,
}

// Distance labels in German
const DISTANCE_LABELS: Record<GeographicDistance, string> = {
  local: 'Lokal (~10ms RTT)',
  regional: 'Regional (~30ms RTT)',
  'cross-continent': 'Interkontinental (~100ms RTT)',
}

const RESPONSE_SIZE_LABELS: Record<ResponseSize, string> = {
  'small-api': 'Kleine API (~1KB)',
  'medium-page': 'Webseite (~100KB)',
  'large-file': 'Große Datei (~5MB)',
}

// ─────────────────────────────────────────────────
// Latency Calculation
// ─────────────────────────────────────────────────

function calculateLatencies(config: RequestConfig): Record<string, number> {
  const multiplier = DISTANCE_MULTIPLIERS[config.geographicDistance]

  // DNS: 0 if cached, otherwise base * multiplier (multiple round trips)
  const dns = config.dnsCached ? 0 : BASE_LATENCIES.dns.uncached * multiplier

  // TCP: 0 if connection reused, otherwise 1.5 RTT for 3-way handshake
  const tcp = config.connectionReuse ? 0 : BASE_LATENCIES.tcp.new * multiplier * 1.5

  // TLS: 0 if connection reused, reduced if session resumed, full otherwise
  let tls = 0
  if (!config.connectionReuse) {
    if (config.tlsResumption) {
      tls = BASE_LATENCIES.tls.resumed * multiplier // 1 RTT for session resumption
    } else {
      tls = BASE_LATENCIES.tls.full * multiplier * 2 // 2 RTT for full handshake
    }
  }

  // Request: depends on upload size (minimal for GET)
  const requestSize = config.responseSize === 'small-api' ? 'small' :
                      config.responseSize === 'medium-page' ? 'small' : 'medium'
  const request = BASE_LATENCIES.request[requestSize] + (multiplier * 0.5)

  // Server: processing time (less affected by distance)
  const server = BASE_LATENCIES.server + (config.responseSize === 'large-file' ? 20 : 0)

  // Download: heavily depends on response size and bandwidth (affected by distance)
  const downloadBase = config.responseSize === 'small-api' ? BASE_LATENCIES.download.small :
                       config.responseSize === 'medium-page' ? BASE_LATENCIES.download.medium :
                       BASE_LATENCIES.download.large
  const download = downloadBase * (1 + (multiplier - 1) * 0.3) // Distance affects throughput

  return { dns, tcp, tls, request, server, download }
}

// ─────────────────────────────────────────────────
// Toggle Switch Component
// ─────────────────────────────────────────────────

interface ToggleSwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
  description?: string
}

function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors w-full text-left"
    >
      <div
        className={`
          relative w-11 h-6 rounded-full transition-colors
          ${enabled ? 'bg-blue-500' : 'bg-slate-600'}
        `}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
          animate={{ left: enabled ? '24px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-200">{label}</div>
        {description && (
          <div className="text-xs text-slate-400">{description}</div>
        )}
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────
// Waterfall Bar Component
// ─────────────────────────────────────────────────

interface WaterfallBarProps {
  phase: Phase
  startMs: number
  durationMs: number
  totalMs: number
  isHovered: boolean
  onHover: (hovered: boolean) => void
  showLabel?: boolean
}

function WaterfallBar({
  phase,
  startMs,
  durationMs,
  totalMs,
  isHovered,
  onHover,
  showLabel = true
}: WaterfallBarProps) {
  const maxWidth = 100 // percentage
  const startPercent = (startMs / totalMs) * maxWidth
  const widthPercent = Math.max((durationMs / totalMs) * maxWidth, 0.5) // minimum visibility

  const isSkipped = durationMs === 0

  return (
    <div
      className="relative h-8 group"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Phase name */}
      {showLabel && (
        <div className="absolute left-0 top-0 w-32 h-full flex items-center">
          <span className={`text-xs font-medium ${isSkipped ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
            {phase.name}
          </span>
        </div>
      )}

      {/* Bar area */}
      <div className="absolute left-32 right-16 top-0 h-full">
        <div className="relative w-full h-full bg-slate-800/30 rounded">
          {!isSkipped && (
            <motion.div
              className="absolute top-1 bottom-1 rounded"
              style={{
                backgroundColor: phase.color,
                left: `${startPercent}%`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: `${widthPercent}%`,
                opacity: isHovered ? 1 : 0.8,
                boxShadow: isHovered ? `0 0 20px ${phase.color}50` : 'none'
              }}
              transition={{
                width: { duration: 0.8, ease: 'easeOut' },
                opacity: { duration: 0.2 }
              }}
            />
          )}

          {/* Skipped indicator */}
          {isSkipped && (
            <div
              className="absolute top-1/2 -translate-y-1/2 text-xs text-slate-500 italic"
              style={{ left: `${startPercent}%` }}
            >
              (übersprungen)
            </div>
          )}
        </div>
      </div>

      {/* Duration label */}
      <div className="absolute right-0 top-0 w-14 h-full flex items-center justify-end">
        <span className={`text-xs font-mono ${isSkipped ? 'text-slate-600' : 'text-slate-400'}`}>
          {durationMs.toFixed(0)}ms
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Request Configuration Panel
// ─────────────────────────────────────────────────

interface ConfigPanelProps {
  config: RequestConfig
  onChange: (config: RequestConfig) => void
  label?: string
}

function ConfigPanel({ config, onChange, label }: ConfigPanelProps) {
  return (
    <div className="space-y-4">
      {label && (
        <div className="text-sm font-semibold text-slate-200 border-b border-slate-700 pb-2">
          {label}
        </div>
      )}

      {/* Geographic Distance */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Entfernung zum Server
        </label>
        <div className="grid grid-cols-1 gap-2">
          {(Object.keys(DISTANCE_LABELS) as GeographicDistance[]).map((distance) => (
            <button
              key={distance}
              onClick={() => onChange({ ...config, geographicDistance: distance })}
              className={`
                px-3 py-2 rounded-lg text-sm text-left transition-colors
                ${config.geographicDistance === distance
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300 border'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 border hover:border-slate-600'
                }
              `}
            >
              {DISTANCE_LABELS[distance]}
            </button>
          ))}
        </div>
      </div>

      {/* Response Size */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Antwortgröße
        </label>
        <div className="grid grid-cols-1 gap-2">
          {(Object.keys(RESPONSE_SIZE_LABELS) as ResponseSize[]).map((size) => (
            <button
              key={size}
              onClick={() => onChange({ ...config, responseSize: size })}
              className={`
                px-3 py-2 rounded-lg text-sm text-left transition-colors
                ${config.responseSize === size
                  ? 'bg-green-500/20 border-green-500 text-green-300 border'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 border hover:border-slate-600'
                }
              `}
            >
              {RESPONSE_SIZE_LABELS[size]}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Switches */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Optimierungen
        </label>
        <div className="space-y-2">
          <ToggleSwitch
            enabled={config.dnsCached}
            onChange={(dnsCached) => onChange({ ...config, dnsCached })}
            label="DNS gecacht"
            description="Browser/OS hat IP bereits gespeichert"
          />
          <ToggleSwitch
            enabled={config.connectionReuse}
            onChange={(connectionReuse) => onChange({ ...config, connectionReuse })}
            label="Keep-Alive Verbindung"
            description="Bestehende TCP/TLS-Verbindung nutzen"
          />
          <ToggleSwitch
            enabled={config.tlsResumption}
            onChange={(tlsResumption) => onChange({ ...config, tlsResumption })}
            label="TLS Session Resumption"
            description="Verkürzte Handshake mit gespeicherter Session"
          />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Waterfall Chart Component
// ─────────────────────────────────────────────────

interface WaterfallChartProps {
  latencies: Record<string, number>
  label?: string
  showLabels?: boolean
}

function WaterfallChart({ latencies, label, showLabels = true }: WaterfallChartProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)

  // Calculate cumulative start times
  const phaseData = useMemo(() => {
    let cumulative = 0
    return PHASES.map((phase) => {
      const duration = latencies[phase.id] || 0
      const start = cumulative
      cumulative += duration
      return { phase, start, duration }
    })
  }, [latencies])

  const totalTime = phaseData.reduce((sum, p) => sum + p.duration, 0)

  return (
    <div className="space-y-3">
      {label && (
        <div className="text-sm font-semibold text-slate-200">{label}</div>
      )}

      {/* Waterfall bars */}
      <div className="space-y-1">
        {phaseData.map(({ phase, start, duration }) => (
          <WaterfallBar
            key={phase.id}
            phase={phase}
            startMs={start}
            durationMs={duration}
            totalMs={Math.max(totalTime, 100)} // minimum scale
            isHovered={hoveredPhase === phase.id}
            onHover={(hovered) => setHoveredPhase(hovered ? phase.id : null)}
            showLabel={showLabels}
          />
        ))}
      </div>

      {/* Total time */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
        <span className="text-sm font-medium text-slate-300">Gesamtzeit</span>
        <span className="text-lg font-mono font-bold text-blue-400">
          {totalTime.toFixed(0)}ms
        </span>
      </div>

      {/* Hovered phase details */}
      <AnimatePresence mode="wait">
        {hoveredPhase && (
          <motion.div
            key={hoveredPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-lg border ${
              PHASES.find(p => p.id === hoveredPhase)?.bgColor
            } border-slate-600`}
          >
            {(() => {
              const phase = PHASES.find(p => p.id === hoveredPhase)!
              const data = phaseData.find(p => p.phase.id === hoveredPhase)!
              return (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="font-medium text-slate-200">{phase.name}</span>
                    <span className="text-slate-400">-</span>
                    <span className="font-mono text-slate-300">{data.duration.toFixed(0)}ms</span>
                  </div>
                  <div className="text-sm text-slate-400">{phase.description}</div>
                  <div className="text-xs text-slate-500 italic">
                    Analogie: {phase.analogy}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

const DEFAULT_CONFIG: RequestConfig = {
  geographicDistance: 'regional',
  dnsCached: false,
  connectionReuse: false,
  tlsResumption: false,
  responseSize: 'medium-page',
}

const OPTIMIZED_CONFIG: RequestConfig = {
  geographicDistance: 'local',
  dnsCached: true,
  connectionReuse: true,
  tlsResumption: true,
  responseSize: 'small-api',
}

export function RequestLatencyBreakdown({ className }: DiagramProps) {
  const [comparisonMode, setComparisonMode] = useState(false)
  const [configA, setConfigA] = useState<RequestConfig>(DEFAULT_CONFIG)
  const [configB, setConfigB] = useState<RequestConfig>(OPTIMIZED_CONFIG)

  const latenciesA = useMemo(() => calculateLatencies(configA), [configA])
  const latenciesB = useMemo(() => calculateLatencies(configB), [configB])

  const totalA = Object.values(latenciesA).reduce((a, b) => a + b, 0)
  const totalB = Object.values(latenciesB).reduce((a, b) => a + b, 0)

  const resetConfigs = () => {
    setConfigA(DEFAULT_CONFIG)
    setConfigB(OPTIMIZED_CONFIG)
  }

  return (
    <div className={`space-y-6 ${className ?? ''}`}>
      {/* Header */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              Request Latency Breakdown
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Visualisierung der Zeitphasen einer HTTP/HTTPS-Anfrage
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ToggleSwitch
              enabled={comparisonMode}
              onChange={setComparisonMode}
              label="Vergleichsmodus"
            />
            <Button variant="ghost" size="sm" onClick={resetConfigs}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Phase Legend */}
      <Card className="p-4">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
          Phasen einer HTTPS-Anfrage
        </div>
        <div className="flex flex-wrap gap-3">
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800/50"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-xs text-slate-300">{phase.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Content */}
      {comparisonMode ? (
        // Comparison Mode: Two columns
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request A */}
          <Card className="p-5">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-red-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Anfrage A
                </div>
                <div className="text-lg font-mono font-bold text-red-400">
                  {totalA.toFixed(0)}ms
                </div>
              </div>
              <WaterfallChart latencies={latenciesA} />
              <ConfigPanel config={configA} onChange={setConfigA} />
            </div>
          </Card>

          {/* Request B */}
          <Card className="p-5">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-green-400 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  Anfrage B
                </div>
                <div className="text-lg font-mono font-bold text-green-400">
                  {totalB.toFixed(0)}ms
                </div>
              </div>
              <WaterfallChart latencies={latenciesB} />
              <ConfigPanel config={configB} onChange={setConfigB} />
            </div>
          </Card>

          {/* Comparison Summary */}
          <Card className="p-5 lg:col-span-2">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-200">
                Vergleich
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-2xl font-mono font-bold text-red-400">
                    {totalA.toFixed(0)}ms
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Anfrage A</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-2xl font-mono font-bold text-blue-400">
                    {totalA > totalB ? '-' : '+'}{Math.abs(totalA - totalB).toFixed(0)}ms
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {totalA > totalB ? 'B ist schneller' : 'A ist schneller'}
                  </div>
                  <div className="text-xs text-slate-500">
                    ({((Math.abs(totalA - totalB) / Math.max(totalA, totalB)) * 100).toFixed(0)}% Unterschied)
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-2xl font-mono font-bold text-green-400">
                    {totalB.toFixed(0)}ms
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Anfrage B</div>
                </div>
              </div>

              {/* Side-by-side bars */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                {PHASES.map((phase) => {
                  const durationA = latenciesA[phase.id] || 0
                  const durationB = latenciesB[phase.id] || 0
                  const maxDuration = Math.max(durationA, durationB, 1)

                  return (
                    <div key={phase.id} className="flex items-center gap-3">
                      <div className="w-28 text-xs text-slate-400">{phase.name}</div>
                      <div className="flex-1 flex items-center gap-2">
                        {/* Bar A */}
                        <div className="flex-1 h-4 bg-slate-800/50 rounded relative">
                          <motion.div
                            className="absolute top-0 left-0 h-full rounded bg-red-500/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${(durationA / maxDuration) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        {/* Bar B */}
                        <div className="flex-1 h-4 bg-slate-800/50 rounded relative">
                          <motion.div
                            className="absolute top-0 left-0 h-full rounded bg-green-500/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${(durationB / maxDuration) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                      <div className="w-20 text-xs text-right">
                        <span className="text-red-400">{durationA.toFixed(0)}</span>
                        <span className="text-slate-600 mx-1">/</span>
                        <span className="text-green-400">{durationB.toFixed(0)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        // Single Request Mode
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <Card className="p-5 lg:col-span-1">
            <ConfigPanel
              config={configA}
              onChange={setConfigA}
              label="Anfrage konfigurieren"
            />
          </Card>

          {/* Waterfall Chart */}
          <Card className="p-5 lg:col-span-2">
            <WaterfallChart
              latencies={latenciesA}
              label="Timing-Wasserfall"
            />
          </Card>
        </div>
      )}

      {/* Educational Info */}
      <Card className="p-5">
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-200">
            Analogien zum Verständnis
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHASES.map((phase) => (
              <div
                key={phase.id}
                className={`p-3 rounded-lg ${phase.bgColor} border border-slate-700`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  <span className="text-sm font-medium text-slate-200">{phase.name}</span>
                </div>
                <div className="text-xs text-slate-400 mb-1">{phase.description}</div>
                <div className="text-xs text-slate-500 italic">
                  "{phase.analogy}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Tips */}
      <Card className="p-5">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-200">
            Performance-Tipps
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-purple-400">1</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium">DNS Prefetch:</span>
                <span className="text-slate-400"> Hinweise im HTML für DNS-Vorabauflösung nutzen</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-cyan-400">2</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium">Keep-Alive:</span>
                <span className="text-slate-400"> HTTP/1.1+ hält Verbindungen offen</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-amber-400">3</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium">TLS 1.3:</span>
                <span className="text-slate-400"> Schnellerer Handshake (1-RTT statt 2-RTT)</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400">4</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium">CDN:</span>
                <span className="text-slate-400"> Inhalte geografisch näher am Nutzer bereitstellen</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
