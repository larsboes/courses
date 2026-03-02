// src/content/wirtschaftsrecht/index.ts
import type { Course } from '@/core/types/content'
import { grundlagenTopic } from './topics/grundlagen'
import { willenserklaerungTopic } from './topics/willenserklaerung'
import { anfechtungTopic } from './topics/anfechtung'
import { stellvertretungTopic } from './topics/stellvertretung'
import { leistungsstoerungenTopic } from './topics/leistungsstoerungen'
import { kaufvertragTopic } from './topics/kaufvertrag'
import { gesetzlicheSvTopic } from './topics/gesetzliche-sv'
import { gesellschaftsrechtTopic } from './topics/gesellschaftsrecht'

export const wirtschaftsrechtCourse: Course = {
  id: 'wirtschaftsrecht',
  title: 'Wirtschaftsrecht',
  description:
    'BGB AT, Schuldrecht AT/BT, Handels- und Gesellschaftsrecht — mit Fällen von Prof. Pelke',
  examFocus: [
    {
      title: 'Anspruchsprüfung',
      description:
        'Entstanden → übergegangen → untergegangen → durchsetzbar — diese Reihenfolge immer einhalten!',
    },
    {
      title: 'Gutachtenstil',
      description:
        'Obersatz → Definition → Subsumtion → Ergebnis. Jede Falllösung muss im Gutachtenstil formuliert sein.',
    },
    {
      title: 'Trennungs- & Abstraktionsprinzip',
      description:
        'Verpflichtungs- und Verfügungsgeschäft strikt trennen. Dauerbrenner in der Klausur!',
    },
    {
      title: '§ 275 vs. § 326',
      description:
        '§ 275 I betrifft die Leistungspflicht, § 326 I 1 die Gegenleistungspflicht. Niemals verwechseln!',
    },
  ],
  topics: [
    grundlagenTopic,
    willenserklaerungTopic,
    anfechtungTopic,
    stellvertretungTopic,
    leistungsstoerungenTopic,
    kaufvertragTopic,
    gesetzlicheSvTopic,
    gesellschaftsrechtTopic,
  ],
}
