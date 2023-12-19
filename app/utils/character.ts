export function getClassColour(classKey: string) {
  switch (classKey) {
    case "fighter":
      return "#C69B6D";
    case "rogue":
      return "#FFF468";
    case "wizard":
      return "#3FC7EB";
    case "druid":
      return "#FF7C0A";
    case "barbarian":
      return "#C41E3A";
    case "bard":
      return "#0070DD";
    case "cleric":
      return "#AAAAAA"; // WoW is FFFFFF, but this is bright AF
    case "monk":
      return "#00FF98";
    case "paladin":
      return "#F48CBA";
    case "ranger":
      return "#AAD372";
    case "sorcerer":
      return "#A330C9";
    case "warlock":
      return "#8788EE";
    default:
      return "transparent";
  }
}

export function getReadableHeight(height: number) {
  const inches = height % 12;
  const feet = Math.floor(height / 12);
  return `${feet}'${inches ? `${inches}"` : ""}`;
}

export function getReadableWeight(weight: number) {
  const lbs = weight % 14;
  const stone = Math.floor(weight / 14);
  return `${stone}st${lbs ? ` ${lbs}${lbs === 1 ? "lb" : "lbs"}` : ""}`;
}
