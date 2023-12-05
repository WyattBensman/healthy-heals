import { Link } from "react-router-dom";
import DefaultCard from "../components/cards/defaultCard";

export default function Profile() {
  return (
    <>
      <div className="mt-12 mb-4">
        <h1 className="text-2xl font-semibold text-[#182d27] mb-4">
          Hello, Wyatt Bensman
        </h1>
        <Link to="/create-dish">
          <button className="px-8 py-2 bg-[#48b4a0] hover:opacity-80 duration-200 text-white font-medium rounded">
            Create Dish
          </button>
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <div className="inline-flex rounded-md shadow-sm ">
          <a
            href="#"
            aria-current="page"
            className="px-4 py-2 text-sm font-medium text-[#48b4a0] bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0]"
          >
            Your Dishes
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-[#182d27] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#48b4a0] focus:z-10 focus:ring-2 focus:ring-[#48b4a0] focus:text-[#48b4a0]"
          >
            Saved Dishes
          </a>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
      </div>
    </>
  );
}
