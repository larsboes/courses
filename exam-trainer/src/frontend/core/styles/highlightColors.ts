// src/core/styles/highlightColors.ts
// Shared color token system for diagram highlights

export type HighlightColor = 'blue' | 'green' | 'purple' | 'amber' | 'cyan' | 'red'

export interface ColorTokens {
  /** Background with transparency (e.g., for panels) */
  bg: string
  /** Border color */
  border: string
  /** Text color */
  text: string
  /** Highlight background (e.g., for selected items) */
  highlight: string
  /** Solid background (e.g., for badges) */
  solid: string
}

export const highlightColors: Record<HighlightColor, ColorTokens> = {
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500',
    text: 'text-blue-400',
    highlight: 'bg-blue-500/30',
    solid: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500',
    text: 'text-green-400',
    highlight: 'bg-green-500/30',
    solid: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-400',
    highlight: 'bg-purple-500/30',
    solid: 'bg-purple-500',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-400',
    highlight: 'bg-amber-500/30',
    solid: 'bg-amber-500',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    highlight: 'bg-cyan-500/30',
    solid: 'bg-cyan-500',
  },
  red: {
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    text: 'text-red-400',
    highlight: 'bg-red-500/30',
    solid: 'bg-red-500',
  },
}

/** Get color tokens for a highlight color */
export function getHighlightTokens(color: HighlightColor): ColorTokens {
  return highlightColors[color]
}

/** All available highlight colors */
export const HIGHLIGHT_COLORS: HighlightColor[] = ['blue', 'green', 'purple', 'amber', 'cyan', 'red']
