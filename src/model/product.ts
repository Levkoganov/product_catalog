import { IProduct } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);