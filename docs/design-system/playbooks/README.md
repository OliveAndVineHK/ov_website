# Playbooks — page-type grammars

This folder holds the **section patterns** that compose Olive & Vine pages.
It is organized as a **shared foundation + per-page-type grammars**: the
global brand (color, type, motion, voice, hover, the no-shadow rules) lives
in the top-level `README.md`, `colors_and_type.css`, and `rules/` and applies
to *every* page type. What differs per type is only the section grammar —
which sections exist and how they compose.

```
playbooks/
  README.md          ← this file
  service/           ← service-page grammar (6 service pages)
  about/             ← about-cluster grammar (/about, /our-values, /leadership)
```

New page types (e.g. insights, home) get their own sibling folder, built
through the same audit → walk-through → playbook process — never as a
parallel standalone system.

## Patterns reused across types

Some patterns are near-universal and are defined once in `service/` and
referenced from elsewhere:

- **Hero** (`service/section-01-hero.md`) — every page type opens with it.
- **Image & text** (`service/section-03-image-text.md`) — used by About's
  "Our Story".
- **Principle** (`service/section-06-07-08-closing.md`, Pattern 06) — used by
  About's Mission / Promise / culture-quote moments.
- **Related + Universal closing** (Patterns 07, 08) — used everywhere; the
  closing is byte-identical on every page.

## The rule that governs the whole folder

> If a page needs a section type not in its grammar, it does not become a page
> first and a playbook entry later. It becomes a playbook entry first, gets
> reviewed, then becomes a page.

(From `decisions/2026-05-28-b-direction.md`, rule 5.)

## Ranges, not fixed values

Several patterns define a **permitted range** rather than a single fixed value
(the explainer circle motif, the image corner radius, the lifecycle stage
count, the values count). This is deliberate — generative enough to make new
pages feel designed, constrained enough that they can't leave the brand.
