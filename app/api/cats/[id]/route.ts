import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { updateCat, deleteCat, listCats } from "@/lib/cats";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  let body: { name?: string; photo_url?: string | null; breed?: string | null; age?: string | null; notes?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (body.name !== undefined) patch.name = body.name.trim().slice(0, 40);
  if (body.photo_url !== undefined) patch.photo_url = body.photo_url;
  if (body.breed !== undefined) patch.breed = body.breed;
  if (body.age !== undefined) patch.age = body.age;
  if (body.notes !== undefined) patch.notes = body.notes;

  const cat = await updateCat(session.email, params.id, patch);
  if (!cat) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  // Namen in Personalisierungs-Cookie spiegeln, falls die aktive Katze
  const res = NextResponse.json({ cat });
  if (body.name !== undefined) {
    res.cookies.set("sc_cat", cat.name, { sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
  return res;
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  await deleteCat(session.email, params.id);

  // aktive Katze ggf. auf die erste verbleibende umstellen
  const rest = await listCats(session.email);
  const res = NextResponse.json({ ok: true, cats: rest });
  const opts = { sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 365 };
  if (rest[0]) {
    res.cookies.set("sc_active_cat", rest[0].id, opts);
    res.cookies.set("sc_cat", rest[0].name, opts);
  } else {
    res.cookies.set("sc_active_cat", "", { ...opts, maxAge: 0 });
    res.cookies.set("sc_cat", "", { ...opts, maxAge: 0 });
  }
  return res;
}
