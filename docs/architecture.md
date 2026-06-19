# Architecture

A practical mental model of how this site is built. Read this once and you should be able to navigate the codebase confidently.

---

## Mental model

A bilingual marketing site rendered statically via Next.js App Router. Every page is a server-friendly `page.tsx` plus a `layout.tsx` (for metadata), with hand-authored bilingual copy stored in `app/utils/page<X>Utils.ts`. Visual identity is governed by a strict design system maintained outside the codebase (in `docs/design-system/`).

There is no CMS. There is no database. There is no API server (yet — Brevo wiring is pending). Everything is files + Tailwind + a few client components for motion.

---

## Routing

App Router, file-based. 16 page entries:

```
/                                  app/page.tsx
/about                             app/about/page.tsx
/our-values                        app/our-values/page.tsx
/leadership                        app/leadership/page.tsx
/leadership/[slug]                 app/leadership/[slug]/page.tsx
/services                          app/services/page.tsx
/accounting-service                app/accounting-service/page.tsx
/assurance-service                 app/assurance-service/page.tsx
/consulting-service                app/consulting-service/page.tsx
/corporate-service                 app/corporate-service/page.tsx
/hr-service                        app/hr-service/page.tsx
/tax-service                       app/tax-service/page.tsx
/insights                          app/insights/page.tsx
/insights/[tag]/[slug]             app/insights/[tag]/[slug]/page.tsx
/contact                           app/contact/page.tsx
/subscribe                         app/subscribe/page.tsx        (unlinked, retained)
```

Each `page.tsx` is paired with a sibling `layout.tsx` that owns the `<title>`, `<meta description>`, and OpenGraph metadata for that route.

### Page clusters
- **About cluster** — `/about`, `/our-values`, `/leadership`, `/leadership/[slug]` share hero typography rules, font (Nexon Lv2 Gothic), and inter-section gradient flow. See `docs/design-system/decisions/2026-05-29-i-about-cluster-hero.md`.
- **Service cluster** — 6 service pages (`/accounting-service` etc.) share `ServiceCards`, `ServiceCTA`, `DynamicStatStrip`, and the per-service accent (Decision G). Each has its own tint, curve, and explainer diagram (Decision H).
- **Insights** — `/insights` is a list with filter + pagination. `/insights/[tag]/[slug]` renders an article from `app/utils/insights/<tag>/<slug>.ts` and `app/utils/insightCardsConfig.ts`.

---

## Content layer

### Bilingual translations

All user-visible copy is centralized in `app/utils/`:

```
app/utils/
├── pageUtils.ts                          shared labels (nav, footer, CTAs, services map)
├── pageAboutUtils.ts                     /about strings
├── pageValuesUtils.ts                    /our-values strings
├── pageLeadershipUtils.ts                /leadership strings
├── pageServicesUtils.ts                  /services strings (index)
├── pageAccountingServiceUtils.ts         /accounting-service strings
├── pageAssuranceServiceUtils.ts          /assurance-service strings
├── pageConsultingServiceUtils.ts         /consulting-service strings
├── pageCorporateServiceUtils.ts          /corporate-service strings
├── pageHrServiceUtils.ts                 /hr-service strings
├── pageTaxServiceUtils.ts                /tax-service strings
├── pageContactUtils.ts                   /contact strings
├── pageSubscribeUtils.ts                 /subscribe strings (retained)
├── insightTranslations.ts                shared insight labels
├── insightCardsConfig.ts                 insight list metadata
├── insights/                             per-article translations
├── leadership/                            per-leader profile translations
├── leadershipProfileTranslations.ts      shared leader profile labels
├── dynamicPageConfig.ts                  insight slug → route mapping
├── icons.ts                              icon re-exports from react-icons
├── styleUtils.ts                         small style helpers
├── muiComponents.ts                      MUI re-exports
└── subscribePageStyles.ts                subscribe-specific style helpers
```

Every translation is a `{ en, ko }` object. The pattern:

```ts
// app/utils/pageAboutUtils.ts
export const aboutPageTranslations = {
  heroTitle: { en: "Partnership Beyond Numbers", ko: "숫자 너머의 파트너십" },
  heroSubtitle: {
    en: "In Hong Kong's financial landscape, we listen first…",
    ko: "Olive & Vine은 홍콩 금융 시장에서 먼저 듣고…",
  },
};
```

Consuming a string:

```tsx
import { useLanguage } from "@/app/contexts/LanguageContext";
import { aboutPageTranslations as t } from "@/app/utils/pageAboutUtils";

const { language } = useLanguage();
const title = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
```

> When `<br />` is needed in a translation, write the literal `<br />` inside the string and render with `dangerouslySetInnerHTML`. Several pages already do this. Always pair `<br />` placements across `en` and `ko` so layouts match.

### Language state

