// src/content/web-technologies/diagrams/K8sNetworkDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'
import { motion } from 'framer-motion'

const steps: AnimationStep[] = [
  {
    id: 'external-request',
    label: 'Externe Anfrage',
    description:
      'Ein externer Client (z.B. Browser) sendet eine Anfrage an die Anwendung im Kubernetes Cluster.',
  },
  {
    id: 'ingress',
    label: 'Ingress Controller',
    description:
      'Der Ingress Controller empfängt die Anfrage und routet sie basierend auf Host/Path-Regeln zum richtigen Service.',
  },
  {
    id: 'loadbalancer',
    label: 'LoadBalancer Service',
    description:
      'Ein LoadBalancer Service (Typ: LoadBalancer) verteilt den Traffic auf mehrere Nodes. Wird von Cloud-Providern bereitgestellt.',
  },
  {
    id: 'nodeport',
    label: 'NodePort Service',
    description:
      'Ein NodePort Service öffnet einen Port (30000-32767) auf jedem Node. Intern wird der Traffic zum ClusterIP weitergeleitet.',
  },
  {
    id: 'clusterip',
    label: 'ClusterIP Service',
    description:
      'Der ClusterIP Service ist die interne Basis. Er hat eine virtuelle IP und verteilt Traffic auf die Pods via kube-proxy.',
  },
  {
    id: 'pod-reached',
    label: 'Pod empfängt Request',
    description:
      'Der Pod empfängt die Anfrage. Pods haben eigene IP-Adressen und können direkt miteinander kommunizieren.',
  },
]

interface ServiceBoxProps {
  label: string
  type: string
  highlighted: boolean
  active: boolean
  variant: 'default' | 'primary' | 'success' | 'warning'
}

function ServiceBox({ label, type, highlighted, active, variant }: ServiceBoxProps) {
  return (
    <motion.div
      className={`
        relative px-4 py-3 rounded-lg border-2 text-center
        ${
          active
            ? variant === 'primary'
              ? 'bg-blue-900/50 border-blue-500'
              : variant === 'success'
                ? 'bg-green-900/50 border-green-500'
                : variant === 'warning'
                  ? 'bg-amber-900/50 border-amber-500'
                  : 'bg-slate-700 border-slate-600'
            : 'bg-slate-800/50 border-slate-700'
        }
      `}
      animate={{
        scale: highlighted ? 1.05 : 1,
        boxShadow: highlighted
          ? '0 0 20px rgba(59, 130, 246, 0.5)'
          : '0 0 0px rgba(59, 130, 246, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="font-medium">{label}</div>
      <div className="text-xs text-slate-400 mt-1">{type}</div>
    </motion.div>
  )
}

export function K8sNetworkDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex flex-col items-center gap-4">
          {/* External Client */}
          <Box
            highlighted={currentStep === 0}
            variant={currentStep === 0 ? 'primary' : 'default'}
            className="w-40"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🌐</div>
              <div>Externer Client</div>
            </div>
          </Box>

          <Arrow direction="down" animated={currentStep === 0} highlighted={currentStep === 0} />

          {/* Ingress */}
          <ServiceBox
            label="Ingress Controller"
            type="L7 Routing (HTTP/HTTPS)"
            highlighted={currentStep === 1}
            active={currentStep >= 1}
            variant="warning"
          />

          <Arrow direction="down" animated={currentStep === 1} highlighted={currentStep === 1} />

          {/* LoadBalancer */}
          <ServiceBox
            label="LoadBalancer Service"
            type="Externe IP (Cloud)"
            highlighted={currentStep === 2}
            active={currentStep >= 2}
            variant="primary"
          />

          <Arrow direction="down" animated={currentStep === 2} highlighted={currentStep === 2} />

          {/* NodePort */}
          <ServiceBox
            label="NodePort Service"
            type="Port 30000-32767"
            highlighted={currentStep === 3}
            active={currentStep >= 3}
            variant="primary"
          />

          <Arrow direction="down" animated={currentStep === 3} highlighted={currentStep === 3} />

          {/* ClusterIP */}
          <ServiceBox
            label="ClusterIP Service"
            type="Interne Cluster-IP"
            highlighted={currentStep === 4}
            active={currentStep >= 4}
            variant="primary"
          />

          <Arrow direction="down" animated={currentStep === 4} highlighted={currentStep === 4} />

          {/* Pods */}
          <div className="flex gap-3">
            {[1, 2, 3].map((num) => (
              <Box
                key={num}
                highlighted={currentStep === 5}
                variant={currentStep === 5 ? 'success' : 'default'}
              >
                <div className="text-center">
                  <div className="text-sm">Pod {num}</div>
                  <div className="text-xs text-slate-400">10.1.0.{num}</div>
                </div>
              </Box>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-slate-700 w-full">
            <div className="text-xs text-slate-400 text-center">
              Service-Hierarchie: LoadBalancer → NodePort → ClusterIP → Pods
            </div>
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
