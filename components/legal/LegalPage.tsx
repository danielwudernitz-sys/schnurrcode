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
        <div className="legal-prose mt-8 space-y-6 font-body leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl text-ink">{children}</h2>;
}

export default LegalPage;
