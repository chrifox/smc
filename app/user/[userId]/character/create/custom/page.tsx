import CharacterCreator from "@/app/components/custom/CharacterCreator/CharacterCreator";
import { getClasses, getRaces } from "@/services/neon/db";
import { PlayableClass, Race } from "@/services/neon/types";

const CreateCharacter = async () => {
  const dbRaces = (await getRaces()) as Race[];
  const dbClasses = (await getClasses()) as PlayableClass[];

  return (
    <div>
      <h1>Custom Character Builder</h1>

      <CharacterCreator races={dbRaces} classes={dbClasses} type="custom" />
    </div>
  );
};

export default CreateCharacter;
