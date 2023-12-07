import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../../utils/auth";

export default function ProfileNavDropdown() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <div
      onMouseOver={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
      className="relative"
    >
      <button
        className="text-[#182d27] bg-[#48b4a0] font-medium focus:ring-4 focus:outline-none focus:ring-[#48b4a0] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Profile{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownVisible && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 left-1/2 transform -translate-x-1/2">
          <ul className="py-2 text-sm text-[#182d27] dark:text-gray-200">
            <li>
              <NavLink
                to="/profile"
                className="block px-4 py-2 hover:text-[#48b4a0] ease-in-out duration-100"
              >
                View Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-dish"
                className="block px-4 py-2 hover:text-[#48b4a0] ease-in-out duration-100"
              >
                Create Dish
              </NavLink>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className="block cursor-pointer px-4 py-2 hover:text-red-600 ease-in-out duration-100"
              >
                Sign out
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
