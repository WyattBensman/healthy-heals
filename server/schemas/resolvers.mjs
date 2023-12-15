import User from "../models/user.mjs";
import Dish from "../models/dish.mjs";
import { signToken, AuthenticationError } from "../utils/auth.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

const resolvers = {
  Query: {
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId)
          .populate("createdDishes")
          .populate("savedDishes");

        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
    dish: async (_, { dishId }) => {
      try {
        const dish = await Dish.findById(dishId);

        return dish;
      } catch (error) {
        throw new Error(`Error fetching dish: ${error.message}`);
      }
    },
    dishes: async (_, { category }) => {
      try {
        const query = category ? { category } : {};
        const dishes = await Dish.find(query);

        return dishes;
      } catch (error) {
        throw new Error(`Error fetching dishes: ${error.message}`);
      }
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email })
          .populate("createdDishes")
          .populate("savedDishes");

        if (!user) {
          throw new AuthenticationError("Invalid email or password");
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw new AuthenticationError("Invalid email or password");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new AuthenticationError("Invalid email or password");
      }
    },
    createUser: async (_, { fName, lName, email, password }) => {
      try {
        const user = await User.create({ fName, lName, email, password });

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error("An error occurred during user creation.");
      }
    },
    updateUser: async (_, { fName, lName, email, password }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          {
            fName,
            lName,
            email,
            password,
          },
          { new: true, runValidators: true }
        );

        if (password) {
          const saltRounds = 10;
          updatedUser.password = await bcrypt.hash(password, saltRounds);
          await updatedUser.save();
        }

        return updatedUser;
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
    createDish: async (
      _,
      {
        title,
        description,
        image,
        cookTime,
        category,
        ingredients,
        instructions,
      },
      req
    ) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      let fileUrl = null;

      if (image) {
        // Handle file upload
        const { createReadStream, filename } = await image;

        // Create a unique filename using uuid
        const uniqueFilename = `${uuidv4()}-${filename}`;

        // Create the uploads directory if it doesn't exist
        const uploadDir = "./uploads";

        // Stream the file to the uploads directory
        const stream = createReadStream();
        const filePath = `${uploadDir}/${uniqueFilename}`;
        const writeStream = fs.createWriteStream(filePath);
        await stream.pipe(writeStream);

        // Store the URL or identifier of the uploaded file in the database
        fileUrl = `/uploads/${uniqueFilename}`;
      }

      try {
        const dish = await Dish.create({
          title,
          description,
          image: fileUrl,
          cookTime,
          category,
          ingredients,
          instructions,
          author: req.user._id,
        });

        await User.findByIdAndUpdate(
          req.user._id,
          {
            $addToSet: { createdDishes: dish },
          },
          { new: true }
        );

        return dish;
      } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error("Failed to create dish");
      }
    },
    updateDish: async (
      _,
      {
        dishId,
        title,
        description,
        image,
        cookTime,
        category,
        ingredients,
        instructions,
      },
      req
    ) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const existingDish = await Dish.findOne({
          _id: dishId,
          author: req.user._id,
        });

        if (!existingDish) {
          throw new Error(
            "Dish not found or you do not have permission to edit this dish"
          );
        }

        // Handle file upload // Use the existing file URL by default
        let fileUrl = existingDish.image || "";

        if (image) {
          const { createReadStream, filename, mimetype } = await image;

          const uniqueFilename = `${uuidv4()}-${filename}`;
          const uploadDir = "./uploads";
          const filePath = `${uploadDir}/${uniqueFilename}`;

          const stream = createReadStream();
          const writeStream = fs.createWriteStream(filePath);
          await stream.pipe(writeStream);

          fileUrl = `/uploads/${uniqueFilename}`;
        }

        const updatedDish = await Dish.findByIdAndUpdate(
          dishId,
          {
            title,
            description,
            image: fileUrl,
            cookTime,
            category,
            ingredients,
            instructions,
          },
          { new: true }
        );

        return updatedDish;
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
    deleteDish: async (_, { dishId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const existingDish = await Dish.findOneAndDelete({
          _id: dishId,
          author: req.user._id,
        });

        if (!existingDish) {
          throw new Error(
            "Dish not found or you do not have permission to edit this dish"
          );
        }

        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { createdDishes: dishId },
          },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
    saveDish: async (_, { dishId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { $addToSet: { savedDishes: dishId } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
    unsaveDish: async (_, { dishId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { savedDishes: dishId } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
  },
};

export default resolvers;
