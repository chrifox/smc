export function enrichRaces(races) {
  const enrichedRaces = races.map((r) => {
    return {
      value: r.name,
      label: r.display_name,
    };
  });

  return enrichedRaces;
}

export function enrichSubRaces(races) {
  const enrichedSubraces = races.map((r) => {
    return {
      value: r.name,
      label: r.display_name,
    };
  });

  return enrichedSubraces;
}

export function enrichClasses(classes) {
  const enrichedClasses = classes.map((c) => {
    return {
      value: c.name,
      label: c.display_name,
    };
  });

  return enrichedClasses;
}
