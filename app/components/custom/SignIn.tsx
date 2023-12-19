"use client";

import { useContext, useEffect } from "react";

import Input from "../element/Input";
import Form from "../element/Form";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
};

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  async function handleSignIn(formData: FormData) {
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ ...formData, authenticate: true }),
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
      <h1 className="mb-4">Sign In</h1>

      <Form
        defaultFormData={defaultFormData}
        onSubmit={handleSignIn}
        submitLabel="Sign In"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={updateFormData}
              required
            />
          </>
        )}
      </Form>

      <p className="mt-8">
        Don't have an account? <a href="/user/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
