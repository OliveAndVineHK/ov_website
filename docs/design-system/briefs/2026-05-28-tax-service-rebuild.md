# Brief — rebuild /tax-service

**Date:** 2026-05-28
**Status:** Ready to build
**Resolves audit findings:** F01, F03, F04*, F05, F06, F07, F08, F09, F11, F13, F16, F17
  (\*F04 is the Accounting hero green; not on this page, but the same lesson applies to the Tax pill colors — see §4.3)
**Reference audit:** `audits/2026-05-28-service-pages-baseline.html`
**Prerequisite:** the §08 grammar in that audit is approved. If it isn't yet, stop and get approval first.

---

## 1. Goal

Rebuild the Tax service page so it becomes the **reference page** for the
whole service-page family — the canonical example the Accounting and
Corporate rebuilds will be measured against. Tax is chosen to go first
because it already has the strongest brand voice (its hero copy is the voice
exemplar) and the most distinctive section (the annual tax-deadline timeline).

"Done" feels like: a founder or finance lead landing on this page understands
what Olive & Vine does on tax, feels the partnership tone immediately, sees a
clear annual rhythm of deadlines, and never sees a placeholder, a shadow, a
blur, or a rainbow of non-brand colors. The page reads as unmistakably the
same firm as the homepage.

## 2. Source map

This build assumes **two folders are mounted together**: this design system,
and the `olive-and-vine-clone-2.0/` codebase.

**Read brand decisions HERE (design system) — the system wins on anything visual:**
- `colors_and_type.css` — all tokens. Copy/import, never re-derive.
- `README.md` §2 (voice), §3 (visual foundations), §4 (iconography).
- `playbooks/` — the section patterns (once authored from the approved grammar).
- `decisions/2026-05-28-b-direction.md` — the hard do-nots. Read rule 6 first:
  **the codebase has drifted; do not copy brand patterns from it.**

**Read content HERE (codebase) — the codebase wins on copy/data:**
- Tax page route: likely `app/tax-service/` (verify with `find . -path '*tax-service*'`).
- Bilingual strings: `app/utils/pageUtils.ts` (verify with
  `grep -rn "tax" app/utils/`). Pull the existing EN/KO Tax copy from here
  rather than retyping from the screenshot — the codebase strings are
  authoritative and already bilingual.
- Service color/accent mapping: `ServiceAccentContext.tsx`
  (verify with `grep -rn "ServiceAccent" app/`).
- Icon exports: `app/utils/icons.ts`.

**If an exact path differs from the above, grep — do not read directories
blindly, and do not read the whole codebase.** One to three targeted reads.

## 3. Section plan

The page is composition `01 → 02 → 05 → 07 → 08` from the approved grammar.
Five body sections, valid per the composition rule.

### 3.1 — Pattern 01 · Split hero with motion object

See `playbooks/section-01-hero.md` for the full pattern. Tax specifics:

- **Layout:** two-column split. Left = reading column, right = motion object.
  Both sit over one full-bleed photograph.
- **Surface:** full-bleed photograph, dark-leaning value so white text reads
  without a scrim. Subject: a desk with a wall/desk calendar marking filing
  deadlines, or hands organizing tax documents — warm, slightly desaturated,
  not slick corporate stock (README §3 imagery). If no suitable photo exists
  yet, flag for the founder and use `--ov-olive-deep` as a temporary solid
  fill — **never** an abstract gradient or texture, which is what the current
  page does (F08).
- **Left column:**
  - Service icon `assets/services/os-tax-w.svg` (white variant) at the top,
    icon-sized (~22px) next to the eyebrow. Currently absent from all service
    pages (F06).
  - Eyebrow `Service · 04 / Tax` (~14px, white/85%, mono or olive-eyebrow style).
  - Headline `Tax` — 96px (`--t-display-xl`), Roboto regular (400), white,
    left-aligned. The current page renders it smaller (F03).
  - Subhead — **KEEP the current copy verbatim**, it is the voice exemplar:
    > "We understand tax's vital role and complexity. With honesty and
    > efficiency, we handle tedious tasks while collaborating closely with
    > you, highlighting key issues for your informed decisions."
    Pull the EN/KO pair from `pageUtils.ts`; do not rewrite.
  - Optional pill CTA ("Start a conversation →").
