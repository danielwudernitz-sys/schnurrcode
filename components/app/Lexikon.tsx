"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { kategorien, signals, type Signal } from "@/lib/catalog";

const emotionLabel: Record<string, string> = {
  positiv: "positiv",
  neutral: "neutral",
  anspannung: "anspannung",
};

export function Lexikon() {
  const [query, setQuery] = React.useState("");

  const q = query.trim().toLowerCase();
  const match = (s: Signal) =>
    !q ||
    s.label.toLowerCase().includes(q) ||
    s.kurz.toLowerCase().includes(q) ||
    s.bedeutung.toLowerCase().includes(q);

  const groups = kategorien
    .map((kat) => ({
      kat,
      items: signals.filter((s) => s.kategorie === kat.id && match(s)),
    }))
    .filter((g) => g.items.length > 0);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Signal suchen … z. B. „Schwanz“, „blinzeln“, „schnurren“"
          className="w-full rounded-full border-2 border-ink/10 bg-paper px-5 py-3 font-body text-ink shadow-card outline-none transition-colors focus:border-honey"
        />
        {q && (
          <p className="mt-2 font-body text-sm text-ink-soft">
            {total} {total === 1 ? "Signal" : "Signale"} gefunden
          </p>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="rounded-brand bg-cream-2/60 px-5 py-6 text-center font-body text-ink-soft">
          Nichts gefunden. Versuch ein anderes Stichwort.
        </p>
      ) : (
        <div className="space-y-10">
          {groups.map(({ kat, items }) => (
            <section key={kat.id}>
              <div className="mb-4 flex items-center gap-3">
                <span className="relative h-9 w-9 overflow-hidden rounded-full bg-paper shadow-card">
                  <Image src={kat.icon} alt="" fill sizes="36px" className="object-cover" />
                </span>
                <h2 className="font-display text-2xl">{kat.label}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((s) => (
                  <article
                    key={s.id}
                    className="rounded-brand bg-paper p-5 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-snug text-ink">
                        {s.label}
                      </h3>
                      <Badge tone={s.emotion}>{emotionLabel[s.emotion]}</Badge>
                    </div>
                    <p className="mt-1 font-body text-sm font-600 text-honey-deep">
                      {s.kurz}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                      {s.bedeutung}
                    </p>
                    {s.tierarztFlag && (
                      <p className="mt-2 font-body text-xs font-600 text-alert">
                        🩺 Kann ein Hinweis auf ein gesundheitliches Problem sein.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default Lexikon;
