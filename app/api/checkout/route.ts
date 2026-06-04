import { NextResponse, type NextRequest } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { PRICE_CENTS, BUMP_CENTS, SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: string; bump?: boolean; widerrufVerzicht?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // PFLICHT vor Kauf: FAGG-Widerrufsverzicht
  if (!body.widerrufVerzicht) {
    return NextResponse.json(
      { error: "Bitte bestätige den Hinweis zum Widerrufsrecht, um fortzufahren." },
      { status: 400 }
    );
  }

  const result = await createCheckoutSession({
    email: body.email,
    amount: PRICE_CENTS,
    bump: Boolean(body.bump),
    bumpAmount: BUMP_CENTS,
    successUrl: `${SITE_URL}/danke?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${SITE_URL}/checkout?abgebrochen=1`,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ url: result.url });
}
