# Milestone 5.4.3 — Deploy Mighty Todo with Helm

## Goal

Replace the manual Kubernetes deployment:

```bash
kubectl apply -f cloud/kind/
```

with a Helm-managed application release.

At this point:

- Docker image: `mighty-todo:local`
- Kind cluster: `mighty-todo`
- Kubernetes context: `kind-mighty-todo`
- Helm chart: `cloud/helm/mighty-todo`

Helm will manage the Kubernetes resources:

- Deployment
- Service
- PersistentVolumeClaim

---

# Current Helm Chart

The chart has already been created and validated.

Structure:

```
cloud/
└── helm/
    └── mighty-todo/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── deployment.yaml
            ├── service.yaml
            ├── pvc.yaml
            └── _helpers.tpl
```

---

# Validate Helm Chart

Run:

```bash
helm lint cloud/helm/mighty-todo
```

Expected:

```
==> Linting cloud/helm/mighty-todo

[INFO] Chart.yaml: icon is recommended

1 chart(s) linted, 0 chart(s) failed
```

---

# Remove Existing Kubernetes Deployment

Before testing Helm, remove the manually deployed Kubernetes resources.

Run:

```bash
kubectl delete -f cloud/kind/
```

Expected:

```
deployment.apps "mighty-todo" deleted
persistentvolumeclaim "mighty-todo-pvc" deleted
service "mighty-todo" deleted
```

Verify:

```bash
kubectl get pods
```

Expected:

```
No resources found in default namespace.
```

At this point:

- Kind cluster is still running.
- Kubernetes is running.
- The Mighty Todo application is removed.

---

# Install Mighty Todo Using Helm

Deploy the application using the Helm chart:

```bash
helm install mighty-todo cloud/helm/mighty-todo
```

Expected:

```
NAME: mighty-todo
STATUS: deployed
```

Helm now owns the application deployment.

---

# Verify Kubernetes Resources

## Check Pods

Run:

```bash
kubectl get pods
```

Expected:

```
NAME                          READY   STATUS
mighty-todo-xxxxx             1/1     Running
```

---

## Check Service

Run:

```bash
kubectl get services
```

Expected:

```
NAME          TYPE        PORT
mighty-todo   ClusterIP   3000
```

---

## Check Persistent Storage

Run:

```bash
kubectl get pvc
```

Expected:

```
NAME              STATUS
mighty-todo-pvc   Bound
```

---

# Verify Helm Release

Run:

```bash
helm list
```

Expected:

```
NAME          STATUS
mighty-todo   deployed
```

The application is now managed as a Helm release.

---

# Check Application Startup

The container runs Prisma migration during startup.

Check logs:

```bash
kubectl logs deployment/mighty-todo
```

Expected:

```
Prisma schema loaded from prisma/schema.prisma

Datasource "db": SQLite database "dev.db" at "file:/app/data/dev.db"

Applying migration `20260813073408_init`

All migrations have been successfully applied.

Listening on http://0.0.0.0:3000
```

---

# Access Application

Expose the Kubernetes service locally:

```bash
kubectl port-forward service/mighty-todo 3000:3000
```

Keep this terminal running.

Open:

```
http://localhost:3000
```

Verify:

- Todo list loads
- Create todo works
- Edit todo works
- Delete todo works
- Status filtering works

---

# Helm Upgrade

When Helm templates or values change:

```bash
helm upgrade mighty-todo cloud/helm/mighty-todo
```

Check rollout:

```bash
kubectl rollout status deployment/mighty-todo
```

---

# Remove Helm Deployment

To remove the application:

```bash
helm uninstall mighty-todo
```

Verify:

```bash
helm list
kubectl get pods
```

---

# Current Deployment Flow

Before Helm:

```
cloud/kind/
    |
    v
kubectl apply
    |
    v
Kubernetes resources
```

After Helm:

```
cloud/helm/mighty-todo
          |
          v
helm install mighty-todo
          |
          v
Kubernetes resources
```

---

# Current Architecture

```
Ubuntu Machine

Docker
 |
 v
Kind Cluster
 |
 v
Kubernetes
 |
 v
Helm Release: mighty-todo
 |
 +-- Deployment
 |
 +-- Service
 |
 +-- PersistentVolumeClaim
 |
 v
SvelteKit + Prisma + SQLite
```

