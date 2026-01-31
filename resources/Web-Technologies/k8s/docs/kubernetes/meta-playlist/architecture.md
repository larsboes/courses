# Meta Playlist Architektur

Die vollständige Kubernetes-Architektur unserer Meta Playlist Anwendung.

## Komponenten-Übersicht

| Component | Type | Port | Beschreibung |
|-----------|------|------|--------------|
| flask-webserver | Deployment | 8001 | Flask App, 2 Replicas |
| flask-webserver | Service | NodePort 30001 | Externer Zugang |
| couchdb | Deployment | 5984 | CouchDB, 1 Replica |
| couchdb | Service | ClusterIP | Nur intern |
| couchdb-pvc | PVC | - | 1Gi Speicher |
| couchdb-secret | Secret | - | DB Credentials |
| flask-config | ConfigMap | - | Verbindungs-Config |

---

## Layer 1: High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         KUBERNETES CLUSTER                               │
│                         (Docker Desktop / kind)                          │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      NAMESPACE: fhdw-wta                            │ │
│  │                                                                     │ │
│  │    ┌─────────────────────┐          ┌─────────────────────┐        │ │
│  │    │   FLASK WEBSERVER   │          │      COUCHDB        │        │ │
│  │    │    (Frontend)       │ ──────── │    (Database)       │        │ │
│  │    │   Port: 8001        │  HTTP    │    Port: 5984       │        │ │
│  │    └─────────────────────┘          └─────────────────────┘        │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
         ▲
         │ http://localhost:30001
         │
    ┌────┴────┐
    │ Browser │
    └─────────┘
```

---

## Layer 2: Services & Networking

```
                                    EXTERNAL ACCESS
                                          │
                                    :30001 (NodePort)
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NAMESPACE: fhdw-wta                                                     │
│                                                                          │
│  ┌──────────────────────────────┐    ┌──────────────────────────────┐   │
│  │  SERVICE: flask-webserver    │    │  SERVICE: couchdb            │   │
│  │  Type: NodePort              │    │  Type: ClusterIP             │   │
│  │  Port: 8001                  │    │  Port: 5984                  │   │
│  │  NodePort: 30001             │    │  (Internal Only)             │   │
│  │  Selector: component=web     │    │  Selector: component=db      │   │
│  └──────────────┬───────────────┘    └──────────────┬───────────────┘   │
│                 │                                    │                   │
│                 ▼                                    ▼                   │
│  ┌──────────────────────────────┐    ┌──────────────────────────────┐   │
│  │  DEPLOYMENT: flask-webserver │    │  DEPLOYMENT: couchdb         │   │
│  │  Replicas: 2                 │    │  Replicas: 1                 │   │
│  │                              │    │                              │   │
│  │  ┌────────┐   ┌────────┐    │    │  ┌────────┐                  │   │
│  │  │  POD   │   │  POD   │    │    │  │  POD   │──► PVC (1Gi)     │   │
│  │  │  :8001 │   │  :8001 │    │    │  │  :5984 │                  │   │
│  │  └────────┘   └────────┘    │    │  └────────┘                  │   │
│  └──────────────────────────────┘    └──────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 3: Pod Details

### Flask Pod

