# Volumes & Persistent Storage

Pods sind kurzlebig - ihre Daten gehen verloren wenn sie neu starten. Persistent Volumes lösen dieses Problem.

## Das Problem

```
┌─────────────────────────────────────────────────────────────────┐
│                    DAS SPEICHER-PROBLEM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Ohne Volumes:                                                   │
│  ─────────────                                                   │
│                                                                  │
│   ┌──────────────┐      Pod stirbt      ┌──────────────┐        │
│   │   CouchDB    │                      │   CouchDB    │        │
│   │              │    ───────────►      │   (NEU)      │        │
│   │  Daten       │         💀           │              │        │
│   │  (im Pod)    │                      │  LEER!       │        │
│   └──────────────┘                      └──────────────┘        │
│                                                                  │
│   Alle Daten verloren!                                          │
│                                                                  │
│                                                                  │
│  Mit PersistentVolume:                                           │
│  ─────────────────────                                           │
│                                                                  │
│   ┌──────────────┐      Pod stirbt      ┌──────────────┐        │
│   │   CouchDB    │                      │   CouchDB    │        │
│   │      │       │    ───────────►      │   (NEU)      │        │
│   │      │       │         💀           │      │       │        │
│   └──────┼───────┘                      └──────┼───────┘        │
│          │                                     │                 │
│          ▼                                     ▼                 │
│   ┌──────────────────────────────────────────────────┐          │
│   │            PERSISTENT VOLUME                      │          │
│   │            Daten bleiben erhalten!               │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                  │
│   Daten überleben Pod-Neustarts!                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## PVC = Speicher-Anfrage

```
┌─────────────────────────────────────────────────────────────────┐
│              PERSISTENT VOLUME CLAIM (PVC)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PVC = "Ich brauche Speicher mit diesen Eigenschaften"          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  PVC: couchdb-pvc                                        │    │
│  │                                                          │    │
│  │  "Ich brauche:                                           │    │
│  │   - 1 GB Speicher                                        │    │
│  │   - ReadWriteOnce Zugriff"                              │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                             │ K8s findet/erstellt                │
│                             │ passendes PV                       │
│                             ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  PV (PersistentVolume) - automatisch erstellt           │    │
│  │                                                          │    │
│  │  Tatsächlicher Speicherplatz auf dem Host               │    │
│  │  (bei kind: im Docker Volume)                            │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Access Modes

| Mode | Abkürzung | Beschreibung |
|------|-----------|--------------|
| ReadWriteOnce | RWO | Ein Pod, lesen+schreiben |
| ReadOnlyMany | ROX | Viele Pods, nur lesen |
| ReadWriteMany | RWX | Viele Pods, lesen+schreiben |

**Für Datenbanken: Immer ReadWriteOnce!**

## PVC YAML

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: couchdb-pvc
spec:
  accessModes:
    - ReadWriteOnce           # ◄── Ein Pod kann lesen/schreiben
  resources:
    requests:
      storage: 1Gi            # ◄── 1 Gigabyte Speicher
```

## Volume im Pod mounten

```yaml
spec:
  containers:
    - name: couchdb
      image: couchdb:3
      volumeMounts:                     # ◄── WO im Container
        - name: couchdb-storage
          mountPath: /opt/couchdb/data  # ◄── Pfad IM Container

  volumes:                              # ◄── WAS gemountet wird
    - name: couchdb-storage
      persistentVolumeClaim:
        claimName: couchdb-pvc          # ◄── Verweis auf PVC
```

## Volume Mounting visualisiert

```
┌────────────────────────────────────────────────────────────┐
│  POD: couchdb                                               │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  CONTAINER: couchdb                                 │    │
│  │                                                     │    │
│  │  Filesystem:                                        │    │
│  │  /                                                  │    │
│  │  ├── opt/                                           │    │
│  │  │   └── couchdb/                                   │    │
│  │  │       └── data/ ◄────┐  mountPath                │    │
│  │  │           ├── shards/ │                          │    │
│  │  │           └── *.couch │                          │    │
│  │  └── ...                 │                          │    │
│  │                          │                          │    │
│  └──────────────────────────┼──────────────────────────┘    │
│                             │                                │
│  volumes:                   │                                │
│    - name: couchdb-data ────┘                                │
│      persistentVolumeClaim:                                  │
│        claimName: couchdb-pvc ──────────┐                    │
│                                         │                    │
└─────────────────────────────────────────┼────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────┐
│  PVC: couchdb-pvc                                           │
│  storage: 1Gi                                               │
│                                                             │
│  Speicherort: /var/lib/kubelet/pods/.../volumes/...        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Daten bleiben erhalten wenn Pod neu startet!         │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Befehle

```bash
# PVCs anzeigen
kubectl -n fhdw-wta get pvc

# PVC Details
kubectl -n fhdw-wta describe pvc couchdb-pvc

# PVs anzeigen (cluster-weit)
kubectl get pv
```

## Weiter

- [ConfigMaps](../config/configmaps.md) - Konfiguration
- [Secrets](../config/secrets.md) - Sensible Daten
