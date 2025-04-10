import mongoose from "mongoose";

export interface MongooseCache {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  reviews: IReviews[];
  createdAt?: any;
  updatedAt?: any;
}

export interface IReviews {
  _id: string;
  productId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: any;
  updatedAt?: any;
}
