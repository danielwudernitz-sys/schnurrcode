"use client";

import * as React from "react";
import { VetWarning } from "@/components/decoder/VetWarning";
import { Badge } from "@/components/ui/Badge";
import { PROBLEME, type Problem, type Schweregrad } from "@/data/probleme";

const schweregradTon: Record<Schweregrad, { tone: "neutral" | "honey" | "alert"; label: string }> = {
  info: { tone: "neutral", label: "Info" },
  achtung: { tone: "honey", label: "Achtung" },
  ernst: { tone: "alert", label: "Ernst" },
};

function ProblemCard({ p }: { p: Problem }) {
  const [open, setOpen] = React.useState(false);
  const sg = schweregradTon[p.schweregrad];
  return (
    <div className="overflow-hidden rounded-brand bg-paper shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span>
          <span className="flex items-center gap-2">
            <span className="font-display text-xl text-ink">{p.titel}</span>
            <Badge tone={sg.tone}>{sg.label}</Badge>
          </span>
          <span className="mt-1 block font-body text-sm text-ink-soft">
            {p.kurz}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={
            "mt-1 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-cream-2 text-ink-soft transition-transform duration-200 " +
            (open ? "rotate-45" : "")
          }
        >
          +
        </span>
      </button>

      {open && (
        <div className="space-y-5 px-6 pb-6">
          <div>
            <p className="font-body text-sm font-700 text-ink">
              Was dahinterstecken kann
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.ursachen.map((u, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                  <span aria-hidden="true" className="mt-1 text-honey-deep">•</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-700 text-ink">
              Was du tun kannst
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.wasTun.map((l, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-success/15 text-xs text-success"
                  >
                    ✓
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <VetWarning title="Tierarzt-Warnung">{p.tierarztWarnung}</VetWarning>
        </div>
      )}
    </div>
  );
}

export function ProblemLibrary() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROBLEME;
    return PROBLEME.filter(
      (p) =>
        p.titel.toLowerCase().includes(q) ||
        p.kurz.toLowerCase().includes(q) ||
        p.ursachen.some((u) => u.toLowerCase().includes(q)) ||
        p.wasTun.some((l) => l.toLowerCase().includes(q)) ||
        p.tierarztWarnung.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Problem suchen … z. B. „pinkeln“, „nachts“, „frisst nicht“"
          className="w-full rounded-full border-2 border-ink/10 bg-paper px-5 py-3 font-body text-ink shadow-card outline-none transition-colors focus:border-honey"
        />
        <p className="mt-2 font-body text-sm text-ink-soft">
          {filtered.length} {filtered.length === 1 ? "Thema" : "Themen"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-brand bg-cream-2/60 px-5 py-6 text-center font-body text-ink-soft">
          Nichts gefunden. Versuch ein anderes Stichwort.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <ProblemCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProblemLibrary;
