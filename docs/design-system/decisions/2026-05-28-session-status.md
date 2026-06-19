# 2026-05-28 — Session status & handoff

**Type:** working doc · not a decision
**Purpose:** capture what's been built, what remains, and how to resume
cleanly — whether in this session or in a new one.

---

## What's built and shipping

### Pages rebuilt (6 of 6 ✓ complete)

| Page | Status | Variant of Pattern 02 | Notes |
|------|--------|------------------------|-------|
| `/tax-service`         | ✓ rebuilt | A — 2-col text list                       | Reference page. Has Pattern 05 calendar. |
| `/accounting-service`  | ✓ rebuilt | B — diagram-led + 3-col details           | F15 voice fix applied at the data layer. |
| `/consulting-service`  | ✓ rebuilt | C — numbered methodology timeline (5 phases) + adjunct 3-col | Variant C authored. |
| `/hr-service`          | ✓ rebuilt | D — image-led card grid (open-clause `/hr/` assets) + FAQ | Variant D authored; FaqAccordion reused. |
| `/assurance-service`   | ✓ rebuilt | C — 7 audit procedures + two-pillars supporting | `useHeroLight` extended with optional `ellipse` for narrow vertical wash. |
| `/corporate-service`   | ✓ rebuilt | E — lifecycle 3-stage + digitalisation callout | Variant E authored (promotes F10). F14 voice rewrite applied at the data layer. |

### Shared infrastructure (all done)

- `app/hooks/useHeroLight.ts` — cursor-follow radial vignette, color-agnostic
- `app/components/ServiceIconMotion.tsx` + `.css` — all 6 motion icons ported (Tax / Accounting / Corporate / Consulting / HR / Assurance). Transparent SVG, `tone="dark"` / `"light"`.
- `app/components/CurveMotif.tsx` — all 6 curves authored. Tax + Accounting refined; the other 4 are placeholders that will be refined when each page is rebuilt. **Design intent: elegance, not motion-graphic echo** (corrected via Decision H amendment).
- `app/components/ExplainerDiagram.tsx` — only Tax and Accounting have diagrams. Component returns `null` gracefully for unauthored services. Tax actually uses Variant A so no diagram.
- `app/contexts/ServiceAccentContext.tsx` — `serviceColorMap[*].heroBase` for the per-service tint per Decision G.

### System documents

- `colors_and_type.css` — 3 new tokens (`--ov-olive-rooted` / `-hearth` / `-steady`)
- `rules/forbidden.json` — 17 rules, hex allowlist updated
- `playbooks/section-01-hero.md` — per-service heroBase + light angle map
- `playbooks/section-02-explainer.md` — variant family (A + B), curve principle = elegance
- `playbooks/section-05-calendar.md` — 4×3 grid + category filter pattern
- `decisions/2026-05-28-b-direction.md` — Direction B (the foundational no-shadow/no-gradient discipline)
- `decisions/2026-05-28-c-hero-tonal-light.md` — single-hue radial vignette fallback
- `decisions/2026-05-28-d-hero-cursor-follow.md` — cursor-follow easing via shared hook
- `decisions/2026-05-28-e-hero-motion-icon.md` — inline transparent SVG component
- `decisions/2026-05-28-f-calendar-grid-redesign.md` — 4×3 grid + filter
- `decisions/2026-05-28-g-per-service-hero-tints.md` — per-service base tint
- `decisions/2026-05-28-h-explainer-diagram-and-curves.md` — diagram-led variant + curve motif (with the post-build amendment recording the over-systemization lesson)
- `audits/2026-05-28-tax-rebuild.html` — 15/17 baseline findings resolved

---

## How to resume (for a new session OR this one)

### Read in this order

1. `decisions/2026-05-28-b-direction.md` — the foundational rules
2. `decisions/2026-05-28-g-per-service-hero-tints.md` — per-service color logic
3. `decisions/2026-05-28-h-explainer-diagram-and-curves.md` — **especially the amendment block at the end** (records the over-systemization mistake and the "Pattern 02 is a variant family" correction)
4. `playbooks/section-01-hero.md` and `section-02-explainer.md`
5. `app/tax-service/page.tsx` — reference for Variant A
6. `app/accounting-service/page.tsx` — reference for Variant B
7. `app/components/ServiceIconMotion.tsx`, `CurveMotif.tsx`, `ExplainerDiagram.tsx`
8. `app/hooks/useHeroLight.ts`
9. `app/contexts/ServiceAccentContext.tsx`
10. `app/utils/page<Service>ServiceUtils.ts` for whichever service is next

