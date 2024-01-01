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
  hit_die?: number; // custom only
  resistances?: string; // custom only

  subraces?: any; // 5e only
  ability_bonuses?: any; // 5e only
};

export type PlayableClass = {
  id: number;
  name: string;
  display_name: string;
  description: string;
  primary_stat: string;
  saving_throws: string;
  created_at?: string;

  proficiencies?: string; // custom only

  hit_die?: number; // 5e only
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
};
