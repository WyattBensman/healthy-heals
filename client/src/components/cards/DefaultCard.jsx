import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_DISH, UNSAVE_DISH } from "../../utils/mutations";

export default function DefaultCard({
  dishId,
  title,
  image,
  cookTime,
  ingredientsCount,
}) {
  const [cardHover, setCardHover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const user = AuthService.getProfile();
  const userId = user ? user.data._id : null;

  // Mutation hooks
  const [saveDishMutation] = useMutation(SAVE_DISH);
  const [unsaveDishMutation] = useMutation(UNSAVE_DISH);

  useEffect(() => {
    if (user.data.savedDishes) {
      // Set initial save status based on user's savedDishes
      setIsSaved(user.data.savedDishes.includes(dishId));
    }
  }, [user, dishId]);

  const handleSaveDish = async () => {
    try {
      await saveDishMutation({ variables: { dishId } });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving dish:", error.message);
    }
  };

  const handleUnsaveDish = async () => {
    try {
      await unsaveDishMutation({ variables: { dishId } });
      setIsSaved(false);
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
        {/* FIX THIS */}
        {cardHover && (
          <Link
            to={`/dishes/${dishId}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 duration-200 text-xl font-bold bg-black bg-opacity-75 p-4 rounded"
            onMouseOver={() => setCardHover(true)}
          >
            View Dish
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/dishes/${dishId}`}
          className="hover:text-[#182d27] ease-in-out duration-100"
        >
          {/* TITLE */}
          <h3 className="font-medium">{title}</h3>
        </Link>
        {isSaved ? (
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
      <p className="text-sm italic">{ingredientsCount} Ingredients</p>
    </div>
  );
}

/* const currentUser = AuthService.getProfile();
 */ /* const isCurrentUserAuthor = currentUser && currentUser.id === card.authorId; */

{
  /* {isCurrentUserAuthor && currentUser && (
          <div className="relative group">
            <i className="fa-regular fa-pen-to-square text-xl text-gray-400 cursor-pointer" />
            <div className="hidden group-hover:block absolute right-0 mt-2 bg-white border p-2 rounded">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        )} */
}
