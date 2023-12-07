const { User, Dish } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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

      try {
        const dish = await Dish.create({
          title,
          description,
          image,
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

        const updatedDish = await Dish.findByIdAndUpdate(
          dishId,
          {
            title,
            description,
            image,
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

module.exports = resolvers;
