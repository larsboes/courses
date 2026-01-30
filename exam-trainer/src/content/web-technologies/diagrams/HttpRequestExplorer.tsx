// src/content/web-technologies/diagrams/HttpRequestExplorer.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'request-line',
    label: 'Request Line',
    description: (
      <>
        <p className="mb-2">Die erste Zeile enthält:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>HTTP Methode</strong> (GET, POST, PUT, DELETE, ...)</li>
          <li><strong>URI</strong> mit optionalen Query Parametern</li>
          <li><strong>HTTP Version</strong> (HTTP/1.1)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'headers',
    label: 'Headers',
    description: (
      <>
        <p className="mb-2">Metadaten über den Request:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Host</strong> - Zielserver (required in HTTP/1.1)</li>
          <li><strong>Accept</strong> - Erwartetes Response-Format</li>
          <li><strong>Content-Type</strong> - Format des Body</li>
          <li><strong>User-Agent</strong> - Client-Informationen</li>
        </ul>
      </>
    ),
  },
  {
    id: 'empty-line',
    label: 'Leerzeile',
    description: (
      <p>
        Eine leere Zeile trennt die Headers vom Body. Sie signalisiert dem Server,
        dass alle Header gesendet wurden.
      </p>
    ),
  },
  {
    id: 'body',
    label: 'Body (optional)',
    description: (
      <>
        <p className="mb-2">Die eigentlichen Daten (bei POST, PUT, PATCH):</p>
        <ul className="list-disc list-inside space-y-1">
          <li>JSON, XML, Form-Daten, etc.</li>
          <li>Format durch Content-Type Header angegeben</li>
          <li>Bei GET-Requests meist leer</li>
        </ul>
      </>
    ),
  },
]

interface RegionBoxProps {
  id: string
  isActive: boolean
  onClick: () => void
  label: string
  content: string[]
  className?: string
}

function RegionBox({ id, isActive, onClick, label, content, className = '' }: RegionBoxProps) {
  return (
    <motion.div
      className={`
        p-3 cursor-pointer border-l-4 transition-colors
        ${isActive
          ? 'bg-blue-900/40 border-blue-500'
          : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="font-mono text-sm">
        {content.map((line, i) => (
          <div key={i} className={isActive ? 'text-blue-200' : 'text-slate-300'}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function HttpRequestExplorer({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="flex flex-col gap-1 max-w-lg mx-auto">
          <RegionBox
            id="request-line"
            isActive={activeRegion === 'request-line'}
            onClick={() => setActiveRegion(activeRegion === 'request-line' ? null : 'request-line')}
            label="REQUEST LINE"
            content={['GET /playlists?duration=300 HTTP/1.1']}
          />
          <RegionBox
            id="headers"
            isActive={activeRegion === 'headers'}
            onClick={() => setActiveRegion(activeRegion === 'headers' ? null : 'headers')}
            label="HEADERS"
            content={[
              'Host: playlist-server.com:8001',
              'Accept: application/json',
              'User-Agent: Mozilla/5.0',
            ]}
          />
          <RegionBox
            id="empty-line"
            isActive={activeRegion === 'empty-line'}
            onClick={() => setActiveRegion(activeRegion === 'empty-line' ? null : 'empty-line')}
            label="LEERZEILE"
            content={['']}
            className="min-h-[2rem]"
          />
          <RegionBox
            id="body"
            isActive={activeRegion === 'body'}
            onClick={() => setActiveRegion(activeRegion === 'body' ? null : 'body')}
            label="BODY (optional)"
            content={['{"name": "My Playlist"}']}
          />
        </div>
      )}
    </ExplorableSVG>
  )
}
