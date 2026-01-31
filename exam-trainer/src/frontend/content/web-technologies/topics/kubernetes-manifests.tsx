// src/content/web-technologies/topics/kubernetes-manifests.tsx
import type { Topic } from '@/core/types/content'
import { K8sManifestExplorer } from '../diagrams/K8sManifestExplorer'

export const kubernetesManifestsTopic: Topic = {
  id: 'kubernetes-manifests',
  title: 'Kubernetes Manifests',
  description: 'YAML-Manifeste, deklarative Konfiguration, Deployment & Service',
  examNotes: 'Manifest-Struktur, Pflichtfelder, Label Selektoren',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Kubernetes verwendet <strong>YAML-Manifeste</strong> zur deklarativen
            Konfiguration von Ressourcen. Anstatt imperative Befehle auszuführen,
            beschreibt man den <strong>gewünschten Zustand</strong> (Desired State).
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-sm text-slate-400 mb-2">Deklarativ vs. Imperativ:</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                <div className="text-green-400 font-medium mb-1">Deklarativ</div>
                <div className="text-sm text-slate-300">
                  "Ich möchte 3 Pods" - Kubernetes sorgt dafür
                </div>
              </div>
              <div className="p-3 bg-amber-900/20 rounded border border-amber-800">
                <div className="text-amber-400 font-medium mb-1">Imperativ</div>
                <div className="text-sm text-slate-300">
                  "Starte Pod 1, dann Pod 2, dann Pod 3"
                </div>
              </div>
            </div>
          </div>
          <p>
            Manifeste werden mit <code className="bg-slate-700 px-1 rounded">kubectl apply -f</code> angewendet.
            Kubernetes vergleicht dann den aktuellen mit dem gewünschten Zustand
            und nimmt die nötigen Änderungen vor.
          </p>
        </div>
      ),
    },
    {
      id: 'structure',
      title: 'Struktur',
      content: (
        <div className="space-y-4">
          <p>
            Jedes Kubernetes-Manifest hat vier Pflichtfelder. Klicke auf die
            Bereiche für Details:
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-sm text-slate-400 mb-2">Pflichtfelder:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>apiVersion</strong> - API-Gruppe und Version</li>
              <li><strong>kind</strong> - Ressourcentyp</li>
              <li><strong>metadata</strong> - Name und Labels</li>
              <li><strong>spec</strong> - Gewünschter Zustand</li>
            </ul>
          </div>
        </div>
      ),
      diagram: {
        type: 'explorable',
        component: K8sManifestExplorer,
      },
    },
    {
      id: 'deployment-manifest',
      title: 'Deployment Manifest',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Deployment</strong> verwaltet ReplicaSets und sorgt für
            Rolling Updates. Es garantiert eine bestimmte Anzahl von Pod-Replikas.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
            <pre className="font-mono text-sm text-slate-300">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: playlist-api
  labels:
    app: playlist-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: playlist-api
  template:
    metadata:
      labels:
        app: playlist-api
    spec:
      containers:
      - name: api
        image: playlist-api:1.0
        ports:
        - containerPort: 8001`}
            </pre>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-blue-400 font-mono text-sm mb-1">replicas: 3</div>
              <div className="text-sm text-slate-300">
                Kubernetes hält immer 3 Pods am Laufen
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-blue-400 font-mono text-sm mb-1">selector.matchLabels</div>
              <div className="text-sm text-slate-300">
                Verbindet Deployment mit seinen Pods
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-blue-400 font-mono text-sm mb-1">template</div>
              <div className="text-sm text-slate-300">
                Pod-Vorlage - was in jedem Pod läuft
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-blue-400 font-mono text-sm mb-1">containerPort</div>
              <div className="text-sm text-slate-300">
                Port, auf dem der Container lauscht
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'service-manifest',
      title: 'Service Manifest',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Service</strong> bietet einen stabilen Netzwerk-Endpunkt
            für Pods. Da Pods kurzlebig sind (werden ersetzt bei Updates/Fehlern),
            braucht man einen festen DNS-Namen und IP-Adresse.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
            <pre className="font-mono text-sm text-slate-300">
{`apiVersion: v1
kind: Service
metadata:
  name: playlist-api-service
spec:
  selector:
    app: playlist-api
  ports:
  - port: 80
    targetPort: 8001
  type: ClusterIP`}
            </pre>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-green-400 font-mono text-sm mb-1">selector.app</div>
              <div className="text-sm text-slate-300">
                Findet alle Pods mit Label <code className="bg-slate-700 px-1 rounded">app: playlist-api</code>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-green-400 font-mono text-sm mb-1">port: 80</div>
              <div className="text-sm text-slate-300">
                Service-Port (nach außen sichtbar)
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-green-400 font-mono text-sm mb-1">targetPort: 8001</div>
              <div className="text-sm text-slate-300">
                Pod-Port (Container lauscht hier)
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-green-400 font-mono text-sm mb-1">type: ClusterIP</div>
              <div className="text-sm text-slate-300">
                Nur intern erreichbar (Standard)
              </div>
            </div>
          </div>
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
            <div className="text-blue-300 font-medium mb-2">Service-Typen:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              <li><strong>ClusterIP</strong> - Nur cluster-intern (Standard)</li>
              <li><strong>NodePort</strong> - Auf jedem Node über festen Port erreichbar</li>
              <li><strong>LoadBalancer</strong> - Externer Load Balancer (Cloud)</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],

  relatedTopics: [
    { id: 'kubernetes-begriffe', title: 'K8s Begriffe', relationship: 'setzt voraus' },
    { id: 'kubernetes-netzwerk', title: 'K8s Netzwerk', relationship: 'Service definiert' },
    { id: 'docker-basics', title: 'Docker Grundlagen', relationship: 'Image-Referenz' },
    { id: 'json', title: 'JSON', relationship: 'ähnliche Syntax (YAML)' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph Manifest["YAML Manifest"]
    Deployment["Deployment"]
    Service["Service"]
  end

  subgraph Resources["Kubernetes Ressourcen"]
    RS["ReplicaSet"]
    Pods["Pods"]
    Endpoints["Endpoints"]
  end

  Deployment -->|"erstellt"| RS
  RS -->|"verwaltet"| Pods
  Service -->|"selector"| Pods
  Service -->|"aktualisiert"| Endpoints

  style Manifest fill:#3b82f6,stroke:#1d4ed8
`,

  examTasks: [
    {
      id: 'kubernetes-task',
      title: 'Container & Kubernetes',
      points: 20,
      context: (
        <div className="space-y-4">
          <p>Gegeben ist folgendes Kubernetes-Manifest:</p>
          <pre className="p-3 bg-slate-800 rounded-lg font-mono text-xs overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web-container
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport-service
spec:
  selector:
    app: web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30080
  type: NodePort`}
          </pre>
        </div>
      ),
      parts: [
        {
          id: 'k8s-a',
          type: 'free-text',
          question: 'In welchem Zusammenhang stehen Container und Kubernetes? Was sind in diesem Zusammenhang Nodes und Pods?',
          placeholder: 'Kubernetes orchestriert Container...',
          modelAnswer: 'Kubernetes orchestriert Container - es startet, überwacht und steuert containerisierte Anwendungen, um eine komplexe verteilte Applikation zu betreiben. Nodes sind physische oder virtuelle Rechner im Cluster, die über das Netzwerk verbunden sind. Pods bestehen aus einem oder mehreren Containern, die logisch zusammengehören. Kubernetes verteilt Pods optimal auf die Nodes des Clusters.',
          keyPoints: [
            'Kubernetes orchestriert Container',
            'Nodes sind Rechner im Cluster',
            'Pods enthalten Container',
            'Verteilung auf Nodes',
          ],
          explanation: 'Kubernetes abstrahiert die Infrastruktur und verwaltet Container automatisch.',
        },
        {
          id: 'k8s-b',
          type: 'free-text',
          question: 'Skizzieren Sie das entstehende System, wenn wir das Manifest K8s zur Anwendung übergeben. Beschreiben Sie die Komponenten und ihre Beziehungen.',
          placeholder: 'Deployment -> ReplicaSet -> ...',
          modelAnswer: `Das System besteht aus:
- 1 Deployment "my-web-app" das ein ReplicaSet erstellt
- 1 ReplicaSet das 2 Pods verwaltet (replicas: 2)
- 2 Pods mit je einem nginx-Container (Port 80)
- 1 NodePort Service der auf Port 30080 von außen erreichbar ist
- Der Service verbindet sich über selector "app: web" mit den Pods
- Traffic von außen: Node:30080 → Service:80 → Pod:80`,
          keyPoints: [
            'Deployment erstellt ReplicaSet',
            '2 Pods wegen replicas: 2',
            'Service mit NodePort 30080',
            'Selector verbindet Service mit Pods',
          ],
          explanation: 'Deployment → ReplicaSet → Pods ist die typische Hierarchie. Der Service macht die Pods erreichbar.',
        },
        {
          id: 'k8s-c',
          type: 'free-text',
          question: 'Wozu dient der Service? Warum stellen wir die Anfragen nicht direkt an die Container mit den Webservern?',
          placeholder: 'Die Container sind Pods, die von Kubernetes...',
          modelAnswer: 'Container in Pods werden von Kubernetes dynamisch verwaltet - sie werden skaliert, neu gestartet nach Absturz etc. Dadurch ändern sich ihre IP-Adressen im Laufe des Betriebs. Die Pod-IPs sind außerdem nur cluster-intern erreichbar. Ein Service bietet einen stabilen Endpunkt: Der NodePort öffnet Port 30080 nach außen. So können wir nginx nutzen ohne uns um den Zustand der einzelnen Pods zu kümmern - Kubernetes stellt sicher, dass passende Pods verfügbar sind.',
          keyPoints: [
            'Pods sind kurzlebig, IPs ändern sich',
            'Pod-IPs nur cluster-intern',
            'Service bietet stabilen Endpunkt',
            'NodePort öffnet Port nach außen',
          ],
          explanation: 'Services abstrahieren die dynamische Natur von Pods und bieten stabile Netzwerk-Endpunkte.',
        },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        id: 'k8s-manifest-fields',
        type: 'multi-select',
        question: 'Welche Felder sind in jedem Kubernetes-Manifest Pflicht? (Mehrere Antworten)',
        options: [
          'apiVersion',
          'kind',
          'metadata',
          'spec',
          'status',
          'replicas',
        ],
        correctAnswer: ['apiVersion', 'kind', 'metadata', 'spec'],
        explanation:
          'Jedes Manifest braucht apiVersion (API-Gruppe), kind (Ressourcentyp), metadata (mindestens name) und spec (gewünschter Zustand). "status" wird von Kubernetes verwaltet, "replicas" gehört in die spec.',
      },
      {
        id: 'k8s-deployment-vs-service',
        type: 'multiple-choice',
        question: 'Was ist der Hauptunterschied zwischen Deployment und Service?',
        options: [
          'Deployment verwaltet Pods, Service bietet Netzwerk-Endpunkte',
          'Service verwaltet Pods, Deployment bietet Netzwerk-Endpunkte',
          'Deployment ist für Datenbanken, Service für APIs',
          'Es gibt keinen Unterschied, beide können austauschbar verwendet werden',
        ],
        correctAnswer: 'Deployment verwaltet Pods, Service bietet Netzwerk-Endpunkte',
        explanation:
          'Ein Deployment kümmert sich um das Erstellen, Skalieren und Aktualisieren von Pods. Ein Service hingegen bietet einen stabilen Netzwerk-Endpunkt (IP + DNS), über den die Pods erreichbar sind.',
      },
      {
        id: 'k8s-label-selector',
        type: 'multiple-choice',
        question: 'Wie verbindet ein Service die richtigen Pods?',
        options: [
          'Über Label Selektoren - der selector muss mit den Pod-Labels übereinstimmen',
          'Über den Namen - Service und Pods müssen gleich heißen',
          'Über die IP-Adresse - der Service kennt alle Pod-IPs',
          'Automatisch - Kubernetes verbindet alles im gleichen Namespace',
        ],
        correctAnswer: 'Über Label Selektoren - der selector muss mit den Pod-Labels übereinstimmen',
        explanation:
          'Services nutzen Label Selektoren (z.B. selector.app: my-app), um Pods zu finden. Alle Pods mit dem passenden Label (labels.app: my-app) werden vom Service erfasst und erhalten Traffic.',
      },
      {
        id: 'k8s-system-builder',
        type: 'system-builder',
        question: 'Baue das Diagramm, das durch dieses Deployment-Manifest entsteht:',
        manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.21`,
        expectedNodes: [
          { type: 'Deployment', count: 1 },
          { type: 'ReplicaSet', count: 1 },
          { type: 'Pod', count: 2 },
        ],
        expectedEdges: [
          { from: 'Deployment', to: 'ReplicaSet' },
          { from: 'ReplicaSet', to: 'Pod' },
        ],
        availableComponents: ['Pod', 'Service', 'Deployment', 'ReplicaSet', 'Container'],
        explanation:
          'Ein Deployment mit replicas: 2 erstellt ein ReplicaSet, das wiederum 2 Pods verwaltet. Das Deployment -> ReplicaSet -> Pods ist die typische Hierarchie.',
      },
    ],
  },
}
