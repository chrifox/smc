import { createCharacter, deleteCharacter, getCharacters } from "@/services/neon/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  if (userId) {
    const data = await getCharacters(parseInt(userId));

    return NextResponse.json({ message: "CHARACTERS LIST", data });
  }

  return NextResponse.json({ message: "MISSING ID" });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const data = await createCharacter(req.character, req.userId);

  return NextResponse.json({ message: "CHARACTER SAVED" });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const characterId = url.searchParams.get("id");

  if (characterId) {
    const data = await deleteCharacter(parseInt(characterId))

    return NextResponse.json({ message: "CHARACTER DELETED" })
  }

  return NextResponse.json({ message: "MISSING ID" });
}
