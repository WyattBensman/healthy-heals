import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";
import SettingsDropdown from "./SettingsDropdown";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
import { SAVE_DISH, UNSAVE_DISH } from "../../utils/mutations";

export default function DefaultCard({
  dishId,
  title,
  image,
  cookTime,
  ingredients,
  author,
  refetchDishes,
}) {
  const [cardHover, setCardHover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);

  // GraphQL mutations
  const [saveDishMutation] = useMutation(SAVE_DISH);
  const [unsaveDishMutation] = useMutation(UNSAVE_DISH);

  // CHECK IF CURRENT USER OF CARD
  const currentUser = AuthService.getProfile();
  const currentUserId = currentUser?.data?._id;

  const { data } = useQuery(GET_USER, {
    variables: { userId: currentUserId },
    onCompleted: (data) => {
      // Callback once Query is Completed
      const savedDishIds =
        data?.user?.savedDishes.map((savedDish) => savedDish._id) || [];

      if (currentUserId === author._id) {
        setIsCurrentUserAuthor(true);
      }

      if (savedDishIds.includes(dishId)) {
        setIsSaved(true);
      }
    },
  });

  const handleSaveDish = async () => {
    try {
      const result = await saveDishMutation({ variables: { dishId } });
      console.log("saveDishMutation result:", result);
      setIsSaved(true);
      refetchDishes();
    } catch (error) {
      console.error("Error saving dish:", error.message);
      console.error("Detailed error:", error);
    }
  };

  const handleUnsaveDish = async () => {
    try {
      await unsaveDishMutation({ variables: { dishId } });
      setIsSaved(false);

      console.log("Unsaved Brother");
    } catch (error) {
      console.error("Error unsaving dish:", error.message);
    }
  };

  return (
    <div className="mb-2">
      <div className="relative">
        {/* IMAGE */}
        <img
          src={`http://localhost:3001${image}` || "/images/default-image.jpg"}
          alt={title}
          className={`w-full h-[235px] object-cover border cursor-pointer duration-300 ${
            cardHover && "filter brightness-50"
          }`}
          onMouseOver={() => setCardHover(true)}
          onMouseLeave={() => setCardHover(false)}
        />
        {cardHover && (
          <Link
            to={`/dish/${dishId}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 duration-200 text-xl font-bold bg-black bg-opacity-75 p-4 rounded"
            onMouseOver={() => setCardHover(true)}
          >
            View Dish
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/dish/${dishId}`}
          className="hover:text-[#182d27] ease-in-out duration-100"
        >
          {/* TITLE */}
          <h3 className="font-medium">{title}</h3>
        </Link>

        {isCurrentUserAuthor ? (
          <div className="relative group">
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

      {/* COOK TIME */}
      <p className="text-sm italic">{cookTime} Minute Cook Time</p>
      {/* # OF INGREDIENTS  */}
      <p className="text-sm italic">
        {ingredients ? ingredients.length : "N/A"} Ingredients
      </p>
    </div>
  );
}
