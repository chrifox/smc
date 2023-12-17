// types as they come from SQL

export type Race = {
  id: number;
  name: string;
  size: "small" | "medium" | "large";
  speed: number;
  display_name: string;
  created_at: string;
};

export type Subrace = {
  id: number;
  name: string;
  display_name: string;
  race_id: number;
  created_at: string;
};

export type PlayableClass = {
  id: number;
  name: string;
  speed: number;
  hit_dice: "d4" | "d6" | "d8" | "d10" | "d12";
  saving_throws: string;
  display_name: string;
  created_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export type Character = {
  id: number;
  name: string;
  race_id: number;
  class_id: number;
  level: number;
  created_at: string;
}