import { NextResponse, type NextRequest } from "next/server";
import { saveLead } from "@/lib/db";
import { sendLeadWelcome } from "@/lib/email";
import { signSession } from "@/lib/auth";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; consent?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const consent = Boolean(body.consent);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Bitte stimme der Datenschutzerklärung zu." },
      { status: 400 }
    );
  }

  // Land aus Vercel-Geo-Header (für spätere Auswertung), best-effort
  const country = req.headers.get("x-vercel-ip-country") ?? undefined;

  await saveLead(email, consent, country);

  // Double-Opt-in-Bestätigungslink (signierter, kurzlebiger Token)
  const token = await signSession({
    email,
    paid: false,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });
  const confirmLink = `${SITE_URL}/uebersetzer-gratis?bestaetigt=1&t=${encodeURIComponent(token)}`;
  await sendLeadWelcome(email, confirmLink);

  return NextResponse.json({ ok: true });
}
