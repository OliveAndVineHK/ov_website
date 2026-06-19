# Pattern B — Numbered values list

**Role:** present the firm's values as a numbered sequence. Canonical home: `/our-values`. Teased (3) on `/about`.
**Confirmed:** 2026-05-29, founder review.

## Anatomy

A vertical sequence of values on a uniform cream surface, with a large
watermark numeral giving each item its rhythm.

```
┌─ cream ───────────────────────────────────┐
│  ⓵        "We don't compromise on honesty"  │ ← olive pull-quote (italic)
│  (large    Integrity                         │ ← value name, 32px
│  watermark Integrity means we tell you what  │ ← paragraph
│  numeral)  you need to hear…                 │
├────────────────────────────────────────────┤
│  ⓶        "Excellence is our daily practice" │
│           Excellence  …                       │
└────────────────────────────────────────────┘
```

- **Surface:** uniform cream (`--ov-cream` / `--ov-cream-deep`) for all items.
  **No alternating dark backgrounds** — they made the eye reset on every item
  and diluted dark's role as the system's emphasis signal. Rhythm comes from
  the watermark numerals instead.
- **Watermark numeral:** a large, faint olive-tint number (1, 2, 3…) behind /
  beside each item. This is what differentiates items now that the background
  is uniform.
- **Value name:** ~32px (`--t-h3`), Roboto regular.
- **Pull-quote:** one olive line per value (e.g. *"Behind every number is a
  person, a dream, a story."*). **Italic is permitted here** — this is a
  documented intentional exception to the system's general no-italic rule
  (see `decisions/2026-05-29-about-cluster.md`). The quote is a deliberate
  brand device, not decorative emphasis.
- **Paragraph:** the value explained, partnership voice.

## Count — 5 canonical, 3–5 permitted

The canonical set is **5**: Integrity · Excellence · Partnership · Compassion
· Growth. The pattern supports **3 to 5** items so the set can be reduced to
3 later without breaking (the founder flagged a possible future move to 3).
`/about` shows a **3-item teaser** that links to the full set here.

Do not hardcode to exactly 5 — build for the 3–5 range.

## Don't

- No alternating dark/cream backgrounds — uniform cream only.
- No italic anywhere except the per-value pull-quote (the documented exception).
- Don't put the full list on `/about` — that page teases 3 and links here.
