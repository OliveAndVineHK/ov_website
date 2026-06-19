# 2026-05-28 — Decision H: per-service explainer diagram + curve motif

**Status:** Active · AMENDED 2026-05-28 (see amendment block at end)
**Decided by:** [founder] with Claude, same session as Decision G
**Affects:** `playbooks/section-02-explainer.md`,
`app/components/ExplainerDiagram.tsx` (new),
`app/components/CurveMotif.tsx` (new),
the Accounting explainer (Tax keeps the 2-col text-list variant)

---

## Context

The first rebuild of Pattern 02 (the "What we handle" explainer) was a
two-column text layout: heading on the left, three sub-areas as a
vertical list of label + body + bullets on the right. The single
permitted decoration was a "two concentric circles" motif slipping off
the right edge — identical on every page.

Combined with Decision G's per-service hero tints, this left the
explainer as the only section on the page that still looked the same
across services. A founder reading three service pages back-to-back
would see exactly the same composition three times. The heroes had
gained personality; the explainers hadn't.

## The choice

**H — Replace the text-only Pattern 02 with a *diagram-led* layout, and
replace the single concentric-circles motif with a *per-service curve
signature*. Both ship as shared React components so the six service
pages stay in sync on everything except the per-service geometry.**

### Diagram (replaces the prior right-column text list)

A bespoke SVG per service, owned by `ExplainerDiagram.tsx`. Each
service's geometry echoes its hero motion:

| Service     | Diagram                       | Echoes |
|-------------|-------------------------------|--------|
| tax         | three intersecting circles    | parallel domains (Profits/Salaries/Advisory) |
| accounting  | three layered plates          | the Stack motion |
| corporate   | lifecycle path                | (TODO when page is rebuilt) |
| consulting  | ripple from a source          | (TODO) |
| hr          | orbit nodes around a body     | (TODO) |
| assurance   | three connected stages        | (TODO) |

Composition changes: the explainer's right column is now the diagram
(not the text list). The three sub-area details (label / body / bullets)
move below as a full-width 3-column row with `01` / `02` / `03` number
labels.

The diagram is rendered via the shared component, never inline. Tone
(`"dark"` default for cream/white surfaces, `"light"` for dark surfaces)
flips the palette. Labels are passed in per page so the geometry is
reusable but the copy stays accurate per service and per language.

### Curve motif (replaces the single concentric-circles motif)

A per-service curve in `CurveMotif.tsx`, slipping off the section's
right edge. Same color discipline as before — single olive hue, opacity
0.35–0.50, never overlaps text — but the geometry varies:

| Service     | Curve                  |
|-------------|------------------------|
| tax         | concentric circles     |
| accounting  | three stacked arcs     |
| corporate   | crossing arcs (embrace)|
| consulting  | ripple from corner     |
| hr          | single sweeping arc    |
| assurance   | two intersecting arcs  |

Each curve echoes its service's hero motion *again*, but in a different
geometric register from the diagram — so a Tax page reads as: Tilt
motion (hero) → Venn (diagram) → concentric (curve). Three coherent
beats of the same idea, three different visual moments.

### Open clause — existing illustration substitution

Where an existing illustration in `/public/services/` (`a1.svg`,
`b1.svg`, `cs1.svg`, `t2.svg`, `au2.svg`, etc.) fits the diagram's
intent naturally — restyled to the brand palette — it MAY substitute
for the bespoke SVG. The consumer prop contract stays identical so a
service page doesn't need to know which it got. Substitutions are
documented in a comment on the host page so they're auditable.

This clause exists because the founder commissioned those illustrations
already; using them where they fit is faster than authoring new SVGs
and preserves the founder's existing visual character. The clause is
permissive, not required — the bespoke SVG is the default.

## What was also considered

**A. Keep the text list, add icons.** Rejected. Icons inside a list are
small visual moments; they don't carry the differentiation weight the
founder asked for.

