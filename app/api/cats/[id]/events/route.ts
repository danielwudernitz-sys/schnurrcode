import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { listEvents, createEvent, getCat } from "@/lib/cats";
import { KATEGORIEN, type EventKategorie } from "@/data/journal";

export const runtime = "nodejs";

const validCat = (c: string): c is EventKategorie =>
  KATEGORIEN.some((k) => k.id === c);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  const month = req.nextUrl.searchParams.get("month") ?? undefined;
  const events = await listEvents(session.email, params.id, month || undefined);
  return NextResponse.json({ events });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  // sicherstellen, dass die Katze dem Nutzer gehört
  const cat = await getCat(session.email, params.id);
  if (!cat) return NextResponse.json({ error: "Katze nicht gefunden." }, { status: 404 });

  let body: { date?: string; note?: string; category?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }

  const date = (body.date ?? "").trim();
  const note = (body.note ?? "").trim();
  const category = body.category ?? "sonstiges";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Ungültiges Datum." }, { status: 400 });
  }
  if (!note) {
    return NextResponse.json({ error: "Bitte schreib eine kurze Notiz." }, { status: 400 });
  }

  const event = await createEvent(session.email, params.id, {
    date,
    note,
    category: validCat(category) ? category : "sonstiges",
  });
  return NextResponse.json({ event });
}
