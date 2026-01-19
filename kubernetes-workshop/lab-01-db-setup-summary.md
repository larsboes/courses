# Lab 01: Database Setup - Session Summary

**Workshop**: Kubernetes Advanced (bnerd.com)
**Namespace**: `workshop17`
**Date**: 2025-11-14
**Status**: ✅ **COMPLETED**

---

## What Was Completed

### 1. PostgreSQL Instance Deployment
- Created and deployed a PostgreSQL database using the Zalando Postgres Operator
- Configuration: PostgreSQL 17, 1 instance, 10Gi storage
- File: `db-instance.yaml`

### 2. Database Initialization
- Deployed a Kubernetes Job to initialize the database
- Created `todos` database with `todos` table
- Loaded 4 sample todo items
- File: `db-job.yaml`

### 3. Verification
- Confirmed PostgreSQL pod is running
- Verified database and table creation
- Checked sample data is loaded correctly

---

## Issues Encountered & Solutions

### Problem: Volume Attachment Issues
**Symptoms:**
- PostgreSQL pod stuck in `ContainerCreating` for 8+ minutes
- Error: "Multi-Attach error for volume" - volume couldn't detach from old node
- Image pull appeared stuck

**Root Cause:**
- Initial pod restart caused volume to remain attached to previous node
- Kubernetes volume detachment was slow/stuck

**Solution:**
- Complete cleanup: Deleted PostgreSQL instance, Job, and PVC
- Fresh redeployment resolved all issues
- Second deployment completed successfully in <1 minute

---

## Current State

### Running Resources
```bash
# PostgreSQL Pod
kubectl get pods -n workshop17
# NAME   READY   STATUS    RESTARTS   AGE
# pg-0   1/1     Running   0          33m

# PostgreSQL Services
kubectl get svc -n workshop17
# NAME        TYPE        CLUSTER-IP       PORT(S)
# pg          ClusterIP   100.64.x.x       5432/TCP
# pg-config   ClusterIP   None             <none>
# pg-repl     ClusterIP   100.64.x.x       5432/TCP
```

### Database Content
**Database**: `todos`
**Table**: `public.todos`

| ID | Todo | Completed |
|----|------|-----------|
| 94cddd0d... | Finish the Next.js app | false |
| ae5809f6... | Read the Tailwind CSS documentation | true |
| dbcf7d1e... | Learn how to use PostgreSQL | false |
| 0be11d01... | Deploy the app to Kubernetes | false |

---

## Files Created

### 1. db-instance.yaml
```yaml
kind: postgresql
apiVersion: acid.zalan.do/v1
metadata:
  name: pg
  namespace: workshop17
spec:
  teamId: "workshop17"
  postgresql:
    version: "17"
  numberOfInstances: 1
  volume:
    size: 10Gi
```

### 2. db-job.yaml
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: prepare-db
  namespace: workshop17
spec:
  template:
    spec:
      containers:
        - name: prepare-db-container
          image: vtrhh/custom-db-init:latest
          imagePullPolicy: Always
          command: ["/bin/sh", "-c", "/scripts/init-db.sh"]
          env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres.pg.credentials.postgresql.acid.zalan.do
                  key: password
      restartPolicy: Never
```

---

## Useful Commands

### Check Database Status
```bash
# Check pods
kubectl get pods -n workshop17

# Check PostgreSQL resource
kubectl get postgresql -n workshop17

# Check services
kubectl get svc -n workshop17
```

### Access Database
```bash
# Connect to database (interactive)
kubectl exec -n workshop17 pg-0 -it -- psql -U postgres -d todos

# Run SQL query directly
kubectl exec -n workshop17 pg-0 -- psql -U postgres -d todos -c "SELECT * FROM public.todos;"

# List all databases
kubectl exec -n workshop17 pg-0 -- psql -U postgres -c "\l"
```

### Database Credentials
The password is stored in Kubernetes secret:
```bash
kubectl get secret -n workshop17 postgres.pg.credentials.postgresql.acid.zalan.do -o yaml
```

### Troubleshooting
```bash
# Check pod events
kubectl describe pod pg-0 -n workshop17

# Check logs
kubectl logs -n workshop17 pg-0

# Check operator logs
kubectl logs -n postgres-operator deploy/postgres-operator
```

---

## Next Steps

According to the workshop structure at https://kubernetes-advanced.bnerd.com/:

1. **Lab 02**: Deploy the backend application (connects to this database)
2. **Lab 03**: Deploy the frontend application
3. **Lab 04+**: Advanced Kubernetes topics (networking, scaling, monitoring, etc.)

### Before Next Session
- Database will persist (PVC is retained)
- No action needed - just continue with Lab 02

---

## Workshop Links

- **Workshop Home**: https://kubernetes-advanced.bnerd.com/
- **Lab 00 (Setup)**: https://kubernetes-advanced.bnerd.com/00_setup/
- **Lab 01 (DB Setup)**: https://kubernetes-advanced.bnerd.com/01_db-setup/
- **Lab 02 (Next)**: https://kubernetes-advanced.bnerd.com/02_backend/

---

## Notes

- **Namespace**: `workshop17` (confirmed in kubeconfig)
- **Kubeconfig**: `~/Developer/projects/google-events/hamburg-25/kubernetes-workshop/kubeconfig-workshop17.yaml`
- **PostgreSQL Operator**: Pre-installed by workshop (Zalando operator)
- **Image Registry**: ghcr.io/zalando/spilo-17:4.0-p2

### Lessons Learned
- If pods get stuck in `ContainerCreating` for >5 minutes, consider complete cleanup
- Volume attachment issues can be resolved by deleting PVC and redeploying
- The Postgres operator handles most configuration automatically
