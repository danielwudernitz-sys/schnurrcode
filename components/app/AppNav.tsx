"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/app", label: "Übersicht", exact: true },
  { href: "/app/uebersetzer", label: "Übersetzer" },
  { href: "/app/antworten", label: "Zurücksprechen" },
  { href: "/app/szenarien", label: "Alltags-Situationen" },
  { href: "/app/probleme", label: "Probleme lösen" },
  { href: "/app/lexikon", label: "Nachschlagen" },
  { href: "/app/notizen", label: "Notizen" },
  { href: "/app/download", label: "Download" },
];

export function AppNav({ catName }: { catName?: string | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur-md">
      <div className="container-brand flex h-16 items-center justify-between gap-4">
        <Link href="/app" aria-label="Übersicht">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.exact
              ? pathname === l.href
              : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "rounded-full px-3.5 py-2 font-body text-sm font-600 transition-colors " +
                  (active
                    ? "bg-honey/20 text-honey-deep"
                    : "text-ink-soft hover:text-ink")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {catName && (
            <span className="hidden font-body text-sm text-ink-soft sm:inline">
              🐱 {catName}
            </span>
          )}
          <a
            href="/api/auth/logout"
            className="font-body text-sm font-600 text-ink-soft transition-colors hover:text-ink"
          >
            Abmelden
          </a>
        </div>
      </div>

      {/* mobile Nav */}
      <nav className="flex gap-1 overflow-x-auto border-t border-ink/5 px-4 py-2 md:hidden">
        {links.map((l) => {
          const active = l.exact
            ? pathname === l.href
            : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                "whitespace-nowrap rounded-full px-3 py-1.5 font-body text-sm font-600 transition-colors " +
                (active ? "bg-honey/20 text-honey-deep" : "text-ink-soft")
              }
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default AppNav;
