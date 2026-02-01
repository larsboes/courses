// src/content/web-technologies/diagrams/FormatComparison.tsx
import { useState, useMemo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

type FormatType = 'json' | 'xml' | 'yaml'

interface PresetData {
  name: string
  data: Record<string, unknown>
}

// Sample presets
const PRESETS: PresetData[] = [
  {
    name: 'Playlist',
    data: {
      name: 'Meine Playlist',
      user: 'Max',
      duration: 45.5,
      tracks: [
        { title: 'Song 1', duration: 3.5 },
        { title: 'Song 2', duration: 4.2 },
      ],
    },
  },
  {
    name: 'User Profile',
    data: {
      id: 42,
      username: 'developer',
      email: 'dev@example.com',
      active: true,
      roles: ['admin', 'editor'],
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
  },
  {
    name: 'API Response',
    data: {
      status: 'success',
      code: 200,
      data: {
        items: [
          { id: 1, name: 'Item A' },
          { id: 2, name: 'Item B' },
        ],
        total: 2,
      },
      timestamp: '2024-01-15T10:30:00Z',
    },
  },
  {
    name: 'Simple Config',
    data: {
      appName: 'MyApp',
      version: '1.0.0',
      debug: false,
      port: 3000,
    },
  },
]

// Convert JS object to XML string
function toXml(data: unknown, rootName: string = 'root', indent: number = 0): string {
  const spaces = '  '.repeat(indent)

  if (data === null || data === undefined) {
    return `${spaces}<${rootName}/>`
  }

  if (typeof data === 'boolean' || typeof data === 'number' || typeof data === 'string') {
    const escaped = String(data)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return `${spaces}<${rootName}>${escaped}</${rootName}>`
  }

  if (Array.isArray(data)) {
    const singularName = rootName.endsWith('s') ? rootName.slice(0, -1) : 'item'
    const items = data.map((item) => toXml(item, singularName, indent + 1)).join('\n')
    return `${spaces}<${rootName}>\n${items}\n${spaces}</${rootName}>`
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>)
    const children = entries.map(([key, value]) => toXml(value, key, indent + 1)).join('\n')
    return `${spaces}<${rootName}>\n${children}\n${spaces}</${rootName}>`
  }

  return `${spaces}<${rootName}>${String(data)}</${rootName}>`
}

// Convert JS object to YAML string
function toYaml(data: unknown, indent: number = 0): string {
  const spaces = '  '.repeat(indent)

  if (data === null || data === undefined) {
    return 'null'
  }

  if (typeof data === 'boolean') {
    return data ? 'true' : 'false'
  }

  if (typeof data === 'number') {
    return String(data)
  }

  if (typeof data === 'string') {
    // Check if string needs quoting
    if (
      data.includes(':') ||
      data.includes('#') ||
      data.includes('\n') ||
      data.startsWith(' ') ||
      data.endsWith(' ') ||
      /^[0-9]/.test(data) ||
      ['true', 'false', 'null', 'yes', 'no'].includes(data.toLowerCase())
    ) {
      return `"${data.replace(/"/g, '\\"')}"`
    }
    return data
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return '[]'
    return data
      .map((item) => {
        const itemYaml = toYaml(item, indent + 1)
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          // For objects, put first key on same line as dash
          const lines = itemYaml.split('\n')
          const firstLine = lines[0].trim()
          const rest = lines.slice(1).join('\n')
          return `${spaces}- ${firstLine}${rest ? '\n' + rest : ''}`
        }
        return `${spaces}- ${itemYaml}`
      })
      .join('\n')
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    return entries
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${spaces}${key}:\n${toYaml(value, indent + 1)}`
        }
        return `${spaces}${key}: ${toYaml(value, indent)}`
      })
      .join('\n')
  }

  return String(data)
}

// Syntax highlighting for different formats
function highlightJson(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    // Highlight strings, numbers, booleans, null
    const highlighted = line
      .replace(/"([^"]+)":/g, '<span class="text-purple-400">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span class="text-amber-400">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-blue-400">$1</span>')
      .replace(/: (null)/g, ': <span class="text-slate-500">$1</span>')
    return (
      <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} className="whitespace-pre" />
    )
  })
}

function highlightXml(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const highlighted = line
      .replace(/<(\/?[\w-]+)>/g, '<span class="text-blue-400">&lt;$1&gt;</span>')
      .replace(/>([^<]+)</g, '><span class="text-green-400">$1</span><')
    return (
      <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} className="whitespace-pre" />
    )
  })
}

function highlightYaml(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    let highlighted = line
      // Keys (before colon)
      .replace(/^(\s*)([\w-]+):/g, '$1<span class="text-purple-400">$2</span>:')
      // List items
      .replace(/^(\s*)-\s/, '$1<span class="text-slate-500">-</span> ')
      // String values (after colon)
      .replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
      .replace(/: ([^"\s][^#\n]*)/g, (_match, value) => {
        const trimmed = value.trim()
        if (/^\d+\.?\d*$/.test(trimmed)) {
          return `: <span class="text-amber-400">${value}</span>`
        }
        if (trimmed === 'true' || trimmed === 'false') {
          return `: <span class="text-blue-400">${value}</span>`
        }
        if (trimmed === 'null') {
          return `: <span class="text-slate-500">${value}</span>`
        }
        return `: <span class="text-green-400">${value}</span>`
      })
    return (
      <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} className="whitespace-pre" />
    )
  })
}

const FORMAT_INFO: Record<FormatType, { name: string; color: string; description: string }> = {
  json: {
    name: 'JSON',
    color: 'text-amber-400',
    description: 'JavaScript Object Notation - widely used for APIs',
  },
  xml: {
    name: 'XML',
    color: 'text-blue-400',
    description: 'eXtensible Markup Language - verbose but self-describing',
  },
  yaml: {
    name: 'YAML',
    color: 'text-green-400',
    description: 'YAML Ain\'t Markup Language - human-readable config format',
  },
}

interface FormatPanelProps {
  format: FormatType
  code: string
  isActive: boolean
  onClick: () => void
  byteSize: number
}

function FormatPanel({ format, code, isActive, onClick, byteSize }: FormatPanelProps) {
  const info = FORMAT_INFO[format]

  const highlightedCode = useMemo(() => {
    switch (format) {
      case 'json':
        return highlightJson(code)
      case 'xml':
        return highlightXml(code)
      case 'yaml':
        return highlightYaml(code)
    }
  }, [format, code])

  return (
    <motion.div
      layout
      className={`flex-1 min-w-0 rounded-lg border-2 overflow-hidden transition-colors cursor-pointer ${
        isActive
          ? 'border-blue-500 bg-slate-900'
          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div
        className={`px-4 py-2 border-b flex items-center justify-between ${
          isActive ? 'border-blue-500/30 bg-blue-500/10' : 'border-slate-700 bg-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${info.color}`}>{info.name}</span>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
            >
              Active
            </motion.span>
          )}
        </div>
        <span className="text-xs text-slate-500 font-mono">{byteSize} bytes</span>
      </div>

      {/* Code display */}
      <div className="p-4 font-mono text-sm overflow-x-auto max-h-80 overflow-y-auto">
        {highlightedCode}
      </div>
    </motion.div>
  )
}

