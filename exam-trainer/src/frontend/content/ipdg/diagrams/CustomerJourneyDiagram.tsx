// src/content/ipdg/diagrams/CustomerJourneyDiagram.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { useStepNavigator } from '@/core/hooks'
import { highlightColors } from '@/core/styles'
import type { HighlightColor } from '@/core/styles'

// ─────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────

interface JourneyPhase {
  id: string
  color: HighlightColor
  label: string
  labelDe: string
  icon: string
  customerAction: string
  companyAction: string
  crmType: string
  kpis: string[]
}

const phases: JourneyPhase[] = [
  {
    id: 'awareness',
    color: 'amber',
    label: 'Awareness',
    labelDe: 'Aufmerksamkeit',
    icon: '👀',
    customerAction: 'Der Kunde wird auf das Unternehmen/Produkt aufmerksam, z.B. durch Werbung, Social Media, Empfehlungen.',
    companyAction: 'Marketing-Kampagnen, Social-Media-Präsenz, SEO, Content Marketing, Brand Awareness aufbauen.',
    crmType: 'Kommunikatives CRM wählt die Kanäle, Operatives CRM steuert die Kampagnen.',
    kpis: ['Reichweite', 'Impressions', 'Brand Awareness', 'CAC'],
  },
  {
    id: 'consideration',
    color: 'blue',
    label: 'Consideration',
    labelDe: 'Vergleich',
    icon: '🤔',
    customerAction: 'Der Kunde vergleicht Alternativen, recherchiert, liest Bewertungen und prüft Angebote.',
    companyAction: 'Produktinformationen bereitstellen, Vergleichstools, Testversionen, personalisierte Angebote.',
    crmType: 'Analytisches CRM identifiziert Kundenbedürfnisse, Operatives CRM liefert passende Inhalte.',
    kpis: ['MQL/SQL Ratio', 'Engagement Score', 'Website-Verweildauer', 'Lead-to-Customer Rate'],
  },
  {
    id: 'purchase',
    color: 'green',
    label: 'Purchase',
    labelDe: 'Kauf',
    icon: '🛒',
    customerAction: 'Der Kunde trifft die Kaufentscheidung und schließt den Kauf ab.',
    companyAction: 'Reibungsloser Kaufprozess, Cross-/Up-Selling Angebote, Zahlungsoptionen.',
    crmType: 'Operatives CRM wickelt den Kauf ab, Analytisches CRM schlägt Cross-/Up-Selling vor.',
    kpis: ['Conversion Rate', 'Sales Cycle', 'Pipeline Value', 'Win Rate'],
  },
  {
    id: 'retention',
    color: 'purple',
    label: 'Retention',
    labelDe: 'Bindung',
    icon: '🔄',
    customerAction: 'Der Kunde nutzt das Produkt, kontaktiert den Service, kauft erneut.',
    companyAction: 'After-Sales Service, Loyalty-Programme, proaktiver Support, Zufriedenheitsbefragungen.',
    crmType: 'Strategisches CRM plant Bindungsmaßnahmen, Analytisches CRM überwacht Churn-Risiko.',
    kpis: ['Retention Rate', 'Churn Rate', 'CSAT', 'NPS', 'Repeat Purchase Rate'],
  },
  {
    id: 'advocacy',
    color: 'cyan',
    label: 'Advocacy',
    labelDe: 'Empfehlung',
    icon: '📢',
    customerAction: 'Der Kunde empfiehlt das Unternehmen aktiv weiter und wird zum Markenbotschafter.',
    companyAction: 'Referral-Programme, Social Proof nutzen, Bewertungen fördern, Community aufbauen.',
    crmType: 'Kommunikatives CRM fördert Weiterempfehlung, Analytisches CRM misst den NPS.',
    kpis: ['NPS', 'Referral Rate', 'CLV', 'ARPU'],
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

interface CustomerJourneyDiagramProps {
  className?: string
}

export function CustomerJourneyDiagram({ className = '' }: CustomerJourneyDiagramProps) {
  const stepper = useStepNavigator({ totalSteps: phases.length, autoPlayInterval: 3000 })
  const current = phases[stepper.currentStep]
  const tokens = highlightColors[current.color]

  return (
    <DiagramShell
      title="Customer Journey"
      subtitle="5 Phasen mit CRM-Aktionen und KPIs"
      className={className}
      footer="Navigiere durch die 5 Phasen der Kundenreise"
    >
      {/* Phase Timeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {phases.map((phase, index) => {
          const phaseTokens = highlightColors[phase.color]
          const isCurrent = index === stepper.currentStep
          const isReached = index <= stepper.currentStep

          return (
            <div key={phase.id} className="flex items-center flex-1 min-w-0">
              <motion.button
                onClick={() => stepper.goTo(index)}
                className={`
                  flex-1 min-w-0 p-2 rounded-lg border text-center cursor-pointer transition-colors
                  ${isCurrent ? `${phaseTokens.highlight} ${phaseTokens.border}` : isReached ? `${phaseTokens.bg} ${phaseTokens.border}` : 'bg-slate-800/50 border-slate-700'}
                `}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="text-xl">{phase.icon}</div>
                <div className={`text-[10px] font-medium truncate ${isCurrent ? phaseTokens.text : 'text-slate-500'}`}>
                  {phase.label}
                </div>
              </motion.button>
              {index < phases.length - 1 && (
                <motion.span
                  className="text-sm font-bold shrink-0 px-0.5"
                  animate={{ color: isReached && index < stepper.currentStep ? '#22c55e' : '#475569' }}
                >
                  →
                </motion.span>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border ${tokens.bg} ${tokens.border}`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <h4 className={`font-semibold text-lg ${tokens.text}`}>
                {stepper.currentStep + 1}. {current.label}
              </h4>
              <p className="text-sm text-slate-400">{current.labelDe}</p>
            </div>
          </div>

          {/* Two columns: Customer & Company */}
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Was der Kunde tut</p>
              <p className="text-sm text-slate-300">{current.customerAction}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Was das Unternehmen tut</p>
              <p className="text-sm text-slate-300">{current.companyAction}</p>
            </div>
          </div>

          {/* CRM Type */}
          <div className={`p-3 rounded-lg border ${tokens.border} bg-slate-800/30 mb-4`}>
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Welcher CRM-Typ ist aktiv?</p>
            <p className="text-sm text-slate-300">{current.crmType}</p>
          </div>

          {/* KPIs */}
          <div>
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Relevante KPIs</p>
            <div className="flex flex-wrap gap-2">
              {current.kpis.map((kpi) => (
                <span
                  key={kpi}
                  className={`px-2.5 py-1 text-xs rounded-full border ${tokens.border} ${tokens.text}`}
                >
                  {kpi}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Navigator */}
      <StepNavigator stepper={stepper} variant="numbers" />
    </DiagramShell>
  )
}
