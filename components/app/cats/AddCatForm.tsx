"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import type { Cat } from "@/data/journal";

/** Verkleinert ein Bild clientseitig auf max. 256px (kleine Daten-URL). */
async function downscale(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const max = 256;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function AddCatForm({
  onCreated,
  onCancel,
}: {
  onCreated: (cat: Cat) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState<string | null>(null);
  const [breed, setBreed] = React.useState("");
  const [age, setAge] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setPhoto(await downscale(file));
    } catch {
      /* ignore */
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Bitte gib einen Namen ein.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/cats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, photo_url: photo, breed, age }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Das hat nicht geklappt.");
      } else {
        onCreated(data.cat as Cat);
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuch es erneut.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="cat-name" className="font-body text-sm font-700 text-ink">
          Wie heißt deine Katze? *
        </label>
        <input
          id="cat-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="z. B. Minka"
          autoFocus
          className="mt-1.5 w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-honey"
        />
      </div>

      <div>
        <span className="font-body text-sm font-700 text-ink">Foto (optional)</span>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-cream-2 text-2xl">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              "🐱"
            )}
          </div>
          <label className="cursor-pointer rounded-full bg-cream-2 px-4 py-3 font-body text-sm font-600 text-ink">
            Foto wählen
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="cat-breed" className="font-body text-sm font-700 text-ink">
            Rasse (optional)
          </label>
          <input
            id="cat-breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            maxLength={60}
            placeholder="z. B. Hauskatze"
            className="mt-1.5 w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-honey"
          />
        </div>
        <div>
          <label htmlFor="cat-age" className="font-body text-sm font-700 text-ink">
            Alter (optional)
          </label>
          <input
            id="cat-age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            maxLength={30}
            placeholder="z. B. 3 Jahre"
            className="mt-1.5 w-full rounded-[16px] border-2 border-ink/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-honey"
          />
        </div>
      </div>

      {error && <p className="font-body text-sm text-alert">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Speichere …" : "Katze speichern"}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-body text-sm text-ink-soft underline-offset-2 hover:underline"
          >
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
}

export default AddCatForm;
