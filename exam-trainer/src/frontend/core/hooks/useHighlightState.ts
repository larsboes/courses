// src/core/hooks/useHighlightState.ts
import { useState, useCallback, useMemo } from 'react'
import type { HighlightColor, ColorTokens } from '@/core/styles/highlightColors'
import { highlightColors } from '@/core/styles/highlightColors'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface HighlightItem {
  id: string
  color?: HighlightColor
}

export interface UseHighlightStateOptions<T extends HighlightItem> {
  /** Items that can be highlighted */
  items: T[]
  /** Default color when item doesn't specify one */
  defaultColor?: HighlightColor
  /** Allow multiple items to be selected */
  multiSelect?: boolean
}

export interface HighlightState<T extends HighlightItem> {
  /** Currently hovered item ID */
  hoveredId: string | null
  /** Currently selected item ID(s) */
  selectedIds: Set<string>
  /** Currently active item (hovered takes precedence over selected) */
  activeId: string | null
  /** Currently active item object */
  activeItem: T | null

  /** Check if an item is highlighted (hovered or selected) */
  isHighlighted: (id: string) => boolean
  /** Check if an item is hovered */
  isHovered: (id: string) => boolean
  /** Check if an item is selected */
  isSelected: (id: string) => boolean

  /** Get highlight classes for an item */
  getHighlightClasses: (id: string) => string
  /** Get the color tokens for an item */
  getColorTokens: (id: string) => ColorTokens | null

  /** Set hovered item */
  setHovered: (id: string | null) => void
  /** Toggle selection of an item */
  toggleSelected: (id: string) => void
  /** Set selected item (single select mode) */
  setSelected: (id: string | null) => void
  /** Clear all selections */
  clearSelection: () => void
  /** Reset all state */
  reset: () => void

  /** Event handlers for easy binding */
  handlers: (id: string) => {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onClick: () => void
  }
}

// ─────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────

export function useHighlightState<T extends HighlightItem>({
  items,
  defaultColor = 'blue',
  multiSelect = false,
}: UseHighlightStateOptions<T>): HighlightState<T> {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Item lookup map
  const itemMap = useMemo(() => {
    const map = new Map<string, T>()
    items.forEach(item => map.set(item.id, item))
    return map
  }, [items])

  // Active ID (hovered takes precedence)
  const activeId = hoveredId ?? (selectedIds.size === 1 ? [...selectedIds][0] : null)
  const activeItem = activeId ? itemMap.get(activeId) ?? null : null

  // Check functions
  const isHovered = useCallback((id: string) => hoveredId === id, [hoveredId])
  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds])
  const isHighlighted = useCallback((id: string) => {
    return hoveredId === id || selectedIds.has(id)
  }, [hoveredId, selectedIds])

  // Get color for an item
  const getItemColor = useCallback((id: string): HighlightColor => {
    const item = itemMap.get(id)
    return item?.color ?? defaultColor
  }, [itemMap, defaultColor])

  // Get highlight classes
  const getHighlightClasses = useCallback((id: string): string => {
    if (!isHighlighted(id)) return ''
    const color = getItemColor(id)
    const tokens = highlightColors[color]
    return `${tokens.highlight} ring-1 ${tokens.border}`
  }, [isHighlighted, getItemColor])

  // Get color tokens
  const getColorTokens = useCallback((id: string) => {
    if (!isHighlighted(id)) return null
    const color = getItemColor(id)
    return highlightColors[color]
  }, [isHighlighted, getItemColor])

  // Actions
  const setHovered = useCallback((id: string | null) => {
    setHoveredId(id)
  }, [])

  const toggleSelected = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!multiSelect) {
          next.clear()
        }
        next.add(id)
      }
      return next
    })
  }, [multiSelect])

  const setSelected = useCallback((id: string | null) => {
    if (id === null) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set([id]))
    }
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const reset = useCallback(() => {
    setHoveredId(null)
    setSelectedIds(new Set())
  }, [])

  // Event handlers factory
  const handlers = useCallback((id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
    onClick: () => toggleSelected(id),
  }), [setHovered, toggleSelected])

  return {
    hoveredId,
    selectedIds,
    activeId,
    activeItem,
    isHighlighted,
    isHovered,
    isSelected,
    getHighlightClasses,
    getColorTokens,
    setHovered,
    toggleSelected,
    setSelected,
    clearSelection,
    reset,
    handlers,
  }
}
