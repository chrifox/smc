"use client";

import { useContext, useEffect, useState } from "react";
import Input from "../element/Input";
// import { randomColour } from "../utils/randomiser";
import { InputOption } from "../types";
import Form from "../element/Form";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { getReadableHeight, getReadableWeight } from "@/app/utils/character";

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
  skin_colour: "#EE9955",
  age: 15,
};

const CreateCharacter = ({
  races,
  subraces,
  classes,
}: GenerateCharacterProps) => {
  const { user } = useContext(UserContext);
  const [subraceOptions, setSubraceOptions] = useState<SubraceOption[]>([]);
  const router = useRouter();

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

  async function handleSubmit(formData: FormData) {
    await fetch("/api/character", {
      method: "POST",
      body: JSON.stringify({ character: formData, userId: user.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        router.push("/user/player/characters");
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
        {({ formData, updateFormData }) => (
          <>
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
              type="select"
              label="Race"
              name="race"
              placeholder="Choose a Race"
              value={formData.race}
              onChange={updateFormData}
              options={races}
              required
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
          </>
        )}
      </Form>
    </div>
  );
};

export default CreateCharacter;
