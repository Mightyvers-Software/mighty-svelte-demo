
# Local Kubernetes Validation with Kind

## Purpose

This project uses **Kind (Kubernetes IN Docker)** as the local Kubernetes environment.

Kind is a lightweight Kubernetes cluster that runs entirely inside Docker containers. It allows the application to be deployed and validated in Kubernetes locally before deploying the same application image to Azure Kubernetes Service (AKS).

The goal is **not** to create a separate local version of the application. The goal is to validate the **same production Docker image** that will later be deployed to Azure.

---

# Why Kind

Several local Kubernetes options exist:

| Option   | Purpose                                |
| -------- | -------------------------------------- |
| Kind     | Kubernetes running inside Docker       |
| Minikube | Local VM or container-based Kubernetes |
| MicroK8s | Ubuntu-native Kubernetes               |
| kubeadm  | Full Kubernetes installation           |

Kind was chosen because it:

- is lightweight
- requires only Docker
- is easy to create and destroy
- is reproducible
- closely matches standard Kubernetes behavior
- works well with Helm

For this project, Kind provides the fastest local Kubernetes development and deployment workflow.

---

# What Kind Is

Kind creates a real Kubernetes cluster inside Docker containers.

For example:

```bash
kind create cluster --name mighty-todo
```

creates a Docker container that becomes the Kubernetes control plane.

```text
Ubuntu
   |
   v
Docker Engine
   |
   v
Kind Node Container
   |
   v
Kubernetes
```

Applications are deployed into that Kubernetes cluster exactly as they would be deployed into AKS.

---

# Deployment Relationship

The most important architectural decision is that **the Docker image remains identical across environments**.

```text
                Docker Image
             mighty-todo:1.0.0
                     |
        +------------+------------+
        |                         |
        v                         v
     Kind Cluster              Azure AKS
      (local)                (production)
        |                         |
        v                         v
     Helm Chart               Helm Chart
```

Kind is **not a different application**.

Kind is **a different Kubernetes environment**.

The same Docker image is deployed to:

* Docker
* Kind
* AKS

Only the infrastructure and configuration differ.

---

## Local Validation Workflow

```bash
## 1. Build the production image
docker build -t mighty-todo:1.0.0 .

## 2. Create a Kind cluster
kind create cluster --name mighty-todo

## 3. Load the image into Kind
kind load docker-image mighty-todo:1.0.0 --name mighty-todo

## 4. Deploy with Helm
helm install mighty-todo ./helm/mighty-todo

## 5. Verify deployment
kubectl get pods
kubectl get services
```



---

## Why This Matters

Running the application in Kind validates that:

* the Docker image is Kubernetes-compatible
* environment variables work correctly
* Prisma works correctly
* SQLite volume mounting works correctly
* health endpoints work correctly
* Kubernetes manifests are valid
* Helm charts are valid

Any deployment issues can be discovered locally before deploying to Azure.

---

## Difference Between Docker and Kind

Docker runs **containers**.

Kind runs **Kubernetes**, which manages containers.

Docker:

```text
Browser
   |
   v
Docker Container
```

Kind:

```text
Browser
   |
   v
Kubernetes Service
   |
   v
Kubernetes Pod
   |
   v
Docker Container
```

This introduces the same Kubernetes concepts used in production:

* Deployments
* Services
* ConfigMaps
* Secrets
* Persistent Volumes

---

## Why Helm Is Included

Helm packages Kubernetes resources into a reusable deployment.

Instead of deploying multiple YAML files manually:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f pvc.yaml
```

Helm deploys the application as a single release:

```bash
helm install mighty-todo ./helm/mighty-todo
```

The same Helm chart can be used in:

* Kind
* Azure AKS

Only the configuration values change.

---

## Transition to Azure

After local validation succeeds, the deployment process becomes:

```text
Code
   |
   v
Docker Build
   |
   v
Kind Validation
   |
   v
Azure Container Registry
   |
   v
Azure Kubernetes Service
   |
   v
Helm Deployment
```

Kind is therefore the **local Kubernetes validation environment**, while **AKS is the production Kubernetes environment**.

This provides a consistent deployment model from local development to cloud deployment.



This document clearly establishes that Kind is **Kubernetes IN Docker**, explains why it was chosen, and positions it as the local Kubernetes validation environment that sits directly in the deployment path to AKS rather than as a separate proof-of-concept system.

