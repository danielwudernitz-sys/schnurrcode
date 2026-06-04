"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Cookie/Consent-Banner (Opt-in für Pixel/Marketing). Cookieloses Analytics
 * läuft unabhängig. Ohne Zustimmung werden keine Marketing-Skripte geladen.
 */
export function ConsentBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const decided = window.localStorage.getItem("sc_consent");
    if (!decided) setVisible(true);
  }, []);

  function decide(value: "all" | "essential") {
    window.localStorage.setItem("sc_consent", value);
    setVisible(false);
    // Analytics-Komponente informieren (lädt ggf. den Pixel nach)
    window.dispatchEvent(new CustomEvent("sc-consent", { detail: value }));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="container-brand">
        <div className="flex flex-col gap-4 rounded-brand bg-ink p-5 text-paper shadow-card sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm leading-relaxed text-paper/90">
            Wir nutzen notwendige Funktionen und — nur mit deiner Zustimmung —
            Marketing-Tools (z. B. Meta Pixel), um unsere Inhalte zu verbessern.
            Mehr in der{" "}
            <Link href="/datenschutz" className="text-honey underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="flex flex-shrink-0 gap-2">
            <button
              onClick={() => decide("essential")}
              className="rounded-full border border-paper/25 px-4 py-2 font-body text-sm font-600 text-paper/90 transition-colors hover:bg-paper/10"
            >
              Nur Notwendige
            </button>
            <button
              onClick={() => decide("all")}
              className="rounded-full bg-honey px-5 py-2 font-body text-sm font-700 text-ink transition-colors hover:bg-honey-deep hover:text-paper"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
