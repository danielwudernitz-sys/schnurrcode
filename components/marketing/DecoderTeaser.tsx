"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Emotion = "positiv" | "neutral" | "anspannung";

const samples: {
  id: string;
  label: string;
  emotion: Emotion;
  deutung: string;
}[] = [
  {
    id: "blink",
    label: "👁️ Langsames Blinzeln",
    emotion: "positiv",
    deutung:
      "Der „Katzenkuss“: Zuneigung und Vertrauen. Blinzle ganz langsam zurück — sie versteht dich.",
  },
  {
    id: "peitschen",
    label: "🐈 Schwanz peitschen",
    emotion: "anspannung",
    deutung:
      "Gereizt, Frust — ein klares „lass mich“. Jetzt Ruhe und Abstand geben, nicht weiterstreicheln.",
  },
  {
    id: "kneten",
    label: "🐾 Kneten („Milchtritt“)",
    emotion: "positiv",
    deutung:
      "Tiefes Wohlgefühl und Bindung — ein Stück Kindheit. Sie fühlt sich bei dir geborgen.",
  },
];

const emotionLabel: Record<Emotion, string> = {
  positiv: "positiv",
  neutral: "neutral",
  anspannung: "anspannung",
};

/** Eingebettete Mini-Vorschau des Decoders (Gratis-Teaser). */
export function DecoderTeaser() {
  const [activeId, setActiveId] = React.useState<string>(samples[0].id);
  const active = samples.find((s) => s.id === activeId)!;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-brand grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Probier's gratis
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Tipp ein Signal an — sieh, was sie meint.
          </h2>
          <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-ink-soft">
            Das ist nur ein winziger Vorgeschmack. Im Gratis-Test übersetzt du
            ein Signal frei — die Vollversion kombiniert über 40.
          </p>
          <div className="mt-7">
            <Button href="/uebersetzer-gratis" size="lg">
              Zum Gratis-Übersetzer
            </Button>
          </div>
        </div>

        {/* interaktive Mini-Karte (kein Form-Reload) */}
        <div className="rounded-brand bg-cream p-6 shadow-card sm:p-7">
          <p className="mb-3 font-body text-sm font-600 text-ink-soft">
            Was macht deine Katze?
          </p>
          <div className="flex flex-wrap gap-2">
            {samples.map((s) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={isActive}
                  className={
                    "rounded-full px-4 py-2 font-body text-sm font-600 transition-all " +
                    (isActive
                      ? "bg-honey text-ink shadow-[0_8px_18px_-10px_rgba(201,126,31,.9)]"
                      : "bg-paper text-ink-soft hover:text-ink")
                  }
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-[16px] bg-paper p-5 shadow-card"
            >
              <Badge tone={active.emotion}>{emotionLabel[active.emotion]}</Badge>
              <p className="mt-3 font-body text-[0.97rem] leading-relaxed text-ink">
                {active.deutung}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default DecoderTeaser;
