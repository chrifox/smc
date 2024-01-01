"use client";

import { Character } from "@/services/neon/types";
import { get5eClassColour, getCustomClassColour } from "@/app/utils/character";
import Table from "../element/Table";

type CharacterListProps = {
  characters: Character[];
  handleDeleteCharacter: (characterId: number) => void;
  handleViewCharacter: (characterId: number) => void;
};

function getRowClasses(row: any) {
  return "bg-gray-900";
}

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
  handleViewCharacter,
}: CharacterListProps) => {
  const characterTableData = characters.map((character: Character) => ({
    id: character.id,
    name: character.name,
    race: character.race,
    class: character.class,
    type: character.type,
  }));

  return (
    <div>
      <Table
        allowDelete
        handleDelete={handleDeleteCharacter}
        rows={characterTableData}
        rowAction={handleViewCharacter}
        getRowClasses={getRowClasses}
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
