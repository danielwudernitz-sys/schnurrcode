import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionReveal } from "./SectionReveal";

const included = [
  "Voll-Übersetzer mit über 40 Signalen & smarten Kombinationen",
  "Zwei-Wege-Kommunikation + interaktiver Slow-Blink-Trainer",
  "Problemlöser-Bibliothek mit Tierarzt-Warnsystem",
  "Durchsuchbares Schnurr-Lexikon",
  "Persönlich auf den Namen deiner Katze",
  "Kompletter Guide als PDF zum Download",
];

/** Preis-Block: 29 € einmalig, kein Abo. */
export function PriceBlock() {
  return (
    <section id="preis" className="container-brand py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-brand bg-ink text-paper shadow-card">
          <div className="border-b border-paper/10 p-8 text-center">
            <Badge tone="honey">Einmalkauf · kein Abo</Badge>
            <div className="mt-4 flex items-end justify-center gap-1">
              <span className="font-display text-6xl leading-none">29 €</span>
              <span className="mb-1 font-body text-sm text-paper/60">
                einmalig
              </span>
            </div>
            <p className="mt-3 font-body text-paper/70">
              Einmal zahlen, für immer behalten. Sofort-Zugang per E-Mail.
            </p>
          </div>

          <div className="p-8">
            <ul className="space-y-3">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-honey text-xs text-ink"
                  >
                    ✓
                  </span>
                  <span className="font-body text-[0.97rem] text-paper/90">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href="/checkout"
                size="lg"
                className="w-full justify-center"
              >
                Jetzt für 29 € freischalten
              </Button>
            </div>
            <p className="mt-4 text-center font-body text-xs text-paper/60">
              Digitaler Sofort-Zugang · sichere Zahlung über Stripe
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

export default PriceBlock;
