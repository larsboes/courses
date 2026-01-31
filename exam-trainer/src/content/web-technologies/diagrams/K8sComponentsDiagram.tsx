// src/content/web-technologies/diagrams/K8sComponentsDiagram.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'cluster',
    label: 'Cluster',
    description: (
      <>
        <p className="mb-2">Der Kubernetes <strong>Cluster</strong> ist die Gesamtheit aller Ressourcen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Besteht aus <strong>Master Node(s)</strong> und <strong>Worker Nodes</strong></li>
          <li>Wird von der <strong>Control Plane</strong> verwaltet</li>
          <li>Stellt die Infrastruktur fuer Anwendungen bereit</li>
        </ul>
      </>
    ),
  },
  {
    id: 'control-plane',
    label: 'Control Plane',
    description: (
      <>
        <p className="mb-2">Das "Gehirn" des Clusters mit wichtigen Komponenten:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>API Server</strong> - Zentrale Schnittstelle fuer alle Operationen</li>
          <li><strong>etcd</strong> - Key-Value Store fuer Cluster-Zustand</li>
          <li><strong>Scheduler</strong> - Weist Pods den Nodes zu</li>
          <li><strong>Controller Manager</strong> - Ueberwacht und reguliert Zustand</li>
        </ul>
      </>
    ),
  },
  {
    id: 'node',
    label: 'Worker Node',
    description: (
      <>
        <p className="mb-2">Ein <strong>Node</strong> ist eine physische oder virtuelle Maschine:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Fuehrt <strong>kubelet</strong> aus (Agent fuer Control Plane)</li>
          <li>Enthaelt <strong>Container Runtime</strong> (z.B. containerd)</li>
          <li>Betreibt <strong>kube-proxy</strong> fuer Netzwerk</li>
          <li>Hostet einen oder mehrere Pods</li>
        </ul>
      </>
    ),
  },
  {
    id: 'pod',
    label: 'Pod',
    description: (
      <>
        <p className="mb-2">Ein <strong>Pod</strong> ist die kleinste deploybare Einheit:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Enthaelt einen oder mehrere <strong>Container</strong></li>
          <li>Container im Pod teilen <strong>Netzwerk</strong> und <strong>Storage</strong></li>
          <li>Hat eine <strong>eigene IP-Adresse</strong> im Cluster</li>
          <li>Kurzlebig - kann jederzeit neu erstellt werden</li>
        </ul>
      </>
    ),
  },
  {
    id: 'container',
    label: 'Container',
    description: (
      <>
        <p className="mb-2">Ein <strong>Container</strong> ist eine isolierte Anwendungsinstanz:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Basiert auf einem <strong>Container Image</strong></li>
          <li>Laeuft isoliert mit eigenem Dateisystem</li>
          <li>Teilt den Kernel mit dem Host (anders als VMs)</li>
          <li>Mehrere Container pro Pod moeglich (Sidecar Pattern)</li>
        </ul>
      </>
    ),
  },
]

interface ComponentBoxProps {
  isActive: boolean
  onClick: (e: React.MouseEvent) => void
  label: string
  children?: React.ReactNode
  className?: string
  color: 'purple' | 'blue' | 'green' | 'amber' | 'cyan'
}

const colorStyles = {
  purple: {
    active: 'bg-purple-900/50 border-purple-500',
    inactive: 'bg-purple-900/20 border-purple-700 hover:border-purple-500',
    text: 'text-purple-300',
  },
  blue: {
    active: 'bg-blue-900/50 border-blue-500',
    inactive: 'bg-blue-900/20 border-blue-700 hover:border-blue-500',
    text: 'text-blue-300',
  },
  green: {
    active: 'bg-green-900/50 border-green-500',
    inactive: 'bg-green-900/20 border-green-700 hover:border-green-500',
    text: 'text-green-300',
  },
  amber: {
    active: 'bg-amber-900/50 border-amber-500',
    inactive: 'bg-amber-900/20 border-amber-700 hover:border-amber-500',
    text: 'text-amber-300',
  },
  cyan: {
    active: 'bg-cyan-900/50 border-cyan-500',
    inactive: 'bg-cyan-900/20 border-cyan-700 hover:border-cyan-500',
    text: 'text-cyan-300',
  },
}

