import { NextResponse, type NextRequest } from "next/server";
import { hasOrder, dbConfigured } from "@/lib/db";
import { sendMagicLink, emailConfigured } from "@/lib/email";
import { signSession } from "@/lib/auth";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ZUGANGSPRÜFUNG (zentrale Stelle):
 * Ein Magic-Link wird NUR gesendet, wenn die E-Mail in der Käufer-Tabelle
 * (orders, befüllt vom Stripe-Webhook) existiert — siehe hasOrder().
 *
 * Dev-Bypass (jede Adresse kommt rein) greift ausschließlich, wenn
 *   1) ALLOW_DEV_LOGIN === "true"  (explizite Umgebungsvariable) UND
 *   2) keine Datenbank konfiguriert ist (also lokal ohne Keys).
 * In Produktion ist Supabase konfiguriert → dbConfigured() === true →
 * der Bypass ist strukturell unmöglich, selbst wenn das Flag fälschlich
 * gesetzt wäre.
 */
function devLoginBypassActive(): boolean {
  return process.env.ALLOW_DEV_LOGIN === "true" && !dbConfigured();
}

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 }
    );
  }

  // Sicherheitswarnung bei riskanter Fehlkonfiguration
  if (process.env.ALLOW_DEV_LOGIN === "true" && dbConfigured()) {
    console.warn(
      "[auth] ALLOW_DEV_LOGIN ist gesetzt, wird aber ignoriert, weil eine DB konfiguriert ist (Produktion)."
    );
  }

  const bypass = devLoginBypassActive();
  // Zugang nur für tatsächliche Käufer (oder lokaler Dev-Bypass).
  const granted = bypass || (await hasOrder(email));

  if (!granted) {
    // Bewusste, klare Rückmeldung (Produktwunsch): keine Käufer-Adresse.
    return NextResponse.json({ ok: true, granted: false });
  }

  const token = await signSession({
    email,
    paid: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 30,
  });
  const link = `${SITE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`;
  await sendMagicLink(email, link);

  // Lokaler Dev-Bypass ohne E-Mail-Konfiguration: Link direkt zurückgeben.
  if (bypass && !emailConfigured()) {
    return NextResponse.json({ ok: true, granted: true, devLink: link });
  }

  return NextResponse.json({ ok: true, granted: true });
}
