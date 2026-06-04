"use client";

import * as React from "react";
import { motion } from "framer-motion";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Verzögerung in Sekunden */
  delay?: number;
  as?: "div" | "section" | "li";
};

/**
 * Dezenter Scroll-Reveal (einmalig, sanft) — bewusst zurückhaltend,
 * keine zappeligen Micro-Animationen. Respektiert prefers-reduced-motion
 * über die globale CSS-Regel + Framer's eigenes Handling.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: SectionRevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}

export default SectionReveal;
