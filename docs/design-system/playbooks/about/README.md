# About cluster grammar

The About cluster is three pages — `/about`, `/our-values`, `/leadership` —
that together tell the firm's story. Unlike the service pages (six parallel
pages), these are a **hierarchical cluster** with a division of labor.
**Confirmed:** 2026-05-29, founder review.

## Division of labor — the rule that prevents duplication

Each topic is owned by exactly one page and only teased (not duplicated) by
the others:

| Page | Owns | Teases |
|---|---|---|
| `/about` | the **story** (who we are, how we started) | founders → links to /leadership · values (3) → links to /our-values |
| `/our-values` | the **canonical values** (full set) | — |
| `/leadership` | the **canonical founders** (rich cards) | — |

This is the fix for the audit's central finding (A14): founders currently
appear on two pages, values on two pages with inconsistent counts. After this
rule, founders live fully only on `/leadership`, values fully only on
`/our-values`, and `/about` shows teasers that link out.

## Composition

```
/about       : 01 hero → 03 our-story → A(teaser, text-only) founders
               → B(merged, 3 pillars) → 07 cross-link → 08
/our-values  : 01 hero → 06 mission → B(full, 5) values
               → 06 promise → 07 cross-link → 08
/leadership  : 01 hero → 06 culture-quote → A(full) founder cards
               → 07 cross-link → 08
```

`07 cross-link` here links the three cluster pages to each other (not to
services) — the within-cluster navigation the pages currently lack.

**`/about` merge note (2026-05-29 amendment to Decision I):** the
original draft had `B(teaser, 3) values` *and* a separate `06 principle`
section with the three pillars (Trust / Excellence / Growth). They were
saying the same thing twice, so they're merged: one section, Pattern B's
numbering + italic pull-quote design, content = pillars, link out =
"All values →" to `/our-values`. The teaser-values-from-canonical step
is gone.

**Founder-photo discipline:** founder photographs appear only on
`/leadership` (cards) and `/leadership/[slug]` (hero). `/about`'s `A`
teaser is text-only (role + name + credentials + arrow) and links out
to /leadership.

## Patterns

- **Pattern A — founder card** → `section-A-founder-card.md` (NEW)
- **Pattern B — numbered values** → `section-B-values.md` (NEW)
- Reused from `service/`: 01 hero, 03 image+text, 06 principle, 07 related, 08 closing.

## Patterns considered and rejected

- **Stat strip** (25+ / 500+ / 4 / 99%) — rejected 2026-05-29. The firm does
  not want to publish client-count figures that aren't verified real data.
  Unverifiable stats erode trust rather than build it, which conflicts with
  the Integrity value. If real, defensible figures exist later, this can be
  reopened.
