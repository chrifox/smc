"use client";

import { useContext } from "react";
import Input from "../../element/Input";
import { InputOption } from "../../types";
import Form from "../../element/Form";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import { getReadableHeight, getReadableWeight } from "@/app/utils/character";
import AbilityScores from "./AbilityScores";
import { PlayableClass, Race } from "@/services/neon/types";
import CharacterPortrait from "../CharacterSheet/CharacterPortrait";

interface SubraceOption extends InputOption {
  race_id: number;
}

type GenerateCharacterProps = {
  races: Race[];
  classes: PlayableClass[];
};

const defaultFormData = {
  name: "",
  gender: "",
  race: "",
  class: "",
  height: 70,
  weight: 120,
  hair_colour: "#AA5511",
  eye_colour: "#4499AA",
  skin_colour: "#EE9955",
  age: 21,
};

const CharacterCreator = ({ races, classes }: GenerateCharacterProps) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const raceOptions = races.map((r: Race) => {
    return {
      id: r.id,
      value: r.name,
      label: r.display_name,
    };
  });

  const classOptions = classes.map((c: PlayableClass) => {
    return {
      id: c.id,
      value: c.name,
      label: c.display_name,
    };
  });

  async function handleSubmit(formData: FormData & { [key: string]: any }) {
    const { str, dex, con, int, wis, cha, ...character } = formData;

    character.scores = {
      str,
      dex,
      con,
      int,
      wis,
      cha,
    };

    await fetch("/api/character", {
      method: "POST",
      body: JSON.stringify({ character, userId: user.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        router.push("/user/player/character/list");
      })
      .catch(console.error);
  }

  return (
    <div>
      <Form
        defaultFormData={defaultFormData}
        onSubmit={handleSubmit}
        submitLabel="Save"
        allowReset
      >
        {({ formData, updateFormData }) => {
          const selectedRace: Race | undefined = races.find(
            (r: Race) => r.name === formData.race
          );
          const selectedSubrace = selectedRace?.subraces?.find(
            (sr: any) => sr.name === formData.subrace
          );
          const selectedClass: PlayableClass | undefined = classes.find(
            (c: PlayableClass) => c.name === formData.class
          );

          let filteredSubraceOptions: SubraceOption[] = [];
          if (formData.race) {
            if (selectedRace?.subraces) {
              filteredSubraceOptions = selectedRace.subraces.map((sr: any) => ({
                value: sr.name,
                label: sr.display_name,
              }));
            }
          }

          return (
            <>
              <div className="flex flex-col">
                <Input
                  type="select"
                  label="Race"
                  name="race"
                  placeholder="Choose a Race"
                  value={formData.race}
                  onChange={updateFormData}
                  options={raceOptions}
                  required
                />

                {selectedRace && (
                  <div className="flex flex-col">
                    {selectedRace?.hit_die && (
                      <div>Hit Dice: d{selectedRace.hit_die}</div>
                    )}

                    <div>Size: {selectedRace.size}</div>
                    <div>Speed: {selectedRace.speed}</div>
                    {selectedRace?.resistances && (
                      <div>Resistances: {selectedRace.resistances}</div>
                    )}

                    {selectedRace.description && (
                      <div>Description: {selectedRace.description}</div>
                    )}

                    {selectedRace.ability_bonuses && (
                      <div>
                        Bonuses:
                        <div>
                          {selectedRace.ability_bonuses.map((bonus: any) => (
                            <div
                              key={bonus.ability_score.name}
                            >{`+${bonus.bonus} ${bonus.ability_score.name}`}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRace.languages && (
                      <div>
                        Languages:
                        <div>{selectedRace.languages}</div>
                      </div>
                    )}
                  </div>
                )}

                {selectedRace && filteredSubraceOptions.length > 0 && (
                  <Input
                    type="select"
                    label="Subrace"
                    name="subrace"
                    placeholder="Choose a Subrace"
                    value={formData.subrace}
                    onChange={updateFormData}
                    options={filteredSubraceOptions}
                  />
                )}
              </div>

              {selectedRace && selectedSubrace && (
                <div className="flex flex-col">
                  Bonuses:
                  <div>
                    {selectedSubrace.ability_bonuses.map((bonus: any) => (
                      <div
                        key={bonus.ability_score.name}
                      >{`+${bonus.bonus} ${bonus.ability_score.name}`}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <Input
                  type="select"
                  label="Class"
                  name="class"
                  placeholder="Choose a Class"
                  value={formData.class}
                  onChange={updateFormData}
                  options={classOptions}
                  required
                />

                {selectedClass && (
                  <div className="flex flex-col">
                    {selectedClass?.hit_die && (
                      <div>Hit Dice: d{selectedClass.hit_die}</div>
                    )}

                    {/* <div>Primary Stat: {selectedClass.primary_stat}</div> */}
                    <div>Saving Throws: {selectedClass.saving_throws}</div>

                    {selectedClass.proficiencies && (
                      <div>Proficiencies: {selectedClass.proficiencies}</div>
                    )}

                    {selectedClass.description && (
                      <div>Description: {selectedClass.description}</div>
                    )}
                  </div>
                )}
              </div>

              <AbilityScores
                formData={formData}
                updateFormData={updateFormData}
              />

              <Input
                type="text"
                label="Name"
                name="name"
                placeholder="Enter a name"
                value={formData.name}
                onChange={updateFormData}
                maxLength={32}
                required
              />

              <Input
                type="text"
                label="Gender"
                name="gender"
                placeholder="Enter anything you want I guess"
                value={formData.gender}
                onChange={updateFormData}
              />

              <Input
                type="number"
                label="Age"
                name="age"
                value={formData.age}
                onChange={updateFormData}
                min={1}
                max={9999}
                required
              />

              <Input
                type="range"
                label={`Height (${getReadableHeight(formData.height)})`}
                name="height"
                value={formData.height}
                onChange={updateFormData}
                min={6}
                max={120}
                required
              />

              <Input
                type="range"
                label={`Weight (${getReadableWeight(formData.weight)})`}
                name="weight"
                value={formData.weight}
                onChange={updateFormData}
                min={10}
                max={300}
                required
              />

              <div className="flex flex-row justify-between mb-2">
                <Input
                  type="color"
                  label="Hair Colour"
                  name="hair_colour"
                  value={formData.hair_colour}
                  onChange={updateFormData}
                />

                <Input
                  type="color"
                  label="Eye Colour"
                  name="eye_colour"
                  value={formData.eye_colour}
                  onChange={updateFormData}
                />

                <Input
                  type="color"
                  label="Skin Colour"
                  name="skin_colour"
                  value={formData.skin_colour}
                  onChange={updateFormData}
                />
              </div>

              <div className="p-4 flex flex-col w-full items-center border border-gray-700 rounded-md">
                <CharacterPortrait
                  skinColour={formData.skin_colour}
                  hairColour={formData.hair_colour}
                  eyeColour={formData.eye_colour}
                />
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default CharacterCreator;
