import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
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
    <form className="md:w-2/5 w-3/4" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-medium mb-2">Login</h1>
      <h2 class="mb-10 italic text-sm">
        Launch Your Body's Path to Wellness with Smart Choices!
      </h2>
      {/* Email */}
      <div className="mb-4">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Password */}
      <div className="mb-4">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
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
    </form>
  );
}
