// types as they come from SQL

export type Race = {
  id: number;
  name: string;
  display_name: string;
  size: string;
  speed: number;
  ability1: string;
  ability2: string;
  created_at?: string;
};

export type Subrace = {
  id: number;
  name: string;
  display_name: string;
  race_id: number;
  created_at?: string;
};

export type PlayableClass = {
  id: number;
  name: string;
  display_name: string;
  hit_dice: 6 | 8 | 10 | 12;
  primary_stat: string;
  saving_throws: string;
  created_at?: string;
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
