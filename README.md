# Gabriel Ivan Portfolio

A production-ready, multilingual portfolio for Gabriel Ivan Setyaputra built on the Next.js App Router. It showcases professional experience, highlighted projects, and contact information with immersive visuals, internationalization, and accessibility in mind.

## Features
- **Multilingual experience** powered by `next-intl` with localized routes for English, Bahasa Indonesia, Bahasa Melayu, Thai, Vietnamese, and Filipino.
- **Immersive UI** including a theme-aware space background, animated glow cards, floating cursor, and dynamic favicon that adapts to the active theme.
- **Content-rich sections** for hero, projects, experience, education, skills, interests, and contact, all driven by typed data and structured translations.
- **Responsive and accessible design** built with Tailwind CSS 4, Framer Motion animations, and semantic markup to ensure smooth navigation across devices.
- **Actionable calls to action** with direct contact links, CV download, and deep links between the home and projects pages.

## Tech Stack
- [Next.js 15](https://nextjs.org/) with App Router and React Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) with `tw-animate-css`
- [Framer Motion](https://www.framer.com/motion/) for animations and scroll effects
- [next-intl](https://next-intl-docs.vercel.app/) for internationalization
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching
- [Lucide](https://lucide.dev/) icon set

## Getting Started
### Prerequisites
- Node.js 20 or newer
- npm 10+ (bundled with Node 20)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The development server runs at [http://localhost:3000](http://localhost:3000). Hot reload is enabled, and the Turbopack dev server is used by default.

### Quality Checks
```bash
npm run lint
```

### Production Build
```bash
npm run build
npm run start
```

## Project Structure
- `app/` � root layout, locale-aware routes, and global styles
- `components/layout/` � header, footer, and layout scaffolding
- `components/sections/` � page sections such as Hero, Projects, Experience, and Skills
- `components/ui/` � reusable UI primitives (glow cards, floating cursor, theme toggle, etc.)
- `components/providers/` � shared providers like the theme context wrapper
- `i18n/` � routing helpers and request configuration for `next-intl`
- `messages/` � translation JSON files per locale
- `public/` � static assets (logos, favicons, CV, imagery)
- `docs/` � supplementary guides (e.g., Formspree setup)

## Content Management
- Project data is sourced from Sanity (`lib/projects.ts`). The helper automatically uses a server token when one of `SANITY_API_READ_TOKEN`, `SANITY_API_TOKEN`, or `SANITY_API_WRITE_TOKEN` is present, and falls back to the public CDN otherwise.
- For private datasets, add the token to `.env.local`; public datasets can omit it.
- Update localized project copy by editing the corresponding `messages/{locale}.json` entries (e.g., Indonesian strings live in `messages/id.json`).


## Internationalization
- Routes are localized via `middleware.ts` and `i18n/routing.ts`.
- Translations live under `messages/{locale}.json` and are accessed with `useTranslations`.
- Add or update locales by extending `routing.locales` and providing matching message files.

## Styling and Animation Notes
- `components/ui/travel-in-space-background.tsx` renders the animated, theme-aware starfield behind every page.
- `components/ui/glow-card.tsx` wraps content in an interactive glassmorphism card used across sections.
- Animations rely on `framer-motion` hooks (`useInView`, `useScroll`) to reveal content smoothly; keep easing durations consistent when adding new motions.

## Additional Documentation
See the `docs/` directory for supplementary references, including Formspree setup details and the project plan notes used during development.

## Deployment
The project is optimized for Vercel deployment. Run `npm run build` locally to ensure the build succeeds before deploying. Configure any required domain, analytics, or SEO settings (such as Google verification) in `app/layout.tsx`.

---
Maintained by Gabriel Ivan Setyaputra. Feel free to open issues or pull requests to propose enhancements or fix bugs.
