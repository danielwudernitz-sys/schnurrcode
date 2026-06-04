import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Favorites } from "@/components/app/Favorites";
import { getCatName } from "@/lib/session";

export const metadata: Metadata = { title: "Übersicht" };

const tiles = [
  {
    href: "/app/uebersetzer",
    icon: "/img/icon-decoder.jpg",
    title: "Übersetzer",
    text: "Signale wählen, Deutung bekommen.",
  },
  {
    href: "/app/antworten",
    icon: "/img/icon-zweiwege.png",
    title: "Zurücksprechen",
    text: "Wie du mit ihr sprichst & Slow-Blink-Trainer.",
  },
  {
    href: "/app/szenarien",
    icon: "/img/onboarding-welcome.png",
    title: "Alltags-Situationen",
    text: "Typische Situationen verstehen & lösen.",
  },
  {
    href: "/app/probleme",
    icon: "/img/icon-problemloeser.png",
    title: "Probleme lösen",
    text: "Häufige Probleme & Tierarzt-Warnsystem.",
  },
  {
    href: "/app/lexikon",
    icon: "/img/icon-lexikon.png",
    title: "Nachschlagen",
    text: "Alle Signale zum Nachschlagen.",
  },
  {
    href: "/app/notizen",
    icon: "/img/cat-kontext.png",
    title: "Notizen & Verhalten",
    text: "Tagebuch & Kalender pro Katze.",
  },
];

export default async function AppHome() {
  const catName = await getCatName();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl">
          {catName ? `Hallo! Was will dir ${catName} sagen?` : "Willkommen bei Schnurrcode"}
        </h1>
        <p className="mt-2 font-body text-lg text-ink-soft">
          Womit möchtest du starten?
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-brand bg-paper p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="mb-4 h-16 w-16 overflow-hidden rounded-[16px] bg-cream shadow-card">
              <Image src={t.icon} alt="" width={2048} height={2048} sizes="64px" className="h-full w-full object-cover" />
            </div>
            <h2 className="font-display text-xl">{t.title}</h2>
            <p className="mt-1 font-body text-sm text-ink-soft">{t.text}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl">Deine Favoriten</h2>
        <Favorites />
      </section>
    </div>
  );
}
