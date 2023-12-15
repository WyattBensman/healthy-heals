import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const { isEmail } = validator;

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
  },
  lName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        if (!password) return false;
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
      },
      message: () =>
        "Password must contain at least 8 characters, at least one digit, one lowercase letter, and one uppercase letter.",
    },
  },
  createdDishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
  savedDishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

// Hashes Password
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Checks if Password is Correct
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create User Model
const User = model("User", userSchema);

export default User;
