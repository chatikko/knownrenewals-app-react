# KnowRenewals Frontend

React + TypeScript + Vite frontend for KnowRenewals using Tailwind tokens mapped from `KnowRenewals_Figma_UI.json`.

## Run

1. `cd renewalguard/frontend`
2. `npm install`
3. `npm run dev`

Backend base URL comes from `VITE_API_BASE_URL`. Create a `.env` file and set it, for example:

```bash
VITE_API_BASE_URL=https://knownrenewals-app-python.onrender.com
VITE_APP_ENV=staging
```

## Static site generation

- `npm run ssg` (or `npm run build`) generates static HTML for marketing pages via vite-plugin-ssg.
- Output lives in `dist/static` (index, privacy-policy, terms-of-service) with page-scoped CSS.
- Serve those files directly for SEO/marketing while keeping the SPA build in `dist/`.
- Compatibility fixes for vite-plugin-ssg live in `patches/` and apply on install via `patch-package`.
