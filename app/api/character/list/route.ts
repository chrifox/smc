import { NextRequest, NextResponse } from "next/server";
import { getCharacters } from "@/services/neon/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("uid");

  if (userId) {
    const data = await getCharacters(parseInt(userId));

    return NextResponse.json({ message: "CHARACTERS LIST", data });
  }

  return NextResponse.json({ message: "MISSING ID" });
}
