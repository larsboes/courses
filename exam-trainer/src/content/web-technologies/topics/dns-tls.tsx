// src/content/web-technologies/topics/dns-tls.tsx
import type { Topic } from '@/core/types/content'
import { DnsResolutionDiagram } from '../diagrams/DnsResolutionDiagram'
import { TlsHandshakeDiagram } from '../diagrams/TlsHandshakeDiagram'

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
}
