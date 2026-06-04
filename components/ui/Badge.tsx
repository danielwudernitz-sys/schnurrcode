import * as React from "react";

type Tone = "neutral" | "positiv" | "anspannung" | "honey" | "alert";

const tones: Record<Tone, string> = {
  neutral: "bg-cream-2 text-ink-soft",
  positiv: "bg-success/15 text-success",
  anspannung: "bg-alert/15 text-alert",
  honey: "bg-honey/20 text-honey-deep",
  alert: "bg-alert text-paper",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

/** Kleines Label/Chip — u.a. für Emotions-Farbcodierung im Decoder. */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-3 py-1 font-body text-xs font-700 uppercase tracking-wide " +
        tones[tone] +
        " " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}

export default Badge;
