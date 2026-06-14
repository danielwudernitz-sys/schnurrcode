import * as React from "react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "./SectionReveal";

/** Wiederholter Call-to-Action in der Seitenmitte. */
export function MidCta() {
  return (
    <section className="container-brand py-10 sm:py-14">
      <SectionReveal>
        <div className="rounded-brand border-2 border-honey/30 bg-honey/10 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl">
            Versteh deine Katze ab heute.
          </h2>
          <p className="mt-2 font-body text-ink-soft">
            Einmalig 29 € · kein Abo · Sofort-Zugang per E-Mail.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/checkout" size="lg">
              Jetzt verstehen – 29 €
            </Button>
            <Button href="/uebersetzer-gratis" variant="secondary" size="lg">
              Erst gratis testen
            </Button>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

export default MidCta;
