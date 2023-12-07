import { useState } from "react";

export function CreateDishForm() {
  const [dishName, setDishName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
  const [instructions, setInstructions] = useState([{ id: 1, value: "" }]);
  const [cookTime, setCookTime] = useState("");
  const [category, setCategory] = useState("");

  const handleIngredientChange = (id, value) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (id, value) => {
    const updatedInstructions = instructions.map((instruction) =>
      instruction.id === id ? { ...instruction, value } : instruction
    );
    setInstructions(updatedInstructions);
  };

  const addIngredient = () => {
    const newIngredient = { id: ingredients.length + 1, value: "" };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);
  };

  const addInstruction = () => {
    const newInstruction = { id: instructions.length + 1, value: "" };
    setInstructions([...instructions, newInstruction]);
  };

  const removeInstruction = (id) => {
    const updatedInstructions = instructions.filter(
      (instruction) => instruction.id !== id
    );
    setInstructions(updatedInstructions);
  };

  return (
    <form className="md:w-2/5 w-3/4">
      <h1 className="text-4xl font-medium mb-2">Create Dish</h1>
      <h2 className="mb-5 italic text-sm">What's cookin' good lookin'?</h2>
      <div className="mb-4">
        {/* Dish Name*/}
        <div className="flex space-x-3 md:space-x-8 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="dishName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dish Name
            </label>
            <input
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              type="text"
              id="dishName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/* Image */}
          <div className="w-1/2">
            <label
              htmlFor="lName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Image
            </label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
              id="fName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Short Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Ingredients */}
      <div className="mb-4">
        <label
          htmlFor="ingredient"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ingredients
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="relative mb-2">
            <input
              value={ingredient.value}
              onChange={(e) =>
                handleIngredientChange(ingredient.id, e.target.value)
              }
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
              required
            />
            {index > 0 && (
              <i
                className="fa-solid fa-x text-xs text-gray-500 absolute top-2 right-2 cursor-pointer mt-1 mr-1"
                onClick={() => removeIngredient(ingredient.id)}
              ></i>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-1">
          <button
            type="button"
            onClick={addIngredient}
            className="px-4 py-2 text-xs border border-[#48b4a0] rounded text-gray-700 font-medium hover:drop-shadow"
          >
            Add Ingredient
          </button>
        </div>
      </div>
      {/* Instructions */}
      <div className="mb-4">
        <label
          htmlFor="instruction"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Instructions
        </label>
        {instructions.map((instruction, index) => (
          <div key={instruction.id} className="relative mb-2">
            <input
              value={instruction.value}
              onChange={(e) =>
                handleInstructionChange(instruction.id, e.target.value)
              }
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
              required
            />
            {index > 0 && (
              <i
                className="fa-solid fa-x text-xs text-gray-500 absolute top-2 right-2 cursor-pointer mt-1 mr-1"
                onClick={() => removeInstruction(instruction.id)}
              ></i>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-1">
          <button
            type="button"
            onClick={addInstruction}
            className="px-4 py-2 text-xs border border-[#48b4a0] rounded text-gray-700 font-medium hover:drop-shadow"
          >
            Add Instruction
          </button>
        </div>
      </div>
      {/* Cook Time & Category */}
      <div className="flex space-x-3 md:space-x-8 mb-4">
        <div className="w-82">
          <label
            htmlFor="cookTime"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Cook Time
          </label>
          <div className="flex">
            <input
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              type="text"
              id="cookTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              required
            />
            <p className="ml-2 flex items-center">
              <i>in minutes</i>
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category
          </label>
          <select
            name="itemSize"
            className="w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-5">
        <button
          type="submit"
          className="text-white bg-[#48b4a0] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-200"
        >
          Create Dish
        </button>
        <button className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-green-300 ml-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-200">
          Discard Dish
        </button>
      </div>
    </form>
  );
}
