// src/core/components/glossary/ComparisonCard.tsx
import { useGlossary } from '@/core/hooks'
import type { Comparison } from '@/core/types/glossary'

interface ComparisonCardProps {
  comparison: Comparison
  className?: string
}

export function ComparisonCard({ comparison, className = '' }: ComparisonCardProps) {
  const { getTerm } = useGlossary()

  const [term1, term2] = comparison.items.map(id => getTerm(id))

  if (!term1 || !term2) {
    return null
  }

  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center justify-center gap-3 text-lg">
          <span className="text-blue-400 font-semibold">{term1.term}</span>
          <span className="text-slate-500">vs</span>
          <span className="text-purple-400 font-semibold">{term2.term}</span>
        </div>
      </div>

      {/* Differences */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
              {term1.term}
            </div>
            <div className="text-sm text-slate-300">
              {term1.definition}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
              {term2.term}
            </div>
            <div className="text-sm text-slate-300">
              {term2.definition}
            </div>
          </div>
        </div>

        {/* Key differences */}
        <div className="mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Unterschiede
          </div>
          <ul className="space-y-1">
            {comparison.differences.map((diff, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-green-400">•</span>
                {diff}
              </li>
            ))}
          </ul>
        </div>

        {/* Common confusion */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="text-xs text-amber-400 uppercase tracking-wide mb-1">
            Häufige Verwechslung
          </div>
          <div className="text-sm text-amber-200/80">
            {comparison.commonConfusion}
          </div>
        </div>
      </div>
    </div>
  )
}