`app/contexts/LanguageContext.tsx` provides `useLanguage()` returning `{ language: "ENG" | "KOR", setLanguage }`. The current language persists in `localStorage` (key: `language`) and hydrates on mount. Default: `"ENG"`.

The Header (`app/components/Header.tsx`) renders the toggle.

### Service accent context

`app/contexts/ServiceAccentContext.tsx` provides per-service tint tokens to components that need to differentiate by service (e.g. CTA buttons, stat strips). Service pages set the accent on mount via `useServiceAccent("tax" | "accounting" | …)`. See Decision G.

---

## Component layer

Three rough categories:

### Motion components
Hand-built reveal primitives. **Do not introduce `framer-motion` or other heavy motion libraries** — the team has standardized on these.

| Component | Purpose | Notes |
| --- | --- | --- |
| `SectionReveal.tsx` | Wrap a section to fade-up on enter | **v5: default-visible, fail-open.** Critical — see CLAUDE.md §2 |
| `ScrollLinkedStagger.tsx` | Stagger reveal of grid children on scroll | Pairs with `SectionReveal` |
| `AnimatedHeadline.tsx` | Cycle headline words with cross-fade | **v4: grid-stacked overlap.** Critical — see CLAUDE.md §2 |
| `ScrollRevealText.tsx` | Word-by-word fade as user scrolls | Used for long-form text |
| `StaggeredLineReveal.tsx` | Line-by-line reveal | Used for headlines split on `\n` |
| `ScrollProgressBar.tsx` | Top progress bar tied to scroll | Visual only |
| `TypewriterText.tsx` | Single-line typewriter | Used sparingly (no longer in about cluster) |
| `HeroTextReveal.tsx` | Hero-specific reveal | Hero only |
| `HeroTypewriterCycle.tsx` | Hero-only typewriter cycle | Deprecated path; do not re-add to about cluster |
| `HeroInteractionLayer.tsx` | Hero cursor-follow tonal light | Decision D |
| `HeroAccentLine.tsx` | Decorative line in hero | Visual only |
| `ServiceIconMotion.tsx` + `.css` | 6 motion icons (one per service) | Each service has a custom SVG motion |
| `CurveMotif.tsx` | 6 curve glyph variants | One per service (Decision H) |
| `GrowingLine.tsx` | SVG line that draws on scroll | Used in tax timeline |
| `MagneticButton.tsx` | Cursor-attraction button | Used sparingly |
| `ParallaxImage.tsx` | Vertical parallax | Used in /our-values |
| `Carousel.tsx` | Basic image carousel | About cluster |

### Layout / structural components

| Component | Purpose |
| --- | --- |
| `Header.tsx` | Top nav + language toggle + mobile menu |
| `Footer.tsx` | Bottom of every page, includes the Questions form |
| `PageTitle.tsx` | Hero heading wrapper used across pages |
| `ServiceCards.tsx` | Grid of 6 service tiles |
| `ServiceCTA.tsx` | Per-service CTA block (text varies by accent context) |
| `ServiceBadge.tsx` | Inline service tag |
| `InsightCards.tsx` | Insight card list (homepage + service pages) |
| `CorporateServiceInsightCards.tsx` | Insight cards filtered to corporate-service |
| `InsightsPagination.tsx` | Page nav for `/insights` |
| `DynamicStatStrip.tsx` | Stats row, varies by accent context |
| `ComplianceSection.tsx` | Bottom-of-page compliance / disclaimer block |
| `CareerTimeline.tsx` | Leader profile timeline |
| `ExplainerDiagram.tsx` | Per-service "How it works" diagram (Decision H) |
| `FaqAccordion.tsx` | HR page FAQ |
| `StructuredData.tsx` | JSON-LD injection for SEO |
| `ToggleMenu.tsx` | Mobile menu drawer |
| `StyledTextField.tsx` | MUI TextField wrapper for forms |
| `VimeoBackground.tsx` | Vimeo embed background |
| `ScrollToTop.tsx` | Floating back-to-top button |

### CSS

- **Tailwind 4** for utility classes (via `@tailwindcss/postcss`).
- **`app/globals.css`** — base resets and a few project-wide rules.
- **`app/animations.css`** — keyframes referenced by motion components. **All new keyframes go here**, not inline. The current keyframes:
  - `swirlOut` / `swirlIn` — legacy letter-flip
  - `blink` — typewriter cursor
  - `carouselFadeIn`
  - `headlineWordOut` / `headlineWordIn` — AnimatedHeadline v4
  - `insightCardReveal` — insights list stagger
- **`docs/design-system/colors_and_type.css`** — reference for brand tokens (color tokens, type scale). Mirror values into Tailwind config or per-component `style` props as needed.

---

## Assets

Everything in `/public`. Sub-folders mirror routes where possible:

