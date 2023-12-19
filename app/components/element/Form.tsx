"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

type FormProps = {
  defaultFormData: { [key: string]: any };
  onSubmit?: (formData: any) => void;
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
  const [formData, setFormData] = useState(defaultFormData);

  function updateFormData(event: React.ChangeEvent<any>) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setFormData(defaultFormData);
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  // useEffect(() => {
  // console.log("STATE: ", formData);
  // }, [formData]);

  return (
    <form className="min-w-[25vw]" onSubmit={handleSubmit}>
      {children({ formData, updateFormData })}

      <div
        className={`flex flex-row mt-4 ${
          allowReset ? "justify-between" : "justify-around"
        }`}
      >
        {allowReset && (
          <Button onClick={handleReset} classes="bg-red-500">
            {resetLabel}
          </Button>
        )}

        <Button classes="center bg-green-500">{submitLabel}</Button>
      </div>
    </form>
  );
};

export default Form;
