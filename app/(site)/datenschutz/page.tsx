import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO. Alle Dienste werden in der EU gehostet."
    >
      <section className="space-y-2">
        <H2>Verantwortlicher</H2>
        <p>[Name, Anschrift, E-Mail — siehe Impressum]</p>
      </section>
      <section className="space-y-2">
        <H2>Welche Daten wir verarbeiten</H2>
        <p>
          E-Mail-Adresse (Lead-Magnet, Kauf, Login), Kauf- und Länderdaten
          (Umsatzsteuer/OSS), optional Katzenname und Foto (Personalisierung),
          technische Server-Logs.
        </p>
      </section>
      <section className="space-y-2">
        <H2>Eingesetzte Dienste (Auftragsverarbeiter, EU)</H2>
        <p>
          <strong>Brevo</strong> (E-Mail-Versand, EU) ·{" "}
          <strong>Stripe</strong> (Zahlungsabwicklung) ·{" "}
          <strong>Supabase</strong> (Datenbank, EU/Frankfurt) ·{" "}
          <strong>Vercel</strong> (Hosting). Mit allen Anbietern bestehen bzw.
          werden Auftragsverarbeitungsverträge geschlossen.
        </p>
      </section>
      <section className="space-y-2">
        <H2>Analyse & Marketing</H2>
        <p>
          Cookieloses Analytics (Plausible/Vercel) sowie — nur nach
          ausdrücklicher Einwilligung über das Consent-Banner — Meta Pixel und
          Conversions API. Ohne Einwilligung werden keine Marketing-/Tracking-
          Skripte geladen.
        </p>
      </section>
      <section className="space-y-2">
        <H2>Rechtsgrundlagen</H2>
        <p>
          Vertragserfüllung (Art. 6 Abs. 1 lit. b), Einwilligung (lit. a, z. B.
          Newsletter/Pixel), berechtigtes Interesse (lit. f), rechtliche
          Verpflichtung (lit. c, z. B. Aufbewahrung).
        </p>
      </section>
      <section className="space-y-2">
        <H2>Deine Rechte</H2>
        <p>
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
          Widerspruch sowie Beschwerde bei der Datenschutzbehörde.
        </p>
      </section>
    </LegalPage>
  );
}
