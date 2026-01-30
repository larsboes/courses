// src/content/web-technologies/topics/http.tsx
import type { Topic } from '@/core/types/content'
import { HttpFlowDiagram } from '../diagrams/HttpFlowDiagram'
import { HttpRequestExplorer } from '../diagrams/HttpRequestExplorer'

export const httpTopic: Topic = {
  id: 'http',
  title: 'HTTP - Hypertext Transfer Protocol',
  description: 'Requests & Responses, Aufbau, Methoden, Status Codes',
  examNotes: 'Struktur kennen',

  sections: [
    {
      id: 'overview',
      title: 'Überblick',
      content: (
        <div className="space-y-4">
          <p>
            HTTP ist ein <strong>zustandsloses Protokoll</strong> für die
            Kommunikation im Web auf der Anwendungsschicht (Layer 5).
          </p>
          <p>
            Der Client (z.B. Browser) sendet einen <strong>Request</strong>,
            der Server antwortet mit einer <strong>Response</strong>.
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: HttpFlowDiagram,
      },
    },
    {
      id: 'request-structure',
      title: 'HTTP Request Aufbau',
      content: (
        <p>
          Jeder HTTP Request besteht aus vier Teilen. Klicke auf die Bereiche
          für Details:
        </p>
      ),
      diagram: {
        type: 'explorable',
        component: HttpRequestExplorer,
      },
    },
    {
      id: 'methods',
      title: 'HTTP Methoden',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3">Methode</th>
                <th className="text-left py-2 px-3">Beschreibung</th>
                <th className="text-left py-2 px-3">Idempotent</th>
                <th className="text-left py-2 px-3">Body</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-blue-400">GET</td>
                <td className="py-2 px-3">Ressource abrufen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-green-400">POST</td>
                <td className="py-2 px-3">Neue Ressource erstellen</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-amber-400">PUT</td>
                <td className="py-2 px-3">Ressource ersetzen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-red-400">DELETE</td>
                <td className="py-2 px-3">Ressource löschen</td>
                <td className="py-2 px-3">Ja</td>
                <td className="py-2 px-3">Nein</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-purple-400">PATCH</td>
                <td className="py-2 px-3">Teilweise aktualisieren</td>
                <td className="py-2 px-3">Nein</td>
                <td className="py-2 px-3">Ja</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'status-codes',
      title: 'Status Codes',
      content: (
        <div className="space-y-4">
          <p>Status Codes zeigen das Ergebnis der Anfrage:</p>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-2xl font-bold text-green-400">2xx</span>
              <div>
                <div className="font-medium text-green-300">Erfolg</div>
                <div className="text-sm text-slate-400">200 OK, 201 Created, 204 No Content</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
              <span className="text-2xl font-bold text-amber-400">4xx</span>
              <div>
                <div className="font-medium text-amber-300">Client-Fehler</div>
                <div className="text-sm text-slate-400">400 Bad Request, 401 Unauthorized, 404 Not Found</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
              <span className="text-2xl font-bold text-red-400">5xx</span>
              <div>
                <div className="font-medium text-red-300">Server-Fehler</div>
                <div className="text-sm text-slate-400">500 Internal Server Error, 503 Service Unavailable</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],

  quiz: {
    questions: [
      {
        id: 'http-stateless',
        type: 'multiple-choice',
        question: 'Was bedeutet es, dass HTTP "zustandslos" ist?',
        options: [
          'Der Server speichert keine Informationen zwischen Requests',
          'HTTP kann nur GET-Anfragen verarbeiten',
          'Die Verbindung bleibt immer offen',
          'Jeder Request muss verschlüsselt sein',
        ],
        correctAnswer: 'Der Server speichert keine Informationen zwischen Requests',
        explanation:
          'Zustandslos bedeutet, dass jeder Request unabhängig ist. Der Server "erinnert" sich nicht an vorherige Requests. Für Sessions werden daher Cookies oder Tokens verwendet.',
      },
      {
        id: 'http-idempotent',
        type: 'multi-select',
        question: 'Welche HTTP-Methoden sind idempotent? (Mehrere Antworten möglich)',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        correctAnswer: ['GET', 'PUT', 'DELETE'],
        explanation:
          'Idempotent bedeutet: Mehrfaches Ausführen hat den gleichen Effekt wie einmaliges Ausführen. GET liest nur, PUT ersetzt komplett, DELETE löscht. POST und PATCH können bei Wiederholung unterschiedliche Ergebnisse erzeugen.',
      },
      {
        id: 'http-404',
        type: 'multiple-choice',
        question: 'Was bedeutet der Status Code 404?',
        options: [
          'Not Found - Die angeforderte Ressource wurde nicht gefunden',
          'Bad Request - Die Anfrage war fehlerhaft',
          'Unauthorized - Authentifizierung erforderlich',
          'Internal Server Error - Serverfehler',
        ],
        correctAnswer: 'Not Found - Die angeforderte Ressource wurde nicht gefunden',
        explanation:
          '404 ist ein Client-Fehler (4xx) und bedeutet, dass die URL nicht existiert. Der Server hat die Anfrage verstanden, aber keine passende Ressource gefunden.',
      },
    ],
  },
}
