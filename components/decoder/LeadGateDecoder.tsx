"use client";

import * as React from "react";
import Link from "next/link";
import { DecoderBuilder } from "./DecoderBuilder";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/track";

type Phase = "form" | "done";

/** Gratis-Decoder mit Email-Gate (Prompt 3). Nach 3 Deutungen → Modal. */
export function LeadGateDecoder() {
  const [open, setOpen] = React.useState(false);
  const [phase, setPhase] = React.useState<Phase>("form");
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Bitte stimme der Datenschutzerklärung zu.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Etwas ist schiefgelaufen.");
      } else {
        setPhase("done");
        track("Lead");
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuch es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DecoderBuilder mode="gratis" gatedAfter={1} onGate={() => setOpen(true)} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          phase === "form"
            ? "Schalte alle 40+ Signale frei"
            : "Check deine E-Mails 🐱"
        }
      >
        {phase === "form" ? (
          <form onSubmit={submit} className="space-y-4">
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              Schalte alle 40+ Signale + den Problemlöser frei — gib deine
              E-Mail für den Gratis-Einstieg.
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors focus:border-honey"
            />
            <label className="flex items-start gap-2.5 font-body text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--honey)]"
              />
              <span>
                Ich bin mit der Verarbeitung meiner E-Mail laut{" "}
                <Link
                  href="/datenschutz"
                  target="_blank"
                  className="text-honey-deep underline"
                >
                  Datenschutzerklärung
                </Link>{" "}
                einverstanden (Double-Opt-in).
              </span>
            </label>
            {error && (
              <p className="font-body text-sm text-alert">{error}</p>
            )}
            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? "Sende …" : "Gratis freischalten"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              Wir haben dir eine E-Mail geschickt. Bestätige kurz deine Adresse,
              dann geht's los. Schon entschieden?
            </p>
            <Button href="/checkout" className="w-full justify-center">
              Jetzt Vollversion für 29 €
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default LeadGateDecoder;
