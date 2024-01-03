import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
} from "@/services/neon/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const characterId = url.searchParams.get("cid");

  if (characterId) {
    const data = await getCharacter(parseInt(characterId));

    const scores = data.scores.split(",");
    data.scores = scores.reduce(
      (dataScores: { [key: string]: number }, score: string) => {
        const [key, value] = score.split(":");
        return { ...dataScores, [key.toLowerCase()]: value };
      },
      {}
    );

    return NextResponse.json({ message: "CHARACTER", data });
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
  const characterId = url.searchParams.get("cid");

  if (characterId) {
    const data = await deleteCharacter(parseInt(characterId));

    return NextResponse.json({ message: "CHARACTER DELETED" });
  }

  return NextResponse.json({ message: "MISSING ID" });
}
