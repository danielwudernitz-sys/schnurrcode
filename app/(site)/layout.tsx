import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Layout für öffentliche Seiten (Marketing, Rechtliches, Checkout, Login). */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
