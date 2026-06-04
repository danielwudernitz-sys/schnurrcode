// Hochwertiges, eigenständiges HTML-Template für den PDF-Guide.
// Quelle für BEIDE Pfade: die Druck-/Speichern-Ansicht (Browser → „Als PDF
// speichern“) UND die serverseitige wkhtmltopdf-Pipeline im Deploy.
// Inhalt kommt aus denselben Daten wie die App (signals.ts + probleme.ts).

import { kategorien, signals } from "@/lib/catalog";
import { PROBLEME } from "@/data/probleme";

const emotionColor: Record<string, string> = {
  positiv: "#5E8C61",
  neutral: "#C97E1F",
  anspannung: "#C4553B",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildGuideHtml(opts: {
  catName?: string | null;
  includeBump?: boolean;
  siteUrl: string;
  autoPrint?: boolean;
}): string {
  const { catName, includeBump, siteUrl, autoPrint } = opts;

  const lexikon = kategorien
    .map((kat) => {
      const items = signals
        .filter((s) => s.kategorie === kat.id)
        .map(
          (s) => `
          <div class="entry">
            <div class="entry-head">
              <strong>${esc(s.label)}</strong>
              <span class="tag" style="color:${emotionColor[s.emotion]}">${s.emotion}</span>
            </div>
            <div class="kurz">${esc(s.kurz)}</div>
            <div class="text">${esc(s.bedeutung)}</div>
          </div>`
        )
        .join("");
      return `<h3 class="cat">${esc(kat.label)}</h3>${items}`;
    })
    .join("");

  const problemeHtml = PROBLEME.map(
    (p) => `
      <div class="problem">
        <h3>${esc(p.titel)}</h3>
        <p class="kurz">${esc(p.kurz)}</p>
        <p class="label">Was dahinterstecken kann</p>
        <ul>${p.ursachen.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>
        <p class="label">Was du tun kannst</p>
        <ul>${p.wasTun.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        <div class="vet">
          <strong>🩺 Tierarzt-Warnung</strong>
          <ul><li>${esc(p.tierarztWarnung)}</li></ul>
        </div>
      </div>`
  ).join("");

  const bumpSection = includeBump
    ? `<div class="page-break"></div>
       <h2>Notfall-Symptom-Spickzettel</h2>
       <div class="vet">
         <strong>🩺 Sofort tierärztlich abklären bei:</strong>
         <ul>
           <li>Kater kann keinen Urin absetzen — <strong>Notfall</strong></li>
           <li>Blut im Urin oder Schmerzlaute beim Pinkeln</li>
           <li>Über ~24 h kaum oder kein Futter (Gefahr Leberverfettung)</li>
           <li>Häufiges Erbrechen mit Apathie oder Durchfall</li>
           <li>Plötzlicher Rückzug mit Fressunlust/Apathie</li>
           <li>Kahle Stellen / ständiges Lecken (Haut, Allergie, Schmerz)</li>
           <li>Lautes nächtliches Heulen bei älteren Katzen</li>
         </ul>
       </div>`
    : "";

  const title = catName
    ? `Schnurrcode — der Guide für dich und ${esc(catName)}`
    : "Schnurrcode — dein Katzensprache-Guide";

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  :root{ --ink:#2A2420; --soft:#5A4F46; --honey:#E9A23B; --honeyd:#C97E1F; --alert:#C4553B; --cream:#F6EEE1; }
  *{ box-sizing:border-box; }
  body{ font-family: Georgia, "Times New Roman", serif; color:var(--ink); margin:0; }
  .wrap{ max-width:760px; margin:0 auto; padding:48px 40px; }
  .cover{ min-height:90vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; background:var(--cream); }
  .cover img{ width:160px; height:auto; margin-bottom:24px; }
  h1{ font-size:34px; margin:0 0 8px; }
  h2{ font-size:24px; border-bottom:2px solid var(--honey); padding-bottom:6px; margin-top:40px; }
  h3.cat{ font-size:18px; color:var(--honeyd); margin-top:24px; }
  .sub{ color:var(--soft); font-size:16px; }
  .toc li{ margin:4px 0; }
  .entry{ padding:10px 0; border-bottom:1px solid #e7ddc9; page-break-inside:avoid; }
  .entry-head{ display:flex; justify-content:space-between; align-items:baseline; }
  .tag{ font-size:12px; text-transform:uppercase; letter-spacing:.04em; }
  .kurz{ color:var(--honeyd); font-size:14px; font-style:italic; }
  .text{ color:var(--soft); font-size:14px; margin-top:2px; }
  .problem{ page-break-inside:avoid; margin-bottom:22px; }
  .problem .label{ font-weight:bold; font-size:14px; margin:10px 0 2px; }
  .problem ul{ margin:0; padding-left:20px; }
  .problem li{ font-size:14px; color:var(--soft); margin:2px 0; }
  .vet{ border:2px solid var(--alert); background:#faece8; border-radius:14px; padding:12px 16px; margin-top:10px; }
  .vet strong{ color:var(--alert); }
  .vet li{ color:var(--ink); font-size:14px; }
  .page-break{ page-break-before:always; }
  .foot{ margin-top:48px; padding-top:16px; border-top:1px solid #e7ddc9; color:var(--soft); font-size:12px; text-align:center; }
  @media print{ .cover{ min-height:auto; padding:120px 0; } @page{ margin:18mm; } }
</style>
</head>
<body>
  <section class="cover">
    <img src="${siteUrl}/img/guide-cover.png" alt="" />
    <h1>Schnurrcode</h1>
    <p class="sub">${catName ? `Der Guide für dich und ${esc(catName)}` : "Dein Katzensprache-Guide"}</p>
  </section>

  <div class="wrap">
    <h2>Inhalt</h2>
    <ul class="toc">
      <li>1 · Schnurr-Lexikon — alle Signale</li>
      <li>2 · Problemlöser — mit Tierarzt-Warnhinweisen</li>
      ${includeBump ? "<li>3 · Notfall-Symptom-Spickzettel</li>" : ""}
    </ul>

    <div class="page-break"></div>
    <h2>Schnurr-Lexikon</h2>
    ${lexikon}

    <div class="page-break"></div>
    <h2>Problemlöser</h2>
    ${problemeHtml}

    ${bumpSection}

    <div class="foot">
      Schnurrcode ersetzt keinen Tierarzt. Bei Sorgen → Tierärztin/Tierarzt.<br/>
      © Schnurrcode — knack den Code deiner Katze · ${siteUrl}
    </div>
  </div>
  ${autoPrint ? "<script>window.onload=function(){setTimeout(function(){window.print()},400)}</script>" : ""}
</body>
</html>`;
}
