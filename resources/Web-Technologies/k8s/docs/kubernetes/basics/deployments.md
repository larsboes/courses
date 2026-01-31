# Deployments

Ein Deployment sorgt dafür, dass immer die gewünschte Anzahl Pods läuft. Es bietet Self-Healing und Rolling Updates.

## Deployment-Struktur

```
┌─────────────────────────────────────────────────────────────────┐
│  DEPLOYMENT: flask-webserver                                     │
│  ═══════════════════════════                                     │
│                                                                  │
│  spec:                                                           │
│    replicas: 2        ◄── "Ich will immer 2 Pods!"              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  ReplicaSet (wird automatisch erstellt)                     ││
│  │                                                             ││
│  │   ┌─────────────┐    ┌─────────────┐                       ││
│  │   │   Pod 1     │    │   Pod 2     │                       ││
│  │   │  (Running)  │    │  (Running)  │                       ││
│  │   └─────────────┘    └─────────────┘                       ││
│  │                                                             ││
│  │   Wenn ein Pod stirbt ───► K8s startet automatisch neuen!  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Self-Healing

K8s überwacht ständig und repariert automatisch:

```
Was passiert bei einem Crash?
─────────────────────────────

  Pod 1 stirbt!          K8s bemerkt es          Neuer Pod 1
       💀          ───►      🔍           ───►       ✨

  ┌─────────┐           ┌─────────┐           ┌─────────┐
  │ Pod 1 X │           │ Pod 2 ✓ │           │ Pod 1 ✓ │
  │ Pod 2 ✓ │    ───►   │ (nur 1  │    ───►   │ Pod 2 ✓ │
  │         │           │  läuft) │           │ (wieder │
  └─────────┘           └─────────┘           │  2!)    │
                                              └─────────┘
```

## Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-webserver
spec:
  replicas: 2                       # ◄── Anzahl der Pods

  selector:
    matchLabels:
      component: webserver          # ◄── "Ich manage Pods mit diesem Label"

  template:                         # ◄── Pod-Template
    metadata:
      labels:
        component: webserver        # ◄── MUSS mit selector matchen!
    spec:
      containers:
        - name: flask
          image: meta-playlist:latest
          ports:
            - containerPort: 8001
```

## Label Matching

```
┌─────────────────────────────────────────────────────────────────┐
│  SELECTOR + LABELS                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Deployment:                    Pods:                            │
│  ───────────                    ─────                            │
│  selector:                      labels:                          │
│    matchLabels:                   component: webserver  ✓ Match! │
│      component: webserver                                        │
│                                 labels:                          │
│                                   component: webserver  ✓ Match! │
│                                                                  │
│                                 labels:                          │
│                            ✗     component: database             │
│                                  (kein Match!)                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Wichtige Einstellungen

### imagePullPolicy

```yaml
imagePullPolicy: IfNotPresent   # Für lokale Images (kind)
```

| Policy | Verhalten |
|--------|-----------|
| `Always` | Immer vom Registry pullen |
| `IfNotPresent` | Lokales Image nutzen wenn vorhanden |
| `Never` | Nur lokale Images |

### readinessProbe

```yaml
readinessProbe:               # ◄── "Ist der Pod bereit für Traffic?"
  httpGet:
    path: /
    port: 8001
  initialDelaySeconds: 5      # ◄── Warte 5s nach Start
  periodSeconds: 5            # ◄── Prüfe alle 5s
```

### livenessProbe

```yaml
livenessProbe:                # ◄── "Lebt der Container noch?"
  httpGet:
    path: /
    port: 8001
  initialDelaySeconds: 30     # ◄── Warte 30s (App braucht Zeit)
  periodSeconds: 10
```

| Probe | Wenn fehlschlägt | Gut für |
|-------|-----------------|---------|
| readinessProbe | Kein Traffic, Pod läuft weiter | Startup-Phase |
| livenessProbe | K8s startet Container neu! | Deadlock-Erkennung |

## Befehle

```bash
# Deployment erstellen
kubectl apply -f deployment.yaml

# Status prüfen
kubectl get deployments
kubectl get pods

# Skalieren
kubectl scale deployment flask-webserver --replicas=3

# Rolling Update
kubectl set image deployment/flask-webserver flask=meta-playlist:v2

# Rollback
kubectl rollout undo deployment/flask-webserver
```

## Weiter

- [Services](../networking/services.md) - Traffic zu Pods leiten
- [ConfigMaps](../config/configmaps.md) - Konfiguration injizieren
