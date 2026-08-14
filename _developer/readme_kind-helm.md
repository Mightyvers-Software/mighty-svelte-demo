```markdown id="9s7w8f"
# README.kind-helm.md

# Mighty Todo — Kind + Helm Deployment

This document explains how to run the Mighty Todo application locally using:

- Docker image
- Kind (Kubernetes in Docker)
- Kubernetes resources
- Helm charts

This setup simulates a Kubernetes deployment environment locally.

This document does not cover:

- Azure
- Terraform
- GitHub Actions
- Production Kubernetes clusters

---

# Architecture

The local deployment flow:

```

Developer Machine

```
    |
    |
    v
```

Docker Image

```
    |
    |
    v
```

Kind Kubernetes Cluster

```
    |
    |
    v
```

Helm Deployment

```
    |
    |
    v
```

Mighty Todo Application

````

---

# Requirements

Install:

- Docker
- kubectl
- Kind
- Helm

Verify Docker:

```bash
docker --version
````

Example:

```text
Docker version 29.x.x
```

---

Verify kubectl:

```bash
kubectl version --client
```

Example:

```text
Client Version: v1.x.x
```

---

Verify Kind:

```bash
kind version
```

Example:

```text
kind v0.x.x
```

---

Verify Helm:

```bash
helm version
```

Example:

```text
version.BuildInfo{Version:"v3.x.x"}
```

---

# 1. Build Application Docker Image

Build the local image:

```bash
docker build -t mighty-todo:local .
```

Verify:

```bash
docker images | grep mighty-todo
```

Expected:

```text
mighty-todo   local
```

---

# 2. Create Kind Cluster

Create a local Kubernetes cluster:

```bash
kind create cluster --name mighty-todo
```

Expected:

```text
Creating cluster "mighty-todo" ...
Set kubectl context to "kind-mighty-todo"
```

---

Verify cluster:

```bash
kubectl config current-context
```

Expected:

```text
kind-mighty-todo
```

Check nodes:

```bash
kubectl get nodes
```

Expected:

```text
NAME                        STATUS
mighty-todo-control-plane   Ready
```

---

# 3. Load Docker Image into Kind

Kind runs Kubernetes nodes as Docker containers.

The local Docker image is not automatically available inside Kind.

Load the image:

```bash
kind load docker-image mighty-todo:local --name mighty-todo
```

Expected:

```text
Image loaded successfully
```

---

# 4. Helm Chart Structure

The Helm chart is stored inside:

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

Helm manages Kubernetes resources as one application release.

---

# 5. Validate Helm Chart

Before installing:

```bash
helm lint cloud/helm/mighty-todo
```

Expected:

```text
1 chart(s) linted, 0 chart(s) failed
```

---

# 6. Install Application with Helm

Install the Helm release:

```bash
helm install mighty-todo cloud/helm/mighty-todo
```

Expected:

```text
NAME: mighty-todo
STATUS: deployed
```

---

# 7. Verify Kubernetes Deployment

Check pods:

```bash
kubectl get pods
```

Expected:

```text
NAME                          READY   STATUS
mighty-todo-xxxxx             1/1     Running
```

---

Check services:

```bash
kubectl get services
```

Expected:

```text
NAME          TYPE
mighty-todo   ClusterIP
```

---

Check persistent storage:

```bash
kubectl get pvc
```

Expected:

```text
NAME              STATUS
mighty-todo-pvc   Bound
```

---

# 8. Check Application Logs

View logs:

```bash
kubectl logs deployment/mighty-todo
```

Expected:

```text
Prisma schema loaded from prisma/schema.prisma

Applying migration ...

Listening on http://0.0.0.0:3000
```

---

# 9. Access Application Locally

The Kubernetes service is internal:

```
ClusterIP
```

Expose it locally:

```bash
kubectl port-forward service/mighty-todo 3000:3000
```

Expected:

```text
Forwarding from 127.0.0.1:3000 -> 3000
```

Open:

```
http://localhost:3000
```

---

# 10. Helm Upgrade

After changing Kubernetes configuration:

Run:

```bash
helm upgrade mighty-todo cloud/helm/mighty-todo
```

Verify:

```bash
kubectl get pods
```

---

# 11. View Helm Releases

List releases:

```bash
helm list
```

Expected:

```text
NAME
mighty-todo
```

Get details:

```bash
helm status mighty-todo
```

---

# 12. Remove Application

Remove Helm deployment:

```bash
helm uninstall mighty-todo
```

Verify:

```bash
kubectl get pods
```

Expected:

```text
No resources found
```

---

# 13. Delete Kind Cluster

Remove the local Kubernetes environment:

```bash
kind delete cluster --name mighty-todo
```

Verify:

```bash
kind get clusters
```

Expected:

```text
No clusters found
```

---

# Kubernetes Resources Managed

Helm creates:

```
mighty-todo

├── Deployment
│
├── Service
│
├── PersistentVolumeClaim
│
└── Pod
```

The application lifecycle is controlled by Helm:

```
helm install
        |
        v
Kubernetes resources created

helm upgrade
        |
        v
Resources updated

helm uninstall
        |
        v
Resources removed
```

---

# Complete Local Kubernetes Flow

The complete developer flow:

```
1. Build Docker image

docker build -t mighty-todo:local .


2. Create Kind cluster

kind create cluster --name mighty-todo


3. Load image

kind load docker-image mighty-todo:local --name mighty-todo


4. Deploy with Helm

helm install mighty-todo cloud/helm/mighty-todo


5. Access application

kubectl port-forward service/mighty-todo 3000:3000
```
