// Client-Tracking-Helper. Feuert NUR bei vorhandener Einwilligung ("all").
// Cookieloses Analytics (Plausible) ist davon unabhängig erlaubt.

type Params = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Params }) => void;
  }
}

export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("sc_consent") === "all";
}

/** Standard-Event feuern (Meta Pixel + Plausible + Conversions API). */
export function track(event: string, params?: Params) {
  if (typeof window === "undefined") return;

  // Plausible (cookielos) — immer erlaubt
  try {
    window.plausible?.(event, params ? { props: params } : undefined);
  } catch {
    /* ignore */
  }

  if (!hasMarketingConsent()) return;

  // Meta Pixel (Browser)
  try {
    window.fbq?.("track", event, params ?? {});
  } catch {
    /* ignore */
  }

  // Conversions API (Server) — best effort
  try {
    void fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, params }),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}
