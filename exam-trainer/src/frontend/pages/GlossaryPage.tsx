// src/pages/GlossaryPage.tsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlossary } from '@/core/hooks'
import { ComparisonCard } from '@/core/components/glossary'
import type { TermCategory } from '@/core/types/glossary'

const categories: { id: TermCategory; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'networking', label: 'Networking' },
  { id: 'storage', label: 'Storage' },
  { id: 'workloads', label: 'Workloads' },
]

export function GlossaryPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [activeTab, setActiveTab] = useState<'terms' | 'comparisons'>('terms')
  const {
    filteredTerms,
    comparisons,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useGlossary()

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
            <h1 className="text-xl font-bold">K8s Glossar</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Begriff suchen..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="flex gap-2 flex-wrap">
            {/* Tab toggle */}
            <div className="flex gap-1 p-1 bg-slate-800 rounded-lg mr-4">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Begriffe
              </button>
              <button
                onClick={() => setActiveTab('comparisons')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'comparisons'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vergleiche
              </button>
            </div>

            {/* Category filters (only for terms) */}
            {activeTab === 'terms' && (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Alle
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Terms list */}
        {activeTab === 'terms' && (
          <div className="space-y-3">
            {filteredTerms.map(term => (
              <div
                key={term.id}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-400">{term.term}</h3>
                    <p className="text-slate-300 mt-1">{term.definition}</p>
                    {term.details && (
                      <p className="text-slate-500 text-sm mt-2">{term.details}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      term.examRelevance === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : term.examRelevance === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-600/50 text-slate-400'
                    }`}>
                      {term.examRelevance === 'high' ? 'Wichtig' :
                       term.examRelevance === 'medium' ? 'Mittel' : 'Optional'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400">
                      {term.category}
                    </span>
                  </div>
                </div>

                {term.related.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <span className="text-xs text-slate-500">Verwandt: </span>
                    <span className="text-xs text-slate-400">
                      {term.related.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {filteredTerms.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                Keine Begriffe gefunden
              </div>
            )}
          </div>
        )}

        {/* Comparisons */}
        {activeTab === 'comparisons' && (
          <div className="space-y-6">
            {comparisons.map(comparison => (
              <ComparisonCard key={comparison.id} comparison={comparison} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
