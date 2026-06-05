import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Mulish } from "next/font/google";
import "./globals.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://schnurrcode.com";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Schnurrcode — Knack den Code deiner Katze",
    template: "%s · Schnurrcode",
  },
  description:
    "Verstehen, was deine Katze dir sagt — und lernen, wie du zurücksprichst. Interaktiver Übersetzer, Problemlöser mit Tierarzt-Warnsystem, Nachschlagewerk.",
  keywords: [
    "Katzensprache",
    "Katze verstehen",
    "Katzenverhalten",
    "Slow Blink",
    "Katze Körpersprache",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Schnurrcode — Knack den Code deiner Katze",
    description:
      "Verstehen, was deine Katze dir sagt — und wie du zurücksprichst.",
    type: "website",
    locale: "de_AT",
    siteName: "Schnurrcode",
    images: ["/img/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schnurrcode — Knack den Code deiner Katze",
    description: "Verstehen, was deine Katze dir sagt — und wie du zurücksprichst.",
    images: ["/img/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${mulish.variable}`}
    >
      <body className="min-h-screen bg-cream font-body text-ink">
        {children}
        <ConsentBanner />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
