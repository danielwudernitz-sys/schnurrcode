import * as React from "react";

type DisclaimerNoteProps = {
  /** "inline" = dezente Fußnote, "card" = abgesetzter Hinweis-Block */
  variant?: "inline" | "card";
  className?: string;
};

/**
 * Reusable Disclaimer — Pflicht auf allen App-Seiten + im Footer.
 * "Schnurrcode ersetzt keinen Tierarzt."
 */
export function DisclaimerNote({
  variant = "inline",
  className,
}: DisclaimerNoteProps) {
  const text = (
    <>
      <strong className="font-700">Schnurrcode ersetzt keinen Tierarzt.</strong>{" "}
      Bei Sorgen → Tierärztin/Tierarzt.
    </>
  );

  if (variant === "card") {
    return (
      <div
        className={
          "flex items-start gap-3 rounded-brand bg-cream-2/70 px-4 py-3 font-body text-sm text-ink-soft " +
          (className ?? "")
        }
        role="note"
      >
        <span aria-hidden="true" className="mt-0.5 text-base">
          🐾
        </span>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <p
      className={"font-body text-xs text-ink-soft " + (className ?? "")}
      role="note"
    >
      {text}
    </p>
  );
}

export default DisclaimerNote;