```
public/
├── home/              hero video + decorative SVGs (LARGE — see handoff perf section)
├── about/             about cluster imagery
├── value/             our-values motifs
├── leadership/        leader portraits (rebecca, miyoung)
├── services/          per-service backgrounds (a1, b1, c1, t1, etc.)
├── hr/                HR-specific assets
├── insights/          insight article images (per slug)
├── contact/           contact-page imagery
├── subscribe/         subscribe-page imagery (retained though page is unlinked)
├── logo.png, logo-w.png
└── (next/vercel/etc. boilerplate)
```

**Asset naming gotcha:** the per-service decorative SVGs use cryptic names (`a1.svg`, `b1.svg`, `c1.png`, `t1.svg`). Don't infer their content from filenames — `b1.svg` is a photograph; `c1.png` is a lighthouse photo. They are placed by `decisions/` documents.

---

## SEO

- **`app/sitemap.xml/route.ts`** — generates `/sitemap.xml` dynamically. Reads static route list + `INSIGHT_PAGES` from `app/utils/dynamicPageConfig.ts`. Uses `NEXT_PUBLIC_SITE_URL` for the canonical host.
- **`app/robots.ts`** — generates `/robots.txt`. Allows all crawlers, references the sitemap.
- **Per-page `layout.tsx`** — owns `<title>` and `<meta description>` via Next.js `metadata` export.
- **`app/components/StructuredData.tsx`** — injects JSON-LD (organization schema, etc.).
- **`next.config.ts`** — sets `X-Robots-Tag: index, follow` site-wide and cache headers for `/sitemap.xml` and `/robots.txt`.

---

## i18n / Translation tooling

`/i18n` is **not** runtime infrastructure — it's developer tooling for refining Korean copy:

```
i18n/
├── GLOSSARY.md           Brand terminology (e.g. "Olive & Vine" never translated)
├── RULES.md              Style rules (tone, formality, sentence endings)
├── REVIEW_QUEUE.md       Strings awaiting human review
├── TRANSLATION_LOG.md    Append-only log of refinement passes
├── proofreading/
│   ├── Olive-and-Vine_번역검수.xlsx    Active proofreading sheet
│   ├── README.md
│   └── extracted.json                  Last extraction output (regen with extract.mjs)
└── scripts/
    ├── extract.mjs                     Source → JSON (walks app/utils/ + app/**/page.tsx)
    ├── walker.mjs                      AST walker used by extract.mjs
    ├── build_xlsx.py                   JSON → xlsx (one sheet per page)
    ├── xlsx_to_edits.py                xlsx → patch JSON
    ├── apply.mjs                       Patch JSON → source files
    └── _roundtrip_test.py              Sanity check
```

End-to-end refinement cycle:

```
source.ts  ─extract.mjs→  extracted.json  ─build_xlsx.py→  xlsx
                                                              │ (human edits)
source.ts  ←apply.mjs─  patch.json  ←xlsx_to_edits.py─  xlsx
```

The full per-string rules live in `Translation-Master-Prompt.md` at the project root.

---

## Build / runtime

- **Build:** `next build` outputs to `.next/`. App Router pages are server-rendered or static depending on hooks used.
- **Client components:** any component that uses `useState`, `useEffect`, `useLanguage`, etc., is marked `"use client"`. Most motion + interactive components are client.
- **Hydration:** the language toggle hydrates from `localStorage` on mount. Some `useLayoutEffect` hooks exist to avoid layout-flash (especially in `SectionReveal`).
- **No service workers, no PWA manifest beyond favicon.**

---

## Vercel infrastructure

- **Two projects (or one project with two domains, depending on setup):**
  - Staging — `test.oliveandvinehk.com`
  - Production — `oliveandvinehk.com`
- **`@vercel/analytics`** and **`@vercel/speed-insights`** are wired in `app/layout.tsx` for traffic and Web Vitals.
- **Env vars** are duplicated across environments. See `docs/getting-started.md` for the full list.

---

## What this codebase deliberately does NOT have

Worth knowing so you don't suggest adding them:

- **No CMS** — copy lives in TS files
- **No DB / no backend** (Brevo wiring pending)
- **No PR workflow** — push directly to `main`
- **No tests** — no Jest, no Playwright, no Vitest. The team relies on TS + lint + visual review on staging.
- **No `framer-motion`** — motion is hand-built
- **No `clsx` / `classnames`** — template literals are used directly
- **No CSS-in-JS** beyond MUI (which is used for form controls only)
- **No design tokens package** — design tokens live in CSS/utility classes; see `docs/design-system/colors_and_type.css`
- **No analytics beyond Vercel** — no Google Analytics, no Plausible, no Mixpanel
- **No internationalization library** — bilingual handled by hand via `useLanguage()`. The site only ever supports EN + KO.

If any of these need to change, raise it as a decision (drop a new `decisions/<date>-<topic>.md`) before implementing.
