// src/content/web-technologies/index.ts
import type { Course } from '@/core/types/content'
import { httpTopic } from './topics/http'

export const webTechnologiesCourse: Course = {
  id: 'web-technologies',
  title: 'Web Technologies',
  description: 'HTTP, JSON, HTML, CSS, JavaScript, REST, Kubernetes, DNS/TLS',
  topics: [
    httpTopic,
  ],
}
