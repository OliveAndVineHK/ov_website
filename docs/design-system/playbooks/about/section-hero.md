# Pattern 01 (about cluster) — Cream surface + line artifacts hero

**Role:** the first body section of every about-cluster page. Required.
**Confirmed:** 2026-05-29, founder review.
**Updated:** 2026-05-29 (same day) — typewriter dropped, per-page tone +
line geometry now carry the distinction. See the amendment block in
`decisions/2026-05-29-i-about-cluster-hero.md`.
**Differs from:** the service-cluster `service/section-01-hero.md` (split
hero with cursor-follow vignette + motion icon). About cluster sits on
cream with olive line artifacts; the rhythm is per-page tone + geometry,
not motion.

## Anatomy

```
┌─ cream surface (per-page tone) ─────────────────────────╮
│  ABOUT · <PAGE>          (mono, olive, top-left)        │
│                                                          │
│      ↘   line artifacts (3–4 elements, olive @ 0.16–0.32)│
│       ↘                                                  │
│                                                          │
│  Big headline in Roboto regular (~44–64px), ink          │
│  optional one-line subhead, ink @ 70%                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- **Carrier:** uniform cream surface, tone varies per page (see table).
- **Line artifacts:** SVG layer, full-hero size (not corner motif),
  3–4 olive lines at opacity 0.16–0.32. Long sweeping curves > short
  concentric arcs. Per-page geometry distinguishes the pages.
- **Mono eyebrow** top-left: `ABOUT · STORY`, `ABOUT · VALUES`,
  `ABOUT · LEADERSHIP` — small breadcrumb-style label, font-mono.
- **Headline** large (44–64px on lg+), Roboto regular, ink color.
- **Optional subhead** below, smaller, partnership-voice one-liner.
- **No typewriter, no photograph.** The homepage owns the typewriter;
  this hero owns the line-composition language.

### Per-page tone + lighting + line geometry (locked · v3)

Each page combines three knobs: a cream **base tone**, a single-hue
**diagonal lighting wash** (leaf-pale at low opacity radial-gradient,
positioned per page), and a **delicate line composition** (3–4
elements, stroke-width 0.7).

| Page | Base | Lighting origin | Line geometry |
|---|---|---|---|
| `/leadership` | `--ov-cream-deep` (#F0EEE2) | upper-right corner | upper-right concentric pair (r=200, 120) + long upper-left → mid-right sweep + huge lower-left partial circle (r=340) |
| `/our-values` | `--ov-cream` (#F9F8F3, neutral; leaf-pale dropped — too saturated) | upper-center (`70% 30%`) | three concentric circles at (980, 320) — r=300, 195, 95 — + one long lower sweep |
| `/about` | `--ov-cream-card` (#F9F8F4) | lower-left corner | one confident long diagonal sweep + quieter parallel + upper-right concentric pair (r=170, 90) |
| `/leadership/[slug]` | photograph carrier (founder portrait) | n/a — photo handles depth | n/a — page hero is the person, not lines |

**Canonical lighting wash (locked):**

```css
background-image: radial-gradient(
  ellipse <SIZE> at <X% Y%>,
  rgba(229, 229, 189, 0.50) 0%,    /* leaf-pale @ 50% near origin */
  rgba(229, 229, 189, 0.12) 40%,   /* fades */
  transparent 70%
);
```

Only the `at <X% Y%>` and `<SIZE>` change per page. Same wash as the
service heroes use — single hue, no second color. Lighting feels
"diagonal" because the radial center is at a corner / off-center.

**Line discipline:**
- Stroke-width `0.7` (delicate; 1.0 felt drawn / thick).
- Opacity range `0.14–0.28`.
- Fewer but larger elements > many small ones.
- Mix one anchored sweep + 2–3 concentric arcs.
- Mono breadcrumb dropped — eyebrow is small uppercase sans-serif
  with tracking `0.22em`, color olive at 85% opacity.

## The `/leadership/[slug]` exception

The per-founder profile page is the one cluster page that keeps a
photographic hero. The founder portrait fills the hero with a low-opacity
olive overlay (`rgba(46,63,24,0.45)` — single-hue tint, not a scrim/blend).
Eyebrow + name + credentials sit lower-left over the photo. Same
composition as the cream pages, just photo-carrier instead.

## Don't

- No typewriter / word-cycle component on any about-cluster page.
  The homepage owns that device; repeating it here flattens the
  homepage's special moment.
- No photographs on the three cluster pages (only on
  `/leadership/[slug]`).
- No video, no autoplay, no blend mode, no scrim. Direction B holds.
- No italic on the headline (italic stays scoped to the Pattern B
  pull-quote per Decision 0529, and the merged pillars section on
  /about which also uses Pattern B's design).
- No abstract gradient surfaces — uniform cream tone only.
- No founder thumbnails / photographs anywhere in the about cluster
  outside `/leadership` (cards) and `/leadership/[slug]` (hero).

## Anatomy — primary (photo carrier)

```
┌────────────────────────────────────────────────────────╮
│ full-bleed warm dark-leaning photograph                │
│                                                         │
│  EYEBROW (mono, olive @ 70%)                           │
│  Big headline in Roboto regular (~72–96px), white      │
│  cycling word ↻ — large, fades word-to-word            │
│  optional subhead, smaller, white @ 85%                │
│                                                         │
│                                              [↗ ring]  │
└────────────────────────────────────────────────────────┘
```

- **Carrier:** one full-bleed photograph spanning the whole hero.
  Imagery vibe per README §3 — warm, golden, slightly desaturated,
  dark-leaning so white text reads without a scrim.
- **Type stack** sits on the photo, left-aligned, lower-left or
  center-left. No scrim, no blend mode, no shadow.
- **The cycling word** is the distinct mark of the about cluster
  hero — see "The typewriter" below.
- **Round-arrow CTA** bottom-right (48–56px ring, white border on the
  dark photo, fills white with olive arrow on hover). Same component
  the service heroes use.

## Anatomy — fallback (no photo)

When no page-specific photograph exists yet, the hero is built on a
uniform cream surface and the typewriter becomes the protagonist:

```
┌─ cream ─────────────────────────────────────────────────╮
│  EYEBROW                                                 │
│                                                          │
│  Lead-in line (~32px, ink, regular)                      │
│  cycling word ↻ — ~64px+, deep olive, line below         │
│                                                          │
│                                              [↗ ring]   │
└──────────────────────────────────────────────────────────┘
```

- Used for `/leadership` (no dedicated leadership-firm photo exists).
- Cream surface (`--ov-cream` or `--ov-cream-deep`) lets the typography
  carry the energy.
- Optional decorative curve in the corner (subtle, single-hue olive),
  shape choice at design discretion — *not* tied to any service-cluster
  CurveMotif.

## The line composition (per page)

Each page's hero includes an inline SVG layer with 3–4 olive line
elements covering the hero canvas (not corner-tucked). The geometry is
the per-page distinguishing rhythm now that the typewriter is dropped.

**Discipline:**

- Single olive hue (`#627F38` on cream-card and cream-deep;
  `#495F2B` on the darker `--ov-leaf-pale` for contrast).
- Opacity 0.16–0.32 — visible but quiet.
- Mix sweeping curves and circular arcs; sweeping curves > stacked
  concentric arcs (the latter felt floppy on its own).
- Lines extend off-canvas via `preserveAspectRatio="xMidYMid slice"`
  so the full-hero SVG always fills the viewport.

## Implementation

Each page inlines its own SVG composition (not extracted to a shared
component — the geometry is page-specific and stays page-local). The
common ingredients live in this playbook's table; the per-page
expression lives in the page's JSX.

(The previous typewriter component `HeroTypewriterCycle.tsx` is now
unused. Removable when the codebase has shell write access.)

## Don't

- No video / autoplay reel. Direction B prohibition stands. If a future
  page genuinely needs motion the photo can't carry, that is a
  Decision-J at that moment, not an opportunistic reopen.
- No italic for the cycling word. Italic stays scoped to Pattern B.
- No scrim, no blend mode, no shadow on the headline or the cycling word.
- No abstract gradient backgrounds (service cluster has a single-hue
  radial vignette; about cluster does not — it has photo or cream).
- No cursor on the typewriter. (The homepage typewriter has one; the
  about hero variant does not.)
