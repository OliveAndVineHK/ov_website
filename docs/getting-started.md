# Getting started

Step-by-step setup for a developer (or AI agent's human partner) coming to this codebase for the first time. From zero to a running local dev server, and from there to a Vercel deploy.

---

## Part 1 — Local development

### 1. Prerequisites

Install these once on your machine:

| Tool | Version | Why |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | 18.18+ / 20+ / 22+ | Next.js 16 runtime. Node 22 LTS recommended. |
| npm | Comes with Node | Package manager. The repo uses `package-lock.json`. |
| [Git](https://git-scm.com/) | Any recent version | Version control. |
| A code editor | VS Code recommended | TypeScript + Tailwind extensions help a lot. |
| ffmpeg | Optional | Only needed if you re-encode hero videos. `brew install ffmpeg` on macOS. |

Recommended VS Code extensions:
- ESLint (`dbaeumer.vscode-eslint`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript and JavaScript Language Features (built in)
- Error Lens (`usernamehw.errorlens`)

### 2. Clone or unzip

```bash
# If you received a zip:
unzip olive-and-vine-website-v3.0.zip
cd olive-and-vine-clone-v3.0

# If cloning from GitHub:
git clone https://github.com/Olive-and-Vine/olive-and-vine-website.git
cd olive-and-vine-website
```

### 3. Install dependencies

```bash
npm install
```

This will pull ~320 dependencies, totaling a few hundred MB in `node_modules/`. Takes 1–3 minutes the first time.

### 4. Create your local env file

```bash
touch .env.local
```

Open `.env.local` in your editor and add:

```env
# Required for sitemap / robots / metadata canonical host
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional — only if you'll run translation scripts that call DeepL
DEEPL_API_KEY=your-deepl-api-key-here
DEEPL_GLOSSARY_ID=your-glossary-id-here

# Pending feature — leave empty until contact form is wired
# BREVO_API_KEY=
```

> Ask the owner for the actual `DEEPL_API_KEY` (it's been rotated since the v3.0 handoff — see `docs/handoff.md` → Security).

### 5. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000. Edits to source files trigger Hot Module Replacement automatically.

### 6. Run lint and type-check

Before any commit:

```bash
npm run lint                          # ESLint
./node_modules/.bin/tsc --noEmit      # TypeScript check
```

Both should exit cleanly. If lint complains about an old file, fix it — there are no lint-disable comments in the codebase by policy.

### 7. Build the production bundle locally

```bash
npm run build
npm run start                         # serve the .next/ build at :3000
```

This is closer to what Vercel will do. Use it to catch SSR-only issues, missing environment variables, and bundle size surprises.

---

## Part 2 — Translation refinement (optional but common)

The Korean copy is iteratively refined via a spreadsheet round-trip. The full workflow:

```bash
# 1. Extract every bilingual string from source into JSON
node i18n/scripts/extract.mjs
#    output: i18n/proofreading/extracted.json

# 2. Build a fresh editable xlsx (one sheet per page)
python3 i18n/scripts/build_xlsx.py
#    output: i18n/proofreading/Olive-and-Vine_번역검수.xlsx

# 3. Hand the xlsx to the human proofreader.
#    They fill the "수정 EN" / "수정 KO" columns.

# 4. When you receive the edited xlsx back, convert to a patch:
python3 i18n/scripts/xlsx_to_edits.py
#    output: i18n/proofreading/edits.json

# 5. Apply the patch to source files:
node i18n/scripts/apply.mjs
#    This rewrites the relevant strings in app/utils/ and app/**/page.tsx
```

After applying:
- `npm run lint` and `tsc --noEmit` to confirm nothing broke
- Visit each affected page in dev, toggle EN/KO, eyeball the changes
- Append a one-line entry to `i18n/TRANSLATION_LOG.md`
- Commit

> If you are working through an AI agent (Claude etc.), point it at `Translation-Master-Prompt.md` and `CLAUDE.md` first.

---

## Part 3 — Deploying to Vercel

The site uses Vercel for both staging and production. Two environments are wired:

| Environment | Domain | Branch |
| --- | --- | --- |
| Staging | `test.oliveandvinehk.com` | `main` (auto-deploy) |
| Production | `oliveandvinehk.com` | promoted from staging |

### A. First-time setup (only once)

If the Vercel project does not yet exist (e.g. a fresh GitHub account migration):

1. **Sign in / create Vercel account** at https://vercel.com (use the same Google account as GitHub for SSO simplicity).
2. **Import the repo** — Dashboard → Add New → Project → select the GitHub repo.
3. **Framework preset:** Next.js (auto-detected).
4. **Root directory:** leave as `/`.
5. **Build command:** `next build` (default).
6. **Output directory:** `.next` (default).
7. **Install command:** `npm install` (default).
8. **Environment variables** — add these now (Settings → Environment Variables):

   | Name | Value | Environments |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://test.oliveandvinehk.com` | Preview, Development |
   | `NEXT_PUBLIC_SITE_URL` | `https://oliveandvinehk.com` | Production |
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | (token from Search Console) | All |
   | `DEEPL_API_KEY` | (rotated key — see handoff) | All |
   | `DEEPL_GLOSSARY_ID` | (current glossary ID) | All |
   | `BREVO_API_KEY` | (when contact form is wired) | All |

9. **Deploy** — the first build will run automatically.

### B. Attach custom domains

In the Vercel project → Settings → Domains:

1. Add `test.oliveandvinehk.com` and assign to **Preview** (or to a specific branch like `staging` if you ever split branches). For the current setup with main-only deploys, route preview deployments to this domain.
2. Add `oliveandvinehk.com` and assign to **Production**.
3. Vercel will show DNS records to add (A or CNAME). Update them in the DNS provider for `oliveandvinehk.com`.
4. Wait for the TLS certificate to issue (usually a few minutes).

### C. Day-to-day flow

```bash
# Make changes locally, lint and typecheck
npm run lint && ./node_modules/.bin/tsc --noEmit

# Commit and push to main
git add -A
git commit -m "feat: <what changed>"
git push origin main
```

Vercel auto-builds. Visit https://test.oliveandvinehk.com to review.

When staging looks good, promote to production:

- **Option 1 (Vercel UI):** Dashboard → Deployments → find the staging deployment → "Promote to Production".
- **Option 2 (Vercel CLI):**
  ```bash
  npm install -g vercel        # if not already installed
  vercel --prod                # from inside the repo
  ```

### D. Rolling back

In the Vercel UI → Deployments → find a previous successful deployment → "Promote to Production". Rollback is near-instant since Vercel keeps prior builds available.

---

## Part 4 — Troubleshooting common setup issues

### "Module not found: tailwindcss"
Re-run `npm install`. Tailwind 4 ships as `@tailwindcss/postcss`; make sure the install completed.

### "Cannot find module '@/app/...'"
The `@/*` path alias is defined in `tsconfig.json`. Restart the TS server in VS Code: Command Palette → "TypeScript: Restart TS server".

### "Hydration mismatch" warning in console
Usually caused by reading `localStorage` synchronously during SSR. The `useLanguage()` hook handles this — if you write a new component that reads from `localStorage`, wrap the read in `useEffect`.

### Hero video doesn't play locally
Check the file exists at `public/home/home-bg-movie.mp4`. The poster image is `public/home/home-bg.png`. If only the poster shows, your browser may be blocking autoplay (Safari often does for non-muted videos — the video is muted, so it should work, but check browser settings).

### `next build` hangs on SWC binary download
Network/proxy issue. See `docs/known-issues.md` → #10.

### Korean characters render as boxes
The Korean font (Nexon Lv2 Gothic) loads from `app/fonts/` or via `next/font`. If you cloned a partial copy without the font files, restore them. The font setup is in `app/layout.tsx`.

---

## Part 5 — Where to go from here

| Goal | Next read |
| --- | --- |
| Understand the code patterns | `docs/architecture.md` |
| Pick up the next task | `docs/handoff.md` |
| Avoid traps prior devs hit | `docs/known-issues.md` |
| Make a visual change | `docs/design-system/rules/forbidden.json` and the relevant `decisions/` doc |
| Work with an AI assistant | Point it at `CLAUDE.md` |
