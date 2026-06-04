import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { saveFavorite } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }
  let body: { ids?: string[]; ueberschrift?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }
  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "Keine Signale." }, { status: 400 });
  }
  await saveFavorite(session.email, body.ids, body.ueberschrift ?? "");
  return NextResponse.json({ ok: true });
}
