import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { getCat } from "@/lib/cats";

export const runtime = "nodejs";

/** Setzt die aktive Katze (Cookie) — danach personalisiert die ganze App. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }
  const cat = await getCat(session.email, body.id ?? "");
  if (!cat) return NextResponse.json({ error: "Katze nicht gefunden." }, { status: 404 });

  const res = NextResponse.json({ ok: true, cat });
  const opts = { sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 365 };
  res.cookies.set("sc_active_cat", cat.id, opts);
  res.cookies.set("sc_cat", cat.name, opts);
  return res;
}
