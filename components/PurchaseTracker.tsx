"use client";

import * as React from "react";
import { track } from "@/lib/track";

/** Feuert das Purchase-Event genau einmal auf der Danke-Seite. */
export function PurchaseTracker({ value }: { value: number }) {
  React.useEffect(() => {
    track("Purchase", { value, currency: "EUR" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default PurchaseTracker;
