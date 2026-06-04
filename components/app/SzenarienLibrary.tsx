"use client";

import * as React from "react";
import { VetWarning } from "@/components/decoder/VetWarning";
import { SZENARIEN } from "@/data/szenarien";

export function SzenarienLibrary() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SZENARIEN;
    return SZENARIEN.filter(
      (s) =>
        s.titel.toLowerCase().includes(q) ||
        s.situation.toLowerCase().includes(q) ||
        s.wasSieSagt.toLowerCase().includes(q) ||
        s.soAntwortest.some((x) => x.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Situation suchen … z. B. „5 Uhr“, „Bauch“, „Gewitter“"
          className="w-full rounded-full border-2 border-ink/10 bg-paper px-5 py-3 font-body text-ink shadow-card outline-none transition-colors focus:border-honey"
        />
        <p className="mt-2 font-body text-sm text-ink-soft">
          {filtered.length} {filtered.length === 1 ? "Situation" : "Situationen"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-brand bg-cream-2/60 px-5 py-6 text-center font-body text-ink-soft">
          Nichts gefunden. Versuch ein anderes Stichwort.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((s) => (
            <article key={s.id} className="flex flex-col rounded-brand bg-paper p-6 shadow-card">
              <h3 className="font-display text-xl text-ink">{s.titel}</h3>
              <p className="mt-1 font-body text-sm italic text-ink-soft">
                {s.situation}
              </p>

              <div className="mt-4 rounded-[16px] bg-cream-2/50 p-4">
                <p className="font-body text-xs font-700 uppercase tracking-wide text-honey-deep">
                  Was sie sagt
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
                  {s.wasSieSagt}
                </p>
              </div>

              <p className="mt-4 font-body text-sm font-700 text-ink">
                So antwortest du
              </p>
              <ul className="mt-2 space-y-1.5">
                {s.soAntwortest.map((x, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-honey/20 text-xs font-700 text-honey-deep"
                    >
                      {i + 1}
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-start gap-2 rounded-[14px] bg-honey/10 px-4 py-3">
                <span aria-hidden="true">💡</span>
                <p className="font-body text-sm text-ink">
                  <span className="font-700">Geheimtipp: </span>
                  {s.tipp}
                </p>
              </div>

              {s.tierarztHinweis && (
                <div className="mt-4">
                  <VetWarning title="Tierarzt-Hinweis">{s.tierarztHinweis}</VetWarning>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default SzenarienLibrary;
