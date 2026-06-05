import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      intro="Offenlegung gemäß § 5 ECG und § 25 Mediengesetz. Stand: 06/2026"
    >
      <section className="space-y-1">
        <H2>Medieninhaber &amp; Diensteanbieter</H2>
        <p>Daniel Wudernitz</p>
        <p>Einzelunternehmen</p>
        <p>Pasettistraße 25/66</p>
        <p>1200 Wien, Österreich</p>
      </section>

      <section className="space-y-1">
        <H2>Kontakt</H2>
        <p>E-Mail: schnurrcode@gmail.com</p>
        <p>Website: www.schnurrcode.com</p>
      </section>

      <section className="space-y-1">
        <H2>Unternehmensgegenstand</H2>
        <p>
          Werbeagentur / Erstellung von KI-gestützten Werbe- und
          Marketingvideos, Entwicklung von AI-Agenten und
          Workflow-Automatisierungen sowie Handel mit und Vertrieb von digitalen
          Produkten.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Unternehmensdaten</H2>
        <p>
          <strong>Gewerbe:</strong> Handelsgewerbe mit Ausnahme der
          reglementierten Handelsgewerbe (freies Gewerbe)
        </p>
        <p><strong>UID-Nummer:</strong> ATU82967416</p>
        <p>
          <strong>Gewerbebehörde:</strong> Magistratisches Bezirksamt für den
          20. Bezirk (Brigittenau)
        </p>
        <p><strong>Mitglied der:</strong> Wirtschaftskammer Wien</p>
        <p>
          <strong>Anwendbare Rechtsvorschriften:</strong> Gewerbeordnung (GewO),
          abrufbar unter www.ris.bka.gv.at
        </p>
        <p>
          <strong>Aufsichtsbehörde gemäß ECG:</strong> Magistratisches
          Bezirksamt für den 20. Bezirk
        </p>
      </section>

      <section className="space-y-1">
        <H2>Haftung für Inhalte</H2>
        <p>
          Die Inhalte dieser Website und der Anwendung wurden mit größtmöglicher
          Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
          der Inhalte kann jedoch keine Gewähr übernommen werden.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Hinweis zu den Inhalten von Schnurrcode</H2>
        <p>
          Die in Schnurrcode bereitgestellten Informationen zum Katzenverhalten
          dienen ausschließlich allgemeinen Informationszwecken und ersetzen
          keine tierärztliche oder verhaltensmedizinische Beratung. Bei
          gesundheitlichen oder Verhaltensauffälligkeiten deiner Katze wende
          dich bitte an eine Tierärztin oder einen Tierarzt.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Haftung für Links</H2>
        <p>
          Diese Website enthält Links zu externen Websites Dritter. Auf deren
          Inhalte hat der Websitebetreiber keinen Einfluss, weshalb für diese
          fremden Inhalte keine Haftung übernommen wird.
        </p>
      </section>

      <section className="space-y-1">
        <H2>Online-Streitbeilegung</H2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-honey-deep underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalPage>
  );
}
