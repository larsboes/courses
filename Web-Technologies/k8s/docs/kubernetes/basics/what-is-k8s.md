# Was ist Kubernetes?

Kubernetes (K8s) ist ein "Betriebssystem für die Cloud". Es verwaltet Container so wie ein OS Prozesse verwaltet.

## Analogie: OS vs. Kubernetes

```
┌────────────────────────────────────────────────────────────────────┐
│                    ANALOGIE: OS vs. Kubernetes                      │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Traditionelles OS              Kubernetes                         │
│   ─────────────────              ──────────────                     │
│   Prozesse                  ───► Pods (Container)                   │
│   Dateisystem               ───► Persistent Volumes                 │
│   Netzwerk-Sockets          ───► Services                           │
│   Process Scheduler         ───► kube-scheduler                     │
│   Init System (systemd)     ───► Deployments                        │
│   Hostname/DNS              ───► Service Discovery                  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

## Deklarative Spezifikation

**Kernidee**: Du beschreibst den *gewünschten Zustand* (deklarativ), K8s sorgt dafür, dass dieser Zustand erreicht und gehalten wird.

```
┌─────────────────────────────────────────────────────────────────┐
│  IMPERATIV vs. DEKLARATIV                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Imperativ (Docker):           Deklarativ (K8s):                │
│  ──────────────────            ─────────────────                │
│                                                                  │
│  "Starte Container A"          "Ich will 3 Instanzen            │
│  "Starte Container B"           von Container A"                │
│  "Starte Container C"                                           │
│                                                                  │
│  Du sagst WIE                  Du sagst WAS                      │
│  Du bist verantwortlich        K8s ist verantwortlich           │
│                                                                  │
│  Container stirbt?             Container stirbt?                 │
│  → Du musst neu starten        → K8s startet automatisch neu    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Warum "Cloud OS"?

| Feature | Linux OS | Kubernetes |
|---------|----------|------------|
| Prozesse starten | `systemctl start nginx` | `kubectl apply -f deployment.yaml` |
| Prozesse überwachen | `systemctl status` | `kubectl get pods` |
| Auto-Restart | systemd unit restart | Deployment replicas |
| Netzwerk | IP, Ports, DNS | Services, Ingress |
| Storage | Dateisystem, Mounts | PV, PVC |
| Konfiguration | /etc/, ENV | ConfigMaps, Secrets |

## Weiter

- [Pods](pods.md) - Die kleinste Einheit in K8s
- [Deployments](deployments.md) - Pod-Management
