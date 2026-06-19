# CLAUDE.md — Brief for AI assistants working on this repo

> If you are a Claude (or other AI) agent helping a developer modify this site, **read this entire file first** before touching code. The team has spent many iterations getting the visual language right; most "obvious" suggestions you might make are already explicitly forbidden. Drift starts when "why" gets lost.

---

## What this is

Marketing site for **Olive & Vine** — a Hong Kong accounting & advisory firm. Bilingual (English / Korean). Single page-template per route; no CMS. Hand-authored copy.

- **Production:** https://oliveandvinehk.com
- **Staging:** https://test.oliveandvinehk.com
- **Branch model:** push directly to `main` (no PRs)
- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · TypeScript 5 · MUI 7 · Vercel

---

## 1. Brand rules — these are blockers, not suggestions

The full list with rationale is in `docs/design-system/rules/forbidden.json`. The high-impact ones:

| Rule | What it means in practice |
| --- | --- |
| **No `box-shadow`, `text-shadow`, `drop-shadow-*`** | Depth comes from color swap and a north-east corner gesture. Never add shadows for hover/depth. |
| **No `backdrop-filter`, no `blur-*`** | No frosted glass. Use opacity layering at 30 / 50 / 70 / 80 tiers. |
| **No `linear-gradient(...)`** | Gradients allowed only as `radial-gradient(...)`. Linear gradients are forbidden across all files. |
| **Single olive hue family** | The brand olive is one chromatic family. Do not introduce new greens, teals, or sage variants. Allowed tokens are in `docs/design-system/colors_and_type.css`. |
| **No italic except Pattern B** | Italics are reserved for one specific section pattern. Don't sprinkle `italic` for emphasis. |
| **No emoji in product copy** | Translation files and on-page copy are emoji-free. Code comments may have them. |
| **No new fonts** | Nexon Lv2 Gothic (Korean) + Geist (Latin) only. Do not import Google Fonts. |
| **Heading reveal animation must be subtle** | Each `<h*>` uses `SectionReveal` or a fade — never bounce, rotate, slide-in. |

Before any visual change, grep `forbidden.json` for the property you are about to add.

---

## 2. Critical components — touch with care

These were rebuilt multiple times. Each comment block at the top of the file records the iteration history. Do not "simplify" them without reading the comments.

### `app/components/SectionReveal.tsx` — **default-visible, fail-open**
Versions v1–v4 used `revealed: false` + `IntersectionObserver` → broke during Next.js back-navigation scroll restoration (content invisible forever). **v5 inverts the default**: starts visible, hides only if the element is below the viewport on mount, registers a scroll listener only while hidden. Never revert to the default-hidden approach.

### `app/components/ScrollLinkedStagger.tsx`
Sibling pattern to SectionReveal but for grid children. Same fail-open rule.

### `app/components/AnimatedHeadline.tsx` — **CSS Grid stack cross-fade (v4)**
v3 used a single `<span>` with opacity 1 → 0 → swap → 0 → 1. The blank middle frame felt abrupt. v4 stacks prev + current words in the same grid cell and runs overlapping keyframes (`.headline-word-out` + `.headline-word-in` in `app/animations.css`). React keys `prev-${cycleId}` / `curr-${cycleId}` force re-mount each cycle.

### `app/components/CurveMotif.tsx`
Hand-tuned SVG glyphs (6 curve variants). New curves require a new variant entry, not a parameter change.

### `app/components/ExplainerDiagram.tsx`
Per-service diagram. Don't unify the visuals across services — per-service differentiation is intentional (see `decisions/2026-05-28-g-per-service-hero-tints.md`).

---

## 3. File map — where to look

| Question | Look here |
| --- | --- |
| **"Where is the copy for service X?"** | `app/utils/page<X>ServiceUtils.ts` (bilingual `{ en, ko }` objects) |
| **"Where is the home copy?"** | `app/utils/pageUtils.ts` |
| **"Where is the about / values / leadership copy?"** | `app/utils/pageAboutUtils.ts` · `pageValuesUtils.ts` · `pageLeadershipUtils.ts` |
| **"Where are leadership profiles?"** | `app/utils/leadership/<name>.ts` |
| **"Where are insight articles?"** | `app/utils/insights/` + `app/utils/insightCardsConfig.ts` + `app/utils/insightTranslations.ts` |
| **"Where is the language toggle?"** | `app/contexts/LanguageContext.tsx` — `useLanguage()` returns `{ language: "ENG" \| "KOR", setLanguage }` |
| **"Where are per-service color tints?"** | `app/contexts/ServiceAccentContext.tsx` (see Decision G) |
| **"Where are reveal/motion components?"** | `app/components/SectionReveal.tsx`, `ScrollLinkedStagger.tsx`, `AnimatedHeadline.tsx`, `ScrollRevealText.tsx`, `StaggeredLineReveal.tsx`, `ScrollProgressBar.tsx` |
| **"Where are CTA/stat strip mappings per service?"** | `app/components/ServiceCTA.tsx`, `app/components/DynamicStatStrip.tsx` |
| **"How do related services balance across pages?"** | `app/utils/insightCardsConfig.ts` + balanced manually so each service appears 3 times (Task 81) |
| **"Where are CSS animations defined?"** | `app/animations.css` (keyframes) and a small base in `app/globals.css` |
| **"Where is the forbidden-rule lint list?"** | `docs/design-system/rules/forbidden.json` |
| **"Where are past design decisions?"** | `docs/design-system/decisions/` (10 docs, dated) |
| **"Where are component playbooks?"** | `docs/design-system/playbooks/` |

