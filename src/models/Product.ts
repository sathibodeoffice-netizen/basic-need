import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  banglaName?: string;
  description: string;
  images: string[];
  videoUrl?: string;
  category: mongoose.Types.ObjectId;
  brand?: string;
  sku?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  unit: string; // e.g., 'kg', 'pcs', 'liters'
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    banglaName: { type: String },
    description: { type: String, required: true },
    images: [{ type: String }],
    videoUrl: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: String },
    sku: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stockQuantity: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true, default: 'pcs' },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
