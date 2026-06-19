# 2026-05-28 — Decision F: calendar redesign — 4×3 month grid with category filter

**Status:** Active · supersedes the "horizontal pill-rail" form of Pattern 05
in `playbooks/section-05-calendar.md` (now updated).
**Decided by:** [founder] with Claude, during the Tax page rebuild
**Affects:** `playbooks/section-05-calendar.md`,
`app/utils/pageTaxServiceUtils.ts`,
`app/tax-service/page.tsx`

---

## Context

The first rebuilt Tax calendar (Decision B brief implementation) used
a horizontal rail with month labels and pill markers placed in
chronological order, with detail cards beneath. On review:

1. The rail's pills were not uniform in shape — chips with longer
   labels stretched horizontally and broke the rhythm; the founder
   described it as "floppy."
2. The rail couldn't communicate empty months at all (it just skipped
   to the next event), so visitors couldn't see *when in the year*
   the workload sits.
3. The chronological-tint pill system encoded "earliness" rather than
   "category." The page's actual reading task is "which kind of
   filing is this?", not "is this earlier or later?".
4. The categories in the data file still carried purple (`#B08FCA`)
   and yellow (`#B5A332`) values from the pre-Direction-B era, even
   though the rebuilt rail wasn't using them. That trap was waiting
   for the next reuse.

The founder also recalled that an earlier iteration of the live page
had **filter buttons** that swapped what was visible, and asked to
bring that interaction back — applied to both the calendar and the
detail-card list.

## The choice

**F — Replace the horizontal pill-rail with a calendar-year 4×3
month grid; add category filter buttons that drive both the grid
chips and the detail cards from the same `activeCategory` state.**

Concretely:

- **Grid:** 12 cells, Jan → Dec, four columns × three rows. Each
  cell carries its month label top-left and stacks any matching
  events as rounded-full chips below. Empty months render as empty
  cells — silence becomes signal, not absence of design.
- **Borders:** the same `rgba(17,27,18,0.15)` hairlines the previous
  rail used. Container = top + right; cells = left + bottom. Clean
  inner grid, no doubled lines, no new border vocabulary introduced.
- **Filters:** All / Profits Tax / Salaries Tax / Employer's Return /
  General — every label and color lives in
  `pageTaxServiceUtils.ts → taxTimeline.categories`. All five colors
  are within the olive family; the off-brand purple and yellow are
  removed in the same commit.
- **Chip color = category color.** The previous chronological-tint
  scheme is dropped. The grid's reading task is "what kind of
  deadline is this?", and the chips now answer that directly. When
  filtered, all visible chips share one color; in "All" view, four
  colors map cleanly to four categories.
- **Mobile (`< md`):** the grid is hidden entirely. Phone visitors
  see filter buttons + detail cards only.
- **Detail cards** are numbered within the current filter result
  (01..N), not against the global event list — the index resets
  when the filter changes.
- **Month labels:** "January" at `lg+`, "JAN" below `lg`. Both labels
  live in the markup; CSS reveals the right one per breakpoint. Korean
  uses `1월` at both breakpoints (Korean has no equivalent abbreviation
  pattern).

## What was also considered

**Keep the rail, fix the pill shapes.** Rejected. The shape problem
was a symptom; the real issue was that a chronological rail can't
communicate empty months and pushes the wrong reading task ("when?"
instead of "which kind?").

**Use a fiscal-year grid (Apr → Mar).** Rejected. The HK tax year
*is* April-anchored, but a visitor's mental model of "a year" is
January-anchored. The first cell being January reads as "the year";
the first cell being April reads as a quiz. The event chips already
carry the precise month, so calendar-year ordering doesn't lose any
information.

**Render the description inside the calendar chip.** Rejected. The
grid's job is summary; the cards' job is detail. Cramming both into
the chip breaks the 4-column rhythm the moment a chip wraps to
seven lines.

**Show the grid on mobile too, scaled down.** Rejected. A 12-cell
grid below 768px collapses into either a 1×12 column (which is just a
worse version of the existing card list) or a 2×6 grid (which loses
the calendar metaphor entirely). The cards already carry the same
data in a clean mobile-first form; the grid is the desktop reading
device.

## Implications

- `pageTaxServiceUtils.ts` — categories rewritten with olive-only
  colors + `fg` text colors; each event gets a `monthIndex` (0-based
  Jan→Dec) so the grid can place it without parsing strings.
- `playbooks/section-05-calendar.md` — fully rewritten around the
  new pattern. The horizontal rail is now historical.
- `app/tax-service/page.tsx` — calendar section refactored to the
  new design; the chronological `tintFor()` helper and the unused
  `calendarItems` const are removed.
- Corporate page (and any future deadline-driven service) — uses
  the same pattern, only the data source changes.

---

*Append-only. If a future decision supersedes this, link forward from
here rather than editing.*
