"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const DURATION = 10; // Sekunden geführte Übung

/**
 * Interaktiver Slow-Blink-Trainer (Prompt 5a) — das emotionale Herzstück.
 * Animierte Katzen-Augenpartie (Crossfade open↔closed) + geführte 10-Sek-Übung
 * mit sanftem Timer und Anleitung „Blinzle zurück".
 */
export function SlowBlinkTrainer({ catName }: { catName?: string | null }) {
  const [closed, setClosed] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(DURATION);
  const [hint, setHint] = React.useState("Bereit, wenn du es bist.");

  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  React.useEffect(() => clearAll, [clearAll]);

  // Ruhiges Dauer-Blinzeln, wenn die Übung NICHT läuft
  React.useEffect(() => {
    if (running) return;
    const id = setInterval(() => {
      setClosed(true);
      setTimeout(() => setClosed(false), 1400);
    }, 4200);
    return () => clearInterval(id);
  }, [running]);

  function start() {
    clearAll();
    setRunning(true);
    setSecondsLeft(DURATION);
    setHint("Atme ruhig … und schau deine Katze sanft an.");

    // Sekunden-Countdown
    for (let s = 1; s <= DURATION; s++) {
      timers.current.push(
        setTimeout(() => setSecondsLeft(DURATION - s), s * 1000)
      );
    }

    // Blinzel-Choreografie + Hinweise
    const cycle = (atSec: number, msg: string) => {
      timers.current.push(
        setTimeout(() => {
          setHint(msg);
          setClosed(true);
          timers.current.push(setTimeout(() => setClosed(false), 1600));
        }, atSec * 1000)
      );
    };
    cycle(1, "Schließe die Augen ganz langsam …");
    cycle(4, "… und wieder öffnen. Blinzle zurück.");
    cycle(7, "Noch einmal — ganz entspannt.");

    timers.current.push(
      setTimeout(() => {
        setRunning(false);
        setClosed(false);
        setHint(
          catName
            ? `Schön. ${catName} hat dich gerade ein bisschen lieber. 🐱`
            : "Schön. Deine Katze hat dich gerade ein bisschen lieber. 🐱"
        );
      }, (DURATION + 1) * 1000)
    );
  }

  const progress = ((DURATION - secondsLeft) / DURATION) * 100;

  return (
    <div className="rounded-brand bg-paper p-6 shadow-card sm:p-8">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        {/* Augenpartie */}
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-brand bg-cream-2">
          <AnimatePresence>
            <motion.div
              key={closed ? "closed" : "open"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={closed ? "/img/slowblink-closed.png" : "/img/slowblink-open.png"}
                alt={closed ? "Katze mit geschlossenen Augen" : "Katze mit offenen Augen"}
                fill
                sizes="320px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Anleitung + Steuerung */}
        <div>
          <p className="font-display text-2xl leading-snug text-ink">
            Blinzle zurück
          </p>
          <p className="mt-2 min-h-[3rem] font-body leading-relaxed text-ink-soft">
            {hint}
          </p>

          {/* Timer-Balken */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-cream-2">
            <motion.div
              className="h-full bg-honey"
              animate={{ width: running ? `${progress}%` : "0%" }}
              transition={{ ease: "linear", duration: 0.4 }}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button onClick={start} disabled={running}>
              {running ? `${secondsLeft}s …` : "10-Sekunden-Übung starten"}
            </Button>
            {running && (
              <button
                onClick={() => {
                  clearAll();
                  setRunning(false);
                  setClosed(false);
                  setHint("Abgebrochen — jederzeit neu starten.");
                }}
                className="font-body text-sm text-ink-soft underline-offset-2 hover:underline"
              >
                Stopp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlowBlinkTrainer;
