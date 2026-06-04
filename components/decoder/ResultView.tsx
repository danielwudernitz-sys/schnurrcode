"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { VetWarning } from "./VetWarning";
import type { DecodeResult } from "@/lib/decoder";

type ResultViewProps = {
  result: DecodeResult;
  /** Personalisierter Katzenname, falls vorhanden */
  catName?: string | null;
  /** Favoriten-Button anzeigen (nur Vollversion) */
  onSave?: () => void;
  saved?: boolean;
};

const emotionAccent: Record<string, string> = {
  positiv: "border-success/40 bg-success/5",
  neutral: "border-honey/40 bg-honey/5",
  anspannung: "border-alert/40 bg-alert/5",
};

export function ResultView({ result, catName, onSave, saved }: ResultViewProps) {
  const wer = catName ? catName : "deine Katze";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <div
        className={
          "rounded-brand border-2 p-6 " +
          (emotionAccent[result.emotion] ?? emotionAccent.neutral)
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={result.emotion}>{result.emotionLabel}</Badge>
          {result.kombis.length > 0 && (
            <span className="font-mono text-xs uppercase tracking-wide text-honey-deep">
              Kombination erkannt
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl leading-snug">
          {result.ueberschrift}
        </h3>
        <p className="mt-2 font-body leading-relaxed text-ink-soft">
          {result.zusammenfassung.replace(/deine Katze/g, wer)}
        </p>

        <div className="mt-4 rounded-[16px] bg-paper/70 p-4">
          <p className="font-body text-sm font-700 text-ink">Was du tun kannst</p>
          <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
            {result.wasTun}
          </p>
        </div>

        {onSave && (
          <button
            onClick={onSave}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-body text-sm font-600 text-ink-soft shadow-card transition-colors hover:text-ink"
          >
            {saved ? "★ Gespeichert" : "☆ Als Favorit speichern"}
          </button>
        )}
      </div>

      {/* Einzel-Signale */}
      {result.signale.length > 1 && (
        <div className="rounded-brand bg-paper p-5 shadow-card">
          <p className="mb-2 font-body text-sm font-700 text-ink">
            Die Signale im Einzelnen
          </p>
          <ul className="divide-y divide-ink/5">
            {result.signale.map((s) => (
              <li key={s.id} className="flex items-start gap-3 py-2.5">
                <Badge tone={s.emotion}>{s.kategorie}</Badge>
                <div>
                  <p className="font-body text-sm font-600 text-ink">
                    {s.label}
                  </p>
                  <p className="font-body text-sm text-ink-soft">{s.kurz}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.tierarztFlag && (
        <VetWarning>
          Eines der Signale kann auf ein gesundheitliches Problem hinweisen —
          etwa lautes nächtliches Heulen bei älteren Katzen. Beobachte
          {catName ? ` ${catName}` : " deine Katze"} genau und lass es im Zweifel
          tierärztlich abklären.
        </VetWarning>
      )}
    </motion.div>
  );
}

export default ResultView;
