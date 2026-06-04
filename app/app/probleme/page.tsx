import type { Metadata } from "next";
import Image from "next/image";
import { ProblemLibrary } from "@/components/app/ProblemLibrary";
import { VetWarning } from "@/components/decoder/VetWarning";

export const metadata: Metadata = { title: "Probleme lösen" };

export default function ProblemePage() {
  return (
    <div>
      <header className="mb-6 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Probleme lösen
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Häufige Probleme — ehrlich gelöst
          </h1>
          <p className="mt-3 font-body text-lg text-ink-soft">
            Ursachen verstehen, konkret handeln — und klar wissen, wann es ein
            Fall für die Tierärztin oder den Tierarzt ist.
          </p>
        </div>
        <div className="relative hidden h-32 w-32 overflow-hidden rounded-brand sm:block">
          <Image
            src="/img/problem-header.png"
            alt=""
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mb-8">
        <VetWarning>
          Schnurrcode hilft dir, Verhalten einzuordnen — ist aber{" "}
          <strong>kein Ersatz für tierärztlichen Rat</strong>. Die roten
          Warnfelder zeigen dir, wann du nicht abwarten solltest.
        </VetWarning>
      </div>

      <ProblemLibrary />
    </div>
  );
}
