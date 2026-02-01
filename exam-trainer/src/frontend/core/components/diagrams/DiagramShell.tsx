// src/core/components/diagrams/DiagramShell.tsx
import { Card } from '@/core/components/ui/Card'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface Sample {
  id: string
  label: string
}

export interface DiagramShellProps {
  /** Diagram title displayed in header */
  title: string
  /** Main content of the diagram */
  children: React.ReactNode
  /** Optional subtitle (e.g., current sample name) */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
  /** Available samples/examples to choose from */
  samples?: Sample[]
  /** Currently selected sample ID */
  currentSample?: string
  /** Called when sample selection changes */
  onSampleChange?: (id: string) => void
  /** Action buttons (Challenge toggle, Reset, etc.) */
  actions?: React.ReactNode
  /** Footer content (help text, syntax hints) */
  footer?: React.ReactNode
}

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

export function DiagramShell({
  title,
  children,
  subtitle,
  className,
  samples,
  currentSample,
  onSampleChange,
  actions,
  footer,
}: DiagramShellProps) {
  const showHeader = title || subtitle || samples || actions

  return (
    <Card className={`p-6 ${className ?? ''}`}>
      <div className="space-y-6">
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
              {subtitle && (
                <p className="text-sm text-slate-400">{subtitle}</p>
              )}
            </div>

            {/* Controls */}
            {(samples || actions) && (
              <div className="flex gap-2 flex-wrap">
                {samples && samples.length > 0 && onSampleChange && (
                  <select
                    value={currentSample}
                    onChange={(e) => onSampleChange(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-sm"
                  >
                    {samples.map((sample) => (
                      <option key={sample.id} value={sample.id}>
                        {sample.label}
                      </option>
                    ))}
                  </select>
                )}
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
            {footer}
          </div>
        )}
      </div>
    </Card>
  )
}
