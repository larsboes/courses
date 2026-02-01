// src/content/web-technologies/diagrams/HttpRequestComposer.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Header {
  id: string
  name: string
  value: string
  enabled: boolean
  required?: boolean
}

interface ValidationError {
  type: 'error' | 'warning'
  message: string
}

interface Challenge {
  id: string
  title: string
  scenario: string
  expectedMethod: HttpMethod
  expectedPath: string
  requiredHeaders: string[]
  needsBody: boolean
  hints: string[]
}

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const HTTP_VERSIONS = ['HTTP/1.0', 'HTTP/1.1', 'HTTP/2']
const METHODS_WITH_BODY: HttpMethod[] = ['POST', 'PUT', 'PATCH']

const DEFAULT_HEADERS: Header[] = [
  { id: 'host', name: 'Host', value: 'api.example.com', enabled: true, required: true },
  { id: 'accept', name: 'Accept', value: 'application/json', enabled: true },
  { id: 'content-type', name: 'Content-Type', value: 'application/json', enabled: false },
  { id: 'authorization', name: 'Authorization', value: 'Bearer token123', enabled: false },
]

const COMMON_HEADERS = [
  'Accept-Language',
  'Cache-Control',
  'User-Agent',
  'Cookie',
  'X-Request-ID',
]

const PATH_SUGGESTIONS = [
  '/playlists',
  '/playlists/{id}',
  '/playlists/{id}/tracks',
  '/users',
  '/users/{id}',
  '/auth/login',
  '/auth/logout',
]

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
  PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

const CHALLENGES: Challenge[] = [
  {
    id: 'get-playlists',
    title: 'Alle Playlists abrufen',
    scenario: 'Du möchtest alle Playlists eines Benutzers abrufen. Die API erwartet JSON als Antwortformat.',
    expectedMethod: 'GET',
    expectedPath: '/playlists',
    requiredHeaders: ['Host', 'Accept'],
    needsBody: false,
    hints: [
      'GET ist die richtige Methode zum Abrufen von Daten',
      'Accept: application/json zeigt an, dass du JSON erwartest',
    ],
  },
  {
    id: 'create-playlist',
    title: 'Neue Playlist erstellen',
    scenario: 'Erstelle eine neue Playlist mit dem Namen "Favorites". Du sendest JSON-Daten.',
    expectedMethod: 'POST',
    expectedPath: '/playlists',
    requiredHeaders: ['Host', 'Content-Type'],
    needsBody: true,
    hints: [
      'POST wird für das Erstellen neuer Ressourcen verwendet',
      'Content-Type: application/json ist nötig beim Senden von JSON',
    ],
  },
  {
    id: 'update-playlist',
    title: 'Playlist aktualisieren',
    scenario: 'Aktualisiere die Playlist mit ID 42. Ändere den Namen zu "My Favorites".',
    expectedMethod: 'PUT',
    expectedPath: '/playlists/42',
    requiredHeaders: ['Host', 'Content-Type'],
    needsBody: true,
    hints: [
      'PUT wird für vollständige Updates verwendet',
      'Die ID gehört in den Pfad, nicht in den Body',
    ],
  },
  {
    id: 'delete-playlist',
    title: 'Playlist löschen',
    scenario: 'Lösche die Playlist mit ID 42.',
    expectedMethod: 'DELETE',
    expectedPath: '/playlists/42',
    requiredHeaders: ['Host'],
    needsBody: false,
    hints: [
      'DELETE ist die Methode zum Löschen',
      'DELETE hat normalerweise keinen Body',
    ],
  },
]

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────

