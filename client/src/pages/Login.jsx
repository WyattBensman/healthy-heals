import { LoginForm } from "../components/forms/loginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <LoginForm />
        <div className="text-xs mt-4 italic text-center">
          <Link to="/signup">
            <p className="text-sm hover:text-gray-700 duration-200">
              Not a member? Sign up!
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
