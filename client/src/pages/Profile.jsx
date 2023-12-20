import { Link, useLocation } from "react-router-dom";
import AuthService from "../utils/auth";
import DefaultCard from "../components/cards/defaultCard";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { useEffect } from "react";

export default function Profile() {
  const location = useLocation();

  const user = AuthService.getProfile();
  const userId = user ? user.data._id : null;

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { userId },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { fName, lName, createdDishes, savedDishes } = data.user;
  const isSavedDishesPage = location.pathname.includes("saved-dishes");

  return (
    <>
      <div className="mt-12 mb-4">
        <h1 className="text-2xl font-semibold text-[#182d27] mb-4">
          {`Hello, ${fName} ${lName}`}
        </h1>
        <Link to="/create-dish">
          <button className="px-8 py-2 bg-[#48b4a0] hover:opacity-80 duration-200 text-white font-medium rounded">
            Create Dish
          </button>
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <div className="inline-flex rounded-md shadow-sm ">
          <Link
            to="/profile"
            aria-current="page"
            className={`px-4 py-2 text-sm font-medium ${
              isSavedDishesPage
                ? "text-[#182d27] bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0] bg-gray-100"
                : "text-[#48b4a0] bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0]"
            }`}
          >
            Your Dishes
          </Link>
          <Link
            to="/profile/saved-dishes"
            className={`px-4 py-2 text-sm font-medium ${
              isSavedDishesPage
                ? "text-[#48b4a0] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#48b4a0] focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0]"
                : "text-[#182d27] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#48b4a0] focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0] bg-gray-100"
            }`}
          >
            Saved Dishes
          </Link>
        </div>
      </div>
      {/* MAP THROUGH USER CARDS HERE WITH DEFAULT CARD */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
        {/* DISPLAY THIS ONE IF PATH IS /profile */}
        {!isSavedDishesPage &&
          createdDishes.map((dish) => (
            <DefaultCard
              key={dish._id}
              dishId={dish._id}
              title={dish.title}
              image={dish.image}
              cookTime={dish.cookTime}
              ingredients={dish.ingredients}
              author={dish.author}
            />
          ))}

        {/* DISPLAY THIS ONE IF PATH IS /profile/saved-dishes */}
        {isSavedDishesPage &&
          savedDishes.map((dish) => (
            <DefaultCard
              key={dish._id}
              dishId={dish._id}
              title={dish.title}
              image={dish.image}
              cookTime={dish.cookTime}
              ingredientsCount={dish.ingredients.length}
              author={dish.author}
            />
          ))}
      </div>
    </>
  );
}
