import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileNavDropdown from "./ProfileDropdown";
import AuthService from "../../utils/auth";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isLoggedIn = AuthService.loggedIn();

  return (
    <nav className="py-5 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 bg-[#f6f3e7] border-b-2 border-[#182d27] border-opacity-90">
      <div className="flex flex-wrap items-center justify-between">
        {/* Brand Logo */}
        <Link to="/">
          {/* <img className="w-36" src="/images/branding/official-logo.png" /> */}
          <h1 className="text-2xl italic text-[#48b4a0] font-semibold">
            Healthy Heals
          </h1>
        </Link>
        {/* Toggler */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isNavOpen}
          onClick={toggleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Links */}
        <div
          className={`w-full md:block md:w-auto ${
            isNavOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium text-center text-[#182d27] flex flex-col items-center p-4 md:p-0 md:border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/"
                className="hover:text-[#48b4a0] ease-in-out duration-100"
              >
                Home
              </NavLink>
            </li>
            <li className="md:mt-0 mt-3">
              <NavLink
                to="/explore"
                className="hover:text-[#48b4a0] ease-in-out duration-100"
              >
                Explore
              </NavLink>
            </li>
            {isLoggedIn ? (
              <ProfileNavDropdown />
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-[#48b4a0] ease-in-out duration-100"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
