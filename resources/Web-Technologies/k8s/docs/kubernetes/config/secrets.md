# Secrets

Secrets sind wie ConfigMaps, aber für **sensible Daten** wie Passwörter, API-Keys und Zertifikate.

## Secret vs ConfigMap

```
┌─────────────────────────────────────────────────────────────────┐
│  SECRET vs CONFIGMAP                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ConfigMap                        Secret                         │
│  ─────────                        ──────                         │
│  • Nicht-sensible Daten           • Passwörter, API Keys, Certs │
│  • Im Klartext gespeichert        • Base64 kodiert (!)          │
│  • Gut für: Ports, Hosts, URLs    • Gut für: Credentials        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Wichtig: Base64 ist KEINE Verschlüsselung!

```bash
$ echo "password" | base64
cGFzc3dvcmQK

$ echo "cGFzc3dvcmQK" | base64 -d
password                    # ◄── Jeder kann es dekodieren!
```

**In Produktion:**
- Secrets NICHT in Git committen!
- Nutze: Sealed Secrets, HashiCorp Vault, AWS Secrets Manager

## Secret YAML

### Mit stringData (empfohlen)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: couchdb-secret
type: Opaque                 # ◄── Generic Secret
stringData:                  # ◄── Klartext eingeben
  COUCHDB_USER: admin
  COUCHDB_PASSWORD: password
```

K8s kodiert automatisch zu base64.

### Mit data (base64 selbst)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: couchdb-secret
type: Opaque
data:                        # ◄── Base64 kodiert
  COUCHDB_USER: YWRtaW4=     # admin
  COUCHDB_PASSWORD: cGFzc3dvcmQ=  # password
```

## Im Pod nutzen

### Einzelne Env-Vars

```yaml
spec:
  containers:
    - name: flask
      env:
        - name: COUCHDB_USER
          valueFrom:
            secretKeyRef:
              name: couchdb-secret    # ◄── Secret-Name
              key: COUCHDB_USER       # ◄── Key im Secret

        - name: COUCHDB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: couchdb-secret
              key: COUCHDB_PASSWORD
```

### Alle Keys als Env-Vars

```yaml
spec:
  containers:
    - name: flask
      envFrom:
        - secretRef:
            name: couchdb-secret      # ◄── Alle Keys werden Env-Vars
```

## Secret-Typen

| Type | Verwendung |
|------|------------|
| `Opaque` | Generic, beliebige Daten (Default) |
| `kubernetes.io/tls` | TLS Zertifikat + Key |
| `kubernetes.io/dockerconfigjson` | Docker Registry Credentials |
| `kubernetes.io/basic-auth` | Username + Password |

## Befehle

```bash
# Secrets anzeigen (Daten versteckt)
kubectl -n fhdw-wta get secrets

# Secret Details (Daten immer noch base64)
kubectl -n fhdw-wta describe secret couchdb-secret

# Secret Daten anzeigen (dekodiert)
kubectl -n fhdw-wta get secret couchdb-secret -o jsonpath='{.data.COUCHDB_PASSWORD}' | base64 -d

# Secret erstellen
kubectl create secret generic my-secret \
  --from-literal=username=admin \
  --from-literal=password=secret123
```

## Best Practices

1. **Nie in Git committen** - Nutze .gitignore oder externe Secret-Management
2. **RBAC** - Beschränke wer Secrets lesen kann
3. **Rotation** - Ändere Secrets regelmäßig
4. **Verschlüsselung at rest** - Aktiviere etcd Encryption

## Weiter

- [ConfigMaps](configmaps.md) - Nicht-sensible Konfiguration
- [Kustomize](kustomize.md) - Umgebungsspezifische Secrets
