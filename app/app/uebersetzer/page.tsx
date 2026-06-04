import type { Metadata } from "next";
import { DecoderBuilder } from "@/components/decoder/DecoderBuilder";
import { getCatName } from "@/lib/session";

export const metadata: Metadata = { title: "Übersetzer" };

export default async function UebersetzerPage() {
  const catName = await getCatName();

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
          Der Übersetzer
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {catName ? `Was sagt dir ${catName}?` : "Was sagt deine Katze?"}
        </h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Wähl pro Bereich ein Signal — Schnurrcode kombiniert sie zu einer
          klaren Deutung. Oder beschreib es in eigenen Worten.
        </p>
      </header>

      <DecoderBuilder
        mode="voll"
        catName={catName}
        enableAI
        enableFavorites
      />
    </div>
  );
}