function ComponentBox({
  isActive,
  onClick,
  label,
  children,
  className = '',
  color,
}: ComponentBoxProps) {
  const styles = colorStyles[color]
  return (
    <motion.div
      className={`
        p-3 cursor-pointer rounded-lg border-2 transition-colors
        ${isActive ? styles.active : styles.inactive}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`text-xs font-semibold mb-1 ${styles.text}`}>{label}</div>
      {children}
    </motion.div>
  )
}

export function K8sComponentsDiagram({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="space-y-3">
          {/* Cluster boundary */}
          <ComponentBox
            isActive={activeRegion === 'cluster'}
            onClick={() => setActiveRegion(activeRegion === 'cluster' ? null : 'cluster')}
            label="KUBERNETES CLUSTER"
            color="purple"
            className="p-4"
          >
            <div className="space-y-3 mt-2">
              {/* Control Plane */}
              <ComponentBox
                isActive={activeRegion === 'control-plane'}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveRegion(activeRegion === 'control-plane' ? null : 'control-plane')
                }}
                label="CONTROL PLANE (Master)"
                color="blue"
              >
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">API Server</span>
                  <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">etcd</span>
                  <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Scheduler</span>
                  <span className="px-2 py-1 bg-blue-800/50 rounded text-xs text-blue-200">Controller</span>
                </div>
              </ComponentBox>

              {/* Worker Nodes */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Node 1 */}
                <ComponentBox
                  isActive={activeRegion === 'node'}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveRegion(activeRegion === 'node' ? null : 'node')
                  }}
                  label="WORKER NODE 1"
                  color="green"
                >
                  <div className="space-y-2 mt-2">
                    <div className="flex gap-2">
                      {/* Pod 1 */}
                      <ComponentBox
                        isActive={activeRegion === 'pod'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveRegion(activeRegion === 'pod' ? null : 'pod')
                        }}
                        label="POD"
                        color="amber"
                        className="flex-1"
                      >
                        <ComponentBox
                          isActive={activeRegion === 'container'}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveRegion(activeRegion === 'container' ? null : 'container')
                          }}
                          label="Container"
                          color="cyan"
                          className="mt-1"
                        >
                          <div className="text-xs text-cyan-200 font-mono">nginx:1.21</div>
                        </ComponentBox>
                      </ComponentBox>
                      {/* Pod 2 */}
                      <div
                        className={`
                          flex-1 p-2 rounded-lg border-2 border-dashed
                          ${activeRegion === 'pod' ? 'border-amber-500 bg-amber-900/30' : 'border-amber-700/50 bg-amber-900/10'}
                        `}
                      >
                        <div className="text-xs text-amber-300/70">POD</div>
                        <div className="text-xs text-cyan-300/50 mt-1">Container</div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-green-800/30 rounded text-green-300">kubelet</span>
                      <span className="px-2 py-1 bg-green-800/30 rounded text-green-300">kube-proxy</span>
                    </div>
                  </div>
                </ComponentBox>

                {/* Node 2 (simplified) */}
                <div
                  className={`
                    p-3 rounded-lg border-2 border-dashed
                    ${activeRegion === 'node' ? 'border-green-500 bg-green-900/30' : 'border-green-700/50 bg-green-900/10'}
                  `}
                >
                  <div className="text-xs font-semibold text-green-300/70">WORKER NODE 2</div>
                  <div className="mt-2 space-y-1">
                    <div className="p-2 rounded border border-dashed border-amber-700/50 bg-amber-900/10">
                      <div className="text-xs text-amber-300/50">POD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ComponentBox>
        </div>
      )}
    </ExplorableSVG>
  )
}
