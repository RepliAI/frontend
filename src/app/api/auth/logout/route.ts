import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/authentication", request.url));

  res.cookies.set("access_token", "", { expires: new Date(0) });
  res.cookies.set("refresh_token", "", { expires: new Date(0) });

  return res;
}