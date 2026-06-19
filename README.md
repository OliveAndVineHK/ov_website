# Olive & Vine — Website (v3.0)

Marketing website for **Olive & Vine**, a Hong Kong accounting and advisory firm. Bilingual (English / Korean), responsive, and built around a strict, hand-crafted design system.

- **Production:** https://oliveandvinehk.com
- **Staging:** https://test.oliveandvinehk.com
- **Stack:** Next.js 16 · React 19 · Tailwind 4 · TypeScript 5 · MUI 7 · Vercel

---

## Quick start

```bash
# 1. Install
npm install

# 2. Local env file (create manually — see "Environment variables" below)
cp .env.local.example .env.local 2>/dev/null || touch .env.local

# 3. Dev server
npm run dev                        # http://localhost:3000

# 4. Production build
npm run build && npm run start
```

> **Node:** any version compatible with Next.js 16 (Node 18.18+ / 20+ / 22+). Tested on Node 22 LTS.

---

## Project structure

```
.
├── app/                       Next.js App Router pages + components + utils
│   ├── page.tsx               Home
│   ├── about/                 About cluster (about · our-values · leadership)
│   ├── our-values/
│   ├── leadership/            + /[slug] full profile
│   ├── services/              + 6 service pages (accounting · assurance · consulting · corporate · hr · tax)
│   ├── insights/              + /[tag]/[slug] articles
│   ├── contact/               Contact form
│   ├── subscribe/             Subscribe form (links removed, page retained for future)
│   ├── components/            38 reusable components (motion, layout, content)
│   ├── utils/                 24 utility files — most are bilingual content (`pageXxxUtils.ts`)
│   ├── contexts/              Language + ServiceAccent providers
│   ├── animations.css         Keyframe animations
│   ├── globals.css            Base styles
│   ├── robots.ts              SEO
│   └── sitemap.xml/route.ts   SEO
├── public/                    Static assets — videos, SVGs, photos (~154 MB total)
├── i18n/                      Translation tooling — see CLAUDE.md and docs/handoff.md
│   ├── GLOSSARY.md            Brand terminology (EN/KO mapping)
│   ├── RULES.md               Translation rules
│   ├── REVIEW_QUEUE.md        Pending translation review items
│   ├── TRANSLATION_LOG.md     Change log of refinements
│   ├── proofreading/          xlsx-based proofreading workflow input
│   └── scripts/               extract.mjs · apply.mjs · build_xlsx.py · xlsx_to_edits.py
├── docs/                      Project documentation
│   ├── getting-started.md     Detailed local setup + deployment
│   ├── architecture.md        System patterns and conventions
│   ├── handoff.md             Current state and pending work (LIVE doc)
│   └── known-issues.md        Gotchas and historical decisions
├── CLAUDE.md                  Entry point for AI assistants
├── Translation-Master-Prompt.md   Master prompt for the translation refinement task
└── README.md                  (this file)
```

The hand-authored design system documentation is bundled into the repo at `docs/design-system/` — it contains the `decisions/`, `playbooks/`, `rules/forbidden.json`, and the system portfolio HTML. Read those before any visual change. (A larger reference workspace with audits and fonts lives outside the repo; ask the owner if you need it.)

---

## Environment variables

Create `.env.local` (never commit — it is gitignored):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical base URL used by sitemap, robots, and metadata. Falls back to Vercel preview URL, then `https://test.oliveandvinehk.com`. Set this in production to `https://oliveandvinehk.com`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification token. Outputs `<meta name="google-site-verification" content="..." />`. |
| `DEEPL_API_KEY` | For translation scripts | Used by `i18n/scripts/` to call DeepL for draft translations. Not needed for runtime. |
| `DEEPL_GLOSSARY_ID` | For translation scripts | Glossary ID for DeepL term consistency. |
| `BREVO_API_KEY` | Pending (see handoff) | Will power contact form email delivery. Not yet wired. |

> The current `.env.local` contains a DeepL key that was **exposed in an earlier development chat**. Rotate it at https://www.deepl.com/account/api-keys before production deployment. See `docs/handoff.md` → Security.

---

## Scripts

```bash
npm run dev        # Next.js dev server with HMR
npm run build      # Production build (.next/)
npm run start      # Serve the production build
npm run lint       # ESLint (Next + TypeScript rules)
```

### Translation refinement (Korean copy)

The site has 800+ bilingual strings. Refinement is driven by a spreadsheet round-trip:

```bash
# 1. Extract every bilingual string from app/utils/ + app/**/page.tsx into JSON
node i18n/scripts/extract.mjs

# 2. Build the editable xlsx (one sheet per page, EN/KO columns)
python3 i18n/scripts/build_xlsx.py

# 3. Human edits in i18n/proofreading/Olive-and-Vine_번역검수.xlsx
#    (fill the "수정 EN" / "수정 KO" columns where revisions are needed)

# 4. Convert edits back to a patch
python3 i18n/scripts/xlsx_to_edits.py

# 5. Apply the patch to source files
node i18n/scripts/apply.mjs
```

Full guide and rules: `Translation-Master-Prompt.md` and `docs/handoff.md` → Translation proofreading workflow.

---

## Deployment (Vercel)

Two environments:

1. **Staging** — `test.oliveandvinehk.com`. Always deploy here first.
2. **Production** — `oliveandvinehk.com`. Promote after staging review.

The flow is **push to `main` → Vercel auto-builds → review on staging → promote to production**. There is no PR workflow on this repo; small team, direct commits.

For the full first-time setup (creating the Vercel project, attaching domains, setting env vars), see `docs/getting-started.md`.

---

## Documentation map

| If you want to… | Read |
| --- | --- |
| Run the site locally for the first time | `docs/getting-started.md` |
| Understand the codebase patterns | `docs/architecture.md` |
| Know what's done and what's left | `docs/handoff.md` |
| Avoid traps the previous devs already hit | `docs/known-issues.md` |
| Make any visual change | `docs/design-system/rules/forbidden.json` + the `decisions/` folder |
| Refine Korean copy | `Translation-Master-Prompt.md` |
| Brief an AI assistant on this repo | `CLAUDE.md` |

---

## License

Private — © Olive & Vine (HK) Limited. Not for redistribution.
