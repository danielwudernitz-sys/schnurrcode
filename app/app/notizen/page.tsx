import type { Metadata } from "next";
import { CatJournal } from "@/components/app/cats/CatJournal";
import { getSession, getActiveCatId } from "@/lib/session";
import { listCats, getCat } from "@/lib/cats";

export const metadata: Metadata = { title: "Notizen & Verhalten" };

export default async function NotizenPage() {
  const session = await getSession();
  const cats = session ? await listCats(session.email) : [];
  const activeId = getActiveCatId();
  const cat =
    (session && activeId ? await getCat(session.email, activeId) : null) ?? cats[0] ?? null;

  return (
    <div>
      <header className="mb-6 max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
          Notizen & Verhalten
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {cat ? `Das Tagebuch von ${cat.name}` : "Dein Katzen-Tagebuch"}
        </h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Halt fest, was wichtig ist — Fütterung, Tierarzt, Klo, Verhalten. Tag
          für Tag, für jede Katze getrennt.
        </p>
      </header>

      {cat ? (
        <CatJournal key={cat.id} cat={cat} />
      ) : (
        <div className="rounded-brand bg-paper p-8 text-center shadow-card">
          <p className="text-4xl" aria-hidden="true">🐱</p>
          <h2 className="mt-3 font-display text-2xl">Erst eine Katze anlegen</h2>
          <p className="mx-auto mt-2 max-w-md font-body text-ink-soft">
            Füge oben mit „+ Erste Katze hinzufügen“ deine Katze hinzu — danach
            kannst du hier Notizen und Tages-Einträge speichern.
          </p>
        </div>
      )}
    </div>
  );
}
