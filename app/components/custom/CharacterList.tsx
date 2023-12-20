"use client";

import { Character } from "@/services/neon/types";
import Table from "../element/Table";

type CharacterListProps = {
  characters: Character[];
  handleDeleteCharacter: (characterId: number) => void;
  handleViewCharacter: (characterId: number) => void;
};

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
  }));

  return (
    <div>
      <Table
        allowDelete
        handleDelete={handleDeleteCharacter}
        rows={characterTableData}
        rowAction={handleViewCharacter}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "race", label: "Race" },
          { key: "class", label: "Class" },
        ]}
      />
    </div>
  );
};

export default CharacterList;
