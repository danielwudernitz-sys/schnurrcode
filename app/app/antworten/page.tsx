import type { Metadata } from "next";
import { SlowBlinkTrainer } from "@/components/app/SlowBlinkTrainer";
import { AntwortenLibrary } from "@/components/app/AntwortenLibrary";
import { ShareButton } from "@/components/ShareButton";
import { getCatName } from "@/lib/session";

export const metadata: Metadata = { title: "Antworten — Zwei-Wege" };

export default async function AntwortenPage() {
  const catName = await getCatName();

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
            Zurücksprechen
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Wie du mit ihr sprichst
          </h1>
          <p className="mt-3 font-body text-lg text-ink-soft">
            Verstehen ist die eine Hälfte. Jetzt lernst du, wie du{" "}
            {catName ? catName : "deiner Katze"} antwortest — in ihrer Sprache.
          </p>
        </div>
        <ShareButton text="Ich hab gerade meiner Katze „Ich hab dich lieb“ gesagt 🐱 So geht's:" />
      </header>

      {/* Slow-Blink-Trainer — Herzstück */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl">Der Slow-Blink-Trainer</h2>
        <SlowBlinkTrainer catName={catName} />

        <div className="mt-4 rounded-brand bg-cream-2/60 p-5">
          <p className="font-body text-sm leading-relaxed text-ink-soft">
            <strong className="text-ink">Warum funktioniert das?</strong> Das
            langsame Blinzeln gilt als Beschwichtigungssignal: Die Katze zeigt,
            dass sie sich in deiner Nähe sicher fühlt. Eine Studie der
            University of Sussex (2020) deutet darauf hin, dass Katzen eher
            zurückblinzeln, wenn Menschen ihnen langsam zublinzeln — eine kleine,
            echte Form der Verständigung.
          </p>
        </div>
      </section>

      {/* Antworten-Bibliothek */}
      <section>
        <h2 className="mb-1 font-display text-2xl">Deine Werkzeuge</h2>
        <p className="mb-5 font-body text-ink-soft">
          Konkrete Wege, wie du {catName ? catName : "deiner Katze"} in ihrer
          Sprache antwortest.
        </p>
        <AntwortenLibrary />
      </section>
    </div>
  );
}
