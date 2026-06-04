import * as React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { DisclaimerNote } from "./DisclaimerNote";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

/** Globaler Footer: Logo, Rechtslinks, Disclaimer. */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-paper">
      <div className="container-brand flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <DisclaimerNote />

        <p className="font-body text-xs text-ink-soft/80">
          © {/* Jahr bewusst statisch im Footer-Text, kein Build-Datum */}
          Schnurrcode — Knack den Code deiner Katze.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
