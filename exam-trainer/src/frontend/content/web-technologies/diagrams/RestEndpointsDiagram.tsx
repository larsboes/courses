// src/content/web-technologies/diagrams/RestEndpointsDiagram.tsx
import { ExplorableSVG, ExplorableRegion } from '@/core/components/diagrams'
import { motion } from 'framer-motion'
import type { DiagramProps } from '@/core/types/content'

const regions: ExplorableRegion[] = [
  {
    id: 'get-collection',
    label: 'GET Collection',
    description: (
      <>
        <p className="mb-2">Alle Ressourcen einer Sammlung abrufen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Response:</strong> Array von Objekten</li>
          <li><strong>Status:</strong> 200 OK</li>
          <li>Oft mit Pagination (limit, offset)</li>
          <li>Filter via Query-Parameter</li>
        </ul>
      </>
    ),
  },
  {
    id: 'get-item',
    label: 'GET Item',
    description: (
      <>
        <p className="mb-2">Eine einzelne Ressource abrufen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Response:</strong> Einzelnes Objekt</li>
          <li><strong>Status:</strong> 200 OK oder 404 Not Found</li>
          <li>ID identifiziert die Ressource eindeutig</li>
        </ul>
      </>
    ),
  },
  {
    id: 'post',
    label: 'POST (Create)',
    description: (
      <>
        <p className="mb-2">Neue Ressource erstellen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Request Body:</strong> Neue Ressourcendaten</li>
          <li><strong>Response:</strong> Erstellte Ressource mit ID</li>
          <li><strong>Status:</strong> 201 Created</li>
          <li>Location-Header zeigt auf neue Ressource</li>
        </ul>
      </>
    ),
  },
  {
    id: 'put',
    label: 'PUT (Replace)',
    description: (
      <>
        <p className="mb-2">Ressource komplett ersetzen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Request Body:</strong> Komplette Ressource</li>
          <li><strong>Idempotent:</strong> Wiederholung hat gleichen Effekt</li>
          <li><strong>Status:</strong> 200 OK oder 204 No Content</li>
          <li>Alle Felder werden überschrieben</li>
        </ul>
      </>
    ),
  },
  {
    id: 'delete',
    label: 'DELETE',
    description: (
      <>
        <p className="mb-2">Ressource löschen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Idempotent:</strong> Mehrfach löschen = einmal löschen</li>
          <li><strong>Status:</strong> 204 No Content (Erfolg)</li>
          <li><strong>Status:</strong> 404 wenn bereits gelöscht</li>
          <li>Kein Request Body notwendig</li>
        </ul>
      </>
    ),
  },
]

interface EndpointRowProps {
  isActive: boolean
  onClick: () => void
  method: string
  methodColor: string
  endpoint: string
  description: string
}

function EndpointRow({ isActive, onClick, method, methodColor, endpoint, description }: EndpointRowProps) {
  return (
    <motion.div
      className={`
        flex items-center gap-4 p-3 cursor-pointer border-l-4 transition-colors
        ${isActive
          ? 'bg-blue-900/40 border-blue-500'
          : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <span className={`font-mono font-bold w-16 ${methodColor}`}>{method}</span>
      <span className={`font-mono flex-1 ${isActive ? 'text-blue-200' : 'text-slate-300'}`}>
        {endpoint}
      </span>
      <span className="text-sm text-slate-400 hidden sm:block">{description}</span>
    </motion.div>
  )
}

export function RestEndpointsDiagram({ className }: DiagramProps) {
  return (
    <ExplorableSVG regions={regions} className={className}>
      {(activeRegion, setActiveRegion) => (
        <div className="flex flex-col gap-1 max-w-2xl mx-auto">
          <div className="text-xs text-slate-500 mb-2 font-mono">
            Basis-URL: https://api.example.com/v1
          </div>

          <EndpointRow
            isActive={activeRegion === 'get-collection'}
            onClick={() => setActiveRegion(activeRegion === 'get-collection' ? null : 'get-collection')}
            method="GET"
            methodColor="text-blue-400"
            endpoint="/users"
            description="Alle User abrufen"
          />

          <EndpointRow
            isActive={activeRegion === 'get-item'}
            onClick={() => setActiveRegion(activeRegion === 'get-item' ? null : 'get-item')}
            method="GET"
            methodColor="text-blue-400"
            endpoint="/users/{id}"
            description="Einzelnen User abrufen"
          />

          <EndpointRow
            isActive={activeRegion === 'post'}
            onClick={() => setActiveRegion(activeRegion === 'post' ? null : 'post')}
            method="POST"
            methodColor="text-green-400"
            endpoint="/users"
            description="Neuen User erstellen"
          />

          <EndpointRow
            isActive={activeRegion === 'put'}
            onClick={() => setActiveRegion(activeRegion === 'put' ? null : 'put')}
            method="PUT"
            methodColor="text-amber-400"
            endpoint="/users/{id}"
            description="User ersetzen"
          />

          <EndpointRow
            isActive={activeRegion === 'delete'}
            onClick={() => setActiveRegion(activeRegion === 'delete' ? null : 'delete')}
            method="DELETE"
            methodColor="text-red-400"
            endpoint="/users/{id}"
            description="User löschen"
          />
        </div>
      )}
    </ExplorableSVG>
  )
}
