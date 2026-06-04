import { type NextRequest } from "next/server";
import { getSession, getCatName } from "@/lib/session";
import { buildGuideHtml } from "@/lib/guideHtml";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

/**
 * Liefert den Guide als druckfertiges HTML (Browser → „Als PDF speichern“).
 * Nur für eingeloggte Käufer. Order-Bump-Käufer erhalten zusätzlich den
 * Notfall-Spickzettel.
 *
 * Produktion: Dieses HTML ist zugleich die Vorlage für die serverseitige
 * wkhtmltopdf-Pipeline (siehe DEPLOY.md) — dann wird statt text/html ein
 * application/pdf zurückgegeben.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.paid) {
    return new Response("Nicht berechtigt.", { status: 401 });
  }

  const catName = await getCatName();
  const autoPrint = req.nextUrl.searchParams.get("print") === "1";

  const html = buildGuideHtml({
    catName,
    includeBump: Boolean(session.bump),
    siteUrl: SITE_URL,
    autoPrint,
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
