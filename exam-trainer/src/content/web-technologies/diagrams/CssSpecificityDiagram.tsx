// src/content/web-technologies/diagrams/CssSpecificityDiagram.tsx
import { AnimatedFlow, Box } from '@/core/components/diagrams'
import type { AnimationStep } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'
import { motion } from 'framer-motion'

const steps: AnimationStep[] = [
  {
    id: 'selector-input',
    label: 'Selektor analysieren',
    description: 'Der CSS-Selektor wird in seine Bestandteile zerlegt.',
  },
  {
    id: 'inline-styles',
    label: 'Inline-Styles (1,0,0,0)',
    description:
      'Inline-Styles haben die hoechste Spezifitaet. Sie werden direkt im HTML-Element definiert (style="...").',
  },
  {
    id: 'ids',
    label: 'IDs zaehlen (0,1,0,0)',
    description:
      'Jede ID (#name) im Selektor erhoeht die Spezifitaet um 0,1,0,0.',
  },
  {
    id: 'classes',
    label: 'Klassen zaehlen (0,0,1,0)',
    description:
      'Klassen (.name), Attribute ([type="text"]) und Pseudo-Klassen (:hover) zaehlen als 0,0,1,0.',
  },
  {
    id: 'elements',
    label: 'Elemente zaehlen (0,0,0,1)',
    description:
      'Element-Selektoren (div, p, h1) und Pseudo-Elemente (::before) zaehlen als 0,0,0,1.',
  },
  {
    id: 'result',
    label: 'Ergebnis berechnen',
    description:
      'Die Zahlen werden zusammengezaehlt. Die hoehere Spezifitaet gewinnt.',
  },
]

interface SpecificityBoxProps {
  label: string
  value: number
  highlighted: boolean
  color: string
}

function SpecificityBox({ label, value, highlighted, color }: SpecificityBoxProps) {
  return (
    <motion.div
      className={`flex flex-col items-center p-3 rounded-lg border-2 ${color}`}
      animate={{
        scale: highlighted ? 1.1 : 1,
        boxShadow: highlighted
          ? '0 0 20px rgba(59, 130, 246, 0.5)'
          : '0 0 0px rgba(59, 130, 246, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-xs text-slate-400 mb-1">{label}</span>
      <motion.span
        className="text-2xl font-bold font-mono"
        animate={{
          scale: highlighted ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    </motion.div>
  )
}

export function CssSpecificityDiagram({ className }: DiagramProps) {
  return (
    <AnimatedFlow steps={steps} className={className}>
      {(currentStep) => {
        // Example selector: div#main .content p:hover
        // Specificity: 0, 1, 2, 2
        const showValues = currentStep >= 1

        return (
          <div className="flex flex-col items-center gap-6">
            {/* Example Selector */}
            <Box
              highlighted={currentStep === 0}
              variant={currentStep === 0 ? 'primary' : 'default'}
              className="font-mono text-sm"
            >
              <span className={currentStep >= 4 ? 'text-purple-400' : ''}>div</span>
              <span className={currentStep >= 2 ? 'text-red-400' : ''}>#main</span>
              {' '}
              <span className={currentStep >= 3 ? 'text-amber-400' : ''}>.content</span>
              {' '}
              <span className={currentStep >= 4 ? 'text-purple-400' : ''}>p</span>
              <span className={currentStep >= 3 ? 'text-amber-400' : ''}>:hover</span>
            </Box>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showValues ? 1 : 0 }}
              className="text-slate-500"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </motion.div>

            {/* Specificity Calculation */}
            <div className="flex gap-2 items-center">
              <SpecificityBox
                label="Inline"
                value={0}
                highlighted={currentStep === 1}
                color={
                  currentStep === 1
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-slate-700/50 border-slate-600'
                }
              />
              <span className="text-slate-500 text-xl">,</span>
              <SpecificityBox
                label="IDs"
                value={currentStep >= 2 ? 1 : 0}
                highlighted={currentStep === 2}
                color={
                  currentStep === 2
                    ? 'bg-red-900/50 border-red-500'
                    : 'bg-slate-700/50 border-slate-600'
                }
              />
              <span className="text-slate-500 text-xl">,</span>
              <SpecificityBox
                label="Klassen"
                value={currentStep >= 3 ? 2 : 0}
                highlighted={currentStep === 3}
                color={
                  currentStep === 3
                    ? 'bg-amber-900/50 border-amber-500'
                    : 'bg-slate-700/50 border-slate-600'
                }
              />
              <span className="text-slate-500 text-xl">,</span>
              <SpecificityBox
                label="Elemente"
                value={currentStep >= 4 ? 2 : 0}
                highlighted={currentStep === 4}
                color={
                  currentStep === 4
                    ? 'bg-purple-900/50 border-purple-500'
                    : 'bg-slate-700/50 border-slate-600'
                }
              />
            </div>

            {/* Final Result */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: currentStep === 5 ? 1 : 0,
                y: currentStep === 5 ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-slate-400">Spezifitaet:</span>
              <Box highlighted variant="success" className="font-mono text-lg">
                0, 1, 2, 2
              </Box>
            </motion.div>
          </div>
        )
      }}
    </AnimatedFlow>
  )
}
