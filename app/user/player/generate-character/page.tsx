"use server";

import { getClasses, getRaces, getSubraces } from "@/lib/db";
import {
  enrichClasses,
  enrichRaces,
  enrichSubRaces,
} from "../../../data/enricher";

import GenerateCharacter from "../../../components/GenerateCharacter";
import { PlayableClass, Race, Subrace } from "@/app/data/types";

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
