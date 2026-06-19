# Pattern 05 — Annual calendar

**Role:** present a service with a deadline rhythm across the year (Tax, Corporate).
**Confirmed:** 2026-05-28, founder review.
**Updated:** 2026-05-28 — replaced the horizontal pill-rail with a
filterable 4×3 month grid. The previous rail is now historical.
See `decisions/2026-05-28-f-calendar-grid-redesign.md`.

## Anatomy

A calendar-year grid (Jan → Dec, 4 cols × 3 rows) sits above a list of
detail cards. Filter buttons under the section heading drive **both**
the grid chips and the cards from the same `activeCategory` state.

```
[Annual rhythm]
Hong Kong tax calendar

[ All ] [ Profits Tax ] [ Salaries Tax ] [ Employer's Return ] [ General ]
─────────────────────────────────────────────────────────────────
│ JAN     │ FEB     │ MAR              │ APR                    │
│ ●chip   │         │ ●chip            │ ●chip  ●chip           │
├─────────┼─────────┼──────────────────┼────────────────────────┤
│ MAY     │ JUN     │ JUL              │ AUG                    │
│ ●chip   │ ●chip   │ ●chip            │                        │
├─────────┼─────────┼──────────────────┼────────────────────────┤
│ SEP     │ OCT     │ NOV              │ DEC                    │
│         │         │ ●chip            │                        │
─────────────────────────────────────────────────────────────────

01 APR    Start of Year of Assessment        — long description …
02 APR    Profits Tax Returns Issued         — long description …
03 MAY    Employer's Return Deadline         — long description …
…

*Annual reporting timing varies by company incorporation date.
```

## Layout

- **Surface:** `--ov-cream-deep` (`#F0EEE2`).
- **Grid:** `grid-cols-4 grid-rows-3`, 12 cells, calendar-year order
  (Jan → Dec). Months with no events render an empty cell — silence is
  signal here, not absence of design.
- **Borders:** the same hairline language as the old rail
  (`rgba(17, 27, 18, 0.15)`, i.e. ink @15%). Container carries
  `border-top` + `border-right`; each cell carries `border-left` +
  `border-bottom`. Together they paint a clean inner grid with no
  doubled lines.
- **Month label:** top-left of each cell, `12px` uppercase, ink @50%.
  Full name (`January`) at `lg+`, abbreviated (`JAN`) below `lg`.
  Both labels live in the markup; only one is shown per breakpoint via
  CSS. Korean uses `1월`/`1월` at both breakpoints (no abbreviation
  pattern in Korean).
- **Chips:** rounded-full, `12px` text centered, padded `8px 12px`,
  width `100%` of the cell padding box. Multi-line wrap is permitted —
  the chip grows vertically, not horizontally, so cells stay in a
  uniform 4-column rhythm. Each chip carries **only the event name**;
  the description lives in the detail card below.
- **Mobile (`< md`):** the entire grid is hidden. Phone visitors see
  filter buttons + detail cards only. The grid is the desktop reading
  device; on a phone the cards already carry month, event, and
  description in a clean single column.

## Filter buttons

Under the h2, above the grid. The full set lives in
`pageTaxServiceUtils.ts → taxTimeline.categories`:

| Key | Label (EN) | Fill | Text |
|---|---|---|---|
| `all` | All | `--ov-olive` `#627F38` | white |
| `profits` | Profits Tax | `--ov-olive-deep` `#495F2B` | white |
| `salaries` | Salaries Tax | `--ov-olive` `#627F38` | white |
| `employer` | Employer's Return | `--ov-olive-active` `#648E3E` | white |
| `general` | General | `--ov-leaf-pale` `#E5E5BD` | deep olive |

All five colors are within the olive family — the historical
purple / yellow assignments were the F04 violation Decision B cleaned
up. Don't reintroduce them.

**Button states:**
- Inactive: transparent fill, olive border (`--ov-olive`), deep-olive
  text (`--ov-olive-deep`).
- Active: the category's `color` fill, the category's `fg` text, same
  color as border. The "All" button's active state is the mid-olive
  `#627F38` — it doesn't borrow any chip color.
- Hover state is the same color-swap pattern the rest of the brand
  uses (300ms ease). No shadow, no scale, no glow.

## Filtering behavior

- `activeCategory === "all"` → every event is rendered, both as chips
  in the grid and as cards below.
- Any other key → only events whose `category` matches are rendered.
  Months with no matching event render an empty cell; the 4×3
  structure persists.
- The detail cards are **numbered within the current filter result**
  (01, 02, 03, …) — the index resets when the filter changes. This is
  intentional: the numbering communicates "here are the items in this
  view," not a stable global ID.
- Empty-state safety: a "no events in this category" line renders if
  the filter ever returns zero. It can't happen with the current
  category set, but the page should never render an unexplained gap.

## Copy — no placeholder, ever

The detail-card bodies are pulled verbatim from `pageTaxServiceUtils.ts`.
If a future event lands without a description, render the heading and
omit the body, then flag for the founder. Do not invent copy and never
ship lorem ipsum — that was the F01 violation the rebuild fixed.

## Don't

- No multi-hue category colors — olive tints only.
- No lorem ipsum.
- Don't reintroduce the horizontal pill-rail.
- Don't render the grid on phones (`< md`) — it doesn't fit, and the
  cards already cover the same data better in a single column.
- Don't put descriptions in the grid chips. Calendar cells carry only
  the event name; the cards carry the description.
- Don't use this for a non-time sequence — that's Pattern 04.
