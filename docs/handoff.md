# Handoff — current state and pending work

> **This is a living document.** Update it whenever you finish or change scope on a pending item. It is the single source of truth for "what's left."

**Last updated:** 2026-06-05 (post-v3.0 polish session)
**Current branch / commit context:** v3.0 — about cluster, 6 service pages, insights, hero, motion polish all complete. Repo will be migrated to a new GitHub account (`Olive-and-Vine` / `olive-and-vine-website`) and pushed fresh (no prior history).

---

## State at a glance

| Surface | Status | Notes |
| --- | --- | --- |
| Home `/` | ✅ Complete | Video hero with PNG-masked notches, AnimatedHeadline v4, motion section, brand promise |
| About cluster (`/about`, `/our-values`, `/leadership`, `/leadership/[slug]`) | ✅ Complete | Iteration v6 — uniform hero height, organic curves, gradient flow, hover photos, Nexon font |
| Services (`/services` + 6 pages) | ✅ Complete | Per-service tints (Decision G), curve motifs, explainer diagrams (Decision H), balanced related-services links |
| Insights (`/insights`, `/insights/[tag]/[slug]`) | ✅ Complete | "Latest" filter, publish-order list, row-by-row card stagger, subscribe button removed |
| Contact `/contact` | ⚠️ UI complete, **no email backend** | Form submission currently just `console.info`s. See Pending #1. |
| Subscribe `/subscribe` | 🟡 Deferred | Page + assets retained, all links removed. Do not implement. |
| SEO (sitemap, robots, structured data, metadata) | ✅ Complete | `/sitemap.xml/route.ts` + `app/robots.ts` + per-page `layout.tsx` metadata |
| Bilingual content (EN/KO) | ✅ All strings translated | 🟡 Korean copy under proofreading — see Pending #2 |
| Design system docs | ✅ Comprehensive | 10 decisions + playbooks + `forbidden.json` in `docs/design-system/` |
| TypeScript | ✅ Clean | `tsc --noEmit` passes |
| Lint | ✅ Clean | `npm run lint` passes |

---

## Pending — High priority

### 1. Contact form email integration (Brevo)

**Owner decision:** Brevo is the chosen transactional email provider (the team already uses Brevo for other workflows).

**Scope:**
- `/contact` form submit → email to `contact@oliveandvinehk.com`
- Footer "Questions" form submit → same destination
- Both currently stop at `console.info(...)` stubs inside the form handlers

**Implementation outline:**

1. **Brevo dashboard prep**
   - Create an API key (Account → SMTP & API → API keys). Scope: send transactional emails only.
   - Verify the sending domain (`oliveandvinehk.com`) — add the SPF/DKIM records Brevo provides to the DNS panel.
   - Set up a "sender" — `no-reply@oliveandvinehk.com` (or `contact@`), display name "Olive & Vine Website".

2. **Env var**
   - Add `BREVO_API_KEY=xkeysib-…` to `.env.local` (local) and Vercel project settings (staging + production).

3. **Server route**
   - Create `app/api/contact/route.ts`:
     ```ts
     import { NextRequest, NextResponse } from "next/server";

     export async function POST(req: NextRequest) {
       const body = await req.json();
       // Validate body shape (name, email, message, etc.)
       const res = await fetch("https://api.brevo.com/v3/smtp/email", {
         method: "POST",
         headers: {
           "accept": "application/json",
           "api-key": process.env.BREVO_API_KEY!,
           "content-type": "application/json",
         },
         body: JSON.stringify({
           sender: { name: "Olive & Vine Website", email: "no-reply@oliveandvinehk.com" },
           to: [{ email: "contact@oliveandvinehk.com", name: "Olive & Vine" }],
           replyTo: { email: body.email, name: body.name },
           subject: `[Website] ${body.subject ?? "New contact form submission"}`,
           htmlContent: `<p><strong>From:</strong> ${body.name} (${body.email})</p>
                         <p>${body.message.replace(/\n/g, "<br/>")}</p>`,
         }),
       });
       if (!res.ok) return NextResponse.json({ error: "send-failed" }, { status: 502 });
       return NextResponse.json({ ok: true });
     }
     ```

