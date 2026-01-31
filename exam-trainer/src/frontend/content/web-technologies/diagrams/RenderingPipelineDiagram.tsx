// src/content/web-technologies/diagrams/RenderingPipelineDiagram.tsx
import { AnimatedFlow, Box, Arrow } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

const steps: AnimationStep[] = [
  {
    id: 'html-parsing',
    label: 'HTML Parsing',
    description: 'Der Browser liest das HTML-Dokument und erstellt daraus den DOM (Document Object Model) - eine Baumstruktur aller HTML-Elemente.',
  },
  {
    id: 'css-parsing',
    label: 'CSS Parsing',
    description: 'Parallel zum HTML wird CSS geparst und der CSSOM (CSS Object Model) erstellt - alle Style-Regeln als Baumstruktur.',
  },
  {
    id: 'render-tree',
    label: 'Render Tree',
    description: 'DOM und CSSOM werden kombiniert zum Render Tree. Nur sichtbare Elemente sind enthalten (kein display:none, kein <head>).',
  },
  {
    id: 'layout',
    label: 'Layout (Reflow)',
    description: 'Der Browser berechnet die genaue Position und Größe jedes Elements auf dem Bildschirm basierend auf dem Viewport.',
  },
  {
    id: 'paint',
    label: 'Paint',
    description: 'Die Pixel werden gezeichnet. Dies ist der First Meaningful Paint (FMP) - der Nutzer sieht endlich Inhalte!',
  },
]

export function RenderingPipelineDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => (
        <div className="flex flex-col items-center gap-4">
          {/* Top row: HTML and CSS parsing */}
          <div className="flex items-start justify-center gap-8">
            {/* HTML -> DOM */}
            <div className="flex items-center gap-2">
              <Box
                highlighted={currentStep === 0}
                variant={currentStep === 0 ? 'primary' : 'default'}
              >
                HTML
              </Box>
              <Arrow
                direction="right"
                animated={currentStep === 0}
                highlighted={currentStep === 0}
              />
              <Box
                highlighted={currentStep === 0 || currentStep === 2}
                variant={currentStep === 0 ? 'success' : currentStep === 2 ? 'primary' : 'default'}
              >
                DOM
              </Box>
            </div>

            {/* CSS -> CSSOM */}
            <div className="flex items-center gap-2">
              <Box
                highlighted={currentStep === 1}
                variant={currentStep === 1 ? 'primary' : 'default'}
              >
                CSS
              </Box>
              <Arrow
                direction="right"
                animated={currentStep === 1}
                highlighted={currentStep === 1}
              />
              <Box
                highlighted={currentStep === 1 || currentStep === 2}
                variant={currentStep === 1 ? 'success' : currentStep === 2 ? 'primary' : 'default'}
              >
                CSSOM
              </Box>
            </div>
          </div>

          {/* Merge arrows */}
          <div className="flex items-center justify-center gap-16">
            <Arrow
              direction="down"
              animated={currentStep === 2}
              highlighted={currentStep === 2}
            />
            <Arrow
              direction="down"
              animated={currentStep === 2}
              highlighted={currentStep === 2}
            />
          </div>

          {/* Bottom row: Render Tree -> Layout -> Paint */}
          <div className="flex items-center justify-center gap-2">
            <Box
              highlighted={currentStep === 2}
              variant={currentStep === 2 ? 'success' : currentStep > 2 ? 'default' : 'default'}
            >
              Render Tree
            </Box>
            <Arrow
              direction="right"
              animated={currentStep === 3}
              highlighted={currentStep === 3}
            />
            <Box
              highlighted={currentStep === 3}
              variant={currentStep === 3 ? 'primary' : 'default'}
            >
              Layout
            </Box>
            <Arrow
              direction="right"
              animated={currentStep === 4}
              highlighted={currentStep === 4}
            />
            <Box
              highlighted={currentStep === 4}
              variant={currentStep === 4 ? 'success' : 'default'}
            >
              Paint (FMP)
            </Box>
          </div>
        </div>
      )}
    </AnimatedFlow>
  )
}
