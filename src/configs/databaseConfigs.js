// imports
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Database Configurations

const connectDB = async () => {
  const DATABASE_URL = process.env.DB_URI;
  try {
    const DB_OPTIONS = {
      dbName: "course-hub",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
