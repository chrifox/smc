"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Character } from "@/services/neon/types";
import CharacterList from "@/app/components/custom/CharacterList";

const Characters = () => {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState<Character[]>([]);

  async function handleDeleteCharacter(characterId: number) {
    confirm("There is no way to recover a deleted character, are you sure?");

    await fetch(`/api/character?id=${characterId}`, {
      method: "DELETE",
    });

    await getUserCharacters();
  }

  async function getUserCharacters() {
    await fetch(`/api/character?id=${user.id}`)
      .then((res) => res.json())
      .then((json) => setCharacters(json.data));
  }

  useEffect(() => {
    if (user?.id) {
      (async function () {
        await getUserCharacters();
      })();
    }
  }, [user]);

  return (
    <div>
      <h1 className="mb-4">Characters</h1>

      <CharacterList
        characters={characters}
        handleDeleteCharacter={handleDeleteCharacter}
      />
    </div>
  );
};

export default Characters;
