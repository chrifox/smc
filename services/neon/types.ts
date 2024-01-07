// types as they come from SQL

export type Race = {
  id: number;
  name: string;
  display_name: string;
  description: string;
  size: string;
  speed: number;
  languages: string;
  created_at?: string;

  // custom only
  hit_die?: number;
  resistances?: string;

  // 5e only
  subraces?: any;
  ability_bonuses?: any;
};

export type PlayableClass = {
  id: number;
  name: string;
  display_name: string;
  description: string;
  primary_stat: string;
  saving_throws: string;
  created_at?: string;

  // custom only
  origin?: string;
  proficiencies?: string;

  // 5e only
  hit_die?: number;
};

export type User = {
  id: number;
  email: string;
  password?: string;
  created_at?: string;
};

export type AbilityScores = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
};

export type Character = {
  id: number;
  type: string;
  user_id: number;
  name: string;
  gender?: string;
  race: string;
  subrace?: string;
  origin?: "martial" | "finesse" | "arcane" | "holy";
  class: string;
  level: number;
  hair_colour?: string;
  eye_colour?: string;
  skin_colour?: string;
  age: number;
  height: number;
  weight: number;
  scores: AbilityScores;
  created_at?: string;

  hp: number;
  languages: string;
  equipped: string;
  equipment: string;
  feats: string;
  skills: string;
  death_save_fails: number;
  death_save_successes: number;
};

export type Campaign = {
  id: number;
  name: string;
  description: string;
  characters: string;
  created_at?: string;
};
