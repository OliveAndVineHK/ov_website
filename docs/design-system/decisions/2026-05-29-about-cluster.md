# 2026-05-29 — About cluster: division of labor and grammar

**Status:** Active
**Decided by:** founder with Claude
**Affects:** /about, /our-values, /leadership and their rebuild
**Builds on:** decisions/2026-05-28-b-direction.md · audits/2026-05-29-about-cluster-baseline.html

---

## Context

The About section is a three-page cluster, not a single page. An audit found
its core problem was not styling drift (as with the service pages) but
**content duplication**: founders appeared on both /about and /leadership in
two layouts; values appeared on both /about (3) and /our-values (5) with
inconsistent copy; and the three pages used three different hero treatments.

A pattern-by-pattern walk-through with the founder produced the decisions
below.

## Decisions

### 1. Division of labor (fixes audit A14)

Each topic is owned by exactly one page; the others tease and link.

- **/about** owns the **story**. Founders and values appear only as teasers
  that link out.
- **/our-values** owns the **canonical values** (full set).
- **/leadership** owns the **canonical founders** (rich cards).

### 2. Founder card (Pattern A) — timeline removed, photo shrunk

- The career timeline (PwC → IL Shin → Olive & Vine) is **removed from the
  card** and will live only on the Full profile page.
- The photo is a **small ~140px thumbnail**, not the previous half-card image
  that cropped faces and read as a portrait gallery. Text carries the trust.
- Two founders side by side.

### 3. Values list (Pattern B) — uniform cream + watermark numerals

- **No alternating dark/cream backgrounds.** Uniform cream; rhythm comes from
  large watermark numerals. (Alternating backgrounds made the eye reset every
  item and diluted dark's role as the emphasis signal.)
- **The per-value olive pull-quote may be italic.** This is a **documented
  intentional exception** to the system's general no-italic rule. It is a
  deliberate brand device for this one element only — italic is not licensed
  anywhere else by this decision.

### 4. Values count — 5 canonical, 3–5 permitted

- The canonical set is **5** (Integrity · Excellence · Partnership ·
  Compassion · Growth).
- The pattern is built for a **3–5 range**, because the founder flagged a
  possible future reduction to 3. Recorded here so that move is a config
  change, not a redesign.

### 5. Stat strip (was Pattern C) — rejected

- The "25+ / 500+ / 4 / 99%" stat strip is **dropped**. The firm will not
  publish client-count figures that aren't verified real data. Unverifiable
  stats erode trust, conflicting with the Integrity value. Reopenable if real,
  defensible figures exist later.

## Structural change to the system

`playbooks/` is reorganized into **shared foundation + per-page-type grammars**:

```
playbooks/service/   ← the six service-page patterns
playbooks/about/     ← README + Pattern A + Pattern B (this cluster)
```

The global brand (color, type, motion, voice, no-shadow rules) remains the
single source in the top-level README, colors_and_type.css, and rules/, and
applies to all page types. Only the section grammar differs per type.

## Rebuild order (when the cluster is built)

1. Fix the two live blockers first: broken /about hero video (A01) and the
   incomplete /leadership quote (A02).
2. /leadership first — smallest page, owns the founder pattern, becomes the
   cluster reference.
3. /our-values second — owns the values pattern, so /about can tease it.
4. /about last — the integrator.

## Open questions

- **Full profile page** — the career timeline moved there but that page has
  no playbook yet. Needs its own entry (`playbooks/about/section-full-profile.md`)
  before /leadership's "Full profile →" links resolve to a designed page.
- **Values reduction to 3** — flagged as possible; not decided.
