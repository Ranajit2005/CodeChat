import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error(`Error in mongoDb connection: ${error.message}`);
    process.exit(1);
  }
} 

export default dbConnection;
