// src/content/web-technologies/diagrams/K8sServiceTypesViz.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type ServiceType = 'ClusterIP' | 'NodePort' | 'LoadBalancer'

interface ServiceTypeInfo {
  title: string
  description: string
  useCase: string
  portRange?: string
  accessibility: string
}

const serviceTypeInfo: Record<ServiceType, ServiceTypeInfo> = {
  ClusterIP: {
    title: 'ClusterIP (Default)',
    description:
      'Interner Service, nur innerhalb des Clusters erreichbar. Bekommt eine virtuelle IP-Adresse aus dem Cluster-IP-Bereich.',
    useCase: 'Interne Services, Microservice-Kommunikation, Datenbanken',
    accessibility: 'Nur cluster-intern',
  },
  NodePort: {
    title: 'NodePort',
    description:
      'Öffnet einen statischen Port (30000-32767) auf jedem Node. Externe Anfragen erreichen den Service über NodeIP:NodePort.',
    useCase: 'Entwicklung, einfacher externer Zugriff, On-Premise Deployments',
    portRange: '30000-32767',
    accessibility: 'NodeIP:NodePort',
  },
  LoadBalancer: {
    title: 'LoadBalancer',
    description:
      'Provisioniert automatisch einen externen Load Balancer beim Cloud-Provider. Kombiniert ClusterIP + NodePort + externe IP.',
    useCase: 'Produktion, Cloud Deployments (AWS ELB, GCP LB, Azure LB)',
    accessibility: 'Externe IP vom Cloud-Provider',
  },
}

// Animated dashed line component for traffic flow
function AnimatedTrafficLine({
  x1,
  y1,
  x2,
  y2,
  active,
  delay = 0,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  active: boolean
  delay?: number
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? '#3b82f6' : '#475569'}
      strokeWidth="2"
      strokeDasharray="6 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: active ? 1 : 0,
        opacity: active ? 1 : 0.3,
      }}
      transition={{ duration: 0.5, delay }}
    >
      {active && (
        <animate
          attributeName="stroke-dashoffset"
          values="0;-20"
          dur="1s"
          repeatCount="indefinite"
        />
      )}
    </motion.line>
  )
}

// Arrow marker for traffic direction
function TrafficArrow({
  x,
  y,
  rotation,
  active,
  delay = 0,
}: {
  x: number
  y: number
  rotation: number
  active: boolean
  delay?: number
}) {
  return (
    <motion.polygon
      points={`${x},${y - 5} ${x + 10},${y} ${x},${y + 5}`}
      fill={active ? '#3b82f6' : '#475569'}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: active ? 1 : 0.3,
        scale: active ? 1 : 0.8,
      }}
      transition={{ duration: 0.3, delay }}
      style={{ transformOrigin: `${x}px ${y}px`, rotate: rotation }}
    />
  )
}

// Component boxes in the diagram
function DiagramBox({
  x,
  y,
  width,
  height,
  label,
  sublabel,
  active,
  highlighted,
  color,
}: {
  x: number
  y: number
  width: number
  height: number
  label: string
  sublabel?: string
  active: boolean
  highlighted: boolean
  color: 'blue' | 'green' | 'purple' | 'amber' | 'slate'
}) {
  const colors = {
    blue: {
      fill: active ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.05)',
      stroke: active ? '#3b82f6' : '#1e40af',
      text: '#93c5fd',
    },
    green: {
      fill: active ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.05)',
      stroke: active ? '#22c55e' : '#166534',
      text: '#86efac',
    },
    purple: {
      fill: active ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.05)',
      stroke: active ? '#a855f7' : '#6b21a8',
      text: '#d8b4fe',
    },
    amber: {
      fill: active ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.05)',
      stroke: active ? '#f59e0b' : '#92400e',
      text: '#fcd34d',
    },
    slate: {
      fill: 'rgba(100, 116, 139, 0.1)',
      stroke: '#475569',
      text: '#94a3b8',
    },
  }

  const c = colors[color]

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: highlighted ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={highlighted ? 3 : 2}
        animate={{
          filter: highlighted ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' : 'none',
        }}
      />
      <text x={x + width / 2} y={y + height / 2 - (sublabel ? 6 : 0)} fill={c.text} textAnchor="middle" fontSize="13" fontWeight="500">
        {label}
      </text>
      {sublabel && (
        <text x={x + width / 2} y={y + height / 2 + 12} fill="#64748b" textAnchor="middle" fontSize="10">
          {sublabel}
        </text>
      )}
    </motion.g>
  )
}

