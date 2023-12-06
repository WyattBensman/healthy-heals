import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [login] = useMutation(LOGIN);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formData },
      });

      Auth.login(data.login.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="md:w-2/5 w-3/4 border rounded px-12 py-16"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-medium mb-2">Login</h1>
      <h2 className="mb-10 italic text-sm">
        Efficiently track & share some of your favorite dishes!
      </h2>
      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-green-700 duration-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
      <div className="flex flex-col justify-center text-xs italic text-center">
        <Link to="/signup" className="hover:text-gray-700 duration-200">
          Not a Member? Sign up today!
        </Link>
        <p className="my-1">or</p>
        <Link to="/" className="hover:text-gray-700 duration-200">
          explore without logging in
        </Link>
      </div>
    </form>
  );
}
