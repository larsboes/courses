// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistApiExplorer.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import type { DiagramProps } from '@/core/types/content'

interface Endpoint {
  method: 'GET' | 'POST' | 'DELETE'
  path: string
  description: string
  requestBody?: string
  responseExample: string
  statusCode: number
  httpRequest: string
}

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/playlists',
    description: 'Alle Playlist-Namen abrufen',
    responseExample: '["Workout Mix", "Chill Vibes", "Party"]',
    statusCode: 200,
    httpRequest: `GET /playlists HTTP/1.1
Host: localhost:8001
Accept: application/json`,
  },
  {
    method: 'GET',
    path: '/playlists/{name}',
    description: 'Eine spezifische Playlist abrufen',
    responseExample: `{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
    statusCode: 200,
    httpRequest: `GET /playlists/Workout%20Mix HTTP/1.1
Host: localhost:8001
Accept: application/json`,
  },
  {
    method: 'POST',
    path: '/playlists',
    description: 'Neue Playlist erstellen oder aktualisieren',
    requestBody: `{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
    responseExample: '{"message": "Playlist \'Workout Mix\' added/updated successfully."}',
    statusCode: 201,
    httpRequest: `POST /playlists HTTP/1.1
Host: localhost:8001
Content-Type: application/json
Content-Length: 142

{
  "name": "Workout Mix",
  "tracks": [
    {
      "title": "Eye of the Tiger",
      "link": "https://spotify.com/...",
      "duration": "4:05"
    }
  ]
}`,
  },
  {
    method: 'DELETE',
    path: '/playlists/{name}',
    description: 'Eine Playlist löschen',
    responseExample: '{"message": "Playlist \'Workout Mix\' deleted successfully."}',
    statusCode: 200,
    httpRequest: `DELETE /playlists/Workout%20Mix HTTP/1.1
Host: localhost:8001`,
  },
]

const methodColors = {
  GET: 'bg-blue-900/30 text-blue-400 border-blue-700',
  POST: 'bg-green-900/30 text-green-400 border-green-700',
  DELETE: 'bg-red-900/30 text-red-400 border-red-700',
}

export function PlaylistApiExplorer({ className }: DiagramProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0)
  const [showHttpRequest, setShowHttpRequest] = useState(false)

  const endpoint = endpoints[selectedEndpoint]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Playlist API Explorer
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Basierend auf der OpenAPI-Spezifikation (Meta_Playlist_API.json)
      </p>

      {/* Endpoint List */}
      <div className="space-y-2 mb-6">
        {endpoints.map((ep, index) => (
          <button
            key={index}
            onClick={() => { setSelectedEndpoint(index); setShowHttpRequest(false); }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
              ${selectedEndpoint === index
                ? 'bg-slate-800 border border-slate-600'
                : 'bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50'}
            `}
          >
            <span className={`px-2 py-1 rounded text-xs font-bold border ${methodColors[ep.method]}`}>
              {ep.method}
            </span>
            <span className="font-mono text-sm text-slate-300">{ep.path}</span>
            <span className="text-xs text-slate-500 ml-auto hidden sm:block">{ep.description}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEndpoint}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Description */}
          <div>
            <h4 className="text-md font-semibold text-slate-200 mb-1">{endpoint.description}</h4>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-bold border ${methodColors[endpoint.method]}`}>
                {endpoint.method}
              </span>
              <code className="text-sm text-slate-300 font-mono">{endpoint.path}</code>
              <span className="ml-auto text-xs text-slate-500">
                Status: <span className="text-green-400">{endpoint.statusCode}</span>
              </span>
            </div>
          </div>

          {/* Request Body (if POST) */}
          {endpoint.requestBody && (
            <div>
              <div className="text-xs text-slate-400 mb-2">Request Body (JSON)</div>
              <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs font-mono text-amber-200">{endpoint.requestBody}</pre>
              </div>
            </div>
          )}

          {/* Response Example */}
          <div>
            <div className="text-xs text-slate-400 mb-2">Response Example</div>
            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs font-mono text-green-300">{endpoint.responseExample}</pre>
            </div>
          </div>

          {/* Toggle HTTP Request */}
          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHttpRequest(!showHttpRequest)}
            >
              {showHttpRequest ? 'HTTP-Request ausblenden' : 'Vollständigen HTTP-Request zeigen'}
            </Button>
          </div>

          {/* Full HTTP Request (Exam Focus) */}
          <AnimatePresence>
            {showHttpRequest && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 text-sm font-medium">Prüfungsrelevant:</span>
                    <span className="text-xs text-slate-400">Diesen Request von Hand schreiben können!</span>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                    <pre className="text-xs font-mono text-slate-200 whitespace-pre">{endpoint.httpRequest}</pre>
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-slate-300">Aufbau:</strong> Request-Line → Headers → Leerzeile → Body</p>
                    {endpoint.method === 'POST' && (
                      <p><strong className="text-slate-300">Wichtig:</strong> Content-Type und Content-Length Header nicht vergessen!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* OpenAPI Reference */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          API-Spezifikation: <code className="text-slate-400">Meta_Playlist_API.json</code> (OpenAPI 3.0)
        </div>
      </div>
    </Card>
  )
}
