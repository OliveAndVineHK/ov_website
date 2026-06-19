# Pattern 02 — Explainer (variant family)

**Role:** context-setting. "What this service is and what it covers." Use once per page.
**Confirmed:** 2026-05-28, founder review.
**Updated:** 2026-05-28 — Pattern 02 is a *family of variants*, not a
single recipe. Each service page picks the variant that fits its
content. The diagram-led variant was assumed universal in the first
build; Decision H's amendment corrected that.

## Variants currently in the family

### Variant A — Two-column text list (ships on Tax)

```
┌────────────────────────────────────────────────────╮ ← CurveMotif
│                                                    │ │  per-service
│  [eyebrow]              Profits Tax                │ │  signature
│  Three areas,           Body … • bullets           │ │
│  one relationship.                                 │ │
│                         Salaries Tax               │
│                         Body … • bullets           ╯
│
│                         Tax Advisory
│                         Body … • bullets
└────────────────────────────────────────────────────┘
```

- 5/12 + 7/12 grid. Left = eyebrow + 28px heading. Right = vertical
  stack of three sub-areas, each with a sub-label, body, and
  olive-dot bullets.
- The Tax variant. Calm, dense, partnership-voice forward.

### Variant B — Diagram-led (ships on Accounting)

```
┌────────────────────────────────────────────────────╮ ← CurveMotif
│                                                    │ │  per-service
│  [eyebrow]              [           ]              │ │  signature
│  Three layers,          [  bespoke ]               │ │
│  one ledger.            [  diagram ]               │ │
│  [short subhead]        [           ]              │
│                                                    ╯
│  ─────────────────────────────────────────────────
│  01                   02                   03
│  Bookkeeping          Accounting           Private Accounting
│  Body…                Body…                Body…
│  • bullet             • bullet             • bullet
└────────────────────────────────────────────────────┘
```

- Top band: 5/12 + 7/12 grid. Left = eyebrow + heading + one-line
  framing subhead. Right = `ExplainerDiagram` (currently authored
  only where Decision H listed it).
- Bottom band: full-width 3-column row of sub-area details with
  two-digit number labels.
- Used where the sub-areas have a clear visual relationship the
  diagram can show. Accounting is a layered stack; the diagram makes
  that legible at a glance.

### Variant E — Lifecycle 3-stage (ships on Corporate)

Promotes the F10 finding from the baseline audit (the improvised
"Start Up / In Business / Exit" three-column lifecycle on the legacy
Corporate page). Now a documented pattern.

```
┌──────────────────────────────────────────────────────╮ ← CurveMotif
│                                                      │
│  [eyebrow]                                           │
│  We sit alongside founders, end to end.              │
│                                                      ╯
│  ──────────────  ──────────────  ──────────────
│   01 / Start Up   02 / In Business   03 / Exit
│   ── lifecycle band — light → dark olive tints ──
│
│   Description     Description       Description
│   • bullet        • bullet          • bullet
│   • bullet        • bullet          • bullet
└──────────────────────────────────────────────────────┘
```

- Top band: eyebrow + heading (full-width or 7/12). No big diagram —
  the three columns below ARE the diagram.
- Below: 3-column grid. Each column has a small lifecycle band at
  the top (a thin horizontal olive stroke tinted to reflect its stage
  in the sequence: lightest at left → deepest at right), then the
  stage label with its `01` / `02` / `03` number, a description, and
  bullets.
- The lifecycle band ties the three columns together visually as a
  progression. Subtle, doesn't shout.

Used when:
- The content is a *three-stage lifecycle or journey* with prose and
  bullets per stage. (Corporate: Start Up / In Business / Exit.)
- Other multi-stage journeys could reuse this — 3 stages is the sweet
  spot; 4–5 would need a different treatment.

### Variant D — Image-led card grid (ships on HR)

Where the service line is best understood through *visual examples* of
each offering, and where the founder has already invested in per-offering
imagery (e.g. `/public/hr/*` for HR), the explainer becomes a card grid.
Each card pairs a restyled illustration with a title and a small list.

Used when:
- The service has several (4–6) parallel offerings that benefit from
  visual reinforcement
- Per-offering imagery exists in `/public/<service>/` (open clause)
- A text-only list would feel dense and skim-resistant

