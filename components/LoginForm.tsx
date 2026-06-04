"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type Phase = "form" | "sent" | "kein-zugang";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [phase, setPhase] = React.useState<Phase>("form");
  const [devLink, setDevLink] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Etwas ist schiefgelaufen.");
      } else if (data.granted === false) {
        // E-Mail hat (noch) keinen Kauf → kein Zugang
        setPhase("kein-zugang");
      } else {
        setPhase("sent");
        if (data.devLink) setDevLink(data.devLink);
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuch es erneut.");
    } finally {
      setLoading(false);
    }
  }

  if (phase === "kein-zugang") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-3xl" aria-hidden="true">🔒</p>
        <h2 className="font-display text-2xl">Diese E-Mail hat noch keinen Zugang</h2>
        <p className="font-body text-ink-soft">
          Zu <span className="font-600 text-ink">{email}</span> ist kein Kauf
          hinterlegt. Schalte Schnurrcode einmalig frei — danach kommst du mit
          deiner E-Mail jederzeit rein.
        </p>
        <Button href="/checkout" size="lg" className="w-full justify-center">
          Jetzt kaufen — 29 €
        </Button>
        <button
          onClick={() => {
            setPhase("form");
            setError(null);
          }}
          className="font-body text-sm text-ink-soft underline-offset-2 hover:underline"
        >
          Andere E-Mail versuchen
        </button>
      </div>
    );
  }

  if (phase === "sent") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-3xl" aria-hidden="true">📬</p>
        <h2 className="font-display text-2xl">Check deine E-Mails</h2>
        <p className="font-body text-ink-soft">
          Falls ein Zugang zu dieser Adresse existiert, haben wir dir einen
          Login-Link geschickt. Er ist 30 Minuten gültig.
        </p>
        {devLink && (
          <div className="rounded-brand bg-cream-2/70 p-4 text-left">
            <p className="font-body text-xs font-700 text-ink-soft">
              Entwicklungsmodus (keine E-Mail konfiguriert):
            </p>
            <a
              href={devLink}
              className="mt-1 block break-all font-mono text-xs text-honey-deep underline"
            >
              {devLink}
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="font-body text-sm font-600 text-ink">
          Deine E-Mail
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          className="mt-2 w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors focus:border-honey"
        />
      </div>
      {error && <p className="font-body text-sm text-alert">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full justify-center">
        {loading ? "Sende …" : "Login-Link anfordern"}
      </Button>
    </form>
  );
}

export default LoginForm;