// Cloud/Internet icon
function CloudIcon({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: active ? 1 : 0.4, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <path
        d={`M${x - 25},${y + 8}
            a12,12 0 0,1 0,-16
            a14,14 0 0,1 26,-2
            a10,10 0 0,1 12,10
            a8,8 0 0,1 -6,14
            z`}
        fill={active ? 'rgba(96, 165, 250, 0.2)' : 'rgba(100, 116, 139, 0.1)'}
        stroke={active ? '#60a5fa' : '#475569'}
        strokeWidth="2"
      />
      <text x={x} y={y + 4} fill={active ? '#93c5fd' : '#64748b'} textAnchor="middle" fontSize="10" fontWeight="500">
        Internet
      </text>
    </motion.g>
  )
}

// Pod circle component
function PodCircle({
  cx,
  cy,
  active,
  label,
  delay = 0,
}: {
  cx: number
  cy: number
  active: boolean
  label: string
  delay?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r="20"
        fill={active ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.1)'}
        stroke={active ? '#22c55e' : '#166534'}
        strokeWidth="2"
        animate={{
          filter: active ? 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.5))' : 'none',
        }}
      />
      <text x={cx} y={cy + 4} fill="#86efac" textAnchor="middle" fontSize="10" fontWeight="500">
        {label}
      </text>
    </motion.g>
  )
}

