import type { Metadata } from "next";
import { LeadGateDecoder } from "@/components/decoder/LeadGateDecoder";
import { ShareButton } from "@/components/ShareButton";
import { DisclaimerNote } from "@/components/DisclaimerNote";

export const metadata: Metadata = {
  title: "Gratis-Übersetzer — was sagt deine Katze?",
  description:
    "Probier den Schnurrcode-Übersetzer gratis: Wähl die Signale deiner Katze und sieh, was sie dir sagt. Drei Deutungen kostenlos.",
  openGraph: {
    title: "Was sagt deine Katze? — Gratis-Übersetzer",
    description: "Gib ein, was deine Katze macht, und knack den Code.",
    images: ["/img/og.png"],
  },
};

export default function UebersetzerGratisPage() {
  return (
    <div className="container-brand py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Gratis-Test
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Was sagt deine Katze?
          </h1>
          <p className="mt-3 font-body text-lg text-ink-soft">
            Wähl die Signale, die du gerade siehst — und sieh, was deine Katze
            dir damit sagt. Drei Deutungen sind gratis.
          </p>
        </div>
        <ShareButton />
      </div>

      <LeadGateDecoder />

      <div className="mt-10 max-w-xl">
        <DisclaimerNote variant="card" />
      </div>
    </div>
  );
}
