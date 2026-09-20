# Despliegue

Mismo patrón de runner self-hosted + Docker Compose que
`prospero-backend` y `prospero-front`: push a `main` → el workflow
`.github/workflows/deploy.yml` corre lint, construye, y reinicia el
contenedor en el servidor donde esté registrado el runner de este repo.

Esta app es una **SPA estática** (Vite, sin runtime del lado del
servidor), así que a diferencia de los otros dos repos su contenedor de
producción es nginx sirviendo la carpeta `dist/` ya construida, no un
proceso de Node — ver `Dockerfile`/`nginx.conf`. nginx redirige cualquier
ruta desconocida a `index.html` para que el router del lado del cliente
(`wouter`) la maneje (ej. `/auth/reset-password/:token`).

## Secreto requerido en GitHub Actions

| Secreto | Qué es |
|---|---|
| `VITE_API_URL` | URL pública de `prospero-backend`, incluyendo `/api` — queda incrustada en el bundle de JS en tiempo de build (Vite reemplaza `import.meta.env.VITE_*` de forma estática), así que no se puede cambiar solo reiniciando el contenedor; un valor nuevo requiere reconstruir |

## Configuración del servidor

Mismo servidor que el backend/frontend (ver `prospero-backend/DEPLOYMENT.md`
para el recorrido completo — lanzar la instancia EC2 en AWS, crear la red
`docker network create prospero`, registrar un runner por repo). Este repo
necesita **su propio** registro de runner (Settings → Actions → Runners)
aunque comparta la máquina física.

El `docker-compose.yml` mapea el nginx del contenedor (puerto 80) al
puerto `5173` del host (el mismo que esta app siempre usó en desarrollo,
solo que ahora sirviendo un nginx real en vez del servidor de desarrollo
de Vite) — cámbialo si quieres otro puerto, o pon un reverse proxy
compartido / dominio real por delante más adelante.

## Desplegar

```bash
git push origin main
```

Míralo en la pestaña Actions de este repo.
