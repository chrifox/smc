import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUser, createUser } from "@/services/neon/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  let email;

  const cookieStore = cookies();
  const emailCookie = cookieStore.get("email");
  if (emailCookie) {
    email = emailCookie.value;

    const signout = url.searchParams.has("signout");
    if (signout) {
      cookieStore.delete("email");

      return NextResponse.json({ message: "USER SIGNED OUT" });
    }
  }

  if (!email) {
    email = url.searchParams.get("email");
  }

  if (email) {
    const data = await getUser(email);

    return NextResponse.json({ message: "GET USER", user: data });
  }

  return NextResponse.json({ message: "USER NOT FOUND" });
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  const req = await request.json();

  const data = await createUser(req.email, req.password, req.authenticate);

  if (data.user) {
    cookieStore.set("email", data.user.email);
  }

  return NextResponse.json(data);
}
