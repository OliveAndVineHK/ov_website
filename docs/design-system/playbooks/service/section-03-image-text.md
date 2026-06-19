# Pattern 03 — Image & text · alternating

**Role:** present the sub-services of a page, one per row. Repeats, alternating sides.
**Confirmed:** 2026-05-28, founder review.
**Source:** promoted from the Accounting page — the most on-brand section across the original three.

## Anatomy

A visual on one side, text on the other. When the pattern repeats, the
visual alternates sides (left, then right, then left…).

```
instance 1:   [ photograph ╮ ]      Heading
              [           ╯ ]       body copy · sub-points

instance 2:   Heading               [ ╭ photograph ]
              body copy              [ ╯           ]
```

- **Visual side:** a photograph. The **outer (north-east) corner carries the
  signature curve gesture** — `border-top-right-radius`.
- **Text side:** heading at 32px (`--t-h3`), regular weight; body at 16px;
  optional short sub-point list with olive dots.
- **Alternation:** first instance has the visual on the left; the next on
  the right; and so on. This rhythm is the pattern's identity.

## NE corner gesture — permitted range

`border-top-right-radius` between **30px and 64px**. Pick within that range
by feel; do not exceed it.

- 30px = the system's subtle default.
- 64px = a more pronounced curve.
- **Not** 120px or the insight card's dramatic 300px — those belong to the
  insight card, and using them here would blur the distinction between
  section types.

## Visual slot — photograph only, no motion

The visual slot holds a **photograph (or a static graphic)** — **not motion.**

Motion is reserved for Pattern 01 (the hero). Confining motion to the hero
keeps it a rare signature moment; letting it recur in body sections makes the
page restless and dilutes the effect. This was the founder's explicit
decision on 2026-05-28.

(Technically a transparent-background motion asset *could* be masked by the
NE curve — but the rule is a brand-rhythm decision, not a technical limit.
Body sections stay still.)

## Copy

- One instance per sub-service. Heading is the sub-service name; body is its
  short description. Pull from `pageUtils.ts`.

## Don't

- No motion in the visual slot — photograph or static graphic only.
- No corner radius outside 30–64px.
- Don't break the left/right alternation rhythm.
