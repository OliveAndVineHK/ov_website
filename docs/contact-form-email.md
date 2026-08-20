# Contact Form Email — Implementation Report

**Date:** 2026-07-20
**Status:** Working end-to-end (verified locally). Pending Vercel env setup + secret rotation.
**Scope:** Contact page form (`/contact`) and Footer questions form → email delivery via Microsoft Graph API.

---

## 1. Goal

Both public forms previously ended in `console.info()` placeholders — submissions went nowhere. The task was to deliver each submission as an email to an Olive & Vine mailbox, using **Microsoft Graph** (the firm already runs Microsoft 365, so no third-party mail service was needed).

Two forms needed wiring:

| Form | File | Endpoint |
| --- | --- | --- |
| Contact page | `app/contact/page.tsx` | `POST /api/contact` |
| Footer questions | `app/components/Footer.tsx` | `POST /api/questions` |

---

## 2. Approach — why this design

**Client-credentials (app-only) OAuth flow.** The site has no signed-in user, so a delegated flow is impossible. An Entra app registration holds an application-level `Mail.Send` permission and authenticates with a client secret.

**Server-side only.** The token exchange and Graph call happen in Next.js Route Handlers. The client secret is never exposed to the browser — the form only POSTs plain JSON to our own endpoint.

**No new dependencies.** Both the token request and the Graph call are plain `fetch` calls. The Microsoft Graph SDK and MSAL were deliberately not added — they are large and buy nothing for two HTTP requests.

**Send from and deliver to the same shared mailbox**, with the visitor's address as `Reply-To`. Replying in Outlook then goes straight to the customer, and the shared mailbox keeps the full history.

---

## 3. Azure / Entra setup (portal, one-time)

Performed in **entra.microsoft.com** by an admin.

1. **App registration** — Identity → Applications → App registrations → New registration.
   - Single tenant ("Accounts in this organizational directory only")
   - No redirect URI (server-to-server)
   - Recorded the **Application (client) ID** and **Directory (tenant) ID**
2. **API permission** — API permissions → Add a permission → **Microsoft Graph → Application permissions** (not *Delegated*) → `Mail.Send` → **Grant admin consent**.
   Application permissions are required because there is no signed-in user.
3. **Client secret** — Certificates & secrets → New client secret. The *Value* is shown only once.
   Note the expiry date: **mail silently stops when the secret lapses.** Set a calendar reminder to rotate.
4. **(Recommended) Scope the app to one mailbox** — by default an app with `Mail.Send` can send as *any* mailbox in the tenant. Restrict it via an application access policy in Exchange Online PowerShell:

   ```powershell
   Connect-ExchangeOnline
   New-ApplicationAccessPolicy -AppId "<client-id>" `
     -PolicyScopeGroupId "ContactFormSenders@oliveandvinehk.com" `
     -AccessRight RestrictAccess `
     -Description "Contact form can only send as shared mailbox"

   # Verify — expect Granted for the shared mailbox, Denied for anyone else
   Test-ApplicationAccessPolicy -AppId "<client-id>" -Identity "ovwebsiteform@oliveandvinehk.com"
   ```

   This matters because the credential lives on a public website's backend.

---

## 4. Code implementation

### 4.1 Shared helper — `app/lib/graphMail.ts`

All Graph logic lives in one module so the two routes stay thin and behave identically.

- **`getAccessToken()`** — POSTs to
  `https://login.microsoftonline.com/{MS_TENANT_ID}/oauth2/v2.0/token`
  with `grant_type=client_credentials` and `scope=https://graph.microsoft.com/.default`, returning the bearer token.
- **`validate(payload)`** — trims input, requires `name` + `email`, regex-checks the email, and caps field lengths (name 200, email 320, message 5000) so the endpoint can't be used to post huge bodies.
- **`sendContactMail(fields, source)`** — builds an HTML table of the submission and POSTs to
  `https://graph.microsoft.com/v1.0/users/{CONTACT_MAILBOX}/sendMail`.
  All values pass through `escapeHtml()` before interpolation, so a submission cannot inject markup into the email body. `replyTo` is set to the visitor's address. `source` labels which form it came from ("contact form" / "questions form").
- **`rateLimited(ip)`** — in-memory sliding window, 5 requests per minute per IP.

### 4.2 Route handlers

`app/api/contact/route.ts` and `app/api/questions/route.ts` are near-identical:

1. Read the caller IP from `x-forwarded-for` → `rateLimited()` → **429** if over the limit
2. `validate()` the JSON body → **400** on bad input
3. `sendContactMail()` → **200 `{ ok: true }`**, or **502** with the error logged server-side

Both set `export const runtime = "nodejs"`.

Error responses are deliberately generic. The detailed Graph error is written to the server log only — it can contain tenant and mailbox information that shouldn't reach the browser.

### 4.3 Form wiring

Both forms follow the same pattern: a `status` state of `"idle" | "sending" | "sent" | "error"`.

- Submit handler `POST`s JSON to its endpoint
- Button shows "Sending..." / "전송 중..." and is `disabled` while in flight
- On success the fields reset and a bilingual confirmation appears
- On failure a bilingual error message appears and the error is logged to the console

Messages follow the existing EN/KO pattern and contain no emoji, per the brand rules in `docs/design-system/rules/forbidden.json`.

