"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Character } from "@/services/neon/types";
import CharacterList from "@/app/components/custom/CharacterList";
import { useRouter } from "next/navigation";

const Characters = () => {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();

  function handleViewCharacter(characterId: number) {
    router.push(`/user/player/character/view?cid=${characterId}`);
  }

  async function handleDeleteCharacter(characterId: number) {
    const confirmation = confirm(
      "There is no way to recover a deleted character, are you sure?"
    );

    if (confirmation) {
      await fetch(`/api/character?cid=${characterId}`, {
        method: "DELETE",
      });

      await getUserCharacters();
    }
  }

  async function getUserCharacters() {
    await fetch(`/api/character?uid=${user.id}`)
      .then((res) => res.json())
      .then((json) => setCharacters(json.data));
  }

  useEffect(() => {
    if (user?.id) {
      (async function () {
        await getUserCharacters();
      })();
    }
  }, [user.id]);

  return (
    <div>
      <h1 className="mb-4">Character List</h1>

      <CharacterList
        characters={characters}
        handleViewCharacter={handleViewCharacter}
        handleDeleteCharacter={handleDeleteCharacter}
      />
    </div>
  );
};

export default Characters;
