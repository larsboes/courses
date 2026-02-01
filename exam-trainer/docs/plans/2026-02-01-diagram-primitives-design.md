# Diagram Primitives Architecture

## Problem

32 diagram components with repeated patterns:
- Header/title boilerplate (~25 lines each)
- Step navigation logic
- Challenge mode wrappers
- Highlight state management
- Color token duplication

## Solution: Composable Primitives

Extract common patterns into reusable building blocks. Migrate incrementally.

## Primitives (in implementation order)

### 1. DiagramShell (this doc)

Handles card wrapper, header, sample selector, action buttons, footer.

```tsx
interface DiagramShellProps {
  title: string
  children: React.ReactNode
  subtitle?: string
  className?: string
  samples?: Array<{ id: string; label: string }>
  currentSample?: string
  onSampleChange?: (id: string) => void
  actions?: React.ReactNode
  footer?: React.ReactNode
}
```

**Location:** `src/frontend/core/components/diagrams/DiagramShell.tsx`

**Impact:** ~25 lines saved per diagram, consistent styling across all diagrams.

### 2. StepNavigator (future)

Prev/next buttons, step dots, auto-play, keyboard navigation.

### 3. ChallengeWrapper (future)

Challenge mode toggle, banner, check button, success/fail feedback.

### 4. ExplanationPanel (future)

Animated panel for contextual explanations with color-coded labels.

### 5. useHighlightState hook (future)

Manages hover/active/selected states with consistent API.

### 6. highlightColors tokens (future)

Shared color system: blue, green, amber, red, purple, cyan.

## Migration Strategy

1. Implement DiagramShell
2. Migrate one diagram as proof (JsonPathExplorer)
3. Verify build passes
4. Migrate remaining diagrams incrementally
5. Repeat for next primitive

## Success Criteria

- Diagrams shrink from ~500 lines to ~200 lines average
- New diagrams can be created in <100 lines
- Consistent look/feel across all diagrams
- No regression in functionality
