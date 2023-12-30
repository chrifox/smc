export function getAbilityModifier(score: number) {
  return Math.floor((score - 10) / 2);
}

export function getProficienyBonus(level: number) {
  return Math.ceil(level / 4) + 1;
}

export function getModifierPretty(modifier: number) {
  return `${modifier > 0 ? `+${modifier}` : modifier}`;
}

export function getDiceRoll(dice: number) {
  return Math.floor(Math.random() * dice) + 1;
}
