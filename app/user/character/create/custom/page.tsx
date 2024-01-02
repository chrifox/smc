import CharacterCreator from "@/app/components/custom/CharacterCreator/CharacterCreator";
import { getClasses, getRaces } from "@/services/neon/db";
import { PlayableClass, Race } from "@/services/neon/types";

const CreateCharacter = async () => {
  const dbRaces = (await getRaces()) as Race[];
  const dbClasses = (await getClasses()) as PlayableClass[];

  const props = {
    races: dbRaces,
    classes: dbClasses,
  };

  return (
    <div>
      <h1 className="mb-4">Custom Character Builder</h1>

      <CharacterCreator {...props} />
    </div>
  );
};

export default CreateCharacter;
