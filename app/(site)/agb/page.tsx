import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      intro="Für das digitale Produkt „Schnurrcode“. Stand: 06/2026"
    >
      <section className="space-y-1">
        <H2>1. Geltungsbereich &amp; Anbieter</H2>
        <p>
          Diese AGB gelten für alle Verträge über das digitale Produkt
          „Schnurrcode", abgeschlossen über www.schnurrcode.com mit Daniel
          Wudernitz, Einzelunternehmen, Pasettistraße 25/66, 1200 Wien (im
          Folgenden „Anbieter").
        </p>
      </section>

      <section className="space-y-1">
        <H2>2. Vertragsgegenstand</H2>
        <p>
          Schnurrcode ist ein digitales Produkt (webbasierte Anwendung samt
          herunterladbarem PDF-Inhalt) zur Information über Katzenverhalten und
          -kommunikation. Der Erwerb gewährt einen zeitlich unbefristeten Zugang
          zur jeweils erworbenen Version für die private Nutzung.
        </p>
      </section>

      <section className="space-y-1">
        <H2>3. Vertragsschluss</H2>
        <p>
          Der Vertrag kommt zustande, indem der Kunde den Bestellvorgang
          abschließt und die Zahlung über den Zahlungsdienstleister bestätigt.
          Der Anbieter bestätigt den Kauf per E-Mail.
        </p>
      </section>

      <section className="space-y-1">
        <H2>4. Preise &amp; Zahlung</H2>
        <p>
          Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Alle
          Preise verstehen sich inklusive der gesetzlichen Umsatzsteuer. Die
          Zahlung erfolgt über den Zahlungsdienstleister Stripe.
        </p>
      </section>

      <section className="space-y-1">
        <H2>5. Bereitstellung / Lieferung</H2>
        <p>
          Die Bereitstellung des digitalen Inhalts erfolgt unmittelbar nach
          Zahlungseingang durch Übermittlung eines persönlichen Zugangslinks an
          die angegebene E-Mail-Adresse.
        </p>
      </section>

      <section className="space-y-1">
        <H2>6. Nutzungsrechte</H2>
        <p>
          Der Kunde erhält ein einfaches, nicht übertragbares Recht zur privaten
          Nutzung der Inhalte. Die Weitergabe, Vervielfältigung, öffentliche
          Zugänglichmachung oder kommerzielle Verwertung der Inhalte oder
          Zugangsdaten ist nicht gestattet.
        </p>
      </section>

      <section className="space-y-1">
        <H2>7. Widerrufsrecht</H2>
        <p>
          Verbrauchern steht ein gesetzliches Widerrufsrecht zu (siehe{" "}
          <a href="/widerruf" className="text-honey-deep underline">
            gesonderte Widerrufsbelehrung
          </a>
          ). Bei digitalen Inhalten erlischt das Widerrufsrecht, wenn der Kunde
          dem sofortigen Beginn der Vertragserfüllung ausdrücklich zugestimmt und
          seine Kenntnis vom Erlöschen des Widerrufsrechts bestätigt hat.
        </p>
      </section>

      <section className="space-y-1">
        <H2>8. Gewährleistung &amp; Haftung</H2>
        <p>
          Es gelten die gesetzlichen Gewährleistungsbestimmungen. Der Anbieter
          haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für
          Personenschäden. Bei leichter Fahrlässigkeit haftet der Anbieter nur
          bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den
          vertragstypischen, vorhersehbaren Schaden. Zwingende
          verbraucherschutzrechtliche Bestimmungen (KSchG) bleiben unberührt.
        </p>
      </section>

      <section className="space-y-1">
        <H2>9. Inhaltlicher Hinweis (kein Tierarzt-Ersatz)</H2>
        <p>
          Die Inhalte von Schnurrcode dienen allgemeinen Informationszwecken und
          ersetzen keine tierärztliche oder verhaltensmedizinische Beratung. Bei
          gesundheitlichen Problemen der Katze ist eine Tierärztin/ein Tierarzt
          aufzusuchen. Eine Haftung für Handlungen, die allein auf Basis der
          App-Inhalte erfolgen, wird im gesetzlich zulässigen Rahmen
          ausgeschlossen.
        </p>
      </section>

      <section className="space-y-1">
        <H2>10. Vertragssprache &amp; anwendbares Recht</H2>
        <p>
          Vertragssprache ist Deutsch. Es gilt österreichisches Recht unter
          Ausschluss der Verweisungsnormen. Bei Verbrauchern bleiben zwingende
          Schutzbestimmungen ihres Aufenthaltsstaates unberührt.
        </p>
      </section>

      <section className="space-y-1">
        <H2>11. Salvatorische Klausel</H2>
        <p>
          Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt.
        </p>
      </section>
    </LegalPage>
  );
}
