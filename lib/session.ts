// Server-Helper zum Lesen der Session in Server Components / Route Handlers.
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, type SessionPayload } from "./auth";

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

/** Katzenname für die Personalisierung — Cookie (Dev) bevorzugt, sonst DB. */
export async function getCatName(): Promise<string | null> {
  const cookieName = cookies().get("sc_cat")?.value;
  if (cookieName && cookieName.trim()) return cookieName.trim();
  return null;
}

export function isOnboarded(): boolean {
  return cookies().get("sc_onboarded")?.value === "1";
}

/** ID der aktuell aktiven Katze (Cookie), falls gesetzt. */
export function getActiveCatId(): string | null {
  return cookies().get("sc_active_cat")?.value || null;
}
