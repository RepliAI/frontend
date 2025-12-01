import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${backend}/gmail/connect`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}