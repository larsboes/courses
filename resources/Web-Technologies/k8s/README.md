# Kubernetes Übungen - FHDW Web Technologies

Shared Kubernetes manifests for all FHDW Web Technologies course exercises (1-12).

## Prerequisites

- Docker Desktop with Kubernetes enabled (or minikube/kind)
- kubectl CLI

## Quick Start

```bash
# Deploy any exercise
./scripts/deploy.sh uebung-XX

# Cleanup
./scripts/cleanup.sh uebung-XX
./scripts/cleanup.sh all
```

## All Exercises Overview

| Exercise | Description | Port | Command |
|----------|-------------|------|---------|
| Ü1 | Docker/K8s Networking Demo | - | `./scripts/deploy.sh uebung-01` |
| Ü2 | TLS (Theory only) | - | - |
| Ü3 | DNS (Theory only) | - | - |
| Ü4 | Simple Flask Webserver | 30004 | `./scripts/deploy.sh uebung-04` |
| Ü5 | JSON (Theory only) | - | - |
| Ü6 | HTML Pages Webserver | 30006 | `./scripts/deploy.sh uebung-06` |
| Ü7-8 | Meta Playlist UI (localStorage) | 30078 | `./scripts/deploy.sh uebung-07-08` |
| Ü9 | REST API Server (in-memory) | 30009 | `./scripts/deploy.sh uebung-09` |
| Ü10 | Flask + CouchDB | 30010 | `./scripts/deploy.sh uebung-10` |
| Ü11 | K8s Hello World (nginx) | 30080 | `./scripts/deploy.sh uebung-11` |
| Ü12 | Full Meta Playlist (production) | 30001 | `./scripts/deploy.sh uebung-12` |

## Structure

```
k8s/
├── apps/                    # Application source code
│   ├── uebung-04/          # Simple Flask (Dockerfile + webserver.py)
│   ├── uebung-06/          # HTML Flask (Dockerfile + root-page/)
│   ├── uebung-09/          # REST API (Dockerfile + app.py + static/)
│   └── uebung-10/          # Flask+CouchDB (Dockerfile + app.py)
├── base/                    # Shared namespace (fhdw-wta)
├── overlays/                # K8s manifests per exercise
│   ├── uebung-01/          # Networking demo (2 containers)
│   ├── uebung-04/          # Simple Flask
│   ├── uebung-06/          # HTML Flask
│   ├── uebung-07-08/       # Static UI (nginx + ConfigMap)
│   ├── uebung-09/          # REST API (in-memory)
│   ├── uebung-10/          # Flask + CouchDB (basic)
│   ├── uebung-11/          # Hello nginx
│   └── uebung-12/          # Production Meta Playlist
├── scripts/
│   ├── deploy.sh           # Deploy any exercise
│   └── cleanup.sh          # Cleanup resources
└── docs/
    ├── exercises/          # Theory exercise answers
    ├── kubernetes/         # K8s learning materials
    └── tasks.md            # All 12 course tasks
```

---

## Exercise Details

### Übung 1: Networking Demo
Two Ubuntu containers demonstrating pod-to-pod communication in K8s.

```bash
./scripts/deploy.sh uebung-01

# Access containers and test networking
kubectl -n fhdw-wta exec -it deploy/container1 -- bash
> ping container2
> nslookup container2
> ifconfig
```

### Übung 4: Simple Flask Webserver
Minimal "Hello World" Flask application.

```bash
./scripts/deploy.sh uebung-04
curl http://localhost:30004
```

### Übung 6: HTML Pages Webserver
Flask serving static HTML pages from `root-page` directory.

```bash
./scripts/deploy.sh uebung-06
curl http://localhost:30006
curl http://localhost:30006/pages/page1.html
```

### Übung 7-8: Meta Playlist UI
Static frontend served by nginx using ConfigMap.
Uses localStorage for persistence (client-side only).

```bash
./scripts/deploy.sh uebung-07-08
# Open http://localhost:30078 in browser
```

