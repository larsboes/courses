# Kubernetes 101 Tutorial Summary

Complete summary of Labs 1-5 from https://kubernetes-101.bnerd.com/

---

## Lab 1: Explore Your Cluster

### Commands Used:
- `kubectl cluster-info` - Shows control plane is running on port 6443
- `kubectl get pods -n kube-system` - Displays 9 system pods (etcd, coredns, kube-proxy, controllers, etc.)
- `kubectl get nodes` - Confirms your node is Ready to accept deployments

### Concept:
Kubernetes requires system components to manage your cluster. The control plane manages Worker Nodes and Pods, operating on Port 6443 by default.

---

## Lab 2: Deploy Our App

### Commands Used:
- `kubectl create deployment hello-world --image=vtrhh/hello-world-app` - Creates a deployment
- `kubectl get deployments` - Shows deployment status (1/1 Ready)
- `kubectl get pods` - Shows the actual running container instance

### Concept:
**Deployment → Pod → Container** - Kubernetes manages this hierarchy automatically. Pods run on a private network (10.1.0.x) by default and aren't accessible externally yet.

---

## Lab 3: Expose Our App

### Commands Used:
- `kubectl get services` - View current services
- `kubectl expose deployment/hello-world --type="NodePort" --port 3000` - Expose with NodePort
- `kubectl delete service hello-world` - Delete NodePort service
- `kubectl expose deployment/hello-world --type="LoadBalancer" --port 3000` - Expose with LoadBalancer

### Concepts:

**NodePort:**
- Exposes app on a random high port (e.g., 30954)
- Access: `http://localhost:30954`
- Problem: Port changes on recreate, hard to remember

**LoadBalancer:**
- Exposes app on a consistent port (3000)
- Access: `http://localhost:3000`
- Solution: Docker Desktop maps it to localhost automatically

Services route external traffic to pods on the private network.

---

## Lab 4: Scaling

### Commands Used:
- `kubectl get rs` - Shows ReplicaSet (manages pod replicas)
- `kubectl scale deployments/hello-world --replicas=4` - Scale up to 4 pods
- `kubectl scale deployments/hello-world --replicas=2` - Scale down to 2 pods
- `hey -n 1000 http://localhost:3000/` - Load testing tool

### Concepts:

**What is Scaling?**
Running multiple copies (replicas) of your app to handle more traffic and provide redundancy.

**What Happened:**
1. **Started with:** 1 pod (default)
2. **Scaled up to:** 4 pods running simultaneously on different IPs
3. **Scaled down to:** 2 pods (Kubernetes automatically terminated 2)
4. **Load test:** Sent 1000 requests
   - Average: 7.8ms response time
   - 5,914 requests/sec
   - All requests distributed across both pods

**Kubernetes Magic:**
- Service (LoadBalancer) automatically distributes traffic across all healthy pods
- Add/remove pods instantly without downtime
- Each pod gets its own IP but shares the same service endpoint

---

## Lab 5: Updating our App

### Commands Used:
- `kubectl set image deployments/hello-world hello-world-app=vtrhh/hello-world-app:v2` - Update to new version
- `kubectl rollout status deployment/hello-world` - Monitor the rollout progress
- `kubectl rollout undo deployments/hello-world` - Rollback to previous version

### Concepts:

**What is a Rolling Update?**
A strategy to update your app **with zero downtime** by gradually replacing old pods with new ones.

**What Happened:**

**1. Rolling Update (v1 → v2):**
- Old pods: `hello-world-6cb4667c6d-*` (v1, b'nerd logo)
- New pods: `hello-world-776c6cc5c4-*` (v2, codetalks logo)
- Kubernetes created new pods **before** terminating old ones
- **Result:** Zero downtime during update

**2. Rollback (v2 → v1):**
- Instantly reverted to previous version
- New pods: `hello-world-6cb4667c6d-*` (back to v1)
- App shows original b'nerd logo again

**How Rolling Updates Work:**
```
Step 1: Create 1 new v2 pod (2 old + 1 new = 3 total)
Step 2: Terminate 1 old pod (1 old + 1 new = 2 total)
Step 3: Create another v2 pod (1 old + 2 new = 3 total)
Step 4: Terminate last old pod (0 old + 2 new = 2 total)
```
**Result:** Always maintain availability during updates!

**Kubernetes Benefits:**
- ✅ Zero downtime deployments
- ✅ Easy rollbacks with one command
- ✅ Automatic pod management
- ✅ Gradual rollout (not all at once)

---

## Key Kubernetes Concepts

### Architecture:
```
Deployment (defines desired state)
    ↓
ReplicaSet (manages replicas)
    ↓
Pods (running containers)
    ↓
Service (exposes pods to network)
```

### Current State After Labs 1-5:
```
hello-world deployment (2 replicas, v1 image)
    ↓
Pod 1: hello-world-6cb4667c6d-kqqtv
Pod 2: hello-world-6cb4667c6d-lsf5t
    ↓
Service (LoadBalancer) at localhost:3000
    ↓
Accessible from browser with load balancing
```

---

## Quick Reference Commands

| Command | Purpose |
|---------|---------|
| `kubectl cluster-info` | Show cluster information |
| `kubectl get nodes` | List cluster nodes |
| `kubectl get pods` | List pods in default namespace |
| `kubectl get pods -n <namespace>` | List pods in specific namespace |
| `kubectl get deployments` | List deployments |
| `kubectl get services` | List services |
| `kubectl get rs` | List ReplicaSets |
| `kubectl create deployment <name> --image=<image>` | Create deployment |
| `kubectl expose deployment/<name> --type=<type> --port=<port>` | Expose deployment |
| `kubectl scale deployments/<name> --replicas=<n>` | Scale deployment |
| `kubectl set image deployments/<name> <container>=<image>` | Update image |
| `kubectl rollout status deployment/<name>` | Check rollout status |
| `kubectl rollout undo deployments/<name>` | Rollback deployment |
| `kubectl delete service <name>` | Delete service |
| `kubectl delete deployment <name>` | Delete deployment |

---

*Generated during Kubernetes 101 tutorial completion - Labs 1-5*
