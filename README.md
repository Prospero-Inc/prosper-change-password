# Prospero — Reset Password

Mini-app standalone (Vite + React) que solo renderiza el flujo de "olvidé mi contraseña" al que
llega el usuario desde el link del correo que manda `prospero-backend`. No es parte de
`prospero-front` y se despliega por separado.

## Requisitos

- Node.js 18+
- pnpm >= 9 (**no uses pnpm 10+**: bloquea scripts de build por defecto y rompe la instalación)

## Levantar en local

```bash
pnpm install
cp .env.example .env   # completar VITE_API_URL con la URL pública de prospero-backend
pnpm dev                # http://localhost:5173
```

`VITE_API_URL` se usa desde el browser (esta app no tiene backend propio), así que tiene que ser
una URL a la que el navegador pueda llegar — no un nombre de servicio de Docker.

## Levantar todo el stack con Docker (recomendado para probar de punta a punta)

Este repo es parte de un workspace con `prospero-backend` y `prospero-front`. Si los tenés
clonados como hermanos en el mismo directorio, un solo comando levanta Postgres, una bandeja de
correo falsa (Mailpit) y las tres apps, ya con los env vars correctos:

```bash
cd .. # a la carpeta que contiene los tres repos
docker compose up --build
```

Ver `docker-compose.yml` y `docs/testing-guide.md` en la raíz del workspace para el detalle
completo (URLs, credenciales de la DB, cómo probar el flujo de reset de contraseña de punta a
punta con el correo capturado en Mailpit).

## Comandos

```bash
pnpm build     # tsc -b && vite build
pnpm lint      # eslint
pnpm preview   # preview del build de producción
```

## Más detalle

Ver `CLAUDE.md` en este repo.
