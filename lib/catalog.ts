// Adapter zwischen den (reichhaltigen) Datendateien und den App-Komponenten.
// Die data/*.ts sind die Quelle der Wahrheit; hier normalisieren wir Namen,
// hängen Kategorie-Illustrationen an und definieren die Decoder-Presets.

import {
  SIGNALE,
  KATEGORIEN,
  KOMBINATIONEN,
  type Signal,
  type Kategorie,
  type Emotion,
  type KombiRegel,
  type KategorieInfo,
} from "@/data/signals";

export type { Signal, Kategorie, Emotion, KombiRegel, KategorieInfo };

// Kategorie-Illustrationen (Assets in /public/img)
const ICONS: Record<Kategorie, string> = {
  schwanz: "/img/cat-schwanz.png",
  ohren: "/img/cat-ohren.png",
  augen: "/img/cat-augen.png",
  koerper: "/img/cat-koerper.png",
  laute: "/img/cat-laute.png",
  kontext: "/img/cat-kontext.png",
};

export type KategorieMeta = KategorieInfo & { icon: string };

export const kategorien: KategorieMeta[] = KATEGORIEN.map((k) => ({
  ...k,
  icon: ICONS[k.id],
}));

export const signals: Signal[] = SIGNALE;
export const kombiRegeln: KombiRegel[] = KOMBINATIONEN;

export const signalById = (id: string): Signal | undefined =>
  SIGNALE.find((s) => s.id === id);

export const signalsByKategorie = (k: Kategorie): Signal[] =>
  SIGNALE.filter((s) => s.kategorie === k);

// Presets („Typische Situationen“) — aus den neuen Signal-IDs zusammengestellt.
export type Preset = { id: string; label: string; signalIds: string[] };

export const presets: Preset[] = [
  { id: "preset-tuer", label: "Begrüßung an der Tür", signalIds: ["schwanz-aufrecht", "kontext-tuer"] },
  { id: "preset-katzenkuss", label: "Katzenkuss", signalIds: ["augen-blinzeln", "laute-schnurren"] },
  { id: "preset-napf", label: "Maunzt am Napf", signalIds: ["laute-miauen", "kontext-napf"] },
  { id: "preset-fenster", label: "Schnattert am Fenster", signalIds: ["laute-schnattern", "kontext-fenster"] },
  { id: "preset-spiel", label: "Spielmodus", signalIds: ["augen-pupillen-weit", "koerper-anschleichen", "kontext-spiel"] },
  { id: "preset-streichelbiss", label: "Gereizt beim Streicheln", signalIds: ["kontext-streicheln", "ohren-leicht-zurueck", "schwanz-peitschen"] },
  { id: "preset-bauch", label: "Zeigt den Bauch", signalIds: ["koerper-bauch", "augen-blinzeln"] },
  { id: "preset-laerm", label: "Angst bei Lärm", signalIds: ["kontext-laerm", "schwanz-tief", "augen-pupillen-weit"] },
];
