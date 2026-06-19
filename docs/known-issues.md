# Known issues, traps, and evolution stories

The stuff that took many iterations to get right. If a future change "obviously" wants to undo one of these, read the story first.

---

## 1. Back-navigation invisible content (SectionReveal v1 → v5)

**Symptom:** A user opens the site, navigates into a deep page (e.g. `/leadership/rebecca`), then hits the browser back button. The previous page renders with all sections invisible. Manual scroll or reload restores them.

**Root cause:** Next.js App Router restores scroll position to the previous offset on back-navigation. If `SectionReveal` uses `revealed: false` as its initial state and waits for `IntersectionObserver` or scroll events to flip it true, the observer fires *before* the scroll restoration completes — the element is technically below the viewport at the moment IO checks, so it stays hidden. The user lands at the restored scroll position with hidden sections.

**Evolution:**
- **v1** — basic `IntersectionObserver`. Worked on forward nav, broke on back nav.
- **v2** — added `requestAnimationFrame` retry after mount. Broke on slower devices.
- **v3** — polled `getBoundingClientRect()` for 500ms. Race condition still possible.
- **v4** — dropped IO entirely, used scroll-event listener with `passive: true`. Same race condition surfaced under fast back-nav.
- **v5 (current)** — **invert the default**. `revealed: true` on mount. `useLayoutEffect` runs synchronously pre-paint; if the element is below the viewport, hide it and register a scroll listener that re-shows it when scrolled into view. The failure mode is now "visible by default" instead of "invisible by default" — much better UX.

**Rule:** Never revert to default-hidden. If you must add a new reveal primitive, use the same fail-open pattern.

**Files:** `app/components/SectionReveal.tsx`, `app/components/ScrollLinkedStagger.tsx`.

---

## 2. Hero design (10+ iterations)

The home hero went through 10+ visual iterations. The current state is **stable** — do not redesign without strong justification.

