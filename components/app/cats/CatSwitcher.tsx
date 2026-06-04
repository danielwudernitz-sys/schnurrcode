"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { AddCatForm } from "./AddCatForm";
import type { Cat } from "@/data/journal";

function Avatar({ cat, size = 40 }: { cat: Cat; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-cream-2"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {cat.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cat.photo_url} alt="" className="h-full w-full object-cover" />
      ) : (
        "🐱"
      )}
    </span>
  );
}

export function CatSwitcher({
  initialCats,
  activeCatId,
}: {
  initialCats: Cat[];
  activeCatId: string | null;
}) {
  const router = useRouter();
  const [cats, setCats] = React.useState<Cat[]>(initialCats);
  const [activeId, setActiveId] = React.useState<string | null>(
    activeCatId ?? initialCats[0]?.id ?? null
  );
  const [open, setOpen] = React.useState(false); // Dropdown
  const [addOpen, setAddOpen] = React.useState(false); // Modal

  const active = cats.find((c) => c.id === activeId) ?? cats[0] ?? null;

  async function switchTo(id: string) {
    setOpen(false);
    if (id === activeId) return;
    setActiveId(id);
    await fetch("/api/cats/active", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh(); // Server-Komponenten neu personalisieren
  }

  function onCreated(cat: Cat) {
    setCats((prev) => [...prev, cat]);
    setActiveId(cat.id);
    setAddOpen(false);
    router.refresh();
  }

  // ── Leerer Zustand: noch keine Katze ──
  if (cats.length === 0) {
    return (
      <>
        <div className="border-b border-ink/5 bg-paper/60">
          <div className="container-brand flex items-center justify-between gap-3 py-3">
            <p className="font-body text-sm text-ink-soft">
              Noch keine Katze angelegt.
            </p>
            <button
              onClick={() => setAddOpen(true)}
              className="rounded-full bg-honey px-5 py-2.5 font-body text-sm font-700 text-ink shadow-card transition-colors hover:bg-honey-deep hover:text-paper"
            >
              + Erste Katze hinzufügen
            </button>
          </div>
        </div>
        <AddModal open={addOpen} onClose={() => setAddOpen(false)} onCreated={onCreated} />
      </>
    );
  }

  return (
    <>
      <div className="border-b border-ink/5 bg-paper/60">
        <div className="container-brand relative flex items-center gap-3 py-2.5">
          {/* aktive Katze / Dropdown-Trigger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-center gap-3 rounded-full bg-cream px-3 py-2 shadow-card transition-colors hover:bg-cream-2"
          >
            {active && <Avatar cat={active} />}
            <span className="text-left">
              <span className="block font-body text-[0.7rem] uppercase tracking-wide text-ink-soft">
                Aktive Katze
              </span>
              <span className="block font-display text-lg leading-none text-ink">
                {active?.name ?? "—"}
              </span>
            </span>
            <span aria-hidden="true" className={"ml-1 text-ink-soft transition-transform " + (open ? "rotate-180" : "")}>
              ▾
            </span>
          </button>

          <button
            onClick={() => setAddOpen(true)}
            className="ml-auto rounded-full bg-cream px-4 py-2.5 font-body text-sm font-600 text-ink-soft shadow-card transition-colors hover:text-ink"
          >
            + Katze
          </button>

          {/* Dropdown */}
          {open && (
            <>
              <div
                className="fixed inset-0 z-30"
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />
              <div className="absolute left-0 top-full z-40 mt-1 w-72 max-w-[90vw] overflow-hidden rounded-brand bg-paper p-2 shadow-card">
                {cats.map((c) => {
                  const isActive = c.id === active?.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => switchTo(c.id)}
                      className={
                        "flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition-colors " +
                        (isActive ? "bg-honey/15" : "hover:bg-cream-2")
                      }
                    >
                      <Avatar cat={c} size={36} />
                      <span className="flex-1">
                        <span className="block font-body font-600 text-ink">{c.name}</span>
                        {(c.breed || c.age) && (
                          <span className="block font-body text-xs text-ink-soft">
                            {[c.breed, c.age].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </span>
                      {isActive && <span className="text-honey-deep">✓</span>}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setOpen(false);
                    setAddOpen(true);
                  }}
                  className="mt-1 flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left font-body font-600 text-honey-deep hover:bg-cream-2"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-honey/20 text-lg">+</span>
                  Katze hinzufügen
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AddModal open={addOpen} onClose={() => setAddOpen(false)} onCreated={onCreated} />
    </>
  );
}

function AddModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (cat: Cat) => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Neue Katze hinzufügen">
      <p className="mb-4 font-body text-sm text-ink-soft">
        Nur der Name ist nötig — den Rest kannst du später ergänzen.
      </p>
      <AddCatForm onCreated={onCreated} onCancel={onClose} />
    </Modal>
  );
}

export default CatSwitcher;
