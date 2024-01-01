import AbilityScores from "./AbilityScores";
import { Character } from "@/services/neon/types";
import {
  getAbilityModifier,
  getModifierPretty,
  getProficienyBonus,
} from "./utils";
import InformationCell from "./InformationCell";
import InformationCellRow from "./InformationCellRow";
import BasicAttacks, { Attack } from "./BasicAttacks";
import CharacterPortrait from "./CharacterPortrait";

const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

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

const equipment = [
  "adventurer's pack",
  "dagger",
  "holy symbol",
  "walking stick",
]; // todo make this editable

const dummyAttacks: Attack[] = [
  {
    type: "physical",
    name: "Dagger",
    dice_type: 4,
    dice_qty: 2,
    attack_modifier: 4,
    damage_modifier: 2,
    sneak_attack: true,
  },
  {
    type: "magical",
    name: "Firebolt",
    dice_type: 8,
    dice_qty: 1,
    attack_modifier: 2,
    damage_modifier: 0,
  },
];

const CharacterSheet = ({ character }: { character: Character & any }) => {
  let characterDetails = character;

  const dexMod = getAbilityModifier(characterDetails.scores.dex);

  characterDetails = {
    ...characterDetails,
    pb: getProficienyBonus(character.level),
    ac: 10 + dexMod, // TODO: account for gear modifiers
    hp: 50,
    initiative: dexMod,
  };

  console.log(characterDetails);

  return (
    <div className="flex flex-col flex-start bg-gray-900">
      <InformationCellRow>
        <InformationCell>
          <div>
            Portrait:
            <CharacterPortrait
              skinColour={characterDetails.skin_colour}
              eyeColour={characterDetails.eye_colour}
              hairColour={characterDetails.hair_colour}
            />
          </div>
        </InformationCell>
      </InformationCellRow>
      <InformationCellRow>
        <InformationCell>
          <div>Race: {characterDetails.race}</div>
        </InformationCell>
        <InformationCell>
          <div>Class: {characterDetails.class}</div>
        </InformationCell>
        <InformationCell>
          <div>Level: {characterDetails.level}</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow>
        <InformationCell>
          <div>PB: {getModifierPretty(characterDetails.pb)}</div>
        </InformationCell>
        <InformationCell>
          <div>HP: {characterDetails.hp}</div>
        </InformationCell>
        <InformationCell>
          <div>
            Hit Dice:{" "}
            {`d${
              characterDetails.classDetails?.hit_die ||
              characterDetails.raceDetails?.hit_die
            }`}
          </div>
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
          <div>Speed: {characterDetails.raceDetails.speed}</div>
        </InformationCell>
      </InformationCellRow>

      <AbilityScores scores={characterDetails.scores} />

      <InformationCellRow label="SAVING THROWS">
        {abilities.map((ability) => (
          <InformationCell key={ability}>
            <div className="flex flex-col items-center">
              <div>{ability}</div>
              <div>
                {getModifierPretty(
                  getAbilityModifier(
                    characterDetails.scores[ability.toLowerCase()]
                  ) +
                    (characterDetails.classDetails.saving_throws.includes(
                      ability
                    )
                      ? characterDetails.pb
                      : 0)
                )}
              </div>
            </div>
          </InformationCell>
        ))}
      </InformationCellRow>

      <BasicAttacks attacks={dummyAttacks} />

      <InformationCellRow label="SKILLS">
        {skills.map(({ name, stat }) => (
          <InformationCell key={name} width={6}>
            <div>
              {name}: <span className="text-gray-500">{`(${stat})`} +/-</span>
            </div>
          </InformationCell>
        ))}
      </InformationCellRow>

      <InformationCellRow label="FEATS">
        <InformationCell>
          <div>AWESOME AT EVERYTHING</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow label="LANGUAGES">
        <InformationCell>
          <div>Common</div>
        </InformationCell>
      </InformationCellRow>

      <InformationCellRow label="EQUIPMENT">
        {equipment.map((name) => (
          <InformationCell key={name} width={6}>
            <div>{name}</div>
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
