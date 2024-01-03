"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import { Character } from "@/services/neon/types";
import { get5eClassColour, getCustomClassColour } from "@/app/utils/character";
import { CHARACTER, USER } from "@/app/constants/routes";
import Table from "../element/Table";

type CharacterListProps = {
  characters: Character[];
  handleDeleteCharacter: (characterId: number, userId: number) => void;
};

function getCellClasses(row: any, key: string) {
  if (key === "class") {
    return `bg-[${
      row.type === "5e"
        ? get5eClassColour(row.class)
        : getCustomClassColour(row.class)
    }]`;
  }
  return "";
}

const CharacterList = ({
  characters,
  handleDeleteCharacter,
}: CharacterListProps) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const characterTableData = characters.map((character: Character) => ({
    id: character.id,
    name: character.name,
    race: character.race,
    class: character.class,
    type: character.type,
  }));

  function handleViewCharacter(characterId: number) {
    router.push(`${USER}/${user.id}${CHARACTER}/${characterId}`);
  }

  return (
    <div>
      <Table
        allowDelete
        handleDelete={(rowId: number) => handleDeleteCharacter(rowId, user.id)}
        rows={characterTableData}
        rowAction={handleViewCharacter}
        getCellClasses={getCellClasses}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "race", label: "Race" },
          { key: "class", label: "Class" },
          { key: "type", label: "Type" },
        ]}
      />
    </div>
  );
};

export default CharacterList;
