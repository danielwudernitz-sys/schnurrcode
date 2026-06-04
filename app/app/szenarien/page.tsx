import type { Metadata } from "next";
import { SzenarienLibrary } from "@/components/app/SzenarienLibrary";
import { ShareButton } from "@/components/ShareButton";

export const metadata: Metadata = { title: "Alltags-Situationen" };

export default function SzenarienPage() {
  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Alltags-Situationen
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Genau die Momente, die du googelst
          </h1>
          <p className="mt-3 font-body text-lg text-ink-soft">
            Verstehen <em className="font-display italic">und</em> antworten — Seite
            an Seite. Für die typischen Situationen aus dem Katzenalltag.
          </p>
        </div>
        <ShareButton text="Diese Katzen-Szenarien erklären endlich, was sie wirklich will 🐱" />
      </header>

      <SzenarienLibrary />
    </div>
  );
}
