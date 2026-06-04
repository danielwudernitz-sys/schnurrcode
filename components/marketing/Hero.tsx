"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Hero mit orchestrierter, gestaffelter Load-Animation. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* weicher Honey-Schein im Hintergrund */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-honey/15 blur-3xl"
      />
      <div className="container-brand grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream-2 px-4 py-1.5 font-body text-sm font-600 text-ink-soft"
          >
            🐱 Knack den Code deiner Katze
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
          >
            Endlich verstehen, was deine Katze dir sagt.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft"
          >
            Schnurr<span className="font-mono font-bold text-honey-deep">code</span>{" "}
            übersetzt ihre Signale — und zeigt dir, wie du{" "}
            <em className="font-display italic text-ink">zurücksprichst</em>.
            Verstehen <span className="text-honey-deep">und</span> antworten,
            beide Wege.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="/uebersetzer-gratis" size="lg">
              Mach den Gratis-Test
            </Button>
            <Button href="/checkout" variant="secondary" size="lg">
              Für 29 € freischalten
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 font-body text-sm text-ink-soft"
          >
            Sofort-Zugang · 29 € einmalig · <strong>kein Abo</strong>
          </motion.p>
        </motion.div>

        {/* Hero-Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="overflow-hidden rounded-brand bg-paper shadow-card">
            <Image
              src="/img/hero-cat.png"
              alt="Eine zufriedene Katze beim langsamen Blinzeln"
              width={2528}
              height={1696}
              priority
              sizes="(max-width: 1024px) 90vw, 540px"
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
