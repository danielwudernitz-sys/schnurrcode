// Auth/Session — Edge- UND Node-kompatibel über Web Crypto (crypto.subtle).
// Wird in middleware.ts (Edge) und in API-Routen (Node) genutzt.
// Signiertes, ablaufendes Token; httpOnly-Cookie. Kein Passwort (Magic-Link).

export const SESSION_COOKIE = "sc_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 180; // 180 Tage

export type SessionPayload = {
  email: string;
  /** Hat einen gültigen Kauf (Vollzugang) */
  paid: boolean;
  /** Order-Bump (Notfall-Spickzettel) gekauft */
  bump?: boolean;
  /** Ablauf (Unix-Sekunden) */
  exp: number;
};

function getSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    // Dev-Fallback — in Produktion MUSS AUTH_SECRET gesetzt sein.
    "schnurrcode-dev-secret-bitte-in-env-setzen"
  );
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmac(data: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return new Uint8Array(sig);
}

/** Signiert eine Session und gibt den Token-String zurück. */
export async function signSession(
  payload: Omit<SessionPayload, "exp"> & { exp?: number }
): Promise<string> {
  const exp =
    payload.exp ?? Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const body = { ...payload, exp };
  const json = JSON.stringify(body);
  const payloadB64 = b64urlEncode(new TextEncoder().encode(json));
  const sig = await hmac(payloadB64);
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

/** Verifiziert einen Token; null bei ungültig/abgelaufen. */
export async function verifySession(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, sigB64] = token.split(".");
  try {
    const expected = await hmac(payloadB64);
    const got = b64urlDecode(sigB64);
    if (expected.length !== got.length) return null;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ got[i];
    if (diff !== 0) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(b64urlDecode(payloadB64))
    ) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