- **Right column — the motion object:**
  - The founder's custom motion asset, large (right ~40–45% of the hero).
  - **Use the Lottie / JS (vector) export, transparent background.** The mp4
    version has a white background that would show a white box on the dark
    photo. mp4 is fallback only, and only if a transparent version exists.
  - Asset is olive + grey toned; it reads on the dark photo with **no**
    `mix-blend-mode` / scrim / darkening filter. If its grey drifts far from
    `--ov-charcoal` or `--ov-grey-icon`, adjust the asset, not the page.
  - **Motion appears here only.** No body section (3.2–3.5) uses motion.
- **Round-arrow CTA:** the 48–56px `CgArrowTopRight` ring, white border on
  the dark hero (fills white, olive arrow, on hover), bottom-right, linking
  to the contact section (F09).

### 3.2 — Pattern 02 · Two-column explainer ("What we handle")

- **Surface:** white (`--ov-paper`). Replaces the current improvised cream
  section with decorative circles (F13) — drop the circles, they are not in
  the system.
- **Eyebrow:** `What we handle`.
- **Left column:** heading at 28px (`--t-h4`), regular weight — e.g.
  "Three areas, one relationship."
- **Right column:** the three tax sub-areas as a structured list. Each item:
  bold sub-label, then a line of detail. Pull copy from `pageUtils.ts`; the
  current page shows:
  - **Profits Tax** — Profits tax computations, filing & IRD liaison
  - **Salaries Tax** — Salaries tax returns, computations & IRD handling
  - **Tax Advisory** — Offshore claims, tax queries & representative services
- **Bullets:** olive-dot list, not unicode bullets — use a styled `<span>` /
  pseudo-element or a react-icon, never `•` (README §2/§4).

### 3.3 — Pattern 05 · Annual calendar (the timeline)

This is the page's signature section. **Keep the structure, fix three things.**

- **Surface:** `--ov-cream-deep` (`#F0EEE2`) to set it apart from the white
  explainer above.
- **Month rail:** DEC · MAR · APR · MAY · AUG, evenly spaced, hairline
  vertical separators (`--ov-ink-15`).
- **Pill markers — FIX THE COLORS (this is the key correction):** the current
  page uses purple / dark-green / yellow / green — four *different hues*. This
  violates the single-hue brand rule (README §3). Recolor all pills to **tints
  of the one olive hue, sequenced by lightness** per
  `playbooks/section-05-calendar.md`:
  - 1 (earliest) `--ov-leaf-pale` `#E5E5BD` (deep-olive text)
  - 2 `--ov-olive-active` `#648E3E`
  - 3 `--ov-olive` `#627F38`
  - 4 (latest) `--ov-olive-deep` `#495F2B`
  Differentiate by lightness within the olive family, never by switching hue.
  The number badges below match their pill's tint.
- **Numbered detail cards below the rail:** number badge (olive-tint circle,
  same family), Korean heading, short factual body. The four headings on the
  current page are: 회계 결산 · 고용주 신고 · 소득세 신고 · 세무 신고.
- **REMOVE the lorem ipsum (F01 — blocker).** The current body text under each
  card is repeating placeholder ("회계 결산 회계 결산회계 결산…"). Replace with
  real copy from `pageUtils.ts` if it exists there; if it does not exist,
  **do not invent it** — leave the heading and number, omit the body, and
  flag clearly in the build summary that the founder must supply four short
  Korean/English descriptions. Shipping placeholder again is the one
  unacceptable outcome.
- **Footnote:** keep `*연차보고는 회사의 설립일에 따라 상이` (small, `--ov-ink-50`).

### 3.4 — Pattern 07 · Related services

- Three `ServiceCard` tiles from `ui_kits/website/` — do not rebuild the card,
  reuse it. Surface cream-card, olive border, NE-corner-rounds-to-30px on
  hover with full olive fill and white text + icon swap (the signature
  gesture, F07).
