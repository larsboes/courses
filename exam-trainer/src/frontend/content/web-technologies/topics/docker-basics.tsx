// src/content/web-technologies/topics/docker-basics.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'
import { DockerLayerExplorer } from '../diagrams/DockerLayerExplorer'

// Mermaid diagrams for Docker concepts
const dockerWorkflowDiagram = `
flowchart LR
  subgraph Dev["Entwicklung"]
    Code["Source Code"]
    DF["Dockerfile"]
  end

  subgraph Build["Build"]
    Image["Docker Image"]
  end

  subgraph Registry["Registry"]
    Hub["Docker Hub / Registry"]
  end

  subgraph Runtime["Ausführung"]
    Container["Container"]
  end

  Code --> DF
  DF -->|docker build| Image
  Image -->|docker push| Hub
  Hub -->|docker pull| Image2["Image"]
  Image2 -->|docker run| Container
  Image -->|docker run| Container
`

const imageLayersDiagram = `
flowchart TB
  subgraph Image["Docker Image (Read-Only)"]
    direction TB
    L1["Base Layer: debian:bullseye"]
    L2["Layer 2: apt-get install python"]
    L3["Layer 3: pip install flask"]
    L4["Layer 4: COPY app.py"]
    L1 --> L2 --> L3 --> L4
  end

  subgraph Container["Container (Laufzeit)"]
    RW["Read-Write Layer"]
    L4 --> RW
  end

  style RW fill:#22c55e,stroke:#16a34a
`

const dockerK8sBridgeDiagram = `
flowchart TB
  subgraph Docker["Docker Welt"]
    DF["Dockerfile"]
    DI["Docker Image"]
    DC["Docker Container"]
    DF -->|build| DI
    DI -->|run| DC
  end

  subgraph K8s["Kubernetes Welt"]
    Reg["Container Registry"]
    Pod["Pod"]
    K8sC["Container"]
    Deploy["Deployment"]
  end

  DI -->|push| Reg
  Reg -->|pull| K8sC
  Deploy -->|manages| Pod
  Pod -->|contains| K8sC

  style Reg fill:#3b82f6,stroke:#1d4ed8
`

function DockerfileDiagram() {
  return (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
      <pre className="font-mono text-sm">
        <div className="text-slate-500"># Dockerfile Beispiel</div>
        <div>
          <span className="text-purple-400">FROM </span>
          <span className="text-green-400">node:20-alpine</span>
          <span className="text-slate-500 ml-4"># Base Image</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">WORKDIR </span>
          <span className="text-amber-400">/app</span>
          <span className="text-slate-500 ml-4"># Arbeitsverzeichnis</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">COPY </span>
          <span className="text-amber-400">package*.json ./</span>
          <span className="text-slate-500 ml-4"># Dependencies zuerst (Caching!)</span>
        </div>
        <div>
          <span className="text-purple-400">RUN </span>
          <span className="text-cyan-400">npm ci</span>
          <span className="text-slate-500 ml-4"># Installieren</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">COPY </span>
          <span className="text-amber-400">. .</span>
          <span className="text-slate-500 ml-4"># Rest des Codes</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">EXPOSE </span>
          <span className="text-green-400">3000</span>
          <span className="text-slate-500 ml-4"># Port dokumentieren</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">CMD </span>
          <span className="text-cyan-400">["node", "server.js"]</span>
          <span className="text-slate-500 ml-4"># Startbefehl</span>
        </div>
      </pre>
    </div>
  )
}

