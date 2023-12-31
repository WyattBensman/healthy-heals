import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SettingsDropdown({ handleDeleteDish, dishId }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      onMouseOver={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
      className="relative"
    >
      <i className="fa-regular fa-pen-to-square text-xl text-gray-400 cursor-pointer" />

      {isDropdownVisible && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 left-1/2 transform -translate-x-1/2">
          <ul className="py-2 text-sm text-[#182d27] dark:text-gray-200 text-center">
            <li>
              <NavLink
                to={`/${dishId}/edit-dish`}
                className="block px-4 py-2 hover:text-[#48b4a0] ease-in-out duration-100"
              >
                Edit Dish
              </NavLink>
            </li>
            <li>
              <div
                onClick={handleDeleteDish}
                className="block cursor-pointer px-4 py-2 hover:text-red-600 ease-in-out duration-100"
              >
                Delete Dish
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
