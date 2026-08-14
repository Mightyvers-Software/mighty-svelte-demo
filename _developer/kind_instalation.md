## Milestone 5.1 — Install Kind and kubectl (Ubuntu)

Goal: create a local Kubernetes cluster that runs inside Docker.

## Step 1 — Verify Docker

Check Docker is installed and running:

```bash
docker --version
docker ps
```

Expected:

```text
Docker version ...
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

If Docker is not running:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

---

## Step 2 — Install kubectl

Download the latest stable release:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Make it executable:

```bash
chmod +x kubectl
```

Move it into your PATH:

```bash
sudo mv kubectl /usr/local/bin/
```

Verify:

```bash
kubectl version --client
```

Expected:

```text
Client Version: v1.xx.x
```

---

## Step 3 — Install Kind

Download Kind:

```bash
curl -Lo kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
```

Make it executable:

```bash
chmod +x kind
```

Move it into your PATH:

```bash
sudo mv kind /usr/local/bin/
```

Verify:

```bash
kind version
```

Expected:

```text
kind v0.xx.x
```

---

## Step 4 — Create the Kind cluster

Create a single-node cluster:

```bash
kind create cluster --name mighty-todo
```

This will:

* create a Docker container
* install Kubernetes inside it
* configure `kubectl` automatically

Expected output ends with:

```text
Set kubectl context to "kind-mighty-todo"
```

---

## Step 5 — Verify the cluster

Check nodes:

```bash
kubectl get nodes
```

Expected:

```text
NAME                         STATUS   ROLES           AGE   VERSION
mighty-todo-control-plane    Ready    control-plane   1m    v1.xx.x
```

Check cluster info:

```bash
kubectl cluster-info
```

Expected:

```text
Kubernetes control plane is running at https://127.0.0.1:xxxxx
CoreDNS is running at ...
```

---

## Step 6 — Verify the Docker relationship

List Docker containers:

```bash
docker ps
```

You should see something similar to:

```text
CONTAINER ID   IMAGE                    NAMES
abc123         kindest/node:v1.xx.x     mighty-todo-control-plane
```

This confirms that the Kubernetes cluster is running **inside Docker**, which is exactly why we chose Kind.

---

## Success Criteria

Milestone 5.1 is complete when:

```bash
kind version
kubectl version --client
kubectl get nodes
docker ps
```

all succeed, and `kubectl get nodes` shows the node in **Ready** state.

Do **not** install Minikube or MicroK8s. Kind is the only Kubernetes environment we will use for this project.



# Setup / running kind


# Milestone 5.2 — Kubernetes Deployment (Kind)

**Goal:** Deploy the existing `mighty-todo:local` Docker image into the Kind cluster using Kubernetes manifests stored under `cloud/kind`.

## Target Structure

Create the following structure:

```text
cloud/
└── kind/
    ├── deployment.yaml
    ├── service.yaml
    └── pvc.yaml
```

---

---

## Step 1 — Create `cloud/kind/pvc.yaml`

This creates persistent storage for the SQLite database.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mighty-todo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

---

## Step 2 — Create `cloud/kind/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mighty-todo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mighty-todo
  template:
    metadata:
      labels:
        app: mighty-todo
    spec:
      containers:
        - name: mighty-todo
          image: mighty-todo:local
          # This tells Kind to use the Docker image that we load manually.
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
            - name: HOST
              value: "0.0.0.0"
            - name: PORT
              value: "3000"
            - name: ORIGIN
              value: "http://localhost:3000"
            - name: DATABASE_URL
              value: "file:/app/prisma/dev.db"
          volumeMounts:
            - name: sqlite-storage
              mountPath: /app/prisma
      volumes:
        - name: sqlite-storage
          persistentVolumeClaim:
            claimName: mighty-todo-pvc
```



## Step 3 — Create `cloud/kind/service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mighty-todo
spec:
  selector:
    app: mighty-todo
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```

---

## Step 4 — Verify the Docker image



```bash
#Ensure the production image exists:
docker images | grep mighty-todo
# Expected:
# mighty-todo   local
```


---

## Step 5 — Load the image into Kind

```bash
kind load docker-image mighty-todo:local --name mighty-todo
# Image: "mighty-todo:local" with ID "sha256:..."
```


---

## Step 7 — Deploy to Kubernetes

Apply the manifests:

```bash
kubectl apply -f cloud/kind/
```

Expected:

```text
persistentvolumeclaim/mighty-todo-pvc created
deployment.apps/mighty-todo created
service/mighty-todo created
```

---

## Step 8 — Verify the deployment

Check the pod:

```bash
kubectl get pods
```

Expected:

```text
NAME                          READY   STATUS    RESTARTS   AGE
mighty-todo-xxxxxxxxxx-xxxxx  1/1     Running   0          30s
```

Check the service:

```bash
kubectl get services
```

Expected:

```text
NAME         TYPE        CLUSTER-IP      PORT(S)
mighty-todo  ClusterIP   10.x.x.x        3000/TCP
```

---

## Step 9 — Access the application

Port-forward the service:

```bash
kubectl port-forward service/mighty-todo 3000:3000
```

Then open:

```text
http://localhost:3000
```

---

## Success Criteria

Milestone 5.2 is complete when:

```bash
kubectl get pods
kubectl get services
curl http://localhost:3000/api/health
```

all succeed and the application is accessible through the Kubernetes service.