export function K8sServiceTypesViz({ className }: DiagramProps) {
  const [selectedType, setSelectedType] = useState<ServiceType>('ClusterIP')

  const info = serviceTypeInfo[selectedType]

  // Determine which components are visible/active based on service type
  const showLoadBalancer = selectedType === 'LoadBalancer'
  const showNodePort = selectedType === 'NodePort' || selectedType === 'LoadBalancer'
  const showExternalAccess = selectedType !== 'ClusterIP'

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Kubernetes Service Types
      </h3>

      {/* Service Type Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['ClusterIP', 'NodePort', 'LoadBalancer'] as ServiceType[]).map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* SVG Diagram */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-6 overflow-x-auto">
        <svg
          viewBox="0 0 500 340"
          className="w-full max-w-[500px] mx-auto"
          style={{ minWidth: '400px' }}
        >
          {/* External Client / Internet Cloud */}
          <AnimatePresence mode="wait">
            {showExternalAccess && (
              <motion.g
                key="external"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CloudIcon x={250} y={25} active={showExternalAccess} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Load Balancer (only for LoadBalancer type) */}
          <AnimatePresence mode="wait">
            {showLoadBalancer && (
              <motion.g
                key="lb"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <DiagramBox
                  x={175}
                  y={55}
                  width={150}
                  height={40}
                  label="Load Balancer"
                  sublabel="Cloud Provider"
                  active={true}
                  highlighted={selectedType === 'LoadBalancer'}
                  color="purple"
                />
                {/* Traffic from cloud to LB */}
                <AnimatedTrafficLine x1={250} y1={35} x2={250} y2={55} active={true} />
                <TrafficArrow x={250} y={50} rotation={90} active={true} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Cluster boundary */}
          <motion.rect
            x={20}
            y={showLoadBalancer ? 105 : showExternalAccess ? 55 : 20}
            width={460}
            height={showLoadBalancer ? 220 : showExternalAccess ? 270 : 305}
            rx="12"
            fill="none"
            stroke="#475569"
            strokeWidth="2"
            strokeDasharray="8 4"
            animate={{
              y: showLoadBalancer ? 105 : showExternalAccess ? 55 : 20,
              height: showLoadBalancer ? 220 : showExternalAccess ? 270 : 305,
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.text
            x={35}
            y={showLoadBalancer ? 122 : showExternalAccess ? 72 : 37}
            fill="#64748b"
            fontSize="11"
            animate={{
              y: showLoadBalancer ? 122 : showExternalAccess ? 72 : 37,
            }}
            transition={{ duration: 0.4 }}
          >
            Kubernetes Cluster
          </motion.text>

          {/* Traffic from LB to cluster (for LoadBalancer) */}
          {showLoadBalancer && (
            <>
              <AnimatedTrafficLine x1={250} y1={95} x2={250} y2={130} active={true} delay={0.2} />
              <TrafficArrow x={250} y={125} rotation={90} active={true} delay={0.2} />
            </>
          )}

          {/* Node boxes */}
          <motion.g
            animate={{
              y: showLoadBalancer ? 0 : showExternalAccess ? -50 : -85,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Node 1 */}
            <rect
              x={40}
              y={135}
              width={200}
              height={175}
              rx="8"
              fill="rgba(100, 116, 139, 0.1)"
              stroke="#475569"
              strokeWidth="2"
            />
            <text x={55} y={155} fill="#94a3b8" fontSize="12" fontWeight="500">
              Node 1
            </text>
            {showNodePort && (
              <motion.text
                x={55}
                y={170}
                fill="#f59e0b"
                fontSize="10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                :31234
              </motion.text>
            )}

            {/* Node 2 */}
            <rect
              x={260}
              y={135}
              width={200}
              height={175}
              rx="8"
              fill="rgba(100, 116, 139, 0.1)"
              stroke="#475569"
              strokeWidth="2"
            />
            <text x={275} y={155} fill="#94a3b8" fontSize="12" fontWeight="500">
              Node 2
            </text>
            {showNodePort && (
              <motion.text
                x={275}
                y={170}
                fill="#f59e0b"
                fontSize="10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                :31234
              </motion.text>
            )}

            {/* External traffic to nodes (for NodePort and LoadBalancer) */}
            <AnimatePresence>
              {showExternalAccess && !showLoadBalancer && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Traffic from external to Node 1 */}
                  <AnimatedTrafficLine x1={140} y1={35} x2={140} y2={135} active={true} />
                  <TrafficArrow x={140} y={130} rotation={90} active={true} />
                  {/* Traffic from external to Node 2 */}
                  <AnimatedTrafficLine x1={360} y1={35} x2={360} y2={135} active={true} delay={0.1} />
                  <TrafficArrow x={360} y={130} rotation={90} active={true} delay={0.1} />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Service box */}
            <DiagramBox
              x={175}
              y={185}
              width={150}
              height={45}
              label="Service"
              sublabel={selectedType === 'ClusterIP' ? '10.96.0.100' : selectedType === 'NodePort' ? '10.96.0.100:31234' : '10.96.0.100'}
              active={true}
              highlighted={true}
              color="blue"
            />

            {/* Traffic from nodes to service */}
            <AnimatedTrafficLine x1={140} y1={180} x2={175} y2={207} active={showNodePort} delay={0.3} />
            <AnimatedTrafficLine x1={360} y1={180} x2={325} y2={207} active={showNodePort} delay={0.3} />

            {/* Traffic from service to pods */}
            <AnimatedTrafficLine x1={200} y1={230} x2={100} y2={260} active={true} delay={0.4} />
            <TrafficArrow x={105} y={258} rotation={120} active={true} delay={0.4} />
            <AnimatedTrafficLine x1={250} y1={230} x2={250} y2={260} active={true} delay={0.5} />
            <TrafficArrow x={250} y={258} rotation={90} active={true} delay={0.5} />
            <AnimatedTrafficLine x1={300} y1={230} x2={400} y2={260} active={true} delay={0.6} />
            <TrafficArrow x={395} y={258} rotation={60} active={true} delay={0.6} />

            {/* Pods */}
            <PodCircle cx={100} cy={280} active={true} label="Pod 1" delay={0.5} />
            <PodCircle cx={180} cy={280} active={true} label="Pod 2" delay={0.6} />
            <PodCircle cx={320} cy={280} active={true} label="Pod 3" delay={0.7} />
            <PodCircle cx={400} cy={280} active={true} label="Pod 4" delay={0.8} />
          </motion.g>

          {/* Internal only indicator for ClusterIP */}
          <AnimatePresence>
            {selectedType === 'ClusterIP' && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <rect
                  x={175}
                  y={20}
                  width={150}
                  height={30}
                  rx="6"
                  fill="rgba(239, 68, 68, 0.1)"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
                <text x={250} y={40} fill="#f87171" textAnchor="middle" fontSize="11">
                  Kein externer Zugriff
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info Panel */}
      <motion.div
        key={selectedType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900/50 rounded-lg p-4 space-y-3"
      >
        <h4 className="text-md font-semibold text-blue-400">{info.title}</h4>
        <p className="text-sm text-slate-300">{info.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Erreichbarkeit</div>
            <div className="text-sm text-slate-200 font-medium">{info.accessibility}</div>
          </div>

          {info.portRange && (
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Port-Bereich</div>
              <div className="text-sm text-amber-400 font-mono">{info.portRange}</div>
            </div>
          )}

          <div className={`bg-slate-800/50 rounded-lg p-3 ${info.portRange ? '' : 'sm:col-span-2'}`}>
            <div className="text-xs text-slate-400 mb-1">Anwendungsfall</div>
            <div className="text-sm text-slate-200">{info.useCase}</div>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500"></div>
            <span>Pod</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500"></div>
            <span>Service</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500"></div>
            <span>Load Balancer</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="10">
              <line x1="0" y1="5" x2="20" y2="5" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
            </svg>
            <span>Traffic Flow</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
