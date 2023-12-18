import { NextRequest, NextResponse } from "next/server";
import { getUser, createUser } from "@/lib/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (email) {
    const data = await getUser(email);

    return NextResponse.json(data);
  }

  return NextResponse.json({ message: "USER NOT FOUND" });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const data = await createUser(req.email, req.password);

  return NextResponse.json(data);
}
