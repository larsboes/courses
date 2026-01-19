# Übung 11: Kubernetes Setup (Docker Desktop)

## 1. Setup Kubernetes via Docker Desktop (Mac)

Instead of Minikube, we are using the built-in Kubernetes cluster provided by Docker Desktop. This is often easier for local development on a Mac.

### Instructions:
1.  Open **Docker Desktop**.
2.  Click the **Settings** icon (gear) in the top right.
3.  Select **Kubernetes** from the left sidebar.
4.  Check the box **Enable Kubernetes**.
5.  Click **Apply & Restart**.
6.  Wait for the installation to complete (you will see a green Kubernetes icon in the bottom left of the Docker Desktop window).

### Verify Installation:
Open your terminal and run:
```bash
kubectl get nodes
```
You should see a node named `docker-desktop` (if using standard setup) or multiple nodes (if using Kind).

### Which Settings to Choose? (Kubeadm vs Kind)

If you see a choice between **Kubeadm** and **Kind** (e.g., in a Docker Extension):

*   **Option A: Kubeadm (Single Node)**
    *   *Best for:* Simplicity.
    *   *Result:* Creates a single node that acts as both control plane and worker.
    *   *Verdict:* Sufficient for this exercise.

*   **Option B: Kind (2 Nodes)**
    *   *Best for:* Learning the "OS of the Cloud" analogy.
    *   *Result:* Creates a multi-node cluster (1 control plane, 1 worker, or 2 workers).
    *   *Verdict:* **Recommended if you want to see scheduling in action.** Having 2 nodes allows you to see how Kubernetes decides *where* to run your pods (the "Scheduling" analogy mentioned below).

**Recommendation:** Go with **Kind (2 Nodes)** if you want to experiment with multi-node behavior, otherwise **Kubeadm** is perfectly fine and lighter on resources.

## 2. Task Questions

### Warum bezeichnet man K8s als „Betriebssystem der Cloud“? Welches sind die Analogien?

Kubernetes (K8s) wird oft als "Betriebssystem der Cloud" bezeichnet, weil es ähnliche Aufgaben für Cluster übernimmt wie ein herkömmliches Betriebssystem für einen einzelnen Computer.

**Analogien:**

*   **Ressourcenmanagement:**
    *   *OS:* Verwaltet CPU und RAM für Prozesse auf einem PC.
    *   *K8s:* Verwaltet CPU und RAM für Container über einen ganzen Cluster von Maschinen hinweg.
*   **Scheduling:**
    *   *OS:* Entscheidet, welcher Prozess wann auf welchem CPU-Kern läuft.
    *   *K8s:* Entscheidet, welcher Pod (Container-Gruppe) auf welchem Node (Server) läuft.
*   **Abstraktion:**
    *   *OS:* Abstrahiert die Hardware (Festplatte, Netzwerkkarte) für Anwendungen.
    *   *K8s:* Abstrahiert die zugrunde liegende Infrastruktur (Cloud-Provider, Rechenzentrum) für verteilte Anwendungen.
*   **Service Discovery & Kommunikation:**
    *   *OS:* Inter-Process Communication (IPC).
    *   *K8s:* Services und Ingress für die Kommunikation zwischen Microservices.

## 3. Difference: Docker Desktop K8s on Mac vs. Windows

While the user experience (`kubectl` commands) is nearly identical, the underlying architecture differs:

*   **Virtualization:**
    *   **Mac:** Docker Desktop runs a Linux Virtual Machine (VM) (using Apple's Virtualization framework) to host the Docker Engine and Kubernetes Control Plane.
    *   **Windows:** Docker Desktop typically uses **WSL 2** (Windows Subsystem for Linux) to run the Linux environment.
*   **Networking:**
    *   Both use magic DNS names like `host.docker.internal` to reach the host machine, but the implementation details of how traffic is routed from the container to the host differ.
*   **Performance:**
    *   File system performance (mounting local folders into containers) has historically been a bottleneck on Mac, though features like VirtioFS have improved this. WSL 2 on Windows generally offers very high performance for file systems inside the Linux distribution.
