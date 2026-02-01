// src/content/web-technologies/diagrams/CodeSnippetExplainer.tsx
import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell, StepNavigator } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import { useStepNavigator } from '@/core/hooks'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface CodeAnnotation {
  lineStart: number
  lineEnd: number
  label: string
  explanation: string
  color: 'blue' | 'green' | 'purple' | 'amber' | 'cyan' | 'red'
}

interface CodeSnippet {
  id: string
  title: string
  language: string
  code: string
  annotations: CodeAnnotation[]
  concepts: string[]
}

// ─────────────────────────────────────────────────
// Sample Code Snippets
// ─────────────────────────────────────────────────

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'fetch-api',
    title: 'Fetch API Grundlagen',
    language: 'javascript',
    code: `// HTTP Request mit Fetch API
async function loadUserData(userId) {
  const url = \`/api/users/\${userId}\`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer token123'
    }
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }

  const data = await response.json();
  return data;
}`,
    annotations: [
      {
        lineStart: 2,
        lineEnd: 2,
        label: 'async',
        explanation: 'Das async Keyword macht diese Funktion asynchron. Sie gibt automatisch ein Promise zurück und erlaubt die Verwendung von await.',
        color: 'purple',
      },
      {
        lineStart: 3,
        lineEnd: 3,
        label: 'Template Literal',
        explanation: 'Template Literals (mit Backticks) erlauben String-Interpolation mit ${...}. Hier wird die userId dynamisch in die URL eingefügt.',
        color: 'green',
      },
      {
        lineStart: 5,
        lineEnd: 10,
        label: 'fetch()',
        explanation: 'fetch() ist die moderne Browser-API für HTTP Requests. Das zweite Argument ist ein Options-Objekt mit Method, Headers und weiteren Einstellungen.',
        color: 'blue',
      },
      {
        lineStart: 7,
        lineEnd: 9,
        label: 'Headers',
        explanation: 'HTTP Headers werden als Objekt übergeben. Accept definiert das erwartete Antwortformat, Authorization enthält den Auth-Token.',
        color: 'amber',
      },
      {
        lineStart: 12,
        lineEnd: 14,
        label: 'Error Handling',
        explanation: 'fetch() wirft nur bei Netzwerkfehlern einen Error. HTTP Fehler (4xx, 5xx) müssen manuell über response.ok geprüft werden.',
        color: 'red',
      },
      {
        lineStart: 16,
        lineEnd: 16,
        label: 'JSON Parsing',
        explanation: 'response.json() parsed den Response-Body als JSON. Dies ist asynchron und gibt ebenfalls ein Promise zurück.',
        color: 'cyan',
      },
    ],
    concepts: ['Async/Await', 'Fetch API', 'HTTP Headers', 'Error Handling', 'Promises'],
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    language: 'javascript',
    code: `// DOM Elemente erstellen und manipulieren
function createUserCard(user) {
  // Container erstellen
  const card = document.createElement('div');
  card.className = 'user-card';
  card.id = \`user-\${user.id}\`;

  // Event Listener hinzufügen
  card.addEventListener('click', (event) => {
    event.stopPropagation();
    showUserDetails(user.id);
  });

  // Inhalt setzen
  card.innerHTML = \`
    <img src="\${user.avatar}" alt="\${user.name}">
    <h3>\${user.name}</h3>
    <p>\${user.email}</p>
  \`;

  // In DOM einfügen
  document.querySelector('.users-container')
    .appendChild(card);

  return card;
}`,
    annotations: [
      {
        lineStart: 4,
        lineEnd: 6,
        label: 'createElement',
        explanation: 'document.createElement() erstellt ein neues DOM Element im Speicher. Es ist noch nicht im DOM-Baum sichtbar.',
        color: 'blue',
      },
      {
        lineStart: 9,
        lineEnd: 12,
        label: 'addEventListener',
        explanation: 'Event Listener reagieren auf Benutzerinteraktionen. stopPropagation() verhindert Event Bubbling zu Parent-Elementen.',
        color: 'green',
      },
      {
        lineStart: 15,
        lineEnd: 19,
        label: 'innerHTML',
        explanation: 'innerHTML setzt den HTML-Inhalt eines Elements. Vorsicht: Bei User-Input besteht XSS-Gefahr! Hier nur mit vertrauenswürdigen Daten verwenden.',
        color: 'red',
      },
      {
        lineStart: 22,
        lineEnd: 23,
        label: 'appendChild',
        explanation: 'appendChild() fügt das Element als letztes Kind in den DOM-Baum ein. Erst jetzt wird es auf der Seite sichtbar.',
        color: 'purple',
      },
    ],
    concepts: ['DOM API', 'Event Handling', 'XSS Prevention', 'Element Creation'],
  },
  {
    id: 'express-route',
    title: 'Express.js Route Handler',
    language: 'javascript',
    code: `// REST API Endpoint mit Express
const express = require('express');
const router = express.Router();

// Middleware für Auth-Check
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }
  req.user = verifyToken(token);
  next();
};

// GET /users/:id
router.get('/users/:id', authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
);`,
    annotations: [
      {
        lineStart: 6,
        lineEnd: 14,
        label: 'Middleware',
        explanation: 'Middleware-Funktionen haben Zugriff auf req, res und next(). Sie können die Anfrage modifizieren, abbrechen oder weitergeben.',
        color: 'purple',
      },
      {
        lineStart: 17,
        lineEnd: 17,
        label: 'Route Parameter',
        explanation: ':id ist ein URL-Parameter. Express extrahiert den Wert und stellt ihn unter req.params.id zur Verfügung.',
        color: 'blue',
      },
      {
        lineStart: 9,
        lineEnd: 11,
        label: 'HTTP 401',
        explanation: '401 Unauthorized bedeutet: Der Client hat keine gültigen Authentifizierungsdaten gesendet.',
        color: 'amber',
      },
      {
        lineStart: 24,
        lineEnd: 26,
        label: 'HTTP 404',
        explanation: '404 Not Found bedeutet: Die angeforderte Ressource existiert nicht. Hier: User mit dieser ID nicht gefunden.',
        color: 'red',
      },
      {
        lineStart: 29,
        lineEnd: 29,
        label: 'res.json()',
        explanation: 'res.json() setzt automatisch Content-Type: application/json und serialisiert das Objekt. Status ist 200 OK.',
        color: 'green',
      },
    ],
    concepts: ['Express.js', 'Middleware', 'REST API', 'HTTP Status Codes', 'Error Handling'],
  },
  {
    id: 'css-grid',
    title: 'CSS Grid Layout',
    language: 'css',
    code: `/* Responsive Grid Layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 1.5rem;
  padding: 2rem;
}

.dashboard-card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Featured Card spans full width */
.dashboard-card.featured {
  grid-column: 1 / -1;
}

/* Sidebar layout on large screens */
@media (min-width: 1024px) {
  .dashboard {
    grid-template-columns: 250px 1fr 1fr;
  }

  .sidebar {
    grid-row: 1 / span 3;
  }
}`,
    annotations: [
      {
        lineStart: 3,
        lineEnd: 3,
        label: 'display: grid',
        explanation: 'Aktiviert CSS Grid auf dem Container. Alle direkten Kinder werden zu Grid Items.',
        color: 'blue',
      },
      {
        lineStart: 4,
        lineEnd: 4,
        label: 'auto-fit + minmax',
        explanation: 'Diese Kombination erstellt responsive Spalten: So viele wie möglich, mindestens 300px breit, maximal gleich verteilt (1fr).',
        color: 'green',
      },
      {
        lineStart: 6,
        lineEnd: 6,
        label: 'gap',
        explanation: 'gap definiert den Abstand zwischen Grid Items. Ersetzt die alte Lösung mit margins, die zu ungleichmäßigen Abständen führte.',
        color: 'purple',
      },
      {
        lineStart: 19,
        lineEnd: 19,
        label: 'grid-column: 1 / -1',
        explanation: '-1 bedeutet "letzte Linie". Das Element spannt von der ersten bis zur letzten Spalte - volle Breite unabhängig von der Spaltenanzahl.',
        color: 'amber',
      },
      {
        lineStart: 23,
        lineEnd: 28,
        label: 'Media Query',
        explanation: '@media ermöglicht responsive Anpassungen. Ab 1024px Viewport-Breite wird ein explizites 3-Spalten-Layout definiert.',
        color: 'cyan',
      },
    ],
    concepts: ['CSS Grid', 'Responsive Design', 'Media Queries', 'CSS Variables'],
  },
  {
    id: 'k8s-deployment',
    title: 'Kubernetes Deployment',
    language: 'yaml',
    code: `# Kubernetes Deployment Manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v1.2.0
        ports:
        - containerPort: 8080
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
          requests:
            memory: "128Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10`,
    annotations: [
      {
        lineStart: 2,
        lineEnd: 3,
        label: 'apiVersion & kind',
        explanation: 'Definiert den Ressourcentyp. apps/v1 ist die stabile API für Deployments. Kind gibt an, dass wir ein Deployment erstellen.',
        color: 'blue',
      },
      {
        lineStart: 9,
        lineEnd: 9,
        label: 'replicas',
        explanation: 'Anzahl der Pod-Instanzen. Kubernetes sorgt automatisch dafür, dass immer 3 Pods laufen (Self-Healing).',
        color: 'green',
      },
      {
        lineStart: 10,
        lineEnd: 12,
        label: 'selector',
        explanation: 'Der Selector verbindet das Deployment mit den Pods. Labels müssen mit template.metadata.labels übereinstimmen.',
        color: 'purple',
      },
      {
        lineStart: 23,
        lineEnd: 29,
        label: 'resources',
        explanation: 'Resource Limits/Requests steuern CPU und Memory. Limits sind das Maximum, Requests das Minimum für Scheduling.',
        color: 'amber',
      },
      {
        lineStart: 30,
        lineEnd: 34,
        label: 'livenessProbe',
        explanation: 'Kubernetes prüft regelmäßig /health. Bei Fehler wird der Container neu gestartet - essentiell für Self-Healing.',
        color: 'red',
      },
    ],
    concepts: ['Kubernetes', 'Deployments', 'Labels & Selectors', 'Resource Management', 'Health Checks'],
  },
]

