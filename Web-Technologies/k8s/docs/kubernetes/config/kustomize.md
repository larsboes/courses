# Kustomize

Kustomize = Kubernetes + Customize. Es ermöglicht umgebungsspezifische Konfiguration ohne Duplikation.

## Das Pattern: Base + Overlays

```
┌─────────────────────────────────────────────────────────────────┐
│  KUSTOMIZE STRUKTUR                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │                      base/                            │       │
│  │              (gemeinsame Ressourcen)                  │       │
│  └────────────────────────┬─────────────────────────────┘       │
│                           │                                      │
│          ┌────────────────┼────────────────┐                    │
│          ▼                ▼                ▼                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ overlays/    │ │ overlays/    │ │ overlays/    │            │
│  │ uebung-11/   │ │ uebung-12/   │ │ production/  │            │
│  │              │ │              │ │              │            │
│  │ + nginx      │ │ + flask      │ │ + replicas:5 │            │
│  │              │ │ + couchdb    │ │ + secrets    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  Befehl: kubectl apply -k overlays/uebung-12/                   │
│          └─ -k = Kustomize mode                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Verzeichnisstruktur

```
k8s/
├── base/                           # Gemeinsame Basis
│   ├── kustomization.yaml
│   └── namespace.yaml
│
└── overlays/
    ├── uebung-11/                  # Übung 11 spezifisch
    │   ├── kustomization.yaml
    │   ├── deployment.yaml
    │   └── service.yaml
    │
    └── uebung-12/                  # Übung 12 spezifisch
        ├── kustomization.yaml
        ├── flask-deployment.yaml
        ├── couchdb-deployment.yaml
        └── ...
```

## kustomization.yaml

### Base

```yaml
# base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: fhdw-wta              # ◄── Default Namespace

resources:                       # ◄── Welche Dateien
  - namespace.yaml

commonLabels:                    # ◄── Labels für ALLE Ressourcen
  course: web-technologies
  institution: fhdw
```

### Overlay

```yaml
# overlays/uebung-12/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: fhdw-wta

resources:                       # ◄── Erbt von base + eigene Dateien
  - ../../base
  - couchdb-pvc.yaml
  - couchdb-secret.yaml
  - couchdb-deployment.yaml
  - couchdb-service.yaml
  - flask-configmap.yaml
  - flask-deployment.yaml
  - flask-service.yaml

commonLabels:                    # ◄── Zusätzliche Labels
  exercise: uebung-12
  app: meta-playlist
```

## Was Kustomize kann

### 1. Namespace setzen

```yaml
namespace: fhdw-wta    # Alle Ressourcen bekommen diesen Namespace
```

### 2. Labels hinzufügen

```yaml
commonLabels:
  app: meta-playlist   # Wird zu allen Ressourcen hinzugefügt
```

### 3. Prefixes/Suffixes

```yaml
namePrefix: prod-     # Alle Namen werden: prod-flask-webserver
nameSuffix: -v2       # Alle Namen werden: flask-webserver-v2
```

### 4. Patches

```yaml
patches:
  - patch: |-
      - op: replace
        path: /spec/replicas
        value: 5
    target:
      kind: Deployment
      name: flask-webserver
```

## Befehle

```bash
# Kustomize Ergebnis anzeigen (ohne anzuwenden)
kubectl kustomize overlays/uebung-12/

# Mit Kustomize deployen
kubectl apply -k overlays/uebung-12/

# Mit Kustomize löschen
kubectl delete -k overlays/uebung-12/
```

## Vorteile

| Ohne Kustomize | Mit Kustomize |
|----------------|---------------|
| Copy-Paste von YAML | Gemeinsame Base |
| Änderung in jedem File | Änderung an einer Stelle |
| Umgebungs-Branches | Umgebungs-Overlays |
| Fehleranfällig | Konsistent |

## Weiter

- [ConfigMaps](configmaps.md) - Konfiguration
- [Secrets](secrets.md) - Sensible Daten
- [Architektur](../meta-playlist/architecture.md) - Unsere App-Struktur
