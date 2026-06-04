import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PurchaseTracker } from "@/components/PurchaseTracker";
import { PRICE_CENTS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Danke",
  robots: { index: false },
};

export default function DankePage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const paid = Boolean(searchParams.session_id);

  return (
    <div className="container-brand flex min-h-[60vh] items-center justify-center py-16">
      {paid && <PurchaseTracker value={PRICE_CENTS / 100} />}
      <div className="w-full max-w-lg rounded-brand bg-paper p-8 text-center shadow-card sm:p-10">
        <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full bg-cream-2">
          <Image
            src="/img/onboarding-welcome.png"
            alt=""
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl">
          {paid ? "Willkommen bei Schnurrcode! 🎉" : "Fast geschafft"}
        </h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          {paid
            ? "Deine Zahlung war erfolgreich. Wir haben dir einen Zugangslink per E-Mail geschickt — damit loggst du dich ein und richtest deine Katze ein."
            : "Sobald deine Zahlung bestätigt ist, schicken wir dir den Zugangslink per E-Mail."}
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <Button href="/login" size="lg">
            Zum Login
          </Button>
          <p className="font-body text-sm text-ink-soft">
            Keine E-Mail bekommen? Schau im Spam-Ordner oder fordere den Link im
            Login neu an.
          </p>
        </div>
      </div>
    </div>
  );
}
