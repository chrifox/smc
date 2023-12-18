"use client";

import Input from "./Input";
import Form from "./Form";

const defaultFormData = {
  email: "",
  password: "",
};

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Sign In</h1>

      <Form
        defaultFormData={defaultFormData}
        onSubmit={console.log}
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
            />

            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={updateFormData}
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