Cards inherit the NE-corner hover gesture from the brand vocabulary
(`hover:rounded-tr-[30px]` over 300ms) but stay olive-bordered and
cream-card surfaced — not the dramatic full olive fill that the
related-services tiles use (Pattern 07).

### Variant F — Numbered methodology cards (ships on Consulting)

A 2-column grid of numbered cards, each holding one phase of the
methodology. The card surface gives chunky-prose phases room to
breathe; the 2-col rhythm reads more "designed" than a vertical list.

```
┌──────────────────────────────────────────────────────╮ ← CurveMotif
│                                                      │
│  [eyebrow]               [methodology lede on right] │
│  Innovating strategies   …                           │
│  that align with your                                │
│  values and goals.                                   ╯
│
│  ┌────────────────────┐  ┌────────────────────┐
│  │ (01) Phase title   │  │ (02) Phase title   │
│  │  Body text…        │  │  Body text…        │
│  └────────────────────┘  └────────────────────┘
│
│  ┌────────────────────┐  ┌────────────────────┐
│  │ (03) Phase title   │  │ (04) Phase title   │
│  │  Body text…        │  │  Body text…        │
│  └────────────────────┘  └────────────────────┘
│
│  ┌────────────────────┐
│  │ (05) Phase title   │
│  │  Body text…        │
│  └────────────────────┘
└──────────────────────────────────────────────────────┘
```

- Cards: olive border on cream-card background, square corners, no shadow.
- Number badge: olive-deep filled circle with white digit, sits inline
  with the title (not as a separate top-left badge).
- Layout: `md:grid-cols-2` — 2 columns on tablet+. On mobile collapses
  to a single column.
- Use when phases are *prose-heavy* (each description ~50+ words) —
  cards give the eye anchor points the vertical timeline can't.

### Variant C — Numbered process timeline (ships on Assurance)

```
┌────────────────────────────────────────────────────╮ ← CurveMotif
│                                                    │ │
│  [eyebrow]                                         │ │
│  Innovating strategies that align with             │ │
│  your values and goals.                            │ │
│  [short methodology lede]                          ╯
│
│  │ 01  On-Site Process Review and Control Assessment
│  │     Description…
│  │
│  │ 02  Cross-Functional Education and Alignment
│  │     Description…
│  │
│  │ 03  Process Redesign and Documentation Frameworks
│  │     Description…
│
│  ↑ thin olive rail connecting the numbered nodes
└────────────────────────────────────────────────────┘
```

- Top band: eyebrow + heading + one-line lede (full-width or 7/12).
- Below: a vertical list of numbered phases. Each row = a small
  square number badge (`01` / `02` / `03` …), a phase title, and a
  prose description. A thin olive rail (`--ov-ink-15` or
  `--ov-olive` @ 0.4) runs through the badges to read as a process
  timeline.
- Used when the content is a **structured process or methodology** —
  a sequence of phases with prose. Consulting's 5-step methodology
  is the case. Works for any number of phases (3–8 is comfortable;
  more than 8 should consider breaking into two sections).

### Picking the variant

Each service page picks the variant that fits its content. Don't apply
any variant by default. Triggers:

- **Variant A** when the sub-areas are *parallel domains* with no
  strong visual relationship to draw — text carries the meaning, the
  CurveMotif carries the visual life. (Tax: Profits, Salaries,
  Advisory — three domains, no hierarchy.)
- **Variant B** when the sub-areas have a *visual relationship* worth
  drawing — a hierarchy, a sequence, a stack, a cycle. (Accounting:
  Bookkeeping → Accounting → Private Accounting — layered.)
- **Variant C** when the process has *many short phases* (6+) — a
  vertical timeline lets the reader scan the sequence quickly.
  (Assurance: 7 audit procedures.)
- **Variant F** when the methodology has *fewer phases with longer
  prose per phase* (3–5 chunky steps) — cards give breathing room.
  (Consulting: 5-phase methodology.)
- **Variant D** when the offerings benefit from *per-card imagery* and
  the founder has illustrations ready in `/public/<service>/`.
  (HR: 5 services each with their own image.)
- **Variant E** when the content is a *three-stage lifecycle or
  journey*. (Corporate: Start Up / In Business / Exit.)

Variant C and Variant F are deliberately distinct treatments for
methodology content. Don't use both on the same family of pages — the
choice expresses *what kind of process* it is. (A short, methodical
audit reads as a timeline; a deliberate, chunky engagement reads as a
set of cards.)

