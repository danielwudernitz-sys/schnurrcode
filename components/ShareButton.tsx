"use client";

import * as React from "react";

/** Teilen-Button: Web Share API mit Copy-Link-Fallback. */
export function ShareButton({
  title = "Schnurrcode — knack den Code deiner Katze",
  text = "Gib ein, was deine Katze macht 👇 und finde raus, was sie dir sagt:",
  url,
  className,
}: {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function share() {
    const shareUrl =
      url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        /* abgebrochen — Fallback */
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={share}
      className={
        "inline-flex items-center gap-2 rounded-full bg-cream-2 px-4 py-2 font-body text-sm font-600 text-ink-soft transition-colors hover:text-ink " +
        (className ?? "")
      }
    >
      {copied ? "✓ Link kopiert" : "↗ Teilen"}
    </button>
  );
}

export default ShareButton;
