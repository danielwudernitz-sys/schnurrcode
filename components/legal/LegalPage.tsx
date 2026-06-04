import * as React from "react";

/** Einheitlicher Rahmen für Rechtsseiten. */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-brand py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 font-body text-lg text-ink-soft">{intro}</p>}
        <div className="legal-prose mt-8 space-y-6 font-body text-ink-soft">
          {children}
        </div>
        <p className="mt-12 rounded-brand bg-cream-2/60 px-4 py-3 font-body text-xs text-ink-soft">
          Platzhalter-Struktur. Die finalen Inhalte werden von Daniel bzw.
          seinem Rechts-/Steuerberater geliefert und vor Launch eingesetzt.
        </p>
      </div>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl text-ink">{children}</h2>;
}

export default LegalPage;
