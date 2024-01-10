import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DISHES } from "../utils/queries";
import DefaultCard from "../components/cards/DefaultCard";

export default function Home() {
  const { category } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_DISHES, {
    variables: { category },
  });

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    refetch({ category, sortOrder });
  }, [category, sortOrder, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let dishes = category ? data.dishes : data.dishes;

  // Convert createdAt values to numbers and then create Date objects
  const createdAtDates = dishes.map((dish) => new Date(Number(dish.createdAt)));

  // Sort dishes based on createdAt values
  dishes = dishes.slice().sort((a, b) => {
    const dateA = createdAtDates[dishes.indexOf(a)];
    const dateB = createdAtDates[dishes.indexOf(b)];

    // Adjust the comparison based on sortOrder
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const handleSortToggle = () => {
    // Toggle between "desc" (newest to oldest) and "asc" (oldest to newest)
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between items-center mt-12 mb-4">
        <h1 className="text-2xl font-semibold text-[#182d27]">
          Explore some of our most popular dishes!
        </h1>
        <div className="flex text-xs gap-4">
          <p
            onClick={handleSortToggle}
            className={`cursor-pointer ${
              sortOrder === "desc" ? "font-bold" : ""
            }`}
          >
            Recent
          </p>
          <p
            onClick={handleSortToggle}
            className={`cursor-pointer ${
              sortOrder === "asc" ? "font-bold" : ""
            }`}
          >
            Oldest
          </p>
        </div>
      </div>
      {/* CARD GRID */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {dishes.map((dish) => (
          <DefaultCard
            key={dish._id}
            dishId={dish._id}
            title={dish.title}
            image={dish.image}
            cookTime={dish.cookTime}
            ingredients={dish.ingredients}
            author={dish.author}
            refetchDishes={refetch}
          />
        ))}
      </div>
    </>
  );
}
