# Ajete Isaku — Data Engineer Portfolio

A personal portfolio for a Data Engineer, built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Recharts** and **Lucide React**.

It includes a hero section with a live pipeline console, a skills matrix with a radar chart, five full case-study pages, an interactive explorer for ten architecture patterns, an experience timeline, a certification roadmap, an impact dashboard built with Recharts, a blog with full article pages, and a recruiter-focused contact section.

---

## Features

| Area | What you get |
| --- | --- |
| **Design** | Dark theme, glassmorphism cards, gradient type, an animated data grid, and animated connectors between pipeline stages |
| **Motion** | Framer Motion reveals, counters, layout animations and tab transitions. `prefers-reduced-motion` is respected everywhere |
| **Case studies** | 15 sections per project: summary, problem, architecture, sources, data flow, model, ETL, stack, SQL, Python, challenges, performance, impact, lessons and metrics |
| **Architecture explorer** | 10 interactive diagrams (Medallion, Modern DW, Data Lake, Star, Snowflake, ETL vs ELT, Batch, Stream, Governance, End-to-End). Every stage or table can be clicked |
| **Dashboard** | 8 KPI cards with sparklines and 4 Recharts charts with tooltips, a 6M/12M range toggle and accessible data tables |
| **SEO** | Metadata API, Open Graph image generated at build time, sitemap, robots, web manifest, and JSON-LD (`Person`, `BlogPosting`) |
| **Accessibility** | Semantic landmarks, a skip link, ARIA tabs, meters and live regions, a data table behind every chart, and visible focus states |
| **Performance** | Content pages are statically generated (`generateStaticParams`), fonts are self-hosted with `next/font`, and icon imports are optimised |

---

## Folder structure

```
.
├── .github/workflows/ci.yml        # CI: install + production build on every push/PR
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, global metadata
│   │   ├── page.tsx                # Home page (all sections) + Person JSON-LD
│   │   ├── globals.css             # Tailwind v4 theme + custom utilities
│   │   ├── projects/[slug]/page.tsx# Case study pages (static)
│   │   ├── blog/[slug]/page.tsx    # Article pages (static) + BlogPosting JSON-LD
│   │   ├── opengraph-image.tsx     # Dynamic 1200×630 social card
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   ├── icon.svg                # Favicon
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── sections/               # Hero, About, Skills, Projects, Architecture,
│   │   │                           # Experience, Certifications, Dashboard, Blog, Contact
│   │   ├── project/CaseStudy.tsx   # Case study page layout
│   │   ├── ui/                     # Reveal, Counter, CodeBlock, SectionHeader, icons…
│   │   └── Providers.tsx           # MotionConfig (reduced-motion aware)
│   ├── data/                       # ← ALL CONTENT LIVES HERE
│   │   ├── profile.ts              # Name, headline, links, stats, about story
│   │   ├── skills.ts               # Skill matrix + proficiency
│   │   ├── projects.ts             # Five case studies
│   │   ├── architecture.ts         # Ten architecture diagrams
│   │   ├── experience.ts           # Role, responsibilities, outcomes
│   │   ├── certifications.ts       # Certification roadmap
│   │   ├── metrics.ts              # Dashboard KPIs and chart series
│   │   ├── blog.ts                 # Articles
│   │   └── site.ts                 # Site URL, SEO keywords, navigation
│   └── lib/                        # cn(), formatting, SQL/Python highlighter
├── BRANDING.md                     # Bio, LinkedIn About, GitHub README, resume summary, pitch
├── next.config.ts · tsconfig.json · postcss.config.mjs
└── package.json
```

---

## Installation

**Prerequisites:** Node.js 18.18 or later (20 LTS recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) set your public URL for canonical links, OG and sitemap
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local

# 3. Start the dev server
npm run dev                        # http://localhost:3000

# 4. Production build
npm run build
npm start
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (includes type checking) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check only |

> **Installing Node on Windows:** `winget install OpenJS.NodeJS.LTS`, then open a new terminal.

---

## Customising the content

You don't need to touch any component. Edit the files in `src/data/`:

1. **`profile.ts`**: name, links, email (leave empty to hide email buttons), hero stats and about story.
2. **`experience.ts`**: company, dates and outcomes.
3. **`certifications.ts`**: set `status` to `"Earned"` only for credentials you hold, and add a `credentialUrl` (Microsoft Learn transcript or Credly) so it can be verified.
4. **`metrics.ts`**: your own tracked numbers.
5. **`projects.ts`**: align every figure with work you can talk about in an interview.
6. **`site.ts`**: SEO keywords and navigation.

### Pre-publish checklist

- [ ] LinkedIn and GitHub URLs in `profile.ts` point to **your** profiles
- [ ] Email set (or deliberately left empty)
- [ ] Company name and start date in `experience.ts`
- [ ] Certification statuses reflect reality
- [ ] Every number on the site is one you can defend in an interview
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel to your final domain

---

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel detects Next.js automatically, so the default build settings work.
3. Under **Settings → Environment Variables**, add:
   `NEXT_PUBLIC_SITE_URL = https://your-domain.com` (or your `*.vercel.app` URL)
4. Click **Deploy**. Every push to `main` triggers a production deployment, and every pull request gets a preview URL.
5. (Optional) **Settings → Domains**: add a custom domain such as `ajeteisaku.dev` and update `NEXT_PUBLIC_SITE_URL`.

Using the CLI instead:

```bash
npm i -g vercel
vercel            # first deploy (preview), follow the prompts
vercel --prod     # production deploy
```

### Other hosts

Any platform that runs Node.js works (Azure Static Web Apps, Netlify, Render, or a Docker container). Run `npm run build` and then `npm start`, and set `NEXT_PUBLIC_SITE_URL`.

---

## GitHub repository setup

```bash
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

Recommended repository settings:

- **Name:** `portfolio` or `<username>.github.io-style` vanity name
- **About:** “Data Engineer portfolio — Azure, Microsoft Fabric, Databricks” and set the website to your Vercel URL
- **Topics:** `data-engineering` `portfolio` `nextjs` `azure` `microsoft-fabric` `databricks` `typescript`
- **Branch protection on `main`:** require the CI workflow to pass before merging
- Commit `package-lock.json` after your first `npm install` so builds are reproducible

---

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion 12 · Recharts 2 · Lucide React · next/font (Inter, Space Grotesk, JetBrains Mono)

## License

© Ajete Isaku. All rights reserved. The source code may be used as a reference. Personal content (text, case studies, branding) may not be reused.
