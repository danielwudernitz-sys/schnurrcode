import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { fehler?: string };
}) {
  return (
    <div className="container-brand flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-brand bg-paper p-8 shadow-card">
        <h1 className="font-display text-3xl">Einloggen</h1>
        <p className="mt-2 font-body text-ink-soft">
          Kein Passwort nötig — du bekommst einen Login-Link per E-Mail.
        </p>

        {searchParams.fehler === "link" && (
          <p className="mt-4 rounded-brand bg-alert/10 px-4 py-3 font-body text-sm text-alert">
            Dieser Link ist ungültig oder abgelaufen. Fordere einfach einen
            neuen an.
          </p>
        )}

        <div className="mt-6">
          <LoginForm />
        </div>

        <p className="mt-6 font-body text-sm text-ink-soft">
          Noch keinen Zugang?{" "}
          <a href="/checkout" className="text-honey-deep underline">
            Hier freischalten
          </a>
        </p>
      </div>
    </div>
  );
}
