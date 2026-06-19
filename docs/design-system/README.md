# Olive & Vine — Design System

A complete design reference for **Olive & Vine**, a Hong Kong‑based accounting and advisory firm. This system captures the visual, typographic and content language used across the bilingual marketing site (EN / KO) and provides ready‑to‑drop tokens and components for new work.

> *"Delivers pragmatic accounting and advisory solutions, providing clarity, compliance, and actionable insight for businesses."* — from the homepage About section.

## Index

| File / Folder | What it holds |
|---|---|
| `README.md` | this overview — brand, content, visuals, iconography |
| `colors_and_type.css` | every design token as CSS custom properties + semantic helper classes |
| `SKILL.md` | machine‑readable entry point (Agent Skill compatible) |
| `assets/` | logos, service icons, hero photography, founder portraits, insight thumbnails |
| `ui_kits/website/` | JSX component recreations of the marketing site + clickable `index.html` |
| `preview/` | specimen cards rendered in the Design System tab |

## Sources

- **Codebase:** `olive-and-vine-clone-2.0/` — Next.js 16 + React 19 + Tailwind v4 + Emotion / MUI / react-icons. Mounted as a read‑only local folder for this build.
- Live deploy referenced in `next.config.ts`: `https://test.oliveandvinehk.com` (and `https://oliveandvinehk.com` in production).
- No Figma file was provided. No slide deck was provided.

---

## 1. The company

