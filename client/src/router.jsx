import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import ViewDish from "./pages/ViewDish";
import CreateDish from "./pages/CreateDish";
import EditDish from "./pages/EditDish";
import { Outlet } from "react-router-dom";
/* import { AuthProvider } from "./utils/AuthContext"; */

const routes = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: ":dish",
        element: <ViewDish />,
      },
      {
        path: "/create-dish",
        element: <CreateDish />,
      },
      {
        path: ":dish/edit-dish",
        element: <EditDish />,
      },
    ],
  },
];

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24">
        <Outlet />
      </div>
    </>
  );
}

export default routes;
