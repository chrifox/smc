"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
// import { randomColour } from "../utils/randomiser";
import { InputOption } from "./types";
import Form from "./Form";

interface SubraceOption extends InputOption {
  race_id: number;
}

type GenerateCharacterProps = {
  races: InputOption[];
  subraces: SubraceOption[];
  classes: InputOption[];
};

const defaultFormData = {
  name: "",
  gender: "",
  race: "",
  class: "",
  height: 70,
  weight: 120,
  hair_colour: "#997711",
  eye_colour: "#4499AA",
  age: 15,
};

export default function GenerateCharacter({
  races,
  subraces,
  classes,
}: GenerateCharacterProps) {
  const [subraceOptions, setSubraceOptions] = useState<SubraceOption[]>([]);

  // function handleRandomise() {
  // write the randomiser function
  // TESTING
  // setFormData((previousFormData) => ({
  //   ...previousFormData,
  //   hair_colour: randomColour(500000),
  // }));
  // }

  function getSubraceOptions(race_id: number) {
    return subraces.filter((s: SubraceOption) => {
      const { race_id: raceId, ...subRaceOption } = s;
      return s.race_id === race_id ? subRaceOption : null;
    });
  }

  // useEffect(() => {
  //   if (formData.race) {
  //     const race = races.find((race) => race.value === formData.race);
  //     if (race?.id) {
  //       const newSubraceOptions = getSubraceOptions(race.id);
  //       setSubraceOptions(newSubraceOptions);
  //     }
  //   }
  // }, [formData.race]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">NPC Generator</h1>

      <Form allowReset defaultFormData={defaultFormData} onSubmit={console.log}>
        {({ formData, updateFormData }) => (
          <>
            <Input
              type="text"
              label="Name"
              name="name"
              placeholder="Enter a name"
              value={formData.name}
              onChange={updateFormData}
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
              type="select"
              label="Race"
              name="race"
              placeholder="Choose a Race"
              value={formData.race}
              onChange={updateFormData}
              options={races}
            />

            {formData.race?.length > 0 && subraceOptions?.length > 0 && (
              <Input
                type="select"
                label="Subrace"
                name="subrace"
                placeholder="Choose a Subrace"
                value={formData.subrace}
                onChange={updateFormData}
                options={subraceOptions}
              />
            )}

            <Input
              type="select"
              label="Class"
              name="class"
              placeholder="Choose a Class"
              value={formData.class}
              onChange={updateFormData}
              options={classes}
            />

            <Input
              type="range"
              label={`Height (${formData.height}in)`}
              name="height"
              value={formData.height}
              onChange={updateFormData}
              min={1}
              max={144}
            />

            <Input
              type="range"
              label={`Weight (${formData.weight}lbs)`}
              name="weight"
              value={formData.weight}
              onChange={updateFormData}
              min={10}
              max={999}
            />

            <Input
              type="number"
              label="Age"
              name="age"
              value={formData.age}
              onChange={updateFormData}
              min={1}
              max={9999}
            />

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
          </>
        )}
      </Form>
    </div>
  );
}
