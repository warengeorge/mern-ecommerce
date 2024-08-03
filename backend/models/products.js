import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false },
  colour: { type: [String], required: false },
  images: { type: [String], required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
}, {
  timestamps: true,
});

const Product = model('Product', productSchema);

export default Product;