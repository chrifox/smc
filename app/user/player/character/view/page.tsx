"use client";

import { useEffect, useState } from "react";
import { PageProps } from "@/app/types";
import { Character } from "@/services/neon/types";
import CharacterSheet from "@/app/components/custom/CharacterSheet/CharacterSheet";

const ViewCharacter = ({ searchParams }: PageProps) => {
  const { cid } = searchParams;
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    (async function () {
      await fetch(`/api/character?cid=${cid}`)
        .then((res) => res.json())
        .then((json) => setCharacter(json.data));
    })();
  }, []);

  return character ? (
    <div>
      <h1 className="mb-4">Character Sheet - {character.name}</h1>

      <CharacterSheet character={character} />
    </div>
  ) : null;
};

export default ViewCharacter;
