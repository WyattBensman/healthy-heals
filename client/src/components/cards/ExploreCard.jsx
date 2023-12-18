import { useState } from "react";
import { Link } from "react-router-dom";

export default function ExploreCard({ category }) {
  const [cardHover, setCardHover] = useState(false);

  return (
    <Link to={`/explore/${category}`} className="mb-2 lg:w-1/4 md:w-2/5">
      <div>
        <img
          src={`/images/${category}.jpg`}
          className={`w-[350px] h-[225px] border-2 border-[#f6f3e7] cursor-pointer duration-200 ${
            cardHover && "filter brightness-50"
          }`}
          onMouseOver={() => setCardHover(true)}
          onMouseLeave={() => setCardHover(false)}
        />
      </div>
      <h3 className="text-center font-light text-xl hover:text-[#182d27] ease-in-out duration-200">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
    </Link>
  );
}
