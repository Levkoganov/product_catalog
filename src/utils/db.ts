import { MongooseCache } from "@/types/types";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable in .env file");

const cached: MongooseCache = {
  connection: null,
  promise: null,
};

async function connectMongo() {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    const options = { bufferCommands: false };

    try {
      cached.promise = mongoose.connect(MONGODB_URI, options);
      cached.connection = await cached.promise;
    } catch (error) {
      cached.promise = null;
      throw error;
    }
  }

  if (cached.promise) cached.connection = await cached.promise;
  return cached.connection;
}

export default connectMongo;
