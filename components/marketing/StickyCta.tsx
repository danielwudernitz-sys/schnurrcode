"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Sticky Kauf-Leiste am Handy — erscheint nach dem Scrollen über den Hero.
 * Nur mobil (sm:hidden). z-40 liegt unter dem Consent-Banner (z-50).
 */
export function StickyCta() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden transition-transform duration-300 " +
        (show ? "translate-y-0" : "translate-y-[120%]")
      }
    >
      <div className="flex items-center gap-3 rounded-full bg-ink/95 py-2 pl-5 pr-2 shadow-card backdrop-blur">
        <div className="leading-tight text-paper">
          <span className="block font-body text-[0.7rem] text-paper/60">
            einmalig · kein Abo
          </span>
          <span className="block font-display text-lg leading-none">29 €</span>
        </div>
        <Link
          href="/checkout"
          className="ml-auto rounded-full bg-honey px-5 py-3 font-body text-sm font-700 text-ink transition-colors hover:bg-honey-deep hover:text-paper"
        >
          Jetzt verstehen
        </Link>
      </div>
    </div>
  );
}

export default StickyCta;
