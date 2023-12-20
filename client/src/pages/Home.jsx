import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DISHES } from "../utils/queries";
import DefaultCard from "../components/cards/defaultCard";

export default function Home() {
  const { category } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_DISHES, {
    variables: { category },
  });

  useEffect(() => {
    refetch({ category });
  }, [category, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dishes = category ? data.dishes : data.dishes;

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between items-center mt-12 mb-4">
        <h1 className="text-2xl font-semibold text-[#182d27]">
          Explore some of our most popular dishes!
        </h1>
        <div className="flex text-xs gap-4">
          <p>Most Popular</p>
          <p>Recent</p>
          <p>Oldest</p>
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
