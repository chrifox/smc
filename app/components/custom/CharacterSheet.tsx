import { Character } from "@/services/neon/types";

type AbilityScoreProps = {
  value: number;
  label: string;
};

type AbilityScoresProps = {
  scores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
};

const AbilityScore = ({ label, value }: AbilityScoreProps) => {
  function getModifier(score: number) {
    return Math.floor((score - 10) / 2);
  }

  const modifier = getModifier(value);

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <div className="my-2">{label}</div>
        <div className="border border-color-gray-300">{`${
          modifier > 0 ? `+${modifier}` : modifier
        }`}</div>
        <div className="bg-gray-800 p-4">{value}</div>
      </div>
    </div>
  );
};

const AbilityScores = ({ scores }: AbilityScoresProps) => (
  <div className="flex flex-col">
    <AbilityScore label="Strength" value={scores.str} />
    <AbilityScore label="Dexterity" value={scores.dex} />
    <AbilityScore label="Constitution" value={scores.con} />
    <AbilityScore label="Intelligence" value={scores.int} />
    <AbilityScore label="Wisdom" value={scores.wis} />
    <AbilityScore label="Charisma" value={scores.cha} />
  </div>
);

type CombatDetailsProps = {
  ac: number;
  hp: number;
  speed: number;
};

const CombatDetails = ({ ac, hp, speed }: CombatDetailsProps) => (
  <div className="flex flex-col p-2">
    <div>AC: {ac}</div>
    <div>HP: {hp}</div>
    <div>Speed: {speed}</div>
  </div>
);

const CharacterSheet = ({ character }: { character: Character }) => {
  const dummyAbilityScores = {
    str: 18,
    dex: 16,
    con: 14,
    int: 12,
    wis: 10,
    cha: 8,
  };
  return (
    <div className="flex flex-row bg-gray-900">
      <AbilityScores scores={dummyAbilityScores} />

      <CombatDetails ac={15} hp={45} speed={30} />
    </div>
  );

  // PRIMARY INFO
  // stats
  // ac
  // hp
  // attack/spell info

  // SECONDARY INFO
  // proficiency bonus
  // initiative
  // speed

  // TERTIARY INFO
  // features/traits
  // equipment
  // aesthetics
};

export default CharacterSheet;
