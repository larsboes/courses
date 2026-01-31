// src/content/web-technologies/topics/kubernetes-netzwerk.tsx
import type { Topic } from '@/core/types/content'
import { K8sNetworkDiagram } from '../diagrams/K8sNetworkDiagram'
import { K8sServiceTypesViz } from '../diagrams/K8sServiceTypesViz'

export const kubernetesNetzwerkTopic: Topic = {
  id: 'kubernetes-netzwerk',
  title: 'Kubernetes Netzwerk',
  description: 'Services, Ingress, DNS und Pod-Kommunikation',
  examNotes: 'Service-Typen und Ingress verstehen',

  sections: [
    {
      id: 'overview',
      title: 'Ueberblick',
      content: (
        <div className="space-y-4">
          <p>
            Das Kubernetes <strong>Networking Model</strong> basiert auf einigen wichtigen
            Grundprinzipien:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              Jeder <strong>Pod</strong> erhaelt eine eigene IP-Adresse
            </li>
            <li>
              Pods koennen <strong>direkt</strong> miteinander kommunizieren (ohne NAT)
            </li>
            <li>
              <strong>Services</strong> bieten stabile Endpunkte fuer Pods
            </li>
            <li>
              <strong>Ingress</strong> ermoeglicht externen HTTP/HTTPS-Zugriff
            </li>
          </ul>
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <p className="text-blue-300">
              <strong>Wichtig:</strong> Pods sind kurzlebig und koennen jederzeit neu erstellt
              werden. Daher sollte man nie direkt auf Pod-IPs zugreifen, sondern immer Services
              verwenden.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'services',
      title: 'Services',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Service</strong> ist eine Abstraktion, die einen stabilen Netzwerk-Endpunkt
            fuer eine Gruppe von Pods bereitstellt. Es gibt verschiedene Service-Typen:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3">Typ</th>
                  <th className="text-left py-2 px-3">Beschreibung</th>
                  <th className="text-left py-2 px-3">Zugriff</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-blue-400">ClusterIP</td>
                  <td className="py-2 px-3">Standard, interne IP im Cluster</td>
                  <td className="py-2 px-3">Nur intern</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-green-400">NodePort</td>
                  <td className="py-2 px-3">Oeffnet Port auf allen Nodes</td>
                  <td className="py-2 px-3">Extern via NodeIP:Port</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-amber-400">LoadBalancer</td>
                  <td className="py-2 px-3">Cloud Load Balancer</td>
                  <td className="py-2 px-3">Extern via externe IP</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-purple-400">ExternalName</td>
                  <td className="py-2 px-3">DNS CNAME zu externem Service</td>
                  <td className="py-2 px-3">Intern (Weiterleitung)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm">
            Hinweis: LoadBalancer baut auf NodePort auf, NodePort baut auf ClusterIP auf.
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: K8sNetworkDiagram,
      },
    },
    {
      id: 'ingress',
      title: 'Ingress',
      content: (
        <div className="space-y-4">
          <p>
            Ein <strong>Ingress</strong> ist ein API-Objekt, das HTTP(S)-Routing von ausserhalb des
            Clusters zu Services ermoeglicht. Es bietet:
          </p>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-xl">🔀</span>
              <div>
                <div className="font-medium text-slate-200">Path-basiertes Routing</div>
                <div className="text-sm text-slate-400">
                  /api/* → API-Service, /web/* → Frontend-Service
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-xl">🌐</span>
              <div>
                <div className="font-medium text-slate-200">Host-basiertes Routing</div>
                <div className="text-sm text-slate-400">
                  api.example.com → API, app.example.com → Frontend
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-xl">🔐</span>
              <div>
                <div className="font-medium text-slate-200">TLS-Terminierung</div>
                <div className="text-sm text-slate-400">
                  HTTPS am Ingress, HTTP intern im Cluster
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
            <p className="text-amber-300">
              <strong>Ingress Controller erforderlich:</strong> Ein Ingress-Objekt allein macht
              nichts. Es braucht einen Controller wie nginx-ingress oder traefik, der die Regeln
              umsetzt.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'dns',
      title: 'DNS',
      content: (
        <div className="space-y-4">
          <p>
            Kubernetes hat ein integriertes <strong>DNS-System</strong> (meist CoreDNS) fuer
            Service Discovery. Jeder Service erhaelt automatisch einen DNS-Namen:
          </p>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 font-mono text-sm">
            <div className="text-green-400">
              # Vollstaendiger DNS-Name (FQDN)
            </div>
            <div className="text-slate-300 mb-3">
              service-name.namespace.svc.cluster.local
            </div>
            <div className="text-green-400"># Kurzformen</div>
            <div className="text-slate-300">
              service-name.namespace{' '}
              <span className="text-slate-500"># Aus anderem Namespace</span>
            </div>
            <div className="text-slate-300">
              service-name <span className="text-slate-500"># Im gleichen Namespace</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="font-medium text-blue-300 mb-2">Service DNS</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>
                  • <code className="text-blue-400">my-service.default.svc.cluster.local</code>
                </li>
                <li>• Loest zur ClusterIP auf</li>
                <li>• Automatisch fuer jeden Service</li>
              </ul>
            </div>
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-medium text-green-300 mb-2">Pod DNS (Headless)</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>
                  • <code className="text-green-400">pod-ip.namespace.pod.cluster.local</code>
                </li>
                <li>• Bei ClusterIP: None (Headless Service)</li>
                <li>• Direkter Zugriff auf einzelne Pods</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            Tipp: Verwende immer den Service-DNS-Namen statt IP-Adressen fuer zuverlaessige
            Kommunikation.
          </p>
        </div>
      ),
    },
    {
      id: 'service-types-viz',
      title: 'Service-Typen Visualizer',
      content: (
        <p>
          Vergleiche ClusterIP, NodePort und LoadBalancer interaktiv:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: K8sServiceTypesViz,
      },
    },
  ],

  relatedTopics: [
    { id: 'kubernetes-begriffe', title: 'K8s Begriffe', relationship: 'setzt voraus' },
    { id: 'kubernetes-manifests', title: 'K8s Manifests', relationship: 'Service Manifest' },
    { id: 'dns-tls', title: 'DNS/TLS', relationship: 'vertieft durch' },
  ],

  connectionDiagram: `
flowchart TB
  subgraph External["Extern"]
    User["User/Browser"]
    DNS["DNS"]
  end

  subgraph K8s["Kubernetes Cluster"]
    Ingress["Ingress\nController"]
    Service["Service"]
    Pods["Pods"]
  end

  User -->|"1. DNS Lookup"| DNS
  DNS -->|"2. IP"| User
  User -->|"3. HTTPS"| Ingress
  Ingress -->|"4. HTTP"| Service
  Service -->|"5. Round Robin"| Pods

  style Service fill:#3b82f6,stroke:#1d4ed8
`,

  quiz: {
    questions: [
      {
        id: 'k8s-service-types',
        type: 'multiple-choice',
        question:
          'Welcher Service-Typ stellt eine stabile interne IP bereit, ist aber NICHT von ausserhalb des Clusters erreichbar?',
        options: ['NodePort', 'ClusterIP', 'LoadBalancer', 'ExternalName'],
        correctAnswer: 'ClusterIP',
        explanation:
          'ClusterIP ist der Standard-Service-Typ und stellt eine interne Cluster-IP bereit. Er ist nur innerhalb des Clusters erreichbar. Fuer externen Zugriff braucht man NodePort oder LoadBalancer.',
      },
      {
        id: 'k8s-ingress-purpose',
        type: 'multiple-choice',
        question: 'Wofuer wird ein Ingress in Kubernetes hauptsaechlich verwendet?',
        options: [
          'Um Pods auf verschiedene Nodes zu verteilen',
          'Um HTTP/HTTPS-Traffic von aussen zum richtigen Service zu routen',
          'Um Container-Images herunterzuladen',
          'Um den Cluster-Zustand in etcd zu speichern',
        ],
        correctAnswer:
          'Um HTTP/HTTPS-Traffic von aussen zum richtigen Service zu routen',
        explanation:
          'Ingress ermoeglicht es, HTTP/HTTPS-Anfragen von ausserhalb des Clusters basierend auf Host oder Path an verschiedene Services weiterzuleiten. Es bietet auch TLS-Terminierung.',
      },
      {
        id: 'k8s-pod-communication',
        type: 'multiple-choice',
        question: 'Wie koennen Pods im gleichen Kubernetes Cluster miteinander kommunizieren?',
        options: [
          'Pods koennen nur ueber externe Load Balancer kommunizieren',
          'Jeder Pod hat eine eigene IP, Pods koennen direkt kommunizieren',
          'Pods muessen immer auf dem gleichen Node sein, um zu kommunizieren',
          'Kommunikation zwischen Pods ist nicht moeglich',
        ],
        correctAnswer: 'Jeder Pod hat eine eigene IP, Pods koennen direkt kommunizieren',
        explanation:
          'Im Kubernetes Networking Model erhaelt jeder Pod eine eigene IP-Adresse. Pods koennen direkt miteinander kommunizieren, egal auf welchem Node sie laufen. Es gibt kein NAT zwischen Pods.',
      },
    ],
  },
}
