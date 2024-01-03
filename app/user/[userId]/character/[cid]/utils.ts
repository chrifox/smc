import { getClassDetails, getRaceDetails } from "@/services/graphql/requests";

export async function constructCharacterDetails(cid: string | null) {
  if (!cid) return null;

  let details;

  const character = await fetch(`/api/character?cid=${cid}`)
    .then((res) => res.json())
    .then((json) => json.data);

  if (character) {
    details = character;
  }

  if (character.type === "custom") {
    if (character.race) {
      details.raceDetails = await fetch(
        `/api/character/race?race=${character.race}`
      )
        .then((res) => res.json())
        .then((json) => json.data);
    } else {
      console.error("no race", character);
    }

    if (character.class) {
      details.classDetails = await fetch(
        `/api/character/class?class=${character.class}`
      )
        .then((res) => res.json())
        .then((json) => json.data);
    } else {
      console.error("no class", character);
    }
  }

  if (character.type === "5e") {
    if (character.race) {
      const raceDetails = await getRaceDetails(character.race);
      details.raceDetails = raceDetails;
    } else {
      console.error("no race", character);
    }

    if (character.class) {
      const classDetails = await getClassDetails(character.class);
      details.classDetails = classDetails;
    } else {
      console.error("no class", character);
    }
  }

  return details;
}
