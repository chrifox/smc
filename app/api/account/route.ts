import { NextRequest, NextResponse } from "next/server";
import { getUserAccount } from "@/lib/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const data = await getUserAccount(parseInt(id));

    return NextResponse.json({ message: "USER FETCHED", data });
  }

  return NextResponse.json({ message: "USER NOT FOUND" });
}
