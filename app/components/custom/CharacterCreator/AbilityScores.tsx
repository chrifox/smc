import { useState } from "react";
import Input from "../../element/Input";
import { getDiceRoll } from "../CharacterSheet/utils";
import Button from "../../element/Button";

const scores = [
  { name: "str", label: "Strength" },
  { name: "dex", label: "Dexterity" },
  { name: "con", label: "Constitution" },
  { name: "int", label: "Intelligence" },
  { name: "wis", label: "Wisdom" },
  { name: "cha", label: "Charisma" },
];

// TODO: maybe??
// const methods = ["manual", "pointBuy", "random"];

const AbilityScores = ({ formData, updateFormData }: any) => {
  const [generatedScores, setGeneratedScores] = useState<number[]>([]);

  function randomiseScores(ev: React.MouseEvent) {
    ev.preventDefault();

    const scoreTotals = [];
    for (let score = 0; score < 6; score++) {
      const rolls = [];
      for (let roll = 0; roll < 4; roll++) {
        rolls.push(getDiceRoll(6));
      }
      const sum = rolls
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((total, roll) => total + roll, 0);

      scoreTotals.push(sum);

      setGeneratedScores(scoreTotals);

      // automatically set?
      // updateFormData({ target: { name: scores[score].name, value: sum } });
    }
  }

  function clearGeneratedScores() {
    setGeneratedScores([]);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap">
        {scores.map((score) => (
          <Input
            key={score.name}
            type="number"
            label={score.label}
            name={score.name}
            value={formData[score.name]}
            onChange={updateFormData}
            required
          />
        ))}
      </div>

      {generatedScores.length > 0 && (
        <div className="flex flex-row items-center">
          {generatedScores.map((score, index) => (
            <div
              className="flex justify-center items-center p-1 border m-2 w-8 h-8"
              key={`score-${index + 1}`}
            >
              {score}
            </div>
          ))}

          <Button classes="text-xs" onClick={clearGeneratedScores}>
            I'm done here.
          </Button>
        </div>
      )}

      <Button onClick={randomiseScores}>Randomise Scores</Button>
    </div>
  );
};

export default AbilityScores;
