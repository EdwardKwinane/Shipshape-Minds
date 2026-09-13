# Project Memory — Shipshape Minds

## Intent
Public marketing website for **Shipshape Minds**, a South African NPO supporting children, young people, and vulnerable communities through mental health, emotional wellness, and social development initiatives.

Original design assets (6 static HTML pages) live in the `Shipshape Minds/` folder and were the build source. The site is a production-ready React SPA built from those assets.

## Current State
- **Vite 8 + React 19 + TypeScript + Tailwind CSS v4** SPA in the repo root.
- React Router v7 handles 6 routes: `/`, `/about`, `/programs`, `/get-involved`, `/donate`, `/contact`.
- Font Awesome 6 icons bundled locally via `@fortawesome/*` packages (no CDN).
- All 8 images downloaded to `src/assets/images/` (no external image URLs).
- Google Fonts (Inter, Playfair Display) loaded from CDN in `index.html`.
- Shared `Navbar` (with mobile hamburger menu), `Footer`, and `Layout` components; design tokens (colors, fonts, radius) are Tailwind `@theme` tokens in `src/index.css`.

## Architecture
```
src/
  App.tsx                # route table
  main.tsx               # BrowserRouter + root render
  siteConfig.ts          # name, tagline, contact info, nav links (single source of truth)
  assets/images.ts       # imports all local images
  components/            # Navbar, Footer, Layout
  pages/                 # Home, About, Programs, GetInvolved, Donations, Contact
  index.css              # Tailwind theme tokens (ink/canvas/line/accent/lavender), custom utilities
scripts/verify.mjs       # headless-browser smoke test (puppeteer-core + Edge)
```

## Decisions
- Decision: Build as Vite + React + Tailwind SPA (shared components/layout) rather than keeping static HTML.
  Reason: Owner selected this approach; enables shared Nav/Footer and scaling.
  Date: 2026-09-12
- Decision: Localize all images and Font Awesome (remove CDN dependencies flagged in audit).
  Reason: Reliability — generator-hosted images and CDNs are external points of failure.
  Date: 2026-09-12
- Decision: Remove office address and map from Contact page; do not display an address.
  Reason: Owner directed "NO ADDRESS" (no public office).
  Date: 2026-09-12
- Decision: Functions/forms are front-end only for now.
  Reason: No backend or payment integration requested; keeps scope minimal.

## Constraints
- Must visually follow the Shipshape Minds design system from the assets: accent `#4B2E83`, ink `#2D2A32`, canvas `#F4F0F9`, line `#E5DEF0`, lavender `#E9E4F0`, Inter + Playfair Display, `rounded-jumbo` (2rem).
- Do not display an office address anywhere on the site.
- Original assets in `Shipshape Minds/` folder are source material — do not edit them.

## Known Risks
- Social links use `href="#"` placeholders — need real profiles.
- SPA uses `BrowserRouter`: static hosting must serve `index.html` as a fallback for all routes (deployment concern).
- Donation/Volunteer/Contact/Newsletter forms submit nowhere yet — need backend/form provider integration to be functional.

## Open Questions
- Real social media profile URLs?
- Preferred hosting/deployment target (Netlify, Vercel, GitHub Pages, etc.)?
- Should forms submit anywhere, or stay front-end only?

## Next Action
Deliver the built site; get social media profile URLs from the owner and update `src/siteConfig.ts`; confirm hosting target and whether forms need a backend.

## Verification (last run 2026-09-12)
- `npm run build` (tsc -b + vite build): passed
- `npm run lint` (oxlint): passed
- Headless-browser render of all 6 routes (`node scripts/verify.mjs` via `vite preview`): all passed, zero console errors

## Live contact details (from owner 2026-09-12)
- Phone: 05020002555
- Email: noxyzinyando@gmail.com
- Company No.: 2024/427525/67 (shown in footer legal line)