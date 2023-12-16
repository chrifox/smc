import { PlayableClass, Race, Subrace } from "./types";

export function enrichRaces(races: Race[]) {
  const enrichedRaces = races.map((r: Race) => {
    return {
      value: r.name,
      label: r.display_name,
    };
  });

  return enrichedRaces;
}

export function enrichSubRaces(subraces: Subrace[]) {
  const enrichedSubraces = subraces.map((r: Subrace) => {
    console.log(r);
    return {
      value: r.name,
      label: r.display_name,
      race: r.race,
    };
  });

  return enrichedSubraces;
}

export function enrichClasses(classes: PlayableClass[]) {
  const enrichedClasses = classes.map((c: PlayableClass) => {
    return {
      value: c.name,
      label: c.display_name,
    };
  });

  return enrichedClasses;
}
