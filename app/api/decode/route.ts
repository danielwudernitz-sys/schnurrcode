import { NextResponse, type NextRequest } from "next/server";
import { signals } from "@/lib/catalog";

export const runtime = "nodejs";

const KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// einfacher In-Memory-Rate-Limit pro IP (Kostenschutz)
const RATE = new Map<string, { count: number; reset: number }>();
const LIMIT = 12; // Anfragen
const WINDOW = 60 * 60 * 1000; // pro Stunde

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE.get(ip);
  if (!entry || entry.reset < now) {
    RATE.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

const SYSTEM = `Du bist der freundliche Katzenversteher von Schnurrcode.
Deute Katzenverhalten NUR auf Basis gängiger, anerkannter Ethologie.
Antworte IMMER auf Deutsch, in der Du-Form, warm und kurz.
Stelle NIEMALS eine medizinische Diagnose. Wenn die Beschreibung Hinweise auf
Krankheit, Schmerz, plötzliche Verhaltensänderung, Fressunlust, Blut, Erbrechen
oder ähnliches enthält, rate IMMER zum Tierarzt (setze tierarztNoetig=true).
Antworte AUSSCHLIESSLICH mit JSON in genau diesem Schema (keine weiteren Worte):
{"emotion":"positiv|neutral|anspannung","deutung":"...","wasTunKannst":"...","tierarztNoetig":true|false}`;

type Result = {
  emotion: "positiv" | "neutral" | "anspannung";
  deutung: string;
  wasTunKannst: string;
  tierarztNoetig: boolean;
};

const VET_WORDS = [
  "blut",
  "erbrich",
  "erbricht",
  "kotz",
  "frisst nicht",
  "frisst kaum",
  "appetit",
  "humpel",
  "schmerz",
  "zittert",
  "apath",
  "schlapp",
  "durchfall",
  "abgemagert",
  "krampf",
];

/** Fallback ohne API-Key: einfache Heuristik aus signals.ts. */
function heuristic(beschreibung: string): Result {
  const t = beschreibung.toLowerCase();
  const tierarztNoetig = VET_WORDS.some((w) => t.includes(w));

  const matches = signals.filter((s) => {
    const words = s.label.toLowerCase().split(/[^a-zäöüß]+/).filter(Boolean);
    return words.some((w) => w.length > 3 && t.includes(w));
  });

  let emotion: Result["emotion"] = "neutral";
  if (matches.some((m) => m.emotion === "anspannung")) emotion = "anspannung";
  else if (matches.some((m) => m.emotion === "positiv")) emotion = "positiv";

  const deutung = matches.length
    ? `Das klingt nach: ${matches.map((m) => m.kurz.toLowerCase()).slice(0, 3).join(", ")}. ${matches[0].bedeutung}`
    : "Aus deiner Beschreibung lässt sich noch kein eindeutiges Signal lesen. Probier den geführten Übersetzer — dort wählst du gezielt Schwanz, Ohren, Augen & Co.";

  return {
    emotion,
    deutung,
    wasTunKannst:
      emotion === "anspannung"
        ? "Gib deiner Katze Ruhe und Abstand, beobachte die Situation und vermeide Stressauslöser."
        : "Beobachte den Kontext und spiegle freundliche Signale — z. B. langsames Zurückblinzeln.",
    tierarztNoetig,
  };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte später erneut versuchen." },
      { status: 429 }
    );
  }

  let body: { beschreibung?: string; catName?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  const beschreibung = (body.beschreibung ?? "").trim().slice(0, 500);
  if (beschreibung.length < 8) {
    return NextResponse.json({ error: "Zu kurz." }, { status: 400 });
  }

  // Kein API-Key → Fallback auf geführte Heuristik
  if (!KEY) {
    return NextResponse.json(heuristic(beschreibung));
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: body.catName
              ? `Meine Katze heißt ${body.catName}. ${beschreibung}`
              : beschreibung,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error("anthropic");
    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const raw = data.content?.find((c) => c.type === "text")?.text ?? "";
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as Result;
    // Sicherheitsnetz: bei Krankheitswörtern Flag erzwingen
    if (VET_WORDS.some((w) => beschreibung.toLowerCase().includes(w))) {
      parsed.tierarztNoetig = true;
    }
    return NextResponse.json(parsed);
  } catch {
    // Fallback auf Heuristik statt Fehler (Prompt 5b: Fallback)
    return NextResponse.json(heuristic(beschreibung));
  }
}
