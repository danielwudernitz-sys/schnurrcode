import * as React from "react";
import { SectionReveal } from "./SectionReveal";

type Testimonial = { text: string; name: string; cat?: string };

/**
 * ECHTE Bewertungen hier eintragen — dann erscheint der Block automatisch.
 * Solange das Array leer ist, wird NICHTS angezeigt (keine erfundenen Reviews!).
 * Beispiel:
 *   { text: "Minka beißt seit Schnurrcode nicht mehr beim Streicheln.", name: "Lena K.", cat: "mit Minka" }
 */
const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-brand">
        <SectionReveal className="mb-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Das sagen andere Katzenmenschen
          </h2>
        </SectionReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-brand bg-cream p-6 shadow-card">
                <div className="mb-2 text-honey" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="flex-1 font-body text-[0.97rem] leading-relaxed text-ink">
                  „{t.text}“
                </blockquote>
                <figcaption className="mt-4 font-body text-sm font-600 text-ink-soft">
                  {t.name}
                  {t.cat ? ` · ${t.cat}` : ""}
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
