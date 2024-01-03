import CharacterList from "@/app/components/custom/CharacterList";
import { CREATE_CHARACTER, USER } from "@/app/constants/routes";
import { PageProps } from "@/app/types";

const CharactersListPage = async ({ params }: PageProps) => {
  const userId = params.userId;

  async function handleDeleteCharacter(characterId: number) {
    "use server";

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
    const characters = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/character/list?uid=${userId}`
    )
      .then((res) => res.json())
      .then((json) => json.data);

    return characters;
  }

  const characters = await getUserCharacters();

  return (
    <div className="flex flex-col items-center">
      <h1>Character List</h1>

      <CharacterList
        characters={characters}
        handleDeleteCharacter={handleDeleteCharacter}
      />

      <a
        className="bg-green-800 py-2 px-4 mt-4 rounded-sm"
        href={`${USER}/${userId}${CREATE_CHARACTER}`}
      >
        New Character
      </a>
    </div>
  );
};

export default CharactersListPage;
