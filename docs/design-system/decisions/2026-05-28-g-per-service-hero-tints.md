# 2026-05-28 — Decision G: per-service hero-base tints

**Status:** Active · refines `2026-05-28-c-hero-tonal-light.md`
**Decided by:** [founder] with Claude, post Tax + Accounting first builds
**Affects:** `colors_and_type.css`,
`app/contexts/ServiceAccentContext.tsx`,
`playbooks/section-01-hero.md`,
`rules/forbidden.json` (hex allowlist),
every service hero

---

## Context

After Tax and Accounting were built using Decisions C / D / E / F, the
founder noted the two pages read as visually identical from the hero
down. The system's "single olive hue" rule had been read too strictly —
all six services shared the same `#495F2B` base, the same leaf-pale
vignette wash, the same composition. Coherent, yes. Distinguishable from
each other, no.

The rule that all services map to the same hue is correct. What was
missing was the lightness/saturation variation **within** the olive
family that gives each service its own character without fragmenting
the brand.

## The choice

**G — Each service hero uses its own olive-family base tint. All six
remain within the single olive hue; only the lightness / saturation
character varies.**

Concretely:

- Three new tokens added to `colors_and_type.css`:
  - `--ov-olive-rooted` (`#2E3F18`) — Corporate. Deepest, structural.
  - `--ov-olive-hearth` (`#6E7A33`) — HR. Warm earthy.
  - `--ov-olive-steady` (`#3F4E22`) — Assurance. Cool steady.
- The four existing olive tokens are reused for the four other services:
  - `--ov-olive-deep` (`#495F2B`) — Tax
  - `--ov-olive` (`#627F38`) — Accounting
  - `--ov-olive-active` (`#648E3E`) — Consulting
- Mapped in `ServiceAccentContext.tsx → serviceColorMap[*].heroBase`.
  The page reads it via `serviceColorMap.<service>.heroBase` and sets
  it as the hero `<section>`'s `background-color`. The leaf-pale radial
  vignette layers on top (unchanged from Decision C).
- `rules/forbidden.json` hex allowlist updated to include the three
  new tokens.

The seven tints span lightness 27%–43% and saturation 35%–55% — wide
enough that two adjacent service pages read as distinct, narrow enough
that the brand still scans as one family.

## What stays the same

- The leaf-pale wash (`rgba(229,229,189,0.22) → 0.07 → transparent`):
  unchanged, identical across all six services.
- The vignette mechanism (ellipse 80% 90% at `<X% Y%>`): unchanged.
- The per-service light origin (`82% 15%` for Tax, `50% 8%` for
  Accounting, …): unchanged from Decision C.
- The cursor-follow easing (Decision D): unchanged. `useHeroLight` is
  color-agnostic — it only paints the gradient on top of whatever
  background-color the page sets.
- `ServiceAccentContext.colors.primary` and `.secondary`: still
  `#495F2B` and `#627F38` across all six. The shared brand olive is
  preserved for everything that's *not* the hero base.

## What was also considered

**Vary only the vignette character, keep base identical** (Option A from
the design conversation). Rejected. The vignette is a thin wash; even
aggressive parameter changes only nudge the perceived color a few
percent. Real differentiation requires the base to vary.

**Vary the hue entirely (e.g. olive / teal / amber per service)**.
Rejected. Direction B exists to prevent exactly this — multi-hue
fragmentation reads as six service brands, not one firm.

**Hybrid: same base, per-service accent moment elsewhere** (Option C).
Rejected for this round. A small accent doesn't carry the visual weight
the founder asked for. Could be revisited as an addition (not a
replacement) if more differentiation is needed later.

## Implications

- **The "single olive hue" README rule needs a footnote.** It is still
  true — *the brand* is one hue. But the **per-service hero base** is
  permitted to vary within that hue's lightness/saturation envelope.
  The README's strict reading ("all six service lines map to the same
  primary `#495F2B`") was a faithful mirror of the codebase as it was;
  it's no longer accurate post-G. The playbook now holds the operating
  rule; the README should be updated next sweep.
- **The `rules/forbidden.json#no-non-token-hex` allowlist grew by 3.**
  The three new tokens are documented as semantic — they belong in the
  list, not as ad-hoc hex values.
- **Tax and Accounting pages** import `serviceColorMap` from the
  context module and pull `heroBase` to set their hero
  `background-color`. Future pages do the same — never hardcode a hex.
- **`ServiceAccentContext.colors.primary` is now slightly misleading**
  for the hero context — the primary stays `#495F2B`, but the hero
  base may differ. Reading code should use `heroBase` for hero
  backgrounds and `primary` for everything else.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
