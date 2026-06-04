"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ResultView } from "./ResultView";
import { FreitextDecoder } from "./FreitextDecoder";
import { decode, type DecodeResult } from "@/lib/decoder";
import {
  kategorien,
  signalsByKategorie,
  signalById,
  presets,
  type Kategorie,
} from "@/lib/catalog";

type DecoderBuilderProps = {
  mode?: "voll" | "gratis";
  catName?: string | null;
  /** KI-Freitext-Tab anzeigen (nur Vollversion) */
  enableAI?: boolean;
  /** Favoriten speichern erlauben (nur Vollversion) */
  enableFavorites?: boolean;
  /** Gratis: nach wie vielen Decodes wird gegated */
  gatedAfter?: number;
  /** Callback wenn das Gate ausgelöst wird (Gratis) */
  onGate?: () => void;
};

const FREE_KEY = "sc_free_decodes";
const FAV_KEY = "sc_favorites";

export function DecoderBuilder({
  mode = "voll",
  catName,
  enableAI = false,
  enableFavorites = false,
  gatedAfter = 3,
  onGate,
}: DecoderBuilderProps) {
  const [tab, setTab] = React.useState<"gefuehrt" | "freitext">("gefuehrt");
  const [selected, setSelected] = React.useState<
    Partial<Record<Kategorie, string>>
  >({});
  const [result, setResult] = React.useState<DecodeResult | null>(null);
  const [saved, setSaved] = React.useState(false);

  const selectedIds = React.useMemo(
    () => Object.values(selected).filter(Boolean) as string[],
    [selected]
  );

  function toggle(kategorie: Kategorie, id: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[kategorie] === id) delete next[kategorie];
      else next[kategorie] = id;
      return next;
    });
    setResult(null);
    setSaved(false);
  }

  function applyPreset(ids: string[]) {
    const next: Partial<Record<Kategorie, string>> = {};
    for (const id of ids) {
      const sig = signalById(id);
      if (sig) next[sig.kategorie] = sig.id;
    }
    setSelected(next);
    setResult(null);
    setSaved(false);
  }

  function readFreeCount(): number {
    if (typeof window === "undefined") return 0;
    return Number(window.localStorage.getItem(FREE_KEY) ?? "0");
  }

  function handleDecode() {
    if (selectedIds.length === 0) return;

    // Gratis-Gating: 3 Deutungen erlaubt, bei der 4. → Email-Gate
    if (mode === "gratis") {
      const used = readFreeCount();
      if (used >= gatedAfter) {
        onGate?.();
        return;
      }
      window.localStorage.setItem(FREE_KEY, String(used + 1));
    }

    setResult(decode(selectedIds));
    setSaved(false);
  }

  function handleSave() {
    if (!result || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(FAV_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({
        ids: selectedIds,
        ueberschrift: result.ueberschrift,
        emotion: result.emotion,
      });
      window.localStorage.setItem(FAV_KEY, JSON.stringify(list.slice(0, 50)));
      setSaved(true);
      // Best-effort Server-Sync (DB optional, scheitert still in Dev)
      fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, ueberschrift: result.ueberschrift }),
      }).catch(() => {});
    } catch {
      /* localStorage nicht verfügbar — still ignorieren */
    }
  }

  const remaining =
    mode === "gratis" ? Math.max(0, gatedAfter - readFreeCount()) : null;

  return (
    <div>
      {enableAI && (
        <div className="mb-6 inline-flex rounded-full bg-cream-2 p-1">
          <button
            onClick={() => setTab("gefuehrt")}
            className={
              "rounded-full px-4 py-2 font-body text-sm font-600 transition-colors " +
              (tab === "gefuehrt" ? "bg-paper text-ink shadow-card" : "text-ink-soft")
            }
          >
            Geführt
          </button>
          <button
            onClick={() => setTab("freitext")}
            className={
              "rounded-full px-4 py-2 font-body text-sm font-600 transition-colors " +
              (tab === "freitext" ? "bg-paper text-ink shadow-card" : "text-ink-soft")
            }
          >
            In eigenen Worten
          </button>
        </div>
      )}

      {enableAI && tab === "freitext" ? (
        <FreitextDecoder catName={catName} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Builder */}
          <div>
            {/* Presets */}
            <div className="mb-6">
              <p className="mb-2 font-body text-sm font-700 text-ink">
                Typische Situationen
              </p>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.signalIds)}
                    className="rounded-full bg-cream-2 px-3.5 py-1.5 font-body text-sm font-600 text-ink-soft transition-colors hover:bg-honey/20 hover:text-honey-deep"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategorien */}
            <div className="space-y-5">
              {kategorien.map((kat) => (
                <div key={kat.id}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="relative h-7 w-7 overflow-hidden rounded-full bg-paper">
                      <Image
                        src={kat.icon}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                    <p className="font-body text-sm font-700 text-ink">
                      {kat.frage}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {signalsByKategorie(kat.id).map((s) => {
                      const isOn = selected[kat.id] === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggle(kat.id, s.id)}
                          aria-pressed={isOn}
                          className={
                            "rounded-full px-3.5 py-1.5 font-body text-sm transition-all " +
                            (isOn
                              ? "bg-honey font-700 text-ink shadow-[0_8px_18px_-10px_rgba(201,126,31,.9)]"
                              : "bg-paper text-ink-soft shadow-card hover:text-ink")
                          }
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={handleDecode}
                disabled={selectedIds.length === 0}
              >
                Übersetzen
              </Button>
              {selectedIds.length > 0 && (
                <button
                  onClick={() => {
                    setSelected({});
                    setResult(null);
                  }}
                  className="font-body text-sm text-ink-soft underline-offset-2 hover:underline"
                >
                  Zurücksetzen
                </button>
              )}
              {remaining !== null && (
                <span className="font-body text-sm text-ink-soft">
                  Noch {remaining} von {gatedAfter} gratis
                </span>
              )}
            </div>
          </div>

          {/* Ergebnis */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {result ? (
              <ResultView
                result={result}
                catName={catName}
                onSave={enableFavorites ? handleSave : undefined}
                saved={saved}
              />
            ) : (
              <div className="rounded-brand bg-cream-2/60 p-8 text-center">
                <p className="font-display text-xl text-ink">
                  Wähl die Signale aus
                </p>
                <p className="mt-2 font-body text-sm text-ink-soft">
                  Pro Bereich ein Signal — mindestens eines, gern mehrere. Dann
                  auf „Übersetzen“.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DecoderBuilder;
