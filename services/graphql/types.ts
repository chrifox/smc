export type AbilityBonus = {
  ability_score: {
    name: string;
  };
  bonus: number;
};

export type GQLSubrace = {
  index: string;
  name: string;
  ability_bonuses: AbilityBonus[];
  race: { index: string };
};

export type GQLRace = {
  index: string;
  name: string;
  speed: number;
  size: string;
  ability_bonuses: AbilityBonus[];
  languages: { name: String }[];
  subraces: GQLSubrace[];
};

export type GQLClass = {
  index: string;
  name: string;
  // hit_die: 6 | 8 | 10 | 12;
  hit_die: number;
  saving_throws: { [key: string]: string }[];
};
