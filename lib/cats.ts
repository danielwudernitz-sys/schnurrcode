// Storage-Layer für Katzen + Journal-Einträge.
// Produktion: Supabase REST (EU/Frankfurt). Lokal ohne Keys: In-Memory-Store
// (überlebt Requests innerhalb einer laufenden Server-Session — gut zum Testen,
// in Produktion irrelevant, da dort die DB greift).
//
// Alle Funktionen sind nach E-Mail (Besitzer) gescoped.

import { randomUUID } from "crypto";
import type { Cat, CatEvent, EventKategorie } from "@/data/journal";

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

function configured(): boolean {
  return Boolean(URL && KEY);
}

async function rest(
  path: string,
  init: RequestInit & { method: string }
): Promise<Response> {
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

// ── In-Memory-Fallback (Dev) ─────────────────────────────────
type Store = { cats: Cat[]; events: CatEvent[] };
const g = globalThis as unknown as { __catStore?: Store };
function mem(): Store {
  if (!g.__catStore) g.__catStore = { cats: [], events: [] };
  return g.__catStore;
}

const nowIso = () => new Date().toISOString();

// ── Katzen ───────────────────────────────────────────────────
export async function listCats(email: string): Promise<Cat[]> {
  if (configured()) {
    const res = await rest(
      `cats?email=eq.${encodeURIComponent(email)}&order=created_at.asc&select=*`,
      { method: "GET" }
    );
    if (!res.ok) return [];
    return (await res.json()) as Cat[];
  }
  return mem()
    .cats.filter((c) => c.email === email)
    .sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));
}

export async function getCat(email: string, id: string): Promise<Cat | null> {
  const cats = await listCats(email);
  return cats.find((c) => c.id === id) ?? null;
}

export async function createCat(
  email: string,
  data: { name: string; photo_url?: string | null; breed?: string | null; age?: string | null }
): Promise<Cat> {
  const cat: Cat = {
    id: randomUUID(),
    email,
    name: data.name.slice(0, 40),
    photo_url: data.photo_url ?? null,
    breed: data.breed?.slice(0, 60) ?? null,
    age: data.age?.slice(0, 30) ?? null,
    notes: null,
    created_at: nowIso(),
  };
  if (configured()) {
    await rest("cats", { method: "POST", body: JSON.stringify([cat]) });
  } else {
    mem().cats.push(cat);
  }
  return cat;
}

export async function updateCat(
  email: string,
  id: string,
  patch: Partial<Pick<Cat, "name" | "photo_url" | "breed" | "age" | "notes">>
): Promise<Cat | null> {
  if (configured()) {
    const res = await rest(
      `cats?id=eq.${encodeURIComponent(id)}&email=eq.${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(patch),
      }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as Cat[];
    return rows[0] ?? null;
  }
  const cat = mem().cats.find((c) => c.id === id && c.email === email);
  if (!cat) return null;
  Object.assign(cat, patch);
  return cat;
}

export async function deleteCat(email: string, id: string): Promise<void> {
  if (configured()) {
    await rest(
      `cats?id=eq.${encodeURIComponent(id)}&email=eq.${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );
    await rest(
      `cat_events?cat_id=eq.${encodeURIComponent(id)}&email=eq.${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );
    return;
  }
  const s = mem();
  s.cats = s.cats.filter((c) => !(c.id === id && c.email === email));
  s.events = s.events.filter((e) => e.cat_id !== id);
}

// ── Journal-Einträge ─────────────────────────────────────────
export async function listEvents(
  email: string,
  catId: string,
  month?: string // "YYYY-MM" optional
): Promise<CatEvent[]> {
  if (configured()) {
    let q = `cat_events?cat_id=eq.${encodeURIComponent(catId)}&email=eq.${encodeURIComponent(email)}&order=date.asc&select=*`;
    if (month) q += `&date=like.${month}%25`;
    const res = await rest(q, { method: "GET" });
    if (!res.ok) return [];
    return (await res.json()) as CatEvent[];
  }
  return mem()
    .events.filter(
      (e) =>
        e.cat_id === catId &&
        e.email === email &&
        (!month || e.date.startsWith(month))
    )
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function createEvent(
  email: string,
  catId: string,
  data: { date: string; note: string; category: EventKategorie }
): Promise<CatEvent> {
  const ev: CatEvent = {
    id: randomUUID(),
    cat_id: catId,
    email,
    date: data.date,
    note: data.note.slice(0, 280),
    category: data.category,
    created_at: nowIso(),
  };
  if (configured()) {
    await rest("cat_events", { method: "POST", body: JSON.stringify([ev]) });
  } else {
    mem().events.push(ev);
  }
  return ev;
}

export async function deleteEvent(
  email: string,
  catId: string,
  eventId: string
): Promise<void> {
  if (configured()) {
    await rest(
      `cat_events?id=eq.${encodeURIComponent(eventId)}&cat_id=eq.${encodeURIComponent(catId)}&email=eq.${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );
    return;
  }
  const s = mem();
  s.events = s.events.filter(
    (e) => !(e.id === eventId && e.cat_id === catId && e.email === email)
  );
}
