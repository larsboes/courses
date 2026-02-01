// src/content/web-technologies/diagrams/JsonValidatorPlayground.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

interface ValidationResult {
  isValid: boolean
  error?: {
    message: string
    line?: number
    column?: number
  }
}

const SAMPLE_VALID_JSON = `{
  "name": "Max Mustermann",
  "age": 28,
  "email": "max@example.com",
  "hobbies": ["coding", "gaming", "reading"],
  "address": {
    "city": "Berlin",
    "zip": "10115"
  },
  "active": true
}`

const SAMPLE_INVALID_JSON = `{
  "name": "Max Mustermann",
  "age": 28,
  "email": "max@example.com"
  "hobbies": ["coding", "gaming"]
}`

const SAMPLE_NESTED_ERROR = `{
  "users": [
    {
      "id": 1,
      "name": "Alice"
    },
    {
      "id": 2
      "name": "Bob"
    }
  ]
}`

function parseJsonError(error: Error, jsonString: string): ValidationResult['error'] {
  const message = error.message

  // Try to extract position from various error message formats
  // Chrome/V8: "Unexpected token x in JSON at position 123"
  // Firefox: "JSON.parse: expected ',' or '}' after property value in object at line 5 column 3"

  const positionMatch = message.match(/at position (\d+)/)
  const lineColumnMatch = message.match(/at line (\d+) column (\d+)/)

  if (lineColumnMatch) {
    return {
      message: message.replace(/at line \d+ column \d+.*$/, '').trim(),
      line: parseInt(lineColumnMatch[1], 10),
      column: parseInt(lineColumnMatch[2], 10),
    }
  }

  if (positionMatch) {
    const position = parseInt(positionMatch[1], 10)
    const lines = jsonString.substring(0, position).split('\n')
    const line = lines.length
    const column = lines[lines.length - 1].length + 1

    return {
      message: message.replace(/at position \d+.*$/, '').trim(),
      line,
      column,
    }
  }

  return { message }
}

function validateJson(jsonString: string): ValidationResult {
  if (!jsonString.trim()) {
    return { isValid: false, error: { message: 'JSON input is empty' } }
  }

  try {
    JSON.parse(jsonString)
    return { isValid: true }
  } catch (error) {
    if (error instanceof Error) {
      return {
        isValid: false,
        error: parseJsonError(error, jsonString),
      }
    }
    return { isValid: false, error: { message: 'Unknown parsing error' } }
  }
}

interface LineProps {
  number: number
  content: string
  isErrorLine: boolean
  errorColumn?: number
}

function CodeLine({ number, content, isErrorLine, errorColumn }: LineProps) {
  return (
    <div
      className={`flex font-mono text-sm ${
        isErrorLine ? 'bg-red-900/30' : ''
      }`}
    >
      <span
        className={`w-10 flex-shrink-0 text-right pr-3 select-none ${
          isErrorLine ? 'text-red-400' : 'text-slate-500'
        }`}
      >
        {number}
      </span>
      <span className="text-slate-300 whitespace-pre">
        {isErrorLine && errorColumn ? (
          <>
            {content.substring(0, errorColumn - 1)}
            <span className="bg-red-500 text-white px-0.5 rounded">
              {content[errorColumn - 1] || ' '}
            </span>
            {content.substring(errorColumn)}
          </>
        ) : (
          content
        )}
      </span>
    </div>
  )
}

export function JsonValidatorPlayground({ className }: DiagramProps) {
  const [jsonInput, setJsonInput] = useState(SAMPLE_VALID_JSON)

  const validation = useMemo(() => validateJson(jsonInput), [jsonInput])

  const lines = jsonInput.split('\n')

  const statusBadge = (
    <AnimatePresence mode="wait">
      <motion.div
        key={validation.isValid ? 'valid' : 'invalid'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          validation.isValid
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}
      >
        {validation.isValid ? 'Valid JSON' : 'Invalid JSON'}
      </motion.div>
    </AnimatePresence>
  )

  return (
    <DiagramShell title="JSON Validator" className={className} actions={statusBadge}>
      <div className="space-y-4">
        {/* Sample buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setJsonInput(SAMPLE_VALID_JSON)}
          >
            Valid Example
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setJsonInput(SAMPLE_INVALID_JSON)}
          >
            Missing Comma
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setJsonInput(SAMPLE_NESTED_ERROR)}
          >
            Nested Error
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setJsonInput('')}
          >
            Clear
          </Button>
        </div>

        {/* Editor area */}
        <div
          className={`rounded-lg border-2 overflow-hidden transition-colors ${
            validation.isValid
              ? 'border-green-500/50 bg-slate-900'
              : 'border-red-500/50 bg-slate-900'
          }`}
        >
          <div className="flex">
            {/* Line numbers and highlighted code display */}
            <div className="w-full relative">
              {/* Textarea for input */}
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm p-3 pl-12 resize-none focus:outline-none"
                spellCheck={false}
                placeholder="Enter JSON here..."
              />
              {/* Rendered code with line numbers */}
              <div className="p-3 min-h-[200px] pointer-events-none">
                {lines.map((line, index) => (
                  <CodeLine
                    key={index}
                    number={index + 1}
                    content={line}
                    isErrorLine={validation.error?.line === index + 1}
                    errorColumn={
                      validation.error?.line === index + 1
                        ? validation.error.column
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {!validation.isValid && validation.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-red-900/20 border border-red-500/30 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-red-400 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-red-400 font-medium">Parse Error</div>
                  <div className="text-red-300/80 text-sm mt-1">
                    {validation.error.message}
                  </div>
                  {validation.error.line && (
                    <div className="text-red-400/60 text-xs mt-2 font-mono">
                      Line {validation.error.line}
                      {validation.error.column && `, Column ${validation.error.column}`}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {validation.isValid && jsonInput.trim() && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-green-900/20 border border-green-500/30 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-green-400 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-green-400 font-medium">Valid JSON</div>
                  <div className="text-green-300/80 text-sm mt-1">
                    The JSON syntax is correct and can be parsed successfully.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DiagramShell>
  )
}
