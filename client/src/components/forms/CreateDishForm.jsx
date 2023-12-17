import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_DISH } from "../../utils/mutations";

export function CreateDishForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    ingredients: [{ id: 1, value: "" }],
    instructions: [{ id: 1, value: "" }],
    cookTime: "",
    category: "",
  });

  const [createDish] = useMutation(CREATE_DISH);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const { data } = await createDish({
        variables: {
          ...formData,
          ingredients: formData.ingredients.map(
            (ingredient) => ingredient.value
          ),
          instructions: formData.instructions.map(
            (instruction) => instruction.value
          ),
        },
      });

      const createdDishId = data.createDish._id;
      navigate(`/${createdDishId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIngredientChange = (id, value) => {
    const updatedIngredients = formData.ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, value } : ingredient
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (id, value) => {
    const updatedInstructions = formData.instructions.map((instruction) =>
      instruction.id === id ? { ...instruction, value } : instruction
    );
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const addIngredient = () => {
    const newIngredient = { id: formData.ingredients.length + 1, value: "" };
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient],
    });
  };

  const removeIngredient = (id) => {
    const updatedIngredients = formData.ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addInstruction = () => {
    const newInstruction = { id: formData.instructions.length + 1, value: "" };
    setFormData({
      ...formData,
      instructions: [...formData.instructions, newInstruction],
    });
  };

  const removeInstruction = (id) => {
    const updatedInstructions = formData.instructions.filter(
      (instruction) => instruction.id !== id
    );
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  return (
    <form className="md:w-2/5 w-3/4" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-medium mb-2">Create Dish</h1>
      <h2 className="mb-5 italic text-sm">What's cookin' good lookin'?</h2>
      <div className="mb-4">
        {/* Title*/}
        <div className="flex space-x-3 md:space-x-8 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dish Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Image */}
          <div className="w-1/2">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Image
            </label>
            <input
              onChange={handleFileChange}
              name="image"
              type="file"
              id="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          type="text"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Ingredients */}
      <div className="mb-2">
        <label
          htmlFor="ingredient"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ingredients
        </label>
        {formData.ingredients.map((ingredient, index) => (
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
      <div className="mb-2">
        <label
          htmlFor="instruction"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Instructions
        </label>
        {formData.instructions.map((instruction, index) => (
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
              value={formData.cookTime}
              onChange={handleInputChange}
              type="number"
              name="cookTime"
              id="cookTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              required
            />
            <p className="ml-2 flex items-center">
              <span className="italic">in minutes</span>
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
            name="category"
            id="category"
            className="w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
            value={formData.category}
            onChange={handleInputChange}
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
