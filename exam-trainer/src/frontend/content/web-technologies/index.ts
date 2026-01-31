// src/content/web-technologies/index.ts
import type { Course } from '@/core/types/content'
import { httpTopic } from './topics/http'
import { jsonTopic } from './topics/json'
import { htmlTopic } from './topics/html'
import { cssTopic } from './topics/css'
import { javascriptDomTopic } from './topics/javascript-dom'
import { browserRenderingTopic } from './topics/browser-rendering'
import { restTopic } from './topics/rest'
import { dockerBasicsTopic } from './topics/docker-basics'
import { kubernetesBegriffeTopic } from './topics/kubernetes-begriffe'
import { kubernetesManifestsTopic } from './topics/kubernetes-manifests'
import { kubernetesNetzwerkTopic } from './topics/kubernetes-netzwerk'
import { dnsTlsTopic } from './topics/dns-tls'
import { playlistAppTopic } from './topics/playlist-app'

export const webTechnologiesCourse: Course = {
  id: 'web-technologies',
  title: 'Web Technologies',
  description: 'HTTP, JSON, HTML, CSS, JavaScript, REST, Docker, Kubernetes, DNS/TLS',
  examFocus: [
    {
      title: 'Prüfungssimulation üben',
      description: 'Die echte Klausur hat mehrteilige Aufgaben (20-30 Punkte). Übe den Exam-Modus, nicht nur einzelne Quiz-Fragen.',
    },
    {
      title: 'DOM-Baum zeichnen können',
      description: 'Aufgabe 3 = 30 Punkte! Pattern: getElementById → forEach → createElement → innerHTML → appendChild',
    },
    {
      title: 'HTTP-Request schreiben',
      description: 'Vollständige Requests von Hand schreiben: Request-Line + Headers + Leerzeile + Body',
    },
    {
      title: 'K8s Manifest → Diagramm',
      description: 'YAML lesen und System-Architektur skizzieren. Du musst keine Manifests schreiben, nur lesen!',
    },
  ],
  topics: [
    httpTopic,
    jsonTopic,
    htmlTopic,
    cssTopic,
    javascriptDomTopic,
    browserRenderingTopic,
    restTopic,
    dockerBasicsTopic,
    kubernetesBegriffeTopic,
    kubernetesManifestsTopic,
    kubernetesNetzwerkTopic,
    dnsTlsTopic,
    playlistAppTopic,
  ],
}