export function HttpRequestComposer({ className }: DiagramProps) {
  // Form state
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [path, setPath] = useState('/playlists')
  const [httpVersion, setHttpVersion] = useState('HTTP/1.1')
  const [headers, setHeaders] = useState<Header[]>(DEFAULT_HEADERS)
  const [body, setBody] = useState('{\n  "name": "My Playlist",\n  "tracks": []\n}')

  // UI state
  const [copied, setCopied] = useState(false)
  const [showPathSuggestions, setShowPathSuggestions] = useState(false)
  const [challengeMode, setChallengeMode] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [showHints, setShowHints] = useState(0)
  const [challengeResult, setChallengeResult] = useState<'success' | 'fail' | null>(null)

  const hasBody = METHODS_WITH_BODY.includes(method)
  const challenge = CHALLENGES[currentChallenge]

  // Validation
  const validationErrors = useMemo((): ValidationError[] => {
    const errors: ValidationError[] = []
    const enabledHeaders = headers.filter(h => h.enabled)

    // Host header required in HTTP/1.1
    if (httpVersion === 'HTTP/1.1' && !enabledHeaders.some(h => h.name.toLowerCase() === 'host')) {
      errors.push({ type: 'error', message: 'Host-Header ist in HTTP/1.1 erforderlich' })
    }

    // Body not allowed for GET/DELETE
    if (!METHODS_WITH_BODY.includes(method) && body.trim() && hasBody === false) {
      // This won't trigger since hasBody is derived, but kept for clarity
    }

    // Content-Type needed when sending body
    if (hasBody && body.trim() && !enabledHeaders.some(h => h.name.toLowerCase() === 'content-type')) {
      errors.push({ type: 'warning', message: 'Content-Type sollte gesetzt sein wenn ein Body gesendet wird' })
    }

    // Content-Type mismatch
    const contentType = enabledHeaders.find(h => h.name.toLowerCase() === 'content-type')?.value
    if (contentType && hasBody && body.trim()) {
      if (contentType.includes('application/json')) {
        try {
          JSON.parse(body)
        } catch {
          errors.push({ type: 'error', message: 'Body ist kein gültiges JSON' })
        }
      }
    }

    // Path validation
    if (!path.startsWith('/')) {
      errors.push({ type: 'error', message: 'Pfad muss mit / beginnen' })
    }

    // Empty path
    if (!path.trim()) {
      errors.push({ type: 'error', message: 'Pfad darf nicht leer sein' })
    }

    return errors
  }, [method, path, httpVersion, headers, body, hasBody])

  // Build HTTP request string
  const httpRequest = useMemo(() => {
    const enabledHeaders = headers.filter(h => h.enabled)
    const lines: string[] = []

    // Request line
    lines.push(`${method} ${path} ${httpVersion}`)

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
  }, [method, path, httpVersion, headers, body, hasBody])

  // Generate curl command
  const curlCommand = useMemo(() => {
    const enabledHeaders = headers.filter(h => h.enabled)
    const parts = ['curl']

    // Method (GET is default, so only add for others)
    if (method !== 'GET') {
      parts.push(`-X ${method}`)
    }

    // URL
    const host = enabledHeaders.find(h => h.name.toLowerCase() === 'host')?.value || 'localhost'
    parts.push(`"https://${host}${path}"`)

    // Headers (except Host which is in URL)
    for (const header of enabledHeaders) {
      if (header.name.toLowerCase() !== 'host') {
        parts.push(`-H "${header.name}: ${header.value}"`)
      }
    }

    // Body
    if (hasBody && body.trim()) {
      parts.push(`-d '${body.replace(/'/g, "\\'")}'`)
    }

    return parts.join(' \\\n  ')
  }, [method, path, headers, body, hasBody])

  // Header management
  const toggleHeader = (id: string) => {
    setHeaders(prev =>
      prev.map(h =>
        h.id === id && !h.required ? { ...h, enabled: !h.enabled } : h
      )
    )
  }

  const updateHeader = (id: string, field: 'name' | 'value', value: string) => {
    setHeaders(prev =>
      prev.map(h => (h.id === id ? { ...h, [field]: value } : h))
    )
  }

  const addHeader = (name: string = 'X-Custom-Header') => {
    setHeaders(prev => [
      ...prev,
      { id: generateId(), name, value: 'value', enabled: true },
    ])
  }

  const removeHeader = (id: string) => {
    setHeaders(prev => prev.filter(h => h.id !== id || h.required))
  }

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Reset form
  const resetForm = () => {
    setMethod('GET')
    setPath('/playlists')
    setHttpVersion('HTTP/1.1')
    setHeaders(DEFAULT_HEADERS)
    setBody('{\n  "name": "My Playlist",\n  "tracks": []\n}')
    setChallengeResult(null)
    setShowHints(0)
  }

  // Challenge validation
  const validateChallenge = () => {
    const isMethodCorrect = method === challenge.expectedMethod
    const isPathCorrect = path === challenge.expectedPath ||
      path.replace(/\d+/g, '{id}') === challenge.expectedPath.replace(/\d+/g, '{id}')

    const enabledHeaders = headers.filter(h => h.enabled)
    const hasRequiredHeaders = challenge.requiredHeaders.every(req =>
      enabledHeaders.some(h => h.name.toLowerCase() === req.toLowerCase())
    )

    const bodyCorrect = challenge.needsBody ? (hasBody && body.trim()) : true

    if (isMethodCorrect && isPathCorrect && hasRequiredHeaders && bodyCorrect) {
      setChallengeResult('success')
    } else {
      setChallengeResult('fail')
    }
  }

  return (
    <Card className={`p-6 ${className ?? ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              HTTP Request Composer
            </h3>
            <p className="text-sm text-slate-400">
              Baue HTTP-Requests und lerne die Struktur
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={challengeMode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setChallengeMode(!challengeMode)
                resetForm()
              }}
            >
              {challengeMode ? 'Freier Modus' : 'Challenge Mode'}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </div>

        {/* Challenge Mode Banner */}
        <AnimatePresence>
          {challengeMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <span className="font-semibold text-blue-300">{challenge.title}</span>
                  </div>
                  <select
                    value={currentChallenge}
                    onChange={(e) => {
                      setCurrentChallenge(Number(e.target.value))
                      resetForm()
                    }}
                    className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-sm"
                  >
                    {CHALLENGES.map((c, i) => (
                      <option key={c.id} value={i}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <p className="text-slate-300 mb-3">{challenge.scenario}</p>

                {/* Hints */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHints(prev => Math.min(prev + 1, challenge.hints.length))}
                    disabled={showHints >= challenge.hints.length}
                  >
                    💡 Hinweis ({showHints}/{challenge.hints.length})
                  </Button>
                </div>
                {showHints > 0 && (
                  <div className="mt-2 space-y-1">
                    {challenge.hints.slice(0, showHints).map((hint, i) => (
                      <div key={i} className="text-sm text-amber-300 bg-amber-900/20 px-2 py-1 rounded">
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form Controls */}
          <div className="space-y-4">
            {/* Request Line */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Request Line</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Method */}
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
                    {HTTP_METHODS.map(m => (
                      <option key={m} value={m} className="bg-slate-800 text-slate-100">
                        {m}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Path */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    onFocus={() => setShowPathSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowPathSuggestions(false), 200)}
                    placeholder="/api/resource"
                    className="
                      w-full px-4 py-2 rounded-lg border border-slate-600
                      bg-slate-900 text-slate-100 font-mono
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    "
                  />
                  {/* Path suggestions */}
                  <AnimatePresence>
                    {showPathSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 top-full left-0 right-0 mt-1 py-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg"
                      >
                        {PATH_SUGGESTIONS.map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setPath(suggestion)
                              setShowPathSuggestions(false)
                            }}
                            className="w-full px-3 py-1.5 text-left text-sm font-mono hover:bg-slate-700 text-slate-300"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* HTTP Version */}
                <select
                  value={httpVersion}
                  onChange={(e) => setHttpVersion(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-slate-400 text-sm"
                >
                  {HTTP_VERSIONS.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Headers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Headers</label>
                <div className="relative group">
                  <Button variant="ghost" size="sm">
                    + Header
                  </Button>
                  <div className="absolute z-10 right-0 top-full mt-1 hidden group-hover:block">
                    <div className="py-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg min-w-[180px]">
                      {COMMON_HEADERS.map(name => (
                        <button
                          key={name}
                          onClick={() => addHeader(name)}
                          className="w-full px-3 py-1.5 text-left text-sm hover:bg-slate-700 text-slate-300"
                        >
                          {name}
                        </button>
                      ))}
                      <hr className="my-1 border-slate-700" />
                      <button
                        onClick={() => addHeader()}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-slate-700 text-slate-400"
                      >
                        Custom Header...
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-[250px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {headers.map(header => (
                    <motion.div
                      key={header.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`
                        flex items-center gap-2 p-2 rounded-lg border
                        ${header.enabled
                          ? 'bg-slate-800/50 border-slate-600'
                          : 'bg-slate-900/50 border-slate-700'}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={header.enabled}
                        onChange={() => toggleHeader(header.id)}
                        disabled={header.required}
                        className="w-4 h-4 rounded"
                      />
                      <input
                        type="text"
                        value={header.name}
                        onChange={(e) => updateHeader(header.id, 'name', e.target.value)}
                        disabled={header.required}
                        className={`
                          w-28 sm:w-36 px-2 py-1 rounded bg-slate-900 border border-slate-700
                          font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                          ${header.enabled ? 'text-slate-100' : 'text-slate-500'}
                        `}
                      />
                      <span className="text-slate-500">:</span>
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                        className={`
                          flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700
                          font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                          ${header.enabled ? 'text-slate-100' : 'text-slate-500'}
                        `}
                      />
                      {!header.required && (
                        <button
                          onClick={() => removeHeader(header.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {hasBody && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Request Body</label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={6}
                      className="
                        w-full px-4 py-3 rounded-lg border border-slate-600
                        bg-slate-900 text-slate-100 font-mono text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                      "
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Validation Errors */}
            <AnimatePresence>
              {validationErrors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  {validationErrors.map((error, i) => (
                    <div
                      key={i}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                        ${error.type === 'error'
                          ? 'bg-red-900/20 text-red-300 border border-red-700/50'
                          : 'bg-amber-900/20 text-amber-300 border border-amber-700/50'}
                      `}
                    >
                      <span>{error.type === 'error' ? '❌' : '⚠️'}</span>
                      {error.message}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            {/* HTTP Request Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">HTTP Request</label>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(httpRequest)}
                >
                  {copied ? '✓ Kopiert!' : 'Kopieren'}
                </Button>
              </div>
              <div className="rounded-lg border-2 border-slate-600 bg-slate-900 overflow-hidden">
                <pre className="p-4 text-sm font-mono text-slate-100 whitespace-pre-wrap">
                  {httpRequest.split('\n').map((line, index) => {
                    // Request line highlighting
                    if (index === 0) {
                      const parts = line.match(/^(\w+)\s+(.+)\s+(HTTP\/[\d.]+)$/)
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
                    return <div key={index} className="text-slate-300">{line || '\u00A0'}</div>
                  })}
                </pre>
              </div>
            </div>

            {/* Curl Export */}
            <details className="group">
              <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300">
                Als curl-Befehl exportieren
              </summary>
              <div className="mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700">
                <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap break-all">
                  {curlCommand}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(curlCommand)}
                  className="mt-2"
                >
                  curl kopieren
                </Button>
              </div>
            </details>

            {/* Challenge Submit */}
            {challengeMode && (
              <div className="pt-4 border-t border-slate-700">
                <Button variant="primary" onClick={validateChallenge} className="w-full">
                  Request prüfen
                </Button>
                <AnimatePresence>
                  {challengeResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`
                        mt-3 p-4 rounded-lg text-center
                        ${challengeResult === 'success'
                          ? 'bg-green-900/30 border border-green-700/50'
                          : 'bg-red-900/30 border border-red-700/50'}
                      `}
                    >
                      {challengeResult === 'success' ? (
                        <div className="text-green-400">
                          <span className="text-2xl">🎉</span>
                          <p className="font-semibold mt-2">Korrekt!</p>
                          <p className="text-sm text-slate-300 mt-1">Der Request ist richtig aufgebaut.</p>
                        </div>
                      ) : (
                        <div className="text-red-400">
                          <span className="text-2xl">❌</span>
                          <p className="font-semibold mt-2">Nicht ganz richtig</p>
                          <p className="text-sm text-slate-300 mt-1">Überprüfe Methode, Pfad und Header.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="text-xs text-slate-500 pt-4 border-t border-slate-700 space-y-1">
          <p>
            <strong className="text-slate-400">HTTP/1.1:</strong> Host-Header ist Pflicht.
            Content-Type bei Body-Requests setzen.
          </p>
          <p>
            <strong className="text-slate-400">Body:</strong> Nur bei POST, PUT, PATCH erlaubt.
            GET und DELETE haben keinen Body.
          </p>
        </div>
      </div>
    </Card>
  )
}
