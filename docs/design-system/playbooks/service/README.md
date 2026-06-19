# Playbooks — service page grammar

This folder holds the **section patterns** that compose any Olive & Vine
service page. It is the generative grammar referenced by
`audits/2026-05-28-service-pages-baseline.html` §08, refined through a
pattern-by-pattern review with the founder on 2026-05-28.

## How a service page is built

A service page is:

```
Header (shared, never edited)
  → Pattern 01  · hero            (REQUIRED, always first)
  → one of 02 | 03               · explainer
  → one of 03 | 04 | 05          · detail
  → optionally 06                · principle moment
  → Pattern 07  · related services (REQUIRED, last body section)
  → Pattern 08  · universal closing (REQUIRED, always last, never edited)
Footer (part of 08)
```

Four to six body sections in total. The hero is always 01. The closing
is always 08. The middle flexes.

## The catalog

| # | Name | File | Source |
|---|---|---|---|
| 01 | Hero · split | `section-01-hero.md` | all three pages (unified) |
| 02 | Two-column explainer | `section-02-explainer.md` | Corporate / Tax |
| 03 | Image &amp; text · alternating | `section-03-image-text.md` | Accounting |
| 04 | Lifecycle · staged | `section-04-lifecycle.md` | Corporate |
| 05 | Annual calendar | `section-05-calendar.md` | Tax |
| 06 | Quote / principle | `section-06-principle.md` | new (from README voice) |
| 07 | Related services | `section-07-related.md` | ui_kits/website |
| 08 | Universal closing | `section-08-closing.md` | all three pages (shared) |

## The one rule that governs the whole folder

> If a page needs a section type that is not in this catalog, it does not
> become a page first and a playbook entry later. It becomes a playbook
> entry first, gets reviewed, then becomes a page.

(From `decisions/2026-05-28-b-direction.md`, rule 5.)

## A note on "ranges, not fixed values"

Several patterns below define a **permitted range** rather than a single
fixed value (e.g. the explainer circle motif, the image corner radius, the
lifecycle stage count). This is deliberate. A fixed value would make the
system rigid and force every new page to look identical; an unbounded value
would let drift back in. A bounded range is the resolution — generative
enough to make new pages feel designed, constrained enough that they can't
leave the brand. This was the founder's explicit goal: *"a framework that's
generative but never leaves the brand."*
