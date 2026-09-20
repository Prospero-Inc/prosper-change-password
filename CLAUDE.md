# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev        # vite dev server
pnpm build      # tsc -b && vite build
pnpm lint       # eslint . --ext ts,tsx --max-warnings 0
pnpm preview    # preview the production build
```

No test runner is configured in this repo.

## Architecture

Small standalone Vite + React SPA, single-purpose: it is the page a user lands on after
clicking the "reset password" link in the email sent by `prospero-backend`'s mail module
(`API_BASE_URL_RESET` env var on the backend points here). It is **not** part of the
`prospero-front` Next.js app and is deployed separately.

- Routing via `wouter` (`src/App.tsx`), three routes only:
  - `/auth/reset-password/:token` → `ResetPassword` — the actual form.
  - `/auth/reset-password` (no token) → `NotToken`.
  - `/auth/reset-password-successfully` → `Successfully`.
- `ResetPassword` (`src/pages/ResetPassword.tsx`) posts the new password directly to
  `${VITE_API_URL}/auth/reset-password/:token` on the backend (react-hook-form + yup
  validation; password policy: min 8 chars, upper+lower+digit+`@$!%*?&.`symbol). No auth token
  handling beyond the reset token embedded in the URL — this app is unauthenticated by design.
- UI: Chakra UI + Emotion, matching the visual style of `prospero-front`/`prospero-backend`
  (shared `brand.svg`).
- i18n is manual JSON under `src/languages/{en,es}` imported directly per-page (no i18next
  runtime) — `ResetPassword.tsx` currently hardcodes the `en` import; check this if adding
  Spanish support to this flow.
