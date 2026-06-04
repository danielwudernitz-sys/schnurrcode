import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { deleteEvent } from "@/lib/cats";

export const runtime = "nodejs";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; eventId: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  await deleteEvent(session.email, params.id, params.eventId);
  return NextResponse.json({ ok: true });
}
