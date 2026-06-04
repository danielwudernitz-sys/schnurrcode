import type { Metadata } from "next";
import { LegalPage, H2 } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" intro="Angaben gemäß ECG und Mediengesetz (Österreich).">
      <section className="space-y-2">
        <H2>Medieninhaber & Diensteanbieter</H2>
        <p>[Vorname Nachname / Einzelunternehmen]</p>
        <p>[Straße Hausnummer]</p>
        <p>[PLZ Ort, Österreich]</p>
      </section>
      <section className="space-y-2">
        <H2>Kontakt</H2>
        <p>E-Mail: [hallo@schnurrcode.com]</p>
        <p>Telefon: [optional]</p>
      </section>
      <section className="space-y-2">
        <H2>Unternehmensdaten</H2>
        <p>UID-Nummer: [ATU…, falls vorhanden]</p>
        <p>Gewerbe: [Gewerbewortlaut]</p>
        <p>Mitgliedschaft: WKO [Bundesland]</p>
        <p>Aufsichtsbehörde / Gewerbebehörde: [Bezirksverwaltungsbehörde]</p>
      </section>
      <section className="space-y-2">
        <H2>Online-Streitbeilegung</H2>
        <p>
          Plattform der EU-Kommission zur Online-Streitbeilegung:
          ec.europa.eu/consumers/odr
        </p>
      </section>
    </LegalPage>
  );
}
