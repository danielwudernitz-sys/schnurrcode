import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { SectionReveal } from "./SectionReveal";

const pains = [
  {
    img: "/img/pain-night.png",
    title: "Sie maunzt nachts — und du weißt nicht, warum.",
    text: "Hunger? Langeweile? Oder steckt mehr dahinter? Ohne Kontext bleibt es Rätselraten.",
  },
  {
    img: "/img/pain-bite.png",
    title: "Erst schnurrt sie, dann beißt sie beim Streicheln.",
    text: "Die Vorsignale sind da — du musst sie nur lesen können, bevor es kippt.",
  },
  {
    img: "/img/pain-confused.png",
    title: "Du weißt nie so recht, was sie gerade will.",
    text: "Schwanz, Ohren, Augen, Laute — jedes Signal allein sagt wenig. Erst zusammen ergeben sie Sinn.",
  },
];

/** "Kennst du das?" — emotionale Pain-Points. */
export function PainPoints() {
  return (
    <section className="container-brand py-16 sm:py-20">
      <SectionReveal className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl">Kennst du das?</h2>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Du liebst deine Katze — aber manchmal redet ihr aneinander vorbei.
        </p>
      </SectionReveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {pains.map((p, i) => (
          <SectionReveal key={p.title} delay={i * 0.08}>
            <Card className="h-full">
              <div className="mb-4 overflow-hidden rounded-[16px] bg-cream-2">
                <Image
                  src={p.img}
                  alt=""
                  width={2048}
                  height={2048}
                  sizes="(max-width: 640px) 90vw, 340px"
                  className="h-auto w-full"
                />
              </div>
              <h3 className="font-display text-xl leading-snug">{p.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                {p.text}
              </p>
            </Card>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

export default PainPoints;
