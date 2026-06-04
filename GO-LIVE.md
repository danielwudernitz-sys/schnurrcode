# 🚀 Schnurrcode — Go-Live-Checkliste

Was DU klicken musst, ist minimal. Alles andere ist im Code fertig.
Reihenfolge einhalten. Pro Schritt entstehen 1–3 Werte, die in **Vercel**
(Schritt 5) eingetragen werden.

---

## 1) Supabase (Datenbank, EU) — ~10 Min
1. Auf **supabase.com** anmelden → **New project**.
2. **Region: `Central EU (Frankfurt)`** wählen (wichtig für DSGVO).
3. Warten, bis das Projekt bereit ist.
4. Links **SQL Editor** → **New query** → den **kompletten** Inhalt von
   [`supabase/schema.sql`](supabase/schema.sql) einfügen → **Run**.
   (Erstellt alle Tabellen. „Success. No rows returned" = passt.)
5. **Project Settings → API** öffnen und zwei Werte kopieren:
   - **Project URL** → `SUPABASE_URL`
   - **service_role**-Key (unter „Project API keys", geheim!) → `SUPABASE_SERVICE_KEY`

## 2) Brevo (E-Mail, EU) — ~10 Min
1. Auf **brevo.com** anmelden.
2. **Senders & Domains**: deine Absender-Adresse (z. B. `hallo@schnurrcode.com`)
   hinzufügen und **verifizieren** (am besten Domain verifizieren, sonst landen
   Mails im Spam) → Wert für `BREVO_FROM_EMAIL`.
3. **SMTP & API → API Keys → Generate** → Wert für `BREVO_API_KEY`.

## 3) AUTH_SECRET erzeugen — 10 Sek
Einen langen Zufallswert nehmen (im Terminal):
```
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```
→ Ergebnis als `AUTH_SECRET` verwenden.

## 4) Code zu GitHub
Das Git-Repo ist bereits angelegt und committet. Nur noch zu GitHub schieben:
1. Auf **github.com** ein **neues, privates Repo** „schnurrcode" anlegen.
2. Im Projektordner:
   ```
   git remote add origin https://github.com/DEIN-NAME/schnurrcode.git
   git push -u origin main
   ```

## 5) Vercel (Hosting) — ~10 Min
1. Auf **vercel.com** mit GitHub anmelden → **Add New… → Project** → das
   schnurrcode-Repo importieren (Next.js wird automatisch erkannt).
2. **Environment Variables** setzen — alle aus
   [`.env.production.example`](.env.production.example):

   | Variable | woher |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://schnurrcode.com` (oder vorerst die `*.vercel.app`-URL) |
   | `AUTH_SECRET` | aus Schritt 3 |
   | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | aus Schritt 1 |
   | `BREVO_API_KEY`, `BREVO_FROM_EMAIL` | aus Schritt 2 |
   | `STRIPE_SECRET_KEY` | dein Stripe (sk_live_…) |
   | `STRIPE_WEBHOOK_SECRET` | Schritt 6 |
   | `NEXT_PUBLIC_PRICE_CENTS` | `2900` |

   > ❗ `ALLOW_DEV_LOGIN` NICHT setzen. (Sonst käme jeder ohne Kauf rein.)
3. **Deploy** klicken.

## 6) Stripe-Webhook auf die Live-URL zeigen
(Stripe-Konto hast du schon.)
1. Stripe-Dashboard → **Developers → Webhooks → Add endpoint**.
2. URL: `https://DEINE-DOMAIN/api/stripe-webhook`
3. Event auswählen: **`checkout.session.completed`**.
4. **Signing secret** (`whsec_…`) kopieren → in Vercel als
   `STRIPE_WEBHOOK_SECRET` eintragen → in Vercel **Redeploy**.

## 7) Domain verbinden
Vercel → Projekt → **Settings → Domains** → `schnurrcode.com` hinzufügen und
den DNS-Anweisungen folgen. Danach `NEXT_PUBLIC_SITE_URL` auf die echte Domain
setzen und neu deployen.

---

## ✅ Test nach dem Deploy (Stripe-Testmodus)
1. Mit Stripe-**Test**-Keys deployen, Testkarte `4242 4242 4242 4242`.
2. Ablauf durchspielen: **Checkout → E-Mail mit Login-Link → einloggen →
   /app → Katze anlegen → Notiz speichern → PDF**.
3. Klappt alles → auf **Live-Keys** wechseln und neu deployen.

## ⚠️ Pflicht vor echtem Launch (kein Code)
- [ ] **Inhalte tierärztlich gegenchecken** (`data/signals.ts`, `data/probleme.ts`)
- [ ] **Rechtstexte** final einsetzen (Impressum/Datenschutz/AGB/Widerruf — aktuell Platzhalter)
- [ ] **`favicon.png`** liefern (fehlt noch)
- [ ] Prüfen: `ALLOW_DEV_LOGIN` ist in Produktion NICHT gesetzt
- [ ] OSS/Umsatzsteuer mit Steuerberater klären (Land pro Verkauf wird gespeichert)

## Wie der Login dann funktioniert
Kauf (Stripe) → Webhook speichert die E-Mail in `orders` + schickt via Brevo
einen Login-Link → Klick → eingeloggt. Nur E-Mails aus `orders` bekommen Zugang.