**Final design:**
- A padded white wrapper around the hero.
- Inside the wrapper, a section with `max-w-[1800px]`, `overflow-hidden`, large `border-radius`, and `min-h` scaling by breakpoint.
- The background is a `<video>` with `poster="/home/home-bg.png"` as fallback. The video container has a CSS mask using `home-bg.png` so the white corner notches stay visible during playback (the PNG's alpha channel cuts the notches).
- Dark wash via `radial-gradient` from bottom-left for text legibility.
- Heading uses `AnimatedHeadline` (CSS-grid stacked cross-fade) with the values cycle: Clarity / Integrity / Partnership.

**Things tried and rejected:**
- **Curtain-in animation** (sliding panels) — felt theatrical, removed.
- **Asymmetric L-shaped SVG notches** at top-left + bottom-right — too complex to maintain across viewports, abandoned.
- **CSS-only border-radius** without the PNG mask — the corner notches disappeared once the video loaded over the poster image.
- **`max-w-7xl` (1280px)** — too narrow at 1920px+ viewports; replaced with `max-w-[1800px]`.
- **Left-aligned heading** — content was covered by the bright leaf background; reverted to centered + capped font sizes.
- **`linear-gradient` for the dark wash** — explicitly forbidden brand-wide; uses `radial-gradient` only.

**Files:** `app/page.tsx`, `app/animations.css`.

---

## 3. AnimatedHeadline cross-fade (v3 → v4)

**v3 problem:** A single `<span>` going opacity 1 → 0 → swap text → 0 → 1 created a visible blank moment in the middle. Users said the change felt abrupt.

**v4 solution:** Stack the outgoing and incoming words in the same CSS Grid cell (`grid-area: 1 / 1`). Run overlapping keyframe animations:
- `.headline-word-out` — opacity 1→0, translateY 0→-40%, blur 0→4px
- `.headline-word-in` — opacity 0→1, translateY 40%→0, blur 4px→0

Both animations are 1.6s `cubic-bezier(0.16, 1, 0.3, 1)`. React keys force a fresh mount each cycle so the keyframes re-run. No blank frame; ticker-like feel.

**Don't:** revert to single-span fade. Don't add `framer-motion` to "simplify" this — the entire stack is hand-built motion, intentionally.

**Files:** `app/components/AnimatedHeadline.tsx`, `app/animations.css` (lines under "AnimatedHeadline cross-fade").

---

## 4. SectionReveal placement — wrap content, not the section

**Problem:** Initial implementation wrapped the entire `<section>` with `SectionReveal`. When sections had sticky backgrounds (e.g. about cluster gradient flow), the background animated in with the section, causing a jarring "swooping in" of the entire background.

**Fix:** Move `SectionReveal` *inside* the section, wrapping only the content. The section + background mount normally; only the foreground content fades up. See Task 84.

**Rule:** `SectionReveal` is for content, not for layout containers.

---

## 5. `/subscribe` is unlinked but retained

**Decision:** The Subscribe-to-Insights feature is deferred (see `docs/handoff.md` → Deferred). All visible links to `/subscribe` are removed (the envelope button on insight article pages, the sitemap entry, etc.). The page itself, the form, and the assets are **retained** in the repo for future re-enable.

**Don't:**
- Delete `app/subscribe/` or `app/utils/pageSubscribeUtils.ts`
- Re-add the link in `app/insights/[tag]/[slug]/page.tsx`
- Re-add `/subscribe` to `app/sitemap.xml/route.ts`

**Do:** if the feature is reactivated, follow the steps in handoff → Deferred.

---

## 6. `/insights` "전체" → "최신" rename + publish-order list

**What changed:**
- The "전체" / "All" filter chip was renamed to "최신" / "Latest" across both the chip display and the dropdown.
- The list previously sorted alphabetically by title. Now it shows cards in **array order** of `INSIGHT_LIST_CARDS` in `app/utils/insightCardsConfig.ts`. That array is authored manually in publish order (newest first).
- Cards fade in row-by-row when the filter changes (key on grid → remount → `.insight-card-reveal` re-runs).

**Don't:** re-introduce an alphabetical sort. Don't rename "Latest" back to "All" — the team prefers "Latest" for semantic clarity.

**Files:** `app/insights/page.tsx`, `app/utils/insightCardsConfig.ts`, `app/animations.css` (`.insight-card-reveal`).

---

## 7. Asset confusion — the per-service decorative SVGs

These filenames are cryptic. The actual content:

| File | Content | Used on |
| --- | --- | --- |
| `public/services/a1.svg` | Line drawing | Consulting methodology, bottom-right |
| `public/services/b1.svg` | Photograph (yes, an SVG with embedded raster) | Accounting Pattern 02, top |
| `public/services/c1.png` | Lighthouse photo | Tax page, left col-5, soft fade |
| `public/services/t1.svg` | Tree silhouette | Corporate page |
| `public/value/sa-1.svg` etc. | Values motifs | /our-values |
| `public/home/au2.*` | Astronomical-ish diagram | Assurance page, sticky right |

The placement of each asset on its target page is documented in the corresponding `decisions/` file. If you need to move one, check the decision doc first — placement is the result of many iterations (sizing, mask, fade direction).

**Files:** `docs/design-system/decisions/` (see Decision G and the asset-adjustment tasks 66–75).

---

## 8. Per-service differentiation is intentional

The 6 service pages each have:
- A unique hero tint (olive-family, different saturation)
- A unique curve motif (`CurveMotif` variant 1–6)
- A unique explainer diagram (`ExplainerDiagram` per-service config)
- A unique motion icon (`ServiceIconMotion` variant)
- Unique decorative asset placements

**Don't:** unify these across services in the name of consistency. The differentiation is the design system, not a deviation from it. See Decision G ("per-service hero tints") and Decision H ("explainer diagram + curves").

---

## 9. `.gitignore` has duplicate sections

The current `.gitignore` has the standard rules listed twice (copy-paste artifact from initial setup + later additions). It's harmless — git ignores the same patterns either way — but worth cleaning when convenient.

**Don't:** rely on the duplicate sections meaning anything semantically different.

---

## 10. Sandboxed `next build` may fail to download SWC binary

In some restricted environments (e.g. corporate proxies, sandboxed CI without npm registry access), `next build` will fail trying to download the platform-specific SWC binary (`@next/swc-darwin-arm64` etc.). This is not a code issue — Vercel deploys do not encounter it because Vercel pre-installs SWC.

If you hit this locally:
- Confirm npm can reach `registry.npmjs.org`
- Try `npm install @next/swc-darwin-arm64` (or your platform) directly
- Last resort: build on Vercel and rely on the deploy preview for verification

---

## 11. Korean copy quality — recurring proofreading rounds

The Korean copy is *good* but is being refined iteratively by a human reviewer. Each round produces a new `Olive-and-Vine_번역검수.xlsx` and the workflow in `docs/handoff.md` → Pending #2 applies.

**Don't:**
- Treat the current Korean text as final
- Auto-generate Korean from English in code (use the workflow)
- Skip the glossary — terms like "Bookkeeping" / "부기" are pinned in `i18n/GLOSSARY.md`

---

## 12. Pre-deployment audit checklist (run before every production promote)

This list was assembled from past pre-deploy issues:

1. **`tsc --noEmit`** — must pass
2. **`npm run lint`** — must pass
3. **No `console.log`** in committed code (except `console.info` stubs in form handlers, which are documented TODO)
4. **No exposed secrets** — `grep -r "DEEPL_API_KEY=\|BREVO_API_KEY=" app/ public/` should return nothing
5. **Sitemap and robots regenerate correctly** — visit `/sitemap.xml` and `/robots.txt` on staging
6. **`NEXT_PUBLIC_SITE_URL`** is set to the right host in Vercel env vars for each environment
7. **No 404s in the nav** — header links, footer links, related-services blocks
8. **Bilingual parity** — toggle between EN/KO on every page; nothing should be missing
9. **Mobile breakpoint** — quick check at 375 / 768 / 1280 / 1920 widths
10. **Lighthouse** on `test.oliveandvinehk.com` for new pages — LCP < 2.5s, CLS < 0.1
