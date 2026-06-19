# Pattern 04 — Lifecycle · staged

**Role:** present a service that has a temporal arc — stages a client moves through.
**Confirmed:** 2026-05-28, founder review. (Renamed from "three-stage" to "staged".)
**Source:** promoted from the Corporate page (Start Up / In Business / Exit).

## Anatomy

A cream-deep surface holding **3 to 4 stage columns**. Each column: a mono
stage number, a short heading, and an olive-dot list.

```
┌─ #F0EEE2 ────────────────────────────────────┐
│  01            02            03               │
│  Start up      In business   Exit             │
│  · …           · …           · …              │
│  · …           · …           · …              │
└───────────────────────────────────────────────┘
```

## Stage count — 3 to 4 only

- **3 stages:** the stable default (Corporate's current form).
- **4 stages:** valid; reduce heading and body text one step so columns
  don't feel cramped. The mono numbers carry the rhythm.
- **2 stages:** out of range. A two-part progression should use Pattern 03
  (image & text) instead — two lifecycle columns look empty and force
  awkward left-alignment workarounds.
- **5+ stages:** out of range. A long sequence with a time dimension is a
  Pattern 05 (annual calendar), not a lifecycle.

Confining the count to 3–4 removes the only edge cases that broke the
layout, keeping the pattern simple and unbreakable.

## Fixed vs. flexible

- **Fixed (always):** cream-deep `#F0EEE2` surface, mono stage numbers,
  regular-weight headings, olive-dot lists.
- **Flexible:** the column count (3–4) and the text size (smaller as the
  count grows). Nothing else flexes.

## Copy

- Stage headings are short (1–2 words). Lists are 3–5 olive-dot items.
  Pull from `pageUtils.ts`.

## Don't

- No 2-stage or 5+-stage layouts.
- No surface other than cream-deep.
- No `•` / unicode bullets.
