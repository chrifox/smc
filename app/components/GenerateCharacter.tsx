"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import seedData from "../seed.json";

type FormDataState = {
  [key: string]: any;
};

const defaultFormData = {
  name: "",
  race: "",
  class: "",
  height: 70,
  age: 15,
};

const data: any = seedData;

export default function GenerateCharacter() {
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
          type="select"
          label="Race"
          name="race"
          placeholder="Choose a Race"
          value={formData.race}
          onChange={updateFormData}
          options={seedData.races}
        />

        {formData.race?.length > 0 && data.subraces[formData.race] && (
          <Input
            type="select"
            label="Subrace"
            name="subrace"
            placeholder="Choose a Subrace"
            value={formData.subrace}
            onChange={updateFormData}
            options={data.subraces[formData.race]}
          />
        )}

        <Input
          type="select"
          label="Class"
          name="class"
          placeholder="Choose a Class"
          value={formData.class}
          onChange={updateFormData}
          options={seedData.classes}
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
          type="number"
          label="Age"
          name="age"
          value={formData.age}
          onChange={updateFormData}
          min={1}
          max={9999}
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