### Per-page rebuild recipe

1. **Read the existing `app/<service>-service/page.tsx`** to see what's currently shipped.
2. **Read `app/utils/page<Service>ServiceUtils.ts`** to see the bilingual copy.
3. **Decide Pattern 02 variant** based on the content:
   - Sub-areas are **parallel domains** (no hierarchy / sequence / stack) → **Variant A** (Tax style)
   - Sub-areas have a **visual relationship** (hierarchy / sequence / stack / cycle / orbit) → **Variant B** (Accounting style) — author the diagram in `ExplainerDiagram.tsx`
   - Sub-areas don't fit either → **author a new variant in the playbook first**, then implement.
4. **Refine the service's curve in `CurveMotif.tsx`** for elegance. Don't try to match the motion graphic. Asymmetric > symmetric. Long sweeping lines > short stubby arcs.
5. **Consider the "open clause"** — does any asset in `/public/services/` or `/public/<service>/` naturally fit somewhere on this page? Restyle to brand palette if so.
6. **Build the page** following the structure in Tax / Accounting. Use the per-service hero light angle from the playbook table. Pull copy from the utils file (don't invent).
7. **Voice check** — if the existing copy has voice issues (promotional, regulatory, S/V errors), rewrite at the data layer (the way F15 was fixed for Accounting).
8. **Lint** — run the verification grep block below.

### Lint commands

```bash
cd <project-root>

# TypeScript
npx tsc --noEmit -p tsconfig.json 2>&1 | grep "error TS"

# Forbidden patterns in the new page
grep -nE "box-shadow|text-shadow|backdrop-filter|backdrop-blur|mix-blend-mode|linear-gradient\(|shadow-(sm|md|lg|xl|2xl)" \
  app/<service>-service/page.tsx

# Off-token hex
ALLOW='#495F2B|#627F38|#436A1F|#648E3E|#2E3F18|#6E7A33|#3F4E22|#111B12|#282A28|#888D88|#D9D9D9|#EFEFEF|#FFFFFF|#000000|#F9F8F3|#F9F8F4|#F0EEE2|#E5E5BD|#F1F1DD'
grep -nEo '#[0-9A-Fa-f]{6}' app/<service>-service/page.tsx | grep -vE "$ALLOW"

# Unicode glyphs in JSX strings
grep -nE '>[^<]*[→✓●•★][^<]*<' app/<service>-service/page.tsx
```

---

## Open decisions awaiting Corporate rebuild

- **F10 — lifecycle pattern** (Start Up / In Business / Exit). Baseline audit flagged as improvised and recommended promoting to `playbooks/section-04-lifecycle.md`. Decision deferred to Corporate's rebuild.
- **F14 — Corporate hero voice rewrite** (currently regulatory; needs partnership voice).
- **Calendar applicability** — Corporate is deadline-driven too (annual returns, AGMs). Confirm with the data file whether Pattern 05 fits. If yes, reuse the same 4×3 grid as Tax.

## Open decisions awaiting any future page

- **`rules/required.json`** — inverse companion to `forbidden.json`. Must-use patterns: useHeroLight on every service hero, ServiceIconMotion for the right column, bilingual `{en, ko}` objects, etc. Not urgent.
- **Hero photographs** — founder action. Once supplied, remove the radial vignette per Decision C.

## Meta-lesson to keep in mind

From Decision H amendment: "Make it the same so we don't drift" and
"make each one its own thing so the family has texture" are *both*
design imperatives. After Tax + Accounting, the system has texture; do
not now systematize the texture itself into a new monotony. Each
remaining page should pick its variant deliberately based on the
service's actual content, not by default.

---

*Working doc. Update as the remaining 4 pages are built. Once all 6
pages ship, this can be archived or absorbed into a final audit.*
