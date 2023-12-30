import { Dice } from "@/app/types";
import InformationCell from "./InformationCell";
import InformationCellRow from "./InformationCellRow";
import Button from "../../element/Button";
import { useState } from "react";
import { getDiceRoll } from "./utils";

export type Attack = {
  type: "physical" | "magical";
  name: string;
  dice_type: Dice;
  dice_qty: number;
  attack_modifier: number;
  damage_modifier: number;
  sneak_attack?: boolean;
};

type BasicAttacksProps = { attacks: Attack[] };

const AttackRenderer = ({ attack }: { attack: Attack }) => {
  const [toHit, setToHit] = useState(true);
  const [hitRoll, setHitRoll] = useState(0);
  const [damageRoll, setDamageRoll] = useState(0);

  const { name, dice_type, dice_qty, attack_modifier, damage_modifier } =
    attack;

  function handleReset() {
    setToHit(true);
    setHitRoll(0);
    setDamageRoll(0);
  }

  function rollToHit() {
    const hitTotal = getDiceRoll(20) + attack_modifier;
    setToHit(false);
    setHitRoll(hitTotal);
  }

  function rollDamage() {
    let damageTotal = 0;
    for (let roll = 0; roll < dice_qty; roll++) {
      damageTotal += getDiceRoll(dice_type) + 3;
    }
    damageTotal += damage_modifier;
    setToHit(true);
    setDamageRoll(damageTotal);
  }

  return (
    <InformationCell key={attack.name}>
      <div className="flex flex-col">
        <div>
          {name}: {`${dice_qty}d${dice_type}+${damage_modifier}`}
        </div>

        {toHit && hitRoll === 0 && damageRoll === 0 && (
          <Button onClick={rollToHit}>Attack</Button>
        )}

        {!toHit && hitRoll > 0 && (
          <div>
            <Button classes="bg-amber-700" onClick={handleReset}>
              Miss?
            </Button>
            <Button classes="bg-green-700" onClick={rollDamage}>
              Damage!
            </Button>
          </div>
        )}

        {hitRoll > 0 && damageRoll > 0 && (
          <Button classes="bg-red-700" onClick={handleReset}>
            Reset
          </Button>
        )}

        <div className="flex flex-row">
          <div>Hit: {hitRoll}</div>

          <div>Damage: {damageRoll}</div>
        </div>
      </div>
    </InformationCell>
  );
};

const BasicAttacks = ({ attacks }: BasicAttacksProps) => {
  return (
    <InformationCellRow label="ATTACKS">
      {attacks.map((attack) => (
        <AttackRenderer key={attack.name} attack={attack} />
      ))}
    </InformationCellRow>
  );
};

export default BasicAttacks;
