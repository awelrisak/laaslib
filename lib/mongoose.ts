import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connections[0]?.readyState) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error: any) {
    throw new Error(`failed to connect to MongoDB: ${error?.message}`);
  }
};

export default connectToDB;
