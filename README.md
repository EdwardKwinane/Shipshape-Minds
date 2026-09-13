# Shipshape Minds — Website

Public website for **Shipshape Minds**, a non-profit organisation supporting children, young people, and vulnerable communities through mental health, emotional wellness, and social development initiatives.

Built with **Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · React Router 7**. Original static HTML design assets live in the `Shipshape Minds/` folder.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # typecheck + production build (outputs dist/)
npm run preview    # serve the production build locally
npm run lint       # run oxlint
npm run verify     # smoke-test all routes in a headless browser (needs `npm run preview` running on :4173)
```

## Routes

- `/` Home
- `/about` About Us
- `/programs` Our Programs
- `/get-involved` Get Involved
- `/donate` Donations
- `/contact` Contact Us

## Key files

- `src/siteConfig.ts` — site name, contact info, nav links (single place to update contact details / socials)
- `src/index.css` — Tailwind `@theme` design tokens (brand colors, fonts, radius) and custom utilities
- `src/components/` — shared `Navbar`, `Footer`, `Layout`
- `src/pages/` — one component per route

## Deployment note

The app uses client-side routing (`BrowserRouter`). Hosting must fall back to `index.html` for all routes (standard on Netlify, Vercel, etc.). Contact details, social links, and form submissions are placeholders pending real values.