export function FormatComparison({ className }: DiagramProps) {
  const [data, setData] = useState<Record<string, unknown>>(PRESETS[0].data)
  const [activeFormat, setActiveFormat] = useState<FormatType>('json')

  // Convert data to all formats
  const formats = useMemo(() => {
    const jsonStr = JSON.stringify(data, null, 2)
    const xmlStr = toXml(data, 'playlist')
    const yamlStr = toYaml(data)

    return {
      json: {
        code: jsonStr,
        bytes: new TextEncoder().encode(jsonStr).length,
      },
      xml: {
        code: xmlStr,
        bytes: new TextEncoder().encode(xmlStr).length,
      },
      yaml: {
        code: yamlStr,
        bytes: new TextEncoder().encode(yamlStr).length,
      },
    }
  }, [data])

  // Find smallest and largest
  const sizeStats = useMemo(() => {
    const sizes = Object.entries(formats).map(([key, val]) => ({
      format: key as FormatType,
      bytes: val.bytes,
    }))
    sizes.sort((a, b) => a.bytes - b.bytes)
    return {
      smallest: sizes[0],
      largest: sizes[sizes.length - 1],
    }
  }, [formats])

  return (
    <DiagramShell
      title="Format Comparison: JSON vs XML vs YAML"
      subtitle="Click a panel to select it. Compare syntax and file sizes."
      className={className}
    >
      <div className="space-y-6">
        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 self-center mr-2">Load preset:</span>
          {PRESETS.map((preset) => (
            <Button
              key={preset.name}
              variant={JSON.stringify(data) === JSON.stringify(preset.data) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setData(preset.data)}
            >
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Format panels */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <AnimatePresence mode="sync">
            {(['json', 'xml', 'yaml'] as FormatType[]).map((format) => (
              <FormatPanel
                key={format}
                format={format}
                code={formats[format].code}
                isActive={activeFormat === format}
                onClick={() => setActiveFormat(format)}
                byteSize={formats[format].bytes}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Size comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-lg p-4 border border-slate-700"
        >
          <h4 className="text-sm font-medium text-slate-300 mb-3">Size Comparison</h4>
          <div className="space-y-3">
            {(['json', 'xml', 'yaml'] as FormatType[]).map((format) => {
              const info = FORMAT_INFO[format]
              const { bytes } = formats[format]
              const maxBytes = sizeStats.largest.bytes
              const percentage = (bytes / maxBytes) * 100

              return (
                <div key={format} className="flex items-center gap-3">
                  <span className={`w-12 text-sm font-medium ${info.color}`}>{info.name}</span>
                  <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        format === 'json'
                          ? 'bg-amber-500/60'
                          : format === 'xml'
                            ? 'bg-blue-500/60'
                            : 'bg-green-500/60'
                      }`}
                    />
                  </div>
                  <span className="w-20 text-right text-sm font-mono text-slate-400">
                    {bytes} bytes
                  </span>
                  {format === sizeStats.smallest.format && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      smallest
                    </span>
                  )}
                  {format === sizeStats.largest.format && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                      largest
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Savings info */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              <span className={FORMAT_INFO[sizeStats.smallest.format].color}>
                {FORMAT_INFO[sizeStats.smallest.format].name}
              </span>{' '}
              is{' '}
              <span className="text-green-400 font-medium">
                {Math.round(
                  ((sizeStats.largest.bytes - sizeStats.smallest.bytes) / sizeStats.largest.bytes) *
                    100
                )}
                % smaller
              </span>{' '}
              than{' '}
              <span className={FORMAT_INFO[sizeStats.largest.format].color}>
                {FORMAT_INFO[sizeStats.largest.format].name}
              </span>{' '}
              ({sizeStats.largest.bytes - sizeStats.smallest.bytes} bytes saved)
            </p>
          </div>
        </motion.div>

        {/* Format description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFormat}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                  activeFormat === 'json'
                    ? 'bg-amber-500/20 text-amber-400'
                    : activeFormat === 'xml'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                }`}
              >
                {FORMAT_INFO[activeFormat].name.charAt(0)}
              </div>
              <div>
                <h4 className={`font-medium ${FORMAT_INFO[activeFormat].color}`}>
                  {FORMAT_INFO[activeFormat].name}
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  {FORMAT_INFO[activeFormat].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </DiagramShell>
  )
}
