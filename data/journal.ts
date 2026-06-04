// Datenmodell & Konstanten für das Mehr-Katzen-System + Journal.
// Pure (keine Server-Imports) — von Client- UND Server-Code nutzbar.

export type Cat = {
  id: string;
  email: string;
  name: string;
  photo_url?: string | null;
  breed?: string | null;
  age?: string | null;
  /** Freie Notizen zur Katze */
  notes?: string | null;
  created_at?: string;
};

export type EventKategorie =
  | "fuetterung"
  | "tierarzt"
  | "klo"
  | "verhalten"
  | "sonstiges";

export type CatEvent = {
  id: string;
  cat_id: string;
  email: string;
  /** ISO-Datum YYYY-MM-DD */
  date: string;
  note: string;
  category: EventKategorie;
  created_at?: string;
};

export const KATEGORIEN: {
  id: EventKategorie;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: "fuetterung", label: "Fütterung", emoji: "🍽️", color: "#5E8C61" },
  { id: "tierarzt", label: "Tierarzt", emoji: "🩺", color: "#C4553B" },
  { id: "klo", label: "Klo", emoji: "🧺", color: "#C97E1F" },
  { id: "verhalten", label: "Verhalten", emoji: "🐾", color: "#E9A23B" },
  { id: "sonstiges", label: "Sonstiges", emoji: "📝", color: "#5A4F46" },
];

export const kategorieInfo = (id: EventKategorie) =>
  KATEGORIEN.find((k) => k.id === id) ?? KATEGORIEN[KATEGORIEN.length - 1];