---

## 4. Bilingual content pattern

Every user-visible string lives in a `pageXxxUtils.ts` (or similar) file as:

```ts
export const exampleTranslations = {
  heroTitle: {
    en: "Partnership Beyond Numbers",
    ko: "숫자 너머의 파트너십",
  },
  heroBody: { en: "...", ko: "..." },
};
```

In components, switch via `useLanguage()`:

```ts
const { language } = useLanguage();
const title = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
```

When you add new strings: **always add both `en` and `ko`**. When unsure of Korean, leave a `TODO(ko)` and add to `i18n/REVIEW_QUEUE.md`.

---

## 5. Translation refinement workflow

Korean copy is iteratively refined via a spreadsheet round-trip. **If the user asks you to "refine Korean copy" or hands you an updated `Olive-and-Vine_번역검수.xlsx`, follow this exact flow:**

1. **Read `Translation-Master-Prompt.md`** first. It defines the translator persona, glossary, and rules.
2. Confirm the xlsx is at `i18n/proofreading/Olive-and-Vine_번역검수.xlsx`.
3. **Sheet structure**: 17 sheets, one per page or shared component. Columns:
   - `ID` (e.g. `app/utils/pageUtils.ts::pageTranslations.Home`) — exact source location
   - `위치` (path within the file)
   - `종류` (string type — label / bullet / SEO meta / etc.)
   - `EN (원문)` and `KO (현재 번역)` — current values, do not modify
   - **`수정 EN` and `수정 KO`** — the human's revised values. Empty = no change.
   - `메모` (notes)
4. **For each row where `수정 EN` or `수정 KO` is non-empty**, edit the source file at the path in `ID` and replace only that string's `en` or `ko` value. Do not touch surrounding code.
5. **Run the helper scripts** to mass-apply when scale demands it:
   - `python3 i18n/scripts/xlsx_to_edits.py` → produces a JSON patch from the xlsx
   - `node i18n/scripts/apply.mjs` → writes the changes to source
6. After applying, append a one-line summary to `i18n/TRANSLATION_LOG.md`.

---

## 6. Pitfalls — already burned, don't repeat

A fuller list with timelines is in `docs/known-issues.md`. The short version:

- **Back-navigation invisible content** — fixed in SectionReveal v5; do not revert to v1–v4 approach.
- **Hero white frame** — achieved with a padded white wrapper around a `max-w-[1800px]` rounded section. Don't rebuild with `border` or `outline`. Hero notches use a PNG alpha mask on the video container.
- **Asset confusion** — `b1.svg` is a photo, `c1.png` is a lighthouse, `a1.svg` is a line drawing. They are positioned per-page (see `decisions/`).
- **Service page differentiation** — each of the 6 service pages has its own hero tint and curve motif (Decision G & H). Do not unify.
- **`/insights/page.tsx` "전체" was renamed to "최신" (Latest)**. The list is in publish order, not alphabetical. Don't re-add the sort.
- **`/subscribe` is intentionally unlinked**. Page and assets are retained for future re-enable. Do not delete; do not re-link from anywhere.
- **`SectionReveal` must wrap the in-section content, not the section itself** — wrapping the whole section keeps the background animating with it, which clashes with sticky backgrounds (Task 84).
- **No `IntersectionObserver` for reveal logic** — v4+ uses scroll-event listeners only, because IO behaves unpredictably with Next.js scroll restoration.

---

## 7. Where work picks up next

Read `docs/handoff.md`. Top-priority pending items as of v3.0:

1. Contact form email integration via **Brevo** (Contact page + Footer questions form)
2. **DeepL API key rotation** (the current key was exposed)
3. **Performance optimization** — `/public` is 154 MB; the home `.svg` and `.mp4` assets are 18–30 MB each
4. Subscribe backend — explicitly **deferred**

---

## 8. Tone rules when answering the user

- The owner is Korean-speaking. Mix English and Korean naturally when helpful. Code, file paths, and English-only documents stay English.
- Be concise. The team has done 100+ iterations; over-explaining wastes time.
- Confirm before destructive changes (deletions, mass renames). The codebase has visible authorial intent — preserve unfamiliar patterns until you understand them.
- If you change a critical component, **append a new comment block** to the top with the version number and rationale. Don't rewrite history.
