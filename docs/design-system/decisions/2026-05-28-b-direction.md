# 2026-05-28 — Direction B: bring the example homepage back to the system

**Status:** Active · this is the working direction until superseded
**Decided by:** [founder] with Claude
**Affects:** all in-flight pages, the example `site.html` files, future page generation

---

## Context

The design system was authored from a reverse-engineering of the live Next.js codebase
(`olive-and-vine-clone-2.0`) — there was no Figma, no slide deck, no prior style guide.
The system landed on a clear visual identity: warm photographic heroes, single olive
hue, near-black ink, no shadows, no blur, no scrim filters, color-swap hovers, a
signature top-right corner gesture, Roboto throughout, em-dash voice.

While iterating on the system, a parallel example page (`Olive and Vine - Site.html`)
was built to "demonstrate the system on a homepage." During audit, the example was
found to violate several explicit rules from the system's own README:

- `text-shadow` used on the hero headline — README §3 prohibits shadows
- `backdrop-filter: blur(8px)` on the sticky header — README §3 prohibits frosted-glass
- `mix-blend-mode: multiply` + `linear-gradient` scrims on the hero video — README §3
  prohibits darkening filters in favor of color-swap
- SVG noise grain overlay — README §3 prohibits textured paper
- Italic emphasis used as a brand pattern in headlines, client names, and stats —
  not in the system; the README states Roboto carries the entire visual identity
  without serif or italic emphasis
- Editorial agency tone — `[ 00 ]` mono-font section numbers, `SINCE 2014 · ACCT,
  TAX, AUDIT` ticker copy, "Cathay Provisions Group" / "Hansol Capital Partners"
  fictional client names — none of this is in the system, and the system's voice
  is "warm, principled, partnership-first," not "editorial agency portfolio"

The drift was not malicious — it was the predictable failure mode of generating
without a strict gate. "Looks cool" beat "matches the system."

## The choice

**B — Bring the example page back to the system.**

- The example was a *demonstration*, not a *redirection*. It does not represent
  a new desired direction.
- The design system, as written, is the canonical brand. The README's discipline
  (no shadow, no blur, no scrim, no italic-as-pattern, partnership voice) is to
  be preserved.
- The example page will be redone — same copy, same structure, same ambition —
  with the violating treatments removed: photographic hero in place of video,
  color-swap hovers in place of blend filters, partnership copy in place of
  agency tickers, no italic emphasis as a recurring device.

## What was also considered

**A — Update the system to match the new direction.** Rejected. The new
direction (editorial agency portfolio) would suit a creative studio, not a
Hong Kong accounting & advisory firm. The system's voice and visual restraint
match the actual business; the example was visual ambition outrunning that
match.

**C — Allow two modes (standard vs. statement pages).** Rejected for now.
A two-mode system is the hardest to govern — the boundary between modes
becomes the source of all future drift. If a clear statement-page need
emerges later (e.g. for a refreshed `/about` landing), it can be re-opened
as a deliberate addition with its own playbook.

## What B means concretely

Going forward, any page generated against this design system:

1. Does not use `text-shadow`, `box-shadow`, `backdrop-filter`, `mix-blend-mode`,
   or `linear-gradient` scrims. Hover state is communicated by color swap and
   the NE corner gesture, never by darkening, blurring, or shadowing.

2. Does not use italic as a brand emphasis pattern. Italic is allowed only
   where Roboto's italic naturally appears in editorial body copy (e.g. a
   book title); it is not a recurring headline device.

3. Uses photographic heroes from the documented imagery vibe — "warm, golden,
   slightly desaturated; olive groves, hands writing in notebooks, abstract
   organic textures; not corporate stock photography." Video heroes are not
   in the system.

4. Speaks in the voice the README documents: partnership-first, em-dash
   clauses, "we" to "you," sentence case, no `[ 00 ]` mono labels as a
   pattern, no invented client names, no fictional ticker copy.

5. When a page requires a section type that does not exist in the system,
   the section is added to the system (with rules) *before* it appears on
   a page. New patterns are promoted to the playbook deliberately, not
   improvised on the page and then post-hoc explained.

## Implications

- **`site.html` / `Olive and Vine - Site.html`** — both are now historical
  artifacts. Useful as records of "what the system can drift into." Do not
  reference as exemplars.
- **The three live service pages** (`/corporate-service`, `/accounting-service`,
  `/tax-service`) — to be audited against the system. First audit:
  `audits/2026-05-28-service-pages-baseline.html`.
- **Future page generation** — must produce both a page *and* an audit doc
  showing how it scores against the system. The audit doc is what the
  taste gate (founder review) consumes.
- **The system itself** — gains three new top-level folders alongside the
  existing structure:
  - `rules/` — machine-readable forbidden / required patterns
  - `playbooks/` — page-type grammars
  - `audits/` — the audit format and accumulated audit results
  - `decisions/` — this file and its successors

## Open questions to revisit

- **Tax page timeline** — is this a one-off element, or should it be promoted
  to a documented pattern in `playbooks/`? Decision deferred until the Tax
  page is rebuilt.
- **Corporate page lifecycle (Start Up / In Business / Exit)** — same question.
  This is a genuinely useful 3-column pattern that could become a named
  playbook section.
- **Site-wide hero treatment** — the system describes hero heights and imagery
  but does not specify whether service pages get *the same* hero photo
  treatment or *service-specific* photography. To be decided per playbook.

---

*This file is the canonical record of Direction B. If a future decision
supersedes it, link forward from here rather than editing — decisions are
append-only.*