---

## 5. Configuration

Four environment variables, read server-side only:

| Variable | Purpose |
| --- | --- |
| `MS_TENANT_ID` | Directory (tenant) ID |
| `MS_CLIENT_ID` | Application (client) ID |
| `MS_CLIENT_SECRET` | Client secret value |
| `CONTACT_MAILBOX` | Mailbox to send **from** and deliver **to** |

- **Local:** `.env.local` (gitignored — `.env*` is covered in `.gitignore`)
- **Production:** Vercel → Project → Settings → Environment Variables, for **Production** and **Preview**. A **redeploy is required** — env changes do not apply to an already-running deployment.
- `.env.example` is committed as a template with empty values.

> Next.js reads env vars **at startup only**. After editing `.env.local`, restart the dev server or changes will appear to be ignored.

---

## 6. Testing

### Local

```bash
npm run dev
```

```powershell
curl.exe -s -w "`nHTTP %{http_code}`n" -X POST "http://localhost:3000/api/contact" `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test\",\"email\":\"you@example.com\",\"contactNumber\":\"+852 1234 5678\",\"title\":\"Mr\",\"message\":\"Test message.\"}'
```

Swap the path for `/api/questions` to test the footer form, and the host for
`https://oliveandvinehk.com` (or `https://test.oliveandvinehk.com`) to test deployed environments.

Expected: `{"ok":true}` and `HTTP 200`, with the email arriving in `CONTACT_MAILBOX`.

Use `curl.exe`, not `curl`, in PowerShell — the bare name is an alias for `Invoke-WebRequest`.

### Isolating Graph from the app

To test whether a *mailbox* is the problem rather than the code, call Graph directly:

```bash
# get a token, then:
curl -X POST "https://graph.microsoft.com/v1.0/users/<address>/sendMail" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"message":{"subject":"probe","body":{"contentType":"Text","content":"probe"},
       "toRecipients":[{"emailAddress":{"address":"<address>"}}]},"saveToSentItems":false}'
```

`202 Accepted` means the mailbox is valid and the credentials work.

---

## 7. Key finding — the sender must be a real mailbox

The first attempts failed with:

```
404 ErrorInvalidUser: The requested user 'digitalisation@oliveandvinehk.com' is invalid.
```

`/users/{id}/sendMail` acts *as* that identity's mailbox, so `{id}` must resolve to a mailbox that actually exists.

| Address type | Can send? | Can receive? |
| --- | --- | --- |
| User mailbox | Yes | Yes |
| Shared mailbox | Yes | Yes |
| Distribution / M365 group | **No** | Yes |
| Alias of another mailbox | **No** (use the primary address) | Yes |

A distribution group is a routing list, not a mailbox — it has no store to send from. Groups remain valid as *recipients*.

Verified by probing addresses directly against Graph:

| Mailbox | Result |
| --- | --- |
| `ovwebsiteform@oliveandvinehk.com` | 202 — **in use** |
| `chat@oliveandvinehk.com` | 202 |
| `michael.leguira@oliveandvinehk.com` | 202 |
| `digitalisation@oliveandvinehk.com` | 404 `ErrorInvalidUser` — not a mailbox |

To confirm what an address is:

```powershell
Get-Mailbox -Identity "<address>" | Format-List PrimarySmtpAddress,RecipientTypeDetails
```

`Set-Mailbox` / `Get-Mailbox` only exist **after** `Connect-ExchangeOnline`; otherwise PowerShell reports `CommandNotFoundException`.

---

## 8. Operational note — shared mailbox visibility

Submissions land in the `CONTACT_MAILBOX` inbox. **Full Access permission does not copy mail into a member's personal inbox** — the shared mailbox must be opened explicitly (Outlook web: right-click Folders → *Add shared folder or mailbox*).

If a personal copy is wanted, either set forwarding (M365 admin center → Shared mailboxes → Email forwarding → keep a copy), or add a CC recipient in `sendContactMail()`.

---

## 9. Files changed

| File | Change |
| --- | --- |
| `app/lib/graphMail.ts` | **New** — token, validation, send, rate limiting |
| `app/api/contact/route.ts` | **New** — contact endpoint |
| `app/api/questions/route.ts` | **New** — footer questions endpoint |
| `app/contact/page.tsx` | Submit handler POSTs to `/api/contact`; bilingual status states |
| `app/components/Footer.tsx` | Submit handler POSTs to `/api/questions`; bilingual status states |
| `.env.example` | **New** — committed template |
| `.env.local` | **New** — real values, gitignored |

---

## 10. Outstanding

1. **Rotate the client secret.** The working secret was shared in plain text during development and must be treated as compromised. Create a new one in Entra → Certificates & secrets, then update `.env.local` and Vercel.
2. **Set the four env vars in Vercel** (Production + Preview) and redeploy.
3. **Apply the application access policy** (section 3.4) so the credential can only send as the one mailbox.
4. **Calendar reminder for secret expiry** — mail fails silently when it lapses.
5. **Rate limiting is per-instance.** The in-memory limiter does not coordinate across serverless instances, so it blunts bursts rather than enforcing a global cap. Vercel KV / Upstash would be needed for a hard limit.
6. **No CAPTCHA.** If spam becomes a problem, add Turnstile or hCaptcha to both forms.