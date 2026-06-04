// Datenschicht — Supabase (EU/Frankfurt) über die REST-API (kein SDK nötig).
// Alle Funktionen sind env-guarded: ohne Supabase-Konfiguration werden sie
// zu No-Ops (Dev), damit die App immer baut und lokal läuft.
//
// Erwartete Tabellen (SQL in DEPLOY.md):
//   leads(email, consent, country, created_at)
//   orders(email, country, product, bump, stripe_session, created_at)
//   profiles(email primary key, cat_name, photo_url, onboarded, updated_at)
//   favorites(email, ids jsonb, ueberschrift, created_at)

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

export function dbConfigured(): boolean {
  return Boolean(URL && KEY);
}

async function rest(
  path: string,
  init: RequestInit & { method: string }
): Promise<Response | null> {
  if (!dbConfigured()) return null;
  return fetch(`${URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY as string,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function saveLead(
  email: string,
  consent: boolean,
  country?: string
): Promise<void> {
  await rest("leads", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify([{ email, consent, country }]),
  });
}

export type OrderInput = {
  email: string;
  country?: string;
  product: string;
  bump: boolean;
  stripeSession: string;
};

export async function saveOrder(o: OrderInput): Promise<void> {
  await rest("orders", {
    method: "POST",
    body: JSON.stringify([
      {
        email: o.email,
        country: o.country,
        product: o.product,
        bump: o.bump,
        stripe_session: o.stripeSession,
      },
    ]),
  });
}

export type Profile = {
  email: string;
  cat_name?: string | null;
  photo_url?: string | null;
  onboarded?: boolean;
};

export async function getProfile(email: string): Promise<Profile | null> {
  const res = await rest(
    `profiles?email=eq.${encodeURIComponent(email)}&select=*`,
    { method: "GET" }
  );
  if (!res || !res.ok) return null;
  const rows = (await res.json()) as Profile[];
  return rows[0] ?? null;
}

export async function upsertProfile(p: Profile): Promise<void> {
  await rest("profiles", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify([{ ...p, updated_at: new Date().toISOString() }]),
  });
}

export async function saveFavorite(
  email: string,
  ids: string[],
  ueberschrift: string
): Promise<void> {
  await rest("favorites", {
    method: "POST",
    body: JSON.stringify([{ email, ids, ueberschrift }]),
  });
}

/** Hat die E-Mail einen Kauf? (für Magic-Link-Login) */
export async function hasOrder(email: string): Promise<boolean> {
  const res = await rest(
    `orders?email=eq.${encodeURIComponent(email)}&select=email&limit=1`,
    { method: "GET" }
  );
  if (!res || !res.ok) return false;
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}
