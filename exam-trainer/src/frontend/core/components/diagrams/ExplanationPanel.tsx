// src/core/components/diagrams/ExplanationPanel.tsx
import { highlightColors, type HighlightColor } from '@/core/styles'

export interface ExplanationPanelProps {
  /** Short label displayed as a badge */
  label: string
  /** Main explanation text */
  explanation: string
  /** Color theme from highlightColors */
  color: HighlightColor
  /** Optional metadata (e.g., "Line 2-5", "Step 3/6") */
  meta?: string
  /** Additional CSS classes */
  className?: string
}

export function ExplanationPanel({
  label,
  explanation,
  color,
  meta,
  className,
}: ExplanationPanelProps) {
  const colors = highlightColors[color]

  return (
    <div
      className={`
        p-4 rounded-lg border-l-4
        ${colors.bg}
        ${colors.border}
        ${className ?? ''}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`
            px-2 py-0.5 rounded text-xs font-semibold
            ${colors.text}
            bg-slate-800
          `}
        >
          {label}
        </span>
        {meta && (
          <span className="text-slate-500 text-xs">{meta}</span>
        )}
      </div>
      <p className="text-slate-300 leading-relaxed">{explanation}</p>
    </div>
  )
}
