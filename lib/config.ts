// Zentrale Produkt-Konfiguration.

/** Hauptpreis in Cent. A/B gegen 1900 (19 €) testbar via ENV. */
export const PRICE_CENTS = Number(process.env.NEXT_PUBLIC_PRICE_CENTS || 2900);

/** Order-Bump: Notfall-Symptom-Spickzettel. */
export const BUMP_CENTS = 900;

export const PRODUCT_NAME = "Schnurrcode Vollzugang";

export function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
