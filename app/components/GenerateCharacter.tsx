"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

type FormDataState = {
  [key: string]: any;
};

const defaultFormData = {
  name: "",
  gender: "",
  race: "",
  class: "",
  height: 70,
  weight: 70,
  hair_colour: "#000000",
  eye_colour: "#000000",
  age: 15,
};

export default function GenerateCharacter({ races, subraces, classes }) {
  const [formData, setFormData] = useState<FormDataState>(defaultFormData);

  function updateFormData(event: React.ChangeEvent<any>) {
    console.log("update", event.target.value);

    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    console.log("RESET");
    setFormData(defaultFormData);
  }

  function handleRandomise() {
    // write the randomiser function
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  useEffect(() => {
    console.log("STATE: ", formData);
  }, [formData]);

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="mb-4">NPC Generator</h1>

      <form className="min-w-[25vw]" onSubmit={handleSubmit}>
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

        {formData.race?.length > 0 && subraces[formData.race] && (
          <Input
            type="select"
            label="Subrace"
            name="subrace"
            placeholder="Choose a Subrace"
            value={formData.subrace}
            onChange={updateFormData}
            options={subraces[formData.race]}
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
          min={36}
          max={120}
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

        <div className="flex flex-row justify-between mt-4">
          <Button action={handleReset} label="Reset" classes="bg-red-500" />
          <Button
            action={handleRandomise}
            label="Randomise"
            classes="bg-amber-500"
          />
        </div>
      </form>
    </main>
  );
}
