import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

// Meta Conversions API (serverseitig). Env-guarded: ohne Konfiguration No-Op.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_TOKEN;

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !TOKEN) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: { event?: string; params?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültig." }, { status: 400 });
  }
  if (!body.event) {
    return NextResponse.json({ error: "Kein Event." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const ua = req.headers.get("user-agent") || undefined;

  try {
    await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: body.event,
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              user_data: {
                client_ip_address: ip,
                client_user_agent: ua,
              },
              custom_data: body.params ?? {},
            },
          ],
        }),
      }
    );
  } catch {
    /* best effort */
  }
  return NextResponse.json({ ok: true });
}
