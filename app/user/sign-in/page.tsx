import SignInForm from "../../components/custom/SignInForm";

const SignInPage = ({}) => {
  return (
    <div className="flex flex-col items-center">
      <h1>Sign In</h1>

      <SignInForm />

      <p className="mt-8">
        Don't have an account? <a href="/user/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default SignInPage;
