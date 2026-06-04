"use client";

import * as React from "react";
import { KATEGORIEN, kategorieInfo, type Cat, type CatEvent, type EventKategorie } from "@/data/journal";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export function CatJournal({ cat }: { cat: Cat }) {
  const today = new Date();
  const [year, setYear] = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth()); // 0-11
  const [selected, setSelected] = React.useState<string>(
    ymd(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [events, setEvents] = React.useState<CatEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  const monthKey = `${year}-${pad(month + 1)}`;

  // Einträge des Monats laden
  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cats/${cat.id}/events?month=${monthKey}`);
      const data = await res.json();
      setEvents(data.events ?? []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [cat.id, monthKey]);

  React.useEffect(() => {
    load();
  }, [load]);

  const byDate = React.useMemo(() => {
    const m = new Map<string, CatEvent[]>();
    for (const e of events) {
      const arr = m.get(e.date) ?? [];
      arr.push(e);
      m.set(e.date, arr);
    }
    return m;
  }, [events]);

  // Kalender-Raster
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mo=0
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const todayStr = ymd(today.getFullYear(), today.getMonth(), today.getDate());

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }

  const selectedEvents = byDate.get(selected) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* Notizen + Kalender */}
      <div className="space-y-6">
        <FreeNotes cat={cat} />

        <div className="rounded-brand bg-paper p-4 shadow-card sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={prevMonth}
              aria-label="Voriger Monat"
              className="grid h-11 w-11 place-items-center rounded-full bg-cream-2 text-xl text-ink transition-colors hover:bg-honey/20"
            >
              ‹
            </button>
            <p className="font-display text-xl">
              {MONTHS[month]} {year}
            </p>
            <button
              onClick={nextMonth}
              aria-label="Nächster Monat"
              className="grid h-11 w-11 place-items-center rounded-full bg-cream-2 text-xl text-ink transition-colors hover:bg-honey/20"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <div key={w} className="py-1 text-center font-body text-xs font-700 text-ink-soft">
                {w}
              </div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={`x${i}`} />;
              const dateStr = ymd(year, month, d);
              const dayEvents = byDate.get(dateStr) ?? [];
              const isSel = dateStr === selected;
              const isToday = dateStr === todayStr;
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelected(dateStr)}
                  className={
                    "relative aspect-square rounded-[14px] font-body text-sm transition-colors " +
                    (isSel
                      ? "bg-honey font-700 text-ink"
                      : isToday
                        ? "bg-cream-2 font-700 text-ink"
                        : "text-ink hover:bg-cream-2")
                  }
                >
                  {d}
                  {dayEvents.length > 0 && (
                    <span className="absolute inset-x-0 bottom-1 flex justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((e, k) => (
                        <span
                          key={k}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: kategorieInfo(e.category).color }}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {loading && (
            <p className="mt-3 text-center font-body text-xs text-ink-soft">Lade …</p>
          )}
        </div>
      </div>

      {/* Tages-Panel */}
      <DayPanel
        cat={cat}
        date={selected}
        events={selectedEvents}
        onChanged={load}
      />
    </div>
  );
}

// ── Freie Notizen ────────────────────────────────────────────
function FreeNotes({ cat }: { cat: Cat }) {
  const [text, setText] = React.useState(cat.notes ?? "");
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");

  async function save() {
    setStatus("saving");
    try {
      await fetch(`/api/cats/${cat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: text }),
      });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <div className="rounded-brand bg-paper p-4 shadow-card sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-xl">Notizen zu {cat.name}</h2>
        {status === "saved" && (
          <span className="font-body text-xs text-success">✓ Gespeichert</span>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        rows={4}
        placeholder={`Alles, was du dir zu ${cat.name} merken willst — Lieblingsfutter, Eigenheiten, Tierarzt-Telefonnummer …`}
        className="w-full resize-none rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-honey"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={save}
          disabled={status === "saving"}
          className="rounded-full bg-cream-2 px-5 py-2.5 font-body text-sm font-600 text-ink transition-colors hover:bg-honey/20"
        >
          {status === "saving" ? "Speichere …" : "Notizen speichern"}
        </button>
      </div>
    </div>
  );
}

// ── Tages-Panel: Einträge ansehen / hinzufügen ───────────────
function DayPanel({
  cat,
  date,
  events,
  onChanged,
}: {
  cat: Cat;
  date: string;
  events: CatEvent[];
  onChanged: () => void;
}) {
  const [note, setNote] = React.useState("");
  const [category, setCategory] = React.useState<EventKategorie>("verhalten");
  const [saving, setSaving] = React.useState(false);

  const [y, m, d] = date.split("-").map(Number);
  const label = `${d}. ${MONTHS[m - 1]} ${y}`;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    try {
      await fetch(`/api/cats/${cat.id}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, note, category }),
      });
      setNote("");
      onChanged();
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    await fetch(`/api/cats/${cat.id}/events/${id}`, { method: "DELETE" });
    onChanged();
  }

  return (
    <div className="rounded-brand bg-paper p-4 shadow-card sm:p-6">
      <h2 className="font-display text-xl">{label}</h2>

      {/* Liste */}
      {events.length === 0 ? (
        <p className="mt-3 rounded-[16px] bg-cream-2/60 px-4 py-4 font-body text-sm text-ink-soft">
          Noch kein Eintrag an diesem Tag. Schreib unten kurz auf, was war —
          z. B. „hat gut gefressen“ oder „beim Tierarzt“.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {events.map((e) => {
            const info = kategorieInfo(e.category);
            return (
              <li
                key={e.id}
                className="flex items-start gap-3 rounded-[16px] bg-cream px-4 py-3"
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base"
                  style={{ background: info.color + "22" }}
                  aria-hidden="true"
                >
                  {info.emoji}
                </span>
                <span className="flex-1">
                  <span className="block font-body text-[0.7rem] font-700 uppercase tracking-wide" style={{ color: info.color }}>
                    {info.label}
                  </span>
                  <span className="block font-body text-sm text-ink">{e.note}</span>
                </span>
                <button
                  onClick={() => remove(e.id)}
                  aria-label="Eintrag löschen"
                  className="text-ink-soft transition-colors hover:text-alert"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Hinzufügen */}
      <form onSubmit={add} className="mt-5 border-t border-ink/5 pt-5">
        <p className="font-body text-sm font-700 text-ink">Eintrag hinzufügen</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {KATEGORIEN.map((k) => {
            const on = category === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setCategory(k.id)}
                aria-pressed={on}
                className={
                  "rounded-full px-3.5 py-2 font-body text-sm font-600 transition-all " +
                  (on ? "text-ink shadow-card" : "bg-cream-2 text-ink-soft")
                }
                style={on ? { background: k.color + "33" } : undefined}
              >
                <span aria-hidden="true">{k.emoji}</span> {k.label}
              </button>
            );
          })}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={280}
          placeholder="Kurze Notiz …"
          className="mt-3 w-full resize-none rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-honey"
        />

        <button
          type="submit"
          disabled={saving || !note.trim()}
          className="mt-2 w-full rounded-full bg-honey px-5 py-3 font-body text-base font-700 text-ink shadow-card transition-colors hover:bg-honey-deep hover:text-paper disabled:opacity-50"
        >
          {saving ? "Speichere …" : "Eintrag speichern"}
        </button>
      </form>
    </div>
  );
}

export default CatJournal;
