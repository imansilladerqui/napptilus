# Napptilus

Next.js 15 frontend with server-side API proxying, TanStack Query for remote state, React Context for client persistence, and SCSS Modules for styling.

## Stack

| Layer           | Choice                                      |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 15 (App Router)                     |
| UI              | React 18.3                                  |
| Language        | TypeScript 5.7                              |
| Remote state    | TanStack React Query 5                      |
| Client state    | React Context (`localStorage`)              |
| Styling         | SASS + CSS Modules                          |
| Testing         | Vitest + Testing Library + jsdom            |
| Linting         | ESLint 9 (flat config), Stylelint, Prettier |
| Package manager | pnpm 9                                      |
| CI              | GitHub Actions                              |

## Requirements

- **Node.js 22.x** (see `.nvmrc`)
- **pnpm 9** — use `pnpm install --frozen-lockfile` in CI and production

```bash
nvm use
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local   # set API_KEY
pnpm run dev
```

## Environment variables

| Variable       | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `API_BASE_URL` | Upstream REST API base URL                        |
| `API_KEY`      | Value injected as `x-api-key` on proxied requests |

Both are required at build and runtime. The key never reaches the browser.

## Scripts

| Command                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `pnpm run dev`          | Development server with HMR                             |
| `pnpm run build`        | Production build (type-check + lint + SASS compilation) |
| `pnpm run start`        | Production server                                       |
| `pnpm run lint`         | ESLint                                                  |
| `pnpm run lint:styles`  | Stylelint on `src/**/*.scss`                            |
| `pnpm run format`       | Prettier (write)                                        |
| `pnpm run format:check` | Prettier (check)                                        |
| `pnpm run test`         | Vitest (single run)                                     |
| `pnpm run test:watch`   | Vitest (watch mode)                                     |

## Architecture

```
src/
├── app/                  # App Router pages (thin wrappers)
├── api/                  # React Query hooks (useInfiniteProductsQuery, useProductQuery)
├── components/           # UI by domain (cart, products, product-detail, layout, feedback, ui)
├── context/Cart/         # Cart state + localStorage persistence
├── lib/                  # Shared utilities (formatPrice, useDebounce, dedupeProductList, query-client)
├── middleware.ts         # Rewrites /api/products/* to upstream API with x-api-key
├── providers/            # QueryProvider (React Query client)
├── styles/               # Design tokens, globals, mixins, breakpoints
└── types/                # Shared TypeScript models (Product, ProductList, …)
```

### Data flow

```
Browser  →  fetch('/api/products…')  →  middleware rewrite  →  upstream API
                ↑
         React Query hooks (cache, staleTime, pagination)
```

- **Server:** `middleware.ts` intercepts `/api/products` and `/api/products/:path*`, rewrites to `API_BASE_URL`, and attaches `x-api-key`. No Route Handlers — a single middleware keeps the proxy logic in one place.
- **Client:** hooks in `src/api/` call the same-origin `/api` path. React Query owns loading, caching, and pagination; cart state stays in Context.

### Component layout

Each feature folder is colocated:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── index.ts
└── useComponentName.ts   # only when logic is non-trivial
```

Pages under `app/` stay thin: they wire params, query hooks, and feature components.

## Technical decisions

### Next.js App Router

Chosen for built-in routing, middleware, and deployment on Vercel. Client components (`"use client"`) are used where hooks, browser APIs, or interactivity are needed; the root layout composes global providers.

**Rejected:** Vite SPA — would require a separate proxy layer for the API key and lose middleware integration.

### API proxy via middleware

`API_KEY` lives only in server environment variables. The client calls relative `/api/products` URLs; middleware rewrites and injects credentials. This avoids exposing secrets in the bundle and avoids duplicating proxy logic across Route Handlers.

### TanStack React Query

- `useInfiniteProductsQuery` — offset pagination with `IntersectionObserver` for infinite scroll; shorter `staleTime` when a search filter is active.
- `useProductQuery` — detail fetch with explicit error on non-OK responses (`NOT_FOUND` for 404).
- Defaults in `query-client.ts`: 5 min stale time, no refetch on window focus.

**Rejected:** Fetching upstream directly from the client — would leak or require a public API key.

### Cart: React Context + localStorage

Cart is purely client-side. `CartProvider` hydrates from `localStorage` on mount and persists on change. A `skipSave` ref prevents the initial empty state from overwriting stored data. Kept separate from React Query — different lifecycle and no server source of truth.

### TypeScript models

Types in `src/types/product.ts` are hand-written against the REST contract (optional fields mirror API responses). `ProductList` is typed as an array because the list endpoint returns `ProductListItem[]`.

### SCSS and design tokens

Three-layer styling:

1. **`tokens.scss`** — Sass variables (source of truth for values).
2. **`globals.scss`** — imports tokens and fonts, exposes `:root` CSS custom properties, minimal reset.
3. **`.module.scss`** — component styles consume `var(--*)` only; no direct token imports in modules.

Shared patterns live in `_mixins.scss` (`page-margin-inline`, `page-padding-inline`, `cart-summary-action-button`, …). Breakpoints are defined once in `media.scss` (`from-sm` 480px, `from-md` 768px, `from-lg` 1024px) and imported via `@use 'styles/mixins'` or `@use 'styles/media'` where needed.

`next.config.ts` sets `sassOptions.includePaths: ['./src']` so modules can `@use 'styles/…'` without deep relative paths.

**Rejected:** Tailwind, CSS-in-JS — SCSS modules give scoped styles and a explicit token layer without runtime cost.

### Images

`next/image` with `remotePatterns` configured for API and CDN hostnames. Fixed dimensions and `object-fit: contain` where layout stability matters (e.g. cart grid).

### Code conventions

Enforced by ESLint:

- Arrow functions for components, hooks, and utilities.
- `@/` path alias — parent relative imports (`../`) are disallowed.
- Prettier for formatting; Stylelint with `stylelint-config-standard-scss`.

### Testing

Vitest with jsdom, `@/` alias, and a `localStorage` mock in `vitest.setup.ts`. Tests cover cart logic, formatting, debounce, and representative components.

### Quality gates

| Stage                                | What runs                                                   |
| ------------------------------------ | ----------------------------------------------------------- |
| **Pre-commit** (Husky + lint-staged) | ESLint `--fix`, Stylelint `--fix`, Prettier on staged files |
| **CI** (GitHub Actions)              | ESLint, Stylelint, Prettier check, Vitest, `next build`     |

CI needs the `API_KEY_CI` repository secret for the build step (same vars as local `.env.local`).

## Deployment (Vercel)

1. Connect the repository.
2. **Node.js:** 18.x
3. **Install command:** `pnpm install --frozen-lockfile`
4. **Build command:** `pnpm run build`
5. **Environment variables:** `API_BASE_URL`, `API_KEY`

## Development vs production

|                      | Development (`pnpm run dev`) | Production (`pnpm run build`)       |
| -------------------- | ---------------------------- | ----------------------------------- |
| SASS                 | Unminified, HMR              | Compiled and minified in the bundle |
| React Query Devtools | Available in dev             | Tree-shaken from production bundle  |
| API proxy            | Middleware at runtime        | Same middleware behavior on Vercel  |
