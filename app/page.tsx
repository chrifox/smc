"use server";

import { getClasses, getLatency, getRaces, getSubraces } from "@/lib/db";
import { enrichClasses, enrichRaces, enrichSubRaces } from "./data/enricher";

import GenerateCharacter from "./components/GenerateCharacter";

export default async function Home() {
  const dbLatency = await getLatency();
  console.log("Get latency:: ", dbLatency);

  const dbRaces = await getRaces();
  const dbSubraces = await getSubraces();
  const dbClasses = await getClasses();

  console.log("Get races:: ", dbRaces);
  console.log("Get subraces:: ", dbSubraces);
  console.log("Get classes:: ", dbClasses);

  const props = {
    races: enrichRaces(dbRaces),
    subraces: enrichSubRaces(dbSubraces),
    classes: enrichClasses(dbClasses),
  };

  return <GenerateCharacter {...props} />;
}
