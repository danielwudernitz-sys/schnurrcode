# CLAUDE.md — Schnurrcode App
> Vollständiges Projektbriefing + Build-Prompts für Claude Code.
> Lege diese Datei ins Projekt-Root. Arbeite die Prompts in Reihenfolge ab. Nach jedem Prompt: testen, dann weiter.

---

## 0. Was wir bauen

**Produkt:** Web-App „Schnurrcode" — knack den Code deiner Katze. Verstehen, was sie sagt + lernen, wie man zurückspricht.
**Modell:** Einmalkauf **29 €** (A/B gegen 19 € testen). Gratis Mini-Decoder als Lead-Magnet/Funnel-Einstieg.
**Markt:** AT/DE, **Sprache Deutsch**, du-Form, warm.
**Winkel:** Emotional als Haupt-Hook, Problemlöser als Tiefe (= Preisrechtfertigung).

**Differenzierung (WARUM zahlen, wenn Google gratis ist):**
1. Interaktiver Decoder, der **Signale kombiniert** statt Einzel-Artikel.
2. **Zwei-Wege**: nicht nur verstehen, sondern zurück-kommunizieren.
3. **Problemlöser mit Tierarzt-Warnsystem** (Vertrauen + Sicherheit).
4. Schön, besitzbar, schenkbar (App + PDF-Download).

---

## 1. Tech-Stack (DSGVO-konform, EU)

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + CSS-Variablen (Design-Tokens unten)
- **Animation:** Framer Motion (sparsam, hochwertig)
- **DB:** Supabase (EU-Region, Frankfurt) ODER Convex — speichert Käufe + Zugang
- **Zahlung:** Stripe Checkout (Einmalzahlung) + Webhook
- **Zugang:** Magic-Link-Login (E-Mail), kein Passwort
- **E-Mail:** Brevo (EU) — Bestätigung, Magic-Link, Lead-Magnet, Sequenz
- **PDF:** serverseitig aus HTML-Template (wkhtmltopdf-Pipeline, nicht ReportLab)
- **Hosting:** Vercel (oder Railway EU) — DB-Daten in EU halten
- **Analytics:** Plausible/Vercel Analytics (cookielos) + Meta Pixel + Conversions API (für Ads)
- **Optional KI:** Anthropic API (Claude) für „Beschreib's in eigenen Worten"-Decoder — eng begrenzt (siehe Prompt 5b)

**Wichtig:** Kein Tracking ohne Consent-Banner. Daten in EU. Secrets in `.env`.

---

## 2. Design-System (Brand: warm, vertrauenswürdig)

