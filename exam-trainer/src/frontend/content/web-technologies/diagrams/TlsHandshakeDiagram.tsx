// src/content/web-technologies/diagrams/TlsHandshakeDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

const steps: AnimationStep[] = [
  {
    id: 'client-hello',
    label: 'ClientHello',
    description:
      'Der Client sendet: unterstützte TLS-Versionen, Cipher Suites und einen zufälligen Wert (Client Random).',
  },
  {
    id: 'server-hello',
    label: 'ServerHello',
    description:
      'Der Server antwortet mit: gewählter TLS-Version, Cipher Suite und Server Random.',
  },
  {
    id: 'certificate',
    label: 'Zertifikat',
    description:
      'Der Server sendet sein SSL/TLS-Zertifikat. Der Client verifiziert es über die Zertifikatskette.',
  },
  {
    id: 'key-exchange',
    label: 'Schlüsselaustausch',
    description:
      'Client und Server tauschen Schlüsselmaterial aus (z.B. via Diffie-Hellman) um den Session Key zu berechnen.',
  },
  {
    id: 'finished',
    label: 'Finished',
    description:
      'Beide Seiten senden eine "Finished"-Nachricht. Die verschlüsselte Verbindung ist hergestellt.',
  },
]

export function TlsHandshakeDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex items-start justify-center gap-8">
          {/* Client */}
          <div className="flex flex-col items-center gap-4">
            <Box
              highlighted={currentStep === 0 || currentStep === 3}
              variant={currentStep === 4 ? 'success' : 'default'}
              className="min-w-[100px] text-center"
            >
              Client
            </Box>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              {currentStep >= 0 && (
                <div className="bg-slate-800 px-2 py-1 rounded">
                  TLS 1.3, AES-GCM...
                </div>
              )}
              {currentStep >= 3 && (
                <div className="bg-blue-900/30 border border-blue-700 px-2 py-1 rounded">
                  Pre-Master Secret
                </div>
              )}
              {currentStep >= 4 && (
                <div className="bg-green-900/30 border border-green-700 px-2 py-1 rounded">
                  Session Key
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 pt-2">
            {/* ClientHello */}
            <div className="flex items-center">
              <Arrow
                direction="right"
                animated={currentStep === 0}
                highlighted={currentStep === 0}
                label="ClientHello"
              />
            </div>

            {/* ServerHello */}
            <div className="flex items-center">
              <Arrow
                direction="left"
                animated={currentStep === 1}
                highlighted={currentStep === 1}
                label="ServerHello"
              />
            </div>

            {/* Certificate */}
            <div className="flex items-center">
              <Arrow
                direction="left"
                animated={currentStep === 2}
                highlighted={currentStep === 2}
                label="Certificate"
              />
            </div>

            {/* Key Exchange */}
            <div className="flex items-center">
              <Arrow
                direction="right"
                animated={currentStep === 3}
                highlighted={currentStep === 3}
                label="Key Exchange"
              />
            </div>

            {/* Finished (both directions) */}
            <div className="flex flex-col gap-1">
              <Arrow
                direction="right"
                animated={currentStep === 4}
                highlighted={currentStep === 4}
                label="Finished"
              />
              <Arrow
                direction="left"
                animated={currentStep === 4}
                highlighted={currentStep === 4}
                label="Finished"
              />
            </div>
          </div>

          {/* Server */}
          <div className="flex flex-col items-center gap-4">
            <Box
              highlighted={currentStep === 1 || currentStep === 2}
              variant={currentStep === 4 ? 'success' : 'default'}
              className="min-w-[100px] text-center"
            >
              Server
            </Box>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              {currentStep >= 1 && (
                <div className="bg-slate-800 px-2 py-1 rounded">
                  TLS 1.3, AES-256
                </div>
              )}
              {currentStep >= 2 && (
                <div className="bg-amber-900/30 border border-amber-700 px-2 py-1 rounded flex items-center gap-1">
                  <span>Zertifikat</span>
                </div>
              )}
              {currentStep >= 4 && (
                <div className="bg-green-900/30 border border-green-700 px-2 py-1 rounded">
                  Session Key
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