4. **Client wiring**
   - In `app/contact/page.tsx` and `app/components/Footer.tsx` (Questions form), replace the `console.info` stub with `fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })`.
   - Show a success / error state in the existing UI.

5. **Validation**
   - Add basic server-side validation (required fields, email shape, message length cap, simple rate-limit by IP if traffic invites abuse).

6. **Spam mitigation**
   - Consider Brevo's built-in handling. If spam volume is a concern, add Cloudflare Turnstile or hCaptcha to the form.

**Reference docs:**
- Brevo API — https://developers.brevo.com/reference/sendtransacemail
- Domain auth — https://help.brevo.com/hc/en-us/articles/208836149

---

### 2. Korean copy proofreading (xlsx-driven workflow)

**Current state:** `i18n/proofreading/Olive-and-Vine_번역검수.xlsx` is the active proofreading spreadsheet. 17 sheets, one per page or shared component. As of this handoff, the human proofreader has begun filling in the `수정 EN` / `수정 KO` columns; many sheets are still untouched.

**Workflow for an AI agent:**

1. **Read first:** `Translation-Master-Prompt.md` at the project root. It defines the translator persona, glossary lookup rules, and per-string-type stylistic rules.
2. **Open the xlsx** and process sheet by sheet. For every row where `수정 EN` or `수정 KO` is non-empty:
   - Locate the file from column `ID` (format: `<file-path>::<dot.path>`)
   - Replace **only** the `.en` or `.ko` value at that path
   - Leave surrounding code, comments, and other strings untouched
3. **Sheets that may need new strings added:** the `📋 안내` sheet describes the format. Some component-level sheets (e.g. `16 공통 인사이트 카드`) contain rows whose `ID` ends in `#2` — these are duplicates of the same key with different content (e.g. multiple cards sharing `cards[0].title`). Match by surrounding context, not by literal `cards[0].title` once.
4. **Memo column:** the `메모` column may contain reviewer questions or context. Surface these back to the user after applying edits — do not silently resolve them.
5. **After applying:** append a one-line entry to `i18n/TRANSLATION_LOG.md` with date, sheets touched, and approximate edit count.

**Helper scripts in `i18n/scripts/`** can automate steps 2–3 at scale:
- `extract.mjs` — re-extracts current strings from source (use before building a new xlsx)
- `build_xlsx.py` — generates a fresh xlsx from the extracted JSON
- `xlsx_to_edits.py` — converts the human-edited xlsx into a JSON patch
- `apply.mjs` — applies the JSON patch to source files

**Recurring task:** the proofreader will likely deliver multiple rounds of revisions. Each round means a new xlsx; treat the workflow as repeatable, not one-shot.

---

### 3. Security — rotate DeepL API key

The DeepL API key currently in `.env.local` was inadvertently exposed in a development chat transcript. Although `.env.local` is gitignored and will not be committed, the key value itself is no longer secret.

**Action:**
1. Visit https://www.deepl.com/account/api-keys
2. Revoke the existing key (or rotate by generating a new one and deleting the old)
3. Update `.env.local` and any Vercel env var for staging/production
4. Verify `i18n/scripts/extract.mjs` (or any other script that calls DeepL) still works

Until done, treat the existing key as compromised. **Do not deploy with the old key.**

---

## Pending — Medium priority

### 4. Performance — `/public` asset budget

Total `/public` is **~154 MB**. Largest offenders:

| Path | Size | Notes |
| --- | --- | --- |
| `public/home/regional-operations.svg` | 30 MB | SVG with embedded raster — most likely re-exportable at 1/5 the size |
| `public/home/home-bg-movie.mp4` | 29 MB | Hero video — re-encode at H.264 + lower bitrate |
| `public/home/mission-driven.svg` | 25 MB | Same SVG-with-embedded-raster issue |
| `public/home/business-growth.svg` | 18 MB | Same |
| `public/services/b1.svg` | 9.1 MB | Used as accounting Pattern 02 background |
| `public/home/new-ventures.svg` | 5.4 MB | Same |
| `public/services/a1.svg` | 4.3 MB | Consulting methodology background |

