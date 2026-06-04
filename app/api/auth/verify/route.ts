import { NextResponse, type NextRequest } from "next/server";
import {
  verifySession,
  signSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

// Magic-Link-Einlösung: kurzlebigen Token prüfen → lange Session setzen.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const payload = await verifySession(token);

  if (!payload || !payload.paid) {
    return NextResponse.redirect(`${SITE_URL}/login?fehler=link`);
  }

  // langlebige Session ausstellen
  const session = await signSession({
    email: payload.email,
    paid: true,
    bump: payload.bump,
  });

  const res = NextResponse.redirect(`${SITE_URL}/app`);
  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
