import { IReviews } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const reviewSchema: Schema<IReviews> = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || mongoose.model<IReviews>('Review', reviewSchema);