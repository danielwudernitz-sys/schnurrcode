# Schnurrcode 🐱

Web-App „Schnurrcode" — knack den Code deiner Katze. Verstehen, was sie sagt,
und lernen, wie man zurückspricht. Einmalkauf, kein Abo.

## Stack
Next.js 14 (App Router, TS) · Tailwind · Framer Motion · Supabase (EU) ·
Stripe · Brevo · optional Anthropic. DSGVO-konform, Daten in der EU.

## Lokal starten
```bash
npm install
npm run dev      # http://localhost:3000
```
Ohne `.env.local` läuft alles im Dev-Fallback (siehe `DEPLOY.md`).
Der erste Compile dauert unter Node 24 ~40–60 s.

## Struktur
```
app/(site)/        Öffentliche Seiten (Landing, Gratis-Übersetzer, Checkout, Login, Recht)
app/app/           Geschützter Bereich (Übersetzer, Zurücksprechen, Szenarien, Probleme, Nachschlagen, Download)
app/api/           lead · decode · checkout · stripe-webhook · auth · profile · favorites · generate-pdf · capi
components/         UI, Marketing, Decoder, App, Legal
data/              signals.ts · probleme.ts  (Content-Seed — VOR LAUNCH tierärztlich prüfen)
lib/               auth · session · db · email · stripe · decoder · track · guideHtml · config
middleware.ts      Schützt /app (gültige, bezahlte Session)
```

## Wichtig
- **Kein Tierarzt-Ersatz** — Disclaimer global + rote Warnfelder im Problemlöser.
- Tracking (Meta Pixel/CAPI) feuert **nur nach Consent**. Analytics cookielos.
- Deploy, ENV, Supabase-SQL, Stripe-Webhook, PDF-Pipeline → `DEPLOY.md`.
- Projektbriefing → `CLAUDE.md`.
