"use server";

import { getClasses, getRaces, getSubraces } from "@/services/neon/db";
import {
  enrichClasses,
  enrichRaces,
  enrichSubRaces,
} from "../../../utils/enricher";

import GenerateCharacter from "../../../components/GenerateCharacter";
import { PlayableClass, Race, Subrace } from "@/services/neon/types";

export default async function CharacterGenerator() {
  const dbRaces = (await getRaces()) as Race[];
  const dbSubraces = (await getSubraces()) as Subrace[];
  const dbClasses = (await getClasses()) as PlayableClass[];

  const props = {
    races: enrichRaces(dbRaces),
    subraces: enrichSubRaces(dbSubraces),
    classes: enrichClasses(dbClasses),
  };

  return <GenerateCharacter {...props} />;
}
