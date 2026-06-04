import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET() {
  const res = NextResponse.redirect(`${SITE_URL}/`);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
