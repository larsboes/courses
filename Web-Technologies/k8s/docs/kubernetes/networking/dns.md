# DNS in Kubernetes

Kubernetes hat eingebautes DNS. Pods können Services über Namen statt IPs erreichen.

## DNS-Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                    KUBERNETES DNS                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Vollständiger DNS-Name:                                         │
│  ───────────────────────                                         │
│  <service>.<namespace>.svc.cluster.local                         │
│                                                                  │
│  Beispiel:                                                       │
│  couchdb.fhdw-wta.svc.cluster.local                             │
│  └──────┘ └───────┘ └─────────────┘                              │
│  Service  Namespace   Cluster-Domain                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Kurzformen

Innerhalb des gleichen Namespace kannst du kürzere Namen nutzen:

| Form | Beispiel | Wann nutzbar |
|------|----------|--------------|
| Vollständig | `couchdb.fhdw-wta.svc.cluster.local` | Immer |
| Ohne cluster.local | `couchdb.fhdw-wta.svc` | Im Cluster |
| Ohne svc | `couchdb.fhdw-wta` | Im Cluster |
| **Nur Service-Name** | `couchdb` | **Im gleichen Namespace** |

## Praktisches Beispiel

```
┌─────────────────────────────────────────────────────────────────┐
│  NAMESPACE: fhdw-wta                                             │
│                                                                  │
│  ┌───────────────┐           ┌───────────────┐                  │
│  │  Flask Pod    │           │  CouchDB Pod  │                  │
│  │               │           │               │                  │
│  │  Zugriff:     │  ──────►  │  Service:     │                  │
│  │  couchdb:5984 │           │  couchdb      │                  │
│  │               │           │  :5984        │                  │
│  └───────────────┘           └───────────────┘                  │
│                                                                  │
│  Flask kann einfach "couchdb" als Hostname nutzen!              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Im Code

### Flask (Python)

```python
import os

# Service-Name als Hostname
COUCHDB_HOST = os.getenv("COUCHDB_HOST", "couchdb")
COUCHDB_PORT = os.getenv("COUCHDB_PORT", "5984")

# Verbindung
url = f"http://{COUCHDB_HOST}:{COUCHDB_PORT}/playlists"
# Ergibt: http://couchdb:5984/playlists
```

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: flask-config
data:
  COUCHDB_HOST: couchdb    # ◄── Service-Name!
  COUCHDB_PORT: "5984"
```

## DNS-Auflösung testen

```bash
# In einen Pod einloggen
kubectl -n fhdw-wta exec -it deployment/flask-webserver -- /bin/sh

# DNS testen
nslookup couchdb
# Server:    10.96.0.10
# Address:   10.96.0.10#53
# Name:      couchdb.fhdw-wta.svc.cluster.local
# Address:   10.96.192.228

# Oder mit curl
curl http://couchdb:5984/
```

## Cross-Namespace Zugriff

Wenn du auf einen Service in einem anderen Namespace zugreifen willst:

```
┌─────────────────────────────────────────────────────────────────┐
│  Namespace: fhdw-wta           Namespace: monitoring            │
│                                                                  │
│  ┌───────────────┐             ┌───────────────┐                │
│  │  Flask Pod    │   ──────►   │  Prometheus   │                │
│  │               │             │  Service      │                │
│  │  Zugriff:     │             │               │                │
│  │  prometheus.  │             │               │                │
│  │  monitoring   │             │               │                │
│  └───────────────┘             └───────────────┘                │
│                                                                  │
│  Muss Namespace angeben: prometheus.monitoring                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Zusammenfassung

```
Im gleichen Namespace:    couchdb
Anderer Namespace:        couchdb.other-namespace
Vollständig:              couchdb.fhdw-wta.svc.cluster.local
```

## Weiter

- [Services](services.md) - Service-Typen
- [Ports](ports.md) - Port-Konfiguration
