import { getClasses, getRaces, getSubraces } from "@/services/neon/db";
import {
  enrichClasses,
  enrichRaces,
  enrichSubRaces,
} from "../../../utils/enricher";

import GenerateCharacter from "../../../components/custom/CreateCharacter";
import { PlayableClass, Race, Subrace } from "@/services/neon/types";

const CreateCharacter = async () => {
  const dbRaces = (await getRaces()) as Race[];
  const dbSubraces = (await getSubraces()) as Subrace[];
  const dbClasses = (await getClasses()) as PlayableClass[];

  const props = {
    races: enrichRaces(dbRaces),
    subraces: enrichSubRaces(dbSubraces),
    classes: enrichClasses(dbClasses),
  };

  return (
    <div>
      <h1 className="mb-4">Character Builder</h1>

      <GenerateCharacter {...props} />
    </div>
  );
};

export default CreateCharacter;
