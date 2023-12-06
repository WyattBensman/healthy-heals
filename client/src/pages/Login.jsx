import { LoginForm } from "../components/forms/loginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <LoginForm />
      </div>
    </>
  );
}
