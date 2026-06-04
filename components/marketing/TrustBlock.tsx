import * as React from "react";
import { SectionReveal } from "./SectionReveal";

/**
 * Vertrauens-Block: seriöse Basis + der ehrliche Twist (Differenzierung!)
 * + Tierarzt-Sicherheitsversprechen.
 */
export function TrustBlock() {
  return (
    <section className="container-brand py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
          Ehrlich statt esoterisch
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Basiert auf seriöser Katzenverhaltenskunde.
        </h2>
        <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
          Wir stützen uns auf gängige Ethologie und anerkannte Quellen — keine
          Küchenpsychologie. Und wir trauen uns, das Unbequeme zu sagen:
        </p>
      </SectionReveal>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
        <SectionReveal>
          <div className="h-full rounded-brand border-2 border-honey/30 bg-honey/5 p-7">
            <p className="font-display text-2xl leading-snug text-ink">
              „Wir sagen dir auch, wann Schnurren <em>kein</em> gutes Zeichen
              ist.“
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
              Katzen schnurren auch zur Selbstberuhigung bei Stress oder
              Schmerz. Schnurrcode liest den Kontext mit — statt dir nur das
              Schöne zu erzählen.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="flex h-full flex-col gap-3 rounded-brand bg-paper p-7 shadow-card">
            <span className="text-2xl" aria-hidden="true">
              🩺
            </span>
            <p className="font-display text-xl">Dein Sicherheitsversprechen</p>
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              Bei jedem Problem zeigt dir ein <strong>rotes Warnfeld</strong>{" "}
              klare Red-Flags: „Sofort zum Tierarzt, wenn …“. Schnurrcode ist
              kein Tierarzt-Ersatz — sondern hilft dir zu erkennen, wann es
              einer sein muss.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export default TrustBlock;
