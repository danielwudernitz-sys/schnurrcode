import * as React from "react";

type CardProps = {
  as?: "div" | "article" | "section";
  /** Hover-Anhebung (für klickbare Karten) */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/** Karte: radius 22px, weicher Schatten, paper-Hintergrund. */
export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={
        "rounded-brand bg-paper p-6 shadow-card sm:p-7 " +
        (interactive
          ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover "
          : "") +
        (className ?? "")
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;
