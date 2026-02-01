// exam-trainer/src/frontend/content/web-technologies/diagrams/PlaylistCodeDiff.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiagramShell } from '@/core/components/diagrams'
import type { DiagramProps } from '@/core/types/content'

type DiffType = 'u8-u9' | 'u9-u10' | 'u10-u12'

interface CodeDiff {
  title: string
  description: string
  before: { label: string; code: string; highlights: number[] }
  after: { label: string; code: string; highlights: number[] }
  explanation: string
}

const diffs: Record<DiffType, CodeDiff> = {
  'u8-u9': {
    title: 'U8 -> U9: localStorage zu REST API',
    description: 'Die Datenpersistenz wandert vom Browser zum Server',
    before: {
      label: 'U8: localStorage',
      code: `// Speichern
savePlaylistButton.addEventListener('click', () => {
  const playlistsJSON = JSON.stringify(playlists);
  localStorage.setItem('playlists', playlistsJSON);
  alert('All playlists saved!');
});

// Laden
window.onload = function() {
  const saved = localStorage.getItem('playlists');
  if (saved) {
    playlists = JSON.parse(saved);
    updatePlaylistSelect();
  }
};`,
      highlights: [2, 3, 9, 10],
    },
    after: {
      label: 'U9: REST API',
      code: `// Speichern
savePlaylistButton.addEventListener('click', async () => {
  const response = await fetch(\`\${apiBaseUrl}/playlists\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currentPlaylist),
  });
  if (!response.ok) throw new Error('Failed');
  alert('Playlist saved!');
});

// Laden
async function fetchPlaylists() {
  const response = await fetch(\`\${apiBaseUrl}/playlists\`);
  const playlists = await response.json();
  // ... update UI
}`,
      highlights: [2, 3, 4, 5, 6, 13, 14],
    },
    explanation: 'localStorage.setItem/getItem wird durch fetch() mit async/await ersetzt. Die Daten werden jetzt als HTTP POST/GET an den Server gesendet.',
  },
  'u9-u10': {
    title: 'U9 -> U10: In-Memory zu CouchDB',
    description: 'Das Backend speichert Daten jetzt persistent in einer Datenbank',
    before: {
      label: 'U9: In-Memory',
      code: `from flask import Flask, request, jsonify

webserver = Flask(__name__)
playlists = {}  # In-Memory Storage

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    playlist_name = data['name']
    playlists[playlist_name] = data['tracks']
    return jsonify({"message": "Added"}), 201`,
      highlights: [4, 10],
    },
    after: {
      label: 'U10: CouchDB',
      code: `from flask import Flask, request, jsonify
import requests, os

couchdb_url = os.environ["COUCHDB_URL"]

@webserver.route('/playlists', methods=['POST'])
def add_playlist():
    data = request.get_json()
    doc_id = f"playlist:{data['name']}"
    playlist_doc = {
        "_id": doc_id,
        "name": data["name"],
        "tracks": data["tracks"]
    }
    response = requests.put(
        f"{couchdb_url}/playlists/{doc_id}",
        json=playlist_doc
    )
    return jsonify({"message": "Added"}), 201`,
      highlights: [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    },
    explanation: 'Das Python-Dictionary wird durch CouchDB-Aufrufe ersetzt. Die Datenbank-URL kommt aus Umgebungsvariablen (fur Docker).',
  },
  'u10-u12': {
    title: 'U10 -> U12: Docker Compose zu Kubernetes',
    description: 'Die Container-Orchestrierung wechselt von docker-compose zu K8s Manifests',
    before: {
      label: 'U10: docker-compose.yml',
      code: `version: '3.8'
services:
  flask-webserver:
    build: .
    ports:
      - "8001:8001"
    depends_on:
      couchdb:
        condition: service_healthy
    environment:
      - COUCHDB_URL=http://couchdb:5984

  couchdb:
    image: couchdb:latest
    ports:
      - "5984:5984"
    volumes:
      - ./dbdata:/opt/couchdb/data`,
      highlights: [3, 7, 8, 9, 11, 17, 18],
    },
    after: {
      label: 'U12: K8s Manifests',
      code: `# webserver_deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webserver
  template:
    spec:
      containers:
      - name: webserver
        image: webserver:local
        env:
        - name: COUCHDB_URL
          value: couchdb:5984

# webserver_nodeport_service.yaml
apiVersion: v1
kind: Service
spec:
  type: NodePort
  ports:
  - port: 8080
    nodePort: 32000`,
      highlights: [2, 3, 7, 16, 17, 18, 22, 23, 24, 25, 26],
    },
    explanation: 'docker-compose wird durch separate K8s Manifest-Dateien ersetzt: Deployments fur Container, Services fur Networking, PVC fur Storage.',
  },
}

function CodeBlock({ code, highlights, label }: { code: string; highlights: number[]; label: string }) {
  const lines = code.split('\n')

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="px-3 py-2 bg-slate-800/50 border-b border-slate-700">
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-xs font-mono">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${highlights.includes(i + 1) ? 'bg-amber-900/30 -mx-3 px-3' : ''}`}
            >
              <span className="text-slate-600 select-none mr-3 inline-block w-5 text-right">
                {i + 1}
              </span>
              <span className={highlights.includes(i + 1) ? 'text-amber-200' : 'text-slate-300'}>
                {line || ' '}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export function PlaylistCodeDiff({ className }: DiagramProps) {
  const [selectedDiff, setSelectedDiff] = useState<DiffType>('u8-u9')

  const diff = diffs[selectedDiff]

  return (
    <DiagramShell
      title="Code-Vergleich"
      subtitle="Wie sich der Code zwischen den Ubungen verandert"
      className={className}
    >
      {/* Diff Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['u8-u9', 'u9-u10', 'u10-u12'] as DiffType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedDiff(type)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedDiff === type
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
            `}
          >
            {type.replace('-', ' -> ').toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDiff}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Title */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-slate-200">{diff.title}</h4>
            <p className="text-sm text-slate-400">{diff.description}</p>
          </div>

          {/* Side by Side Code */}
          <div className="grid gap-4 lg:grid-cols-2">
            <CodeBlock code={diff.before.code} highlights={diff.before.highlights} label={diff.before.label} />
            <CodeBlock code={diff.after.code} highlights={diff.after.highlights} label={diff.after.label} />
          </div>

          {/* Explanation */}
          <div className="mt-4 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-1">Was andert sich?</div>
            <p className="text-sm text-slate-300">{diff.explanation}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </DiagramShell>
  )
}
