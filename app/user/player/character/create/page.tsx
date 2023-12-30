import CharacterCreator from "../../../../components/custom/CharacterCreator/CharacterCreator";
import { getClasses, getRaces, getSubraces } from "@/services/neon/db";
import { PlayableClass, Race, Subrace } from "@/services/neon/types";

const CreateCharacter = async () => {
  const dbRaces = (await getRaces()) as Race[];
  const dbSubraces = (await getSubraces()) as Subrace[];
  const dbClasses = (await getClasses()) as PlayableClass[];

  const props = {
    races: dbRaces,
    subraces: dbSubraces,
    classes: dbClasses,
  };

  return (
    <div>
      <h1 className="mb-4">Character Builder</h1>

      <CharacterCreator {...props} />
    </div>
  );
};

export default CreateCharacter;
