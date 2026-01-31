// src/content/web-technologies/index.ts
import type { Course } from '@/core/types/content'
import { httpTopic } from './topics/http'
import { jsonTopic } from './topics/json'
import { htmlTopic } from './topics/html'
import { cssTopic } from './topics/css'
import { javascriptDomTopic } from './topics/javascript-dom'
import { restTopic } from './topics/rest'
import { kubernetesBegriffeTopic } from './topics/kubernetes-begriffe'
import { kubernetesManifestsTopic } from './topics/kubernetes-manifests'
import { kubernetesNetzwerkTopic } from './topics/kubernetes-netzwerk'
import { dnsTlsTopic } from './topics/dns-tls'
import { playlistAppTopic } from './topics/playlist-app'

export const webTechnologiesCourse: Course = {
  id: 'web-technologies',
  title: 'Web Technologies',
  description: 'HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS',
  topics: [
    httpTopic,
    jsonTopic,
    htmlTopic,
    cssTopic,
    javascriptDomTopic,
    restTopic,
    kubernetesBegriffeTopic,
    kubernetesManifestsTopic,
    kubernetesNetzwerkTopic,
    dnsTlsTopic,
    playlistAppTopic,
  ],
}
