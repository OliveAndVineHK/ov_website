# Pattern (about cluster) — Full profile

**Role:** the rich profile page for one leader. Linked from each
founder card on `/leadership` via "Full profile →".
**Confirmed:** 2026-05-29, founder review (resolves the open question
in `decisions/2026-05-29-about-cluster.md`).

## Anatomy

A long-form personal page: hero with the founder's photograph and name,
then a body that includes the career timeline (which was removed from
the leadership card per Decision 0529, and lives only here).

```
/leadership/[slug] :
   01 hero (about pattern · founder photo + typewriter cycling
            their career companies)
   ── name + role + credentials + long bio
   ── career timeline (horizontal rail, olive tints lightest → deepest)
   ── "Back to Our Leadership" link
   08 closing (insights + QuestionsForm + footer via layout)
```

## Sections

### Hero
- Uses the about-cluster `Pattern 01` — primary (photo carrier).
- The founder's portrait fills the hero (`image` or `imageHover` from
  the data file). Dark-leaning crop; if not available, fall back to
  the cream + typewriter pattern.
- Typewriter cycles **the founder's career companies in order**, e.g.
  Rebecca: `PwC · IL Shin · Olive & Vine`.
- Headline: the founder's name. Eyebrow: `Co-Founder` or role.

### Long bio
- The `bio` field (multi-sentence) rendered as one or two paragraphs.
- Partnership voice, restrained.

### Career timeline
- A horizontal rail with markers, one per role from the founder's
  `career` array. Last item is `current: true`.
- **Reuses the mechanics of Pattern 05 calendar** — the rail + marker
  language is already in the system; only the data shape differs.
- **Recolored to olive tints** lightest → deepest along the rail:
  earliest role = `--ov-leaf-pale`, mid roles step through
  `--ov-olive-active` and `--ov-olive`, the *current* role (Olive &
  Vine) gets the deepest tint `--ov-olive-deep` and the largest marker.
- Per row: company, role, location.
- Hidden below `md` — on phone, the timeline collapses to a vertical
  list of `company · role · location` lines (same content, simpler
  layout).

### "Back to Our Leadership" link
- Small pill or text link, before the closing block, top or bottom
  margin to feel intentional.

### Closing block
- Insights row (filtered to the firm's general insights — there's no
  "founder tag" yet, so the standard three) + the shared `Footer`
  (renders QuestionsForm + dark chrome).

## Don't

- No video / autoplay on the founder portrait. Direction B prohibition
  stands. If a single hover-to-alt photo swap is desired, that's an
  HTML hover effect (the existing data already supports it via
  `imageHover`).
- No bullet glyphs (`•`, `→`) — the timeline rail uses real geometry
  (small filled circles) and the back-link uses a `react-icons` arrow.
- Don't duplicate this page's content on `/leadership` — the leadership
  card is intentionally a thumbnail-only teaser; richness lives here.
- Don't reintroduce a stat strip (the rejected pattern from Decision
  0529 — unverifiable client-count numbers).

---

*Future expansion (out of scope now):* if the firm adds non-founder
profiles (advisors, senior associates), the same pattern reuses for
them with the same data shape.
