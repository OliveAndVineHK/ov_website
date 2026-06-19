# Patterns 06 · 07 · 08 — principle, related services, closing

These three are grouped because 06 is simple and 07–08 reuse existing
components rather than introducing new design.
**Confirmed:** 2026-05-28, founder review (all three approved together).

---

## Pattern 06 — Quote / principle

**Role:** the "why we do this" moment. Optional, once per page, between the
explainer and the detail section.
**Source:** new — drawn from the README voice (the "Integrity · Partnership
· Clarity" register), not from any existing page.

### Anatomy
- Full-bleed dark surface, `--ov-charcoal #282A28`.
- A single line of 36–48px text, Roboto regular (or light), white.
- Partnership voice, em-dash clauses. No image, no decoration.

### Copy
- One sentence or one short clause. The principle, not a paragraph.
  e.g. *"We don't just file — we sit with you and view each issue from
  every angle."* Pull or adapt from `pageUtils.ts` / README exemplars.

### Don't
- No image, no circle motif, no list. This section is one line of text on
  dark. Its power is its restraint.

---

## Pattern 07 — Related services

**Role:** the last body section before the closing. Required.
**Source:** the existing `ServiceCard` component in `ui_kits/website/`.

### Anatomy
- Three `ServiceCard` tiles in a row.
- Each tile: cream-card surface, olive border, service icon. On hover:
  full olive fill, text + icon invert to white, the NE corner rounds to
  30px (the signature gesture, via the dual-icon opacity swap — not a CSS
  filter).
- Pulls in the three most relevant sibling services. For Tax:
  **Accounting · Corporate service · Consulting**.

### Reuse, don't rebuild
This is the kit component. Do not author a new card. Pull titles,
descriptions, and icons from the same source the homepage services grid uses.

### Don't
- Don't modify the shared `ServiceCard`. Reuse as-is.

---

## Pattern 08 — Universal closing

**Role:** the fixed end of every service page. Required, always last.
**Source:** the existing closing block, identical across all current pages.

### Anatomy (three existing components in order)
1. **Insights card row** — the existing kit component. If tax-tagged
   insights exist, filter to them; otherwise the standard three.
2. **Contact panel** — the green "We're here to answer any questions"
   `QuestionsForm`. The strongest shared surface on the site.
3. **Footer** — the dark charcoal footer.

### Never edited per page
This block is byte-identical on every page. Changing a shared component to
suit one page is how drift starts (see `decisions/2026-05-28-b-direction.md`).
The only per-page variation permitted is the insights filter in step 1.

### Don't
- Don't modify `QuestionsForm` or the footer for a single page.
- Don't reorder the three sub-blocks.
