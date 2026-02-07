// src/content/web-technologies/topics/dns-tls.tsx
import type { Topic } from '@/core/types/content'
import { DnsResolutionDiagram } from '../diagrams/DnsResolutionDiagram'
import { TlsHandshakeDiagram } from '../diagrams/TlsHandshakeDiagram'
import { DnsResolutionStepper } from '../diagrams/DnsResolutionStepper'

export const dnsTlsTopic: Topic = {
  id: 'dns-tls',
  title: 'DNS & TLS',
  description: 'Domain Name System, Namensauflösung, TLS-Verschlüsselung, HTTPS',
  examNotes: 'DNS-Auflösungsschritte und TLS-Handshake verstehen',

  sections: [
    {
      id: 'dns-overview',
      title: 'DNS Überblick',
      content: (
        <div className="space-y-4">
          <p>
            Das <strong>Domain Name System (DNS)</strong> ist das "Telefonbuch"
            des Internets. Es übersetzt menschenlesbare Domainnamen in
            IP-Adressen.
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400">// Beispiel</div>
            <div>
              <span className="text-blue-400">www.example.com</span>
              <span className="text-slate-500"> → </span>
              <span className="text-green-400">93.184.216.34</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Wichtige DNS Record-Typen:</p>
            <div className="grid gap-2">
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                <span className="font-mono text-blue-400 w-16">A</span>
                <span className="text-slate-300">
                  IPv4-Adresse für eine Domain
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                <span className="font-mono text-blue-400 w-16">AAAA</span>
                <span className="text-slate-300">
                  IPv6-Adresse für eine Domain
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                <span className="font-mono text-purple-400 w-16">CNAME</span>
                <span className="text-slate-300">
                  Alias - verweist auf andere Domain
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                <span className="font-mono text-amber-400 w-16">MX</span>
                <span className="text-slate-300">
                  Mail Exchange - E-Mail-Server
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                <span className="font-mono text-green-400 w-16">TXT</span>
                <span className="text-slate-300">
                  Text-Einträge (SPF, DKIM, etc.)
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'dns-resolution',
      title: 'DNS Auflösung',
      content: (
        <div className="space-y-4">
          <p>
            Die DNS-Auflösung erfolgt <strong>hierarchisch</strong> über mehrere
            Server. Das Diagramm zeigt den Ablauf einer rekursiven Anfrage:
          </p>
          <div className="bg-slate-800 rounded-lg p-4 text-sm">
            <div className="font-medium mb-2">DNS-Hierarchie:</div>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>
                <strong>Root-Server</strong> - 13 Server weltweit (a-m.root-servers.net)
              </li>
              <li>
                <strong>TLD-Server</strong> - Für Top-Level-Domains (.com, .de, .org)
              </li>
              <li>
                <strong>Autoritative Nameserver</strong> - Für die spezifische Domain
              </li>
            </ol>
          </div>
          <p className="text-sm text-slate-400">
            DNS-Antworten werden gecacht (TTL = Time To Live), um die Last zu
            reduzieren.
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: DnsResolutionDiagram,
      },
    },
    {
      id: 'dns-stepper',
      title: 'DNS Resolution Stepper (Interaktiv)',
      content: (
        <div className="space-y-4">
          <p>
            Verfolge Schritt fuer Schritt, wie eine DNS-Aufloesung funktioniert.
            Vom Browser-Cache ueber den rekursiven Resolver bis zum autoritativen
            Nameserver - jeder Schritt wird visuell dargestellt.
          </p>
          <p className="text-sm text-slate-400">
            Aktiviere den Challenge-Modus, um zu testen, ob du weisst, welcher
            Record-Typ bei jedem Schritt zurueckgegeben wird.
          </p>
        </div>
      ),
      diagram: {
        type: 'manipulatable',
        component: DnsResolutionStepper,
      },
    },
    {
      id: 'tls-overview',
      title: 'TLS Überblick',
      content: (
        <div className="space-y-4">
          <p>
            <strong>TLS (Transport Layer Security)</strong> verschlüsselt die
            Kommunikation zwischen Client und Server. HTTPS = HTTP + TLS.
          </p>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
              <span className="text-2xl">1</span>
              <div>
                <div className="font-medium text-green-300">Verschlüsselung</div>
                <div className="text-sm text-slate-400">
                  Daten können nicht mitgelesen werden (Vertraulichkeit)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
              <span className="text-2xl">2</span>
              <div>
                <div className="font-medium text-blue-300">Authentifizierung</div>
                <div className="text-sm text-slate-400">
                  Server-Identität wird durch Zertifikat bestätigt
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
              <span className="text-2xl">3</span>
              <div>
                <div className="font-medium text-purple-300">Integrität</div>
                <div className="text-sm text-slate-400">
                  Daten können nicht unbemerkt verändert werden
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-sm">
            <div className="font-medium mb-2">Zertifikatskette (Chain of Trust):</div>
            <div className="flex items-center gap-2 text-slate-300 flex-wrap">
              <span className="bg-amber-900/50 px-2 py-1 rounded">Root CA</span>
              <span className="text-slate-500">→</span>
              <span className="bg-blue-900/50 px-2 py-1 rounded">Intermediate CA</span>
              <span className="text-slate-500">→</span>
              <span className="bg-green-900/50 px-2 py-1 rounded">Server-Zertifikat</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tls-handshake',
      title: 'TLS Handshake',
      content: (
        <div className="space-y-4">
          <p>
            Bevor verschlüsselte Daten ausgetauscht werden können, müssen Client
            und Server einen <strong>gemeinsamen Session Key</strong> aushandeln.
          </p>
          <div className="bg-slate-800 rounded-lg p-4 text-sm">
            <div className="font-medium mb-2">TLS 1.3 Handshake (vereinfacht):</div>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>ClientHello: Unterstützte Cipher Suites, Key Share</li>
              <li>ServerHello: Gewählte Cipher Suite, Key Share</li>
              <li>Zertifikat: Server-Identität prüfen</li>
              <li>Finished: Handshake abgeschlossen</li>
            </ol>
          </div>
          <p className="text-sm text-slate-400">
            TLS 1.3 ist schneller als TLS 1.2, da weniger Round-Trips nötig sind
            (1-RTT statt 2-RTT).
          </p>
        </div>
      ),
      diagram: {
        type: 'animated',
        component: TlsHandshakeDiagram,
      },
    },
  ],

  relatedTopics: [
    { id: 'http', title: 'HTTP', relationship: 'HTTPS nutzt TLS' },
    { id: 'kubernetes-netzwerk', title: 'K8s Netzwerk', relationship: 'DNS in K8s' },
  ],

  connectionDiagram: `
sequenceDiagram
  participant B as Browser
  participant DNS as DNS Server
  participant S as Web Server

  B->>DNS: 1. DNS Query (example.com)
  DNS-->>B: 2. IP: 93.184.216.34

  Note over B,S: TLS Handshake

  B->>S: 3. ClientHello
  S-->>B: 4. ServerHello + Zertifikat
  B->>S: 5. Key Exchange
  S-->>B: 6. Finished

  Note over B,S: Verschlüsselte HTTP-Kommunikation

  B->>S: 7. HTTPS Request (GET /)
  S-->>B: 8. HTTPS Response
`,

  quiz: {
    questions: [
      {
        id: 'dns-record-types',
        type: 'multiple-choice',
        question: 'Welcher DNS Record-Typ wird für E-Mail-Server verwendet?',
        options: ['A Record', 'CNAME Record', 'MX Record', 'TXT Record'],
        correctAnswer: 'MX Record',
        explanation:
          'MX (Mail Exchange) Records definieren, welche Server für den E-Mail-Empfang einer Domain zuständig sind. A Records sind für IPv4-Adressen, CNAME für Aliase und TXT für Text-Einträge.',
      },
      {
        id: 'dns-resolution-steps',
        type: 'order-steps',
        question:
          'Ordne die Schritte der DNS-Auflösung in der richtigen Reihenfolge:',
        options: [
          'Autoritativer Nameserver antwortet mit IP',
          'Browser fragt DNS-Resolver',
          'TLD-Server verweist auf autoritativen NS',
          'Root-Server verweist auf TLD-Server',
        ],
        correctAnswer: [
          'Browser fragt DNS-Resolver',
          'Root-Server verweist auf TLD-Server',
          'TLD-Server verweist auf autoritativen NS',
          'Autoritativer Nameserver antwortet mit IP',
        ],
        explanation:
          'Die DNS-Auflösung erfolgt hierarchisch: Erst wird der Resolver gefragt, dann (falls nicht gecacht) Root → TLD → Autoritativer Nameserver.',
      },
      {
        id: 'tls-purpose',
        type: 'multi-select',
        question:
          'Welche Sicherheitsziele werden durch TLS erreicht? (Mehrere Antworten)',
        options: [
          'Verschlüsselung (Vertraulichkeit)',
          'Authentifizierung des Servers',
          'Integrität der Daten',
          'Anonymität des Clients',
        ],
        correctAnswer: [
          'Verschlüsselung (Vertraulichkeit)',
          'Authentifizierung des Servers',
          'Integrität der Daten',
        ],
        explanation:
          'TLS bietet Vertraulichkeit (Verschlüsselung), Authentifizierung (Zertifikate) und Integrität (MACs). Client-Anonymität wird durch TLS nicht garantiert - dafür wären andere Technologien wie Tor nötig.',
      },
      {
        id: 'tls-certificate-chain',
        type: 'multiple-choice',
        question: 'Was ist die Zertifikatskette (Chain of Trust) bei TLS?',
        options: [
          'Eine Kette von Verschlüsselungsalgorithmen',
          'Die Hierarchie: Root CA → Intermediate CA → Server-Zertifikat',
          'Die Reihenfolge der TLS-Handshake-Nachrichten',
          'Eine Liste aller besuchten HTTPS-Websites',
        ],
        correctAnswer:
          'Die Hierarchie: Root CA → Intermediate CA → Server-Zertifikat',
        explanation:
          'Die Zertifikatskette ermöglicht Vertrauen: Root CAs sind in Browsern vorinstalliert und signieren Intermediate CAs, die wiederum Server-Zertifikate ausstellen. So kann der Browser die Echtheit eines Zertifikats prüfen.',
      },
    ],
  },

  examTasks: [
    {
      id: 'dns-tls-task',
      title: 'DNS & TLS',
      points: 20,
      context: (
        <p>
          Wenn ein Benutzer <code className="mx-1 px-2 py-1 bg-slate-700 rounded">https://playlist-app.example.com</code> im
          Browser aufruft, werden DNS und TLS benötigt, bevor die erste HTTP-Anfrage
          gesendet werden kann.
        </p>
      ),
      parts: [
        {
          id: 'dns-tls-a',
          type: 'free-text' as const,
          question: 'Beschreiben Sie Schritt für Schritt, wie die DNS-Auflösung für "playlist-app.example.com" funktioniert. Beginnen Sie beim Browser und enden Sie bei der IP-Adresse.',
          placeholder: '1. Der Browser prüft...',
          modelAnswer: '1. Browser-Cache: Der Browser prüft, ob die Domain bereits aufgelöst wurde.\n2. OS-Cache: Falls nicht, fragt der Browser das Betriebssystem (DNS-Cache des OS).\n3. Rekursiver Resolver: Der DNS-Resolver des ISP/Netzwerks wird kontaktiert.\n4. Root-Server: Der Resolver fragt einen der 13 Root-Server. Antwort: "Frag den .com TLD-Server".\n5. TLD-Server: Der .com TLD-Server wird gefragt. Antwort: "Der autoritative Nameserver für example.com ist ns1.example.com".\n6. Autoritativer Nameserver: ns1.example.com wird gefragt. Antwort: "playlist-app.example.com hat die IP 93.184.216.34" (A-Record).\n7. Die IP wird an den Browser zurückgegeben und gecacht (TTL).',
          keyPoints: [
            'Browser-Cache und OS-Cache als erste Schritte',
            'Rekursiver Resolver als Vermittler',
            'Hierarchie: Root → TLD → Autoritativer NS',
            'A-Record als Ergebnis',
            'Caching mit TTL erwähnt',
          ],
          explanation: 'Die DNS-Auflösung ist der erste Schritt bei jedem Webseitenaufruf.',
        },
        {
          id: 'dns-tls-b',
          type: 'free-text' as const,
          question: 'Beschreiben Sie den TLS-Handshake (vereinfacht, TLS 1.3). Welche Schritte sind nötig, bevor verschlüsselte HTTP-Daten ausgetauscht werden können?',
          placeholder: '1. ClientHello...',
          modelAnswer: '1. ClientHello: Der Client sendet unterstützte Cipher Suites und einen Key Share an den Server.\n2. ServerHello: Der Server wählt eine Cipher Suite und sendet seinen Key Share zurück.\n3. Zertifikat: Der Server sendet sein TLS-Zertifikat zur Authentifizierung.\n4. Zertifikatsprüfung: Der Client prüft das Zertifikat gegen die Zertifikatskette (Root CA → Intermediate CA → Server-Zertifikat).\n5. Key Exchange: Aus den Key Shares wird ein gemeinsamer Session Key abgeleitet (Diffie-Hellman).\n6. Finished: Beide Seiten bestätigen den Handshake. Ab jetzt wird mit dem Session Key verschlüsselt.\n\nTLS 1.3 benötigt nur 1 Round-Trip (1-RTT), TLS 1.2 benötigte 2 Round-Trips.',
          keyPoints: [
            'ClientHello und ServerHello Nachrichten',
            'Zertifikatsaustausch und -prüfung',
            'Key Exchange für gemeinsamen Session Key',
            'TLS 1.3 mit 1-RTT erwähnt',
          ],
          explanation: 'Der TLS-Handshake stellt Vertraulichkeit, Authentizität und Integrität sicher.',
        },
        {
          id: 'dns-tls-c',
          type: 'free-text' as const,
          question: 'Welche Rolle spielt das Zertifikat beim TLS-Handshake? Was ist eine Certificate Authority (CA) und warum vertraut der Browser dem Zertifikat?',
          placeholder: 'Das Zertifikat dient zur...',
          modelAnswer: 'Das Zertifikat dient zur Authentifizierung des Servers. Es enthält: den öffentlichen Schlüssel des Servers, den Domainnamen, den Aussteller (CA), und eine digitale Signatur.\n\nEine Certificate Authority (CA) ist eine vertrauenswürdige Organisation, die Zertifikate ausstellt und signiert. Es gibt eine Vertrauenskette (Chain of Trust): Root CA → Intermediate CA → Server-Zertifikat.\n\nDer Browser vertraut dem Zertifikat, weil: 1) Root CAs sind im Browser/OS vorinstalliert, 2) Die Signatur des Zertifikats kann über die Kette bis zu einer Root CA verifiziert werden, 3) Der Domainname im Zertifikat muss mit der aufgerufenen Domain übereinstimmen.',
          keyPoints: [
            'Zertifikat enthält öffentlichen Schlüssel und Domainnamen',
            'CA als vertrauenswürdige Instanz',
            'Chain of Trust: Root CA → Intermediate → Server',
            'Root CAs im Browser vorinstalliert',
          ],
          explanation: 'Die Zertifikatskette ist die Grundlage für Vertrauen im Internet.',
        },
        {
          id: 'dns-tls-d',
          type: 'multiple-choice' as const,
          question: 'Welcher DNS-Record-Typ wird verwendet, um eine Domain direkt einer IPv4-Adresse zuzuordnen?',
          options: [
            'A Record',
            'CNAME Record',
            'MX Record',
            'TXT Record',
          ],
          correctAnswer: 'A Record',
          explanation: 'Der A-Record (Address Record) bildet eine Domain direkt auf eine IPv4-Adresse ab. CNAME ist ein Alias, MX für E-Mail-Server, TXT für Text-Einträge.',
        },
      ],
    },
  ],
}
