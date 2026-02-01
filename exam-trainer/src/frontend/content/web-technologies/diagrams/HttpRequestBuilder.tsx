// src/content/web-technologies/diagrams/HttpRequestBuilder.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Header {
  id: string
  name: string
  value: string
  enabled: boolean
  required?: boolean
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

const METHODS_WITH_BODY: HttpMethod[] = ['POST', 'PUT', 'PATCH']

const DEFAULT_HEADERS: Header[] = [
  { id: 'host', name: 'Host', value: 'api.example.com', enabled: true, required: true },
  { id: 'accept', name: 'Accept', value: 'application/json', enabled: true },
  { id: 'content-type', name: 'Content-Type', value: 'application/json', enabled: false },
  { id: 'authorization', name: 'Authorization', value: 'Bearer token', enabled: false },
]

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
  PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function HttpRequestBuilder({ className }: DiagramProps) {
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [path, setPath] = useState('/playlists')
  const [headers, setHeaders] = useState<Header[]>(DEFAULT_HEADERS)
  const [body, setBody] = useState('{\n  "name": "My Playlist",\n  "tracks": []\n}')
  const [copied, setCopied] = useState(false)

  const hasBody = METHODS_WITH_BODY.includes(method)

  const httpRequest = useMemo(() => {
    const enabledHeaders = headers.filter((h) => h.enabled)
    const lines: string[] = []

    // Request line
    lines.push(`${method} ${path} HTTP/1.1`)

    // Headers
    for (const header of enabledHeaders) {
      lines.push(`${header.name}: ${header.value}`)
    }

    // Empty line before body
    lines.push('')

    // Body (if applicable)
    if (hasBody && body.trim()) {
      lines.push(body)
    }

    return lines.join('\n')
  }, [method, path, headers, body, hasBody])

  const toggleHeader = (id: string) => {
    setHeaders((prev) =>
      prev.map((h) =>
        h.id === id && !h.required ? { ...h, enabled: !h.enabled } : h
      )
    )
  }

  const updateHeaderValue = (id: string, value: string) => {
    setHeaders((prev) =>
      prev.map((h) => (h.id === id ? { ...h, value } : h))
    )
  }

  const addCustomHeader = () => {
    setHeaders((prev) => [
      ...prev,
      { id: generateId(), name: 'X-Custom-Header', value: 'value', enabled: true },
    ])
  }

  const removeHeader = (id: string) => {
    setHeaders((prev) => prev.filter((h) => h.id !== id || h.required))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(httpRequest)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const resetToDefaults = () => {
    setMethod('GET')
    setPath('/playlists')
    setHeaders(DEFAULT_HEADERS)
    setBody('{\n  "name": "My Playlist",\n  "tracks": []\n}')
  }

  return (
    <DiagramShell
      title="HTTP Request Builder"
      className={className}
      actions={
        <Button variant="ghost" size="sm" onClick={resetToDefaults}>
          Reset
        </Button>
      }
      footer={
        <p>
          <strong className="text-slate-400">Tip:</strong> The Host header is required in HTTP/1.1.
          Content-Type is needed when sending a request body.
        </p>
      }
    >
      {/* Method and Path */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Method selector */}
          <div className="relative">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={`
                appearance-none px-4 py-2 pr-10 rounded-lg border font-semibold
                cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500
                bg-slate-900 ${METHOD_COLORS[method]}
              `}
            >
              {HTTP_METHODS.map((m) => (
                <option key={m} value={m} className="bg-slate-800 text-slate-100">
                  {m}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Path input */}
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/api/resource"
            className="
              flex-1 px-4 py-2 rounded-lg border border-slate-600
              bg-slate-900 text-slate-100 font-mono
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder:text-slate-500
            "
          />
        </div>

        {/* Headers section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-300">Headers</h4>
            <Button variant="ghost" size="sm" onClick={addCustomHeader}>
              + Add Header
            </Button>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {headers.map((header) => (
                <motion.div
                  key={header.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border
                    ${header.enabled
                      ? 'bg-slate-800/50 border-slate-600'
                      : 'bg-slate-900/50 border-slate-700'
                    }
                  `}
                >
                  {/* Enable/disable checkbox */}
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={() => toggleHeader(header.id)}
                    disabled={header.required}
                    className="
                      w-4 h-4 rounded border-slate-500
                      bg-slate-700 text-blue-500
                      focus:ring-blue-500 focus:ring-offset-0
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  />

                  {/* Header name */}
                  <input
                    type="text"
                    value={header.name}
                    onChange={(e) =>
                      setHeaders((prev) =>
                        prev.map((h) =>
                          h.id === header.id ? { ...h, name: e.target.value } : h
                        )
                      )
                    }
                    disabled={header.required}
                    className={`
                      w-32 sm:w-40 px-2 py-1 rounded border border-slate-600
                      bg-slate-900 font-mono text-sm
                      focus:outline-none focus:ring-1 focus:ring-blue-500
                      disabled:opacity-70 disabled:cursor-not-allowed
                      ${header.enabled ? 'text-slate-100' : 'text-slate-500'}
                    `}
                  />

                  <span className="text-slate-500">:</span>

                  {/* Header value */}
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => updateHeaderValue(header.id, e.target.value)}
                    className={`
                      flex-1 px-2 py-1 rounded border border-slate-600
                      bg-slate-900 font-mono text-sm
                      focus:outline-none focus:ring-1 focus:ring-blue-500
                      ${header.enabled ? 'text-slate-100' : 'text-slate-500'}
                    `}
                  />

                  {/* Remove button (only for non-required headers) */}
                  {!header.required && (
                    <button
                      onClick={() => removeHeader(header.id)}
                      className="
                        p-1 rounded text-slate-500 hover:text-red-400
                        hover:bg-red-500/10 transition-colors
                      "
                      title="Remove header"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Body section (animated) */}
        <AnimatePresence>
          {hasBody && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Request Body</h4>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={6}
                  className="
                    w-full px-4 py-3 rounded-lg border border-slate-600
                    bg-slate-900 text-slate-100 font-mono text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder:text-slate-500 resize-none
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-300">Live Preview</h4>
            <Button
              variant="secondary"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </Button>
          </div>

          <motion.div
            layout
            className="
              rounded-lg border-2 border-slate-600 bg-slate-900
              overflow-hidden
            "
          >
            <pre className="p-4 text-sm font-mono text-slate-100 whitespace-pre-wrap break-all">
              {httpRequest.split('\n').map((line, index) => {
                // Request line highlighting
                if (index === 0) {
                  const parts = line.match(/^(\w+)\s+(.+)\s+(HTTP\/\d\.\d)$/)
                  if (parts) {
                    return (
                      <div key={index}>
                        <span className={`font-bold ${
                          method === 'GET' ? 'text-green-400' :
                          method === 'POST' ? 'text-blue-400' :
                          method === 'PUT' ? 'text-yellow-400' :
                          method === 'DELETE' ? 'text-red-400' :
                          'text-purple-400'
                        }`}>
                          {parts[1]}
                        </span>
                        <span className="text-cyan-400"> {parts[2]}</span>
                        <span className="text-slate-500"> {parts[3]}</span>
                      </div>
                    )
                  }
                }

                // Header lines
                const headerMatch = line.match(/^([^:]+):\s*(.*)$/)
                if (headerMatch) {
                  return (
                    <div key={index}>
                      <span className="text-orange-400">{headerMatch[1]}</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-slate-300">{headerMatch[2]}</span>
                    </div>
                  )
                }

                // Empty line or body
                return (
                  <div key={index} className="text-slate-300">
                    {line || '\u00A0'}
                  </div>
                )
              })}
            </pre>
          </motion.div>
        </div>

    </DiagramShell>
  )
}
