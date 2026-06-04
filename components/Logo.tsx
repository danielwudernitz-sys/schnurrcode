import * as React from "react";

type LogoProps = {
  /** Nur das Katzen-Symbol ohne Wortmarke */
  iconOnly?: boolean;
  /** Höhe des Symbols in px (Wortmarke skaliert mit) */
  size?: number;
  className?: string;
};

/**
 * Schnurrcode-Logo: Slow-Blink-Katze mit Schnurr-Wellen (inline-SVG).
 * Ink-Linework auf transparent, Honey-Akzente. Augen als geschwungene
 * Bögen (geschlossen = "langsames Blinzeln"), Schnurr-Wellen links/rechts.
 * Wortmarke: "Schnurr" (Fraunces) + "code" (Mono, honey).
 */
export function Logo({ iconOnly = false, size = 34, className }: LogoProps) {
  return (
    <span
      className={"inline-flex items-center gap-2.5 " + (className ?? "")}
      aria-label="Schnurrcode"
    >
      <CatMark size={size} />
      {!iconOnly && (
        <span
          className="font-display text-[1.55rem] font-semibold leading-none text-ink"
          style={{ letterSpacing: "-0.01em" }}
        >
          Schnurr
          <span className="font-mono font-bold text-honey-deep">code</span>
        </span>
      )}
    </span>
  );
}

function CatMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Schnurr-Wellen links */}
      <g
        stroke="var(--honey)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M5 19c-2 1.6-2 4.8 0 6.4" />
        <path d="M2 16.5c-3 2.6-3 8 0 10.6" opacity="0.55" />
      </g>
      {/* Schnurr-Wellen rechts */}
      <g
        stroke="var(--honey)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M43 19c2 1.6 2 4.8 0 6.4" />
        <path d="M46 16.5c3 2.6 3 8 0 10.6" opacity="0.55" />
      </g>

      {/* Kopf + Ohren als eine Linie */}
      <path
        d="M14 16.5C12.5 12 12 8.5 12 8.5c3.4 1 6 2.6 7.6 4.1a13.8 13.8 0 0 1 8.8 0C30 11.1 32.6 9.5 36 8.5c0 0-.5 3.5-2 8 1.8 2.2 2.8 4.9 2.8 7.9C36.8 31.4 31 36 24 36S11.2 31.4 11.2 24.4c0-3 1-5.7 2.8-7.9Z"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Slow-Blink-Augen: geschwungene Bögen (geschlossen) */}
      <path
        d="M17.5 23.5c1.3 1.6 3.7 1.6 5 0"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M25.5 23.5c1.3 1.6 3.7 1.6 5 0"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Näschen (honey) */}
      <path
        d="M22.7 27.4c.7.7 1.9.7 2.6 0"
        stroke="var(--honey-deep)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default Logo;
