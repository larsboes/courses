// src/core/data/k8s-glossary.ts
import type { K8sGlossary, TermCategory, GlossaryTerm, Comparison, RequestScenario } from '@/core/types/glossary'

export const k8sGlossary: K8sGlossary = {
  categories: [
    { id: 'core', label: 'Core' },
    { id: 'networking', label: 'Networking' },
    { id: 'storage', label: 'Storage' },
    { id: 'workloads', label: 'Workloads' },
    { id: 'web', label: 'Web Technologies' },
  ],
  terms: [
    // Core
    {
      id: 'cluster',
      term: 'Cluster',
      definition: 'Eine Gruppe von Nodes, die Container-Workloads ausführen.',
      details: 'Ein Kubernetes-Cluster besteht aus mindestens einem Control Plane und Worker Nodes. Der Control Plane verwaltet den Cluster-Zustand.',
      category: 'core',
      related: ['node', 'pod'],
      examRelevance: 'high',
    },
    {
      id: 'node',
      term: 'Node',
      definition: 'Ein Rechner (physisch oder virtuell) im Kubernetes-Cluster.',
      details: 'Jeder Node hat eine Node-IP und führt kubelet, Container Runtime und kube-proxy aus. Nodes können Worker oder Control Plane sein.',
      category: 'core',
      related: ['cluster', 'pod', 'node-ip'],
      examRelevance: 'high',
    },
    {
      id: 'pod',
      term: 'Pod',
      definition: 'Kleinste deploybare Einheit in Kubernetes. Enthält einen oder mehrere Container.',
      details: 'Container im selben Pod teilen sich Netzwerk (localhost) und Storage. Pods sind ephemer - sie können jederzeit neu erstellt werden.',
      category: 'core',
      related: ['container', 'deployment', 'cluster-ip'],
      examRelevance: 'high',
    },
    {
      id: 'container',
      term: 'Container',
      definition: 'Isolierte Laufzeitumgebung für eine Anwendung, basierend auf einem Image.',
      details: 'Container teilen sich den Kernel des Host-Systems, haben aber isolierte Prozesse, Netzwerk und Dateisystem.',
      category: 'core',
      related: ['pod', 'image'],
      examRelevance: 'medium',
    },
    {
      id: 'namespace',
      term: 'Namespace',
      definition: 'Logische Trennung von Ressourcen innerhalb eines Clusters.',
      details: 'Namespaces ermöglichen Multi-Tenancy. Standard-Namespaces: default, kube-system, kube-public.',
      category: 'core',
      related: ['cluster'],
      examRelevance: 'medium',
    },

    // Networking
    {
      id: 'service',
      term: 'Service',
      definition: 'Stabile Netzwerkadresse für eine Gruppe von Pods.',
      details: 'Services bieten Load Balancing und Service Discovery. Sie selektieren Pods über Labels.',
      category: 'networking',
      related: ['pod', 'cluster-ip', 'nodeport', 'loadbalancer'],
      examRelevance: 'high',
    },
    {
      id: 'cluster-ip',
      term: 'ClusterIP',
      definition: 'Interne IP-Adresse eines Services, nur innerhalb des Clusters erreichbar.',
      details: 'Standard-Service-Typ. Die ClusterIP ist stabil, auch wenn die dahinterliegenden Pods wechseln.',
      category: 'networking',
      related: ['service', 'node-ip', 'nodeport'],
      examRelevance: 'high',
    },
    {
      id: 'node-ip',
      term: 'Node-IP',
      definition: 'Die externe IP-Adresse eines Nodes im Cluster.',
      details: 'Node-IPs sind von außerhalb des Clusters erreichbar. NodePort-Services binden an diese IP.',
      category: 'networking',
      related: ['node', 'nodeport', 'cluster-ip'],
      examRelevance: 'high',
    },
    {
      id: 'nodeport',
      term: 'NodePort',
      definition: 'Service-Typ, der einen Port auf jedem Node öffnet für externen Zugriff.',
      details: 'Port-Range: 30000-32767. Erreichbar über NodeIP:NodePort. Leitet zu ClusterIP weiter.',
      category: 'networking',
      related: ['service', 'node-ip', 'cluster-ip', 'loadbalancer'],
      examRelevance: 'high',
    },
    {
      id: 'loadbalancer',
      term: 'LoadBalancer',
      definition: 'Service-Typ, der einen externen Load Balancer provisioniert.',
      details: 'Nur in Cloud-Umgebungen verfügbar. Erstellt automatisch NodePort und ClusterIP.',
      category: 'networking',
      related: ['service', 'nodeport', 'ingress'],
      examRelevance: 'medium',
    },
    {
      id: 'ingress',
      term: 'Ingress',
      definition: 'HTTP/HTTPS-Routing von außen zu Services im Cluster.',
      details: 'Ermöglicht URL-basiertes Routing, SSL-Termination und Virtual Hosts. Benötigt Ingress Controller.',
      category: 'networking',
      related: ['service', 'loadbalancer'],
      examRelevance: 'medium',
    },
    {
      id: 'kube-proxy',
      term: 'kube-proxy',
      definition: 'Netzwerk-Proxy auf jedem Node, der Service-Traffic zu Pods routet.',
      details: 'Implementiert die Service-Abstraktion mittels iptables oder IPVS Regeln.',
      category: 'networking',
      related: ['service', 'node', 'cluster-ip'],
      examRelevance: 'medium',
    },
    {
      id: 'coredns',
      term: 'CoreDNS',
      definition: 'DNS-Server im Cluster für Service Discovery.',
      details: 'Löst Service-Namen auf: my-service.namespace.svc.cluster.local → ClusterIP.',
      category: 'networking',
      related: ['service', 'cluster-ip'],
      examRelevance: 'high',
    },

    // Storage
    {
      id: 'volume',
      term: 'Volume',
      definition: 'Speicher, der an einen Pod angehängt wird.',
      details: 'Volumes überleben Container-Neustarts, aber nicht Pod-Neustarts (außer PersistentVolumes).',
      category: 'storage',
      related: ['pod', 'persistent-volume', 'pvc'],
      examRelevance: 'high',
    },
    {
      id: 'persistent-volume',
      term: 'PersistentVolume (PV)',
      definition: 'Cluster-weite Speicherressource, unabhängig von Pods.',
      details: 'PVs werden vom Admin bereitgestellt. Sie haben einen Lifecycle unabhängig von Pods.',
      category: 'storage',
      related: ['pvc', 'volume', 'storage-class'],
      examRelevance: 'high',
    },
    {
      id: 'pvc',
      term: 'PersistentVolumeClaim (PVC)',
      definition: 'Anforderung eines Pods an Speicher (Größe, Access Mode).',
      details: 'PVCs werden an passende PVs gebunden. Pods referenzieren PVCs, nicht PVs direkt.',
      category: 'storage',
      related: ['persistent-volume', 'pod', 'storage-class'],
      examRelevance: 'high',
    },
    {
      id: 'storage-class',
      term: 'StorageClass',
      definition: 'Definiert Speicher-Typen für dynamische PV-Provisionierung.',
      details: 'Ermöglicht automatische PV-Erstellung wenn ein PVC erstellt wird.',
      category: 'storage',
      related: ['persistent-volume', 'pvc'],
      examRelevance: 'low',
    },

    // Workloads
    {
      id: 'deployment',
      term: 'Deployment',
      definition: 'Deklarative Definition des gewünschten Pod-Zustands.',
      details: 'Verwaltet ReplicaSets für Rolling Updates. Definiert replicas, image, resources.',
      category: 'workloads',
      related: ['pod', 'replicaset', 'rollout'],
      examRelevance: 'high',
    },
    {
      id: 'replicaset',
      term: 'ReplicaSet',
      definition: 'Stellt sicher, dass eine bestimmte Anzahl von Pod-Replicas läuft.',
      details: 'Wird normalerweise nicht direkt erstellt, sondern von Deployments verwaltet.',
      category: 'workloads',
      related: ['deployment', 'pod'],
      examRelevance: 'medium',
    },
    {
      id: 'daemonset',
      term: 'DaemonSet',
      definition: 'Stellt sicher, dass auf jedem Node ein Pod läuft.',
      details: 'Nützlich für Node-Agents wie Log-Collector oder Monitoring.',
      category: 'workloads',
      related: ['pod', 'node'],
      examRelevance: 'low',
    },
    {
      id: 'statefulset',
      term: 'StatefulSet',
      definition: 'Wie Deployment, aber für stateful Anwendungen mit stabilen Identitäten.',
      details: 'Pods bekommen stabile Hostnamen (pod-0, pod-1, ...) und persistenten Speicher.',
      category: 'workloads',
      related: ['deployment', 'pvc'],
      examRelevance: 'low',
    },
    {
      id: 'labels',
      term: 'Labels',
      definition: 'Key-Value-Paare zur Organisation und Selektion von Ressourcen.',
      details: 'Services und Deployments nutzen Label-Selektoren um Pods zu finden.',
      category: 'core',
      related: ['pod', 'service', 'deployment'],
      examRelevance: 'high',
    },
    {
      id: 'manifest',
      term: 'Manifest',
      definition: 'YAML-Datei, die den gewünschten Zustand einer Ressource beschreibt.',
      details: 'Enthält apiVersion, kind, metadata und spec. Wird mit kubectl apply angewendet.',
      category: 'core',
      related: ['deployment', 'service', 'pod'],
      examRelevance: 'high',
    },

    // Web Technologies
    {
      id: 'browser',
      term: 'Browser',
      definition: 'Client-Anwendung, die HTTP-Requests sendet und HTML/CSS/JS rendert.',
      details: 'Der Browser durchläuft die Rendering Pipeline: HTML→DOM, CSS→CSSOM, Render Tree, Layout, Paint.',
      category: 'web',
      related: ['http-request', 'dns-resolver'],
      examRelevance: 'high',
    },
    {
      id: 'dns-resolver',
      term: 'DNS Resolver',
      definition: 'Server, der Domainnamen in IP-Adressen auflöst.',
      details: 'Hierarchische Auflösung: Root → TLD → Authoritative NS. Ergebnisse werden gecacht (TTL).',
      category: 'web',
      related: ['browser', 'coredns'],
      examRelevance: 'high',
    },
    {
      id: 'tls-handshake',
      term: 'TLS Handshake',
      definition: 'Protokoll zum Aufbau einer verschlüsselten Verbindung.',
      details: 'ClientHello → ServerHello → Zertifikat → Key Exchange → Finished. TLS 1.3: 1-RTT.',
      category: 'web',
      related: ['browser', 'http-request'],
      examRelevance: 'high',
    },
    {
      id: 'http-request',
      term: 'HTTP Request',
      definition: 'Anfrage vom Client an den Server mit Methode, URL und Headers.',
      details: 'Aufbau: Request-Line (GET /path HTTP/1.1), Headers, optionaler Body.',
      category: 'web',
      related: ['browser', 'rest-api'],
      examRelevance: 'high',
    },
    {
      id: 'rest-api',
      term: 'REST API',
      definition: 'Architekturstil für Web-APIs basierend auf HTTP-Methoden und Ressourcen.',
      details: 'CRUD-Mapping: POST=Create, GET=Read, PUT=Update, DELETE=Delete. Zustandslos.',
      category: 'web',
      related: ['http-request', 'flask-app'],
      examRelevance: 'high',
    },
    {
      id: 'flask-app',
      term: 'Flask App',
      definition: 'Python-Webframework, das die REST API der Playlist-App implementiert.',
      details: 'Definiert Routes mit Decorators (@app.route), verarbeitet JSON-Requests.',
      category: 'web',
      related: ['rest-api', 'database'],
      examRelevance: 'medium',
    },
    {
      id: 'database',
      term: 'Datenbank (CouchDB)',
      definition: 'Persistenter Datenspeicher für die Playlist-App.',
      details: 'CouchDB ist eine NoSQL-Datenbank, die JSON-Dokumente speichert. Erreichbar über HTTP-API.',
      category: 'web',
      related: ['flask-app', 'persistent-volume'],
      examRelevance: 'medium',
    },
  ],

  comparisons: [
    {
      id: 'clusterip-vs-nodeport',
      items: ['cluster-ip', 'nodeport'],
      differences: [
        'ClusterIP ist nur intern erreichbar, NodePort von außen',
        'NodePort öffnet einen Port (30000-32767) auf jedem Node',
        'ClusterIP ist der Standard-Service-Typ',
        'NodePort erstellt automatisch auch eine ClusterIP',
      ],
      commonConfusion: 'Beide bieten stabile IPs, aber ClusterIP ist NUR aus dem Cluster erreichbar.',
    },
    {
      id: 'nodeport-vs-loadbalancer',
      items: ['nodeport', 'loadbalancer'],
      differences: [
        'NodePort erfordert Wissen der Node-IPs',
        'LoadBalancer bekommt eine externe IP automatisch',
        'LoadBalancer nur in Cloud-Umgebungen verfügbar',
        'LoadBalancer erstellt automatisch NodePort + ClusterIP',
      ],
      commonConfusion: 'LoadBalancer ist ein "erweiterter" NodePort mit automatischer externer IP.',
    },
    {
      id: 'pod-vs-container',
      items: ['pod', 'container'],
      differences: [
        'Ein Pod kann mehrere Container enthalten',
        'Container im Pod teilen Netzwerk (localhost)',
        'Container im Pod teilen Volumes',
        'Kubernetes scheduled Pods, nicht Container',
      ],
      commonConfusion: 'Pod ≠ Container. Ein Pod ist eine Gruppe von Containern mit shared resources.',
    },
    {
      id: 'deployment-vs-replicaset',
      items: ['deployment', 'replicaset'],
      differences: [
        'Deployment verwaltet ReplicaSets',
        'Deployment ermöglicht Rolling Updates',
        'ReplicaSet nur für Replica-Anzahl zuständig',
        'Nie ReplicaSet direkt erstellen, immer Deployment',
      ],
      commonConfusion: 'Deployment ist die höhere Abstraktion - verwende immer Deployment.',
    },
    {
      id: 'pv-vs-pvc',
      items: ['persistent-volume', 'pvc'],
      differences: [
        'PV ist die tatsächliche Speicherressource',
        'PVC ist die Anforderung/Request',
        'Admin erstellt PV, Developer erstellt PVC',
        'PVC wird an passendes PV gebunden',
      ],
      commonConfusion: 'Pods referenzieren PVC, nicht PV. PVC ist wie eine "Bestellung" für Speicher.',
    },
    {
      id: 'clusterip-vs-nodeip',
      items: ['cluster-ip', 'node-ip'],
      differences: [
        'ClusterIP ist virtuell, nur intern erreichbar',
        'Node-IP ist die echte Netzwerk-IP des Rechners',
        'ClusterIP gehört zu Services',
        'Node-IP gehört zu Nodes',
      ],
      commonConfusion: 'Komplett verschiedene Konzepte! ClusterIP = Service-intern, Node-IP = Rechner-extern.',
    },
    {
      id: 'service-vs-ingress',
      items: ['service', 'ingress'],
      differences: [
        'Service arbeitet auf L4 (TCP/UDP)',
        'Ingress arbeitet auf L7 (HTTP/HTTPS)',
        'Ingress ermöglicht URL-basiertes Routing',
        'Ingress kann SSL terminieren',
      ],
      commonConfusion: 'Ingress ist kein Service-Ersatz, sondern routet zu Services.',
    },
  ],

  scenarios: [
    {
      id: 'external-to-pod',
      title: 'External → Pod',
      description: 'Wie erreicht ein Request von außen einen Pod im Cluster?',
      steps: [
        {
          component: 'user',
          description: 'User sendet Request an NodeIP:NodePort (z.B. 192.168.1.10:30080)',
          highlight: ['node'],
        },
        {
          component: 'node-ip',
          description: 'Request erreicht Node über dessen externe IP-Adresse',
          highlight: ['node', 'nodeport'],
        },
        {
          component: 'kube-proxy',
          description: 'kube-proxy fängt Traffic auf NodePort ab, leitet zu ClusterIP weiter',
          highlight: ['kube-proxy', 'service'],
        },
        {
          component: 'service',
          description: 'Service wählt einen Pod über Label-Selektor aus',
          highlight: ['service', 'labels'],
        },
        {
          component: 'cluster-ip',
          description: 'Traffic wird zur ClusterIP des Services geroutet',
          highlight: ['cluster-ip'],
        },
        {
          component: 'pod',
          description: 'Request erreicht Container im ausgewählten Pod',
          highlight: ['pod', 'container'],
        },
      ],
    },
    {
      id: 'pod-to-pod',
      title: 'Pod → Pod',
      description: 'Wie kommuniziert ein Pod mit einem anderen Pod?',
      steps: [
        {
          component: 'pod',
          description: 'Pod A will mit Service "backend" kommunizieren',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'Pod fragt CoreDNS: Was ist die IP von backend.default.svc.cluster.local?',
          highlight: ['coredns'],
        },
        {
          component: 'cluster-ip',
          description: 'CoreDNS antwortet mit der ClusterIP des backend-Service',
          highlight: ['cluster-ip', 'service'],
        },
        {
          component: 'kube-proxy',
          description: 'kube-proxy routet Traffic zur ClusterIP an einen Backend-Pod',
          highlight: ['kube-proxy'],
        },
        {
          component: 'pod',
          description: 'Request erreicht Pod B (einer der Backend-Pods)',
          highlight: ['pod'],
        },
      ],
    },
    {
      id: 'pod-to-external',
      title: 'Pod → External',
      description: 'Wie erreicht ein Pod das Internet?',
      steps: [
        {
          component: 'pod',
          description: 'Pod will externe API aufrufen (z.B. api.example.com)',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'CoreDNS löst externen DNS-Namen auf (oder leitet zu externem DNS)',
          highlight: ['coredns'],
        },
        {
          component: 'node',
          description: 'Traffic verlässt Pod über Node-Netzwerk',
          highlight: ['node'],
        },
        {
          component: 'nat',
          description: 'Source NAT: Pod-IP wird zu Node-IP übersetzt',
          highlight: ['node-ip'],
        },
        {
          component: 'external',
          description: 'Request erreicht externes Ziel mit Node-IP als Absender',
          highlight: [],
        },
      ],
    },
    {
      id: 'dns-resolution',
      title: 'DNS Resolution',
      description: 'Wie funktioniert Service Discovery via DNS?',
      steps: [
        {
          component: 'pod',
          description: 'Pod will "my-service" erreichen',
          highlight: ['pod'],
        },
        {
          component: 'coredns',
          description: 'Kubelet konfiguriert Pod DNS auf CoreDNS',
          highlight: ['coredns'],
        },
        {
          component: 'dns-query',
          description: 'DNS-Query: my-service → my-service.default.svc.cluster.local',
          highlight: ['coredns'],
        },
        {
          component: 'service',
          description: 'CoreDNS findet Service-Eintrag in seiner Datenbank',
          highlight: ['service'],
        },
        {
          component: 'cluster-ip',
          description: 'Antwort: ClusterIP des Services (z.B. 10.96.0.15)',
          highlight: ['cluster-ip'],
        },
        {
          component: 'pod',
          description: 'Pod kann jetzt die ClusterIP direkt ansprechen',
          highlight: ['pod', 'cluster-ip'],
        },
      ],
    },

    // Full-stack scenarios
    {
      id: 'browser-to-api',
      title: 'Browser → Playlist API',
      description: 'Vollständiger Request-Pfad: Vom Tippen der URL bis zur gerenderten Antwort.',
      diagramType: 'full-stack',
      steps: [
        {
          component: 'browser',
          description: 'User tippt playlist-app.example.com in die Adressleiste',
          highlight: ['browser'],
        },
        {
          component: 'dns-resolver',
          description: 'Browser fragt DNS-Resolver: Welche IP hat playlist-app.example.com?',
          highlight: ['dns-resolver', 'browser'],
        },
        {
          component: 'tls-handshake',
          description: 'TLS-Handshake: ClientHello → ServerHello → Zertifikat → Session Key',
          highlight: ['tls-handshake', 'browser'],
        },
        {
          component: 'http-request',
          description: 'Browser sendet GET /playlists HTTP/1.1 über die verschlüsselte Verbindung',
          highlight: ['http-request'],
        },
        {
          component: 'nodeport',
          description: 'Request erreicht Kubernetes-Cluster über NodePort 32000',
          highlight: ['nodeport', 'node'],
        },
        {
          component: 'service',
          description: 'Service routet Request zum Webserver-Pod (Label-Selector: app=webserver)',
          highlight: ['service', 'kube-proxy'],
        },
        {
          component: 'pod',
          description: 'Flask-Container im Pod verarbeitet den Request',
          highlight: ['pod', 'flask-app'],
        },
        {
          component: 'database',
          description: 'Flask-App fragt CouchDB über ClusterIP-Service ab',
          highlight: ['database', 'cluster-ip'],
        },
        {
          component: 'http-request',
          description: 'Server sendet HTTP Response: 200 OK mit JSON-Body zurück',
          highlight: ['http-request', 'pod'],
        },
        {
          component: 'browser',
          description: 'Browser rendert die Antwort: HTML→DOM, CSS→CSSOM, Render Tree, Layout, Paint',
          highlight: ['browser'],
        },
      ],
    },
    {
      id: 'create-playlist',
      title: 'Playlist erstellen',
      description: 'Was passiert, wenn der User auf "Create Playlist" klickt?',
      diagramType: 'full-stack',
      steps: [
        {
          component: 'browser',
          description: 'User klickt "Create Playlist" → click Event wird ausgelöst',
          highlight: ['browser'],
        },
        {
          component: 'browser',
          description: 'JavaScript Event Handler baut fetch()-Request: POST /playlists mit JSON-Body',
          highlight: ['browser', 'http-request'],
        },
        {
          component: 'http-request',
          description: 'POST /playlists HTTP/1.1, Content-Type: application/json, Body: {"name": "My Playlist", "tracks": []}',
          highlight: ['http-request'],
        },
        {
          component: 'service',
          description: 'K8s Service routet den POST-Request zum Flask-Pod',
          highlight: ['service', 'nodeport', 'pod'],
        },
        {
          component: 'flask-app',
          description: 'Flask-Route @app.route("/playlists", methods=["POST"]) verarbeitet den Request',
          highlight: ['flask-app', 'rest-api'],
        },
        {
          component: 'database',
          description: 'Flask speichert die Playlist in CouchDB (PUT /playlists/playlist:name)',
          highlight: ['database'],
        },
        {
          component: 'http-request',
          description: 'Server antwortet: 201 Created mit JSON-Bestätigung',
          highlight: ['http-request', 'flask-app'],
        },
        {
          component: 'browser',
          description: 'JavaScript empfängt Response, ruft fetchPlaylists() auf → DOM wird aktualisiert',
          highlight: ['browser'],
        },
      ],
    },
    {
      id: 'pod-crash-recovery',
      title: 'Pod Crash Recovery',
      description: 'Was passiert, wenn der Webserver-Pod abstürzt?',
      diagramType: 'full-stack',
      steps: [
        {
          component: 'pod',
          description: 'Der Webserver-Container stürzt ab (z.B. unbehandelte Exception)',
          highlight: ['pod'],
        },
        {
          component: 'node',
          description: 'kubelet auf dem Node erkennt: Container-Prozess beendet',
          highlight: ['node'],
        },
        {
          component: 'replicaset',
          description: 'ReplicaSet sieht: Ist-Zustand (1 Pod) ≠ Soll-Zustand (replicas: 3)',
          highlight: ['replicaset', 'deployment'],
        },
        {
          component: 'node',
          description: 'Scheduler wählt einen Node und erstellt neuen Pod',
          highlight: ['node', 'pod'],
        },
        {
          component: 'pod',
          description: 'kubelet zieht Image und startet neuen Container',
          highlight: ['pod', 'container'],
        },
        {
          component: 'service',
          description: 'Service aktualisiert Endpoints: neuer Pod wird in Routing aufgenommen',
          highlight: ['service', 'labels'],
        },
        {
          component: 'browser',
          description: 'User bemerkt nichts (bei replicas > 1 gab es keinen Ausfall)',
          highlight: ['browser'],
        },
      ],
    },
  ],
}

// Helper functions
export function getTermById(id: string): GlossaryTerm | undefined {
  return k8sGlossary.terms.find(t => t.id === id)
}

export function getTermsByCategory(category: TermCategory): GlossaryTerm[] {
  return k8sGlossary.terms.filter(t => t.category === category)
}

export function getComparisonById(id: string): Comparison | undefined {
  return k8sGlossary.comparisons.find(c => c.id === id)
}

export function getComparisonsForTerm(termId: string): Comparison[] {
  return k8sGlossary.comparisons.filter(c => c.items.includes(termId))
}

export function getScenarioById(id: string): RequestScenario | undefined {
  return k8sGlossary.scenarios.find(s => s.id === id)
}

export type { TermCategory, ExamRelevance } from '@/core/types/glossary'
