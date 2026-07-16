import { NextResponse } from "next/server";
import { validate, sendContactMail, rateLimited } from "@/app/lib/graphMail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const result = validate(await request.json());
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    await sendContactMail(result.fields, "contact form");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }
}