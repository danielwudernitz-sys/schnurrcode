import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" intro="Für den Verkauf digitaler Inhalte über schnurrcode.com.">
      <section className="space-y-2">
        <H2>1 · Geltungsbereich & Anbieter</H2>
        <p>[Anbieterangaben, Stand der AGB, Geltungsbereich.]</p>
      </section>
      <section className="space-y-2">
        <H2>2 · Vertragsgegenstand</H2>
        <p>
          Digitaler Zugang zur Web-App „Schnurrcode“ inkl. PDF-Guide
          (Einmalkauf, kein Abo). Optionaler Order-Bump (Notfall-Spickzettel).
        </p>
      </section>
      <section className="space-y-2">
        <H2>3 · Vertragsschluss & Preise</H2>
        <p>
          Der Vertrag kommt mit Abschluss des Bezahlvorgangs zustande. Preise
          inkl. gesetzlicher Umsatzsteuer.
        </p>
      </section>
      <section className="space-y-2">
        <H2>4 · Lieferung & Zugang</H2>
        <p>
          Die Bereitstellung erfolgt digital und sofort per Zugangslink an die
          angegebene E-Mail-Adresse.
        </p>
      </section>
      <section className="space-y-2">
        <H2>5 · Widerrufsrecht bei digitalen Inhalten</H2>
        <p>
          Siehe <a href="/widerruf" className="text-honey-deep underline">Widerrufsbelehrung</a>.
          Mit ausdrücklicher Zustimmung zum sofortigen Lieferbeginn erlischt das
          Widerrufsrecht (FAGG).
        </p>
      </section>
      <section className="space-y-2">
        <H2>6 · Haftung & Disclaimer</H2>
        <p>
          Schnurrcode liefert allgemeine Informationen zur Katzensprache und
          ersetzt <strong>keinen tierärztlichen Rat</strong>. Keine Haftung für
          Entscheidungen, die ärztlichen Rat erfordern.
        </p>
      </section>
    </LegalPage>
  );
}