export const dockerBasicsTopic: Topic = {
  id: 'docker-basics',
  title: 'Docker Grundlagen',
  description: 'Container, Images, Dockerfile, docker-compose - Grundlage für Kubernetes',
  examNotes: 'Container vs VM, Image Layers, Dockerfile Befehle',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            <strong>Docker</strong> ist eine Plattform zur Containerisierung von Anwendungen.
            Container sind leichtgewichtige, isolierte Umgebungen, die alle Abhängigkeiten
            einer Anwendung bündeln.
          </p>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-300 mb-2">Container vs. Virtuelle Maschinen:</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                <div className="text-blue-400 font-medium mb-1">Container</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  <li><strong>Teilen</strong> den Kernel mit Host</li>
                  <li>Starten in <strong>Sekunden</strong></li>
                  <li>Megabytes groß</li>
                  <li>Weniger Isolation</li>
                </ul>
              </div>
              <div className="p-3 bg-purple-900/20 rounded border border-purple-800">
                <div className="text-purple-400 font-medium mb-1">VM</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  <li><strong>Eigenes</strong> Betriebssystem</li>
                  <li>Starten in <strong>Minuten</strong></li>
                  <li>Gigabytes groß</li>
                  <li>Stärkere Isolation</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
            <div className="text-green-400 font-medium mb-2">Verbindung zu Kubernetes:</div>
            <p className="text-slate-300 text-sm">
              Docker erstellt Container-Images, die Kubernetes dann orchestriert.
              K8s nutzt diese Images, um Pods zu erstellen - Docker ist die Grundlage
              für die Container-Welt in Kubernetes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'images-containers',
      title: 'Images vs Container',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Image</strong> ist eine unveränderliche Vorlage (Template),
            ein <strong>Container</strong> ist eine laufende Instanz eines Images.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="text-lg font-bold text-blue-400 mb-2">Image</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li><strong>Read-only</strong> Schablone</li>
                <li>Enthält OS-Dateien, Libs, Code</li>
                <li>Wird aus <strong>Dockerfile</strong> gebaut</li>
                <li>Kann geteilt werden (Registry)</li>
                <li>Analogie: <strong>Klasse</strong> (OOP)</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
              <div className="text-lg font-bold text-green-400 mb-2">Container</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li><strong>Laufende</strong> Instanz</li>
                <li>Hat eigene Read-Write Layer</li>
                <li>Kann Daten speichern (temporär)</li>
                <li>Kurzlebig, ersetzbar</li>
                <li>Analogie: <strong>Objekt</strong> (OOP)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <MermaidDiagram chart={imageLayersDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-300 mb-2">Layer-System:</div>
            <p className="text-slate-400 text-sm">
              Docker Images bestehen aus <strong>Schichten (Layers)</strong>.
              Jede Dockerfile-Anweisung erstellt einen Layer. Layers werden gecacht
              und wiederverwendet - das macht Builds und Downloads schneller!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'dockerfile',
      title: 'Dockerfile',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Dockerfile</strong> beschreibt, wie ein Image gebaut wird.
            Es enthält Instruktionen, die sequentiell ausgeführt werden.
          </p>
          <DockerfileDiagram />
          <div className="grid gap-3 mt-4">
            <div className="text-sm font-medium text-slate-300">Wichtige Instruktionen:</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">FROM</code>
                <p className="text-slate-400 text-sm mt-1">Basis-Image (erforderlich, erste Zeile)</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">WORKDIR</code>
                <p className="text-slate-400 text-sm mt-1">Setzt Arbeitsverzeichnis</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">COPY</code>
                <p className="text-slate-400 text-sm mt-1">Kopiert Dateien in Image</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">RUN</code>
                <p className="text-slate-400 text-sm mt-1">Führt Befehl aus (Build-Zeit)</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">ENV</code>
                <p className="text-slate-400 text-sm mt-1">Setzt Umgebungsvariablen</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">EXPOSE</code>
                <p className="text-slate-400 text-sm mt-1">Dokumentiert Port (öffnet nicht!)</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">CMD</code>
                <p className="text-slate-400 text-sm mt-1">Standard-Startbefehl</p>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <code className="text-purple-400">ENTRYPOINT</code>
                <p className="text-slate-400 text-sm mt-1">Unveränderlicher Startbefehl</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800 mt-4">
            <div className="text-amber-400 font-medium mb-2">Best Practice: Layer Caching</div>
            <p className="text-slate-300 text-sm">
              Ändere Dateien, die sich selten ändern, <strong>zuerst</strong>.
              Dependencies (package.json) vor Source Code kopieren - so wird npm install
              nur bei Dependency-Änderungen neu ausgeführt!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'workflow',
      title: 'Docker Workflow',
      content: (
        <div className="space-y-4">
          <p>
            Der typische Docker-Workflow: <strong>Build → Push → Pull → Run</strong>.
          </p>
          <MermaidDiagram chart={dockerWorkflowDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="text-sm font-medium text-slate-300 mb-3">Wichtige Befehle:</div>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <span className="text-cyan-400">docker build -t myapp:1.0 .</span>
                <span className="text-slate-500 ml-2"># Image bauen</span>
              </div>
              <div>
                <span className="text-cyan-400">docker run -p 3000:3000 myapp:1.0</span>
                <span className="text-slate-500 ml-2"># Container starten</span>
              </div>
              <div>
                <span className="text-cyan-400">docker push myrepo/myapp:1.0</span>
                <span className="text-slate-500 ml-2"># In Registry hochladen</span>
              </div>
              <div>
                <span className="text-cyan-400">docker pull nginx:latest</span>
                <span className="text-slate-500 ml-2"># Image herunterladen</span>
              </div>
              <div>
                <span className="text-cyan-400">docker ps</span>
                <span className="text-slate-500 ml-2"># Laufende Container zeigen</span>
              </div>
              <div>
                <span className="text-cyan-400">docker images</span>
                <span className="text-slate-500 ml-2"># Lokale Images zeigen</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'docker-compose',
      title: 'Docker Compose',
      content: (
        <div className="space-y-4">
          <p>
            <strong>Docker Compose</strong> orchestriert mehrere Container als ein System.
            Statt jeden Container einzeln zu starten, definiert eine{' '}
            <code className="bg-slate-700 px-1 rounded">docker-compose.yml</code> alle
            Services, Netzwerke und Volumes zentral.
          </p>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
            <div className="text-slate-500 text-sm mb-2"># docker-compose.yml für die Playlist-App</div>
            <pre className="font-mono text-sm text-slate-300">
{`version: '3.8'
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
    env_file:
      - .env

  couchdb:
    image: couchdb:latest
    ports:
      - "5984:5984"
    volumes:
      - ./dbdata:/opt/couchdb/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5984"]
      interval: 10s
      timeout: 5s
      retries: 5`}
            </pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="font-medium text-blue-400 mb-2">Zentrale Konzepte</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li><code className="bg-slate-700 px-1 rounded text-xs">services</code> — Jeder Container ist ein Service</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">build</code> — Baut Image aus lokalem Dockerfile</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">image</code> — Nutzt fertiges Image aus Registry</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">ports</code> — Host-Port:Container-Port Mapping</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-medium text-green-400 mb-2">Service-Kommunikation</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Services finden sich über <strong>Namen</strong> (DNS)</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">couchdb:5984</code> statt IP-Adresse</li>
                <li>Automatisches Netzwerk für alle Services</li>
                <li><code className="bg-slate-700 px-1 rounded text-xs">depends_on</code> steuert Startreihenfolge</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
              <div className="font-medium text-amber-400 mb-2">Volumes</div>
              <p className="text-slate-300 text-sm">
                <code className="bg-slate-700 px-1 rounded text-xs">volumes: - ./dbdata:/opt/couchdb/data</code> mappt
                ein Host-Verzeichnis in den Container. Daten überleben Container-Neustarts.
              </p>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="font-medium text-purple-400 mb-2">Healthchecks</div>
              <p className="text-slate-300 text-sm">
                Prüft, ob ein Service wirklich bereit ist.
                Mit <code className="bg-slate-700 px-1 rounded text-xs">condition: service_healthy</code>
                {' '}wartet der abhängige Service, bis der Healthcheck erfolgreich ist.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-sm font-medium text-slate-300 mb-2">Wichtige Befehle:</div>
            <div className="space-y-1 font-mono text-sm">
              <div><span className="text-cyan-400">docker compose up -d</span> <span className="text-slate-500">— Alle Services starten</span></div>
              <div><span className="text-cyan-400">docker compose down</span> <span className="text-slate-500">— Alle Services stoppen</span></div>
              <div><span className="text-cyan-400">docker compose logs -f</span> <span className="text-slate-500">— Logs aller Services</span></div>
              <div><span className="text-cyan-400">docker compose ps</span> <span className="text-slate-500">— Status aller Services</span></div>
            </div>
          </div>

          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
            <div className="text-green-400 font-medium mb-2">Verbindung zu Kubernetes:</div>
            <p className="text-slate-300 text-sm">
              Docker Compose ist ideal für <strong>lokale Entwicklung</strong>.
              Für Produktion wird die gleiche Architektur in <strong>Kubernetes-Manifeste</strong> übersetzt:
              Services → K8s Services, Container → Pods, Volumes → PersistentVolumeClaims.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'multi-stage-builds',
      title: 'Multi-Stage Builds',
      content: (
        <div className="space-y-4">
          <p>
            <strong>Multi-Stage Builds</strong> ermöglichen es, Build-Tools und Source Code
            vom finalen Image zu trennen. Das Ergebnis: <strong>kleinere, sicherere Production-Images</strong>.
          </p>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
            <div className="text-slate-500 text-sm mb-2"># Multi-Stage Dockerfile</div>
            <pre className="font-mono text-sm">
              <div>
                <span className="text-slate-500"># Stage 1: Build</span>
              </div>
              <div>
                <span className="text-purple-400">FROM </span>
                <span className="text-green-400">node:20 AS build</span>
              </div>
              <div>
                <span className="text-purple-400">WORKDIR </span>
                <span className="text-amber-400">/app</span>
              </div>
              <div>
                <span className="text-purple-400">COPY </span>
                <span className="text-amber-400">package*.json ./</span>
              </div>
              <div>
                <span className="text-purple-400">RUN </span>
                <span className="text-cyan-400">npm ci</span>
              </div>
              <div>
                <span className="text-purple-400">COPY </span>
                <span className="text-amber-400">. .</span>
              </div>
              <div>
                <span className="text-purple-400">RUN </span>
                <span className="text-cyan-400">npm run build</span>
              </div>
              <div className="mt-3">
                <span className="text-slate-500"># Stage 2: Production</span>
              </div>
              <div>
                <span className="text-purple-400">FROM </span>
                <span className="text-green-400">nginx:alpine</span>
              </div>
              <div>
                <span className="text-purple-400">COPY </span>
                <span className="text-amber-400">--from=build /app/dist /usr/share/nginx/html</span>
              </div>
              <div>
                <span className="text-purple-400">EXPOSE </span>
                <span className="text-green-400">80</span>
              </div>
            </pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
              <div className="font-medium text-red-400 mb-2">Ohne Multi-Stage</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>node:20 als Base → <strong>~1 GB</strong></li>
                <li>Build-Tools im finalen Image</li>
                <li>Source Code enthalten</li>
                <li>node_modules enthalten</li>
                <li>Größere Angriffsfläche</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-medium text-green-400 mb-2">Mit Multi-Stage</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>nginx:alpine als Base → <strong>~30 MB</strong></li>
                <li>Nur Build-Output im Image</li>
                <li>Kein Source Code</li>
                <li>Keine Build-Dependencies</li>
                <li>Minimale Angriffsfläche</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
            <div className="text-blue-400 font-medium mb-2">Wie es funktioniert:</div>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm">
              <li><strong>Stage 1 (build)</strong>: Volle Node-Umgebung, installiert Dependencies, kompiliert den Code</li>
              <li><strong>Stage 2 (production)</strong>: Leichtes nginx-Image, kopiert nur die fertig gebauten Dateien aus Stage 1</li>
              <li><code className="bg-slate-700 px-1 rounded text-xs">COPY --from=build</code> überträgt Dateien zwischen Stages</li>
            </ol>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
            <div className="text-amber-400 font-medium mb-2">Klausurrelevant:</div>
            <p className="text-slate-300 text-sm">
              Multi-Stage Builds sind relevant für das Verständnis von Production-Deployments.
              Die Playlist-App könnte so deployed werden: Build-Stage kompiliert Frontend-Code,
              Production-Stage serviert nur die statischen Dateien über nginx.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'layer-explorer',
      title: 'Layer Explorer (Interaktiv)',
      content: (
        <div className="space-y-4">
          <p>
            Erkunde interaktiv, wie Docker-Layer aufgebaut werden und wie das
            <strong> Layer Caching</strong> funktioniert. Klicke auf einen Layer, um zu
            sehen, welche nachfolgenden Layer beim Rebuild betroffen sind.
          </p>
          <p className="text-sm text-slate-400">
            Aktiviere den Challenge-Modus, um dein Verstaendnis zu testen: Welche Layer
            werden neu gebaut, wenn sich eine bestimmte Datei aendert?
          </p>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: DockerLayerExplorer,
      },
    },
    {
      id: 'docker-to-k8s',
      title: 'Von Docker zu Kubernetes',
      content: (
        <div className="space-y-4">
          <p>
            Docker und Kubernetes ergänzen sich: Docker <strong>erstellt</strong> Container-Images,
            Kubernetes <strong>orchestriert</strong> sie in Produktionsumgebungen.
          </p>
          <MermaidDiagram chart={dockerK8sBridgeDiagram} className="bg-slate-800/50 rounded-lg p-4" />
          <div className="grid gap-3">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="font-medium text-blue-400 mb-2">Was Docker macht:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Images bauen (Dockerfile)</li>
                <li>Einzelne Container lokal ausführen</li>
                <li>Images in Registry pushen</li>
                <li>Entwicklungsumgebung bereitstellen</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-medium text-green-400 mb-2">Was Kubernetes macht:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Viele Container (Pods) verwalten</li>
                <li>Automatische Skalierung</li>
                <li>Self-Healing bei Ausfällen</li>
                <li>Service Discovery & Load Balancing</li>
                <li>Rolling Updates ohne Downtime</li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
            <div className="text-purple-400 font-medium mb-2">Wichtig für die Klausur:</div>
            <p className="text-slate-300 text-sm">
              Das Image in einem Kubernetes-Manifest (z.B. <code className="bg-slate-700 px-1 rounded">image: nginx:latest</code>)
              verweist auf ein Docker-Image in einer Registry. K8s zieht dieses Image
              und startet daraus Container in Pods.
            </p>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'kubernetes-begriffe', title: 'K8s Begriffe', relationship: 'benötigt für' },
    { id: 'kubernetes-manifests', title: 'K8s Manifests', relationship: 'Image-Referenz in' },
  ],

  connectionDiagram: `
flowchart LR
  subgraph Dev["Entwicklung"]
    Code["Code"]
    Docker["Dockerfile"]
  end

  subgraph Build["CI/CD"]
    Image["Docker Image"]
    Registry["Container\nRegistry"]
  end

  subgraph K8s["Kubernetes"]
    Pod["Pod"]
    Container["Container"]
  end

  Code --> Docker
  Docker -->|"build"| Image
  Image -->|"push"| Registry
  Registry -->|"pull"| Container
  Pod -->|"enthält"| Container

  style Image fill:#3b82f6,stroke:#1d4ed8
`,

  quiz: {
    questions: [
      {
        id: 'docker-image-vs-container',
        type: 'multiple-choice',
        question: 'Was ist der Unterschied zwischen einem Docker Image und einem Container?',
        options: [
          'Ein Image ist eine unveränderliche Vorlage, ein Container ist eine laufende Instanz davon',
          'Ein Container ist die Vorlage, ein Image die laufende Instanz',
          'Images laufen auf dem Host, Container in der Cloud',
          'Es gibt keinen Unterschied, beide Begriffe sind austauschbar',
        ],
        correctAnswer: 'Ein Image ist eine unveränderliche Vorlage, ein Container ist eine laufende Instanz davon',
        explanation:
          'Ein Image ist wie eine Klasse/Blaupause (read-only), ein Container wie ein Objekt/Instanz. Aus einem Image können viele Container gestartet werden. Der Container hat zusätzlich eine Read-Write-Schicht für temporäre Daten.',
      },
      {
        id: 'container-vs-vm',
        type: 'multi-select',
        question: 'Welche Aussagen über Container (im Vergleich zu VMs) sind korrekt? (Mehrere Antworten)',
        options: [
          'Container teilen den Kernel mit dem Host',
          'Container haben ein eigenes Betriebssystem',
          'Container starten schneller als VMs',
          'Container bieten stärkere Isolation als VMs',
          'Container sind typischerweise kleiner als VM-Images',
        ],
        correctAnswer: [
          'Container teilen den Kernel mit dem Host',
          'Container starten schneller als VMs',
          'Container sind typischerweise kleiner als VM-Images',
        ],
        explanation:
          'Container teilen den Host-Kernel (anders als VMs mit eigenem OS), starten in Sekunden statt Minuten, und sind Megabytes statt Gigabytes groß. VMs bieten allerdings stärkere Isolation durch Hardware-Virtualisierung.',
      },
      {
        id: 'dockerfile-from',
        type: 'multiple-choice',
        question: 'Was bewirkt die FROM-Anweisung in einem Dockerfile?',
        options: [
          'Definiert das Basis-Image, auf dem das neue Image aufbaut',
          'Kopiert Dateien von einem anderen Container',
          'Startet den Container von einer bestimmten URL',
          'Setzt den Startbefehl für den Container',
        ],
        correctAnswer: 'Definiert das Basis-Image, auf dem das neue Image aufbaut',
        explanation:
          'FROM ist immer die erste Anweisung und legt das Basis-Image fest (z.B. FROM node:20-alpine). Alle weiteren Layer bauen darauf auf. Das ermöglicht effiziente Wiederverwendung bestehender Images.',
      },
    ],
  },

  examTasks: [
    {
      id: 'docker-container-task',
      title: 'Docker & Container',
      points: 20,
      context: (
        <p>
          Die Playlist-App wird als Docker-Container bereitgestellt. Ein Flask-Webserver
          und eine CouchDB-Datenbank laufen als separate Container und werden mit Docker
          Compose orchestriert.
        </p>
      ),
      parts: [
        {
          id: 'docker-task-a',
          type: 'free-text' as const,
          question:
            'Erklären Sie die Unterschiede zwischen einem Docker-Container und einer virtuellen Maschine (VM). Nennen Sie mindestens 3 Unterschiede.',
          placeholder: 'Container unterscheiden sich von VMs in folgenden Punkten...',
          modelAnswer:
            '1. Kernel-Sharing: Container teilen den Kernel des Host-Betriebssystems. VMs haben ein eigenes, vollständiges Betriebssystem mit eigenem Kernel.\n\n2. Startzeit: Container starten in Sekunden, da kein OS gebootet werden muss. VMs brauchen Minuten zum Starten.\n\n3. Größe: Container-Images sind typischerweise Megabytes groß (z.B. alpine ~5MB). VM-Images sind Gigabytes groß.\n\n4. Isolation: VMs bieten stärkere Isolation durch Hardware-Virtualisierung (Hypervisor). Container isolieren über Namespaces und cgroups auf OS-Ebene.\n\n5. Ressourcen: Container haben weniger Overhead, da kein Gast-OS nötig ist. VMs brauchen eigenen RAM und CPU für jedes Gast-OS.',
          keyPoints: [
            'Kernel-Sharing vs eigenes OS',
            'Startzeit: Sekunden vs Minuten',
            'Größe: MB vs GB',
            'Isolation: Namespaces/cgroups vs Hypervisor',
          ],
          explanation:
            'Das Verständnis der Unterschiede zwischen Containern und VMs ist eine häufige Prüfungsfrage.',
        },
        {
          id: 'docker-task-b',
          type: 'code-write' as const,
          language: 'http' as const,
          question:
            'Schreiben Sie ein Dockerfile für die Flask-App der Playlist-App. Die App basiert auf Python 3.11, benötigt die Dependencies aus requirements.txt, kopiert den Code nach /app und startet mit "python webserver.py" auf Port 8001.',
          placeholder:
            'FROM python:3.11\n# Ihre Anweisungen hier...',
          modelAnswer: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["python", "webserver.py"]`,
          keyPoints: [
            'FROM mit Python-Image',
            'WORKDIR für Arbeitsverzeichnis',
            'COPY requirements.txt zuerst (Layer-Caching)',
            'RUN pip install für Dependencies',
            'COPY . . für restlichen Code',
            'EXPOSE für Port-Dokumentation',
            'CMD für Startbefehl',
          ],
          explanation:
            'Die Reihenfolge im Dockerfile ist wichtig: Dependencies vor Code kopieren ermöglicht besseres Layer-Caching.',
        },
        {
          id: 'docker-task-c',
          type: 'free-text' as const,
          question:
            'Erklären Sie das Layer-Caching in Docker: Warum sollte man COPY package.json (bzw. requirements.txt) VOR COPY . . im Dockerfile ausführen? Was passiert, wenn man nur den Quellcode ändert?',
          placeholder: 'Layer-Caching funktioniert so...',
          modelAnswer:
            'Docker baut Images in Schichten (Layers). Jede Dockerfile-Anweisung erstellt einen Layer. Docker cached jeden Layer und verwendet den Cache wieder, solange sich nichts geändert hat.\n\nWenn sich ein Layer ändert, werden alle nachfolgenden Layer ebenfalls neu gebaut (Cache-Invalidierung).\n\nBei COPY requirements.txt + RUN pip install VOR COPY . .:\n- Wenn nur Quellcode geändert wird: requirements.txt hat sich nicht geändert → pip install wird aus dem Cache genommen (schnell!)\n- Nur COPY . . und nachfolgende Layer werden neu gebaut.\n\nBei COPY . . VOR pip install:\n- Jede Code-Änderung invalidiert den COPY-Layer → pip install muss jedes Mal neu laufen (langsam!).\n\nDieses Pattern spart bei großen Projekten erheblich Build-Zeit.',
          keyPoints: [
            'Jede Anweisung erstellt einen Layer',
            'Geänderter Layer invalidiert alle nachfolgenden',
            'Dependencies zuerst = pip install wird gecacht',
            'Nur Code-Änderung = nur COPY . . wird neu gebaut',
          ],
          explanation:
            'Layer-Caching ist ein fundamentales Docker-Konzept für effiziente Builds.',
        },
        {
          id: 'docker-task-d',
          type: 'free-text' as const,
          question:
            'Beschreiben Sie den Weg, wie ein Docker-Image zu einem laufenden Pod in Kubernetes wird. Welche Schritte sind nötig?',
          placeholder: '1. Dockerfile schreiben...',
          modelAnswer:
            '1. Dockerfile schreiben: Definiert die Build-Anweisungen (FROM, COPY, RUN, CMD).\n\n2. Image bauen: docker build -t playlist-api:1.0 . erstellt das Image lokal.\n\n3. Image taggen: docker tag playlist-api:1.0 registry.example.com/playlist-api:1.0\n\n4. Image pushen: docker push registry.example.com/playlist-api:1.0 lädt das Image in eine Container-Registry hoch.\n\n5. K8s Manifest erstellen: Ein Deployment-Manifest referenziert das Image: image: registry.example.com/playlist-api:1.0\n\n6. Manifest anwenden: kubectl apply -f deployment.yaml sendet den gewünschten Zustand an den API-Server.\n\n7. Scheduling: Der Kubernetes Scheduler wählt einen passenden Node.\n\n8. Image Pull: kubelet auf dem ausgewählten Node zieht das Image aus der Registry.\n\n9. Container starten: Der Container wird im Pod gestartet, die Flask-App läuft.',
          keyPoints: [
            'Dockerfile → docker build → Image',
            'Image → Registry (push)',
            'K8s Manifest referenziert Image',
            'kubectl apply → Scheduler → Node',
            'kubelet → Image Pull → Container Start',
          ],
          explanation:
            'Der Weg vom Dockerfile zum Pod verbindet Docker und Kubernetes Konzepte.',
        },
      ],
    },
  ],
}
