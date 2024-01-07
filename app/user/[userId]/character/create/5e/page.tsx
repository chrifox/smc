import CharacterCreator from "@/app/components/custom/CharacterCreator/CharacterCreator";
import { getClasses, getRaces } from "@/services/graphql/requests";
import { GQLClass, GQLRace } from "@/services/graphql/types";

const HomePage = async () => {
  const races = await getRaces();
  const classes = await getClasses();

  const sanitisedRaces = races.map((r: GQLRace) => ({
    name: r.index,
    display_name: r.name,
    speed: r.speed,
    size: r.size,
    ability_bonuses: r.ability_bonuses,
    languages: r.languages.reduce(
      (acc, l, index) =>
        `${acc}${index === r.languages.length - 1 ? l.name : `${l.name},`}`,
      ""
    ),
    subraces: r.subraces.map((sr) => ({
      name: sr.index,
      display_name: sr.name,
      ability_bonuses: sr.ability_bonuses,
      race: sr.race.index,
    })),
  }));

  const sanitisedClasses = classes.map((c: GQLClass) => ({
    name: c.index,
    display_name: c.name,
    hit_die: c.hit_die,
    saving_throws: c.saving_throws.reduce(
      (saves: string, s: any, index: number) =>
        `${saves}${
          index === c.saving_throws.length - 1 ? s.name : `${s.name},`
        }`,
      ""
    ),
  }));

  return (
    races &&
    classes && (
      <div>
        <h1>5E Character Builder</h1>

        <CharacterCreator
          races={sanitisedRaces}
          classes={sanitisedClasses}
          type="5e"
        />
      </div>
    )
  );
};

export default HomePage;
