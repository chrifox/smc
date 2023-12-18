"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

type FormProps = {
  defaultFormData: FormData;
  onSubmit?: (formData: FormData) => void;
  submitLabel?: string;
  allowReset?: boolean;
  resetLabel?: string;
  children: (args: any) => JSX.Element;
};

const Form = ({
  defaultFormData,
  submitLabel = "Submit",
  allowReset = false,
  resetLabel = "Reset",
  onSubmit,
  children,
}: FormProps) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  function updateFormData(event: React.ChangeEvent<any>) {
    console.log("update", event.target.value);

    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    // console.log("FORM RESET");

    setFormData(defaultFormData);
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  useEffect(() => {
    // console.log("STATE: ", formData);
  }, [formData]);

  return (
    <form className="min-w-[25vw]" onSubmit={handleSubmit}>
      {children({ formData, updateFormData })}

      <div
        className={`flex flex-row mt-4 ${
          allowReset ? "justify-between" : "justify-around"
        }`}
      >
        {allowReset && (
          <Button
            action={handleReset}
            label={resetLabel}
            classes="bg-red-500"
          />
        )}

        <Button
          action={() => {}}
          label={submitLabel}
          classes="center bg-green-500"
        />
      </div>
    </form>
  );
};

export default Form;
