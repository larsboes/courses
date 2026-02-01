// src/core/components/flashcards/FlashcardCard.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export type CardType = 'term-to-definition' | 'definition-to-term' | 'comparison' | 'scenario'

export interface FlashcardData {
  id: string
  type: CardType
  front: string
  back: string
  category?: string
}

interface FlashcardCardProps {
  card: FlashcardData
  onKnow: () => void
  onDontKnow: () => void
  showButtons?: boolean
}

export function FlashcardCard({ card, onKnow, onDontKnow, showButtons = true }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card */}
      <div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {card.category && (
              <span className="absolute top-4 left-4 px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400">
                {card.category}
              </span>
            )}
            <span className="absolute top-4 right-4 text-xs text-slate-500">
              {card.type === 'term-to-definition' ? 'Begriff → Definition' :
               card.type === 'definition-to-term' ? 'Definition → Begriff' :
               card.type === 'comparison' ? 'Vergleich' : 'Szenario'}
            </span>
            <div className="text-xl text-center text-white leading-relaxed">
              {card.front}
            </div>
            <div className="absolute bottom-4 text-xs text-slate-500">
              Klicken zum Umdrehen
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-800 border border-blue-500/50 rounded-xl p-6 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-lg text-center text-slate-200 leading-relaxed whitespace-pre-line">
              {card.back}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      {showButtons && isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mt-6 justify-center"
        >
          <button
            onClick={e => {
              e.stopPropagation()
              onDontKnow()
              setIsFlipped(false)
            }}
            className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Wusste ich nicht
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              onKnow()
              setIsFlipped(false)
            }}
            className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            Wusste ich
          </button>
        </motion.div>
      )}
    </div>
  )
}
