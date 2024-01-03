"use client";

import { useEffect, useState } from "react";
import { PageProps } from "@/app/types";
import { Character } from "@/services/neon/types";
import CharacterSheet from "@/app/components/custom/CharacterSheet/CharacterSheet";
import { constructCharacterDetails } from "./utils";

const ViewCharacter = ({ params }: PageProps) => {
  const cid = params.cid;
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    (async function () {
      const characterDetails = await constructCharacterDetails(cid);

      setCharacter(characterDetails);
    })();
  }, []);

  return (
    character && (
      <div>
        <h1>Character Sheet - {character.name}</h1>

        <CharacterSheet character={character} />
      </div>
    )
  );
};

export default ViewCharacter;
