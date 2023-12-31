type GQLRace = {
  index: string;
  name: string;
  speed: number;
  size: string;
};

type GQLClass = {
  index: string;
  name: string;
  hit_die: number;
  saving_throws: { [key: string]: string }[];
};
