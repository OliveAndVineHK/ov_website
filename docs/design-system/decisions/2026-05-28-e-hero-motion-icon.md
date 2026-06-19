# 2026-05-28 — Decision E: hero motion icon via inline transparent SVG

**Status:** Active · supplements `2026-05-28-b-direction.md`
**Decided by:** [founder] with Claude, during the Tax page rebuild
**Affects:** `playbooks/section-01-hero.md`,
`app/components/ServiceIconMotion.tsx`,
`app/components/ServiceIconMotion.css`, all service-page heroes

---

## Context

The Tax hero rebuild used the static `os-tax-w.svg` mark as a temporary
"motion object" placeholder because no Lottie / JS export was supplied.
The founder asked whether the brand's actual motion graphics could be
wired in instead, and specified that the background must be **transparent
like a PNG** — i.e. no visible box on the dark hero.

The motion source lives at
`audits/assets/ov-service-icons/project/Service Icons in Motion.html`,
in three forms:

1. **`os-*.mp4`** — six MP4 files, one per service. Rejected: opaque
   background; a white box would show on the dark olive hero.
2. **PNG frame sequences** (`exports/_frames/<service>/`) — ~168 frames
   per service, 1024×1024, **RGB without alpha**. Rejected for the same
   reason: opaque background.
3. **Inline SVG + CSS keyframes** (the source of truth in the HTML).
   Naturally transparent (no background rect, `fill="none"` on the
   root). Scales as vector. Selected.

## The choice

**E — Render the motion as an inline transparent SVG via a single
React component (`ServiceIconMotion`), with a `tone` prop for dark vs.
light surfaces.**

Concretely:

- The SVG markup and CSS keyframes are extracted verbatim from the
  source HTML and centralized in `app/components/ServiceIconMotion.tsx`
  and `app/components/ServiceIconMotion.css`. The class namespace is
  `ov-svc-*` so the keyframes cannot collide with anything else.
- The per-service cycle durations from the source HTML (Tax = 5.6s,
  Accounting = 4.4s, …) are preserved as CSS variables at the top of
  the stylesheet. They are deliberately offset so multiple icons never
  sync — keep that invariant.
- The `tone` prop is the only per-surface variation. `"light"` (on
  dark heroes) maps rim → `--ov-on-dark-70` and accent → white;
  `"dark"` (default, on cream/white) keeps the original
  `--ov-grey-icon` + `--ov-olive-hover` palette. No other color
  overrides are exposed.
- Services without ported motion fall back to the static
  `os-<service>(-w).svg` from `/public/home/` via the component's
  internal fallback. The consumer's call site looks identical whether
  the motion is wired or not, so the six pages can be rebuilt in any
  order without changing the contract.

## Accessibility

`prefers-reduced-motion: reduce` users see every animated element
forced to its rest state (`animation: none`, `transform: none`,
`opacity: 1`, `stroke-dashoffset: 0`). This is in the stylesheet, not
an opt-in. The icon still conveys meaning at rest — the blade is in
its final tilted position, the rims are closed.

## What was also considered

**Use the MP4 with a video element + `mix-blend-mode` to "remove" the
white background.** Rejected. Direction B explicitly prohibits
`mix-blend-mode` and scrim filters; faking transparency via blend mode
is the exact failure mode the rebuild was meant to fix.

**Use the PNG frame sequence with a CSS sprite animation.** Rejected.
Same opacity problem (RGB without alpha), plus ~168 frames at 1MB+ per
hero would be a huge payload for an effect that's a few KB as SVG.

**Re-export the MP4 with an alpha channel (e.g. WebM VP9 alpha or
HEVC alpha).** Rejected for now. Browser support is uneven, would
introduce a second toolchain (re-export pipeline), and the inline SVG
already gives the same visual result with smaller payload and broader
support. Could be revisited if a future motion exceeds what SVG can
express.

**Per-page inline SVG (no shared component).** Rejected. Six pages
each owning their own copy of the SVG markup + keyframes guarantees
drift — exactly what Direction B exists to prevent.

## Implications

- The placeholder static `os-tax-w.svg` in the Tax hero is replaced
  with `<ServiceIconMotion service="tax" tone="light" />`.
- Accounting, Corporate, Consulting, HR, Assurance pages — when
  rebuilt — render `<ServiceIconMotion service="<name>" tone="light" />`
  in the same hero slot. Until each service's motion is ported, the
  component renders the static `os-*-w.svg` so the rebuilds are
  unblocked.
- Porting a service's motion is a single-file change to
  `ServiceIconMotion.tsx` (new render function) +
  `ServiceIconMotion.css` (new keyframes under `ov-svc-<service>`).
  No page-level changes required.
- The small eyebrow icon in the hero left column (28px next to
  "Service · 04 / Tax") stays static — animating it at that size
  would foreground motion over meaning. Only the large right-column
  icon uses the motion component.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
