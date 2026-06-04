// Stripe über die REST-API (kein SDK) — Checkout-Session erstellen +
// Webhook-Signatur verifizieren (Web Crypto). Env-guarded.

const SECRET = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export function stripeConfigured(): boolean {
  return Boolean(SECRET);
}

export type CheckoutInput = {
  email?: string;
  /** Basispreis in Cent (Vollzugang) */
  amount: number;
  /** Order-Bump (Notfall-Spickzettel) zubuchen */
  bump: boolean;
  bumpAmount: number;
  successUrl: string;
  cancelUrl: string;
};

/** Erstellt eine Stripe-Checkout-Session, gibt die Redirect-URL zurück. */
export async function createCheckoutSession(
  input: CheckoutInput
): Promise<{ url: string } | { error: string }> {
  if (!SECRET) {
    return { error: "Zahlung ist noch nicht konfiguriert (STRIPE_SECRET_KEY fehlt)." };
  }

  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", input.successUrl);
  form.set("cancel_url", input.cancelUrl);
  form.set("payment_method_types[0]", "card");
  if (input.email) form.set("customer_email", input.email);
  // OSS/Umsatzsteuer: Land pro Verkauf zwingend erfassen
  form.set("billing_address_collection", "required");

  // Position 1: Vollzugang
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[0][price_data][currency]", "eur");
  form.set("line_items[0][price_data][unit_amount]", String(input.amount));
  form.set(
    "line_items[0][price_data][product_data][name]",
    "Schnurrcode Vollzugang"
  );

  // Position 2: Order-Bump (optional)
  if (input.bump) {
    form.set("line_items[1][quantity]", "1");
    form.set("line_items[1][price_data][currency]", "eur");
    form.set("line_items[1][price_data][unit_amount]", String(input.bumpAmount));
    form.set(
      "line_items[1][price_data][product_data][name]",
      "Notfall-Symptom-Spickzettel (PDF)"
    );
  }
  form.set("metadata[bump]", input.bump ? "1" : "0");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!res.ok) {
    const txt = await res.text();
    return { error: `Stripe-Fehler: ${txt.slice(0, 200)}` };
  }
  const data = (await res.json()) as { url?: string };
  if (!data.url) return { error: "Stripe lieferte keine Checkout-URL." };
  return { url: data.url };
}

/** Verifiziert die Stripe-Webhook-Signatur (t + v1 Schema). */
export async function verifyStripeSignature(
  payload: string,
  sigHeader: string | null
): Promise<boolean> {
  if (!WEBHOOK_SECRET || !sigHeader) return false;
  const parts = Object.fromEntries(
    sigHeader.split(",").map((kv) => kv.split("=") as [string, string])
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${payload}`));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // konstante-Zeit-Vergleich
  if (expected.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++)
    diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}
