import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" intro="Stand: 06/2026">
      <section className="space-y-1">
        <H2>1. Verantwortlicher</H2>
        <p>Daniel Wudernitz, Pasettistraße 25/66, 1200 Wien, Österreich</p>
        <p>E-Mail: schnurrcode@gmail.com</p>
      </section>

      <section className="space-y-1">
        <H2>2. Allgemeines</H2>
        <p>
          Wir verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen
          Bestimmungen (DSGVO, österreichisches DSG). Diese Erklärung informiert
          über Art, Umfang und Zweck der Verarbeitung sowie über deine Rechte.
        </p>
      </section>

      <section className="space-y-1">
        <H2>3. Rechtsgrundlagen</H2>
        <p>
          Wir verarbeiten Daten auf Grundlage von Art. 6 Abs. 1 DSGVO: zur
          Vertragserfüllung (lit. b), zur Erfüllung rechtlicher Pflichten (lit.
          c, z. B. steuerrechtliche Aufbewahrung), auf Basis deiner Einwilligung
          (lit. a, z. B. Newsletter, Marketing-Cookies) sowie aufgrund
          berechtigter Interessen (lit. f, z. B. sichere Bereitstellung der
          Website).
        </p>
      </section>

      <section className="space-y-1">
        <H2>4. Welche Daten wir verarbeiten</H2>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Kauf &amp; Zugang:</strong> E-Mail-Adresse, Kaufdatum,
            gekauftes Produkt, Land (für die korrekte Umsatzsteuer)
          </li>
          <li>
            <strong>Zahlungsdaten:</strong> werden ausschließlich durch unseren
            Zahlungsdienstleister verarbeitet; wir speichern keine vollständigen
            Kartendaten
          </li>
          <li>
            <strong>Nutzungsdaten in der App:</strong> von dir freiwillig
            angelegte Inhalte (z. B. Katzenname, Notizen, Verhaltens-Einträge)
          </li>
          <li>
            <strong>Server-Logfiles:</strong> IP-Adresse, Zeitpunkt, abgerufene
            Seite, Browsertyp (zur technischen Bereitstellung und Sicherheit)
          </li>
          <li>
            <strong>Kontaktaufnahme:</strong> die von dir übermittelten Angaben
            (z. B. E-Mail-Inhalt)
          </li>
        </ul>
      </section>

      <section className="space-y-1">
        <H2>5. Eingesetzte Dienste / Auftragsverarbeiter</H2>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Hosting:</strong> Vercel Inc. Soweit dabei Daten in die USA
            übertragen werden, erfolgt dies auf Basis geeigneter Garantien
            (EU-Standardvertragsklauseln bzw. EU-US Data Privacy Framework).
          </li>
          <li>
            <strong>Datenbank:</strong> Supabase (Hosting in der EU, Region
            Frankfurt) – speichert Kauf- und App-Daten.
          </li>
          <li>
            <strong>Zahlungsabwicklung:</strong> Stripe Payments Europe Ltd.
            (Irland). Stripe verarbeitet die Zahlungsdaten eigenverantwortlich;
            es gilt zusätzlich die Datenschutzerklärung von Stripe.
          </li>
          <li>
            <strong>E-Mail-Versand:</strong> Brevo (Versand von Bestätigungs-,
            Zugangs- und – mit deiner Einwilligung – Marketing-Mails).
          </li>
          <li>
            <strong>Reichweitenmessung:</strong> datenschutzfreundliche,
            cookielose Analyse (z. B. Plausible / Vercel Analytics) zur
            statistischen Auswertung.
          </li>
          <li>
            <strong>Meta-Pixel:</strong> Meta Platforms Ireland Ltd. Wird{" "}
            <strong>nur nach deiner Einwilligung</strong> geladen und dient der
            Messung und Optimierung von Werbeanzeigen. Dabei können Daten in die
            USA übertragen werden (Garantien wie oben).
          </li>
          <li>
            <strong>KI-Funktion (optional):</strong> Nutzt du die Funktion „in
            eigenen Worten beschreiben", wird der von dir eingegebene
            Beschreibungstext zur Auswertung an Anthropic (Claude) übermittelt.
            Gib dort bitte keine personenbezogenen Daten ein.
          </li>
        </ul>
      </section>

      <section className="space-y-1">
        <H2>6. Cookies &amp; Einwilligung</H2>
        <p>
          Technisch notwendige Cookies setzen wir zur Bereitstellung der Website
          ein. Marketing-/Analyse-Dienste (z. B. Meta-Pixel) werden erst nach
          deiner aktiven Einwilligung über das Consent-Banner geladen. Du kannst
          deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
      </section>

      <section className="space-y-1">
        <H2>7. Speicherdauer</H2>
        <p>
          Wir speichern Daten nur so lange, wie es für die genannten Zwecke
          erforderlich ist bzw. gesetzliche Aufbewahrungsfristen (insbesondere
          steuerrechtlich, i. d. R. 7 Jahre) bestehen.
        </p>
      </section>

      <section className="space-y-1">
        <H2>8. Deine Rechte</H2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung
          der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Erteilte
          Einwilligungen kannst du jederzeit widerrufen. Wende dich dafür an
          schnurrcode@gmail.com.
        </p>
      </section>

      <section className="space-y-1">
        <H2>9. Beschwerderecht</H2>
        <p>
          Du hast das Recht, dich bei der Aufsichtsbehörde zu beschweren:
          Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien,
          dsb@dsb.gv.at, www.dsb.gv.at
        </p>
      </section>
    </LegalPage>
  );
}
