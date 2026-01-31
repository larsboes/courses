// src/content/web-technologies/diagrams/K8sManifestExplorer.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'apiVersion',
    label: 'apiVersion',
    description: (
      <>
        <p className="mb-2">Gibt die API-Version an, die verwendet wird:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>apps/v1</strong> - Für Deployments, StatefulSets, DaemonSets</li>
          <li><strong>v1</strong> - Für Pods, Services, ConfigMaps</li>
          <li><strong>networking.k8s.io/v1</strong> - Für Ingress</li>
        </ul>
      </>
    ),
  },
  {
    id: 'kind',
    label: 'kind',
    description: (
      <>
        <p className="mb-2">Der Ressourcentyp, der erstellt werden soll:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Deployment</strong> - Verwaltet ReplicaSets und Pods</li>
          <li><strong>Service</strong> - Netzwerk-Endpunkt für Pods</li>
          <li><strong>ConfigMap</strong> - Konfigurationsdaten</li>
          <li><strong>Secret</strong> - Sensible Daten (base64)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'metadata',
    label: 'metadata',
    description: (
      <>
        <p className="mb-2">Identifizierende Informationen der Ressource:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>name</strong> - Eindeutiger Name im Namespace (required)</li>
          <li><strong>namespace</strong> - Logische Gruppierung (optional)</li>
          <li><strong>labels</strong> - Key-Value-Paare zur Selektion</li>
          <li><strong>annotations</strong> - Zusatzinformationen</li>
        </ul>
      </>
    ),
  },
  {
    id: 'spec',
    label: 'spec',
    description: (
      <>
        <p className="mb-2">Der gewünschte Zustand der Ressource (Desired State):</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>replicas</strong> - Anzahl der Pod-Kopien</li>
          <li><strong>selector</strong> - Welche Pods gehören dazu</li>
          <li><strong>template</strong> - Pod-Definition</li>
          <li>Inhalt variiert je nach <code>kind</code></li>
        </ul>
      </>
    ),
  },
]

interface RegionBoxProps {
  isActive: boolean
  onClick: () => void
  label: string
  content: string[]
  indent?: number
  className?: string
}

function RegionBox({ isActive, onClick, label, content, indent = 0, className = '' }: RegionBoxProps) {
  return (
    <motion.div
      className={`
        p-3 cursor-pointer border-l-4 transition-colors
        ${isActive
          ? 'bg-blue-900/40 border-blue-500'
          : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
      style={{ marginLeft: indent * 16 }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="font-mono text-sm">
        {content.map((line, i) => (
          <div key={i} className={isActive ? 'text-blue-200' : 'text-slate-300'}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function K8sManifestExplorer({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="flex flex-col gap-1 max-w-lg mx-auto">
          <RegionBox
            isActive={activeRegion === 'apiVersion'}
            onClick={() => setActiveRegion(activeRegion === 'apiVersion' ? null : 'apiVersion')}
            label="API VERSION"
            content={['apiVersion: apps/v1']}
          />
          <RegionBox
            isActive={activeRegion === 'kind'}
            onClick={() => setActiveRegion(activeRegion === 'kind' ? null : 'kind')}
            label="KIND"
            content={['kind: Deployment']}
          />
          <RegionBox
            isActive={activeRegion === 'metadata'}
            onClick={() => setActiveRegion(activeRegion === 'metadata' ? null : 'metadata')}
            label="METADATA"
            content={[
              'metadata:',
              '  name: my-app',
              '  labels:',
              '    app: my-app',
            ]}
          />
          <RegionBox
            isActive={activeRegion === 'spec'}
            onClick={() => setActiveRegion(activeRegion === 'spec' ? null : 'spec')}
            label="SPEC"
            content={[
              'spec:',
              '  replicas: 3',
              '  selector:',
              '    matchLabels:',
              '      app: my-app',
              '  template: ...',
            ]}
          />
        </div>
      )}
    </ExplorableSVG>
  )
}
