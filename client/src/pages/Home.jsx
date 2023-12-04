import DefaultCard from "../components/cards/defaultCard";

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center mt-12 mb-4">
        <h1 className="text-2xl font-semibold text-[#182d27]">
          Explore some of our most popular dishes!
        </h1>
        <div className="flex text-xs gap-4">
          <p>Most Popular</p>
          <p>Recent</p>
          <p>Oldest</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
        <DefaultCard />
      </div>
    </>
  );
}