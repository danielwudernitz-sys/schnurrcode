import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // geschützte/transaktionale Bereiche nicht indexieren
      disallow: ["/app", "/api", "/checkout", "/danke", "/login"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
