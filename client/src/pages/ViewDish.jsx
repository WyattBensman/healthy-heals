import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DISH } from "../utils/queries";

export default function ViewDish() {
  const { dishId } = useParams();
  const { loading, error, data } = useQuery(GET_DISH, {
    variables: { dishId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const {
    title,
    description,
    image,
    cookTime,
    category,
    ingredients,
    instructions,
  } = data;
  console.log(title);

  return (
    <div className="mt-12">
      <div className="flex gap-8">
        <img src="/images/dessert.jpg" className="h-[350px] w-1/2" />
        <div className="w-full">
          <h1 className="text-xl font-semibold">
            Atlantic Honey Smoked Salmon
          </h1>
          <p>
            This is a pretty brief and short description for the dish lorem{" "}
          </p>
          <h4 className="mt-4">
            <span className="font-medium">Category:</span>{" "}
            <span className="italic">Breakfast</span>
          </h4>
          <h4 className="mb-4">
            <span className="font-medium">Cook Time:</span>{" "}
            <span className="italic">60 Minutes</span>
          </h4>
          <h4 className="font-medium">Ingredients:</h4>
          <div className="grid grid-cols-4">
            <h6>Paprika asdf adsfads f</h6>
            <h6>Salmon</h6>
            <h6>Boogers</h6>
            <h6>Hey</h6>
            <h6>Hey</h6>
            <h6>Hey</h6>
            <h6>Hey</h6>
          </div>
        </div>
      </div>
      <h4 className="font-medium text-xl mt-8">Instructions</h4>
      <p className="mt-1">
        1. ladsfkjasd;lkfja; kdsf asldkfja ;sldkjf ;alsdkjf;a lksdf ljkasdlfk
        a;slk adsf adsfkajds;fj a;lsdkfjal;s dkjf;l aksdjf;lkadjs f;laksdjf;lkj
      </p>
      <p className="mt-1">
        2. ladsfkjasd;lkfja; kdsf asldkfja ;sldkjf ;alsdkjf;a lksdf ljkasdlfk
        a;slk adsf adsfkajds;fj a;lsdkfjal;s dkjf;l aksdjf;lkadjs f;laksdjf;lkj
      </p>
      <p className="mt-1">
        3. ladsfkjasd;lkfja; kdsf asldkfja ;sldkjf ;alsdkjf;a lksdf ljkasdlfk
        a;slk adsf adsfkajds;fj a;lsdkfjal;s dkjf;l aksdjf;lkadjs f;laksdjf;lkj
      </p>
    </div>
  );
}
