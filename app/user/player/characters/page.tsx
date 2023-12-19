"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Character } from "@/services/neon/types";

const CharacterDetail = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="bg-blue-900 px-4 py-2">
    {label}: {value}
  </div>
);

const Characters = () => {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (user?.id) {
      (async function () {
        await fetch(`/api/character?id=${user.id}`)
          .then((res) => res.json())
          .then((json) => setCharacters(json.data));
      })();
    }
  }, [user]);

  return (
    <div>
      {characters.map((character: Character) => (
        <div key={character.id}>
          <div className="p-4 bg-gray-900">{character.name}</div>
          <div className="flex flex-col bg-blue-700">
            <CharacterDetail label="Race" value={character.race} />
            <CharacterDetail label="Class" value={character.class} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
