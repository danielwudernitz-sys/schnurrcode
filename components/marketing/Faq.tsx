import * as React from "react";
import { SectionReveal } from "./SectionReveal";

const faqs = [
  {
    q: "Wie schnell habe ich Zugang?",
    a: "Sofort. Direkt nach der Zahlung bekommst du eine E-Mail mit deinem persönlichen Zugangslink — kein Warten, kein Versand.",
  },
  {
    q: "Ist das ein Abo?",
    a: "Nein. Du zahlst 29 € einmalig und behältst den vollen Zugang. Keine versteckten Kosten, keine Verlängerung.",
  },
  {
    q: "Ersetzt Schnurrcode den Tierarzt?",
    a: "Nein — und das sagen wir ganz klar. Schnurrcode hilft dir, deine Katze besser zu verstehen, und zeigt dir mit deutlichen Warnhinweisen, wann ein Tierarztbesuch nötig ist. Bei gesundheitlichen Sorgen gilt immer: ab zur Tierärztin oder zum Tierarzt.",
  },
  {
    q: "Auf welchen Geräten funktioniert es?",
    a: "Auf allen. Schnurrcode läuft im Browser auf Handy, Tablet und Computer — nichts zu installieren. Den Guide gibt es zusätzlich als PDF zum Download.",
  },
  {
    q: "Kann ich digitale Inhalte zurückgeben?",
    a: "Da du sofort vollen Zugang bekommst, stimmst du beim Kauf dem sofortigen Lieferbeginn zu und verzichtest auf das 14-tägige Widerrufsrecht. Den genauen Wortlaut findest du vor dem Kauf und in der Widerrufsbelehrung.",
  },
];

/** FAQ — native <details> für SEO & Zugänglichkeit, kein Form-Reload. */
export function Faq() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-brand mx-auto max-w-3xl">
        <SectionReveal className="mb-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Häufige Fragen</h2>
        </SectionReveal>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-brand bg-cream px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-paper text-ink-soft transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 font-body text-[0.97rem] leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