- For Tax, the three most relevant siblings are **Accounting**, **Corporate
  service**, and **Consulting**. Pull their titles/descriptions/icons from the
  same source the homepage services grid uses.
- This resolves F17 (no in-body path to other services).

### 3.5 — Pattern 08 · Universal closing

- **Insights row:** existing kit component. If tax-tagged insights exist,
  filter to those; otherwise the standard three.
- **Contact panel:** the existing green "We're here to answer any questions"
  `QuestionsForm` — do not modify it. It is the strongest shared surface on
  the site; leave it identical to every other page.
- **Footer:** existing dark charcoal footer, unmodified.

## 4. Content

| Where | Status |
|---|---|
| Hero headline + subhead (EN/KO) | Exists in `pageUtils.ts` — pull, don't rewrite |
| Three tax sub-areas (EN/KO) | Exists in `pageUtils.ts` — pull |
| Timeline month labels | Static (DEC/MAR/APR/MAY/AUG) |
| Timeline card headings (KO) | Exists: 회계 결산 / 고용주 신고 / 소득세 신고 / 세무 신고 |
| **Timeline card bodies (KO + EN)** | **MISSING — currently lorem ipsum. Pull from `pageUtils.ts`; if absent, flag for founder. Do NOT invent.** |
| Related-services card copy | Reuse homepage services copy |
| Everything in the closing block | Reuse existing components verbatim |

## 5. Constraints (the lint)

Restated inline so you don't have to cross-reference. These mirror what
`rules/forbidden.json` will automate later. Per
`decisions/2026-05-28-b-direction.md`:

- **No** `box-shadow`, `text-shadow`, `backdrop-filter`, `mix-blend-mode`,
  or `linear-gradient` scrim overlays. Hover = color swap + NE corner
  gesture only.
- **No** italic as a brand emphasis pattern.
- **No** abstract-gradient or texture hero. Photograph or solid olive only.
- **No** non-olive hues. Every color is a tint of the one olive hue, plus
  ink / cream / charcoal / paper from the tokens. (This is the timeline pill
  fix.)
- **No** unicode glyph icons (`•`, `→`, `✓`). react-icons SVG components only.
- **No** emoji.
- **No** placeholder text shipped. Ever.
- **Sentence case** throughout (except the "Olive & Vine" wordmark).
- **Bilingual:** every user-facing string has an EN and KO half.

## 6. Acceptance criteria

- [ ] Hero uses a photograph (or temporary solid olive), white 96px headline,
      `os-tax-w.svg`, eyebrow, partnership subhead from `pageUtils.ts`, and a
      round-arrow CTA. (F03, F05, F06, F08, F09)
- [ ] Explainer is white, two-column, olive-dot list, no decorative circles. (F13)
- [ ] Timeline pills are all tints of one olive hue — no purple/yellow. (F04 lesson)
- [ ] Timeline shows zero placeholder text; missing bodies are flagged, not faked. (F01)
- [ ] Related-services row uses the real `ServiceCard` with the NE corner
      hover gesture. (F07, F17)
- [ ] Closing block (insights / contact / footer) is byte-identical to other pages.
- [ ] Eyebrows introduce each section. (F16)
- [ ] A grep for `box-shadow|text-shadow|backdrop-filter|mix-blend-mode` in the
      new page's styles returns nothing.
- [ ] A grep for non-olive hex colors outside the token file returns nothing
      unexpected.
- [ ] Page renders correctly in both EN and KO with the font swap.

## 7. Out of scope

- The shared `Header`, `QuestionsForm`, and `Footer` components — reuse,
  do not modify. Changing a shared component to suit one page is how drift
  starts.
- The Accounting and Corporate pages — they come after, measured against
  this one.
- The `playbooks/` files themselves — if a pattern needs adjusting mid-build,
  stop and amend the playbook deliberately, then resume.
- Authoring the missing Korean timeline copy — that is the founder's, not
  the builder's.

---

*Paste this file as the first message of a Claude Code session with both the
design system folder and `olive-and-vine-clone-2.0/` mounted. The builder
should read §2 source map first, then `decisions/2026-05-28-b-direction.md`,
then proceed section by section.*
