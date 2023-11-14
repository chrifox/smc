"use client";

import { useEffect, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Form/Input";

const seedData: any = {
  races: [
    {
      value: "human",
      label: "Human",
    },
    {
      value: "dwarf",
      label: "Dwarf",
    },
    {
      value: "elf",
      label: "Elf",
    },
  ],
  subraces: {
    dwarf: [
      {
        value: "hill_dwarf",
        label: "Hill Dwarf",
      },
      {
        value: "mountain_dwarf",
        label: "Mountain Dwarf",
      },
    ],
  },
  classes: [
    {
      value: "fighter",
      label: "Fighter",
    },
    {
      value: "mage",
      label: "Mage",
    },
    {
      value: "rogue",
      label: "Rogue",
    },
  ],
};

type FormDataState = {
  [key: string]: any;
};

const defaultFormData = {
  race: "",
  class: "",
};

export default function Home() {
  const [formData, setFormData] = useState<FormDataState>(defaultFormData);

  function updateFormData(event: React.ChangeEvent<any>) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log(formData);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="mb-4">NPC Generator</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="select"
          label="Race"
          name="race"
          placeholder="Choose a Race"
          value={formData.race.value}
          onChange={updateFormData}
          options={seedData.races}
        />

        {seedData.subraces[formData.race] && (
          <Input
            type="select"
            label="Subrace"
            name="subrace"
            placeholder="Choose a Subrace"
            value={formData.subrace?.value}
            onChange={updateFormData}
            options={seedData.subraces[formData.race]}
          />
        )}

        <Input
          type="select"
          label="Class"
          name="class"
          placeholder="Choose a Class"
          value={formData.class.value}
          onChange={updateFormData}
          options={seedData.classes}
        />

        <div className="flex flex-row justify-between">
          <Button
            action={() =>
              setTimeout(window.location.reload.bind(window.location), 250)
            }
            label="Reset"
          />
          <Button action={() => alert("randomise the NPC")} label="Randomise" />
        </div>
      </form>
    </main>
  );
}
