import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { SectionReveal } from "./SectionReveal";

const features = [
  {
    icon: "/img/icon-decoder.jpg",
    title: "Der Übersetzer",
    text: "Wähl die Signale, die du siehst — Schwanz, Ohren, Augen, Laute. Schnurrcode kombiniert sie zu einer klaren Deutung.",
  },
  {
    icon: "/img/icon-zweiwege.png",
    title: "Zurücksprechen",
    text: "Nicht nur verstehen, sondern zurücksprechen. Mit dem Slow-Blink-Trainer sagst du „Ich hab dich lieb“ auf Katze.",
  },
  {
    icon: "/img/icon-problemloeser.png",
    title: "Probleme lösen",
    text: "Pinkeln neben das Klo, nächtliches Schreien & Co. — mit ehrlichem Tierarzt-Warnsystem, das dich schützt.",
  },
  {
    icon: "/img/icon-lexikon.png",
    title: "Nachschlagen",
    text: "Alle 40+ Signale zum Nachschlagen und Stöbern. Dein Nachschlagewerk für die Katzensprache.",
  },
];

/** "Was Schnurrcode kann" — 4 Feature-Karten mit Icons. */
export function Features() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-brand">
        <SectionReveal className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl">
            Was Schnurrcode kann
          </h2>
          <p className="mt-3 font-body text-lg text-ink-soft">
            Vier Werkzeuge, ein Ziel: euch besser verstehen.
          </p>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.07}>
              <Card interactive className="h-full bg-cream">
                <div className="mb-4 h-20 w-20 overflow-hidden rounded-[18px] bg-paper shadow-card">
                  <Image
                    src={f.icon}
                    alt=""
                    width={2048}
                    height={2048}
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl">{f.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  {f.text}
                </p>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
