import { useState } from "react";
import { Link } from "react-router-dom";

export default function DefaultCard() {
  const [cardHover, setCardHover] = useState(false);

  return (
    <div className="mb-2">
      <div className="relative">
        <img
          src="/images/dinner.jpg"
          className={`w-full border cursor-pointer duration-200 ${
            cardHover && "opacity-90"
          }`}
          onMouseOver={() => setCardHover(true)}
          onMouseLeave={() => setCardHover(false)}
        />
        {cardHover && (
          <a
            href="www.youtube.com"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 duration-200 text-xl font-bold bg-black bg-opacity-75 p-4 rounded"
            onMouseOver={() => setCardHover(true)}
          >
            View Dish
          </a>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link
          to="/dishes"
          className="hover:text-[#182d27] ease-in-out duration-100"
        >
          <h3 className="font-medium">Honey Smoked Atlantic Salmon</h3>
        </Link>
        <i className="fa-regular fa-heart text-xl text-red-400"></i>
      </div>
      <p className="text-sm italic">18 Minute Cook Time</p>
      <p className="text-sm italic">8 Ingredients</p>
    </div>
  );
}
