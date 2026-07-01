import { NextResponse } from "next/server";

const COOKIE_NAME = "atlas_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const adminPassword = process.env.ATLAS_ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Server configuration error: no admin password set" },
      { status: 500 }
    );
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = Buffer.from(
    JSON.stringify({ authenticated: true, ts: Date.now() })
  ).toString("base64url");

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  return response;
}
