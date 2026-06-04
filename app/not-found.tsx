import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16 text-center">
      <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-brand">
        <Image src="/img/empty-404.png" alt="" fill sizes="176px" className="object-cover" priority />
      </div>
      <h1 className="font-display text-4xl">Hier ist nur eine Katze mit Wollknäuel.</h1>
      <p className="mt-3 max-w-md font-body text-lg text-ink-soft">
        Diese Seite konnten wir nicht finden. Vielleicht hat sie sich versteckt.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">Zur Startseite</Button>
        <Button href="/uebersetzer-gratis" variant="secondary" size="lg">
          Gratis-Test machen
        </Button>
      </div>
    </div>
  );
}
