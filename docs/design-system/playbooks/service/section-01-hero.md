# Pattern 01 — Hero · split

**Role:** the first body section of every service page. Required.
**Confirmed:** 2026-05-28, founder review.

## Anatomy

A two-column split over a single full-bleed photographic background.

```
┌─────────────────────────────────────────────┐
│  warm photograph · dark-leaning value         │
│                                                │
│  [icon] Service · NN / Name      ┌──────────┐ │
│                                  │          │ │
│  Headline                        │  MOTION  │ │
│  (96px, white)                   │  OBJECT  │ │
│                                  │  (large) │ │
│  Partnership subhead             │          │ │
│  28–35 words                     └──────────┘ │
│                                                │
│  ( Start a conversation → )          [↗ ring] │
└─────────────────────────────────────────────┘
     LEFT = reading column        RIGHT = motion
```

- **Background:** one warm, slightly desaturated photograph, dark-leaning
  in value so white text reads without a scrim. Spans the whole hero.
  When no photo is ready, the documented fallback is a **single-hue
  radial vignette** (see "Tonal lighting fallback" below) — never an
  abstract multi-hue gradient or texture.
- **Left column (reading):** small service icon (white variant, e.g.
  `os-tax-w.svg`) + eyebrow (`Service · 04 / Tax`), then headline at 96px
  (`--t-display-xl`) Roboto regular white, then partnership subhead
  28–35 words, then an optional pill CTA.
- **Right column (motion):** the large motion object. See rules below.
- **Round-arrow CTA:** the 48–56px `CgArrowTopRight` ring, white border on
  the dark hero, bottom-right.

## The motion object — rules

The motion asset is the signature moment of the page. These rules keep it
from becoming the `site.html` video-hero mistake:

