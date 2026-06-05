import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Widerruf" };

export default function WiderrufPage() {
  return (
    <LegalPage
      title="Widerrufsbelehrung"
      intro="Für Verbraucher gemäß FAGG. Stand: 06/2026"
    >
      <section className="space-y-1">
        <H2>Widerrufsrecht</H2>
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
          Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem
          Tag des Vertragsabschlusses.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns (Daniel Wudernitz,
          Pasettistraße 25/66, 1200 Wien, schnurrcode@gmail.com) mittels einer
          eindeutigen Erklärung (z. B. per E-Mail) über deinen Entschluss
          informieren. Zur Wahrung der Frist genügt die rechtzeitige Absendung.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Folgen des Widerrufs</H2>
        <p>
          Wenn du diesen Vertrag widerrufst, erstatten wir dir alle erhaltenen
          Zahlungen unverzüglich und spätestens binnen vierzehn Tagen zurück.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Vorzeitiges Erlöschen des Widerrufsrechts</H2>
        <p>
          Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung
          digitaler Inhalte, die nicht auf einem körperlichen Datenträger
          geliefert werden, wenn der Anbieter mit der Ausführung begonnen hat,
          nachdem du
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            ausdrücklich zugestimmt hast, dass mit der Ausführung vor Ablauf der
            Widerrufsfrist begonnen wird, und
          </li>
          <li>
            deine Kenntnis davon bestätigt hast, dass du durch diese Zustimmung
            dein Widerrufsrecht verlierst.
          </li>
        </ol>
        <p className="mt-2 rounded-brand bg-cream-2/60 px-4 py-3 italic">
          Im Checkout aktiv anzuhaken: „Ich stimme ausdrücklich zu, dass mit der
          Bereitstellung des digitalen Inhalts sofort begonnen wird, und ich
          bestätige meine Kenntnis davon, dass ich dadurch mein Widerrufsrecht
          verliere."
        </p>
      </section>

      <section className="space-y-1">
        <H2>Muster-Widerrufsformular</H2>
        <p>
          An: Daniel Wudernitz, Pasettistraße 25/66, 1200 Wien,
          schnurrcode@gmail.com
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag
          über den Kauf von „Schnurrcode".
        </p>
        <ul className="ml-5 list-none space-y-1 text-ink-soft">
          <li>– Bestellt am / erhalten am: __________</li>
          <li>– Name des/der Verbraucher(s): __________</li>
          <li>– Anschrift: __________</li>
          <li>– E-Mail (Bestellung): __________</li>
          <li>– Datum: __________</li>
        </ul>
      </section>
    </LegalPage>
  );
}
