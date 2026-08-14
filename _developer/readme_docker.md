````markdown
# README.docker.md

# Mighty Todo — Docker Setup

This document explains how to run the Mighty Todo application using Docker.

This setup packages the application into a container image and runs it independently from the local Node.js development environment.

This document does not cover:

- Kubernetes
- Kind
- Helm
- Azure
- Terraform
- GitHub Actions

---

# Requirements

Install the following:

- Docker Engine
- Docker Compose plugin

Verify Docker:

```bash
docker --version
````

Expected:

```text
Docker version xx.x.x
```

Verify Docker is running:

```bash
docker ps
```

---

# 1. Clone Repository

Clone the repository:

```bash
git clone git@github.com:Mightyvers-Software/mighty-svelte-demo.git
```

Enter project directory:

```bash
cd mighty-svelte-demo
```

Verify:

```bash
git status
```

Expected:

```text
On branch main
```

---

# 2. Environment Configuration

Docker runs the application using environment variables.

Create the environment file:

```bash
cp .env.example .env
```

If no example file exists:

```bash
touch .env
```

Example:

```env
DATABASE_URL="file:/app/data/dev.db"
NODE_ENV="production"
HOST="0.0.0.0"
PORT="3000"
```

Important:

The database path inside Docker must use the container filesystem location:

```text
/app/data/dev.db
```

---

# 3. Dockerfile

The project contains a Dockerfile used to build the application image.

Example structure:

```text
mighty-svelte-demo/

├── Dockerfile
├── package.json
├── prisma/
├── src/
└── .env
```

The Docker image contains:

* Node.js runtime
* Application dependencies
* Built Svelte application
* Prisma client
* Production runtime

---

# 4. Build Docker Image

From the project root:

```bash
docker build -t mighty-todo:local .
```

Verify image:

```bash
docker images | grep mighty-todo
```

Expected:

```text
mighty-todo   local
```

---

# 5. Run Container

Start the application:

```bash
docker run \
  --name mighty-todo \
  -p 3000:3000 \
  mighty-todo:local
```

Expected output:

```text
Listening on http://0.0.0.0:3000
```

Open:

```text
http://localhost:3000
```

---

# 6. Run Container in Background

Run detached:

```bash
docker run -d \
  --name mighty-todo \
  -p 3000:3000 \
  mighty-todo:local
```

Check running containers:

```bash
docker ps
```

Expected:

```text
mighty-todo
```

---

# 7. View Container Logs

Application logs:

```bash
docker logs mighty-todo
```

Follow logs:

```bash
docker logs -f mighty-todo
```

Expected:

```text
Listening on http://0.0.0.0:3000
```

---

# 8. Stop Container

Stop:

```bash
docker stop mighty-todo
```

Remove:

```bash
docker rm mighty-todo
```

---

# 9. Persistent Database Storage

The application uses SQLite.

Without a volume:

```text
container
 └── /app/data/dev.db
```

The database is removed when the container is deleted.

For persistent local Docker usage:

Create a volume:

```bash
docker volume create mighty-todo-data
```

Run:

```bash
docker run \
  -d \
  --name mighty-todo \
  -p 3000:3000 \
  -v mighty-todo-data:/app/data \
  mighty-todo:local
```

Now:

```text
Docker volume
      |
      v
/app/data/dev.db
      |
      v
Prisma SQLite database
```

---

# 10. Docker Compose

For easier local container management:

Create:

```text
docker-compose.yml
```

Example:

```yaml
services:
  mighty-todo:
    image: mighty-todo:local
    build:
      context: .
    container_name: mighty-todo
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      HOST: "0.0.0.0"
      PORT: "3000"
      DATABASE_URL: "file:/app/data/dev.db"
    volumes:
      - mighty-todo-data:/app/data

volumes:
  mighty-todo-data:
```

---

# 11. Start with Docker Compose

Build and start:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

Verify:

```bash
docker compose ps
```

---

# 12. Stop Docker Compose

Stop:

```bash
docker compose down
```

Keep volumes:

```bash
docker compose down
```

Remove database volume:

```bash
docker compose down -v
```

Warning:

This deletes the SQLite database.

---

# 13. Rebuild After Code Changes

After changing application code:

Build again:

```bash
docker build -t mighty-todo:local .
```

Remove old container:

```bash
docker rm -f mighty-todo
```

Start new container:

```bash
docker run \
  -d \
  --name mighty-todo \
  -p 3000:3000 \
  mighty-todo:local
```

---

# 14. Troubleshooting

## Container exits immediately

Check logs:

```bash
docker logs mighty-todo
```

---

## Port already in use

Check:

```bash
sudo lsof -i :3000
```

Stop process:

```bash
kill <PID>
```

---

## Database migration errors

Enter container:

```bash
docker exec -it mighty-todo sh
```

Check:

```bash
ls /app/data
```

---

## Image not found

Check images:

```bash
docker images
```

Rebuild:

```bash
docker build -t mighty-todo:local .
```

---

# Docker Setup Complete

The application is now running as:

```text
Ubuntu
 |
Docker Engine
 |
mighty-todo container
 |
Node.js runtime
 |
Svelte application
 |
Prisma
 |
SQLite
```
