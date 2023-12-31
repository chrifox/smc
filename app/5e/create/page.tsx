import { classList, raceList } from "@/services/graphql/queries";
import CharacterCreator from "../../components/custom/CharacterCreator/CharacterCreator";

const HomePage = async () => {
  const races = await fetch("https://www.dnd5eapi.co/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raceList,
  })
    .then((res) => res.json())
    .then((json) => json.data.races);

  const classes = await fetch("https://www.dnd5eapi.co/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: classList,
  })
    .then((res) => res.json())
    .then((json) => json.data.classes);

  const sanitisedRaces = races.map((r: GQLRace) => ({
    name: r.index,
    display_name: r.name,
    speed: r.speed,
    size: r.size,
  }));

  const sanitisedClasses = classes.map((c: GQLClass) => ({
    name: c.index,
    display_name: c.name,
    hit_dice: c.hit_die,
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
        <h1>D&D 5E</h1>

        <CharacterCreator
          races={sanitisedRaces}
          classes={sanitisedClasses}
          subraces={[]}
        />
      </div>
    )
  );
};

export default HomePage;
