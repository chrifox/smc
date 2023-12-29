import { getAbilityModifier, getModifierPretty } from "./utils";
import InformationCellRow from "./InformationCellRow";
import InformationCell from "./InformationCell";

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
  const modifier = getAbilityModifier(value);

  return (
    <div className="flex flex-col items-center">
      <div>{label}</div>
      <div className="text-xl">{getModifierPretty(modifier)}</div>
      <div className="bg-gray-700 p-2 w-full text-center">{value}</div>
    </div>
  );
};

const AbilityScores = ({ scores }: AbilityScoresProps) => {
  return (
    <InformationCellRow>
      <InformationCell>
        <AbilityScore label="STR" value={scores.str} />
      </InformationCell>
      <InformationCell>
        <AbilityScore label="DEX" value={scores.dex} />
      </InformationCell>
      <InformationCell>
        <AbilityScore label="CON" value={scores.con} />
      </InformationCell>
      <InformationCell>
        <AbilityScore label="INT" value={scores.int} />
      </InformationCell>
      <InformationCell>
        <AbilityScore label="WIS" value={scores.wis} />
      </InformationCell>
      <InformationCell>
        <AbilityScore label="CHA" value={scores.cha} />
      </InformationCell>
    </InformationCellRow>
  );
};

export default AbilityScores;
