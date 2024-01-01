import {
  classDetails,
  classList,
  raceDetails,
  raceList,
} from "@/services/graphql/queries";

async function buildGqlRequest(body: any) {
  const data = await fetch("https://www.dnd5eapi.co/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((json) => json.data);

  return data;
}

export const getRaces = async () => {
  const data = await buildGqlRequest(raceList);
  return data.races;
};

export const getRaceDetails = async (race: string) => {
  const data = await buildGqlRequest(raceDetails(race));
  return data.race;
};

export const getClasses = async () => {
  const data = await buildGqlRequest(classList);
  return data.classes;
};

export const getClassDetails = async (className: string) => {
  const data = await buildGqlRequest(classDetails(className));
  return data.class;
};
