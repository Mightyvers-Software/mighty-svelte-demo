

# Mighty Todo — Local Development Setup

This document explains how to run the Mighty Todo application locally on Ubuntu for development.

This setup uses the native Node.js development workflow.

This document does not cover:

- Docker
- Kubernetes
- Kind
- Helm
- Azure deployment
- Terraform
- GitHub Actions

---

# Requirements

The following tools are required:

- Git
- Node.js
- npm
- SQLite (used by Prisma locally)

---

# 1. Clone Repository

Clone the repository:

```bash
git clone git@github.com:Mightyvers-Software/mighty-svelte-demo.git
```

Enter the project directory:

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
Your branch is up to date with 'origin/main'
```

---

# 2. Node.js Version

The project uses Node.js.

Check installed version:

```bash
node --version
```

Expected:

```text
v22.x.x
```

If using NVM:

```bash
nvm use 22
```

Verify:

```bash
node --version
npm --version
```

---

# 3. Install Dependencies

Install project dependencies:

```bash
npm install
```

This installs:

* Svelte dependencies
* Prisma client
* Build tooling
* Development dependencies

Verify:

```bash
ls node_modules
```

---

# 4. Environment Configuration

Create the local environment file:

```bash
cp .env.example .env
```

If `.env.example` does not exist, create:

```bash
touch .env
```

The local development environment uses SQLite.

Example:

```env
DATABASE_URL="file:./dev.db"
```

The database file is created locally by Prisma.

---

# 5. Prisma Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

Expected:

```text
Applying migration ...
Database synchronized
```

This creates:

```text
prisma/
└── dev.db
```

or the configured SQLite database location.

---

# 6. Start Development Server

Start the application:

```bash
npm run dev
```

Expected output:

```text
Listening on http://localhost:3000
```

Open:

```
http://localhost:3000
```

---

# 7. Development Workflow

During development:

Modify source files:

```text
src/
```

The development server automatically reloads changes.

Stop the server:

```text
CTRL + C
```

Restart:

```bash
npm run dev
```

---

# 8. Available npm Scripts

List available scripts:

```bash
npm run
```

Common commands:

## Development

```bash
npm run dev
```

Starts the local development server.

---

## Production Build

Create production build:

```bash
npm run build
```

Expected:

```text
build completed successfully
```

---

## Preview Production Build

Run the production build locally:

```bash
npm run preview
```

---

# 9. Prisma Commands

## Generate Prisma Client

Run after schema changes:

```bash
npx prisma generate
```

---

## Create Migration

After changing:

```text
prisma/schema.prisma
```

Run:

```bash
npx prisma migrate dev --name migration_name
```

Example:

```bash
npx prisma migrate dev --name add_todo_status
```

---

## View Database

Open Prisma Studio:

```bash
npx prisma studio
```

This opens:

```
http://localhost:5555
```

---

# 10. Project Structure

Important directories:

```
mighty-svelte-demo/

├── src/
│   ├── routes/
│   └── lib/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── package.json
├── svelte.config.js
├── vite.config.js
└── .env
```

---

# 11. Troubleshooting

## Node version mismatch

Check:

```bash
node --version
```

Use:

```bash
nvm use 22
```

---

## Missing dependencies

Remove installed packages:

```bash
rm -rf node_modules
rm package-lock.json
```

Reinstall:

```bash
npm install
```

---

## Database errors

Reset local database:

```bash
npx prisma migrate reset
```

This will:

* delete local database
* recreate database
* apply migrations

---

## Port already in use

Check port:

```bash
sudo lsof -i :3000
```

Stop the process:

```bash
kill <PID>
```

Restart:

```bash
npm run dev
```

---

# Local Development Complete

At this point the application is running using:

```
Ubuntu
 |
Node.js
 |
Svelte application
 |
Prisma
 |
SQLite
```


--
## Run app with docker
refer to `_developer/readme_docker.md`
and `_developer/docker_cheatsheet.md`

## Run app with kind and helm

this approach uses kind kubernetes inside docker
refer to `_developer/readme_kind-helm.md`

readme docs inside `/_developer` notes 



# Developer Notes

The application has been completed within a short timeframe based on the available information at hand.

I could not complete the production-ready assignment due to time constraints, as it requires significant architectural setup and cloud infrastructure. Running Kubernetes in the cloud is also not a free option and requires additional resources and configuration.

I have completed the orchestration setup but have not completed all items required for production readiness.

---

## Completed

- Project running locally with and without Docker
- Same Docker image used for:
  - Standalone Docker execution
  - Kind Kubernetes deployment
- Kind running locally as a proof of concept

---

## GitHub Actions / Azure

GitHub Actions setup on my company repository is not completed.

Current blocker:

`terraform apply`

Error:

```

Error: a resource with the ID "/subscriptions/***/resourceGroups/"

```

---

## Azure Target Architecture

```

Azure
|
├── Resource Group
|
├── Container Registry (ACR)
|
├── App Service Plan
|
└── Web App for Containers

```

---

## Current Status

- Local development: Completed
- Docker setup: Completed
- Kind Kubernetes POC: Completed
- Helm orchestration: Completed
- GitHub Actions deployment pipeline: Incomplete
- Azure production deployment: Incomplete



