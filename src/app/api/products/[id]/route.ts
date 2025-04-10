import connectDB from "@/utils/db";
import Product from "@/model/product";
import Review from "@/model/review";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const product = await Product.findById(id).populate("reviews");
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { productId, rating, comment } = await req.json();

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "All fields (productId, rating, comment) are required." },
        { status: 400 }
      );
    }

    const newReview = await Review.create({ productId, rating, comment });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found during update" },
        { status: 404 }
      );
    }

    return NextResponse.json(newReview, { status: 200 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
