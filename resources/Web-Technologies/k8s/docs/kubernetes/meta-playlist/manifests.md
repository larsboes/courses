# Meta Playlist Manifests

Alle Kubernetes Manifest-Dateien für die Meta Playlist Anwendung, annotiert und erklärt.

## Dateistruktur

```
k8s/
├── base/
│   ├── kustomization.yaml
│   └── namespace.yaml
│
└── overlays/uebung-12/
    ├── kustomization.yaml
    ├── flask-configmap.yaml
    ├── couchdb-secret.yaml
    ├── flask-deployment.yaml
    ├── flask-service.yaml
    ├── couchdb-deployment.yaml
    ├── couchdb-service.yaml
    └── couchdb-pvc.yaml
```

---

## 1. Namespace

```yaml
# base/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: fhdw-wta              # ◄── Isoliert unsere Ressourcen
  labels:
    course: web-technologies
    institution: fhdw
```

---

## 2. Kustomization

```yaml
# overlays/uebung-12/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: fhdw-wta           # ◄── Namespace für alle Ressourcen

resources:                    # ◄── Was deployt wird
  - ../../base                # ◄── Erbt namespace.yaml
  - couchdb-pvc.yaml
  - couchdb-secret.yaml
  - couchdb-deployment.yaml
  - couchdb-service.yaml
  - flask-configmap.yaml
  - flask-deployment.yaml
  - flask-service.yaml

commonLabels:                 # ◄── Labels für ALLE Ressourcen
  exercise: uebung-12
  app: meta-playlist
```

---

## 3. ConfigMap

```yaml
# flask-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: flask-config
data:
  COUCHDB_HOST: couchdb       # ◄── Service-Name (DNS)
  COUCHDB_PORT: "5984"        # ◄── Als String
```

---

## 4. Secret

```yaml
# couchdb-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: couchdb-secret
type: Opaque
stringData:                   # ◄── Klartext, wird base64 kodiert
  COUCHDB_USER: admin
  COUCHDB_PASSWORD: password
```

---

## 5. Flask Deployment

```yaml
# flask-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-webserver
spec:
  replicas: 2                           # ◄── 2 Instanzen

  selector:
    matchLabels:
      component: webserver              # ◄── Findet Pods

  template:
    metadata:
      labels:
        component: webserver            # ◄── Muss matchen!
    spec:
      containers:
        - name: flask
          image: meta-playlist:latest
          imagePullPolicy: IfNotPresent # ◄── Lokales Image

          ports:
            - containerPort: 8001       # ◄── App Port

          env:                          # ◄── Environment Variables
            - name: COUCHDB_USER
              valueFrom:
                secretKeyRef:
                  name: couchdb-secret
                  key: COUCHDB_USER

            - name: COUCHDB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: couchdb-secret
                  key: COUCHDB_PASSWORD

            - name: COUCHDB_HOST
              valueFrom:
                configMapKeyRef:
                  name: flask-config
                  key: COUCHDB_HOST

            - name: COUCHDB_PORT
              valueFrom:
                configMapKeyRef:
                  name: flask-config
                  key: COUCHDB_PORT

            - name: COUCHDB_URL         # ◄── Zusammengesetzt
              value: "http://$(COUCHDB_USER):$(COUCHDB_PASSWORD)@$(COUCHDB_HOST):$(COUCHDB_PORT)"

          readinessProbe:               # ◄── Bereit für Traffic?
            httpGet:
              path: /
              port: 8001
            initialDelaySeconds: 5
            periodSeconds: 5
```

---

## 6. Flask Service

```yaml
# flask-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: flask-webserver
spec:
  type: NodePort                        # ◄── Extern erreichbar!

  selector:
    component: webserver                # ◄── Findet Pods

  ports:
    - protocol: TCP
      port: 8001                        # ◄── Cluster-intern
      targetPort: 8001                  # ◄── Container-Port
      nodePort: 30001                   # ◄── localhost:30001
```

---

## 7. CouchDB Deployment

```yaml
# couchdb-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: couchdb
spec:
  replicas: 1                           # ◄── Eine DB-Instanz

  selector:
    matchLabels:
      component: database

  template:
    metadata:
      labels:
        component: database
    spec:
      containers:
        - name: couchdb
          image: couchdb:latest
          imagePullPolicy: IfNotPresent

          ports:
            - containerPort: 5984       # ◄── CouchDB API

          env:
            - name: COUCHDB_USER
              valueFrom:
                secretKeyRef:
                  name: couchdb-secret
                  key: COUCHDB_USER

            - name: COUCHDB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: couchdb-secret
                  key: COUCHDB_PASSWORD

          volumeMounts:                 # ◄── Daten persistent
            - name: couchdb-data
              mountPath: /opt/couchdb/data

          readinessProbe:
            httpGet:
              path: /
              port: 5984
            initialDelaySeconds: 10
            periodSeconds: 5

          livenessProbe:                # ◄── Noch am leben?
            httpGet:
              path: /
              port: 5984
            initialDelaySeconds: 30
            periodSeconds: 10

      volumes:                          # ◄── PVC referenzieren
        - name: couchdb-data
          persistentVolumeClaim:
            claimName: couchdb-pvc
```

---

## 8. CouchDB Service

```yaml
# couchdb-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: couchdb                         # ◄── DNS: "couchdb"
spec:
  type: ClusterIP                       # ◄── NUR intern!

  selector:
    component: database

  ports:
    - protocol: TCP
      port: 5984
      targetPort: 5984
```

---

## 9. PersistentVolumeClaim

```yaml
# couchdb-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: couchdb-pvc
spec:
  accessModes:
    - ReadWriteOnce                     # ◄── Ein Pod lesen/schreiben
  resources:
    requests:
      storage: 1Gi                      # ◄── 1 GB Speicher
```

---

## Deployment-Befehle

```bash
# Image bauen
docker build -t meta-playlist:latest ../Uebung_10

# Image in kind laden (wenn kind CLI nicht verfügbar)
docker save meta-playlist:latest | docker exec -i desktop-control-plane ctr --namespace k8s.io images import -

# Deployen
kubectl apply -k overlays/uebung-12/

# Status
kubectl -n fhdw-wta get all

# Logs
kubectl -n fhdw-wta logs -l component=webserver
kubectl -n fhdw-wta logs -l component=database

# In Pod einloggen
kubectl -n fhdw-wta exec -it deployment/flask-webserver -- /bin/sh

# Löschen
kubectl delete -k overlays/uebung-12/
```