const SAMPLES = CODE_SNIPPETS.map((s, i) => ({ id: String(i), label: s.title }))

// ─────────────────────────────────────────────────
// Color mappings
// ─────────────────────────────────────────────────

const ANNOTATION_COLORS = {
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500',
    text: 'text-blue-400',
    highlight: 'bg-blue-500/30',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500',
    text: 'text-green-400',
    highlight: 'bg-green-500/30',
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-400',
    highlight: 'bg-purple-500/30',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-400',
    highlight: 'bg-amber-500/30',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    highlight: 'bg-cyan-500/30',
  },
  red: {
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    text: 'text-red-400',
    highlight: 'bg-red-500/30',
  },
}

// ─────────────────────────────────────────────────
// Code Line Component
// ─────────────────────────────────────────────────

interface CodeLineProps {
  line: string
  lineNumber: number
  isHighlighted: boolean
  highlightColor?: string
  annotation?: CodeAnnotation
  onHover: () => void
  onLeave: () => void
}

function CodeLine({
  line,
  lineNumber,
  isHighlighted,
  highlightColor,
  annotation,
  onHover,
  onLeave,
}: CodeLineProps) {
  return (
    <motion.div
      className={`
        flex items-stretch group cursor-pointer transition-colors
        ${isHighlighted && highlightColor ? highlightColor : 'hover:bg-slate-800/50'}
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        backgroundColor: isHighlighted ? undefined : 'transparent',
      }}
    >
      {/* Line number */}
      <span className="w-12 px-3 py-0.5 text-right text-slate-600 text-sm select-none border-r border-slate-700 flex-shrink-0">
        {lineNumber}
      </span>

      {/* Code content */}
      <pre className="flex-1 px-4 py-0.5 overflow-x-auto">
        <code className="text-sm text-slate-300 whitespace-pre">{line || ' '}</code>
      </pre>

      {/* Annotation marker */}
      {annotation && (
        <span className={`
          px-2 py-0.5 text-xs flex items-center
          ${ANNOTATION_COLORS[annotation.color].text}
        `}>
          ●
        </span>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function CodeSnippetExplainer({ className }: DiagramProps) {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null)
  const [stepMode, setStepMode] = useState(false)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)

  const snippet = CODE_SNIPPETS[currentSnippet]
  const lines = useMemo(() => snippet.code.split('\n'), [snippet.code])

  // Step navigator for step mode
  const stepper = useStepNavigator({
    totalSteps: snippet.annotations.length,
    onStepChange: () => {
      setActiveAnnotation(null)
      setHoveredLine(null)
    },
  })

  // Get annotation for a line
  const getAnnotationForLine = useCallback((lineNumber: number): CodeAnnotation | undefined => {
    return snippet.annotations.find(
      a => lineNumber >= a.lineStart && lineNumber <= a.lineEnd
    )
  }, [snippet.annotations])

  // Check if line is highlighted
  const isLineHighlighted = useCallback((lineNumber: number): boolean => {
    if (stepMode) {
      const stepAnnotation = snippet.annotations[stepper.currentStep]
      return lineNumber >= stepAnnotation?.lineStart && lineNumber <= stepAnnotation?.lineEnd
    }
    if (activeAnnotation !== null) {
      const annotation = snippet.annotations[activeAnnotation]
      return lineNumber >= annotation.lineStart && lineNumber <= annotation.lineEnd
    }
    if (hoveredLine !== null) {
      const annotation = getAnnotationForLine(hoveredLine)
      if (annotation) {
        return lineNumber >= annotation.lineStart && lineNumber <= annotation.lineEnd
      }
    }
    return false
  }, [stepMode, stepper.currentStep, activeAnnotation, hoveredLine, snippet.annotations, getAnnotationForLine])

  // Get highlight color for line
  const getHighlightColor = useCallback((lineNumber: number): string | undefined => {
    if (stepMode) {
      const stepAnnotation = snippet.annotations[stepper.currentStep]
      if (lineNumber >= stepAnnotation?.lineStart && lineNumber <= stepAnnotation?.lineEnd) {
        return ANNOTATION_COLORS[stepAnnotation.color].highlight
      }
    }
    if (activeAnnotation !== null) {
      const annotation = snippet.annotations[activeAnnotation]
      if (lineNumber >= annotation.lineStart && lineNumber <= annotation.lineEnd) {
        return ANNOTATION_COLORS[annotation.color].highlight
      }
    }
    if (hoveredLine !== null) {
      const annotation = getAnnotationForLine(hoveredLine)
      if (annotation && lineNumber >= annotation.lineStart && lineNumber <= annotation.lineEnd) {
        return ANNOTATION_COLORS[annotation.color].highlight
      }
    }
    return undefined
  }, [stepMode, stepper.currentStep, activeAnnotation, hoveredLine, snippet.annotations, getAnnotationForLine])

  // Get current explanation
  const currentExplanation = useMemo(() => {
    if (stepMode) {
      return snippet.annotations[stepper.currentStep]
    }
    if (activeAnnotation !== null) {
      return snippet.annotations[activeAnnotation]
    }
    if (hoveredLine !== null) {
      return getAnnotationForLine(hoveredLine)
    }
    return null
  }, [stepMode, stepper.currentStep, activeAnnotation, hoveredLine, snippet.annotations, getAnnotationForLine])

  // Reset state
  const reset = () => {
    setActiveAnnotation(null)
    setHoveredLine(null)
    stepper.reset()
  }

  return (
    <DiagramShell
      title="Code Explainer"
      subtitle={snippet.title}
      className={className}
      samples={SAMPLES}
      currentSample={String(currentSnippet)}
      onSampleChange={(id) => {
        setCurrentSnippet(Number(id))
        reset()
      }}
      actions={
        <Button
          variant={stepMode ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => {
            setStepMode(!stepMode)
            reset()
          }}
        >
          {stepMode ? 'Frei erkunden' : 'Schritt-Modus'}
        </Button>
      }
      footer={
        stepMode ? (
          <p>Navigiere durch die Annotationen mit den Pfeiltasten oder klicke auf die Punkte.</p>
        ) : (
          <p>
            <strong className="text-slate-400">Interaktiv:</strong>{' '}
            Hover über Code-Zeilen oder klicke auf Annotationen um Erklärungen zu sehen.
          </p>
        )
      }
    >
      {/* Concepts */}
      <div className="flex flex-wrap gap-2">
        {snippet.concepts.map(concept => (
          <span
            key={concept}
            className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
          >
            {concept}
          </span>
        ))}
      </div>

      {/* Code View */}
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
        {/* Language badge */}
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            {snippet.language}
          </span>
          <span className="text-xs text-slate-500">
            {lines.length} Zeilen · {snippet.annotations.length} Annotationen
          </span>
        </div>

        {/* Code lines */}
        <div className="max-h-[400px] overflow-auto">
          {lines.map((line, i) => (
            <CodeLine
              key={i}
              line={line}
              lineNumber={i + 1}
              isHighlighted={isLineHighlighted(i + 1)}
              highlightColor={getHighlightColor(i + 1)}
              annotation={getAnnotationForLine(i + 1)?.lineStart === i + 1 ? getAnnotationForLine(i + 1) : undefined}
              onHover={() => !stepMode && setHoveredLine(i + 1)}
              onLeave={() => !stepMode && setHoveredLine(null)}
            />
          ))}
        </div>
      </div>

      {/* Explanation Panel */}
      <AnimatePresence mode="wait">
        {currentExplanation && (
          <motion.div
            key={currentExplanation.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              p-4 rounded-lg border-l-4
              ${ANNOTATION_COLORS[currentExplanation.color].bg}
              ${ANNOTATION_COLORS[currentExplanation.color].border}
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`
                px-2 py-0.5 rounded text-xs font-semibold
                ${ANNOTATION_COLORS[currentExplanation.color].text}
                bg-slate-800
              `}>
                {currentExplanation.label}
              </span>
              <span className="text-slate-500 text-xs">
                Zeile {currentExplanation.lineStart}
                {currentExplanation.lineEnd !== currentExplanation.lineStart &&
                  ` - ${currentExplanation.lineEnd}`
                }
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentExplanation.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step mode controls */}
      {stepMode && (
        <StepNavigator stepper={stepper} showAutoPlay={false} />
      )}

      {/* Annotation Overview (free exploration mode) */}
      {!stepMode && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            Annotationen (klicken zum Fokussieren)
          </label>
          <div className="flex flex-wrap gap-2">
            {snippet.annotations.map((annotation, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveAnnotation(activeAnnotation === i ? null : i)
                  setHoveredLine(null)
                }}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  border
                  ${activeAnnotation === i
                    ? `${ANNOTATION_COLORS[annotation.color].bg} ${ANNOTATION_COLORS[annotation.color].border} ${ANNOTATION_COLORS[annotation.color].text}`
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}
                `}
              >
                {annotation.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </DiagramShell>
  )
}