```
┌─────────────────────────────────────────────────────────────────────────┐
│  POD: flask-webserver-xxxxx                                              │
│  Labels: app=meta-playlist, component=webserver                          │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  CONTAINER: flask                                                   │ │
│  │  Image: meta-playlist:latest                                        │ │
│  │  Port: 8001                                                         │ │
│  │                                                                     │ │
│  │  Environment (from ConfigMap):                                      │ │
│  │    COUCHDB_HOST=couchdb                                             │ │
│  │    COUCHDB_PORT=5984                                                │ │
│  │                                                                     │ │
│  │  Environment (from Secret):                                         │ │
│  │    COUCHDB_USER=admin                                               │ │
│  │    COUCHDB_PASSWORD=****                                            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### CouchDB Pod

```
┌─────────────────────────────────────────────────────────────────────────┐
│  POD: couchdb-xxxxx                                                      │
│  Labels: app=meta-playlist, component=database                           │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  CONTAINER: couchdb                                                 │ │
│  │  Image: couchdb:3                                                   │ │
│  │  Port: 5984                                                         │ │
│  │                                                                     │ │
│  │  Environment (from Secret):                                         │ │
│  │    COUCHDB_USER=admin                                               │ │
│  │    COUCHDB_PASSWORD=****                                            │ │
│  │                                                                     │ │
│  │  Volume Mounts:                                                     │ │
│  │    /opt/couchdb/data ◄──── PVC: couchdb-pvc (1Gi)                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              REQUEST FLOW                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Browser sendet Request                                                   │
│     └──► http://localhost:30001                                              │
│                                                                              │
│  2. NodePort Service empfängt                                                │
│     └──► flask-webserver Service (port 30001)                               │
│                                                                              │
│  3. Load Balancing zu einem Pod                                              │
│     └──► flask-webserver Pod 1 oder 2                                        │
│                                                                              │
│  4. Flask App verarbeitet Request                                            │
│     └──► Liest Env-Vars aus ConfigMap + Secret                              │
│         COUCHDB_URL = http://admin:password@couchdb:5984                     │
│                                                                              │
│  5. Flask fragt CouchDB                                                      │
│     └──► DNS: "couchdb" → ClusterIP                                         │
│     └──► HTTP GET http://couchdb:5984/playlists/...                         │
│                                                                              │
│  6. CouchDB antwortet                                                        │
│     └──► JSON Daten                                                          │
│                                                                              │
│  7. Response zurück                                                          │
│     └──► CouchDB → Flask → Service → Browser                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Mermaid: Architektur

```mermaid
flowchart TB
    subgraph External["Externe Welt"]
        Browser["Browser / curl"]
    end

    subgraph Cluster["Kubernetes Cluster"]
        subgraph NS["Namespace: fhdw-wta"]

            subgraph Config["Konfiguration"]
                CM["ConfigMap\nflask-config"]
                SEC["Secret\ncouchdb-secret"]
            end

            subgraph FlaskDeploy["Deployment: flask-webserver"]
                FP1["Pod 1\n:8001"]
                FP2["Pod 2\n:8001"]
            end

            subgraph CouchDeploy["Deployment: couchdb"]
                CP["Pod\n:5984"]
            end

            FS["Service: flask-webserver\nNodePort :30001"]
            CS["Service: couchdb\nClusterIP :5984"]
            PVC["PVC\n1Gi"]
        end
    end

    Browser -->|"localhost:30001"| FS
    FS --> FP1
    FS --> FP2
    FP1 -->|"http://couchdb:5984"| CS
    FP2 -->|"http://couchdb:5984"| CS
    CS --> CP
    CP --> PVC
    CM -.->|env| FP1
    CM -.->|env| FP2
    SEC -.->|env| FP1
    SEC -.->|env| FP2
    SEC -.->|env| CP
```

## Mermaid: Resource Dependencies

```mermaid
flowchart LR
    subgraph Config["Configuration"]
        CM["ConfigMap\nflask-config"]
        SEC["Secret\ncouchdb-secret"]
    end

    subgraph Workloads["Workloads"]
        FD["Deployment\nflask-webserver"]
        CD["Deployment\ncouchdb"]
    end

    subgraph Network["Network"]
        FS["Service\nflask-webserver"]
        CS["Service\ncouchdb"]
    end

    subgraph Storage["Storage"]
        PVC["PVC\ncouchdb-pvc"]
    end

    CM --> FD
    SEC --> FD
    SEC --> CD
    FD --> FS
    CD --> CS
    PVC --> CD
```

## Mermaid: Deployment Flow

```mermaid
sequenceDiagram
    participant U as User
    participant K as kubectl
    participant API as K8s API
    participant S as Scheduler
    participant N as Node

    U->>K: kubectl apply -k overlays/uebung-12/
    K->>API: Create Resources
    API->>API: Validate & Store
    API->>S: Schedule Pods
    S->>N: Assign to Node
    N->>N: Pull Image
    N->>N: Start Container
    N-->>API: Pod Running
    API-->>K: Resources Created
    K-->>U: Success
```

---

## Quick Commands

```bash
# Deploy
kubectl apply -k overlays/uebung-12/

# Status
kubectl -n fhdw-wta get all

# Logs
kubectl -n fhdw-wta logs -l component=webserver
kubectl -n fhdw-wta logs -l component=database

# Test
curl http://localhost:30001

# Delete
kubectl delete -k overlays/uebung-12/
```
