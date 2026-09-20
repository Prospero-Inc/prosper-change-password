# Static SPA — build with Node, serve the built files with nginx (there's
# no server-side runtime to speak of, unlike prospero-backend/prospero-front).
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# VITE_API_URL is inlined into the client bundle at build time (Vite's
# import.meta.env.* vars are static-replaced during `vite build`, same as
# Next's NEXT_PUBLIC_* vars) — it cannot be set at container-run time.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install -g pnpm@9
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS production

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
