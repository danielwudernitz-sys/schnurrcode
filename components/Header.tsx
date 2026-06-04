import * as React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

/** Globaler Header: Logo links, Login-Link rechts. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="container-brand flex h-16 items-center justify-between">
        <Link href="/" aria-label="Zur Startseite">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="font-body text-sm font-600 text-ink-soft transition-colors hover:text-ink"
          >
            Login
          </Link>
          <Button href="/uebersetzer-gratis" size="md">
            Gratis-Test
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
