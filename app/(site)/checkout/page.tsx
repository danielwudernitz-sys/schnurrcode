import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { TrackOnMount } from "@/components/TrackOnMount";
import { PRICE_CENTS, formatEuro } from "@/lib/config";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

const included = [
  "Voll-Übersetzer mit über 40 Signalen & Kombinationen",
  "Zwei-Wege + Slow-Blink-Trainer",
  "Problemlöser mit Tierarzt-Warnsystem",
  "Schnurr-Lexikon & PDF-Guide",
];

export default function CheckoutPage() {
  return (
    <div className="container-brand py-12 sm:py-16">
      <TrackOnMount events={["AddToCart"]} />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        {/* Zusammenfassung */}
        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Vollzugang
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Schnurrcode freischalten
          </h1>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-display text-5xl">{formatEuro(PRICE_CENTS)}</span>
            <span className="mb-1.5 font-body text-sm text-ink-soft">
              einmalig · kein Abo
            </span>
          </div>

          <ul className="mt-6 space-y-2.5">
            {included.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-honey text-xs text-ink"
                >
                  ✓
                </span>
                <span className="font-body text-[0.97rem] text-ink-soft">{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <DisclaimerNote variant="card" />
          </div>
        </div>

        {/* Formular */}
        <div className="rounded-brand bg-paper p-6 shadow-card sm:p-8">
          <CheckoutForm priceLabel={formatEuro(PRICE_CENTS)} />
        </div>
      </div>
    </div>
  );
}
