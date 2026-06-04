// Decoder-Engine — datengetrieben, keine hartcodierte UI-Logik.
// Nimmt ausgewählte Signal-IDs, liefert eine zusammengesetzte Deutung.

import {
  type Emotion,
  type Signal,
  type KombiRegel,
  signals,
  kombiRegeln,
  signalById,
} from "@/lib/catalog";

export type DecodeResult = {
  /** Haupt-Emotion (farbcodiert in der UI) */
  emotion: Emotion;
  emotionLabel: string;
  /** Kurze Gesamt-Aussage */
  ueberschrift: string;
  /** Was die Katze fühlt/will */
  zusammenfassung: string;
  /** Konkrete Handlungsempfehlung */
  wasTun: string;
  /** Erkannte Kombinationen */
  kombis: KombiRegel[];
  /** Die einzelnen ausgewählten Signale (für die Detailliste) */
  signale: Signal[];
  /** Rotes Tierarzt-Warnfeld einblenden? */
  tierarztFlag: boolean;
};

const emotionRank: Record<Emotion, number> = {
  anspannung: 3,
  neutral: 2,
  positiv: 1,
};

const emotionLabels: Record<Emotion, string> = {
  positiv: "Positiv & entspannt",
  neutral: "Neutral & aufmerksam",
  anspannung: "Anspannung",
};

const wasTunDefault: Record<Emotion, string> = {
  positiv:
    "Alles im grünen Bereich — genieße die Nähe und spiegle ihre Signale (z. B. langsames Zurückblinzeln).",
  neutral:
    "Beobachte den Kontext und gib deiner Katze Raum, sich auszudrücken. Achte auf weitere Signale.",
  anspannung:
    "Gib deiner Katze jetzt Ruhe und Abstand. Beende Streicheleinheiten, lass ihr einen Rückzugsort und beobachte.",
};

/**
 * Bestimmt die dominante Emotion: höchster Rang gewinnt, Kombi-Regeln
 * (falls vorhanden) haben Vorrang für die Überschrift.
 */
export function decode(selectedIds: string[]): DecodeResult | null {
  const signale = selectedIds
    .map((id) => signalById(id))
    .filter((s): s is Signal => Boolean(s));

  if (signale.length === 0) return null;

  // passende Kombinationen: alle wenn-IDs müssen ausgewählt sein
  const idSet = new Set(selectedIds);
  const kombis = kombiRegeln.filter((r) => r.wenn.every((w) => idSet.has(w)));

  // dominante Emotion bestimmen (Kombis zählen mit)
  let emotion: Emotion = "positiv";
  let rank = 0;
  for (const s of signale) {
    if (emotionRank[s.emotion] > rank) {
      rank = emotionRank[s.emotion];
      emotion = s.emotion;
    }
  }
  for (const k of kombis) {
    if (emotionRank[k.emotion] > rank) {
      rank = emotionRank[k.emotion];
      emotion = k.emotion;
    }
  }

  const tierarztFlag =
    signale.some((s) => s.tierarztFlag) || kombis.some((k) => k.tierarztFlag);

  // Überschrift + Zusammenfassung
  let ueberschrift: string;
  let zusammenfassung: string;
  let wasTun: string;

  // konkrete Handlungstipps der ausgewählten Signale sammeln (neu: wasTun je Signal)
  const signalTipps = Array.from(
    new Set(signale.map((s) => s.wasTun).filter((w): w is string => Boolean(w)))
  );

  if (kombis.length > 0) {
    ueberschrift = kombis.map((k) => k.deutung.split(/[–.–]/)[0].trim()).join(" · ");
    zusammenfassung = kombis.map((k) => k.deutung).join(" ");
    wasTun = kombis.map((k) => k.wasTun).join(" ");
  } else if (signale.length === 1) {
    ueberschrift = signale[0].kurz.replace(/\.$/, "");
    zusammenfassung = signale[0].bedeutung;
    wasTun = signale[0].wasTun ?? wasTunDefault[emotion];
  } else {
    ueberschrift = emotionLabels[emotion];
    zusammenfassung =
      "Diese Signale zusammen deuten auf: " +
      signale.map((s) => s.kurz.replace(/\.$/, "").toLowerCase()).join(", ") +
      ".";
    wasTun = signalTipps.length > 0 ? signalTipps.join(" ") : wasTunDefault[emotion];
  }

  return {
    emotion,
    emotionLabel: emotionLabels[emotion],
    ueberschrift,
    zusammenfassung,
    wasTun,
    kombis,
    signale,
    tierarztFlag,
  };
}

/** Hilfsfunktion: Emotion → Badge-Ton (Badge nutzt dieselben Keys). */
export function emotionTone(e: Emotion): Emotion {
  return e;
}

export { signals };
