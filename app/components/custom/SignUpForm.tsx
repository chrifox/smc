"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import Input from "../element/Input";
import Form from "../element/Form";
import { UserContext } from "../../context/UserContext";

const defaultFormData = {
  email: "",
};

type SignUpProps = {};

const SignUpForm = ({}: SignUpProps) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

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
        setUser(json.user);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (user.id !== -1) {
      router.push(`/user/${user.id}`);
    }
  }, [user]);

  return (
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
            required
          />

          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={updateFormData}
            required
          />
        </>
      )}
    </Form>
  );
};

export default SignUpForm;