**Suggested actions** (in priority order):
1. **Re-encode the hero video** with ffmpeg: `ffmpeg -i home-bg-movie.mp4 -vcodec libx264 -crf 28 -preset slow -an home-bg-movie-opt.mp4`. Expect 60–80% size reduction.
2. **Strip embedded rasters from the home SVGs**. They were likely exported from Figma with PNGs baked in; the originals should be re-exported as proper vector or as small JPEGs.
3. **Audit `next/image` usage** — confirm every `<Image>` has correct `sizes` and that large images are not loaded on mobile.
4. **Lighthouse / Web Vitals**: run on `test.oliveandvinehk.com` after the above. Aim for LCP < 2.5s on 4G.
5. **CDN cache headers** are already set for `/sitemap.xml` and `/robots.txt`. Consider adding far-future caching for `/public/home/*` assets via `next.config.ts` headers.

---

### 5. Hero homepage — minor cleanup

Hero notches are **complete** as of 2026-06-04 (PNG alpha mask on the video container preserves the white corner cut during playback). No further work needed unless visual reissues appear.

---

### 6. `.gitignore` has duplicated sections

The current `.gitignore` has the standard rules listed twice (copy-paste artifact). Harmless but worth cleaning when convenient.

---

## Deferred (do not implement now)

### Subscribe backend

The `/subscribe` page and form exist but are **not linked from anywhere**. The original plan was to capture emails into a database and send insight digests. Decision: defer until business priorities change.

If/when revisited, the recommended stack is **Brevo Contacts + Lists + Campaigns** (since Brevo is already in use) — not a custom DB. This avoids data residency complexity in Hong Kong.

Re-enabling steps when ready:
1. Restore link in `app/insights/[tag]/[slug]/page.tsx` (the removed envelope button)
2. Re-add `/subscribe` to `app/sitemap.xml/route.ts`
3. Wire form to Brevo's "add contact to list" API
4. Set up a Brevo automation to send insight digests on a cadence

---

## Recent decisions worth knowing

These influenced the current state and explain visual choices that may look surprising:

- **Decision G** — per-service hero tints. Each of 6 service pages gets its own olive-family accent (more or less saturated, never a new hue). See `docs/design-system/decisions/2026-05-28-g-per-service-hero-tints.md`.
- **Decision H** — curve motif + explainer diagram per service. Don't unify; per-service identity is intentional.
- **Decision I** — about cluster hero pattern (organic line variation v5b, story arc). See `decisions/2026-05-29-i-about-cluster-hero.md`.
- **SectionReveal v5 (S4)** — fail-open default-visible. Solves Next.js back-nav scroll restoration bug. See `docs/known-issues.md` for the full evolution.

---

## Migration notes (zip → new GitHub repo)

This codebase is being handed to a new GitHub account as a zip. The receiver should:

```bash
# 1. Extract the zip
unzip olive-and-vine-website-v3.0.zip
cd olive-and-vine-clone-v3.0

# 2. Confirm no stale .git directory (Option B = fresh start)
rm -rf .git

# 3. Initialize fresh
git init
git add -A
git commit -m "initial commit: olive-and-vine website v3.0"
git branch -M main

# 4. Create the repo on GitHub (account: Olive-and-Vine, repo: olive-and-vine-website, Private)

# 5. Push
git remote add origin https://github.com/Olive-and-Vine/olive-and-vine-website.git
git push -u origin main

# 6. Connect to Vercel (see docs/getting-started.md → Deployment)
```

**Before pushing:**
- Confirm `.env.local` is excluded (it is, via `.gitignore`)
- Confirm `node_modules/` is excluded (it is)
- Confirm `.next/` and `tsconfig.tsbuildinfo` are excluded (they are)
- Rotate the DeepL key (see Pending #3) before adding it to Vercel env vars

---

## Where to look next

When you start a new session, the first three files to read in order:

1. **`CLAUDE.md`** — brand rules + critical components + pitfalls
2. **This file** — what's done, what's pending, why
3. **`docs/known-issues.md`** — historical decisions and traps already encountered

Then pick a Pending item and go.
