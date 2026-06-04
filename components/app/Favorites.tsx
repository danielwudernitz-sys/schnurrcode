"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";

type Fav = { ids: string[]; ueberschrift: string; emotion?: string };

export function Favorites() {
  const [favs, setFavs] = React.useState<Fav[] | null>(null);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("sc_favorites");
      setFavs(raw ? (JSON.parse(raw) as Fav[]) : []);
    } catch {
      setFavs([]);
    }
  }, []);

  function remove(idx: number) {
    setFavs((prev) => {
      if (!prev) return prev;
      const next = prev.filter((_, i) => i !== idx);
      window.localStorage.setItem("sc_favorites", JSON.stringify(next));
      return next;
    });
  }

  if (favs === null) return null;
  if (favs.length === 0) {
    return (
      <p className="rounded-brand bg-cream-2/60 px-5 py-6 font-body text-sm text-ink-soft">
        Noch keine Favoriten. Im Decoder kannst du Deutungen mit „☆ Als Favorit
        speichern“ sichern.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {favs.map((f, i) => (
        <div
          key={i}
          className="flex items-start justify-between gap-3 rounded-brand bg-paper p-4 shadow-card"
        >
          <div>
            {f.emotion && (
              <Badge tone={(f.emotion as "positiv" | "neutral" | "anspannung") ?? "neutral"}>
                {f.emotion}
              </Badge>
            )}
            <p className="mt-1.5 font-body text-sm font-600 text-ink">
              {f.ueberschrift}
            </p>
          </div>
          <button
            onClick={() => remove(i)}
            aria-label="Favorit entfernen"
            className="text-ink-soft transition-colors hover:text-alert"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
