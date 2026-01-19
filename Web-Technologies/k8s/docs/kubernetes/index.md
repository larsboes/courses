# Kubernetes Lernpfad

Strukturierte Dokumentation zum Erlernen von Kubernetes für die FHDW Web Technologies Übungen.

## Lernpfad

```
1. Basics          → Was ist K8s? Pods, Deployments
        ↓
2. Networking      → Services, Ports, DNS
        ↓
3. Storage         → Volumes, PVC
        ↓
4. Configuration   → ConfigMaps, Secrets, Kustomize
        ↓
5. Meta Playlist   → Unsere App auf K8s
```

---

## 1. Basics

Grundlegende Kubernetes-Konzepte verstehen.

| Datei | Inhalt |
|-------|--------|
| [Was ist Kubernetes?](basics/what-is-k8s.md) | K8s als "Cloud OS", deklarative Spezifikation |
| [Pods](basics/pods.md) | Die kleinste Einheit, Container-Gruppen |
| [Deployments](basics/deployments.md) | Pod-Management, Replicas, Self-Healing |

---

## 2. Networking

Wie Netzwerk in Kubernetes funktioniert.

| Datei | Inhalt |
|-------|--------|
| [Services](networking/services.md) | ClusterIP, NodePort, LoadBalancer |
| [Ports](networking/ports.md) | containerPort vs port vs targetPort vs nodePort |
| [DNS](networking/dns.md) | Service Discovery, DNS-Namen |

---

## 3. Storage

Persistente Datenhaltung in Kubernetes.

| Datei | Inhalt |
|-------|--------|
| [Volumes](storage/volumes.md) | PV, PVC, volumeMounts, Access Modes |

---

## 4. Configuration

Konfiguration von Anwendungen.

| Datei | Inhalt |
|-------|--------|
| [ConfigMaps](config/configmaps.md) | Nicht-sensible Konfiguration |
| [Secrets](config/secrets.md) | Sensible Daten (Passwörter, Keys) |
| [Kustomize](config/kustomize.md) | Base + Overlays Pattern |

---

## 5. Meta Playlist App

Unsere Anwendung auf Kubernetes.

| Datei | Inhalt |
|-------|--------|
| [Architektur](meta-playlist/architecture.md) | Gesamtübersicht, Diagramme |
| [Manifests](meta-playlist/manifests.md) | Alle YAML-Dateien erklärt |

---

## Quick Reference

```bash
# Deployen
kubectl apply -k overlays/uebung-12/

# Status
kubectl -n fhdw-wta get all

# Logs
kubectl -n fhdw-wta logs -l component=webserver

# Löschen
kubectl delete -k overlays/uebung-12/
```
