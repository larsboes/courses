// src/content/web-technologies/diagrams/HttpFlowDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

const steps: AnimationStep[] = [
  {
    id: 'client-ready',
    label: 'Client bereit',
    description: 'Der Browser (Client) möchte eine Ressource vom Server abrufen.',
  },
  {
    id: 'request-sent',
    label: 'Request wird gesendet',
    description: 'Der Client sendet einen HTTP Request an den Server.',
  },
  {
    id: 'server-processing',
    label: 'Server verarbeitet',
    description: 'Der Server empfängt den Request und verarbeitet ihn.',
  },
  {
    id: 'response-sent',
    label: 'Response wird gesendet',
    description: 'Der Server sendet eine HTTP Response zurück an den Client.',
  },
  {
    id: 'client-receives',
    label: 'Client empfängt',
    description: 'Der Browser empfängt die Response und zeigt die Daten an.',
  },
]

export function HttpFlowDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex items-center justify-center gap-8">
          {/* Client */}
          <div className="flex flex-col items-center gap-2">
            <Box
              highlighted={currentStep === 0 || currentStep === 4}
              variant={currentStep === 4 ? 'success' : 'default'}
            >
              Client (Browser)
            </Box>
          </div>

          {/* Arrows */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Arrow
                direction="right"
                animated={currentStep === 1}
                highlighted={currentStep === 1}
                label="HTTP Request"
              />
            </div>
            <div className="flex items-center gap-2">
              <Arrow
                direction="left"
                animated={currentStep === 3}
                highlighted={currentStep === 3}
                label="HTTP Response"
              />
            </div>
          </div>

          {/* Server */}
          <div className="flex flex-col items-center gap-2">
            <Box
              highlighted={currentStep === 2}
              variant={currentStep === 2 ? 'primary' : 'default'}
            >
              Server
            </Box>
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
