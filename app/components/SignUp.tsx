"use client";

import Input from "./Input";
import Form from "./Form";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const defaultFormData = {
  email: "",
  password: "",
};

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
  const { setUser } = useContext(UserContext);

  async function handleSignUp(formData: FormData) {
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json)
        console.log(json);
      })
      .catch(console.error);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Sign Up</h1>

      <Form
        defaultFormData={defaultFormData}
        onSubmit={handleSignUp}
        submitLabel="Sign Up"
      >
        {({ formData, updateFormData }) => (
          <>
            <Input
              type="text"
              label="Email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={updateFormData}
            />

            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={updateFormData}
            />
          </>
        )}
      </Form>
    </div>
  );
};

export default SignUp;
