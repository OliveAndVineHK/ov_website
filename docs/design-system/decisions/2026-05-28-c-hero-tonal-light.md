# 2026-05-28 — Decision C: hero tonal-lighting fallback

**Status:** Active · supplements Direction B (`2026-05-28-b-direction.md`)
**Decided by:** [founder] with Claude, during the Tax page rebuild
**Affects:** `playbooks/section-01-hero.md`, all service-page heroes

---

## Context

The Tax rebuild was implemented per the just-approved brief
(`briefs/2026-05-28-tax-rebuild.md`), which inherited the Direction B
rule "no abstract gradient or texture hero." With no tax-specific
photograph supplied yet, the rebuild used the brief's documented
fallback: a flat `--ov-olive-deep` fill.

On review, the founder asked for a *small* sense of light and depth in
the hero background — "조명이 있는 백그라운드" — and noted that each
service page should carry a subtly different tone.

A flat fill reads as a placeholder. The intent of "warm, golden,
slightly desaturated" from the README's imagery vibe (§3) should still
be readable even when the carrier is the fallback rather than a photo.

## The choice

**C — Permit a single-hue radial vignette as the hero fallback.**

The fallback is no longer a flat fill; it is a radial vignette built
from *only* the brand's existing olive vocabulary:

- **Base:** `--ov-olive-deep` (`#495F2B`).
- **Light:** `--ov-leaf-pale` (`#E5E5BD`), the already-documented
  "signature hover wash" (README §3), at 20–25% opacity at origin,
  fading to ~7% mid-way, transparent beyond ~65%.
- **Variation knob:** the gradient's angle / origin, never its stops or
  hues. Six service pages, six light directions, one family.

This is **not** a relaxation of Direction B's "no abstract gradient"
rule. Direction B prohibits *multi-hue* gradients that drift away from
the brand into editorial-agency territory. The tonal vignette stays
within the brand's documented olive + leaf-pale wash vocabulary, uses
the wash exactly as the README already permits it elsewhere
("applied at 50% opacity over imagery"), and reads as *lighting*, not
as a designed mood.

The full specification, including the per-service variation map and the
canonical CSS, lives in `playbooks/section-01-hero.md` under
"Tonal lighting fallback."

## What was also considered

**Multi-hue gradient with brand-adjacent accents.** Rejected. This is
the F08 / Direction-B failure mode that the rebuild was meant to fix.

**Different gradient stops per service.** Rejected. If both the stops
and the angle vary, the family breaks down into six visually disparate
heroes. Locking the stops and varying only the angle keeps the family
coherent while still giving each service its own "time of day."

**Stay with flat olive fill until photographs exist.** Rejected for now.
The flat fill works as a stop-gap but doesn't carry the warmth the
README's imagery vibe (§3) calls for, and the brand has a documented
highlight wash that's already built for exactly this purpose.

## When a photograph arrives

The radial vignette is removed for that service page. The photograph
carries the warmth and depth on its own; layering the vignette over a
real photo would re-introduce the scrim problem that Direction B fixed.

## Implications

- `playbooks/section-01-hero.md` — updated in the same commit as this
  decision. The playbook is now the source of truth for the CSS and the
  per-service angle map; this file is the record of why.
- `app/tax-service/page.tsx` — applied the Tax variation (light from
  top-right, `82% 15%`).
- Accounting, Corporate, Consulting, HR, Assurance — apply the matching
  variation from the playbook's table when those pages are rebuilt.
- `rules/forbidden.json` (when authored) — should encode "no
  `linear-gradient` AND no `radial-gradient` whose stops include any
  hex outside the olive + leaf-pale + transparent set." The radial
  vignette passes that rule because its stops are leaf-pale and
  transparent only.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