If a future service fits none of these, **author a new variant** in this
playbook *before* shipping it on the page (per Direction B rule 5).

## The diagram — `<ExplainerDiagram service="…">` (Variant B only)

Single source of truth: `app/components/ExplainerDiagram.tsx`. Only
authored for services that ship with Variant B.

| Service     | Variant | Diagram                              |
|-------------|---------|--------------------------------------|
| tax         | A       | n/a — text-list variant              |
| accounting  | B       | three layered plates (stack)         |
| corporate   | TBD     | author when the page is rebuilt      |
| consulting  | TBD     | author when the page is rebuilt      |
| hr          | TBD     | author when the page is rebuilt      |
| assurance   | TBD     | author when the page is rebuilt      |

The Accounting diagram is laid out cleanly without connecting tie-lines
between the plates — the labels need their breathing room and dotted
ties impair legibility.

**Invariants:**
- Render via the component, never inline. Drift across six services is
  the failure mode this exists to prevent.
- Colors come from `colorsFor(tone)`:
  - `tone="dark"` (default, on white/cream): stroke = `--ov-olive-deep`
    and `--ov-olive`; text = `--ov-ink` and ink @55%
  - `tone="light"` (on dark surfaces): white + white @70%
- Single hue family. No second color.
- Labels are passed in by the host page (per-page, per-language) so the
  diagram's geometry is reusable but the copy stays accurate.

**Open clause — existing illustration substitution (founder · 2026-05-28):**
Where an existing illustration in `/public/services/` (`a1.svg`, `b1.svg`,
`cs1.svg`, `t2.svg`, `au2.svg`, etc.) fits the diagram's intent
*naturally* — restyled to the brand palette (olive + ink only, no
shadows, no foreign hues) — it MAY substitute for the bespoke SVG.
The consumer prop contract stays identical. Document the substitution
in a `// uses /public/services/<asset>` comment on the host page so the
substitution is auditable.

## The right-edge curve motif — `<CurveMotif service="…">`

The brand's only permitted decorative element, scoped to Pattern 02.
Each service has its own curve. **Design intent: elegance, not
metaphor.** The first build tried to mirror each service's hero motion
in the curve; the result felt floppy where the geometry didn't earn
the meaning. The curves are now designed to look composed and
intentional on their own — they don't try to encode anything.

| Service     | Curve (current)                              |
|-------------|----------------------------------------------|
| tax         | two concentric circles, off the right edge   |
| accounting  | one long asymmetric sweep + one quiet parallel |
| corporate   | TBD — refine when the page is rebuilt        |
| consulting  | TBD — refine when the page is rebuilt        |
| hr          | TBD — refine when the page is rebuilt        |
| assurance   | TBD — refine when the page is rebuilt        |

**Invariants (always):**
1. One olive hue only — stroke is `--ov-olive` (`#627F38`).
2. Opacity 0.30–0.50.
3. Always cropped at the section's right edge.
4. Never overlaps the diagram or the text.
5. Hidden below `md` (the explainer collapses to single-column on phone
   and decoration becomes noise).
6. Pattern 02 only. Does not appear anywhere else on the site.
7. **Asymmetric > symmetric. Long sweeping lines > short stubby arcs.**
   If a curve feels floppy or unfinished, the geometry is wrong — fix
   it, don't decorate over it.

## Copy

- Eyebrow: a short label (`What we handle`).
- Heading: short, partnership-flavored (`Three areas, one relationship.`,
  `Three layers, one ledger.` etc.).
- Subhead: one line of partnership voice that frames the diagram in
  words — what the geometry is showing.
- 3-col details: each cell has a two-digit number, sub-area title (olive),
  short body (ink @70%), and olive-dot bullets. Pull from
  `pageUtils.ts` or the per-service `pageXxxServiceUtils.ts`.

Bullets are olive dots rendered as styled spans — never the `•` glyph.

## Don't

- No photograph in this section (that's Pattern 03).
- No `•` / unicode bullets.
- No CurveMotif outside this section.
- No additional decorative elements — the diagram and the curve are
  the only two visual moments allowed.
- No replacing the diagram with a generic stock illustration — only the
  documented bespoke SVG or a curated `/public/services/` substitution
  per the open clause.
- No diagram color outside the olive family. The colors come from
  `colorsFor(tone)` only; don't override.
