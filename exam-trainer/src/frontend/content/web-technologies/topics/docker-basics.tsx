// src/content/web-technologies/topics/docker-basics.tsx
import type { Topic } from '@/core/types/content'
import { MermaidDiagram } from '@/core/components/diagrams'

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
}
