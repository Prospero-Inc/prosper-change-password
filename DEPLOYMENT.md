# Deployment

Same self-hosted-runner + Docker Compose pattern as `prospero-backend` and
`prospero-front`: push to `main` → `.github/workflows/deploy.yml` lints,
builds, and restarts the container on whatever server has this repo's
runner registered.

This app is a **static SPA** (Vite, no server-side runtime), so unlike the
other two repos its production container is nginx serving the built
`dist/` folder, not a Node process — see `Dockerfile`/`nginx.conf`. nginx
falls back unknown paths to `index.html` so the client-side router
(`wouter`) can handle `/auth/reset-password/:token` etc.

## Required GitHub Actions secret

| Secret | What it is |
|---|---|
| `VITE_API_URL` | `prospero-backend`'s public base URL including `/api` — gets baked into the built JS bundle at build time (Vite inlines `import.meta.env.VITE_*` statically), so it cannot be changed by just restarting the container; a new value needs a rebuild |

## Server setup

Same server as the backend/frontend (see `prospero-backend/DEPLOYMENT.md`
for the full walkthrough — free VM, `docker network create prospero`,
registering a runner per repo). This repo needs its **own** runner
registration (Settings → Actions → Runners) even though it can share the
physical machine.

`docker-compose.yml` maps the container's nginx (port 80) to host port
`5173` (matching the port this app has always used in dev, just now
serving a real nginx instead of the Vite dev server) — adjust if you want
it on a different host port, or put a shared reverse proxy / real domain
in front of it later.

## Deploying

```bash
git push origin main
```

Watch the run under this repo's Actions tab.
