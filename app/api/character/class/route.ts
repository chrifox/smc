import { getClass } from "@/services/neon/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const classname = url.searchParams.get("class");

  if (classname) {
    const data = await getClass(classname);

    return NextResponse.json({ message: "CLASS INFO", data });
  }

  return NextResponse.json({ message: "MISSING CLASSNAME" });
}
