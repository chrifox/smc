"use client";

import { useContext } from "react";
import Input from "../../element/Input";
// import { randomColour } from "../utils/randomiser";
import { InputOption } from "../../types";
import Form from "../../element/Form";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import { getReadableHeight, getReadableWeight } from "@/app/utils/character";
import AbilityScores from "./AbilityScores";
import { PlayableClass, Race, Subrace } from "@/services/neon/types";

interface SubraceOption extends InputOption {
  race_id: number;
}

type GenerateCharacterProps = {
  races: Race[];
  subraces: Subrace[];
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

const CharacterCreator = ({
  races,
  subraces,
  classes,
}: GenerateCharacterProps) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const raceOptions = races.map((r: Race) => {
    return {
      id: r.id,
      value: r.name,
      label: r.display_name,
    };
  });

  const subraceOptions = subraces.map((r: Subrace) => {
    return {
      id: r.id,
      value: r.name,
      label: r.display_name,
      race_id: r.race_id,
    };
  });

  const classOptions = classes.map((c: PlayableClass) => {
    return {
      id: c.id,
      value: c.name,
      label: c.display_name,
    };
  });

  // function handleRandomise() {
  // write the randomiser function
  // TESTING
  // setFormData((previousFormData) => ({
  //   ...previousFormData,
  //   hair_colour: randomColour(500000),
  // }));
  // }

  function getSubraceOptions(race_id: number) {
    return subraceOptions.filter((s: SubraceOption) => {
      const { race_id: raceId, ...subRaceOption } = s;
      return s.race_id === race_id ? subRaceOption : null;
    });
  }

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
          const selectedClass: PlayableClass | undefined = classes.find(
            (c: PlayableClass) => c.name === formData.class
          );

          let filteredSubraceOptions: SubraceOption[] = [];
          if (formData.race) {
            if (selectedRace?.id) {
              filteredSubraceOptions = getSubraceOptions(selectedRace.id);
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
                    <div>Size: {selectedRace.size}</div>
                    <div>Speed: {selectedRace.speed}</div>
                    <div>
                      Bonuses:
                      <div>
                        <div>+2 {selectedRace.ability2}</div>
                        {selectedRace.ability1 && (
                          <div>+1 {selectedRace.ability1}</div>
                        )}
                      </div>
                    </div>
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
                    <div>Hit Dice: d{selectedClass.hit_dice}</div>
                    <div>Primary Stat: {selectedClass.primary_stat}</div>
                    <div>
                      Saving Throws:
                      <div>{selectedClass.saving_throws}</div>
                    </div>
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
                min={1}
                max={144}
                required
              />

              <Input
                type="range"
                label={`Weight (${getReadableWeight(formData.weight)})`}
                name="weight"
                value={formData.weight}
                onChange={updateFormData}
                min={10}
                max={999}
                required
              />

              <div className="flex flex-row">
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
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default CharacterCreator;
