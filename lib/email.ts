// E-Mail über Brevo (EU). Env-guarded: ohne BREVO_API_KEY werden Mails
// in der Konsole geloggt (Dev), damit Magic-Links lokal testbar bleiben.

const API = "https://api.brevo.com/v3/smtp/email";
const KEY = process.env.BREVO_API_KEY;
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || "hallo@schnurrcode.com";
const FROM_NAME = "Schnurrcode";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export function emailConfigured(): boolean {
  return Boolean(KEY);
}

export async function sendEmail({ to, subject, html }: SendArgs): Promise<void> {
  if (!KEY) {
    // Dev-Fallback: nicht versenden, sondern loggen.
    console.log(
      `\n[email:dev] An: ${to}\n[email:dev] Betreff: ${subject}\n[email:dev] ${html.replace(/<[^>]+>/g, " ").slice(0, 400)}\n`
    );
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "api-key": KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
}

/** Einheitliches Mail-Layout mit Branding-Header. */
export function emailLayout(inner: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://schnurrcode.com";
  return `
  <div style="background:#F6EEE1;padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#2A2420">
    <div style="max-width:520px;margin:0 auto;background:#FBF7EF;border-radius:22px;overflow:hidden">
      <img src="${site}/img/email-header.png" alt="Schnurrcode" style="width:100%;display:block" />
      <div style="padding:28px 28px 32px">
        ${inner}
        <p style="margin-top:28px;font-size:12px;color:#5A4F46">
          Schnurrcode ersetzt keinen Tierarzt. Bei Sorgen → Tierärztin/Tierarzt.
        </p>
      </div>
    </div>
  </div>`;
}

export async function sendMagicLink(to: string, link: string): Promise<void> {
  await sendEmail({
    to,
    subject: "Dein Zugang zu Schnurrcode 🐾",
    html: emailLayout(`
      <h1 style="font-size:22px;margin:0 0 12px">Dein Zugangslink ist da</h1>
      <p style="font-size:15px;line-height:1.6;color:#5A4F46">
        Klick auf den Button, um dich einzuloggen. Der Link ist 30 Minuten gültig.
      </p>
      <p style="margin:24px 0">
        <a href="${link}" style="background:#E9A23B;color:#2A2420;text-decoration:none;font-weight:bold;padding:14px 26px;border-radius:999px;display:inline-block">
          Jetzt einloggen
        </a>
      </p>
      <p style="font-size:13px;color:#5A4F46;word-break:break-all">${link}</p>
    `),
  });
}

export async function sendLeadWelcome(to: string, confirmLink: string): Promise<void> {
  await sendEmail({
    to,
    subject: "Fast geschafft — bestätige deine E-Mail 🐱",
    html: emailLayout(`
      <h1 style="font-size:22px;margin:0 0 12px">Willkommen bei Schnurrcode</h1>
      <p style="font-size:15px;line-height:1.6;color:#5A4F46">
        Bestätige kurz deine E-Mail (Double-Opt-in), dann schalten wir dir den
        Gratis-Einstieg frei.
      </p>
      <p style="margin:24px 0">
        <a href="${confirmLink}" style="background:#E9A23B;color:#2A2420;text-decoration:none;font-weight:bold;padding:14px 26px;border-radius:999px;display:inline-block">
          E-Mail bestätigen
        </a>
      </p>
    `),
  });
}
