import type { Metadata } from "next";
import { Lexikon } from "@/components/app/Lexikon";

export const metadata: Metadata = { title: "Nachschlagen" };

export default function LexikonPage() {
  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
          Nachschlagen
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          Alle Signale zum Nachschlagen
        </h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Dein Nachschlagewerk für die Katzensprache — durchsuchbar, gruppiert,
          zum Stöbern.
        </p>
      </header>

      <Lexikon />
    </div>
  );
}
