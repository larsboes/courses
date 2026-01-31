// src/content/web-technologies/topics/kubernetes-begriffe.tsx
import type { Topic } from '@/core/types/content'
import { K8sComponentsDiagram } from '../diagrams/K8sComponentsDiagram'

export const kubernetesBegriffeTopic: Topic = {
  id: 'kubernetes-begriffe',
  title: 'Kubernetes Begriffe',
  description: 'Container-Orchestrierung: Pods, Nodes, Deployments, ConfigMaps',
  examNotes: 'Kernkonzepte und Unterschiede verstehen',

  sections: [
    {
      id: 'overview',
      title: 'Ueberblick',
      content: (
        <div className="space-y-4">
          <p>
            <strong>Kubernetes</strong> (K8s) ist eine Open-Source-Plattform zur{' '}
            <strong>Container-Orchestrierung</strong>. Es automatisiert das Deployment,
            die Skalierung und das Management von containerisierten Anwendungen.
          </p>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-300 mb-2">Warum Kubernetes?</div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>Automatische Skalierung</strong> - Mehr Last = Mehr Container</li>
              <li><strong>Self-Healing</strong> - Ausgefallene Container werden ersetzt</li>
              <li><strong>Rolling Updates</strong> - Zero-Downtime Deployments</li>
              <li><strong>Service Discovery</strong> - Automatisches Routing zu Services</li>
              <li><strong>Deklarative Konfiguration</strong> - Desired State in YAML</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'core-concepts',
      title: 'Kernkonzepte',
      content: (
        <p>
          Kubernetes organisiert Anwendungen in einer Hierarchie von Komponenten.
          Klicke auf die Bereiche im Diagramm fuer Details:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: K8sComponentsDiagram,
      },
    },
    {
      id: 'workloads',
      title: 'Workloads',
      content: (
        <div className="space-y-4">
          <p>
            <strong>Workloads</strong> sind Controller, die Pods verwalten und sicherstellen,
            dass der gewuenschte Zustand eingehalten wird:
          </p>
          <div className="grid gap-3">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-blue-400">Deployment</span>
                <span className="px-2 py-0.5 bg-blue-800 rounded text-xs">Am haeufigsten</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Verwaltet <strong>zustandslose</strong> Anwendungen</li>
                <li>Ermoeglicht <strong>Rolling Updates</strong> und <strong>Rollbacks</strong></li>
                <li>Definiert gewuenschte Anzahl von <strong>Replicas</strong></li>
                <li>Erstellt automatisch ein <strong>ReplicaSet</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
              <div className="font-bold text-green-400 mb-2">ReplicaSet</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Stellt sicher, dass eine bestimmte Anzahl von Pods laeuft</li>
                <li>Wird meist <strong>nicht direkt</strong> erstellt (via Deployment)</li>
                <li>Ersetzt ausgefallene Pods automatisch</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
              <div className="font-bold text-purple-400 mb-2">StatefulSet</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                <li>Fuer <strong>zustandsbehaftete</strong> Anwendungen (Datenbanken)</li>
                <li>Pods bekommen <strong>stabile Netzwerk-Identitaeten</strong></li>
                <li>Geordnetes Starten und Stoppen</li>
                <li>Persistente Volumes bleiben bei Pod-Neustart erhalten</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'configuration',
      title: 'Konfiguration',
      content: (
        <div className="space-y-4">
          <p>
            Kubernetes trennt Anwendungslogik von Konfiguration. Dafuer gibt es zwei
            wichtige Ressourcen:
          </p>
          <div className="grid gap-3">
            <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
              <div className="font-bold text-amber-400 mb-2">ConfigMap</div>
              <p className="text-slate-300 text-sm mb-2">
                Speichert <strong>nicht-sensible</strong> Konfigurationsdaten als Key-Value-Paare.
              </p>
              <div className="bg-slate-900 rounded p-3 font-mono text-xs">
                <div className="text-slate-500"># configmap.yaml</div>
                <div><span className="text-purple-400">apiVersion:</span> v1</div>
                <div><span className="text-purple-400">kind:</span> ConfigMap</div>
                <div><span className="text-purple-400">metadata:</span></div>
                <div>  <span className="text-purple-400">name:</span> app-config</div>
                <div><span className="text-purple-400">data:</span></div>
                <div>  <span className="text-green-400">DATABASE_HOST:</span> "db.example.com"</div>
                <div>  <span className="text-green-400">LOG_LEVEL:</span> "info"</div>
              </div>
            </div>
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-red-400">Secret</span>
                <span className="px-2 py-0.5 bg-red-800 rounded text-xs">Sensible Daten</span>
              </div>
              <p className="text-slate-300 text-sm mb-2">
                Speichert <strong>sensible</strong> Daten wie Passwoerter, API-Keys, Zertifikate.
              </p>
              <div className="bg-slate-900 rounded p-3 font-mono text-xs">
                <div className="text-slate-500"># secret.yaml</div>
                <div><span className="text-purple-400">apiVersion:</span> v1</div>
                <div><span className="text-purple-400">kind:</span> Secret</div>
                <div><span className="text-purple-400">metadata:</span></div>
                <div>  <span className="text-purple-400">name:</span> app-secrets</div>
                <div><span className="text-purple-400">type:</span> Opaque</div>
                <div><span className="text-purple-400">data:</span></div>
                <div>  <span className="text-red-400">DB_PASSWORD:</span> cGFzc3dvcmQxMjM= <span className="text-slate-500"># base64</span></div>
              </div>
              <div className="mt-2 p-2 bg-red-900/30 rounded text-xs text-red-300">
                Hinweis: Secrets sind nur base64-kodiert, nicht verschluesselt!
                Fuer echte Verschluesselung: Sealed Secrets, Vault, etc.
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 mt-4">
            <div className="text-sm font-medium text-slate-300 mb-2">Verwendung in Pods:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-sm">
              <li>Als <strong>Umgebungsvariablen</strong> injizieren</li>
              <li>Als <strong>Volumes</strong> mounten (Dateien)</li>
              <li>Aenderungen koennen <strong>automatisch</strong> uebernommen werden</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'k8s-pod-vs-container',
        type: 'multiple-choice',
        question: 'Was ist der Unterschied zwischen einem Pod und einem Container in Kubernetes?',
        options: [
          'Ein Pod ist die kleinste deploybare Einheit und kann mehrere Container enthalten, die sich Netzwerk und Storage teilen',
          'Pod und Container sind Synonyme fuer dasselbe Konzept',
          'Ein Container kann mehrere Pods enthalten',
          'Pods sind fuer Datenbanken, Container fuer Web-Anwendungen',
        ],
        correctAnswer:
          'Ein Pod ist die kleinste deploybare Einheit und kann mehrere Container enthalten, die sich Netzwerk und Storage teilen',
        explanation:
          'Ein Pod ist eine Abstraktion ueber Container. Er kann einen oder mehrere Container enthalten, die sich dieselbe IP-Adresse und denselben Storage teilen. Container im selben Pod koennen ueber localhost kommunizieren. Das Sidecar-Pattern nutzt z.B. mehrere Container in einem Pod.',
      },
      {
        id: 'k8s-deployment-purpose',
        type: 'multiple-choice',
        question: 'Welchen Hauptzweck erfuellt ein Deployment in Kubernetes?',
        options: [
          'Verwaltung von zustandslosen Anwendungen mit Rolling Updates, Rollbacks und automatischer Skalierung',
          'Speicherung von Konfigurationsdaten als Key-Value-Paare',
          'Verwaltung von persistenten Volumes fuer Datenbanken',
          'Routing von externem Traffic zu Services',
        ],
        correctAnswer:
          'Verwaltung von zustandslosen Anwendungen mit Rolling Updates, Rollbacks und automatischer Skalierung',
        explanation:
          'Ein Deployment ist der Standard-Controller fuer zustandslose Anwendungen. Es verwaltet ReplicaSets und ermoeglicht deklarative Updates: Man definiert den gewuenschten Zustand (z.B. 3 Replicas von nginx:1.21), und Kubernetes sorgt dafuer, dass dieser Zustand erreicht und gehalten wird.',
      },
      {
        id: 'k8s-configmap-vs-secret',
        type: 'multiple-choice',
        question: 'Was ist der Hauptunterschied zwischen ConfigMap und Secret?',
        options: [
          'ConfigMap ist fuer nicht-sensible Konfiguration, Secret fuer sensible Daten wie Passwoerter (aber nur base64-kodiert, nicht verschluesselt)',
          'ConfigMap speichert Dateien, Secret speichert nur Strings',
          'Secret ist verschluesselt, ConfigMap nicht',
          'ConfigMap ist nur fuer Entwicklung, Secret nur fuer Produktion',
        ],
        correctAnswer:
          'ConfigMap ist fuer nicht-sensible Konfiguration, Secret fuer sensible Daten wie Passwoerter (aber nur base64-kodiert, nicht verschluesselt)',
        explanation:
          'ConfigMaps sind fuer allgemeine Konfiguration (URLs, Feature Flags, etc.). Secrets sind fuer sensible Daten gedacht, werden aber standardmaessig nur base64-kodiert - nicht verschluesselt! Fuer echte Verschluesselung braucht man zusaetzliche Tools wie Sealed Secrets oder HashiCorp Vault.',
      },
    ],
  },
}
