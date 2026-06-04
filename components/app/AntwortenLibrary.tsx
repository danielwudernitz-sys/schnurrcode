"use client";

import * as React from "react";
import {
  ANTWORTEN,
  ANTWORT_KATEGORIEN,
  type AntwortKategorie,
} from "@/data/antworten";

export function AntwortenLibrary() {
  const [aktiv, setAktiv] = React.useState<AntwortKategorie | "alle">("alle");

  const liste =
    aktiv === "alle" ? ANTWORTEN : ANTWORTEN.filter((a) => a.kategorie === aktiv);

  return (
    <div>
      {/* Kategorie-Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={aktiv === "alle"} onClick={() => setAktiv("alle")}>
          Alle
        </FilterChip>
        {ANTWORT_KATEGORIEN.map((k) => (
          <FilterChip
            key={k.id}
            active={aktiv === k.id}
            onClick={() => setAktiv(k.id)}
          >
            {k.label}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {liste.map((a) => (
          <article key={a.id} className="flex flex-col rounded-brand bg-paper p-6 shadow-card">
            <h3 className="font-display text-xl text-ink">{a.titel}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
              {a.worumGehts}
            </p>

            <div className="mt-4 rounded-[16px] bg-cream-2/50 p-4">
              <p className="font-body text-xs font-700 uppercase tracking-wide text-honey-deep">
                Warum das wirkt
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
                {a.warumWirkt}
              </p>
            </div>

            <p className="mt-4 font-body text-sm font-700 text-ink">So machst du's</p>
            <ul className="mt-2 space-y-1.5">
              {a.soMachstDu.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-honey/20 text-xs font-700 text-honey-deep"
                  >
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-start gap-2 rounded-[14px] bg-alert/8 px-4 py-3">
              <span aria-hidden="true">⚠️</span>
              <p className="font-body text-sm text-ink">
                <span className="font-700">Häufiger Fehler: </span>
                {a.haeufigerFehler}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-full px-4 py-2 font-body text-sm font-600 transition-colors " +
        (active
          ? "bg-honey text-ink shadow-[0_8px_18px_-10px_rgba(201,126,31,.9)]"
          : "bg-paper text-ink-soft shadow-card hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

export default AntwortenLibrary;
