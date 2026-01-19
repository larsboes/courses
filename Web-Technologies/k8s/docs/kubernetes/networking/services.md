# Services

Pods bekommen zufällige IPs und können jederzeit sterben. Ein Service gibt eine **stabile Adresse** und verteilt Traffic automatisch.

## Warum Services?

```
┌─────────────────────────────────────────────────────────────────┐
│  PROBLEM: Pod-IPs ändern sich                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pod stirbt:                  Neuer Pod:                         │
│  ┌─────────┐                  ┌─────────┐                        │
│  │ IP: .15 │  ───────────►    │ IP: .47 │  ← Neue IP!           │
│  └─────────┘                  └─────────┘                        │
│                                                                  │
│  Wie sollen andere Pods den neuen Pod finden?                   │
│                                                                  │
│  LÖSUNG: Service                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Service: flask-webserver                                │    │
│  │  Stabile IP: 10.96.182.27                               │    │
│  │  DNS: flask-webserver.fhdw-wta                          │    │
│  │                                                          │    │
│  │  Findet automatisch alle Pods mit passendem Label!      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Service mit Load Balancing

```
┌─────────────────────────────────────────────────────────────────┐
│  SERVICE: flask-webserver                                        │
│  ════════════════════════                                        │
│                                                                  │
│  Stabile ClusterIP: 10.96.182.27                                │
│  DNS-Name: flask-webserver.fhdw-wta.svc.cluster.local           │
│            └─────────────┘ └───────┘                             │
│              Service-Name   Namespace                            │
│                                                                  │
│                     ┌──────────────┐                             │
│                     │   SERVICE    │                             │
│                     │ 10.96.182.27 │                             │
│                     │    :8001     │                             │
│                     └──────┬───────┘                             │
│                            │                                     │
│              ┌─────────────┼─────────────┐                       │
│              │             │             │                       │
│              ▼             ▼             ▼                       │
│        ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│        │  Pod 1   │  │  Pod 2   │  │  Pod 3   │                 │
│        │10.244.0.5│  │10.244.0.6│  │10.244.0.7│                 │
│        └──────────┘  └──────────┘  └──────────┘                 │
│                                                                  │
│  Der Service verteilt Traffic automatisch (Round Robin)!        │
└─────────────────────────────────────────────────────────────────┘
```

## Service-Typen

```
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE TYPEN                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. ClusterIP (Default)                                          │
│     ───────────────────                                          │
│     Nur INNERHALB des Clusters erreichbar                        │
│     Gut für: Datenbanken, interne Services                       │
│                                                                  │
│     ┌──────────────┐                                             │
│     │   CouchDB    │ ◄── Nur Pods im Cluster können zugreifen   │
│     │ ClusterIP    │                                             │
│     │   :5984      │     Kein Zugriff von außen!                │
│     └──────────────┘                                             │
│                                                                  │
│  2. NodePort                                                     │
│     ────────                                                     │
│     Von AUSSEN erreichbar über Node-IP:NodePort                  │
│     Gut für: Entwicklung, einfacher externer Zugang              │
│                                                                  │
│     ┌──────────────┐                                             │
│     │    Flask     │ ◄── localhost:30001 funktioniert!          │
│     │  NodePort    │                                             │
│     │   :30001     │                                             │
│     └──────────────┘                                             │
│                                                                  │
│  3. LoadBalancer (Cloud)                                         │
│     ─────────────────────                                        │
│     Erstellt externen Load Balancer (AWS, GCP, Azure)            │
│     Gut für: Produktion in der Cloud                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Service YAML

### ClusterIP (nur intern)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: couchdb
spec:
  type: ClusterIP               # ◄── Default, kann weggelassen werden
  selector:
    component: database         # ◄── Findet Pods mit diesem Label
  ports:
    - port: 5984                # ◄── Service-Port
      targetPort: 5984          # ◄── Container-Port
```

### NodePort (extern erreichbar)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: flask-webserver
spec:
  type: NodePort                # ◄── Extern erreichbar!
  selector:
    component: webserver
  ports:
    - port: 8001                # ◄── Interner Service-Port
      targetPort: 8001          # ◄── Container-Port
      nodePort: 30001           # ◄── Externer Port (30000-32767)
```

## Label Matching

Der Service findet Pods über Labels:

```
Service selector:              Pod labels:
─────────────────              ──────────
component: webserver     ───►  component: webserver  ✓

                         ───►  component: webserver  ✓

                         ✗     component: database
```

## Wann welchen Typ?

| Typ | Erreichbar von | Use Case |
|-----|---------------|----------|
| ClusterIP | Nur Cluster | Datenbanken, interne APIs |
| NodePort | Extern via Node:Port | Development, einfache Apps |
| LoadBalancer | Extern via LB-IP | Production in Cloud |

## Weiter

- [Ports](ports.md) - Die verschiedenen Port-Typen
- [DNS](dns.md) - Service Discovery
