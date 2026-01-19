# ConfigMaps

ConfigMaps speichern Konfiguration **außerhalb** des Container-Images. So kannst du das gleiche Image in verschiedenen Umgebungen nutzen.

## Warum ConfigMaps?

```
┌─────────────────────────────────────────────────────────────────┐
│  OHNE ConfigMap:                 MIT ConfigMap:                  │
│  ───────────────                 ─────────────                   │
│                                                                  │
│  ┌──────────────┐               ┌──────────────┐                │
│  │   Image      │               │   Image      │                │
│  │              │               │              │                │
│  │ DB_HOST=xyz  │  HART         │ DB_HOST=???  │  FLEXIBEL     │
│  │ DB_PORT=123  │  KODIERT      │ DB_PORT=???  │                │
│  └──────────────┘               └──────┬───────┘                │
│                                        │                         │
│  Neues Image für                       ▼                         │
│  jede Umgebung!            ┌──────────────┐                     │
│                            │  ConfigMap   │                     │
│                            │              │                     │
│                            │ DB_HOST=abc  │  Wird zur           │
│                            │ DB_PORT=456  │  Laufzeit           │
│                            └──────────────┘  injiziert          │
│                                                                  │
│  Gleiches Image für Dev, Staging, Prod!                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## ConfigMap YAML

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: flask-config
data:                        # ◄── Key-Value Paare (Klartext)
  COUCHDB_HOST: couchdb      # ◄── Service-Name! K8s DNS löst das auf
  COUCHDB_PORT: "5984"       # ◄── Port als String (YAML Quirk)
```

## Im Pod nutzen

### Variante 1: Einzelne Env-Vars

```yaml
spec:
  containers:
    - name: flask
      env:
        - name: COUCHDB_HOST
          valueFrom:
            configMapKeyRef:
              name: flask-config      # ◄── ConfigMap-Name
              key: COUCHDB_HOST       # ◄── Key in ConfigMap
```

### Variante 2: Alle Keys als Env-Vars

```yaml
spec:
  containers:
    - name: flask
      envFrom:
        - configMapRef:
            name: flask-config        # ◄── Alle Keys werden Env-Vars
```

### Variante 3: Als Datei mounten

```yaml
spec:
  containers:
    - name: flask
      volumeMounts:
        - name: config-volume
          mountPath: /etc/config

  volumes:
    - name: config-volume
      configMap:
        name: flask-config
```

Ergebnis: Dateien `/etc/config/COUCHDB_HOST` und `/etc/config/COUCHDB_PORT`

## Service-Namen in ConfigMaps

```
COUCHDB_HOST: couchdb
             └───────┘
             Das ist der SERVICE-NAME!

K8s DNS löst "couchdb" auf zu:
couchdb.fhdw-wta.svc.cluster.local
→ IP des CouchDB Service
```

## ConfigMap vs. hardcoded

| Aspekt | Hardcoded | ConfigMap |
|--------|-----------|-----------|
| Image ändern | Ja, für jede Config | Nein |
| Umgebungswechsel | Neues Build | Nur ConfigMap ändern |
| Übersichtlichkeit | Config im Code verstreut | Zentral an einem Ort |

## Befehle

```bash
# ConfigMaps anzeigen
kubectl -n fhdw-wta get configmaps

# ConfigMap Details
kubectl -n fhdw-wta describe configmap flask-config

# ConfigMap erstellen aus Datei
kubectl create configmap my-config --from-file=config.properties

# ConfigMap erstellen aus Literal
kubectl create configmap my-config --from-literal=KEY=value
```

## Weiter

- [Secrets](secrets.md) - Für sensible Daten
- [Kustomize](kustomize.md) - Umgebungsspezifische Configs
