import * as React from "react";
import { AppNav } from "@/components/app/AppNav";
import { CatSwitcher } from "@/components/app/cats/CatSwitcher";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { getCatName, getSession, getActiveCatId } from "@/lib/session";
import { listCats } from "@/lib/cats";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const cats = session ? await listCats(session.email) : [];
  const activeCatId = getActiveCatId();
  const catName = await getCatName();

  return (
    <div className="min-h-screen bg-cream">
      <AppNav catName={catName} />
      <CatSwitcher initialCats={cats} activeCatId={activeCatId} />
      <div className="container-brand py-8 sm:py-12">{children}</div>
      <div className="container-brand pb-12">
        <DisclaimerNote variant="card" />
      </div>
    </div>
  );
}
