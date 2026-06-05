"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/track";

export function CheckoutForm({
  priceLabel,
  bumpLabel,
}: {
  priceLabel: string;
  bumpLabel: string;
}) {
  const [email, setEmail] = React.useState("");
  const [bump, setBump] = React.useState(false);
  const [verzicht, setVerzicht] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!verzicht) {
      setError(
        "Bitte bestätige den Hinweis zum sofortigen Lieferbeginn, um fortzufahren."
      );
      return;
    }
    setLoading(true);
    track("InitiateCheckout");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bump, widerrufVerzicht: verzicht }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Checkout konnte nicht gestartet werden.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Verbindungsfehler. Bitte versuch es erneut.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="email" className="font-body text-sm font-600 text-ink">
          E-Mail (für deinen Zugang)
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          className="mt-2 w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors focus:border-honey"
        />
      </div>

      {/* Order-Bump */}
      <label className="flex cursor-pointer items-start gap-3 rounded-brand border-2 border-honey/30 bg-honey/5 p-4">
        <input
          type="checkbox"
          checked={bump}
          onChange={(e) => setBump(e.target.checked)}
          className="mt-1 h-4 w-4 flex-shrink-0 accent-[var(--honey)]"
        />
        <span>
          <span className="font-body font-700 text-ink">{bumpLabel}</span>
          <span className="mt-0.5 block font-body text-sm text-ink-soft">
            Die wichtigsten Notfall-Symptome auf einen Blick — als zusätzliches
            PDF. Einmalig dazu.
          </span>
        </span>
      </label>

      {/* FAGG-Widerrufsverzicht — Pflicht */}
      <label className="flex items-start gap-3 font-body text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={verzicht}
          onChange={(e) => setVerzicht(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--honey)]"
        />
        <span>
          Ich stimme ausdrücklich zu, dass mit der Bereitstellung des digitalen
          Inhalts sofort begonnen wird, und ich bestätige meine Kenntnis davon,
          dass ich dadurch mein Widerrufsrecht verliere. (
          <Link href="/widerruf" target="_blank" className="text-honey-deep underline">
            Widerrufsbelehrung
          </Link>
          )
        </span>
      </label>

      {error && <p className="font-body text-sm text-alert">{error}</p>}

      <Button type="submit" size="lg" disabled={loading} className="w-full justify-center">
        {loading ? "Weiter zu Stripe …" : `Jetzt kaufen — ${priceLabel}`}
      </Button>

      <p className="text-center font-body text-xs text-ink-soft">
        Sichere Zahlung über Stripe · digitaler Sofort-Zugang
      </p>
    </form>
  );
}

export default CheckoutForm;
