import SignUpForm from "../components/forms/signupForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <SignUpForm />
        <div className="text-xs mt-4 italic text-center">
          <Link to="/login">
            <p className="text-sm hover:text-gray-700 duration-200">
              Already a member? Sign in!
            </p>
          </Link>
          <p className="">or</p>
          <Link to="/">
            <p className="hover:text-gray-700 duration-200">
              explore without logging in
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
