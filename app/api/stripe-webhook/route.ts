import { NextResponse, type NextRequest } from "next/server";
import { verifyStripeSignature } from "@/lib/stripe";
import { saveOrder } from "@/lib/db";
import { sendMagicLink } from "@/lib/email";
import { signSession } from "@/lib/auth";
import { PRODUCT_NAME, SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const payload = await req.text(); // Roh-Body für Signaturprüfung
  const sig = req.headers.get("stripe-signature");

  const valid = await verifyStripeSignature(payload, sig);
  if (!valid) {
    return NextResponse.json({ error: "Ungültige Signatur." }, { status: 400 });
  }

  let event: {
    type: string;
    data: { object: Record<string, unknown> };
  };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Ungültiges JSON." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Record<string, unknown>;
    const email =
      (s.customer_email as string) ||
      ((s.customer_details as Record<string, unknown>)?.email as string) ||
      "";
    const country =
      ((s.customer_details as Record<string, unknown>)
        ?.address as Record<string, unknown>)?.country as string | undefined;
    const bump = (s.metadata as Record<string, unknown>)?.bump === "1";
    const sessionId = (s.id as string) || "";

    if (email) {
      // Käufer speichern (Land zwingend für OSS/Umsatzsteuer)
      await saveOrder({
        email: email.toLowerCase(),
        country,
        product: PRODUCT_NAME,
        bump,
        stripeSession: sessionId,
      });

      // Magic-Link-Zugangsmail (kurzlebiger Login-Token)
      const token = await signSession({
        email: email.toLowerCase(),
        paid: true,
        bump,
        exp: Math.floor(Date.now() / 1000) + 60 * 30,
      });
      const link = `${SITE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`;
      await sendMagicLink(email, link);
    }
  }

  return NextResponse.json({ received: true });
}
