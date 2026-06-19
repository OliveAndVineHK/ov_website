# Pattern A — Team / founder card

**Role:** present the firm's leaders. Canonical home: `/leadership`. Teased on `/about`.
**Confirmed:** 2026-05-29, founder review.

## Anatomy

A restrained professional profile. Photo is a **supporting element**, not the
protagonist — text carries the trust.

```
┌──────────────────────────────────────┐
│ ┌──────╮  CO-FOUNDER                   │
│ │ photo│  Rebecca, PARK Ji Hyun        │
│ │ ~140 │  HKICPA (Practising), CIA     │
│ │ NE ⌐ │  Short bio in partnership     │
│ └──────┘  voice — two or three lines.  │
│           Full profile →               │
└──────────────────────────────────────┘
```

- **Photo:** small thumbnail, roughly 140px, on the left. Carries the NE
  corner gesture (`border-top-right-radius`, 30px). Deliberately small —
  the previous `/about` cards used a half-card photo that cropped faces and
  read as a portrait gallery rather than a leadership profile.
- **Right column:** mono `CO-FOUNDER` label (olive), name (~22px, medium),
  credentials line (small, muted), 2–3 line bio in partnership voice, then a
  `Full profile →` link.
- **Layout:** two founders side by side. (If the team grows, this becomes a
  2-up grid that wraps — but that is a future change, not built now.)

## The career timeline — NOT in the card

The career rail (PwC → IL Shin → Olive & Vine) is **removed from the card**.
It lives only on the **Full profile** page. Keeping it out makes the card
clean and keeps `/leadership` scannable.

When the Full profile page is built, the timeline will reuse the **Pattern 05
calendar mechanics** — a horizontal rail with markers — but recolored to
**olive tints** (pale → deep, largest deep-olive dot at "Olive & Vine"), per
the single-hue rule. That is a future playbook entry (`section-full-profile.md`),
not built yet.

## Don't

- No large/half-card photos — keep the thumbnail small so faces aren't cropped
  and text stays the focus.
- No career timeline in the card.
- No photo without the NE corner gesture.
- Don't duplicate these rich cards on `/about` — that page teases and links here.
