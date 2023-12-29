import AbilityScores from "./AbilityScores";
import { Character } from "@/services/neon/types";
import {
  getAbilityModifier,
  getModifierPretty,
  getProficienyBonus,
} from "./utils";
import InformationCell from "./InformationCell";
import InformationCellRow from "./InformationCellRow";

const dummyScores = {
  str: 18,
  dex: 16,
  con: 14,
  int: 12,
  wis: 10,
  cha: 8,
};

const skills = [
  { name: "Athletics", stat: "STR" },
  { name: "Acrobatics", stat: "DEX" },
  { name: "Sleight of Hand", stat: "DEX" },
  { name: "Stealth", stat: "DEX" },
  { name: "Arcana", stat: "INT" },
  { name: "History", stat: "INT" },
  { name: "Investigation", stat: "INT" },
  { name: "Nature", stat: "INT" },
  { name: "Religion", stat: "INT" },
  { name: "Animal Handling", stat: "WIS" },
  { name: "Insight", stat: "WIS" },
  { name: "Medicine", stat: "WIS" },
  { name: "Perception", stat: "WIS" },
  { name: "Survival", stat: "WIS" },
  { name: "Deception", stat: "CHA" },
  { name: "Intimidation", stat: "CHA" },
  { name: "Performance", stat: "CHA" },
  { name: "Persuasion", stat: "CHA" },
];

const CharacterSheet = ({ character }: { character: Character & any }) => {
  let characterDetails = {
    ...character,
    scores: dummyScores,
  };

  const dexMod = getAbilityModifier(characterDetails.scores.dex);

  characterDetails = {
    ...characterDetails,
    pb: getProficienyBonus(character.level),
    ac: 10 + dexMod, // TODO: account for gear modifiers
    hp: 50,
    speed: 30, // TODO: get from race
    initiative: dexMod,
  };

  // console.log(characterDetails);

  return (
    <div className="flex flex-col flex-start bg-gray-900">
      <InformationCellRow>
        <InformationCell>
          <div>Race: {characterDetails.race}</div>
        </InformationCell>
        <InformationCell>
          <div>Class: {characterDetails.class}</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow>
        <InformationCell>
          <div>Level: {characterDetails.level}</div>
        </InformationCell>
        <InformationCell>
          <div>PB: {getModifierPretty(characterDetails.pb)}</div>
        </InformationCell>
        <InformationCell>
          <div>HP: {characterDetails.hp}</div>
        </InformationCell>
        <InformationCell>
          <div>AC: {characterDetails.ac}</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow>
        <InformationCell>
          <div>
            Initiative: {getModifierPretty(characterDetails.initiative)}
          </div>
        </InformationCell>
        <InformationCell>
          <div>Speed: {characterDetails.speed}</div>
        </InformationCell>
      </InformationCellRow>

      <AbilityScores scores={characterDetails.scores} />

      <InformationCellRow label="SAVING THROWS">
        <InformationCell>
          <div>STR</div>
        </InformationCell>
        <InformationCell>
          <div>DEX</div>
        </InformationCell>
        <InformationCell>
          <div>CON</div>
        </InformationCell>
        <InformationCell>
          <div>INT</div>
        </InformationCell>
        <InformationCell>
          <div>WIS</div>
        </InformationCell>
        <InformationCell>
          <div>CHA</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow label="SKILLS">
        {skills.map(({ name, stat }) => (
          <InformationCell key={name} width={6}>
            <div>
              {name}: <span className="text-gray-500">{`(${stat})`} +/-</span>
            </div>
          </InformationCell>
        ))}
      </InformationCellRow>
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
