# 2026-05-29 — Decision I: about cluster hero pattern

**Status:** Active · supplements `2026-05-29-about-cluster.md`
**Decided by:** founder with Claude
**Affects:** `playbooks/about/section-hero.md` (new),
`/about`, `/our-values`, `/leadership`, `/leadership/[slug]` heroes

---

## Context

The about cluster ships next, and its heroes need a treatment that's
**clearly distinct from the service-cluster split-hero** (Decision C/D/E:
deep-olive base + leaf-pale cursor-follow vignette + small motion icon
on the right). The service heroes are intentionally restrained and
uniform across the six service pages — restraint that reads as
"competence" for a service offering.

The about cluster's job is different: story, people, values. It wants
to feel warmer and more "alive" without becoming the editorial-agency
mistake Direction B exists to prevent.

The founder considered four directions (editorial photo, subtle video
loop, kinetic typography, photo + typewriter). The chosen direction is
the fourth.

## The choice

**I — Full-bleed photograph + typewriter cycling word**, with kinetic
typography as the documented fallback when no photograph is available.

### Primary pattern (when a photo exists)

- **Carrier:** one full-bleed, dark-leaning photograph spanning the
  whole hero (the same imagery vibe the README §3 documents — warm,
  golden, slightly desaturated; not corporate stock).
- **Type stack on top of the photo:**
  - eyebrow (mono, olive @ 70% on white text base)
  - large headline in Roboto regular, white
  - **a typewriter cycling word** beneath or beside the headline — one
    word at a time, fading from word to word at ~2.5s per word
  - optional partnership-voice subhead, smaller
  - round-arrow CTA bottom-right
- **No scrim, no blend mode, no shadow** — the photo is dark enough that
  white text reads on its own. Same discipline as Direction B.

### Fallback pattern (no photograph)

- **Carrier:** uniform cream surface (`--ov-cream-deep` or
  `--ov-cream`).
- **Type stack:**
  - eyebrow (mono, olive)
  - lead-in line in ink, ~32px (sets up the cycling word)
  - **the typewriter cycling word at hero scale** (~64px+) in deep
    olive, line below the lead-in — this is the protagonist
  - optional CurveMotif-style decorative arc cropped at the right edge
