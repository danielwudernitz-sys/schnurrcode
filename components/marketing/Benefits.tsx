import * as React from "react";
import { SectionReveal } from "./SectionReveal";

const benefits = [
  {
    icon: "🔍",
    titel: "Schluss mit Rätselraten",
    text: "Du weißt endlich, was deine Katze gerade will — statt jedes Maunzen zu deuten.",
  },
  {
    icon: "🙅",
    titel: "Weniger Kratzen & Beißen",
    text: "Du erkennst die Vorsignale, bevor es eskaliert — und reagierst richtig.",
  },
  {
    icon: "💛",
    titel: "Endlich zurücksprechen",
    text: "Mit dem Slow-Blink-Trainer sagst du ihr „Ich hab dich lieb“ — auf Katze.",
  },
  {
    icon: "🩺",
    titel: "Sicherheit bei Sorgen",
    text: "Das Tierarzt-Warnsystem zeigt dir klar, wann ein Verhalten ernst ist.",
  },
];

/** „Was sich für dich ändert" — nutzenorientierter Block. */
export function Benefits() {
  return (
    <section className="container-brand py-16 sm:py-20">
      <SectionReveal className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl">
          Was sich für dich ändert
        </h2>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Nicht noch ein Artikel zum Lesen — ein Werkzeug, das euren Alltag
          leichter macht.
        </p>
      </SectionReveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {benefits.map((b, i) => (
          <SectionReveal key={b.titel} delay={i * 0.06}>
            <div className="flex h-full items-start gap-4 rounded-brand bg-paper p-6 shadow-card">
              <span className="text-3xl" aria-hidden="true">
                {b.icon}
              </span>
              <div>
                <h3 className="font-display text-xl">{b.titel}</h3>
                <p className="mt-1 font-body text-[0.97rem] leading-relaxed text-ink-soft">
                  {b.text}
                </p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
