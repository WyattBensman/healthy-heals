import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formData },
      });

      Auth.login(data.createUser.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="md:w-2/5 w-3/4" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-medium mb-2">Sign Up</h1>
      <h2 className="mb-10 italic text-sm">
        Take the First Step Towards a Healthier You!
      </h2>
      <div className="mb-4">
        {/* First & Last Name */}
        <div className="flex space-x-3 md:space-x-8 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="fName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              value={formData.fName}
              onChange={handleInputChange}
              type="text"
              id="fName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              value={formData.lName}
              onChange={handleInputChange}
              type="text"
              id="lName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
      </div>
      {/* Username */}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          value={formData.username}
          onChange={handleInputChange}
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
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
          Password
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
      {/* Button */}
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Sign Up
      </button>
    </form>
  );
}
