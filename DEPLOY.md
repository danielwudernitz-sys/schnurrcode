# Schnurrcode — Deploy & Betrieb

## 1. Hosting
Empfohlen: **Vercel** (oder Railway EU). Daten/Dienste in der EU halten (DSGVO).

```bash
npm install
npm run build   # muss grün sein
npm start        # Production lokal testen
```

## 2. ENV-Variablen
Alle Werte aus `.env.example` im Hosting-Dashboard setzen. Pflicht in Produktion:

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Öffentliche Basis-URL (z. B. https://schnurrcode.com) |
| `AUTH_SECRET` | Signatur der Login-Session (langer Zufallswert!) |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Zahlung + Webhook-Verifizierung |
| `BREVO_API_KEY` / `BREVO_FROM_EMAIL` | E-Mail-Versand (EU) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` | Datenbank (EU/Frankfurt) |
| `ANTHROPIC_API_KEY` | Optionaler KI-Decoder |
| `NEXT_PUBLIC_META_PIXEL_ID` / `META_CAPI_TOKEN` | Meta Pixel + Conversions API |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Cookieloses Analytics |

> Ohne diese Werte läuft alles im **Dev-Fallback**: E-Mails werden in der Konsole
> geloggt, DB-Schreibvorgänge sind No-Ops, der Login lässt jede Adresse durch,
> der KI-Decoder nutzt eine lokale Heuristik. So ist die App ohne Konten testbar.

## 3. Supabase — Tabellen (SQL)
```sql
create table leads (
  email text, consent boolean, country text,
  created_at timestamptz default now()
);
create table orders (
  email text, country text, product text, bump boolean,
  stripe_session text, created_at timestamptz default now()
);
create table profiles (
  email text primary key, cat_name text, photo_url text,
  onboarded boolean default true, updated_at timestamptz default now()
);
create table favorites (
  email text, ids jsonb, ueberschrift text,
  created_at timestamptz default now()
);

-- Mehr-Katzen-System (pro Käufer)
create table cats (
  id uuid primary key,
  email text not null,
  name text not null,
  photo_url text,        -- kleine Daten-URL (oder später Supabase Storage)
  breed text,
  age text,
  notes text,
  created_at timestamptz default now()
);
create index on cats (email);

create table cat_events (
  id uuid primary key,
  cat_id uuid not null,
  email text not null,
  date text not null,    -- YYYY-MM-DD
  note text not null,
  category text not null, -- fuetterung | tierarzt | klo | verhalten | sonstiges
  created_at timestamptz default now()
);
create index on cat_events (cat_id);
```
> Zugriff ist serverseitig immer nach `email` (eingeloggter Käufer) gefiltert.
> Empfehlung: zusätzlich Row Level Security in Supabase aktivieren.
> **Land pro Verkauf** (`orders.country`) ist für Umsatzsteuer/OSS Pflicht und
> wird aus den Stripe-Rechnungsdaten gespeichert.

## 4. Stripe-Webhook
1. Stripe-Dashboard → Developers → Webhooks → Endpoint hinzufügen:
   `https://DEINE-DOMAIN/api/stripe-webhook`
2. Event: `checkout.session.completed`
3. Signing-Secret kopieren → `STRIPE_WEBHOOK_SECRET`.

Der Webhook ist signaturgeprüft (Web Crypto), speichert den Kauf (inkl. Land)
und verschickt die Magic-Link-Zugangsmail über Brevo.

## 5. PDF-Guide (wkhtmltopdf)
Aktuell liefert `/api/generate-pdf` ein druckfertiges HTML — Nutzer speichern es
im Browser als PDF. Für serverseitige PDF-Erzeugung im Deploy:
1. `wkhtmltopdf` in der Runtime bereitstellen (Buildpack/Container).
2. In `app/api/generate-pdf/route.ts` das HTML aus `buildGuideHtml()` an
   `wkhtmltopdf` pipen und mit `Content-Type: application/pdf` zurückgeben.
Die Vorlage (`lib/guideHtml.ts`) bleibt unverändert die einzige Quelle.

## 6. Test-Kauf (Stripe-Testmodus)
Durchspielen: Checkout → Webhook → Zugangsmail → Login → `/app` → PDF.
Stripe-Testkarte: `4242 4242 4242 4242`, beliebiges zukünftiges Datum/CVC.
Danach auf Live-Keys umstellen.

## 7. Vor Launch (Pflicht)
- [ ] **Content tierärztlich gegenchecken** (signals.ts + probleme.ts)
- [ ] Rechtstexte (Impressum/Datenschutz/AGB/Widerruf) final einsetzen
- [ ] `AUTH_SECRET` gesetzt, Live-Stripe-Keys, Brevo-DOI-Liste verbunden
- [ ] Lighthouse > 90 prüfen, OG-Bild testen
