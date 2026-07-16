/**
 * Shared Microsoft Graph email helper for the public contact/questions forms.
 *
 * App-only (client-credentials) flow: get a token from Entra, then POST to
 * Graph /users/{CONTACT_MAILBOX}/sendMail. The app registration needs the
 * *application* permission `Mail.Send` (admin-consented), ideally scoped to the
 * shared mailbox via an ApplicationAccessPolicy.
 *
 * Env vars (Vercel → Settings → Environment Variables; .env.local locally):
 *   MS_TENANT_ID     — Directory (tenant) ID
 *   MS_CLIENT_ID     — Application (client) ID
 *   MS_CLIENT_SECRET — client secret value
 *   CONTACT_MAILBOX  — shared mailbox to send from AND to (e.g. info@oliveandvinehk.com)
 */

export type ContactPayload = {
  name?: string;
  email?: string;
  contactNumber?: string;
  title?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + length-cap + validate. Returns { ok, error } for a 400, or clean fields. */
export function validate(payload: ContactPayload):
  | { ok: false; error: string }
  | { ok: true; fields: Required<Omit<ContactPayload, "contactNumber" | "title" | "message">> & ContactPayload } {
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  if (!name || !email) return { ok: false, error: "Name and email are required." };
  if (name.length > 200 || email.length > 320) return { ok: false, error: "Field too long." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Invalid email address." };
  return {
    ok: true,
    fields: {
      name,
      email,
      contactNumber: (payload.contactNumber || "").trim().slice(0, 60),
      title: (payload.title || "").trim().slice(0, 20),
      message: (payload.message || "").trim().slice(0, 5000),
    },
  };
}

async function getAccessToken(): Promise<string> {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET");
  }

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) throw new Error(`Token request failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("No access_token in token response");
  return json.access_token;
}

/**
 * Send a contact submission via Graph. `source` labels which form it came from.
 * Sends from the shared mailbox to itself, with the visitor's email as Reply-To.
 */
export async function sendContactMail(
  fields: ContactPayload,
  source: string
): Promise<void> {
  const mailbox = process.env.CONTACT_MAILBOX;
  if (!mailbox) throw new Error("Missing CONTACT_MAILBOX");

  const token = await getAccessToken();

  const rows: Array<[string, string]> = [
    ["Name", fields.name || "-"],
    ["Email", fields.email || "-"],
    ["Contact number", fields.contactNumber || "-"],
    ["Title", fields.title || "-"],
    ["Message", fields.message || "-"],
    ["Source", source],
  ];
  const htmlBody = `
    <h2>New ${escapeHtml(source)} submission</h2>
    <table style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${escapeHtml(
              k
            )}</td><td style="padding:4px 0">${escapeHtml(String(v))}</td></tr>`
        )
        .join("")}
    </table>`;

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: `Website ${source} — ${fields.name}`,
          body: { contentType: "HTML", content: htmlBody },
          toRecipients: [{ emailAddress: { address: mailbox } }],
          replyTo: fields.email ? [{ emailAddress: { address: fields.email } }] : undefined,
        },
        saveToSentItems: true,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Graph sendMail failed (${res.status}): ${await res.text()}`);
  }
}

/**
 * Tiny in-memory, per-IP rate limiter. Best-effort only — serverless instances
 * aren't shared, so this throttles bursts within a warm instance, not globally.
 * Good enough to blunt casual spam without adding infrastructure.
 */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}