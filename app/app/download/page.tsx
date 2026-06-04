import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "PDF-Download" };

export default async function DownloadPage() {
  const session = await getSession();
  const hasBump = Boolean(session?.bump);

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-honey-deep">
          PDF-Download
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Dein Guide zum Mitnehmen</h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          Das komplette Schnurr-Lexikon und der Problemlöser — gebündelt als
          hochwertiges PDF, persönlich auf deine Katze.
        </p>
      </header>

      <div className="grid items-center gap-8 rounded-brand bg-paper p-6 shadow-card sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="relative mx-auto h-56 w-40 overflow-hidden rounded-[14px] shadow-card">
          <Image
            src="/img/guide-cover.png"
            alt="Cover des Schnurrcode-Guides"
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-2xl">Schnurrcode — der Guide</h2>
          <ul className="mt-3 space-y-1.5 font-body text-sm text-ink-soft">
            <li>• Alle 40+ Signale aus dem Lexikon</li>
            <li>• Kompletter Problemlöser mit Tierarzt-Warnhinweisen</li>
            {hasBump && (
              <li className="font-600 text-honey-deep">
                • Plus: Notfall-Symptom-Spickzettel (dein Order-Bump)
              </li>
            )}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/api/generate-pdf?print=1" size="lg">
              Als PDF speichern
            </Button>
            <Button href="/api/generate-pdf" variant="secondary" size="lg">
              Im Browser ansehen
            </Button>
          </div>
          <p className="mt-3 font-body text-xs text-ink-soft">
            Tipp: Im Druckdialog „Als PDF speichern“ wählen. Die Datei ist nur
            für dich als eingeloggte Käuferin/eingeloggten Käufer abrufbar.
          </p>
        </div>
      </div>
    </div>
  );
}
