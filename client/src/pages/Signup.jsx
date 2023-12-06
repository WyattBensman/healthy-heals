import SignUpForm from "../components/forms/signupForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <SignUpForm />
      </div>
    </>
  );
}
