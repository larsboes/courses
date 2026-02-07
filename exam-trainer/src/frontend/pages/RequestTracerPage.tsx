// src/pages/RequestTracerPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlossary, useStepNavigator } from '@/core/hooks'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { ClusterDiagram, RequestPacket, FullStackDiagram } from '@/core/components/scenarios'
import { TermTooltip } from '@/core/components/glossary'

const categories = ['Alle', 'Full Stack', 'Kubernetes'] as const

export function RequestTracerPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { scenarios, getScenario, getTerm } = useGlossary({ courseId: courseId ?? '' })
  const [activeCategory, setActiveCategory] = useState<string>('Alle')
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id ?? 'external-to-pod')

  const filteredScenarios = useMemo(() => {
    if (activeCategory === 'Alle') return scenarios
    return scenarios.filter(s => {
      if (activeCategory === 'Full Stack') return s.diagramType === 'full-stack'
      return !s.diagramType || s.diagramType === 'k8s'
    })
  }, [scenarios, activeCategory])

  const scenario = getScenario(selectedScenarioId)
  const isFullStack = scenario?.diagramType === 'full-stack'
  const totalSteps = scenario?.steps.length ?? 1

  const stepper = useStepNavigator({
    totalSteps,
    autoPlayInterval: 2000,
  })

  // Reset stepper when scenario changes
  useEffect(() => {
    stepper.reset()
  }, [selectedScenarioId])

  // When category changes, select first scenario in filtered list
  useEffect(() => {
    if (filteredScenarios.length > 0 && !filteredScenarios.find(s => s.id === selectedScenarioId)) {
      setSelectedScenarioId(filteredScenarios[0].id)
    }
  }, [filteredScenarios, selectedScenarioId])

  const currentStep = scenario?.steps[stepper.currentStep]
  const highlightedComponents = currentStep?.highlight ?? []

  // Get packet variant based on scenario
  const packetVariant = selectedScenarioId === 'dns-resolution' ? 'dns' : 'request'

  const diagramTitle = isFullStack ? 'Full Stack Request Flow' : 'K8s Request Flow'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to={courseId ? `/course/${courseId}` : '/'}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Zurück
            </Link>
            <h1 className="text-xl font-bold">Request Tracing</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <DiagramShell
          title={diagramTitle}
          subtitle={scenario?.title}
          samples={filteredScenarios.map(s => ({ id: s.id, label: s.title }))}
          currentSample={selectedScenarioId}
          onSampleChange={setSelectedScenarioId}
          footer={
            <div className="flex gap-4 text-slate-400">
              <span>Klicke auf Komponenten für Details</span>
              <span>|</span>
              <span>▶ startet automatische Animation</span>
            </div>
          }
        >
          {/* Scenario description */}
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-slate-300">{scenario?.description}</p>
          </div>

          {/* Diagram area */}
          <div className="relative">
            {isFullStack ? (
              <FullStackDiagram
                highlighted={highlightedComponents}
                activeComponent={currentStep?.component}
                onComponentClick={(id) => {
                  const term = getTerm(id)
                  if (term) {
                    console.log('Clicked:', term.term)
                  }
                }}
              />
            ) : (
              <svg
                viewBox="0 0 500 380"
                className="w-full max-w-2xl mx-auto"
                style={{ background: '#0f172a', borderRadius: '8px' }}
              >
                {/* Cluster boundary */}
                <rect
                  x={20}
                  y={60}
                  width={460}
                  height={310}
                  rx={12}
                  fill="none"
                  stroke="#334155"
                  strokeWidth={2}
                  strokeDasharray="12,6"
                />
                <text x={240} y={52} fill="#64748b" fontSize="12" textAnchor="middle">
                  Kubernetes Cluster
                </text>

                {/* Cluster components */}
                <ClusterDiagram
                  highlighted={highlightedComponents}
                  activeComponent={currentStep?.component}
                  onComponentClick={(id) => {
                    const term = getTerm(id)
                    if (term) {
                      console.log('Clicked:', term.term)
                    }
                  }}
                />

                {/* Animated packet */}
                {currentStep && (
                  <RequestPacket
                    componentId={currentStep.component}
                    isAnimating={stepper.isAnimating}
                    variant={packetVariant}
                  />
                )}

                {/* Legend */}
                <g transform="translate(20, 375)">
                  <text fill="#64748b" fontSize="9">
                    Blau = Aktueller Schritt | Grün = Paket-Position
                  </text>
                </g>
              </svg>
            )}
          </div>

          {/* Step explanation panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stepper.currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold shrink-0">
                  {stepper.currentStep + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 mb-1">
                    {currentStep?.component && getTerm(currentStep.component)?.term || currentStep?.component}
                  </h4>
                  <p className="text-slate-300">
                    {currentStep?.description}
                  </p>

                  {/* Related terms */}
                  {currentStep?.highlight && currentStep.highlight.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {currentStep.highlight.map(id => {
                        const term = getTerm(id)
                        return term ? (
                          <TermTooltip key={id} term={id}>
                            <span className="px-2 py-1 text-xs bg-slate-700 rounded-full text-slate-300 cursor-help">
                              {term.term}
                            </span>
                          </TermTooltip>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step navigator */}
          <StepNavigator
            stepper={stepper}
            variant="numbers"
            showAutoPlay={true}
            showLabels={true}
          />
        </DiagramShell>

        {/* Scenario quick links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredScenarios.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedScenarioId === s.id
                  ? 'bg-blue-600/20 border border-blue-500'
                  : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="font-medium text-sm">{s.title}</div>
              <div className="text-xs text-slate-400 mt-1">{s.steps.length} Schritte</div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