1. **Motion lives in Pattern 01 only.** No body section (02–08) uses motion.
   This keeps it a rare, high-impact moment rather than ambient noise. (This
   was the founder's call and it is load-bearing — do not relax it.)
2. **Motion is an object on the photo, never the background.** The moment a
   motion asset fills the entire hero, it becomes a video hero, which the
   system prohibits. It occupies the right portion of the split, sitting on
   top of the photograph.
3. **Render the inline-SVG version, not the mp4 or PNG-sequence exports.**
   The source-of-truth motion lives in
   `audits/assets/ov-service-icons/project/Service Icons in Motion.html` —
   inline SVG with CSS keyframes. The mp4 and PNG-sequence exports are RGB
   without alpha, so they would show a visible box on the dark hero. The
   inline-SVG path is naturally transparent and scales without artifacts.
   See "Wiring" below for the canonical consumer.
4. **No darkening filter on the motion.** No `mix-blend-mode: multiply`, no
   scrim. The asset is olive + grey toned, which reads on the dark photo
   without manipulation. (If the grey drifts from `--ov-charcoal #282A28`
   or `--ov-grey-icon #888D88`, fine-tune the asset, not the page.)
5. **Size:** large — the founder's intent is a substantial object, not a
   small accent. Roughly the right 40–45% of the hero width.

## Wiring the motion icon (the only approved consumer)

A single React component owns the SVG markup and the CSS keyframes for
all six service motions: `app/components/ServiceIconMotion.tsx`
(+ `ServiceIconMotion.css`). Every service page consumes it the same way:

```tsx
import ServiceIconMotion from "@/app/components/ServiceIconMotion";

<ServiceIconMotion
  service="tax"          // one of: tax | accounting | corporate | consulting | hr | assurance
  tone="light"           // "light" on the dark hero, "dark" on cream/white surfaces
  label="Tax service icon — Tilt motion"
  className="w-full h-full"
/>
```

Rules:

- **One component, one stylesheet.** Do not reimplement the SVG inline on a
  page, do not author per-page CSS for these keyframes. Drift across the
  six service pages is the failure mode; centralization is the fix.
- **Tone is the only per-surface variation.** `tone="light"` maps the rim
  to `--ov-on-dark-70` and the accent to white. `tone="dark"` (default)
  uses `--ov-grey-icon` and `--ov-olive-hover` — the original cream-card
  palette. No other colour overrides are permitted.
- **Per-service cycle durations are deliberately offset** so that if two or
  more icons ever appear together they never sync. Tax = 5.6s; the full
  table lives at the top of `ServiceIconMotion.css`. Do not tune these per
  page.
- **`prefers-reduced-motion: reduce`** → every animated element is forced
  to its rest state and stops repainting. Built into the stylesheet, not
  opt-in.
- **Adding a new service motion** is purely additive: drop a new render
  function into `ServiceIconMotion.tsx` and the matching keyframes (under
  an `ov-svc-<service>` namespace) into `ServiceIconMotion.css`. The
  fallback chain in the component renders the static `os-<service>(-w).svg`
  until the motion is ported, so the contract is uniform from day one.

## Tonal lighting fallback (when no photograph is supplied)

When the page does not yet have a photographic hero, the background is a
**single-hue radial vignette** that reads as warm light falling on the
brand olive — never as a multi-color abstract gradient. The discipline is:

1. **One hue, one base.** The base color is always `--ov-olive-deep`
   (`#495F2B`). No other color tokens go into the base.
2. **The light is leaf-pale at low opacity.** The "light" stop is the
   already-documented signature wash `--ov-leaf-pale` (`#E5E5BD`), used at
   20–25% opacity at the origin, fading to 5–7% mid-way, fully transparent
   beyond ~65%. Because the wash is already in the brand vocabulary, this
   stays within the single-hue rule; we are not mixing in a second hue,
   we are layering the brand's own highlight wash at low opacity.
3. **The variation knob is angle, not color.** Each service uses the same
   two stops; the only thing that changes is **where** the light comes
   from. This gives each service page a subtly different "time of day"
   while the family stays unmistakably one brand.
4. **No scrim.** This is a lightening overlay, not a darkening one.
   Legibility comes from the base olive being dark enough; the wash
   only adds depth and warmth.
5. **No `box-shadow`, no `text-shadow`, no `backdrop-filter`,
   no `mix-blend-mode`.** The Direction-B prohibitions hold.

### Per-service variation map

Two things vary per service: the **light origin** (where the vignette's
warm spot lives) and the **base color** (which olive-family tint shows
through where the vignette fades to transparent). Stops, opacities,
falloff distances, and ellipse size stay locked — those keep the six
service pages a family.

Base colors live in `app/contexts/ServiceAccentContext.tsx →
serviceColorMap[*].heroBase`. They are also documented as CSS tokens in
`colors_and_type.css` (see Decision G · 2026-05-28).

| Service     | `heroBase`              | Token              | Light origin   | Feel               |
|-------------|-------------------------|--------------------|----------------|--------------------|
| Tax         | `#495F2B`               | `--ov-olive-deep`  | `82% 15%`      | warm late-morning  |
| Accounting  | `#627F38`               | `--ov-olive`       | `50% 8%`       | high, balanced     |
| Corporate   | `#2E3F18`               | `--ov-olive-rooted`| `18% 18%`      | structural eastern |
| Consulting  | `#648E3E`               | `--ov-olive-active`| `72% 72%`      | forward, afternoon |
| HR          | `#6E7A33`               | `--ov-olive-hearth`| `50% 80%`      | warm hearth        |
| Assurance   | `#3F4E22`               | `--ov-olive-steady`| `50% 12%` (narrow ellipse) | steady, focused |

### Canonical CSS

```css
background-color: <heroBase from the table above>;
background-image: radial-gradient(
  ellipse 80% 90% at <X% Y%>,
  rgba(229, 229, 189, 0.22) 0%,    /* leaf-pale @ 22% */
  rgba(229, 229, 189, 0.07) 35%,   /* leaf-pale @ 7%  */
  transparent 65%
);
```

The leaf-pale wash is shared across all services. The base color and the
`at <X% Y%>` origin are the two service knobs. Anything else is fixed.

When a real photograph arrives for a given service, the radial vignette is
removed for that page; the photo carries the warmth and depth on its own.

### Hero interaction — light follows the cursor

The radial vignette is not static. While the cursor is inside the hero,
the **light origin eases toward the cursor**; when the cursor leaves,
the light eases back to the per-service resting angle from the table
above. The motion is intentionally *slow and elegant* — the light is
"aware of" the cursor, not chasing it.

Motion contract (locked):

- **Easing model:** per-frame lerp with factor `0.04` (≈600ms to settle).
  No spring physics, no overshoot, no bounce.
- **Resting angle:** the per-service `at X% Y%` from the variation map
  above. The cursor never overrides the resting angle permanently — the
  hero always returns to its documented "time of day."
- **Stops never change.** The cursor only moves the gradient's origin.
  Opacity, falloff distances, and the leaf-pale stop colors are locked.
  This is what keeps the six service heroes a coherent family.
- **`prefers-reduced-motion: reduce`** → no motion. The hero renders
  the resting state and never repaints.
- **Touch / no-hover devices (`(hover: none)`)** → no motion. Same
  resting state.
- **Implementation:** the hook `app/hooks/useHeroLight.ts` owns the
  gradient string and the rAF loop. Every service page consumes it the
  same way, passing only its resting `defaultX` / `defaultY`:

  ```tsx
  import { useHeroLight } from "@/app/hooks/useHeroLight";
  const heroRef = useHeroLight({ defaultX: 82, defaultY: 15 }); // Tax
  // ...
  <section ref={heroRef} style={{ backgroundColor: "#495F2B", backgroundImage: /* resting vignette for SSR */ }}>
  ```

  Do not reimplement this loop per page — that's how the six heroes
  would drift out of sync.

### Why not a more dramatic motion?

A faster lerp or a spring would read as "interactive flourish" — the
editorial-agency mistake that Direction B explicitly avoided. The
intent is that the hero *breathes* as the visitor moves, not that the
visitor plays with the lighting. If the founder ever wants a more
expressive interaction, it should be added as a deliberate playbook
update (per Direction B rule 5), not improvised on a page.

## Copy

- Headline: the service name, one word where possible ("Tax", "Accounting").
- Subhead: partnership voice, 28–35 words, em-dash clauses, "we" to "you".
  Pull existing copy from `pageUtils.ts`; the Tax subhead is the voice
  exemplar — keep it verbatim.

## Don't

- No centered text (the old pages centered it — left-align).
- No **multi-hue** abstract-gradient or texture background. The single-hue
  radial vignette above is the *only* permitted gradient; it stays within
  the brand's documented olive + leaf-pale wash vocabulary.
- No motion covering the whole hero.
- No scrim/blend filter to force legibility — choose a dark enough photo,
  or rely on the deep-olive base of the radial vignette.
- No shadow on the headline.