### Übung 9: REST API Server
Flask backend with in-memory storage (no database).

```bash
./scripts/deploy.sh uebung-09

# Test API
curl http://localhost:30009/api/playlists
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"MyPlaylist"}' http://localhost:30009/api/playlists
```

### Übung 10: Flask + CouchDB
Microservices architecture with persistent database.

```bash
./scripts/deploy.sh uebung-10
curl http://localhost:30010
```

### Übung 11: Hello World
Simple nginx deployment for K8s basics.

```bash
./scripts/deploy.sh uebung-11
curl http://localhost:30080
```

### Übung 12: Production Meta Playlist
Full-featured deployment with:
- HorizontalPodAutoscaler (2-5 replicas)
- Network Policies
- Resource limits
- Init containers
- Health probes

```bash
./scripts/deploy.sh uebung-12
curl http://localhost:30001

# View autoscaler
kubectl -n fhdw-wta get hpa
```

---

## Features by Exercise

| Feature | Ü1 | Ü4 | Ü6 | Ü7-8 | Ü9 | Ü10 | Ü11 | Ü12 |
|---------|----|----|----|----|----|----|-----|-----|
| Deployment | x | x | x | x | x | x | x | x |
| Service (NodePort) | - | x | x | x | x | x | x | x |
| ConfigMap | - | - | - | x | - | x | - | x |
| Secret | - | - | - | - | - | x | - | x |
| PVC | - | - | - | - | - | x | - | x |
| Init Container | - | - | - | - | - | x | - | x |
| HPA | - | - | - | - | - | - | - | x |
| NetworkPolicy | - | - | - | - | - | - | - | x |
| Resource Limits | x | x | x | x | x | x | - | x |
| Health Probes | - | x | x | x | x | x | - | x |

---

## Useful Commands

```bash
# View all resources
kubectl -n fhdw-wta get all

# View specific resource types
kubectl -n fhdw-wta get pods,svc,deploy

# View logs
kubectl -n fhdw-wta logs -l component=webserver
kubectl -n fhdw-wta logs -l component=database

# Exec into pod
kubectl -n fhdw-wta exec -it deploy/flask-webserver -- sh

# Scale deployment
kubectl -n fhdw-wta scale deployment/flask-webserver --replicas=3

# View HPA
kubectl -n fhdw-wta get hpa

# Cleanup single exercise
./scripts/cleanup.sh uebung-12

# Cleanup everything
./scripts/cleanup.sh all
```

---

## Documentation

### Exercise Answers
- [All Exercises](docs/exercises/index.md) - Übersicht aller Übungen
- [Ü2: TLS](docs/exercises/uebung-02-tls.md) - Theorie: Verschlüsselung, Zertifikate
- [Ü3: DNS](docs/exercises/uebung-03-dns.md) - Theorie: Records, Sicherheit
- [Ü5: JSON](docs/exercises/uebung-05-json.md) - Theorie: Warenkorb-Struktur

### Course Tasks
- [All Tasks](docs/tasks.md) - Alle 12 Übungen (Aufgabenstellung)

### Kubernetes Learning Path
- [Overview](docs/kubernetes/index.md) - Lernpfad
- **Basics**: [What is K8s](docs/kubernetes/basics/what-is-k8s.md) | [Pods](docs/kubernetes/basics/pods.md) | [Deployments](docs/kubernetes/basics/deployments.md)
- **Networking**: [Services](docs/kubernetes/networking/services.md) | [Ports](docs/kubernetes/networking/ports.md) | [DNS](docs/kubernetes/networking/dns.md)
- **Storage**: [Volumes](docs/kubernetes/storage/volumes.md)
- **Config**: [ConfigMaps](docs/kubernetes/config/configmaps.md) | [Secrets](docs/kubernetes/config/secrets.md) | [Kustomize](docs/kubernetes/config/kustomize.md)
- **Meta Playlist**: [Architecture](docs/kubernetes/meta-playlist/architecture.md) | [Manifests](docs/kubernetes/meta-playlist/manifests.md)
