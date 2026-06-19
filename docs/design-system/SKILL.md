---
name: olive-and-vine-design
description: Use this skill to generate well-branded interfaces and assets for Olive & Vine — a Hong Kong accounting & advisory firm — for production or throwaway prototypes/mocks/decks/etc. Contains essential design guidelines, the olive-green color system, Roboto/Noto Sans KR typography, brand assets, and pixel-faithful UI kit components for prototyping the marketing site.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. Key entries:

- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — all design tokens (CSS custom properties) — copy into any new artifact
- `assets/` — logos (`logo.png` dark on cream / `logo-w.png` for dark surfaces), service line-icon SVG pairs (default + `-w` for hover-over-olive), hero photography, leadership portraits, insight thumbnails
- `fonts/` — local Roboto family TTFs (regular + Condensed + SemiCondensed, weights 100–900, italics included). Loaded via `fonts/_faces.css`, which is `@import`-ed by `colors_and_type.css`.
- `ui_kits/website/` — JSX component recreations of the marketing site (Header, Footer, ServiceCard, InsightCard, AccordionItem, PillButton, RoundIconButton, QuestionsForm…) plus `index.html` that wires them into a clickable homepage
- `preview/` — small specimen cards used in the design-system pane (palette swatches, type ramps, button states, component clusters)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/`, link `colors_and_type.css`, and create static HTML files for the user to view. The brand reads bilingually (English / Korean) — when in doubt mirror the EN/KO toggle pattern from the website.

If working on production code, treat this as the source of truth for color, type, spacing and motion. The original codebase is Next.js 16 + Tailwind v4 + react-icons.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Quick brand cheat-sheet** (full detail in README.md):
- Primary olive: `#495F2B` (deep, brand) / `#627F38` (medium, eyebrows & accents) / `#436A1F` hover / `#648E3E` active
- Ink: `#111B12` (headings) with 70 / 50 / 30 % opacity tiers for body / muted / hairline
- Surfaces: `#FFFFFF` paper, `#F9F8F3` cream menu, `#F0EEE2` cream deep, `#282A28` charcoal footer
- Hover wash: `#E5E5BD` at 50% over imagery; topic tag bg `#F1F1DD`
- Type: Roboto everywhere (Roboto Condensed / SemiCondensed also shipped for tight or display use); Noto Sans KR for `lang="ko"`; no display serif
- Signature gesture: card hover sets `border-top-right-radius` to `30px` (or `300px` on insight imagery) — a sharply-rounded NE corner; never use uniform pill cards
- Buttons are pill-shaped with hairline olive borders that fill olive on hover
- A `<CgArrowTopRight>` (react-icons/cg) sits inside a 48–56px ring as the universal "go" affordance
- Voice: warm, principled, partnership-first; long descriptive sentences; uses em-dashes; sentence case (almost never SCREAMING); first person plural ("we") talking to "you" the client; never emoji

## Working folders (read these before building or auditing)

This design system now includes process folders alongside the brand files.
Before doing any page work, read in this order:

1. `decisions/` — read the three most recent files. These capture in-flight
   direction (e.g. the current "Direction B") that may not yet be reflected
   elsewhere. Decisions are append-only; the newest wins.
2. `playbooks/` — the section-pattern grammar. `playbooks/README.md` gives
   the composition rules; `section-01`…`section-08` define each pattern with
   its invariant rules and permitted ranges. A service page is built only
   from these patterns.
3. `briefs/` — if a brief exists for the page you're building, it is the
   spec. Follow it section by section.
4. `rules/forbidden.json` + `rules/lint.sh` — run the lint on any page you
   generate or edit, before considering it done.
5. `audits/` — past audits show how pages have drifted and converged.

If a page needs a section type not in `playbooks/`, stop: add it to the
playbook (with rules) and get it reviewed before putting it on a page.

## When the codebase is mounted alongside this system

If `olive-and-vine-clone-2.0/` is mounted together with this design system:

- The **codebase is the source of truth for content and copy** — read real
  bilingual strings from `app/utils/pageUtils.ts` (and related `page*Utils.ts`),
  page structure from `app/{service}-service/`, service mapping from
  `ServiceAccentContext.tsx`, icons from `app/utils/icons.ts`. Grep for exact
  paths; do not read directories blindly or the whole tree.
- This **design system is the source of truth for brand and visual decisions**
  — color, type, spacing, motion, hover, the section grammar.
- **The codebase has drifted from the system** (it contains shadows, blurs,
  and other patterns the system prohibits). When the two disagree on a visual
  or brand decision, the system wins. Never infer a brand pattern from the
  codebase — read it here.

See `decisions/2026-05-28-b-direction.md` rule 6 for the canonical statement.