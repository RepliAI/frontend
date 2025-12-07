import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { message: "Token ou mot de passe manquant." },
      { status: 400 }
    );
  }

  const backend = process.env.BACKEND_URL;

  const res = await fetch(`${backend}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();
  console.log("🚀 ~ POST ~ data:", data)

  return NextResponse.json(data, { status: res.status });
}