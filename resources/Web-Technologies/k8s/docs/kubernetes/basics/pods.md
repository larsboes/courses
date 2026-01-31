# Pods

Ein Pod ist die kleinste deploybare Einheit in Kubernetes - eine Gruppe von Containern, die zusammen laufen und sich Ressourcen teilen.

## Pod-Struktur

```
┌─────────────────────────────────────────────────────────────────┐
│  POD                                                             │
│  ════                                                            │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │   Container 1   │  │   Container 2   │   (selten mehrere)    │
│  │   (App)         │  │   (Sidecar)     │                       │
│  └────────┬────────┘  └────────┬────────┘                       │
│           │                    │                                 │
│           └────────┬───────────┘                                 │
│                    │                                             │
│           ┌────────┴────────┐                                    │
│           │  Shared Network │  ◄── Container kommunizieren       │
│           │  (localhost)    │      über localhost                │
│           └────────┬────────┘                                    │
│                    │                                             │
│           ┌────────┴────────┐                                    │
│           │  Shared Storage │  ◄── Gemeinsame Volumes            │
│           │  (Volumes)      │                                    │
│           └─────────────────┘                                    │
│                                                                  │
│  IP: 10.244.0.15 (Cluster-intern)                               │
│  Hostname: flask-webserver-5f9f8664b-jpfgc                      │
└─────────────────────────────────────────────────────────────────┘
```

## Container im Pod teilen sich:

| Ressource | Beschreibung |
|-----------|--------------|
| **Network Namespace** | Gleiche IP, können über `localhost` kommunizieren |
| **Volumes** | Gemeinsamer Speicher zwischen Containern |
| **IPC** | Inter-Process Communication |

## Pods sind ephemeral!

**Wichtig**: Pods sind *kurzlebig* - sie können jederzeit sterben und neu erstellt werden!

```
┌─────────────────────────────────────────────────────────────────┐
│  PODS SIND KURZLEBIG                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pod erstellt          Pod stirbt           Neuer Pod            │
│       ✨                    💀                   ✨               │
│                                                                  │
│  ┌───────────┐        ┌───────────┐        ┌───────────┐        │
│  │   Pod     │        │   Pod X   │        │   Pod     │        │
│  │           │  ───►  │           │  ───►  │           │        │
│  │ IP: .15   │        │           │        │ IP: .47   │        │
│  └───────────┘        └───────────┘        └───────────┘        │
│                                                                  │
│  Neue IP!                                                        │
│  Neuer Hostname!                                                 │
│  Daten weg (ohne PVC)!                                          │
│                                                                  │
│  ➡️  Deshalb brauchen wir Services für stabile Adressen!        │
│  ➡️  Deshalb brauchen wir PVC für persistente Daten!            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Pod YAML Beispiel

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: flask-pod
  labels:
    component: webserver    # ◄── Labels für Service-Matching
spec:
  containers:
    - name: flask
      image: meta-playlist:latest
      ports:
        - containerPort: 8001
```

## Wann mehrere Container pro Pod?

In der Regel: **Ein Container pro Pod!**

Mehrere Container nur wenn sie:
- Zusammen skaliert werden müssen
- Zusammen starten/stoppen müssen
- Gemeinsame Daten brauchen

Beispiele:
- App + Log-Shipper (Sidecar)
- App + Proxy (Ambassador)
- App + Config-Reloader

## Weiter

- [Deployments](deployments.md) - Pods automatisch verwalten
- [Services](../networking/services.md) - Stabile Adressen für Pods
