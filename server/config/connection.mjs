import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/healthy-heals";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log(`Connected to MongoDB: ${MONGODB_URI}`);
});

export default db;
