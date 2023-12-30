"use client";

import { useEffect, useState } from "react";
import { PageProps } from "@/app/types";
import { Character } from "@/services/neon/types";
import CharacterSheet from "@/app/components/custom/CharacterSheet/CharacterSheet";
import { useSearchParams } from "next/navigation";

const ViewCharacter = ({}: PageProps) => {
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const [character, setCharacter] = useState<Character>();

  async function constructCharacterDetails() {
    let details;

    const character = await fetch(`/api/character?cid=${cid}`)
      .then((res) => res.json())
      .then((json) => json.data);

    if (character) {
      details = character;
    }

    if (character.race) {
      details.raceDetails = await fetch(
        `/api/character/race?race=${character.race}`
      )
        .then((res) => res.json())
        .then((json) => json.data);
    } else {
      console.log("no race", character);
    }

    if (character.class) {
      details.classDetails = await fetch(
        `/api/character/class?class=${character.class}`
      )
        .then((res) => res.json())
        .then((json) => json.data);
    } else {
      console.log("no class", character);
    }

    // TEMPORARY while data is inconsistent...
    if (!details.scores) {
      details.scores = {
        str: 18,
        dex: 16,
        con: 14,
        int: 12,
        wis: 10,
        cha: 8,
      };
    }

    setCharacter(details);
  }

  useEffect(() => {
    (async function () {
      await constructCharacterDetails();
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
