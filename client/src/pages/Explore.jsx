import { Outlet } from "react-router-dom";
import ExploreCard from "../components/cards/ExploreCard";

export default function Explore() {
  const isHomeRoute = window.location.pathname === "/explore";

  return (
    <>
      {/* Conditionally render category cards or nested routes */}
      {isHomeRoute ? (
        <div className="flex flex-col items-center md:mt-14 mt-8">
          <h1 className="text-2xl text-bold mb-4">
            Search based off of the food category!
          </h1>

          <div className="flex flex-wrap justify-center gap-4">
            <ExploreCard category="Breakfast" />
            <ExploreCard category="Lunch" />
            <ExploreCard category="Dinner" />
            <ExploreCard category="Dessert" />
            <ExploreCard category="Snacks" />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
