import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DISH, GET_USER } from "../utils/queries";
import { SAVE_DISH, UNSAVE_DISH } from "../utils/mutations";
import { useEffect, useState } from "react";
import AuthService from "../utils/auth";
import SettingsDropdown from "../components/cards/SettingsDropdown";

export default function ViewDish() {
  const [isSaved, setIsSaved] = useState(false);
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);

  const { dish } = useParams();

  const {
    loading: dishLoading,
    error: dishError,
    data: dishData,
    refetch: refetchDishData,
  } = useQuery(GET_DISH, {
    variables: { dishId: dish },
  });

  // Fetch user information
  const currentUser = AuthService.getProfile();
  const currentUserId = currentUser?.data?._id;

  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: currentUserId },
  });

  useEffect(() => {
    if (dishData && userData) {
      const savedDishIds =
        userData?.user?.savedDishes.map((savedDish) => savedDish._id) || [];

      if (currentUserId === dishData?.dish?.author?._id) {
        setIsCurrentUserAuthor(true);
      }

      if (savedDishIds.includes(dish)) {
        setIsSaved(true);
      }
    }
  }, [dishData, userData]);

  // GraphQL mutations
  const [saveDishMutation] = useMutation(SAVE_DISH);
  const [unsaveDishMutation] = useMutation(UNSAVE_DISH);

  const handleSaveDish = async () => {
    try {
      const result = await saveDishMutation({ variables: { dishId: dish } });
      console.log("saveDishMutation result:", result);
      setIsSaved(true);

      refetchDishData();
    } catch (error) {
      console.error("Error saving dish:", error.message);
    }
  };

  const handleUnsaveDish = async () => {
    try {
      await unsaveDishMutation({ variables: { dishId: dish } });
      setIsSaved(false);
      console.log("Unsaved Brother");
    } catch (error) {
      console.error("Error unsaving dish:", error.message);
    }
  };

  if (dishLoading) return <p>Loading...</p>;
  if (dishError) return <p>Error: {dishError.message}</p>;

  const {
    title,
    description,
    category,
    image,
    cookTime,
    ingredients,
    instructions,
  } = dishData.dish;

  return (
    <div className="my-12">
      <div className="flex md:flex-row flex-col md:gap-8">
        <div className="">
          <img src={`http://localhost:3001${image}`} className="h-[350px] " />
          {isCurrentUserAuthor ? (
            <div className="relative group mt-1">
              <SettingsDropdown />
            </div>
          ) : isSaved ? (
            <i
              className="fa-solid fa-heart text-xl text-red-400"
              onClick={handleUnsaveDish}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart text-xl text-red-400"
              onClick={handleSaveDish}
            ></i>
          )}
        </div>
        <div className="md:w-1/2">
          <h1 className="text-xl font-semibold md:mt-0 mt-4">{title}</h1>
          <p>{description}</p>
          <h4 className="mt-4">
            <span className="font-medium">Category:</span>{" "}
            <span className="italic">{category}</span>
          </h4>
          <h4 className="mb-4">
            <span className="font-medium">Cook Time:</span>{" "}
            <span className="italic">{cookTime} Minutes</span>
          </h4>

          <h4 className="font-medium">Ingredients:</h4>
          <div className="grid grid-cols-4 gap-2">
            {ingredients?.map((ingredient, index) => (
              <h6
                key={index}
                className="mt-2 border flex justify-center items-center text-center p-2 drop-shadow-sm rounded"
              >
                {ingredient}
              </h6>
            ))}
          </div>
        </div>
      </div>
      <h4 className="font-medium text-xl mt-8">Instructions</h4>
      {instructions?.map((instruction, index) => (
        <p key={index} className="mt-1">
          {index + 1}. {instruction}
        </p>
      ))}
    </div>
  );
}