```css
:root{
  --cream:#F6EEE1; --cream-2:#EFE3D0; --paper:#FBF7EF;
  --ink:#2A2420;   --ink-soft:#5A4F46;
  --honey:#E9A23B; --honey-deep:#C97E1F;
  --success:#5E8C61; --alert:#C4553B; /* Tierarzt-Warnung */
  --radius:22px;
}
```
**Fonts (Google, kommerziell frei):**
- Display/Headlines: **Fraunces** (600/italic für emotionale Akzente)
- Akzent/Code-Look: **JetBrains Mono** (nur für „code"-Wortteil + Labels)
- Body: **Mulish** (400/600/700)

**Logo:** Slow-Blink-Katze mit Schnurr-Wellen (SVG, siehe separates Logo-File). Wortmarke: „Schnurr"(Fraunces) + „code"(Mono, honey).

**Ton der Texte:** warm, direkt, du-Form, nie belehrend. Emotional, aber faktenbasiert. Kein Kitsch-Overkill.

**Design-Prinzipien (NICHT generisch):**
- Viel Cream-Weißraum, ein Honey-Akzent, dunkle Ink-Headlines.
- Karten mit weichen Schatten (`0 18px 50px -28px rgba(42,36,32,.4)`).
- Eine orchestrierte Page-Load-Animation (gestaffelte Reveals), keine zappeligen Micro-Animationen überall.
- KEINE Tech-Blau-Verläufe, kein Lila-auf-Weiß, kein Inter/Roboto.

---

## 3. App-Struktur (alle Seiten & Features)

```
/                     Landing/Sales-Page (öffentlich)
/decoder-gratis       Free Mini-Decoder (Lead-Magnet, Email-Gate)
/checkout             Stripe-Checkout-Einstieg
/danke                Erfolgsseite + Onboarding-Start
/login                Magic-Link-Login
/app                  (geschützt) Dashboard
  /app/decoder        Voll-Decoder „Was sagt meine Katze?"
  /app/antworten      Zwei-Wege „Wie antworte ich?" + Slow-Blink-Trainer
  /app/probleme       Problemlöser-Bibliothek (mit Tierarzt-Warnungen)
  /app/lexikon        Schnurr-Lexikon (Nachschlagewerk aller Signale)
  /app/download       PDF-Download
/impressum /datenschutz /agb /widerruf   Rechtsseiten
```

**Feature-Liste (v1 — bewusst eng, kein Feature-Creep):**
1. **Landing/Sales** — emotionaler Hook, was drin ist, Preis, FAQ, Gratis-Decoder-Teaser.
2. **Free Mini-Decoder** — 3 Signale gratis decodierbar → bei 4. Signal Email-Gate „Schalte alle 40+ Signale frei".
3. **Voll-Decoder** — geführte Auswahl: Schwanz · Ohren · Augen · Körper · Laute · Kontext → kombinierte Deutung.
4. **Zwei-Wege + Slow-Blink-Trainer** — wie du zurücksignalisierst; interaktive Slow-Blink-Übung (emotionales Herzstück, shareable).
5. **Problemlöser** — häufige Probleme, jeweils Bedeutung/Ursachen/Lösung + **rotes Tierarzt-Warnfeld**.
6. **Schnurr-Lexikon** — durchsuchbares Nachschlagewerk (das „Besitz"-Gefühl).
7. **Onboarding/Personalisierung** — Katzenname (+ optional Foto) → App spricht personalisiert („Was sagt dir Minka?").
8. **PDF-Download** — gebündelter Guide aus demselben Content.
9. **Zahlung + Zugang** — Stripe Einmalkauf, Order-Bump, Magic-Link-Zugang.
10. **Rechtliches + Disclaimer** — überall „kein Tierarzt-Ersatz".

---

## 4. BUILD-PROMPTS (in dieser Reihenfolge an Claude Code geben)

### Prompt 1 — Setup & Design-System
```
Initialisiere ein Next.js-14-Projekt (App Router, TypeScript, Tailwind) 
namens "schnurrcode". Richte ein:
- Tailwind-Config mit den CSS-Variablen aus Abschnitt 2 dieser CLAUDE.md 
  als Theme-Farben (cream, ink, honey, honey-deep, success, alert).
- Google Fonts via next/font: Fraunces, JetBrains Mono, Mulish.
- Globale Layout-Komponente mit Header (Logo links, Login-Link rechts) 
  und Footer (Links zu Impressum/Datenschutz/AGB/Widerruf).
- Eine <Logo/>-Komponente als inline-SVG (Slow-Blink-Katze mit 
  Schnurr-Wellen, ink auf transparent, honey-Akzente — Augen als 
  geschwungene Bögen, Schnurr-Wellen links/rechts).
- Basis-UI-Komponenten: Button (primär=honey, sekundär=outline), Card 
  (radius 22px, weicher Schatten), Badge, Modal.
- Reusable <DisclaimerNote/>: dezenter Hinweis "Schnurrcode ersetzt 
  keinen Tierarzt. Bei Sorgen → Tierärztin/Tierarzt."
Halte es warm, viel Weißraum, KEINE generischen AI-Aesthetics.
```

### Prompt 2 — Landing-/Sales-Page
```
Baue die Landing-Page "/" (Sales). Sektionen in dieser Reihenfolge:
1. Hero: emotionale Headline ("Endlich verstehen, was deine Katze dir 
   sagt"), Subline (Zwei-Wege-Versprechen), CTA "Mach den Gratis-Test" 
   (→ /decoder-gratis) + sekundär "Für 29 € freischalten" (→ /checkout). 
   Hero-Illustration rechts (Platzhalter <img src="/img/hero-cat.png">).
2. "Kennst du das?"-Block: 3-4 emotionale Pain-Points (sie maunzt nachts, 
   sie beißt beim Streicheln, du weißt nie was sie will).
3. "Was Schnurrcode kann": 4 Feature-Karten (Decoder, Zwei-Wege, 
   Problemlöser, Lexikon) mit Icons.
4. Vertrauens-Block: "Basiert auf seriöser Katzenverhaltenskunde" + der 
   ehrliche Twist: "Wir sagen dir auch, wann Schnurren KEIN gutes Zeichen 
   ist." (Differenzierung!) + Tierarzt-Sicherheitsversprechen.
5. Gratis-Teaser: eingebettete Mini-Vorschau des Decoders, CTA zum 
   Gratis-Test.
6. Preis-Block: 29 € einmalig (kein Abo!), Liste was inkludiert, CTA.
7. FAQ (Lieferung sofort, kein Tierarzt-Ersatz, Geräte, Rückgabe digital).
8. Footer mit Rechtslinks.
Mobile-first. Eine gestaffelte Load-Animation im Hero. KEINE <form>-Reloads.
```

### Prompt 3 — Free Mini-Decoder (Lead-Magnet)
```
Baue "/decoder-gratis". Nutzt dieselbe Decoder-Engine wie die Vollversion 
(siehe Prompt 4), aber limitiert: User darf 3 Signal-Deutungen ansehen, 
beim Versuch der 4. erscheint ein Email-Gate-Modal:
"Schalte alle 40+ Signale + den Problemlöser frei — gib deine E-Mail 
für den Gratis-Einstieg."
- E-Mail wird via /api/lead an Brevo gesendet (Liste "Leads"), 
  Double-Opt-in.
- Nach Eintrag: kurze Bestätigung + CTA "Jetzt Vollversion für 29 €".
- Dieser Gratis-Decoder ist der virale Hook für Reels ("gib ein, was 
  deine Katze macht 👇"). Mach ihn teilbar (Share-Button mit OG-Image).
DSGVO: Consent-Checkbox, Datenschutz-Link im Modal.
```

### Prompt 4 — Decoder-Engine (Herzstück)
```
Baue die Decoder-Engine als datengetriebenes System (KEINE 
hartcodierte UI-Logik).

Datenmodell (lege /data/signals.ts an, befülle mit dem Content aus 
Abschnitt 5 dieser CLAUDE.md):
- Kategorien: schwanz, ohren, augen, koerper, laute, kontext
- Jedes Signal: { id, kategorie, label, kurz, bedeutung, 
  emotion(positiv/neutral/anspannung), tierarztFlag?:boolean }
- Kombi-Regeln: { wenn:[signalIds], dann: deutung } für aussagekräftige 
  Kombinationen (z.B. Schwanz-peitschen + Ohren-angelegt = "stark 
  gereizt, Rückzug geben").

UI "/app/decoder":
- Geführter Builder: User wählt pro Kategorie ein Signal (Chips/Karten 
  mit kleinen Illustrationen). Mind. 1, max. alle 6.
- "Decodieren"-Button → zeigt zusammengesetzte Deutung: Haupt-Emotion 
  (farbcodiert), was die Katze fühlt/will, + "Was du tun kannst".
- Wenn ein tierarztFlag-Signal dabei ist → rotes Warnfeld einblenden.
- Außerdem Schnellauswahl "Typische Situationen" (Presets: 
  "maunzt am Napf", "Bauch zeigen", "Fenster-Schnattern" ...).
- Ergebnis teilbar + als Favorit speicherbar (pro User in DB).
Alles auf Deutsch, du-Form, warm.
```

### Prompt 5a — Zwei-Wege & Slow-Blink-Trainer
```
Baue "/app/antworten":
- Abschnitt "Wie du zurücksprichst": Slow-Blink, ruhige Stimme, 
  Blickkontakt dosieren, Körpersprache, Spiel als Kommunikation — je 
  als Karte mit Erklärung + kurzer Animation/Illustration.
- Interaktiver "Slow-Blink-Trainer": Eine animierte Katzen-Augenpartie 
  (SVG/Framer Motion), die langsam blinzelt; daneben Anleitung "Blinzle 
  zurück". Eine geführte 10-Sekunden-Übung mit sanftem Timer. 
  Das ist das emotionale Herzstück — mach es schön und teilbar.
- Erklär-Box: Warum der Slow-Blink das "Ich hab dich lieb" der Katze ist 
  (mit Quelle/seriöser Einordnung).
```

### Prompt 5b — Optionaler KI-Decoder (Freitext)
```
Ergänze im Decoder einen Tab "In eigenen Worten beschreiben". 
Ruft die Anthropic API (claude, model sonnet) über /api/decode auf.
WICHTIG — System-Prompt eng begrenzen:
- Rolle: Katzenverhalten freundlich deuten, NUR auf Basis gängiger 
  Ethologie.
- IMMER auf Deutsch, du-Form, warm, kurz.
- KEINE medizinische Diagnose. Bei Hinweisen auf Krankheit/Schmerz/
  Verhaltensänderung IMMER zum Tierarzt raten.
- Antwort-Struktur als JSON: {emotion, deutung, wasTunKannst, 
  tierarztNoetig:boolean}.
- Bei tierarztNoetig=true im Frontend das rote Warnfeld zeigen.
Rate-Limit pro User. Kosten beobachten. Fallback auf den 
geführten Decoder, falls API fehlschlägt.
```

### Prompt 6 — Problemlöser-Bibliothek
```
Baue "/app/probleme". Datengetrieben (/data/probleme.ts, befüllen mit 
Content aus Abschnitt 5).
Jedes Problem als aufklappbare Karte:
- Titel (z.B. "Pinkelt neben das Klo")
- "Was dahinterstecken kann" (Ursachen-Liste)
- "Was du tun kannst" (konkrete Schritte)
- ROTES TIERARZT-WARNFELD (--alert) mit klaren Red-Flags 
  ("Sofort zum Tierarzt, wenn ...") — das ist Pflicht und 
  ein Sicherheits-/Vertrauensfeature.
Suchbar/filterbar. Disclaimer prominent oben.
```

### Prompt 7 — Schnurr-Lexikon
```
Baue "/app/lexikon": durchsuchbares Nachschlagewerk ALLER Signale aus 
signals.ts, gruppiert nach Kategorie, mit Illustration, Kurzdeutung und 
Detail. Volltextsuche. Reines Lese-/Stöber-Erlebnis (das "Besitz"-Gefühl 
des Produkts).
```

### Prompt 8 — Zahlung (Stripe) + Zugang
```
Integriere Stripe + Zugangssystem.
1. /checkout: Produkt "Schnurrcode Vollzugang" 29 €. Optionaler 
   Order-Bump als Checkbox: "+ Notfall-Symptom-Spickzettel (PDF) +9 €". 
   Stripe Checkout Session erzeugen.
2. PFLICHT vor Kauf: Checkbox FAGG-Widerrufsverzicht: "Ich stimme zu, 
   dass die Lieferung sofort beginnt und ich mein 14-tägiges 
   Rücktrittsrecht damit verliere." Ohne Häkchen kein Checkout.
3. Webhook /api/stripe-webhook auf checkout.session.completed:
   - Käufer (E-Mail + Land + Produkt) in DB speichern (für OSS-Auswertung 
     pro Land!).
   - Magic-Link-Token erzeugen, Zugangs-Mail via Brevo senden.
4. Magic-Link-Login /login: E-Mail → Link → Session-Cookie → Zugang /app.
5. /app per Middleware schützen (nur mit gültiger Session/Kauf).
6. /danke: Erfolgsseite → startet Onboarding.
Webhook-Signatur verifizieren. Secrets aus .env. Land pro Verkauf 
zwingend speichern (Umsatzsteuer/OSS).
```

### Prompt 9 — PDF-Download
```
Baue /app/download + /api/generate-pdf: generiert aus demselben Content 
(signals.ts + probleme.ts) ein hochwertiges PDF via HTML-Template → 
wkhtmltopdf. Cover (Logo, Titel), Inhaltsverzeichnis, Lexikon, 
Problemlöser mit Warnhinweisen, Footer mit Branding + Disclaimer. 
Nur für eingeloggte Käufer. Order-Bump-Käufer bekommen zusätzlich den 
Notfall-Spickzettel.
```

### Prompt 10 — Onboarding/Personalisierung
```
Nach Kauf (/danke → /app erstes Mal): kurzes Onboarding:
- Katzenname abfragen (+ optional Foto-Upload, lokal/EU-Storage).
- Speichern pro User. App nutzt den Namen ("Was will dir {name} sagen?").
Halte es auf 1-2 Schritte, überspringbar.
```

### Prompt 11 — Rechtsseiten & Disclaimer
```
Erstelle /impressum, /datenschutz, /agb, /widerruf als Platzhalter mit 
korrekter Struktur (Inhalte liefert Daniel/sein Berater).
- Impressum: Pflichtangaben ECG/Mediengesetz (Einzelunternehmen, UID).
- Datenschutz: DSGVO, Brevo, Stripe, Analytics, Hosting EU.
- AGB + Widerrufsbelehrung mit digitalem Inhalt + FAGG-Verzicht.
- Globaler Disclaimer "kein Tierarzt-Ersatz" im Footer + auf allen 
  App-Seiten.
- Cookie/Consent-Banner für Pixel/Analytics (Opt-in).
```

### Prompt 12 — Analytics, Pixel & SEO
```
- Plausible ODER Vercel Analytics (cookielos) einbauen.
- Meta Pixel + Conversions API: Events Lead (Email), InitiateCheckout, 
  Purchase (mit Wert). Erst nach Consent feuern.
- SEO: Meta-Tags, OG-Image (/img/og.png), sitemap, robots.
- Performance: Bilder optimiert, Lighthouse > 90.
```

### Prompt 13 — Deploy
```
Deploy auf Vercel (oder Railway EU). ENV-Variablen setzen (Stripe, Brevo, 
DB, Anthropic, Pixel). Stripe-Webhook-Endpoint in Stripe-Dashboard 
registrieren. Test-Kauf im Stripe-Testmodus durchspielen 
(Checkout → Webhook → Mail → Login → /app → PDF). Dann Live-Keys.
```

---

## 5. CONTENT-SEED (Decoder-Inhalte)

> ⚠️ **VOR LAUNCH von einer Tierärztin/Katzenverhaltensexpertin gegenchecken lassen.** Falschinfos bei Tieren = Schaden + Rückerstattungen + Rufschaden. Quellen-Basis: Purina, Whiskas, Wikipedia (Schnurren), AGILA, ISFM/„Cat Friendly".

### Schwanz
- **Aufrecht, Spitze leicht gebogen** → Begrüßung, Freude, Selbstsicherheit. (positiv)
- **Aufrecht & zitternd** → große Vorfreude/Erregung. (positiv)
- **Um den Körper gewickelt (sitzend)** → entspannt, in sich ruhend. (neutral)
- **Tief / eingezogen** → Unsicherheit, Angst. (anspannung)
- **Aufgeplustert (Flaschenbürste)** → Schreck/Angst, macht sich groß. (anspannung)
- **Peitschen / heftiges Schlagen** → gereizt, Frust, „lass mich". (anspannung)
- **Spitze zuckt leicht** → Konzentration/leichte Anspannung. (neutral)

### Ohren
- **Aufrecht, nach vorn** → aufmerksam, entspannt-wach. (positiv/neutral)
- **Seitlich („Flugzeugohren")** → unsicher, gereizt, Konflikt. (anspannung)
- **Flach angelegt** → Angst oder Aggression — Kontext! (anspannung)
- **Drehen/zucken** → orten Geräusche, wachsam. (neutral)

### Augen
- **Langsames Blinzeln** → Zuneigung, Vertrauen („Katzenkuss"). (positiv)
- **Halb geschlossen, ruhig** → entspannt, zufrieden. (positiv)
- **Pupillen schmal** → helles Licht ODER Anspannung (Kontext). (neutral)
- **Pupillen weit** → Aufregung, Spiel, Angst oder wenig Licht. (neutral)
- **Starren ohne Blinzeln** → Herausforderung/Anspannung. (anspannung)

### Körper
- **Köpfchengeben (Bunting)** → markiert dich, Zuneigung & Vertrauen. (positiv)
- **Kneten („Milchtritt")** → Wohlgefühl, Bindung. (positiv)
- **Bauch zeigen** → Vertrauen — ABER selten Einladung zum Bauchkraulen. (positiv)
- **An Beinen reiben** → Begrüßung + Markierung. (positiv)
- **Po/Schwanzbasis hinstrecken** → „kraul mich", Zuneigung. (positiv)
- **Anschleichen, Hinterteil wackelt** → Spiel-/Jagdvorbereitung. (neutral)

### Laute
- **Miauen** → an Menschen gerichtet: Forderung, Begrüßung, Aufmerksamkeit (erwachsene Katzen miauen untereinander kaum). (neutral)
- **Schnurren** → meist Wohlbefinden — **aber auch Selbstberuhigung bei Stress/Schmerz**. Kontext + andere Signale beachten! (neutral, ggf. tierarztFlag bei weiteren Symptomen)
- **Gurren/Trillern („Brrt?")** → freundliche Begrüßung/Einladung. (positiv)
- **Zwitschern/Schnattern (am Fenster)** → Jagderregung/Frust. (neutral)
- **Fauchen** → Warnung „geh weg", Angst. (anspannung)
- **Knurren** → ernste Warnung, fühlt sich bedroht. (anspannung)
- **Langes Heulen** → Stress/Revier/Paarung; bei alten Katzen nachts → Tierarzt. (anspannung, tierarztFlag)

### Sinnvolle Kombi-Regeln (Beispiele)
- Schwanz-peitschen + Ohren-angelegt → **stark gereizt**, jetzt Ruhe/Abstand geben.
- Langsames Blinzeln + Schnurren + Kneten → **tiefe Entspannung & Bindung**, blinzle zurück.
- Pupillen weit + Anschleichen + Hinterteil-wackeln → **Spielmodus**, jetzt spielen.
- Aufgeplustert + Fauchen → **akute Angst**, nicht bedrängen, Fluchtweg lassen.

### Problemlöser (mit Tierarzt-Red-Flags)
1. **Pinkelt neben das Klo** — Ursachen: Klo unsauber/falsch platziert/zu wenige (Regel: 1 pro Katze + 1), Streuwechsel, Stress, Revierkonflikt. ⚠️ **Tierarzt zuerst:** häufige kleine Mengen, Blut, Schmerzlaute → kann Blasenentzündung/Steine sein. **Kater, der nicht absetzen kann = Notfall.**
2. **Nächtliches Schreien** — Langeweile, Hunger, Aufmerksamkeit, unkastriert. ⚠️ Ältere Katze: Schilddrüse, Bluthochdruck, Demenz → Tierarzt.
3. **Aggression beim Streicheln** — Reizüberflutung; Vorsignale lesen (Schwanzpeitschen, Ohren), kurze Einheiten.
4. **Möbel kratzen** — natürliches Bedürfnis; gute Kratzmöbel, Pheromone, nie bestrafen.
5. **Versteckt sich/Rückzug** — Stress, Veränderung. ⚠️ Plötzlich + Fressunlust/Apathie → Tierarzt.
6. **Übermäßiges Putzen/kahle Stellen** — Stress, Allergie, Parasiten, Schmerz → Tierarzt.
7. **Frisst nicht** — ⚠️ **ernst:** Katzen dürfen nicht hungern (Gefahr Leberverfettung). Über ~24 h kaum Futter → Tierarzt.
8. **Häufiges Erbrechen** — gelegentlich Haarballen ok; häufig/mit Apathie/Durchfall → Tierarzt.

---

## 6. HIGGSFIELD BILD-PROMPTS

> **Style-Anchor (in JEDEM Prompt anhängen, für Konsistenz):**
> „warm flat editorial illustration, soft rounded shapes, cream (#F6EEE1) and honey (#E9A23B) palette, ink-brown linework, cozy golden-hour mood, minimal, lots of negative space, no text, no watermark"
> Tipp: feste Style-/Seed-Referenz nutzen (Higgsfield Soul/Style), damit die Katze über alle Bilder gleich aussieht. KEINE realen Fotos vorgeben — Illustration, damit nichts als „echtes Foto eines Spots/Tiers" missverstanden wird.

1. **Hero:** „a content tabby cat doing a slow blink, sitting, facing viewer, gentle closed eyes, soft purr-wave motif beside it" + Anchor.
2. **OG/Social:** „cozy cat silhouette with slow-blink eyes, centered, generous margins for overlay" + Anchor.
3. **Feature-Icon Decoder:** „a curious cat tilting head with a small speech-bubble" + Anchor.
4. **Feature-Icon Zwei-Wege:** „a human hand and a cat nose gently meeting" + Anchor.
5. **Feature-Icon Problemlöser:** „a calm cat next to a small first-aid heart symbol" + Anchor.
6. **Slow-Blink-Trainer:** „close-up of cat eyes mid slow-blink, two frames open and closed" + Anchor.
7. **Problemlöser-Header:** „a thoughtful cat sitting beside a litter box, gentle, non-clinical" + Anchor.
8. **404/Leer:** „a cat batting a ball of yarn, playful" + Anchor.

---

## 7. RECHTS- & SORGFALTS-CHECKLISTE
- [ ] WKO Gründerservice: deckt mein Gewerbe den Verkauf eigener digitaler Produkte? (gratis Beratung)
- [ ] Steuerberater: USt-Satz (E-Publikation 10 % vs. digitale Leistung 20 %?) + OSS ab 10.000 € EU-B2C
- [ ] OSS in FinanzOnline registrieren (sobald grenzüberschreitend relevant); Land pro Verkauf erfassen
- [ ] Impressum, Datenschutz, AGB, Widerruf + FAGG-Verzicht-Checkbox
- [ ] **Content tierärztlich gegenchecken** (Pflicht — Tierschutz + Haftung)
- [ ] „Kein Tierarzt-Ersatz"-Disclaimer überall
- [ ] Domain `schnurrcode.*` + Markenregister (EUIPO/Patentamt) prüfen
- [ ] Bilder: nur eigene/lizenzierte/KI-generierte — keine fremden Fotos

---

## 8. KURZ-ZUSAMMENFASSUNG DER SCHRITTE
1. **Setup + Design-System** (Prompt 1)
2. **Sales-Page** (P2) → **Gratis-Decoder/Lead-Magnet** (P3)
3. **Decoder-Engine** + Content aus Abschnitt 5 (P4, optional KI-Tab P5b)
4. **Zwei-Wege + Slow-Blink-Trainer** (P5a)
5. **Problemlöser** (P6) + **Lexikon** (P7)
6. **Zahlung Stripe + Zugang** (P8) ← das Geld-Stück
7. **PDF-Download** (P9), **Onboarding** (P10)
8. **Recht** (P11), **Analytics/Pixel/SEO** (P12), **Deploy** (P13)
9. Parallel: **Bilder via Higgsfield** (Abschnitt 6), **Content tierärztlich prüfen**, **Recht klären**

**Realistische Bauzeit:** Kern-App (P1–P8) in 2–4 fokussierten Tagen mit Claude Code machbar. Der Engpass ist NICHT der Bau — es ist guter Content + Reels + Ads-Iteration danach.
