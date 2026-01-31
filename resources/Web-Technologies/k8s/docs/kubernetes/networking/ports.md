# Ports in Kubernetes

Es gibt verschiedene Port-Typen in K8s. Hier eine klare Erklärung.

## Die vier Port-Typen

```
┌─────────────────────────────────────────────────────────────────┐
│                     DIE PORT-TYPEN                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. containerPort (im Pod)                                       │
│     ─────────────────────                                        │
│     Der Port, auf dem die App IM Container lauscht               │
│     Beispiel: Flask lauscht auf Port 8001                        │
│                                                                  │
│  2. targetPort (im Service)                                      │
│     ───────────────────────                                      │
│     Wohin der Service Traffic leitet                             │
│     Muss mit containerPort übereinstimmen                        │
│                                                                  │
│  3. port (im Service)                                            │
│     ─────────────────                                            │
│     Der Port des Services INNERHALB des Clusters                 │
│     Andere Pods erreichen den Service über diesen Port           │
│                                                                  │
│  4. nodePort (NodePort Service)                                  │
│     ───────────────────────────                                  │
│     Der Port auf dem HOST/NODE für EXTERNEN Zugriff              │
│     Range: 30000-32767                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Wie die Ports zusammenhängen

```
                          EXTERNE WELT
                               │
                          localhost:30001      ◄── nodePort
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│  NODE (dein Computer / kind-Container)                           │
│                                                                   │
│                         nodePort: 30001                           │
│                               │                                   │
│                               ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SERVICE: flask-webserver                                   │  │
│  │  Type: NodePort                                             │  │
│  │                                                             │  │
│  │  port: 8001 ◄── andere Pods nutzen diesen Port intern      │  │
│  │  targetPort: 8001 ◄── leitet weiter an Container-Port      │  │
│  │  nodePort: 30001 ◄── externer Zugang                       │  │
│  │                                                             │  │
│  └───────────────────────────────┬────────────────────────────┘  │
│                                  │                                │
│                    ┌─────────────┴─────────────┐                  │
│                    ▼                           ▼                  │
│  ┌─────────────────────────────┐ ┌─────────────────────────────┐ │
│  │  POD                        │ │  POD                        │ │
│  │                             │ │                             │ │
│  │  ┌───────────────────────┐  │ │  ┌───────────────────────┐  │ │
│  │  │ Container             │  │ │  │ Container             │  │ │
│  │  │ containerPort: 8001   │  │ │  │ containerPort: 8001   │  │ │
│  │  │                       │  │ │  │                       │  │ │
│  │  │  Flask App lauscht    │  │ │  │  Flask App lauscht    │  │ │
│  │  │  auf 0.0.0.0:8001     │  │ │  │  auf 0.0.0.0:8001     │  │ │
│  │  └───────────────────────┘  │ │  └───────────────────────┘  │ │
│  └─────────────────────────────┘ └─────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

## Zusammenfassung

| Port | Wo definiert | Wer nutzt es | Beispiel |
|------|--------------|--------------|----------|
| containerPort | Pod/Deployment | Die App selbst | Flask: 8001 |
| targetPort | Service | Service → Container | 8001 |
| port | Service | Cluster intern | 8001 |
| nodePort | Service (NodePort) | Externe Clients | 30001 |

## In YAML

### Deployment (containerPort)

```yaml
spec:
  containers:
    - name: flask
      image: meta-playlist:latest
      ports:
        - containerPort: 8001    # ◄── App lauscht hier
```

### Service (port, targetPort, nodePort)

```yaml
spec:
  type: NodePort
  ports:
    - port: 8001           # ◄── Cluster-intern
      targetPort: 8001     # ◄── → Container
      nodePort: 30001      # ◄── Extern
```

## Typische Konfiguration

Oft sind `port` und `targetPort` gleich:

```yaml
ports:
  - port: 8001          # Service-Port = Container-Port
    targetPort: 8001    # Kann weggelassen werden wenn gleich
```

Aber manchmal unterschiedlich:

```yaml
ports:
  - port: 80            # Service nach außen auf 80
    targetPort: 8001    # Container intern auf 8001
```

## Zugriffswege

```
Von außen (Browser):
  localhost:30001 → nodePort → Service → targetPort → Container

Von anderem Pod:
  flask-webserver:8001 → port → targetPort → Container

Innerhalb des Pods:
  localhost:8001 → containerPort → App
```

## Weiter

- [DNS](dns.md) - Service-Namen auflösen
- [Services](services.md) - Service-Typen
