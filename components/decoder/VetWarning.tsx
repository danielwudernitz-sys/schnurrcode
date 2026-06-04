import * as React from "react";

type VetWarningProps = {
  /** Überschrift des Warnfelds */
  title?: string;
  /** Optionale konkrete Red-Flags (z. B. im Problemlöser) */
  redFlags?: string[];
  children?: React.ReactNode;
  className?: string;
};

/**
 * Rotes Tierarzt-Warnfeld (--alert). Sicherheits-/Vertrauensfeature —
 * wird im Decoder bei tierarztFlag und im Problemlöser eingeblendet.
 */
export function VetWarning({
  title = "Sofort zum Tierarzt, wenn …",
  redFlags,
  children,
  className,
}: VetWarningProps) {
  return (
    <div
      role="alert"
      className={
        "rounded-brand border-2 border-alert/40 bg-alert/8 p-5 " +
        (className ?? "")
      }
      style={{ backgroundColor: "rgba(196,85,59,0.08)" }}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-lg">
          🩺
        </span>
        <p className="font-display text-lg font-600 text-alert">{title}</p>
      </div>

      {redFlags && redFlags.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {redFlags.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-body text-sm text-ink"
            >
              <span aria-hidden="true" className="mt-1 text-alert">
                ▸
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {children && (
        <div className="mt-3 font-body text-sm text-ink">{children}</div>
      )}

      <p className="mt-3 font-body text-xs text-ink-soft">
        Schnurrcode ersetzt keinen Tierarzt. Im Zweifel immer ärztlich abklären
        lassen.
      </p>
    </div>
  );
}

export default VetWarning;
