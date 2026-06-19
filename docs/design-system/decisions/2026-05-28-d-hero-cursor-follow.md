# 2026-05-28 — Decision D: hero light follows the cursor

**Status:** Active · supplements Decision C (`2026-05-28-c-hero-tonal-light.md`)
**Decided by:** [founder] with Claude, same session as Decision C
**Affects:** `playbooks/section-01-hero.md`, `app/hooks/useHeroLight.ts`,
all service-page heroes

---

## Context

Decision C introduced the single-hue radial vignette as the documented
hero fallback (deep-olive base, leaf-pale wash at low opacity, per-service
angle from the variation map). The founder asked whether the light could
also **follow the mouse cursor**, slow and elegant.

## The choice

**D — The hero light eases toward the cursor while it is in the hero,
and eases back to the per-service resting angle when the cursor leaves.**

Concretely:

- The motion is a per-frame lerp with factor `0.04` (~600ms to settle).
  This is deliberately slow — the light is "aware of" the cursor, not
  chasing it.
- The gradient's stops and opacities are **locked** to the Decision C
  spec. The cursor only moves the *origin*; everything else stays put.
  This is what keeps the six service heroes one coherent family even
  while each page reacts to its own visitor independently.
- The implementation lives in one place: `app/hooks/useHeroLight.ts`.
  Every service page consumes the same hook, passing only its
  per-service `defaultX` / `defaultY` from the playbook's variation map.
  This makes drift impossible — a page cannot accidentally pick a
  different easing, a different stop, or a different leaf-pale opacity
  unless the hook itself is edited (which would amend the system rule).

## Accessibility / device behavior

- `prefers-reduced-motion: reduce` users → no motion. The hero renders
  the resting state and never repaints. This is mandatory, not a
  preference toggle.
- Touch / no-hover devices (`(hover: none)`) → no motion. Same resting
  state. There is no cursor to follow, and trying to attach the light
  to a tap would be a different interaction (not approved).

## What was also considered

**Spring physics or overshoot.** Rejected. Reads as "interactive
flourish" — the editorial-agency mistake that Direction B exists to
prevent. The brand wants restraint, not delight-as-spectacle.

**Faster follow (high lerp factor).** Rejected. A snappy follow makes
the cursor look like a flashlight, which encourages the visitor to
"play with the lighting." That foregrounds the interaction over the
content. Slow follow makes the lighting feel like a property of the
environment instead of a toy.

**Per-page interaction variation.** Rejected. The whole point of moving
this into a hook is to keep the six heroes synchronized in everything
except the resting angle. If a service ever needs different motion
behavior, that's a playbook amendment, not a per-page override.

**Move the light via parallax / scroll instead of cursor.** Rejected for
now. Scroll-linked motion would compete with `SectionReveal` (the
existing scroll-in animation pattern) and make the hero feel busier
than the rest of the page. Could be revisited if a future page needs it.

## Implications

- `app/hooks/useHeroLight.ts` is the single source of truth for the
  gradient string and the easing loop. Treat it like a design token —
  don't fork it per page.
- `playbooks/section-01-hero.md` now documents both the visual rule
  (Decision C) and the interaction rule (Decision D) in the same
  "Tonal lighting fallback" section.
- `app/tax-service/page.tsx` consumes the hook with Tax's resting angle
  (`82% 15%`). Accounting, Corporate, Consulting, HR, and Assurance
  rebuilds should consume it the same way, with their angles from the
  playbook table.
- `rules/forbidden.json` (when authored) should still encode "no
  multi-hue gradients" as before; the cursor follow doesn't change the
  color rule, only the origin.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
