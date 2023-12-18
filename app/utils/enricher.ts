import { PlayableClass, Race, Subrace } from "../../services/neon/types";

export function enrichRaces(races: Race[]) {
  const enrichedRaces = races.map((r: Race) => {
    return {
      id: r.id,
      value: r.name,
      label: r.display_name,
    };
  });

  return enrichedRaces;
}

export function enrichSubRaces(subraces: Subrace[]) {
  const enrichedSubraces = subraces.map((r: Subrace) => {
    return {
      id: r.id,
      value: r.name,
      label: r.display_name,
      race_id: r.race_id,
    };
  });

  return enrichedSubraces;
}

export function enrichClasses(classes: PlayableClass[]) {
  const enrichedClasses = classes.map((c: PlayableClass) => {
    return {
      id: c.id,
      value: c.name,
      label: c.display_name,
    };
  });

  return enrichedClasses;
}
