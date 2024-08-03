import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
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

productSchema.index(
  { 
    name: 'text',
    brand: 'text', 
    category: 'text'
  },
  {
    weights: {
      name: 5,
      brand: 3,
      category: 2
    }
  }
);

const Product = model('Product', productSchema);

export default Product;