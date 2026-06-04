import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { getProfile, upsertProfile } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }
  const profile = await getProfile(session.email);
  return NextResponse.json({ profile });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }
  let body: { catName?: string; onboarded?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }
  const catName = (body.catName ?? "").trim().slice(0, 40) || null;
  await upsertProfile({
    email: session.email,
    cat_name: catName,
    onboarded: body.onboarded ?? true,
  });

  // Zusätzlich als Cookie spiegeln → Personalisierung funktioniert auch ohne
  // konfigurierte DB (Dev) und ohne extra Request im Layout.
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sc_cat", catName ?? "", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  res.cookies.set("sc_onboarded", "1", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
