"use client";

import * as React from "react";
import { track } from "@/lib/track";

/**
 * Feuert die angegebenen Funnel-Events einmal beim Laden der Seite
 * (z. B. ViewContent auf der Landingpage, AddToCart im Checkout).
 */
export function TrackOnMount({ events }: { events: string[] }) {
  React.useEffect(() => {
    events.forEach((e) => track(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default TrackOnMount;
