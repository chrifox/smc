"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import Input from "./Input";
import Form from "./Form";
import { UserContext } from "../context/UserContext";

const defaultFormData = {
  email: "",
};

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
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
    if (user?.email) {
      router.push("/user/account");
    }
  }, [user]);

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
