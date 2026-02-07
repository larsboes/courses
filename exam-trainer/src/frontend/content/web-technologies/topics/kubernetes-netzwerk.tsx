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
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Das Kubernetes <strong>Networking Model</strong> basiert auf einigen wichtigen
            Grundprinzipien:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              Jeder <strong>Pod</strong> erhält eine eigene IP-Adresse
            </li>
            <li>
              Pods können <strong>direkt</strong> miteinander kommunizieren (ohne NAT)
            </li>
            <li>
              <strong>Services</strong> bieten stabile Endpunkte für Pods
            </li>
            <li>
              <strong>Ingress</strong> ermöglicht externen HTTP/HTTPS-Zugriff
            </li>
          </ul>
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <p className="text-blue-300">
              <strong>Wichtig:</strong> Pods sind kurzlebig und können jederzeit neu erstellt
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
            für eine Gruppe von Pods bereitstellt. Es gibt verschiedene Service-Typen:
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
                  <td className="py-2 px-3">Öffnet Port auf allen Nodes</td>
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
            Ein <strong>Ingress</strong> ist ein API-Objekt, das HTTP(S)-Routing von außerhalb des
            Clusters zu Services ermöglicht. Es bietet:
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
            Kubernetes hat ein integriertes <strong>DNS-System</strong> (meist CoreDNS) für
            Service Discovery. Jeder Service erhält automatisch einen DNS-Namen:
          </p>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 font-mono text-sm">
            <div className="text-green-400">
              # Vollständiger DNS-Name (FQDN)
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
                <li>• Löst zur ClusterIP auf</li>
                <li>• Automatisch für jeden Service</li>
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
            Tipp: Verwende immer den Service-DNS-Namen statt IP-Adressen für zuverlässige
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
          'Welcher Service-Typ stellt eine stabile interne IP bereit, ist aber NICHT von außerhalb des Clusters erreichbar?',
        options: ['NodePort', 'ClusterIP', 'LoadBalancer', 'ExternalName'],
        correctAnswer: 'ClusterIP',
        explanation:
          'ClusterIP ist der Standard-Service-Typ und stellt eine interne Cluster-IP bereit. Er ist nur innerhalb des Clusters erreichbar. Für externen Zugriff braucht man NodePort oder LoadBalancer.',
      },
      {
        id: 'k8s-ingress-purpose',
        type: 'multiple-choice',
        question: 'Wofür wird ein Ingress in Kubernetes hauptsächlich verwendet?',
        options: [
          'Um Pods auf verschiedene Nodes zu verteilen',
          'Um HTTP/HTTPS-Traffic von außen zum richtigen Service zu routen',
          'Um Container-Images herunterzuladen',
          'Um den Cluster-Zustand in etcd zu speichern',
        ],
        correctAnswer:
          'Um HTTP/HTTPS-Traffic von außen zum richtigen Service zu routen',
        explanation:
          'Ingress ermöglicht es, HTTP/HTTPS-Anfragen von außerhalb des Clusters basierend auf Host oder Path an verschiedene Services weiterzuleiten. Es bietet auch TLS-Terminierung.',
      },
      {
        id: 'k8s-pod-communication',
        type: 'multiple-choice',
        question: 'Wie können Pods im gleichen Kubernetes Cluster miteinander kommunizieren?',
        options: [
          'Pods können nur über externe Load Balancer kommunizieren',
          'Jeder Pod hat eine eigene IP, Pods können direkt kommunizieren',
          'Pods müssen immer auf dem gleichen Node sein, um zu kommunizieren',
          'Kommunikation zwischen Pods ist nicht möglich',
        ],
        correctAnswer: 'Jeder Pod hat eine eigene IP, Pods können direkt kommunizieren',
        explanation:
          'Im Kubernetes Networking Model erhält jeder Pod eine eigene IP-Adresse. Pods können direkt miteinander kommunizieren, egal auf welchem Node sie laufen. Es gibt kein NAT zwischen Pods.',
      },
    ],
  },

  examTasks: [
    {
      id: 'k8s-networking-task',
      title: 'Kubernetes Networking',
      points: 20,
      context: (
        <p>
          Die Playlist-App ist in Kubernetes deployed. Der Webserver ist über einen
          NodePort-Service erreichbar, die CouchDB über einen ClusterIP-Service.
        </p>
      ),
      parts: [
        {
          id: 'k8s-net-a',
          type: 'free-text' as const,
          question: 'Beschreiben Sie den Weg eines HTTP-Requests von einem externen Browser bis zum Playlist-App Pod. Der Webserver ist über NodePort 32000 erreichbar.',
          placeholder: '1. Der Browser sendet...',
          modelAnswer: '1. Der Browser sendet den Request an die Node-IP und Port 32000 (z.B. http://192.168.1.10:32000).\n2. Der Request erreicht den Node über dessen externe IP-Adresse.\n3. kube-proxy auf dem Node fängt den Traffic auf Port 32000 ab.\n4. kube-proxy leitet den Request an die ClusterIP des webserver-Service weiter.\n5. Der Service wählt über seinen Label-Selector (app: webserver) einen der passenden Pods aus.\n6. Der Request wird an den ausgewählten Pod weitergeleitet.\n7. Der Container im Pod (Flask-App) verarbeitet den Request und sendet die Response zurück.',
          keyPoints: [
            'Node-IP + NodePort als Einstiegspunkt',
            'kube-proxy als Vermittler',
            'ClusterIP des Service',
            'Label-Selector für Pod-Auswahl',
            'Response-Pfad zurück',
          ],
          explanation: 'Das Verständnis des Request-Pfads ist zentral für K8s-Networking.',
        },
        {
          id: 'k8s-net-b',
          type: 'free-text' as const,
          question: 'Wie kommuniziert der Webserver-Pod mit dem CouchDB-Pod? Beschreiben Sie den Weg der Anfrage.',
          placeholder: '1. Der Webserver-Pod...',
          modelAnswer: '1. Der Webserver-Pod will die URL "couchdb:5984" erreichen.\n2. Der Pod fragt CoreDNS: "Was ist die IP von couchdb?" (automatisch erweitert zu couchdb.default.svc.cluster.local).\n3. CoreDNS antwortet mit der ClusterIP des couchdb-Service (z.B. 10.96.0.15).\n4. Der Pod sendet den Request an die ClusterIP.\n5. kube-proxy routet den Traffic zu einem der CouchDB-Pods (über den Label-Selector app: couchdb).\n6. Der CouchDB-Container empfängt den Request und antwortet.\n\nWichtig: Der Webserver verwendet den Service-Namen, nie eine direkte Pod-IP (da Pods kurzlebig sind).',
          keyPoints: [
            'Service-DNS-Name statt IP',
            'CoreDNS für Namensauflösung',
            'ClusterIP als stabiler Endpunkt',
            'kube-proxy für Pod-Routing',
            'Warum Service-Name statt Pod-IP',
          ],
          explanation: 'Service Discovery via DNS ist der Standard für Pod-zu-Pod-Kommunikation.',
        },
        {
          id: 'k8s-net-c',
          type: 'free-text' as const,
          question: 'Was ist CoreDNS und wie funktioniert Service Discovery in Kubernetes?',
          placeholder: 'CoreDNS ist...',
          modelAnswer: 'CoreDNS ist der integrierte DNS-Server in Kubernetes. Er ermöglicht Service Discovery, indem er automatisch DNS-Einträge für jeden Service erstellt.\n\nFunktionsweise:\n1. Wenn ein Service erstellt wird, registriert CoreDNS einen DNS-Eintrag.\n2. Der vollständige DNS-Name folgt dem Schema: service-name.namespace.svc.cluster.local\n3. Pods können Services über den Kurznamen ansprechen (z.B. "couchdb" im gleichen Namespace).\n4. CoreDNS löst den Namen zur ClusterIP des Service auf.\n5. Die Konfiguration erfolgt automatisch - Pods bekommen CoreDNS als DNS-Server durch kubelet.\n\nVorteil: Keine Hardcoded IPs nötig, Services sind über stabile Namen erreichbar.',
          keyPoints: [
            'CoreDNS als integrierter DNS-Server',
            'Automatische DNS-Einträge für Services',
            'DNS-Schema: service.namespace.svc.cluster.local',
            'Kurzname im gleichen Namespace möglich',
            'Automatische Konfiguration durch kubelet',
          ],
          explanation: 'Service Discovery ist ein Kernfeature von Kubernetes.',
        },
        {
          id: 'k8s-net-d',
          type: 'free-text' as const,
          question: 'Erklären Sie den Unterschied zwischen Node-IP, ClusterIP und Pod-IP. Wer vergibt jeweils die IP und von wo ist sie erreichbar?',
          placeholder: 'Node-IP: ...\nClusterIP: ...\nPod-IP: ...',
          modelAnswer: 'Node-IP: Die echte Netzwerk-IP des physischen/virtuellen Rechners. Wird vom Netzwerk/Cloud-Provider vergeben. Von überall erreichbar (extern + intern).\n\nClusterIP: Virtuelle IP eines Kubernetes-Service. Wird von Kubernetes automatisch vergeben (z.B. 10.96.0.x). Nur innerhalb des Clusters erreichbar. Stabil - ändert sich nicht, auch wenn Pods wechseln.\n\nPod-IP: IP-Adresse eines einzelnen Pods. Wird vom CNI-Plugin vergeben (z.B. 10.244.x.x). Nur innerhalb des Clusters erreichbar. Ephemer - ändert sich bei Pod-Neustart.\n\nMerke: NodeIP > ClusterIP > PodIP (von extern nach intern). Services abstrahieren die wechselnden Pod-IPs hinter einer stabilen ClusterIP.',
          keyPoints: [
            'Node-IP: extern erreichbar, vom Netzwerk vergeben',
            'ClusterIP: intern, von K8s vergeben, stabil',
            'Pod-IP: intern, vom CNI-Plugin vergeben, ephemer',
            'Hierarchie der Erreichbarkeit',
            'Service als Abstraktion über Pod-IPs',
          ],
          explanation: 'Das Verständnis der drei IP-Typen ist fundamental für K8s-Networking.',
        },
      ],
    },
  ],
}