**B′. Use the existing illustrations as the default, skip bespoke
diagrams.** Considered seriously. Rejected as the default because the
illustrations are large (b1.svg = 9.5MB), likely contain non-brand
colors or complex hand-drawn paths that would need substantial cleanup,
and there are no guarantees they fit each service's narrative
structure. Kept as the **open clause** because where one *does* fit, it
should be used.

**Per-page custom layouts.** Rejected. Layout drift across six pages is
exactly what the playbooks exist to prevent. The diagram and curve are
the per-service knobs; everything else stays locked.

**Animate the diagram.** Rejected for now. Pattern 01 owns motion;
extending it into the body sections re-creates the "wall of motion"
problem Direction B fixed. The diagram is static. (If a future
discovery shows static is too quiet here, that's a deliberate playbook
amendment, not a per-page improvisation.)

## Implications

- `playbooks/section-02-explainer.md` rewritten around the diagram +
  curve + open clause. The previous text-only form is now historical.
- `app/components/ExplainerDiagram.tsx` and `app/components/CurveMotif.tsx`
  are the single sources of truth. Page code imports and renders;
  doesn't reimplement.
- Tax and Accounting consume both. Corporate / Consulting / HR /
  Assurance get authored diagrams + curves as their pages are rebuilt.
  Until then, their CurveMotif is wired (all six curves are authored)
  but their ExplainerDiagram falls through to `null` (component returns
  no DOM if the service hasn't been added to `DIAGRAMS`).
- The 3-col sub-area row at the bottom is now the canonical place for
  detailed copy. The diagram is summary; the cards are detail. Don't
  cram body text into the diagram chips.

---

## Amendment · 2026-05-28 (same day)

The first build of Decision H rolled the diagram-led layout out to
**both** Tax and Accounting, with a 3-column sub-area row underneath.
On review the founder pushed back hard:

1. **The Tax explainer should not have changed.** The 2-col text-list
   variant was working. Treating Decision H as a universal upgrade was
   a misread.
2. **The 3-column sub-area row is not a universal Pattern-02 default.**
   It is one variant; another service can use a different layout.
3. **CurveMotif's design intent of "echo the hero motion" was wrong.**
   The principle is *elegance per service*, not metaphor mimicry.
   Designed-to-mean-something geometry tends to look floppy or
   unfinished when the geometry doesn't earn the meaning. Accounting's
   "three stacked arcs" was the case in point.
4. **Pattern 02 is now explicitly a family of variants**, not a
   single recipe. Each service picks the variant that fits its
   content. New variants are added deliberately when a service needs
   one — not assumed across the family.

What actually ships post-amendment:
- **Tax** — original 2-col text-list variant, with `CurveMotif service="tax"`
  on the right edge (visually identical to the pre-Decision-H state;
  CurveMotif just routes the same two concentric circles through the
  shared component).
- **Accounting** — diagram-led variant: heading + `ExplainerDiagram
  service="accounting"` on top row, 3-col sub-area details below, with
  `CurveMotif service="accounting"` on the right edge. Dotted vertical
  ties between the plates removed (they impaired text legibility).
- **CurveMotif** — design intent restated in the source as *elegance,
  not motion-graphic echo*. Accounting's curve redrawn as one long
  asymmetric sweep + one quieter parallel, rather than three stacked
  arcs.
- **Future services** — when each page is built, pick the variant that
  fits. Don't apply the diagram-led layout by default. The playbook
  documents Tax's variant and Accounting's variant; new variants can
  join the family when they're authored.

**Meta-lesson recorded here so the next decision doesn't repeat it:**
"Make it the same so we don't drift" and "make each one its own thing so
the family has texture" are *both* design imperatives. The right call
depends on which side is currently weak. Post-Tax, the system was
internally consistent but visually monotonous — variation was the fix.
But variation, once introduced, should not itself be systematized into
a new monotony. Listen for both failure modes.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
