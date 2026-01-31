// src/content/web-technologies/diagrams/DnsResolutionDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

const steps: AnimationStep[] = [
  {
    id: 'user-query',
    label: 'DNS-Anfrage',
    description: 'Der Browser fragt: "Welche IP-Adresse hat www.example.com?"',
  },
  {
    id: 'resolver-cache',
    label: 'DNS-Resolver prüft Cache',
    description:
      'Der DNS-Resolver (meist beim ISP) prüft seinen Cache. Falls nicht gefunden, fragt er weiter.',
  },
  {
    id: 'root-server',
    label: 'Root-Server',
    description:
      'Der Root-Server kennt nicht die IP, aber weiß: "Für .com frag den TLD-Server."',
  },
  {
    id: 'tld-server',
    label: 'TLD-Server (.com)',
    description:
      'Der TLD-Server für .com sagt: "Für example.com frag den autoritativen Nameserver."',
  },
  {
    id: 'authoritative',
    label: 'Autoritativer Nameserver',
    description:
      'Der autoritative Nameserver für example.com liefert die IP-Adresse: 93.184.216.34',
  },
  {
    id: 'response',
    label: 'Antwort an Browser',
    description:
      'Die IP-Adresse wird zurückgegeben und gecacht. Der Browser kann nun die Verbindung aufbauen.',
  },
]

export function DnsResolutionDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex flex-col gap-6">
          {/* Top row: Browser and Resolver */}
          <div className="flex items-center justify-center gap-8">
            <Box
              highlighted={currentStep === 0 || currentStep === 5}
              variant={currentStep === 5 ? 'success' : 'default'}
              className="min-w-[120px] text-center"
            >
              Browser
            </Box>
            <Arrow
              direction="right"
              animated={currentStep === 0}
              highlighted={currentStep === 0}
              label="www.example.com?"
            />
            <Box
              highlighted={currentStep === 1}
              variant={currentStep === 1 ? 'primary' : 'default'}
              className="min-w-[140px] text-center"
            >
              DNS-Resolver
            </Box>
          </div>

          {/* DNS Hierarchy */}
          <div className="flex items-start justify-center gap-4">
            {/* Arrow from Resolver down */}
            <div className="flex flex-col items-center">
              <Arrow
                direction="down"
                animated={currentStep === 2}
                highlighted={currentStep >= 2 && currentStep <= 4}
              />
            </div>

            {/* Server column */}
            <div className="flex flex-col gap-4">
              <Box
                highlighted={currentStep === 2}
                variant={currentStep === 2 ? 'warning' : 'default'}
                className="min-w-[180px] text-center"
              >
                Root-Server (.)
              </Box>
              <div className="flex items-center gap-2">
                <Arrow
                  direction="down"
                  animated={currentStep === 3}
                  highlighted={currentStep === 3}
                />
              </div>
              <Box
                highlighted={currentStep === 3}
                variant={currentStep === 3 ? 'warning' : 'default'}
                className="min-w-[180px] text-center"
              >
                TLD-Server (.com)
              </Box>
              <div className="flex items-center gap-2">
                <Arrow
                  direction="down"
                  animated={currentStep === 4}
                  highlighted={currentStep === 4}
                />
              </div>
              <Box
                highlighted={currentStep === 4}
                variant={currentStep === 4 ? 'success' : 'default'}
                className="min-w-[180px] text-center"
              >
                Autoritativer NS
                <div className="text-xs text-slate-400 mt-1">example.com</div>
              </Box>
            </div>

            {/* Response info */}
            {currentStep >= 4 && (
              <div className="flex flex-col items-center justify-end h-full">
                <div className="bg-green-900/30 border border-green-700 rounded-lg px-3 py-2 text-sm">
                  <div className="text-green-400 font-mono">93.184.216.34</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
