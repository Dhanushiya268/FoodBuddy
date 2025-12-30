import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-del';
    await mongoose.connect(uri);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
}