- Used for `/leadership` (no dedicated leadership-firm photo exists;
  the founder portraits live in the page's body, not the hero).

## The typewriter — rules

- **Cycle, don't type-and-stay.** Word A appears (instant or quick reveal),
  holds ~2.0–2.5s, fades out, word B appears. Repeats indefinitely.
- **Per-page word lists:**
  - `/about`: Story · People · Hong Kong  (KO: 이야기 · 사람 · 홍콩)
  - `/our-values`: Integrity · Excellence · Partnership · Compassion · Growth  (the 5 values, KO mirrors)
  - `/leadership`: Trust · Audit · Strategy · People  (KO: 신뢰 · 감사 · 전략 · 사람)
  - `/leadership/[slug]`: the founder's career companies in order from `highlight` (e.g. Rebecca: PwC · IL Shin · Olive & Vine)
- **Style:** Roboto regular (NOT italic — italic stays scoped to the
  Pattern B pull-quote per Decision 0529). Same olive or white as the
  carrier dictates.
- **No cursor.** The homepage typewriter uses a blinking cursor; this
  hero variant doesn't — the word cycle is the rhythm, not the cursor.
- **`prefers-reduced-motion: reduce`** → cycle freezes on the first word.
  No fade, no rotation.

## What was also considered

**Editorial photo, no typewriter (option 2).** Rejected as too quiet —
losing the dynamic word cycle made it indistinguishable from the
brand's existing photographic patterns elsewhere.

**Subtle video loop (option 3).** Rejected for now. Reopening Direction
B's video prohibition is a significant system move and the cinemagraph
register has the same governance problem as the original (one bad
implementation undoes the rule). If a future page genuinely needs
motion the photo can't carry, that's a deliberate Decision-J at that
moment — not a pre-emptive reopen now.

**Kinetic typography only, no photo (option 4 as default).** Rejected
as the *default* but kept as the **fallback**. About cluster's emotional
weight benefits from real photography where it exists; pure-type heroes
feel cold for a "story / people / values" cluster.

## Implications

- `playbooks/about/section-hero.md` — new playbook entry capturing
  the photo carrier, the fallback, and the per-page word lists.
- `playbooks/about/README.md` — composition table's `01 hero` reference
  now points at this new playbook (rather than reusing service's
  `section-01-hero.md`).
- A new component `HeroTypewriterCycle` (or extension to the existing
  `TypewriterText`) is needed — the current TypewriterText reveals one
  fixed string; we need word cycling.
- `rules/forbidden.json#no-italic-as-pattern` exception list already
  permits the Pattern B pull-quote (Decision 0529). The hero typewriter
  is NOT italic, so no new exception is needed.

---

## Amendment · 2026-05-29 (same day, post-build review)

After shipping the cluster with the typewriter cycle on all three
pages + the full-profile page, the founder reviewed and pushed back:

1. **Typewriter cycle dropped from the cluster.** The homepage already
   carries the typewriter device; repeating it four more times on
   /about, /our-values, /leadership, /leadership/[slug] flattened the
   homepage's special moment and felt repetitive. Rule: **the
   typewriter is a homepage-only device.** The about cluster gets its
   distinction from per-page tone + line composition instead.

2. **`/leadership` hero is the cluster reference.** Cream surface +
   olive line artifacts + eyebrow + headline. The other pages mirror
   this composition but vary the **tone** and the **line geometry**:

   | Page | Tone | Line geometry intent |
   |---|---|---|
   | /leadership | `--ov-cream-deep` (#F0EEE2) | concentric arcs + long horizontal sweep + lower-left partial circle (the reference) |
   | /our-values | `--ov-leaf-pale` (#E5E5BD) | three nested circles offset center-right (returning-to-center) |
   | /about | `--ov-cream-card` (#F9F8F4) | two long parallel diagonal sweeps + upper-right arc pair (narrative motion) |

   `/leadership/[slug]` keeps its founder-photograph hero — that page's
   whole purpose is the person, so the photo carrier stays.

3. **Founder photos: leadership only.** Per founder direction, founder
   thumbnails are removed from /about's teaser (and any other cluster
   page). They start to appear from /leadership onward.

4. **/about — "What we believe" + "3 pillars" merged into one section.**
   The two were saying the same thing twice. The merged section uses
   Pattern B's numbering / italic-pull-quote design but with the pillar
   content (Trust is Non-Negotiable / Excellence, Always / Growth
   Together) and an "All values →" link out to /our-values. Composition
   for /about drops the separate "06 principle" step.

5. **Line artifacts are more expressive than the original draft.** Each
   page's SVG is full-hero size with 3–4 elements, not corner-tucked
   2-circle motifs. Long sweeping curves are part of the vocabulary
   now, not just concentric arcs.

The typewriter component `HeroTypewriterCycle.tsx` is now an unused
export — kept in the codebase as inert reference (sandbox cleanup
later) but not imported anywhere.

## Amendment 2 · 2026-05-29 (same day) — refinement pass

Founder reviewed the v2 cluster heroes and called them "촌스럽다"
(dated / tacky). Three causes identified and fixed:

1. **Mono breadcrumb (`ABOUT · LEADERSHIP`) dropped.** Mono on the
   eyebrow read as tech-y / dashboard, not advisory firm. Replaced
   with small uppercase sans-serif at `tracking-[0.22em]`, color
   olive at 85% opacity. Just the page name (e.g. "Leadership"), no
   "About ·" prefix — the cluster context is obvious from nav.

2. **`/our-values` leaf-pale background (#E5E5BD) dropped.** Too
   yellow-green / saturated to read as refined. Replaced with the
   neutral `--ov-cream` (#F9F8F3) and the leaf-pale moved into the
   diagonal lighting wash (low opacity) instead of being the base.
   The "leafy" feel is preserved as light, not as full background.

3. **Diagonal radial-gradient lighting wash added per page** — the
   same single-hue mechanism the service heroes use (leaf-pale at
   50% near origin → 12% mid → transparent), positioned at a
   different corner per page. Adds depth and "time of day" feel
   without introducing a second hue or a scrim.

4. **Lines refined:** stroke-width `1` → `0.7`, fewer but larger
   elements, opacity range tightened to `0.14–0.28`. The compositions
   now read as deliberate rather than scattered.

| Page | Base | Lighting origin |
|---|---|---|
| /leadership | cream-deep | upper-right |
| /our-values | cream (neutral) | upper-center-right (70% 30%) |
| /about | cream-card | lower-left (cinematic narrative arrival) |

The locked CSS for the lighting wash and the per-page geometry are
in `playbooks/about/section-hero.md` (table updated).

---

*Append-only. If a future decision supersedes this, link forward.*
