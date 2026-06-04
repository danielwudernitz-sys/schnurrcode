import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Widerruf" };

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung" intro="Für Verbraucherinnen und Verbraucher beim Kauf digitaler Inhalte (FAGG).">
      <section className="space-y-2">
        <H2>Widerrufsrecht</H2>
        <p>
          Du hast grundsätzlich das Recht, binnen 14 Tagen ohne Angabe von
          Gründen diesen Vertrag zu widerrufen.
        </p>
      </section>
      <section className="space-y-2">
        <H2>Vorzeitiges Erlöschen bei digitalen Inhalten</H2>
        <p>
          Das Widerrufsrecht erlischt vorzeitig, wenn du beim Kauf ausdrücklich
          zugestimmt hast, dass mit der Ausführung vor Ablauf der Widerrufsfrist
          begonnen wird, und du zur Kenntnis genommen hast, dass du dadurch dein
          Widerrufsrecht verlierst. Diese Zustimmung holen wir im Checkout über
          eine verpflichtende Checkbox ein:
        </p>
        <p className="rounded-brand bg-cream-2/60 px-4 py-3 italic">
          „Ich stimme zu, dass die Lieferung sofort beginnt und ich mein
          14-tägiges Rücktrittsrecht damit verliere.“
        </p>
      </section>
      <section className="space-y-2">
        <H2>Ausübung des Widerrufs</H2>
        <p>
          Zur Ausübung genügt eine eindeutige Erklärung (z. B. E-Mail an
          [hallo@schnurrcode.com]) — sofern das Widerrufsrecht nicht bereits
          erloschen ist.
        </p>
      </section>
    </LegalPage>
  );
}