Olive & Vine is an accounting and advisory firm in Quarry Bay, Hong Kong (Room 580, Level 5, K11 Atelier, 728 King's Road), founded by **Rebecca PARK Ji Hyun** and **KIM Mi Young**. Between them they trained at PwC, Kakao, BNP Paribas, MetLife and Chubb across Korea, Singapore, Sydney and Hong Kong — the firm leans on that *Big 4 + global financial institution* pedigree as a credibility anchor.

The site is **bilingual** (English / Korean) — every string in `pageUtils.ts` exists in `en` and `ko` and the header has a 1‑click language toggle that swaps the body font from Roboto to Noto Sans KR.

### Products / surfaces represented

This codebase is a **single product**: the public marketing website. It has the following top‑level routes:

- `/` Home — typewriter hero, About, Services grid, Portfolio cards, Integrity headline, Featured Insights, Compliance strip
- `/about`, `/our-values`, `/leadership` — founder bios, values pillars, leadership profiles with career timelines
- `/services` — accordion of six service lines
- `/{service}-service` for `accounting`, `tax`, `corporate`, `consulting`, `hr`, `assurance` — each its own deep page
- `/insights` and `/insights/[tag]` — filtered article grid + tag landing pages
- `/contact`, `/subscribe`

The six service lines are: **Corporate Service · Accounting · Assurance · Tax · Consulting · HR**. These are the spine of the IA and every page navigates back to them.

---

## 2. Content fundamentals

**Tone.** Warm, principled, partnership‑first. Reads more like a relationship statement than a sales pitch. Sentences are long and descriptive; the writer prefers em‑dashes ( — ) to break clauses. Confidence without bravado.

**Voice.** First person plural ("we", "our") addressing "you" the client. The "we" is the firm; "you" is a founder, finance lead, or owner of a small / mid‑sized Hong Kong business. Examples:

- "We are here to centric approach focuses on building long‑term relationships and delivering exceptional service."
- "We do not only provide simple opinion. Instead, we target to provide you insights."
- "We will sit with you to view the issue from different angles."

(Note: the copy is occasionally rough — written by non‑native English speakers, then translated. Mirror this energy when extending — clear, slightly formal, never aggressively marketing‑slick. Korean copy is the more polished register; English mirrors it sentence‑for‑sentence.)

**Casing.** Sentence case throughout — titles capitalise only the first word and proper nouns. Examples from the homepage: *"Our Services"*, *"Featured news & Insights"*, *"We're here to answer any questions"*. The wordmark **"Olive & Vine"** is the rare exception — capitalised, with the ampersand. Service badges in `ServiceAccentContext` use `ACCOUNTING` / `STRATEGIC CONSULTING` etc. uppercase, but these only appear as small badge text on service hero pages — not as headings.

**Pronouns.** Always *we / our / us* (firm) and *you / your* (client). Never "the team", "the company", or third person.

**Em‑dashes.** Frequent and intentional — used to introduce a clarifying clause rather than parentheses. Don't substitute hyphens.

**No emoji.** Zero. The site uses zero emoji in product copy or UI. Don't add them.

**No unicode glyphs as icons.** The site uses react‑icons SVG components for every glyph (arrows, chevrons, plus / minus, check, social). Never substitute `→`, `✓`, `★`, etc.

**Numbers / stats.** Used sparingly and only with a label. The about page exposes `25+ Years of Experience`, `500+ Clients Served`, `HK Focused Practice`, `Big 4 Trained Alumni`. Don't invent stats; if a number isn't in the source copy, leave it out.

**Bilingual strings.** Every user‑facing string in the codebase is an object `{ en: "...", ko: "..." }` selected on `language === "KOR"`. When creating new content, write *both* halves — even if the artifact ends up English‑only, this matches their model.

**Examples of voice (verbatim from `pageUtils.ts` / `pageAboutUtils.ts`):**

- Hero typewriter: *"Building" → "Empowering" → "Partnerships"* (cycles through three words; the Korean cycles through `구축 → 역량 강화 → 파트너십`).
- Integrity section three‑word headline: *"Integrity · Partnership · Clarity"* — these three nouns are the rhetorical pillars.
- CTA: *"Ready to Get Started? Let our experienced team help you navigate your business needs with confidence."*
- About page tagline: *"Partnership Beyond Numbers"* / *"In Hong Kong's financial landscape, we're the firm that listens first, advises with integrity, and grows alongside our clients."*
- Pillar names: *"Trust is Non‑Negotiable" · "Excellence, Always" · "Growth Together"*

---

## 3. Visual foundations

### Color

A single olive‑green hue is the entire brand. There are no secondary brand colors — `ServiceAccentContext.tsx` maps all six service lines to the *same* primary `#495F2B` and secondary `#627F38`, which means the brand never fragments by service.

| Token | Hex | Use |
|---|---|---|
| `--ov-olive-deep` | `#495F2B` | logo wordmark, service page heroes, primary fills |
| `--ov-olive` | `#627F38` | eyebrow labels ("About Us", "Expertise"), borders, sub‑accents |
| `--ov-olive-hover` | `#436A1F` | button hover background |
| `--ov-olive-active` | `#648E3E` | button pressed / active background |
| `--ov-ink` | `#111B12` | body and headings (a green‑tinted near‑black, not pure `#000`) |
| `--ov-charcoal` | `#282A28` | footer + compliance strip |
| `--ov-cream` | `#F9F8F3` | header menu overlay |
| `--ov-cream-card` | `#F9F8F4` | service card base background |
| `--ov-cream-deep` | `#F0EEE2` | assurance + consulting section backgrounds |
| `--ov-leaf-pale` | `#E5E5BD` | the *signature* hover wash — applied at 50% opacity over imagery |
| `--ov-tag-bg` | `#F1F1DD` | sub‑tag pills on insight cards |
| `--ov-grey-bg` | `#EFEFEF` | compliance / disclosure strip background |

**Tints** are done via `/N` opacity utilities (`text-[#111B12]/70`, `border-[#111B12]/50`, `bg-white/30`) — never by mixing or shading. Stick to opacity tiers of 30 / 50 / 70 / 80.

### Type

- **Roboto** (regular, **Condensed**, **SemiCondensed**) ships locally in `fonts/` as a single variable‑axis TTF (`Roboto-VariableFont_wdth_wght.ttf`) covering the full 100–900 weight range and 75–100 width range, with italic counterpart and matching static fallbacks. The Latin body face for everything. The marketing site uses the regular width throughout; the narrower widths are available for tight layouts and display moments.
- **Noto Sans KR** ships locally too (nine static weights, `100–900`). Loaded when `<html data-lang="KOR">`.
- **Geist** + **Geist Mono** are imported by `next/font` but never used in visible UI — they exist as CSS variables `--font-geist-sans` and `--font-geist-mono` for future use.

There is **no display serif**. There is **no display script**. Roboto carries the entire visual identity.

Weights actually used: `300 Light` (CTA section H2), `400 Regular` (default headings — yes, headings are *regular* weight at large sizes), `500 Medium`, `600 SemiBold` (eyebrows). Bold is reserved for the wordmark and the language toggle.

Type scale (lifted from explicit `lg:text-[Npx]` overrides in JSX):
- `48px` section H2  ·  `36px` portfolio card  ·  `32px` service card  ·  `28px` accordion  ·  `26px` insight card  ·  `24px` body lead  ·  `20px` eyebrow  ·  `18px` insight tag  ·  `16px` body  ·  `15px` button  ·  `14px` small / footer  ·  `13px` sub‑tag

Letterspacing is left at Roboto's default; the only deliberate tracking is the inherited tightness on the 8xl hero.

### Backgrounds & imagery

- **Hero pages** use a single full‑bleed photographic image (`/home/home-bg.png`, `/about/bg-about.png`, `/value/bg-value.png`, `/insights/insight-bg.png`). The hero element is a fixed‑height container (`.hero-background`) with `background-size: cover; background-position: center;` and a height ramp `260 → 500 → 700px` across breakpoints.
- Imagery vibe is **warm, golden, slightly desaturated** — olive groves, hands writing in notebooks, abstract organic textures. Not corporate stock photography.
- **Section backgrounds** also use illustrations: `home/about-us.png`, `home/integrity.png` (the integrity section is photo‑backed with white text — protection by image darkness, no gradient overlay), `home/questions-bg.svg` (a green textured panel behind the contact form).
- **Portfolio cards** are full‑bleed background‑images (`business-growth.svg`, `mission-driven.svg`, `regional-operations.svg`, `new-ventures.svg`) — each card *is* the artwork; the title and body sit at the bottom‑left over the image. On hover the image scales `1 → 1.1` over 300ms.
- **Service section backgrounds** (`assurance-section-bg`, `consulting-section-bg`) sit on a `#F0EEE2` cream and overlay a single SVG via `background-image` — only at `≥ 640px`.

### Hand‑drawn / illustration

No hand‑drawn illustration. No repeating pattern. No textured paper. No gradient *background* on UI surfaces — the only gradient image in the entire codebase is `/services/gradient.png` used as a hero. Avoid inventing them.

### Corner radii — the signature gesture

The brand's most identifiable trait. Cards animate one corner — the **top‑right** — from `0` to a large radius on hover.

- Service cards: `0 → 30px` (`hover:rounded-tr-[30px]`)
- Insight cards (and the image inside them): `0 → 300px` — a dramatic, almost‑circular bevel that crops the photograph
- Accordion rows (open state): `0 → 30px`

Everywhere else: **square corners by default**. The only fully‑rounded elements are pill buttons, the toggle‑menu hamburger circle, dot navigation, and the CgArrowTopRight CTA rings. Cards, sections, inputs, accordions — all start with `border-radius: 0`.

### Borders

- `1px solid #627F38` — olive hairline on idle service cards
- `1px solid rgba(17,27,18, 0.5)` — ink @50% — outlines for pill buttons, accordion rows when closed, round arrow buttons
- `1px solid rgba(255,255,255, 0.3)` — white @30% — on dark‑section dividers and footer hairlines
- Bottom‑border only on form inputs (`border-b border-white/30`, focus → solid white)

### Shadows

**None.** This is unusually disciplined for a contemporary site — there are no `box-shadow`s on cards, no elevation system, no drop shadows on imagery, no glow effects. Hover state is communicated entirely through *color washes* and the *rounded‑corner gesture*, never shadow. If you find yourself adding `box-shadow:`, stop — it's off‑brand.

### Hover & press states

- **Pill buttons** (idle: white background, ink hairline border, 70% ink text)  
  → hover: `bg-[#436A1F] border-[#436A1F] text-white`  
  → active: `bg-[#648E3E] border-[#648E3E] text-white`  
  All over 300ms `ease`.
- **Service cards** (idle: cream `#F9F8F4` w/ olive border)  
  → hover: full olive fill `#627F38`, all text inverts to white, the dark icon swaps to its white pair (`os-*.svg` ↔ `os-*-w.svg`), top‑right corner rounds to 30px. The dual‑icon swap is done by stacking both `<Image>`s and toggling opacity, not by filter.
- **Insight cards** (idle: white)  
  → hover: `#E5E5BD/50` cream wash, top‑right of card + top‑right of image both round to `300px`, title underlines.
- **Round icon CTAs** (the 48–56px `CgArrowTopRight` ring) — on hover the ring fills white and the arrow turns olive.
- **Language toggle** — `hover:scale-110` and a 300ms transform.
- **Footer links** — `text-white/80` idle → `text-[#627F38]` (olive) on hover.

No opacity‑shift hovers. No darkening filters. Always *color swap*, occasionally `scale-110` on small interactive elements.

### Animation

The brand isn't shy about motion but it's purposeful, not decorative. Catalogue from `animations.css` and components:

- `blink` (1s infinite) — the typewriter caret on the hero.
- `swirlIn` / `swirlOut` (0.6s `ease-in-out`) — the Integrity headline rotates each letter on Y axis as words cycle. `perspective: 1000px`, `transform-style: preserve-3d`.
- `carouselFadeIn` (0.3s `ease-out`) — page transitions in the insight carousel.
- 300ms `ease` transitions on virtually every interactive element (hover color shifts, hamburger morph to ×, accordion open).
- `transform-scale(1.1)` over 300ms on portfolio card background images.
- The hero typewriter (`page.tsx`) types at 100ms/char, deletes at 50ms/char, pauses 2000ms between words.
- The `MagneticButton` component exists (animejs‑driven) but isn't wired into core flows; it's available if you want a button that follows the cursor by a few px.
- Headings on the about page use a `StaggeredLineReveal` + `ScrollRevealText` system that fades each line up on intersection.

**No** bounces. **No** spring physics. **No** scaling pop‑ins on cards. Cubic ease only.

### Transparency & blur

- White text on photographic backgrounds relies on the image itself being dark enough; no scrim/blur overlay.
- The hover wash on insight imagery is the only *layered* transparency: a `#E5E5BD/50` overlay fades in over the image.
- No `backdrop-filter: blur(...)`. No frosted‑glass surfaces.

### Layout & containers

- `max-w-7xl` (`80rem` / `1280px`) is the canonical content width, centered with `mx-auto`.
- Horizontal padding ramp: `px-4 sm:px-6 md:px-6` (always `1rem → 1.5rem`).
- Vertical section rhythm: `py-12 md:py-24` (= 48 / 96px) for primary sections; the `.section-py` helper does `2rem → 4rem`.
- Grid is `grid grid-cols-1 md:grid-cols-3 gap-6` for service / insight card rows, with bespoke asymmetric ratios for portfolio rows (`md:grid-cols-[7fr_8fr]`, `md:grid-cols-[12fr_8fr]`).
- The header is `sticky top-0 z-40` with `transition-all 300ms`. The menu overlay drops down from below the header and uses `/toggle-bg.svg` as a textured backdrop.
- Cards are tall — `min-h-[500px]` for insights, `min-h-[330px]` for services. Don't size them shorter; the long minimum is the look.

### Form inputs

- Bottom‑border only (`border-b border-white/30` on dark sections, `border-b border-[#111B12]/30` light).
- No background fill. No outer box.
- Focus pulls the border to solid white (or solid olive on light surfaces).
- Labels are `text-sm text-white/70` above the field; no floating labels.

### Component primitives

- **Pill button** — `inline-flex items-center gap-1.5`, `rounded-full`, `border`, `px-5 py-1.5`, 15px text, always paired with `CgArrowTopRight` 16px on the right.
- **Round arrow button** — 48px (small) or 56px (large) circle with a 1px ink @50% border, containing a 24–32px `CgArrowTopRight`.
- **Carousel dots** — 8px circles, `bg-[#D9D9D9]` inactive, `bg-[#111B12]/70` active, no hover scale.
- **Topic tag** — `px-3 py-1 rounded-full text-[13px] font-medium text-[#111B12]/70 bg-[#F1F1DD]` — the *one* place rounded pills carry text content.

### Print / dark mode

`globals.css` declares a `prefers-color-scheme: dark` branch that flips `--background` to `#0a0a0a` and `--foreground` to `#ededed` — but nothing in the actual UI honors it. The brand is light‑mode by design.

---

## 4. Iconography

**System.** [`react-icons`](https://github.com/react-icons/react-icons) — the entire icon vocabulary is just a curated re‑export from `app/utils/icons.ts`. There is no custom icon set, no icon font, no SVG sprite, no Lucide / Heroicons usage.

The actual icons used:

| Set | Icons (exact `react-icons` names) | Role |
|---|---|---|
| **Cg** (css.gg) | `CgArrowTopRight`, `CgArrowRight`, `CgArrowLeft` | universal "go" / carousel nav |
| **Bi** (BoxIcons) | `BiSolidChevronDown/Up/Left/Right`, `BiSolidChevronsLeft/Right`, `BiChevronDownCircle`, `BiChevronUpCircle` | accordion / pagination |
| **Ci** (CircumIcons) | `CiCirclePlus`, `CiCircleMinus` | services accordion expand/collapse |
| **Fa6 / Fa** | `FaLink`, `FaCheck`, `FaXTwitter`, `FaLinkedin` | social + share + check |
| **Fi** (Feather) | `FiMail` | email |
| **Tb** (Tabler) | `TbBuildingSkyscraper`, `TbUsers`, `TbStar`, `TbCheck`, `TbUserCheck`, `TbClipboardList`, `TbRocket`, `TbTrendingUp`, `TbLogout`, `TbCloud`, `TbRobot`, `TbPlugConnected`, `TbShield` | service page redesigns — feature/benefit lists |

The mix means stroke weights vary: **Cg** is light/thin outline, **Bi** is *solid* (filled), **Ci** is medium‑weight circular outline, **Tb** is light outline. The site doesn't try to homogenise — it picks whichever set best fits the metaphor and accepts the visual variance.

**SVG illustration** — the six service line icons (`/home/os-{service}.svg` + `/home/os-{service}-w.svg`) are custom flat green/white line drawings produced for this site (Corporate = skyscraper, Accounting = ledger, etc). Each ships in two color variants because they're swapped on hover via opacity rather than CSS filters — copy them as pairs.

**Logos.** `logo.png` (color on light) and `logo-w.png` (white, for footer / dark surfaces) — both 60px tall in the design. Always pair the mark with the **"OLIVE & VINE"** wordmark in `text-[#495F2B]` (light) or white (dark).

**No emoji. No unicode glyphs as icons.** Repeating from §2 because it matters — even arrows, checks and bullets are SVG components, never `✓` / `→` / `•`.

If you need an icon that isn't in `icons.ts`, prefer adding another `react-icons` import (Tabler `Tb*` first, then Feather `Fi*` for light outline, then Cg for chunkier) before pulling in any other library.

---

## 5. Caveats

- **Two portfolio SVGs failed to copy** (`home/mission-driven.svg`, `home/regional-operations.svg`) — likely oversized. The UI kit uses placeholder colored panels in their place; please re‑attach the originals if you want them exact.
- **No Figma file** was supplied — every visual decision is reverse‑engineered from JSX. Where the source code disagreed with itself (e.g. card minimum heights varying by breakpoint), I picked the desktop value.
- The "Integrity" 3D swirl animation and "Magnetic Button" are stylistic flourishes I didn't recreate in the UI kit — they're documented but not implemented in the JSX components shipped here.
