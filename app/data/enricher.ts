export function enrichRaces(races) {
  const enrichedRaces = races.map((r) => {
    return {
      label: r.name,
      value: r.name.replaceAll("_", " "),
    };
  });

  return enrichedRaces;
}

export function enrichClasses(classes) {
  const enrichedClasses = classes.map((c) => {
    return {
      label: c.name,
      value: c.name.replaceAll("_", " "),
    };
  });

  return enrichedClasses;
}
