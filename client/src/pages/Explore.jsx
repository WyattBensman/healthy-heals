import ExploreCard from "../components/cards/exploreCard";

export default function Explore() {
  return (
    <div className="flex flex-col items-center md:mt-20 mt-8">
      <h1 className="text-2xl text-bold mb-4">
        Search based off of the food category!
      </h1>
      {/* This should be filtered between All Dishes, Breakfast, Lunch & Dinner */}
      <div className="flex flex-wrap justify-center gap-4">
        <ExploreCard category="breakfast" />
        <ExploreCard category="lunch" />
        <ExploreCard category="dinner" />
        <ExploreCard category="dessert" />
        <ExploreCard category="snacks" />
      </div>
    </div>
  );
}
