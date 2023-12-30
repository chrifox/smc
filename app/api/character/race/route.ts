import { getRace } from "@/services/neon/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const race = url.searchParams.get("race");

  if (race) {
    const data = await getRace(race);

    return NextResponse.json({ message: "RACE INFO", data });
  }

  return NextResponse.json({ message: "MISSING RACE" });
}
