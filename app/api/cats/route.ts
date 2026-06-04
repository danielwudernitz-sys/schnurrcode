import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { listCats, createCat } from "@/lib/cats";
import type { Cat } from "@/data/journal";

export const runtime = "nodejs";

const YEAR = 60 * 60 * 24 * 365;

/** Setzt die aktive Katze (Cookies) auf der Response. */
function setActiveCatCookies(res: NextResponse, cat: Cat) {
  const opts = { sameSite: "lax" as const, path: "/", maxAge: YEAR };
  res.cookies.set("sc_active_cat", cat.id, opts);
  res.cookies.set("sc_cat", cat.name, opts);
  res.cookies.set("sc_onboarded", "1", opts);
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  const cats = await listCats(session.email);
  return NextResponse.json({ cats });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  let body: { name?: string; photo_url?: string; breed?: string; age?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }
  const name = (body.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "Bitte gib einen Namen ein." }, { status: 400 });
  }

  const cat = await createCat(session.email, {
    name,
    photo_url: body.photo_url || null,
    breed: body.breed?.trim() || null,
    age: body.age?.trim() || null,
  });

  // neue Katze wird direkt die aktive
  const res = NextResponse.json({ cat });
  setActiveCatCookies(res, cat);
  return res;
}
