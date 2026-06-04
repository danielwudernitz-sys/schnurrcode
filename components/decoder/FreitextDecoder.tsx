"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VetWarning } from "./VetWarning";

type ApiResult = {
  emotion: "positiv" | "neutral" | "anspannung";
  deutung: string;
  wasTunKannst: string;
  tierarztNoetig: boolean;
};

const emotionLabel: Record<string, string> = {
  positiv: "Positiv",
  neutral: "Neutral",
  anspannung: "Anspannung",
};

/**
 * KI-Decoder-Tab „In eigenen Worten beschreiben" (Prompt 5b).
 * Ruft /api/decode (Anthropic, eng begrenzt). Fällt bei Fehler auf den
 * Hinweis zurück, den geführten Decoder zu nutzen.
 */
export function FreitextDecoder({ catName }: { catName?: string | null }) {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ApiResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit() {
    const beschreibung = text.trim();
    if (beschreibung.length < 8) {
      setError("Beschreib bitte etwas genauer, was deine Katze macht.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ beschreibung, catName }),
      });
      if (!res.ok) throw new Error("api");
      const data = (await res.json()) as ApiResult;
      setResult(data);
    } catch {
      setError(
        "Das hat gerade nicht geklappt. Nutz solange den geführten Übersetzer oben — der funktioniert immer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-brand bg-paper p-5 shadow-card">
        <label
          htmlFor="freitext"
          className="font-body text-sm font-700 text-ink"
        >
          Beschreib in eigenen Worten, was {catName ?? "deine Katze"} gerade
          macht
        </label>
        <textarea
          id="freitext"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="z. B. „Sie sitzt am Fenster, macht komische schnatternde Geräusche und ihr Schwanz zuckt.“"
          className="mt-2 w-full resize-none rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-[0.97rem] text-ink outline-none transition-colors focus:border-honey"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-body text-xs text-ink-soft">
            {text.length}/500
          </span>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Deute …" : "Deuten lassen"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-brand bg-cream-2 px-4 py-3 font-body text-sm text-ink-soft">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-brand border-2 border-honey/40 bg-honey/5 p-6">
            <Badge tone={result.emotion}>
              {emotionLabel[result.emotion] ?? "Deutung"}
            </Badge>
            <p className="mt-3 font-body leading-relaxed text-ink">
              {result.deutung}
            </p>
            <div className="mt-4 rounded-[16px] bg-paper/70 p-4">
              <p className="font-body text-sm font-700 text-ink">
                Was du tun kannst
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
                {result.wasTunKannst}
              </p>
            </div>
          </div>
          {result.tierarztNoetig && (
            <VetWarning>
              Deine Beschreibung enthält Hinweise, die tierärztlich abgeklärt
              werden sollten. Bitte zögere im Zweifel nicht, eine Tierärztin oder
              einen Tierarzt aufzusuchen.
            </VetWarning>
          )}
        </div>
      )}

      <p className="font-body text-xs text-ink-soft">
        Die KI-Deutung basiert auf gängiger Katzenverhaltenskunde und ist keine
        medizinische Diagnose.
      </p>
    </div>
  );
}

export default FreitextDecoder;
